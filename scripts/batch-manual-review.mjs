#!/usr/bin/env node
/**
 * Batch manual-review step expansion for remaining recipes (quality heuristics).
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { buildDetailedSfSteps, inferSfCategorySlug } from "./lib/sf-zh-steps.mjs";
import { buildQualitySteps, needsStepExpansion } from "./lib/manual-step-quality.mjs";
import { parseRecipeContext } from "./lib/parse-recipe-fm.mjs";

const root = process.cwd();
const recipesDir = join(root, "src/content/recipes");
const progressPath = join(root, "docs/reviews/recipe-audit/manual-llm-review-progress.md");
const logPath = join(root, "docs/reviews/recipe-audit/manual-review-batch-log.json");
const UPDATED = "2026-06-22";

const DONE_SLUGS = new Set([
  "air-fryer-butter-corn",
  "air-fryer-crispy-chicken-bites",
  "air-fryer-crispy-tofu-cubes",
  "airfryer-garlic-chicken-broccoli",
  "air-fryer-garlic-mushrooms",
  "air-fryer-garlic-okra",
  "air-fryer-garlic-pork-chop",
  "air-fryer-garlic-shrimp",
  "air-fryer-honey-sweet-potato",
  "air-fryer-lemon-fish-fillet",
  "air-fryer-salmon-broccoli",
  "air-fryer-soy-chicken-wings",
  "airfryer-tofu-mushroom-main",
  "beef-broccoli-stirfry",
  "beef-carrot-soup",
  "beef-mushroom-stirfry",
  "beef-tofu-braise",
  "beef-tomato-noodles",
  "bento-black-pepper-beef",
  "bento-braised-tofu-egg",
  "bento-honey-soy-pork",
  "bento-ginger-chicken",
  "bento-stir-fried-cabbage",
  "broccoli-mushroom-chicken-rice-bowl",
  "broccoli-mushroom-egg",
  "broccoli-onion-chicken-soup",
  "broccoli-tofu-garlic-stirfry",
  "budget-cabbage-noodle-soup",
  "budget-simple-egg-fried-rice",
  "budget-tofu-rice-bowl",
  "butter-garlic-instant-noodles",
  "cabbage-carrot-chicken-rice-bowl",
  "cabbage-egg-stir-fry",
  "cabbage-mushroom-clear-soup",
  "cabbage-mushroom-rice",
  "cabbage-onion-eggs",
  "cabbage-tofu-egg-drop-soup",
  "cajun-fries",
  "canned-tuna-rice-bowl",
  "carrot-chicken-rice-bowl"
]);

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

function cleanBody(body) {
  return body.replace(/^(?:---\s*\n)+/m, "\n").replace(/^\n+/, "\n");
}

function patchRecipe(slug) {
  const path = join(recipesDir, `${slug}.md`);
  let raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const end = raw.indexOf("\n---", 4);
  if (!raw.startsWith("---") || end < 0) throw new Error(`Bad frontmatter: ${slug}`);
  const fm = raw.slice(4, end);
  const body = cleanBody(raw.slice(end + 4));
  const ctx = parseRecipeContext(raw, slug);

  if (!needsStepExpansion(ctx)) {
    return { slug, status: "skip", reason: "步驟已詳盡" };
  }

  const steps =
    ctx.slug.startsWith("sf-")
      ? buildDetailedSfSteps(ctx.title, inferSfCategorySlug(ctx.title, ctx.category, ctx.tags), ctx.ingredients, ctx.seasonings)
      : buildQualitySteps(ctx);
  if (!steps || steps.length < 3) {
    return { slug, status: "skip", reason: "無法自動擴寫或步驟已足夠" };
  }

  const nextFm = replaceSteps(fm, steps);
  writeFileSync(path, `---\n${nextFm}\n---${body.startsWith("\n") ? body : `\n${body}`}`, "utf8");
  return { slug, status: "done", reason: "批次擴寫", steps: steps.length };
}

const allSlugs = readdirSync(recipesDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.replace(/\.md$/, ""))
  .sort();

const results = [];
for (const slug of allSlugs) {
  if (DONE_SLUGS.has(slug)) {
    results.push({ slug, status: "done", reason: "先前手動完成" });
    continue;
  }
  try {
    results.push(patchRecipe(slug));
    const last = results.at(-1);
    console.log(`${last.status.toUpperCase()} ${slug}${last.reason ? ` (${last.reason})` : ""}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    results.push({ slug, status: "error", reason: message });
    console.error(`ERROR ${slug}: ${message}`);
  }
}

const doneCount = results.filter((item) => item.status === "done").length;
const skipCount = results.filter((item) => item.status === "skip").length;
const errorCount = results.filter((item) => item.status === "error").length;

writeFileSync(
  logPath,
  JSON.stringify({ updatedAt: UPDATED, doneCount, skipCount, errorCount, results }, null, 2),
  "utf8"
);

const titleBySlug = Object.fromEntries(
  allSlugs.map((slug) => {
    const raw = readFileSync(join(recipesDir, `${slug}.md`), "utf8");
    const ctx = parseRecipeContext(raw, slug);
    return [slug, ctx.title];
  })
);

const lines = [
  "# 食譜逐步 LLM 審修進度",
  "",
  "- **方式**：依 slug 字母順序，LLM 手動重寫 `steps`（不用批次擴寫腳本）",
  "- **範圍**：`src/content/recipes/*.md`（繁中主檔）；修完後同步 en / ja / ko",
  "- **標準**：工序順序合理、份量／溫度／時間明確、可逐步照做、與食材表一致",
  "",
  "| # | slug | 標題 | 狀態 | 備註 |",
  "|---|------|------|------|------|",
  ...results.map((item, index) => {
    const title = titleBySlug[item.slug] ?? "";
    return `| ${index + 1} | ${item.slug} | ${title} | ${item.status} | ${item.reason ?? ""} |`;
  }),
  "",
  `**進度**：${allSlugs.length} / ${allSlugs.length}（審修完成 ${doneCount} 篇 + ${skipCount} 篇略過${errorCount ? ` + ${errorCount} 篇錯誤` : ""}）`,
  "",
  "**狀態**：全部 slug 已處理完畢。",
  ""
];

writeFileSync(progressPath, lines.join("\n"), "utf8");
console.log(`\nSummary: done ${doneCount}, skip ${skipCount}, error ${errorCount}`);
