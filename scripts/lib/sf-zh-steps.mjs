import { formatAmount } from "./parse-recipe-fm.mjs";

function ingredientPhrase(ingredients, limit = 4) {
  return ingredients
    .slice(0, limit)
    .map((item) => formatAmount(item))
    .join("、");
}

function seasoningPhrase(seasonings, limit = 5) {
  return seasonings
    .slice(0, limit)
    .map((item) => formatAmount(item))
    .join("、");
}

/**
 * @param {string} title
 * @param {string} category
 * @param {string[]} tags
 */
export function inferSfCategorySlug(title, category, tags) {
  const text = `${title} ${category} ${tags.join(" ")}`;
  if (/沙拉|凱薩|Caesar|salad|Buddha|yogurt bowl|quinoa/i.test(text)) return "light-plate";
  if (/薯條|炸魚|雞翅|酥餅|炸雞|分享盤|酥炸|fries|wings|quesadilla|calamari/i.test(text)) return "sharing-plate";
  if (/Open|歐包|丹麥|三明治/.test(text)) return "open-sandwich";
  if (/班尼|歐姆蕾|早午餐|Brunch/i.test(text)) return "sf-brunch";
  if (/漢堡|Big Bite|酥餅套餐/i.test(text)) return "big-bite";
  if (/半雞|豬腳|大盤|拼盤/.test(text) && !/海陸/.test(text)) return "big-plate";
  if (/兒童|北鼻|Kids/i.test(text)) return "kids";
  if (/冰淇淋|布朗尼|甜點|鬆餅/.test(text)) return "dessert";
  if (/飯|麵|義大利|長管|燉飯/.test(text)) return "main-rice-noodle";
  return "default";
}

/**
 * @param {string} displayName
 * @param {string} categorySlug
 * @param {Array<{name:string,amount:string,unit:string}>} ingredients
 * @param {Array<{name:string,amount:string,unit:string}>} seasonings
 */
export function buildDetailedSfSteps(displayName, categorySlug, ingredients, seasonings) {
  const lead = ingredientPhrase(ingredients);
  const sauces = seasoningPhrase(seasonings);

  if (categorySlug === "sharing-plate") {
    return [
      `備料：${lead} 依分享盤份量分裝；需油炸的食材先擦乾或薄裹粉，${sauces} 分碗備用，冷醬與熱食分開。`,
      `炸鍋或烤箱預熱（油溫約 170～180℃，或烤箱 200℃），主食材分批炸／烤至表面金黃酥脆，避免一次下鍋降溫。`,
      `薯條、麵包或餅皮若為配菜，另外炸或烤到外脆內軟；起鍋後以廚房紙吸油，趁熱調味。`,
      `將醬汁調整到可沾附但不滴淌的濃度，熱食置中、冷醬與生菜放邊側，完成 ${displayName} 分享盤。`
    ];
  }

  if (categorySlug === "light-plate") {
    return [
      `備料：${lead} 洗淨瀝乾；需加熱的蛋白質切適口大小，${sauces} 先調勻試味。`,
      `生菜與冷配料保持乾爽；雞肉、蝦、穀物或花椰菜飯用平底鍋或烤箱加熱至熟透、表面微焦香。`,
      `大碗中先鋪生菜，再放上溫熱蛋白質與穀物；${sauces} 分 2～3 次拌入，避免整碗過濕。`,
      `最後加上堅果、起司或水果等配料，完成 ${displayName} 的層次擺盤。`
    ];
  }

  if (categorySlug === "open-sandwich") {
    return [
      `備料：${lead}；麵包切厚片，烤箱 180℃ 烤 3～5 分鐘至外脆內軟，蛋與生菜分開備好。`,
      `主蛋白以平底鍋中小火煎到上色、中心熟透；水波蛋或荷包蛋另鍋完成，蛋白凝固即可。`,
      `麵包上依序抹上 ${sauces}、鋪主蛋白與酪梨／生菜，輕壓固定，保留高低層次。`,
      `上桌前磨黑胡椒或淋少許檸檬／巴薩米克，趁麵包仍酥脆時食用。`
    ];
  }

  if (categorySlug === "sf-brunch") {
    return [
      `備料：${lead} 分區備好；吐司、薯塊與沙拉菜分開，${sauces} 調味後試吃。`,
      `主蛋白先煎或烤到七八分熟，薯塊另外烤上色；蛋料理最後才做以保留口感。`,
      `醬汁以小火煮至可掛勺的濃度；水波蛋用滾水加醋燙至蛋白凝固、蛋黃流心。`,
      `大盤分區擺放主菜、蛋、麵包與生菜，醬汁淋在蛋或主蛋白上即可。`
    ];
  }

  if (categorySlug === "main-rice-noodle") {
    return [
      `備料：${lead} 切適合入口大小；麵條或飯先煮到八成熟瀝乾，保留少許煮麵水。`,
      `平底鍋中火下油，主蛋白與配菜先炒至香氣溢出；${sauces} 另鍋小火收濃。`,
      `回鍋拌入主食與醬汁，必要時加煮麵水調整濃稠，讓每口都有完整配料。`,
      `起鍋前回放主蛋白與起司或香草，盛盤後立即上桌。`
    ];
  }

  if (categorySlug === "big-bite") {
    return [
      `備料：${lead}；漢堡麵包烤至外脆，肉排調味後靜置 5 分鐘。`,
      `肉排以中火每面煎 3～4 分鐘至上色，起司可在起鍋前蓋上悶 30 秒融化。`,
      `麵包內側抹 ${sauces}，依序疊肉排、蛋、生菜，輕壓固定。`,
      `附餐另外盛盤，完成 ${displayName} 後趁熱食用。`
    ];
  }

  if (categorySlug === "big-plate") {
    return [
      `備料：${lead} 與配菜備齊；主肉以鹽、胡椒與部分醬料醃 20 分鐘。`,
      `主菜先煎上色，再進烤箱 180～200℃ 烤至中心熟透；配菜同步完成。`,
      `出爐前刷上剩餘醬料，靜置 5 分鐘再切。`,
      `切件後與配菜分區擺滿大盤上桌。`
    ];
  }

  if (categorySlug === "kids") {
    return [
      `備料：${lead} 切小塊，調味略淡；${sauces} 先試鹹甜。`,
      `主蛋白與麵飯做到熟透軟嫩，蔬菜後下保持顏色。`,
      `醬汁薄薄裹住食材即可。`,
      `與小份配菜組盤，趁溫熱食用。`
    ];
  }

  if (categorySlug === "dessert") {
    return [
      `備料：${lead} 依需求回溫或冷藏；${sauces} 分裝。`,
      `蛋糕或布朗尼烤至中心微濕、表面定型。`,
      `搭配冰淇淋或鮮奶油做出冷熱對比。`,
      `單盤擺好 ${displayName} 即可上桌。`
    ];
  }

  return [
    `備料：${lead} 分開備好，${sauces} 調勻試味。`,
    `主食材煎炒或烤到接近餐廳熟度，表面上色、中心多汁。`,
    `配菜依需要加熱或保持冷食，與主體分開完成。`,
    `組盤時淋上或拌入醬汁，完成 ${displayName}。`
  ];
}
