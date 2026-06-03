# Spec-008 Verification Report

## Result

Status: Passed

## Commands

- `npm test`
- `npm run build`

## Verified

- Recipe markdown count is at least 50 (current: 80).
- Category distribution meets phase-2 targets (家常菜/飯麵/主菜/湯品/便當菜).
- Every recipe `coverImage` uses `/images/recipes/{slug}.webp` and the file exists under `public/images/recipes/`.
- `scripts/verify-site.mjs` enforces recipe count, category quotas, and cover image rules.
- Static build emits all recipe routes without failure.
