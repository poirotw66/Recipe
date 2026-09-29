# Spec-020 進度

| Phase | 內容 | 狀態 | 備註 |
| --- | --- | --- | --- |
| 0 | 冰箱 query noindex + 食材 programmatic intro | done | query 使用可檢索的 HTTP response header；robots Disallow 已於 2026-08-27 移除 |
| 1 | Deploy + GSC sitemap | done | push `c40575b` 2026-08-22；2026-09-29 已提交 sitemap 並對 3 個食材頁提出索引要求，等待 Google 重新處理 |
| 2 | 15 食材人工 intro | done | 3 subagents；zh/en/ja/ko 全完成 |
| 3 | 12 情境 hubIntro + 內链 | done | 3 subagents；zh/en/ja/ko 全完成 |
| 4 | 內链強化 + 20 篇 zh 食譜 | done | 首頁/6 hub 內文連結 + 20 篇 intro 尾链 |
| 5 | +7 / +28 日複盤 | active | baseline 2026-08-22；見 phase5-review.md |

## Phase 1 檢查清單（2026-08-22）

- [x] Cloudflare Pages deploy 成功（線上 commit `c40575b`）
- 歷史檢查：2026-08-22 `/robots.txt` 曾含 query Disallow；此規則已於 2026-08-27 移除
- [x] `/ingredients/cabbage/` intro 與內文連結正常
- [x] `/tools/fridge-recipe/?ingredients=雞蛋` — 2026-09-29 線上回 200 與 `X-Robots-Tag: noindex, follow`；robots.txt 未封鎖 query
- [x] GSC 提交 `https://recipe.bloss0m.com/sitemap-index.xml`（2026-09-29；狀態「成功」，Google 尚未以新提交日期重新讀取）
- [x] GSC 即時測試允許索引並提交要求：`/ingredients/egg/`、`/ingredients/cabbage/`、`/ingredients/tofu/`（2026-09-29；三頁皆已排入優先檢索佇列）

驗證：`node scripts/verify-live-seo.mjs`

## Phase 2 食材 intro（15）

| slug | zh intro | en | ja | ko |
| --- | --- | --- | --- | --- |
| egg | done | done | done | done |
| tofu | done | done | done | done |
| cabbage | done | done | done | done |
| chicken-breast | done | done | done | done |
| rice | done | done | done | done |
| garlic | done | done | done | done |
| tomato | done | done | done | done |
| onion | done | done | done | done |
| pork | done | done | done | done |
| beef | done | done | done | done |
| shrimp | done | done | done | done |
| broccoli | done | done | done | done |
| mushroom | done | done | done | done |
| pasta | done | done | done | done |
| cod | done | done | done | done |

## Phase 3 情境 hubIntro（12）

| slug | zh hubIntro | en | ja | ko |
| --- | --- | --- | --- | --- |
| one-person-meal | done | done | done | done |
| ten-minute-meals | done | done | done | done |
| high-protein-meals | done | done | done | done |
| weight-loss-meals | done | done | done | done |
| bento-meals | done | done | done | done |
| budget-meals | done | done | done | done |
| fridge-cleanout-meals | done | done | done | done |
| air-fryer-meals | done | done | done | done |
| electric-pot-meals | done | done | done | done |
| leftover-rice-meals | done | done | done | done |
| late-night-meals | done | done | done | done |
| meatless-meals | done | done | done | done |

## Phase 4 優先 zh 食譜（20）

| # | slug | 內链已加 | 備註 |
| --- | --- | --- | --- |
| 1 | tomato-egg-rice | done | intro 尾链 → 食材 |
| 2 | tofu-scrambled-eggs | done | |
| 3 | garlic-oil-pasta | done | |
| 4 | scallion-beef-fried-rice | done | |
| 5 | garlic-mushroom-chicken | done | |
| 6 | air-fryer-salmon-broccoli | done | |
| 7 | steamed-chicken-bento | done | |
| 8 | beef-broccoli-stirfry | done | |
| 9 | pesto-chicken-pasta | done | |
| 10 | onion-egg-rice-bowl | done | |
| 11 | tomato-onion-scrambled-eggs | done | |
| 12 | scallion-egg-rice | done | |
| 13 | tomato-garlic-cabbage-eggs | done | |
| 14 | cabbage-egg-stir-fry | done | |
| 15 | onion-tomato-egg-fried-rice | done | |
| 16 | airfryer-garlic-chicken-broccoli | done | |
| 17 | bento-ginger-chicken | done | |
| 18 | bento-stir-fried-cabbage | done | |
| 19 | ten-minute-udon-soup | done | |
| 20 | quick-kimchi-fried-rice | done | |

## 複盤紀錄

詳細時程與 +7 / +28 日清單：`docs/specs/020-indexing-content-depth/phase5-review.md`

| 日期 | 已建立索引 | 未建立索引總數 | 已檢索未索引原因數 | 曝光 | 點擊 | 備註 |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-08-22 baseline | 88 | 1,643 | ~1000（原匯出約數） | 1 | 0 | 2026-09-29 匯出回看趨勢；舊基線約 1,000 指原因數 |
| 2026-08-29 (+7d) | 87 | 1,535 | 未匯出 | 0 | 0 | 2026-09-29 匯出回看趨勢 |
| 2026-09-19 (+28d) | 83 | 1,425 | 未匯出 | 0 | 0 | 2026-09-29 匯出回看趨勢 |

目前完整快照與查詢列見 `phase5-review.md`；搜尋成效資料只到 2026-09-26，不能代表 2026-09-29 推送內容的成效。
