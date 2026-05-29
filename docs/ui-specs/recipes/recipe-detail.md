---
name: 食譜詳細頁
description: 顯示單篇食譜內容、料理資訊、FAQ 與關聯導流的詳細頁規格。
domain: recipes
module: content
spec: spec-002
status: approved
route: /recipes/{slug}
apis: []
---

# 食譜詳細頁

## Meta

- 頁面類型：content-detail-page
- 頁面檔名：`src/pages/recipes/[slug].astro`
- 建立：2026-05-28
- 更新：2026-05-28
- Guideline：`guideline/ui/ui-guideline.md`

## 說明

此頁是食譜 SEO 站的核心內容頁。使用者應能在進頁後快速理解這道料理適不適合自己現在的情境，並立即看到時間、份量、設備、主要食材與操作步驟。頁面需保留 FAQ、相關食譜與相關食材入口，方便後續 `spec-004` 補 structured data、`spec-005` 補廣告位、`spec-006` 補工具關聯導流。

## 權限

| 操作 | Permission Code | 說明 |
| --- | --- | --- |
| 檢視 | public | 所有人可看。 |

## 頁面初始化

- 路由：`/recipes/{slug}`
- 資料來源：Astro content collection `recipes`
- 權限檢查：無
- API：無

## 頁面結構

```text
Header
Main
  Breadcrumb
  Recipe Hero
    Title
    Summary
    Meta Row
    Tag Row
    Cover Image
  Recipe Intro
  Recipe Two Column
    Ingredients + Seasonings
    Steps
  Notes / Storage / Substitutions
  FAQ
  Related Recipes
  Related Ingredients
Footer
```

## 區塊規格

| 區塊 | 元件 | 說明 |
| --- | --- | --- |
| Breadcrumb | `BreadcrumbLinks` | 顯示首頁 / 食譜 / 食譜名稱。 |
| Recipe Hero | `RecipeHero` | 顯示標題、描述、時間、份量、難度、設備與情境標籤。 |
| Intro | `RecipeIntro` | 一段 2-4 句的料理介紹。 |
| Ingredients Panel | `IngredientPanel` | 食材清單與調味料分開列出。 |
| Steps Panel | `RecipeSteps` | 編號步驟列表。 |
| Notes Sections | `RecipeNotes` | 包含小技巧、保存方式、替代食材。 |
| FAQ | `FaqList` | 2-4 題常見問題。 |
| Related Recipes | `RecipeCardGrid` | 同情境、同主要食材或相近設備的食譜。 |
| Related Ingredients | `IngredientChipLinks` | 連到 `spec-003` 的食材頁入口。 |

## 欄位

| 欄位名稱 | 欄位類型 | 資料來源 | 預設值 | 說明 |
| --- | --- | --- | --- | --- |
| 標題 | text | recipe.title | 必填 | H1。 |
| 描述 | text | recipe.description | 必填 | Hero 簡介與 meta description 基礎。 |
| 成品圖 | image | recipe.coverImage | 必填 | spec-002 可先用 `/images/...` placeholder。 |
| 份量 | text/number | recipe.servings | 必填 | 例如 `1 人份`。 |
| 備料時間 | badge | recipe.prepTime | 必填 | 單位分鐘。 |
| 烹調時間 | badge | recipe.cookTime | 必填 | 單位分鐘。 |
| 總時間 | badge | recipe.totalTime | 必填 | 單位分鐘。 |
| 難度 | badge | recipe.difficulty | 必填 | 簡單 / 中等。 |
| 主要食材 | tag-list | recipe.ingredients | 必填 | Hero 可只顯示前 3-4 個。 |
| 情境標籤 | tag-list | recipe.scenarios | 選填 | 一人料理、10 分鐘料理等。 |
| 設備標籤 | tag-list | recipe.equipment | 選填 | 電鍋、平底鍋等。 |
| 食材清單 | list | recipe.ingredients | 必填 | 顯示名稱、數量、單位。 |
| 調味料 | list | recipe.seasonings | 選填 | 顯示名稱、數量、單位。 |
| 步驟 | ordered-list | Markdown body / structured field | 必填 | 至少 3 步。 |
| 小技巧 | rich text | Markdown body / frontmatter | 選填 | 可 1-3 點。 |
| 保存方式 | rich text | Markdown body / frontmatter | 選填 | 可 1 段。 |
| 替代食材 | tag-list / text | recipe.substitutions | 選填 | 後續可與食材資料連動。 |
| FAQ | accordion/list | recipe.faqs | 選填 | 至少 2 題時顯示。 |

## 操作按鈕

| 按鈕 | 類型 | 位置 | 顯示條件 | 說明 |
| --- | --- | --- | --- | --- |
| 看全部食譜 | Secondary | Hero 或 Related 區塊 | 永遠 | 導向 `/recipes`。 |
| 用這些食材找更多料理 | Note | Related Ingredients 下方 | 有主要食材時 | 導向 `/tools/fridge-recipe` 或對應食材入口。 |
| 看同情境料理 | Text | Tag / Related 區塊 | 有 scenario 時 | 導向 `/scenarios`。 |

## 互動行為

- `spec-002` 階段以靜態內容為主，不需要複雜互動。
- FAQ 可直接展開顯示，也可先做靜態列表，不強制 accordion。
- 點擊相關食譜卡導向對應 `/recipes/{slug}`。
- 點擊相關食材 chip 在 `spec-002` 階段可先導向 `/ingredients`；`spec-003` 後改為 `/ingredients/{slug}`。

## 響應式設計

| 斷點 | 佈局變化 |
| --- | --- |
| mobile | Hero 單欄；食材與步驟上下排列；related cards 單欄。 |
| tablet | Hero 仍以單欄為主；食材與步驟可 2 欄；related cards 兩欄。 |
| desktop | Hero 可做文字/圖片 2 欄；內容主體最大寬 1120px；related cards 三欄。 |

## 視覺規範

- Hero 仍以「冰箱便條感」為主，不做雜誌型大片視覺。
- 重要 meta badge 使用 `--note`、`--egg-yolk`、`--scallion` 的既有 token。
- 食材清單與步驟區塊需有明確視覺分隔，但維持細邊框與淡陰影。
- FAQ、相關食譜與相關食材應保持容易掃讀，不要堆疊過多裝飾。

## 空狀態 / 錯誤狀態

- 找不到 slug：顯示 Astro 404。
- FAQ 不足：整段可隱藏。
- 相關食譜不足 3 筆：顯示現有筆數即可，不補假資料。

## API 清單

無。

## 備註

- `spec-004` 會根據本頁欄位補上 Recipe / FAQ / Breadcrumb JSON-LD。
- `spec-005` 可在 Hero 下方、食材清單後、文章底部插入 AdSlot。
