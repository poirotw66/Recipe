import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const GEN = readFileSync(join(ROOT, "scripts/generate-prd004-recipes.mjs"), "utf8");
const SLUGS = [...GEN.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const IMPERIAL = /\b(oz|ounce|pound|lb|cup|cups|fahrenheit|°f)\b|盎司|磅|華氏/i;
const METRIC_MIX = /(\d+)\s*克(?![^\n]{0,20}公克)/;

/** @type {Record<string, string[]>} */
const ALIASES = {
  雞胸: ["雞胸肉"],
  里肌: ["豬里肌排", "豬肉"],
  蕃薯: ["地瓜"],
  白肉魚: ["鱈魚", "鯛魚"],
  魚片: ["鱈魚", "鮭魚"],
  豬肉絲: ["豬肉"],
  牛肉片: ["牛肉"],
  蔥: ["青蔥", "蔥花"],
  蔥花: ["青蔥"],
  蒜末: ["蒜頭"],
  蒜頭: ["蒜頭"],
  番茄醬: ["番茄醬"],
  白飯: ["白飯"],
  剩飯: ["白飯"],
  麵條: ["麵條", "油麵", "關廟麵", "烏龍麵", "義大利麵"],
  油麵: ["油麵", "麵條"],
  絞肉: ["豬絞肉", "豬肉"],
  雞腿: ["雞腿肉"],
  柴魚: ["柴魚高湯"],
  鮪魚: ["罐頭鮪魚"],
  豬絞肉: ["豬絞肉", "豬肉"],
};

function parseRecipe(slug) {
  const path = join(ROOT, "src/content/recipes", `${slug}.md`);
  const raw = readFileSync(path, "utf8");
  const fmEnd = raw.indexOf("\n---\n", 4);
  const fm = raw.slice(0, fmEnd);
  const body = raw.slice(fmEnd + 5);

  const getList = (key) => {
    const re = new RegExp(`^${key}:\\n((?:- .+\\n)+)`, "m");
    const m = fm.match(re);
    if (!m) return [];
    return [...m[1].matchAll(/^- "?([^"\n]+)"?/gm)].map((x) => x[1]);
  };

  const ingredients = [];
  const ingBlock = fm.match(/^ingredients:\n([\s\S]*?)(?=^seasonings:|^intro:)/m);
  if (ingBlock) {
    for (const block of ingBlock[1].split(/\n(?=- name:)/)) {
      const name = block.match(/name: "?([^"\n]+)"?/)?.[1];
      const amount = block.match(/amount: "?([^"\n]*)"?/)?.[1] ?? "";
      const unit = block.match(/unit: "?([^"\n]*)"?/)?.[1] ?? "";
      if (name) ingredients.push({ name, amount, unit, kind: "ingredient" });
    }
  }

  const seasonings = [];
  const seaBlock = fm.match(/^seasonings:\n([\s\S]*?)(?=^intro:)/m);
  if (seaBlock) {
    for (const block of seaBlock[1].split(/\n(?=- name:)/)) {
      const name = block.match(/name: "?([^"\n]+)"?/)?.[1];
      const amount = block.match(/amount: "?([^"\n]*)"?/)?.[1] ?? "";
      const unit = block.match(/unit: "?([^"\n]*)"?/)?.[1] ?? "";
      if (name) seasonings.push({ name, amount, unit, kind: "seasoning" });
    }
  }

  const steps = getList("steps");
  const customAdditions = getList("customAdditions");
  const intro = fm.match(/^intro: "?([^"\n]+)"?/m)?.[1] ?? "";
  const servings = Number(fm.match(/^servings:\s*(\d+)/m)?.[1] ?? 1);
  const cookTime = Number(fm.match(/^cookTime:\s*(\d+)/m)?.[1] ?? 0);
  const totalTime = Number(fm.match(/^totalTime:\s*(\d+)/m)?.[1] ?? 0);
  const prepTime = Number(fm.match(/^prepTime:\s*(\d+)/m)?.[1] ?? 0);
  const title = fm.match(/^title: "?([^"\n]+)"?/m)?.[1] ?? slug;

  return {
    slug, title, fm, body, ingredients, seasonings, steps, customAdditions, intro,
    servings, cookTime, totalTime, prepTime,
  };
}

const GARNISH_TOKENS = [
  "蔥花", "青蔥", "白飯", "地瓜", "白胡椒", "海苔", "海苔碎", "海苔絲",
  "七味粉", "番茄醬", "甜辣醬", "燙青菜", "火腿丁", "胡椒鹽",
];

function catalogNames(recipe) {
  const names = new Set();
  for (const item of [...recipe.ingredients, ...recipe.seasonings]) {
    names.add(item.name);
  }
  for (const addition of recipe.customAdditions ?? []) {
    names.add(addition);
    for (const token of GARNISH_TOKENS) {
      if (addition.includes(token)) names.add(token);
    }
  }
  return names;
}

function mentionedInSteps(stepText, catalog) {
  const hits = [];
  const patterns = [
    /加入([^\s，。、；]+)/g,
    /放入([^\s，。、；]+)/g,
    /拌入([^\s，。、；]+)/g,
    /淋上([^\s，。、；]+)/g,
    /撒上([^\s，。、；]+)/g,
    /附([^\s，。、；]+)食用/g,
    /([^\s，。、；]{2,6})(切|洗|拍|醃|拌|炒|炸|煮|蒸|燙)/g,
  ];
  const knownFoods = [
    "雞胸肉", "雞腿", "豬里肌排", "豬肉", "牛肉", "蝦仁", "鱈魚", "豆腐", "雞蛋", "白飯", "剩飯",
    "高麗菜", "青花菜", "地瓜", "馬鈴薯", "青蔥", "蔥花", "蒜頭", "番茄", "泡菜", "玉米", "秋葵",
    "烏龍麵", "麵條", "義大利麵", "番茄醬", "小黃瓜", "櫛瓜", "蘑菇", "香菇", "金針菇",
    "里肌肉", "梅花肉", "絞肉", "鮭魚", "透抽", "罐頭鮪魚", "鮪魚", "味噌", "昆布", "柴魚",
  ];
  if (stepText.includes("參考上方加點")) return hits;

  for (const food of knownFoods) {
    if (food === "玉米" && stepText.includes("玉米粉")) continue;
    if (food === "柴魚" && stepText.includes("柴魚高湯")) continue;
    if (stepText.includes(food) && !catalog.has(food)) {
      const ok = Object.entries(ALIASES).some(([alias, targets]) => {
        if (!stepText.includes(alias)) return false;
        return targets.some((t) => catalog.has(t));
      });
      if (!ok) hits.push(food);
    }
  }
  if (stepText.includes("番茄醬") && !catalog.has("番茄醬")) hits.push("番茄醬");
  if ((stepText.includes("蔥花") || stepText.includes("青蔥")) && !catalog.has("青蔥") && !catalog.has("蔥花")) {
    hits.push("青蔥/蔥花");
  }
  return [...new Set(hits)];
}

function auditRecipe(recipe) {
  const issues = [];
  const catalog = catalogNames(recipe);
  const allText = recipe.steps.join("\n") + recipe.intro;

  // Format & units
  if (IMPERIAL.test(allText)) {
    issues.push({ dim: "格式與單位", severity: "high", msg: "出現英制或非標準單位用語" });
  }
  const usesGongKe = /公克/.test(allText);
  const usesKe = /\d+\s*克/.test(allText);
  if (usesKe && usesGongKe) {
    issues.push({ dim: "格式與單位", severity: "low", msg: "同時使用「克」與「公克」" });
  }

  // Proportion - salt overdose
  for (const s of recipe.seasonings) {
    if (s.name.includes("鹽")) {
      const n = parseFloat(s.amount);
      if (!Number.isNaN(n) && n >= 10) {
        issues.push({ dim: "比例與份量", severity: "high", msg: `鹽 ${s.amount}${s.unit} 對一人份可能過量` });
      }
    }
    if (s.name.includes("醬油") && !Number.isNaN(parseFloat(s.amount))) {
      const n = parseFloat(s.amount);
      const unit = s.unit;
      if (unit === "大匙" && n >= 5) {
        issues.push({ dim: "比例與份量", severity: "medium", msg: `醬油 ${s.amount} 大匙偏多` });
      }
    }
  }

  // Logic - missing ingredients in steps
  for (let i = 0; i < recipe.steps.length; i++) {
    const step = recipe.steps[i];
    const missing = mentionedInSteps(step, catalog);
    for (const m of missing) {
      issues.push({ dim: "邏輯與時序", severity: "high", msg: `步驟 ${i + 1} 提到「${m}」但食材/調味清單未列` });
    }
    if (/切塊|切片|切絲/.test(step) && i < recipe.steps.length - 2) {
      const laterCook = recipe.steps.slice(i + 1).some((s) => /下鍋|入鍋|氣炸|煎煮|炒|煮/.test(s));
      const earlierCook = recipe.steps.slice(0, i).some((s) => /下鍋|入鍋|氣炸|煎煮|已經|起鍋/.test(s));
      if (earlierCook && /下鍋|入鍋|氣炸/.test(step)) {
        issues.push({ dim: "邏輯與時序", severity: "medium", msg: `步驟 ${i + 1} 時序可能矛盾（先烹調後切配？）` });
      }
    }
  }

  // Food safety
  const hasRawPoultry = catalog.has("雞胸肉") || catalog.has("雞翅") || recipe.title.includes("雞");
  const hasRawPork = catalog.has("豬里肌排") || catalog.has("豬肉") || recipe.title.includes("豬");
  const hasRawShrimp = catalog.has("蝦仁");
  const airFryer = recipe.fm.includes("氣炸鍋");
  if (airFryer && hasRawPoultry) {
    const totalAirMin = recipe.steps.join(" ").match(/氣炸[^。]*?(\d+)\s*分鐘/g);
    const mins = totalAirMin ? totalAirMin.map((x) => Number(x.match(/(\d+)/)?.[1] ?? 0)) : [];
    const sum = mins.reduce((a, b) => a + b, 0);
    if (sum > 0 && sum < 10) {
      issues.push({ dim: "物理與食安", severity: "high", msg: `氣炸雞肉合計約 ${sum} 分鐘，可能未熟透` });
    }
  }
  if (recipe.slug.includes("microwave") && hasRawPoultry) {
    issues.push({ dim: "物理與食安", severity: "medium", msg: "微波雞肉需確認中心溫度，步驟宜註明全熟標準" });
  }
  if (recipe.prepTime + recipe.cookTime > recipe.totalTime + 2) {
    issues.push({ dim: "格式與單位", severity: "medium", msg: `prep+cook (${recipe.prepTime + recipe.cookTime}) > totalTime (${recipe.totalTime})` });
  }

  // Ingredient not in site taxonomy (warn)
  const siteIng = JSON.parse(readFileSync(join(ROOT, "src/data/ingredients.json"), "utf8"));
  const siteNames = new Set(siteIng.flatMap((i) => [i.name, ...i.aliases]));
  for (const item of recipe.ingredients) {
    if (!siteNames.has(item.name)) {
      issues.push({ dim: "格式與單位", severity: "low", msg: `食材「${item.name}」不在食材庫（內鏈可能斷裂）` });
    }
  }

  return issues;
}

const report = [];
for (const slug of SLUGS) {
  if (!existsSync(join(ROOT, "src/content/recipes", `${slug}.md`))) {
    report.push({ slug, issues: [{ dim: "格式", severity: "high", msg: "檔案不存在" }] });
    continue;
  }
  const recipe = parseRecipe(slug);
  const issues = auditRecipe(recipe);
  if (issues.length) report.push({ slug, title: recipe.title, issues });
}

const byDim = { 比例與份量: 0, 邏輯與時序: 0, 物理與食安: 0, "格式與單位": 0 };
let high = 0, medium = 0, low = 0;
for (const r of report) {
  for (const i of r.issues) {
    byDim[i.dim] = (byDim[i.dim] ?? 0) + 1;
    if (i.severity === "high") high++;
    else if (i.severity === "medium") medium++;
    else low++;
  }
}

console.log(JSON.stringify({ audited: SLUGS.length, recipesWithIssues: report.length, byDim, high, medium, low, report }, null, 2));
