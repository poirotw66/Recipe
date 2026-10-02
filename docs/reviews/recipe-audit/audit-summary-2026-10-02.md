# 食譜內容核對與多語修正（2026-10-02）

## 範圍與狀態

本批覆核 7 個 slug 的繁中配方及四語一致性，修正可從現有食材、步驟與來源直接核對的問題。需要實作確認的食譜都標明未試作與家常改編，不宣稱餐廳原配方或作者親身經驗。

上一小批六個語系文字修正已先提交為 `c172493`；以下列的是該 commit 之後的修正。

| slug | 狀態 | 修正與尚待驗證事項 |
| --- | --- | --- |
| [`fish-and-chips`](./reports/fish-and-chips.json) | Warning | 四語描述改為麵粉與蛋液沾裹、薯條雙重油炸，移除不符配方的啤酒麵糊說法；補上魚類 63°C 安全熟度來源。油溫恢復、炸製順序與成品脆度仍待試作。 |
| [`garlic-mushroom-tofu-rice-bowl`](./reports/garlic-mushroom-tofu-rice-bowl.json) | Warning | 日韓提示改回適用於豆腐飯碗的上桌前拌合建議。豆腐半盒的實際重量、菇類收水與蒜末時序仍待試作。 |
| [`sf-classic-caesar-salad`](./reports/sf-classic-caesar-salad.json) | Warning | 四語保存說明限定回熱熟培根，並將生菜、醬汁與麵包丁分開保存，避免回熱整份沙拉；頁面補上剩食安全參考。份量與成品仍待試作。 |
| [`sf-oat-crusted-fish-and-fries`](./reports/sf-oat-crusted-fish-and-fries.json) | Warning | 四語 `cookTime` 由 20 改為 27 分鐘、`totalTime` 由 35 改為 42 分鐘，按步驟 15 分鐘薯條加 10～12 分鐘魚片、取上限計算；頁面補上魚類安全熟度參考。實際烤箱時間仍待試作。 |
| [`air-fryer-lemon-fish-fillet`](./reports/air-fryer-lemon-fish-fillet.json) | Warning | 四語保存說明對齊：剩食兩小時內冷藏、三至四天內食用，回熱至至少 75°C；頁面連結到台灣食藥署與 USDA 來源。實際烹調時間與回熱後質地尚未試作。 |
| [`sf-classic-ham-mushroom-eggs-benedict`](./reports/sf-classic-ham-mushroom-eggs-benedict.json) | Warning | 四語改為明確的家常版本、兩人份 4 顆蛋，逐顆水波並對齊油、鹽、胡椒總量；參考 Washington Post 份量，不宣稱貳樓原配方。奶油精確量與耗時仍待試作。 |
| [`sf-orange-danish-poached-seafood-potato`](./reports/sf-orange-danish-poached-seafood-potato.json) | Warning | 四語從生馬鈴薯、鮮菇與去殼去腸泥生蝦開始，補上可操作流程並標明未試作家常改編；官方菜單未公開實際海鮮與半成品規格。 |

本批 7 篇人工狀態均保留 Warning，因為份量、實際時間與成品表現沒有真人試作證據；兩篇新修食譜的機械預檢均為 Pass。全站機械預檢共 289 篇：Pass 227、Warning 62、Critical 0。`npm test`、`npm run build` 與 `git diff --check` 通過；建置仍顯示既有的重複 recipe ID 及 Cloudflare Sharp 警告。這些修正改善配方一致性與可操作性，不等於已證明 Google 會收錄或已補足全站原創內容深度。

## 官方保存參考

- [台灣食品藥物管理署：剩食兩小時內冷藏、復熱中心達 70°C 以上](https://www.fda.gov.tw/TC/newsContent.aspx?cid=4&id=31422)
- [USDA FSIS：Leftovers and Food Safety](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety)

## 其他食譜參考

- 班尼蛋份量： [The Washington Post：Mushroom Benedict](https://www.washingtonpost.com/recipes/mushroom-benedict/)；只參考兩人份 4 顆蛋，不代表貳樓原配方。
- 海鮮丹麥家常技法與蝦熟度：來源和限制見 [`sf-orange-danish-poached-seafood-potato.json`](./reports/sf-orange-danish-poached-seafood-potato.json)。

## 下一步

下一批聚焦 `sf-moon-view-bitter-melon-cream-rice`：既有安全修正已對齊，但產量、時程、苦瓜口感與成品照片都需要真人試作才能補上，公開來源無法證明本站實際成品。Search Console 選頁應使用最新「網頁」完整匯出；既有流量樣本偏小且時間較早，不足以替目前這批頁面排序。
