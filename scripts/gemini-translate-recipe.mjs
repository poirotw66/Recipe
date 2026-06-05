#!/usr/bin/env node
/**
 * Spec-018: translate one zh-TW recipe to en/ja/ko via Gemini Flash (latest).
 * Requires GEMINI_API_KEY or GOOGLE_API_KEY.
 *
 * Usage:
 *   node scripts/gemini-translate-recipe.mjs --slug tomato-egg-rice --locale en
 *   node scripts/gemini-translate-recipe.mjs --slug tomato-egg-rice --all
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

const TARGETS = {
  en: { folder: "recipes-en", label: "English", code: "en" },
  ja: { folder: "recipes-ja", label: "Japanese", code: "ja" },
  ko: { folder: "recipes-ko", label: "Korean", code: "ko" }
};

const systemPrefix = (target) => `You are a professional recipe localizer for Bloom Kitchen (Taiwanese home cooking).
Source language: Traditional Chinese (Taiwan). Target: ${target.code}.
Rules:
- Output valid recipe frontmatter YAML matching the project schema; use English field keys only in YAML.
- Keep recipeId and slug identical to the source slug.
- Do not change numeric times, servings, or ingredient amounts; localize unit words only when appropriate.
- steps: same count and order as source; natural, cookbook-style target language.
- difficulty: map to target locale (en: Easy/Medium/Advanced; ja: かんたん/普通/むずかしい; ko: 쉬움/보통/어려움).
- category: localize display name only.
- Never use Simplified Chinese characters.
- No HTML in markdown body unless source had none (prefer plain markdown lists).
- Output ONLY the markdown file content (YAML frontmatter + optional body), no code fences.`;

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

async function callGemini(slug, targetKey) {
  const target = TARGETS[targetKey];
  const sourcePath = join(root, "src/content/recipes", `${slug}.md`);
  const source = readFileSync(sourcePath, "utf8");
  const userPrompt = `Translate this Traditional Chinese recipe markdown into ${target.label} for locale ${target.code}.

Shared across locales (copy exactly from source): coverImage, prepTime, cookTime, totalTime, servings, recipeId, publishedAt, updatedAt unless localization requires ISO dates unchanged.

Localize: title, description, intro, ingredients[].name and unit labels, seasonings, steps, tips, storage, substitutions, customAdditions, faqs, category, difficulty, scenarios display if present as text, equipment names, tags.

Source file:

---
${source}
---`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrefix(target) }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }]
    })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API ${res.status}: ${text}`);
  }
  const json = await res.json();
  const out = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!out) {
    throw new Error("Empty Gemini response");
  }
  return out.replace(/^```(?:markdown|yaml)?\n?/i, "").replace(/\n?```$/i, "");
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
    const { folder } = TARGETS[loc];
    const dir = join(root, "src/content", folder);
    mkdirSync(dir, { recursive: true });
    console.log(`Translating ${slug} → ${loc} (${MODEL})…`);
    const markdown = await callGemini(slug, loc);
    const outPath = join(dir, `${slug}.md`);
    writeFileSync(outPath, `${markdown}\n`, "utf8");
    console.log(`Wrote ${outPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
