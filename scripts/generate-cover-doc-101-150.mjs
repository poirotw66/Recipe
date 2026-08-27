import { readFileSync, writeFileSync } from "node:fs";

const STYLE_TAIL =
  "Colored pencil and watercolor illustration style, warm and cozy atmosphere, rich food textures, detailed sketch outlines, soft pencil shading. Highly appetizing and inviting. Clean uncluttered background, no text, no watermark, 4:3 aspect ratio.";

/** @type {Record<string, { en: string; composition: string }>} */
const PROMPTS = {
  "air-fryer-garlic-pork-chop": {
    en: "Taiwanese air-fried garlic pork chop, single-serving size, with a golden-crisped crust and juicy thick-cut pork, sliced to show tender interior",
    composition: "served on a wire air-fryer basket liner on a kitchen island counter, warm amber under-cabinet light, low-angle close-up with subtle steam",
  },
  "air-fryer-honey-sweet-potato": {
    en: "Taiwanese honey-glazed air-fried sweet potato cubes, single-serving size, caramelized edges and fluffy orange interior",
    composition: "in a small ceramic bowl on a bamboo placemat, soft afternoon window light, top-down three-quarter view",
  },
  "air-fryer-crispy-chicken-bites": {
    en: "Taiwanese air-fried crispy chicken bites, single-serving size, bite-sized golden breaded chicken pieces",
    composition: "arranged on parchment paper beside a small dipping sauce dish on a dark pub-style table, cozy evening lamp glow",
  },
  "air-fryer-lemon-fish-fillet": {
    en: "Taiwanese air-fried lemon white fish fillet with broccoli, single-serving size, flaky fish with bright lemon garnish",
    composition: "on a white oval plate near a frosted kitchen window, cool diffused daylight, side view",
  },
  "air-fryer-garlic-shrimp": {
    en: "Taiwanese air-fried garlic shrimp, single-serving size, plump pink-orange shrimp with visible garlic and herbs",
    composition: "on a shallow blue ceramic plate on a marble-patterned counter, bright neutral daylight, medium close-up",
  },
  "air-fryer-crispy-tofu-cubes": {
    en: "Taiwanese air-fried crispy tofu cubes, single-serving size, golden-brown cubed tofu with scallion garnish",
    composition: "on a round wooden board with a small soy sauce dish, warm kitchen tungsten light, diagonal framing",
  },
  "air-fryer-butter-corn": {
    en: "Taiwanese air-fried butter corn, single-serving size, glossy buttered corn segments with light char marks",
    composition: "in a rustic enamel pan on a picnic-style gingham cloth, sunny midday light, overhead angle",
  },
  "air-fryer-garlic-okra": {
    en: "Taiwanese air-fried garlic okra, single-serving size, tender okra pods with garlic oil sheen",
    composition: "on a dark slate plate on a compact rental-kitchen counter, soft side light, close-up",
  },
  "air-fryer-soy-chicken-wings": {
    en: "Taiwanese soy-marinated air-fried chicken wings, single-serving size, four glossy crispy wings",
    composition: "stacked on a stoneware plate at a small dining table, warm dinner lighting, dynamic low angle",
  },
  "air-fryer-garlic-mushrooms": {
    en: "Taiwanese air-fried garlic mixed mushrooms, single-serving size, assorted sautéed mushrooms glistening with garlic oil",
    composition: "in a shallow cast-iron dish on a cork trivet, moody warm kitchen light, three-quarter view",
  },
  "scallion-oil-dry-noodles": {
    en: "Taiwanese scallion oil dry noodles, single-serving size, glossy noodles topped with golden fried scallions",
    composition: "in a deep ceramic bowl with chopsticks resting on the rim, morning window light from the left, slight overhead",
  },
  "egg-scallion-oil-noodles": {
    en: "Taiwanese scallion oil noodles with a soft sunny-side-up egg, single-serving size, runny yolk over glossy noodles",
    composition: "on a compact kitchen counter at night, warm desk-lamp glow, close-up hero bowl",
  },
  "butter-garlic-instant-noodles": {
    en: "Taiwanese butter garlic stir-fried instant noodles, single-serving size, silky noodles with garlic and melted butter gloss",
    composition: "in a shallow pan still warm from the stove, late-night cozy kitchen, steam wisps, side angle",
  },
  "quick-kimchi-fried-rice": {
    en: "Taiwanese quick kimchi fried rice, single-serving size, with red kimchi bits, fluffy rice grains, and scrambled egg",
    composition: "in a round frying pan on a speckled countertop, bright lunch-hour daylight, three-quarter view",
  },
  "sesame-cold-noodles-solo": {
    en: "Taiwanese sesame cold noodles for one, single-serving size, chilled noodles with sesame sauce and cucumber shreds",
    composition: "in a wide shallow bowl on a light summer table, cool bright daylight, top-down angle with ice-water mood",
  },
  "instant-miso-egg-soup": {
    en: "Japanese-style instant miso egg drop soup with tofu, single-serving size, silky egg ribbons in amber miso broth",
    composition: "in a handmade ceramic bowl on a knitted coaster near a winter window, gentle steam curls, soft cool daylight",
  },
  "canned-tuna-rice-bowl": {
    en: "Taiwanese canned tuna rice bowl, single-serving size, rice topped with tuna-mayo mixture and sesame",
    composition: "in a simple white rice bowl on a student desk lunch setup, neutral daylight, eye-level view",
  },
  "quick-pickled-cucumber-egg-rice": {
    en: "Taiwanese preserved radish egg over rice, single-serving size, savory egg stir-fry with diced preserved radish on steamed rice",
    composition: "in a deep rice bowl on a retro floral plate under warm evening side light, cozy home dinner mood",
  },
  "microwave-steamed-egg-rice": {
    en: "Taiwanese steamed egg custard over rice, single-serving size, silky pudding-like steamed egg with soy glaze",
    composition: "in a divided ceramic dish on a small electric rice cooker nearby (softly blurred), soft morning kitchen light",
  },
  "ten-minute-udon-soup": {
    en: "Japanese-style ten-minute udon soup, single-serving size, thick udon noodles in clear dashi broth with scallions",
    composition: "in a deep soup bowl on a dark wooden table, steam rising, cool rainy-day window light",
  },
  "leftover-mixed-veggie-fried-rice": {
    en: "Taiwanese mixed vegetable fried rice, single-serving size, colorful diced carrots, cabbage, and egg with rice",
    composition: "on a round plate beside an open fridge door impression (softly blurred), practical kitchen daylight",
  },
  "clearout-tofu-veggie-soup": {
    en: "Taiwanese clear tofu vegetable soup, single-serving size, soft tofu cubes and assorted vegetables in light broth",
    composition: "in a clear glass soup pot style bowl on a light tiled counter, airy morning light, gentle steam",
  },
  "leftover-meat-quick-stirfry": {
    en: "Taiwanese pork and green pepper stir-fry, single-serving size, sliced pork with bell pepper strips and garlic aroma",
    composition: "just plated from a wok on a dark slate mat, wok-hei steam, warm kitchen mixed lighting, diagonal angle",
  },
  "random-veggie-egg-pancake": {
    en: "Taiwanese mixed vegetable egg pancake, single-serving size, thick pan-fried egg cake with shredded cabbage and carrot",
    composition: "cut into wedges on a round skillet, rustic wooden table, weekend brunch sunlight",
  },
  "fridge-bottom-soup-noodles": {
    en: "Taiwanese fridge-clearance soup noodles, single-serving size, noodles in clear broth with cabbage and egg drop",
    composition: "in a deep noodle bowl on a small apartment dining table, humble cozy evening lamp, close-up",
  },
  "leftover-rice-egg-pancake": {
    en: "Taiwanese leftover rice egg pancake, single-serving size, golden pan-fried rice-and-egg cake with crispy edges",
    composition: "on a nonstick pan with spatula nearby, morning kitchen counter, bright side light",
  },
  "clearout-veggie-egg-fried-rice": {
    en: "Taiwanese vegetable egg fried rice, single-serving size, fluffy rice with egg curds and mixed veggie bits",
    composition: "in a shallow serving plate on a lunch tray, eye-level view, neutral office-break daylight",
  },
  "mixed-leftover-congee": {
    en: "Taiwanese savory egg tofu congee, single-serving size, creamy rice porridge with tofu cubes and egg flowers",
    composition: "in a deep clay pot bowl on a woven placemat, rainy evening warm indoor light, comforting close-up",
  },
  "solo-ginger-pork-rice": {
    en: "Taiwanese ginger pork mince over rice, single-serving size, fragrant minced pork with ginger shreds on steamed rice",
    composition: "in a high-rimmed rice bowl on a bamboo mat, warm tungsten dinner light, three-quarter view",
  },
  "solo-three-cup-chicken-rice": {
    en: "Taiwanese three-cup chicken over rice, single-serving size, glossy braised chicken chunks with basil on rice",
    composition: "in a clay pot style bowl on a dark wooden dining table, rich amber evening light, medium close-up",
  },
  "solo-mapo-tofu-rice-bowl": {
    en: "Taiwanese mapo tofu rice bowl, single-serving size, spicy red tofu cubes with minced pork over rice",
    composition: "in a deep ceramic bowl with chili oil sheen, Sichuan-inspired red accents, warm side light, close-up",
  },
  "solo-pan-fried-pork-cutlet-rice": {
    en: "Taiwanese pan-fried pork cutlet rice bowl, single-serving size, sliced golden pork cutlet with half-cooked egg on rice",
    composition: "in a wide shallow bowl on a weekend lunch table, bright natural daylight, satisfying hero angle",
  },
  "solo-lu-rou-rice": {
    en: "Taiwanese braised pork rice, single-serving size, rich minced pork sauce with fried shallots over rice",
    composition: "in a classic Taiwanese rice bowl on a red lacquer tray impression, warm nostalgic kitchen light",
  },
  "solo-sesame-chicken-rice": {
    en: "Taiwanese sesame chicken over rice, single-serving size, sliced chicken with toasted sesame seeds on rice",
    composition: "on a clean modern ceramic plate, bright gym-meal prep counter feel, crisp neutral daylight",
  },
  "solo-oyster-sauce-beef-rice": {
    en: "Taiwanese oyster sauce beef over rice, single-serving size, glossy beef slices with onions on steamed rice",
    composition: "in a sizzling-hot plate impression on a diner-style table, dynamic steam, warm amber light",
  },
  "bento-ginger-chicken": {
    en: "Taiwanese bento ginger chicken, meal-prep portion, sliced chicken breast with ginger shreds in a bento compartment",
    composition: "in an open two-tier bento box on a work desk, weekday lunch top-down view, soft daylight",
  },
  "bento-honey-soy-pork": {
    en: "Taiwanese bento honey soy braised pork, meal-prep portion, glossy minced pork in a bento compartment",
    composition: "in a glass meal-prep container on a kitchen counter, Sunday meal-prep mood, clean bright light",
  },
  "bento-stir-fried-cabbage": {
    en: "Taiwanese bento stir-fried cabbage, meal-prep side portion, glossy green cabbage with garlic in a bento slot",
    composition: "in a stainless bento compartment on a linen cloth, natural soft light, close-up three-quarter",
  },
  "bento-black-pepper-beef": {
    en: "Taiwanese bento black pepper beef, meal-prep portion, peppered beef strips with onions in a bento box",
    composition: "in a divided bento tray beside chopsticks, office lunch setting, neutral overhead light",
  },
  "bento-braised-tofu-egg": {
    en: "Taiwanese bento braised tofu and eggs, meal-prep portion, soy-braised tofu cubes and halved soy eggs",
    composition: "in a square glass container on a wooden counter, warm afternoon meal-prep light, tidy plating",
  },
  "high-protein-chicken-broccoli-bowl": {
    en: "High-protein chicken broccoli bowl, single-serving size, sliced grilled chicken with vibrant broccoli and rice",
    composition: "in a clean meal-prep bowl on a white kitchen counter, fitness-friendly bright daylight, balanced top-down",
  },
  "high-protein-shrimp-tofu-bowl": {
    en: "High-protein shrimp tofu bowl, single-serving size, seared tofu cubes and pink shrimp on a light plate",
    composition: "on a minimalist white plate on a gym kitchen island, cool crisp morning light, health-focused framing",
  },
  "high-protein-tofu-steak-plate": {
    en: "High-protein pan-seared tofu steak, single-serving size, thick golden tofu cutlet with teriyaki glaze and broccoli",
    composition: "on a rectangular plate with sesame garnish, clean vegetarian meal aesthetic, soft side light",
  },
  "high-protein-egg-white-stirfry": {
    en: "High-protein egg white stir-fry with cucumber, single-serving size, fluffy white egg curds with diced cucumber",
    composition: "on a light ceramic plate on a diet meal counter, airy minimal composition, cool morning light",
  },
  "weight-loss-zucchini-chicken": {
    en: "Weight-loss zucchini chicken stir-fry, single-serving size, lean chicken strips with zucchini half-moons",
    composition: "on a white plate with lots of negative space, bright clean daylight, fresh healthy lunch mood",
  },
  "weight-loss-shrimp-veg-salad": {
    en: "Weight-loss shrimp vegetable salad, single-serving size, shrimp on cucumber, tomato, and greens with lemon dressing",
    composition: "in a large salad bowl on a light bamboo mat, summer top-down view, fresh cool daylight",
  },
  "weight-loss-clear-mushroom-soup": {
    en: "Weight-loss clear mushroom soup, single-serving size, assorted mushrooms in light clear broth with scallions",
    composition: "in a simple ceramic soup bowl on a quiet evening table, soft steam, calm muted lighting",
  },
  "budget-simple-egg-fried-rice": {
    en: "Budget simple egg fried rice, single-serving size, classic golden egg fried rice with minimal garnish",
    composition: "in a well-used rice bowl on a student rental kitchen table, humble warm light, honest close-up",
  },
  "budget-tofu-rice-bowl": {
    en: "Budget tofu rice bowl, single-serving size, pan-fried tofu with soy glaze over steamed rice",
    composition: "in a deep bowl on a budget-friendly laminate counter, practical noon daylight, straightforward framing",
  },
  "budget-cabbage-noodle-soup": {
    en: "Budget cabbage noodle soup, single-serving size, noodles in broth with tender cabbage and scallions",
    composition: "in a large soup bowl on a thrift-store-style wooden table, cozy economical dinner lamp glow",
  },
};

const SECTIONS = [
  { label: "氣炸鍋料理（101~110）", from: 101, to: 110 },
  { label: "10 分鐘料理（111~120）", from: 111, to: 120 },
  { label: "冰箱清庫存（121~128）", from: 121, to: 128 },
  { label: "一人料理（129~135）", from: 129, to: 135 },
  { label: "便當菜（136~140）", from: 136, to: 140 },
  { label: "高蛋白／減脂（141~147）", from: 141, to: 147 },
  { label: "省錢料理（148~150）", from: 148, to: 150 },
];

const gen = readFileSync("scripts/generate-prd004-recipes.mjs", "utf8");
const slugs = [...gen.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const recipes = slugs.map((slug, i) => {
  const raw = readFileSync(`src/content/recipes/${slug}.md`, "utf8");
  const title = raw.match(/^title:\s*"([^"]+)"/m)?.[1] ?? slug;
  const desc = raw.match(/^description:\s*"([^"]+)"/m)?.[1] ?? "";
  return { n: 101 + i, slug, title, desc };
});

const lines = [];
lines.push("# 食譜成品圖繪製清單（101~150，PRD-004 給 Gemini）");
lines.push("");
lines.push("本站 PRD-004 新增 **50 篇**食譜（編號 **101~150**），目前 `coverImage` 多為 `.svg` 佔位。請依下表各產出一張成品圖；圖檔放入 `public/images/recipes/` 後，將 frontmatter 的 `coverImage` 改為 `.webp` 即可上線。");
lines.push("");
lines.push("## 輸出規格建議");
lines.push("");
lines.push("| 項目 | 建議 |");
lines.push("| --- | --- |");
lines.push("| 比例 | 4:3（例如 1200×900 或 800×600） |");
lines.push("| 格式 | WebP（或 PNG 再轉 WebP） |");
lines.push("| 風格 | 彩鉛 + 水彩插畫（colored pencil and watercolor illustration），溫暖居家、非寫實攝影 |");
lines.push("| 構圖 | 一人份成品為主角；**每道菜使用不同場景／角度／光線**（見下方各篇 prompt，避免重複道具組合） |");
lines.push("| 文字 | 圖上不要加字、不要浮水印 |");
lines.push("| 存放路徑 | `public/images/recipes/` |");
lines.push("| 檔名 | 與下表「檔名」欄一致（slug + `.webp`） |");
lines.push("");
lines.push("上線後每篇食譜 frontmatter：`coverImage: \"/images/recipes/{slug}.webp\"`");
lines.push("");
lines.push("---");
lines.push("");
lines.push("## Prompt 風格尾段（每道食譜都接上）");
lines.push("");
lines.push("> **場景與構圖寫在各食譜段落內**；以下只統一畫風與輸出限制，不要每張都複製同一套木桌／窗光／水杯／布巾。");
lines.push("");
lines.push("```text");
lines.push(STYLE_TAIL);
lines.push("```");
lines.push("");
lines.push("---");
lines.push("");
lines.push("## 清單與檔名（50）");
lines.push("");
lines.push("| # | 食譜名稱 | slug | 建議檔名 |");
lines.push("| --- | --- | --- | --- |");
for (const r of recipes) {
  lines.push(`| ${r.n} | ${r.title} | \`${r.slug}\` | \`${r.slug}.webp\` |`);
}
lines.push("");
lines.push("---");
lines.push("");
lines.push("## 各食譜完整 Prompt（複製到 Gemini）");
lines.push("");
lines.push("> 每段 = **料理描述** + **獨立場景構圖** + **風格尾段**。50 道場景各異，對應 PRD-004 成長主軸：氣炸鍋、10 分鐘、清冰箱、一人份、便當、高蛋白、省錢。");
lines.push("");

for (const section of SECTIONS) {
  lines.push(`### ${section.label}`);
  lines.push("");
  const group = recipes.filter((r) => r.n >= section.from && r.n <= section.to);
  for (const r of group) {
    const p = PROMPTS[r.slug];
    if (!p) throw new Error(`Missing prompt for ${r.slug}`);
    lines.push(`#### ${r.n}. ${r.title} — \`${r.slug}.webp\``);
    lines.push("");
    lines.push("```text");
    lines.push(
      `A highly appetizing ${p.en}. Composition: ${p.composition}. ${STYLE_TAIL}`,
    );
    lines.push("```");
    lines.push("");
  }
}

lines.push("---");
lines.push("");
lines.push("## 待新增（101~150）純文字條列");
lines.push("");
for (const r of recipes) {
  lines.push(`${r.n}. ${r.title}`);
}

const out = "docs/recipe-cover-images-for-gemini-101-150.md";
writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote ${out} (${recipes.length} recipes)`);
