import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const ingredients = JSON.parse(readFileSync(join(ROOT, "src/data/ingredients.json"), "utf8"));

const catalog = new Map();
for (const item of ingredients) {
  catalog.set(item.name, item.slug);
  for (const alias of item.aliases) catalog.set(alias, item.slug);
}

const SEASONING_LIKE = new Set([
  "鹽", "糖", "醬油", "米酒", "白胡椒", "黑胡椒", "橄欖油", "奶油", "蒜頭", "番茄醬",
  "味噌", "昆布", "柴魚高湯", "水", "麵粉", "白芝麻", "七味粉", "蜂蜜", "檸檬汁", "麻油",
  "香油", "醋", "烏醋", "蠔油", "沙茶醬", "咖哩粉", "辣椒粉", "甜椒粉", "玉米粉", "太白粉",
  "地瓜粉", "青醬", "起司", "起司絲", "帕瑪森起司", "鮮奶油", "豆瓣醬", "冰糖", "紹興酒",
  "枸杞", "薑", "薑片", "薑絲", "辣椒", "乾辣椒", "花椒", "羅勒", "香菜", "芹菜", "蒜苗",
  "海苔", "海苔碎", "海苔絲", "美乃滋", "味醂", "薄鹽醬油", "蔭油", "蔭油膏", "醬油膏",
  "甜辣醬", "白醬", "紅糟", "啤酒", "高湯", "柴魚", "蔥", "蔥花", "蔥白", "蔥綠",
]);

const recipeDir = join(ROOT, "src/content/recipes");
const used = new Map();

for (const file of readdirSync(recipeDir).filter((f) => f.endsWith(".md"))) {
  const raw = readFileSync(join(recipeDir, file), "utf8").replace(/\r\n/g, "\n");
  const fmEnd = raw.indexOf("\n---\n", 4);
  const fm = raw.slice(0, fmEnd);
  const ingBlock =
    fm.match(/^ingredients:\n([\s\S]*?)(?=^seasonings:|^intro:|^steps:|^tips:|^storage:|^tags:|^customAdditions:|^relatedIngredients:|^featured:|^publishedAt:)/m)?.[1] ?? "";

  for (const block of ingBlock.split(/\n(?=- name:)/)) {
    const name = block.match(/name:\s*"?([^"\n]+)"?/)?.[1]?.trim();
    if (name) used.set(name, (used.get(name) ?? 0) + 1);
  }
}

const allUsed = new Map();

function collectNames(block, isListItems = false) {
  if (isListItems) {
    for (const m of block.matchAll(/^- (.+)$/gm)) {
      const name = m[1].replace(/^["']|["']$/g, "").trim();
      if (name.length >= 2) allUsed.set(name, (allUsed.get(name) ?? 0) + 1);
    }
    return;
  }
  for (const blockPart of block.split(/\n(?=- name:)/)) {
    const name = blockPart.match(/name:\s*"?([^"\n]+)"?/)?.[1]?.trim();
    if (name) allUsed.set(name, (allUsed.get(name) ?? 0) + 1);
  }
}

for (const file of readdirSync(recipeDir).filter((f) => f.endsWith(".md"))) {
  const raw = readFileSync(join(recipeDir, file), "utf8").replace(/\r\n/g, "\n");
  const fmEnd = raw.indexOf("\n---\n", 4);
  const fm = raw.slice(0, fmEnd);
  for (const section of ["ingredients", "seasonings"]) {
    const block =
      fm.match(new RegExp(`^${section}:\\n([\\s\\S]*?)(?=^[a-zA-Z_][a-zA-Z0-9_]*:|$)`, "m"))?.[1] ?? "";
    collectNames(block);
  }
  for (const section of ["customAdditions", "substitutions", "relatedIngredients"]) {
    const block =
      fm.match(new RegExp(`^${section}:\\n([\\s\\S]*?)(?=^[a-zA-Z_][a-zA-Z0-9_]*:|$)`, "m"))?.[1] ?? "";
    collectNames(block, true);
  }
}

const missing = [...allUsed.entries()]
  .filter(([name]) => !catalog.has(name))
  .map(([name, count]) => ({ name, count, seasoningLike: SEASONING_LIKE.has(name) }))
  .sort((a, b) => b.count - a.count);

const coreMissing = missing.filter((x) => !x.seasoningLike);
const categories = ingredients.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] ?? 0) + 1;
  return acc;
}, {});

const recipeCoverage = ingredients.map((item) => {
  const names = [item.name, ...item.aliases];
  let recipeCount = 0;
  for (const file of readdirSync(recipeDir).filter((f) => f.endsWith(".md"))) {
    const raw = readFileSync(join(recipeDir, file), "utf8");
    if (names.some((n) => raw.includes(`name: ${n}`) || raw.includes(`name: "${n}"`))) recipeCount++;
  }
  return { slug: item.slug, name: item.name, category: item.category, recipeCount };
}).sort((a, b) => a.recipeCount - b.recipeCount);

console.log(
  JSON.stringify(
    {
      catalogCount: ingredients.length,
      categories,
      uniqueIngredientNamesInRecipes: used.size,
      uniqueAllNamesInRecipes: allUsed.size,
      missingTotal: missing.length,
      coreMissingCount: coreMissing.length,
      coreMissingAll: coreMissing,
      seasoningMissingTop20: missing.filter((x) => x.seasoningLike).slice(0, 20),
      lowCoverageIngredients: recipeCoverage.filter((x) => x.recipeCount <= 2),
      catalogSlugs: ingredients.map((i) => i.slug),
    },
    null,
    2,
  ),
);
