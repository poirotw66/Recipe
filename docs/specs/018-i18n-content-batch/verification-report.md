# Spec-018 Verification Report

Status: **PASS**

Date: 2026-06-05

## Pipeline

| Stage | Command | Result |
| --- | --- | --- |
| Build | `npm run build` | PASS — 209 pages; `/en/recipes/{pilot-slug}/` |
| Type check | `npm run typecheck` | PASS |
| Test | `npm test` | PASS — includes `verify-pilot-recipes.mjs` (15×3 pairing) |
| Pilot pairing | step count vs zh, recipeId, coverImage | PASS |

## Spec-018 checks

- `content.config.ts`: `recipes-en` / `recipes-ja` / `recipes-ko` collections
- `[locale]/recipes/[slug].astro` + localized list
- Sitemap recipes includes localized URLs
- `scripts/gemini-translate-recipe.mjs` for production batch

## Residual

- 85 篇非試點食譜仍僅繁中
- 譯文 Human review 與 Gemini API 追溯：見 `god-mode-report.md` Decisions
