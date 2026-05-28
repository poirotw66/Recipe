# Spec-001: 專案骨架與部署

## Meta

- 類型：Infra
- 狀態：in-progress
- PRD：docs/prds/prd-001.md
- 行為規格：無
- UI 來源：無
- 依賴：無
- 建立：2026-05-28
- 更新：2026-05-28

## 1. 背景與目的

本 spec 對應 PRD-001 的第一個開發範圍：建立「今天煮什麼」食譜 SEO 站的可部署靜態站骨架。

第一階段的核心目標是以 0 元月費建立可被 Google 收錄、可申請 AdSense、可觀察 SEO 流量的內容站。此 spec 不處理大量內容、食譜資料模型、structured data 細節或工具頁邏輯；它只建立後續 spec 可以穩定接上的專案基礎。

## 2. 設計原則

- 靜態優先：使用 Astro 產生靜態頁，第一階段不使用後端、資料庫或 Cloudflare Workers。
- 可部署優先：專案一建立就能透過 `npm run build` 產出 `dist/`，符合 Cloudflare Pages 的部署模式。
- SEO 基礎先行：先建立全站 layout、meta 預設值、canonical 基礎與 robots/sitemap 檔案入口，讓後續內容頁能延伸。
- 路由穩定：先建立 PRD 定義的核心 URL，後續避免任意改 slug 造成 SEO 損失。
- 可分段擴充：內容模型、structured data、AdSense、冰箱剩料工具分別由後續 specs 展開。

## 3. 不在範圍內

- 不建立 300 篇食譜、100 個食材頁或 30 個情境頁。
- 不實作食譜 content collection 的完整 schema。
- 不實作 Recipe / FAQ / Breadcrumb JSON-LD 細節。
- 不串接 AdSense script 或廣告版位。
- 不實作冰箱剩料工具的比對邏輯。
- 不建立會員、收藏、留言、評分、CMS、資料庫、AI API。
- 不建立 Cloudflare Workers、D1、R2 或 Pages Functions。

## 4. 涉及範圍

### 頁面清單

| 動作 | 頁面 | 說明 | 設計來源 | UISpec |
| --- | --- | --- | --- | --- |
| 新增 | 首頁 `/` | 建立網站入口、品牌名、搜尋 CTA 與核心導流區 placeholder | PRD-001 / Spec.md | docs/ui-specs/site/home.md |
| 新增 | 食譜列表 `/recipes` | 建立食譜列表路由 placeholder，後續由 spec-002 補內容模型 | PRD-001 / Spec.md | docs/ui-specs/recipes/recipe-list.md |
| 新增 | 食材列表 `/ingredients` | 建立食材列表路由 placeholder，後續由 spec-003 補資料與導流 | PRD-001 / Spec.md | docs/ui-specs/ingredients/ingredient-list.md |
| 新增 | 情境列表 `/scenarios` | 建立情境列表路由 placeholder，後續由 spec-003 補資料與導流 | PRD-001 / Spec.md | docs/ui-specs/scenarios/scenario-list.md |
| 新增 | 冰箱剩料工具 `/tools/fridge-recipe` | 建立工具頁路由 placeholder，後續由 spec-006 補互動邏輯 | PRD-001 / Spec.md | docs/ui-specs/tools/fridge-recipe.md |
| 新增 | 關於本站 `/about` | 建立 AdSense 申請所需基本頁面 placeholder | PRD-001 / Spec.md | docs/ui-specs/legal/about.md |
| 新增 | 聯絡我們 `/contact` | 建立 AdSense 申請所需基本頁面 placeholder | PRD-001 / Spec.md | docs/ui-specs/legal/contact.md |
| 新增 | 隱私權政策 `/privacy-policy` | 建立 AdSense 申請所需基本頁面 placeholder | PRD-001 / Spec.md | docs/ui-specs/legal/privacy-policy.md |
| 新增 | 使用條款 `/terms` | 建立 AdSense 申請所需基本頁面 placeholder | PRD-001 / Spec.md | docs/ui-specs/legal/terms.md |

### API 清單

| 動作 | API | Method | Path | 說明 | ApiSpec |
| --- | --- | --- | --- | --- | --- |
| 參考 | 無 | - | - | 第一階段為純靜態站，本 spec 不建立 API | - |

### DB 清單

| 動作 | Table | 說明 | Schema |
| --- | --- | --- | --- |
| 參考 | 無 | 第一階段不使用資料庫 | - |

### 專案檔案與部署設定

| 動作 | 項目 | 說明 |
| --- | --- | --- |
| 新增 | `package.json` | 定義 Astro 專案 scripts 與 dependencies。 |
| 新增 | `astro.config.mjs` | Astro 基礎設定，輸出靜態站。 |
| 新增 | `tsconfig.json` | TypeScript 設定。 |
| 新增 | `src/layouts/BaseLayout.astro` | 全站 layout，提供 HTML shell、title、description、canonical、OG 基礎欄位。 |
| 新增 | `src/components/Header.astro` | 全站導覽。 |
| 新增 | `src/components/Footer.astro` | 全站 footer 與政策頁連結。 |
| 新增 | `src/components/SeoHead.astro` | SEO meta 集中處理。 |
| 新增 | `src/pages/**/*.astro` | 建立核心靜態路由 placeholder。 |
| 新增 | `public/robots.txt` | 開放搜尋引擎爬取並指向 sitemap index。 |
| 新增 | `public/ads.txt` | AdSense ads.txt placeholder，待取得 publisher id 後更新。 |
| 新增 | `public/images/` | 圖片存放目錄。 |

## 5. 業務規則

- 網站品牌名使用「今天煮什麼」。
- 第一階段不得引入伺服器端 runtime、資料庫、登入系統或 AI API。
- 所有公開頁面必須能由 Astro 靜態建置產生。
- 初始頁面可使用 placeholder 內容，但 URL 必須符合 PRD 定義。
- `PUBLIC_SITE_URL` 未設定時，canonical 可 fallback 為相對安全的站內路徑；部署前需以正式網域設定。
- `ads.txt` 初始可放 placeholder 註解，不得偽造 publisher id。

## 6. 實作任務

### 依賴圖

```text
task-1 -> task-2 -> task-3 -> task-4 -> task-5
                          \-> task-6
```

### 任務清單

1. [ ] 建立 Astro + TypeScript 專案基礎設定
   - 影響：`package.json`, `astro.config.mjs`, `tsconfig.json`
   - spec ref: docs/specs/001-project-foundation/spec.md
2. [ ] 建立全站 layout、SEO head、Header、Footer
   - 影響：`src/layouts/BaseLayout.astro`, `src/components/SeoHead.astro`, `src/components/Header.astro`, `src/components/Footer.astro`
   - spec ref: docs/ui-specs/site/home.md
3. [ ] 建立核心路由 placeholder
   - 影響：`src/pages/index.astro`, `src/pages/recipes/index.astro`, `src/pages/ingredients/index.astro`, `src/pages/scenarios/index.astro`, `src/pages/tools/fridge-recipe.astro`, legal pages
   - spec ref: docs/ui-specs/site/home.md
4. [ ] 建立 public SEO / AdSense 基礎檔案
   - 影響：`public/robots.txt`, `public/ads.txt`, `public/images/`
   - spec ref: docs/specs/001-project-foundation/spec.md
5. [ ] 確認 Cloudflare Pages build settings 可使用
   - 影響：專案 README 或部署說明
   - spec ref: docs/specs/001-project-foundation/spec.md
6. [ ] 跑 build 驗證
   - 影響：`dist/`
   - spec ref: docs/specs/001-project-foundation/progress.md

## 7. 驗收條件

- [ ] Given repo 已安裝依賴，When 執行 `npm run build`，Then Astro build 成功並產生 `dist/`。
- [ ] Given build 完成，When 檢查核心路由，Then `/`、`/recipes`、`/ingredients`、`/scenarios`、`/tools/fridge-recipe`、`/about`、`/contact`、`/privacy-policy`、`/terms` 均有對應頁面。
- [ ] Given 任一核心頁面，When 檢查 HTML head，Then 至少包含 title、description、canonical、Open Graph 基礎欄位。
- [ ] Given public assets，When 開啟 `/robots.txt` 和 `/ads.txt`，Then 檔案存在且內容不造成錯誤聲明。
- [ ] Given Cloudflare Pages 設定，When 使用 build command `npm run build`、output directory `dist`，Then 可部署靜態輸出，不需要 Pages Functions。

## 8. 約束與限制

- Node.js 版本以 20 或 22 為目標。
- 第一階段月費必須維持 US$0。
- 不得新增需要伺服器請求計費的 Pages Functions。
- 不得新增資料庫、登入、CMS、AI API 或動態搜尋 API。
- 頁面內容可以先是 placeholder，但視覺與資訊架構需可支撐後續內容擴充。

## 9. 成功標準

- `npm run build` 通過。
- Cloudflare Pages Free 的 build settings 明確可用。
- 核心 URL 結構符合 PRD。
- 後續 `spec-002` 至 `spec-007` 可在此骨架上延伸，不需重建專案結構。
