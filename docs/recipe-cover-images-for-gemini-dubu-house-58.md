# 食譜成品圖繪製清單（涓豆腐名店還原 58 篇，給 Gemini）

本站新增 **58 篇**涓豆腐 Dubu House 名店還原食譜（`dh-*` slug），目前 `coverImage` 皆為 `.svg` 佔位。請依下表各產出一張成品圖；圖檔放入 `public/images/recipes/` 後，將 frontmatter 的 `coverImage` 改為 `.webp` 即可上線。

## 輸出規格建議

| 項目 | 建議 |
| --- | --- |
| 比例 | 4:3（例如 1200×900 或 800×600） |
| 格式 | WebP（或 PNG 再轉 WebP） |
| 風格 | 彩鉛 + 水彩插畫（colored pencil and watercolor illustration），溫暖居家、非寫實攝影 |
| 構圖 | 韓式餐廳份量成品為主角；**每道菜使用不同場景／角度／光線**（見下方各篇 prompt，避免重複道具組合） |
| 還原取向 | 韓式嫩豆腐煲、石鍋飯、炸雞與韓式前菜風格，湯頭紅亮、石鍋滋滋、炸雞酥脆，維持插畫感而非商業攝影 |
| 文字 | 圖上不要加字、不要浮水印 |
| 存放路徑 | `public/images/recipes/` |
| 檔名 | 與下表「檔名」欄一致（slug + `.webp`） |

上線後每篇食譜 frontmatter：`coverImage: "/images/recipes/{slug}.webp"`

多語系食譜（`recipes-en` / `recipes-ja` / `recipes-ko`）封面路徑與繁中版相同。

---

## 圖片進度狀態

- ⬜ **進行中（已完成 30 篇，剩餘 28 篇）**
  - ✅ DH-01 ~ DH-30 (已產生 WebP 並更新四語系 Frontmatter)
  - ⬜ DH-31 ~ DH-58 (待完成)

### 詳細進度清單

- [x] **DH-01** 打爆起司年糕嫩豆腐煲 (`dh-cheese-stuffed-rice-cake-soondubu`)
- [x] **DH-02** 海菜起司年糕鮮魚嫩豆腐煲 (`dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed`)
- [x] **DH-03** 植感炸雞鮮菇嫩豆腐煲 (`dh-plant-based-fried-chicken-with-mushroom-soondubu`)
- [x] **DH-04** 嫩豆腐煲 (`dh-classic-soondubu`)
- [x] **DH-05** 野菜鮮菇嫩豆腐煲 (`dh-vegetable-soondubu`)
- [x] **DH-06** 泡菜嫩豆腐煲 (`dh-kimchi-soondubu`)
- [x] **DH-07** 泡菜鮮菇嫩豆腐煲 (`dh-kimchi-mushroom-soondubu`)
- [x] **DH-08** 起司泡菜鮮菇嫩豆腐煲 (`dh-cheese-kimchi-mushroom-soondubu`)
- [x] **DH-09** 咖哩嫩豆腐煲 (`dh-curry-soondubu`)
- [x] **DH-10** 起司嫩豆腐煲 (`dh-cheese-soondubu`)
- [x] **DH-11** 起司野菜鮮菇嫩豆腐煲 (`dh-cheese-vegetable-soondubu`)
- [x] **DH-12** 海陸綜合嫩豆腐煲 (`dh-combo-soondubu`)
- [x] **DH-13** 韓式餃子嫩豆腐煲 (`dh-korean-dumpling-soondubu`)
- [x] **DH-14** 海鮮嫩豆腐煲 (`dh-seafood-soondubu`)
- [x] **DH-15** 蛤蜊鮮蝦嫩豆腐煲 (`dh-clams-shrimp-soondubu`)
- [x] **DH-16** 泡菜海鮮嫩豆腐煲 (`dh-kimchi-seafood-soondubu`)
- [x] **DH-17** 海菜鮮蚵嫩豆腐煲 (`dh-seaweed-oyster-soondubu`)
- [x] **DH-18** 鮮魚嫩豆腐煲 (`dh-fish-soondubu`)
- [x] **DH-19** 石燒拌飯 (`dh-bibimbap`)
- [x] **DH-20** 鴨賞石鍋飯 (`dh-duck-jerky-stone-pot-rice`)
- [x] **DH-21** 黃金雞石鍋飯 (`dh-golden-chicken-stone-pot-rice`)
- [x] **DH-22** 韓式石鍋飯 (`dh-classic-stone-pot-rice`)
- [x] **DH-23** 韓式金絲豆腐捲 (`dh-korean-vermicelli-tofu-roll`)
- [x] **DH-24** 韓式酥炸脆薯 (`dh-french-fries-with-korean-flavored-sauce`)
- [x] **DH-25** 黃金酥炸嫩豆腐 (`dh-deep-fried-tofu`)
- [x] **DH-26** 韓風辣味魚丸燒 (`dh-korean-style-bbq-fish-ball`)
- [x] **DH-27** 魚卵起司陶鍋蛋 (`dh-steamed-eggs-with-cheese-roe`)
- [x] **DH-28** 韓式炒冬粉 (`dh-fried-glass-noodle`)
- [x] **DH-29** 韓式爆漿黑糖餅 (`dh-brown-sugar-pancake`)
- [x] **DH-30** 珍珠豆腐冰淇淋 (`dh-tofu-ice-cream-with-tapioca`)
- [ ] **DH-31** 韓式宮廷炒年糕 (`dh-royal-stir-fried-rice-cake`)
- [ ] **DH-32** 黑松露炸醬起司年糕 (`dh-truffle-jjajang-cheese-rice-cake`)
- [ ] **DH-33** 起司馬鈴薯煎餅 (`dh-potato-pancake-with-cheese`)
- [ ] **DH-34** 植感炸雞年糕 (`dh-plant-based-fried-chicken-with-rice-cake`)
- [ ] **DH-35** 起司玫瑰醬魷魚年糕 (`dh-cheese-pink-sauce-fried-squid-with-rice-cake`)
- [ ] **DH-36** 絲瓜鮮蔬煎餅 (`dh-vegetable-pancake`)
- [ ] **DH-37** 田園醬燒飛虎魚 (`dh-stired-fried-fish-fillet-with-vegetables`)
- [ ] **DH-38** 海鮮辣炒年糕 (`dh-spicy-pan-fried-seafood-rice-cake`)
- [ ] **DH-39** 辣炒中卷 (`dh-spicy-pan-fried-squid`)
- [ ] **DH-40** 春川辣炒雞 (`dh-spicy-stired-fried-chicken`)
- [ ] **DH-41** 人蔘砂鍋雞 (`dh-ginseng-chicken-clay-pot`)
- [ ] **DH-42** 韓國人蔘雞火鍋 (`dh-ginseng-chicken-hot-pot`)
- [ ] **DH-43** 韓式BBQ鐵板翼板牛 (`dh-korean-bbq-beef-short-ribs`)
- [ ] **DH-44** 肯瓊醬韓式炸雞 (`dh-cajun-korean-fried-chicken`)
- [ ] **DH-45** 洋蔥白醬韓式炸雞 (`dh-creamy-onion-korean-fried-chicken`)
- [ ] **DH-46** 蜂蜜蒜味韓式炸雞 (`dh-honey-garlic-korean-fried-chicken`)
- [ ] **DH-47** 原味韓式炸雞 (`dh-original-korean-fried-chicken`)
- [ ] **DH-48** 辣味韓式炸雞 (`dh-spicy-korean-fried-chicken`)
- [ ] **DH-49** 醬味韓式炸雞 (`dh-bbq-korean-fried-chicken`)
- [ ] **DH-50** 韓式起司烘蛋捲 (`dh-korean-cheese-egg-roll`)
- [ ] **DH-51** 韓國糖醋肉 (`dh-korean-sweet-and-sour-pork`)
- [ ] **DH-52** 巨濟島炸牡蠣 (`dh-fried-oysters`)
- [ ] **DH-53** 泡菜豆腐煎餅 (`dh-kimchi-tofu-pancake`)
- [ ] **DH-54** 綜合海鮮煎餅 (`dh-seafood-pancake`)
- [ ] **DH-55** 醬燒青蔥牛五花/豬梅花 (`dh-bbq-wrap`)
- [ ] **DH-56** 神仙霜降雪濃湯 (`dh-ox-bone-soup`)
- [ ] **DH-57** Combo雙享韓式炸雞 (`dh-korean-fried-chicken-combo`)
- [ ] **DH-58** 松露韓式起司烘蛋捲 (`dh-truffle-cheese-egg-roll`)


---

## Prompt 風格尾段（每道食譜都接上）

> **場景與構圖寫在各食譜段落內**；以下只統一畫風與輸出限制，不要每張都複製同一套木桌／窗光／水杯／布巾。

```text
Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 構圖變化對照（給批次產圖時參考）

| # | 食譜 | 場景／角度／光線（摘要） |
| --- | --- | --- |
| 1 | 打爆起司年糕嫩豆腐煲 | 黑陶土鍋、起司年糕、紅亮辣湯、青蔥生蛋黃 |
| 2 | 海菜起司年糕鮮魚嫩豆腐煲 | 石頭鍋、鮮魚片、海菜起司年糕、竹編墊 |
| 3 | 植感炸雞鮮菇嫩豆腐煲 | 黑陶土鍋、植感炸雞、鮮香菇、橡木桌 |
| 4 | 嫩豆腐煲 | 經典黑陶鍋、紅亮辣湯、木托盤、暖黃光 |
| 5 | 野菜鮮菇嫩豆腐煲 | 陶土土鍋、高麗菜鮮菇、清澈高湯、花崗岩面 |
| 6 | 泡菜嫩豆腐煲 | 石頭石鍋、辣泡菜、豬肉片、紅漆木托盤 |
| 7 | 泡菜鮮菇嫩豆腐煲 | 陶土土鍋、泡菜鮮菇、微沸辣湯、深色木桌 |
| 8 | 起司泡菜鮮菇嫩豆腐煲 | 熱陶罐、起司融化牽絲、泡菜鮮菇、黃昏光 |
| 9 | 咖哩嫩豆腐煲 | 陶土土鍋、金黃咖哩湯頭、豬肉片、亞麻布墊 |
| 10 | 起司嫩豆腐煲 | 經典陶罐、起司融化、牛肉片、溫馨餐廳桌 |
| 11 | 起司野菜鮮菇嫩豆腐煲 | 黑陶土鍋、起司融化、野菜鮮菇、柔和晚餐光 |
| 12 | 海陸綜合嫩豆腐煲 | 經典陶罐、鮮蝦蛤蜊牛肉、木質隔熱墊 |
| 13 | 韓式餃子嫩豆腐煲 | 黑陶瓷鍋、飽滿韓式餃子、紅辣湯 |
| 14 | 海鮮嫩豆腐煲 | 傳統土鍋、白蝦蛤蜊透抽、聚光側光 |
| 15 | 蛤蜊鮮蝦嫩豆腐煲 | 陶土砂鍋、大量蛤蜊白蝦、木板墊 |
| 16 | 泡菜海鮮嫩豆腐煲 | 傳統土鍋、泡菜鮮蝦蛤蜊、暖燈光 |
| 17 | 海菜鮮蚵嫩豆腐煲 | 石頭石鍋、肥美生蠔海菜、竹編墊 |
| 18 | 鮮魚嫩豆腐煲 | 黑陶土鍋、鮮嫩魚片、細緻辣湯 |
| 19 | 石燒拌飯 | 石鍋、牛肉五色蔬菜、生蛋黃、青銅餐具 |
| 20 | 鴨賞石鍋飯 | 石鍋、宜蘭鴨賞高麗菜、熱氣蒸騰 |
| 21 | 黃金雞石鍋飯 | 傳統石鍋、黃金雞肉塊、香菇 |
| 22 | 韓式石鍋飯 | 熱石鍋、三色野菜、香脆鍋巴 |
| 23 | 韓式金絲豆腐捲 | 黑色陶盤、金黃豆腐捲、冬粉餡 |
| 24 | 韓式酥炸脆薯 | 鐵絲炸薯籃、甜辣醬汁、咖啡廳木桌 |
| 25 | 黃金酥炸嫩豆腐 | 陶瓷淺盤、酥脆豆腐磚、蔥花辣椒絲 |
| 26 | 韓風辣味魚丸燒 | 長方形陶盤、辣醬魚丸串、白芝麻 |
| 27 | 魚卵起司陶鍋蛋 | 黑陶土鍋、蓬鬆烘蛋、起司飛魚卵 |
| 28 | 韓式炒冬粉 | 橢圓陶盤、多色炒雜菜冬粉、芝麻 |
| 29 | 韓式爆漿黑糖餅 | 手作陶盤、流心黑糖餅、肉桂堅果碎 |
| 30 | 珍珠豆腐冰淇淋 | 玻璃或小瓷碗、豆腐冰淇淋、黑糖珍珠 |
| 31 | 韓式宮廷炒年糕 | 深色陶瓷盤、醬燒宮廷年糕、牛肉鮮菇 |
| 32 | 黑松露炸醬起司年糕 | 石質淺碗、黑炸醬年糕、黃起司醬松露 |
| 33 | 起司馬鈴薯煎餅 | 木切菜板、金黃馬鈴薯絲餅、起司牽絲 |
| 34 | 植感炸雞年糕 | 手作圓盤、植感炸雞、炸年糕、甜辣醬 |
| 35 | 起司玫瑰醬魷魚年糕 | 寬口淺盤、粉橘玫瑰醬、魷魚年糕起司 |
| 36 | 絲瓜鮮蔬煎餅 | 圓形竹編托盤、絲瓜胡蘿蔔煎餅、切塊 |
| 37 | 田園醬燒飛虎魚 | 長方形白盤、醬爆魚片、木耳胡蘿蔔 |
| 38 | 海鮮辣炒年糕 | 韓式淺鐵鍋、辣炒年糕、海鮮料 |
| 39 | 辣炒中卷 | 黑色陶盤、鮮紅辣炒中卷、洋蔥蔥段 |
| 40 | 春川辣炒雞 | 鑄鐵平底鍋、春川辣炒雞、高麗菜年糕 |
| 41 | 人蔘砂鍋雞 | 大型砂鍋、人蔘燉全雞、乳白雞湯、紅棗 |
| 42 | 韓國人蔘雞火鍋 | 寬口火鍋、人蔘雞湯底、年糕鮮菇 |
| 43 | 韓式BBQ鐵板翼板牛 | 鐵板烤盤、醬烤翼板牛、洋蔥圈、白芝麻 |
| 44 | 肯瓊醬韓式炸雞 | 木質拼盤、金黃炸雞塊、黃橙肯瓊醬 |
| 45 | 洋蔥白醬韓式炸雞 | 白陶瓷盤、脆皮炸雞、濃郁白醬、洋蔥絲 |
| 46 | 蜂蜜蒜味韓式炸雞 | 烘焙紙鐵絲籃、蜜汁蒜味炸雞、亮澤淋醬 |
| 47 | 原味韓式炸雞 | 原木板、黃金脆皮原味炸雞、醃蘿蔔 |
| 48 | 辣味韓式炸雞 | 黑色陶盤、鮮紅甜辣炸雞、白芝麻 |
| 49 | 醬味韓式炸雞 | 木質長盤、醬油烤醬炸雞、深色亮澤 |
| 50 | 韓式起司烘蛋捲 | 長條陶盤、厚切明黃蛋捲、起司熔岩 |
| 51 | 韓國糖醋肉 | 深圓大白碗、酥炸糖醋肉、木耳胡蘿蔔 |
| 52 | 巨濟島炸牡蠣 | 陶瓷盤、金黃酥脆炸生蠔、高麗菜絲 |
| 53 | 泡菜豆腐煎餅 | 圓形淺盤、泡菜豆腐煎餅、醬油碟 |
| 54 | 綜合海鮮煎餅 | 原木砧板、海鮮蔥煎餅、白蝦透抽 |
| 55 | 醬燒青蔥牛五花/豬梅花 | 圓陶碗、醬燒牛五花、高聳青蔥絲 |
| 56 | 神仙霜降雪濃湯 | 金色黃銅碗、乳白牛骨湯、牛肉片蔥花 |
| 57 | Combo雙享韓式炸雞 | 雙格長盤、雙口味炸雞（紅辣與黑醬） |
| 58 | 松露韓式起司烘蛋捲 | 石板托盤、厚切松露起司蛋捲 |

---

## 清單與檔名（58）

| # | 食譜名稱 | slug | 建議檔名 |
| --- | --- | --- | --- |
| 1 | 打爆起司年糕嫩豆腐煲 | `dh-cheese-stuffed-rice-cake-soondubu` | `dh-cheese-stuffed-rice-cake-soondubu.webp` |
| 2 | 海菜起司年糕鮮魚嫩豆腐煲 | `dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed` | `dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed.webp` |
| 3 | 植感炸雞鮮菇嫩豆腐煲 | `dh-plant-based-fried-chicken-with-mushroom-soondubu` | `dh-plant-based-fried-chicken-with-mushroom-soondubu.webp` |
| 4 | 嫩豆腐煲 | `dh-classic-soondubu` | `dh-classic-soondubu.webp` |
| 5 | 野菜鮮菇嫩豆腐煲 | `dh-vegetable-soondubu` | `dh-vegetable-soondubu.webp` |
| 6 | 泡菜嫩豆腐煲 | `dh-kimchi-soondubu` | `dh-kimchi-soondubu.webp` |
| 7 | 泡菜鮮菇嫩豆腐煲 | `dh-kimchi-mushroom-soondubu` | `dh-kimchi-mushroom-soondubu.webp` |
| 8 | 起司泡菜鮮菇嫩豆腐煲 | `dh-cheese-kimchi-mushroom-soondubu` | `dh-cheese-kimchi-mushroom-soondubu.webp` |
| 9 | 咖哩嫩豆腐煲 | `dh-curry-soondubu` | `dh-curry-soondubu.webp` |
| 10 | 起司嫩豆腐煲 | `dh-cheese-soondubu` | `dh-cheese-soondubu.webp` |
| 11 | 起司野菜鮮菇嫩豆腐煲 | `dh-cheese-vegetable-soondubu` | `dh-cheese-vegetable-soondubu.webp` |
| 12 | 海陸綜合嫩豆腐煲 | `dh-combo-soondubu` | `dh-combo-soondubu.webp` |
| 13 | 韓式餃子嫩豆腐煲 | `dh-korean-dumpling-soondubu` | `dh-korean-dumpling-soondubu.webp` |
| 14 | 海鮮嫩豆腐煲 | `dh-seafood-soondubu` | `dh-seafood-soondubu.webp` |
| 15 | 蛤蜊鮮蝦嫩豆腐煲 | `dh-clams-shrimp-soondubu` | `dh-clams-shrimp-soondubu.webp` |
| 16 | 泡菜海鮮嫩豆腐煲 | `dh-kimchi-seafood-soondubu` | `dh-kimchi-seafood-soondubu.webp` |
| 17 | 海菜鮮蚵嫩豆腐煲 | `dh-seaweed-oyster-soondubu` | `dh-seaweed-oyster-soondubu.webp` |
| 18 | 鮮魚嫩豆腐煲 | `dh-fish-soondubu` | `dh-fish-soondubu.webp` |
| 19 | 石燒拌飯 | `dh-bibimbap` | `dh-bibimbap.webp` |
| 20 | 鴨賞石鍋飯 | `dh-duck-jerky-stone-pot-rice` | `dh-duck-jerky-stone-pot-rice.webp` |
| 21 | 黃金雞石鍋飯 | `dh-golden-chicken-stone-pot-rice` | `dh-golden-chicken-stone-pot-rice.webp` |
| 22 | 韓式石鍋飯 | `dh-classic-stone-pot-rice` | `dh-classic-stone-pot-rice.webp` |
| 23 | 韓式金絲豆腐捲 | `dh-korean-vermicelli-tofu-roll` | `dh-korean-vermicelli-tofu-roll.webp` |
| 24 | 韓式酥炸脆薯 | `dh-french-fries-with-korean-flavored-sauce` | `dh-french-fries-with-korean-flavored-sauce.webp` |
| 25 | 黃金酥炸嫩豆腐 | `dh-deep-fried-tofu` | `dh-deep-fried-tofu.webp` |
| 26 | 韓風辣味魚丸燒 | `dh-korean-style-bbq-fish-ball` | `dh-korean-style-bbq-fish-ball.webp` |
| 27 | 魚卵起司陶鍋蛋 | `dh-steamed-eggs-with-cheese-roe` | `dh-steamed-eggs-with-cheese-roe.webp` |
| 28 | 韓式炒冬粉 | `dh-fried-glass-noodle` | `dh-fried-glass-noodle.webp` |
| 29 | 韓式爆漿黑糖餅 | `dh-brown-sugar-pancake` | `dh-brown-sugar-pancake.webp` |
| 30 | 珍珠豆腐冰淇淋 | `dh-tofu-ice-cream-with-tapioca` | `dh-tofu-ice-cream-with-tapioca.webp` |
| 31 | 韓式宮廷炒年糕 | `dh-royal-stir-fried-rice-cake` | `dh-royal-stir-fried-rice-cake.webp` |
| 32 | 黑松露炸醬起司年糕 | `dh-truffle-jjajang-cheese-rice-cake` | `dh-truffle-jjajang-cheese-rice-cake.webp` |
| 33 | 起司馬鈴薯煎餅 | `dh-potato-pancake-with-cheese` | `dh-potato-pancake-with-cheese.webp` |
| 34 | 植感炸雞年糕 | `dh-plant-based-fried-chicken-with-rice-cake` | `dh-plant-based-fried-chicken-with-rice-cake.webp` |
| 35 | 起司玫瑰醬魷魚年糕 | `dh-cheese-pink-sauce-fried-squid-with-rice-cake` | `dh-cheese-pink-sauce-fried-squid-with-rice-cake.webp` |
| 36 | 絲瓜鮮蔬煎餅 | `dh-vegetable-pancake` | `dh-vegetable-pancake.webp` |
| 37 | 田園醬燒飛虎魚 | `dh-stired-fried-fish-fillet-with-vegetables` | `dh-stired-fried-fish-fillet-with-vegetables.webp` |
| 38 | 海鮮辣炒年糕 | `dh-spicy-pan-fried-seafood-rice-cake` | `dh-spicy-pan-fried-seafood-rice-cake.webp` |
| 39 | 辣炒中卷 | `dh-spicy-pan-fried-squid` | `dh-spicy-pan-fried-squid.webp` |
| 40 | 春川辣炒雞 | `dh-spicy-stired-fried-chicken` | `dh-spicy-stired-fried-chicken.webp` |
| 41 | 人蔘砂鍋雞 | `dh-ginseng-chicken-clay-pot` | `dh-ginseng-chicken-clay-pot.webp` |
| 42 | 韓國人蔘雞火鍋 | `dh-ginseng-chicken-hot-pot` | `dh-ginseng-chicken-hot-pot.webp` |
| 43 | 韓式BBQ鐵板翼板牛 | `dh-korean-bbq-beef-short-ribs` | `dh-korean-bbq-beef-short-ribs.webp` |
| 44 | 肯瓊醬韓式炸雞 | `dh-cajun-korean-fried-chicken` | `dh-cajun-korean-fried-chicken.webp` |
| 45 | 洋蔥白醬韓式炸雞 | `dh-creamy-onion-korean-fried-chicken` | `dh-creamy-onion-korean-fried-chicken.webp` |
| 46 | 蜂蜜蒜味韓式炸雞 | `dh-honey-garlic-korean-fried-chicken` | `dh-honey-garlic-korean-fried-chicken.webp` |
| 47 | 原味韓式炸雞 | `dh-original-korean-fried-chicken` | `dh-original-korean-fried-chicken.webp` |
| 48 | 辣味韓式炸雞 | `dh-spicy-korean-fried-chicken` | `dh-spicy-korean-fried-chicken.webp` |
| 49 | 醬味韓式炸雞 | `dh-bbq-korean-fried-chicken` | `dh-bbq-korean-fried-chicken.webp` |
| 50 | 韓式起司烘蛋捲 | `dh-korean-cheese-egg-roll` | `dh-korean-cheese-egg-roll.webp` |
| 51 | 韓國糖醋肉 | `dh-korean-sweet-and-sour-pork` | `dh-korean-sweet-and-sour-pork.webp` |
| 52 | 巨濟島炸牡蠣 | `dh-fried-oysters` | `dh-fried-oysters.webp` |
| 53 | 泡菜豆腐煎餅 | `dh-kimchi-tofu-pancake` | `dh-kimchi-tofu-pancake.webp` |
| 54 | 綜合海鮮煎餅 | `dh-seafood-pancake` | `dh-seafood-pancake.webp` |
| 55 | 醬燒青蔥牛五花/豬梅花 | `dh-bbq-wrap` | `dh-bbq-wrap.webp` |
| 56 | 神仙霜降雪濃湯 | `dh-ox-bone-soup` | `dh-ox-bone-soup.webp` |
| 57 | Combo雙享韓式炸雞 | `dh-korean-fried-chicken-combo` | `dh-korean-fried-chicken-combo.webp` |
| 58 | 松露韓式起司烘蛋捲 | `dh-truffle-cheese-egg-roll` | `dh-truffle-cheese-egg-roll.webp` |

---

## 各食譜完整 Prompt（複製到 Gemini）

> 每段 = **料理描述** + **獨立場景構圖** + **風格尾段**。編號順序與 [`docs/content/dubu-house-menu-replication.md`](content/dubu-house-menu-replication.md) 菜單分類一致。

### 韓式嫩豆腐煲系列（1~18）

#### 1. 打爆起司年糕嫩豆腐煲 — `dh-cheese-stuffed-rice-cake-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu cubes, tender vegetables, and chewy cheese-stuffed rice cakes leaking melted cheese in a rich, bubbling red-orange gochugaru broth. Composition: Served in a traditional black Korean earthenware pot (ttukbaegi) on a dark wooden table, bubbling with steam, garnished with chopped green onions and a raw egg yolk in the center. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 2. 海菜起司年糕鮮魚嫩豆腐煲 — `dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, tender fish fillet chunks, green seaweed fronds, and cheese-stuffed rice cakes in a simmering, savory red-orange broth. Composition: Served in a bubbling stone bowl on a woven bamboo trivet, with steam rising, soft evening dining light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 3. 植感炸雞鮮菇嫩豆腐煲 — `dh-plant-based-fried-chicken-with-mushroom-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, plump shiitake mushrooms, and golden crispy plant-based fried chicken pieces absorbing the flavorful bubbling red-orange spicy broth. Composition: Served in a black earthenware pot on a light oak table, garnished with sliced red chili and scallions, bright side window light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 4. 嫩豆腐煲 — `dh-classic-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring traditional silky soft tofu cubes, tender vegetables, and a rich, bubbling red-orange spicy broth. Composition: Served in a piping hot black ceramic pot resting on a wooden underliner, classic Korean tavern setting, warm tungsten glow. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 5. 野菜鮮菇嫩豆腐煲 — `dh-vegetable-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, tender cabbage leaves, shiitake mushrooms, enoki mushrooms, and green vegetables in a clean, savory bubbling broth. Composition: Served in a traditional earthenware pot on a granite countertop, bright natural lunch light, minimalist setting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 6. 泡菜嫩豆腐煲 — `dh-kimchi-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu cubes and tender pork belly slices simmered with rich, tangy fermented Napa cabbage kimchi in a bubbling fiery-red broth. Composition: Served in a hot stone pot on a red lacquer tray, with steam rising, cozy Korean restaurant dining background. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 7. 泡菜鮮菇嫩豆腐煲 — `dh-kimchi-mushroom-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, rich kimchi, and a variety of mushrooms including shiitake and enoki in a bubbling red-orange broth. Composition: Served in a sizzling black earthenware pot on a dark rustic wooden table, cozy dinner atmosphere. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 8. 起司泡菜鮮菇嫩豆腐煲 — `dh-cheese-kimchi-mushroom-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, tangy kimchi, and fresh mushrooms in a bubbling spicy broth, topped with a thick, melting layer of golden cheddar and mozzarella cheese. Composition: Served in a traditional black pot, showing the cheese stretch and steam rising, soft golden hour lighting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 9. 咖哩嫩豆腐煲 — `dh-curry-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu cubes and tender pork slices in a bubbling, rich yellow-golden curry-infused soondubu broth. Composition: Served in an earthenware pot on a linen placemat, surrounded by small banchan dishes, morning light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 10. 起司嫩豆腐煲 — `dh-cheese-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu cubes and tender beef slices in a red-orange spicy broth, covered with two melted slices of cheddar cheese and mozzarella string cheese. Composition: Served in a bubbling earthenware pot, cheese melting beautifully into the soup, cozy restaurant table. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 11. 起司野菜鮮菇嫩豆腐煲 — `dh-cheese-vegetable-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, tender cabbage, fresh mushrooms, and melting cheese in a bubbling savory broth. Composition: Served in a steaming black earthenware pot on a rustic table, soft diffused dinner lighting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 12. 海陸綜合嫩豆腐煲 — `dh-combo-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring luxurious soondubu stew filled with silky soft tofu, tender beef slices, whole white shrimp, and fresh clams in a bubbling red-orange broth. Composition: Served in a steaming earthenware pot on a wooden trivet, fresh ingredients peeking through the bubbling soup, close-up hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 13. 韓式餃子嫩豆腐煲 — `dh-korean-dumpling-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu and plump, savory Korean mandu dumplings with visible pleats, simmering in a bubbling red-orange spicy broth. Composition: Served in a black ceramic pot on a simple wooden table, garnished with red chili slices and scallion greens. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 14. 海鮮嫩豆腐煲 — `dh-seafood-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu cubes with abundant seafood including white shrimp, fresh clams, and squid rings in a rich, bubbling red-orange seafood broth. Composition: Served in a traditional ttukbaegi pot on a dark wood table, steam rising, spotlight focusing on the fresh seafood. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 15. 蛤蜊鮮蝦嫩豆腐煲 — `dh-clams-shrimp-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, fresh plump clams in shells, and whole white shrimp simmering in a clean, briny, bubbling broth. Composition: Served in a hot clay pot on a wooden board, garnished with chopped scallions, bright lunch dining atmosphere. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 16. 泡菜海鮮嫩豆腐煲 — `dh-kimchi-seafood-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, whole white shrimp, clams, and tangy kimchi in a fiery-red bubbling broth. Composition: Served in a traditional earthenware pot on a dark table, with steam rising, cozy dining lighting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 17. 海菜鮮蚵嫩豆腐煲 — `dh-seaweed-oyster-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu, green seaweed fronds, and plump, juicy fresh oysters in a clean, briny bubbling broth. Composition: Served in a stone pot on a woven bamboo trivet, highlighting the plump oysters on top, soft side lighting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 18. 鮮魚嫩豆腐煲 — `dh-fish-soondubu.webp`

```text
A highly appetizing Korean soondubu jjigae (soft tofu stew), generous restaurant hot-pot portion, featuring silky soft tofu and tender white fish fillet chunks simmering in a rich, savory red-orange broth. Composition: Served in a black earthenware pot on a light oak table, clean and elegant plating, window light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 韓式石鍋飯系列（19~22）

#### 19. 石燒拌飯 — `dh-bibimbap.webp`

```text
A highly appetizing Korean dolsot bibimbap or stone pot rice, generous restaurant portion, featuring steaming white rice in a hot stone bowl, beautifully topped with sections of seasoned beef slices, shredded carrots, spinach, bean sprouts, shiitake mushrooms, and a raw egg yolk in the center. Composition: Served in a traditional hot stone pot (dolsot) on a wooden underliner, showing crispy sizzling rice edges, bronze spoon and chopsticks beside. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 20. 鴨賞石鍋飯 — `dh-duck-jerky-stone-pot-rice.webp`

```text
A highly appetizing Korean dolsot bibimbap or stone pot rice, generous restaurant portion, featuring steaming rice in a hot stone bowl topped with savory sliced Taiwanese duck jerky, shredded green cabbage, and chopped scallions. Composition: Served in a sizzling stone pot on a dark table, steam rising, close-up three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 21. 黃金雞石鍋飯 — `dh-golden-chicken-stone-pot-rice.webp`

```text
A highly appetizing Korean dolsot bibimbap or stone pot rice, generous restaurant portion, featuring steaming hot stone pot rice topped with tender, golden pan-fried chicken thigh pieces, shiitake mushrooms, and chopped scallions. Composition: Served in a traditional dolsot on a red wooden tray, cozy dining atmosphere. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 22. 韓式石鍋飯 — `dh-classic-stone-pot-rice.webp`

```text
A highly appetizing Korean dolsot bibimbap or stone pot rice, generous restaurant portion, featuring steaming white rice cooked in a hot stone bowl, topped with shredded carrots, spinach, bean sprouts, and sesame seeds. Composition: Served in a hot stone pot on a woven mat, highlighting the crispy golden crust forming at the edges. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 精選前菜（23~28）

#### 23. 韓式金絲豆腐捲 — `dh-korean-vermicelli-tofu-roll.webp`

```text
A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring golden-brown pan-fried tofu rolls filled with glass noodles and vegetables, drizzled with savory sesame oil. Composition: Arranged neatly on a shallow black stoneware plate on a linen napkin, garnished with sesame seeds and chopped scallions. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 24. 韓式酥炸脆薯 — `dh-french-fries-with-korean-flavored-sauce.webp`

```text
A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring crispy golden French fries drizzled with a glossy, sweet and spicy Korean red sauce and honey. Composition: Served in a wire basket lined with paper on a café table, small cup of sauce on the side. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 25. 黃金酥炸嫩豆腐 — `dh-deep-fried-tofu.webp`

```text
A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring golden-brown, crispy deep-fried tofu cubes with a soft silky interior, drizzled with a savory soy dipping sauce. Composition: Served in a shallow ceramic dish, garnished with chopped scallions and red chili slivers, light neutral background. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 26. 韓風辣味魚丸燒 — `dh-korean-style-bbq-fish-ball.webp`

```text
A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring plump, grilled fish balls skewers coated in a glossy, red sweet-and-spicy Korean BBQ glaze. Composition: Served on a rectangular plate on a wooden pub table, garnished with white sesame seeds. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 27. 魚卵起司陶鍋蛋 — `dh-steamed-eggs-with-cheese-roe.webp`

```text
A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring puffy, soufflé-like Korean steamed egg (gyeran-jjim) overflowing from a hot clay pot, topped with melting cheddar cheese and bright orange flying fish roe. Composition: Served in a traditional black pot on a wooden coaster, bubbling hot, warm dining light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 28. 韓式炒冬粉 — `dh-fried-glass-noodle.webp`

```text
A highly appetizing Korean appetizer, generous restaurant sharing portion, featuring glossy, translucent sweet potato glass noodles stir-fried with sesame oil, colorful bell peppers, spinach, carrots, and wood ear mushrooms. Composition: Served on an oval ceramic plate, sprinkled with toasted sesame seeds, bright natural light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 甜品（29~30）

#### 29. 韓式爆漿黑糖餅 — `dh-brown-sugar-pancake.webp`

```text
A highly appetizing Korean dessert, generous restaurant portion, featuring two round, golden-brown griddled Korean sweet pancakes (hotteok), with a glossy dark brown caramelized cinnamon and brown sugar syrup oozing out of a cut pancake. Composition: Served on a rustic ceramic plate, dusted with crushed walnuts and pumpkin seeds, warm cozy dessert light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 30. 珍珠豆腐冰淇淋 — `dh-tofu-ice-cream-with-tapioca.webp`

```text
A highly appetizing Korean dessert, generous restaurant portion, featuring a scoop of smooth, creamy pale-yellow tofu ice cream topped with warm, glossy dark brown tapioca pearls in brown sugar syrup. Composition: Served in a small ceramic dessert bowl, warm wooden table background, soft side light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 特色料理（31~42）

#### 31. 韓式宮廷炒年糕 — `dh-royal-stir-fried-rice-cake.webp`

```text
A highly appetizing Korean rice cake dish (tteok), generous restaurant portion, featuring chewy cylinder rice cakes (tteokbokki) stir-fried in a savory soy-sauce glaze with tender beef strips, shiitake mushrooms, carrots, onions, and scallions. Composition: Served on a modern dark ceramic plate, garnished with toasted sesame seeds, warm restaurant lighting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 32. 黑松露炸醬起司年糕 — `dh-truffle-jjajang-cheese-rice-cake.webp`

```text
A highly appetizing Korean rice cake dish (tteok), generous restaurant portion, featuring chewy rice cakes coated in a rich, glossy black bean sauce (jjajang), topped with melted cheddar cheese sauce and a spoonful of dark black truffle paste. Composition: Served in a shallow stone bowl, cheese blending with the black sauce, modern dining table. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 33. 起司馬鈴薯煎餅 — `dh-potato-pancake-with-cheese.webp`

```text
A highly appetizing Korean savory pancake (jeon), generous restaurant portion, featuring a large, thin, golden-brown crispy potato pancake made of shredded potatoes, topped with melted mozzarella cheese stringing up. Composition: Served on a wooden cutting board with a small bowl of soy-vinegar dipping sauce, close-up angle showing crispy edges. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 34. 植感炸雞年糕 — `dh-plant-based-fried-chicken-with-rice-cake.webp`

```text
A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy plant-based fried chicken nuggets and chewy pan-fried Korean rice cakes, coated in a glossy, sweet and spicy red glaze. Composition: Served on a rustic round plate, sprinkled with sesame seeds, warm pub table setting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 35. 起司玫瑰醬魷魚年糕 — `dh-cheese-pink-sauce-fried-squid-with-rice-cake.webp`

```text
A highly appetizing Korean rice cake dish (tteok), generous restaurant portion, featuring tender squid rings and chewy rice cakes coated in a creamy, pastel-orange rose sauce, topped with melted mozzarella cheese. Composition: Served in a wide shallow bowl, cheese bubbling, bright midday dining light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 36. 絲瓜鮮蔬煎餅 — `dh-vegetable-pancake.webp`

```text
A highly appetizing Korean savory pancake (jeon), generous restaurant portion, featuring a large, thin Korean savory vegetable pancake featuring bright green shredded luffa squash, carrots, and onions, with crispy golden edges. Composition: Served on a round bamboo tray, cut into wedges, side bowl of soy dipping sauce. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 37. 田園醬燒飛虎魚 — `dh-stired-fried-fish-fillet-with-vegetables.webp`

```text
A highly appetizing Korean specialty dish, generous restaurant portion, featuring tender pieces of fried mahi-mahi fish fillet stir-fried with carrots, onions, and wood ear mushrooms in a savory brown sauce. Composition: Served on a rectangular white plate, garnished with green scallions, cozy dining light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 38. 海鮮辣炒年糕 — `dh-spicy-pan-fried-seafood-rice-cake.webp`

```text
A highly appetizing Korean rice cake dish (tteok), generous restaurant portion, featuring chewy cylinder rice cakes stir-fried with white shrimp, clams, and squid in a rich, glossy fiery-red gochujang sauce. Composition: Served in a traditional shallow pan on a wooden table, steam rising, vibrant red colors. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 39. 辣炒中卷 — `dh-spicy-pan-fried-squid.webp`

```text
A highly appetizing Korean specialty dish, generous restaurant portion, featuring tender, cross-cut squid rings and tentacles stir-fried with onions and scallions in a glossy, rich red chili sauce. Composition: Served on a shallow black ceramic plate, sprinkled with sesame seeds, close-up hero view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 40. 春川辣炒雞 — `dh-spicy-stired-fried-chicken.webp`

```text
A highly appetizing Korean specialty dish, generous restaurant portion, featuring tender chicken thigh chunks stir-fried with cabbage, sweet potatoes, and rice cakes in a rich, glossy crimson gochujang sauce. Composition: Served in a large cast-iron skillet, steaming hot, highlighting the red sauce and tender chicken, warm kitchen setting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 41. 人蔘砂鍋雞 — `dh-ginseng-chicken-clay-pot.webp`

```text
A highly appetizing Korean specialty dish, generous restaurant portion, featuring a whole, tender small spring chicken stuffed with glutinous rice, simmering in a rich, milky white chicken broth with whole ginseng root, red dates, and garlic cloves. Composition: Served in a large traditional earthenware clay pot, bubbling hot with steam rising, garnishes of chopped green scallions on top. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 42. 韓國人蔘雞火鍋 — `dh-ginseng-chicken-hot-pot.webp`

```text
A highly appetizing Korean specialty dish, generous restaurant portion, featuring a rich ginseng chicken soup hot pot with sliced tender chicken, shiitake mushrooms, red dates, and chewy Korean rice cakes in a clean broth. Composition: Served in a wide hot pot on a tabletop stove, fresh vegetables arranged beautifully, family style dining. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 主廚推薦（43~57）

#### 43. 韓式BBQ鐵板翼板牛 — `dh-korean-bbq-beef-short-ribs.webp`

```text
A highly appetizing Korean restaurant chef's special, generous portion, featuring thinly sliced tender beef short ribs, grilled to perfection with glossy sweet-savory BBQ glaze, topped with toasted sesame seeds. Composition: Served on a sizzling cast-iron plate on a wooden base, surrounded by grilled onion slices, warm steakhouse lighting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 44. 肯瓊醬韓式炸雞 — `dh-cajun-korean-fried-chicken.webp`

```text
A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy, golden-brown double-fried chicken thigh chunks, generously drizzled with a glossy, yellow-orange honey cajun sauce. Composition: Served on a rustic wooden platter, with sliced pickled radish and green onions on the side, warm party lighting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 45. 洋蔥白醬韓式炸雞 — `dh-creamy-onion-korean-fried-chicken.webp`

```text
A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy double-fried chicken chunks topped with a generous amount of creamy white onion sauce and thin, translucent sliced raw onions. Composition: Served on a modern white ceramic plate, side close-up showing the creamy sauce and crispy skin texture. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 46. 蜂蜜蒜味韓式炸雞 — `dh-honey-garlic-korean-fried-chicken.webp`

```text
A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy double-fried chicken chunks coated in a glossy, sticky amber-colored honey garlic glaze, studded with minced garlic. Composition: Served in a wire basket lined with parchment paper, shiny glaze catching the warm dining light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 47. 原味韓式炸雞 — `dh-original-korean-fried-chicken.webp`

```text
A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy, golden-brown double-fried chicken thigh pieces showing an extra-crunchy cracked batter texture, lightly dusted with salt and pepper. Composition: Served on a simple wooden board, accompanied by a small bowl of sweet-and-sour pickled white radish cubes. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 48. 辣味韓式炸雞 — `dh-spicy-korean-fried-chicken.webp`

```text
A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy double-fried chicken chunks coated in a thick, glossy, bright red sweet-and-spicy gochujang glaze, sprinkled with white sesame seeds. Composition: Served on a dark stoneware platter, vibrant red chicken pieces contrasting with the dark plate, casual pub atmosphere. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 49. 醬味韓式炸雞 — `dh-bbq-korean-fried-chicken.webp`

```text
A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring crispy double-fried chicken chunks glazed in a rich, dark brown glossy soy-based Korean BBQ sauce, sprinkled with sesame seeds. Composition: Served on a wooden platter on a dark rustic table, side window light highlighting the glaze texture. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 50. 韓式起司烘蛋捲 — `dh-korean-cheese-egg-roll.webp`

```text
A highly appetizing Korean rolled omelette (gyeran-mari), generous restaurant portion, featuring a thick, golden-yellow layered Korean egg roll (gyeran-mari), sliced to reveal a generous filling of melting cheddar and mozzarella cheese stretching out. Composition: Arranged on a rectangular ceramic plate, cheese pull captured beautifully, bright breakfast table setting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 51. 韓國糖醋肉 — `dh-korean-sweet-and-sour-pork.webp`

```text
A highly appetizing Korean restaurant chef's special, generous portion, featuring crispy, golden-fried pork strips coated in a translucent, glossy sweet-and-sour glaze containing wood ear mushrooms and carrot slices. Composition: Served in a large white ceramic bowl, glaze catching the bright dining light, side view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 52. 巨濟島炸牡蠣 — `dh-fried-oysters.webp`

```text
A highly appetizing Korean restaurant chef's special, generous portion, featuring golden-brown, panko-crusted deep-fried oysters, displaying an extra-crispy textured exterior. Composition: Served on a plate with shredded cabbage salad and a side of tartar sauce, fresh lunch light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 53. 泡菜豆腐煎餅 — `dh-kimchi-tofu-pancake.webp`

```text
A highly appetizing Korean savory pancake (jeon), generous restaurant portion, featuring a round, golden-brown Korean savory pancake featuring red kimchi bits and crumbled tofu, with crispy edges. Composition: Served on a flat round plate, cut into wedges, accompanied by a small ramekin of soy-sesame dipping sauce. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 54. 綜合海鮮煎餅 — `dh-seafood-pancake.webp`

```text
A highly appetizing Korean savory pancake (jeon), generous restaurant portion, featuring a large, round, golden-brown crispy Korean seafood pancake stuffed with whole white shrimp, squid rings, and green scallions. Composition: Served on a wooden board, showing crispy texture and colorful seafood, warm kitchen light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 55. 醬燒青蔥牛五花/豬梅花 — `dh-bbq-wrap.webp`

```text
A highly appetizing Korean restaurant chef's special, generous portion, featuring thinly sliced beef short plate stir-fried in a sweet soy-sauce glaze, topped with a massive heap of thin shredded green scallions. Composition: Served in a round ceramic bowl on a dark dining table, close-up highlighting the contrast between glazed beef and fresh green onions. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 56. 神仙霜降雪濃湯 — `dh-ox-bone-soup.webp`

```text
A highly appetizing Korean restaurant chef's special, generous portion, featuring a comforting bowl of rich, milky white ox bone soup (seolleongtang) with tender slices of beef brisket and green onion rounds floating on top. Composition: Served in a traditional metal bowl (bangjja yugi) on a wooden table, steam rising, accompanied by a side of rice and radish kimchi (kkakdugi). Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 57. Combo雙享韓式炸雞 — `dh-korean-fried-chicken-combo.webp`

```text
A highly appetizing Korean fried chicken (chikin), generous restaurant portion, featuring a double portion of crispy Korean fried chicken, half glazed in bright red sweet-and-spicy gochujang sauce and half glazed in a glossy dark brown BBQ sauce. Composition: Served side-by-side in a long rectangular platter on a pub table, garnished with sesame seeds, close-up showcasing both flavors. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 黑鑽松露年糕季（58~58）

#### 58. 松露韓式起司烘蛋捲 — `dh-truffle-cheese-egg-roll.webp`

```text
A highly appetizing Korean rolled omelette (gyeran-mari), generous restaurant portion, featuring a thick, golden-yellow layered Korean egg roll filled with melting mozzarella cheese, topped with a drizzle of black truffle paste and cheese sauce. Composition: Served on a slate board, truffle streaks visible on top, elegant modern dining table setting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

---

## 上線檢查清單

完成繪圖後，逐篇確認：

1. 檔案已放入 `public/images/recipes/{slug}.webp`
2. `src/content/recipes/{slug}.md` 的 `coverImage` 已改為 `.webp`
3. 同步更新 `recipes-en` / `recipes-ja` / `recipes-ko` 同名食譜封面路徑
4. 執行 `npm run build` 通過
5. 瀏覽 `/recipes/{slug}/` 與 `/restaurant-replicas/` 確認封面顯示正常

---

## 相關路徑

| 用途 | 路徑 |
| --- | --- |
| 名店還原專區 | `/restaurant-replicas/` |
| 涓豆腐菜單對照 | `docs/content/dubu-house-menu-replication.md` |
| 食譜產生器 | `scripts/generate-dubu-house-recipes.mjs` |
| 封面 prompt 產生器 | `scripts/generate-dubu-house-cover-prompts.mjs` |
| 貳樓批次範例 | `docs/recipe-cover-images-for-gemini-second-floor-70.md` |

