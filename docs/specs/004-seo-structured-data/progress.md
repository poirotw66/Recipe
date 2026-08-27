# Spec-004 Progress

## Scope

- Spec: `docs/specs/004-seo-structured-data/spec.md`
- PRD: `docs/prds/prd-001.md`
- Status date: 2026-05-29

## Phase Checklist

- [x] Phase 1: Spec aligned
- [x] Phase 2: Develop
- [x] Phase 3: Verify
- [x] Phase 4: Review
- [ ] Phase 5: Close

## Phase 1

- [x] Confirm SEO work stays within Astro static routes
- [x] Reuse page specs from recipe, ingredient, and scenario pages
- [x] Define metadata, sitemap, and JSON-LD scope

## Phase 2

- [x] Extend `SeoHead.astro` with OG and Twitter tags
- [x] Pass new SEO props through `BaseLayout.astro`
- [x] Allow recipe layout structured-data slot injection
- [x] Add shared `JsonLd.astro`
- [x] Add `src/lib/seo.ts` helpers
- [x] Add `/robots.txt` Astro route
- [x] Add sitemap index and segmented sitemap XML routes
- [x] Inject JSON-LD into recipe detail pages
- [x] Inject JSON-LD into ingredient and scenario detail pages
- [x] Inject collection JSON-LD into recipe, ingredient, and scenario list pages
- [x] Update `scripts/verify-site.mjs` for SEO markers and routes

## Phase 3

- [x] Static verification logic updated
- [x] Build outputs previously confirmed during implementation
- [ ] Re-run Node-based commands in the current shell session

## Phase 4

- [x] Review metadata coverage across content layers
- [x] Review sitemap route split and crawl entry point
- [x] Review JSON-LD helper reuse to avoid page-level duplication
- [x] Mark spec as ready for follow-on work

## Decisions Made

- Use Astro route handlers for `robots.txt` and sitemap XML so crawl artifacts always match built content.
- Keep sitemap routes split by content family instead of a single very large file.
- Centralize absolute URL and JSON-LD builders in `src/lib/seo.ts`.
- Keep structured data page-owned, with layouts only providing injection slots.
- Treat `Phase 5` as a later `/vif-close` step rather than bundling it into this implementation pass.
