# Spec-008: 內容擴充批次（新增食譜至 50+）

## Meta

- 類型：Content / Pages / QA
- 狀態：draft
- PRD：`docs/prds/prd-002.md`
- 行為規格：N/A（以資料與驗證腳本為核心）
- 依賴：`spec-002`, `spec-003`, `spec-007`
- UI 來源：`src/components/RecipeCard.astro`、`src/pages/recipes/*`
- 建立：2026-06-02
- 更新：2026-06-02

## 1. 背景與目的

第二階段的主槓桿是提升可被 Google 收錄的食譜頁面數量。現階段站點 MVP 以 12 篇為基礎；本 spec 目標是把食譜總數擴充到至少 50 篇，並確保每篇食譜的 `coverImage` 對應的檔案存在，避免產生 404 影響體驗與 structured data。

## 2. Goals

- 將 `src/content/recipes` 擴充至至少 50 篇（從目前的 12 篇起）。
- 確保每篇食譜：
  - `coverImage` 使用 `/images/recipes/{slug}.webp` 路徑規則
  - 對應檔案存在於 `public/images/recipes/`
- 更新站點驗證腳本與建置驗證門檻，使第二階段可持續驗收。

## 3. Non-goals

- 不引入 CMS／後端資料庫／會員登入等機制。
- 不改動現有 slug 與路由設計（SEO 穩定性優先）。
- 不做真正的圖片壓縮管線（僅要求 `coverImage` 可用；圖片品質與產圖流程可在後續內容運營中處理）。

## 4. Scope

| Path | Purpose |
| --- | --- |
| `src/content/recipes/*.md` | 新增/擴充食譜 Markdown，維持 schema 合規 |
| `public/images/recipes/*` | 補齊對應 cover 圖（至少確保檔案存在） |
| `scripts/verify-site.mjs` | 針對「第 2 階段最少食譜數」與圖片存在性加入驗證 |

## 5. 驗證規則

- `src/content/recipes` 的 markdown 檔數量 >= 50
- 每篇 recipe 的 `coverImage`：
  - 為以 `/images/recipes/` 開頭的路徑
  - 對應檔案存在於 `public/images/recipes/`（可為 placeholder，需可被靜態服務）

## 6. 任務清單

1. [ ] 新增食譜 Markdown 檔，將總數擴充到 50+
2. [ ] 為新增食譜補齊 `coverImage`，並在 `public/images/recipes/` 放入對應檔案
3. [ ] 擴充 `scripts/verify-site.mjs`：
   - recipe 數量門檻改為 >= 50
   - 檢查每篇 recipe 的 `coverImage` 檔案存在性
4. [ ] 跑 `npm test`、`npx astro check`、`npm run build` 確認驗證與靜態輸出通過

## 7. 驗收條件（Acceptance Criteria）

- Given 第二階段執行驗證，When `npm test` 跑完，Then `src/content/recipes` 數量 >= 50
- Given 某一篇 recipe 被載入，When build 或驗證檢查 `coverImage`，Then `public/images/recipes/{file}` 存在且可被瀏覽器載入（至少不為 404）
- Given 內容擴充完成，When `npm run build`，Then `dist` 生成成功且所有 `/recipes/*` 路由可靜態產生

## 8. Exit Condition

當驗證門檻已更新且在本專案環境下通過，代表第二階段的內容擴充骨架就緒，後續可以進入 spec-009 的 structured data 強化。

