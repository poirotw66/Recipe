#!/usr/bin/env node
/**
 * Replace en/ja/ko recipe steps with translations of current zh-TW steps (same count & detail).
 * Requires GEMINI_API_KEY or GOOGLE_API_KEY.
 *
 *   node scripts/gemini-translate-recipe-steps.mjs --slug carrot-chicken-rice-bowl --all
 *   node scripts/gemini-translate-recipe-steps.mjs --slug carrot-chicken-rice-bowl --locale en
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseListSection, parseFrontmatter } from "./recipe-review-lib.mjs";

const root = process.cwd();
const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

const TARGETS = {
  en: { folder: "recipes-en", label: "English", code: "en" },
  ja: { folder: "recipes-ja", label: "Japanese", code: "ja" },
  ko: { folder: "recipes-ko", label: "Korean", code: "ko" }
};

const PAD_MARKERS = [
  "Prep ingredients as listed",
  "Use medium heat unless noted",
  "Check doneness (no pink juices",
  "Plate with rice or noodles while hot",
  "材料は分量どおりに切り分け",
  "中火を基準に、たまに混ぜながら",
  "火の通りを確認し、味を見て",
  "ご飯や麺と一緒に温かいうちに",
  "재료는 분량대로 손질하고",
  "중불을 기준으로 가끔 저어가며",
  "익음 정도를 확인한 뒤 간을 맞춥니다",
  "밥이나 면과 함께 뜨거울 때"
];

function parseArgs(argv) {
  let slug = "";
  let locale = "";
  let all = false;
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--slug") slug = argv[++i];
    else if (argv[i] === "--locale") locale = argv[++i];
    else if (argv[i] === "--all") all = true;
  }
  if (!slug) {
    console.error("Missing --slug");
    process.exit(1);
  }
  if (!all && !locale) {
    console.error("Provide --locale en|ja|ko or --all");
    process.exit(1);
  }
  return { slug, locale, all };
}

function yamlStep(step) {
  const needsQuote = /[:#"'&]|^\d/.test(step) || step.includes("：");
  if (needsQuote) {
    return `- "${step.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return `- ${step}`;
}

function replaceStepsInFm(fm, steps) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "steps:");
  if (start < 0) throw new Error("Missing steps:");
  let end = start + 1;
  while (end < lines.length && lines[end].startsWith("- ")) end++;
  const block = ["steps:", ...steps.map((step) => yamlStep(step))];
  const next = [...lines.slice(0, start), ...block, ...lines.slice(end)].join("\n");
  return next.replace(/^updatedAt:.*$/m, `updatedAt: "2026-06-09"`);
}

function readLocaleFile(localeKey, slug) {
  const path = join(root, "src/content", TARGETS[localeKey].folder, `${slug}.md`);
  return readFileSync(path, "utf8").replace(/\r\n/g, "\n");
}

async function translateSteps(zhSteps, localeKey, slug) {
  const target = TARGETS[localeKey];
  const localeMd = readLocaleFile(localeKey, slug);
  const localeFm = parseFrontmatter(localeMd);
  const title = localeFm.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? slug;

  const prompt = `Translate these Traditional Chinese (Taiwan) recipe steps into ${target.label} for Bloom Kitchen.
Rules:
- Output ONLY a JSON array of strings (no markdown, no code fences).
- Exactly ${zhSteps.length} strings, same order as source.
- Cookbook style: include heat level, timing, and doneness cues like the source.
- Use ingredient names consistent with this recipe title: ${title}
- Never use Simplified Chinese.
- Keep measurements (Tbsp, tsp, ml, °C) as in source when present.

Source steps (zh-TW):
${JSON.stringify(zhSteps, null, 2)}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  });
  if (!res.ok) {
    throw new Error(`Gemini API ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error("Empty Gemini response");
  const steps = JSON.parse(text);
  if (!Array.isArray(steps) || steps.length !== zhSteps.length) {
    throw new Error(`Expected ${zhSteps.length} steps, got ${steps?.length}`);
  }
  return steps.map((s) => String(s).trim());
}

async function patchSlug(slug, localeKey) {
  const zhRaw = readFileSync(join(root, "src/content/recipes", `${slug}.md`), "utf8");
  const zhFm = parseFrontmatter(zhRaw);
  const zhSteps = parseListSection(zhFm, "steps");
  if (zhSteps.length < 3) throw new Error("zh steps < 3");

  const translated = await translateSteps(zhSteps, localeKey, slug);
  const localeRaw = readLocaleFile(localeKey, slug);
  const end = localeRaw.indexOf("\n---", 4);
  const fm = localeRaw.slice(4, end);
  const body = localeRaw.slice(end);
  const nextFm = replaceStepsInFm(fm, translated);
  const outPath = join(root, "src/content", TARGETS[localeKey].folder, `${slug}.md`);
  writeFileSync(outPath, `---\n${nextFm}\n---${body}`, "utf8");
  return translated.length;
}

async function main() {
  if (!apiKey) {
    console.error("Set GEMINI_API_KEY or GOOGLE_API_KEY");
    process.exit(1);
  }
  const { slug, locale, all } = parseArgs(process.argv);
  const locales = all ? Object.keys(TARGETS) : [locale];
  for (const loc of locales) {
    if (!TARGETS[loc]) {
      console.error(`Unknown locale: ${loc}`);
      process.exit(1);
    }
    console.log(`Steps ${slug} → ${loc} (${MODEL})…`);
    const n = await patchSlug(slug, loc);
    console.log(`Wrote ${n} steps`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export { PAD_MARKERS, patchSlug, TARGETS };
