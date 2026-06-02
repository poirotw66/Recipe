# 食譜成品圖繪製清單（給 Gemini）

本站目前內容庫收錄 **12 篇**食譜。請依下表各產出一張成品圖；圖檔放入 `public/images/recipes/` 後，更新對應 Markdown 的 `coverImage` 為 `.webp` 路徑。

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

## 純文字條列（中文對照）

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

## 待新增（若之後擴充食譜）

（新食譜請複製「料理描述 + 獨立場景構圖 + 風格尾段」格式自行撰寫，並避免與既有 12 張重複同一套道具。）

- 
- 
- 
