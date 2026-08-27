# 食譜內容審查摘要（全站 100 篇）

- **審查日期**：2026-06-07
- **範圍**：`src/content/recipes` 全數 150 篇
- **方法**：機械 precheck ＋ 內容規則（模板殘文、重複句、份量／食安啟發式）
- **觸發方式**：終端 `npm run recipe-review:full` 或 Cursor 輸入 `/recipe-review`（見 `.cursor/hooks`）

## 統計

| 狀態 | 英文標籤 | 篇數 |
| --- | --- | --- |
| 通過 | Pass | 45 |
| 注意 | Warning | 105 |
| 嚴重 | Critical | 0 |

## 嚴重（請優先人工處理）

| — | — | 本輪無 Critical |

## 注意（節錄前 40 篇）

| slug | 標題 | 主要問題 |
| --- | --- | --- |
| [air-fryer-butter-corn](reports/air-fryer-butter-corn.json) | 氣炸奶油玉米 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [air-fryer-crispy-chicken-bites](reports/air-fryer-crispy-chicken-bites.json) | 氣炸台式雞塊 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [air-fryer-crispy-tofu-cubes](reports/air-fryer-crispy-tofu-cubes.json) | 氣炸酥炸豆腐丁 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [air-fryer-garlic-mushrooms](reports/air-fryer-garlic-mushrooms.json) | 氣炸蒜香菇類 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [air-fryer-garlic-okra](reports/air-fryer-garlic-okra.json) | 氣炸蒜香秋葵 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [air-fryer-garlic-pork-chop](reports/air-fryer-garlic-pork-chop.json) | 氣炸蒜香豬排 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [air-fryer-garlic-shrimp](reports/air-fryer-garlic-shrimp.json) | 氣炸蒜香蝦仁 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [air-fryer-honey-sweet-potato](reports/air-fryer-honey-sweet-potato.json) | 氣炸蜜蕃薯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [air-fryer-lemon-fish-fillet](reports/air-fryer-lemon-fish-fillet.json) | 氣炸檸檬魚排 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [air-fryer-salmon-broccoli](reports/air-fryer-salmon-broccoli.json) | 氣炸鮭魚青花菜 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [air-fryer-soy-chicken-wings](reports/air-fryer-soy-chicken-wings.json) | 氣炸醬油雞翅 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [airfryer-garlic-chicken-broccoli](reports/airfryer-garlic-chicken-broccoli.json) | 氣炸蒜香雞胸佐青花菜 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [airfryer-tofu-mushroom-main](reports/airfryer-tofu-mushroom-main.json) | 氣炸豆腐菇菇主菜 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [beef-broccoli-stirfry](reports/beef-broccoli-stirfry.json) | 牛肉青花快炒 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [beef-carrot-soup](reports/beef-carrot-soup.json) | 紅蘿蔔牛肉湯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [beef-mushroom-stirfry](reports/beef-mushroom-stirfry.json) | 牛肉炒香菇 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [beef-tofu-braise](reports/beef-tofu-braise.json) | 牛肉豆腐燉煮 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [beef-tomato-noodles](reports/beef-tomato-noodles.json) | 番茄牛肉麵 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [broccoli-mushroom-chicken-rice-bowl](reports/broccoli-mushroom-chicken-rice-bowl.json) | 青花菜菇菇雞胸飯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [broccoli-mushroom-egg](reports/broccoli-mushroom-egg.json) | 青花菜菇菇炒蛋 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [broccoli-onion-chicken-soup](reports/broccoli-onion-chicken-soup.json) | 青花菜洋蔥雞湯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [broccoli-tofu-garlic-stirfry](reports/broccoli-tofu-garlic-stirfry.json) | 青花菜豆腐蒜炒 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [butter-garlic-instant-noodles](reports/butter-garlic-instant-noodles.json) | 奶油蒜香泡麵 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [cabbage-carrot-chicken-rice-bowl](reports/cabbage-carrot-chicken-rice-bowl.json) | 高麗菜紅蘿蔔雞胸飯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [cabbage-egg-stir-fry](reports/cabbage-egg-stir-fry.json) | 高麗菜炒蛋 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [cabbage-mushroom-clear-soup](reports/cabbage-mushroom-clear-soup.json) | 高麗菜菇菇清湯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [cabbage-mushroom-rice](reports/cabbage-mushroom-rice.json) | 高麗菜菇菇炊飯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [cabbage-onion-eggs](reports/cabbage-onion-eggs.json) | 高麗菜洋蔥炒蛋 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [cabbage-tofu-egg-drop-soup](reports/cabbage-tofu-egg-drop-soup.json) | 高麗菜豆腐蛋花湯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [canned-tuna-rice-bowl](reports/canned-tuna-rice-bowl.json) | 鮪魚罐頭飯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [carrot-chicken-rice-bowl](reports/carrot-chicken-rice-bowl.json) | 紅蘿蔔雞胸飯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [chefs-daily-soup](reports/chefs-daily-soup.json) | 主廚每日例湯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [chicken-broccoli-pasta](reports/chicken-broccoli-pasta.json) | 雞胸青花義大利麵 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [creamy-mushroom-pasta](reports/creamy-mushroom-pasta.json) | 奶香菇類義大利麵 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [curry-beef-rice](reports/curry-beef-rice.json) | 咖哩牛肉飯 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [egg-scallion-oil-noodles](reports/egg-scallion-oil-noodles.json) | 蛋蔥油麵 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [electricpot-broccoli-chicken-bento](reports/electricpot-broccoli-chicken-bento.json) | 電鍋青花菜雞胸便當菜 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [electricpot-mushroom-chicken-bento](reports/electricpot-mushroom-chicken-bento.json) | 電鍋菇菇雞胸便當菜 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [electricpot-tofu-egg-bento-side](reports/electricpot-tofu-egg-bento-side.json) | 電鍋豆腐蛋便當菜 | 步驟僅 0 則，低於 schema 至少 3 則。 |
| [fridge-bottom-soup-noodles](reports/fridge-bottom-soup-noodles.json) | 冰箱見底湯麵 | 湯品步驟需要加水，但食材清單未標示水量。 |

> 其餘 65 篇 Warning 請見 `reports/*.json` 或 `latest-full-review.json`。


## 通過

共 **45** 篇，詳見各 `reports/{slug}.json` 中 `status: Pass`。

## 後續

1. 先處理 **Critical** 與含「每粒米飯」「重複燉煮模板」的義麵／快炒類。
2. 需更深語意審查時，對單篇使用 `@recipe-review` 或 `node scripts/recipe-review-precheck.mjs --slug <slug>`。
3. 刻意保留者寫入 `overrides.json`。
