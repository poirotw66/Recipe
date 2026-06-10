import { formatAmount } from "./parse-recipe-fm.mjs";
import { sfStepsForRecipe } from "./sf-locale-steps.mjs";

const UPDATED = "2026-06-09";

const WATER_LILY_STEPS = {
  "water-lily-stem-sesame-toss": {
    en: [
      "Rinse water lily stems under running water; trim tough ends and cut into 2-inch pieces. Mince garlic; optionally toast sesame seeds in a dry pan.",
      "Bring a pot of salted water to a boil. Blanch stems 40 seconds until deep green and crisp-tender; drain well (ice bath 10 seconds for extra crunch).",
      "While still warm, toss stems with garlic, sesame oil, and salt until evenly coated.",
      "Plate and top with sesame seeds. For bento, cool slightly before packing to avoid condensation."
    ],
    ja: [
      "水蓮は流水で洗い、古い筋を取り約5cmに切る。にんにくはみじん切りにし、白ごまは弱火で軽く煎っておくと香ばしい。",
      "湯鍋にたっぷりの湯を沸かし、塩を少々入れて水蓮を40秒ほど湯通しする。色が濃い緑になり茎に歯応えが残ったらすぐに水切り（氷水10秒でも可）。",
      "温かいうちにボウルへ入れ、にんにく・ごま油・塩を加え、下から軽く和える。",
      "皿に盛り、白ごまを振る。お弁当用は水分を飛ばしてから詰める。"
    ],
    ko: [
      "연꽃줄기는 흐르는 물에 씻어 질긴 부분을 제거하고 5cm 정도로 자른다. 마늘은 다지고, 흰참깨는 약불에 살짝 볶아두면 향이 좋다.",
      "냄비에 물을 넉넉히 끓이고 소금을 조금 넣은 뒤 연꽃줄기를 40초간 데친다. 진한 녹색이 되고 아삭함이 남으면 바로 건진다(찬물 10초 가능).",
      "따뜻할 때 그릇에 담고 다진 마늘, 참기름, 소금을 넣어 가볍게 버무린다.",
      "접시에 담고 흰참깨를 뿌린다. 도시락은 수분을 날린 뒤 담는다."
    ]
  }
};

const T = {
  en: {
    prepAll: (items) => `Prep: ${items}.`,
    riceBowl: (ingList, protein, rice, marinade, veg, proteinName) => [
      `Prep: ${ingList}; dice ${proteinName} about ½ inch, divide ${rice} into serving bowls.`,
      `Marinate ${proteinName} with ${marinade} for 10 minutes; ${veg ? `dice ${veg} finely.` : "prep vegetables as needed."}`,
      `Heat 1 Tbsp oil in a skillet over medium heat. ${veg ? `Stir-fry ${veg} 2 minutes until slightly tender; ` : ""}Add ${proteinName}, sear and stir-fry until opaque and cooked through.`,
      `Taste and adjust soy sauce if needed. Pack with rice for bento; cool slightly before closing the lid so rice stays fluffy.`
    ],
    stirFryPrep: (items, sauce) =>
      `Prep: ${items}; mix ${sauce} in a small bowl if using.`,
    stirFryHeat: "Heat 1 Tbsp oil in a skillet over medium until shimmering, then add ingredients.",
    soupPrep: (items, seasonings) => `Prep: ${items}; seasonings ready: ${seasonings}.`,
    soupBoil: (waterNote) => `Bring ${waterNote} to a boil, then add longer-cooking items first.`,
    airFryPrep: (items, protein, seasonings) =>
      `Prep: ${items}; pat ${protein} dry and rub with ${seasonings}.`,
    electricPrep: (items) => `Prep: ${items}; rinse rice if using and chop vegetables.`,
    pastaBoil:
      "Boil salted water; cook pasta until al dente, drain and reserve ½ cup pasta water.",
    friedRicePrep: (items) => `Prep: ${items}; fluff cold rice and beat eggs with a pinch of salt.`,
    waterLilyGeneric: (stemLabel) => `${stemLabel} rinsed and cut; other ingredients prepped in separate bowls.`
  },
  ja: {
    prepAll: (items) => `下準備：${items}。`,
    riceBowl: (ingList, protein, rice, marinade, veg, proteinName) => [
      `下準備：${ingList}。${proteinName}は1.5cm角に切り、${rice}は丼に分けておく。`,
      `${proteinName}を${marinade}で10分ほどもみ込む。${veg ? `${veg}は細かく切る。` : "野菜を切っておく。"}`,
      `フライパンに油大さじ1を中火で熱し、${veg ? `${veg}を2分炒めてから` : ""}${proteinName}を炒め、中心まで火を通す。`,
      `味を見て盛り付け、ご飯と一緒に弁当に詰める。蓋を閉める前に少し冷ますと米がべたつきにくい。`
    ],
    stirFryPrep: (items, sauce) => `下準備：${items}。${sauce}は小鉢に混ぜておく。`,
    stirFryHeat: "フライパンに油大さじ1を中火で熱してから具材を入れる。",
    soupPrep: (items, seasonings) => `下準備：${items}。調味料：${seasonings}。`,
    soupBoil: (waterNote) => `${waterNote}を沸かし、煮えにくい材料から入れる。`,
    airFryPrep: (items, protein, seasonings) =>
      `下準備：${items}。${protein}の水気を拭き、${seasonings}を揉み込む。`,
    electricPrep: (items) => `下準備：${items}。米は洗っておき、野菜を切る。`,
    pastaBoil: "湯沸かしで塩を入れ、パスタをアルデンテに茹で、茹で汁を少し取っておく。",
    friedRicePrep: (items) => `下準備：${items}。ご飯はほぐし、卵は塩少々で溶く。`,
    waterLilyGeneric: (stemLabel) => `${stemLabel}を洗って切り、他の材料も用意する。`
  },
  ko: {
    prepAll: (items) => `준비: ${items}.`,
    riceBowl: (ingList, protein, rice, marinade, veg, proteinName) => [
      `준비: ${ingList}. ${proteinName}는 1.5cm 정도로 썰고, ${rice}는 그릇에 나눠 둔다.`,
      `${proteinName}에 ${marinade}를 10분 재운다. ${veg ? `${veg}는 잘게 썬다.` : "채소를 손질한다."}`,
      `팬에 기름 1큰술을 중불로 달군 뒤, ${veg ? `${veg}를 2분 볶고 ` : ""}${proteinName}를 익을 때까지 볶는다.`,
      `간을 맞춰 밥과 함께 도시락에 담는다. 뚜껑을 닫기 전 잠시 식히면 밥이 덜 눅눅해진다.`
    ],
    stirFryPrep: (items, sauce) => `준비: ${items}. ${sauce}는 작은 그릇에 섞어 둔다.`,
    stirFryHeat: "팬에 기름 1큰술을 중불로 달군 다음 재료를 넣는다.",
    soupPrep: (items, seasonings) => `준비: ${items}. 양념: ${seasonings}.`,
    soupBoil: (waterNote) => `${waterNote}를 끓인 뒤 익는 데 시간이 걸리는 재료부터 넣는다.`,
    airFryPrep: (items, protein, seasonings) =>
      `준비: ${items}. ${protein} 물기를 제거하고 ${seasonings}를 바른다.`,
    electricPrep: (items) => `준비: ${items}. 쌀은 씻고 채소를 썬다.`,
    pastaBoil: "소금물을 끓여 파스타를 알덴테로 삶고, 삶은 물을 조금 남긴다.",
    friedRicePrep: (items) => `준비: ${items}. 밥은 풀고 달걀은 소금을 조금 넣어 푼다.`,
    waterLilyGeneric: (stemLabel) => `${stemLabel}를 씻어 자르고 다른 재료도 준비한다.`
  }
};

function seasoningBrief(seasonings) {
  if (!seasonings.length) return "";
  return seasonings.map((item) => formatAmount(item)).join(", ");
}

function pickProtein(ingredients) {
  return ingredients.find((item) => /chicken|beef|pork|tofu|shrimp|salmon|fish|豆腐|雞|牛|豬|蝦|鮭|魚/i.test(item.name));
}

function pickVeg(ingredients) {
  return ingredients.find((item) => /carrot|cabbage|broccoli|onion|tomato|蘑菇|菇|菜|蘿蔔|高麗|青花|洋蔥|番茄/i.test(item.name));
}

function pickRice(ingredients) {
  return ingredients.find((item) => /rice|飯|米/i.test(item.name));
}

/**
 * @param {ReturnType<import('./parse-recipe-fm.mjs').parseRecipeContext>} ctx from localized markdown
 * @param {'en'|'ja'|'ko'} locale
 */
export function expandLocalizedSteps(ctx, locale) {
  if (ctx.slug.startsWith("sf-")) {
    return sfStepsForRecipe(locale, ctx);
  }

  const custom = WATER_LILY_STEPS[ctx.slug]?.[locale];
  if (custom) return custom;

  const msg = T[locale];
  const ingList = ctx.ingredients.map((item) => formatAmount(item)).join(locale === "en" ? ", " : "、");

  if (ctx.slug.startsWith("water-lily-stem-")) {
    const stem = ctx.ingredients.find((item) => /water lily|水蓮|연꽃/i.test(item.name));
    const stemLabel = stem ? formatAmount(stem) : "water lily stems";
    return [msg.waterLilyGeneric(stemLabel), ...ctx.steps.slice(1)];
  }

  if (ctx.equipment.some((e) => /air fryer|氣炸/i.test(e)) || /air-fryer|airfryer/.test(ctx.slug)) {
    const protein = pickProtein(ctx.ingredients);
    return [
      msg.airFryPrep(ingList, protein?.name ?? "protein", seasoningBrief(ctx.seasonings) || "salt and pepper"),
      ...ctx.steps
    ];
  }

  if (ctx.equipment.some((e) => /rice cooker|電鍋/i.test(e)) || /electricpot/.test(ctx.slug)) {
    return [msg.electricPrep(ingList), ...ctx.steps];
  }

  if (/soup|湯|粥|congee|udon/i.test(ctx.title) || /soup|湯/.test(ctx.category)) {
    const water = ctx.seasonings.find((item) => /^water|水$/i.test(item.name));
    const waterNote = water ? formatAmount(water) : "water";
    return [msg.soupPrep(ingList, seasoningBrief(ctx.seasonings)), msg.soupBoil(waterNote), ...ctx.steps];
  }

  if (/fried rice|炒飯/i.test(ctx.title) || ctx.slug.includes("fried-rice")) {
    return [msg.friedRicePrep(ingList), ...ctx.steps];
  }

  const hasRice = ctx.ingredients.some((item) => /rice|飯|米/i.test(item.name));
  if (hasRice && (ctx.slug.includes("rice-bowl") || /rice bowl|蓋飯|丼/i.test(ctx.title))) {
    const protein = pickProtein(ctx.ingredients);
    const veg = pickVeg(ctx.ingredients);
    const rice = pickRice(ctx.ingredients);
    const marinade = ctx.seasonings
      .filter((item) => !/water|broth|湯|水/i.test(item.name))
      .slice(0, 3)
      .map((item) => formatAmount(item))
      .join(locale === "en" ? ", " : "、");
    return msg.riceBowl(
      ingList,
      protein ? formatAmount(protein) : "protein",
      rice ? formatAmount(rice) : "cooked rice",
      marinade || "soy sauce and salt",
      veg?.name,
      protein?.name ?? "protein"
    );
  }

  if (ctx.slug.includes("pasta") || ctx.ingredients.some((item) => /pasta|義大利麵|パスタ|파스타/i.test(item.name))) {
    return [msg.pastaBoil, msg.prepAll(ingList), ...ctx.steps];
  }

  if (ctx.steps.some((step) => /炒|stir|sauté|볶/i.test(step))) {
    const expanded = ctx.steps.map((step) => step);
    if (expanded.length >= 4) return expanded;
    return [msg.stirFryPrep(ingList, seasoningBrief(ctx.seasonings)), msg.stirFryHeat, ...expanded];
  }

  return ctx.steps;
}

export { UPDATED };
