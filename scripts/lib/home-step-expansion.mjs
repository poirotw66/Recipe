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
    ...ctx.steps.slice(0, -1).map((step, idx) => enrichStep(step, ctx, idx + 1)),
    enrichStep(ctx.steps.at(-1) ?? "起鍋裝盤即可。", ctx, ctx.steps.length)
  ];
}

function expandAirFryer(ctx) {
  const protein = ctx.ingredients.find((item) => /魚|雞|豬|牛|蝦|豆腐/.test(item.name));
  const veg = ctx.ingredients.find((item) => /菜|花|菇|瓜|椒/.test(item.name));
  const lines = [
    `將${ctx.ingredients.map((item) => item.name).join("、")}準備齊全；${protein ? protein.name : "主食材"}用廚房紙巾擦乾表面水分，${ctx.seasonings.length ? `以 ${seasoningBrief(ctx.seasonings)} 均勻抹在表面醃製` : "以鹽與黑胡椒均勻調味"}。`
  ];
  for (const [idx, step] of ctx.steps.entries()) {
    lines.push(enrichStep(step, ctx, idx + 1));
  }
  if (veg && !lines.join("").includes(veg.name)) {
    lines.push(`${veg.name} 切小朵，與主食材分次入炸鍋，避免一次堆疊影響受熱。`);
  }
  return dedupeSteps(lines).slice(0, 6);
}

function expandElectricPot(ctx) {
  const lines = [
    `將${ctx.ingredients.map((item) => item.name).join("、")}等食材洗淨；米洗淨並充分瀝乾水分，蔬菜切好備用。`
  ];
  for (const [idx, step] of ctx.steps.entries()) {
    lines.push(enrichStep(step, ctx, idx + 1));
  }
  return dedupeSteps(lines).slice(0, 6);
}

function expandSoup(ctx) {
  const water = ctx.seasonings.find((item) => item.name === "水") ?? ctx.ingredients.find((item) => item.name === "水");
  const waterNote = water ? `（${formatAmount(water)}）` : "（依鍋大小加足量清水）";
  const lines = [
    `將${ctx.ingredients.map((item) => item.name).join("、")}等食材清洗乾淨並切成適當大小；將${ctx.seasonings.filter((item) => item.name !== "水").map((item) => item.name).join("、")}分開準備妥當。`
  ];
  if (water || ctx.steps.some((step) => /加水|倒入水/.test(step))) {
    lines.push(`湯鍋加入${waterNote}煮滾，再依序下較耐煮的食材。`);
  }
  for (const [idx, step] of ctx.steps.entries()) {
    lines.push(enrichStep(step, ctx, idx + 1));
  }
  return dedupeSteps(lines).slice(0, 6);
}

function expandFriedRice(ctx) {
  return [
    `準備好${ctx.ingredients.map((item) => item.name).join("、")}等食材；冷藏白飯先用手輕輕撥散，雞蛋打散並加入少許鹽拌勻。`,
    ...ctx.steps.map((step, idx) => enrichStep(step, ctx, idx + 1))
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
    `將${ctx.ingredients.map((item) => item.name).join("、")}準備妥當；${proteinName}切成約 1.5 公分大小的丁狀，${rice ? rice.name : "白飯"}先分裝入碗中備用。`,
    `${proteinName} 以 ${marinade || "醬油與鹽"} 抓醃 10 分鐘；${veg ? `${veg.name} 切細丁備用。` : "配菜切好備用。"}`,
    `平底鍋中火下 1 大匙油，${veg ? `先下${veg.name} 拌炒 2 分鐘至微軟；` : ""}再下${proteinName} 攤平煎香，翻炒至表面全白、中心熟透。`,
    `關火試味，可依喜好補少許醬油；與白飯分裝成便當，放涼再蓋上蓋避免飯粒潮軟。`
  ];
}

function expandPasta(ctx) {
  return [
    `將${ctx.ingredients.map((item) => item.name).join("、")}清洗乾淨、切成適當大小備用。`,
    ...ctx.steps.map((step, idx) => enrichStep(step, ctx, idx + 1))
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
    `將${ctx.ingredients.map((item) => item.name).join("、")}清洗乾淨後切好分裝；將${seasoningBrief(ctx.seasonings)}事先在小碗中混合均勻調成醬汁。`,
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

  const mentionsProtein = /雞胸|雞肉|豬|牛|蝦|魚|肉片|肉絲|絞肉|蝦仁|干貝|透抽/i.test(text);
  const hasDoneness = /全白|熟透|變色|無血水|全熟|熟/.test(text);
  const isPrepOrFinish = /備料|醃|切|洗|拌|裝|盛|提味|食用|隔夜|搭配|冷藏/i.test(text);

  if (text.includes("炒") && !/中火|大火|小火/.test(text)) {
    text = text.replace("炒", "中火炒");
  }

  // Determine the appropriate cooking verb based on equipment, title, or slug.
  let actionVerb = "炒";
  if (ctx.equipment.some((e) => /氣炸/i.test(e)) || /air-fryer|airfryer/.test(ctx.slug)) {
    actionVerb = "氣炸";
  } else if (ctx.equipment.some((e) => /電鍋|蒸/i.test(e)) || /electricpot/.test(ctx.slug)) {
    actionVerb = "蒸";
  } else if (/湯|羹|粥/.test(ctx.title) || ctx.category.includes("湯")) {
    actionVerb = "煮";
  } else if (ctx.equipment.some((e) => /烤箱|烤/i.test(e))) {
    actionVerb = "烤";
  }

  // Adjust verb based on specific words in the step text itself.
  if (text.includes("煎")) {
    actionVerb = "煎";
  } else if (text.includes("烤")) {
    actionVerb = "烤";
  } else if (text.includes("蒸")) {
    actionVerb = "蒸";
  } else if (text.includes("煮")) {
    actionVerb = "煮";
  } else if (text.includes("炸") && !text.includes("氣炸")) {
    actionVerb = "炸";
  }

  if (mentionsProtein && !hasDoneness && !isPrepOrFinish) {
    if (/炒熟|煎熟|煮熟|烤熟|蒸熟|炸熟|氣炸熟|炒至|煎至|煮至|烤至|蒸至|氣炸至/i.test(text)) {
      text = text.replace(/。?$/, "，確認中心全熟、無血水。");
    } else if (text.length < 55) {
      // Only append if it's a cooking action step
      const isCookingAction = /煎|炒|烤|蒸|炸|煮|下鍋|放入|入鍋|熱鍋/i.test(text);
      if (isCookingAction) {
        text += `，${actionVerb}至熟透即可。`;
      }
    }
  }

  // Removing mechanical Prep prefix addition for index === 0.

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
