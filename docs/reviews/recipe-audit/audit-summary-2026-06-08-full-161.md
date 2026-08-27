# 食譜內容審查摘要（全站 161 篇）

- **審查日期**：2026-06-08
- **範圍**：`src/content/recipes` 全數 161 篇
- **方法**：機械 precheck ＋ 內容規則（模板殘文、重複句、份量／食安啟發式）
- **觸發方式**：終端 `npm run recipe-review:full` 或 Cursor 輸入 `/recipe-review`（見 `.cursor/hooks`）

## 統計

| 狀態 | 英文標籤 | 篇數 |
| --- | --- | --- |
| 通過 | Pass | 152 |
| 注意 | Warning | 9 |
| 嚴重 | Critical | 0 |

## 嚴重（請優先人工處理）

| — | — | 本輪無 Critical |

## 注意（節錄前 40 篇）

| slug | 標題 | 主要問題 |
| --- | --- | --- |
| [air-fryer-soy-chicken-wings](reports/air-fryer-soy-chicken-wings.json) | 氣炸醬油雞翅 | 步驟提到「白芝麻」，但未列在食材／customAdditions／substitutions。 |
| [egg-scallion-oil-noodles](reports/egg-scallion-oil-noodles.json) | 蛋蔥油麵 | 食材／調味清單有「油麵」，但步驟文字未出現（啟發式比對）。 |
| [fridge-bottom-soup-noodles](reports/fridge-bottom-soup-noodles.json) | 什錦蔬菜湯麵 | 湯品步驟需要加水，但食材清單未標示水量。 |
| [instant-miso-egg-soup](reports/instant-miso-egg-soup.json) | 味噌蛋花湯 | 湯品步驟需要加水，但食材清單未標示水量。 |
| [sesame-cold-noodles-solo](reports/sesame-cold-noodles-solo.json) | 一人麻醬涼麵 | 食材／調味清單有「烏醋」，但步驟文字未出現（啟發式比對）。 |
| [solo-mapo-tofu-rice-bowl](reports/solo-mapo-tofu-rice-bowl.json) | 麻婆豆腐蓋飯 | 食材／調味清單有「豬絞肉」，但步驟文字未出現（啟發式比對）。 |
| [solo-pan-fried-pork-cutlet-rice](reports/solo-pan-fried-pork-cutlet-rice.json) | 煎豬排蓋飯 | 食材／調味清單有「豬里肌排」，但步驟文字未出現（啟發式比對）。 |
| [weight-loss-clear-mushroom-soup](reports/weight-loss-clear-mushroom-soup.json) | 減脂菇類清湯 | 湯品步驟需要加水，但食材清單未標示水量。 |
| [weight-loss-shrimp-veg-salad](reports/weight-loss-shrimp-veg-salad.json) | 減脂鮮蝦沙拉 | 步驟提到「白芝麻」，但未列在食材／customAdditions／substitutions。 |


## 通過

共 **152** 篇，詳見各 `reports/{slug}.json` 中 `status: Pass`。

## 後續

1. 先處理 **Critical**；Warning 多為食材／步驟字面比對啟發式，需人工判斷是否 false positive。
2. 需更深語意審查時，對單篇使用 `@recipe-review` 或 `node scripts/recipe-review-precheck.mjs --slug <slug>`。
3. 刻意保留者寫入 `overrides.json`。
