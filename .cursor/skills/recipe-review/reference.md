# Recipe Review Reference

## Correctness dimensions

| Dimension | Focus | Typical failures |
| --- | --- | --- |
| **Proportion & servings** | Ingredient ratios vs `servings`; seasoning scale | Absurd salt for 1 serving; water/flour imbalance |
| **Logic & sequence** | Step order; missing/extra ingredients in lists | Step uses 蔥花 but not in ingredients/seasonings/customAdditions; chop after already in pan |
| **Safety & time** | Heat time vs protein; cross-contamination hints | Raw chicken with 5 min total; no cook step for eggs in risky context |
| **Format & units** | 大匙/小匙/碗/克 consistency; title vs body | title says 牛肉 but steps are tofu-only; random oz without pattern |

## Issue `type` enum

| type | Use when |
| --- | --- |
| `Ingredient_Mismatch` | List ↔ steps mismatch |
| `Proportion_Error` | Amount unreasonable for servings |
| `Logic_Error` | Order, equipment, or contradiction |
| `Safety_Risk` | Doneness, storage, hazardous combo |
| `Format_Inconsistency` | Units, terminology |
| `Metadata_Mismatch` | title/description/category/scenarios vs actual dish |

## Bloom Kitchen schema notes

From `src/content.config.ts`:

- `difficulty`: 簡單 | 中等 | 進階
- `ingredients[].isCore`: fridge tool relevance (not QA pass/fail alone)
- `totalTime >= prepTime + cookTime` (build-time)
- `steps.length >= 3`
- Body markdown after frontmatter is optional extra copy; still check alignment with `intro`

## `customAdditions` rule

Items listed only in `customAdditions` may appear in steps as optional garnish. Do **not** flag as Critical solely for that. Flag if a **core** `ingredients` item never appears in steps.

## overrides.json format

```json
{
  "version": 1,
  "exceptions": [
    {
      "slug": "example-slug",
      "issue_type": "Proportion_Error",
      "reason": "Intentional extra salty preserved vegetable dish",
      "ignored_until": null
    }
  ]
}
```

## Precheck signals (mechanical)

`scripts/recipe-review-precheck.mjs` may emit:

- `unused_ingredient` — name not found in steps text (normalized)
- `step_mentions_unknown` — token in steps not in ingredients/seasonings/customAdditions/substitutions (heuristic; may false-positive on 適量、少許)
- `time_mismatch` — totalTime < prepTime + cookTime
- `thin_steps` — fewer than 3 steps
- `title_keyword_drift` — heuristic keyword in title absent from ingredients+steps

Agent should downgrade or explain false positives in `description`.
