import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { formatAmount } from "./parse-recipe-fm.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const menuPath = join(root, "src/data/dubu-house-menu.json");

/** @type {Record<string, string>} */
let slugCategoryCache;

function loadSlugCategoryMap() {
  if (slugCategoryCache) return slugCategoryCache;
  const menu = JSON.parse(readFileSync(menuPath, "utf8"));
  slugCategoryCache = {};
  for (const category of menu.categories) {
    for (const item of category.items) {
      slugCategoryCache[item.slug] = category.slug;
    }
  }
  return slugCategoryCache;
}

function phraseList(items, limit = 8) {
  return items
    .slice(0, limit)
    .map((item) => formatAmount(item))
    .join("、");
}

function seasoningList(seasonings, limit = 6) {
  return seasonings
    .slice(0, limit)
    .map((item) => formatAmount(item))
    .join("、");
}

/**
 * @param {Array<{name:string,amount:string,unit:string}>} ingredients
 * @param {string[]} needles
 */
function findIngredient(ingredients, needles) {
  return ingredients.find((item) => needles.some((n) => item.name.includes(n)));
}

/**
 * @param {Array<{name:string,amount:string,unit:string}>} seasonings
 * @param {string[]} needles
 */
function findSeasoning(seasonings, needles) {
  return seasonings.find((item) => needles.some((n) => item.name.includes(n)));
}

function inferCategory(slug) {
  if (slug.includes("soondubu")) return "soondubu";
  if (slug.includes("stone-pot-rice") || slug.includes("bibimbap")) return "stone-pot-rice";
  if (slug.includes("korean-fried-chicken")) return "chef-recommendation";
  return "specialty";
}

function buildSoondubuSteps(title, ingredients, seasonings) {
  const tofu = findIngredient(ingredients, ["嫩豆腐"]);
  const onion = findIngredient(ingredients, ["洋蔥"]);
  const scallion = findIngredient(ingredients, ["青蔥"]);
  const broth = findIngredient(ingredients, ["高湯"]);
  const garlic = findSeasoning(seasonings, ["蒜末", "蒜"]);
  const paste =
    findSeasoning(seasonings, ["辣椒醬", "咖哩", "大醬"]) ??
    findSeasoning(seasonings, ["粉"]);
  const soy = findSeasoning(seasonings, ["醬油"]);
  const sesame = findSeasoning(seasonings, ["芝麻油"]);
  const meat = ingredients.find(
    (item) =>
      /牛|豬|羊|雞|植物肉|植物雞|蝦|蛤|蚵|魚|透抽|中卷|餃|年糕|起司年糕/.test(item.name) &&
      !item.name.includes("豆腐")
  );
  const cheese = seasonings.find((item) => /起司/.test(item.name));
  const riceCake = ingredients.find((item) => item.name.includes("年糕"));
  const extras = ingredients
    .filter(
      (item) =>
        item !== tofu &&
        item !== onion &&
        item !== scallion &&
        item !== broth &&
        item !== meat &&
        item !== riceCake &&
        !["高湯"].includes(item.name)
    )
    .map((item) => formatAmount(item));

  const steps = [
    `備料：${onion ? `${formatAmount(onion)}切絲` : "洋蔥切絲"}，${scallion ? `${formatAmount(scallion)}切段` : "青蔥切段"}；${[garlic, paste, soy, sesame].filter(Boolean).map((item) => formatAmount(item)).join("、") || "蒜末、韓式辣椒醬、醬油、韓式芝麻油"}分裝備用。${meat ? `${formatAmount(meat)}切片或切塊。` : ""}${extras.length ? `其餘配料 ${extras.join("、")} 洗淨切好。` : ""}`,
    `辣湯鍋或厚底小鍋以中火加熱，倒入 ${sesame ? formatAmount(sesame) : "韓式芝麻油 1 大匙"}，下 ${garlic ? formatAmount(garlic) : "蒜末"} 與洋蔥絲炒至透明出香，再加入 ${paste ? formatAmount(paste) : "韓式辣椒醬 1.5 大匙"} 炒出紅油香氣（約 1 分鐘，注意勿炒焦）。`,
  ];

  if (meat) {
    steps.push(
      `放入 ${formatAmount(meat)}，轉大火快速翻炒至表面變色、不再滲出血水（約 2～3 分鐘），讓肉汁鎖在鍋底。`
    );
  }

  let simmer = `倒入 ${broth ? formatAmount(broth) : "高湯 400 毫升"}${soy ? ` 與 ${formatAmount(soy)}` : " 與醬油 1 大匙"}，大火煮滾後轉中小火`;
  if (extras.length) {
    simmer += `，加入 ${extras.join("、")}`;
  }
  simmer += "，蓋鍋或不蓋鍋慢煮 5～8 分鐘至湯頭入味、配料熟透。";
  steps.push(simmer);

  if (riceCake) {
    steps.push(
      `將 ${formatAmount(riceCake)} 放入湯中煮 2～3 分鐘至年糕變軟 Q 彈；若使用起司年糕，此時輕壓一下讓起司略為流出。`
    );
  }

  steps.push(
    `關小火，用湯匙將 ${tofu ? formatAmount(tofu) : "嫩豆腐 1 包"} 大塊舀入鍋中央，以鍋匙沿鍋邊輕推讓湯汁流過豆腐，避免大力攪拌（再煮 2 分鐘至滾燙）。`
  );

  let finish = "關火前 ";
  if (cheese) finish += `鋪上 ${formatAmount(cheese)}，`;
  finish += "打入雞蛋 1 顆，待蛋白凝固、蛋黃半熟；撒蔥花與芝麻，連鍋滾燙上桌。";
  steps.push(finish);

  return steps;
}

function buildBibimbapSteps(ingredients, seasonings) {
  const rice = findIngredient(ingredients, ["白米", "米"]);
  const protein = ingredients.find((item) => /牛|豬|雞/.test(item.name));
  const veggies = ingredients.filter(
    (item) => item !== rice && item !== protein && !item.name.includes("蛋")
  );
  const egg = findIngredient(ingredients, ["蛋"]);
  const gochujang = findSeasoning(seasonings, ["辣醬", "辣椒"]);
  const sesame = findSeasoning(seasonings, ["芝麻油", "芝麻"]);
  const soy = findSeasoning(seasonings, ["醬油"]);
  const salt = findSeasoning(seasonings, ["鹽"]);

  return [
    `將 ${rice ? formatAmount(rice) : "白米 150 克"} 洗淨，加 ${findIngredient(ingredients, ["高湯"]) ? formatAmount(findIngredient(ingredients, ["高湯"])) : "高湯或清水 360 毫升"} 煮成飯粒分明、口感 Q 彈的白飯，完成後保溫備用。`,
    `${protein ? formatAmount(protein) : "肉片"} 以 ${soy ? formatAmount(soy) : "醬油"}、${sesame ? "少許韓式芝麻油" : "芝麻油"} 與 ${salt ? formatAmount(salt) : "鹽"} 抓醃 10 分鐘；${phraseList(veggies) || "各色蔬菜"} 分別洗淨切絲或切段。`,
    `平底鍋中火下油，將肉類炒至熟透起焦香，起鍋；同一鍋依序快炒各色蔬菜，每種約 1～2 分鐘，以鹽與少許芝麻油調味，分裝備用。`,
    `石鍋內壁均勻刷上韓式芝麻油 1～2 大匙，鋪入熱白飯並輕壓平整，依色碼排列炒好的肉與蔬菜，中央預留空位。`,
    `${egg ? `打入 ${formatAmount(egg)}` : "打入雞蛋 1 顆"}，中火加熱石鍋 3～5 分鐘，聽到底部滋滋聲、聞到鍋巴香即可關火。`,
    `上桌前淋上 ${gochujang ? formatAmount(gochujang) : "韓國辣醬 1 大匙"} 與芝麻，用湯匙由外往內拌勻，趁熱享用。`
  ];
}

function buildStonePotRiceSteps(ingredients, seasonings) {
  if (ingredients.some((item) => item.name.includes("拌飯")) || ingredients.length > 5) {
    return buildBibimbapSteps(ingredients, seasonings);
  }
  const rice = findIngredient(ingredients, ["白米", "米"]);
  const toppings = ingredients.filter((item) => item !== rice);
  const sesame = findSeasoning(seasonings, ["芝麻油"]);
  const soy = findSeasoning(seasonings, ["醬油"]);
  const salt = findSeasoning(seasonings, ["鹽"]);

  return [
    `將 ${rice ? formatAmount(rice) : "白米"} 洗淨，加高湯或清水依一般比例煮成飯，完成後稍微翻鬆散熱氣。`,
    `將 ${phraseList(toppings) || "配料"} 切好；平底鍋倒入 ${sesame ? formatAmount(sesame) : "韓式芝麻油"}，分開炒熟各配料，以 ${soy ? formatAmount(soy) : "醬油"} 與 ${salt ? formatAmount(salt) : "鹽"} 輕調味。`,
    `石鍋內壁刷上薄薄一層芝麻油，鋪入白飯並輕壓，把炒好的配料整齊排在飯上。`,
    `石鍋移至爐上中火加熱 4～6 分鐘，直到底部出現金黃鍋巴、聞到焦香即可關火，上桌前再拌勻或直接享用。`
  ];
}

function buildFriedChickenSteps(title, ingredients, seasonings, slug) {
  const chicken = findIngredient(ingredients, ["雞", "植物雞", "植物肉"]);
  const onion = findIngredient(ingredients, ["洋蔥"]);
  const scallion = findIngredient(ingredients, ["青蔥"]);
  const powder = findSeasoning(seasonings, ["炸雞粉", "粉"]);
  const garlic = findSeasoning(seasonings, ["蒜末", "蒜"]);
  const salt = findSeasoning(seasonings, ["鹽"]);
  const pepper = findSeasoning(seasonings, ["胡椒"]);
  const sesame = findSeasoning(seasonings, ["芝麻油"]);
  const sauce = seasonings.find(
    (item) =>
      /醬|蜂蜜|肯瓊|BBQ|奶油|洋蔥|蒜味|辣味/.test(item.name) &&
      !["蒜末", "鹽", "胡椒"].includes(item.name)
  );
  const isDry = slug.includes("original");
  const marinade = [garlic, salt, pepper, sesame].filter(Boolean).map((item) => formatAmount(item));

  const steps = [
    `將 ${chicken ? formatAmount(chicken) : "去骨雞腿肉"} 切成一口大小（約 3～4 公分），用廚房紙巾吸乾表面水分。`,
    `以 ${marinade.join("、") || "蒜末、鹽、胡椒粉與韓式芝麻油"} 抓醃，冷藏靜置 30 分鐘入味。`,
    `炸鍋倒入足量油，以廚房溫度計確認油溫 170°C；雞肉均勻裹上 ${powder ? formatAmount(powder) : "韓式炸雞粉"}，抖掉多餘粉粒。`,
    `雞塊分批下鍋，避免降溫，中火炸約 7 分鐘至表面定型、內部熟透，撈起瀝油休息 3 分鐘。`,
    `將油溫升至 185°C，雞塊回鍋複炸 1.5～2 分鐘至金黃酥脆，撈起放在網架上瀝油。`
  ];

  if (isDry) {
    steps.push("趁熱撒上芝麻與胡椒鹽，分裝上桌即可。");
    return steps;
  }

  steps.push(
    `另起平底鍋小火加熱 ${sesame ? formatAmount(sesame) : "韓式芝麻油 1 大匙"}，炒香 ${onion ? formatAmount(onion) : "洋蔥絲"} 與 ${scallion ? formatAmount(scallion) : "青蔥"}。`
  );
  steps.push(
    `倒入 ${sauce ? formatAmount(sauce) : "韓式炸雞醬"}，攪拌至微稠後關火，放入炸雞塊快速翻拌裹勻醬汁（關火操作可避免脆皮變軟），撒芝麻即可上桌。`
  );
  return steps;
}

function buildFriedChickenComboSteps(ingredients, seasonings) {
  return [
    ...buildFriedChickenSteps("韓式炸雞", ingredients, seasonings, "dh-original-korean-fried-chicken").slice(0, 5),
    "依個人喜好選兩種醬味（如蜂蜜蒜味、辣味或肯瓊醬），分別在關火後各取一半炸雞拌入不同醬汁。",
    "分區盛盤，附上醃蘿蔔或生菜，趁外皮仍酥脆時享用。"
  ];
}

function buildKoreanPancakeSteps(title, ingredients, seasonings) {
  const main = ingredients[0];
  const subs = ingredients.slice(1);
  const flour = findSeasoning(seasonings, ["麵粉", "粉"]);
  const egg = findSeasoning(seasonings, ["蛋"]);
  const salt = findSeasoning(seasonings, ["鹽"]);
  const water = findSeasoning(seasonings, ["水"]);
  const cheese = seasonings.find((item) => item.name.includes("起司"));
  const sesame = findSeasoning(seasonings, ["芝麻油", "油"]);

  return [
    `${main ? formatAmount(main) : "主料"} ${subs.length ? `與 ${phraseList(subs)}` : ""} 洗淨切絲或切薄片；${title.includes("泡菜") ? "泡菜略擠乾湯汁避免出水。" : ""}`,
    `大碗中混合 ${flour ? formatAmount(flour) : "中筋麵粉 100 克"}、${egg ? formatAmount(egg) : "雞蛋 1 顆"}、${salt ? formatAmount(salt) : "鹽 1/2 小匙"} 與 ${water ? formatAmount(water) : "冷水 120 毫升"}，攪成略稠的麵糊，拌入切好的配料。`,
    `平底鍋中火倒入 ${sesame ? formatAmount(sesame) : "植物油 3 大匙"}，倒入麵糊攤成圓餅，煎至底部金黃定型（約 3～4 分鐘）。`,
    `${cheese ? `撒上 ${formatAmount(cheese)}，` : ""}小心翻面，再煎 3 分鐘至兩面酥脆；用鍋鏟壓一下讓中心熟透。`,
    "取出切塊，搭配醬油醋沾醬或韓式沾醬趁熱上桌。"
  ];
}

function buildGlassNoodleSteps(ingredients, seasonings) {
  const noodle = findIngredient(ingredients, ["冬粉", "粉絲"]);
  const veg = ingredients.filter((item) => item !== noodle && !/牛|豬/.test(item.name));
  const protein = ingredients.find((item) => /牛|豬/.test(item.name));
  const sauces = seasoningList(seasonings);

  return [
    `${noodle ? formatAmount(noodle) : "韓式冬粉"} 冷水泡軟 20 分鐘瀝乾；${phraseList(veg) || "蔬菜"} 切絲，${protein ? formatAmount(protein) : "肉絲"} 以醬油與蒜末抓醃。`,
    `鍋中燒滾水，冬粉汆燙 2 分鐘至透明，立刻沖冷水瀝乾，剪成適口長度。`,
    `平底鍋倒入芝麻油，爆香洋蔥與胡蘿蔔，加入肉絲炒至變色，再放入其餘蔬菜快炒。`,
    `下冬粉與 ${sauces || "醬油、糖、芝麻油"}，中火翻炒 2～3 分鐘讓粉絲均勻上色入味。`,
    "試味調整鹹甜度，起鍋前撒芝麻，熱食風味最佳。"
  ];
}

function buildSteamedEggSteps(ingredients, seasonings) {
  const egg = findIngredient(ingredients, ["蛋"]);
  const cheese = findIngredient(ingredients, ["起司"]);
  const roe = findIngredient(ingredients, ["魚卵", "飛魚"]);
  const broth = findSeasoning(seasonings, ["高湯", "水"]);
  const salt = findSeasoning(seasonings, ["鹽"]);

  return [
    `陶鍋或厚底小鍋抹油；${egg ? formatAmount(egg) : "雞蛋 3 顆"} 打散，加入 ${broth ? formatAmount(broth) : "高湯或清水 150 毫升"} 與 ${salt ? formatAmount(salt) : "鹽 1/4 小匙"}，過篩去除氣泡。`,
    `小火加熱鍋子，倒入蛋液，用筷子輕快攪拌至半凝固（約 2 分鐘）。`,
    `${cheese ? `均勻鋪上 ${formatAmount(cheese)}，` : ""}${roe ? `再撒 ${formatAmount(roe)}，` : ""}蓋鍋轉極小火蒸 5～6 分鐘至中心仍略嫩。`,
    "關火悶 2 分鐘，以湯匙沿鍋邊劃開即可共享。"
  ];
}

function buildBrownSugarPancakeSteps(seasonings) {
  const flour = findSeasoning(seasonings, ["麵粉"]);
  const sugar = findSeasoning(seasonings, ["黑糖", "糖"]);
  const cinnamon = findSeasoning(seasonings, ["肉桂"]);
  const nuts = findSeasoning(seasonings, ["堅果", "核桃", "花生"]);
  const water = findSeasoning(seasonings, ["水"]);

  return [
    `內餡：${sugar ? formatAmount(sugar) : "黑糖 80 克"} 與 ${cinnamon ? formatAmount(cinnamon) : "肉桂粉 1/2 小匙"}、${nuts ? formatAmount(nuts) : "切碎堅果 30 克"} 混合備用。`,
    `麵團：${flour ? formatAmount(flour) : "中筋麵粉 200 克"} 加 ${water ? formatAmount(water) : "溫水 100 毫升"} 揉成光滑麵團，鬆弛 15 分鐘後分成 4 份。`,
    `每份壓扁包入黑糖餡，收口捏緊，再輕壓成圓餅（厚度約 1 公分）。`,
    `平底鍋少油中火，煎至兩面金黃並微微鼓起（每面約 3 分鐘），關火悶 1 分鐘讓糖漿更濃稠。`,
    "趁熱切開，小心黑糖爆漿燙口，外脆內 Q 最佳。"
  ];
}

function buildTofuIceCreamSteps(ingredients, seasonings) {
  const tapioca = findIngredient(ingredients, ["珍珠", "粉圓"]);
  const sugar = findSeasoning(seasonings, ["黑糖", "糖"]);

  return [
    "豆腐冰淇淋提前從冷凍取出，於冷藏退冰 10 分鐘至可挖球狀態（勿完全融化）。",
    `${tapioca ? formatAmount(tapioca) : "珍珠"} 依包裝煮到 Q 彈透明，沖冷水拌少許糖防黏。`,
    `小鍋以小火熬煮 ${sugar ? formatAmount(sugar) : "黑糖 50 克"} 與水 30 毫升至濃稠可掛勺。`,
    "碗中放入豆腐冰淇淋球，淋上溫熱黑糖漿，鋪上珍珠即可上桌。"
  ];
}

function buildRiceCakeStirFrySteps(title, ingredients, seasonings) {
  const riceCake = findIngredient(ingredients, ["年糕"]);
  const protein = ingredients.find((item) => /牛|豬|海鮮|透抽|中卷|魷|雞|植物/.test(item.name));
  const sauce = seasoningList(seasonings);
  const cheese = seasonings.find((item) => item.name.includes("起司"));

  return [
    `${riceCake ? formatAmount(riceCake) : "韓式年糕"} 若為冷藏硬塊，先以溫水浸泡 10 分鐘；${protein ? formatAmount(protein) : "配料"} 切好備用。`,
    `平底鍋倒入油，${protein ? `炒香 ${formatAmount(protein)}，` : ""}加入年糕與 ${sauce || "韓式辣醬、醬油"} 翻炒。`,
    `倒入高湯或水 100 毫升，蓋鍋中火煮 5 分鐘，期間翻拌避免黏鍋。`,
    `${title.includes("松露") || title.includes("起司") ? `${cheese ? `起鍋前加入 ${formatAmount(cheese)} 拌至融化牽絲。` : "起鍋前加入起司拌至融化。"}` : "收汁至醬汁濃稠裹住年糕。"}`,
    "起鍋撒芝麻或蔥花，熱食口感最佳。"
  ];
}

function buildGinsengChickenSteps(title, ingredients, seasonings) {
  const chicken = findIngredient(ingredients, ["雞", "春雞"]);
  const ginseng = findIngredient(ingredients, ["人蔘"]);
  const glutinous = findIngredient(ingredients, ["糯米"]);
  const veg = ingredients.filter(
    (item) => !/雞|人蔘|糯米/.test(item.name)
  );
  const isHotPot = title.includes("火鍋") || title.includes("3-5");

  const steps = [
    `將 ${chicken ? formatAmount(chicken) : "全雞"} 內外洗淨擦乾；${ginseng ? formatAmount(ginseng) : "人蔘"} 刷洗切片，${phraseList(veg) || "香菇、紅棗、大白菜"} 備齊。`,
    `${glutinous ? `糯米 ${formatAmount(glutinous)} 泡水 30 分鐘瀝乾，塞入雞腹，以牙籤封口。` : "雞腹可塞入糯米與紅棗增添口感。"}`,
    `砂鍋或湯鍋加入清水或高湯約 ${isHotPot ? "1.5 公升" : "800 毫升"}，放入雞隻、人蔘與耐煮蔬菜，大火煮滾後撇浮沫。`
  ];

  if (isHotPot) {
    steps.push("轉中小火燉煮 50～60 分鐘至骨軟肉嫩，最後 10 分鐘加入年糕片與易熟配料。");
    steps.push("調味後連湯帶料上桌，可搭配蘸醬分食。");
  } else {
    steps.push("轉中小火蓋鍋燉煮 35～40 分鐘至雞肉軟嫩、湯頭帶人蔘甘香。");
    steps.push("依口味加鹽與胡椒粉，整隻或切塊連湯上桌。");
  }
  return steps;
}

function buildOxBoneSoupSteps(ingredients, seasonings) {
  const bone = findIngredient(ingredients, ["牛骨", "骨"]);
  const noodle = findIngredient(ingredients, ["麵", "烏龍", "拉麵"]);
  const scallion = findIngredient(ingredients, ["青蔥"]);
  const salt = findSeasoning(seasonings, ["鹽"]);

  return [
    `${bone ? formatAmount(bone) : "牛骨"} 冷水下鍋汆燙 5 分鐘洗淨血沫，重新加清水 1.2 公升大火煮滾。`,
    "轉小火慢燉 90 分鐘以上至湯色乳白濃郁，途中撈除浮油與雜質。",
    `${noodle ? `${formatAmount(noodle)} 另鍋煮熟瀝乾。` : "麵條另鍋煮熟瀝乾。"}`,
    `碗中放入麵條，淋上熱湯，以 ${salt ? formatAmount(salt) : "鹽"} 調味，撒 ${scallion ? formatAmount(scallion) : "蔥花"} 即可。`
  ];
}

function buildBbqShortRibsSteps(ingredients, seasonings) {
  const ribs = findIngredient(ingredients, ["牛", "排骨", "肉"]);
  const onion = findIngredient(ingredients, ["洋蔥"]);
  const sauces = seasoningList(seasonings);

  return [
    `${ribs ? formatAmount(ribs) : "牛小排或牛肋條"} 切適口大小，${onion ? formatAmount(onion) : "洋蔥"} 切大片。`,
    `以 ${sauces || "醬油、糖、蒜末、芝麻油"} 抓醃至少 2 小時（或冷藏過夜）。`,
    "鐵板或鑄鐵鍋燒到冒煙，下肉鋪平，單面煎烤 2 分鐘至焦香。",
    "翻面再烤 2 分鐘，加入洋蔥同烤；肉熟後剪塊，趁熱上桌。"
  ];
}

function buildAppetizerSteps(slug, title, ingredients, seasonings) {
  if (slug.includes("glass-noodle")) return buildGlassNoodleSteps(ingredients, seasonings);
  if (slug.includes("steamed-eggs")) return buildSteamedEggSteps(ingredients, seasonings);
  if (slug.includes("vermicelli-tofu-roll")) {
    return [
      "韓式冬粉冷水泡軟切短；豆腐皮或豆腐切條，胡蘿蔔、菠菜汆燙擠乾。",
      "平底鍋炒香牛肉末或香菇末，以醬油與芝麻油調味，與粉絲拌勻成餡。",
      "豆腐皮鋪平，放上餡料與蔬菜，緊實捲起，接口朝下。",
      "煎鍋少油，中火將豆腐捲四面煎到金黃定型，切厚片上桌。"
    ];
  }
  if (slug.includes("french-fries")) {
    const sauce = seasoningList(seasonings);
    return [
      "馬鈴薯切粗條（約 1 公分見方），冷水浸泡 10 分鐘去除表面澱粉，瀝乾後用廚房紙徹底吸乾。",
      "炸鍋倒入足量油，以溫度計確認 160°C，薯條分批下鍋炸 5 分鐘至略軟，撈起瀝油。",
      "休息 5 分鐘讓內部水分散發，將油溫升至 190°C，回鍋複炸 2 分鐘至金黃酥脆。",
      `瀝油後依口味撒鹽，搭配 ${sauce || "韓式甜辣沾醬"} 趁熱上桌。`
    ];
  }
  if (slug.includes("deep-fried-tofu")) {
    return [
      "嫩豆腐切 1.5 公分厚片，兩面輕撒鹽與白胡椒，靜置 5 分鐘。",
      "用廚房紙巾壓去表面水分，均勻裹上薄層玉米粉或地瓜粉。",
      "油溫 170°C 下鍋，中火炸至表面金黃起泡（約 3 分鐘），翻面再炸 1 分鐘。",
      "撈起瀝油，搭配醬油醋、韓式辣醬或蒜泥醬油沾食。"
    ];
  }
  if (slug.includes("fish-ball")) {
    return [
      `${phraseList(ingredients) || "魚板丸"} 若為冷凍先室溫退冰 10 分鐘；洋蔥切絲，青蔥切段。`,
      "平底鍋倒入韓式芝麻油 1 大匙與韓式辣醬 1.5 大匙，小火炒出紅油香氣。",
      "加入魚丸中火翻炒 2 分鐘至表面微焦，下洋蔥絲拌炒。",
      "加清水 3 大匙蓋鍋悶 2 分鐘收汁，起鍋撒蔥花與芝麻。"
    ];
  }
  return buildKoreanPancakeSteps(title, ingredients, seasonings);
}

function buildChefRecommendationSteps(slug, title, ingredients, seasonings) {
  if (slug.includes("korean-fried-chicken")) {
    if (slug.includes("combo")) return buildFriedChickenComboSteps(ingredients, seasonings);
    return buildFriedChickenSteps(title, ingredients, seasonings, slug);
  }
  if (slug.includes("pancake")) return buildKoreanPancakeSteps(title, ingredients, seasonings);
  if (slug.includes("ox-bone")) return buildOxBoneSoupSteps(ingredients, seasonings);
  if (slug.includes("beef-short-ribs")) return buildBbqShortRibsSteps(ingredients, seasonings);
  if (slug.includes("sweet-and-sour")) {
    return [
      `${phraseList(ingredients) || "豬肉與蔬菜"} 切塊；以鹽、胡椒與蛋黃抓醃，再裹乾粉備用。`,
      "油鍋 170°C 炸熟肉塊至金黃，撈起瀝油。",
      `鍋中留底油，炒香洋蔥與彩椒，倒入 ${seasoningList(seasonings) || "糖醋醬"} 煮滾。`,
      "放回炸肉快速翻炒裹醬，起鍋前淋芝麻油即可。"
    ];
  }
  if (slug.includes("fried-oysters")) {
    return [
      "新鮮生蠔在流動水下輕洗，瀝乾後用廚房紙吸乾水分（表面越乾炸越脆）。",
      "依序沾玉米粉、打散的蛋液、再沾麵包粉，輕壓讓粉層附著。",
      "油溫 175°C 下鍋，炸約 2 分鐘至金黃，外酥內嫩即可撈起。",
      "瀝油後搭配塔塔醬、韓式辣醬或檸檬角，趁熱享用。"
    ];
  }
  if (slug.includes("bbq-wrap")) {
    return [
      "墨西哥餅皮或薄餅以乾鍋中火兩面各加熱 20～30 秒至微斑點，保持柔軟不乾裂。",
      `${phraseList(ingredients) || "烤肉、生菜與蔬菜"} 切好備用；肉類可先以醬油、糖與蒜末醃漬後煎烤切條。`,
      "餅皮中央鋪生菜、烤肉與蔬菜，淋上韓式辣醬或芝麻油。",
      "由下方緊實捲起，左右折入後再捲緊，對切呈現截面即可上桌。"
    ];
  }
  if (slug.includes("egg-roll")) {
    return [
      "雞蛋 3 顆打散加鹽 1/4 小匙；起司切條，青蔥切末備用。",
      "平底鍋刷薄油，倒入 1/3 蛋液攤成薄蛋皮，半凝固時鋪起司與蔥花。",
      "用鍋鏟捲成長條，推至鍋邊；重複倒入蛋液連接蛋卷，共捲 2～3 層。",
      "整條定型後切段，可再煎至表面微焦，趁熱上桌。"
    ];
  }
  return buildKoreanPancakeSteps(title, ingredients, seasonings);
}

function buildSpecialtySteps(slug, title, ingredients, seasonings) {
  if (slug.includes("fried-chicken") && slug.includes("rice-cake")) {
    return buildRiceCakeStirFrySteps(title, ingredients, seasonings);
  }
  if (slug.includes("rice-cake") || slug.includes("tteok") || slug.includes("stir-fried-rice-cake")) {
    return buildRiceCakeStirFrySteps(title, ingredients, seasonings);
  }
  if (slug.includes("ginseng")) return buildGinsengChickenSteps(title, ingredients, seasonings);
  if (slug.includes("spicy-stired-fried-chicken") || slug.includes("春川")) {
    return [
      `${findIngredient(ingredients, ["雞"]) ? formatAmount(findIngredient(ingredients, ["雞"])) : "去骨雞腿肉"} 切塊，以醬油、蒜末與辣椒粉醃 20 分鐘。`,
      "馬鈴薯切塊、高麗菜切段；平底鍋大火下油，先煎雞肉至半熟。",
      `加入蔬菜與 ${seasoningList(seasonings) || "春川辣醬"} 快炒，蓋鍋 5 分鐘。`,
      "打開蓋子大火收汁，起鍋前撒芝麻與青蔥。"
    ];
  }
  if (slug.includes("fish-fillet") || slug.includes("飛虎魚")) {
    return [
      `${phraseList(ingredients) || "魚片與蔬菜"} 切好；魚片以鹽、胡椒與米酒輕醃。`,
      "平底鍋下油，魚片每面煎 2 分鐘至金黃，取出備用。",
      "同鍋炒香洋蔥與蔬菜，加入醬油、糖與少許水煮成醬汁。",
      "魚片回鍋裹醬，起鍋前淋芝麻油。"
    ];
  }
  if (slug.includes("squid")) {
    return [
      `${findIngredient(ingredients, ["透抽", "中卷", "魷"]) ? formatAmount(findIngredient(ingredients, ["透抽", "中卷", "魷"])) : "透抽"} 去除內臟洗淨，切圈或切花刀，汆燙 30 秒瀝乾。`,
      `平底鍋倒入油，爆香蒜末與 ${findIngredient(ingredients, ["洋蔥"]) ? formatAmount(findIngredient(ingredients, ["洋蔥"])) : "洋蔥絲"}。`,
      `加入 ${seasoningList(seasonings) || "韓式辣醬 2 大匙"} 與透抽，大火快炒 2 分鐘。`,
      "起鍋前試味調整辣度，撒芝麻與青蔥，趁熱上桌。"
    ];
  }
  if (slug.includes("pancake") || slug.includes("potato")) {
    return buildKoreanPancakeSteps(title, ingredients, seasonings);
  }
  return buildRiceCakeStirFrySteps(title, ingredients, seasonings);
}

/**
 * @param {{ slug: string; title: string; ingredients: Array<{name:string,amount:string,unit:string}>; seasonings: Array<{name:string,amount:string,unit:string}>; equipment?: string[] }} ctx
 */
export function buildDetailedDhSteps(ctx) {
  const categoryMap = loadSlugCategoryMap();
  const category = categoryMap[ctx.slug] ?? inferCategory(ctx.slug);
  const { slug, title, ingredients, seasonings } = ctx;

  let steps;
  if (category === "soondubu" || slug.includes("soondubu")) {
    steps = buildSoondubuSteps(title, ingredients, seasonings);
  } else if (category === "stone-pot-rice") {
    steps = slug.includes("bibimbap")
      ? buildBibimbapSteps(ingredients, seasonings)
      : buildStonePotRiceSteps(ingredients, seasonings);
  } else if (category === "appetizer") {
    steps = buildAppetizerSteps(slug, title, ingredients, seasonings);
  } else if (category === "dessert") {
    steps = slug.includes("brown-sugar")
      ? buildBrownSugarPancakeSteps(seasonings)
      : buildTofuIceCreamSteps(ingredients, seasonings);
  } else if (category === "chef-recommendation") {
    steps = buildChefRecommendationSteps(slug, title, ingredients, seasonings);
  } else {
    steps = buildSpecialtySteps(slug, title, ingredients, seasonings);
  }

  return steps.filter(Boolean).slice(0, 8);
}
