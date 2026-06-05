# Spec-018: Gemini Flash 食譜翻譯作業

## Model

- **使用**：Google **Gemini Flash（latest）**（以 Google AI Studio / API 當下最新的 Flash 型號為準，例如 `gemini-2.5-flash` 或後續 `gemini-*-flash` stable）。
- **不使用**：Google Translate、DeepL、或其他通用「一鍵機翻」網頁/API 作為譯文來源。
- **不做**：站內即時翻譯 API；產出皆為靜態 markdown 進 repo。

## Workflow

1. 以繁中 `src/content/recipes/{slug}.md` 為 **唯一 source of truth**。
2. 對每個目標語言（`en`、`ja`、`ko`）各呼叫一次 Gemini Flash，輸出**完整 frontmatter + body**（若 body 為空則僅 frontmatter 欄位）。
3. 將輸出存成 `src/content/recipes-en/{slug}.md`（及 `-ja`、`-ko`），`recipeId` = slug。
4. **Human review**（合併前必做）：步驟條數與順序與繁中一致、份量數字不變、單位合理、無簡體、標題與描述不套話。
5. `npm test` 通過後 merge。

## Per-locale system instructions (append to every request)

```
You are a professional recipe localizer for Bloom Kitchen (Taiwanese home cooking).
Source language: Traditional Chinese (Taiwan). Target: {TARGET_LOCALE}.
Rules:
- Output valid recipe frontmatter YAML matching the project schema; use English field keys only in YAML.
- Keep recipeId and slug identical to the source slug.
- Do not change numeric times, servings, or ingredient amounts; localize unit words only when appropriate.
- steps: same count and order as source; natural, cookbook-style target language.
- difficulty: map to target locale (en: Easy/Medium/Advanced; ja/ko: natural equivalents).
- category: localize display name only.
- Never use Simplified Chinese characters.
- No HTML in markdown body unless source had none (prefer plain markdown lists).
```

## User prompt template

```
Translate this Traditional Chinese recipe markdown into {TARGET_LANGUAGE_NAME} for locale {TARGET_LOCALE_CODE}.

Shared across locales (copy exactly from source): coverImage, prepTime, cookTime, totalTime, servings, recipeId, publishedAt, updatedAt unless localization requires ISO dates unchanged.

Localize: title, description, intro, ingredients[].name and unit labels, seasonings, steps, tips, storage, substitutions, customAdditions, faqs, category, difficulty, scenarios display if present as text, equipment names, tags.

Source file:

---
{paste full zh-TW recipe file}
---
```

## Batch tips

- One slug × one target language per request（避免單次輸出過長截斷）。
- 試點 15 篇：共 **45** 次 Gemini 呼叫（en/ja/ko 各 15）。
- 記錄完成狀態於 `docs/content/i18n-pilot-slugs.md`（可選）。

## Quality bar (reject & re-prompt)

- Step count mismatch vs 繁中
- Missing `recipeId` or wrong slug
- Simplified Chinese characters
- Invented ingredients not in source list
- English recipe with unnatural SEO spam titles
