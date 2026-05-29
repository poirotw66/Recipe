# Spec-002: 內容模型與食譜頁

## Meta

- 類型：Content / Pages
- 狀態：approved
- PRD：docs/prds/prd-001.md
- 行為規格：無
- UI 來源：docs/ui-specs/recipes/recipe-list.md, docs/ui-specs/recipes/recipe-detail.md
- 依賴：docs/specs/001-project-foundation/spec.md
- 建立：2026-05-28
- 更新：2026-05-29

## 1. 背景與目的

`spec-001` 已完成可部署的 Astro 靜態站骨架，但目前首頁與 `/recipes` 仍是 placeholder 內容，尚未建立可擴充的食譜內容來源與單篇頁路由。

本 spec 的目的是把「食譜」變成真正可被擴充的內容模組，讓站點能從靜態框架進入 SEO 內容站階段。完成後，專案應具備：

- Markdown 食譜 content collection。
- `/recipes` 列表頁可讀取 collection 並輸出卡片。
- `/recipes/[slug]` 單篇食譜頁可靜態產生。
- 食譜 frontmatter 欄位足以支撐後續 `spec-004` structured data、`spec-006` 冰箱剩料工具、`spec-007` 內容生產。

## 2. 設計原則

- 內容優先：食譜資料以 Markdown 為主，避免第一階段引入 CMS 或資料庫。
- Schema 明確：透過 Astro content collection schema 先把欄位定義穩定下來，避免後續內容格式漂移。
- 靜態輸出：列表頁與詳細頁必須都能由 `astro build` 直接產生。
- SEO 可延伸：欄位命名需支援 title、description、slug、image、營養、時間與關聯資訊。
- 與後續 spec 對齊：recipe schema 要能被 `spec-004` 拿來產出 JSON-LD，也能被 `spec-006` 拿來做本地比對。

## 3. 不在範圍內

- 不建立食材詳細頁與情境詳細頁；這些由 `spec-003` 處理。
- 不插入 AdSense script 或 AdSlot 元件；由 `spec-005` 處理。
- 不產出 Recipe / FAQ / Breadcrumb JSON-LD；由 `spec-004` 處理。
- 不建立 300 篇正式內容；由 `spec-007` 處理。
- 不實作冰箱剩料工具的排序與比對；由 `spec-006` 處理。
- 不導入 CMS、資料庫、搜尋 API 或後端。

## 4. 涉及範圍

### 頁面清單

| 動作 | 頁面 | 說明 | 設計來源 | UISpec |
| --- | --- | --- | --- | --- |
| 修改 | 首頁 `/` | 熱門食譜區改為讀取真實 recipe collection 的最新/精選資料。 | PRD-001 / Spec.md | docs/ui-specs/site/home.md |
| 修改 | 食譜列表 `/recipes` | 改由 content collection 驅動，輸出真實食譜卡與基礎前端篩選。 | PRD-001 / Spec.md | docs/ui-specs/recipes/recipe-list.md |
| 新增 | 食譜詳細頁 `/recipes/[slug]` | 產生每篇食譜的靜態詳細頁，包含內文、meta 區、關聯連結與 FAQ 區塊骨架。 | PRD-001 / Spec.md | docs/ui-specs/recipes/recipe-detail.md |

### API 清單

| 動作 | API | Method | Path | 說明 | ApiSpec |
| --- | --- | --- | --- | --- | --- |
| 參考 | 無 | - | - | 本 spec 以 build-time content collection 產生頁面，不建立 API。 | - |

### DB 清單

| 動作 | Table | 說明 | Schema |
| --- | --- | --- | --- |
| 參考 | 無 | 本 spec 不使用資料庫。 | - |

### 內容模型與檔案

| 動作 | 項目 | 說明 |
| --- | --- | --- |
| 新增 | `src/content.config.ts` | 定義 Astro content collection 與 recipe schema。 |
| 新增 | `src/content/recipes/*.md` | 存放食譜 Markdown；本 spec 至少需要少量 seed content 讓路由可驗證。 |
| 新增 | `src/components/RecipeCard.astro` | 抽出列表與首頁共用食譜卡。 |
| 新增 | `src/layouts/RecipeLayout.astro` | 食譜詳細頁共用 layout。 |
| 修改 | `src/pages/index.astro` | 以 collection 資料取代首頁熱門食譜 placeholder。 |
| 修改 | `src/pages/recipes/index.astro` | 載入 recipe collection，支援靜態條件篩選或 client-side filter。 |
| 新增 | `src/pages/recipes/[slug].astro` | 使用 `getStaticPaths()` 產生食譜詳細頁。 |
| 新增 | `src/lib/recipes.ts` 或等效模組 | 集中處理 recipe 排序、列表轉換、篩選條件正規化。 |
| 修改 | `src/styles/global.css` | 補足 recipe detail 版型、meta row、步驟區與 FAQ 區塊樣式。 |

## 5. 業務規則

- 每篇食譜必須有唯一 `slug`，一旦公開後不可任意變更。
- 每篇食譜至少需要：`title`、`description`、`slug`、`coverImage`、`servings`、`prepTime`、`cookTime`、`totalTime`、`difficulty`、`ingredients`、`seasonings`、`tags`、`scenarios`、`equipment`、`publishedAt`、`updatedAt`。
- `totalTime` 必須大於或等於 `prepTime + cookTime`；若內容端未提供，build-time 驗證應報錯或自動拒收。
- `ingredients[].name` 必須保留原始顯示名稱；後續與 `spec-003` 食材資料對接時再補 canonical 對應欄位。
- 食譜列表頁至少支援：關鍵字、分類、時間、設備四種篩選維度；第一版可採前端靜態篩選。
- 單篇食譜頁至少要包含：簡介、食材清單、調味料、步驟、小技巧、保存方式、FAQ、相關食譜入口。
- 至少保留一組可供 `spec-006` 使用的比對欄位，例如 `ingredients`, `tags`, `equipment`, `scenarios`, `totalTime`, `protein`。

## 6. 實作任務

### 依賴圖

```text
task-1 -> task-2 -> task-3 -> task-4 -> task-5
                 \-> task-6 -> task-7
```

### 任務清單

1. [ ] 建立 recipe content collection schema
   - 影響：`src/content.config.ts`
   - spec ref: docs/specs/002-content-recipes/spec.md
2. [ ] 建立少量 seed recipes 作為 build 驗證資料
   - 影響：`src/content/recipes/*.md`
   - spec ref: docs/specs/002-content-recipes/spec.md
3. [ ] 建立共用 `RecipeCard` 與 recipe helper
   - 影響：`src/components/RecipeCard.astro`, `src/lib/recipes.ts`
   - spec ref: docs/ui-specs/recipes/recipe-list.md
4. [ ] 改寫首頁熱門食譜與 `/recipes` 列表頁，接上 collection
   - 影響：`src/pages/index.astro`, `src/pages/recipes/index.astro`
   - spec ref: docs/ui-specs/site/home.md, docs/ui-specs/recipes/recipe-list.md
5. [ ] 建立 `RecipeLayout` 與 `/recipes/[slug]`
   - 影響：`src/layouts/RecipeLayout.astro`, `src/pages/recipes/[slug].astro`
   - spec ref: docs/ui-specs/recipes/recipe-detail.md
6. [ ] 補足 recipe detail 樣式與內鏈區塊
   - 影響：`src/styles/global.css`
   - spec ref: docs/specs/002-content-recipes/spec.md
7. [ ] 跑 build / type / smoke 驗證
   - 影響：`scripts/verify-site.mjs`, `dist/`
   - spec ref: docs/specs/002-content-recipes/progress.md

## 7. 驗收條件

- [ ] Given 至少 3 篇 recipe markdown，When 執行 `npm run build`，Then `/recipes` 與 `/recipes/{slug}` 靜態頁可成功產生。
- [ ] Given recipe frontmatter 缺少必填欄位，When build 或 type check，Then schema 驗證失敗並阻止通過。
- [ ] Given `/recipes`，When 頁面載入，Then 至少顯示標題、描述、時間、主要食材、設備或情境標籤。
- [ ] Given `/recipes/[slug]`，When 開啟任一食譜頁，Then 可看到食譜簡介、食材清單、步驟、FAQ 與相關食譜入口。
- [ ] Given 首頁熱門食譜區，When build 完成，Then 內容來自真實 collection，而非手寫 placeholder 陣列。
- [ ] Given 後續 `spec-004` 與 `spec-006`，When 讀取 recipe schema，Then 可直接取得時間、營養、食材與標籤欄位。

## 8. 約束與限制

- 仍需維持純靜態架構，不可引入 API、CMS 或資料庫。
- 第一版 seed content 只做系統驗證，不代表正式上線內容量。
- recipe detail UI 需遵循 `docs/ui-specs/recipes/recipe-detail.md` 與既有 design tokens。
- 路由與欄位命名必須優先考慮未來 SEO 穩定性，不得以開發方便為由頻繁改 slug 或 schema key。

## 9. 成功標準

- 專案具備可擴充的 recipe content collection。
- `/recipes` 與 `/recipes/[slug]` 由真實內容驅動。
- Schema 足以支撐後續 SEO、工具頁與內容生產 specs。
- 後續 `spec-003`、`spec-004`、`spec-006`、`spec-007` 不需要重拆 recipe 資料模型。
