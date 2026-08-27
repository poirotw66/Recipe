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
- [x] 線上 `robots.txt` 含 `Disallow: /*?ingredients=`、`Disallow: /*?preferences=`
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

### 已知限制

- **冰箱工具 query URL 的 `noindex` meta：** 靜態 prerender 頁在請求時不帶 query，線上 HTML 可能不含 `noindex` meta。  
  **主要防線：** `robots.txt` 的 `Disallow: /*?ingredients=`（已驗證）。若 GSC 仍見 query URL，以 Disallow + 不手動提交為準。

---

## +7 日複盤清單（2026-08-29）

### GSC

- [ ] 「已檢索 - 目前尚未建立索引」總數 vs baseline（~1000）
- [ ] 篩選 `?ingredients=` / `?preferences=` — 是否仍**新增**（預期：減少或穩定）
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

- query URL 在 GSC 未索引清單中**不再成長**
- 至少 1/3 手動提交的食材 URL 在 `site:` 可見
- **不**以「1000 → 0」為 KPI

---

## +14～28 日複盤（2026-09-05 ～ 2026-09-19）

使用模板：`docs/ops/monthly-traffic-review.md`  
另存：`docs/ops/monthly-traffic-review-2026-09.md`

### 必記指標

| 指標 | Baseline (2026-08-22) | +28 日 |
| --- | ---: | ---: |
| GSC 已檢索未索引（估） | ~1000 | |
| GSC 已建立索引（全站） | | |
| 曝光（28 天） | | |
| 點擊（28 天） | | |
| zh 食材 / 情境 indexed（估） | | |

### 預期與決策

| 觀察 | 決策 |
| --- | --- |
| ja/ko 食譜仍大量「已檢索未索引」 | **接受**，不啟動全量 ja/ko 加厚 |
| zh hub / 食材索引上升、食譜仍慢 | 正常；延續內容批次，不灌水 |
| 曝光升、CTR 仍低 | 用 monthly-traffic-review「優化候選」改 title/description |
| query URL 仍出現 | 確認 robots.txt；不提交 sitemap 含 query |

---

## 複盤紀錄表

| 日期 | 已索引（估） | 已檢索未索引 | 曝光 | 點擊 | 備註 |
| --- | --- | --- | --- | --- | --- |
| 2026-08-22 baseline | — | ~1000 | — | — | push `c40575b`；GSC 匯出基線 |
| 2026-08-29 (+7d) | | | | | |
| 2026-09-19 (+28d) | | | | | |
