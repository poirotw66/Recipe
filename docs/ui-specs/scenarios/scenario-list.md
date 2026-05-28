---
name: 情境列表
description: 一人料理、租屋料理、電鍋料理等情境分類入口頁。
domain: scenarios
module: foundation
spec: spec-001
status: approved
route: /scenarios
apis: []
---

# 情境列表

## Meta

- 頁面類型：directory-page
- 頁面檔名：`src/pages/scenarios/index.astro`
- 建立：2026-05-28
- 更新：2026-05-28

## 說明

建立 SEO 情境頁入口。spec-001 階段提供情境卡片 placeholder；spec-003 後接入 `scenarios.json` 與詳細頁。

## 頁面結構

```text
Header
Main
  Page Intro
  Featured Scenarios
  Scenario Grid
  Cross Links to Ingredients and Recipes
Footer
```

## 情境卡欄位

| 欄位名稱 | 型別 | 說明 |
| --- | --- | --- |
| name | text | 情境名稱，例如一人料理。 |
| description | text | 一句話描述。 |
| recipeCount | number placeholder | 食譜數，spec-001 可隱藏或顯示「即將整理」。 |
| tags | tag-list | 設備、時間、飲食目標等。 |

## 互動行為

- 點擊卡片導向 `/scenarios/{slug}`，spec-001 可使用 placeholder slug。
- 無 API。

## 響應式設計

| 斷點 | 佈局變化 |
| --- | --- |
| mobile | 卡片單欄，重要情境優先。 |
| tablet | 兩欄。 |
| desktop | 三欄，Featured 可橫向排列。 |

## 視覺規範

- 使用便條紙與白瓷面交錯，避免整頁單一米色。
- 情境卡應強調「適合誰/何時用」，不是只有分類名稱。

## API 清單

無。
