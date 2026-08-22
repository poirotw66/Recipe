# Spec-020 進度

| Phase | 內容 | 狀態 | 備註 |
| --- | --- | --- | --- |
| 0 | 冰箱 query noindex + 食材 programmatic intro | done | commit `01b45fa` |
| 1 | Deploy + GSC sitemap | done | push `c40575b` 2026-08-22；GSC 提交待手動 |
| 2 | 15 食材人工 intro | done | 3 subagents；zh/en/ja/ko 全完成 |
| 3 | 12 情境 hubIntro + 內链 | done | 3 subagents；zh/en/ja/ko 全完成 |
| 4 | 內链強化 + 20 篇 zh 食譜 | done | 首頁/6 hub 內文連結 + 20 篇 intro 尾链 |
| 5 | +7 / +28 日複盤 | active | baseline 2026-08-22；見 phase5-review.md |

## Phase 1 檢查清單（2026-08-22）

- [x] Cloudflare Pages deploy 成功（線上 commit `c40575b`）
- [x] `/robots.txt` 含 query Disallow
- [x] `/ingredients/cabbage/` intro 與內文連結正常
- [~] `/tools/fridge-recipe/?ingredients=雞蛋` — robots Disallow 有效；query 時 `noindex` meta 因靜態 prerender 可能未出現（見 phase5-review.md）
- [ ] GSC 提交 `sitemap-index.xml`（**需手動**）
- [ ] 手動提交：`/ingredients/egg/`、`/ingredients/cabbage/`、`/ingredients/tofu/`（**需手動**）

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

| 日期 | 已索引（估） | 已檢索未索引 | 曝光 | 點擊 | 備註 |
| --- | --- | --- | --- | --- | --- |
| 2026-08-22 baseline | — | ~1000 | — | — | push `c40575b`；live smoke pass |
| 2026-08-29 (+7d) | | | | | 待填 |
| 2026-09-19 (+28d) | | | | | 待填 |
