# Spec-013: 食譜瀏覽體驗強化

## Meta

- 類型：UX / Recipes
- 狀態：done
- PRD：`docs/prds/prd-003.md`
- 依賴：`spec-002`, `spec-010`
- 建立：2026-06-03

## 1. Goals

- 食譜列表篩選支援 URL query（可分享、重新整理保留狀態）。
- RecipeCard 強化「3 秒判斷」：時間、工具、難度、核心食材視覺優先。
- 食譜詳情可掃讀性：關鍵資訊列、編號步驟、準備/烹調時間提示。

## 2. Scope

| Path | Purpose |
| --- | --- |
| `public/scripts/recipe-list-filter.js` | 列表篩選 + URL sync |
| `src/pages/recipes/index.astro` | 外掛篩選腳本、aria-pressed |
| `src/lib/recipes.ts` | `getRecipeCardHighlights` |
| `src/components/RecipeCard.astro` | 資訊層級重排 |
| `src/pages/recipes/[slug].astro` | 關鍵資訊列、編號步驟 |
| `src/styles/global.css` | chip-emphasis、steps-list--numbered |

## 3. 驗收條件

- [x] 列表篩選：`keyword` / `category` / `time` / `tool` query 可讀寫
- [x] RecipeCard：時間（emphasis）、工具（tool chip）、核心食材優先
- [x] 詳情頁：`recipe-key-facts`、編號步驟、準備/烹調時間註記
- [x] `npm test` / `npm run build` 通過
