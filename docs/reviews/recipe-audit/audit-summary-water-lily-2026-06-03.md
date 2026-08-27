# 水蓮食譜審查摘要（2026-06-03）

範圍：新增 10 篇 `water-lily-stem-*` 食譜  
Precheck：`npm run recipe-review:precheck`（全站 160 篇一併更新）

## 統計

| 狀態 | 數量 | 說明 |
| --- | ---: | --- |
| Pass | 0 | — |
| Warning | 0 | 皆有 Critical 問題，不單獨計 Warning 終態 |
| Critical | 10 | 全數需修正「下火蓮」錯字 |

## 嚴重（需優先修正）

**共通問題（10/10）**  
步驟一律寫成「下火蓮」，正確應為「**下水蓮**」。此錯字使核心食材「水蓮」未出現在步驟文字，機械檢查亦會判為未使用食材。

| slug | 標題 | 主要問題 |
| --- | --- | --- |
| water-lily-stem-garlic-stirfry | 蒜蓉炒水蓮 | 步驟錯字「下火蓮」 |
| water-lily-stem-oyster-sauce | 蠔油炒水蓮 | 步驟錯字「下火蓮」 |
| water-lily-stem-mushroom-stirfry | 水蓮炒菇類 | 步驟錯字「下火蓮」 |
| water-lily-stem-pork-soup | 水蓮肉片湯 | 錯字；情境「10 分鐘」但 totalTime 18 分 |
| water-lily-stem-fish-ball-noodles | 水蓮貢丸湯麵 | 錯字；tips 薑/醬油未入清單 |
| water-lily-stem-tofu-braise | 水蓮燒豆腐 | 步驟錯字「下火蓮」 |
| water-lily-stem-shrimp-stirfry | 水蓮炒蝦仁 | 錯字；tips 米酒未入 seasonings |
| water-lily-stem-chicken-rice-bowl | 水蓮雞肉蓋飯 | 步驟錯字「下火蓮」 |
| water-lily-stem-clear-soup | 水蓮清湯 | 錯字；tips 麻油未入清單 |
| water-lily-stem-sesame-toss | 麻油拌水蓮 | 錯字；「起鍋前」用語不精確 |

## 次要（修正錯字後可再處理）

- **水蓮肉片湯**：`scenarios` 含「10 分鐘料理」與 `totalTime: 18` 不一致。
- **水蓮貢丸湯麵**、**水蓮清湯**、**水蓮炒蝦仁**：tips 提及的調味未列入 `seasonings` / `customAdditions`。
- **麻油拌水蓮**：最後一步建議改「裝盤前」而非「起鍋前」。

## Precheck 誤報（可忽略）

- 步驟「白胡椒」被截成「胡椒」而報 `step_mentions_unknown`（水蓮炒菇類、貢丸湯麵、炒蝦仁、清湯）。
- 步驟「白芝麻」被截成「芝麻」（麻油拌水蓮）；食材表已列白芝麻。

## 建議修復順序

1. 批次將 10 篇步驟「下火蓮」→「下水蓮」（可從 `scripts/generate-water-lily-recipes.mjs` 模板一併修正後重產）。
2. 調整 **水蓮肉片湯** 情境或時間標示。
3. 補齊 tips 與食材清單的一致性（米酒、麻油、薑、醬油）。

## 個別報告

- [`water-lily-stem-garlic-stirfry`](reports/water-lily-stem-garlic-stirfry.json) — Critical
- [`water-lily-stem-oyster-sauce`](reports/water-lily-stem-oyster-sauce.json) — Critical
- [`water-lily-stem-mushroom-stirfry`](reports/water-lily-stem-mushroom-stirfry.json) — Critical
- [`water-lily-stem-pork-soup`](reports/water-lily-stem-pork-soup.json) — Critical
- [`water-lily-stem-fish-ball-noodles`](reports/water-lily-stem-fish-ball-noodles.json) — Critical
- [`water-lily-stem-tofu-braise`](reports/water-lily-stem-tofu-braise.json) — Critical
- [`water-lily-stem-shrimp-stirfry`](reports/water-lily-stem-shrimp-stirfry.json) — Critical
- [`water-lily-stem-chicken-rice-bowl`](reports/water-lily-stem-chicken-rice-bowl.json) — Critical
- [`water-lily-stem-clear-soup`](reports/water-lily-stem-clear-soup.json) — Critical
- [`water-lily-stem-sesame-toss`](reports/water-lily-stem-sesame-toss.json) — Critical
