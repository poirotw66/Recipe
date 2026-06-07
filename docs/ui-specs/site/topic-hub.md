---
name: 主題專區頁
description: 早午餐、牛肉、義大利麵等主題集合頁，提供專區 hero、推薦食譜與分類食譜網格。
domain: site
module: foundation
spec: spec-016
status: implemented
route: /brunch/ | /beef/ | /pasta/
apis: []
---

# 主題專區頁

## Meta

- 頁面類型：topic-collection-page
- 頁面檔名：`src/pages/brunch/index.astro`、`src/pages/beef/index.astro`、`src/pages/pasta/index.astro`
- 共用元件：`src/components/TopicHubIntro.astro`
- 建立：2026-06-03
- 更新：2026-06-03
- Guideline：`guideline/ui/ui-guideline.md` v1.2
- UI 來源：`docs/prototypes/prd-005-brunch-hub.html`

## 說明

主題專區是「雜誌章節式」入口：全幅 hero、可選精選推薦卡、分類區塊與 RecipeCard 網格。視覺方向：**溫馨 · 精緻 · 高級**（香檳金點綴、暖象牙底、柔和景深）。內容與分類邏輯維持 spec-014，僅升級版面與樣式。

## 權限

| 操作 | Permission Code | 說明 |
| --- | --- | --- |
| 檢視 | public | 所有人可看。 |

## 頁面初始化

- 路由：`/brunch/`、`/beef/`、`/pasta/`
- 資料：`topic-hubs.json` + `getRecipesByTopicHub`
- API：無
- JSON-LD：CollectionPage、Breadcrumb、Thing（不變）

## 頁面結構

```text
Breadcrumb
TopicHubIntro
  hub-hero（全幅封面 + 標題 + stats）
  featured-card（可選，本週推薦）
HubSection × N
  hub-section__head（標題 + 篇數）
  RecipeCard grid
Ingredient pills + related scenarios（既有 card 區）
Footer links
```

## 區塊規格

| 區塊 | 元件 / class | 說明 |
| --- | --- | --- |
| Hero | `.hub-hero` | 背景為代表食譜 `coverImage`；漸層遮罩；stats：篇數等 |
| Featured | `.featured-card` | 連結至代表食譜詳情；outline badge「本週推薦」 |
| 分類區 | `.hub-section` | 底線分隔標題；內含 `.grid` + RecipeCard |
| 常用食材 | `.ingredient-pills` | 暖漸層底 + chip |

## 互動行為

- 所有卡片連結至既有食譜詳情路由，無新 JS。
- 空狀態：hub 無食譜時顯示 `empty-panel`（不變）。

## 視覺規範

- 依賴 spec-015 tokens：`--champagne`、`--font-display`、深綠主按鈕（footer links 用 `.button`）。
- 專區 label（Brunch / Beef / Pasta）顯示於 hero eyebrow。
- 分類標題底線：1px border + 32px 香檳色短線（`h2::after`）。

## 響應式

| 斷點 | 變化 |
| --- | --- |
| mobile | hero min-height 240px；featured 單欄；grid 1–2 欄 |
| desktop | hero 320px；featured 圖文雙欄；grid 2–3 欄 |

## 驗收

- [ ] 三個專區路由皆含 `hub-hero`、`hub-section`
- [ ] hero 使用 WEBP 封面，無破圖 fallback（gradient only）
- [ ] SEO / JSON-LD 欄位不變
