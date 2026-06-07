import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["zh-TW", "en", "ja", "ko"];

const INGREDIENT_LABELS_BY_SLUG = {
  egg: { "zh-TW": "雞蛋", en: "Eggs", ja: "卵", ko: "달걀" },
  tofu: { "zh-TW": "豆腐", en: "Tofu", ja: "豆腐", ko: "두부" },
  beef: { "zh-TW": "牛肉", en: "Beef", ja: "牛肉", ko: "소고기" },
  "chicken-breast": {
    "zh-TW": "雞胸肉",
    en: "Chicken breast",
    ja: "鶏むね肉",
    ko: "닭가슴살",
  },
  tomato: { "zh-TW": "番茄", en: "Tomato", ja: "トマト", ko: "토마토" },
  pasta: { "zh-TW": "義大利麵", en: "Pasta", ja: "パスタ", ko: "파스타" },
  noodles: { "zh-TW": "麵條", en: "Noodles", ja: "麺", ko: "국수" },
  udon: { "zh-TW": "烏龍麵", en: "Udon", ja: "うどん", ko: "우동" },
  "guanmiao-noodles": {
    "zh-TW": "關廟麵",
    en: "Guanmiao noodles",
    ja: "関廟麺",
    ko: "관묘면",
  },
  rice: { "zh-TW": "白飯", en: "Cooked rice", ja: "ご飯", ko: "밥" },
  scallion: { "zh-TW": "青蔥", en: "Scallion", ja: "ねぎ", ko: "대파" },
  mushroom: { "zh-TW": "菇類", en: "Mushrooms", ja: "きのこ", ko: "버섯" },
  broccoli: { "zh-TW": "青花菜", en: "Broccoli", ja: "ブロッコリー", ko: "브로콜리" },
  cabbage: { "zh-TW": "高麗菜", en: "Cabbage", ja: "キャベツ", ko: "양배추" },
  onion: { "zh-TW": "洋蔥", en: "Onion", ja: "玉ねぎ", ko: "양파" },
  carrot: { "zh-TW": "紅蘿蔔", en: "Carrot", ja: "にんじん", ko: "당근" },
  daikon: { "zh-TW": "蘿蔔", en: "Daikon radish", ja: "大根", ko: "무" },
  garlic: { "zh-TW": "蒜頭", en: "Garlic", ja: "にんにく", ko: "마늘" },
  shrimp: { "zh-TW": "蝦仁", en: "Shrimp", ja: "えび", ko: "새우" },
  salmon: { "zh-TW": "鮭魚", en: "Salmon", ja: "サーモン", ko: "연어" },
  ham: { "zh-TW": "火腿", en: "Ham", ja: "ハム", ko: "햄" },
  "fish-ball": { "zh-TW": "貢丸", en: "Fish balls", ja: "魚団子", ko: "어묵·물고기 완자" },
  cheese: { "zh-TW": "起司", en: "Cheese", ja: "チーズ", ko: "치즈" },
  "instant-noodles": { "zh-TW": "泡麵", en: "Instant noodles", ja: "インスタント麺", ko: "라면" },
  "bok-choy": { "zh-TW": "青江菜", en: "Bok choy", ja: "チンゲン菜", ko: "청경채" },
  "dried-tofu": { "zh-TW": "豆干", en: "Dried tofu", ja: "厚揚げ", ko: "건두부" },
  pumpkin: { "zh-TW": "南瓜", en: "Pumpkin", ja: "かぼちゃ", ko: "호박" },
  clam: { "zh-TW": "蛤蜊", en: "Clams", ja: "あさり", ko: "조개" },
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
  "one-person-meal": {
    "zh-TW": "一人料理",
    en: "Cooking for one",
    ja: "一人分の料理",
    ko: "1인 요리",
  },
  "ten-minute-meals": {
    "zh-TW": "10 分鐘料理",
    en: "10-minute meals",
    ja: "10分でできる料理",
    ko: "10분 요리",
  },
  "high-protein-meals": {
    "zh-TW": "高蛋白料理",
    en: "High-protein meals",
    ja: "高タンパク料理",
    ko: "고단백 요리",
  },
  "weight-loss-meals": {
    "zh-TW": "減脂料理",
    en: "Light & lean meals",
    ja: "低脂質の料理",
    ko: "다이어트 요리",
  },
  "bento-meals": {
    "zh-TW": "便當菜",
    en: "Bento-friendly dishes",
    ja: "お弁当向けのおかず",
    ko: "도시락 반찬",
  },
  "budget-meals": {
    "zh-TW": "省錢料理",
    en: "Budget-friendly meals",
    ja: "節約料理",
    ko: "알뜰 요리",
  },
  "fridge-cleanout-meals": {
    "zh-TW": "冰箱清庫存",
    en: "Use up the fridge",
    ja: "冷蔵庫使い切り",
    ko: "냉장고 정리 요리",
  },
  "air-fryer-meals": {
    "zh-TW": "氣炸鍋料理",
    en: "Air fryer meals",
    ja: "ノンフライヤー料理",
    ko: "에어프라이어 요리",
  },
};

/** @type {Record<string, Record<string, string>>} */
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
};

function hasCompleteLabels(labels) {
  if (!labels || typeof labels !== "object") {
    return false;
  }
  return LOCALES.every((locale) => typeof labels[locale] === "string" && labels[locale].length > 0);
}

function labelsEqual(a, b) {
  return LOCALES.every((locale) => a[locale] === b[locale]);
}

/**
 * @param {Record<string, unknown>} item
 * @param {Record<string, Record<string, string>>} mapBySlug
 */
function migrateItem(item, mapBySlug, options = {}) {
  const { withCategory = false } = options;
  const slug = /** @type {string} */ (item.slug);
  const expected = mapBySlug[slug];
  if (!expected) {
    throw new Error(`Missing translation map for slug: ${slug}`);
  }

  const zhTw = /** @type {string} */ (item.name);
  const labels = { ...expected, "zh-TW": zhTw };
  const prevLabels = item.labels;
  let changed = !hasCompleteLabels(prevLabels) || !labelsEqual(prevLabels, labels);

  const next = { ...item, labels };

  if (withCategory && typeof item.category === "string") {
    const categoryZh = item.category;
    const categoryLabels = CATEGORY_LABELS_BY_ZH[categoryZh];
    if (!categoryLabels) {
      throw new Error(`Missing category labels for: ${categoryZh} (${slug})`);
    }
    const prevCategoryLabels = item.categoryLabels;
    if (
      !hasCompleteLabels(prevCategoryLabels) ||
      !labelsEqual(prevCategoryLabels, categoryLabels)
    ) {
      changed = true;
    }
    next.categoryLabels = categoryLabels;
  }

  return { next, changed };
}

function migrateFile(relativePath, mapBySlug, options) {
  const path = join(root, relativePath);
  const data = JSON.parse(readFileSync(path, "utf8"));
  let updated = 0;
  const migrated = data.map((item) => {
    const { next, changed } = migrateItem(item, mapBySlug, options);
    if (changed) {
      updated += 1;
    }
    return next;
  });
  writeFileSync(path, `${JSON.stringify(migrated, null, 2)}\n`, "utf8");
  return { total: data.length, updated };
}

const ingredientsResult = migrateFile(
  "src/data/ingredients.json",
  INGREDIENT_LABELS_BY_SLUG,
  { withCategory: true },
);
const scenariosResult = migrateFile("src/data/scenarios.json", SCENARIO_LABELS_BY_SLUG);

console.log(
  JSON.stringify(
    {
      ingredients: ingredientsResult,
      scenarios: scenariosResult,
      totalUpdated: ingredientsResult.updated + scenariosResult.updated,
    },
    null,
    2,
  ),
);
