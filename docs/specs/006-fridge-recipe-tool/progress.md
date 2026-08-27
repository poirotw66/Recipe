# Spec-006 Progress

## Scope

- Spec: `docs/specs/006-fridge-recipe-tool/spec.md`
- PRD: `docs/prds/prd-001.md`
- Status date: 2026-05-29

## Phase Checklist

- [x] Phase 1: Spec aligned
- [x] Phase 2: Develop
- [x] Phase 3: Verify
- [x] Phase 4: Review
- [ ] Phase 5: Close

## Phase 2

- [x] Add shared fridge matching helpers in `src/lib/fridge.js`
- [x] Add unit assertions in `scripts/test-fridge-logic.mjs`
- [x] Update `package.json` test command to include fridge logic tests
- [x] Replace placeholder fridge page results with real result containers
- [x] Embed local recipe and ingredient data into `/tools/fridge-recipe`
- [x] Implement client-side ranking, no-result, and preference state logic
- [x] Update styles for active preferences and result cards
- [x] Update `scripts/verify-site.mjs`

## Phase 3

- [x] `npm test`
- [x] `npx astro check`
- [x] `npm run build`

## Phase 4

- [x] Review ranking rules for explainability and maintenance
- [x] Review query-param prefill flow from homepage and recipe detail pages
- [x] Review static-only implementation against PRD constraints

## Decisions Made

- Keep ranking logic in a reusable JS helper so the browser code and tests follow the same rules.
- Resolve ingredients through taxonomy aliases before scoring recipes.
- Show a dedicated no-result panel instead of falling back to irrelevant recipes.
- Treat `10 分鐘` as a lightweight quick-cooking preference that can also align with the `10 分鐘料理` scenario.
