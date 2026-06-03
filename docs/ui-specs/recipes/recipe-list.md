---
name: 食譜列表
description: 顯示全部食譜與靜態篩選入口的列表頁 placeholder。
domain: recipes
module: foundation
spec: spec-001
status: implemented
route: /recipes
apis: []
---

# 食譜列表

## Meta

- 頁面類型：search-page
- 頁面檔名：`src/pages/recipes/index.astro`
- 建立：2026-05-28
- 更新：2026-05-28

## 說明

建立 `/recipes` 路由與可延伸的列表頁版型。spec-001 階段只需 placeholder 與篩選 UI 結構；食譜 content collection 與真實篩選由 spec-002 補齊。

## 權限

| 操作 | Permission Code | 說明 |
| --- | --- | --- |
| 檢視 | public | 所有人可看。 |

## 頁面結構

```text
Header
Main
  Page Intro
  Filter Bar
  Recipe Grid
  Empty Placeholder
  Internal Links
Footer
```

## 篩選器

| 欄位名稱 | 欄位類型 | 資料來源 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| 關鍵字 | input-text | client | 空 | 搜尋食譜名稱或食材。 |
| 分類 | chip-group | static placeholder | 全部 | 家常菜、便當菜、早餐等。 |
| 時間 | chip-group | static placeholder | 全部 | 10 分鐘、15 分鐘、30 分鐘內。 |
| 設備 | chip-group | static placeholder | 全部 | 電鍋、氣炸鍋、微波爐、平底鍋。 |

## 列表項目

使用 `RecipeCard`，欄位：

| 欄位名稱 | 型別 | 說明 |
| --- | --- | --- |
| title | text | 食譜名稱。 |
| description | text | 一句話描述。 |
| timeMeta | badge-row | 備料/烹調/總時間。 |
| ingredients | tag-list | 主要食材。 |
| equipment | tag-list | 設備。 |
| scenarioTags | tag-list | 情境標籤。 |

## 互動行為

- 篩選器在 spec-001 階段只改變視覺 active 狀態或保留為 non-functional placeholder。
- 點擊食譜卡在 spec-001 階段可導向 `#` 或第一筆 placeholder；spec-002 後改為 `/recipes/{slug}`。

## 響應式設計

| 斷點 | 佈局變化 |
| --- | --- |
| mobile | 篩選 chip 橫向捲動，食譜卡單欄。 |
| tablet | 食譜卡兩欄。 |
| desktop | 食譜卡三欄，filter bar 保持 sticky 可選。 |

## 狀態

| 狀態 | 顯示 |
| --- | --- |
| loading | spec-001 不需要，靜態 placeholder。 |
| empty | 「目前還沒有食譜，先看看熱門食材。」 |
| error | 無 API，不需 error 狀態。 |

## API 清單

無。

## 備註

- **PRD-003 / spec-013（2026-06-03）**：篩選狀態同步至 URL query（`keyword`、`category`、`time`、`tool`），可分享與重新整理保留；腳本為 `public/scripts/recipe-list-filter.js`。
