import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["zh-TW", "en", "ja", "ko"];

const INGREDIENT_LABELS_BY_SLUG = {
  potato: { "zh-TW": "馬鈴薯", en: "Potato", ja: "じゃがいも", ko: "감자" },
  bacon: { "zh-TW": "培根", en: "Bacon", ja: "ベーコン", ko: "베이컨" },
  cod: { "zh-TW": "鱈魚", en: "Cod", ja: "タラ", ko: "대구" },
  "chicken-wings": { "zh-TW": "雞翅", en: "Chicken wings", ja: "手羽先", ko: "닭날개" },
  "sweet-potato": { "zh-TW": "地瓜", en: "Sweet potato", ja: "さつまいも", ko: "고구마" },
  okra: { "zh-TW": "秋葵", en: "Okra", ja: "オクラ", ko: "오크라" },
  corn: { "zh-TW": "玉米", en: "Corn", ja: "とうもろこし", ko: "옥수수" },
  kimchi: { "zh-TW": "韓式泡菜", en: "Kimchi", ja: "キムチ", ko: "김치" },
  mackerel: { "zh-TW": "鯖魚", en: "Mackerel", ja: "サバ", ko: "고등어" },
  pork: { "zh-TW": "豬肉", en: "Pork", ja: "豚肉", ko: "돼지고기" },
  "canned-tuna": { "zh-TW": "罐頭鮪魚", en: "Canned tuna", ja: "ツナ缶", ko: "참치 통조림" },
  "green-pepper": { "zh-TW": "青椒", en: "Green bell pepper", ja: "ピーマン", ko: "피망" },
  cucumber: { "zh-TW": "小黃瓜", en: "Cucumber", ja: "きゅうり", ko: "오이" },
  zucchini: { "zh-TW": "櫛瓜", en: "Zucchini", ja: "ズッキーニ", ko: "주키니" },
  ginger: { "zh-TW": "薑", en: "Ginger", ja: "しょうが", ko: "생강" },
  shallot: { "zh-TW": "紅蔥頭", en: "Shallot", ja: "エシャロット", ko: "샬롯" },
  "basil-taiwan": { "zh-TW": "九層塔", en: "Thai basil", ja: "ホーロクバジル", ko: "타이 바질" },
  ham: { "zh-TW": "火腿", en: "Ham", ja: "ハム", ko: "햄" },
  "fish-ball": { "zh-TW": "貢丸", en: "Fish balls", ja: "魚団子", ko: "어묵·물고기 완자" },
  cheese: { "zh-TW": "起司", en: "Cheese", ja: "チーズ", ko: "치즈" },
  "instant-noodles": { "zh-TW": "泡麵", en: "Instant noodles", ja: "インスタント麺", ko: "라면" },
  "bok-choy": { "zh-TW": "青江菜", en: "Bok choy", ja: "チンゲン菜", ko: "청경채" },
  "dried-tofu": { "zh-TW": "豆干", en: "Dried tofu", ja: "厚揚げ", ko: "건두부" },
  pumpkin: { "zh-TW": "南瓜", en: "Pumpkin", ja: "かぼちゃ", ko: "호박" },
  clam: { "zh-TW": "蛤蜊", en: "Clams", ja: "あさ리", ko: "조개" },
  "green-bean": { "zh-TW": "四季豆", en: "Green beans", ja: "いんげん", ko: "강낭콩" },
  "cherry-tomato": { "zh-TW": "小番茄", en: "Cherry tomatoes", ja: "ミニトマト", ko: "방울토마토" },
  milk: { "zh-TW": "牛奶", en: "Milk", ja: "牛乳", ko: "우유" },
  squid: { "zh-TW": "透抽", en: "Squid", ja: "いか", ko: "오징어" },
  "preserved-radish": { "zh-TW": "菜脯", en: "Preserved radish", ja: "菜脯", ko: "무말랭이" },
  "rice-vermicelli": { "zh-TW": "米粉", en: "Rice vermicelli", ja: "ビーフン", ko: "쌀국수" },
  "cured-pork": { "zh-TW": "臘肉", en: "Cured pork", ja: "臘肉", ko: "라육" },
  "water-spinach": { "zh-TW": "空心菜", en: "Water spinach", ja: "空芯菜", ko: "공심채" },
  "chives-garlic": { "zh-TW": "韭菜", en: "Garlic chives", ja: "ニラ", ko: "부추" },
  eggplant: { "zh-TW": "茄子", en: "Eggplant", ja: "なす", ko: "가지" },
  "bean-sprouts": { "zh-TW": "豆芽菜", en: "Bean sprouts", ja: "もやし", ko: "콩나물" },
  "fried-tofu": { "zh-TW": "油豆腐", en: "Fried tofu", ja: "油揚げ", ko: "유부" },
  "chicken-thigh": { "zh-TW": "雞腿肉", en: "Chicken thigh", ja: "鶏もも肉", ko: "닭다리살" },
  "glass-noodles": { "zh-TW": "冬粉", en: "Glass noodles", ja: "春雨", ko: "당면" },
  dumplings: { "zh-TW": "水餃", en: "Dumplings", ja: "水餃", ko: "만두" },
  sausage: { "zh-TW": "香腸", en: "Sausage", ja: "ソーセージ", ko: "소시지" },
  milkfish: { "zh-TW": "虱目魚", en: "Milkfish", ja: "サバヒー", ko: "밀크피시" },
  whitebait: { "zh-TW": "吻仔魚", en: "Whitebait", ja: "しらす", ko: "멸치" },
  "flat-rice-noodles": { "zh-TW": "粄條", en: "Flat rice noodles", ja: "粄條", ko: "쌀국수" },
  "bamboo-shoot": { "zh-TW": "竹筍", en: "Bamboo shoot", ja: "たけのこ", ko: "죽순" },
  "bitter-melon": { "zh-TW": "苦瓜", en: "Bitter melon", ja: "にがうり", ko: "여주" },
  "thousand-layer-tofu": {
    "zh-TW": "百頁豆腐",
    en: "Thousand-layer tofu",
    ja: "百頁豆腐",
    ko: "백페이지두부",
  },
  "water-lily-stem": {
    "zh-TW": "水蓮",
    en: "Water lily stem",
    ja: "水蓮",
    ko: "연꽃줄기",
  },
};

const SCENARIO_LABELS_BY_SLUG = {
  "electric-pot-meals": {
    "zh-TW": "電鍋料理",
    en: "Electric pot meals",
    ja: "電気鍋料理",
    ko: "전기밥솥 요리",
  },
  "leftover-rice-meals": {
    "zh-TW": "剩飯料理",
    en: "Leftover rice meals",
    ja: "残りご飯料理",
    ko: "남은 밥 요리",
  },
  "late-night-meals": {
    "zh-TW": "宵夜料理",
    en: "Late-night meals",
    ja: "夜食",
    ko: "야식",
  },
  "meatless-meals": {
    "zh-TW": "無肉料理",
    en: "Meatless meals",
    ja: "ノンミート料理",
    ko: "무고기 요리",
  },
};

const CATEGORY_LABELS_BY_ZH = {
  蛋類: { "zh-TW": "蛋類", en: "Eggs", ja: "卵", ko: "달걀·난류" },
  豆製品: { "zh-TW": "豆製品", en: "Soy products", ja: "豆製品", ko: "두부·콩가공품" },
  肉類: { "zh-TW": "肉類", en: "Meat", ja: "肉類", ko: "육류" },
  蔬菜: { "zh-TW": "蔬菜", en: "Vegetables", ja: "野菜", ko: "채소" },
  主食: { "zh-TW": "主食", en: "Staples", ja: "主食", ko: "주식" },
  辛香料: {
    "zh-TW": "辛香料",
    en: "Aromatics & spices",
    ja: "香味野菜・スパイス",
    ko: "향신료",
  },
  海鮮: { "zh-TW": "海鮮", en: "Seafood", ja: "海鮮", ko: "해산물" },
  加工品: {
    "zh-TW": "加工品",
    en: "Processed foods",
    ja: "加工食品",
    ko: "가공식품",
  },
};

function readHeadJson(path) {
  return JSON.parse(execSync(`git show HEAD:${path}`, { encoding: "utf8" }));
}

function withLabels(item, labelMap, withCategory = false) {
  const expected = labelMap[item.slug];
  if (!expected) {
    throw new Error(`Missing label map for slug: ${item.slug}`);
  }
  const next = {
    ...item,
    labels: { ...expected, "zh-TW": item.name },
  };
  if (withCategory && typeof item.category === "string") {
    const categoryLabels = CATEGORY_LABELS_BY_ZH[item.category];
    if (!categoryLabels) {
      throw new Error(`Missing category labels for: ${item.category} (${item.slug})`);
    }
    next.categoryLabels = categoryLabels;
  }
  return next;
}

function mergeTaxonomy(relativePath, headData, currentData, labelMap, withCategory = false) {
  const currentSlugs = new Set(currentData.map((item) => item.slug));
  const extras = headData
    .filter((item) => !currentSlugs.has(item.slug))
    .map((item) => withLabels(item, labelMap, withCategory));
  const merged = [...currentData, ...extras];
  writeFileSync(join(root, relativePath), `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  return { added: extras.length, total: merged.length };
}

const headIngredients = readHeadJson("src/data/ingredients.json");
const headScenarios = readHeadJson("src/data/scenarios.json");
const currentIngredients = JSON.parse(readFileSync(join(root, "src/data/ingredients.json"), "utf8"));
const currentScenarios = JSON.parse(readFileSync(join(root, "src/data/scenarios.json"), "utf8"));

const ingredientsResult = mergeTaxonomy(
  "src/data/ingredients.json",
  headIngredients,
  currentIngredients,
  INGREDIENT_LABELS_BY_SLUG,
  true,
);
const scenariosResult = mergeTaxonomy(
  "src/data/scenarios.json",
  headScenarios,
  currentScenarios,
  SCENARIO_LABELS_BY_SLUG,
);

console.log(JSON.stringify({ ingredients: ingredientsResult, scenarios: scenariosResult }, null, 2));
