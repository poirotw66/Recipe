---
name: 首頁
description: 今天煮什麼的首頁，提供食材搜尋、熱門分類與核心 SEO 導流入口。
domain: site
module: foundation
spec: spec-001
status: approved
route: /
apis: []
---

# 首頁

## Meta

- 頁面類型：landing-search-page
- 頁面檔名：`src/pages/index.astro`
- 建立：2026-05-28
- 更新：2026-05-28
- Guideline：`guideline/ui/ui-guideline.md`

## 說明

首頁要讓使用者在第一屏理解本站用途：「用冰箱現有食材，快速找到今天能煮的簡單料理」。此頁不是行銷 landing page，而是 SEO 內容站的導流樞紐，優先提供搜尋、食材入口、情境入口與熱門食譜 placeholder。

## 權限

| 操作 | Permission Code | 說明 |
| --- | --- | --- |
| 檢視 | public | 所有人可看。 |

## 頁面初始化

- 路由：`/`
- 權限檢查：無。
- API：無。第一階段使用靜態資料或 placeholder。

## 頁面結構

```text
Header
Main
  Hero Search
    Brand title
    Value copy
    Ingredient search input
    Primary CTA
    Popular quick chips
  Scenario Entrances
  Popular Recipes
  Popular Ingredients
  Tool Highlight
Footer
```

## 區塊規格

| 區塊 | 元件 | 說明 |
| --- | --- | --- |
| Hero Search | `SearchPanel` | 便條紙表面，包含食材輸入與 CTA。 |
| Quick Chips | `TagList` | 顯示雞蛋、豆腐、雞胸肉、高麗菜、電鍋料理等快速入口。 |
| Scenario Entrances | `ScenarioGrid` | 一人料理、租屋料理、10 分鐘料理、電鍋料理、氣炸鍋料理、減脂料理。 |
| Popular Recipes | `RecipeCardGrid` | placeholder 食譜卡，後續由 spec-002 接資料。 |
| Popular Ingredients | `IngredientLinkGrid` | 長尾 SEO 食材入口。 |
| Tool Highlight | `ToolPromo` | 導向 `/tools/fridge-recipe`。 |

## 欄位

| 欄位名稱 | 欄位類型 | 資料來源 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| 食材輸入 | input-text | 使用者輸入 | 空字串 | placeholder：「雞蛋、豆腐、高麗菜」。 |
| 快速食材 | link-chip | 靜態清單 | 雞蛋、豆腐、雞胸肉 | 點擊導向食材或工具頁。 |

## 操作按鈕

| 按鈕 | 類型 | 位置 | 顯示條件 | 說明 |
| --- | --- | --- | --- | --- |
| 找今天能煮的料理 | Primary | Hero 搜尋框右側/下方 | 永遠 | 若有輸入，帶 query 前往 `/tools/fridge-recipe`。 |
| 看全部食譜 | Secondary | Popular Recipes 區塊 | 永遠 | 導向 `/recipes`。 |
| 用冰箱剩料找食譜 | Note | Tool Highlight | 永遠 | 導向 `/tools/fridge-recipe`。 |

## 互動行為

### 食材搜尋

- 觸發條件：使用者輸入食材後按 CTA 或 Enter。
- API：無。
- 成功：導向 `/tools/fridge-recipe?ingredients=...`。
- 失敗：若空白送出，停留原頁並在欄位下顯示「先輸入 1-3 樣你手邊有的食材」。

### 快速入口

- 觸發條件：點擊 chip 或卡片。
- API：無。
- 成功：導向對應靜態路由。

## 狀態管理

| 狀態 | 初始值 | 變更時機 | 影響 |
| --- | --- | --- | --- |
| `ingredientsInput` | `""` | 使用者輸入 | CTA query。 |
| `inputError` | `null` | 空白 submit | 顯示錯誤訊息。 |

## 響應式設計

| 斷點 | 佈局變化 |
| --- | --- |
| mobile | Hero 單欄，搜尋框與 CTA 垂直排列；卡片單欄。 |
| tablet | Hero 仍單欄，Scenario 兩欄。 |
| desktop | Hero 搜尋列可水平排列；Recipe/Scenario grid 三欄。 |

## 視覺規範

- 使用 `--rice` 作背景，Hero 搜尋面使用 `--note`。
- Primary CTA 使用 `--scallion`。
- 食譜卡採冰箱便條風格，8px 以下圓角、細邊框、極淡陰影。
- 首屏不得使用大幅純裝飾圖壓過搜尋任務。

## 空狀態 / 錯誤狀態

- 食材輸入空白：欄位下方顯示錯誤，不跳頁。
- 熱門食譜尚無資料：顯示 3 張 placeholder 食譜卡。

## API 清單

無。

## 備註

- 後續 spec-002 會接入真實食譜資料。
- 後續 spec-006 會實作冰箱剩料工具的比對邏輯。
