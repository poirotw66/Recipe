# Spec-005 Progress

## Scope

- Spec: `docs/specs/005-monetization-ads/spec.md`
- PRD: `docs/prds/prd-001.md`
- Status date: 2026-05-29

## Phase Checklist

- [x] Phase 1: Spec + UI design aligned
- [x] Phase 2: Develop
- [x] Phase 3: Verify
- [x] Phase 4: Review
- [ ] Phase 5: Close

## Design Docs

| Type | Title | Path | Status |
| --- | --- | --- | --- |
| UISpec | 關於本站 | `docs/ui-specs/legal/about.md` | approved |
| UISpec | 聯絡我們 | `docs/ui-specs/legal/contact.md` | approved |
| UISpec | 隱私權政策 | `docs/ui-specs/legal/privacy-policy.md` | approved |
| UISpec | 使用條款 | `docs/ui-specs/legal/terms.md` | approved |
| UISpec | AdSlot | `docs/ui-specs/ads/ad-slot.md` | approved |

## Phase 2

- [x] Add `src/lib/site.ts` for shared legal and AdSense constants
- [x] Add `src/layouts/StaticArticleLayout.astro`
- [x] Upgrade `/about`, `/contact`, `/privacy-policy`, `/terms`
- [x] Add `src/components/AdSlot.astro`
- [x] Load AdSense script only when `PUBLIC_ADSENSE_CLIENT` is valid
- [x] Insert ad slots into `/recipes` and `/recipes/[slug]`
- [x] Update `public/ads.txt`
- [x] Update `scripts/verify-site.mjs`

## Phase 3

- [x] `npm test`
- [x] `npx astro check`
- [x] `npm run build`

## Phase 4

- [x] Review legal-page consistency through shared layout
- [x] Review placeholder-safe ad behavior
- [x] Review static-host compatibility

## Decisions Made

- Keep contact as email-only in phase 1 to avoid introducing server runtime.
- Render AdSense script only when a valid `PUBLIC_ADSENSE_CLIENT` is configured.
- Keep `ads.txt` placeholder explicit instead of inventing a publisher id.
- Place ad slots only on recipe list and recipe detail pages for a restrained first pass.
