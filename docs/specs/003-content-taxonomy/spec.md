# Spec-003: 食材與情境頁

## Meta

- 類型：Content / Pages
- 狀態：approved
- PRD：docs/prds/prd-001.md
- 行為規格：無
- UI 來源：docs/ui-specs/ingredients/ingredient-list.md, docs/ui-specs/ingredients/ingredient-detail.md, docs/ui-specs/scenarios/scenario-list.md, docs/ui-specs/scenarios/scenario-detail.md
- 依賴：docs/specs/001-project-foundation/spec.md, docs/specs/002-content-recipes/spec.md
- 建立：2026-05-29
- 更新：2026-05-29

## 1. 背景與目的

`spec-002` 已完成食譜資料模型與食譜頁，但目前食材與情境仍只有 placeholder 列表頁，無法形成完整的 taxonomy 導流。這會讓長尾 SEO 與冰箱剩料工具後續依賴缺一半。

本 spec 的目標是把食材與情境從 placeholder 變成可被 recipe 內容反向關聯的靜態資料模組，完成後應具備：

- 食材 JSON 與情境 JSON 資料來源。
- `/ingredients`、`/ingredients/[slug]`。
- `/scenarios`、`/scenarios/[slug]`。
- recipe detail、ingredients、scenarios 三者之間的基礎導流。

## 2. 設計原則

- 靜態資料優先：使用 JSON 建立 taxonomy，不引入 API 或資料庫。
- 與 recipe model 對齊：食材名稱與情境名稱需能和 `spec-002` recipe content 關聯。
- SEO 導流導向：每個 taxonomy 頁都必須能回連到 recipes。
- 命名穩定：ingredient/scenario slug 一旦公開後避免任意調整。

## 3. 不在範圍內

- 不加入 structured data；由 `spec-004` 處理。
- 不做工具頁比對邏輯；由 `spec-006` 處理。
- 不建立大量正式內容批次；由 `spec-007` 處理。
- 不導入 CMS、資料庫或 API。

## 4. 涉及範圍

### 頁面清單

| 動作 | 頁面 | 說明 | UISpec |
| --- | --- | --- | --- |
| 修改 | `/ingredients` | 由 JSON 驅動分類、熱門食材與 recipe 導流。 | docs/ui-specs/ingredients/ingredient-list.md |
| 新增 | `/ingredients/[slug]` | 顯示食材介紹、保存、營養、搭配、替代與相關食譜。 | docs/ui-specs/ingredients/ingredient-detail.md |
| 修改 | `/scenarios` | 由 JSON 驅動情境列表與精選情境。 | docs/ui-specs/scenarios/scenario-list.md |
| 新增 | `/scenarios/[slug]` | 顯示情境介紹、推薦食譜、常見食材與相關情境。 | docs/ui-specs/scenarios/scenario-detail.md |
| 修改 | `/recipes/[slug]` | 將相關食材與情境連到真實 slug。 | docs/ui-specs/recipes/recipe-detail.md |

### 資料與檔案

| 動作 | 項目 | 說明 |
| --- | --- | --- |
| 新增 | `src/data/ingredients.json` | 食材資料來源。 |
| 新增 | `src/data/scenarios.json` | 情境資料來源。 |
| 新增 | `src/lib/taxonomy.ts` | taxonomy 資料讀取與 recipe 關聯 helper。 |
| 修改 | `src/pages/ingredients/index.astro` | 讀取真實食材資料。 |
| 新增 | `src/pages/ingredients/[slug].astro` | 建立食材詳頁。 |
| 修改 | `src/pages/scenarios/index.astro` | 讀取真實情境資料。 |
| 新增 | `src/pages/scenarios/[slug].astro` | 建立情境詳頁。 |
| 修改 | `src/pages/recipes/[slug].astro` | 將 related links 接到 taxonomy。 |
| 修改 | `scripts/verify-site.mjs` | 擴充 spec-003 驗證。 |

## 5. 業務規則

- 每個 ingredient 必須包含 `name`, `slug`, `category`, `description`, `storage`。
- 每個 scenario 必須包含 `name`, `slug`, `description`, `seoTitle`, `seoDescription`。
- ingredient 與 recipe 的關聯先以名稱/別名比對完成。
- scenario 與 recipe 的關聯先以情境名稱比對完成。
- ingredient detail 至少顯示 1 組相關情境與相關食譜。
- scenario detail 至少顯示 1 組常見食材與相關食譜。

## 6. 實作任務

1. [x] 建立 ingredients/scenarios JSON
2. [x] 建立 taxonomy helper
3. [x] 改寫 `/ingredients`
4. [x] 建立 `/ingredients/[slug]`
5. [x] 改寫 `/scenarios`
6. [x] 建立 `/scenarios/[slug]`
7. [x] 將 recipe detail 連到真實 taxonomy
8. [x] 驗證 build / type / smoke

## 7. 驗收條件

- [x] `npm run build` 可產生 ingredient/scenario detail routes。
- [x] `/ingredients` 由真實 JSON 驅動分類與熱門食材。
- [x] `/ingredients/[slug]` 顯示保存方式、營養、搭配、替代與相關食譜。
- [x] `/scenarios` 由真實 JSON 驅動情境卡。
- [x] `/scenarios/[slug]` 顯示情境說明、推薦食譜、常見食材與相關情境。
- [x] recipe detail 的相關食材與情境可連到真實 slug。

## 8. 約束與限制

- 仍維持靜態 JSON + build-time 關聯。
- 目前資料量以 seed taxonomy 為主，非正式內容批次。

## 9. 成功標準

- taxonomy pages 已成為 recipe 與首頁之外的第二層內容入口。
- 後續 `spec-004`、`spec-006`、`spec-007` 可直接依賴這批 taxonomy 資料。
