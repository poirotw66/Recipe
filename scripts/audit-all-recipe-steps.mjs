#!/usr/bin/env node
/**
 * Audit zh-TW recipe step detail across the full catalog.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseRecipeContext } from "./lib/parse-recipe-fm.mjs";

const root = process.cwd();
const recipesDir = join(root, "src/content/recipes");
const THIN_AVG = 40;
const GOOD_AVG = 55;

function bucket(slug) {
  if (slug.startsWith("dh-")) return "dubu-house";
  if (slug.startsWith("sf-")) return "second-floor";
  return "home";
}

const rows = [];
for (const file of readdirSync(recipesDir).filter((f) => f.endsWith(".md")).sort()) {
  const slug = file.replace(/\.md$/, "");
  const raw = readFileSync(join(recipesDir, file), "utf8");
  const ctx = parseRecipeContext(raw, slug);
  const avg =
    ctx.steps.length === 0
      ? 0
      : Math.round(ctx.steps.reduce((sum, step) => sum + step.length, 0) / ctx.steps.length);
  rows.push({
    slug,
    title: ctx.title,
    group: bucket(slug),
    steps: ctx.steps.length,
    avg,
    category: ctx.category
  });
}

const summary = {
  total: rows.length,
  byGroup: {},
  thin: rows.filter((r) => r.avg < THIN_AVG),
  medium: rows.filter((r) => r.avg >= THIN_AVG && r.avg < GOOD_AVG),
  good: rows.filter((r) => r.avg >= GOOD_AVG),
  lowStepCount: rows.filter((r) => r.steps < 4)
};

for (const group of ["home", "dubu-house", "second-floor"]) {
  const items = rows.filter((r) => r.group === group);
  const avgStepLen =
    items.length === 0
      ? 0
      : Math.round(items.reduce((sum, r) => sum + r.avg, 0) / items.length);
  summary.byGroup[group] = {
    count: items.length,
    avgStepChars: avgStepLen,
    thin: items.filter((r) => r.avg < THIN_AVG).length,
    good: items.filter((r) => r.avg >= GOOD_AVG).length
  };
}

const outPath = join(root, "docs/reviews/recipe-audit/full-catalog-step-audit.json");
writeFileSync(
  outPath,
  JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), summary, rows }, null, 2),
  "utf8"
);

console.log(JSON.stringify(summary, null, 2));
console.log(`\nWrote ${outPath}`);
