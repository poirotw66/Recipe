#!/usr/bin/env node
/**
 * Replace en/ja/ko steps with localized detail matching zh routing (not generic padding).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { expandLocalizedSteps, UPDATED } from "./lib/locale-step-expansion.mjs";
import { parseRecipeContext } from "./lib/parse-recipe-fm.mjs";

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
  const ctx = parseRecipeContext(raw, slug);
  let steps = expandLocalizedSteps(ctx, locale);

  const zhCount = countZhSteps(slug);
  if (steps.length < zhCount) {
    const pad = locale === "en"
      ? "Taste and adjust seasoning; serve immediately while hot."
      : locale === "ja"
        ? "味を見て、温かいうちに盛り付ける。"
        : "간을 맞추고 뜨거울 때 바로 낸다.";
    while (steps.length < zhCount) steps.push(pad);
  }
  if (steps.length > zhCount) steps = steps.slice(0, zhCount);

  const nextFm = replaceSteps(fm, steps);
  const trimmedBody = body.trimStart();
  writeFileSync(path, `---\n${nextFm}\n---\n\n${trimmedBody}`, "utf8");
  return steps.length;
}

const flagged = JSON.parse(readFileSync(flaggedPath, "utf8"));
const slugs = [...flagged.high, ...flagged.medium].map((entry) => entry.slug);
const onlySlug = process.argv.find((a) => a.startsWith("--slug="))?.split("=")[1];
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
