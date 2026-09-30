# 未索引候選食譜深度修正 — 2026-09-30

## 範圍與依據

本批以目前可取得的 Search Console 匯出挑選 2 個食譜 slug，更新繁中、英文、日文、韓文共 8 個頁面。網址級的「已檢索－目前尚未建立索引」樣本匯出於 2026-08-28，僅有 1,000 筆列項且不是目前索引狀態；其中包含：

| 食譜 | 匯出中的網址與上次檢索日 |
| --- | --- |
| `air-fryer-garlic-pork-chop` | `/ja/recipes/air-fryer-garlic-pork-chop/` — 2026-07-23 |
| `garlic-mushroom-tofu-rice-bowl` | `/recipes/garlic-mushroom-tofu-rice-bowl/` — 2026-08-02；`/en/recipes/garlic-mushroom-tofu-rice-bowl/` — 2026-07-30；`/ja/recipes/garlic-mushroom-tofu-rice-bowl/` — 2026-07-24 |

2026-09-21 的最新索引原因報表仍列 1,093 個「已檢索－目前尚未建立索引」網址；整體未索引卡片顯示 1,420，原因列合計 1,425。2026-09-29 已重新提交 sitemap，但 Search Console 當時尚未重新讀取，因此不能確認這批網址目前是否仍未索引，也不能推論本次內容修改會帶來收錄。

2026-06-27 至 2026-09-26 的成效匯出有 30 次曝光、0 次點擊；最近 28 天有 3 次曝光、0 次點擊。三個月網址列包含韓文氣炸蒜香豬排 7 次曝光及韓文蒜香菇豆腐飯碗 4 次曝光；查詢列另有韓文氣炸豬肉、菇類拌飯與豆腐拌飯等低量訊號。Search Console 的查詢與網址匯出是分開彙總，不能把特定查詢直接配對到特定頁面。這些資料只作需求與優先順序的弱佐證，不是頁面目前索引狀態。

## 修正結果

| slug | 狀態 | 修正與讀者收益 |
| --- | --- | --- |
| `air-fryer-garlic-pork-chop` | Pass | 四語頁改以食物溫度計確認最厚處中心達 63°C（145°F），並至少靜置 3 分鐘；移除以肉汁顏色判斷熟度的說法。補上 FoodSafety.gov 食安參考，並將時間標示調整為包含靜置的估算值。 |
| `garlic-mushroom-tofu-rice-bowl` | Pass | 四語頁統一使用適合煎炒的板豆腐／firm tofu／木綿豆腐／단단한 두부；補足原列 1.5 大匙橄欖油的使用方式（菇類 1 大匙、豆腐 1.5 小匙），寫清先炒菇、盛出煎豆腐、再回鍋拌醬的順序。韓文名稱改為「덮밥」，避免將這道蒜香醬油飯碗標成不相符的拌飯類型。 |

逐篇紀錄：

- [air-fryer-garlic-pork-chop 審查紀錄](./reports/air-fryer-garlic-pork-chop.json)
- [garlic-mushroom-tofu-rice-bowl 審查紀錄](./reports/garlic-mushroom-tofu-rice-bowl.json)

## 驗證與限制

- 繁中食譜機械 precheck：兩篇皆 Pass，0 Warning、0 Critical。
- 整合後 `npm run build`、`npm test` 與 `git diff --check` 通過；8 個語系路由另以 smoke check 確認 canonical、食安引用／溫度字串與豆腐飯用油步驟。
- Build 保留既有多語 recipe collection 重複 ID 警告；本批沒有更動 collection 架構，警告不阻止建置。
- 四語文字與結構已審查；沒有實際下廚試作，不能宣稱風味、質地、份量或實際氣炸時間已實測。豬排時間依厚度和機型而變，應以溫度計讀值為準。
- 本批保留 25 個 Critical 餐廳還原 slug 的 `noindex` 決策；本次技術稽核未發現全站 canonical、hreflang、robots 或 sitemap 設定錯誤。
# 食譜內容深度與重複模板修正（2026-09-30）

## 範圍與判斷

- 延續 Search Console 未索引候選頁的內容修正，並把全站掃描找到的重複模板一併處理：共 112 篇食譜、zh-TW／en／ja／ko 四語 448 份食譜檔案，以及 112 份逐篇審查報告。前 47 篇包含既定候選頁與前言重複群；另 65 篇是在可索引食譜中找到完全重複、且常與菜色不符的提示與 FAQ。後者是全站內容品質修正，不宣稱這 65 篇都已由 Search Console 個別判定未索引。
- 全庫 289 篇繁中食譜原有 46 篇落在 8 組完全相同的前言；本批完成後重複前言群組為 0。65 篇原樣共用「肉類靜置」提示與「如何避免主食材變乾」問答，也已逐篇移除或改成對應材料、順序與讀者問題的內容；全庫此兩段原文殘留為 0。
- 補強重點是讀者能依步驟完成料理：材料表與步驟用量相符、食材熟度與質地判斷、鍋中順序、出錯時如何調整、適用的保存方式，以及自然的四語在地化。沒有設定字數目標，也沒有把來源食譜或未試作內容說成本站實測。

## 修正結果

- 三篇 Eggs Benedict 原本缺少荷蘭醬，現依 Food Network Tyler Florence 配方比例縮為兩人份，在四語補齊材料、隔水乳化步驟與濃稠判斷；報告明列來源與「未試作」。
- 改正材料表和步驟衝突、漏列蒜頭、肉丸熟度未定、雞肉／海鮮熟度判斷不足、甜點錯用熟食回熱保存文案等具體問題；需要食品安全依據處附上 USDA／FDA／FoodSafety.gov 來源。
- 清理英日韓文殘留中文、錯譯與截斷文字。112 份逐篇報告均保留 Warning，因為尚未完成廚房試作；機械 precheck 的 Pass 不代表配方已實作驗證。

| slug | 狀態 | 主要修正 |
| --- | --- | --- |
| [`beef-broccoli-stirfry`](./reports/beef-broccoli-stirfry.json) | Warning | 四語已移除通用肉類靜置提示，改為牛肉回鍋後快速裹醬；共用乾柴問答已換成青花菜汆燙是否必要的做法。 |
| [`beef-carrot-soup`](./reports/beef-carrot-soup.json) | Warning | 四語已移除不適用的切肉靜置提示與共用乾柴問答，保留紅蘿蔔切塊時間、前夜燉煮冷藏及牛肉軟嫩等本湯專屬提醒。 |
| [`beef-mushroom-stirfry`](./reports/beef-mushroom-stirfry.json) | Warning | 四語已將共用提示與問答改為菇類炒至收乾、再與牛肉回鍋的順序與熟度提示。 |
| [`beef-tofu-braise`](./reports/beef-tofu-braise.json) | Warning | 四語已移除牛肉切片靜置的通用文案，改為豆腐擦乾、單層煎色與燉煮時從鍋邊輕推的操作提示；FAQ 改答豆腐如何不易碎。 |
| [`beef-tomato-noodles`](./reports/beef-tomato-noodles.json) | Warning | 四語已移除與薄牛肉片不符的靜置提示及共用乾柴問答，改為麵與湯分開盛裝、牛肉最後下鍋等本菜操作提示；保留番茄替換及肉片替代 FAQ。 |
| [`bento-black-pepper-beef`](./reports/bento-black-pepper-beef.json) | Warning | 四語已移除不適用的切肉靜置提示及共用乾柴問答，改為便當回熱時以微濕紙巾覆蓋並將肉與醬汁同盒保存。 |
| [`bento-ginger-chicken`](./reports/bento-ginger-chicken.json) | Warning | 四語已移除共用靜置提示，補入薑與醬料下鍋時序，並改以最厚處中心74°C確認雞肉熟度。 |
| [`bento-honey-soy-pork`](./reports/bento-honey-soy-pork.json) | Warning | 四語已移除不適用於絞肉的靜置提示及共用乾柴問答，改為攪動頻率、蜂蜜醬收汁狀態，並補絞肉中心71°C熟度確認。 |
| [`broccoli-mushroom-chicken-rice-bowl`](./reports/broccoli-mushroom-chicken-rice-bowl.json) | Warning | 四語已移除共用靜置提示與乾柴問答，改補雞丁單層煎色與青花菜瀝乾提示；雞丁中心熟度補至74°C，另刪除缺乏營養數據支持的減脂 FAQ。 |
| [`broccoli-onion-chicken-soup`](./reports/broccoli-onion-chicken-soup.json) | Warning | 四語已移除不適用於湯片雞肉的靜置提示及共用乾柴問答，改為洋蔥煮透後下雞肉、湯保持微滾並最後放青花菜；雞肉最厚處補74°C確認。 |
| [`cabbage-carrot-chicken-rice-bowl`](./reports/cabbage-carrot-chicken-rice-bowl.json) | Warning | 四語已移除共用靜置提示與乾柴問答，改為紅蘿蔔、雞丁、高麗菜的下鍋順序提示；雞丁最厚處補74°C熟度確認。 |
| [`canned-tuna-rice-bowl`](./reports/canned-tuna-rice-bowl.json) | Warning | 四語已移除與罐頭鮪魚、熟飯不符的肉類靜置提示及共用乾柴問答，補充鮪魚瀝汁、拌醬與熱飯組合的順序；保留替代美乃滋 FAQ。 |
| [`carrot-chicken-rice-bowl`](./reports/carrot-chicken-rice-bowl.json) | Warning | 四語已移除共用靜置提示及乾柴問答，補充雞丁單層上色與紅蘿蔔切丁熟度提示；雞丁最厚處補74°C確認。 |
| [`chicken-broccoli-pasta`](./reports/chicken-broccoli-pasta.json) | Warning | 四語已移除共用靜置提示及乾柴問答，改為煮麵水分次加入、醬汁裹麵即停的提示；雞胸最厚處補74°C確認。 |
| [`classic-caesar-chicken-salad`](./reports/classic-caesar-chicken-salad.json) | Warning | 四語已移除共用靜置提示與乾柴問答，補充生菜瀝乾、先拌約三分之二醬汁並將其餘另附的做法，讓葉菜保持爽脆。 |
| [`curry-beef-rice`](./reports/curry-beef-rice.json) | Warning | 四語已移除不適用的牛肉靜置提示與共用乾柴問答，補充咖哩粉只炒至出香即加水、避免焦苦；保留品牌辣度 FAQ。 |
| [`dh-bibimbap`](./reports/dh-bibimbap.json) | Warning | 四語已統一為 2 人份，並補回石鍋烘飯步驟、判斷鍋巴完成的聲音與香氣線索，以及沒有石鍋時的上桌方式；Maangchi 技法參考已列於頁面。 |
| [`electricpot-broccoli-chicken-bento`](./reports/electricpot-broccoli-chicken-bento.json) | Warning | 四語已移除共用靜置提示及乾柴問答，改為雞肉單層排放留縫、跳起後悶5分鐘；熟度改以最厚處中心74°C量測，不再依賴肉汁顏色。 |
| [`electricpot-mushroom-chicken-bento`](./reports/electricpot-mushroom-chicken-bento.json) | Warning | 四語已移除共用靜置提示及乾柴問答，改為洋蔥、菇、雞肉的分層與雞片留縫提示；雞肉熟度改以最厚處中心74°C量測。 |
| [`fish-and-chips`](./reports/fish-and-chips.json) | Warning | 四語已移除與魚肉不符的靜置提示與共用乾柴問答，補上薯條兩次油炸的操作問答；鱈魚最厚處熟度補至63°C。 |
| [`garlic-beef-cabbage-stirfry`](./reports/garlic-beef-cabbage-stirfry.json) | Warning | 四語已移除共用牛肉靜置提示與乾柴問答，改以先盛牛肉、炒高麗菜至略軟後回鍋約1分鐘的順序，說明如何保留菜脆口。 |
| [`garlic-cream-shrimp-pasta`](./reports/garlic-cream-shrimp-pasta.json) | Warning | 四語已移除不適用於蝦仁的靜置提示與共用乾柴問答，補奶醬濃度可用煮麵水分次調整的 FAQ；蝦仁最厚處補63°C確認並避免久煮。 |
| [`garlic-mushroom-chicken`](./reports/garlic-mushroom-chicken.json) | Warning | 四語已移除共用靜置提示與乾柴問答，改為雞肉表面轉白後先盛起、菇類收乾後回鍋；雞片最厚處補74°C確認。 |
| [`garlic-tofu-chicken-pan-main`](./reports/garlic-tofu-chicken-pan-main.json) | Warning | 雞胸與豆腐都先切成塊，起鍋後直接上桌，不需要再靜置切片；保留雞塊尺寸提示，以及醬油減半試味和便當搭配問答。 |
| [`garlic-tomato-chicken-rice-bowl`](./reports/garlic-tomato-chicken-rice-bowl.json) | Warning | 雞丁完成後直接以醬油收汁並連番茄汁淋飯，沒有起鍋靜置再切的步驟；保留雞胸拌油、番茄酸味和雞里肌替換提示。 |
| [`herb-pan-chicken-brunch`](./reports/herb-pan-chicken-brunch.json) | Warning | 雞胸已在步驟中靜置 2 分鐘、逆紋切片並以 74°C 判熟，通用 FAQ 只重複靜置建議；保留溫度熟度提示。 |
| [`high-protein-chicken-broccoli-bowl`](./reports/high-protein-chicken-broccoli-bowl.json) | Warning | 雞胸拍至約 1 公分並在步驟中靜置後切片，重複提示沒有新增判斷資訊；保留氣炸鍋版本和無飯搭配問答。 |
| [`high-protein-shrimp-tofu-bowl`](./reports/high-protein-shrimp-tofu-bowl.json) | Warning | 蝦仁與豆腐炒合後整塊上桌，沒有肉類靜置切片的操作；保留青江菜加纖維提示與雞胸替換問答。 |
| [`high-protein-tofu-steak-plate`](./reports/high-protein-tofu-steak-plate.json) | Warning | 主食材是經壓水、煎封並收照燒汁的豆腐排，肉類靜置 FAQ 不適用；保留氣炸鍋少油版本和加煎蛋的搭配問答。 |
| [`honey-cajun-chicken-wings`](./reports/honey-cajun-chicken-wings.json) | Warning | 雞翅整支烘烤並刷蜜汁，步驟已有 2 分鐘靜置；共用的切片提示和主食材乾燥 FAQ 重複且未說明雞翅上色或刷醬時機，保留氣炸鍋提示。 |
| [`mushroom-beef-rice-bowl`](./reports/mushroom-beef-rice-bowl.json) | Warning | 牛肉切丁後與菇類燉煮並連醬汁淋飯，沒有起鍋再切的步驟；保留菇類出水後收乾的專屬提示。 |
| [`onion-beef-rice-bowl`](./reports/onion-beef-rice-bowl.json) | Warning | 牛肉切丁後與洋蔥、醬汁燉煮並直接蓋飯，靜置後切片的建議不適用；保留洋蔥炒甜提示和牛排肉替換問答。 |
| [`onion-beef-slices`](./reports/onion-beef-slices.json) | Warning | 牛肉在下鍋前已切薄片，需短炒後立即以醬汁收合；靜置再切與本篇快速炒片流程相反，保留避免久炒變硬提示。 |
| [`onion-salmon-pan-steak`](./reports/onion-salmon-pan-steak.json) | Warning | 鮭魚排煎熟後回鍋淋汁，熟度以魚肉不透明、可用叉子撥開判斷；肉類切片 FAQ 不適用，保留先煎皮面及醬油／檸檬選擇問答。 |
| [`pan-seared-flap-steak-brunch`](./reports/pan-seared-flap-steak-brunch.json) | Warning | 牛排步驟已指定起鍋靜置 4 分鐘再逆紋切片，共用 2～3 分鐘提示重複且可能造成時間衝突；保留厚鍋預熱提示。 |
| [`pesto-chicken-broccoli-pasta`](./reports/pesto-chicken-broccoli-pasta.json) | Warning | 雞肉切條煎好後盛出，最後與麵條短暫拌合，不會起鍋後再切片；保留青花菜先燙與雞肉避免久炒的提示，以及汆燙問答。 |
| [`pesto-chicken-mushroom-pasta`](./reports/pesto-chicken-mushroom-pasta.json) | Warning | 雞肉條與菇片直接拌入青醬麵，沒有起鍋靜置切片步驟；保留先煎菇收乾提示和起司粉替代問答。 |
| [`pesto-chicken-pasta`](./reports/pesto-chicken-pasta.json) | Warning | 雞肉條煎熟後直接回鍋與青蔥蒜醬快拌，肉類靜置切片建議不適用；保留低火快拌提示和現成青醬替換問答。 |
| [`pesto-salmon-broccoli-pasta`](./reports/pesto-salmon-broccoli-pasta.json) | Warning | 鮭魚塊最後才輕柔拌回義大利麵，應避免碎裂而非靜置切片；保留魚塊回鍋順序、檸檬後加提示及冷凍鮭魚處理問答。 |
| [`pesto-salmon-pasta`](./reports/pesto-salmon-pasta.json) | Warning | 鮭魚最後輕柔拌入麵條以避免碎裂，靜置後切片與此流程無關；保留輕柔拌麵提示及平衡青醬魚味問答。 |
| [`pesto-shrimp-pasta`](./reports/pesto-shrimp-pasta.json) | Warning | 主食材是蝦仁，炒熟後直接與麵和青醬合拌，肉類靜置切片提示明顯不適用；保留冷凍蝦仁解凍吸乾提示和去腸問答。 |
| [`roasted-lemon-salmon-brunch`](./reports/roasted-lemon-salmon-brunch.json) | Warning | 鮭魚以叉子撥開判熟並靜置 2 分鐘後擺盤，通用靜置提示重複且未提供魚排厚度的判斷；保留氣炸鍋替代方式。 |
| [`salmon-broccoli-garlic-main`](./reports/salmon-broccoli-garlic-main.json) | Warning | 鮭魚排回鍋淋汁，熟度依不透明、可用叉子撥開確認；靜置切片建議與魚排做法不符，保留先吸乾煎脆皮的提示及氣炸、腥味問答。 |
| [`salmon-garlic-pasta`](./reports/salmon-garlic-pasta.json) | Warning | 鮭魚煎好後以大塊回鍋輕拌，避免碎裂比靜置切片更切合做法；保留鮭魚最後回鍋及檸檬汁替代問答。 |
| [`scallion-beef-fried-rice`](./reports/scallion-beef-fried-rice.json) | Warning | 牛肉先切片或切丁、快炒後再與白飯合炒，沒有起鍋後再切片的步驟；保留大火快炒提示和新煮白飯攤涼問答。 |
| [`scallion-beef-stirfry`](./reports/scallion-beef-stirfry.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`scallion-chicken-rice-bowl`](./reports/scallion-chicken-rice-bowl.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`sesame-onion-chicken-rice-bowl`](./reports/sesame-onion-chicken-rice-bowl.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`sf-bloody-mary-spicy-rice`](./reports/sf-bloody-mary-spicy-rice.json) | Warning | 將步驟對齊清單：薑使用5公克、白飯先煮熟、鮮奶油30毫升與辣醬1大匙按表加入，並補明熱水總量尚未驗證。 |
| [`sf-brownie-ice-cream`](./reports/sf-brownie-ice-cream.json) | Warning | 已保留回烤與短暫靜置後現組現吃，並將保存說明限定為布朗尼、冰淇淋分開且依各自包裝處理，避免把不相干的熟食回熱說明套用到甜點。 |
| [`sf-campfire-lemon-zucchini-fish-fillet`](./reports/sf-campfire-lemon-zucchini-fish-fillet.json) | Warning | 四語步驟保留擦乾、同鍋順序與魚片最厚處中心63°C的熟度確認，保存文字聚焦魚肉與櫛瓜分開及魚肉回熱。 |
| [`sf-cheesy-chicken-egg-rice`](./reports/sf-cheesy-chicken-egg-rice.json) | Warning | 將描述、前言、提示與 FAQ 聚焦於雞胸、花椰菜、熟飯、雞蛋和切達起司，移除無關魚肉安全資訊，保留雞肉中心74°C指引。 |
| [`sf-cheesy-local-sausage-cream-pasta`](./reports/sf-cheesy-local-sausage-cream-pasta.json) | Warning | 四語步驟補上生香腸依肉種量測熟度的條件，並移除與不加油煸香腸做法相矛盾的橄欖油項目；香腸規格、出油量、時間與口感待廚房試作確認。 |
| [`sf-chicken-quesadilla`](./reports/sf-chicken-quesadilla.json) | Warning | 將四語描述與前言改為雞胸、玉米薄餅、起司、莎莎醬及搭配醬料的實際順序；以餅色、起司融化和中小火提供翻面判斷，移除重複前言提示。 |
| [`sf-classic-beef-mushroom-eggs-benedict`](./reports/sf-classic-beef-mushroom-eggs-benedict.json) | Warning | 為回應本篇班尼蛋未列荷蘭醬的結構缺口，新增四語自製荷蘭醬配方：依 Tyler Florence 的 Food Network 四人份配方縮為兩人份，使用蛋黃 2 顆、檸檬汁 1.5 小匙、無鹽奶油 57 公克及少許調味；補上隔水快速攪打、緩慢乳化奶油、濃稠紋路判斷與保溫方式，並將原列橄欖油改配… |
| [`sf-classic-caesar-salad`](./reports/sf-classic-caesar-salad.json) | Warning | 四語描述與介紹已聚焦培根、麵包丁、帕瑪森和凱薩醬的組裝順序；步驟明列橄欖油、海鹽與黑胡椒份量，提示與問答已改為培根和麵包丁的預備方式。 |
| [`sf-classic-ham-mushroom-eggs-benedict`](./reports/sf-classic-ham-mushroom-eggs-benedict.json) | Warning | 新增四語專屬問答，說明荷蘭醬低溫回溫、水波蛋最後製作與蛋熟度；並將步驟的火腿、荷蘭醬用量對齊材料表既有 80 公克與 2 大匙，補上火腿熱透的判斷。 |
| [`sf-classic-pesto-shrimp-pasta`](./reports/sf-classic-pesto-shrimp-pasta.json) | Warning | 四語步驟以 63°C 和不透明、彎曲的線索確認蝦仁熟度，並維持青醬乳化及離火拌起司順序；蝦仁尺寸、時間、醬汁與口感待試作。 |
| [`sf-crispy-calamari-cocktail-sauce`](./reports/sf-crispy-calamari-cocktail-sauce.json) | Warning | 四語步驟新增魷魚 63°C 終點、未達時短暫續炸及批次間恢復油溫的操作，提示同步說明；切塊尺寸、炸製時間與口感仍待廚房試作確認。 |
| [`sf-dawn-shrimp-chicken-linguine`](./reports/sf-dawn-shrimp-chicken-linguine.json) | Warning | 已將四語內文改為雞肉與蝦仁分開烹調、番茄奶油醬及煮麵水調整方式；繁中步驟補上其他語言原有的蝦仁 63°C 熟度，並刪除無關的剩菜口感說明。 |
| [`sf-greek-campfire-grilled-chicken-brunch`](./reports/sf-greek-campfire-grilled-chicken-brunch.json) | Warning | 保留雞胸最厚處中心74°C、靜置3分鐘及皮塔依包裝加熱的操作，保存指示聚焦雞肉與冷食配料分開。 |
| [`sf-griddled-butter-ham-sandwich`](./reports/sf-griddled-butter-ham-sandwich.json) | Warning | 將奶油列入原步驟已使用的材料，統一火腿 100 公克並將荷包蛋更正為烹調前雞蛋；以原列橄欖油、鹽、胡椒處理薯塊，修正楓糖漿配料順序。 |
| [`sf-homestyle-meat-sauce-penne-with-meatballs`](./reports/sf-homestyle-meat-sauce-penne-with-meatballs.json) | Warning | 四語步驟補明生牛肉丸中心 71°C 的熟度條件，並將剩餘起司納入上桌步驟；肉丸原料狀態及實際時間、份量、口感仍待廚房試作確認。 |
| [`sf-keto-surf-and-turf-platter`](./reports/sf-keto-surf-and-turf-platter.json) | Warning | 四語保留魚肉中心63°C確認、預製舒肥牛依包裝處理及生菜脫水、熱食分區組盤；保存說明已按熟食與生菜分開。 |
| [`sf-kids-cream-chicken-penne`](./reports/sf-kids-cream-chicken-penne.json) | Warning | 將雞肉 74°C 熟度檢查放進四語主要步驟，並保留白醬避免分離的低火操作；實際時間、份量與口感仍待試作。 |
| [`sf-local-sausage-quesadilla`](./reports/sf-local-sausage-quesadilla.json) | Warning | 將香腸步驟用量統一為材料表100公克，補明兩張薄餅、莎莎醬與上桌醬料的列明用量，並將原步驟已使用的少量食用油列入材料。 |
| [`sf-mushroom-cheese-omelette`](./reports/sf-mushroom-cheese-omelette.json) | Warning | 新增四語專屬 FAQ，說明蘑菇出水後轉小火至鍋中液體蒸發，再與起司置中包入半凝固蛋皮；若仍有液體則先收乾。 |
| [`sf-oat-crusted-fish-and-fries`](./reports/sf-oat-crusted-fish-and-fries.json) | Warning | 已將四語標題統一為燕麥裹魚片搭配烤薯條，對齊食譜實際烘烤方法；介紹與步驟已核對烤箱溫度、魚片中心溫度及食材用量。 |
| [`sf-orange-danish-mushroom-poached-potato`](./reports/sf-orange-danish-mushroom-poached-potato.json) | Warning | 四語保留馬鈴薯先加蓋煮軟再開蓋煎色、蘑菇收乾與水波蛋輕滾下鍋等可執行細節，並移除不相關的通用保存句。 |
| [`sf-orange-danish-poached-seafood-potato`](./reports/sf-orange-danish-poached-seafood-potato.json) | Warning | 四語依海鮮種類補上可操作的熟度判斷：魚類以溫度計確認最厚處中心達63°C；蝦、干貝、蟹與龍蝦看肉質結實且珍珠白不透明；蛤蜊、淡菜與牡蠣煮至開殼並丟棄未開者。 |
| [`sf-orange-danish-sous-vide-steak`](./reports/sf-orange-danish-sous-vide-steak.json) | Warning | 新增熟食舒肥牛排上色步驟：依包裝處理，若允許平底鍋 finishing，先擦乾並用熱鍋快速煎至兩面上色，避免長煎令中心過熟；引用 Anova Culinary 上色指南。 |
| [`sf-orange-danish-sunny-sous-vide-chicken`](./reports/sf-orange-danish-sunny-sous-vide-chicken.json) | Warning | 保留「全熟即食舒肥雞」前提，保存及回溫依包裝；雞蛋以凝固為一般作法、流心則限巴氏殺菌蛋。 |
| [`sf-poached-egg-smoked-beef-danish-open`](./reports/sf-poached-egg-smoked-beef-danish-open.json) | Warning | 新增四語專屬問答，說明先烤並刷油、燻牛肉墊底、水波蛋最後瀝乾再放的操作順序；一般蛋與流心蛋的注意事項依 USDA 指引。 |
| [`sf-poutine-meat-sauce-fries`](./reports/sf-poutine-meat-sauce-fries.json) | Warning | 四語步驟已將冷凍薯條改為不解凍、不擦乾，依包裝指示烹調，再使用食材表列出的肉汁醬與起司凝乳；移除自訂雙炸溫度與油量。 |
| [`sf-salted-egg-bitter-melon-pasta`](./reports/sf-salted-egg-bitter-melon-pasta.json) | Warning | 已將四語內容改為鹹蛋、山苦瓜與杏鮑菇專屬的烹調提示，並刪除不適用的剩菜口感說明；英文鹹蛋數量補上顆數單位。 |
| [`sf-salted-egg-seafood-pizza`](./reports/sf-salted-egg-seafood-pizza.json) | Warning | 新增四語專屬問答，將先煎約七分熟明確界定為中途步驟，並依 USDA FSIS 指引要求烘烤後量測海鮮最厚處達 63°C（145°F）；未達時繼續烘烤。 |
| [`sf-salted-egg-yolk-fries`](./reports/sf-salted-egg-yolk-fries.json) | Warning | 四語文案已聚焦兩種鹹蛋醬小火拌勻、辣椒碎與九層塔的用法；冷凍薯條改為不解凍、不擦乾，依包裝指示烹調，並移除自訂雙炸溫度與油量。 |
| [`sf-san-francisco-garlic-fries`](./reports/sf-san-francisco-garlic-fries.json) | Warning | 四語文案已聚焦關火後分兩次拌入蒜味奶油醬；冷凍薯條改為不解凍、不擦乾，依包裝指示烹調，並移除自訂雙炸溫度與油量。 |
| [`sf-second-floor-fiesta-shrimp-penne`](./reports/sf-second-floor-fiesta-shrimp-penne.json) | Warning | 以 63°C 及不透明、彎曲的線索補強四語蝦仁熟度步驟與 FAQ，短煎蝦後才拌入奶油醬；蝦尺寸、時間、份量與口感待試作確認。 |
| [`sf-second-floor-saltwater-chicken-salad`](./reports/sf-second-floor-saltwater-chicken-salad.json) | Warning | 四語已對齊材料與做法：雞肉鹽水低溫煮至中心 74°C、汆燙苦瓜、煎香玉米、量取米醋油醬；也釐清用油分配、組裝與分開保存。 |
| [`sf-sichuan-chicken-mushroom-eggs-benedict`](./reports/sf-sichuan-chicken-mushroom-eggs-benedict.json) | Warning | 為回應本篇班尼蛋未列荷蘭醬的結構缺口，新增四語自製荷蘭醬配方：依 Tyler Florence 的 Food Network 四人份配方縮為兩人份，使用蛋黃 2 顆、檸檬汁 1.5 小匙、無鹽奶油 57 公克及少許調味；補上隔水快速攪打、緩慢乳化奶油、濃稠紋路判斷與保溫方式，並將原列橄欖油改配… |
| [`sf-smoked-salmon-caesar-salad`](./reports/sf-smoked-salmon-caesar-salad.json) | Warning | 四語描述與介紹已聚焦燻鮭魚、全熟水煮蛋及凱薩醬蘿蔓；組裝步驟補上食材表已有的切半雞蛋，移除未使用的海鹽，提示與問答改為水煮蛋處理。 |
| [`sf-smoked-salmon-mushroom-eggs-benedict`](./reports/sf-smoked-salmon-mushroom-eggs-benedict.json) | Warning | 為回應本篇班尼蛋未列荷蘭醬的結構缺口，新增四語自製荷蘭醬配方：依 Tyler Florence 的 Food Network 四人份配方縮為兩人份，使用蛋黃 2 顆、檸檬汁 1.5 小匙、無鹽奶油 57 公克及少許調味；補上隔水快速攪打、緩慢乳化奶油、濃稠紋路判斷與保溫方式，並將原列橄欖油改配… |
| [`sf-sous-vide-chicken-caesar-salad`](./reports/sf-sous-vide-chicken-caesar-salad.json) | Warning | 四語描述與介紹已聚焦標示全熟即食的舒肥雞、生菜、凱薩醬及最後加入的麵包丁；提示與問答已改為核對熟食標示及遵循包裝加熱指示。 |
| [`sf-south-sea-spiced-chicken-rice`](./reports/sf-south-sea-spiced-chicken-rice.json) | Warning | 將重複前言與通用提示改為香料先混合、分兩次使用及雞肉中心74°C的做法；保留原列兩人份，不新增地域來源主張。 |
| [`sf-spicy-pepper-karaage-pasta`](./reports/sf-spicy-pepper-karaage-pasta.json) | Warning | 四語文案已聚焦番茄辣椒醬汁與熟唐揚雞；補列步驟使用的蒜頭，明列朝天椒、茄汁與黑胡椒用量，並改為依包裝加熱熟雞肉，移除生雞肉烹調歧義。 |
| [`sf-spicy-spanish-surf-and-turf-rice`](./reports/sf-spicy-spanish-surf-and-turf-rice.json) | Warning | 四語步驟補上蝦仁 63°C、蛤蜊開殼後棄除未開者的判斷，並保留海鮮先取出、最後短暫回鍋的順序；高湯吸收量、鹹度、時間與產量待試作確認。 |
| [`sf-spicy-tomato-bacon-penne`](./reports/sf-spicy-tomato-bacon-penne.json) | Warning | 四語步驟中的蒜頭 2 瓣已補入食材表；移除與培根不加油煸炒順序相矛盾的橄欖油項目。 |
| [`sf-strong-chocolate-cake`](./reports/sf-strong-chocolate-cake.json) | Warning | 四語已補齊奶油起司抹面後冷藏30分鐘、熱刀擦乾後切片等操作，修正器具並移除不適用的熟菜回熱及其他配菜保存文字；日本語糖名亦已校正。 |
| [`sf-supreme-cheese-omelette`](./reports/sf-supreme-cheese-omelette.json) | Warning | 新增四語專屬問答，說明火腿玉米預先炒好、蛋液半凝固時將餡料置中、對折並加蓋檢查摺合處的操作理由；熟度安全注意事項依 USDA 指引。 |
| [`sf-truffle-fries`](./reports/sf-truffle-fries.json) | Warning | 四語介紹、提示與步驟已聚焦松露醬和起司粉的拌入順序；冷凍薯條改為不解凍、不擦乾，依包裝指示烹調，並移除自訂雙炸溫度與油量。 |
| [`sf-truffle-mushroom-cream-pasta`](./reports/sf-truffle-mushroom-cream-pasta.json) | Warning | 四語版的鮮奶油與松露醬份量已依食材表校正，以 Bon Appétit 的蕈菇煎色與煮麵水技法作為明確標示的參考，並移除不適用的海鮮／肉類套句、補完整盤步驟。 |
| [`sf-white-wine-garlic-clam-squid-ink-pasta`](./reports/sf-white-wine-garlic-clam-squid-ink-pasta.json) | Warning | 四語文案已聚焦蛤蜊吐沙、白酒加蓋蒸煮、煮麵水與墨魚麵的拌合；刪除不適用的肉類／魚肉熟度問答，保留未開口蛤蜊的處理說明。 |
| [`sf-worcester-meat-sauce-omelette`](./reports/sf-worcester-meat-sauce-omelette.json) | Warning | 新增四語專屬 FAQ，說明已熟肉醬先收汁保溫，蛋液半凝固時將肉醬與起司置中對折；若醬汁仍有游離液體先續收，再按原步驟加蓋並檢查摺合處。 |
| [`smoked-salmon-brunch`](./reports/smoked-salmon-brunch.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`smoked-salmon-caesar-salad`](./reports/smoked-salmon-caesar-salad.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`solo-ginger-pork-rice`](./reports/solo-ginger-pork-rice.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`solo-oyster-sauce-beef-rice`](./reports/solo-oyster-sauce-beef-rice.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`solo-pan-fried-pork-cutlet-rice`](./reports/solo-pan-fried-pork-cutlet-rice.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`solo-sesame-chicken-rice`](./reports/solo-sesame-chicken-rice.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`solo-three-cup-chicken-rice`](./reports/solo-three-cup-chicken-rice.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`soy-garlic-beef-slices`](./reports/soy-garlic-beef-slices.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`soy-garlic-chicken-breast-pan`](./reports/soy-garlic-chicken-breast-pan.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`steamed-chicken-bento`](./reports/steamed-chicken-bento.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`tomato-beef-rice-bowl`](./reports/tomato-beef-rice-bowl.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`water-lily-stem-chicken-rice-bowl`](./reports/water-lily-stem-chicken-rice-bowl.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`water-lily-stem-fish-ball-noodles`](./reports/water-lily-stem-fish-ball-noodles.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`water-lily-stem-pork-soup`](./reports/water-lily-stem-pork-soup.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`water-lily-stem-shrimp-stirfry`](./reports/water-lily-stem-shrimp-stirfry.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`weight-loss-shrimp-veg-salad`](./reports/weight-loss-shrimp-veg-salad.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`weight-loss-zucchini-chicken`](./reports/weight-loss-zucchini-chicken.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |
| [`white-sauce-chicken-pasta`](./reports/white-sauce-chicken-pasta.json) | Warning | 已移除四語重複且不適用各菜色的「肉類起鍋後靜置」提示，並將通用防乾 FAQ 改為依本篇配方步驟可直接操作的專屬問答；未改動材料份量，內容未經廚房試作，仍需料理者實作確認。 |

## 全站預檢與限制

- 全站繁中 precheck：289 篇；Pass 225、Warning 64、Critical 0。這是材料／步驟等欄位的機械預檢，不是 Google 索引結果。
- 本批 112 篇四語 YAML、逐篇 JSON、steps/tips/faqs 區塊數和更新日期對齊檢查通過；Google sitemap `lastmod` 所依據的 `updatedAt` 已更新至 2026-09-30。
- 食譜內容仍需實際下廚確認火候、口感、時間與份量；Google 是否收錄由 Search Console 後續狀態決定，提交重新檢索不保證索引。

## 參考

- [Google Search Central：Creating helpful, reliable, people-first content](https://developers.google.cn/search/docs/fundamentals/creating-helpful-content?hl=en)：提醒不要為假定的字數門檻填充內容，應以讀者是否得到完整、有用的答案評估。
- [Food Network：Tyler Florence Hollandaise Sauce](https://www.foodnetwork.com/recipes/tyler-florence/hollandaise-sauce-recipe-1910043)：三篇班尼蛋荷蘭醬的比例與乳化技法來源；本站依兩人份縮量，尚未試作。
- [USDA FSIS：Safe Minimum Internal Temperature Chart](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart)、[FDA：Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely)、[FoodSafety.gov：Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures)：支持報告中的肉、禽、魚與海鮮熟度判斷。
