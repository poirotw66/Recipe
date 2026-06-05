# Spec-018: 多語食譜內容與試點批次

## Meta

- 類型：Content / i18n / QA
- 狀態：**paused**（2026-06-03 Human 暫停多語系專案）
- PRD：`docs/prds/prd-006.md`
- 依賴：`spec-002`, `spec-008`, `spec-014`, **`spec-017`**
- 建立：2026-06-03
- 更新：2026-06-03（翻譯產線：Gemini Flash latest，禁用通用機翻）

## 1. 背景與目的

在 spec-017 平台就緒後，建立**多語食譜 content 模型**，並交付 **15 篇旗艦食譜**的 en／ja／ko 完整譯文。其餘 85 篇依營運批次追加，本 spec 定義規則與驗證，不強制單次 400 檔。

## 2. Goals

- 定義多語 collection（建議）：
  - `recipes` → 繁中（現有 `src/content/recipes/`，視遷移調整為明確 `zh-TW` 或維持路徑）
  - `recipesEn` / `recipesJa` / `recipesKo` 或 `recipes-en` 等（`src/content.config.ts` 註冊）
- 每篇他語 frontmatter 必填：
  - `recipeId`：與繁中 **slug 相同**
  - 與繁中共用：`coverImage`、`prepTime`、`cookTime`、`totalTime`、`servings`、equipment **slug 化後的 id**（若 017 已完成 equipment id）
- 各語獨立：`title`、`description`、`intro`、`steps`、`tips`、`storage`、`faqs`、`category`（該語顯示名）、`difficulty`（該語 enum 或映射）
- **試點 15 篇**：由營運指定 slug 清單；他語正文由 **Gemini Flash（latest）** 依繁中稿產出（見 `gemini-translation.md`），**Human review** 後入庫；步驟數／順序與食材須與繁中一致。
- 他語食譜列表頁**僅列出該 locale 已有檔案的 slug**。
- Recipe JSON-LD 使用**當前頁語言**文字；`recipeCuisine` 隨語言調整（如 en: `Taiwanese home cooking`）。
- `verify-site.mjs`：
  - 試點 slug 集合內：四語檔案皆存在、schema 通過、`recipeId` 一致
  - `coverImage` 檔案存在（與繁中共用路徑）

## 3. Non-goals

- 一次翻譯全部 100 篇
- **Google Translate、DeepL 等通用機翻**作為譯文來源
- Gemini 產出**未經 Human review 即 merge**
- 簡體中文
- 每語言不同 slug

## 4. 翻譯與品質（Gemini Flash latest）

譯文產線以 **`docs/specs/018-i18n-content-batch/gemini-translation.md`** 為準。

| 項目 | 規定 |
| --- | --- |
| 模型 | **Gemini Flash（latest）**（API／AI Studio 當下最新 stable Flash 型號） |
| 來源 | 僅繁中 `src/content/recipes/{slug}.md` |
| 禁止 | 通用機翻服務、站內即時翻譯 API |
| 流程 | 繁中稿 → Gemini（每 slug × 每目標語一次）→ **Human review** → 寫入 `recipes-en`／`recipes-ja`／`recipes-ko` → `npm test` |
| 數字 | `prepTime`／`cookTime`／`totalTime`／`servings`、食材 `amount` **不變**；可本地化 `unit` 用字 |
| 步驟 | 與繁中 **條數與順序一致** |
| 字元 | 禁止簡體；ja/ko 用自然慣用表記 |
| 圖片 | 沿用同一 `coverImage` |

後續批次（85 篇）沿用同一 Gemini Flash 流程，不另開 MT 管道。

## 5. 試點 slug 清單（待 Develop 前 Human 確認）

預設候選（可調整）：

1. `tomato-egg-rice`
2. `scallion-egg-rice`
3. `garlic-oil-pasta`
4. `tomato-garlic-pasta`
5. `pesto-chicken-pasta`
6. `beef-broccoli-stirfry`
7. `scallion-beef-stirfry`
8. `airfryer-garlic-chicken-broccoli`
9. `tofu-scrambled-eggs`
10. `tomato-tofu-soup`
11. `steamed-chicken-bento`
12. `mushroom-beef-rice-bowl`
13. `onion-egg-rice-bowl`
14. `broccoli-mushroom-chicken-rice-bowl`
15. `creamy-mushroom-pasta`

## 6. Scope（檔案）

| Path | Purpose |
| --- | --- |
| `src/content.config.ts` | 多語 collection schema（difficulty/category 可 locale-specific enum） |
| `src/content/recipes-en/*.md` 等 | 他語食譜 |
| `src/lib/recipes.ts` | `getRecipe(slug, locale)`、列表過濾 |
| `src/pages/recipes/[slug].astro`（或 locale 版） | 依 locale 載入 collection |
| `src/lib/seo.ts` | `buildRecipeJsonLd` 多語欄位 |
| `scripts/verify-site.mjs` | 試點四語成對檢查 |
| `docs/specs/018-i18n-content-batch/gemini-translation.md` | Gemini Flash prompt、workflow、品質門檻 |
| `docs/content/i18n-pilot-slugs.md`（可選） | 試點清單與翻譯狀態表 |

## 7. 驗收條件

- [ ] 試點 15 slug × 3 他語 = 45 新檔 + 原 15 繁中，共可 build
- [ ] 任一試點頁 `/en/recipes/{slug}/` hreflang 四語 + x-default 正確
- [ ] 步驟數 ≥3，且與繁中篇數一致
- [ ] `npm test` / `npm run build` 通過
- [ ] 簡體字掃描（可選 script grep）無命中於新檔
- [ ] 他語檔案產出流程可追溯為 Gemini Flash + Human review（非通用機翻）

## 8. 後續批次（Phase C）

- 每批次建議 15～25 篇；更新 `docs/content/i18n-pilot-slugs.md` 或 verification 中的 slug 集合
- 100% 覆蓋非本 spec close 必要條件；close 以「試點 + 規則落地」為準
