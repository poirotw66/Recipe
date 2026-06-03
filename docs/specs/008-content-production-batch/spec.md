# Spec-008: 內容擴充批次（新增食譜至 50+）

## Meta

- 類型：Content / Pages / QA
- 狀態：done
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
- 明確擴充各食譜類型數量，避免內容集中在單一類別。
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
- 類型（`category`）至少達到下列門檻：
  - 家常菜：>= 16
  - 飯麵：>= 14
  - 主菜：>= 8
  - 湯品：>= 6
  - 便當菜：>= 6
- 每篇 recipe 的 `coverImage`：
  - 為以 `/images/recipes/` 開頭的路徑
  - 對應檔案存在於 `public/images/recipes/`（可為 placeholder，需可被靜態服務）

## 6. 類型擴充目標（50 篇基準）

### 6.1 現況基線（12 篇）

| 類型 | 目前篇數 |
| --- | --- |
| 家常菜 | 4 |
| 飯麵 | 4 |
| 主菜 | 2 |
| 湯品 | 1 |
| 便當菜 | 1 |

### 6.2 本階段目標（至少 50 篇）

| 類型 | 目標篇數 | 需新增篇數（相對目前） |
| --- | --- | --- |
| 家常菜 | 16 | +12 |
| 飯麵 | 14 | +10 |
| 主菜 | 8 | +6 |
| 湯品 | 6 | +5 |
| 便當菜 | 6 | +5 |

> 合計 50 篇。若實際新增超過 50，可優先補強「湯品 / 便當菜 / 主菜」避免比例失衡。

## 7. 任務清單

### 依賴圖

```text
task-1 -> task-2 -> task-3 -> task-4
```

### Task 詳細拆解

1. [x] 擴充 recipe 內容批次到 50+（依類型配額）
   - 影響：`src/content/recipes/*.md`
   - 規則：
     - `slug` 唯一且與檔名一致
     - `coverImage` 使用 `/images/recipes/{slug}.webp`
     - `ingredients/scenarios/equipment` 維持與 taxonomy 可對接
     - `category` 必須符合本 spec 的類型配額
2. [x] 補齊對應圖片檔（至少可被站點正常載入）
   - 影響：`public/images/recipes/*.webp`
   - 規則：
     - 每篇 recipe 的 `coverImage` 必有同名檔
     - 暫時可用 placeholder，但不可缺檔
3. [x] 擴充驗證腳本門檻
   - 影響：`scripts/verify-site.mjs`
   - 變更：
     - recipe 數量門檻由 12 提升到 50
     - 新增 `category` 分布門檻檢查（家常菜/飯麵/主菜/湯品/便當菜）
     - 逐篇檢查 `coverImage` path 格式與檔案存在性
4. [x] 驗證整體建置
   - 指令：`npm test`、`npx astro check`、`npm run build`
   - 目的：確保內容擴充不破壞路由、schema 與既有檢查

## 8. 驗收條件（Acceptance Criteria）

- [x] Given 第二階段驗證執行，When `npm test` 跑完，Then `src/content/recipes` markdown 檔數量 >= 50
- [x] Given 第二階段驗證執行，When 解析所有 recipe frontmatter，Then `category` 分布符合目標（16/14/8/6/6）
- [x] Given 任一 recipe frontmatter，When 驗證腳本檢查 `coverImage`，Then path 必須以 `/images/recipes/` 開頭且對應檔案存在
- [x] Given 內容擴充完成，When `npm run build`，Then `dist` 生成成功且 `/recipes/{slug}` 皆能靜態輸出
- [x] Given 任一 recipe 被開啟，When 瀏覽器載入封面圖，Then 請求不應出現圖片 404

## 9. Exit Condition

當驗證門檻已更新且在本專案環境下通過，代表第二階段的內容擴充骨架就緒，後續可以進入 spec-009 的 structured data 強化。

