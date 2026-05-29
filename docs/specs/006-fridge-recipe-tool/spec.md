# Spec-006: Fridge Recipe Tool

## Meta

- Domain: Tools / Fridge Matching
- Status: approved
- PRD: `docs/prds/prd-001.md`
- UI spec: `docs/ui-specs/tools/fridge-recipe.md`
- Dependencies: `spec-002`, `spec-003`
- Created: 2026-05-29
- Updated: 2026-05-29

## 1. Background

The page shell for `/tools/fridge-recipe` was created in `spec-001`, but it still only shows placeholder results. The recipe content model from `spec-002` and the taxonomy data from `spec-003` now provide enough local data to implement a real static matching tool without any backend.

This spec turns the fridge tool into the first true interactive feature in phase 1: input ingredients, resolve them to canonical taxonomy items, rank recipe candidates locally, and explain what ingredients are still missing.

## 2. Goals

- Parse free-text ingredient input on the client.
- Resolve aliases to canonical ingredients from local taxonomy data.
- Rank recipes using hit count, missing ingredients, preference boosts, and time.
- Show both matched ingredients and missing ingredients for each result.
- Keep the tool fully static and browser-side.

## 3. Non-goals

- No backend, API, or database.
- No pantry persistence, login, or saved preferences.
- No AI ingredient inference beyond simple alias/name matching.

## 4. Scope

| Path | Purpose |
| --- | --- |
| `src/lib/fridge.js` | Shared ingredient parsing and recipe ranking helpers |
| `src/pages/tools/fridge-recipe.astro` | Embed tool data and render actual result states |
| `public/scripts/fridge-tool.js` | Client-side interaction and result rendering |
| `scripts/test-fridge-logic.mjs` | Unit coverage for matching and ranking logic |
| `scripts/verify-site.mjs` | Static verification updates for tool markers |

## 5. Ranking Rules

- Split user input by comma, ideographic comma, slash, and newline.
- Match ingredient tokens against `ingredients.json` names and aliases.
- Only recipes with at least one matched ingredient are returned.
- Base ranking favors:
  - more matched ingredients
  - fewer missing ingredients
  - matching selected preferences
  - shorter total time
- Supported preferences:
  - `10 分鐘`
  - `高蛋白`
  - `電鍋`
  - `氣炸鍋`

## 6. Acceptance Criteria

- Given the user enters `蛋、豆腐`, when the tool runs, then recipes containing those canonical ingredients are ranked above unrelated recipes.
- Given the user submits an empty input, when validation runs, then the page shows an error and no result state.
- Given no recipe directly matches the recognized ingredients, when the tool runs, then the page shows a no-result guidance panel.
- Given the user came from the homepage or recipe page with query parameters, when the page loads, then the tool auto-runs with those prefilled ingredients.
- Given the matching logic changes later, when `npm test` runs, then unit assertions catch regressions in parsing and ranking.

## 7. Exit Condition

This spec is complete when the fridge tool uses real recipe and taxonomy data, has test coverage for its ranking logic, and is documented as the phase-1 interactive feature foundation.
