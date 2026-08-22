# Spec-020 進度

| Phase | 內容 | 狀態 | 備註 |
| --- | --- | --- | --- |
| 0 | 冰箱 query noindex + 食材 programmatic intro | done | commit `01b45fa` |
| 1 | Deploy + GSC sitemap | pending | 待 push / 上線後執行 |
| 2 | 15 食材人工 intro | pending | slug 見 spec §Phase 2 |
| 3 | 12 情境 hubIntro + 內链 | pending | |
| 4 | 內链強化 + 20 篇 zh 食譜 | pending | 食譜清單待 GSC 篩選 |
| 5 | +7 / +28 日複盤 | pending | |

## Phase 1 檢查清單（上線後勾選）

- [ ] Cloudflare Pages deploy 成功
- [ ] `/robots.txt` 含 query Disallow
- [ ] `/ingredients/cabbage/` intro 與內文連結正常
- [ ] `/tools/fridge-recipe/?ingredients=雞蛋` 為 noindex
- [ ] GSC 提交 `sitemap-index.xml`
- [ ] 手動提交：`/ingredients/egg/`、`/ingredients/cabbage/`、`/ingredients/tofu/`

## Phase 2 食材 intro（15）

| slug | zh intro | en | ja | ko |
| --- | --- | --- | --- | --- |
| egg | | | | |
| tofu | | | | |
| cabbage | | | | |
| chicken-breast | | | | |
| rice | | | | |
| garlic | | | | |
| tomato | | | | |
| onion | | | | |
| pork | | | | |
| beef | | | | |
| shrimp | | | | |
| broccoli | | | | |
| mushroom | | | | |
| pasta | | | | |
| cod | | | | |

## Phase 4 優先 zh 食譜（20，待填）

從 GSC「已檢索未索引」zh 路徑挑選；實作前更新此表。

| # | slug | 內链已加 | 備註 |
| --- | --- | --- | --- |
| 1 | | | |
| … | | | |

## 複盤紀錄

| 日期 | 已索引（估） | 已檢索未索引 | 曝光 | 點擊 | 備註 |
| --- | --- | --- | --- | --- | --- |
| baseline | | ~1000 | | | GSC 2026-08-22 匯出 |
