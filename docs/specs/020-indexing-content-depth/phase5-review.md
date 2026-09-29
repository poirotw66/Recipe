# Spec-020 Phase 5 — 監測與複盤

## 基準日

| 項目 | 值 |
| --- | --- |
| Deploy 基準日 | **2026-08-22** |
| 線上 commit | `c40575b`（含 Phase 0～4：`01b45fa` → `c40575b`） |
| GSC 基線 | 「已檢索 - 目前尚未建立索引」約 **1000** URL（2026-08-22 匯出） |
| Sitemap | `https://recipe.bloss0m.com/sitemap-index.xml` |

## 複盤時程

| 節點 | 日期 | 動作 |
| --- | --- | --- |
| Baseline | 2026-08-22 | push + 線上 smoke check + GSC sitemap 提交 |
| +7 日 | **2026-08-29** | query URL 噪音、3 食材 `site:` 抽查 |
| +14～28 日 | **2026-09-05 ～ 2026-09-19** | 已索引總數、曝光、點擊 vs baseline |

---

## Phase 1 營運紀錄（2026-08-22）

### 已完成（自動 / CLI）

- [x] `git push origin master` → `2181ff1..c40575b`
- [x] 2026-08-22 當日曾驗證 query Disallow（歷史狀態；2026-08-27 已移除，現況見下方複核）
- [x] 線上 `sitemap-index.xml` 回 200，含 4 个子 sitemap
- [x] `/ingredients/cabbage/` — 人工 intro + 6 道內文 `<a>` 連結
- [x] `/scenarios/ten-minute-meals/` — hubIntro + popular 內文連結
- [x] 首頁 topic hub 區 — 內文 3 連結（雞蛋、10 分鐘料理、豆腐）
- [x] `/quick-meals/` — TopicHubInlineLinks 段落
- [x] `/recipes/tomato-egg-rice/` — intro 尾链至食材頁

驗證指令：

```bash
node scripts/verify-live-seo.mjs
```

### 待手動（GSC — 需 Google 帳號）

1. **提交 Sitemap**  
   [Search Console](https://search.google.com/search-console) → 索引 → Sitemap → 新增  
   `https://recipe.bloss0m.com/sitemap-index.xml`

2. **網址檢查 — 要求建立索引**（各 1 次，勿大量提交）  
   - `https://recipe.bloss0m.com/ingredients/egg/`
   - `https://recipe.bloss0m.com/ingredients/cabbage/`
   - `https://recipe.bloss0m.com/ingredients/tofu/`

3. **（可選）再提交 2 情境 hub**  
   - `https://recipe.bloss0m.com/scenarios/ten-minute-meals/`
   - `https://recipe.bloss0m.com/scenarios/one-person-meal/`

### 已知限制與目前實作

- 冰箱工具頁為靜態 prerender。query response 由 Worker 加上 `X-Robots-Tag: noindex, follow`；2026-09-29 線上檢查 query URL 回 200 並含此 header。
- 目前 robots.txt 允許檢索，沒有封鎖 ingredients/preferences query。不要重新加入 Disallow，否則 Googlebot 可能看不到 noindex。
- query URL 不列入 sitemap。若 GSC 顯示「遭到 noindex 標記排除」，這是預期狀態；網址檢查應確認可檢索並讀到 header。依 [Google 官方 noindex 說明](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=zh-tw)，被 robots.txt 封鎖的網址可能無法讓 Google 發現 noindex。

---

## Search Console 快照（2026-09-29）

### 來源與資料邊界

- 資源：URL-prefix property `https://recipe.bloss0m.com/`。
- 2026-09-29 檢查 GSC「人工判決處罰」與「安全性問題」報表，兩者均顯示「未偵測到任何問題」。這表示當下沒有 GSC 列出的人工處置或安全性問題；不能據此排除演算法層級的品質／垃圾內容判定。Google 說明人工處置由人工審查員判定，演算法也會自動偵測垃圾內容：[Manual actions report](https://support.google.com/webmasters/answer/9044175?hl=zh-TW)。
- 匯出日期：2026-09-29。索引涵蓋報表最新資料日為 2026-09-21；搜尋成效最新資料日為 2026-09-26（報表顯示約 6 小時前更新）。
- 2026-09-29 的食譜修正剛推送；以下搜尋成效最多只到 9 月 26 日，**不能用來判定這次修正的效果**。
- 索引匯出是 2026-09-29 下載的歷史趨勢，不是沿用 8 月舊匯出。歷史趨勢只提供已索引／未索引總數，沒有每一天的原因明細。

### 網頁索引狀態

| 資料日 | 已建立索引 | 未建立索引總數 | 已檢索－目前尚未建立索引（原因明細） |
| --- | ---: | ---: | ---: |
| 2026-08-22 | 88 | 1,643 | 不適用；當時舊基線約 1,000 是此原因的約數，不是未索引總數 |
| 2026-08-29（+7 日） | 87 | 1,535 | 歷史原因明細未匯出 |
| 2026-09-19（+28 日） | 83 | 1,425 | 歷史原因明細未匯出 |
| 2026-09-21（報表最新資料日） | 83 | 1,425 | 1,093 |

2026-09-21 的索引原因匯出：已檢索未索引 1,093；404 為 114；重新導向 102；noindex 排除 8；轉址式 404 為 2；替代頁（有適當 canonical）106；已找到未索引 0。原因列合計 1,425。報表卡片顯示 1,420，與匯出趨勢及原因列總和相差 5，保留為 GSC 報表差異，不自行調整。

### 搜尋成效

| 區間 | 點擊 | 曝光 | CTR | 平均排序 | 查詢列 |
| --- | ---: | ---: | ---: | ---: | --- |
| 最近 28 天（2026-08-30～2026-09-26） | 0 | 3 | 0% | 2.0 | 無列可匯出 |
| 最近 3 個月（2026-06-27～2026-09-26） | 0 | 30 | 0% | 8.1 | 6 列 |

最近 28 天的 3 次曝光都沒有點擊；報表頁面列出兩個韓文食譜網址，曝光分別為 2 與 1。查詢表無列，不代表查詢曝光為零，可能是低量查詢未列出。

最近 3 個月的查詢匯出如下；所有列均為 0 點擊，查詢曝光合計 7，低於全站 30 次曝光：

| 查詢 | 曝光 | 平均排序 |
| --- | ---: | ---: |
| 에어프라이어 고기 | 2 | 5.5 |
| 버섯 비빔밥 | 1 | 3.0 |
| 돼지고기 에어프라이어 | 1 | 4.0 |
| 두부비빔밥 | 1 | 4.0 |
| 에어프라이어 마늘 굽기 | 1 | 4.0 |
| 덮밥 종류 | 1 | 8.0 |

原 Critical 清單中，3 個月「熱門網頁」匯出僅列出韓文版 `sf-moon-view-bitter-melon-cream-rice`（2 曝光、0 點擊、平均排序 8.0）。其餘 Critical slug 不在這份 Top pages 匯出中；這不等於已證明曝光為零。另 Top pages 明細列合計 38 次曝光，高於圖表總計 30，故頁面列只作弱訊號，不拿來計算全站總量或宣稱精準流量排名。

這批 GSC 數據顯示目前搜尋使用量很低，沒有足夠點擊或繁中 Critical 頁面曝光可用來降低食安驗收優先級。試作先按食安風險排序，`sf-moon-view-bitter-melon-cream-rice` 的 2 次韓文曝光僅作同級次序的弱訊號。逐篇順序與量測欄位見 [Critical 試作驗收計畫](../../reviews/recipe-audit/critical-kitchen-validation-2026-09-29.md)。

### Critical 食譜網址檢查（抽樣，2026-09-29）

抽查 `https://recipe.bloss0m.com/recipes/sf-bbq-roasted-half-chicken/`；這是原 Critical 清單 25 個 slug 之一，並非 100 個多語頁面的全量檢查。

- GSC 即時測試於 2026-09-29 17:27（台灣時間）完成：Google 檢查工具（智慧型手機）允許檢索、擷取成功；但偵測到頁面 `robots` 中繼標記 `noindex`，因此目前不能編入索引。
- 即時測試顯示使用者宣告的標準網址為該繁中網址；因頁面不可索引，Google 尚未判定所選標準網址。這與此批尚待實際試作驗收、暫時保留 noindex 的政策一致，不代表索引故障或品質處置。
- 此 URL 的索引資料上次檢索時間為 2026-09-04 18:09（台灣時間），比 9 月 29 日即時測試早。當時 GSC 未偵測 sitemap 參照，並列出日文版為參照頁；這是索引資料中的發現資訊，不是即時測試結果。
- 本次只驗證一個 Critical 繁中 URL 的線上回應。其餘 Critical URL 是否部署相同標記，仍需逐頁驗證；不得由此抽樣推論全批。

---

## +7 日複盤清單（2026-08-29）

### GSC

- [ ] 「已檢索 - 目前尚未建立索引」總數 vs baseline（~1000）
- [ ] 檢查 query URL 是否可檢索並讀到 `X-Robots-Tag: noindex, follow`；若列於「遭到 noindex 標記排除」屬預期
- [ ] 網頁索引編制 → 主要原因 Top 3 是否仍為「已檢索未索引」

### `site:` 抽查（繁中食材）

在 Google 搜尋：

```text
site:recipe.bloss0m.com/ingredients/egg/
site:recipe.bloss0m.com/ingredients/cabbage/
site:recipe.bloss0m.com/ingredients/tofu/
```

記錄：是否出現結果、snippet 是否含 intro 關鍵字。

### 成功標準（+7 日，務實）

- Googlebot 可檢索 query URL 並讀到 noindex；不要求 noindex 排除清單歸零
- 至少 1/3 手動提交的食材 URL 在 `site:` 可見
- **不**以「1000 → 0」為 KPI

---

## +14～28 日複盤（2026-09-05 ～ 2026-09-19）

使用模板：`docs/ops/monthly-traffic-review.md`  
另存：`docs/ops/monthly-traffic-review-2026-09.md`

### 必記指標

| 指標 | Baseline (2026-08-22) | +28 日 |
| --- | ---: | ---: |
| GSC 已檢索未索引 | ~1000（2026-08-22 舊基線） | 1,093（最新原因明細 2026-09-21） |
| GSC 已建立索引（全站） | 88（2026-08-22 新匯出趨勢） | 83（2026-09-21） |
| GSC 未建立索引總數 | 1,643（2026-08-22 新匯出趨勢） | 1,425（2026-09-21 新匯出趨勢） |
| 曝光（28 天） | — | 3（2026-08-30～2026-09-26） |
| 點擊（28 天） | — | 0（2026-08-30～2026-09-26） |
| zh 食材 / 情境 indexed（估） | 未分段 | 本次 GSC 匯出只有全站總數，未按路徑類型分段 |

### 預期與決策

| 觀察 | 決策 |
| --- | --- |
| ja/ko 食譜仍大量「已檢索未索引」 | **接受**，不啟動全量 ja/ko 加厚 |
| zh hub / 食材索引上升、食譜仍慢 | 正常；延續內容批次，不灌水 |
| 曝光升、CTR 仍低 | 用 monthly-traffic-review「優化候選」改 title/description |
| query URL 仍出現在 GSC | 確認 robots.txt 沒有封鎖、response 有 X-Robots-Tag noindex、sitemap 不含 query；不手動提交 query URL |

---

## 複盤紀錄表

| 日期 | 已建立索引 | 未建立索引總數 | 已檢索未索引原因數 | 曝光 | 點擊 | 查詢 | 備註 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-08-22 baseline | 88 | 1,643 | ~1000（舊基線，原因數） | 1 | 0 | — | 當日新匯出趨勢；原始基線約 1,000 僅指 Crawled - currently not indexed |
| 2026-08-29 (+7d) | 87 | 1,535 | 未匯出 | 0 | 0 | — | 取自 2026-09-29 下載的索引／3 個月成效趨勢 |
| 2026-09-19 (+28d) | 83 | 1,425 | 未匯出 | 0 | 0 | — | 取自 2026-09-29 下載的索引／3 個月成效趨勢 |
| 2026-09-21（索引報表最新日） | 83 | 1,425 | 1,093 | — | — | — | 索引原因明細最新資料日 |
| 2026-09-26（成效報表最新日） | — | — | — | 0 | 0 | 無列 | 最近 28 天含 3 次曝光；成效摘要另見上表 |
