import { formatAmount } from "./parse-recipe-fm.mjs";

export const BAD_STEP_PATTERNS = [
  /將.*準備妥當/,
  /以\s+紅蘿蔔.*抓醃/,
  /以\s+高麗菜.*抓醃/,
  /罐頭鮪魚.*抓醃/,
  /清洗乾淨並切成適當大小/,
  /湯鍋加入（水/,
  /攤平煎香，翻炒至表面全白/,
  /事先在小碗中混合均勻調成醬汁/,
  /確認油熱後再下食材，避免冷鍋冷油/,
  /主食材用廚房紙巾擦乾表面水分，以.*均勻抹在表面醃製/,
  /加水能讓炒出來的蛋質地更蓬鬆滑嫩/
];

/**
 * @param {{ steps: string[] }} ctx
 */
export function needsStepExpansion(ctx) {
  if (!ctx.steps.length) return true;
  const avg = ctx.steps.reduce((sum, step) => sum + step.length, 0) / ctx.steps.length;
  if (ctx.steps.some((step) => BAD_STEP_PATTERNS.some((pattern) => pattern.test(step)))) {
    return true;
  }
  const keys = ctx.steps.map((step) => step.slice(0, 28));
  if (new Set(keys).size !== keys.length) return true;
  if (avg < 40 && ctx.steps.length < 4) return true;
  return avg < 48 && ctx.steps.length <= 3;
}

/**
 * @param {{ name: string; amount: string; unit: string }} item
 */
function cutHint(item) {
  const label = formatAmount(item);
  if (/高麗菜|白菜|青江菜/.test(item.name)) return `${label} 切片`;
  if (/紅蘿蔔/.test(item.name)) return `${label} 切細丁`;
  if (/洋蔥/.test(item.name)) return `${label} 切細絲`;
  if (/菇/.test(item.name)) return `${label} 切片`;
  if (/豆腐/.test(item.name)) return `${label} 切塊`;
  if (/番茄/.test(item.name)) return `${label} 切塊`;
  if (/雞胸|雞肉|豬|牛/.test(item.name)) return `${label} 逆紋切丁`;
  if (/蒜頭/.test(item.name)) return `${label} 切末`;
  if (/青蔥|蔥/.test(item.name)) return `${label} 切蔥花`;
  if (/蛋/.test(item.name) && item.name !== "滷蛋") return `${label} 打散`;
  return `${label} 備用`;
}

function findOil(seasonings) {
  return seasonings.find((item) => /橄欖油|油|奶油/.test(item.name));
}

function splitSoyForMarinade(seasonings) {
  const soy = seasonings.find((item) => item.name === "醬油");
  if (!soy || !/^\d/.test(soy.amount)) {
    return { marinade: soy ? formatAmount(soy) : "", remain: "" };
  }
  const amount = Number(soy.amount);
  if (Number.isNaN(amount) || amount <= 1) {
    return { marinade: formatAmount(soy), remain: "" };
  }
  const half = amount / 2;
  const unit = soy.unit || "";
  return {
    marinade: `醬油 ${half}${unit}`,
    remain: `醬油 ${half}${unit}`
  };
}

function dedupeSteps(steps) {
  const seen = new Set();
  const out = [];
  for (const step of steps) {
    const key = step.slice(0, 32);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(step.replace(/。，/g, "，").replace(/。。/g, "。"));
  }
  return out.slice(0, 6);
}

/**
 * @param {ReturnType<import('./parse-recipe-fm.mjs').parseRecipeContext>} ctx
 */
function ensureIngredientsMentioned(ctx, steps) {
  const text = steps.join(" ");
  const missing = [...ctx.ingredients, ...ctx.seasonings].filter(
    (item) => item.name !== "水" && !text.includes(item.name)
  );
  if (!missing.length) return steps;
  const additions = missing.map((item) => formatAmount(item)).join("、");
  const next = [...steps];
  next[0] = `${next[0].replace(/。$/, "")}；${additions} 備用。`;
  return next;
}

export function buildQualitySteps(ctx) {
  if (ctx.slug.startsWith("sf-")) {
    return null;
  }

  if (/泡麵|泡麵|麵條|烏龍|拉麵|冬粉|粉絲/.test(ctx.title) || ctx.ingredients.some((item) => /泡麵|麵條|烏龍/.test(item.name))) {
    const noodleSteps = buildNoodleSteps(ctx);
    if (noodleSteps) return noodleSteps;
  }

  if (/炸|薯條|雞塊/.test(ctx.title) || ctx.steps.some((step) => /炸|油溫/.test(step))) {
    const frySteps = buildFrySteps(ctx);
    if (frySteps) return finish(ctx, frySteps);
  }

  if (ctx.slug.includes("pasta") || ctx.ingredients.some((item) => item.name.includes("義大利麵"))) {
    return finish(ctx, buildPastaSteps(ctx));
  }

  if (/燉|滷|brais/i.test(ctx.title)) {
    const braiseSteps = buildBraiseSteps(ctx);
    if (braiseSteps) return finish(ctx, braiseSteps);
  }

  if (/湯|羹|粥/.test(ctx.title) || ctx.category.includes("湯")) {
    return finish(ctx, buildSoupSteps(ctx));
  }

  if (ctx.slug.includes("fried-rice") || ctx.title.includes("炒飯")) {
    return finish(ctx, buildFriedRiceSteps(ctx));
  }

  const hasRice = ctx.ingredients.some((item) => item.name.includes("飯"));
  if (
    hasRice &&
    (ctx.slug.includes("rice-bowl") || ctx.title.includes("蓋飯") || /飯/.test(ctx.title))
  ) {
    if (ctx.slug.includes("tuna") || ctx.title.includes("鮪魚")) {
      return finish(ctx, buildTunaBowlSteps(ctx));
    }
    return finish(ctx, buildRiceBowlSteps(ctx));
  }

  if (ctx.equipment.some((item) => item.includes("電鍋")) || ctx.slug.startsWith("electricpot")) {
    return finish(ctx, buildElectricPotSteps(ctx));
  }

  if (ctx.equipment.some((item) => item.includes("氣炸鍋")) || ctx.slug.startsWith("air-fryer") || ctx.slug.startsWith("airfryer")) {
    return null;
  }

  if (ctx.steps.some((step) => /炒|煎|爆/.test(step))) {
    return finish(ctx, buildStirFrySteps(ctx));
  }

  return finish(ctx, enrichGenericSteps(ctx));
}

export function finalizeSteps(ctx, steps) {
  return ensureIngredientsMentioned(ctx, steps);
}

function finish(ctx, steps) {
  return finalizeSteps(ctx, steps);
}

function buildNoodleSteps(ctx) {
  const noodle = ctx.ingredients.find((item) => /泡麵|麵條|烏龍|冬粉|粉絲/.test(item.name));
  if (!noodle) return null;
  const egg = ctx.ingredients.find((item) => item.name === "雞蛋");
  const garlic = ctx.seasonings.find((item) => item.name === "蒜頭");
  const butter = ctx.seasonings.find((item) => item.name === "奶油");
  const soy = ctx.seasonings.find((item) => item.name === "醬油");
  const oil = findOil(ctx.seasonings);

  if (butter && garlic) {
    return dedupeSteps([
      `${formatAmount(garlic)} 切末。湯鍋煮滾水，下 ${formatAmount(noodle)} 煮至 8 分熟，撈出瀝乾，保留煮麵水 3 大匙。`,
      `平底鍋小火融化 ${formatAmount(butter)}，炒蒜末至金黃出香。`,
      "加入麵條與煮麵水，轉中火快炒 1 分鐘裹勻。",
      egg ? `麵推至鍋邊，煎 ${formatAmount(egg)} 成半熟荷包蛋。` : "試味後即可起鍋。",
      "以鹽與黑胡椒試味即可。"
    ]);
  }

  const veg = ctx.ingredients.find((item) => /菜|蔥/.test(item.name));
  return dedupeSteps([
    `${[noodle, veg, egg].filter(Boolean).map((item) => cutHint(item)).join("；")}。`,
    `湯鍋煮滾水，下 ${formatAmount(noodle)} 依包裝時間煮至彈牙，瀝乾保留 1/2 杯煮麵水。`,
    `${oil ? `平底鍋中火熱 ${formatAmount(oil)}` : "平底鍋中火熱油"}${soy ? `，下配料炒香後淋 ${formatAmount(soy)}` : "，炒香配料"}。`,
    "加入麵條與少許煮麵水快炒拌勻，試味後即可起鍋。"
  ]);
}

function buildFrySteps(ctx) {
  const potato = ctx.ingredients.find((item) => /馬鈴薯|地瓜/.test(item.name));
  if (!potato) return null;
  const oil = findOil(ctx.seasonings);
  const spices = ctx.seasonings.filter((item) => /甜椒|蒜粉|辣椒|胡椒|鹽/.test(item.name));
  return dedupeSteps([
    `${formatAmount(potato)} 去皮切粗條，泡冷水 15 分鐘去澱粉，瀝乾後用廚房紙巾徹底吸乾。`,
    `大碗中拌入 ${spices.map((item) => formatAmount(item)).join("、") || "鹽與胡椒"}${oil ? ` 與 ${formatAmount(oil)}` : ""}，加入薯條抓勻。`,
    "油溫約 170°C 分批炸至微金黃，撈出瀝油。",
    "油溫升至 190°C 回鍋炸 1～2 分鐘至外酥，趁熱調味即可上桌。"
  ]);
}

function buildBraiseSteps(ctx) {
  const protein = ctx.ingredients.find((item) => /肉|雞|豬|牛|豆腐/.test(item.name));
  const tofu = ctx.ingredients.find((item) => item.name === "豆腐");
  const soy = ctx.seasonings.find((item) => item.name === "醬油");
  const wine = ctx.seasonings.find((item) => /米酒|料酒/.test(item.name));
  const water = ctx.seasonings.find((item) => item.name === "水") ?? ctx.ingredients.find((item) => item.name === "水");
  const rockSugar = ctx.seasonings.find((item) => /冰糖/.test(item.name));
  const porkCutlet = ctx.ingredients.find((item) => /豬排/.test(item.name));
  const egg = ctx.ingredients.find((item) => item.name === "雞蛋");

  return dedupeSteps([
    `${ctx.ingredients.map((item) => cutHint(item)).join("；")}。`,
    protein
      ? `鍋中不加油或少油，下 ${protein.name} 煸炒至變色出油。`
      : "鍋中少油爆香配料。",
    `加入 ${[soy, wine, water, rockSugar].filter(Boolean).map((item) => formatAmount(item)).join("、") || "醬油與水"}，大火煮滾後轉小火。`,
    tofu ? `下 ${formatAmount(tofu)}，蓋鍋燉 12～15 分鐘至入味。` : "蓋鍋燉 12～15 分鐘至入味。",
    porkCutlet && egg
      ? `豬排沾 ${formatAmount(egg)} 蛋液後煎至金黃，再與滷汁或配菜組裝於白飯上。`
      : "開蓋收汁至濃稠，試味後即可起鍋。"
  ]);
}

function buildSoupSteps(ctx) {
  const water =
    ctx.ingredients.find((item) => item.name === "水") ??
    ctx.seasonings.find((item) => item.name === "水");
  const oil = findOil(ctx.seasonings);
  const salt = ctx.seasonings.find((item) => item.name === "鹽");
  const pepper = ctx.seasonings.find((item) => /胡椒/.test(item.name));
  const garlic = ctx.seasonings.find((item) => item.name === "蒜頭");
  const onion = ctx.ingredients.find((item) => item.name === "洋蔥");
  const tofu = ctx.ingredients.find((item) => item.name === "豆腐");
  const egg = ctx.ingredients.find((item) => item.name === "雞蛋");

  const prep = ctx.ingredients
    .filter((item) => item.name !== "水")
    .map((item) => cutHint(item))
    .join("；");

  const lines = [`${prep}。`];

  if (oil && (onion || garlic || ctx.steps.some((step) => /炒/.test(step)))) {
    const oilLabel = formatAmount(oil);
    const aromatics = [onion ? formatAmount(onion) : "", garlic ? `${formatAmount(garlic)} 切片` : ""]
      .filter(Boolean)
      .join("、");
    lines.push(`湯鍋中火加 ${oilLabel}，炒${aromatics || "配料"} 1～2 分鐘出香。`);
    const veg = ctx.ingredients.filter((item) => /菜|菇|蘿蔔/.test(item.name));
    if (veg.length) {
      lines.push(`下${veg.map((item) => item.name).join("與")}拌炒 2 分鐘至略軟。`);
    }
  }

  const waterLabel = water ? formatAmount(water) : "足量清水";
  lines.push(`倒入 ${waterLabel}，大火煮滾後轉中火煮 8～15 分鐘至食材軟化。`);

  if (tofu) {
    lines.push(`下 ${formatAmount(tofu)}，小火再煮 2 分鐘至熱透。`);
  }
  if (egg) {
    lines.push(`轉最小火，沿鍋邊緩緩淋入 ${formatAmount(egg)}，輕畫圈成蛋花。`);
  }

  const seasonParts = [
    salt ? formatAmount(salt) : "",
    pepper ? formatAmount(pepper) : "",
    ...ctx.seasonings
      .filter((item) => !["水", "鹽", "橄欖油"].includes(item.name) && !/胡椒/.test(item.name))
      .map((item) => formatAmount(item))
  ]
    .filter(Boolean)
    .join(" 與 ");
  if (seasonParts) {
    lines.push(`以 ${seasonParts} 調味試嚐即可起鍋。`);
  } else {
    lines.push("試味道調整鹹度即可起鍋。");
  }

  return dedupeSteps(lines);
}

function buildFriedRiceSteps(ctx) {
  const rice = ctx.ingredients.find((item) => item.name.includes("飯"));
  const egg = ctx.ingredients.find((item) => item.name === "雞蛋");
  const extras = ctx.ingredients.filter(
    (item) => !item.name.includes("飯") && item.name !== "雞蛋"
  );
  const oil = findOil(ctx.seasonings);
  const salt = ctx.seasonings.find((item) => item.name === "鹽");
  const pepper = ctx.seasonings.find((item) => /胡椒/.test(item.name));
  const scallion = ctx.seasonings.find((item) => /蔥/.test(item.name));

  const prepExtras = extras.map((item) => cutHint(item)).join("；");
  const lines = [
    `${rice ? formatAmount(rice) : "白飯"} 若是冷藏飯先用手撥散${prepExtras ? `；${prepExtras}` : ""}；${egg ? `${formatAmount(egg)} 打散，加入 ${salt ? formatAmount(salt) : "鹽少許"} 拌勻` : "備料完成"}。`
  ];

  if (extras.length) {
    lines.push(
      `${oil ? `平底鍋中大火熱 ${formatAmount(oil)}，` : "平底鍋中大火熱油，"}下 ${extras.map((item) => item.name).join("、")} 快炒 1～2 分鐘。`
    );
  }

  if (egg) {
    lines.push("倒入蛋液快速炒成半熟嫩蛋塊，盛出備用。");
  }

  lines.push("同鍋補少許油，下白飯大火快速翻炒 2～3 分鐘至粒粒分明、略帶焦香。");
  lines.push(
    `倒回炒蛋${pepper ? `，撒 ${formatAmount(pepper)}` : ""}，大火快炒 1 分鐘讓配料均勻混合${scallion ? `，起鍋前撒 ${formatAmount(scallion)}` : ""}即可。`
  );

  return dedupeSteps(lines);
}

function allVegIngredients(ingredients) {
  return ingredients.filter(
    (item) =>
      !item.name.includes("飯") &&
      !item.name.includes("米") &&
      !/雞|牛|豬|蝦|魚|豆腐|蛋/.test(item.name)
  );
}

function buildRiceBowlSteps(ctx) {
  const protein = ctx.ingredients.find((item) => /雞|牛|豬|蝦|魚|豆腐/.test(item.name));
  const vegs = ctx.ingredients.filter((item) =>
    /蘿蔔|菜|椒|菇|洋蔥|番茄|青花|高麗/.test(item.name)
  );
  const rice = ctx.ingredients.find((item) => item.name.includes("飯"));
  const garlic = ctx.seasonings.find((item) => item.name === "蒜頭");
  const wine = ctx.seasonings.find((item) => item.name === "米酒");
  const water = ctx.seasonings.find((item) => item.name === "水") ?? ctx.ingredients.find((item) => item.name === "水");
  const soy = ctx.seasonings.find((item) => item.name === "醬油");
  const basil = ctx.seasonings.find((item) => /九層塔/.test(item.name));
  const sesame = ctx.seasonings.find((item) => /芝麻/.test(item.name));
  const rockSugar = ctx.seasonings.find((item) => /冰糖/.test(item.name));
  const { marinade, remain } = splitSoyForMarinade(ctx.seasonings);

  if (!protein && vegs.length) {
    const prep = [
      ...vegs.map((item) => cutHint(item)),
      garlic ? cutHint(garlic) : "",
      rice ? `${formatAmount(rice)} 盛入碗中備用` : "白飯盛入碗中備用"
    ]
      .filter(Boolean)
      .join("；");
    const oil = findOil(ctx.seasonings);
    return dedupeSteps([
      `${prep}。`,
      `平底鍋中火熱 ${oil ? formatAmount(oil) : "1 大匙油"}${garlic ? `，爆香 ${formatAmount(garlic)}` : ""}。`,
      `下 ${vegs.map((item) => item.name).join("、")} 中火炒 3～4 分鐘至略軟。`,
      `${soy ? `淋 ${formatAmount(soy)} ` : ""}快炒收汁，燴料淋在白飯上即可享用。`
    ]);
  }

  const prep = [
    protein ? cutHint(protein) : "",
    ...vegs.map((item) => cutHint(item)),
    garlic ? cutHint(garlic) : "",
    rice ? `${formatAmount(rice)} 盛入碗中備用` : "白飯盛入碗中備用"
  ]
    .filter(Boolean)
    .join("；");

  const lines = [`${prep}。`];

  if (protein) {
    const marinadeParts = [
      marinade,
      wine ? formatAmount(wine) : "",
      rockSugar ? formatAmount(rockSugar) : "",
      sesame ? formatAmount(sesame) : ""
    ]
      .filter(Boolean)
      .join("、");
    const remainNote = remain ? `（${remain} 留炒製用）` : "";
    lines.push(`${protein.name} 以 ${marinadeParts || "醬油與鹽"} 抓醃 5～10 分鐘${remainNote}。`);
  }

  const oil = findOil(ctx.seasonings);
  const vegNames = vegs.map((item) => item.name).join("、");
  lines.push(
    `平底鍋中火熱 ${oil ? formatAmount(oil) : "1 大匙油"}${vegNames ? `，下 ${vegNames} 炒 2 分鐘至略軟` : ""}。`
  );

  if (protein) {
    lines.push(`下 ${protein.name} 攤平，中火煎炒 3～4 分鐘至全熟。`);
  }

  if (water) {
    lines.push(`加入 ${formatAmount(water)}，蓋鍋小火燉 8～10 分鐘至入味。`);
  }

  const finish = [
    remain ? remain : "",
    soy && !remain ? formatAmount(soy) : "",
    basil ? `起鍋前下 ${formatAmount(basil)}` : ""
  ]
    .filter(Boolean)
    .join("、");
  lines.push(
    finish ? `${finish} 快炒收汁，分裝於白飯上即可。` : `試味後分裝於${rice ? rice.name : "白飯"}上即可。`
  );

  return dedupeSteps(lines);
}

function buildTunaBowlSteps(ctx) {
  const rice = ctx.ingredients.find((item) => item.name.includes("飯"));
  const tuna = ctx.ingredients.find((item) => /鮪魚/.test(item.name));
  const egg = ctx.ingredients.find((item) => item.name === "雞蛋");
  const mayo = ctx.seasonings.find((item) => item.name === "美乃滋");
  const soy = ctx.seasonings.find((item) => item.name === "醬油");
  const sesame = ctx.seasonings.find((item) => /芝麻/.test(item.name));

  const lines = [
    `${rice ? formatAmount(rice) : "白飯"} 盛入大碗。${tuna ? `${formatAmount(tuna)} 瀝去過多油汁，用叉子壓散` : "鮪魚壓散"}備用。`,
    `小碗中混合 ${mayo ? formatAmount(mayo) : "美乃滋"}、${soy ? formatAmount(soy) : "醬油"}，拌入鮪魚${sesame ? `與 ${formatAmount(sesame)}` : ""}拌勻。`
  ];
  if (egg) {
    lines.push(`（可選）平底鍋小火煎 ${formatAmount(egg)} 成荷包蛋或炒成碎蛋。`);
  }
  lines.push("鮪魚餡鋪在白飯上，放上煎蛋即可享用。");
  return dedupeSteps(lines);
}

function buildPastaSteps(ctx) {
  const pasta = ctx.ingredients.find((item) => item.name.includes("義大利麵"));
  const protein = ctx.ingredients.find((item) => /雞|蝦|培根|鮭/.test(item.name));
  const veg = ctx.ingredients.find((item) => /菜|菇|番茄/.test(item.name));
  const garlic =
    ctx.ingredients.find((item) => item.name === "蒜頭") ??
    ctx.seasonings.find((item) => item.name === "蒜頭");
  const scallion =
    ctx.ingredients.find((item) => /蔥/.test(item.name)) ??
    ctx.seasonings.find((item) => /蔥/.test(item.name));
  const tomato = ctx.ingredients.find((item) => item.name === "番茄");
  const oil = findOil(ctx.seasonings);
  const salt = ctx.seasonings.find((item) => item.name === "鹽");
  const pepper = ctx.seasonings.find((item) => /胡椒/.test(item.name));
  const milk = ctx.seasonings.find((item) => /牛奶|鮮奶油/.test(item.name));
  const butter = ctx.seasonings.find((item) => item.name === "奶油");
  const cheese = ctx.seasonings.find((item) => /起司/.test(item.name));

  const lines = [];
  const prepParts = [
    protein ? cutHint(protein).replace("切丁", "切條") : "",
    veg ? cutHint(veg) : "",
    tomato ? cutHint(tomato) : "",
    scallion ? cutHint(scallion) : "",
    garlic ? cutHint(garlic) : ""
  ].filter(Boolean);
  if (prepParts.length) lines.push(`${prepParts.join("；")}。`);

  if (scallion && garlic && (cheese || oil)) {
    lines.push(
      `${formatAmount(scallion)} 與 ${formatAmount(garlic)} 切碎，與 ${oil ? formatAmount(oil) : "橄欖油"}${cheese ? `、${formatAmount(cheese)}` : ""} 拌成醬底。`
    );
  }

  lines.push(
    `湯鍋煮滾水加少許鹽，下 ${pasta ? formatAmount(pasta) : "義大利麵"} 煮至彈牙（al dente），瀝乾保留 1/2 杯煮麵水。`
  );
  if (protein) {
    lines.push(
      `平底鍋${oil ? `中火熱 ${formatAmount(oil)}` : "中火熱油"}，煎 ${protein.name} 至表面金黃熟透，盛出備用。`
    );
  }
  const sauceFat = butter ? formatAmount(butter) : oil ? formatAmount(oil) : "1 大匙油";
  lines.push(
    `同鍋下 ${sauceFat}${garlic && !lines.join("").includes(garlic.name) ? `，爆香 ${formatAmount(garlic)}` : ""}${veg ? `，炒 ${veg.name} 2 分鐘` : ""}${tomato ? `，加入 ${formatAmount(tomato)}` : ""}。`
  );
  if (milk) {
    lines.push(
      `倒入 ${formatAmount(milk)} 小火煮滾，加入麵條${protein ? `、${protein.name}` : ""}與少許煮麵水拌炒至醬汁變稠。`
    );
  } else {
    lines.push(`加入麵條${protein ? `、${protein.name}` : ""}與醬底、少許煮麵水，大火拌勻收汁。`);
  }
  if (cheese && !lines.join("").includes(cheese.name)) {
    lines.push(`起鍋前撒 ${formatAmount(cheese)} 拌勻。`);
  }
  if (salt || pepper) {
    lines.push(
      `以 ${[salt ? formatAmount(salt) : "", pepper ? formatAmount(pepper) : ""].filter(Boolean).join(" 與 ")} 調味即可起鍋。`
    );
  }
  return dedupeSteps(lines);
}

function buildElectricPotSteps(ctx) {
  const rice = ctx.ingredients.find((item) => item.name.includes("米"));
  const lines = [
    `${ctx.ingredients.map((item) => cutHint(item)).join("；")}。`,
    `${rice ? `${formatAmount(rice)} 洗淨瀝乾放入電鍋內鍋，水量比平常少約 1/4（蔬菜會出水）` : "米洗淨放入電鍋，水量略減"}。`,
    "配料鋪在米上，淋上調味料。",
    "外鍋加 1 杯水（依電鍋型號調整），按下開關；跳起後悶 10 分鐘再拌勻即可。"
  ];
  return dedupeSteps(lines);
}

function buildStirFrySteps(ctx) {
  const oil = findOil(ctx.seasonings);
  const protein = ctx.ingredients.find((item) => /雞|牛|豬|蝦|魚|豆腐/.test(item.name));
  const veg = ctx.ingredients.filter((item) => /菜|菇|椒|洋蔥|高麗|青花|番茄|紅蘿蔔/.test(item.name));
  const garlic = ctx.seasonings.find((item) => item.name === "蒜頭") ?? ctx.ingredients.find((item) => item.name === "蒜頭");
  const egg = ctx.ingredients.find((item) => item.name === "雞蛋");
  const soy = ctx.seasonings.find((item) => item.name === "醬油");
  const ginger = ctx.seasonings.find((item) => /薑/.test(item.name));

  const prep = [
    ...ctx.ingredients.filter((item) => item.name !== "蒜頭").map((item) => cutHint(item)),
    garlic ? cutHint(garlic) : "",
    ginger ? cutHint(ginger) : ""
  ];
  const lines = [`${[...new Set(prep)].filter(Boolean).join("；")}。`];

  if (protein?.name.includes("豆腐")) {
    lines.push(`平底鍋中火熱 ${oil ? formatAmount(oil) : "1 大匙油"}，豆腐煎至兩面微金黃，盛出備用。`);
    if (garlic || veg.length) {
      lines.push(
        `同鍋爆香 ${garlic ? formatAmount(garlic) : "蒜末"}，下 ${veg.map((item) => item.name).join("、")} 大火炒 2 分鐘。`
      );
    }
    lines.push("豆腐回鍋輕翻拌，以醬油與鹽調味即可起鍋。");
    return dedupeSteps(lines);
  }

  if (egg && veg.length) {
    lines.push(`平底鍋中火預熱，${garlic ? `爆香 ${formatAmount(garlic)}；` : ""}炒 ${veg.map((v) => v.name).join("、")} 2 分鐘。`);
    lines.push("將菜推至鍋邊，倒入蛋液，待半凝固後輕拌成塊，與蔬菜拌勻調味即可。");
    return dedupeSteps(lines);
  }

  lines.push(
    `平底鍋中火熱 ${oil ? formatAmount(oil) : "1 大匙油"}${protein ? `，下 ${protein.name} 炒至變色` : ""}${veg.length ? `，再加入 ${veg.map((item) => item.name).join("、")}` : ""}。`
  );
  lines.push(
    `大火快炒至熟透入味${soy ? `，淋 ${formatAmount(soy)} 拌勻` : ""}，試味後即可起鍋。`
  );
  return dedupeSteps(lines);
}

function enrichGenericSteps(ctx) {
  return dedupeSteps(
    ctx.steps.map((step, index) => {
      let text = step.trim();
      if (text.length >= 60) return text;
      const mentions = ctx.ingredients
        .filter((item) => !text.includes(item.name))
        .slice(0, 1)
        .map((item) => formatAmount(item));
      if (mentions.length && index === 0) {
        text = `${mentions[0]} ${text}`;
      }
      if (text.includes("炒") && !/中火|大火|小火/.test(text)) {
        text = text.replace("炒", "中火炒");
      }
      return text;
    })
  );
}
