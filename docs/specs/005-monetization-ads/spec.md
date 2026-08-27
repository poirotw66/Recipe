# Spec-005: AdSense and Policy Pages

## Meta

- Domain: Monetization / Ads
- Status: approved
- PRD: `docs/prds/prd-001.md`
- UI specs: `docs/ui-specs/legal/about.md`, `docs/ui-specs/legal/contact.md`, `docs/ui-specs/legal/privacy-policy.md`, `docs/ui-specs/legal/terms.md`, `docs/ui-specs/ads/ad-slot.md`
- Dependencies: `spec-001`, `spec-002`, `spec-004`
- Created: 2026-05-29
- Updated: 2026-05-29

## 1. Background

`spec-001` created the basic legal routes and `ads.txt` placeholder, but the content remained at a scaffold level. `spec-002` and `spec-004` now provide recipe pages with content and SEO structure, so the site is ready for the monetization-readiness layer required for AdSense review.

This spec upgrades the legal pages into real static content, introduces a reusable `AdSlot` component, and keeps the AdSense integration safe by showing placeholders until a real publisher id is configured.

## 2. Goals

- Turn legal placeholder pages into review-ready static policy pages.
- Add a reusable `AdSlot` component for recipe list and recipe detail pages.
- Keep `ads.txt` explicit and non-deceptive until the real publisher id is available.
- Preserve static hosting compatibility on Astro and Cloudflare Pages.

## 3. Non-goals

- No fake publisher id or fabricated AdSense account data.
- No backend contact form or submission handler.
- No dynamic ad targeting logic or consent management platform.

## 4. Scope

### Pages

| Route | Purpose |
| --- | --- |
| `/about` | Site purpose, audience, content principles |
| `/contact` | Reviewable contact method without backend |
| `/privacy-policy` | Cookie, traffic, and third-party ad disclosure |
| `/terms` | Content usage, liability, and ad/link disclaimer |

### Components and Layouts

| Path | Purpose |
| --- | --- |
| `src/components/AdSlot.astro` | Reusable ad unit / placeholder block |
| `src/layouts/StaticArticleLayout.astro` | Shared legal-page shell |
| `src/lib/site.ts` | Shared contact, date, and AdSense config constants |

### Integration Points

| Page | Slot |
| --- | --- |
| `/recipes` | One list-level ad slot after the recipe grid |
| `/recipes/[slug]` | One content ad slot after the intro section |

## 5. Rules

- If `PUBLIC_ADSENSE_CLIENT` is absent or invalid, `AdSlot` must render a placeholder instead of pretending to be a real ad.
- `ads.txt` may remain a placeholder comment until the real Google publisher id is known.
- Legal pages must stay static and readable without any client-side dependency.
- Footer must keep direct links to about, contact, privacy policy, and terms.

## 6. Acceptance Criteria

- Given a visitor opens `/about`, `/contact`, `/privacy-policy`, or `/terms`, then the page contains substantive copy rather than scaffold placeholder text.
- Given `PUBLIC_ADSENSE_CLIENT` is not configured, when an ad slot renders, then it shows a clear placeholder and deployment reminder.
- Given a valid `PUBLIC_ADSENSE_CLIENT` is configured later, when an ad slot renders, then it outputs AdSense-compatible markup.
- Given `/ads.txt` is opened, then it contains a safe placeholder or the real Google line, but never a fabricated publisher id.

## 7. Exit Condition

This spec is complete when policy pages, ads readiness components, verification updates, and documentation are all in place so the site can continue into `spec-006` and later production content work.
