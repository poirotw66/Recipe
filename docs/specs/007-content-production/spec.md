# Spec-007: 第一批內容資料

## Goal

補齊 MVP 第一批可瀏覽、可搜尋、可被冰箱工具推薦的內容資料，讓首頁、食譜、食材、情境與 SEO sitemap 不再只有少量示範資料。

## Scope

- 食譜內容至少 12 篇 Markdown。
- 食材 taxonomy 至少 12 個常用食材。
- 情境 taxonomy 至少 8 個料理情境。
- 首頁改用 taxonomy 資料產生常用食材與情境入口。
- 冰箱剩料工具需能使用新增食譜與 taxonomy 排序推薦。
- 驗證腳本需檢查內容數量與必要檔案。

## Out of Scope

- 圖片實體製作與壓縮。
- CMS、後端資料庫、會員收藏。
- AdSense 正式 publisher ID 與正式 `ads.txt` 替換。

## Acceptance Criteria

- `src/content/recipes` 至少有 12 篇食譜。
- `src/data/ingredients.json` 至少有 12 個食材。
- `src/data/scenarios.json` 至少有 8 個情境。
- 新食譜皆符合 Astro content collection schema。
- `npm test`、`npx astro check`、`npm run build` 通過。
