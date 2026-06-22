#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { buildQualitySteps, finalizeSteps } from "./lib/manual-step-quality.mjs";
import { parseRecipeContext } from "./lib/parse-recipe-fm.mjs";
import { buildDetailedSfSteps, inferSfCategorySlug } from "./lib/sf-zh-steps.mjs";

const root = process.cwd();
const recipesDir = join(root, "src/content/recipes");
const reportsDir = join(root, "docs/reviews/recipe-audit/reports");
const UPDATED = "2026-06-22";

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
  const next = [...lines.slice(0, start), ...block, ...lines.slice(end)].join("\n");
  return next.replace(/^updatedAt:.*$/m, `updatedAt: "${UPDATED}"`);
}

function patch(slug) {
  const path = join(recipesDir, `${slug}.md`);
  let raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const end = raw.indexOf("\n---", 4);
  const fm = raw.slice(4, end);
  const body = raw.slice(end + 4).replace(/^(?:---\s*\n)+/m, "\n");
  const ctx = parseRecipeContext(raw, slug);
  const steps = ctx.slug.startsWith("sf-")
    ? finalizeSteps(ctx, buildDetailedSfSteps(ctx.title, inferSfCategorySlug(ctx.title, ctx.category, ctx.tags), ctx.ingredients, ctx.seasonings))
    : buildQualitySteps(ctx);
  if (!steps?.length) throw new Error("No steps generated");
  const nextFm = replaceSteps(fm, steps);
  writeFileSync(path, `---\n${nextFm}\n---${body.startsWith("\n") ? body : `\n${body}`}`, "utf8");
}

const warningSlugs = readdirSync(reportsDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => {
    const report = JSON.parse(readFileSync(join(reportsDir, file), "utf8"));
    return report.status === "Warning" ? report.slug : null;
  })
  .filter(Boolean);

let ok = 0;
for (const slug of warningSlugs) {
  try {
    patch(slug);
    console.log(`OK ${slug}`);
    ok++;
  } catch (error) {
    console.error(`FAIL ${slug}: ${error instanceof Error ? error.message : error}`);
  }
}
console.log(`Fixed ${ok}/${warningSlugs.length}`);
