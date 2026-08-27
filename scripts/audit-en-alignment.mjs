#!/usr/bin/env node
/**
 * Audit English recipes against Traditional Chinese originals to identify inconsistencies.
 * Covers metadata, step counts, ingredients, seasonings, and leftover "Prep:" prefixes.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parseRecipeContext } from "./lib/parse-recipe-fm.mjs";
import { parseFrontmatter, parseScalar } from "./recipe-review-lib.mjs";

const root = process.cwd();
const zhDir = join(root, "src/content/recipes");
const enDir = join(root, "src/content/recipes-en");

function auditAll() {
  const zhFiles = readdirSync(zhDir).filter((f) => f.endsWith(".md")).sort();
  const report = [];

  for (const file of zhFiles) {
    const slug = file.replace(/\.md$/, "");
    const zhPath = join(zhDir, file);
    const enPath = join(enDir, file);

    if (!existsSync(enPath)) {
      report.push({
        slug,
        status: "Missing",
        issues: ["English translation file does not exist"]
      });
      continue;
    }

    const zhRaw = readFileSync(zhPath, "utf8");
    const enRaw = readFileSync(enPath, "utf8");

    const zhCtx = parseRecipeContext(zhRaw, slug);
    const enCtx = parseRecipeContext(enRaw, slug);

    // Parse additional frontmatter fields not covered in parseRecipeContext
    const zhFm = parseFrontmatter(zhRaw);
    const enFm = parseFrontmatter(enRaw);
    const zhServings = parseScalar(zhFm, "servings");
    const enServings = parseScalar(enFm, "servings");
    const zhDifficulty = parseScalar(zhFm, "difficulty");
    const enDifficulty = parseScalar(enFm, "difficulty");

    const issues = [];

    // 1. Metadata check
    if (zhCtx.prepTime !== enCtx.prepTime) {
      issues.push(`prepTime mismatch: ZH is ${zhCtx.prepTime}, EN is ${enCtx.prepTime}`);
    }
    if (zhCtx.cookTime !== enCtx.cookTime) {
      issues.push(`cookTime mismatch: ZH is ${zhCtx.cookTime}, EN is ${enCtx.cookTime}`);
    }
    if (zhCtx.totalTime !== enCtx.totalTime) {
      issues.push(`totalTime mismatch: ZH is ${zhCtx.totalTime}, EN is ${enCtx.totalTime}`);
    }
    if (zhServings !== enServings) {
      issues.push(`servings mismatch: ZH is ${zhServings}, EN is ${enServings}`);
    }

    // 2. Ingredients & Seasonings count check
    if (zhCtx.ingredients.length !== enCtx.ingredients.length) {
      issues.push(`ingredients count mismatch: ZH has ${zhCtx.ingredients.length}, EN has ${enCtx.ingredients.length}`);
    }
    if (zhCtx.seasonings.length !== enCtx.seasonings.length) {
      issues.push(`seasonings count mismatch: ZH has ${zhCtx.seasonings.length}, EN has ${enCtx.seasonings.length}`);
    }

    // 3. Step counts check
    if (zhCtx.steps.length !== enCtx.steps.length) {
      issues.push(`steps count mismatch: ZH has ${zhCtx.steps.length}, EN has ${enCtx.steps.length}`);
    }

    // 4. Quality checks on EN steps
    enCtx.steps.forEach((step, idx) => {
      // Check for leftover "Prep:" or "Prep" prefixes (often with Chinese remnants like "Prep:另備")
      if (/^prep:?/i.test(step)) {
        issues.push(`Step ${idx + 1} has Prep prefix: "${step}"`);
      }
      // Check for any Chinese characters in EN steps
      if (/[\u4e00-\u9fa5]/.test(step)) {
        issues.push(`Step ${idx + 1} contains Chinese characters: "${step}"`);
      }
      // Check for padding/placeholder steps
      if (step.includes("Taste and adjust seasoning") && !zhCtx.steps[idx]?.includes("試味道") && !zhCtx.steps[idx]?.includes("調整") && !zhCtx.steps[idx]?.includes("調味")) {
        issues.push(`Step ${idx + 1} seems to be a generic placeholder: "${step}"`);
      }
    });

    // 5. Check if ingredient list contains Chinese characters
    enCtx.ingredients.forEach((ing, idx) => {
      if (/[\u4e00-\u9fa5]/.test(ing.name)) {
        issues.push(`Ingredient ${idx + 1} name contains Chinese: "${ing.name}"`);
      }
    });

    enCtx.seasonings.forEach((seas, idx) => {
      if (/[\u4e00-\u9fa5]/.test(seas.name)) {
        issues.push(`Seasoning ${idx + 1} name contains Chinese: "${seas.name}"`);
      }
    });

    if (issues.length > 0) {
      report.push({
        slug,
        status: "Fail",
        issues
      });
    } else {
      report.push({
        slug,
        status: "Pass",
        issues: []
      });
    }
  }

  return report;
}

const report = auditAll();
const fails = report.filter((r) => r.status === "Fail");
const missing = report.filter((r) => r.status === "Missing");

const outputPath = join(root, "docs/reviews/recipe-audit/en-audit-report.json");
writeFileSync(outputPath, JSON.stringify({
  total: report.length,
  passCount: report.length - fails.length - missing.length,
  failCount: fails.length,
  missingCount: missing.length,
  failures: fails,
  missing
}, null, 2), "utf8");

console.log(`=== Audit Completed ===`);
console.log(`Total checked: ${report.length}`);
console.log(`Pass: ${report.length - fails.length - missing.length}`);
console.log(`Fail: ${fails.length}`);
console.log(`Missing: ${missing.length}`);
console.log(`Report written to ${outputPath}`);

