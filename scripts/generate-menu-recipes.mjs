import { writeFileSync } from "node:fs";
import { join } from "node:path";

const DATE = "2026-06-03";
const OUT = "src/content/recipes";

/** @param {Record<string, unknown>} recipe */
function serialize(recipe) {
  const lines = ["---"];
  const scalar = [
    ["title", recipe.title],
    ["description", recipe.description],
    ["coverImage", `/images/recipes/${recipe.file.replace(/\.md$/, "")}.svg`],
    ["servings", recipe.servings],
    ["prepTime", recipe.prepTime],
    ["cookTime", recipe.cookTime],
    ["totalTime", recipe.totalTime],
    ["difficulty", recipe.difficulty],
  ];
  if (recipe.calories) scalar.push(["calories", recipe.calories]);
  if (recipe.protein) scalar.push(["protein", recipe.protein]);
  if (recipe.fat) scalar.push(["fat", recipe.fat]);
  if (recipe.carbs) scalar.push(["carbs", recipe.carbs]);
  scalar.push(["category", recipe.category]);
  const quote = (value) =>
    typeof value === "string" ? `"${value}"` : value;
  for (const [key, value] of scalar) {
    const needsQuote = ["title", "description", "difficulty", "category"].includes(key);
    lines.push(`${key}: ${needsQuote ? quote(value) : value}`);
  }
  for (const key of [
    "scenarios",
    "equipment",
    "tags",
    "tips",
    "substitutions",
    "relatedIngredients",
    "customAdditions",
  ]) {
    const items = recipe[key] ?? [];
    if (items.length === 0) {
      lines.push(`${key}: []`);
    } else {
      lines.push(`${key}:`);
      for (const item of items) {
        lines.push(`- ${item}`);
      }
    }
  }
  lines.push("ingredients:");
  for (const item of recipe.ingredients) {
    lines.push(`- name: "${item.name}"`);
    lines.push(`  amount: "${item.amount}"`);
    lines.push(`  unit: "${item.unit}"`);
    lines.push(`  isCore: ${item.isCore}`);
  }
  lines.push("seasonings:");
  for (const item of recipe.seasonings) {
    lines.push(`- name: "${item.name}"`);
    lines.push(`  amount: "${item.amount}"`);
    lines.push(`  unit: "${item.unit}"`);
  }
  lines.push(`intro: "${recipe.intro}"`);
  lines.push("steps:");
  for (const step of recipe.steps) {
    lines.push(`- "${step.replace(/"/g, '\\"')}"`);
  }
  lines.push(`storage: "${recipe.storage}"`);
  if (recipe.faqs?.length) {
    lines.push("faqs:");
    for (const faq of recipe.faqs) {
      lines.push(`- question: "${faq.question}"`);
      lines.push(`  answer: "${faq.answer}"`);
    }
  }
  lines.push(`featured: ${recipe.featured ?? false}`);
  lines.push(`publishedAt: "${DATE}"`);
  lines.push(`updatedAt: "${DATE}"`);
  lines.push("---");
  lines.push("");
  lines.push("");
  lines.push(recipe.closing);
  return lines.join("\n");
}

const recipes = [
  {
    file: "surf-turf-brunch.md",
    title: "澎湃海陸早午餐",
    description:
      "翼板牛排與蒜香蝦仁同盤，搭配炒蛋與時蔬，在家也能做出早午餐店的澎湃感。",
    coverImage: "/images/recipes/surf-turf-brunch.webp",
    servings: 1,
    prepTime: 12,
    cookTime: 18,
    totalTime: 30,
    difficulty: "中等",
    calories: 620,
    protein: 48,
    fat: 32,
    carbs: 28,
    category: "主菜",
    scenarios: ["一人料理", "高蛋白料理"],
    equipment: ["平底鍋", "烤箱或氣炸鍋"],
    tags: ["早午餐", "牛排", "海鮮料理"],
    ingredients: [
      { name: "牛肉", amount: "120", unit: "公克", isCore: true },
      { name: "蝦仁", amount: "80", unit: "公克", isCore: true },
      { name: "雞蛋", amount: "1", unit: "顆", isCore: false },
      { name: "番茄", amount: "1/2", unit: "顆", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "蒜頭", amount: "2", unit: "瓣" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "檸檬汁", amount: "1", unit: "小匙" },
    ],
    intro:
      "牛排與蝦仁分開處理再組盤，能同時保留肉汁與蝦的彈性；番茄與炒蛋負責平衡油脂。",
    steps: [
      "牛肉回溫後以廚房紙巾吸乾表面水分，撒鹽與黑胡椒；蝦仁沖洗瀝乾，去腸後備用。",
      "平底鍋中大火下 1 大匙橄欖油，牛排下鍋後先靜置 2 分鐘再翻面，依厚度煎至喜歡的熟度（建議中心 55～60°C 帶粉紅），起鍋後靜置 3 分鐘再切片。",
      "同鍋補 1 小匙油，爆香蒜末後下蝦仁，大火炒至變色彎曲即起鍋，擠少許檸檬汁。",
      "利用餘油將番茄切厚片煎軟；另起小火將打散的雞蛋炒至半凝固滑嫩狀。",
      "將牛排、蝦仁、番茄、炒蛋分區擺盤，可再淋一點橄欖油與黑胡椒即可上桌。",
    ],
    tips: [
      "牛排靜置能讓肉汁回流，切片時才不會流失太多汁。",
      "蝦仁最後才炒，避免在鍋裡久放變老。",
    ],
    storage: "現做現吃最佳；牛排與蝦仁冷藏再加熱口感會下降。",
    substitutions: ["雞胸肉", "鮭魚"],
    faqs: [
      {
        question: "沒有翼板牛排可以用什麼？",
        answer: "可改用板腱或里肌肉，厚度建議 2 公分內較好掌握熟度。",
      },
    ],
    relatedIngredients: ["牛肉", "蝦仁", "雞蛋", "番茄"],
    closing: "澎湃海陸早午餐適合週末想吃得豐盛、又不想出門排隊的時候。",
  },
  {
    file: "pan-seared-flap-steak-brunch.md",
    title: "香煎翼板牛排早午餐",
    description:
      "翼板牛排以乾煎方式鎖住肉汁，搭配半熟荷包蛋與簡單時蔬，是經典早午餐組合。",
    coverImage: "/images/recipes/pan-seared-flap-steak-brunch.webp",
    servings: 1,
    prepTime: 8,
    cookTime: 14,
    totalTime: 22,
    difficulty: "中等",
    calories: 540,
    protein: 42,
    fat: 34,
    carbs: 12,
    category: "主菜",
    scenarios: ["一人料理", "高蛋白料理"],
    equipment: ["平底鍋"],
    tags: ["早午餐", "牛排"],
    ingredients: [
      { name: "牛肉", amount: "150", unit: "公克", isCore: true },
      { name: "雞蛋", amount: "1", unit: "顆", isCore: false },
      { name: "青花菜", amount: "80", unit: "公克", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "1.5", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "奶油", amount: "10", unit: "公克" },
    ],
    intro:
      "煎牛排前務必擦乾表面，鍋要夠熱才能形成焦香外殼；起鍋前加一小塊奶油能讓風味更圓潤。",
    steps: [
      "牛肉回溫並吸乾，兩面撒鹽與黑胡椒；青花菜切小朵，滾水燙 1 分鐘後瀝乾。",
      "厚底平底鍋大火燒熱至微微冒煙，下橄欖油後立即放入牛排，單面煎 2～3 分鐘至深褐色。",
      "翻面後轉中大火，加入奶油並用湯勺將融化的奶油反覆淋在肉面上（basting），再煎 2 分鐘。",
      "起鍋靜置 4 分鐘；同鍋殘油煎荷包蛋至蛋白凝固、蛋黃流心。",
      "牛排逆紋切片，與炒蛋、青花菜一同擺盤，灑黑胡椒即可。",
    ],
    tips: ["鍋不夠熱會變成煮肉而非煎肉，外層不易上色。"],
    storage: "建議當餐吃完；隔夜再加熱牛排容易變柴。",
    substitutions: ["豬里肌排"],
    relatedIngredients: ["牛肉", "雞蛋", "青花菜"],
    closing: "香煎翼板牛排早午餐是早午餐菜單裡最穩定的肉類主盤之一。",
  },
  {
    file: "crispy-cod-brunch.md",
    title: "金黃酥炸鱈魚早午餐",
    description:
      "鱈魚裹粉酥炸到金黃，外脆內嫩，搭配塔塔醬風味優格與檸檬，早午餐很吸睛。",
    coverImage: "/images/recipes/crispy-cod-brunch.webp",
    servings: 1,
    prepTime: 10,
    cookTime: 12,
    totalTime: 22,
    difficulty: "中等",
    calories: 480,
    protein: 35,
    fat: 22,
    carbs: 38,
    category: "主菜",
    scenarios: ["一人料理", "氣炸鍋料理"],
    equipment: ["平底鍋或氣炸鍋"],
    tags: ["早午餐", "炸魚"],
    ingredients: [
      { name: "鱈魚", amount: "1", unit: "片", isCore: true },
      { name: "雞蛋", amount: "1", unit: "顆", isCore: false },
      { name: "番茄", amount: "1/2", unit: "顆", isCore: false },
    ],
    seasonings: [
      { name: "麵粉", amount: "3", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "檸檬汁", amount: "1", unit: "大匙" },
      { name: "優格", amount: "2", unit: "大匙" },
      { name: "橄欖油", amount: "適量", unit: "" },
    ],
    intro:
      "鱈魚水分多，炸之前一定要吸乾；油溫維持中高溫，外皮才會酥脆而不吸油。",
    steps: [
      "鱈魚片以紙巾徹底吸乾，兩面撒鹽與黑胡椒；雞蛋打散，麵粉另裝淺盤。",
      "魚片依序沾麵粉、蛋液、再沾一層麵粉，輕拍掉多餘粉屑。",
      "平底鍋倒入約 0.5 公分深的油，中火加熱至 170°C 左右（筷子插入會冒小泡），下魚片煎至兩面金黃，約每面 3 分鐘。",
      "起鍋放網架瀝油 2 分鐘；番茄切丁，與優格、檸檬汁、少許鹽拌成簡易塔塔醬。",
      "魚排擺盤，附塔塔醬與檸檬角，旁邊可放生菜或番茄片。",
    ],
    tips: [
      "氣炸鍋可用 190°C 烤 10～12 分鐘，中途翻面並噴少許油。",
      "油溫太低魚排會吸油變膩。",
    ],
    storage: "現炸現吃；冷藏後外皮會變軟。",
    substitutions: ["鮭魚", "雞胸肉"],
    relatedIngredients: ["雞蛋", "番茄"],
    closing: "金黃酥炸鱈魚早午餐很適合想在家重現西式早午餐的日子。",
  },
  {
    file: "roasted-lemon-salmon-brunch.md",
    title: "爐烤檸香鮭魚早午餐",
    description:
      "鮭魚以檸檬與香草簡單調味後爐烤，肉質油潤，搭配烤蔬菜就是完整早午餐。",
    coverImage: "/images/recipes/roasted-lemon-salmon-brunch.webp",
    servings: 1,
    prepTime: 8,
    cookTime: 16,
    totalTime: 24,
    difficulty: "簡單",
    calories: 450,
    protein: 38,
    fat: 28,
    carbs: 10,
    category: "主菜",
    scenarios: ["一人料理", "氣炸鍋料理", "高蛋白料理"],
    equipment: ["烤箱或氣炸鍋", "烤盤"],
    tags: ["早午餐", "鮭魚料理"],
    ingredients: [
      { name: "鮭魚", amount: "150", unit: "公克", isCore: true },
      { name: "青花菜", amount: "100", unit: "公克", isCore: false },
      { name: "洋蔥", amount: "1/4", unit: "顆", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "檸檬汁", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "蒜頭", amount: "1", unit: "瓣" },
    ],
    intro:
      "鮭魚烤過頭會變乾，建議中心仍保留一點粉嫩；蔬菜與魚同盤烤可節省時間。",
    steps: [
      "烤箱預熱 200°C；鮭魚擦乾，青花菜切小朵，洋蔥切塊。",
      "烤盤鋪烘焙紙，蔬菜拌入 1 大匙橄欖油、鹽與胡椒，先烤 8 分鐘。",
      "鮭魚兩面刷剩餘橄欖油，撒鹽、胡椒與蒜末，放在蔬菜上，淋檸檬汁。",
      "續烤 8～10 分鐘至表面微焦、魚肉可用叉子輕鬆撥開但中心仍濕潤。",
      "靜置 2 分鐘後擺盤，可再擠一點檸檬提味。",
    ],
    tips: ["氣炸鍋建議 190°C、12～14 分鐘，效果相近。"],
    storage: "冷藏 1 天內食用；再加熱時蓋箔紙避免過乾。",
    substitutions: ["鱈魚"],
    relatedIngredients: ["鮭魚", "青花菜", "洋蔥"],
    closing: "爐烤檸香鮭魚早午餐油香清爽，是早午餐菜單裡較健康的主選。",
  },
  {
    file: "smoked-salmon-brunch.md",
    title: "煙燻鮭魚早午餐",
    description:
      "煙燻鮭魚不需開火加熱，搭配炒蛋、酪梨與麵包，10 分鐘就能完成精緻早午餐。",
    coverImage: "/images/recipes/smoked-salmon-brunch.webp",
    servings: 1,
    prepTime: 8,
    cookTime: 5,
    totalTime: 13,
    difficulty: "簡單",
    calories: 420,
    protein: 28,
    fat: 26,
    carbs: 22,
    category: "主菜",
    scenarios: ["一人料理", "10 分鐘料理"],
    equipment: ["平底鍋"],
    tags: ["早午餐", "鮭魚料理"],
    ingredients: [
      { name: "鮭魚", amount: "80", unit: "公克", isCore: true },
      { name: "雞蛋", amount: "2", unit: "顆", isCore: true },
      { name: "番茄", amount: "1/2", unit: "顆", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "檸檬汁", amount: "1", unit: "小匙" },
    ],
    intro:
      "此做法以冷燻鮭魚為主，加熱僅針對炒蛋；擺盤時保持鮭魚完整片狀，視覺效果最佳。",
    steps: [
      "煙燻鮭魚從冷藏取出回溫 5 分鐘；番茄切片，雞蛋打散加少許鹽與胡椒。",
      "平底鍋小火下橄欖油，倒入蛋液，用刮刀輕推形成柔軟炒蛋，七成熟即起鍋。",
      "大盤先鋪炒蛋，疊上煙燻鮭魚片，旁邊放番茄與麵包（若有）。",
      "淋檸檬汁與少許黑胡椒，可搭配優格或酸種麵包一起食用。",
    ],
    tips: [
      "煙燻鮭魚已含鹽，炒蛋鹽量請減半。",
      "沒有麵包也可改搭白飯或地瓜，一樣好吃。",
    ],
    storage: "現做現吃；煙燻鮭魚開封後建議當日用完。",
    substitutions: ["鮭魚煎片"],
    relatedIngredients: ["鮭魚", "雞蛋", "番茄"],
    closing: "煙燻鮭魚早午餐幾乎不用顧爐，很適合忙碌早晨。",
  },
  {
    file: "mushroom-soft-egg-brunch.md",
    title: "野菇嫩蛋早午餐",
    description:
      "多種菇類炒香後與滑嫩炒蛋結合，蛋奶素也能吃得飽，是清爽系早午餐。",
    coverImage: "/images/recipes/mushroom-soft-egg-brunch.webp",
    servings: 1,
    prepTime: 7,
    cookTime: 10,
    totalTime: 17,
    difficulty: "簡單",
    calories: 320,
    protein: 18,
    fat: 22,
    carbs: 14,
    category: "主菜",
    scenarios: ["一人料理", "10 分鐘料理"],
    equipment: ["平底鍋"],
    tags: ["早午餐", "蛋奶素"],
    ingredients: [
      { name: "菇類", amount: "120", unit: "公克", isCore: true },
      { name: "雞蛋", amount: "2", unit: "顆", isCore: true },
      { name: "青蔥", amount: "1", unit: "根", isCore: false },
    ],
    seasonings: [
      { name: "奶油", amount: "1", unit: "大匙" },
      { name: "橄欖油", amount: "1", unit: "小匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
    ],
    intro:
      "菇類要先炒到出水再收乾，香氣才夠；炒蛋關火後用餘溫完成，口感最嫩。",
    steps: [
      "菇類切片，青蔥切蔥花；雞蛋打散加少許鹽。",
      "平底鍋中大火下奶油與橄欖油，菇類炒至出水後轉中火收乾至邊緣微金黃。",
      "將菇類推到鍋邊，倒入蛋液，小火慢慢推成半凝固狀。",
      "關火後繼續用餘溫拌至喜歡的濕潤度，撒蔥花與黑胡椒即可。",
    ],
    tips: ["全素者可改奶油為橄欖油，一樣好吃。"],
    storage: "現做現吃；隔夜蛋口感會變硬。",
    substitutions: ["豆腐"],
    relatedIngredients: ["菇類", "雞蛋", "青蔥"],
    closing: "野菇嫩蛋早午餐材料好取得，是菜單上最親和的蛋奶素選項。",
  },
  {
    file: "herb-pan-chicken-brunch.md",
    title: "香草煎雞胸早午餐",
    description:
      "雞胸以香草與檸檬醃過再煎，肉質較嫩，搭配半熟蛋與蔬菜就是均衡早午餐。",
    coverImage: "/images/recipes/herb-pan-chicken-brunch.webp",
    servings: 1,
    prepTime: 10,
    cookTime: 12,
    totalTime: 22,
    difficulty: "簡單",
    calories: 410,
    protein: 42,
    fat: 18,
    carbs: 8,
    category: "主菜",
    scenarios: ["一人料理", "高蛋白料理"],
    equipment: ["平底鍋"],
    tags: ["早午餐", "雞肉料理"],
    ingredients: [
      { name: "雞胸肉", amount: "150", unit: "公克", isCore: true },
      { name: "雞蛋", amount: "1", unit: "顆", isCore: false },
      { name: "青花菜", amount: "80", unit: "公克", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "檸檬汁", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "蒜頭", amount: "1", unit: "瓣" },
    ],
    intro:
      "雞胸肉對半剖開或拍薄能縮短加熱時間；煎好後靜置 2 分鐘再切，汁水較不易流失。",
    steps: [
      "雞胸肉從側邊剖開成均勻厚度，以檸檬汁、鹽、胡椒與蒜末醃 10 分鐘。",
      "平底鍋中大火下 1 大匙橄欖油，雞胸下鍋煎 3 分鐘至表面金黃。",
      "翻面後轉中火再煎 2～3 分鐘，確認中心無血水即起鍋靜置。",
      "同鍋續炒青花菜至脆口；另煎荷包蛋或炒蛋。",
      "雞胸切片，與蛋、蔬菜一同擺盤，淋剩餘檸檬汁即可。",
    ],
    tips: ["內部溫度達 74°C 即熟透，避免過度加熱變柴。"],
    storage: "冷藏 1 天；再加熱建議切片後微波 1 分鐘並蓋濕紙巾。",
    substitutions: ["雞里肌"],
    relatedIngredients: ["雞胸肉", "雞蛋", "青花菜"],
    closing: "香草煎雞胸早午餐高蛋白又清爽，很適合健身後的早午餐。",
  },
  {
    file: "classic-caesar-chicken-salad.md",
    title: "經典凱薩嫩雞沙拉",
    description:
      "煎香的雞胸肉切片鋪在爽脆生菜上，淋上自製凱薩醬，清爽又有飽足感。",
    coverImage: "/images/recipes/classic-caesar-chicken-salad.webp",
    servings: 1,
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    difficulty: "簡單",
    calories: 380,
    protein: 35,
    fat: 20,
    carbs: 12,
    category: "家常菜",
    scenarios: ["一人料理", "高蛋白料理", "減脂料理"],
    equipment: ["平底鍋", "大碗"],
    tags: ["沙拉", "雞肉料理"],
    ingredients: [
      { name: "雞胸肉", amount: "120", unit: "公克", isCore: true },
      { name: "雞蛋", amount: "1", unit: "顆", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "檸檬汁", amount: "1.5", unit: "大匙" },
      { name: "蒜頭", amount: "1", unit: "瓣" },
      { name: "起司粉", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
    ],
    intro:
      "凱薩醬可用熟蛋黃乳化橄欖油，不必買現成醬；生菜瀝乾水分醬汁才掛得住。",
    steps: [
      "雞胸肉擦乾，撒鹽與胡椒；平底鍋中大火下油，煎至兩面金黃熟透，切片備用。",
      "雞蛋煮熟後取蛋黃壓碎，加入蒜末、檸檬汁、起司粉，再慢慢拌入橄欖油至乳化濃稠。",
      "生菜洗淨瀝乾撕成適口大小，與少許鹽輕拌後鋪盤。",
      "放上雞肉片，淋凱薩醬拌勻；可撒額外起司粉與黑胡椒。",
    ],
    tips: ["沒有生菜可用青花菜燙軟後冰鎮代替。"],
    storage: "醬汁與生菜分開裝，當日食用口感最佳。",
    substitutions: ["豆腐"],
    relatedIngredients: ["雞胸肉", "雞蛋"],
    closing: "經典凱薩嫩雞沙拉是菜單上最清爽的主菜型沙拉。",
  },
  {
    file: "smoked-salmon-caesar-salad.md",
    title: "煙燻鮭魚凱薩沙拉",
    description:
      "冷燻鮭魚搭配凱薩醬與爽脆生菜，免開大火也能完成一道精緻沙拉。",
    coverImage: "/images/recipes/smoked-salmon-caesar-salad.webp",
    servings: 1,
    prepTime: 8,
    cookTime: 5,
    totalTime: 13,
    difficulty: "簡單",
    calories: 360,
    protein: 26,
    fat: 24,
    carbs: 10,
    category: "家常菜",
    scenarios: ["一人料理", "10 分鐘料理"],
    equipment: ["小碗"],
    tags: ["沙拉", "鮭魚料理"],
    ingredients: [
      { name: "鮭魚", amount: "100", unit: "公克", isCore: true },
      { name: "雞蛋", amount: "1", unit: "顆", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "檸檬汁", amount: "1", unit: "大匙" },
      { name: "蒜頭", amount: "1", unit: "瓣" },
      { name: "起司粉", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
    ],
    intro:
      "煙燻鮭魚鹹度較高，醬汁鹽量要減少；擺盤時魚片捲曲或對折會更有層次。",
    steps: [
      "雞蛋煮熟取蛋黃，與蒜末、檸檬汁、起司粉拌勻，緩緩加入橄欖油調成凱薩醬。",
      "生菜洗淨徹底瀝乾，撕成適口大小放入大碗。",
      "淋上醬汁輕拋拌勻，再鋪上煙燻鮭魚片。",
      "現磨黑胡椒，可搭配麵包丁或烤麵包片增加口感。",
    ],
    tips: ["煙燻鮭魚可改鮭魚煎片，風味不同但同樣好吃。"],
    storage: "現拌現吃；魚片隔夜風味會下降。",
    substitutions: ["蝦仁"],
    relatedIngredients: ["鮭魚", "雞蛋"],
    closing: "煙燻鮭魚凱薩沙拉很適合夏天或不想開爐的午餐。",
  },
  {
    file: "garlic-cream-shrimp-pasta.md",
    title: "蒜香奶油鮮蝦麵",
    description:
      "蝦仁與蒜香奶油醬汁包裹義大利麵，濃潤不膩，是菜單上的經典海鮮麵。",
    coverImage: "/images/recipes/garlic-cream-shrimp-pasta.webp",
    servings: 1,
    prepTime: 8,
    cookTime: 16,
    totalTime: 24,
    difficulty: "簡單",
    calories: 520,
    protein: 34,
    fat: 22,
    carbs: 54,
    category: "飯麵",
    scenarios: ["一人料理", "高蛋白料理"],
    equipment: ["湯鍋", "平底鍋"],
    tags: ["義大利麵", "海鮮料理"],
    ingredients: [
      { name: "義大利麵", amount: "80", unit: "公克", isCore: true },
      { name: "蝦仁", amount: "120", unit: "公克", isCore: true },
      { name: "蒜頭", amount: "3", unit: "瓣", isCore: false },
    ],
    seasonings: [
      { name: "奶油", amount: "20", unit: "公克" },
      { name: "牛奶", amount: "100", unit: "毫升" },
      { name: "橄欖油", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "檸檬汁", amount: "1", unit: "小匙" },
    ],
    intro:
      "蝦仁與麵分開處理：蝦仁快炒保留彈性，奶油醬用煮麵水調整濃稠度最順口。",
    steps: [
      "煮麵水加鹽，義大利麵煮至 al dente，瀝乾保留 1 杯煮麵水；蝦仁去腸洗淨並吸乾。",
      "平底鍋下橄欖油與蒜末，小火炒至蒜香釋出，轉大火下蝦仁快炒至變色彎曲，起鍋備用。",
      "同鍋加入奶油與牛奶，小火煮滾後加少許煮麵水攪勻成濃稠奶醬。",
      "放入麵條與蝦仁，轉大火翻拌 1 分鐘讓醬汁包裹麵條，以鹽、胡椒與檸檬汁調味。",
    ],
    tips: ["奶醬全程小火，避免油水分離。"],
    storage: "現做現吃；隔夜再加熱需補牛奶。",
    substitutions: ["鮭魚丁"],
    relatedIngredients: ["義大利麵", "蝦仁", "蒜頭"],
    closing: "蒜香奶油鮮蝦麵是義大利麵區的人氣濃郁款。",
  },
  {
    file: "truffle-mushroom-farfalle.md",
    title: "黑松露野菇蝴蝶麵",
    description:
      "蝴蝶麵搭配多種菇類與松露風味，香氣濃郁，素食者也可省略起司享用。",
    coverImage: "/images/recipes/truffle-mushroom-farfalle.webp",
    servings: 1,
    prepTime: 7,
    cookTime: 15,
    totalTime: 22,
    difficulty: "簡單",
    calories: 460,
    protein: 14,
    fat: 18,
    carbs: 58,
    category: "飯麵",
    scenarios: ["一人料理", "省錢料理"],
    equipment: ["湯鍋", "平底鍋"],
    tags: ["義大利麵", "菇類料理"],
    ingredients: [
      { name: "義大利麵", amount: "80", unit: "公克", isCore: true },
      { name: "菇類", amount: "150", unit: "公克", isCore: true },
      { name: "蒜頭", amount: "2", unit: "瓣", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "奶油", amount: "15", unit: "公克" },
      { name: "松露油", amount: "1", unit: "小匙" },
      { name: "起司粉", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
    ],
    intro:
      "沒有蝴蝶麵可用一般義大利麵代替；松露油最後才加，香氣才不會被高溫破壞。",
    steps: [
      "義大利麵（或蝴蝶麵）煮至 al dente，保留半杯煮麵水；菇類切片，蒜頭切末。",
      "平底鍋中大火下橄欖油，菇類炒至出水後轉中火收乾至微焦香。",
      "加入奶油、蒜末與少許煮麵水，煮到略為乳化後放入麵條拌勻。",
      "關火後加入起司粉、松露油與黑胡椒快速拌勻即可起鍋。",
    ],
    tips: ["松露油可用少許香菇粉與橄欖油代替。"],
    storage: "現做現吃；菇類隔夜會出水影響口感。",
    substitutions: ["青花菜"],
    relatedIngredients: ["義大利麵", "菇類", "蒜頭"],
    closing: "黑松露野菇蝴蝶麵香氣足，是義大利麵區的素食友好選項。",
  },
  {
    file: "spicy-garlic-bacon-pasta.md",
    title: "蒜辣培根橄欖油麵",
    description:
      "培根油脂與蒜、辣椒炒出香氣，拌入義大利麵就是經典的 aglio olio 進階版。",
    coverImage: "/images/recipes/spicy-garlic-bacon-pasta.webp",
    servings: 1,
    prepTime: 6,
    cookTime: 14,
    totalTime: 20,
    difficulty: "簡單",
    calories: 540,
    protein: 18,
    fat: 26,
    carbs: 56,
    category: "飯麵",
    scenarios: ["一人料理", "10 分鐘料理"],
    equipment: ["湯鍋", "平底鍋"],
    tags: ["義大利麵", "蒜香料理"],
    ingredients: [
      { name: "義大利麵", amount: "80", unit: "公克", isCore: true },
      { name: "培根", amount: "60", unit: "公克", isCore: true },
      { name: "蒜頭", amount: "4", unit: "瓣", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "1", unit: "大匙" },
      { name: "乾辣椒", amount: "1/2", unit: "小匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
    ],
    intro:
      "培根本身會出油，後續橄欖油不必加太多；辣椒與蒜都要小心火候，避免炒焦。",
    steps: [
      "義大利麵煮至 al dente，保留半杯煮麵水；培根切小片，蒜頭切薄片。",
      "冷鍋下培根，中小火慢煎出油至微脆，取出培根留油在鍋中。",
      "蒜末與乾辣椒入鍋，小火炒至蒜香明顯，倒入煮麵水 3 大匙煮滾。",
      "加入麵條與培根，大火翻拌 1 分鐘收汁，以鹽與胡椒調味即可。",
    ],
    tips: ["不吃辣可省略辣椒，一樣香。"],
    storage: "現做現吃最佳。",
    substitutions: ["臘肉", "火腿"],
    relatedIngredients: ["義大利麵", "蒜頭"],
    closing: "蒜辣培根橄欖油麵鹹香夠味，很適合想吃重口味麵食的夜晚。",
  },
  {
    file: "garden-vegetable-pasta.md",
    title: "田園時蔬義大利麵",
    description:
      "番茄、櫛瓜與甜椒快炒後拌麵，色彩繽紛、口味清爽，素食也適合。",
    coverImage: "/images/recipes/garden-vegetable-pasta.webp",
    servings: 1,
    prepTime: 10,
    cookTime: 14,
    totalTime: 24,
    difficulty: "簡單",
    calories: 400,
    protein: 12,
    fat: 12,
    carbs: 58,
    category: "飯麵",
    scenarios: ["一人料理", "減脂料理"],
    equipment: ["湯鍋", "平底鍋"],
    tags: ["義大利麵", "蔬菜料理"],
    ingredients: [
      { name: "義大利麵", amount: "80", unit: "公克", isCore: true },
      { name: "番茄", amount: "1", unit: "顆", isCore: true },
      { name: "櫛瓜", amount: "1/2", unit: "條", isCore: false },
      { name: "甜椒", amount: "1/4", unit: "顆", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "蒜頭", amount: "2", unit: "瓣" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "番茄醬", amount: "1", unit: "大匙" },
    ],
    intro:
      "蔬菜切大小一致，下鍋順序由硬到軟；醬汁不宜過濃，才能保留田園清爽感。",
    steps: [
      "義大利麵煮至 al dente，保留半杯煮麵水；番茄切丁，櫛瓜與甜椒切小丁，蒜切末。",
      "平底鍋中大火下橄欖油，先炒甜椒與櫛瓜 2 分鐘，再加入番茄與蒜末炒軟。",
      "加入番茄醬與 3 大匙煮麵水，煮到略稠後放入麵條。",
      "大火翻拌 1 分鐘，以鹽與胡椒調味，起鍋前可淋少許橄欖油增香。",
    ],
    tips: ["沒有櫛瓜可改用青花菜丁。"],
    storage: "冷藏 1 天；加熱時補少許水。",
    substitutions: ["高麗菜"],
    relatedIngredients: ["義大利麵", "番茄"],
    closing: "田園時蔬義大利麵是義大利麵區最清爽的日常選擇。",
  },
  {
    file: "spicy-seafood-tomato-pasta.md",
    title: "海鮮番茄辣麵",
    description:
      "番茄酸香搭配蝦仁與辣椒，做出煙花女風味的海鮮辣麵，開胃又飽足。",
    coverImage: "/images/recipes/spicy-seafood-tomato-pasta.webp",
    servings: 1,
    prepTime: 9,
    cookTime: 16,
    totalTime: 25,
    difficulty: "中等",
    calories: 480,
    protein: 30,
    fat: 14,
    carbs: 56,
    category: "飯麵",
    scenarios: ["一人料理", "高蛋白料理"],
    equipment: ["湯鍋", "平底鍋"],
    tags: ["義大利麵", "海鮮料理"],
    ingredients: [
      { name: "義大利麵", amount: "80", unit: "公克", isCore: true },
      { name: "蝦仁", amount: "100", unit: "公克", isCore: true },
      { name: "番茄", amount: "2", unit: "顆", isCore: true },
    ],
    seasonings: [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "蒜頭", amount: "3", unit: "瓣" },
      { name: "乾辣椒", amount: "1/2", unit: "小匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "橄欖", amount: "5", unit: "顆" },
    ],
    intro:
      "番茄要去皮切丁才易煮出濃汁；蝦仁最後下鍋，避免過熟影響口感。",
    steps: [
      "番茄底部劃十字燙 30 秒去皮切丁；義大利麵煮至 al dente，保留煮麵水；蝦仁去腸吸乾。",
      "平底鍋下橄欖油，爆香蒜末與乾辣椒，加入番茄丁中火炒到出水變稠。",
      "加入 4 大匙煮麵水與切半的橄欖，煮滾後調整鹽與胡椒。",
      "放入麵條拌勻，最後下蝦仁大火炒至變色即起鍋。",
    ],
    tips: ["辣度可依個人口味調整辣椒量。"],
    storage: "現做現吃；海鮮隔夜風味會下降。",
    substitutions: ["蛤蜊", "透抽"],
    relatedIngredients: ["義大利麵", "蝦仁", "番茄"],
    closing: "海鮮番茄辣麵酸鹹帶辣，是義大利麵區最開胃的選項。",
  },
  {
    file: "cajun-fries.md",
    title: "肯瓊香辣薯條",
    description:
      "馬鈴薯切條後先炸再拌肯瓊香料，外酥內軟，當配菜或小點都很合適。",
    coverImage: "/images/recipes/cajun-fries.webp",
    servings: 1,
    prepTime: 12,
    cookTime: 18,
    totalTime: 30,
    difficulty: "中等",
    calories: 380,
    protein: 5,
    fat: 18,
    carbs: 48,
    category: "家常菜",
    scenarios: ["一人料理", "氣炸鍋料理"],
    equipment: ["平底鍋或氣炸鍋"],
    tags: ["小點", "炸物"],
    ingredients: [
      { name: "馬鈴薯", amount: "2", unit: "顆", isCore: true },
    ],
    seasonings: [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "甜椒粉", amount: "1", unit: "小匙" },
      { name: "蒜粉", amount: "1/2", unit: "小匙" },
      { name: "辣椒粉", amount: "1/4", unit: "小匙" },
    ],
    intro:
      "薯條泡冷水去澱粉、瀝乾後再炸，口感更酥脆；香料趁熱拌入才入味。",
    steps: [
      "馬鈴薯去皮切粗條，泡冷水 15 分鐘，瀝乾後用紙巾吸乾。",
      "油鍋或平底鍋油溫 170°C，分批下薯條炸 4 分鐘至微金黃，撈出瀝油。",
      "油溫升至 190°C，薯條回鍋炸 1～2 分鐘至外層酥脆，撈出瀝油。",
      "趁熱拌入鹽、胡椒與肯瓊香料粉（甜椒粉、蒜粉、辣椒粉），立即上桌。",
    ],
    tips: ["氣炸鍋 200°C 烤 18 分鐘，中途翻面並噴油，可減少用油量。"],
    storage: "現炸現吃；隔夜會變軟。",
    substitutions: ["地瓜條"],
    relatedIngredients: [],
    closing: "肯瓊香辣薯條是小點區最下酒的選擇之一。",
  },
  {
    file: "fish-and-chips.md",
    title: "英式炸魚薯條",
    description:
      "鱈魚裹炸粉酥炸，搭配現炸薯條與檸檬，重現英式小館風味。",
    coverImage: "/images/recipes/fish-and-chips.webp",
    servings: 1,
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    difficulty: "中等",
    calories: 620,
    protein: 38,
    fat: 32,
    carbs: 52,
    category: "主菜",
    scenarios: ["一人料理"],
    equipment: ["平底鍋", "炸鍋或深平底鍋"],
    tags: ["小點", "炸魚"],
    ingredients: [
      { name: "鱈魚", amount: "1", unit: "片", isCore: true },
      { name: "馬鈴薯", amount: "2", unit: "顆", isCore: true },
    ],
    seasonings: [
      { name: "麵粉", amount: "4", unit: "大匙" },
      { name: "雞蛋", amount: "1", unit: "顆" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "檸檬汁", amount: "1", unit: "大匙" },
      { name: "橄欖油", amount: "適量", unit: "" },
    ],
    intro:
      "魚與薯條可共用油鍋，但魚排務必吸乾；炸好後先放網架，才不會回潮變軟。",
    steps: [
      "馬鈴薯切條泡冷水 15 分鐘，瀝乾吸乾；鱈魚吸乾，撒鹽與胡椒。",
      "薯條入 170°C 油鍋炸 4 分鐘，撈出；油溫升至 190°C 再炸 2 分鐘至酥脆。",
      "魚片依序沾麵粉、蛋液、麵粉，下 170°C 油鍋炸至金黃，約每面 3 分鐘。",
      "魚排與薯條放網架瀝油，撒鹽，附檸檬汁與塔塔醬（可選）上桌。",
    ],
    tips: ["一次炸太多會降溫，建議分批炸。"],
    storage: "現做現吃。",
    substitutions: ["鮭魚"],
    relatedIngredients: ["雞蛋"],
    closing: "英式炸魚薯條份量感十足，適合週末小放縱。",
  },
  {
    file: "fried-trio-platter.md",
    title: "炸物三重奏",
    description:
      "薯條、炸鱈魚與起司條一次完成，適合分享或當主菜配菜的小點拼盤。",
    coverImage: "/images/recipes/fried-trio-platter.webp",
    servings: 2,
    prepTime: 15,
    cookTime: 22,
    totalTime: 37,
    difficulty: "中等",
    calories: 720,
    protein: 32,
    fat: 42,
    carbs: 58,
    category: "家常菜",
    scenarios: ["一人料理"],
    equipment: ["炸鍋或深平底鍋", "烤箱"],
    tags: ["小點", "炸物"],
    ingredients: [
      { name: "馬鈴薯", amount: "2", unit: "顆", isCore: true },
      { name: "鱈魚", amount: "1", unit: "片", isCore: true },
      { name: "起司條", amount: "6", unit: "根", isCore: true },
    ],
    seasonings: [
      { name: "麵粉", amount: "5", unit: "大匙" },
      { name: "雞蛋", amount: "1", unit: "顆" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "橄欖油", amount: "適量", unit: "" },
    ],
    intro:
      "三種食材油溫需求不同：起司條火大易爆漿，魚排與薯條需穩定中溫油炸。",
    steps: [
      "馬鈴薯切條泡冷水後瀝乾；鱈魚、起司條分別準備，起司條可先冷凍 10 分鐘較不易融。",
      "油溫 170°C 先炸薯條至金黃，撈出瀝油；同溫度炸魚排至兩面酥脆。",
      "起司條裹薄麵粉與蛋液，油溫 180°C 快速炸至外皮金黃，內部起司剛融化即撈出。",
      "三種炸物分區擺盤，附番茄醬或芥末醬，趁熱食用。",
    ],
    tips: ["起司條炸太久會破皮漏餡，約 1 分鐘內起鍋。"],
    storage: "現做現吃；起司條冷掉會變硬。",
    substitutions: ["雞塊"],
    relatedIngredients: ["雞蛋"],
    closing: "炸物三重奏適合朋友小聚或想一次滿足多種口感時。",
  },
  {
    file: "chefs-daily-soup.md",
    title: "主廚每日例湯",
    description:
      "以當季蔬菜與雞骨高湯慢煮，清爽不油膩，可隨冰箱食材靈活調整。",
    coverImage: "/images/recipes/chefs-daily-soup.webp",
    servings: 2,
    prepTime: 10,
    cookTime: 25,
    totalTime: 35,
    difficulty: "簡單",
    calories: 120,
    protein: 6,
    fat: 4,
    carbs: 16,
    category: "湯品",
    scenarios: ["一人料理", "冰箱清庫存"],
    equipment: ["湯鍋"],
    tags: ["湯品", "清冰箱"],
    ingredients: [
      { name: "紅蘿蔔", amount: "1/2", unit: "根", isCore: false },
      { name: "洋蔥", amount: "1/4", unit: "顆", isCore: false },
      { name: "高麗菜", amount: "100", unit: "公克", isCore: false },
      { name: "番茄", amount: "1", unit: "顆", isCore: false },
    ],
    seasonings: [
      { name: "水", amount: "800", unit: "毫升" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
      { name: "橄欖油", amount: "1", unit: "小匙" },
    ],
    intro:
      "例湯沒有固定配方，原則是先炒香洋蔥建立底味，再加水與硬質蔬菜燉煮。",
    steps: [
      "紅蘿蔔、洋蔥、高麗菜、番茄洗淨切塊；番茄可先劃刀燙去皮。",
      "湯鍋下橄欖油，小火炒洋蔥至透明出香味，加入紅蘿蔔與高麗菜拌炒 2 分鐘。",
      "倒入冷水或高湯，大火煮滾後轉小火蓋鍋煮 15 分鐘。",
      "加入番茄再煮 5 分鐘，以鹽與胡椒調味；可依喜好打成泥或保留塊狀。",
      "起鍋前試味道，太淡可補鹽，想更濃可加少許番茄醬。",
    ],
    tips: ["有雞骨或昆布可一起燉，湯頭會更鮮。"],
    storage: "冷藏 2 天；冷凍 1 週，加熱時勿煮滾太久。",
    substitutions: ["南瓜", "菇類"],
    relatedIngredients: ["紅蘿蔔", "洋蔥", "高麗菜", "番茄"],
    closing: "主廚每日例湯是清冰箱與開胃的最佳彈性菜色。",
  },
  {
    file: "honey-cajun-chicken-wings.md",
    title: "蜜汁紐澳良雞翅",
    description:
      "雞翅先烤至金黃，再刷上蜂蜜與紐澳良香料，甜辣帶焦香，派對小點首選。",
    coverImage: "/images/recipes/honey-cajun-chicken-wings.webp",
    servings: 2,
    prepTime: 10,
    cookTime: 28,
    totalTime: 38,
    difficulty: "中等",
    calories: 520,
    protein: 38,
    fat: 32,
    carbs: 22,
    category: "主菜",
    scenarios: ["一人料理", "氣炸鍋料理"],
    equipment: ["烤箱或氣炸鍋", "烤盤"],
    tags: ["小點", "雞肉料理"],
    ingredients: [
      { name: "雞翅", amount: "8", unit: "支", isCore: true },
    ],
    seasonings: [
      { name: "蜂蜜", amount: "2", unit: "大匙" },
      { name: "醬油", amount: "1", unit: "大匙" },
      { name: "甜椒粉", amount: "1", unit: "小匙" },
      { name: "蒜粉", amount: "1/2", unit: "小匙" },
      { name: "辣椒粉", amount: "1/4", unit: "小匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
    ],
    intro:
      "雞翅表面擦乾再烤，皮才會脆；蜜汁醬最後 5 分鐘才刷，避免過早焦糊。",
    steps: [
      "雞翅洗淨擦乾，以鹽、胡椒與一半香料粉抓醃 15 分鐘。",
      "烤箱 200°C 預熱，雞翅鋪烘焙紙烤 18 分鐘，中途翻面一次。",
      "蜂蜜、醬油與剩餘香料粉調成刷醬。",
      "雞翅刷上蜜汁醬，再烤 8～10 分鐘至表面焦糖化，靜置 2 分鐘即可。",
    ],
    tips: ["氣炸鍋 190°C 約 22 分鐘，最後 5 分鐘刷醬效果相同。"],
    storage: "冷藏 2 天；再加熱用烤箱較能恢復脆皮。",
    substitutions: ["雞腿肉塊"],
    relatedIngredients: ["雞胸肉"],
    closing: "蜜汁紐澳良雞翅甜辣夠味，是小點區最適合聚會的一道。",
  },
  {
    file: "seasonal-greens-salad-bowl.md",
    title: "季節鮮蔬沙拉碗",
    description:
      "依季節蔬菜搭配清爽油醋醬，一碗就能補足纖維，也可當主餐配菜。",
    coverImage: "/images/recipes/seasonal-greens-salad-bowl.webp",
    servings: 1,
    prepTime: 10,
    cookTime: 0,
    totalTime: 10,
    difficulty: "簡單",
    calories: 180,
    protein: 4,
    fat: 12,
    carbs: 14,
    category: "家常菜",
    scenarios: ["一人料理", "減脂料理", "10 分鐘料理"],
    equipment: ["大碗"],
    tags: ["沙拉", "蔬菜料理"],
    ingredients: [
      { name: "番茄", amount: "1", unit: "顆", isCore: true },
      { name: "小黃瓜", amount: "1/2", unit: "條", isCore: false },
      { name: "紅蘿蔔", amount: "1/3", unit: "根", isCore: false },
    ],
    seasonings: [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "檸檬汁", amount: "1", unit: "大匙" },
      { name: "鹽", amount: "少許", unit: "" },
      { name: "黑胡椒", amount: "少許", unit: "" },
    ],
    intro:
      "沙拉好吃的前提是蔬菜夠乾爽；油醋醬先調好再拌，葉菜才不會塌軟。",
    steps: [
      "生菜或其他葉菜洗淨，用脫水機或紙巾徹底瀝乾；番茄、小黃瓜、紅蘿蔔切適口大小。",
      "小碗將橄欖油、檸檬汁、鹽與胡椒攪成油醋醬。",
      "所有蔬菜放入大碗，淋上醬汁輕拋拌勻。",
      "可依喜好加堅果、起司丁或水煮蛋增加飽足感。",
    ],
    tips: ["紅蘿蔔可刨絲，口感更清爽。"],
    storage: "現拌現吃；醬汁請分開裝。",
    substitutions: ["青花菜燙軟", "高麗菜絲"],
    relatedIngredients: ["番茄", "紅蘿蔔"],
    closing: "季節鮮蔬沙拉碗能隨季節換蔬菜，是菜單最靈活的一道。",
  },
];

for (const recipe of recipes) {
  const path = join(OUT, recipe.file);
  const { file, ...data } = recipe;
  writeFileSync(path, serialize(data), "utf8");
  console.log("wrote", file);
}

console.log(`Done: ${recipes.length} recipes`);
