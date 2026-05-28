# Spec-001: 專案骨架與部署 — Progress

## 設計文件

| 類型 | 名稱 | 路徑 | 自審 (Pass 1+2) | 狀態 | 備註 |
| --- | --- | --- | :---: | --- | --- |
| UISpec | 首頁 | docs/ui-specs/site/home.md | ✓ | 完成 | — |
| UISpec | 食譜列表 | docs/ui-specs/recipes/recipe-list.md | ✓ | 完成 | — |
| UISpec | 食材列表 | docs/ui-specs/ingredients/ingredient-list.md | ✓ | 完成 | — |
| UISpec | 情境列表 | docs/ui-specs/scenarios/scenario-list.md | ✓ | 完成 | — |
| UISpec | 冰箱剩料工具 | docs/ui-specs/tools/fridge-recipe.md | ✓ | 完成 | — |
| UISpec | 關於本站 | docs/ui-specs/legal/about.md | ✓ | 完成 | — |
| UISpec | 聯絡我們 | docs/ui-specs/legal/contact.md | ✓ | 完成 | — |
| UISpec | 隱私權政策 | docs/ui-specs/legal/privacy-policy.md | ✓ | 完成 | — |
| UISpec | 使用條款 | docs/ui-specs/legal/terms.md | ✓ | 完成 | — |

> 本 spec 不需要 ApiSpec 或 Schema，因為 PRD-001 第一階段明確不使用後端與資料庫。

### 交叉比對 (Pass 3)

- [x] spec-auditor Pass 3

## 測試策略

| 驗收條件 | 測試層級 | 理由 |
| --- | --- | --- |
| AC-1: `npm run build` 成功並產生 `dist/` | Build | Astro 靜態站最重要的部署前驗證。 |
| AC-2: 核心路由均有對應頁面 | Smoke | 確保 PRD 定義的 URL 已建立。 |
| AC-3: HTML head 有基礎 SEO 欄位 | Static/Unit | SEO head 是所有內容頁的共用基礎。 |
| AC-4: `/robots.txt` 和 `/ads.txt` 存在 | Smoke | 搜尋與 AdSense 的基礎檔案需可被存取。 |
| AC-5: Cloudflare Pages 設定可用且不需 Functions | Manual/Docs | 部署設定需要人工核對平台欄位。 |

## 進度

- [x] Phase 1: Spec approved
- [x] Phase 2: Develop
  - [x] Task 1: 建立 Astro + TypeScript 專案基礎設定
    - RED: `scripts/verify-site.mjs` — 檢查 Astro 設定檔與必要檔案存在；初始不存在時失敗 ✓
    - GREEN: `package.json`, `astro.config.mjs`, `tsconfig.json` — 建立 Astro + TypeScript 基礎設定 ✓
    - REFACTOR: 保持設定最小化，避免引入後端 runtime ✓
    - Test: Static verification ✓
  - [x] Task 2: 建立全站 layout、SEO head、Header、Footer
    - RED: `scripts/verify-site.mjs` — 檢查 BaseLayout 與 SEO markers；初始不存在時失敗 ✓
    - GREEN: `src/layouts/BaseLayout.astro`, `src/components/SeoHead.astro`, `src/components/Header.astro`, `src/components/Footer.astro` — 建立共用 UI shell ✓
    - REFACTOR: 將 SEO meta 集中在 `SeoHead.astro` ✓
    - Test: PowerShell static check ✓
  - [x] Task 3: 建立核心路由 placeholder
    - RED: `scripts/verify-site.mjs` — 檢查 9 個核心頁面；初始不存在時失敗 ✓
    - GREEN: `src/pages/**` — 建立首頁、列表頁、工具頁與政策頁 placeholder ✓
    - REFACTOR: 共用 BaseLayout 與設計 token，避免頁面內重複樣式 ✓
    - Test: PowerShell required-file check ✓
  - [x] Task 4: 建立 public SEO / AdSense 基礎檔案
    - RED: `scripts/verify-site.mjs` — 檢查 robots 與 ads.txt；初始不存在時失敗 ✓
    - GREEN: `public/robots.txt`, `public/ads.txt`, `public/images/.gitkeep` — 建立公開檔案 ✓
    - REFACTOR: `ads.txt` 使用明確 placeholder，避免偽造 publisher id ✓
    - Test: PowerShell content check ✓
  - [x] Task 5: 確認 Cloudflare Pages build settings 可使用
    - RED: `README.md` 不存在，部署設定無記錄 ✓
    - GREEN: `README.md` — 記錄 Astro build command、output directory、Node.js 版本與環境變數 ✓
    - REFACTOR: 將正式 AdSense publisher id 替換提醒寫入 README ✓
    - Test: Documentation review ✓
  - [x] Task 6: 跑 build 驗證
    - RED: `npm test` 初次失敗，原因：驗證腳本只檢查 BaseLayout，未納入 SeoHead markers ✓
    - GREEN: `scripts/verify-site.mjs` 改為檢查 BaseLayout + SeoHead；`npm test` 通過 ✓
    - REFACTOR: 透過 Git Bash + portable Node 執行，避開 UNC cwd 對 npm script 的影響 ✓
    - Test: `npm test` ✓ | `npm run build` ✓
- [x] Phase 3: Verify
  - 結果：PASS（Git Bash + `/c/Users/00896102/Desktop/node`，`npm test` 與 `npm run build` 通過）
  - 跳過：無
- [ ] Phase 4: Review
  - 結果：APPROVED / CHANGES_REQUESTED
  - Critical 0 | High 0 | Medium 0 | Low 0
- [ ] Phase 5: Close

## 決策紀錄

### 2026-05-28: spec-001 只建立專案骨架

- 考慮：把內容模型、SEO structured data、AdSense、工具頁一併納入。
- 決定：只建立 Astro 靜態站骨架、核心路由與部署基礎。
- 理由：PRD 已將內容模型、SEO、AdSense、工具頁拆成後續 specs；spec-001 應降低範圍，先讓專案可 build、可部署。
