# 食譜成品圖繪製清單（151~161，水蓮料理給 Gemini）

本站新增 **11 篇**水蓮食譜（編號 **151~161**），目前 `coverImage` 皆為 `.svg` 佔位。請依下表各產出一張成品圖；圖檔放入 `public/images/recipes/` 後，將 frontmatter 的 `coverImage` 改為 `.webp` 即可上線。

## 輸出規格建議

| 項目 | 建議 |
| --- | --- |
| 比例 | 4:3（例如 1200×900 或 800×600） |
| 格式 | WebP（或 PNG 再轉 WebP） |
| 風格 | 彩鉛 + 水彩插畫（colored pencil and watercolor illustration），溫暖居家、非寫實攝影 |
| 構圖 | 一人份成品為主角；**每道菜使用不同場景／角度／光線**（見下方各篇 prompt，避免重複道具組合） |
| 食材辨識 | 水蓮（water lily stem）為**中空長綠莖、切段後仍帶脆感**，勿畫成空心菜或青江菜葉片 |
| 文字 | 圖上不要加字、不要浮水印 |
| 存放路徑 | `public/images/recipes/` |
| 檔名 | 與下表「檔名」欄一致（slug + `.webp`） |

上線後每篇食譜 frontmatter：`coverImage: "/images/recipes/{slug}.webp"`

---

## 圖片進度狀態

- 🟡 **待新增（共 11 篇）**：151 ~ 161（水蓮料理全系列）

---

## Prompt 風格尾段（每道食譜都接上）

> **場景與構圖寫在各食譜段落內**；以下只統一畫風與輸出限制，不要每張都複製同一套木桌／窗光／水杯／布巾。

```text
Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 構圖變化對照（給批次產圖時參考）

| # | 食譜 | 場景／角度／光線（摘要） |
| --- | --- | --- |
| 151 | 蒜蓉炒水蓮 | 剛起鍋圓瓷盤、木砧板旁、側光蒸氣 |
| 152 | 水蓮炒蛋 | 平底鍋邊、蛋液金黃、米酒爆炒感、暖色檯燈 |
| 153 | 蠔油炒水蓮 | 深盤、醬色光澤、午後窗光俯視 |
| 154 | 水蓮炒菇類 | 淺灰石盤、菇類與綠莖對比、中島冷光 |
| 155 | 水蓮肉片湯 | 白瓷湯碗、清湯與肉片、蒸氣與薑片 |
| 156 | 水蓮貢丸湯麵 | 深碗湯麵、貢丸與蔥花、宵夜暖光 |
| 157 | 水蓮燒豆腐 | 土色陶盤、豆腐金邊、濃醬收汁 |
| 158 | 水蓮炒蝦仁 | 鐵板感圓盤、蝦仁粉橘、蒜香油光 |
| 159 | 水蓮雞肉蓋飯 | 蓋飯碗、雞肉與水蓮分層、書桌午餐俯視 |
| 160 | 水蓮清湯 | 透明玻璃碗、極簡清湯、晨光 |
| 161 | 麻油拌水蓮 | 涼拌小碟、芝麻點綴、竹托盤 |

---

## 清單與檔名（11）

| # | 食譜名稱 | slug | 建議檔名 |
| --- | --- | --- | --- |
| 151 | 蒜蓉炒水蓮 | `water-lily-stem-garlic-stirfry` | `water-lily-stem-garlic-stirfry.webp` |
| 152 | 水蓮炒蛋 | `water-lily-stem-egg-stirfry` | `water-lily-stem-egg-stirfry.webp` |
| 153 | 蠔油炒水蓮 | `water-lily-stem-oyster-sauce` | `water-lily-stem-oyster-sauce.webp` |
| 154 | 水蓮炒菇類 | `water-lily-stem-mushroom-stirfry` | `water-lily-stem-mushroom-stirfry.webp` |
| 155 | 水蓮肉片湯 | `water-lily-stem-pork-soup` | `water-lily-stem-pork-soup.webp` |
| 156 | 水蓮貢丸湯麵 | `water-lily-stem-fish-ball-noodles` | `water-lily-stem-fish-ball-noodles.webp` |
| 157 | 水蓮燒豆腐 | `water-lily-stem-tofu-braise` | `water-lily-stem-tofu-braise.webp` |
| 158 | 水蓮炒蝦仁 | `water-lily-stem-shrimp-stirfry` | `water-lily-stem-shrimp-stirfry.webp` |
| 159 | 水蓮雞肉蓋飯 | `water-lily-stem-chicken-rice-bowl` | `water-lily-stem-chicken-rice-bowl.webp` |
| 160 | 水蓮清湯 | `water-lily-stem-clear-soup` | `water-lily-stem-clear-soup.webp` |
| 161 | 麻油拌水蓮 | `water-lily-stem-sesame-toss` | `water-lily-stem-sesame-toss.webp` |

---

## 各食譜完整 Prompt（複製到 Gemini）

> 每段 = **料理描述** + **獨立場景構圖** + **風格尾段**。水蓮料理主軸：台式快炒、湯麵、蓋飯、涼拌，強調**中空脆綠莖**質感。

### 快炒與便當菜（151~154、158）

#### 151. 蒜蓉炒水蓮 — `water-lily-stem-garlic-stirfry.webp`

```text
A highly appetizing, vibrant plate of Taiwanese stir-fried water lily stems with garlic, single-serving size. Features glossy, bright green hollow water lily stem segments (cut into crisp 5 cm pieces with no leaves), lightly coated in a glistening garlic oil and mixed with golden-browned minced garlic bits and small red chili slices for color. Composition: piled high on a warm white round ceramic plate placed next to a wooden cutting board on a compact home kitchen counter. Soft side window light illuminates the dish with gentle curls of rising steam, captured from a three-quarter close-up angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 152. 水蓮炒蛋 — `water-lily-stem-egg-stirfry.webp`

```text
A highly appetizing, colorful plate of Taiwanese stir-fried water lily stems with scrambled eggs, single-serving size. Features crisp, bright green hollow water lily stem segments (thin, leaf-free green tubes) tossed with fluffy, golden-yellow scrambled egg curds, showing a light glaze from a splash of rice wine. Composition: served directly in a seasoned black cast-iron skillet resting on a round cork trivet on a rustic wood table. Bathed in the warm, cozy amber glow of a kitchen stove light at night, with a wisp of rising steam, captured from a close-up three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 153. 蠔油炒水蓮 — `water-lily-stem-oyster-sauce.webp`

```text
A highly appetizing plate of Taiwanese oyster-sauce glazed water lily stems, single-serving size. Features crisp, bright green hollow water lily stem segments (long leaf-free green tubes) beautifully glazed in a rich, glossy dark amber oyster sauce with caramelized edges and thin garlic slices. Composition: arranged neatly in a textured dark brown ceramic dish resting on a light oak dining table. Soft afternoon window daylight casts long, gentle shadows, captured from a three-quarter overhead angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 154. 水蓮炒菇類 — `water-lily-stem-mushroom-stirfry.webp`

```text
A highly appetizing, fresh stir-fry of water lily stems with mushrooms, single-serving size. Features bright green hollow water lily stem segments (crisp leaf-free tubes) tossed with brown sliced shiitake mushrooms and golden enoki mushrooms, looking glossy and fresh. Composition: served on a matte light-grey stoneware plate on a clean kitchen island counter. Under bright, neutral midday window light highlighting the green and earthy brown color contrast, captured from a three-quarter close-up view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 158. 水蓮炒蝦仁 — `water-lily-stem-shrimp-stirfry.webp`

```text
A highly tempting plate of Taiwanese stir-fried water lily stems with shrimp, single-serving size. Features plump, pink-orange seared shrimp and crisp, bright green hollow water lily stem segments (leaf-free green tubes) tossed in garlic-infused oil. Composition: served on an elegant round blue-rimmed porcelain plate on a dark wooden pub table. Bathed in the warm, cozy glow of a hanging dining lamp, showing glistening textures from a close-up side angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 湯品與湯麵（155~156、160）

#### 155. 水蓮肉片湯 — `water-lily-stem-pork-soup.webp`

```text
A comforting, steaming bowl of Taiwanese clear pork and water lily stem soup, single-serving size. Tender, pale pink pork slices are mixed with bright green hollow water lily stem segments and thin ginger shreds in a clear, golden broth. Composition: served in a classic white porcelain soup bowl resting on a woven bamboo placemat. Soft morning window light captures delicate steam wisps rising from the hot soup, viewed from a three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 156. 水蓮貢丸湯麵 — `water-lily-stem-fish-ball-noodles.webp`

```text
A highly appetizing, steaming bowl of Taiwanese noodle soup with water lily stems and meatballs, single-serving size. Features chewy yellow wheat noodles in a clear savory broth, topped with two large round meatballs (gongwan), a handful of green hollow water lily stem segments, and chopped green scallions. Composition: served in a deep blue ceramic bowl on a dark wooden dining table under a cozy warm pendant light at night, captured from a slightly overhead hero angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 160. 水蓮清湯 — `water-lily-stem-clear-soup.webp`

```text
A clean, refreshing bowl of Taiwanese minimalist clear soup with water lily stems and tofu, single-serving size. Soft white tofu cubes, bright green hollow water lily stem segments, and a few ginger slices float in a light, crystal-clear vegetable broth. Composition: served in a transparent glass soup bowl on a pale linen tablecloth. Soft morning daylight highlights the fresh, light colors, captured from a gentle overhead three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 主菜與蓋飯（157、159）

#### 157. 水蓮燒豆腐 — `water-lily-stem-tofu-braise.webp`

```text
A highly appetizing plate of Taiwanese braised tofu with water lily stems, single-serving size. Features golden-edged seared tofu cubes coated in a glossy, reduced savory soy-garlic glaze, mixed with crisp green hollow water lily stem segments. Composition: served on a rustic terracotta-colored ceramic plate on a compact dining table. Under a cozy, warm desk-lamp lighting at night, close-up three-quarter view. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

#### 159. 水蓮雞肉蓋飯 — `water-lily-stem-chicken-rice-bowl.webp`

```text
A highly appetizing Taiwanese chicken and water lily stem rice bowl, single-serving size. Fluffy white steamed rice is topped with tender sliced chicken breast stir-fried with green hollow water lily stem segments, seasoned lightly with a glossy soy sauce glaze. Composition: served in a deep ceramic bowl on a clean wooden desk, with chopsticks resting beside the bowl, under bright, natural midday daylight from a window. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

### 涼拌小菜（161）

#### 161. 麻油拌水蓮 — `water-lily-stem-sesame-toss.webp`

```text
An appetizing, delicate Taiwanese cold appetizer of sesame-tossed water lily stems, single-serving size. Blanched bright green hollow water lily stem segments are lightly tossed with fragrant dark sesame oil, sprinkled with toasted white sesame seeds and a pinch of minced garlic. Composition: arranged neatly in a small, elegant white oval side dish on a round bamboo tray. Soft afternoon window light highlights the fresh green glisten, captured from a close-up three-quarter angle. Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.
```

---

## 上線檢查清單

完成繪圖後，逐篇確認：

1. 檔案已放入 `public/images/recipes/{slug}.webp`
2. `src/content/recipes/{slug}.md` 的 `coverImage` 已改為 `.webp`
3. 執行 `npm run build` 通過
4. 瀏覽 `/recipes/{slug}/` 確認封面顯示正常

---

## 相關路徑

| 用途 | 路徑 |
| --- | --- |
| 食材頁 | `/ingredients/water-lily-stem/` |
| 食譜產生器 | `scripts/generate-water-lily-recipes.mjs` |
| 前一批次（101~150） | `docs/recipe-cover-images-for-gemini-101-150.md` |
