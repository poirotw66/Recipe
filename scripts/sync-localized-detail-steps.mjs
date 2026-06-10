#!/usr/bin/env node
/**
 * Replace en/ja/ko steps with localized detail matching zh routing (not generic padding).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { alignLocaleStepsToZh } from "./lib/align-locale-steps.mjs";
import { UPDATED } from "./lib/locale-step-expansion.mjs";
import { parseRecipeContext } from "./lib/parse-recipe-fm.mjs";
import { readdirSync } from "node:fs";

const root = process.cwd();
const flaggedPath = join(root, "docs/reviews/recipe-audit/step-detail-flagged.json");

const localeDirs = {
  en: "src/content/recipes-en",
  ja: "src/content/recipes-ja",
  ko: "src/content/recipes-ko"
};

function yamlStep(step) {
  const needsQuote = /[:#"'&]|^\d/.test(step) || step.includes("：");
  if (needsQuote) {
    return `- "${step.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return `- ${step}`;
}

function replaceSteps(fm, steps) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "steps:");
  if (start < 0) throw new Error("Missing steps:");
  let end = start + 1;
  while (end < lines.length && lines[end].startsWith("- ")) end++;
  const block = ["steps:", ...steps.map((step) => yamlStep(step))];
  return [...lines.slice(0, start), ...block, ...lines.slice(end)]
    .join("\n")
    .replace(/^updatedAt:.*$/m, `updatedAt: "${UPDATED}"`);
}

function countZhSteps(slug) {
  const raw = readFileSync(join(root, "src/content/recipes", `${slug}.md`), "utf8");
  const ctx = parseRecipeContext(raw);
  return ctx.steps.length;
}

function splitMarkdown(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("Invalid frontmatter");
  return { fm: match[1], body: match[2] };
}

function patch(locale, slug) {
  const path = join(root, localeDirs[locale], `${slug}.md`);
  const raw = readFileSync(path, "utf8");
  const { fm, body } = splitMarkdown(raw);
  const zhRaw = readFileSync(join(root, "src/content/recipes", `${slug}.md`), "utf8");
  const zhCtx = parseRecipeContext(zhRaw, slug);
  const locCtx = parseRecipeContext(raw, slug);
  const steps = alignLocaleStepsToZh(zhCtx.steps, locCtx.steps, locale);

  const nextFm = replaceSteps(fm, steps);
  const trimmedBody = body.trimStart();
  writeFileSync(path, `---\n${nextFm}\n---\n\n${trimmedBody}`, "utf8");
  return steps.length;
}

const flagged = JSON.parse(readFileSync(flaggedPath, "utf8"));
const flaggedSlugs = [...flagged.high, ...flagged.medium].map((entry) => entry.slug);
const allZhSlugs = readdirSync(join(root, "src/content/recipes"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""))
  .sort();
const onlySlug = process.argv.find((a) => a.startsWith("--slug="))?.split("=")[1];
const useAll = process.argv.includes("--all");
const slugs = useAll ? allZhSlugs : flaggedSlugs;
const targets = onlySlug ? slugs.filter((s) => s === onlySlug) : slugs;

let count = 0;
for (const slug of targets) {
  for (const locale of ["en", "ja", "ko"]) {
    patch(locale, slug);
    count++;
  }
  console.log(`OK ${slug}`);
}

console.log(`Updated steps in ${count} locale files (${targets.length} slugs).`);
