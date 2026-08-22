# Spec-020: 索引率提升 — 內容深度與內鏈批次

## Meta

- 類型：Growth / SEO / Content
- 狀態：draft
- PRD：`docs/prds/prd-004.md`（成長批次延伸）
- 依賴：`spec-004`、`spec-009`、`spec-017`、`spec-014-growth-analytics`
- 建立：2026-08-22
- 觸發：GSC「已檢索 - 目前尚未建立索引」約 1000 URL（`recipe.bloss0m.com` 為主）

## 1. 背景與問題定義

2026-08-22 自 Google Search Console 匯出的「已檢索 - 目前尚未建立索引」清單約 **1000** 筆，分布如下：

| 類型 | 約略數量 | 說明 |
| --- | --- | --- |
| 多語食譜（zh / en / ja / ko） | ~809 | 模板相似；Google 常只索引 zh 主版與部分 en |
| 食材 hub | ~100 | 原描述偏短（平均 ~30 字） |
| 情境 hub | ~27 | 四語路由 × 部分情境 |
| 靜態頁（terms / contact 等） | ~15 | 低 SEO 優先，可不索引 |
| 冰箱工具 query URL | ~8 | 重複變體，不應索引 |
| `www.bloss0m.com` 其他 | ~27 | **不在本 spec 範圍**（主站 repo） |

**關鍵認知：** 此狀態代表 Google **已爬到** 頁面，但判定 **不值得放入索引**。解法不是「全站灌水」，而是：

1. 排除不該索引的 URL（技術）
2. 加厚 **有搜尋意圖** 的 hub 頁獨特內容（內容）
3. 強化 **zh 主版 → hub → 食譜** 內鏈（發現與優先級）

## 2. Goals

- 降低 GSC 中 **不該索引** URL（query 參數、404）的「已檢索未索引」噪音
- 提升 **繁中食材 / 情境 / 核心食譜** 的可索引性訊號（獨特 intro、內文連結、updatedAt）
- 建立可分批執行、可驗收的內容深度標準（字數、結構、語系範圍）
- 以 **曝光 / 點擊 / 已索引 zh URL 數** 為成功指標，**不以 1000 筆歸零** 為 KPI

## 3. Non-goals

- 不追求 **ja / ko 全量食譜** 進入 Google 索引
- 不新增路由、不改多語 URL 結構、不動 hreflang 策略
- 不處理 `www.bloss0m.com` 裸 `.md`、`feed.xml`（主站另案）
- 不對 289 篇食譜全量重寫 intro（僅優先批次）
- 不做 Search Console API 自動提交

## 4. 已完成（Phase 0 — commit `01b45fa`）

| 項目 | 路徑 / 行為 |
| --- | --- |
| 冰箱工具 query → `noindex` | `src/components/FridgeToolPage.astro` |
| robots Disallow query | `src/pages/robots.txt.ts`：`/*?ingredients=`、`/*?preferences=` |
| 無結果快速連結改 button | `FridgeToolPage.astro` + `public/scripts/fridge-tool.js` |
| 食材 programmatic intro | `src/lib/taxonomy.ts` → `buildIngredientIntro()` |
| 食材頁 6 篇卡片 + 內文 `<a>` | `src/pages/ingredients/[slug].astro`、`[locale]/ingredients/[slug].astro` |
| 驗證 marker | `scripts/verify-site.mjs` |

**Phase 0 待營運：** push → Cloudflare Pages deploy → GSC 重新提交 sitemap（見 Phase 1）。

## 5. 實作計畫

### Phase 1 — Deploy 與 GSC 營運（無程式碼）

| 步驟 | 動作 | 驗收 |
| --- | --- | --- |
| 1.1 | `git push origin master`，確認 Pages build 成功 | 線上 commit ≥ `01b45fa` |
| 1.2 | 檢查 `https://recipe.bloss0m.com/robots.txt` | 含 `Disallow: /*?ingredients=` |
| 1.3 | 檢查 `https://recipe.bloss0m.com/ingredients/cabbage/` | hero intro ≥ 120 字；有內文食譜連結 |
| 1.4 | 檢查 `.../tools/fridge-recipe/?ingredients=雞蛋` | `<meta name="robots" content="noindex, follow">` |
| 1.5 | GSC → 索引 → Sitemap → 提交 `https://recipe.bloss0m.com/sitemap-index.xml` | 狀態「成功」 |
| 1.6 | 網址檢查手動提交 3 篇 zh 食材（見 §6.1） | 請求已送出 |

### Phase 2 — 高流量食材人工 intro（15 slug）

在 programmatic intro 之上，為 **搜尋與 GSC 曝光優先** 的 15 個食材新增 `localeCopy.<locale>.intro`（繁中必填；en 建議同步）。

**資料：** `src/data/ingredients.json`

**優先 slug（可隨 GSC 調整）：**

`egg`, `tofu`, `cabbage`, `chicken-breast`, `rice`, `garlic`, `tomato`, `onion`, `pork`, `beef`, `shrimp`, `broccoli`, `mushroom`, `pasta`, `cod`

**文案規範（繁中 `intro`）：**

- 120～220 字，**不可**與 `description` 逐字重複
- 必含：選材或保存 1 句、典型用法 1 句、本站食譜數或情境 1 句
- 禁止簡體；en/ja/ko 由 `localeCopy` 對譯，不機翻堆砌

**程式：**

- `IngredientItem` 的 `LocaleCopyBlock` 新增可選欄位 `intro?: string`
- `getIngredientIntro()`（或擴充 `buildIngredientIntro`）：有 `intro` 時優先使用，否則 fallback programmatic
- 更新 `DefinedTerm` JSON-LD 的 `description` 為完整 intro（`src/lib/seo.ts`）

### Phase 3 — 情境頁內容加厚（12 slug，全量）

**資料：** `src/data/scenarios.json`

為 **12 個情境** 新增 `localeCopy.<locale>.hubIntro`（繁中必填）：

- 150～250 字：適合誰、怎麼從本頁找菜、與 `seoDescription` 互補
- 頁面：`src/pages/scenarios/[slug].astro`、`src/pages/[locale]/scenarios/[slug].astro`
- hero 區在 `description` 下顯示 `hubIntro`
- 「先從這 6 道開始找」區塊上方加 **內文 `<a>` 連結** 至 6 篇 popular 食譜（比照食材頁）

**情境 slug 清單（12）：** 以 `src/data/scenarios.json` 為準全量覆蓋。

### Phase 4 — 內鏈強化（程式 + 內容）

| 項目 | 說明 |
| --- | --- |
| 食譜詳情 → 食材 | 確認 `relatedIngredients` 區塊連至 `/ingredients/{slug}/`（已有則驗證） |
| 首頁 / topic hub | 各 hub 加 1 段文字 + 3 個食材 / 情境連結（非僅卡片） |
| 食譜 intro 尾句 | 優先 20 篇 zh 食譜 intro 末句加 1 個內链（食材或同情境） |

**優先 20 篇 zh 食譜：** 從 GSC「已檢索未索引」且 **zh 路徑** 中，挑選有曝光潛力的便當 / 一人 / 10 分鐘主軸（實作時列於 `progress.md`）。

### Phase 5 — 監測與複盤（營運）

- 基準日：deploy + sitemap 提交日
- **+7 日：** GSC 檢查 query URL 是否仍新增；食材 3 URL `site:` 抽查
- **+14～28 日：** 比較「已建立索引」總數、曝光、點擊（`docs/ops/monthly-traffic-review.md` 模板）
- 若 ja/ko 食譜仍大量未索引：**接受**，不啟動 Phase 6 全量翻譯加厚

## 6. 資料與規則

### 6.1 索引優先級（Google 資源有限）

1. 繁中食譜 `/recipes/{slug}/`
2. 繁中食材 `/ingredients/{slug}/`
3. 繁中情境 `/scenarios/{slug}/`
4. 英文食譜 `/en/recipes/...`（選擇性）
5. ja / ko — 不主動「要求建立索引」

### 6.2 內容深度下限

| 頁型 | 主體文字下限（zh） | 內文 `<a>` 最少 |
| --- | --- | --- |
| 食材詳情 | programmatic ≥ 120 字；人工 intro ≥ 120 字 | 3 篇食譜 |
| 情境詳情 | description + hubIntro ≥ 200 字 | 6 篇食譜（popular） |
| 食譜詳情（優先批次） | intro 已有；追加 1 句內链 | 1 個 hub 或食材 |

### 6.3 SEO 技術不變量

- canonical、hreflang、sitemap 分段維持 `spec-004` / `spec-017`
- 404、`?ingredients=`、`?preferences=` 維持 noindex / Disallow
- 不在 sitemap 加入 query URL 或 404

## 7. 驗收標準

### 程式（Phase 0～4）

- [ ] `npm run build` 通過
- [ ] `node scripts/verify-site.mjs` 通過
- [ ] 15 食材 slug 在 zh 頁可見人工 intro（或 documented fallback）
- [ ] 12 情境 slug 在 zh 頁可見 `hubIntro` + 6 內文食譜連結
- [ ] robots.txt 含 query Disallow；fridge query 頁含 noindex

### 營運（Phase 1、5）

- [ ] sitemap-index 已於 GSC 提交且成功
- [ ] 上線抽查 4 URL（§Phase 1 表格）通過
- [ ] +28 日複盤記錄寫入 `progress.md` 或月度 review

### 成功指標（非阻塞）

- GSC「已檢索未索引」中 `?ingredients=` 筆數 **下降**
- `site:recipe.bloss0m.com/ingredients/` 索引頁數 **不低於 deploy 前**
- Search Console 曝光 / 點擊 **持平或上升**（允許 2～4 週 lag）

## 8. 風險與緩解

| 風險 | 緩解 |
| --- | --- |
| 人工 intro 與 programmatic 重複 | `intro` 優先；programmatic 僅 fallback |
| 四語系內容不一致 | 先 zh 上線；en 同批；ja/ko 可次批 |
| 內容加厚仍不索引 | 加強首頁 / hub 內链；檢查是否 duplicate 於其他語系 |
| 過度「要求建立索引」配額 | 每週 ≤ 10 URL，僅 zh 高優先 |

## 9. 範圍外（主站 bloss0m.com）

另開議題（非 Recipe repo）：

- `Clubhouse-Games/**/*.md` → robots Disallow 或移除公開部署
- `feed.xml`、`index.json` → noindex 或 Disallow
- blog 未索引 → 內链與 canonical 稽核

## 10. 相關文件

- GSC 匯出：`docs/reviews/recipe-audit/`（營運備份，optional）
- 月度複盤：`docs/ops/monthly-traffic-review.md`
- Sitemap 設定：`docs/ops/search-console-setup.md`（若存在）
- 進度追蹤：`docs/specs/020-indexing-content-depth/progress.md`
