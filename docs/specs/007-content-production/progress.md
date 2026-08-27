# Spec-007 Progress

## Scope

- Spec: `docs/specs/007-content-production/spec.md`
- PRD: `docs/prds/prd-001.md`
- Status date: 2026-05-29

## Phase Checklist

- [x] Phase 1: Spec aligned
- [x] Phase 2: Develop
- [x] Phase 3: Verify
- [x] Phase 4: Review
- [ ] Phase 5: Close

## Phase 2

- [x] Expand ingredient taxonomy to 13 common ingredients
- [x] Expand scenario taxonomy to 8 cooking contexts
- [x] Add 9 new recipe markdown files for a total of 12 recipes
- [x] Update homepage to use taxonomy-driven ingredient and scenario links
- [x] Clean fridge matching labels and browser result copy
- [x] Update verification script for content production thresholds

## Phase 3

- [x] `npm test`
- [x] `npx astro check`
- [x] `npm run build`

## Phase 4

- [x] Review recipe schema consistency
- [x] Review taxonomy coverage for recipe and fridge-tool matching
- [x] Review static-only content constraints

## Decisions Made

- Keep all phase-1 content as local Markdown and JSON to preserve the no-backend architecture.
- Use 12 recipes as the MVP batch target because it gives enough coverage for recipe listing, taxonomy pages, sitemap, and fridge ranking.
- Keep recipe bodies short and practical; deeper editorial expansion can happen in a later content pass.
