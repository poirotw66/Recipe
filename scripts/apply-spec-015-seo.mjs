import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const RECIPE_DIR = join(ROOT, "src/content/recipes");

/** @type {Record<string, { description: string; intro: string }>} */
const SEO_UPDATES = {
  "tomato-egg-rice": {
    description: "租屋族一人份番茄雞蛋飯，10 分鐘用剩飯、番茄與雞蛋快速開飯，適合平日晚餐清冰箱。",
    intro: "如果你手邊有剩飯和兩顆雞蛋，這道一人份番茄雞蛋飯能在 10 分鐘內完成。很適合租屋小廚房、想快速清掉番茄與蛋的平日夜晚。"
  },
  "tofu-scrambled-eggs": {
    description: "一人份豆腐炒蛋，10 分鐘省錢快手菜，豆腐與雞蛋雙蛋白，適合租屋族平日晚餐。",
    intro: "豆腐和雞蛋都是冰箱常備品，這道一人份料理 10 分鐘就能上桌。特別適合想控制餐費、又想快速吃飽的租屋族。"
  },
  "garlic-oil-pasta": {
    description: "一人份蒜香義大利麵，15 分鐘租屋族快手晚餐，蒜頭與橄欖油做出簡單鹹香麵食。",
    intro: "沒有複雜醬料也能煮出好吃的一人份麵食。這道蒜香義大利麵 15 分鐘完成，適合下班後想快速開飯的租屋族。"
  },
  "scallion-beef-fried-rice": {
    description: "蔥花牛肉炒飯一人份，10 分鐘用剩飯與牛肉片清冰箱，租屋族快手晚餐首選。",
    intro: "剩飯加牛肉片與青蔥，這道一人份炒飯 10 分鐘就能完成。很適合週末清冰箱、又想快速吃飽的平日晚餐。"
  },
  "garlic-mushroom-chicken": {
    description: "蒜香菇類雞肉一人份主菜，20 分鐘租屋族平底鍋料理，雞肉與菇類高蛋白晚餐。",
    intro: "雞肉與菇類是租屋族冰箱裡很常見的組合。這道一人份蒜香料理 20 分鐘完成，平底鍋就能做，不必準備太多鍋具。"
  },
  "air-fryer-salmon-broccoli": {
    description: "氣炸鍋鮭魚青花菜一人份，25 分鐘少顧鍋高蛋白晚餐，適合租屋族減脂主菜。",
    intro: "想用氣炸鍋快速做一人份主菜時，鮭魚配青花菜是很穩的組合。25 分鐘、少顧鍋，適合租屋族平日晚餐。"
  },
  "steamed-chicken-bento": {
    description: "電鍋蒸雞胸便當菜一人份，30 分鐘可分裝帶走，適合工作日準備高蛋白便當。",
    intro: "想提前準備一人份便當時，電鍋蒸雞胸是穩定又好分裝的做法。這道菜適合週日晚上先做好，平日加熱就能吃。"
  },
  "beef-broccoli-stirfry": {
    description: "牛肉青花菜快炒一人份，20 分鐘租屋族家常菜，高蛋白又適合平日晚餐。",
    intro: "牛肉片與青花菜是超市很好買的組合。這道一人份快炒 20 分鐘完成，適合租屋族想快速做有飽足感晚餐的時候。"
  },
  "pesto-chicken-pasta": {
    description: "一人份青醬雞肉義大利麵，20 分鐘快手麵食，雞胸肉與青醬適合平日晚餐。",
    intro: "想在一人份小鍋裡快速完成麵食時，青醬雞肉義大利麵是很好入口的選擇。20 分鐘就能上桌，適合下班後的平日晚餐。"
  },
  "cabbage-egg-stir-fry": {
    description: "高麗菜炒蛋一人份，10 分鐘清冰箱快手菜，高麗菜與雞蛋適合租屋族平日晚餐。",
    intro: "高麗菜和雞蛋常常同時躺在冰箱裡。這道一人份清冰箱料理 10 分鐘就能完成，很適合想快速解決晚餐的租屋族。"
  },
  "onion-egg-rice-bowl": {
    description: "洋蔥蛋蓋飯一人份，15 分鐘租屋族快手晚餐，洋蔥與雞蛋做出簡單鹹香蓋飯。",
    intro: "一人份料理不一定要複雜。洋蔥與雞蛋做成蓋飯，15 分鐘就能吃飽，特別適合租屋族平日晚餐。"
  },
  "scallion-egg-rice": {
    description: "蔥花蛋炒飯一人份，10 分鐘用剩飯與雞蛋快速開飯，租屋族最穩的快手晚餐之一。",
    intro: "剩飯、雞蛋、青蔥就能組成一道可靠的一人份晚餐。這道蔥花蛋炒飯 10 分鐘完成，是租屋族平日晚餐的經典選擇。"
  },
  "onion-tomato-egg-fried-rice": {
    description: "洋蔥番茄蛋炒飯一人份，15 分鐘清冰箱料理，用零散蔬菜與剩飯湊出一餐。",
    intro: "當冰箱裡只剩洋蔥、番茄和幾顆蛋時，這道一人份炒飯能幫你快速清庫存。15 分鐘完成，很適合租屋族平日夜晚。"
  },
  "tomato-onion-scrambled-eggs": {
    description: "番茄洋蔥炒蛋一人份，10 分鐘租屋族家常菜，酸甜鹹香適合配白飯或麵包。",
    intro: "番茄與洋蔥炒蛋是租屋族很好做的基礎菜。一人份 10 分鐘就能上桌，適合不想花太多時間備料的平日晚餐。"
  },
  "tomato-garlic-cabbage-eggs": {
    description: "番茄蒜香高麗菜炒蛋一人份，15 分鐘快手蔬菜料理，適合清冰箱與平日晚餐。",
    intro: "高麗菜、番茄和雞蛋都是耐放食材，這道一人份料理能幫你把它們一次消化。15 分鐘完成，適合租屋族小廚房。"
  },
  "airfryer-garlic-chicken-broccoli": {
    description: "氣炸鍋蒜香雞胸青花菜一人份，25 分鐘少顧鍋高蛋白主菜，適合減脂與便當準備。",
    intro: "氣炸鍋很適合做一人份高蛋白主菜。蒜香雞胸配青花菜 25 分鐘完成，少顧鍋又容易分裝，租屋族平日很實用。"
  }
};

const FEATURED_ON = new Set([
  "tomato-egg-rice",
  "tofu-scrambled-eggs",
  "scallion-beef-fried-rice",
  "garlic-mushroom-chicken",
  "air-fryer-salmon-broccoli",
  "steamed-chicken-bento",
  "beef-broccoli-stirfry",
  "cabbage-egg-stir-fry",
  "onion-egg-rice-bowl",
  "scallion-egg-rice",
  "onion-tomato-egg-fried-rice"
]);

function updateDescription(source, description) {
  return source.replace(/^description: .+$/m, `description: ${description}`);
}

function updateIntro(source, intro) {
  const bodyStart = source.indexOf("\n---\n", 4);
  if (bodyStart === -1) return source;
  const frontmatter = source.slice(0, bodyStart + 5);
  return `${frontmatter}\n\n${intro}\n`;
}

function updateFeatured(source, featured) {
  if (/^featured: /m.test(source)) {
    return source.replace(/^featured: .+$/m, `featured: ${featured}`);
  }
  return source.replace(/^(publishedAt:)/m, `featured: ${featured}\n$1`);
}

let seoCount = 0;
let featuredCount = 0;

for (const file of readdirSync(RECIPE_DIR).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const path = join(RECIPE_DIR, file);
  let source = readFileSync(path, "utf8");
  let changed = false;

  if (SEO_UPDATES[slug]) {
    source = updateDescription(source, SEO_UPDATES[slug].description);
    source = updateIntro(source, SEO_UPDATES[slug].intro);
    seoCount += 1;
    changed = true;
  }

  const shouldFeature = FEATURED_ON.has(slug);
  const hasFeatured = /^featured: true$/m.test(source);
  if (shouldFeature !== hasFeatured) {
    source = updateFeatured(source, shouldFeature);
    if (shouldFeature) featuredCount += 1;
    changed = true;
  }

  if (changed) {
    writeFileSync(path, source, "utf8");
  }
}

console.log(`spec-015: updated SEO for ${seoCount} recipes, featured set to ${FEATURED_ON.size} slugs (${featuredCount} newly marked true).`);
