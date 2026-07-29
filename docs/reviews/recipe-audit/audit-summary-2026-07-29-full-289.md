# 食譜內容審查摘要（全站 289 篇）

- **審查日期**：2026-07-29
- **範圍**：`src/content/recipes` 全數 289 篇
- **方法**：機械 precheck ＋ 內容規則（模板殘文、重複句、份量／食安啟發式）
- **觸發方式**：終端 `npm run recipe-review:full` 或 Cursor 輸入 `/recipe-review`（見 `.cursor/hooks`）

## 統計

| 狀態 | 英文標籤 | 篇數 |
| --- | --- | --- |
| 通過 | Pass | 282 |
| 注意 | Warning | 7 |
| 嚴重 | Critical | 0 |

## 嚴重（請優先人工處理）

| — | — | 本輪無 Critical |

## 注意（節錄前 40 篇）

| slug | 標題 | 主要問題 |
| --- | --- | --- |
| [clearout-tofu-veggie-soup](reports/clearout-tofu-veggie-soup.json) | 豆腐蔬菜清湯 | 湯品步驟需要加水，但食材清單未標示水量。 |
| [dh-korean-vermicelli-tofu-roll](reports/dh-korean-vermicelli-tofu-roll.json) | 韓式金絲豆腐捲 | 食材／調味清單有「主食材」，但步驟文字未出現（啟發式比對）。 |
| [sf-classic-caesar-salad](reports/sf-classic-caesar-salad.json) | 經典凱薩沙拉 | 食材／調味清單有「炸油」，但步驟文字未出現（啟發式比對）。 |
| [sf-local-sausage-quesadilla](reports/sf-local-sausage-quesadilla.json) | 墨西哥 Local 香腸酥餅 | 食材／調味清單有「炸油」，但步驟文字未出現（啟發式比對）。 |
| [sf-second-floor-saltwater-chicken-salad](reports/sf-second-floor-saltwater-chicken-salad.json) | 貳樓金牌鹽水雞沙拉 | 食材／調味清單有「炸油」，但步驟文字未出現（啟發式比對）。 |
| [sf-smoked-salmon-caesar-salad](reports/sf-smoked-salmon-caesar-salad.json) | 經典燻鮭魚凱薩沙拉 | 食材／調味清單有「炸油」，但步驟文字未出現（啟發式比對）。 |
| [weight-loss-clear-mushroom-soup](reports/weight-loss-clear-mushroom-soup.json) | 減脂菇類清湯 | 湯品步驟需要加水，但食材清單未標示水量。 |


## 通過

共 **282** 篇，詳見各 `reports/{slug}.json` 中 `status: Pass`。

## 後續

1. 先處理 **Critical**；Warning 多為食材／步驟字面比對啟發式，需人工判斷是否 false positive。
2. 需更深語意審查時，對單篇使用 `@recipe-review` 或 `node scripts/recipe-review-precheck.mjs --slug <slug>`。
3. 刻意保留者寫入 `overrides.json`。
