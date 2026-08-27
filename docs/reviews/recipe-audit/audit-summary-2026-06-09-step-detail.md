# 食譜步驟詳盡度補充審查（231 篇）

- **審查日期**：2026-06-09
- **觸發**：`/recipe-review`，使用者關注「步驟是否過於省略」
- **全站機械審查**：`audit-summary-2026-06-09-full-231.md`（Pass 157／Warning 74／Critical 0）

## 結論（先看這段）

1. **多數食譜步驟偏短**：全站步驟平均字數中位數約 **35 字**；對照已修過的詳寫範例 `tomato-egg-rice`（約 **86 字/步**），約 **72 篇**屬高優先補寫、**107 篇**建議補寫。
2. **名店還原（sf-*）**：常見 4 則通用模板步驟，未寫清醬料何時加、溫度與擺盤；與 74 篇 Warning 中「食材未出現在步驟」高度重疊。
3. **快手／電鍋／清冰箱類**（如 `cabbage-mushroom-rice`）：步驟少可接受，但仍缺**水量、切法、熟度判斷**時，應各補 1 句。
4. **本輪無食安 Critical**；省略步驟主要風險是**做失敗、成品不一致**，不是自動掃到的生食問題。

## 高優先補寫（72 篇）

平均字數極低，或「≤3 步 + 總時間偏長」。

| slug | 標題 | 步驟 | 分鐘 | 均字 | 難度 | 說明 |
| --- | --- | ---: | ---: | ---: | --- | --- |
| water-lily-stem-sesame-toss | 麻油拌水蓮 | 4 | 10 | 14.3 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| weight-loss-clear-mushroom-soup | "減脂菇類清湯" | 5 | 18 | 14.6 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| water-lily-stem-fish-ball-noodles | 水蓮貢丸湯麵 | 4 | 15 | 15.3 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| carrot-chicken-rice-bowl | 紅蘿蔔雞胸飯 | 3 | 23 | 15.7 | 簡單 | 步驟字數明顯偏少，且工序與時間不匹配 |
| water-lily-stem-clear-soup | 水蓮清湯 | 4 | 13 | 16.3 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| water-lily-stem-mushroom-stirfry | 水蓮炒菇類 | 4 | 13 | 16.5 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| ten-minute-udon-soup | "十分鐘烏龍麵湯" | 5 | 13 | 16.6 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| budget-tofu-rice-bowl | "省錢豆腐蓋飯" | 5 | 16 | 16.8 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| mixed-leftover-congee | "蛋花鹹粥" | 6 | 20 | 17.3 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| water-lily-stem-tofu-braise | 水蓮燒豆腐 | 4 | 16 | 17.5 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| bento-stir-fried-cabbage | "便當炒高麗菜" | 5 | 14 | 17.6 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| budget-cabbage-noodle-soup | "省錢高麗菜麵" | 5 | 16 | 17.6 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| salmon-broccoli-garlic-main | 蒜香鮭魚青花菜主菜 | 3 | 21 | 17.7 | 簡單 | 步驟字數明顯偏少，且工序與時間不匹配 |
| fridge-bottom-soup-noodles | "什錦蔬菜湯麵" | 5 | 20 | 18 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| garlic-tomato-chicken-rice-bowl | 蒜香番茄雞胸飯 | 3 | 19 | 18 | 簡單 | 步驟字數明顯偏少，且工序與時間不匹配 |
| mushroom-beef-rice-bowl | 香菇牛肉蓋飯 | 3 | 22 | 18 | 簡單 | 步驟字數明顯偏少，且工序與時間不匹配 |
| budget-simple-egg-fried-rice | "省錢蛋炒飯" | 5 | 13 | 18.2 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| water-lily-stem-garlic-stirfry | 蒜蓉炒水蓮 | 4 | 10 | 18.3 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| water-lily-stem-pork-soup | 水蓮肉片湯 | 4 | 18 | 18.5 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| solo-sesame-chicken-rice | "芝麻雞蓋飯" | 5 | 22 | 18.6 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| beef-mushroom-stirfry | 牛肉炒香菇 | 3 | 17 | 19 | 簡單 | 步驟字數明顯偏少，且工序與時間不匹配 |
| bento-braised-tofu-egg | "便當滷蛋豆腐" | 5 | 26 | 19 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| water-lily-stem-oyster-sauce | 蠔油炒水蓮 | 4 | 11 | 19 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| solo-three-cup-chicken-rice | "三杯雞蓋飯" | 6 | 28 | 19.2 | "中等" | 步驟字數明顯偏少，且工序與時間不匹配 |
| quick-pickled-cucumber-egg-rice | "菜脯蛋飯" | 5 | 13 | 19.8 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| water-lily-stem-chicken-rice-bowl | 水蓮雞肉蓋飯 | 4 | 18 | 19.8 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| solo-lu-rou-rice | "滷肉飯一人份" | 5 | 33 | 20.2 | "中等" | 步驟字數明顯偏少，且工序與時間不匹配 |
| solo-pan-fried-pork-cutlet-rice | "煎豬排蓋飯" | 5 | 22 | 20.2 | "中等" | 步驟字數明顯偏少，且工序與時間不匹配 |
| weight-loss-shrimp-veg-salad | "減脂鮮蝦沙拉" | 5 | 16 | 20.2 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| broccoli-tofu-garlic-stirfry | 青花菜豆腐蒜炒 | 3 | 19 | 20.3 | 簡單 | 步驟字數明顯偏少，且工序與時間不匹配 |
| water-lily-stem-shrimp-stirfry | 水蓮炒蝦仁 | 4 | 15 | 20.3 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| high-protein-tofu-steak-plate | "高蛋白豆腐排" | 5 | 22 | 20.4 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| instant-miso-egg-soup | "味噌蛋花湯" | 5 | 11 | 20.4 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| leftover-meat-quick-stirfry | "豬肉青椒快炒" | 5 | 14 | 20.4 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| solo-ginger-pork-rice | "薑絲肉燥飯" | 5 | 20 | 20.4 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| clearout-tofu-veggie-soup | "豆腐蔬菜清湯" | 5 | 20 | 20.6 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| random-veggie-egg-pancake | "雜菜雞蛋煎餅" | 5 | 18 | 20.6 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| broccoli-mushroom-egg | 青花菜菇菇炒蛋 | 3 | 17 | 20.7 | 簡單 | 步驟字數明顯偏少，且工序與時間不匹配 |
| cabbage-mushroom-rice | 高麗菜菇菇炊飯 | 3 | 33 | 20.7 | 簡單 | 步驟字數明顯偏少，且工序與時間不匹配 |
| garlic-tofu-chicken-pan-main | 蒜香豆腐雞胸主菜 | 3 | 21 | 20.7 | 簡單 | 步驟字數明顯偏少，且工序與時間不匹配 |
| high-protein-egg-white-stirfry | "高蛋白蛋白炒" | 5 | 14 | 20.8 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| weight-loss-zucchini-chicken | "減脂櫛瓜雞肉" | 5 | 18 | 20.8 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| bento-honey-soy-pork | "便當蜜汁滷肉" | 5 | 28 | 21 | "中等" | 步驟字數明顯偏少，且工序與時間不匹配 |
| canned-tuna-rice-bowl | "鮪魚罐頭飯" | 5 | 8 | 21 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |
| clearout-veggie-egg-fried-rice | "家常蛋炒飯" | 5 | 14 | 21 | "簡單" | 步驟字數明顯偏少，且工序與時間不匹配 |

> 其餘 27 篇見 `step-detail-flagged.json`（tier=high）。

## 建議補寫（107 篇，節錄 35）

| slug | 標題 | 步驟 | 分鐘 | 均字 | 說明 |
| --- | --- | ---: | ---: | ---: | --- |
| egg-scallion-oil-noodles | "蛋蔥油麵" | 5 | 15 | 22 | 步驟偏簡，新手可能缺火力／狀態描述 |
| quick-kimchi-fried-rice | "快速泡菜炒飯" | 5 | 13 | 22 | 步驟偏簡，新手可能缺火力／狀態描述 |
| air-fryer-butter-corn | "氣炸奶油玉米" | 5 | 17 | 22.2 | 步驟偏簡，新手可能缺火力／狀態描述 |
| leftover-rice-egg-pancake | "米飯蛋煎餅" | 5 | 16 | 22.2 | 步驟偏簡，新手可能缺火力／狀態描述 |
| bento-black-pepper-beef | "便當黑椒牛肉" | 5 | 18 | 22.4 | 步驟偏簡，新手可能缺火力／狀態描述 |
| high-protein-chicken-broccoli-bowl | "高蛋白雞肉青花碗" | 5 | 24 | 22.6 | 步驟偏簡，新手可能缺火力／狀態描述 |
| solo-mapo-tofu-rice-bowl | "麻婆豆腐蓋飯" | 5 | 20 | 22.8 | 步驟偏簡，新手可能缺火力／狀態描述 |
| microwave-steamed-egg-rice | "電子鍋蒸蛋蓋飯" | 5 | 17 | 23 | 步驟偏簡，新手可能缺火力／狀態描述 |
| bento-ginger-chicken | "便當薑炒雞肉" | 5 | 22 | 23.2 | 步驟偏簡，新手可能缺火力／狀態描述 |
| sesame-cold-noodles-solo | "一人麻醬涼麵" | 5 | 13 | 23.2 | 步驟偏簡，新手可能缺火力／狀態描述 |
| butter-garlic-instant-noodles | "奶油蒜香泡麵" | 5 | 12 | 23.4 | 步驟偏簡，新手可能缺火力／狀態描述 |
| leftover-mixed-veggie-fried-rice | "綜合蔬菜炒飯" | 5 | 18 | 24.2 | 步驟偏簡，新手可能缺火力／狀態描述 |
| air-fryer-garlic-okra | "氣炸蒜香秋葵" | 5 | 18 | 24.6 | 步驟偏簡，新手可能缺火力／狀態描述 |
| air-fryer-garlic-mushrooms | "氣炸蒜香菇類" | 6 | 20 | 25.3 | 步驟偏簡，新手可能缺火力／狀態描述 |
| water-lily-stem-egg-stirfry | 水蓮炒蛋 | 5 | 14 | 25.4 | 步驟偏簡，新手可能缺火力／狀態描述 |
| solo-oyster-sauce-beef-rice | "蠔油牛肉蓋飯" | 5 | 18 | 25.6 | 步驟偏簡，新手可能缺火力／狀態描述 |
| smoked-salmon-caesar-salad | "煙燻鮭魚凱薩沙拉" | 4 | 13 | 25.8 | 步驟偏簡，新手可能缺火力／狀態描述 |
| scallion-oil-dry-noodles | "蔥油乾麵" | 5 | 13 | 26.4 | 步驟偏簡，新手可能缺火力／狀態描述 |
| seasonal-greens-salad-bowl | "季節鮮蔬沙拉碗" | 4 | 10 | 26.5 | 步驟偏簡，新手可能缺火力／狀態描述 |
| air-fryer-soy-chicken-wings | "氣炸醬油雞翅" | 6 | 32 | 27 | 步驟偏簡，新手可能缺火力／狀態描述 |
| air-fryer-garlic-shrimp | "氣炸蒜香蝦仁" | 5 | 18 | 28 | 步驟偏簡，新手可能缺火力／狀態描述 |
| mushroom-soft-egg-brunch | "野菇嫩蛋早午餐" | 4 | 17 | 28 | 步驟偏簡，新手可能缺火力／狀態描述 |
| air-fryer-lemon-fish-fillet | "氣炸檸檬魚排" | 6 | 20 | 28.3 | 步驟偏簡，新手可能缺火力／狀態描述 |
| air-fryer-crispy-tofu-cubes | "氣炸酥炸豆腐丁" | 5 | 26 | 29.4 | 步驟偏簡，新手可能缺火力／狀態描述 |
| herb-pan-chicken-brunch | "香草煎雞胸早午餐" | 5 | 22 | 29.8 | 步驟偏簡，新手可能缺火力／狀態描述 |
| air-fryer-honey-sweet-potato | "氣炸蜜蕃薯" | 5 | 26 | 30.8 | 步驟偏簡，新手可能缺火力／狀態描述 |
| roasted-lemon-salmon-brunch | "爐烤檸香鮭魚早午餐" | 5 | 24 | 31.2 | 步驟偏簡，新手可能缺火力／狀態描述 |
| chefs-daily-soup | "主廚每日例湯" | 5 | 35 | 31.4 | 步驟偏簡，新手可能缺火力／狀態描述 |
| sf-brownie-ice-cream | 布朗尼冰淇淋 | 4 | 48 | 31.8 | 步驟偏簡，新手可能缺火力／狀態描述 |
| sf-american-cheesecake | 全美起司蛋糕 | 4 | 48 | 32.3 | 步驟偏簡，新手可能缺火力／狀態描述 |
| sf-strong-chocolate-cake | 強的 | 4 | 48 | 32.8 | 步驟偏簡，新手可能缺火力／狀態描述 |
| sf-country-cinnamon-peach-pie | 鄉村肉桂蜜桃派 | 4 | 48 | 33 | 步驟偏簡，新手可能缺火力／狀態描述 |
| honey-cajun-chicken-wings | "蜜汁紐澳良雞翅" | 4 | 38 | 33.5 | 步驟偏簡，新手可能缺火力／狀態描述 |
| spicy-seafood-tomato-pasta | "海鮮番茄辣麵" | 4 | 25 | 33.8 | 步驟偏簡，新手可能缺火力／狀態描述 |
| cajun-fries | "肯瓊香辣薯條" | 4 | 30 | 34.5 | 步驟偏簡，新手可能缺火力／狀態描述 |

> 其餘 72 篇見 `step-detail-flagged.json`（tier=medium）。

## 修稿檢查清單（人工）

- [ ] 每步是否寫出**可操作狀態**（顏色、稠度、是否全熟）
- [ ] 醬料／預製品是否在步驟中**點名使用時機**
- [ ] 氣炸／烤箱是否有**溫度＋時間＋翻面**
- [ ] 是否刪除與菜品不符的**模板殘句**（如沙拉步驟寫「主炸物」）

## 範例對照

| 類型 | slug | 均字/步 | 備註 |
| --- | --- | ---: | --- |
| 詳寫參考 | tomato-egg-rice | ~86 | 已修模板，可當基準 |
| 過簡 | cabbage-mushroom-rice | ~28 | 電鍋炊飯可補水量與鋪料順序 |
| 模板化 | sf-classic-caesar-salad | ~45 | 步驟像炸物分享盤，與凱薩沙拉不符 |

## 檔案

- `step-detail-flagged.json`：完整分級清單
- `reports/*.json`：全站審查逐篇 JSON
- **未自動修改**任何 `src/content/recipes/*.md`