# Spec-009: 網頁 SEO 強化（集合與 taxonomy structured data）

## Meta

- 類型：SEO / Pages / QA
- 狀態：draft
- PRD：`docs/prds/prd-002.md`
- 行為規格：以 structured data 與內鏈訊號強化為主
- 依賴：`spec-002`, `spec-003`, `spec-008`
- 介面/驗收：`src/pages/recipes/index.astro`, `src/pages/ingredients/index.astro`, `src/pages/scenarios/index.astro`

## 1. 背景與目的

目前站點已具備：

- 食譜詳情頁的 Recipe JSON-LD
- 分類/索引頁（如 `/recipes`、`/ingredients`、`/scenarios`）的 CollectionPage JSON-LD
- breadcrumb、DefinedTerm/Thing JSON-LD 等補強

第二階段的目標是把「集合型索引頁」進一步做成更容易被 Google 理解的 structured data：為清單內容補上 ItemList/集合型描述，讓索引頁更完整地告知爬蟲「這個頁面列出哪些條目」。

## 2. Goals

- 為下列頁面補齊 ItemList（或等價集合型）structured data：
  - `/recipes`：列出的食譜清單
  - `/ingredients`：主要食材入口清單（含熱門/或全量集合，依頁面呈現策略）
  - `/scenarios`：料理情境入口清單
- 為主要 taxonomy detail 頁補充與清單相關的內鏈 structured data（可選但建議）：
  - `/ingredients/[slug]`：相關食譜清單
  - `/scenarios/[slug]`：推薦食譜清單（目前已顯示，但 structured data 可再補強）
- 更新站點驗證腳本（`scripts/verify-site.mjs`），新增 structured data 標記驗證。

## 3. Non-goals

- 不做 server-side API、也不新增後端資料庫。
- 不做大幅 UI 重構；僅將 structured data 載入注入現有頁面。

## 4. Scope

| Path | Purpose |
| --- | --- |
| `src/lib/seo.ts` | 新增 ItemList/Collection 清單型 json builder（與既有 absoluteUrl 及 JsonLd 注入機制相容） |
| `src/pages/recipes/index.astro` | 注入食譜清單 ItemList JSON-LD |
| `src/pages/ingredients/index.astro` | 注入食材清單 ItemList JSON-LD |
| `src/pages/scenarios/index.astro` | 注入情境清單 ItemList JSON-LD |
| `src/pages/ingredients/[slug].astro` |（可選）注入相關食譜 ItemList |
| `src/pages/scenarios/[slug].astro` |（可選）注入推薦食譜 ItemList |
| `scripts/verify-site.mjs` |（必要）加入 `ItemList` 相關 markers 檢查 |

## 5. Structured Data 規格（落地口徑）

- ItemList 的 `itemListElement` 必須包含每個條目的 `name` 與 `url`（以既有頁面 slug + canonical host 組合）。
- 清單頁的 item 數量：
  - `/recipes` 至少包含前若干筆（例如 20 筆，或與頁面呈現策略一致）
  - `/ingredients` 與 `/scenarios` 以頁面主要展示的集合為準
- 必須確保 injected structured data 與 canonical host 一致（依 `PUBLIC_SITE_URL`）。

## 6. 任務清單

1. [ ] 擴充 `src/lib/seo.ts`：新增 `buildItemListJsonLd(...)` helper
2. [ ] 修改清單頁：
   - [ ] `/recipes` 注入 ItemList
   - [ ] `/ingredients` 注入 ItemList
   - [ ] `/scenarios` 注入 ItemList
3. [ ] 修改 detail 頁（可選）：
   - [ ] `/ingredients/[slug]` 注入相關食譜 ItemList
   - [ ] `/scenarios/[slug]` 注入推薦食譜 ItemList
4. [ ] 擴充 `scripts/verify-site.mjs`：
   - [ ] 清單頁檢查 `ItemList` structured data 注入 markers
   - [ ] 需要時加入 detail 頁 markers
5. [ ] 跑 `npm test`、`npx astro check`、`npm run build`

## 7. 驗收條件（Acceptance Criteria）

- Given 清單頁載入，When 讀取 HTML 內 JSON-LD，Then structured data 中包含 `@type: "ItemList"`，且每個 item 有 `name` 與 `url`。
- Given `npm test`，When 驗證執行完成，Then structured data markers 檢查通過（不破壞 Phase-1/Phase-2 既有驗證）。
- Given `npm run build`，When 完成 build，Then `/recipes`、`/ingredients`、`/scenarios` 清單頁與（可選的）detail 頁可靜態輸出。

## 8. Exit Condition

當 structured data 與驗證腳本都完成 ItemList 注入並通過測試，即代表第二階段 SEO 強化基礎就緒，可以持續投入更多食譜內容。

