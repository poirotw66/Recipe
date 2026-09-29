# 餐廳風格食譜 Critical 修復紀錄（2026-09-29）

## 範圍與結果

- 本批範圍為 2026-08-27 審查中剩餘的 16 篇 SF Critical 食譜，涵蓋繁中、英文、日文、韓文，共 64 個 Markdown 檔案。
- 16 篇均已重寫食材、調味、步驟、份量與時間，以及設備、技巧、保存方式、FAQ、標籤、內文和相關食材；各語言的標題與說明同步調整為可在家執行的版本。
- 移除 16 篇四語版本中未有來源佐證的 `restaurantSource`、餐廳還原文案，以及未驗證營養數字。路由、slug 與 `src/lib/recipe-index-eligibility.ts` 的 noindex 規則均未更動。
- 所有 16 篇評估狀態為 Warning：仍需實際下廚確認各配方的時間、份量與口感。未宣稱任何食譜已經過廚房測試。每篇 JSON 報告位於 `docs/reviews/recipe-audit/reports/{slug}.json`。

## 修正重點

| slug | 修正重點 |
| --- | --- |
| `sf-asahi-cordon-bleu-pork-burger` | 補齊火腿、起司、裹粉材料和麵包；填餡豬肉及內餡均須達 74°C。 |
| `sf-balsamic-mushroom-pasta` | 補齊蒜頭、起司、油醋調味；移除未列且未安全熟化的生蛋。 |
| `sf-bbq-roasted-half-chicken` | 刪除清洗生雞及以肉汁判熟的指示；雞胸與雞腿中心均須達 74°C，重算烘烤時間。 |
| `sf-black-truffle-cordon-bleu-pork-open` | 重寫填餡豬排、麵包及松露美乃滋配方；肉與內餡中心均須達 74°C。 |
| `sf-buffalo-chicken-wings` | 改為烤箱雞翅，列出實際雞翅和醬料用量，並要求中心達 74°C。 |
| `sf-chef-crispy-pork-knuckle` | 明確限定使用包裝標示已熟的豬腳，依包裝方式回熱至中心 74°C。 |
| `sf-green-superhero-quinoa-buddha-bowl` | 補齊藜麥水量、花椰菜、熟鷹嘴豆和醬汁步驟，修正總時間。 |
| `sf-mini-beef-egg-burger-set` | 補成兩份迷你漢堡的可執行材料與步驟；牛絞肉中心達 71°C、雞蛋全熟。 |
| `sf-moon-view-bitter-melon-cream-rice` | 以炒至凝固的蛋液取代生蛋拌飯，修正米飯和保存說明。 |
| `sf-roasted-sesame-chicken-salad` | 明列雞胸與沙拉用量，以煎熟雞肉取代不明炸雞；雞肉中心達 74°C。 |
| `sf-salsa-black-curry-fried-chicken` | 明列雞腿肉份量並改用烤箱；莎莎與黑咖哩醬分開作為沾醬，雞肉中心達 74°C。 |
| `sf-signature-double-stack-burger` | 移除步驟中食材表未列的炸魚、培根和薯塊；兩片牛絞肉肉餅分別達 71°C。 |
| `sf-sous-vide-chicken-quinoa-cauliflower-rice` | 限定使用包裝標示已熟可即食的舒肥雞，補足藜麥烹煮及花椰菜米時間。 |
| `sf-spicy-mexican-firecracker-burger` | 明列牛絞肉、起司與墨西哥辣椒，移除步驟缺少的薯塊；肉餅中心達 71°C。 |
| `sf-sweet-savory-rice` | 移除無法執行的「台南限定」食材，改為杏桃豬肉炒飯，並列熟飯與調味比例。 |
| `sf-tropical-yogurt-bowl` | 補上原味優格，移除水果上的橄欖油與鹽，將燕麥脆片改為上桌前加入。 |

## 食安依據與限制

肉類熟度使用食品溫度計描述：禽肉及剩菜回熱至 74°C；絞肉及蛋料理至 71°C；未填餡完整豬肉至 63°C 後靜置至少 3 分鐘。填餡豬肉另確認豬肉厚處及內餡中心均達 74°C。來源為 [USDA FSIS 安全溫度表](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart)、[USDA FSIS 填餡與食安指引](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry/stuffing-and-food-safety) 與 [FoodSafety.gov 安全熟度表](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures)。剩食冷藏與回熱指示參考 [FoodSafety.gov 食物安全指引](https://www.foodsafety.gov/food-poisoning/bacteria-and-viruses)。

這次修改和 build 只確認內容結構與頁面可建置，不代表廚房試作、口感、實際產量或時間已驗證。所有 16 篇仍維持 noindex，直到完成人工烹調校正與後續內容審查。

## 驗證

- 64 個食譜檔案的 YAML 與必要欄位型別、非空場景、步驟數、時間總和、食材份量字串及四語更新日期完成檢查。
- 繁中檔案掃描未發現韓文文字；四語檔案均移除未佐證餐廳來源與營養數值。
- `npm run build` 通過；Astro 仍輸出既有跨語系重複 ID 警告。
- `git diff --check` 另由主線整合時執行。
