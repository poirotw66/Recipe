# Spec-009 Verification Report

## Result

Status: Passed

## Commands

- `npm test`
- `npm run build`

## Verified

- `buildItemListJsonLd` is available in `src/lib/seo.ts`.
- `/recipes`, `/ingredients`, and `/scenarios` list pages inject ItemList JSON-LD alongside CollectionPage.
- Ingredient and scenario detail pages inject ItemList JSON-LD for related recipe previews when available.
- `scripts/verify-site.mjs` checks ItemList integration markers on list and detail routes.
- Static build completes successfully.
