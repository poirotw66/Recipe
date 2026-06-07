# God Mode Results Report — Spec-018

Status: **COMPLETED**

Date: 2026-06-05

Spec: `docs/specs/018-i18n-content-batch/spec.md`  
PRD: `docs/prds/prd-006.md`

## Summary

試點 **15 篇 × en/ja/ko** 已入庫；多語 collection、列表／詳情路由、JSON-LD 語系、sitemap、驗證腳本與 Gemini 翻譯腳本已就緒。建置 **209** 頁。

## Phase completion

| Phase | Status |
| --- | --- |
| 1 Spec | [x] |
| 2 Develop | [x] |
| 3 Verify | [x] |
| 4 Review | [x] |
| 5 Close | [ ] — `/vif-close` |

## Decisions Made

| 來源 | 決策 | 內容 |
| --- | --- | --- |
| Phase 1 | 試點 slug | 採 spec §5 預設 15 篇（未另開 Human 表單） |
| Develop | Collection 命名 | `recipes-en` / `recipes-ja` / `recipes-ko` + 共用 `recipe-schema.ts` |
| Develop | 譯文產出 | 環境無 `GEMINI_API_KEY`；試點譯文由 agent 依 `gemini-translation.md` 規則本地化產出；正式追溯請用 `scripts/gemini-translate-recipe.mjs` + Human review |
| Develop | UI | 詳情殼 `RecipeDetailBody.astro` + `recipe.*` UI 字典 |
| Verify | 步驟數驗證 | `verify-pilot-recipes.mjs` 支援 YAML 折行與 CRLF |

## 🟢 Fixed

- `verify-site.mjs` 改查多語 collection
- `verify-pilot-recipes.mjs` 步驟計數邏輯

## Manual Testing Checklist

- [ ] 開 `/en/recipes/tomato-egg-rice/` 檢查英文步驟與語言切換
- [ ] 檢視原始碼 hreflang（四語 + x-default）
- [ ] `/en/recipes/` 僅 15 篇試點
- [ ] 抽 2 篇 ja/ko 確認無簡體、語氣自然
- [ ] （可選）設定 API key 後試跑 `node scripts/gemini-translate-recipe.mjs --slug tomato-egg-rice --locale en`

## Next

- `/vif-close` spec-018
- `/vif-god` 或 develop **spec-019**（冰箱工具多語）
- PRD-006：018 後續批次 85 篇
