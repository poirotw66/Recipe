---
name: 食材列表
description: 長尾 SEO 食材入口列表頁 placeholder。
domain: ingredients
module: foundation
spec: spec-001
status: approved
route: /ingredients
apis: []
---

# 食材列表

## Meta

- 頁面類型：directory-page
- 頁面檔名：`src/pages/ingredients/index.astro`
- 建立：2026-05-28
- 更新：2026-05-28

## 說明

建立食材長尾 SEO 的入口頁。spec-001 階段呈現分類與熱門食材 placeholder；真實 `ingredients.json` 與詳細頁由 spec-003 補齊。

## 頁面結構

```text
Header
Main
  Page Intro
  Ingredient Search
  Category Sections
  Popular Ingredients
  Related Scenario Links
Footer
```

## 區塊規格

| 區塊 | 說明 |
| --- | --- |
| Ingredient Search | 搜尋雞蛋、豆腐、雞胸肉等食材。 |
| Category Sections | 蛋類、豆製品、肉類、蔬菜、罐頭、主食。 |
| Popular Ingredients | 第一批 20 個優先食材 placeholder。 |
| Related Scenario Links | 一人料理、10 分鐘料理、冰箱剩料料理。 |

## 互動行為

- 搜尋送出時，若有輸入，導向 `/ingredients?keyword=...` 或在 spec-003 後導向最接近食材頁。
- 點擊食材卡在 spec-001 階段可連到 placeholder；spec-003 後導向 `/ingredients/{slug}`。

## 響應式設計

| 斷點 | 佈局變化 |
| --- | --- |
| mobile | 分類垂直排列，食材 chip 自動換行。 |
| tablet | 分類兩欄。 |
| desktop | 分類三欄或四欄，內容最大寬 1120px。 |

## 視覺規範

- 食材 chip 使用 `--note` 或 `--porcelain`。
- 分類標題可用 `--scallion` 細線或小圖示標示。
- 避免大面積照片牆，維持快速掃讀。

## API 清單

無。
