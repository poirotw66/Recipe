import { formatAmount } from "./parse-recipe-fm.mjs";

const WATER_LILY = {
  "water-lily-stem-sesame-toss": [
    "水蓮在流動水下搓洗根梗泥沙，摘去老筋後切成約 5 公分段；蒜頭切末，白芝麻可乾鍋小火烘香備用。",
    "湯鍋加足量水煮滾，下少許鹽，水蓮入鍋汆燙約 40 秒至顏色轉深綠、梗仍保脆，立刻撈起瀝乾（或泡冰水 10 秒再瀝乾更爽脆）。",
    "趁水蓮尚溫熱放入大碗，加入蒜末、麻油與鹽，以筷子由下往上輕拌讓油分均勻裹住。",
    "分裝盤中，表面撒白芝麻即可；帶便當可先攤開散熱再裝盒。"
  ]
};

/**
 * @param {import('./parse-recipe-fm.mjs').parseRecipeContext extends (...args: any) => infer R ? R : never} ctx
 */
export function expandHomeSteps(ctx) {
  if (WATER_LILY[ctx.slug]) {
    return WATER_LILY[ctx.slug];
  }

  const avg = ctx.steps.reduce((sum, step) => sum + step.length, 0) / Math.max(ctx.steps.length, 1);
  if (avg >= 55) {
    return ctx.steps;
  }

  if (ctx.slug.startsWith("water-lily-stem-")) {
    return expandWaterLilyGeneric(ctx);
  }

  if (ctx.equipment.some((item) => item.includes("氣炸鍋")) || ctx.slug.startsWith("air-fryer") || ctx.slug.startsWith("airfryer")) {
    return expandAirFryer(ctx);
  }

  if (ctx.equipment.some((item) => item.includes("電鍋")) || ctx.slug.startsWith("electricpot")) {
    return expandElectricPot(ctx);
  }

  if (/湯|羹|粥/.test(ctx.title) || ctx.category.includes("湯")) {
    return expandSoup(ctx);
  }

  if (ctx.slug.includes("fried-rice") || ctx.title.includes("炒飯")) {
    return expandFriedRice(ctx);
  }

  const hasRice = ctx.ingredients.some((item) => item.name.includes("飯") || item.name.includes("米"));
  if (
    hasRice &&
    (ctx.slug.includes("rice-bowl") || ctx.title.includes("蓋飯") || /飯|蓋飯/.test(ctx.title))
  ) {
    return expandRiceBowl(ctx);
  }

  if (ctx.slug.includes("pasta") || ctx.ingredients.some((item) => item.name.includes("義大利麵"))) {
    return expandPasta(ctx);
  }

  if (ctx.steps.some((step) => step.includes("炒"))) {
    return expandStirFry(ctx);
  }

  return ctx.steps.map((step, index) => enrichStep(step, ctx, index));
}

function expandWaterLilyGeneric(ctx) {
  const stem = ctx.ingredients.find((item) => item.name.includes("水蓮"));
  const stemLabel = stem ? formatAmount(stem) : "水蓮";
  return [
    `${stemLabel} 洗淨切段，其餘配料依食譜備齊並分裝。`,
    ...ctx.steps.slice(0, -1).map((step) => enrichStep(step, ctx)),
    enrichStep(ctx.steps.at(-1) ?? "起鍋裝盤即可。", ctx)
  ];
}

function expandAirFryer(ctx) {
  const protein = ctx.ingredients.find((item) => /魚|雞|豬|牛|蝦|豆腐/.test(item.name));
  const veg = ctx.ingredients.find((item) => /菜|花|菇|瓜|椒/.test(item.name));
  const lines = [
    `備料：${ctx.ingredients.map((item) => formatAmount(item)).join("、")}；${protein ? formatAmount(protein) : "主食材"} 擦乾，${ctx.seasonings.length ? `以 ${seasoningBrief(ctx.seasonings)} 抹勻` : "以鹽與胡椒調味"}。`
  ];
  for (const step of ctx.steps) {
    lines.push(enrichStep(step, ctx));
  }
  if (veg && !lines.join("").includes(veg.name)) {
    lines.push(`${veg.name} 切小朵，與主食材分次入炸鍋，避免一次堆疊影響受熱。`);
  }
  return dedupeSteps(lines).slice(0, 6);
}

function expandElectricPot(ctx) {
  const lines = [
    `備料：${ctx.ingredients.map((item) => formatAmount(item)).join("、")}；米若需先洗淨瀝乾，蔬菜切好備用。`
  ];
  for (const step of ctx.steps) {
    lines.push(enrichStep(step, ctx));
  }
  return dedupeSteps(lines).slice(0, 6);
}

function expandSoup(ctx) {
  const water = ctx.seasonings.find((item) => item.name === "水") ?? ctx.ingredients.find((item) => item.name === "水");
  const waterNote = water ? `（${formatAmount(water)}）` : "（依鍋大小加足量清水）";
  const lines = [
    `備料：${ctx.ingredients.map((item) => formatAmount(item)).join("、")}；${ctx.seasonings.filter((item) => item.name !== "水").map((item) => formatAmount(item)).join("、")} 分開備好。`
  ];
  if (water || ctx.steps.some((step) => /加水|倒入水/.test(step))) {
    lines.push(`湯鍋加入${waterNote}煮滾，再依序下較耐煮的食材。`);
  }
  for (const step of ctx.steps) {
    lines.push(enrichStep(step, ctx));
  }
  return dedupeSteps(lines).slice(0, 6);
}

function expandFriedRice(ctx) {
  return [
    `備料：${ctx.ingredients.map((item) => formatAmount(item)).join("、")}；白飯若冷藏請先撥散，蛋打散加少許鹽。`,
    ...ctx.steps.map((step) => enrichStep(step, ctx))
  ];
}

export function expandRiceBowl(ctx) {
  const protein = ctx.ingredients.find((item) => /雞|牛|豬|蝦|魚|豆腐/.test(item.name));
  const veg = ctx.ingredients.find((item) => /蘿蔔|菜|椒|菇|洋蔥|番茄|青花/.test(item.name));
  const rice = ctx.ingredients.find((item) => item.name.includes("飯"));
  const marinade = ctx.seasonings
    .filter((item) => !/水|湯|高湯/.test(item.name))
    .slice(0, 3)
    .map((item) => formatAmount(item))
    .join("、");
  const proteinName = protein?.name ?? "主食材";
  return [
    `備料：${ctx.ingredients.map((item) => formatAmount(item)).join("、")}；${proteinName} 切約 1.5 公分小丁，${rice ? formatAmount(rice) : "白飯"} 先分裝碗備用。`,
    `${proteinName} 以 ${marinade || "醬油與鹽"} 抓醃 10 分鐘；${veg ? `${veg.name} 切細丁備用。` : "配菜切好備用。"}`,
    `平底鍋中火下 1 大匙油，${veg ? `先下${veg.name} 拌炒 2 分鐘至微軟；` : ""}再下${proteinName} 攤平煎香，翻炒至表面全白、中心熟透。`,
    `關火試味，可依喜好補少許醬油；與白飯分裝成便當，放涼再蓋上蓋避免飯粒潮軟。`
  ];
}

function expandPasta(ctx) {
  return [
    `湯鍋煮滾鹽水，義大利麵依包裝時間煮至 al dente，瀝乾保留 1/2 杯煮麵水。`,
    `備料：${ctx.ingredients.map((item) => formatAmount(item)).join("、")}。`,
    ...ctx.steps.map((step) => enrichStep(step, ctx))
  ];
}

function expandStirFry(ctx) {
  const expanded = ctx.steps.map((step, index) => {
    let text = step.trim();
    if (text.includes("快炒") && !/大火|中火/.test(text)) {
      text = text.replace("快炒", "大火快炒");
    }
    if (text.includes("下油") && !/大匙|毫升/.test(text)) {
      text = text.replace("下油", "下 1 大匙油");
    }
    return enrichStep(text, ctx, index, { skipPrepPrefix: true });
  });
  if (expanded.length >= 4) {
    return expanded;
  }
  return [
    `備料：${ctx.ingredients.map((item) => formatAmount(item)).join("、")} 切好分裝；${seasoningBrief(ctx.seasonings)} 可先混成小碗醬汁。`,
    "平底鍋中火下 1 大匙油，確認油熱後再下食材，避免冷鍋冷油造成出水。",
    ...expanded
  ];
}

function seasoningBrief(seasonings) {
  if (!seasonings.length) return "鹽與醬油";
  return seasonings.map((item) => formatAmount(item)).join("、");
}

function enrichStep(step, ctx, index = 0, options = {}) {
  let text = step.trim();
  if (text.length >= 72) return text;

  const mentionsProtein = /雞胸|雞肉|豬|牛|蝦/.test(text);
  const hasDoneness = /全白|熟透|變色|無血水|全熟/.test(text);

  if (text.includes("炒") && !/中火|大火|小火/.test(text)) {
    text = text.replace("炒", "中火炒");
  }

  if (mentionsProtein && !hasDoneness && /炒熟|煎熟|炒至/.test(text)) {
    text = text.replace(/。?$/, "，確認中心全熟、無血水。");
  } else if (mentionsProtein && !hasDoneness && text.length < 55) {
    text += "，炒至表面全熟即可。";
  }

  if (
    index === 0 &&
    text.length < 40 &&
    ctx.ingredients.length > 0 &&
    !text.includes("備料") &&
    !options.skipPrepPrefix
  ) {
    text = `備料：${text}`;
  }

  if (text.includes("電鍋") && !/水量|米/.test(text) && ctx.ingredients.some((item) => item.name.includes("米"))) {
    text += "（水量約比平常少 1/4，因蔬菜會出水）。";
  }

  return text.replace(/。，/g, "，").replace(/。。/g, "。");
}

function dedupeSteps(steps) {
  const seen = new Set();
  const out = [];
  for (const step of steps) {
    const key = step.slice(0, 24);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(step);
  }
  return out;
}
