#!/usr/bin/env node
/**
 * Expand zh-TW steps for restaurant replica recipes (dh-*, sf-*).
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildDetailedDhSteps } from "./lib/dh-zh-steps.mjs";
import { parseRecipeContext } from "./lib/parse-recipe-fm.mjs";
import { buildDetailedSfSteps, inferSfCategorySlug } from "./lib/sf-zh-steps.mjs";

const root = process.cwd();
const recipesDir = join(root, "src/content/recipes");
const UPDATED = "2026-06-17";

function yamlStep(step) {
  const needsQuote = /[:#"'&]|^\d/.test(step) || step.includes("：");
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

function normalizeBody(body) {
  return body.replace(/^\s*---\s*\n+/, "").trimStart();
}

function buildSteps(ctx) {
  if (ctx.slug.startsWith("dh-")) {
    return buildDetailedDhSteps(ctx);
  }
  if (ctx.slug.startsWith("sf-")) {
    const categorySlug = inferSfCategorySlug(ctx.title, ctx.category, ctx.tags);
    return buildDetailedSfSteps(ctx.title, categorySlug, ctx.ingredients, ctx.seasonings);
  }
  throw new Error(`Not a restaurant replica slug: ${ctx.slug}`);
}

function patchRecipe(slug) {
  const path = join(recipesDir, `${slug}.md`);
  const raw = readFileSync(path, "utf8");
  const { fm, body } = splitMarkdown(raw);
  const ctx = parseRecipeContext(raw, slug);
  const steps = buildSteps(ctx);

  if (steps.length < 4) {
    throw new Error(`${slug}: expanded steps < 4`);
  }

  const nextFm = replaceSteps(fm, steps);
  const nextBody = normalizeBody(body);
  writeFileSync(path, `---\n${nextFm}\n---\n\n${nextBody}\n`, "utf8");

  const avg = Math.round(steps.reduce((sum, step) => sum + step.length, 0) / steps.length);
  return { slug, steps: steps.length, avg };
}

const onlyPrefix = process.argv.find((arg) => arg.startsWith("--prefix="))?.split("=")[1];
const onlySlug = process.argv.find((arg) => arg.startsWith("--slug="))?.split("=")[1];
const dryRun = process.argv.includes("--dry-run");

const allSlugs = readdirSync(recipesDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.replace(/\.md$/, ""))
  .filter((slug) => slug.startsWith("dh-") || slug.startsWith("sf-"))
  .filter((slug) => (onlyPrefix ? slug.startsWith(onlyPrefix) : true))
  .filter((slug) => (onlySlug ? slug === onlySlug : true))
  .sort();

if (dryRun) {
  console.log(`Would patch ${allSlugs.length} recipes.`);
  process.exit(0);
}

const results = [];
const errors = [];

for (const slug of allSlugs) {
  try {
    results.push(patchRecipe(slug));
    console.log(`OK ${slug} (${results.at(-1).steps} steps, avg ${results.at(-1).avg} chars)`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push({ slug, message });
    console.error(`FAIL ${slug}: ${message}`);
  }
}

console.log(`\nPatched ${results.length} / ${allSlugs.length}; errors ${errors.length}`);
