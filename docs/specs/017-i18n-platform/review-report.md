# Review Report — Spec-017

## Meta

- Spec: `docs/specs/017-i18n-platform/spec.md`
- Date: 2026-06-05
- Verdict: **APPROVED** (with documented deferrals)

## Section 8 — Acceptance

| Criterion | Status | Notes |
| --- | --- | --- |
| Build emits `/`, `/en/`, `/en/recipes/` | PASS | `npm run build` |
| 繁中 URL 路徑不變 | PASS | 既有 `src/pages/*` 未改 slug 路徑 |
| 語言切換保留 suffix | PASS | `LanguageSwitcher` + `stripLocalePrefix` |
| `/en/ingredients/` 英文 labels | PASS | taxonomy migration + localized index |
| about + privacy 四語 | PASS | `[locale]/about`, `privacy-policy` (+ contact, terms) |
| `npm test` 含 i18n | PASS | `test-i18n.mjs` + verify-site markers |

## Scope gaps (non-blocking)

- Recipe detail under `/en/recipes/{slug}/`: intentionally absent pre–spec-018 (404 acceptable per spec §5).
- `[locale]/ingredients/[slug]`, `[locale]/scenarios/[slug]`, tools, topic hubs: listed in routing table but not required in §8; recommend spec-018/019 or small follow-up for parity.
- Breadcrumb: still zh-centric on legacy pages; acceptable for platform slice.

## Findings

- No 🔴 blocking issues.
- 🟢 Fixed during God Mode: type guard in `i18n-routes.ts`, verify/test/CSS as in verification report.

## Residual risks

- hreflang on recipe pages will need per-slug alternate sets once spec-018 adds translations.
- Legal copy in en/ja/ko is concise; human legal review still advised before AdSense in those locales.

## Follow-up

- **spec-018**: localized recipe collections + hreflang on detail pages.
- **spec-019**: fridge tool UI + matching labels per locale.
