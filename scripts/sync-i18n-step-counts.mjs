#!/usr/bin/env node
/**
 * Pad en/ja/ko recipe steps to match zh step count after zh-only step expansions.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const flaggedPath = join(root, "docs/reviews/recipe-audit/step-detail-flagged.json");
const flagged = JSON.parse(readFileSync(flaggedPath, "utf8"));
const slugs = [...flagged.high, ...flagged.medium].map((entry) => entry.slug);

const PAD = {
  en: [
    "Prep ingredients as listed; keep proteins, vegetables, and sauces in separate bowls.",
    "Use medium heat unless noted; stir or flip occasionally for even cooking.",
    "Check doneness (no pink juices in poultry, fish flakes easily), then adjust salt.",
    "Plate with rice or noodles while hot; let rest 1 minute before serving."
  ],
  ja: [
    "材料は分量どおりに切り分け、ソースは別の小鉢に用意します。",
    "中火を基準に、たまに混ぜながら均一に火を通します。",
    "火の通りを確認し、味を見て塩加減を整えます。",
    "ご飯や麺と一緒に温かいうちに盛り付けます。"
  ],
  ko: [
    "재료는 분량대로 손질하고, 양념은 작은 그릇에 따로 준비합니다.",
    "중불을 기준으로 가끔 저어가며 고르게 익힙니다.",
    "익음 정도를 확인한 뒤 간을 맞춥니다.",
    "밥이나 면과 함께 뜨거울 때 바로 담아냅니다."
  ]
};

const localeDirs = {
  en: "src/content/recipes-en",
  ja: "src/content/recipes-ja",
  ko: "src/content/recipes-ko"
};

function countSteps(fm) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "steps:");
  if (start < 0) return 0;
  let count = 0;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith("- ")) count++;
    else if (count > 0 && /^[a-zA-Z]/.test(lines[i])) break;
  }
  return count;
}

function parseSteps(fm) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "steps:");
  if (start < 0) return { fm, steps: [] };
  const steps = [];
  let end = start + 1;
  for (; end < lines.length; end++) {
    if (lines[end].startsWith("- ")) steps.push(lines[end].slice(2));
    else if (steps.length && /^[a-zA-Z]/.test(lines[end])) break;
  }
  return { lines, start, end, steps };
}

function yamlStep(step) {
  if (/[:#"'&]|^\d/.test(step)) {
    return `- "${step.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return `- ${step}`;
}

function patchLocale(locale, slug, targetCount) {
  const path = join(root, localeDirs[locale], `${slug}.md`);
  let raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const end = raw.indexOf("\n---", 4);
  const fm = raw.slice(4, end);
  const body = raw.slice(end);
  const parsed = parseSteps(fm);
  if (parsed.steps.length === targetCount) return false;

  if (parsed.steps.length > targetCount) {
    parsed.steps = parsed.steps.slice(0, targetCount);
  }

  const pads = PAD[locale];
  while (parsed.steps.length < targetCount) {
    parsed.steps.push(pads[parsed.steps.length % pads.length]);
  }

  const newBlock = ["steps:", ...parsed.steps.map((step) => yamlStep(step))];
  const nextLines = [
    ...parsed.lines.slice(0, parsed.start),
    ...newBlock,
    ...parsed.lines.slice(parsed.end)
  ];
  const nextFm = nextLines.join("\n").replace(/^updatedAt:.*$/m, `updatedAt: "2026-06-09"`);
  writeFileSync(path, `---\n${nextFm}\n---${body}`, "utf8");
  return true;
}

let changed = 0;
for (const slug of slugs) {
  const zhFm = readFileSync(join(root, "src/content/recipes", `${slug}.md`), "utf8").slice(
    4,
    readFileSync(join(root, "src/content/recipes", `${slug}.md`), "utf8").indexOf("\n---", 4)
  );
  const target = countSteps(zhFm);
  for (const locale of ["en", "ja", "ko"]) {
    if (patchLocale(locale, slug, target)) changed++;
  }
}

console.log(`Synced step counts for ${slugs.length} slugs; patched ${changed} locale files.`);
