import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const ingredients = JSON.parse(readFileSync(join(ROOT, "src/data/ingredients.json"), "utf8"));

const catalog = new Map();
for (const item of ingredients) {
  catalog.set(item.name, item.slug);
  for (const alias of item.aliases) catalog.set(alias, item.slug);
}

const TW_STAPLES = [
  { name: "空心菜", category: "蔬菜", note: "快炒最常見綠葉菜" },
  { name: "菠菜", category: "蔬菜", note: "湯品、燙青菜" },
  { name: "芹菜", category: "蔬菜", note: "炒香、湯品" },
  { name: "韭菜", category: "蔬菜", note: "煎餅、炒蛋" },
  { name: "茄子", category: "蔬菜", note: "家常快炒" },
  { name: "絲瓜", category: "蔬菜", note: "清炒、湯品" },
  { name: "苦瓜", category: "蔬菜", note: "鹹蛋、清炒" },
  { name: "竹筍", category: "蔬菜", note: "肉絲、滷味" },
  { name: "筊白筍", category: "蔬菜", note: "肉絲快炒" },
  { name: "豌豆", category: "蔬菜", note: "炒飯、配菜" },
  { name: "毛豆", category: "蔬菜", note: "下酒、涼拌" },
  { name: "豆芽菜", category: "蔬菜", note: "快炒、湯麵" },
  { name: "大白菜", category: "蔬菜", note: "火鍋、滷白菜" },
  { name: "小白菜", category: "蔬菜", note: "可能已被青江菜 alias 涵蓋" },
  { name: "水餃", category: "加工品", note: "冷凍常備" },
  { name: "香腸", category: "加工品", note: "炒飯、配菜" },
  { name: "臘肉", category: "加工品", note: "食譜 customAdditions 已出現" },
  { name: "菜脯", category: "加工品", note: "炒蛋、配菜" },
  { name: "雞腿", category: "肉類", note: "三杯雞、滷味" },
  { name: "雞絞肉", category: "肉類", note: "丸子、蒸肉" },
  { name: "排骨", category: "肉類", note: "滷排骨、炸排骨" },
  { name: "絞肉", category: "肉類", note: "可能已被豬肉 alias 涵蓋" },
  { name: "透抽", category: "海鮮", note: "食譜已出現" },
  { name: "花枝", category: "海鮮", note: "快炒、燙" },
  { name: "虱目魚", category: "海鮮", note: "台南家常" },
  { name: "白帶魚", category: "海鮮", note: "煎、紅燒" },
  { name: "吻仔魚", category: "海鮮", note: "煎蛋、湯" },
  { name: "吻魚", category: "海鮮", note: "同吻仔魚" },
  { name: "油豆腐", category: "豆製品", note: "滷味、火鍋" },
  { name: "百頁豆腐", category: "豆製品", note: "火鍋、燒烤" },
  { name: "冬粉", category: "主食", note: "冬粉蝦、火鍋" },
  { name: "米粉", category: "主食", note: "新竹米粉" },
  { name: "粄條", category: "主食", note: "客家、南部" },
  { name: "蘿蔔糕", category: "加工品", note: "煎蘿蔔糕" },
  { name: "年糕", category: "主食", note: "年節、炒年糕" },
  { name: "吐司", category: "主食", note: "早餐、三明治" },
  { name: "香菜", category: "辛香料", note: "湯品、沾醬" },
  { name: "辣椒", category: "辛香料", note: "調味料欄常見" },
  { name: "檸檬", category: "辛香料", note: "海鮮、飲品" },
  { name: "小番茄", category: "蔬菜", note: "食譜已出現" },
  { name: "牛奶", category: "加工品", note: "食譜已出現" },
  { name: "鮮奶", category: "加工品", note: "同牛奶" },
  { name: "奶油", category: "加工品", note: "調味料欄高頻" },
  { name: "海苔", category: "加工品", note: "飯糰、拌飯" },
];

const recipeDir = join(ROOT, "src/content/recipes");
const inRecipes = new Map();

for (const file of readdirSync(recipeDir).filter((f) => f.endsWith(".md"))) {
  const raw = readFileSync(join(recipeDir, file), "utf8").replace(/\r\n/g, "\n");
  for (const staple of TW_STAPLES) {
    if (raw.includes(staple.name)) {
      inRecipes.set(staple.name, (inRecipes.get(staple.name) ?? 0) + 1);
    }
  }
}

const missing = TW_STAPLES.filter((s) => !catalog.has(s.name))
  .map((s) => ({ ...s, recipeMentions: inRecipes.get(s.name) ?? 0 }))
  .sort((a, b) => b.recipeMentions - a.recipeMentions || a.name.localeCompare(b.name, "zh-Hant"));

const coveredByAlias = TW_STAPLES.filter((s) => catalog.has(s.name)).map((s) => ({
  name: s.name,
  slug: catalog.get(s.name),
}));

console.log(
  JSON.stringify(
    {
      catalogCount: ingredients.length,
      missingStapleCount: missing.length,
      missingInCatalog: missing,
      alreadyCovered: coveredByAlias,
      priorityAdd: missing.filter((s) => s.recipeMentions > 0),
      prioritySeo: missing.filter((s) => s.recipeMentions === 0).slice(0, 15),
    },
    null,
    2,
  ),
);
