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

- ✅ **已完成（前 12 篇）**：1 ~ 12
- 🟡 **待新增（後 38 篇）**：13 ~ 50

---

## 已完成（1~12）純文字條列

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

---

## 待新增（13~22）

（既有 12 張已補齊；以下為新一批待補 10 張。）

### 第二批待補圖（10）

| # | 食譜名稱 | slug | 建議檔名 |
| --- | --- | --- | --- |
| 13 | 蒜香番茄豆腐炒蛋 | `garlic-tomato-tofu-eggs` | `garlic-tomato-tofu-eggs.webp` |
| 14 | 高麗菜洋蔥炒蛋 | `cabbage-onion-eggs` | `cabbage-onion-eggs.webp` |
| 15 | 菇菇青蔥滑蛋 | `mushroom-scallion-soft-eggs` | `mushroom-scallion-soft-eggs.webp` |
| 16 | 蒜頭高麗菜豆腐煮 | `garlic-cabbage-tofu-braise` | `garlic-cabbage-tofu-braise.webp` |
| 17 | 洋蔥番茄蛋炒飯 | `onion-tomato-egg-fried-rice` | `onion-tomato-egg-fried-rice.webp` |
| 18 | 青蔥雞胸拌飯 | `scallion-chicken-rice-bowl` | `scallion-chicken-rice-bowl.webp` |
| 19 | 菇菇高麗菜燴飯 | `mushroom-cabbage-rice-bowl` | `mushroom-cabbage-rice-bowl.webp` |
| 20 | 氣炸蒜香雞胸佐青花菜 | `airfryer-garlic-chicken-broccoli` | `airfryer-garlic-chicken-broccoli.webp` |
| 21 | 番茄洋蔥豆腐湯 | `tomato-onion-tofu-soup` | `tomato-onion-tofu-soup.webp` |
| 22 | 電鍋青花菜雞胸便當菜 | `electricpot-broccoli-chicken-bento` | `electricpot-broccoli-chicken-bento.webp` |

> 你之後補圖時，優先把上述 10 篇的 `coverImage` 從 `placeholder-recipe.svg` 改成對應 `.webp` 路徑。

---

## 待新增 10 篇 Gemini Prompt（13~22）

> 格式與前 12 篇一致：**料理描述 + 獨立場景構圖 + 風格尾段**。

### 13. 蒜香番茄豆腐炒蛋 — `garlic-tomato-tofu-eggs.webp`

```text
A delicious plate of Taiwanese garlic tomato tofu scrambled eggs, single-serving size, with soft tofu cubes, juicy tomato pieces, and silky eggs. Composition: warm home kitchen stovetop scene, shallow pan just off the flame, medium close-up with gentle steam, evening ambient light from the side. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 14. 高麗菜洋蔥炒蛋 — `cabbage-onion-eggs.webp`

```text
A delicious plate of Taiwanese stir-fried cabbage and onion with eggs, family-style small portion, with glossy cabbage ribbons and golden egg curds. Composition: matte ceramic plate on a light wood dining table, slight top-angled view, natural noon light, chopsticks resting beside the plate. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 15. 菇菇青蔥滑蛋 — `mushroom-scallion-soft-eggs.webp`

```text
A delicious plate of Taiwanese mushroom and scallion soft scrambled eggs, single-serving size, with tender mushrooms and creamy half-set eggs. Composition: compact apartment kitchen counter, round plate centered, close-up framing, soft morning side light and subtle shadows. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 16. 蒜頭高麗菜豆腐煮 — `garlic-cabbage-tofu-braise.webp`

```text
A delicious bowl of Taiwanese garlic braised cabbage and tofu, single-serving size, with soft tofu blocks and lightly translucent cabbage in savory broth. Composition: rustic clay bowl on a woven table mat, three-quarter view, gentle afternoon light, a wooden spoon near the bowl edge. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 17. 洋蔥番茄蛋炒飯 — `onion-tomato-egg-fried-rice.webp`

```text
A delicious bowl of Taiwanese onion tomato egg fried rice, single-serving size, with fluffy rice grains, soft egg pieces, and bright tomato chunks. Composition: deep rice bowl on a stone-textured table, 45-degree angle, late afternoon kitchen light, spoon placed on the side. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 18. 青蔥雞胸拌飯 — `scallion-chicken-rice-bowl.webp`

```text
A delicious bowl of Taiwanese scallion chicken breast rice, single-serving size, with sliced tender chicken and fresh green scallions over steamed rice. Composition: simple lunch setup on a neutral tabletop, bowl centered with slight overhead perspective, clean daylight from the right, minimal props. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 19. 菇菇高麗菜燴飯 — `mushroom-cabbage-rice-bowl.webp`

```text
A delicious bowl of Taiwanese mushroom cabbage rice bowl with thick savory sauce, single-serving size, with sautéed mushrooms and tender cabbage over hot rice. Composition: broad ceramic bowl on a linen placemat, close-to-table eye level, soft indoor tungsten light blended with window fill. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 20. 氣炸蒜香雞胸佐青花菜 — `airfryer-garlic-chicken-broccoli.webp`

```text
A delicious plate of Taiwanese air-fried garlic chicken breast with broccoli, single-serving size, with browned chicken edges and vibrant green broccoli. Composition: modern kitchen island scene, parchment-lined tray partly visible, cool-neutral lighting with crisp highlights, diagonal composition. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 21. 番茄洋蔥豆腐湯 — `tomato-onion-tofu-soup.webp`

```text
A delicious bowl of Taiwanese tomato onion tofu soup, single-serving size, with clear red broth, soft tofu cubes, and gently cooked onion slices. Composition: deep soup bowl on a small round side table, soft rainy-day window light, visible steam swirl, cozy home mood. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 22. 電鍋青花菜雞胸便當菜 — `electricpot-broccoli-chicken-bento.webp`

```text
A delicious Taiwanese electric-pot broccoli chicken bento dish, single-serving size, with sliced chicken breast, broccoli florets, and carrot pieces arranged neatly. Composition: open meal-prep container on a tidy desk, top-down composition with balanced compartments, soft overhead light, practical weekday lunch vibe. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

---

## 待新增（23~35）

### 第三批待補圖（13）

| # | 食譜名稱 | slug | 建議檔名 |
| --- | --- | --- | --- |
| 23 | 麻油洋蔥雞胸拌飯 | `sesame-onion-chicken-rice-bowl` | `sesame-onion-chicken-rice-bowl.webp` |
| 24 | 番茄青花菜蛋炒飯 | `tomato-broccoli-egg-rice` | `tomato-broccoli-egg-rice.webp` |
| 25 | 蒜香菇豆腐拌飯 | `garlic-mushroom-tofu-rice-bowl` | `garlic-mushroom-tofu-rice-bowl.webp` |
| 26 | 高麗菜胡蘿蔔雞胸飯 | `cabbage-carrot-chicken-rice-bowl` | `cabbage-carrot-chicken-rice-bowl.webp` |
| 27 | 醬香蒜煎雞胸 | `soy-garlic-chicken-breast-pan` | `soy-garlic-chicken-breast-pan.webp` |
| 28 | 洋蔥香煎鮭魚排 | `onion-salmon-pan-steak` | `onion-salmon-pan-steak.webp` |
| 29 | 氣炸豆腐菇菇主菜 | `airfryer-tofu-mushroom-main` | `airfryer-tofu-mushroom-main.webp` |
| 30 | 高麗菜豆腐蛋花湯 | `cabbage-tofu-egg-drop-soup` | `cabbage-tofu-egg-drop-soup.webp` |
| 31 | 青花菜洋蔥雞湯 | `broccoli-onion-chicken-soup` | `broccoli-onion-chicken-soup.webp` |
| 32 | 電鍋菇菇雞胸便當菜 | `electricpot-mushroom-chicken-bento` | `electricpot-mushroom-chicken-bento.webp` |
| 33 | 蒜香蛋炒高麗菜便當菜 | `garlic-egg-cabbage-bento-side` | `garlic-egg-cabbage-bento-side.webp` |
| 34 | 番茄洋蔥滑蛋 | `tomato-onion-scrambled-eggs` | `tomato-onion-scrambled-eggs.webp` |
| 35 | 豆腐高麗菜菇菇炒 | `tofu-cabbage-mushroom-stirfry` | `tofu-cabbage-mushroom-stirfry.webp` |

## 待新增 13 篇 Gemini Prompt（23~35）

### 23. 麻油洋蔥雞胸拌飯 — `sesame-onion-chicken-rice-bowl.webp`

```text
A delicious bowl of Taiwanese sesame onion chicken breast rice, single-serving size, with glossy onion slices and tender chicken over steamed rice. Composition: warm dinner table scene, slight overhead angle, soft tungsten light with subtle kitchen background blur. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 24. 番茄青花菜蛋炒飯 — `tomato-broccoli-egg-rice.webp`

```text
A delicious bowl of Taiwanese tomato broccoli egg fried rice, single-serving size, with bright red tomato chunks, green broccoli bits, and golden egg pieces. Composition: ceramic bowl on a pale stone tabletop, 45-degree top view, fresh daylight from window side. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 25. 蒜香菇豆腐拌飯 — `garlic-mushroom-tofu-rice-bowl.webp`

```text
A delicious bowl of Taiwanese garlic mushroom tofu rice, single-serving size, with seared tofu cubes and sautéed mushrooms over fluffy rice. Composition: rustic bowl on linen cloth, close-up table-level framing, gentle noon light and clean background. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 26. 高麗菜胡蘿蔔雞胸飯 — `cabbage-carrot-chicken-rice-bowl.webp`

```text
A delicious bowl of Taiwanese cabbage carrot chicken breast rice, two-serving style, with sliced chicken, shredded cabbage, and carrot strips on rice. Composition: lunch-prep tray setting, side angle with balanced colors, natural soft daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 27. 醬香蒜煎雞胸 — `soy-garlic-chicken-breast-pan.webp`

```text
A delicious plate of Taiwanese soy garlic pan-seared chicken breast, single-serving main dish, with glossy sauce coating and lightly charred edges. Composition: dark ceramic plate on wood table, medium close-up, warm kitchen side light and subtle steam. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 28. 洋蔥香煎鮭魚排 — `onion-salmon-pan-steak.webp`

```text
A delicious plate of Taiwanese pan-seared salmon steak with onion, single-serving size, with golden salmon surface and soft onion ribbons. Composition: modern home kitchen plate-up, diagonal composition, cool-neutral highlight on salmon skin, 3/4 angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 29. 氣炸豆腐菇菇主菜 — `airfryer-tofu-mushroom-main.webp`

```text
A delicious plate of Taiwanese air-fried tofu and mushroom main dish, single-serving size, with browned tofu corners and roasted mushrooms. Composition: parchment-lined tray beside a serving plate, kitchen island background, clean cool lighting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 30. 高麗菜豆腐蛋花湯 — `cabbage-tofu-egg-drop-soup.webp`

```text
A delicious bowl of Taiwanese cabbage tofu egg drop soup, single-serving size, with silky egg ribbons, tofu cubes, and tender cabbage. Composition: deep soup bowl on a small round wooden table, side light through soft curtain, visible steam curls. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 31. 青花菜洋蔥雞湯 — `broccoli-onion-chicken-soup.webp`

```text
A delicious bowl of Taiwanese broccoli onion chicken soup, single-serving size, with sliced chicken, broccoli florets, and light clear broth. Composition: home kitchen serving scene, bowl centered, slight overhead view, calm afternoon light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 32. 電鍋菇菇雞胸便當菜 — `electricpot-mushroom-chicken-bento.webp`

```text
A delicious Taiwanese electric-pot mushroom chicken bento dish, single-serving size, with sliced chicken breast and mixed mushrooms arranged in meal-prep style. Composition: open bento container on a desk, top-down framing with clean compartments, soft overhead light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 33. 蒜香蛋炒高麗菜便當菜 — `garlic-egg-cabbage-bento-side.webp`

```text
A delicious plate of Taiwanese garlic egg stir-fried cabbage bento side dish, small serving size, with glossy cabbage strips and fluffy egg pieces. Composition: compact side-dish plate next to bento box edge, warm lunch setting, slight top angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 34. 番茄洋蔥滑蛋 — `tomato-onion-scrambled-eggs.webp`

```text
A delicious plate of Taiwanese tomato onion soft scrambled eggs, single-serving size, with juicy tomato pieces and creamy egg texture. Composition: simple ceramic plate on pale wood table, close-up focus, natural morning light from left. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 35. 豆腐高麗菜菇菇炒 — `tofu-cabbage-mushroom-stirfry.webp`

```text
A delicious plate of Taiwanese tofu cabbage mushroom stir-fry, single-serving size, with seared tofu cubes, tender cabbage, and sautéed mushrooms. Composition: home-style dinner plate on woven placemat, 3/4 view, warm evening side light and cozy atmosphere. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
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
A delicious plate of Taiwanese onion garlic tofu scrambled eggs, single-serving size, with golden egg curds, soft tofu cubes, and translucent onion slices. Composition: cozy stovetop plating scene, medium close-up from 45 degrees, warm home kitchen light and subtle steam. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 37. 番茄高麗菜滑蛋 — `tomato-cabbage-soft-eggs.webp`

```text
A delicious plate of Taiwanese tomato cabbage soft scrambled eggs, single-serving size, with juicy tomato pieces and tender cabbage ribbons. Composition: matte ceramic plate on light wooden table, slightly overhead framing, fresh midday daylight from window side. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 38. 青蔥菇菇蛋煎盤 — `scallion-mushroom-egg-pan.webp`

```text
A delicious plate of Taiwanese scallion mushroom egg pan-fry, single-serving size, with browned mushroom slices and soft egg texture. Composition: compact apartment dining setup, close-up top-angled shot, gentle morning light and clean neutral background. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 39. 青花菜豆腐蒜炒 — `broccoli-tofu-garlic-stirfry.webp`

```text
A delicious plate of Taiwanese broccoli tofu garlic stir-fry, single-serving size, with vibrant broccoli florets and lightly seared tofu cubes. Composition: shallow plate on woven placemat, 3/4 table-level angle, soft afternoon side light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 40. 洋蔥高麗菜菇菇炒 — `onion-cabbage-mushroom-saute.webp`

```text
A delicious plate of Taiwanese onion cabbage mushroom sauté, single-serving size, with glossy cabbage and aromatic onion strands. Composition: home dinner plate on a simple tablecloth, slight diagonal framing, warm evening light and minimal props. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 41. 蒜香番茄雞胸飯 — `garlic-tomato-chicken-rice-bowl.webp`

```text
A delicious bowl of Taiwanese garlic tomato chicken breast rice, single-serving size, with tender chicken pieces over fluffy rice and tomato sauce glaze. Composition: deep rice bowl centered on stone-textured tabletop, 45-degree angle, bright neutral daylight. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 42. 豆腐蛋香拌飯 — `tofu-egg-savory-rice-bowl.webp`

```text
A delicious bowl of Taiwanese tofu egg savory rice, single-serving size, with soft tofu and creamy egg mixture over steamed rice. Composition: simple lunch setting on pale wood table, slight overhead perspective, gentle side light and clean backdrop. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 43. 青花菜菇菇雞胸飯 — `broccoli-mushroom-chicken-rice-bowl.webp`

```text
A delicious bowl of Taiwanese broccoli mushroom chicken breast rice, two-serving style, with sliced chicken, mushrooms, and broccoli over rice. Composition: meal-prep friendly bowl composition, top-right light source, balanced color contrast and tidy plating. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 44. 蒜香豆腐雞胸主菜 — `garlic-tofu-chicken-pan-main.webp`

```text
A delicious plate of Taiwanese garlic tofu chicken breast main dish, single-serving size, with seared tofu edges and juicy chicken chunks. Composition: dark ceramic plate near stovetop, medium close-up with slight steam and warm amber kitchen light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 45. 蒜香鮭魚青花菜主菜 — `salmon-broccoli-garlic-main.webp`

```text
A delicious plate of Taiwanese garlic salmon and broccoli main dish, single-serving size, with golden salmon surface and bright green broccoli. Composition: modern kitchen plating scene, 3/4 angle, cool-neutral highlights with gentle warm fill light. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 46. 番茄蛋豆腐清湯 — `tomato-egg-tofu-light-soup.webp`

```text
A delicious bowl of Taiwanese tomato egg tofu light soup, single-serving size, with delicate egg ribbons, tofu cubes, and red tomato broth. Composition: deep soup bowl on a small round table, side window light with visible steam and calm rainy-day mood. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 47. 高麗菜菇菇清湯 — `cabbage-mushroom-clear-soup.webp`

```text
A delicious bowl of Taiwanese cabbage mushroom clear soup, single-serving size, with tender cabbage pieces and sliced mushrooms in clear broth. Composition: rustic ceramic bowl on linen table mat, top-angled close framing, soft daylight with minimal background. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 48. 電鍋豆腐蛋便當菜 — `electricpot-tofu-egg-bento-side.webp`

```text
A delicious Taiwanese electric-pot tofu egg bento side dish, single-serving size, with soft tofu-egg texture cut into neat portions. Composition: open bento layout on desk, top-down view showing compartment arrangement, soft overhead office lunch lighting. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 49. 洋蔥胡蘿蔔炒蛋便當菜 — `onion-carrot-egg-bento-side.webp`

```text
A delicious plate of Taiwanese onion carrot scrambled egg bento side dish, small serving size, with bright carrot strips and fluffy egg pieces. Composition: side-dish plate next to meal box, slight overhead angle, warm noon light and practical lunch vibe. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 50. 番茄蒜香高麗菜炒蛋 — `tomato-garlic-cabbage-eggs.webp`

```text
A delicious plate of Taiwanese tomato garlic cabbage scrambled eggs, single-serving size, with glossy cabbage strips, softened tomato chunks, and tender egg curds. Composition: everyday home table setting, 45-degree close framing, warm evening side light and subtle steam. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```
