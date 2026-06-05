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
