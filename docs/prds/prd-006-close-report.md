# PRD-006 Close Report

**Status:** done (2026-06-08)

## Delivered

| Phase | Spec | Outcome |
| --- | --- | --- |
| A — 平台 | spec-017 | `zh-TW` 根路徑 + `/en` `/ja` `/ko`；UI 字典、語言切換、taxonomy labels、hreflang、sitemap、政策四語 |
| B — 試點 | spec-018 | 15 篇旗艦 × en／ja／ko；驗證與 Gemini 產線文件 |
| C — 全庫譯文 | spec-018 延續 | **161** 篇繁中 × **3** 他語（483 檔）；`verify-pilot-recipes.mjs` 全量成對 |
| D — 工具 | spec-019 | 冰箱剩料工具多語；`ingredient` slug 比對 |

## Content hygiene (2026-06-07)

- 23 篇繁中 SEO 模板步驟已修；四語步驟數對齊（見 `docs/reviews/i18n-zh-template-sync-checklist.md`）。

## Verification

- `npm test` / `npm run build` — pass（767 靜態頁，隨內容擴充而變）。
- `npm run recipe-review:full` — **2026-06-08**：161 篇繁中 Pass **152** / Warning **9** / Critical **0**（見 `docs/reviews/recipe-audit/audit-summary-2026-06-08-full-161.md`）。

## Out of scope (unchanged)

- 簡體中文、即時機翻 API、CMS、子網域多站。

## Follow-up (optional, not blocking close)

- 9 篇 Warning 人工複核（食材／步驟字面啟發式）。
- i18n 譯文 spot-check（清單建議 ≥5 篇）。
- Push／部署 smoke 若尚未對最新 commit 執行。
