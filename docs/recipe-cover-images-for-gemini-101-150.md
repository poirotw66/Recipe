# 食譜成品圖繪製清單（101~150，PRD-004 給 Gemini）

本站 PRD-004 新增 **50 篇**食譜（編號 **101~150**），目前 `coverImage` 多為 `.svg` 佔位。請依下表各產出一張成品圖；圖檔放入 `public/images/recipes/` 後，將 frontmatter 的 `coverImage` 改為 `.webp` 即可上線。

## 輸出規格建議

| 項目 | 建議 |
| --- | --- |
| 比例 | 4:3（例如 1200×900 或 800×600） |
| 格式 | WebP（或 PNG 再轉 WebP） |
| 風格 | 彩鉛 + 水彩插畫（colored pencil and watercolor illustration），溫暖居家、非寫實攝影 |
| 構圖 | 一人份成品為主角；**每道菜使用不同場景／角度／光線**（見下方各篇 prompt，避免重複道具組合） |
| 文字 | 圖上不要加字、不要浮水印 |
| 存放路徑 | `public/images/recipes/` |
| 檔名 | 與下表「檔名」欄一致（slug + `.webp`） |

上線後每篇食譜 frontmatter：`coverImage: "/images/recipes/{slug}.webp"`

---

## 圖片進度狀態

- ✅ **已完成（共 31 篇）**：101 ~ 130, 143
- 🟡 **待新增（共 19 篇）**：131 ~ 142, 144 ~ 150（後續批次）

---

## Prompt 風格尾段（每道食譜都接上）

> **場景與構圖寫在各食譜段落內**；以下只統一畫風與輸出限制，不要每張都複製同一套木桌／窗光／水杯／布巾。

```text
Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

---

## 清單與檔名（50）

| # | 食譜名稱 | slug | 建議檔名 |
| --- | --- | --- | --- |
| 101 | 氣炸蒜香豬排 | `air-fryer-garlic-pork-chop` | `air-fryer-garlic-pork-chop.webp` |
| 102 | 氣炸蜜蕃薯 | `air-fryer-honey-sweet-potato` | `air-fryer-honey-sweet-potato.webp` |
| 103 | 氣炸台式雞塊 | `air-fryer-crispy-chicken-bites` | `air-fryer-crispy-chicken-bites.webp` |
| 104 | 氣炸檸檬魚排 | `air-fryer-lemon-fish-fillet` | `air-fryer-lemon-fish-fillet.webp` |
| 105 | 氣炸蒜香蝦仁 | `air-fryer-garlic-shrimp` | `air-fryer-garlic-shrimp.webp` |
| 106 | 氣炸酥炸豆腐丁 | `air-fryer-crispy-tofu-cubes` | `air-fryer-crispy-tofu-cubes.webp` |
| 107 | 氣炸奶油玉米 | `air-fryer-butter-corn` | `air-fryer-butter-corn.webp` |
| 108 | 氣炸蒜香秋葵 | `air-fryer-garlic-okra` | `air-fryer-garlic-okra.webp` |
| 109 | 氣炸醬油雞翅 | `air-fryer-soy-chicken-wings` | `air-fryer-soy-chicken-wings.webp` |
| 110 | 氣炸蒜香菇類 | `air-fryer-garlic-mushrooms` | `air-fryer-garlic-mushrooms.webp` |
| 111 | 蔥油乾麵 | `scallion-oil-dry-noodles` | `scallion-oil-dry-noodles.webp` |
| 112 | 蛋蔥油麵 | `egg-scallion-oil-noodles` | `egg-scallion-oil-noodles.webp` |
| 113 | 奶油蒜香泡麵 | `butter-garlic-instant-noodles` | `butter-garlic-instant-noodles.webp` |
| 114 | 快速泡菜炒飯 | `quick-kimchi-fried-rice` | `quick-kimchi-fried-rice.webp` |
| 115 | 一人麻醬涼麵 | `sesame-cold-noodles-solo` | `sesame-cold-noodles-solo.webp` |
| 116 | 味噌蛋花湯 | `instant-miso-egg-soup` | `instant-miso-egg-soup.webp` |
| 117 | 鮪魚罐頭飯 | `canned-tuna-rice-bowl` | `canned-tuna-rice-bowl.webp` |
| 118 | 菜脯蛋飯 | `quick-pickled-cucumber-egg-rice` | `quick-pickled-cucumber-egg-rice.webp` |
| 119 | 電子鍋蒸蛋蓋飯 | `microwave-steamed-egg-rice` | `microwave-steamed-egg-rice.webp` |
| 120 | 十分鐘烏龍麵湯 | `ten-minute-udon-soup` | `ten-minute-udon-soup.webp` |
| 121 | 綜合蔬菜炒飯 | `leftover-mixed-veggie-fried-rice` | `leftover-mixed-veggie-fried-rice.webp` |
| 122 | 豆腐蔬菜清湯 | `clearout-tofu-veggie-soup` | `clearout-tofu-veggie-soup.webp` |
| 123 | 豬肉青椒快炒 | `leftover-meat-quick-stirfry` | `leftover-meat-quick-stirfry.webp` |
| 124 | 雜菜雞蛋煎餅 | `random-veggie-egg-pancake` | `random-veggie-egg-pancake.webp` |
| 125 | 什錦蔬菜湯麵 | `fridge-bottom-soup-noodles` | `fridge-bottom-soup-noodles.webp` |
| 126 | 米飯蛋煎餅 | `leftover-rice-egg-pancake` | `leftover-rice-egg-pancake.webp` |
| 127 | 家常蛋炒飯 | `clearout-veggie-egg-fried-rice` | `clearout-veggie-egg-fried-rice.webp` |
| 128 | 蛋花鹹粥 | `mixed-leftover-congee` | `mixed-leftover-congee.webp` |
| 129 | 薑絲肉燥飯 | `solo-ginger-pork-rice` | `solo-ginger-pork-rice.webp` |
| 130 | 三杯雞蓋飯 | `solo-three-cup-chicken-rice` | `solo-three-cup-chicken-rice.webp` |
| 131 | 麻婆豆腐蓋飯 | `solo-mapo-tofu-rice-bowl` | `solo-mapo-tofu-rice-bowl.webp` |
| 132 | 煎豬排蓋飯 | `solo-pan-fried-pork-cutlet-rice` | `solo-pan-fried-pork-cutlet-rice.webp` |
| 133 | 滷肉飯一人份 | `solo-lu-rou-rice` | `solo-lu-rou-rice.webp` |
| 134 | 芝麻雞蓋飯 | `solo-sesame-chicken-rice` | `solo-sesame-chicken-rice.webp` |
| 135 | 蠔油牛肉蓋飯 | `solo-oyster-sauce-beef-rice` | `solo-oyster-sauce-beef-rice.webp` |
| 136 | 便當薑炒雞肉 | `bento-ginger-chicken` | `bento-ginger-chicken.webp` |
| 137 | 便當蜜汁滷肉 | `bento-honey-soy-pork` | `bento-honey-soy-pork.webp` |
| 138 | 便當炒高麗菜 | `bento-stir-fried-cabbage` | `bento-stir-fried-cabbage.webp` |
| 139 | 便當黑椒牛肉 | `bento-black-pepper-beef` | `bento-black-pepper-beef.webp` |
| 140 | 便當滷蛋豆腐 | `bento-braised-tofu-egg` | `bento-braised-tofu-egg.webp` |
| 141 | 高蛋白雞肉青花碗 | `high-protein-chicken-broccoli-bowl` | `high-protein-chicken-broccoli-bowl.webp` |
| 142 | 高蛋白蝦豆腐碗 | `high-protein-shrimp-tofu-bowl` | `high-protein-shrimp-tofu-bowl.webp` |
| 143 | 高蛋白豆腐排 | `high-protein-tofu-steak-plate` | `high-protein-tofu-steak-plate.webp` |
| 144 | 高蛋白蛋白炒 | `high-protein-egg-white-stirfry` | `high-protein-egg-white-stirfry.webp` |
| 145 | 減脂櫛瓜雞肉 | `weight-loss-zucchini-chicken` | `weight-loss-zucchini-chicken.webp` |
| 146 | 減脂鮮蝦沙拉 | `weight-loss-shrimp-veg-salad` | `weight-loss-shrimp-veg-salad.webp` |
| 147 | 減脂菇類清湯 | `weight-loss-clear-mushroom-soup` | `weight-loss-clear-mushroom-soup.webp` |
| 148 | 省錢蛋炒飯 | `budget-simple-egg-fried-rice` | `budget-simple-egg-fried-rice.webp` |
| 149 | 省錢豆腐蓋飯 | `budget-tofu-rice-bowl` | `budget-tofu-rice-bowl.webp` |
| 150 | 省錢高麗菜麵 | `budget-cabbage-noodle-soup` | `budget-cabbage-noodle-soup.webp` |

---

## 各食譜完整 Prompt（複製到 Gemini）

> 每段 = **料理描述** + **獨立場景構圖** + **風格尾段**。50 道場景各異，對應 PRD-004 成長主軸：氣炸鍋、10 分鐘、清冰箱、一人份、便當、高蛋白、省錢。

### 氣炸鍋料理（101~110）

#### 101. 氣炸蒜香豬排 — `air-fryer-garlic-pork-chop.webp`

```text
A highly appetizing, golden-browned Taiwanese air-fried garlic pork chop, single-serving size. Features a thick-cut pork chop with a beautifully crisped exterior, sliced to reveal a juicy, tender pale pink center, seasoned with aromatic minced garlic and a pinch of black pepper. Composition: served hot on a sheet of crumpled parchment paper inside a black air-fryer basket on a modern granite kitchen counter. Soft amber under-cabinet LED lighting creates a warm glow, with thin wisps of steam gently rising, captured from a low-angle close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 102. 氣炸蜜蕃薯 — `air-fryer-honey-sweet-potato.webp`

```text
A highly appetizing plate of Taiwanese honey-glazed air-fried sweet potato cubes, single-serving size. The sweet potato cubes feature caramelized, slightly charred edges and a soft, fluffy orange interior, glistening with a sticky, glossy amber honey drizzle. Composition: piled in a small, rustic cream-colored ceramic bowl placed on a woven bamboo placemat. Warm, soft afternoon window daylight filters in from the side, casting gentle long shadows on a light wood table, captured from a three-quarter overhead angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 103. 氣炸台式雞塊 — `air-fryer-crispy-chicken-bites.webp`

```text
Crispy, golden-brown Taiwanese air-fried chicken bites (popcorn chicken), single-serving size. Featuring bite-sized chicken pieces coated in a crunchy, textured sweet potato starch batter, lightly speckled with red chili powder and fresh, deep-fried basil leaves. Composition: arranged neatly on a piece of greaseproof paper beside a tiny glass dipping dish filled with tomato ketchup, set on a dark, rustic wooden pub table. Bathed in the cozy, warm glow of a nearby desk lamp at night. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 104. 氣炸檸檬魚排 — `air-fryer-lemon-fish-fillet.webp`

```text
A highly appetizing, flaky Taiwanese air-fried white fish fillet, single-serving size. The fish fillet has a golden-brown seasoned crust, garnished with bright yellow lemon wheels, a sprinkle of fresh green dill, and served alongside bright green blanched broccoli florets. Composition: served on a minimalist white oval porcelain plate resting near a frosted kitchen window. Soft, cool diffused morning daylight highlights the fresh colors of the fish and greens, captured from a three-quarter side view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 105. 氣炸蒜香蝦仁 — `air-fryer-garlic-shrimp.webp`

```text
Plump, succulent Taiwanese air-fried garlic shrimp, single-serving size. The pink-orange shrimp are cooked to perfection, glistening with a light garlic butter oil, and speckled with minced golden garlic bits, red chili flakes, and chopped fresh parsley. Composition: arranged beautifully in a shallow pastel-blue ceramic plate on a clean, light marble kitchen island. Bright, neutral midday light illuminates the scene, capturing the glossy textures from a medium close-up angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 106. 氣炸酥炸豆腐丁 — `air-fryer-crispy-tofu-cubes.webp`

```text
A highly appetizing plate of Taiwanese air-fried crispy tofu cubes, single-serving size. Features perfectly cubed, golden-brown tofu with a crispy outer shell and a tender, soft white interior, garnished with a sprinkle of fresh green chopped scallions. Composition: served on a rustic round wooden serving board next to a small ceramic dipping dish of savory dark soy sauce. Bathed in warm, cozy kitchen tungsten lighting, captured from a dynamic diagonal angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 107. 氣炸奶油玉米 — `air-fryer-butter-corn.webp`

```text
Mouth-watering Taiwanese air-fried butter corn segments, single-serving size. The bright yellow sweet corn wheels are coated in a glossy, melted butter glaze, showing beautiful light charred grill marks and a sprinkle of black pepper. Composition: served in a rustic, vintage white enamel pan resting on a green-and-white checkered cotton cloth. Bright, sunny midday light streams across the table, captured from an overhead three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 108. 氣炸蒜香秋葵 — `air-fryer-garlic-okra.webp`

```text
A vibrant plate of Taiwanese air-fried garlic okra, single-serving size. Features tender, whole bright green okra pods roasted with a light sheen of garlic oil and topped with toasted, crispy garlic slices and sesame seeds. Composition: arranged neatly on a dark slate plate placed on a compact, modern rental-kitchen counter. Soft, warm side lighting highlights the green textures of the okra, captured from a close-up three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 109. 氣炸醬油雞翅 — `air-fryer-soy-chicken-wings.webp`

```text
Highly appetizing, soy-marinated air-fried chicken wings, single-serving size. Features four golden-brown, glossy chicken wings with a crispy, caramelized soy-glaze skin, lightly speckled with toasted white sesame seeds. Composition: stacked neatly on a rustic brown stoneware plate at a small wooden dining table. Bathed in the warm, inviting amber glow of a dining table lamp, with subtle steam rising, captured from a dynamic low angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 110. 氣炸蒜香菇類 — `air-fryer-garlic-mushrooms.webp`

```text
A highly appetizing dish of Taiwanese air-fried garlic mixed mushrooms, single-serving size. Glistening, juicy button mushrooms and shiitake mushroom slices are roasted with garlic-infused olive oil, seasoned with sea salt and cracked black pepper. Composition: served hot in a shallow, black cast-iron dish resting on a round cork trivet on a kitchen counter. Warm, cozy under-cabinet lighting creates a soft atmosphere, captured from a three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 10 分鐘料理（111~120）

#### 111. 蔥油乾麵 — `scallion-oil-dry-noodles.webp`

```text
A simple yet highly appetizing bowl of Taiwanese scallion oil dry noodles, single-serving size. Glossy, thin wheat noodles are beautifully tossed in a savory brown scallion sauce and topped with a generous heap of crispy, dark fried scallion shreds. Composition: served in a deep, textured blue ceramic bowl with a pair of dark wooden chopsticks resting on the rim. Soft morning window light illuminates the scene from the left, captured from a slight overhead three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 112. 蛋蔥油麵 — `egg-scallion-oil-noodles.webp`

```text
A highly appetizing bowl of Taiwanese scallion oil noodles topped with a fried egg, single-serving size. The glossy noodles are crowned with a perfectly fried egg showing a runny, golden yolk ready to break over the noodles, sprinkled with fresh green scallion rings. Composition: set on a compact rental-apartment kitchen counter at night under the warm, cozy glow of a desk lamp, close-up hero bowl filling the frame. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 113. 奶油蒜香泡麵 — `butter-garlic-instant-noodles.webp`

```text
A comforting, late-night bowl of Taiwanese butter garlic instant noodles, single-serving size. Silky, curly instant noodles are coated in a rich, glossy melted butter and soy sauce glaze, mixed with minced garlic and red chili slices. Composition: presented directly in a small, well-used frying pan resting on a cork mat, cozy late-night kitchen setting with subtle steam rising, captured from a three-quarter side angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 114. 快速泡菜炒飯 — `quick-kimchi-fried-rice.webp`

```text
A highly appetizing plate of Taiwanese quick kimchi fried rice, single-serving size. Fluffy grains of rice are colored vibrant orange-red, tossed with spicy kimchi pieces, scrambled egg curds, and green onions, topped with a fried egg. Composition: served in a simple round ceramic plate on a grey speckled kitchen countertop during lunch. Bright, natural midday window daylight highlights the rich textures, captured from a three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 115. 一人麻醬涼麵 — `sesame-cold-noodles-solo.webp`

```text
A refreshing plate of Taiwanese sesame cold noodles for one person, single-serving size. Chilled yellow noodles are drizzled with a thick, creamy brown sesame peanut sauce and topped with a neat pile of fresh, crisp green cucumber shreds. Composition: served in a wide, shallow glass bowl resting on a light wood dining table. Bright, airy summer daylight filters in, creating a cool and clean lunch atmosphere, captured from a top-down angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 116. 味噌蛋花湯 — `instant-miso-egg-soup.webp`

```text
A warm, comforting bowl of Japanese-style instant miso egg drop soup, single-serving size. Silky, wispy golden egg ribbons and soft white tofu cubes float in a rich, warm amber miso broth, garnished with fresh green scallion rings. Composition: served in a dark, textured handmade ceramic bowl on a knitted woolen coaster near a frosted window on a winter afternoon, with gentle curls of steam rising. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 117. 鮪魚罐頭飯 — `canned-tuna-rice-bowl.webp`

```text
A highly appealing, simple Taiwanese canned tuna rice bowl, single-serving size. Fluffy steamed white rice is topped with savory canned tuna mixed with a drizzle of sweet mayonnaise, golden corn kernels, and a sprinkle of black sesame seeds. Composition: served in a simple white ceramic rice bowl on a tidy student study desk. Natural daytime indoor light creates a calm, practical lunch atmosphere, captured from a three-quarter eye-level view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 118. 菜脯蛋飯 — `quick-pickled-cucumber-egg-rice.webp`

```text
A comforting bowl of Taiwanese preserved radish egg over rice, single-serving size. Features a thick slice of golden-brown egg omelet studded with savory, crunchy diced preserved radish, laid over a steaming bowl of white rice. Composition: served in a deep, retro ceramic rice bowl placed on a red lacquer tray. Warm, nostalgic kitchen light casts soft shadows from the side, creating a cozy homestyle dinner mood. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 119. 電子鍋蒸蛋蓋飯 — `microwave-steamed-egg-rice.webp`

```text
A highly appetizing bowl of silky steamed egg custard over rice, single-serving size. Features a smooth, pudding-like steamed egg with a glossy, light brown soy sauce glaze and chopped green scallions, resting on steamed rice. Composition: served in a light ceramic bowl, with a soft-focus kitchen microwave in the background. Bright, clean morning daylight highlights the glossy egg custard surface, captured close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 120. 十分鐘烏龍麵湯 — `ten-minute-udon-soup.webp`

```text
A comforting bowl of ten-minute udon noodle soup, single-serving size. Thick, chewy white udon noodles are submerged in a clear dashi broth, topped with sliced narutomaki (fish cake), green scallions, and a soft egg drop. Composition: served in a deep ceramic soup bowl on a dark wooden table. Soft, cool daylight from a rainy-day window illuminates curls of rising steam, captured from a three-quarter overhead view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 冰箱清庫存（121~128）

#### 121. 綜合蔬菜炒飯 — `leftover-mixed-veggie-fried-rice.webp`

```text
A colorful, appetizing bowl of Taiwanese mixed vegetable fried rice, single-serving size. Fluffy grains of rice are tossed with gold scrambled egg curds, sweet corn, green peas, and finely diced red carrots and cabbage. Composition: served in a simple round white plate with the soft-focus silhouette of an open refrigerator door in the background. Bright, natural kitchen window light highlights the fresh colors. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 122. 豆腐蔬菜清湯 — `clearout-tofu-veggie-soup.webp`

```text
A highly appetizing, wholesome bowl of clear tofu vegetable soup, single-serving size. Soft white tofu cubes, sweet green cabbage ribbons, and orange carrot slices simmer in a light, clear vegetable broth. Composition: served in a clear glass soup bowl on a light-colored tiled kitchen counter. Soft morning window light illuminates the scene, with gentle steam curls rising from the hot soup. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 123. 豬肉青椒快炒 — `leftover-meat-quick-stirfry.webp`

```text
A highly appetizing plate of Taiwanese stir-fried pork and green pepper, single-serving size. Tender, juicy slices of pork are sautéed with crisp green bell pepper strips and thin garlic slices, with a glossy wok-hei sheen. Composition: just plated on a dark grey slate placemat next to a wooden spoon. Warm tungsten kitchen light blends with soft window daylight, showing subtle steam, captured from a diagonal angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 124. 雜菜雞蛋煎餅 — `random-veggie-egg-pancake.webp`

```text
A highly appealing Taiwanese mixed vegetable egg pancake, single-serving size. A thick, golden-brown pan-fried egg cake is loaded with shredded cabbage, carrot strips, and green scallions, cut into neat wedges. Composition: served directly on a small seasoned cast-iron skillet resting on a rustic wood dining table. Bright, warm weekend morning sunlight streams in, highlighting the crispy pancake edges. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 125. 什錦蔬菜湯麵 — `fridge-bottom-soup-noodles.webp`

```text
A comforting, simple bowl of Taiwanese fridge-clearance soup noodles, single-serving size. Wheat noodles in a clear, hot broth are topped with a few fresh green vegetable leaves and a soft, silky egg drop. Composition: served in a deep ceramic noodle bowl on a small apartment dining table under the soft, warm glow of a hanging dining lamp, close-up three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 126. 米飯蛋煎餅 — `leftover-rice-egg-pancake.webp`

```text
A highly appetizing Taiwanese leftover rice egg pancake, single-serving size. Features a golden, pan-fried flat cake made of cooked rice mixed with scrambled egg and green scallions, showing delicious crispy, toasted edges. Composition: served on a round nonstick pan with a wooden spatula resting nearby on a light tiled kitchen counter. Bright morning daylight illuminates the crunchy textures. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 127. 家常蛋炒飯 — `clearout-veggie-egg-fried-rice.webp`

```text
A highly appetizing bowl of Taiwanese vegetable egg fried rice, single-serving size. Fluffy grains of rice are tossed with golden egg curds, sweet corn kernels, onion bits, and green peas, garnished with fresh scallions. Composition: served on a shallow ceramic plate on a wooden lunch tray. Bright, neutral office-lunch daylight highlights the colorful ingredients, captured from a three-quarter eye-level view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 128. 蛋花鹹粥 — `mixed-leftover-congee.webp`

```text
A warm, comforting bowl of Taiwanese savory egg and tofu congee, single-serving size. Creamy, thick white rice porridge is cooked with soft tofu cubes, golden egg drop ribbons, and a sprinkle of chopped green scallions. Composition: served in a deep clay pot bowl resting on a woven straw mat on a wooden table. Soft warm indoor lighting on a rainy evening creates a cozy dining atmosphere. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 一人料理（129~135）

#### 129. 薑絲肉燥飯 — `solo-ginger-pork-rice.webp`

```text
A highly appetizing bowl of Taiwanese ginger pork mince over rice, single-serving size. Savory, seasoned minced pork is slow-cooked in soy sauce and topped with a generous garnish of thin, fresh yellow ginger shreds over fluffy steamed white rice. Composition: served in a high-rimmed ceramic bowl on a dark bamboo table runner. Warm dinner table lighting creates a cozy homestyle feel, captured from a three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 130. 三杯雞蓋飯 — `solo-three-cup-chicken-rice.webp`

```text
A mouth-watering bowl of Taiwanese three-cup chicken over rice, single-serving size. Tender chicken chunks are braised in a dark, glossy glaze of sesame oil, soy sauce, and rice wine, garnished with fresh green basil leaves, served over hot steamed rice. Composition: served in a small black clay pot bowl resting on a dark wooden table. Warm amber evening lighting creates a rich, cozy atmosphere, captured close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 131. 麻婆豆腐蓋飯 — `solo-mapo-tofu-rice-bowl.webp`

```text
A highly appetizing, spicy Taiwanese mapo tofu rice bowl, single-serving size. Cubes of soft white tofu and minced pork are simmered in a glossy, vibrant red chili bean sauce with a glistening chili oil sheen, poured over steamed white rice. Composition: served in a deep ceramic bowl under warm kitchen side lighting, capturing the rich red color and spices from a close-up three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 132. 煎豬排蓋飯 — `solo-pan-fried-pork-cutlet-rice.webp`

```text
A highly appealing Taiwanese pan-fried pork cutlet rice bowl (Katsudon style), single-serving size. Slices of golden-brown pan-fried pork cutlet are simmered with sweet caramelized onions and a soft-cooked egg mixture, served over steamed rice. Composition: served in a wide, shallow ceramic bowl on a rustic weekend dining table. Bright, natural midday window daylight creates a clean and satisfying dining scene. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 133. 滷肉飯一人份 — `solo-lu-rou-rice.webp`

```text
A classic, mouth-watering bowl of Taiwanese braised pork rice (Lu Rou Fan) for one person. Rich, hand-cut pork belly cubes are slow-cooked to a dark, glossy soy-sauce glaze and spooned generously over steaming white rice, garnished with a slice of yellow pickled radish. Composition: served in a traditional blue-and-white patterned ceramic bowl on a red lacquer tray. Warm, nostalgic kitchen light highlights the glossy pork. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 134. 芝麻雞蓋飯 — `solo-sesame-chicken-rice.webp`

```text
A highly appetizing Taiwanese sesame chicken over rice, single-serving size. Features tender, juicy sliced chicken breast sautéed in aromatic sesame oil with ginger slices, garnished with toasted white sesame seeds over fluffy steamed rice. Composition: served on a clean modern white ceramic plate on a light-colored countertop. Bright, fresh morning daylight highlights the healthy textures, captured from a clean three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 135. 蠔油牛肉蓋飯 — `solo-oyster-sauce-beef-rice.webp`

```text
A highly tempting bowl of Taiwanese oyster sauce beef over rice, single-serving size. Tender, thinly sliced beef and sweet yellow onion ribbons are coated in a rich, glossy savory oyster sauce, served over a steaming bed of white rice. Composition: served in a deep bowl on a diner-style wooden counter. Warm amber lighting highlights the steam rising from the hot beef, captured from a dynamic close-up angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 便當菜（136~140）

#### 136. 便當薑炒雞肉 — `bento-ginger-chicken.webp`

```text
An appetizing meal-prep portion of Taiwanese bento ginger chicken. Features tender chicken breast slices sautéed with fresh ginger shreds and soy sauce, arranged neatly inside a section of a bento box next to white rice and carrots. Composition: served inside a wooden two-tier bento box resting on a clean study desk. Bright weekday lunch window daylight illuminates the partitioned meal, captured from a top-down view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 137. 便當蜜汁滷肉 — `bento-honey-soy-pork.webp`

```text
A highly appealing meal-prep portion of Taiwanese honey soy braised pork. Features glossy, slow-cooked minced pork belly in a rich, dark sweet soy sauce glaze, arranged neatly in a bento compartment. Composition: served in a clear glass meal-prep container resting on a modern kitchen counter. Bright, clean Sunday afternoon daylight suggests a meal-prep session, captured from a three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 138. 便當炒高麗菜 — `bento-stir-fried-cabbage.webp`

```text
A highly appetizing bento side dish of Taiwanese stir-fried cabbage. Features glossy, bright green cabbage ribbons cooked with garlic bits and carrot slices, arranged neatly in a compartment of a bento box. Composition: served in a stainless steel bento compartment on a linen kitchen cloth. Soft, natural side light highlights the fresh, crunchy vegetable textures, close-up view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 139. 便當黑椒牛肉 — `bento-black-pepper-beef.webp`

```text
A highly appetizing meal-prep portion of Taiwanese bento black pepper beef. Features tender beef strips sautéed with green bell peppers and yellow onions in a rich, glossy black pepper sauce, arranged in a bento compartment. Composition: served in a divided wooden bento tray with a pair of chopsticks resting beside it. Neutral office-overhead light creates a professional lunch vibe. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 140. 便當滷蛋豆腐 — `bento-braised-tofu-egg.webp`

```text
A savory meal-prep portion of Taiwanese bento braised tofu and egg. Features cubes of firm soy-braised tofu and a halved soy-marinated hard-boiled egg with a dark golden yolk, arranged neatly in a bento box compartment. Composition: served in a square glass food container on a wooden kitchen counter. Warm afternoon meal-prep light highlights the rich colors, captured from a clean three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 高蛋白／減脂（141~147）

#### 141. 高蛋白雞肉青花碗 — `high-protein-chicken-broccoli-bowl.webp`

```text
A highly appetizing, healthy high-protein chicken broccoli bowl, single-serving size. Features tender, juicy slices of grilled chicken breast arranged beside vibrant green steamed broccoli florets and a scoop of brown rice. Composition: served in a clean white ceramic bowl resting on a modern kitchen counter. Bright, fitness-friendly daylight illuminates the balanced meal, captured from a clean three-quarter overhead angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 142. 高蛋白蝦豆腐碗 — `high-protein-shrimp-tofu-bowl.webp`

```text
A highly appealing, clean high-protein shrimp and tofu bowl, single-serving size. Plump steamed pink-orange shrimp are arranged beside seared soft tofu cubes and green peas, drizzled with a light soy glaze. Composition: served on a minimalist white ceramic plate on a clean kitchen island counter. Cool, crisp morning daylight highlights the healthy textures and fresh colors. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 143. 高蛋白豆腐排 — `high-protein-tofu-steak-plate.webp`

```text
A mouth-watering high-protein pan-seared tofu steak, single-serving size. Features a thick, golden-brown tofu cutlet glazed with a light, savory teriyaki soy sauce, garnished with white sesame seeds and served with steamed broccoli. Composition: served on a rectangular white ceramic plate on a light wood tabletop. Soft side light highlights the glazed tofu texture, showing a clean vegetarian dining aesthetic. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 144. 高蛋白蛋白炒 — `high-protein-egg-white-stirfry.webp`

```text
A highly appetizing, low-fat egg white stir-fry, single-serving size. Features fluffy, cloud-like white egg curds scrambled with crunchy cucumber dice and sweet green peas, seasoned lightly with white pepper. Composition: served on a light pastel ceramic plate on a clean kitchen counter. Airy, minimal composition under bright, cool morning window light creates a fresh dining mood. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 145. 減脂櫛瓜雞肉 — `weight-loss-zucchini-chicken.webp`

```text
A fresh and appetizing weight-loss zucchini chicken stir-fry, single-serving size. Features tender, lean chicken breast slices sautéed with crisp, green-and-white zucchini half-moons and minced garlic in a light sauce. Composition: served on a white porcelain plate with plenty of negative space, resting near a window. Bright, clean natural daylight highlights the fresh ingredients. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 146. 減脂鮮蝦沙拉 — `weight-loss-shrimp-veg-salad.webp`

```text
A vibrant, colorful weight-loss shrimp and vegetable salad, single-serving size. Plump steamed shrimp are tossed with crisp green cucumber slices, cherry tomato halves, and mixed salad greens, drizzled with a light lemon vinaigrette. Composition: served in a large ceramic salad bowl on a light bamboo table mat. Bright summer afternoon window light highlights the fresh colors, captured from a top-down angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 147. 減脂菇類清湯 — `weight-loss-clear-mushroom-soup.webp`

```text
A comforting, light bowl of weight-loss clear mushroom soup, single-serving size. Features sliced fresh shiitake, enoki, and button mushrooms floating in a light, clear broth garnished with chopped green scallions. Composition: served in a simple, rustic ceramic soup bowl on a quiet evening table under soft, warm light. Gentle steam curls rise from the hot soup, captured close-up. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 省錢料理（148~150）

#### 148. 省錢蛋炒飯 — `budget-simple-egg-fried-rice.webp`

```text
A highly appetizing, simple budget egg fried rice, single-serving size. Fluffy grains of rice are tossed to a beautiful golden color with scrambled eggs and finely chopped green onions, with minimal yet perfect seasoning. Composition: served in a well-used stoneware bowl on a student rental-apartment wooden table. Humble, warm lighting creates an honest and comforting close-up view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 149. 省錢豆腐蓋飯 — `budget-tofu-rice-bowl.webp`

```text
A highly appealing, economical budget tofu rice bowl, single-serving size. Slices of pan-fried firm tofu with golden edges are glazed with a savory soy sauce and arranged over a warm bed of steamed white rice. Composition: served in a deep ceramic bowl on a budget-friendly grey laminate countertop. Practical, bright noon window light highlights the meal, captured from a straightforward three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 150. 省錢高麗菜麵 — `budget-cabbage-noodle-soup.webp`

```text
A comforting, economical bowl of budget cabbage noodle soup, single-serving size. Wheat noodles are served in a hot savory broth, topped with plenty of soft, sweet cabbage ribbons and a sprinkle of chopped green scallions. Composition: served in a large ceramic soup bowl on a simple wooden table. Cozy dinner lamp glow casts a warm light on the steam rising from the bowl. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

---

## 待新增（101~150）純文字條列

101. 氣炸蒜香豬排
102. 氣炸蜜蕃薯
103. 氣炸台式雞塊
104. 氣炸檸檬魚排
105. 氣炸蒜香蝦仁
106. 氣炸酥炸豆腐丁
107. 氣炸奶油玉米
108. 氣炸蒜香秋葵
109. 氣炸醬油雞翅
110. 氣炸蒜香菇類
111. 蔥油乾麵
112. 蛋蔥油麵
113. 奶油蒜香泡麵
114. 快速泡菜炒飯
115. 一人麻醬涼麵
116. 味噌蛋花湯
117. 鮪魚罐頭飯
118. 菜脯蛋飯
119. 電子鍋蒸蛋蓋飯
120. 十分鐘烏龍麵湯
121. 綜合蔬菜炒飯
122. 豆腐蔬菜清湯
123. 豬肉青椒快炒
124. 雜菜雞蛋煎餅
125. 什錦蔬菜湯麵
126. 米飯蛋煎餅
127. 家常蛋炒飯
128. 蛋花鹹粥
129. 薑絲肉燥飯
130. 三杯雞蓋飯
131. 麻婆豆腐蓋飯
132. 煎豬排蓋飯
133. 滷肉飯一人份
134. 芝麻雞蓋飯
135. 蠔油牛肉蓋飯
136. 便當薑炒雞肉
137. 便當蜜汁滷肉
138. 便當炒高麗菜
139. 便當黑椒牛肉
140. 便當滷蛋豆腐
141. 高蛋白雞肉青花碗
142. 高蛋白蝦豆腐碗
143. 高蛋白豆腐排
144. 高蛋白蛋白炒
145. 減脂櫛瓜雞肉
146. 減脂鮮蝦沙拉
147. 減脂菇類清湯
148. 省錢蛋炒飯
149. 省錢豆腐蓋飯
150. 省錢高麗菜麵