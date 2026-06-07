# Spec-017 Verification Report

Status: **PASS**

Date: 2026-06-05

## Pipeline

| Stage | Command | Result |
| --- | --- | --- |
| Build | `npm run build` | PASS — 164 pages; `/`, `/en/`, `/en/recipes/`, policy shells |
| Type check | `npm run typecheck` | PASS (0 errors; hints only) |
| Lint | `npm run lint` | PASS (`verify-site.mjs`) |
| Test | `npm test` | PASS — verify-site, fridge logic, `test-i18n.mjs` |
| Dependency audit | `npm audit --audit-level=moderate` | PASS — no moderate+ issues reported |

## Spec-017 checks

- `astro.config.mjs`: `defaultLocale: zh-TW`, `prefixDefaultLocale: false`
- `SeoHead.astro`: hreflang alternates + `x-default` pattern
- Taxonomy: `ingredients.json` entries include `labels.zh-TW` and `labels.en`
- Localized shells: `src/pages/[locale]/` for index, lists, about, contact, privacy, terms

## Security (static site)

- No new server endpoints; locale param validated in `requireNonDefaultLocale`
- UI strings from JSON; no user-controlled HTML in i18n layer

## God Mode fixes during verify

- Fixed `requireNonDefaultLocale` typing (`NonDefaultLocale` guard) for `astro check`
- Extended `verify-site.mjs` and `test-i18n.mjs` for i18n smoke checks
- Added `.lang-switcher__*` styles in `global.css`

## Residual / manual

- `/en/recipes/{slug}/` not built until spec-018 (by design; en list is empty-state shell)
- `/en/tools/*`, topic hubs (`brunch`, etc.), ingredient/scenario **detail** under `[locale]/` not mirrored in this spec slice — defer or follow-up with spec-018/019
