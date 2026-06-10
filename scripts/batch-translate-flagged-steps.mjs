#!/usr/bin/env node
/**
 * Batch-translate zh steps → en/ja/ko for slugs in step-detail-flagged.json.
 * Resumes from docs/reviews/recipe-audit/step-translation-progress.json
 *
 *   node scripts/batch-translate-flagged-steps.mjs
 *   node scripts/batch-translate-flagged-steps.mjs --limit 5
 *   node scripts/batch-translate-flagged-steps.mjs --slug carrot-chicken-rice-bowl
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const flaggedPath = join(root, "docs/reviews/recipe-audit/step-detail-flagged.json");
const progressPath = join(root, "docs/reviews/recipe-audit/step-translation-progress.json");
const DELAY_MS = Number(process.env.GEMINI_BATCH_DELAY_MS ?? "1200");

const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseArgs() {
  let limit = Infinity;
  let onlySlug = "";
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--limit") limit = Number(process.argv[++i]);
    else if (process.argv[i] === "--slug") onlySlug = process.argv[++i];
  }
  return { limit, onlySlug };
}

async function main() {
  if (!apiKey) {
    console.error("Set GEMINI_API_KEY or GOOGLE_API_KEY");
    process.exit(1);
  }

  const { patchSlug, TARGETS } = await import("./gemini-translate-recipe-steps.mjs");

  const flagged = JSON.parse(readFileSync(flaggedPath, "utf8"));
  let slugs = [...flagged.high, ...flagged.medium].map((e) => e.slug);
  const { limit, onlySlug } = parseArgs();
  if (onlySlug) slugs = slugs.filter((s) => s === onlySlug);

  const progress = existsSync(progressPath)
    ? JSON.parse(readFileSync(progressPath, "utf8"))
    : { completed: {} };

  let done = 0;
  for (const slug of slugs) {
    if (done >= limit) break;
    if (progress.completed[slug]?.en && progress.completed[slug]?.ja && progress.completed[slug]?.ko) {
      continue;
    }
    progress.completed[slug] = progress.completed[slug] ?? {};
    for (const loc of Object.keys(TARGETS)) {
      if (progress.completed[slug][loc]) continue;
      try {
        await patchSlug(slug, loc);
        progress.completed[slug][loc] = new Date().toISOString().slice(0, 10);
        writeFileSync(progressPath, JSON.stringify(progress, null, 2));
        console.log(`OK ${slug} ${loc}`);
        await sleep(DELAY_MS);
      } catch (error) {
        console.error(`FAIL ${slug} ${loc}:`, error instanceof Error ? error.message : error);
        writeFileSync(progressPath, JSON.stringify(progress, null, 2));
        process.exit(1);
      }
    }
    done++;
  }

  const total = slugs.length;
  const fully = slugs.filter(
    (s) => progress.completed[s]?.en && progress.completed[s]?.ja && progress.completed[s]?.ko
  ).length;
  console.log(`Progress: ${fully}/${total} slugs fully translated (en+ja+ko).`);
}

main();
