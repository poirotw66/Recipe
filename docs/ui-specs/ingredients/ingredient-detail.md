---
name: 食材詳細頁
description: 顯示單一食材的保存方式、營養資訊、搭配建議與相關食譜的詳細頁規格。
domain: ingredients
module: content
spec: spec-003
status: approved
route: /ingredients/{slug}
apis: []
---

# 食材詳細頁

## Meta

- 頁面類型：content-detail-page
- 頁面檔名：`src/pages/ingredients/[slug].astro`
- 建立：2026-05-29
- 更新：2026-05-29

## 說明

此頁是食材長尾 SEO 的核心頁。使用者應能快速了解某個常見食材如何保存、適合搭配什麼、有哪些代表料理，以及如果冰箱只有這個食材時可以往哪裡找菜。

## 頁面結構

```text
Header
Main
  Breadcrumb
  Ingredient Hero
  Nutrition / Storage Summary
  Common Pairings
  Substitute Ingredients
  Related Recipes
  Related Scenarios
Footer
```

## 區塊規格

| 區塊 | 說明 |
| --- | --- |
| Ingredient Hero | 顯示食材名稱、分類、別名與簡介。 |
| Nutrition Summary | 顯示熱量、蛋白質、脂肪、碳水化合物。 |
| Storage Summary | 顯示保存方式與料理提示。 |
| Common Pairings | 顯示常搭配食材。 |
| Substitute Ingredients | 顯示替代食材。 |
| Related Recipes | 顯示使用此食材的食譜卡。 |
| Related Scenarios | 顯示常出現的料理情境。 |

## 互動行為

- 點擊相關食譜卡導向 `/recipes/{slug}`。
- 點擊相關情境導向 `/scenarios/{slug}`。
- 無 API，資料全為靜態 JSON + build-time recipe 關聯。

## 響應式設計

- mobile：資訊區單欄，related cards 單欄。
- tablet：資訊卡 2 欄。
- desktop：資訊摘要可 2 欄，related cards 3 欄。
