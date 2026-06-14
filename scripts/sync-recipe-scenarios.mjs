import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import scenarios from "../src/data/scenarios.json" with { type: "json" };

const root = process.cwd();
const zhDir = join(root, "src/content/recipes");
const localeDirs = {
  en: join(root, "src/content/recipes-en"),
  ja: join(root, "src/content/recipes-ja"),
  ko: join(root, "src/content/recipes-ko")
};

const zhAliases = {
  租屋料理: "one-person-meal"
};

const zhNameToSlug = new Map(
  scenarios.map((scenario) => [scenario.name, scenario.slug])
);

const slugToLocaleLabel = (slug, locale) => {
  const scenario = scenarios.find((item) => item.slug === slug);
  if (!scenario) {
    return null;
  }
  return scenario.labels?.[locale] ?? scenario.name;
};

function extractScenarios(source) {
  const match = source.match(/^scenarios:\r?\n((?:- [^\r\n]+\r?\n)+)/m);
  if (!match) {
    return [];
  }
  return match[1]
    .split(/\r?\n/)
    .map((line) => line.replace(/^- /, "").trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
}

function getRecipeKey(source, filename) {
  const recipeIdMatch = source.match(/^recipeId:\s*(.+)$/m);
  const slugMatch = source.match(/^slug:\s*(.+)$/m);
  return (recipeIdMatch?.[1] ?? slugMatch?.[1] ?? filename.replace(/\.md$/, "")).trim();
}

function formatScenarioValue(value) {
  if (/[:#{}[\],&*?|>!%@`]|^\s|\s$/.test(value)) {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  return value;
}

function replaceScenarios(source, scenarioLabels) {
  const block =
    scenarioLabels.length > 0
      ? `scenarios:\n${scenarioLabels.map((label) => `- ${formatScenarioValue(label)}`).join("\n")}\n`
      : "";

  if (/^scenarios:\r?\n/m.test(source)) {
    if (scenarioLabels.length === 0) {
      return source.replace(/^scenarios:\r?\n(?:- [^\r\n]+\r?\n)+/m, "");
    }
    return source.replace(/^scenarios:\r?\n(?:- [^\r\n]+\r?\n)+/m, block);
  }

  if (scenarioLabels.length === 0) {
    return source;
  }

  const anchor = source.match(/^([\s\S]*?)(equipment:|tags:|ingredients:|tips:|steps:|featured:|publishedAt:)/m);
  if (!anchor) {
    throw new Error("Could not find insertion point for scenarios block");
  }
  return source.replace(anchor[0], `${anchor[1]}${block}${anchor[2]}`);
}

const zhScenarioSlugsByRecipe = new Map();

for (const filename of readdirSync(zhDir)) {
  if (!filename.endsWith(".md")) {
    continue;
  }
  const source = readFileSync(join(zhDir, filename), "utf8");
  const recipeKey = getRecipeKey(source, filename);
  const slugSet = new Set();

  for (const zhScenario of extractScenarios(source)) {
    const slug = zhNameToSlug.get(zhScenario) ?? zhAliases[zhScenario];
    if (slug) {
      slugSet.add(slug);
    }
  }

  zhScenarioSlugsByRecipe.set(recipeKey, [...slugSet].sort());
}

const summary = {
  updated: { en: 0, ja: 0, ko: 0 },
  missingLocaleFile: { en: 0, ja: 0, ko: 0 },
  unchanged: { en: 0, ja: 0, ko: 0 }
};

for (const [locale, dir] of Object.entries(localeDirs)) {
  const localeFiles = new Map();
  for (const filename of readdirSync(dir)) {
    if (!filename.endsWith(".md")) {
      continue;
    }
    const source = readFileSync(join(dir, filename), "utf8");
    localeFiles.set(getRecipeKey(source, filename), { filename, source });
  }

  for (const [recipeKey, slugs] of zhScenarioSlugsByRecipe.entries()) {
    const localeFile = localeFiles.get(recipeKey);
    if (!localeFile) {
      summary.missingLocaleFile[locale] += 1;
      continue;
    }

    const labels = slugs
      .map((slug) => slugToLocaleLabel(slug, locale))
      .filter((label) => Boolean(label));
    const nextSource = replaceScenarios(localeFile.source, labels);

    if (nextSource === localeFile.source) {
      summary.unchanged[locale] += 1;
      continue;
    }

    writeFileSync(join(dir, localeFile.filename), nextSource, "utf8");
    summary.updated[locale] += 1;
  }
}

function countScenarioMatches(dir, locale, slug) {
  const label = slugToLocaleLabel(slug, locale);
  let count = 0;
  for (const filename of readdirSync(dir)) {
    if (!filename.endsWith(".md")) {
      continue;
    }
    const scenariosInFile = extractScenarios(readFileSync(join(dir, filename), "utf8"));
    if (scenariosInFile.includes(label)) {
      count += 1;
    }
  }
  return count;
}

console.log("Sync summary:", summary);
console.log("\nScenario counts after sync:");
for (const slug of ["budget-meals", "ten-minute-meals", "meatless-meals", "one-person-meal"]) {
  const zhLabel = slugToLocaleLabel(slug, "zh-TW");
  const zhCount = countScenarioMatches(zhDir, "zh-TW", slug);
  const enCount = countScenarioMatches(localeDirs.en, "en", slug);
  const jaCount = countScenarioMatches(localeDirs.ja, "ja", slug);
  const koCount = countScenarioMatches(localeDirs.ko, "ko", slug);
  console.log(`${slug}: zh=${zhCount} en=${enCount} ja=${jaCount} ko=${koCount} (zh label: ${zhLabel})`);
}
