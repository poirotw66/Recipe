import { readFileSync, readdirSync } from "node:fs";
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

const zhNameToSlug = new Map(scenarios.map((scenario) => [scenario.name, scenario.slug]));

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

const mismatches = [];

for (const [locale, dir] of Object.entries(localeDirs)) {
  for (const filename of readdirSync(dir)) {
    if (!filename.endsWith(".md")) {
      continue;
    }
    const source = readFileSync(join(dir, filename), "utf8");
    const recipeKey = getRecipeKey(source, filename);
    const expectedSlugs = zhScenarioSlugsByRecipe.get(recipeKey) ?? [];
    const expectedLabels = expectedSlugs
      .map((slug) => slugToLocaleLabel(slug, locale))
      .filter(Boolean)
      .sort();
    const actualLabels = [...extractScenarios(source)].sort();

    if (expectedLabels.join("|") !== actualLabels.join("|")) {
      mismatches.push({ locale, recipeKey, expectedLabels, actualLabels });
    }
  }
}

if (mismatches.length > 0) {
  console.error(`Recipe scenario sync mismatch: ${mismatches.length}`);
  for (const item of mismatches.slice(0, 10)) {
    console.error(
      `${item.locale}/${item.recipeKey}: expected [${item.expectedLabels.join(", ")}], got [${item.actualLabels.join(", ")}]`
    );
  }
  process.exit(1);
}

console.log("Recipe scenario labels are aligned across en/ja/ko for all localized recipes.");
