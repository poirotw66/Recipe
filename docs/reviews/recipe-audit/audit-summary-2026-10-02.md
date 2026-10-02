# 食譜內容核對與多語修正（2026-10-02）

## 範圍與狀態

本表以 `RESTAURANT_AUDIT_REVIEWED_SLUGS` 的 25 個 slug 為範圍，彙整繁中配方及四語一致性複核。第二輪複核再修正 3 篇可由食安來源確認的操作缺口；巴西莓優格碗則保留已足夠清楚的正文。所有仍需實作確認的項目均標明未試作，不宣稱餐廳原配方或作者親身經驗。

| slug | 狀態 | 修正與尚待驗證事項 |
| --- | --- | --- |
| [`dh-fried-glass-noodle`](./reports/dh-fried-glass-noodle.json) | Warning | 四語移除未列豬肉並對齊油、蒜、醬油份量，補充冬粉處理；浸泡時間、份量與口感仍待試作。 |
| [`dh-ginseng-chicken-clay-pot`](./reports/dh-ginseng-chicken-clay-pot.json) | Warning | 四語補上小全雞重量、雞腹米餡測溫與燉煮流程，修正原本不適用的煎炸／冷卻提示；實際熟度、時間、份量與口感仍待試作。 |
| [`dh-ginseng-chicken-hot-pot`](./reports/dh-ginseng-chicken-hot-pot.json) | Warning | 四語補上小全雞重量、米餡測溫及年糕加煮步驟，修正保存提示；雞肉熟度、時間、湯量與口感仍待試作。 |
| [`dh-ox-bone-soup`](./reports/dh-ox-bone-soup.json) | Warning | 四語界定牛骨牛腩長時間熬煮的雪濃湯做法，補牛骨水位、肉與蘿蔔熟度、分裝冷卻及回熱提示；湯量、鹹度與時間仍待試作。 |
| [`dh-steamed-eggs-with-cheese-roe`](./reports/dh-steamed-eggs-with-cheese-roe.json) | Warning | 四語補上高湯降溫、蛋液過篩、覆蓋微火蒸製、多點測溫，並對齊兩碗起司用量；蒸製時間、份量與口感仍待試作。 |
| [`dh-tofu-ice-cream-with-tapioca`](./reports/dh-tofu-ice-cream-with-tapioca.json) | Warning | 四語限定即食嫩豆腐與依包裝煮珍珠，補充手動冷凍攪拌及冷食處理，移除未驗證的保存期限與珍珠冷凍口感說法；定型時間和口感仍待試作。 |
| [`sf-acai-berry-yogurt-bowl`](./reports/sf-acai-berry-yogurt-bowl.json) | Warning | 保留已涵蓋即食巴西莓泥、依包裝退冰、冷藏優格底及上桌前加脆料的流程；解凍質地、份量、時間與封面相符性仍待試作核對。 |
| [`sf-american-cheesecake`](./reports/sf-american-cheesecake.json) | Warning | 四語補上低速拌合、分次加蛋、蛋料理中心溫度與冷卻限制；6 吋版本的烘烤、凝固和切片效果仍待試作。 |
| [`sf-asahi-cordon-bleu-pork-burger`](./reports/sf-asahi-cordon-bleu-pork-burger.json) | Warning | 四語已對齊配料、步驟、份量資訊與食安檢查點；填餡豬肉的實際熟度、烹調時間、產量與口感仍待試作。 |
| [`sf-balsamic-mushroom-pasta`](./reports/sf-balsamic-mushroom-pasta.json) | Warning | 四語補上蕈菇出水至上色的判斷、巴薩米克醋刮鍋及分次加煮麵水裹醬的提示；總時間、份量與口感仍待試作。 |
| [`sf-bbq-roasted-half-chicken`](./reports/sf-bbq-roasted-half-chicken.json) | Warning | 第二輪四語明列 2 大匙橄欖油與 1/2 小匙鹽各半分給薯角和半雞，並保留雞胸、雞腿均達 74°C 的測溫要求；實際時間、份量與口感仍待試作。 |
| [`sf-black-truffle-cordon-bleu-pork-open`](./reports/sf-black-truffle-cordon-bleu-pork-open.json) | Warning | 四語補上家常改編定位、封口與麵衣處理，並說明從側面量測豬肉與夾層；烹調時間、產量、口感和夾層量測仍待試作。 |
| [`sf-buffalo-chicken-wings`](./reports/sf-buffalo-chicken-wings.json) | Warning | 四語配方、步驟、份量資訊與食安檢查點已對齊；雞翅實際熟度、烹調時間、產量與口感仍待試作。 |
| [`sf-chef-crispy-pork-knuckle`](./reports/sf-chef-crispy-pork-knuckle.json) | Warning | 四語限定依包裝回熱已熟豬腳並補中心測溫；包裝規格、實際回熱時間、份量與脆皮口感仍待試作。 |
| [`sf-country-cinnamon-peach-pie`](./reports/sf-country-cinnamon-peach-pie.json) | Warning | 四語移除雙層派底皮盲烤，補上餡料混合、封邊排氣、分段烘烤與完全冷卻；玉米澱粉比例及實際時間仍待試作。 |
| [`sf-green-superhero-quinoa-buddha-bowl`](./reports/sf-green-superhero-quinoa-buddha-bowl.json) | Warning | 四語補上藜麥吸水熟度、花椰菜上色與叉子測試及組碗順序；一人份時間、產量與口感仍待試作。 |
| [`sf-mini-beef-egg-burger-set`](./reports/sf-mini-beef-egg-burger-set.json) | Warning | 四語補上生熟食分流、接觸面清潔及熟肉不放回生肉盤；兒童餐份量、產量、時間與口感仍待試作。 |
| [`sf-moon-view-bitter-melon-cream-rice`](./reports/sf-moon-view-bitter-melon-cream-rice.json) | Warning | 四語補上蛋塊多點測至 71°C、刮除可能較苦的白色內膜及苦瓜汆燙線索；份量、時間、口感與封面相符性仍待試作。 |
| [`sf-roasted-sesame-chicken-salad`](./reports/sf-roasted-sesame-chicken-salad.json) | Warning | 第二輪四語補上生雞接觸過的砧板、刀具重用前須以熱肥皂水清洗，或改用蔬果專用工具；時間、產量與口感仍待試作。 |
| [`sf-salsa-black-curry-fried-chicken`](./reports/sf-salsa-black-curry-fried-chicken.json) | Warning | 四語配方、步驟、份量資訊與食安檢查點已對齊；雞塊熟度、烹調時間、產量及醬料搭配仍待試作。 |
| [`sf-signature-double-stack-burger`](./reports/sf-signature-double-stack-burger.json) | Warning | 四語補上家常薄肉餅順序、逐片側面測溫及來源界線；30 分鐘、單份產量與雙層組裝口感仍待試作。 |
| [`sf-sous-vide-chicken-quinoa-cauliflower-rice`](./reports/sf-sous-vide-chicken-quinoa-cauliflower-rice.json) | Warning | 四語限定包裝標示已熟可即食的舒肥雞，並說明藜麥悶蒸及花椰菜米熟度；整體時間、份量與成品仍待試作。 |
| [`sf-spicy-mexican-firecracker-burger`](./reports/sf-spicy-mexican-firecracker-burger.json) | Warning | 四語補上蔬菜備料、肉餅成形、起司融化與中心測溫；第二輪加入處理生牛肉後、碰麵包前洗手的提醒。25 分鐘、份量與口感仍待試作。 |
| [`sf-sweet-savory-rice`](./reports/sf-sweet-savory-rice.json) | Warning | 四語補上冷藏熟飯、香辛料順序、豬肉測溫及生熟器具分流；單人份時間、產量與口感仍待真人試作。 |
| [`sf-tropical-yogurt-bowl`](./reports/sf-tropical-yogurt-bowl.json) | Warning | 四語補上切水果前流動清水清洗、擦乾及乾淨刀具砧板；10 分鐘流程、份量與成品仍待試作。 |

25 篇人工審查仍維持 Warning，因為份量、實際時間與成品表現尚無真人試作證據。2026-10-02 依站主決定，這 25 個 slug 的四語頁面解除 noindex；這項索引政策變更不代表完成試作，也不保證 Google 收錄。全站機械預檢共 289 篇：Pass 227、Warning 62、Critical 0。先前驗證的 build、test 與 typecheck 結果屬於本次索引政策變更之前。

## 同期其他內容修正（不屬於本批 25 個原 Critical slug）

以下 7 篇另有內容複核與修正紀錄；它們不列入上表，也不屬於本次解除 noindex 的 25 篇：

- [`fish-and-chips`](./reports/fish-and-chips.json)：四語修正魚肉裹粉與薯條油炸流程，補上魚類熟度來源。
- [`garlic-mushroom-tofu-rice-bowl`](./reports/garlic-mushroom-tofu-rice-bowl.json)：日韓上桌提示恢復適用於豆腐飯碗的內容；份量與蕈菇收水仍待試作。
- [`sf-classic-caesar-salad`](./reports/sf-classic-caesar-salad.json)：分開保存熟培根、蔬菜、醬汁與麵包丁，補上剩食安全說明。
- [`sf-oat-crusted-fish-and-fries`](./reports/sf-oat-crusted-fish-and-fries.json)：四語烹調時間按步驟上限修正，並補上魚類安全熟度來源。
- [`air-fryer-lemon-fish-fillet`](./reports/air-fryer-lemon-fish-fillet.json)：對齊四語剩食冷藏與回熱說明，補上台灣食藥署及 USDA 來源。
- [`sf-classic-ham-mushroom-eggs-benedict`](./reports/sf-classic-ham-mushroom-eggs-benedict.json)：整理為兩人份四顆蛋的家常版本，明確區分參考食譜與餐廳原配方。
- [`sf-orange-danish-poached-seafood-potato`](./reports/sf-orange-danish-poached-seafood-potato.json)：補上生食材起始的家常海鮮流程及來源限制。

## 官方保存參考

- [台灣食品藥物管理署：剩食兩小時內冷藏、復熱中心達 70°C 以上](https://www.fda.gov.tw/TC/newsContent.aspx?cid=4&id=31422)
- [USDA FSIS：Leftovers and Food Safety](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety)
- [Food Standards Agency：Safe method — rice](https://www.food.gov.uk/sites/default/files/media/document/sfbb-chinese-05-cooking-04-rice_0.pdf)；米飯應盡快冷卻、1 小時內冷藏並於 24 小時內使用；另參考 [FSA 剩食回熱指引](https://www.food.gov.uk/safety-hygiene/cooking-your-food)，剩食只回熱一次。
- [USDA FSIS：Food Thermometers](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-thermometers)；薄肉片應由側面插入溫度計至中心。

## 其他食譜參考

- 班尼蛋份量： [The Washington Post：Mushroom Benedict](https://www.washingtonpost.com/recipes/mushroom-benedict/)；只參考兩人份 4 顆蛋，不代表貳樓原配方。
- 海鮮丹麥家常技法與蝦熟度：來源和限制見 [`sf-orange-danish-poached-seafood-potato.json`](./reports/sf-orange-danish-poached-seafood-potato.json)。
- 蕈菇義大利麵的上色、刮鍋與乳化技巧：[Bon Appétit 同名食譜](https://www.bonappetit.com/recipe/balsamic-mushroom-and-sausage-pasta)、[煮麵水與油脂的裹醬技巧](https://www.bonappetit.com/story/saucy-glossy-pasta)；本站份量與配方仍未試作。

## 本輪烹調與處理參考

- 藜麥沖洗與熟度訊號：[Colorado State University](https://www.chhs.colostate.edu/krnc/monthly-blog/quinoa-confused-read-our-how-to-guide/)；花椰菜切塊、單層鋪放與叉子熟度：[Rutgers Cooperative Extension](https://extension.rutgers.edu/recipes/roasted-cauliflower)。
- 起司蛋糕的蛋料理溫度：[FDA egg safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety)；攪拌及參考配方測溫位置：[King Arthur Baking](https://www.kingarthurbaking.com/recipes/easy-cheesecake-recipe)。
- 水果派封邊、排氣、冒泡與冷卻：[King Arthur Baking pie guide](https://www.kingarthurbaking.com/learn/guides/pie-baking)；雙層派不盲烤底皮：[King Arthur Baking](https://www.kingarthurbaking.com/blog/2021/05/24/prebake-pie-crust)。
- 生雞／生肉後的手部清潔、器具清洗與生熟食分流：[USDA FSIS：Keep Food Safe! Food Safety Basics](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/steps-keep-food-safe)。
- 切水果前以流動清水清洗、洗後擦乾：[FDA produce guidance](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely)；牛骨湯淺容器降溫、湯品沸騰回熱與剩食安全：[USDA FSIS leftovers guidance](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/leftovers-and-food-safety)。
- 冷食使用真空豆製品的即食標示：[台灣食藥署第 965 期](https://www.fda.gov.tw/tc/PublishOtherEpaperContent.aspx?id=1500&r=697583302&tid=4671)；手動冷凍攪拌技巧：[David Lebovitz](https://www.davidlebovitz.com/making-ice-crea-1/)僅供一般技巧參考，原料配方不同，未驗證本頁成品。

## 下一步

原 Critical 清單 25 篇均已完成文字層複核，其中有操作缺口者依可查證來源修正，巴西莓優格碗則保留既有稿件。站主已決定不以真人試作作為解除 noindex 的前置條件；內容 Warning 與尚未驗證欄位仍照實保留。commit `b1f9a16` 已部署；正式站檢查 100 個語系頁均為 HTTP 200、無 robots noindex、自我 canonical，且繁中與英文 sitemap 包含這 25 篇。Search Console 即時測試 BBQ 半雞繁中頁可索引，並已將該頁加入優先檢索佇列；其餘頁面未逐頁提交，Google 是否收錄仍由 Google 判定。若要擴大到其他未索引頁面，先取得最新 Search Console「網頁」完整匯出作為排序依據；機械預檢或本文修訂本身不能代替 Google 收錄結果。

苦瓜家常技法：[The Woks of Life：Bitter Melon with Eggs](https://thewoksoflife.com/bitter-melon-with-eggs/)；含蛋料理溫度與多點測量：[USDA FSIS：Egg safety](https://ask.fsis.usda.gov/article/What-is-a-safe-internal-temperature-for-food-made-with-eggs)、[Food Thermometers](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-thermometers)。
