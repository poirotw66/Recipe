#!/usr/bin/env node
/**
 * Sync en/ja/ko steps and ingredients for Dubu House soondubu batch (12 slugs).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DH_INGREDIENT_PATCHES, DH_STEPS } from "./lib/dh-locale-steps.mjs";

const ROOT = process.cwd();
const UPDATED = "2026-07-06";

const SLUGS = [
  "dh-classic-soondubu",
  "dh-vegetable-soondubu",
  "dh-kimchi-soondubu",
  "dh-kimchi-mushroom-soondubu",
  "dh-cheese-vegetable-soondubu",
  "dh-cheese-kimchi-mushroom-soondubu",
  "dh-cheese-soondubu",
  "dh-seaweed-oyster-soondubu",
  "dh-kimchi-seafood-soondubu",
  "dh-fish-soondubu",
  "dh-curry-soondubu",
  "dh-korean-dumpling-soondubu"
];

const localeDirs = {
  en: "src/content/recipes-en",
  ja: "src/content/recipes-ja",
  ko: "src/content/recipes-ko"
};

function yamlStep(step, locale) {
  const needsQuote =
    locale === "en" && (/[:#"'&]|^\d/.test(step) || step.includes("："));
  if (needsQuote) {
    return `- "${step.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return `- ${step}`;
}

function splitMarkdown(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("Invalid frontmatter");
  return { fm: match[1], body: match[2] };
}

function replaceStepsBlock(fm, steps, locale) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "steps:");
  if (start < 0) throw new Error("Missing steps:");
  let end = start + 1;
  while (end < lines.length && (lines[end].startsWith("- ") || lines[end].startsWith('- "'))) end++;
  const block = ["steps:", ...steps.map((s) => yamlStep(s, locale))];
  return [...lines.slice(0, start), ...block, ...lines.slice(end)].join("\n");
}

function hasItem(fm, key, name) {
  const section = fm.split(`${key}:`)[1]?.split(/\n[a-zA-Z]/)[0] ?? "";
  return new RegExp(`^- name: ${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "m").test(section);
}

function yamlListEnd(fm, key) {
  const marker = `${key}:`;
  const start = fm.indexOf(marker);
  if (start < 0) return -1;
  let pos = start + marker.length;
  while (pos < fm.length && fm[pos] !== "\n") pos++;
  pos++;

  const lines = fm.slice(pos).split("\n");
  let consumed = 0;
  let inItem = false;
  for (const line of lines) {
    if (line.startsWith("- ")) {
      inItem = true;
      consumed += line.length + 1;
      continue;
    }
    if (inItem && (line.startsWith("  ") || line === "")) {
      consumed += line.length + 1;
      continue;
    }
    break;
  }
  return pos + consumed;
}

function insertYamlListItems(fm, key, items) {
  const end = yamlListEnd(fm, key);
  if (end < 0) return fm;
  const block = items
    .map((item) => {
      const core = item.isCore !== undefined ? `\n  isCore: ${item.isCore}` : "";
      return `- name: ${item.name}\n  amount: "${item.amount}"\n  unit: ${item.unit}${core}`;
    })
    .join("\n");
  const needsNl = end > 0 && fm[end - 1] !== "\n";
  return fm.slice(0, end) + (needsNl ? "\n" : "") + block + "\n" + fm.slice(end);
}

function replaceYamlList(fm, key, items) {
  const marker = `${key}:`;
  const start = fm.indexOf(marker);
  if (start < 0) return fm;
  let pos = start + marker.length;
  while (pos < fm.length && fm[pos] !== "\n") pos++;
  pos++;
  const end = yamlListEnd(fm, key);
  const block = items
    .map((item) => {
      const core = item.isCore !== undefined ? `\n  isCore: ${item.isCore}` : "";
      return `- name: ${item.name}\n  amount: "${item.amount}"\n  unit: ${item.unit}${core}`;
    })
    .join("\n");
  return fm.slice(0, pos) + block + "\n" + fm.slice(end);
}

function patchIngredients(fm, slug, locale) {
  let next = fm;
  const slugPatch = DH_INGREDIENT_PATCHES[slug]?.[locale];
  const allPatch = DH_INGREDIENT_PATCHES.all?.[locale];

  if (slugPatch?.replaceIngredients) {
    next = replaceYamlList(next, "ingredients", slugPatch.replaceIngredients);
    return next;
  }

  if (allPatch?.ingredientsAdd) {
    for (const item of allPatch.ingredientsAdd) {
      if (!hasItem(next, "ingredients", item.name)) {
        next = insertYamlListItems(next, "ingredients", [item]);
      }
    }
  }

  if (slugPatch?.ingredientsAdd) {
    for (const item of slugPatch.ingredientsAdd) {
      if (!hasItem(next, "ingredients", item.name)) {
        next = insertYamlListItems(next, "ingredients", [item]);
      }
    }
  }

  if (slugPatch?.add) {
    for (const item of slugPatch.add) {
      if (!hasItem(next, "seasonings", item.name)) {
        next = insertYamlListItems(next, "seasonings", [item]);
      }
    }
  }

  return next;
}

const updatedFiles = [];

for (const slug of SLUGS) {
  const zhRaw = readFileSync(join(ROOT, "src/content/recipes", `${slug}.md`), "utf8");
  const zhSteps = (zhRaw.match(/^steps:\n([\s\S]*?)\n(?:tips:|storage:)/m)?.[1] ?? "")
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .length;

  for (const locale of ["en", "ja", "ko"]) {
    const path = join(ROOT, localeDirs[locale], `${slug}.md`);
    const raw = readFileSync(path, "utf8");
    const { fm, body } = splitMarkdown(raw);
    const steps = DH_STEPS[slug][locale];
    if (steps.length !== zhSteps) {
      throw new Error(`${slug} ${locale}: step count ${steps.length} != zh ${zhSteps}`);
    }
    let nextFm = replaceStepsBlock(fm, steps, locale);
    nextFm = patchIngredients(nextFm, slug, locale);
    nextFm = nextFm.replace(/^updatedAt:.*$/m, `updatedAt: "${UPDATED}"`);
    const trimmedBody = body.trimStart();
    writeFileSync(path, `---\n${nextFm}\n---\n\n${trimmedBody}`, "utf8");
    updatedFiles.push(path);
  }
}

console.log(`Updated ${updatedFiles.length} files`);
