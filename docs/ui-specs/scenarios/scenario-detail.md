---
name: 情境詳細頁
description: 顯示單一料理情境的介紹、適合的食譜、常見食材與相關情境的詳細頁規格。
domain: scenarios
module: content
spec: spec-003
status: approved
route: /scenarios/{slug}
apis: []
---

# 情境詳細頁

## Meta

- 頁面類型：content-detail-page
- 頁面檔名：`src/pages/scenarios/[slug].astro`
- 建立：2026-05-29
- 更新：2026-05-29

## 說明

此頁要讓使用者用「現在的生活狀況」找菜，而不是先想菜名。它同時是情境型 SEO 入口，應能清楚說明這個情境適合什麼料理、常見會用到哪些食材，以及還能延伸到哪些相近情境。

## 頁面結構

```text
Header
Main
  Breadcrumb
  Scenario Hero
  Scenario Intro
  Featured Recipes
  Common Ingredients
  Related Scenarios
Footer
```

## 區塊規格

| 區塊 | 說明 |
| --- | --- |
| Scenario Hero | 顯示情境名稱、簡介與 tag。 |
| Featured Recipes | 顯示符合情境的 recipe cards。 |
| Common Ingredients | 顯示此情境常見食材入口。 |
| Related Scenarios | 顯示相近情境入口。 |

## 互動行為

- 點擊食譜卡導向 `/recipes/{slug}`。
- 點擊食材導向 `/ingredients/{slug}`。
- 點擊相關情境導向 `/scenarios/{slug}`。

## 響應式設計

- mobile：hero 單欄，cards 單欄。
- tablet：cards 兩欄。
- desktop：cards 三欄，common ingredients 與 related scenarios 可並列。
