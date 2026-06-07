import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const recipesDir = join(root, "src/content/recipes");
const imagesDir = join(root, "public/images/recipes");
const ingredientsPath = join(root, "src/data/ingredients.json");

const INGREDIENT_ENTRY = {
  name: "水蓮",
  slug: "water-lily-stem",
  aliases: ["水蓮菜", "野蓮", "子午蓮"],
  category: "蔬菜",
  description:
    "水蓮口感爽脆、帶淡淡清香，快炒、汆燙或入湯都能保留脆度，是台灣很受歡迎的水生蔬菜。",
  caloriesPer100g: 20,
  proteinPer100g: 1.6,
  fatPer100g: 0.1,
  carbsPer100g: 3.5,
  storage: "冷藏並包廚房紙巾，2 到 3 天內料理；下鍋前再清洗口感較脆。",
  commonPairings: ["蒜頭", "菇類", "蝦仁", "貢丸"],
  substitutes: ["空心菜", "青江菜"],
  relatedScenarios: ["ten-minute-meals", "one-person-meal", "weight-loss-meals"],
  labels: {
    "zh-TW": "水蓮",
    en: "Water lily stem",
    ja: "水蓮",
    ko: "연꽃줄기",
  },
  categoryLabels: {
    "zh-TW": "蔬菜",
    en: "Vegetables",
    ja: "野菜",
    ko: "채소",
  },
};

const RECIPES = [
  {
    slug: "water-lily-stem-garlic-stirfry",
    title: "蒜蓉炒水蓮",
    description: "水蓮大火快炒保留脆度，蒜末提香，十分鐘完成下飯青菜。",
    category: "家常菜",
    scenarios: ["10 分鐘料理", "一人料理", "省錢料理"],
    calories: 95,
    protein: 3,
    fat: 5,
    carbs: 9,
    prepTime: 5,
    cookTime: 5,
    totalTime: 10,
    equipment: ["平底鍋"],
    tags: ["一人份", "快手菜", "蔬菜"],
    core: [{ name: "水蓮", amount: "200", unit: "公克" }],
    extra: [{ name: "蒜頭", amount: "3", unit: "瓣", isCore: false }],
    seasonings: [
      { name: "橄欖油", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "1/4", unit: "小匙" },
    ],
    intro: "水蓮下鍋前瀝乾水分，大火快炒 1 到 2 分鐘即可，過久會變軟。",
    steps: [
      "水蓮洗淨瀝乾，切約 5 公分長段；蒜頭切末。",
      "平底鍋熱油，爆香蒜末至微金黃。",
      "下水蓮大火快炒 1 到 2 分鐘，保持脆度。",
      "以鹽調味，起鍋前再拌勻即可。",
    ],
    tips: ["鍋要夠熱，水蓮才不會出水變軟。"],
    storage: "現做現吃；隔夜回熱建議大火快炒 30 秒。",
    substitutions: ["空心菜", "青江菜"],
    relatedIngredients: ["水蓮", "蒜頭"],
    body: "蒜蓉炒水蓮是最經典的做法，脆口又清爽，很適合平日晚餐配白飯。",
  },
  {
    slug: "water-lily-stem-egg-stirfry",
    title: "水蓮炒蛋",
    description: "水蓮以米酒大火爆炒後配滑嫩雞蛋，香氣足又下飯的一人份家常小炒。",
    category: "家常菜",
    scenarios: ["10 分鐘料理", "一人料理", "省錢料理"],
    calories: 185,
    protein: 12,
    fat: 12,
    carbs: 6,
    prepTime: 5,
    cookTime: 9,
    totalTime: 14,
    equipment: ["平底鍋"],
    tags: ["一人份", "快手菜", "蛋料理"],
    core: [
      { name: "水蓮", amount: "180", unit: "公克" },
      { name: "雞蛋", amount: "2", unit: "顆" },
    ],
    extra: [{ name: "蒜頭", amount: "1", unit: "瓣", isCore: false }],
    seasonings: [
      { name: "橄欖油", amount: "1", unit: "大匙" },
      { name: "米酒", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "1/4", unit: "小匙" },
      { name: "白胡椒", amount: "少許", unit: "" },
    ],
    intro: "水蓮先以米酒大火爆炒提香，再下蛋液推成蛋塊，脆度與蛋香會更完整。",
    steps: [
      "水蓮洗淨切段瀝乾，蒜頭切末；雞蛋打入碗中，加少許鹽攪散。",
      "平底鍋熱油爆香蒜末，下水蓮大火快炒約 30 秒。",
      "沿鍋邊淋入米酒，大火爆炒約 30 秒至酒香釋放、水蓮仍帶脆。",
      "將水蓮推到鍋邊，倒入蛋液，待邊緣凝固後輕推成蛋塊。",
      "水蓮與蛋塊拌勻，以鹽與白胡椒調味後起鍋。",
    ],
    tips: ["米酒要大火快炒讓酒氣揮發，水蓮才不會出水變軟。"],
    storage: "現做現吃；冷藏 1 天，回熱時大火快炒較香。",
    substitutions: ["空心菜", "青江菜"],
    relatedIngredients: ["水蓮", "雞蛋", "蒜頭"],
    body: "水蓮炒蛋結合蔬菜脆感與蛋香，是很適合平日晚餐的省時家常菜。",
  },
  {
    slug: "water-lily-stem-oyster-sauce",
    title: "蠔油炒水蓮",
    description: "蠔油帶出鮮甜，水蓮爽脆不膩，租屋族也能快速完成的台式快炒。",
    category: "家常菜",
    scenarios: ["10 分鐘料理", "便當菜"],
    calories: 110,
    protein: 3,
    fat: 6,
    carbs: 11,
    prepTime: 5,
    cookTime: 6,
    totalTime: 11,
    equipment: ["平底鍋"],
    tags: ["便當菜", "快炒"],
    core: [{ name: "水蓮", amount: "200", unit: "公克" }],
    extra: [{ name: "蒜頭", amount: "2", unit: "瓣", isCore: false }],
    seasonings: [
      { name: "蠔油", amount: "1", unit: "大匙" },
      { name: "醬油", amount: "1/2", unit: "小匙" },
      { name: "糖", amount: "1/2", unit: "小匙" },
      { name: "橄欖油", amount: "1", unit: "大匙" },
    ],
    intro: "蠔油先與少許糖拌勻，起鍋前下鍋包覆水蓮，鹹甜會更均勻。",
    steps: [
      "水蓮洗淨切段瀝乾，蒜頭切片。",
      "平底鍋熱油爆香蒜片，下水蓮大火快炒 1 分鐘。",
      "蠔油、醬油與糖先在小碗拌勻，沿鍋邊淋入。",
      "快速拌炒 30 秒至醬汁包覆即可起鍋。",
    ],
    tips: ["蠔油本身偏鹹，醬油可視口味略減。"],
    storage: "冷藏 1 天；回熱時少油快炒較能保留口感。",
    substitutions: ["青江菜", "空心菜"],
    relatedIngredients: ["水蓮", "蒜頭"],
    body: "蠔油炒水蓮是餐廳也很常見的台式快炒，在家做只要注意火候就不難成功。",
  },
  {
    slug: "water-lily-stem-mushroom-stirfry",
    title: "水蓮炒菇類",
    description: "水蓮與菇類雙脆組合，清淡鮮甜，適合便當配菜與減脂晚餐。",
    category: "家常菜",
    scenarios: ["便當菜", "減脂料理", "10 分鐘料理"],
    calories: 120,
    protein: 5,
    fat: 6,
    carbs: 12,
    prepTime: 6,
    cookTime: 7,
    totalTime: 13,
    equipment: ["平底鍋"],
    tags: ["便當菜", "減脂"],
    core: [
      { name: "水蓮", amount: "180", unit: "公克" },
      { name: "菇類", amount: "100", unit: "公克" },
    ],
    extra: [{ name: "蒜頭", amount: "2", unit: "瓣", isCore: false }],
    seasonings: [
      { name: "鹽", amount: "1/4", unit: "小匙" },
      { name: "白胡椒", amount: "少許", unit: "" },
      { name: "橄欖油", amount: "1", unit: "大匙" },
    ],
    intro: "菇類先炒至半熟再下水蓮，兩種脆感能同時保留。",
    steps: [
      "水蓮切段瀝乾，菇類切片或撕小朵，蒜頭切末。",
      "平底鍋熱油，先炒菇類至微出水。",
      "下水蓮與蒜末大火快炒 1 分鐘。",
      "以鹽與白胡椒調味，拌勻起鍋。",
    ],
    tips: ["杏鮑菇或鴻喜菇都很適合這道菜。"],
    storage: "冷藏 1 天；微波回熱後口感會略軟。",
    substitutions: ["青花菜", "高麗菜"],
    relatedIngredients: ["水蓮", "菇類", "蒜頭"],
    body: "水蓮炒菇類清淡又有層次，很適合想多吃蔬菜又不想吃得太油的一餐。",
  },
  {
    slug: "water-lily-stem-pork-soup",
    title: "水蓮肉片湯",
    description: "水蓮汆燙後入湯，肉片滑嫩，暖胃又不厚重的一人份湯品。",
    category: "湯品",
    scenarios: ["一人料理"],
    calories: 210,
    protein: 18,
    fat: 10,
    carbs: 8,
    prepTime: 8,
    cookTime: 10,
    totalTime: 18,
    equipment: ["湯鍋"],
    tags: ["湯品", "暖胃"],
    core: [
      { name: "水蓮", amount: "150", unit: "公克" },
      { name: "豬肉", amount: "100", unit: "公克" },
    ],
    extra: [{ name: "薑", amount: "3", unit: "片", isCore: false }],
    seasonings: [
      { name: "水", amount: "600", unit: "毫升" },
      { name: "鹽", amount: "1/2", unit: "小匙" },
      { name: "米酒", amount: "1", unit: "大匙" },
    ],
    intro: "肉片先以米酒與少許鹽抓醃，湯滾後再下，口感會比較滑嫩。",
    steps: [
      "豬肉切薄片，以米酒與少許鹽抓醃；水蓮洗淨切段。",
      "湯鍋加水與薑片煮滾，下肉片攪散煮至變色。",
      "下水蓮煮 1 到 2 分鐘至脆熟。",
      "以鹽調味，試味道後即可起鍋。",
    ],
    tips: ["水蓮不要煮太久，保持爽脆較好吃。"],
    storage: "現做現吃；隔夜再加熱水蓮會變軟。",
    substitutions: ["青江菜", "高麗菜"],
    relatedIngredients: ["水蓮", "豬肉", "薑"],
    body: "水蓮肉片湯清爽暖胃，很適合想喝點熱湯又不想煮太複雜的晚上。",
  },
  {
    slug: "water-lily-stem-fish-ball-noodles",
    title: "水蓮貢丸湯麵",
    description: "水蓮配貢丸與麵條，湯頭清甜，十分鐘完成飽足的一碗麵。",
    category: "飯麵",
    scenarios: ["10 分鐘料理", "省錢料理", "宵夜料理"],
    calories: 420,
    protein: 16,
    fat: 12,
    carbs: 58,
    prepTime: 5,
    cookTime: 10,
    totalTime: 15,
    equipment: ["湯鍋"],
    tags: ["麵食", "宵夜"],
    core: [
      { name: "水蓮", amount: "120", unit: "公克" },
      { name: "貢丸", amount: "6", unit: "顆" },
      { name: "麵條", amount: "1", unit: "份" },
    ],
    extra: [{ name: "青蔥", amount: "1", unit: "根", isCore: false }],
    seasonings: [
      { name: "水", amount: "700", unit: "毫升" },
      { name: "鹽", amount: "1/2", unit: "小匙" },
      { name: "白胡椒", amount: "少許", unit: "" },
    ],
    intro: "貢丸與麵條先煮熟，水蓮最後才下，脆度與湯頭會比較平衡。",
    steps: [
      "湯鍋加水煮滾，下貢丸煮至浮起。",
      "下麵條依包裝時間煮至彈牙。",
      "下水蓮煮 1 分鐘，以鹽與白胡椒調味。",
      "青蔥切蔥花，起鍋前撒入即可。",
    ],
    tips: ["想更鮮甜可加幾片薑或一小匙醬油。"],
    storage: "現做現吃；麵條隔夜會膨脹。",
    substitutions: ["烏龍麵", "米粉"],
    relatedIngredients: ["水蓮", "貢丸", "麵條"],
    customAdditions: ["薑", "醬油"],
    body: "水蓮貢丸湯麵是宵夜或快速晚餐的好選擇，一碗就能同時補足蔬菜與主食。",
  },
  {
    slug: "water-lily-stem-tofu-braise",
    title: "水蓮燒豆腐",
    description: "水蓮與豆腐同燒，清淡入味，適合無肉晚餐或便當配菜。",
    category: "家常菜",
    scenarios: ["無肉料理", "便當菜", "省錢料理"],
    calories: 180,
    protein: 12,
    fat: 10,
    carbs: 10,
    prepTime: 6,
    cookTime: 10,
    totalTime: 16,
    equipment: ["平底鍋"],
    tags: ["無肉", "豆腐"],
    core: [
      { name: "水蓮", amount: "180", unit: "公克" },
      { name: "豆腐", amount: "1", unit: "盒", isCore: true },
    ],
    extra: [{ name: "蒜頭", amount: "2", unit: "瓣", isCore: false }],
    seasonings: [
      { name: "醬油", amount: "1.5", unit: "大匙" },
      { name: "糖", amount: "1/2", unit: "小匙" },
      { name: "水", amount: "100", unit: "毫升" },
      { name: "橄欖油", amount: "1", unit: "大匙" },
    ],
    intro: "豆腐先煎至表面微金黃，再下醬油與水燒入味，最後才加水蓮。",
    steps: [
      "豆腐切塊，水蓮切段瀝乾，蒜頭切末。",
      "平底鍋熱油，豆腐煎至兩面微金黃。",
      "下蒜末、醬油、糖與水，小火燒 3 分鐘。",
      "下水蓮快炒 1 分鐘，收汁後起鍋。",
    ],
    tips: ["板豆腐較耐煎，嫩豆腐則需輕手翻面。"],
    storage: "冷藏 2 天；回熱時加少許水避免過乾。",
    substitutions: ["豆干", "油豆腐"],
    relatedIngredients: ["水蓮", "豆腐", "蒜頭"],
    body: "水蓮燒豆腐鹹甜適中，是很實惠又下飯的無肉家常菜。",
  },
  {
    slug: "water-lily-stem-shrimp-stirfry",
    title: "水蓮炒蝦仁",
    description: "蝦仁鮮甜搭配水蓮爽脆，高蛋白又清爽的一人份主菜。",
    category: "主菜",
    scenarios: ["高蛋白料理", "10 分鐘料理", "減脂料理"],
    calories: 195,
    protein: 22,
    fat: 7,
    carbs: 9,
    prepTime: 8,
    cookTime: 7,
    totalTime: 15,
    equipment: ["平底鍋"],
    tags: ["高蛋白", "海鮮"],
    core: [
      { name: "水蓮", amount: "180", unit: "公克" },
      { name: "蝦仁", amount: "120", unit: "公克" },
    ],
    extra: [{ name: "蒜頭", amount: "2", unit: "瓣", isCore: false }],
    seasonings: [
      { name: "鹽", amount: "1/4", unit: "小匙" },
      { name: "白胡椒", amount: "少許", unit: "" },
      { name: "橄欖油", amount: "1", unit: "大匙" },
      { name: "米酒", amount: "1", unit: "小匙" },
    ],
    intro: "蝦仁先炒至變色起鍋，水蓮炒好後再回鍋拌勻，蝦仁較不會過老。",
    steps: [
      "蝦仁洗淨瀝乾，以米酒輕抓去腥；水蓮切段，蒜頭切末。",
      "平底鍋熱油，蝦仁炒至變色後先盛起。",
      "同鍋爆香蒜末，下水蓮大火快炒 1 分鐘。",
      "蝦仁回鍋，以鹽與白胡椒調味，拌勻起鍋。",
    ],
    tips: ["蝦仁可先用少許米酒去腥。"],
    storage: "現做現吃；蝦仁隔夜口感會變硬。",
    substitutions: ["透抽", "雞胸肉"],
    relatedIngredients: ["水蓮", "蝦仁", "蒜頭"],
    body: "水蓮炒蝦仁鮮甜清爽，很適合想控制油脂又想吃得有飽足感的一餐。",
  },
  {
    slug: "water-lily-stem-chicken-rice-bowl",
    title: "水蓮雞肉蓋飯",
    description: "雞胸肉配水蓮快炒後蓋飯，一人份高蛋白蓋飯，平日晚餐好選擇。",
    category: "飯麵",
    scenarios: ["高蛋白料理", "一人料理", "便當菜"],
    calories: 430,
    protein: 32,
    fat: 12,
    carbs: 48,
    prepTime: 8,
    cookTime: 10,
    totalTime: 18,
    equipment: ["平底鍋"],
    tags: ["蓋飯", "高蛋白"],
    core: [
      { name: "水蓮", amount: "150", unit: "公克" },
      { name: "雞胸肉", amount: "120", unit: "公克" },
      { name: "白飯", amount: "1", unit: "碗" },
    ],
    extra: [{ name: "蒜頭", amount: "2", unit: "瓣", isCore: false }],
    seasonings: [
      { name: "醬油", amount: "1", unit: "大匙" },
      { name: "米酒", amount: "1", unit: "大匙" },
      { name: "橄欖油", amount: "1", unit: "大匙" },
    ],
    intro: "雞胸肉切薄片先炒至七分熟，再與水蓮同炒，最後蓋在白飯上。",
    steps: [
      "雞胸肉切片，以米酒與少許醬油抓醃；水蓮切段瀝乾。",
      "平底鍋熱油，雞胸肉炒至變色後先盛起。",
      "爆香蒜末，下水蓮快炒 1 分鐘，雞胸肉回鍋。",
      "以醬油調味，炒勻後蓋在白飯上。",
    ],
    tips: ["雞胸肉不要炒太久，口感會比較嫩。"],
    storage: "現做現吃；便當隔天需確實冷藏。",
    substitutions: ["雞腿肉", "豬肉"],
    relatedIngredients: ["水蓮", "雞胸肉", "白飯"],
    body: "水蓮雞肉蓋飯把蔬菜、蛋白質與主食一次完成，忙碌晚上很實用。",
  },
  {
    slug: "water-lily-stem-clear-soup",
    title: "水蓮清湯",
    description: "水蓮與豆腐做極簡清湯，低油低鹽，減脂或想清淡飲食時很適合。",
    category: "湯品",
    scenarios: ["減脂料理", "無肉料理", "10 分鐘料理"],
    calories: 85,
    protein: 6,
    fat: 4,
    carbs: 7,
    prepTime: 5,
    cookTime: 8,
    totalTime: 13,
    equipment: ["湯鍋"],
    tags: ["清湯", "減脂"],
    core: [
      { name: "水蓮", amount: "150", unit: "公克" },
      { name: "豆腐", amount: "100", unit: "公克" },
    ],
    extra: [{ name: "薑", amount: "2", unit: "片", isCore: false }],
    seasonings: [
      { name: "水", amount: "600", unit: "毫升" },
      { name: "鹽", amount: "1/4", unit: "小匙" },
      { name: "白胡椒", amount: "少許", unit: "" },
    ],
    intro: "這道湯刻意少油少調味，靠水蓮與豆腐的自然鮮甜撐起風味。",
    steps: [
      "水蓮洗淨切段，豆腐切小塊，薑切片。",
      "湯鍋加水與薑片煮滾，下豆腐煮 2 分鐘。",
      "下水蓮煮 1 到 2 分鐘至脆熟。",
      "以鹽與白胡椒調味即可。",
    ],
    tips: ["想更香可在起鍋前淋幾滴麻油。"],
    storage: "現做現吃；隔夜水蓮會變軟。",
    substitutions: ["青江菜", "菇類"],
    relatedIngredients: ["水蓮", "豆腐", "薑"],
    customAdditions: ["麻油"],
    body: "水蓮清湯是最簡單的吃法之一，清淡卻不寡淡，很適合想讓腸胃休息的日子。",
  },
  {
    slug: "water-lily-stem-sesame-toss",
    title: "麻油拌水蓮",
    description: "水蓮汆燙後以麻油與蒜味拌勻，冷熱皆宜的清爽小菜。",
    category: "便當菜",
    scenarios: ["便當菜", "減脂料理", "10 分鐘料理"],
    calories: 130,
    protein: 3,
    fat: 9,
    carbs: 9,
    prepTime: 6,
    cookTime: 4,
    totalTime: 10,
    equipment: ["湯鍋"],
    tags: ["涼拌", "便當"],
    core: [{ name: "水蓮", amount: "200", unit: "公克" }],
    extra: [{ name: "蒜頭", amount: "2", unit: "瓣", isCore: false }],
    seasonings: [
      { name: "麻油", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "1/4", unit: "小匙" },
      { name: "白芝麻", amount: "1", unit: "小匙" },
    ],
    intro: "水蓮汆燙後立刻泡冰水或沖涼，脆度會更明顯。",
    steps: [
      "水蓮洗淨切段，蒜頭切末。",
      "湯鍋水滾後下水蓮汆燙 40 秒，撈出瀝乾。",
      "趁熱加入蒜末、麻油與鹽拌勻。",
      "裝盤前撒白芝麻即可。",
    ],
    tips: ["便當帶出門建議瀝乾水分，避免油水滲出。"],
    storage: "冷藏 1 天；食用前可室溫回溫或直接冷吃。",
    substitutions: ["空心菜", "菠菜"],
    relatedIngredients: ["水蓮", "蒜頭"],
    body: "麻油拌水蓮香氣足又清爽，很適合當便當配菜或餐桌上的開胃小菜。",
  },
];

function yamlQuote(value) {
  return /[:#\-\n]/.test(value) || value.includes('"') ? `"${value.replace(/"/g, '\\"')}"` : value;
}

function renderIngredient(item) {
  const core = item.isCore === false ? "false" : "true";
  return [
    `- name: ${yamlQuote(item.name)}`,
    `  amount: "${String(item.amount)}"`,
    `  unit: ${yamlQuote(item.unit)}`,
    `  isCore: ${core}`,
  ].join("\n");
}

function renderSeasoning(item) {
  const unit = item.unit === "" ? '""' : yamlQuote(item.unit);
  return [
    `- name: ${yamlQuote(item.name)}`,
    `  amount: "${String(item.amount)}"`,
    `  unit: ${unit}`,
  ].join("\n");
}

function renderRecipe(recipe) {
  const ingredients = [
    ...recipe.core.map((item) => ({ ...item, isCore: true })),
    ...(recipe.extra ?? []),
  ];

  const lines = [
    "---",
    `title: ${yamlQuote(recipe.title)}`,
    `slug: ${recipe.slug}`,
    `description: ${yamlQuote(recipe.description)}`,
    `coverImage: /images/recipes/${recipe.slug}.svg`,
    "servings: 1",
    `prepTime: ${recipe.prepTime}`,
    `cookTime: ${recipe.cookTime}`,
    `totalTime: ${recipe.totalTime}`,
    `difficulty: "簡單"`,
    `calories: ${recipe.calories}`,
    `protein: ${recipe.protein}`,
    `fat: ${recipe.fat}`,
    `carbs: ${recipe.carbs}`,
    `category: "${recipe.category}"`,
    "scenarios:",
    ...recipe.scenarios.map((item) => `- ${yamlQuote(item)}`),
    "equipment:",
    ...recipe.equipment.map((item) => `- ${yamlQuote(item)}`),
    "tags:",
    ...recipe.tags.map((item) => `- ${yamlQuote(item)}`),
    `intro: ${yamlQuote(recipe.intro)}`,
    "steps:",
    ...recipe.steps.map((item) => `- ${yamlQuote(item)}`),
    "tips:",
    ...recipe.tips.map((item) => `- ${yamlQuote(item)}`),
    `storage: ${yamlQuote(recipe.storage)}`,
    "substitutions:",
    ...recipe.substitutions.map((item) => `- ${yamlQuote(item)}`),
    "relatedIngredients:",
    ...recipe.relatedIngredients.map((item) => `- ${yamlQuote(item)}`),
    ...(recipe.customAdditions?.length
      ? ["customAdditions:", ...recipe.customAdditions.map((item) => `- ${yamlQuote(item)}`)]
      : ["customAdditions: []"]),
    "faqs: []",
    "featured: false",
    `publishedAt: ${yamlQuote("2026-06-03")}`,
    `updatedAt: ${yamlQuote("2026-06-03")}`,
    "ingredients:",
    ...ingredients.map(renderIngredient),
    "seasonings:",
    ...recipe.seasonings.map(renderSeasoning),
    "---",
    "",
    "",
    recipe.body,
    "",
  ];

  return `${lines.join("\n")}`;
}

function renderSvg(title) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="${title}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e8f5ec"/><stop offset="100%" stop-color="#d4ead8"/></linearGradient></defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect x="40" y="40" width="720" height="520" rx="20" fill="#fffdf7" stroke="#3d7a52" stroke-width="3" opacity="0.92"/>
  <text x="80" y="280" fill="#2d2620" font-family="system-ui, 'Noto Sans TC', sans-serif" font-size="42" font-weight="700">${title}</text>
  <text x="80" y="340" fill="#6f6258" font-family="system-ui, sans-serif" font-size="22">水蓮料理</text>
</svg>
`;
}

// Add ingredient entry
const ingredients = JSON.parse(readFileSync(ingredientsPath, "utf8"));
if (ingredients.some((item) => item.slug === INGREDIENT_ENTRY.slug)) {
  console.log("Ingredient water-lily-stem already exists, skipping JSON insert.");
} else {
  ingredients.push(INGREDIENT_ENTRY);
  writeFileSync(ingredientsPath, `${JSON.stringify(ingredients, null, 2)}\n`, "utf8");
  console.log("Added water-lily-stem to ingredients.json");
}

if (!existsSync(imagesDir)) {
  mkdirSync(imagesDir, { recursive: true });
}

for (const recipe of RECIPES) {
  const recipePath = join(recipesDir, `${recipe.slug}.md`);
  const imagePath = join(imagesDir, `${recipe.slug}.svg`);
  writeFileSync(recipePath, renderRecipe(recipe), "utf8");
  writeFileSync(imagePath, renderSvg(recipe.title), "utf8");
  console.log(`Wrote ${recipe.slug}`);
}

console.log(`Done: ${RECIPES.length} recipes generated.`);
