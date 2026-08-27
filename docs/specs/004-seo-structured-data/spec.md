# Spec-004: SEO and Structured Data

## Meta

- Domain: SEO / Discovery
- Status: approved
- PRD: `docs/prds/prd-001.md`
- UI specs: reuse existing page specs from `docs/ui-specs/site`, `docs/ui-specs/recipes`, `docs/ui-specs/ingredients`, `docs/ui-specs/scenarios`
- Dependencies: `spec-002`, `spec-003`
- Created: 2026-05-29
- Updated: 2026-05-29

## 1. Background

`spec-002` and `spec-003` established the core page model for recipes, ingredients, and scenarios. Those pages are now routable and content-backed, but they still need search-friendly metadata, sitemap coverage, and structured data so search engines can understand the relationships between recipes, ingredients, and cooking contexts.

This spec adds the SEO layer at the page and route level without introducing any backend dependency. The implementation stays within Astro static generation and keeps the schema surface compatible with the existing content model.

## 2. Goals

- Add canonical, Open Graph, and Twitter metadata to major content pages.
- Add crawl support with `robots.txt` and sitemap XML routes.
- Add JSON-LD for recipe, FAQ, breadcrumb, and collection contexts.
- Reuse content already shipped in `spec-002` and `spec-003` without duplicating sources.

## 3. Non-goals

- No search console submission automation.
- No dynamic image generation for OG assets.
- No ad or policy page work. That remains in `spec-005`.
- No new content authoring workflow beyond existing recipe and taxonomy data.

## 4. Scope

### Pages

| Type | Route | Purpose |
| --- | --- | --- |
| Page | `/recipes` | Add collection metadata and collection JSON-LD |
| Page | `/recipes/[slug]` | Add article metadata, recipe JSON-LD, FAQ JSON-LD, breadcrumb JSON-LD |
| Page | `/ingredients` | Add collection metadata and collection JSON-LD |
| Page | `/ingredients/[slug]` | Add detail metadata, breadcrumb JSON-LD, defined term JSON-LD |
| Page | `/scenarios` | Add collection metadata and collection JSON-LD |
| Page | `/scenarios/[slug]` | Add detail metadata, breadcrumb JSON-LD, thing JSON-LD |

### SEO Routes

| Type | Route | Purpose |
| --- | --- | --- |
| XML | `/sitemap-index.xml` | Sitemap entry point |
| XML | `/sitemap-pages.xml` | Core site pages |
| XML | `/sitemap-recipes.xml` | Recipe detail pages |
| XML | `/sitemap-ingredients.xml` | Ingredient detail pages |
| XML | `/sitemap-scenarios.xml` | Scenario detail pages |
| Text | `/robots.txt` | Crawl policy and sitemap declaration |

### Code Modules

| Path | Purpose |
| --- | --- |
| `src/components/SeoHead.astro` | Canonical, OG, Twitter tags |
| `src/components/JsonLd.astro` | Shared JSON-LD script emitter |
| `src/layouts/BaseLayout.astro` | Pass SEO props into page head |
| `src/layouts/RecipeLayout.astro` | Allow recipe pages to inject structured data |
| `src/lib/seo.ts` | URL and JSON-LD builders |
| `scripts/verify-site.mjs` | Static verification markers for SEO assets |

## 5. Data and Rules

- Absolute URLs must be built from a single site origin helper.
- Recipe detail pages use `type="article"` and prefer the recipe cover image as OG/Twitter image.
- List pages use collection metadata and collection JSON-LD.
- Ingredient detail pages publish `DefinedTerm` JSON-LD.
- Scenario detail pages publish `Thing` JSON-LD.
- Recipe detail pages publish:
  - `BreadcrumbList`
  - `Recipe`
  - `FAQPage` when FAQs exist
- `robots.txt` must reference `sitemap-index.xml`.
- Sitemaps must separate core pages from recipe, ingredient, and scenario detail routes for easier maintenance.

## 6. Implementation Plan

1. Extend the shared head component for OG/Twitter coverage.
2. Add reusable SEO helper functions and JSON-LD component.
3. Inject structured data into recipes, ingredients, scenarios, and collection pages.
4. Replace static `public/robots.txt` with Astro route output.
5. Add sitemap XML routes and update verification checks.
6. Run build, type, and static verification.

## 7. Acceptance Criteria

- Given a recipe detail page, when it is rendered, then canonical, Open Graph, Twitter, recipe JSON-LD, FAQ JSON-LD, and breadcrumb JSON-LD are present.
- Given an ingredient or scenario detail page, when it is rendered, then breadcrumb JSON-LD and a page-type-specific JSON-LD block are present.
- Given a collection page, when it is rendered, then collection metadata and collection JSON-LD are present.
- Given the site root crawl setup, when `robots.txt` is requested, then it declares the sitemap index.
- Given the sitemap routes, when the site is built, then the index and all child sitemap routes are generated.

## 8. Risks

- Search preview quality still depends on the available static cover images and content copy.
- Without a runtime environment in this repo, sitemap freshness depends entirely on rebuild cadence.
- JSON-LD validity should continue to be guarded in later specs if the content schema expands.

## 9. Exit Condition

This spec is complete when SEO metadata, sitemap routes, and structured data are implemented, verified, and documented as the foundation for `spec-005` and later content expansion.
