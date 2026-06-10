#!/usr/bin/env node
/**
 * Expand recipe steps per docs/reviews/recipe-audit/step-detail-flagged.json (high → medium).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { expandHomeSteps } from "./lib/home-step-expansion.mjs";
import { parseRecipeContext } from "./lib/parse-recipe-fm.mjs";
import { buildDetailedSfSteps, inferSfCategorySlug } from "./lib/sf-zh-steps.mjs";

const root = process.cwd();
const recipesDir = join(root, "src/content/recipes");
const flaggedPath = join(root, "docs/reviews/recipe-audit/step-detail-flagged.json");
const UPDATED = "2026-06-09";

const flagged = JSON.parse(readFileSync(flaggedPath, "utf8"));
const repairOrder = [...flagged.high, ...flagged.medium].map((entry) => entry.slug);

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

function patchRecipe(slug) {
  const path = join(recipesDir, `${slug}.md`);
  let raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const end = raw.indexOf("\n---", 4);
  if (!raw.startsWith("---") || end < 0) throw new Error(`Bad frontmatter: ${slug}`);
  const fm = raw.slice(4, end);
  const body = raw.slice(end + 4);
  const ctx = parseRecipeContext(raw);
  let steps;

  if (slug.startsWith("sf-")) {
    const categorySlug = inferSfCategorySlug(ctx.title, ctx.category, ctx.tags);
    steps = buildDetailedSfSteps(ctx.title, categorySlug, ctx.ingredients, ctx.seasonings);
  } else {
    steps = expandHomeSteps(ctx);
  }

  if (steps.length < 3) {
    throw new Error(`${slug}: expanded steps < 3`);
  }

  const nextFm = replaceSteps(fm, steps);
  writeFileSync(path, `---\n${nextFm}\n---${body}`, "utf8");
  const avg = steps.reduce((sum, step) => sum + step.length, 0) / steps.length;
  return { slug, steps: steps.length, avg: Math.round(avg) };
}

function writeRepairOrder() {
  const lines = [
    "# 步驟詳盡度修稿順序",
    "",
    `- **產生**：${UPDATED}`,
    `- **來源**：\`step-detail-flagged.json\`（先 high ${flagged.high.length} 篇，再 medium ${flagged.medium.length} 篇）`,
    `- **套用**：\`node scripts/apply-step-detail-fixes.mjs\``,
    "",
    "## 順序",
    ""
  ];
  repairOrder.forEach((slug, index) => {
    const tier = index < flagged.high.length ? "high" : "medium";
    lines.push(`${index + 1}. \`${slug}\`（${tier}）`);
  });
  writeFileSync(join(root, "docs/reviews/recipe-audit/step-detail-repair-order.md"), `${lines.join("\n")}\n`, "utf8");
}

const dryRun = process.argv.includes("--dry-run");
const onlySlug = process.argv.find((arg) => arg.startsWith("--slug="))?.split("=")[1];
const targets = onlySlug ? repairOrder.filter((slug) => slug === onlySlug) : repairOrder;

if (dryRun) {
  console.log(`Would patch ${targets.length} recipes.`);
  process.exit(0);
}

writeRepairOrder();
const results = [];
const errors = [];

for (const slug of targets) {
  try {
    results.push(patchRecipe(slug));
    console.log(`OK ${slug}`);
  } catch (error) {
    errors.push({ slug, message: error instanceof Error ? error.message : String(error) });
    console.error(`FAIL ${slug}: ${errors.at(-1).message}`);
  }
}

writeFileSync(
  join(root, "docs/reviews/recipe-audit/step-detail-apply-log.json"),
  JSON.stringify({ updatedAt: UPDATED, ok: results, errors }, null, 2)
);

console.log(`Patched ${results.length} / ${targets.length}; errors ${errors.length}`);
