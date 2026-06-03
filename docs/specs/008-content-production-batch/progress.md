# Spec-008 Progress

## Scope

- Spec: `docs/specs/008-content-production-batch/spec.md`
- PRD: `docs/prds/prd-002.md`
- Status date: 2026-06-03

## Phase Checklist

- [x] Phase 1: Spec aligned
- [x] Phase 2: Develop
- [x] Phase 3: Verify
- [x] Phase 4: Review
- [x] Phase 5: Close

## Phase 1

- [x] Align content rules（recipes 數量、coverImage 規則、驗證門檻）
- [x] 確認圖片存在性驗證的實作方式（在 `scripts/verify-site.mjs`）

## Phase 2

- [x] Expanded recipe batch to 80 markdown files (target >= 50).
- [x] Cover images aligned to `/images/recipes/{slug}.webp` for all recipes.
- [x] Verification script enforces count, category distribution, and cover image rules.

## Phase 3

- [x] `npm test`
- [x] `npm run build`

## Phase 4

- [x] Reviewed category distribution and cover image coverage.

## Phase 5

- [x] Closed with verification report and specs-overview sync.
