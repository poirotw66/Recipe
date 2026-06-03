# Spec-012: 首頁與冰箱工具動線

## Meta

- 類型：UX / Home / Tools
- 狀態：done
- PRD：`docs/prds/prd-003.md`
- 依賴：`spec-006`, `spec-010`
- 建立：2026-06-03

## 1. Goals

- 首頁區塊重排：冰箱剩料入口 → 料理情境 → 精選食譜 → 主題專區 → 常用食材。
- 首頁搜尋導向冰箱工具：1～3 樣食材驗證、預填 query、成功後 `#fridge-results` 錨點。
- 冰箱工具空結果 / 低命中：引導文案與快捷連結。

## 2. Scope

| Path | Purpose |
| --- | --- |
| `src/pages/index.astro` | 區塊重排、copy 收斂、移除重複 tool promo |
| `public/scripts/home-search.js` | 食材數量驗證、跳轉 hash |
| `src/pages/tools/fridge-recipe.astro` | 結果錨點、空結果快捷、低命中提示 |
| `public/scripts/fridge-tool.js` | 捲動至結果、低命中顯示邏輯 |
| `src/styles/global.css` | topic-hub-grid、form-hint |

## 3. 驗收條件

- [x] 首頁順序：hero（冰箱搜尋）→ 情境 → 精選食譜 → 主題專區（牛肉/義大利麵）→ 常用食材
- [x] 首頁搜尋：空值 / 超過 3 樣有錯誤提示；成功跳轉 `?ingredients=...#fridge-results`
- [x] 冰箱工具：提交或從 URL 載入後捲動至結果區；無結果顯示建議 chip；命中 < 3 顯示低命中提示
- [x] `npm test` / `npm run build` 通過
