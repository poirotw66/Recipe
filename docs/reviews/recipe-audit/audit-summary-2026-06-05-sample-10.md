# 食譜內容審查摘要（範例批次 · 10 篇）

- **審查日期**：2026-06-05
- **範圍**：試點 10 篇（非全站 100 篇）
- **流程**：`npm run recipe-review:precheck`（全站機械檢查）＋ Agent 依 `recipe-review` skill 四維度語意審查
- **報告路徑**：`docs/reviews/recipe-audit/reports/{slug}.json`

## 統計

| 狀態 | 英文標籤 | 篇數 |
| --- | --- | --- |
| 通過 | Pass | 3 |
| 注意 | Warning | 7 |
| 嚴重 | Critical | 1 |

> 註：同一篇可含多筆 issue；**整篇狀態**取最嚴重等級（Critical ＞ Warning ＞ Pass）。

## 嚴重（請優先人工處理）

| slug | 標題 | 主要問題 |
| --- | --- | --- |
| [creamy-mushroom-pasta](reports/creamy-mushroom-pasta.json) | 奶香菇類義大利麵 | 步驟 2 含炒飯／燉湯模板殘文，與料理類型不符 |

## 注意（建議排程修訂）

| slug | 標題 | 主要問題 |
| --- | --- | --- |
| [tomato-tofu-soup](reports/tomato-tofu-soup.json) | 番茄豆腐湯 | 步驟重複、未標水量、可選配料未入清單 |
| [scallion-beef-stirfry](reports/scallion-beef-stirfry.json) | 蔥爆牛肉 | 步驟重複與錯誤模板句、時間說明不清 |
| [pesto-chicken-pasta](reports/pesto-chicken-pasta.json) | 青醬雞胸義大利麵 | 步驟 1 重複截斷；「青醬」用語易誤解 |
| [air-fryer-salmon-broccoli](reports/air-fryer-salmon-broccoli.json) | 氣炸鮭魚青花菜 | 鮭魚厚度與熟透判斷需寫清楚 |
| [steamed-chicken-bento](reports/steamed-chicken-bento.json) | 電鍋雞胸便當菜 | 2 人份與 1 片雞胸份量不一致 |
| [tofu-scrambled-eggs](reports/tofu-scrambled-eggs.json) | 豆腐炒蛋 | 步驟 2 鹽重複描述（輕微） |

## 通過（無需優先修訂）

| slug | 標題 |
| --- | --- |
| [tomato-egg-rice](reports/tomato-egg-rice.json) | 番茄雞蛋飯 |
| [garlic-oil-pasta](reports/garlic-oil-pasta.json) | 蒜香義大利麵 |
| [beef-broccoli-stirfry](reports/beef-broccoli-stirfry.json) | 牛肉青花快炒 |

## 本批次 10 篇清單

`tomato-egg-rice`、`garlic-oil-pasta`、`air-fryer-salmon-broccoli`、`beef-broccoli-stirfry`、`steamed-chicken-bento`、`tomato-tofu-soup`、`pesto-chicken-pasta`、`creamy-mushroom-pasta`、`tofu-scrambled-eggs`、`scallion-beef-stirfry`

## 後續建議

1. 先修 **Critical** 1 篇與 **模板殘文／重複句** 明顯的義麵、湯品、牛肉類。
2. 全站擴充審查前，可加一條機械規則：偵測步驟內「每粒米飯」「慢火燉煮」等與 category 不符的關鍵字（可列入 precheck 下一版）。
3. 誤判或刻意保留者，記入 `overrides.json` 後再跑下一輪。
