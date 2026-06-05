---
name: recipe-review
description: >-
  Audits Bloom Kitchen recipe markdown for proportion, step logic, food safety,
  and format consistency. Runs deterministic prechecks then produces Pass/Warning/Critical
  JSON reports. Use when the user asks for recipe review, recipe QA, 食譜審查,
  食譜校閱, content audit, /recipe-review, or batch-checking src/content/recipes.
---

# Recipe Review (Bloom Kitchen)

Audit recipes under `src/content/recipes/*.md`. **Do not edit recipe files** unless the user explicitly asks to apply fixes. Default deliverable: structured reports under `docs/reviews/recipe-audit/`.

## Project context

- Content: Traditional Chinese (Taiwan); schema in `src/content.config.ts`
- Fields: `title`, `description`, `servings`, times, `ingredients`, `seasonings`, `steps`, `tips`, `storage`, `substitutions`, `customAdditions`, `faqs`, `scenarios`, `equipment`, `relatedIngredients`
- `customAdditions` are optional garnishes (may appear in steps without being core `ingredients`)
- Build already enforces Zod schema; this skill catches **semantic** issues humans miss

## Cursor hook

- 在聊天輸入 **`/recipe-review`**（或訊息含 `recipe-review`）時，`.cursor/hooks.json` 會執行 `npm run recipe-review:full` 並注入審查結果路徑。
- 手動：`npm run recipe-review:full`（100 篇）或 `npm run recipe-review:precheck`（僅機械檢查）。

## Workflow

### 1. Trigger and scope

Confirm scope with user when ambiguous:

| Mode | Action |
| --- | --- |
| **Full audit** | All files in `src/content/recipes/` |
| **Single** | One `slug.md` |
| **Batch** | User gives slug list or category filter |

### 2. Deterministic precheck (run first)

```bash
npm run recipe-review:precheck
```

Reads `docs/reviews/recipe-audit/latest-precheck.json`. Treat each `mechanical_issues` entry as at least **Warning** unless clearly false positive (note in report).

Optional flags:

```bash
node scripts/recipe-review-precheck.mjs --slug tomato-egg-rice
node scripts/recipe-review-precheck.mjs --write
```

### 3. Fetch recipe payload

For each slug in scope, read `src/content/recipes/{slug}.md`. Build a mental JSON:

- `slug`, `title`, `servings`, `prepTime`, `cookTime`, `totalTime`, `difficulty`, `category`
- `ingredients[]`, `seasonings[]`, `equipment[]`
- `steps[]`, `intro`, `tips`, `customAdditions`, `substitutions`

### 4. LLM review (four dimensions)

Apply the rubric in [reference.md](reference.md). Cross-check:

1. **Ingredient ↔ steps**: every `ingredients` / `seasonings` item should be used in steps (or explain omission). Step-only foods should appear in lists, `customAdditions`, or `substitutions`.
2. **Proportion & servings**: salt/soy/sugar vs servings; absurd volumes for 1–2 servings home cooking.
3. **Logic & sequence**: order of prep vs cook; equipment matches steps; no contradictions between steps.
4. **Safety & time**: raw poultry/meat/egg doneness vs stated `cookTime`; air-fryer/oven temps if mentioned.

Taiwan home cooking bias: rent-friendly, small batches, familiar units (碗、大匙、少許). Flag mixed g/oz without reason.

### 5. Score and tag

| status | Meaning |
| --- | --- |
| **Pass** | No issues after review (mechanical + semantic) |
| **Warning** | Typos, unit inconsistency, unused ingredient, mild logic nit |
| **Critical** | Safety risk, impossible sequence, lethal seasoning scale, title/body mismatch |

Merge precheck + semantic into one report per slug. **Worst status wins** (Critical > Warning > Pass).

### 6. Output (required JSON per recipe)

Write `docs/reviews/recipe-audit/reports/{slug}.json`:

```json
{
  "slug": "tomato-egg-rice",
  "reviewed_at": "YYYY-MM-DD",
  "status": "Pass | Warning | Critical",
  "confidence_score": 1,
  "issues": [
    {
      "type": "Ingredient_Mismatch | Proportion_Error | Logic_Error | Safety_Risk | Format_Inconsistency | Metadata_Mismatch",
      "severity": "Warning | Critical",
      "description": "What is wrong",
      "suggested_fix": "Actionable edit hint",
      "source": "precheck | agent"
    }
  ]
}
```

### 7. Rollup report

After batch, write `docs/reviews/recipe-audit/audit-summary-{YYYY-MM-DD}.md`:

- **Language: 繁體中文（台灣）** for all prose, table headers, and issue summaries
- JSON `description` / `suggested_fix` fields: **繁體中文** (keep `status` / `type` enums in English)
- Counts: Pass / Warning / Critical（可附中文說明：通過／注意／嚴重）
- Table: slug、狀態、主要問題一句話
- **Critical／嚴重** 區塊優先（需人工覆核）
- Link to per-slug JSON paths

### 8. Human-in-the-loop

Do not auto-apply fixes. For false positives, user may record in `docs/reviews/recipe-audit/overrides.json` (see [reference.md](reference.md)). Future runs: skip elevating issues listed in `overrides` for that slug+type.

## System prompt (use when reviewing one recipe in chat)

You are a Recipe QA expert for Taiwanese home cooking on Bloom Kitchen. Cross-check ingredients vs steps, proportions vs `servings`, step order, and basic food safety. Respect `customAdditions` as optional. Output the JSON schema in step 6. Be conservative on Critical (safety, lethal salt, raw meat with no heat step).

## Examples

See [examples.md](examples.md).

## Additional resources

- Rubric and issue types: [reference.md](reference.md)
- Precheck implementation: `scripts/recipe-review-precheck.mjs`
