# 涓豆腐 Dubu House — 完整菜單與還原規格

> 更新日期：2026-06-03
> 專區：`/restaurant-replicas/`
> 食譜前綴：`dh-*`（共 **58** 篇）
> 官方菜單：[dubuhouse.com.tw/Menu.html](https://www.dubuhouse.com.tw/Menu.html)

---

## 品牌與用餐規則

| 項目 | 內容 |
| --- | --- |
| 品牌 | 涓豆腐 Dubu House（JBSD，韓國嫩豆腐煲連鎖，2008 進台） |
| 類型 | 韓式嫩豆腐煲、石鍋飯、炸雞、韓式前菜與特色料理 |
| 還原重點 | 湯頭辣度、嫩豆腐口感、石鍋鍋巴、韓式醬料比例 |
| 文案 | 使用「參考涓豆腐常見做法」「還原版」，不宣稱官方授權 |

### 附餐與升級（官網備註）

- 嫩豆腐煲、石鍋飯可搭配白飯、拉麵或烏龍麵（依門市備註為準）
- 組合餐可升級黃金雞石鍋飯、鴨賞石鍋飯、吻仔魚石鍋飯（加價依官網）
- 飲品、伴手禮、組合餐本批不產生食譜，僅收錄可獨立還原的單品

## 資料檔

| 檔案 | 用途 |
| --- | --- |
| [`src/data/dubu-house-menu.json`](../../src/data/dubu-house-menu.json) | 結構化菜單（無價格、含成分） |
| [`scripts/scrape-dubu-house-menu.mjs`](../../scripts/scrape-dubu-house-menu.mjs) | 從官網 Menu.html 同步菜單 |
| [`scripts/generate-dubu-house-recipes.mjs`](../../scripts/generate-dubu-house-recipes.mjs) | 食譜產生器 |

## TOP 招牌

| 品項 | 食譜 slug |
| --- | --- |
| 嫩豆腐煲 | `dh-classic-soondubu` |
| 打爆起司年糕嫩豆腐煲 | `dh-cheese-stuffed-rice-cake-soondubu` |
| 肯瓊醬韓式炸雞 | `dh-cajun-korean-fried-chicken` |
| 韓式金絲豆腐捲 | `dh-korean-vermicelli-tofu-roll` |
| 韓式爆漿黑糖餅 | `dh-brown-sugar-pancake` |
| 韓式石鍋飯 | `dh-classic-stone-pot-rice` |

---

## 1. 韓式嫩豆腐煲系列

| 品項 | 成分 | slug |
| --- | --- | --- |
| 打爆起司年糕嫩豆腐煲 | (牛/豬)；打爆起司! 亦為Double cheese，一道充滿濃濃起司的嫩豆腐煲，攜手桂冠加入Q彈的切達起司年糕，搭配細嫩滑口的嫩豆腐、特選肉品與鮮蔬配料，放入香濃的起司湯頭一起烹煮，年糕的柔韌、豆腐的嫩滑、雙重起司的香濃，交織出一場舌尖上的饗宴，讓人陶醉。 | `dh-cheese-stuffed-rice-cake-soondubu` |
| 海菜起司年糕鮮魚嫩豆腐煲 | (鮮切鯛魚/酥炸旗魚)；選用新鮮的鯛魚，攜手桂冠加入Q彈的切達起司年糕、細嫩滑口嫩豆腐、海菜及蔬菜等配料，放入香濃的起司湯頭一起烹煮，匯聚多種鮮美食材使其香濃美味，每一口都滿載豐富的營養與濃郁的香氣，層次豐富讓人一試成主顧。 | `dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed` |
| 植感炸雞鮮菇嫩豆腐煲 | 吃得到的〝美味〞植物肉選用全新一代植物雞，搭配多種鮮蔬、菇類和嫩豆腐，讓湯頭更顯甘醇清甜，完美的雞肉咀嚼感，及豐富的蛋白質和纖維素，讓享受美食更無負擔。 | `dh-plant-based-fried-chicken-with-mushroom-soondubu` |
| 嫩豆腐煲 | (牛/羊/豬) | `dh-classic-soondubu` |
| 野菜鮮菇嫩豆腐煲 | 野菜鮮菇嫩豆腐煲 | `dh-vegetable-soondubu` |
| 泡菜嫩豆腐煲 | (牛/羊/豬/餃子) | `dh-kimchi-soondubu` |
| 泡菜鮮菇嫩豆腐煲 | 泡菜鮮菇嫩豆腐煲 | `dh-kimchi-mushroom-soondubu` |
| 起司泡菜鮮菇嫩豆腐煲 | 起司泡菜鮮菇嫩豆腐煲 | `dh-cheese-kimchi-mushroom-soondubu` |
| 咖哩嫩豆腐煲 | (牛/羊/豬) | `dh-curry-soondubu` |
| 起司嫩豆腐煲 | (牛/豬) | `dh-cheese-soondubu` |
| 起司野菜鮮菇嫩豆腐煲 | 起司野菜鮮菇嫩豆腐煲 | `dh-cheese-vegetable-soondubu` |
| 海陸綜合嫩豆腐煲 | (牛/羊/豬)；嚴選粒粒飽滿非基因改造黃豆，以雙次過濾方式萃取出黃豆的濃香，製作成口感綿密而滑順的嫩豆腐，古法堅持慢而繁雜，一匙入口讚不絕口。 | `dh-combo-soondubu` |
| 韓式餃子嫩豆腐煲 | (牛/羊/豬) | `dh-korean-dumpling-soondubu` |
| 海鮮嫩豆腐煲 | (原味/起司) | `dh-seafood-soondubu` |
| 蛤蜊鮮蝦嫩豆腐煲 | 爆鍋半斤蛤蜊搭配肉實肥美鮮蝦，湯頭鮮海味足。 | `dh-clams-shrimp-soondubu` |
| 泡菜海鮮嫩豆腐煲 | 泡菜海鮮嫩豆腐煲 | `dh-kimchi-seafood-soondubu` |
| 海菜鮮蚵嫩豆腐煲 | 海菜鮮蚵嫩豆腐煲 | `dh-seaweed-oyster-soondubu` |
| 鮮魚嫩豆腐煲 | (鮮切鯛魚/酥炸旗魚) | `dh-fish-soondubu` |

---

## 2. 韓式石鍋飯系列

| 品項 | 成分 | slug |
| --- | --- | --- |
| 石燒拌飯 | (霜降牛/梅花豬)；油花分布如雪花般細緻的霜降牛或是口感軟嫩的梅花豬，搭配五色小菜澆上韓國辣醬拌炒，滋滋響的石鍋聲伴隨鍋巴香，讓人口水直流。 | `dh-bibimbap` |
| 鴨賞石鍋飯 | 鴨賞石鍋飯 | `dh-duck-jerky-stone-pot-rice` |
| 黃金雞石鍋飯 | 黃金雞石鍋飯 | `dh-golden-chicken-stone-pot-rice` |
| 韓式石鍋飯 | 選用韓國特有角閃石鍋，以高溫高壓原鍋烹煮優質東部米，米飯呈現自然光澤，飽滿Ｑ彈，飯香撲鼻。 | `dh-classic-stone-pot-rice` |

---

## 3. 精選前菜

| 品項 | 成分 | slug |
| --- | --- | --- |
| 韓式金絲豆腐捲 | 韓式金絲豆腐捲 | `dh-korean-vermicelli-tofu-roll` |
| 韓式酥炸脆薯 | 韓式酥炸脆薯 | `dh-french-fries-with-korean-flavored-sauce` |
| 黃金酥炸嫩豆腐 | 黃金酥炸嫩豆腐 | `dh-deep-fried-tofu` |
| 韓風辣味魚丸燒 | 韓風辣味魚丸燒 | `dh-korean-style-bbq-fish-ball` |
| 魚卵起司陶鍋蛋 | 魚卵起司陶鍋蛋 | `dh-steamed-eggs-with-cheese-roe` |
| 韓式炒冬粉 | 韓式炒冬粉 | `dh-fried-glass-noodle` |

---

## 4. 甜品

| 品項 | 成分 | slug |
| --- | --- | --- |
| 韓式爆漿黑糖餅 | 正宗韓國甜品黑糖餅，外皮煎得酥脆Q彈，內餡加入滿滿黑糖及肉桂，一口咬下那餅皮酥脆口感及堅果帶來的香甜氣味，滿口的麵粉香、爆漿的黑糖醬、越嚼越香的堅果粒，完美組合一次呈現。 | `dh-brown-sugar-pancake` |
| 珍珠豆腐冰淇淋 | 採用非基改黃豆製作的豆腐冰淇淋，淋上甜蜜的黑糖珍珠增添風味，每一口都能嚐到炭燒豆香，冰淇淋和黑糖融為一體的綿密口感，叫人難以忘懷。 | `dh-tofu-ice-cream-with-tapioca` |

---

## 5. 特色料理

| 品項 | 成分 | slug |
| --- | --- | --- |
| 韓式宮廷炒年糕 | (牛/豬) | `dh-royal-stir-fried-rice-cake` |
| 黑松露炸醬起司年糕 | 攜手桂冠推出結合傳統與現代奢華風味的創意料理，年糕Q彈不黏牙，內餡包裹切達起司，再搭配高級黑松露及韓式黑炸醬，鹹甜風味的完美結合，賦予每一口獨特而奢華的香氣，最後再淋上濃郁滑順的巧達起司醬，口感層次豐富，令人回味無窮。 | `dh-truffle-jjajang-cheese-rice-cake` |
| 起司馬鈴薯煎餅 | 最道地的韓國傳統美食，將新鮮馬鈴薯搗末成泥加上火腿、德式香腸、玉米、甜椒等配料，再用慢火煎至金黃酥脆，最後撒上滿滿起司，外層酥脆、內層柔軟，散發濃郁起司及馬鈴薯香味，入口時搭配特製洋蔥醬，清爽感十足，極度合拍。 | `dh-potato-pancake-with-cheese` |
| 植感炸雞年糕 | (醬味/辣味)；經典韓式炸雞也可以〝痛快〞吃全新一代植物雞，肉質富有彈性與嚼勁媲美真肉，放入Q彈年糕，再裹上獨家韓式炸雞醬，新嫩彈度，酥脆、無骨、多汁的口感，讓人一口就停不下來！ | `dh-plant-based-fried-chicken-with-rice-cake` |
| 起司玫瑰醬魷魚年糕 | 由韓國辣醬加上滑順鮮奶油所熬煮的玫瑰醬，散發微辣香氣，鋪上厚厚的莫札瑞拉起司牽起的是外酥內軟的鮮美魷魚，一口咬下的迷人滋味，讓人回味再三！ | `dh-cheese-pink-sauce-fried-squid-with-rice-cake` |
| 絲瓜鮮蔬煎餅 | 絲瓜鮮蔬煎餅 | `dh-vegetable-pancake` |
| 田園醬燒飛虎魚 | 田園醬燒飛虎魚 | `dh-stired-fried-fish-fillet-with-vegetables` |
| 海鮮辣炒年糕 | 海鮮辣炒年糕 | `dh-spicy-pan-fried-seafood-rice-cake` |
| 辣炒中卷 | 辣炒中卷 | `dh-spicy-pan-fried-squid` |
| 春川辣炒雞 | 韓國五大必吃美食料理之一，選用鮮嫩去骨雞腿肉以韓國道地的春川辣醬快火拌炒，辣味溫潤而不嗆辣。 | `dh-spicy-stired-fried-chicken` |
| 人蔘砂鍋雞 | (1-2人份) | `dh-ginseng-chicken-clay-pot` |
| 韓國人蔘雞火鍋 | (3-5人)；特選春雞內包糯米，並使用上等人蔘搭配香菇、紅棗、大白菜及年糕片等豐富配料一起燉煮，湯頭濃郁，骨軟肉綿，是韓國養生極品鍋物。 | `dh-ginseng-chicken-hot-pot` |

---

## 6. 主廚推薦

| 品項 | 成分 | slug |
| --- | --- | --- |
| 韓式BBQ鐵板翼板牛 | 完美油花、肉質鮮美的翼板牛，以主廚精心特調韓式BBQ醬料醃製，搭配完美掌握的燒烤時間，肉質依然鮮嫩，創造多汁美味的口感。 | `dh-korean-bbq-beef-short-ribs` |
| 肯瓊醬韓式炸雞 | 黃芥末與韓國辣椒醬的完美調配，融合香甜蜂蜜緊密包覆成細緻柔滑的醬汁，肯瓊醬澆淋在金黃脆皮炸雞上，每一口有著韓國辣醬的尾韻與淡淡的奶香，更可以嚐到炸雞的鮮嫩原味。 | `dh-cajun-korean-fried-chicken` |
| 洋蔥白醬韓式炸雞 | 咕溜滑口的濃郁白醬，配上金黃酥脆的韓式炸雞，酸甜奶香的滑順口感，洋蔥白醬的濃郁香氣，讓人愛不釋口，越吃越開胃。 | `dh-creamy-onion-korean-fried-chicken` |
| 蜂蜜蒜味韓式炸雞 | 蜂蜜蒜味韓式炸雞 | `dh-honey-garlic-korean-fried-chicken` |
| 原味韓式炸雞 | 原味韓式炸雞 | `dh-original-korean-fried-chicken` |
| 辣味韓式炸雞 | 辣味韓式炸雞 | `dh-spicy-korean-fried-chicken` |
| 醬味韓式炸雞 | 醬味韓式炸雞 | `dh-bbq-korean-fried-chicken` |
| 韓式起司烘蛋捲 | (魚卵/蟹味/雙味起司/松露)；新鮮蛋液以文火層層慢烘，舖上滿滿起司或魚卵 / 蟹味棒/黑松露，渾厚蛋香融合迷人起司牽絲，讓人吃了還想再吃。 | `dh-korean-cheese-egg-roll` |
| 韓國糖醋肉 | 嚴選豬後腿肉，以醬汁醃製後裹上麵衣酥炸，淋上韓式經典糖醋醬，外酥內嫩口感，搭配酸甜醬汁，好吃又開胃。 | `dh-korean-sweet-and-sour-pork` |
| 巨濟島炸牡蠣 | 巨濟島炸牡蠣 | `dh-fried-oysters` |
| 泡菜豆腐煎餅 | (可做蔬食) | `dh-kimchi-tofu-pancake` |
| 綜合海鮮煎餅 | (招牌薄香) | `dh-seafood-pancake` |
| 醬燒青蔥牛五花/豬梅花 | (附生菜、年糕片、蒜片、韓式辣醬，如需加點，單點價50元)；新鮮生菜包入醬燒牛五花/豬梅花，搭配韓式辣醬、年糕片及蒜片，豐富口感，一口咬下，大大滿足。 | `dh-bbq-wrap` |
| 神仙霜降雪濃湯 | (附贈石鍋飯)；選用油花均勻質地柔嫩霜降牛，倒入熱騰騰牛骨高湯，湯頭濃郁，牛肉甜美。 | `dh-ox-bone-soup` |
| Combo雙享韓式炸雞 | (原味+醬味/辣味/蜂蜜蒜味/洋蔥白醬/肯瓊醬) | `dh-korean-fried-chicken-combo` |

---

## 7. 黑鑽松露年糕季

| 品項 | 成分 | slug |
| --- | --- | --- |
| 松露韓式起司烘蛋捲 | 新鮮蛋液以文火層層慢烘，軟嫩的蛋捲包覆著香氣十足的高級黑松露及香濃起司，松露獨特的香氣與起司的濃郁奶香完美融合，蛋捲的柔軟口感更增添了層次感，創造出全新高度，讓人回味無窮。 | `dh-truffle-cheese-egg-roll` |

---

## 產生指令

```bash
node scripts/scrape-dubu-house-menu.mjs
node scripts/generate-dubu-house-recipes.mjs
```

