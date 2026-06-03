# Spec-009 Progress

## Scope

- Spec: `docs/specs/009-web-seo-collections/spec.md`
- PRD: `docs/prds/prd-002.md`
- Status date: 2026-06-03

## Phase Checklist

- [x] Phase 1: Spec aligned
- [x] Phase 2: Develop
- [x] Phase 3: Verify
- [x] Phase 4: Review
- [x] Phase 5: Close

## Phase 1

- [x] Align structured data targets（/recipes /ingredients /scenarios）
- [x] 確認驗證腳本中要檢查的 markers（例如 `ItemList`）

## Phase 2

- [x] Added `buildItemListJsonLd` in `src/lib/seo.ts`.
- [x] Injected ItemList JSON-LD on recipes, ingredients, and scenarios list pages.
- [x] Injected ItemList JSON-LD on ingredient and scenario detail pages for related recipes.
- [x] Extended `scripts/verify-site.mjs` with ItemList markers.

## Phase 3

- [x] `npm test`
- [x] `npm run build`

## Phase 4

- [x] Reviewed list and detail page structured data coverage.

## Phase 5

- [x] Closed with verification report and specs-overview sync.
