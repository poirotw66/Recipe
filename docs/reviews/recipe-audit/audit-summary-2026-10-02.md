# 食譜內容核對與多語修正（2026-10-02）

## 範圍與狀態

本批覆核 5 個 slug 的繁中配方及四語一致性，修正可從現有食材、步驟與官方保存指引直接核對的問題。沒有新增未試作的風味、口感或作者經驗宣稱。

上一小批六個語系文字修正已先提交為 `c172493`；以下列的是該 commit 之後的修正。

| slug | 狀態 | 修正與尚待驗證事項 |
| --- | --- | --- |
| [`fish-and-chips`](./reports/fish-and-chips.json) | Warning | 四語描述改為麵粉與蛋液沾裹、薯條雙重油炸，移除不符配方的啤酒麵糊說法；補上魚類 63°C 安全熟度來源。油溫恢復、炸製順序與成品脆度仍待試作。 |
| [`garlic-mushroom-tofu-rice-bowl`](./reports/garlic-mushroom-tofu-rice-bowl.json) | Warning | 日韓提示改回適用於豆腐飯碗的上桌前拌合建議。豆腐半盒的實際重量、菇類收水與蒜末時序仍待試作。 |
| [`sf-classic-caesar-salad`](./reports/sf-classic-caesar-salad.json) | Warning | 四語保存說明限定回熱熟培根，並將生菜、醬汁與麵包丁分開保存，避免回熱整份沙拉；頁面補上剩食安全參考。份量與成品仍待試作。 |
| [`sf-oat-crusted-fish-and-fries`](./reports/sf-oat-crusted-fish-and-fries.json) | Warning | 四語 `cookTime` 由 20 改為 27 分鐘、`totalTime` 由 35 改為 42 分鐘，按步驟 15 分鐘薯條加 10～12 分鐘魚片、取上限計算；頁面補上魚類安全熟度參考。實際烤箱時間仍待試作。 |
| [`air-fryer-lemon-fish-fillet`](./reports/air-fryer-lemon-fish-fillet.json) | Warning | 四語保存說明對齊：剩食兩小時內冷藏、三至四天內食用，回熱至至少 75°C；頁面連結到台灣食藥署與 USDA 來源。實際烹調時間與回熱後質地尚未試作。 |

本批 5 篇機械 precheck 均為 Pass、沒有機械警告；`npm test`、`npm run build` 與 `git diff --check` 通過。建置成功，但 Astro 仍輸出跨語系共用 recipe ID 的既有警告。人工狀態保留 Warning，因為份量、實際時間與成品表現沒有真人試作證據。這些修正解決配方一致性，不等於已補足全站原創內容深度或證明 Google 會收錄。

## 官方保存參考

- [台灣食品藥物管理署：剩食兩小時內冷藏、復熱中心達 70°C 以上](https://www.fda.gov.tw/TC/newsContent.aspx?cid=4&id=31422)
- [USDA FSIS：Leftovers and Food Safety](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety)

## 下一步

先安排真人試作以補上實際份量、設備、時間、熟度、失敗修正和原始成品照片。優先處理配方本身仍有歧義的班尼蛋與海鮮丹麥盤；蛋數、油脂用量、預製配料和海鮮組合須由作者或試作者確認，不能從文字猜定。Search Console 選頁應使用最新「網頁」完整匯出；先前流量樣本偏小且時間較早，不足以替目前這批頁面排序。
