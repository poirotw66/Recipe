# 食譜內容核對與多語修正（2026-10-02）

## 範圍與狀態

本表彙整 15 個 slug 的繁中配方及四語一致性修正：前 7 篇已由 `e2a26b5` 提交、接續 4 篇由 `7cae2dd` 提交、再 2 篇由 `70eaacd` 提交，本輪最後 2 篇待提交。只修正可由配方和可查證來源支持的內容；需要實作確認的項目都標明未試作，不宣稱餐廳原配方或作者親身經驗。

| slug | 狀態 | 修正與尚待驗證事項 |
| --- | --- | --- |
| [`fish-and-chips`](./reports/fish-and-chips.json) | Warning | 四語描述改為麵粉與蛋液沾裹、薯條雙重油炸，移除不符配方的啤酒麵糊說法；補上魚類 63°C 安全熟度來源。油溫恢復、炸製順序與成品脆度仍待試作。 |
| [`garlic-mushroom-tofu-rice-bowl`](./reports/garlic-mushroom-tofu-rice-bowl.json) | Warning | 日韓提示改回適用於豆腐飯碗的上桌前拌合建議。豆腐半盒的實際重量、菇類收水與蒜末時序仍待試作。 |
| [`sf-classic-caesar-salad`](./reports/sf-classic-caesar-salad.json) | Warning | 四語保存說明限定回熱熟培根，並將生菜、醬汁與麵包丁分開保存，避免回熱整份沙拉；頁面補上剩食安全參考。份量與成品仍待試作。 |
| [`sf-oat-crusted-fish-and-fries`](./reports/sf-oat-crusted-fish-and-fries.json) | Warning | 四語 `cookTime` 由 20 改為 27 分鐘、`totalTime` 由 35 改為 42 分鐘，按步驟 15 分鐘薯條加 10～12 分鐘魚片、取上限計算；頁面補上魚類安全熟度參考。實際烤箱時間仍待試作。 |
| [`air-fryer-lemon-fish-fillet`](./reports/air-fryer-lemon-fish-fillet.json) | Warning | 四語保存說明對齊：剩食兩小時內冷藏、三至四天內食用，回熱至至少 75°C；頁面連結到台灣食藥署與 USDA 來源。實際烹調時間與回熱後質地尚未試作。 |
| [`sf-classic-ham-mushroom-eggs-benedict`](./reports/sf-classic-ham-mushroom-eggs-benedict.json) | Warning | 四語改為明確的家常版本、兩人份 4 顆蛋，逐顆水波並對齊油、鹽、胡椒總量；參考 Washington Post 份量，不宣稱貳樓原配方。奶油精確量與耗時仍待試作。 |
| [`sf-orange-danish-poached-seafood-potato`](./reports/sf-orange-danish-poached-seafood-potato.json) | Warning | 四語從生馬鈴薯、鮮菇與去殼去腸泥生蝦開始，補上可操作流程並標明未試作家常改編；官方菜單未公開實際海鮮與半成品規格。 |
| [`sf-black-truffle-cordon-bleu-pork-open`](./reports/sf-black-truffle-cordon-bleu-pork-open.json) | Warning | 四語補上填餡封口、麵衣覆蓋、薄肉側面量溫與時間變因；區分填餡肉指引與一般豬排基準，74°C 僅標明為本配方保守目標。夾層量測、耗時與成品仍待試作。 |
| [`sf-moon-view-bitter-melon-cream-rice`](./reports/sf-moon-view-bitter-melon-cream-rice.json) | Warning | 四語補上蛋塊多點量至 71°C、刮除可能較苦的白色內膜及汆燙 30 秒的來源依據；本站份量、時間、口感與封面成品一致性仍待試作。 |
| [`sf-mini-beef-egg-burger-set`](./reports/sf-mini-beef-egg-burger-set.json) | Warning | 四語補上先備料、生牛肉處理後清潔雙手與接觸面，以及熟肉不放回生肉盤；兒童餐份量、產量、耗時與口感仍待試作。 |
| [`sf-signature-double-stack-burger`](./reports/sf-signature-double-stack-burger.json) | Warning | 四語補上薄肉餅操作順序、逐片側面測溫與家常改編來源界線；每份 30 分鐘、產量和雙層組裝結果仍待試作。 |
| [`sf-spicy-mexican-firecracker-burger`](./reports/sf-spicy-mexican-firecracker-burger.json) | Warning | 四語補上蔬菜備料、肉餅成形、鍋面火候提示、烤麵包順序、起司融化與中心測溫；25 分鐘、一人份產量及口感仍待試作。 |
| [`dh-steamed-eggs-with-cheese-roe`](./reports/dh-steamed-eggs-with-cheese-roe.json) | Warning | 四語補上高湯降溫、蛋液過篩、覆蓋微火蒸製、兩處中心測溫，並將兩碗起司片數對齊；蒸製時間、份量與口感仍待試作。 |
| [`sf-sweet-savory-rice`](./reports/sf-sweet-savory-rice.json) | Warning | 四語補上冷飯撥散、香辛料下鍋順序、薄肉片側向測溫與生熟器具清潔；保存說明明確限定熟飯加熱一次後不再回熱。單人份時間、產量與口感仍待真人試作。 |
| [`sf-balsamic-mushroom-pasta`](./reports/sf-balsamic-mushroom-pasta.json) | Warning | 四語補上蕈菇出水後轉為煎炒聲、邊緣上色、巴薩米克醋刮鍋，以及分次加煮麵水至醬汁裹麵的判斷；總時間、份量與口感仍待真人試作。 |

15 篇人工審查狀態均為 Warning、Pass 0、Critical 0，因為份量、實際時間與成品表現尚無真人試作證據；本輪兩篇也未變更 noindex。全站機械預檢共 289 篇：Pass 227、Warning 62、Critical 0。`npm test`、`npm run build` 與 `git diff --check` 通過；建置仍會顯示跨語系重複 recipe ID 與 Cloudflare Sharp 警告，但建置完成。這些修正改善配方一致性與可操作性，不等於已證明 Google 會收錄或已補足全站原創內容深度。

## 官方保存參考

- [台灣食品藥物管理署：剩食兩小時內冷藏、復熱中心達 70°C 以上](https://www.fda.gov.tw/TC/newsContent.aspx?cid=4&id=31422)
- [USDA FSIS：Leftovers and Food Safety](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety)
- [Food Standards Agency：Safe method — rice](https://www.food.gov.uk/sites/default/files/media/document/sfbb-chinese-05-cooking-04-rice_0.pdf)；米飯應盡快冷卻、1 小時內冷藏並於 24 小時內使用；另參考 [FSA 剩食回熱指引](https://www.food.gov.uk/safety-hygiene/cooking-your-food)，剩食只回熱一次。
- [USDA FSIS：Food Thermometers](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-thermometers)；薄肉片應由側面插入溫度計至中心。

## 其他食譜參考

- 班尼蛋份量： [The Washington Post：Mushroom Benedict](https://www.washingtonpost.com/recipes/mushroom-benedict/)；只參考兩人份 4 顆蛋，不代表貳樓原配方。
- 海鮮丹麥家常技法與蝦熟度：來源和限制見 [`sf-orange-danish-poached-seafood-potato.json`](./reports/sf-orange-danish-poached-seafood-potato.json)。
- 蕈菇義大利麵的上色、刮鍋與乳化技巧：[Bon Appétit 同名食譜](https://www.bonappetit.com/recipe/balsamic-mushroom-and-sausage-pasta)、[煮麵水與油脂的裹醬技巧](https://www.bonappetit.com/story/saucy-glossy-pasta)；本站份量與配方仍未試作。

## 下一步

`dh-fried-glass-noodle` 已在前一輪改為無肉版本並核對冬粉、蔬菜及調味，文字面目前待真人試作、成品照比對與實際時間確認。下一個文字補強候選為 `sf-green-superhero-quinoa-buddha-bowl`：先核對藜麥吸水與烹煮判斷、烤蔬菜熟度、組碗時序及四語一致性，再只補來源能支持的操作資訊。若要依流量挑選未索引頁面，仍需使用最新 Search Console「網頁」完整匯出；機械預檢或本文修訂本身不能代替 Google 收錄結果。

苦瓜家常技法：[The Woks of Life：Bitter Melon with Eggs](https://thewoksoflife.com/bitter-melon-with-eggs/)；含蛋料理溫度與多點測量：[USDA FSIS：Egg safety](https://ask.fsis.usda.gov/article/What-is-a-safe-internal-temperature-for-food-made-with-eggs)、[Food Thermometers](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-thermometers)。
