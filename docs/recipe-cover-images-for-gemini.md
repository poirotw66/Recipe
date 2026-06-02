# 食譜成品圖繪製清單（給 Gemini）

本站目前內容庫收錄 **50 篇**食譜（既有 12 篇 + 待補 38 篇）。請依下表各產出一張成品圖；圖檔放入 `public/images/recipes/` 後，更新對應 Markdown 的 `coverImage` 為 `.webp` 路徑。

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

上線後每篇食譜 frontmatter：`coverImage: "/images/recipes/{檔名}"`

---

## Prompt 風格尾段（每道食譜都接上）

> **場景與構圖寫在各食譜段落內**；以下只統一畫風與輸出限制，不要每張都複製同一套木桌／窗光／水杯／布巾。

```text
Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 構圖變化對照（給批次產圖時參考）

| # | 食譜 | 場景／角度／光線（摘要） |
| --- | --- | --- |
| 1 | 番茄雞蛋飯 | 木桌靠窗、側光、水杯與布巾（原始範例） |
| 2 | 蔥蛋拌飯 | 小廚房檯面、筷子搁碗沿、略俯視 |
| 3 | 洋蔥滑蛋飯 | 夜晚餐桌、暖色檯燈、近景碗 |
| 4 | 胡蘿蔔雞胸飯 | 午餐托盤、斑點檯面、平視略側 |
| 5 | 高麗菜炒蛋 | 剛起鍋盛盤、深色石板墊、鍋鏟入畫 |
| 6 | 豆腐炒蛋 | 淺色磁磚檯面、晨光、圓瓷盤 |
| 7 | 青花菜菇菇炒蛋 | 竹托盤、正俯視、綠色食材對比 |
| 8 | 蒜香菇菇雞胸 | 爐邊鐵板／平底鍋感、蒸氣與暖光 |
| 9 | 高麗菜菇菇炊飯 | 陶碗／鍋飯感、編織餐墊、午後光斑 |
| 10 | 番茄豆腐湯 | 高湯碗、小圓凳／矮桌、側光與蒸氣 |
| 11 | 氣炸鮭魚青花菜 | 氣炸紙／烤盤邊、廚房中島、冷調對比 |
| 12 | 電鍋雞胸便當菜 | 打開便當盒、書桌午餐、俯視分格 |

---

## 食譜清單與檔名（12）

| # | 食譜名稱 | slug | 建議檔名 |
| --- | --- | --- | --- |
| 1 | 番茄雞蛋飯 | `tomato-egg-rice` | `tomato-egg-rice.webp` |
| 2 | 蔥蛋拌飯 | `scallion-egg-rice` | `scallion-egg-rice.webp` |
| 3 | 洋蔥滑蛋飯 | `onion-egg-rice-bowl` | `onion-egg-rice-bowl.webp` |
| 4 | 胡蘿蔔雞胸飯 | `carrot-chicken-rice-bowl` | `carrot-chicken-rice-bowl.webp` |
| 5 | 高麗菜炒蛋 | `cabbage-egg-stir-fry` | `cabbage-egg-stir-fry.webp` |
| 6 | 豆腐炒蛋 | `tofu-scrambled-eggs` | `tofu-scrambled-eggs.webp` |
| 7 | 青花菜菇菇炒蛋 | `broccoli-mushroom-egg` | `broccoli-mushroom-egg.webp` |
| 8 | 蒜香菇菇雞胸 | `garlic-mushroom-chicken` | `garlic-mushroom-chicken.webp` |
| 9 | 高麗菜菇菇炊飯 | `cabbage-mushroom-rice` | `cabbage-mushroom-rice.webp` |
| 10 | 番茄豆腐湯 | `tomato-tofu-soup` | `tomato-tofu-soup.webp` |
| 11 | 氣炸鮭魚青花菜 | `air-fryer-salmon-broccoli` | `air-fryer-salmon-broccoli.webp` |
| 12 | 電鍋雞胸便當菜 | `steamed-chicken-bento` | `steamed-chicken-bento.webp` |

---

## 各食譜完整 Prompt（複製到 Gemini）

> 每段 = **料理描述** + **獨立場景構圖** + **風格尾段**。第 1 道保留你提供的窗邊木桌範例；其餘 11 道場景各異。

### 1. 番茄雞蛋飯 — `tomato-egg-rice.webp`

```text
A delicious plate of Taiwanese tomato scrambled egg over rice, single-serving size. The dish is placed on a textured wooden table next to a window, with a simple water cup and a folded cloth nearby. Colored pencil and watercolor illustration style, warm and cozy atmosphere, soft window light, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Minimalist background, no text, no watermark, 4:3 aspect ratio.
```

### 2. 蔥蛋拌飯 — `scallion-egg-rice.webp`

```text
A delicious bowl of Taiwanese scallion egg mixed with steamed rice, single-serving size, with visible green scallions and golden scrambled egg. Composition: compact home kitchen counter, chopsticks resting on the bowl rim, slight three-quarter overhead angle, soft morning daylight from the left. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 3. 洋蔥滑蛋飯 — `onion-egg-rice-bowl.webp`

```text
A delicious bowl of Taiwanese silky onion and soft scrambled egg over steamed rice, single-serving size, with translucent caramelized onion strands. Composition: small dining table at night, warm desk-lamp glow, close-up hero bowl filling most of the frame, shallow depth of field, cozy rental-room mood. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 4. 胡蘿蔔雞胸飯 — `carrot-chicken-rice-bowl.webp`

```text
A delicious bowl of Taiwanese carrot and chicken breast over steamed rice, single-serving size, with tender chicken pieces and bright orange carrot slices. Composition: lunch tray on a speckled laminate countertop, eye-level side view, bright neutral daylight, a fork placed beside the tray (no logos). Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 5. 高麗菜炒蛋 — `cabbage-egg-stir-fry.webp`

```text
A delicious plate of Taiwanese stir-fried cabbage with fluffy scrambled eggs, single-serving size, lightly glossy from the wok. Composition: just-plated on a dark slate placemat, a wooden spatula partly in frame, subtle wok-hei steam, dynamic slight diagonal angle, warm kitchen tungsten mixed with window fill light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 6. 豆腐炒蛋 — `tofu-scrambled-eggs.webp`

```text
A delicious plate of Taiwanese soft tofu with scrambled eggs, single-serving size, with cubed tofu and golden egg curds. Composition: round ceramic plate on a pale tiled kitchen counter, fresh early-morning cool daylight, simple and airy framing with negative space on the right. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 7. 青花菜菇菇炒蛋 — `broccoli-mushroom-egg.webp`

```text
A delicious plate of Taiwanese broccoli and mushroom stir-fry with scrambled eggs, single-serving size, with green broccoli florets and sliced mushrooms. Composition: centered on a bamboo serving tray, straight top-down view, crisp color contrast between greens and eggs, soft diffused daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 8. 蒜香菇菇雞胸 — `garlic-mushroom-chicken.webp`

```text
A delicious plate of Taiwanese garlic mushroom chicken breast, single-serving size, with sliced chicken, mushrooms, and visible garlic aroma cues. Composition: served hot beside a stovetop (softly blurred), shallow sizzling pan impression, rising steam, warm amber kitchen light, medium close-up at a low angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 9. 高麗菜菇菇炊飯 — `cabbage-mushroom-rice.webp`

```text
A delicious bowl of Taiwanese cabbage and mushroom rice, single-serving size, with fluffy rice mixed with tender cabbage and mushrooms. Composition: rustic clay bowl on a woven placemat, afternoon sun patch on the table, gentle long shadows, calm homestyle mood, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 10. 番茄豆腐湯 — `tomato-tofu-soup.webp`

```text
A delicious bowl of Taiwanese tomato and soft tofu soup, single-serving size, with red tomato broth, tofu cubes, and visible steam. Composition: deep soup bowl on a low round wooden side table, cool rainy-day side light from a frosted window, steam curls upward, spoon leaning against the bowl (no text on spoon). Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 11. 氣炸鮭魚青花菜 — `air-fryer-salmon-broccoli.webp`

```text
A delicious plate of Taiwanese air-fried salmon with broccoli, single-serving size, with golden-edged salmon fillet and bright green broccoli florets. Composition: parchment-lined tray edge on a light kitchen island stone surface, slightly cooler color temperature, crisp highlights on salmon skin, modern small-apartment kitchen feel, 45-degree angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 12. 電鍋雞胸便當菜 — `steamed-chicken-bento.webp`

```text
A delicious Taiwanese electric-pot steamed chicken bento for one person, with sliced chicken breast, simple vegetables, and steamed rice in neat compartments. Composition: open bento box on a work desk, soft overhead office-lunch lighting, top-down view showing divided sections, blurred notebook edge in the corner (no readable text). Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

---

## 圖片進度狀態

- ✅ **已完成（前 35 篇）**：1 ~ 35
- 🟡 **待新增（後 15 篇）**：36 ~ 50

---

## 已完成（1~35）純文字條列

1. 番茄雞蛋飯  
2. 蔥蛋拌飯  
3. 洋蔥滑蛋飯  
4. 胡蘿蔔雞胸飯  
5. 高麗菜炒蛋  
6. 豆腐炒蛋  
7. 青花菜菇菇炒蛋  
8. 蒜香菇菇雞胸  
9. 高麗菜菇菇炊飯  
10. 番茄豆腐湯  
11. 氣炸鮭魚青花菜  
12. 電鍋雞胸便當菜  
13. 蒜香番茄豆腐炒蛋  
14. 高麗菜洋蔥炒蛋  
15. 菇菇青蔥滑蛋  
16. 蒜頭高麗菜豆腐煮  
17. 洋蔥番茄蛋炒飯  
18. 青蔥雞胸拌飯  
19. 菇菇高麗菜燴飯  
20. 氣炸蒜香雞胸佐青花菜  
21. 番茄洋蔥豆腐湯  
22. 電鍋青花菜雞胸便當菜  
23. 麻油洋蔥雞胸拌飯  
24. 番茄青花菜蛋炒飯  
25. 蒜香菇豆腐拌飯  
26. 高麗菜胡蘿蔔雞胸飯  
27. 醬香蒜煎雞胸  
28. 洋蔥香煎鮭魚排  
29. 氣炸豆腐菇菇主菜  
30. 高麗菜豆腐蛋花湯  
31. 青花菜洋蔥雞湯  
32. 電鍋菇菇雞胸便當菜  
33. 蒜香蛋炒高麗菜便當菜  
34. 番茄洋蔥滑蛋  
35. 豆腐高麗菜菇菇炒  

---

## 待新增 10 篇 Gemini Prompt（13~22）

> 格式與前 12 篇一致：**料理描述 + 獨立場景構圖 + 風格尾段**。

### 13. 蒜香番茄豆腐炒蛋 — `garlic-tomato-tofu-eggs.webp`

```text
A highly appetizing plate of Taiwanese garlic tomato tofu scrambled eggs, single-serving size, featuring delicate cubes of soft white tofu, juicy red tomato chunks, and fluffy golden egg curds cooked with minced garlic. Composition: served in a rustic shallow pan just off the stove, warm kitchen evening light from the side, with gentle rising steam. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 14. 高麗菜洋蔥炒蛋 — `cabbage-onion-eggs.webp`

```text
A highly appetizing plate of Taiwanese stir-fried cabbage and onion with eggs, single-serving size, with crisp glossy cabbage ribbons, sweet caramelized onion strands, and fluffy golden egg curds. Composition: served on a matte ceramic plate on a light wood dining table, slight top-angled three-quarter view, natural bright noon light, chopsticks resting beside the plate. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 15. 菇菇青蔥滑蛋 — `mushroom-scallion-soft-eggs.webp`

```text
A highly appetizing plate of Taiwanese mushroom and scallion soft scrambled eggs, single-serving size, featuring sliced tender shiitake mushrooms and creamy, glossy half-set eggs sprinkled with vibrant green scallions. Composition: served on a simple round ceramic plate centered on a clean tiled kitchen counter, close-up view under soft morning side light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 16. 蒜頭高麗菜豆腐煮 — `garlic-cabbage-tofu-braise.webp`

```text
A highly appetizing bowl of Taiwanese garlic braised cabbage and tofu, single-serving size, with tender tofu blocks and sweet, translucent cabbage simmered in a savory broth with visible garlic cloves. Composition: served in a rustic ceramic bowl on a woven straw mat, three-quarter view under gentle afternoon window light, with a wooden spoon near the bowl edge. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 17. 洋蔥番茄蛋炒飯 — `onion-tomato-egg-fried-rice.webp`

```text
A highly appetizing bowl of Taiwanese onion tomato egg fried rice, single-serving size, with fluffy golden rice grains, soft egg ribbons, sweet caramelized onion bits, and juicy tomato chunks. Composition: served in a deep ceramic bowl on a dark slate-textured tabletop, 45-degree angle under late afternoon kitchen light, with a spoon resting on the side. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 18. 青蔥雞胸拌飯 — `scallion-chicken-rice-bowl.webp`

```text
A highly appetizing bowl of Taiwanese scallion chicken breast rice, single-serving size, featuring tender sliced chicken breast drizzled with a savory scallion oil sauce and garnished with plenty of fresh green scallions over fluffy steamed rice. Composition: simple lunch setup on a neutral tabletop, bowl centered with slight overhead three-quarter view, clean natural daylight from the right. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 19. 菇菇高麗菜燴飯 — `mushroom-cabbage-rice-bowl.webp`

```text
A highly appetizing bowl of Taiwanese mushroom cabbage rice bowl, single-serving size, with sautéed mushrooms and tender cabbage coated in a rich, glossy savory gravy poured over hot steamed rice. Composition: served in a broad ceramic bowl on a linen placemat, close-up eye-level view, soft indoor tungsten light blended with window fill light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 20. 氣炸蒜香雞胸佐青花菜 — `airfryer-garlic-chicken-broccoli.webp`

```text
A highly appetizing plate of Taiwanese air-fried garlic chicken breast with broccoli, single-serving size, featuring tender chicken breast cubes with golden-browned garlic edges and vibrant green broccoli florets. Composition: served on a plate next to a parchment-lined air fryer basket edge on a light-colored kitchen island stone surface, cool-neutral lighting with crisp highlights, diagonal composition. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 21. 番茄洋蔥豆腐湯 — `tomato-onion-tofu-soup.webp`

```text
A highly appetizing bowl of Taiwanese tomato onion tofu soup, single-serving size, featuring a clear reddish broth, soft white tofu cubes, and sweet tender onion slices. Composition: served in a deep ceramic soup bowl placed on a small round wooden side table, soft rainy-day window light, with gentle steam swirling upward. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 22. 電鍋青花菜雞胸便當菜 — `electricpot-broccoli-chicken-bento.webp`

```text
A highly appetizing Taiwanese electric-pot steamed chicken and broccoli bento, single-serving size, featuring sliced tender chicken breast, bright green broccoli florets, and sweet carrot coins arranged neatly. Composition: open wooden bento box on a clean work desk, top-down view showing partitioned compartments, soft overhead office light, practical weekday lunch vibe. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

---

## 待新增 13 篇 Gemini Prompt（23~35）

### 23. 麻油洋蔥雞胸拌飯 — `sesame-onion-chicken-rice-bowl.webp`

```text
A highly appetizing bowl of Taiwanese sesame-oil onion chicken breast rice, single-serving size, featuring sliced chicken breast and glossy caramelized onion strands cooked in fragrant sesame oil over a bowl of hot steamed rice. Composition: warm dinner table scene, three-quarter overhead angle, soft tungsten glow with a cozy blurred kitchen background. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 24. 番茄青花菜蛋炒飯 — `tomato-broccoli-egg-rice.webp`

```text
A highly appetizing bowl of Taiwanese tomato broccoli egg fried rice, single-serving size, with fluffy rice grains beautifully tossed with red tomato pieces, small green broccoli florets, and golden scrambled eggs. Composition: served in a rustic ceramic bowl on a pale stone tabletop, 45-degree top view, soft daylight from a nearby window. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 25. 蒜香菇豆腐拌飯 — `garlic-mushroom-tofu-rice-bowl.webp`

```text
A highly appetizing bowl of Taiwanese garlic mushroom tofu rice, single-serving size, with golden seared tofu cubes and savory sautéed mushrooms seasoned with garlic over fluffy steamed rice. Composition: served in a simple ceramic bowl on a linen cloth, close-up table-level framing, gentle afternoon light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 26. 高麗菜胡蘿蔔雞胸飯 — `cabbage-carrot-chicken-rice-bowl.webp`

```text
A highly appetizing bowl of Taiwanese cabbage carrot chicken breast rice, single-serving size, with sliced tender chicken breast, shredded sweet cabbage, and orange carrot strips over fluffy steamed rice. Composition: served in a large ceramic bowl on a lunch tray, side angle showing balanced colors, soft natural daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 27. 醬香蒜煎雞胸 — `soy-garlic-chicken-breast-pan.webp`

```text
A highly appetizing plate of Taiwanese soy garlic pan-seared chicken breast, single-serving size, featuring tender chicken breast slices coated in a glossy savory soy-garlic glaze with lightly charred edges. Composition: served on a dark ceramic plate on a rustic wooden table, close-up view under warm kitchen side light, with gentle steam. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 28. 洋蔥香煎鮭魚排 — `onion-salmon-pan-steak.webp`

```text
A highly appetizing plate of Taiwanese pan-seared salmon steak, single-serving size, with a golden-crisped salmon fillet topped with sweet, translucent caramelized onion ribbons. Composition: served on an elegant oval porcelain plate on a kitchen counter, diagonal composition showing crisp textures, cool-neutral daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 29. 氣炸豆腐菇菇主菜 — `airfryer-tofu-mushroom-main.webp`

```text
A highly appetizing plate of Taiwanese air-fried tofu and mushrooms, single-serving size, featuring golden-browned crispy tofu cubes and roasted savory mushrooms. Composition: served on a white square plate next to a small air fryer tray on a clean marble countertop, clean cool lighting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 30. 高麗菜豆腐蛋花湯 — `cabbage-tofu-egg-drop-soup.webp`

```text
A highly appetizing bowl of Taiwanese cabbage tofu egg drop soup, single-serving size, with silky yellow egg ribbons, soft white tofu cubes, and sweet green cabbage in a clear hot broth. Composition: served in a deep ceramic bowl on a small round wooden table, side light through a soft window curtain, with rising steam curls. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 31. 青花菜洋蔥雞湯 — `broccoli-onion-chicken-soup.webp`

```text
A highly appetizing bowl of Taiwanese broccoli onion chicken soup, single-serving size, with sliced chicken breast, vibrant green broccoli florets, and sweet onion slices in a clear golden broth. Composition: served in a large ceramic bowl on a wooden tabletop, bowl centered with a three-quarter overhead view, calm afternoon daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 32. 電鍋菇菇雞胸便當菜 — `electricpot-mushroom-chicken-bento.webp`

```text
A highly appetizing Taiwanese electric-pot steamed chicken and mushroom bento, single-serving size, featuring sliced tender chicken breast and sautéed mixed mushrooms arranged neatly with rice. Composition: open wooden bento container on a study desk, top-down framing showing clean partitioned compartments, soft overhead desk light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 33. 蒜香蛋炒高麗菜便當菜 — `garlic-egg-cabbage-bento-side.webp`

```text
A highly appetizing plate of Taiwanese garlic egg stir-fried cabbage bento side dish, small portion, featuring glossy green cabbage ribbons and fluffy scrambled eggs cooked with garlic. Composition: served in a small round side-dish plate next to a closed bento box, warm afternoon light, slight top angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 34. 番茄洋蔥滑蛋 — `tomato-onion-scrambled-eggs.webp`

```text
A highly appetizing plate of Taiwanese tomato onion soft scrambled eggs, single-serving size, featuring juicy red tomato chunks, sweet caramelized onions, and silky, creamy half-set eggs. Composition: served on a simple ceramic plate on a pale wooden dining table, close-up focus, natural morning side light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 35. 豆腐高麗菜菇菇炒 — `tofu-cabbage-mushroom-stirfry.webp`

```text
A highly appetizing plate of Taiwanese stir-fried tofu, cabbage, and mushrooms, single-serving size, with golden-edged seared tofu cubes, sweet cabbage ribbons, and savory sliced mushrooms. Composition: served on a home-style ceramic plate on a woven placemat, three-quarter view under warm evening side light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

---

## 待新增（36~50）

### 第四批待補圖（15）

| # | 食譜名稱 | slug | 建議檔名 |
| --- | --- | --- | --- |
| 36 | 洋蔥蒜香豆腐炒蛋 | `onion-garlic-tofu-eggs` | `onion-garlic-tofu-eggs.webp` |
| 37 | 番茄高麗菜滑蛋 | `tomato-cabbage-soft-eggs` | `tomato-cabbage-soft-eggs.webp` |
| 38 | 青蔥菇菇蛋煎盤 | `scallion-mushroom-egg-pan` | `scallion-mushroom-egg-pan.webp` |
| 39 | 青花菜豆腐蒜炒 | `broccoli-tofu-garlic-stirfry` | `broccoli-tofu-garlic-stirfry.webp` |
| 40 | 洋蔥高麗菜菇菇炒 | `onion-cabbage-mushroom-saute` | `onion-cabbage-mushroom-saute.webp` |
| 41 | 蒜香番茄雞胸飯 | `garlic-tomato-chicken-rice-bowl` | `garlic-tomato-chicken-rice-bowl.webp` |
| 42 | 豆腐蛋香拌飯 | `tofu-egg-savory-rice-bowl` | `tofu-egg-savory-rice-bowl.webp` |
| 43 | 青花菜菇菇雞胸飯 | `broccoli-mushroom-chicken-rice-bowl` | `broccoli-mushroom-chicken-rice-bowl.webp` |
| 44 | 蒜香豆腐雞胸主菜 | `garlic-tofu-chicken-pan-main` | `garlic-tofu-chicken-pan-main.webp` |
| 45 | 蒜香鮭魚青花菜主菜 | `salmon-broccoli-garlic-main` | `salmon-broccoli-garlic-main.webp` |
| 46 | 番茄蛋豆腐清湯 | `tomato-egg-tofu-light-soup` | `tomato-egg-tofu-light-soup.webp` |
| 47 | 高麗菜菇菇清湯 | `cabbage-mushroom-clear-soup` | `cabbage-mushroom-clear-soup.webp` |
| 48 | 電鍋豆腐蛋便當菜 | `electricpot-tofu-egg-bento-side` | `electricpot-tofu-egg-bento-side.webp` |
| 49 | 洋蔥胡蘿蔔炒蛋便當菜 | `onion-carrot-egg-bento-side` | `onion-carrot-egg-bento-side.webp` |
| 50 | 番茄蒜香高麗菜炒蛋 | `tomato-garlic-cabbage-eggs` | `tomato-garlic-cabbage-eggs.webp` |

## 待新增 15 篇 Gemini Prompt（36~50）

### 36. 洋蔥蒜香豆腐炒蛋 — `onion-garlic-tofu-eggs.webp`

```text
A highly appetizing plate of Taiwanese onion garlic tofu scrambled eggs, single-serving size, featuring soft white tofu cubes, sweet translucent onion strands, and fluffy golden egg curds. Composition: served on a simple ceramic plate with a floral pattern, resting on a clean green checkered tablecloth, close-up view from 45 degrees, soft morning window light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 37. 番茄高麗菜滑蛋 — `tomato-cabbage-soft-eggs.webp`

```text
A highly appetizing plate of Taiwanese tomato cabbage soft scrambled eggs, single-serving size, with juicy tomato chunks, tender sweet cabbage, and silky creamy eggs. Composition: served on a dark stoneware dish resting on a round rattan placemat, three-quarter view, cozy afternoon light casting soft shadows. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 38. 青蔥菇菇蛋煎盤 — `scallion-mushroom-egg-pan.webp`

```text
A highly appetizing Taiwanese scallion mushroom egg pan-fry, single-serving size, featuring savory sliced mushrooms and golden egg curds garnished with fresh green scallions. Composition: served directly in a small seasoned cast-iron skillet resting on a round cork trivet, rustic wooden kitchen tabletop background, close-up top-angled view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 39. 青花菜豆腐蒜炒 — `broccoli-tofu-garlic-stirfry.webp`

```text
A highly appetizing plate of Taiwanese stir-fried broccoli and tofu with garlic, single-serving size, featuring vibrant green broccoli florets and lightly seared soft tofu cubes. Composition: served on an octagonal white ceramic plate on a light green linen runner, three-quarter view, bright morning daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 40. 洋蔥高麗菜菇菇炒 — `onion-cabbage-mushroom-saute.webp`

```text
A highly appetizing plate of Taiwanese onion cabbage mushroom sauté, single-serving size, featuring glossy cabbage ribbons, sweet caramelized onion, and tender mushroom slices. Composition: served on a white oval plate on a dark wooden bar counter, cozy bar-counter lighting, close-up view with slight diagonal framing. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 41. 蒜香番茄雞胸飯 — `garlic-tomato-chicken-rice-bowl.webp`

```text
A highly appetizing bowl of Taiwanese garlic tomato chicken breast rice, single-serving size, featuring tender sliced chicken breast over fluffy steamed rice, glazed with a glossy garlic tomato sauce. Composition: served in a high-rimmed ceramic plate on a light bamboo table mat, three-quarter view, soft morning daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 42. 豆腐蛋香拌飯 — `tofu-egg-savory-rice-bowl.webp`

```text
A highly appetizing bowl of Taiwanese tofu egg savory rice, single-serving size, featuring soft white tofu cubes and a rich creamy egg mixture over steamed rice. Composition: served in a deep pottery bowl resting on a dark slate coaster, cozy evening mood with a soft warm side light, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 43. 青花菜菇菇雞胸飯 — `broccoli-mushroom-chicken-rice-bowl.webp`

```text
A highly appetizing bowl of Taiwanese broccoli mushroom chicken breast rice, single-serving size, with sliced tender chicken breast, sautéed mushroom slices, and vibrant green broccoli over steamed rice. Composition: served in a clean modern ceramic bowl, top-right light source, neat and tidy plating showing balanced color contrast. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 44. 蒜香豆腐雞胸主菜 — `garlic-tofu-chicken-pan-main.webp`

```text
A highly appetizing plate of Taiwanese garlic tofu chicken breast, single-serving size, featuring seared golden tofu cubes and juicy sautéed chicken breast chunks. Composition: served on a round wooden serving board on a clean kitchen island counter, bright neutral daylight, overhead perspective. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 45. 蒜香鮭魚青花菜主菜 — `salmon-broccoli-garlic-main.webp`

```text
A highly appetizing plate of Taiwanese garlic salmon and broccoli, single-serving size, featuring a pan-seared salmon fillet with a golden-crisped skin and vibrant green broccoli florets. Composition: served in a shallow white porcelain bowl on a rustic wooden dining table, warm ambient evening light, three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 46. 番茄蛋豆腐清湯 — `tomato-egg-tofu-light-soup.webp`

```text
A highly appetizing bowl of Taiwanese tomato egg tofu light soup, single-serving size, with delicate golden egg ribbons, soft white tofu cubes, and tomato slices in a clear red broth. Composition: served in a rustic ceramic soup tureen with a soup ladle resting nearby on a wooden kitchen counter, warm afternoon light beams. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 47. 高麗菜菇菇清湯 — `cabbage-mushroom-clear-soup.webp`

```text
A highly appetizing bowl of Taiwanese cabbage mushroom clear soup, single-serving size, with tender sweet cabbage pieces and sliced shiitake mushrooms in a light clear broth. Composition: served in a rustic ceramic bowl on a sturdy wood table mat, close-up top-angled view, soft morning daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 48. 電鍋豆腐蛋便當菜 — `electricpot-tofu-egg-bento-side.webp`

```text
A highly appetizing Taiwanese electric-pot steamed tofu-egg bento side dish, single-serving portion, featuring soft and savory tofu-egg custard cut into neat square portions. Composition: served in a small square glass meal-prep container on a wooden kitchen counter, side view under natural window daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 49. 洋蔥胡蘿蔔炒蛋便當菜 — `onion-carrot-egg-bento-side.webp`

```text
A highly appetizing plate of Taiwanese onion carrot scrambled egg bento side dish, small portion, with sweet caramelized onion strands, bright orange carrot strips, and fluffy scrambled eggs. Composition: served in a small round stainless-steel bento compartment on a linen kitchen cloth, natural soft light, close-up three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 50. 番茄蒜香高麗菜炒蛋 — `tomato-garlic-cabbage-eggs.webp`

```text
A highly appetizing plate of Taiwanese tomato garlic cabbage scrambled eggs, single-serving size, with glossy green cabbage ribbons, soft red tomato chunks, and tender scrambled egg curds. Composition: served on a retro floral-patterned ceramic plate on a wooden dining table, close-up 45-degree framing, warm evening side light and subtle steam. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```
