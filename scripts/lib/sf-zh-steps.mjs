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

  // 1. Benedict
  if (displayName.includes("班尼蛋")) {
    return [
      `將英式馬芬橫切剖開，抹少許奶油以 180°C 烤至金黃微焦；將 ${lead} 切好，蕈菇以奶油與少許鹽炒香備用。`,
      `熱鍋將主配料（如火腿、雞肉、牛肉片或燻鮭魚）快速煎熱並保溫；${sauces} 備妥。`,
      `湯鍋燒滾水加少許醋，轉小火用勺子攪拌出漩渦，打入新鮮雞蛋小火燙煮約 3 分鐘，做出外凝固、內流心的水波蛋。`,
      `在馬芬麵包上依序鋪上炒菇、主肉品、水波蛋，最後淋上溫熱的 ${sauces}（如經典荷蘭醬），即可趁熱享用。`
    ];
  }

  // 2. Omelette
  if (displayName.includes("歐姆蕾")) {
    return [
      `打散雞蛋 3 顆，加入少許鮮奶油與鹽拌勻；將 ${lead}（如蕈菇、火腿、肉醬）與起司準備妥當。`,
      `熱平底鍋將內餡配料（如洋蔥、蕈菇）以奶油炒香，若有肉醬則倒入略為收汁後盛出備用。`,
      `重新熱平底鍋，加入奶油融化，倒入蛋液快速畫圈攪拌至半凝固，將配料與起司鋪在蛋液中央。`,
      `用鍋鏟小心將蛋皮對折成半月形，悶 30 秒至起司完全融化，滑入大盤中，搭配配菜裝盤即成。`
    ];
  }

  // 3. Danish Brunch
  if (displayName.includes("橙香法式丹麥") || displayName.includes("橙香丹麥")) {
    return [
      `將橙香法式丹麥麵包排在烤盤上，以 180°C 烤 3-5 分鐘至外層酥香；沙拉菜洗淨瀝乾備用。`,
      `平底鍋中小火熱油，將主蛋白（如 ${lead} 中的舒肥雞肉、牛排、海鮮或蕈菇）煎熟上色，撒少許鹽與黑胡椒。`,
      `太陽蛋或水波蛋另鍋完成，保持蛋黃流心狀態；將薯塊或洋芋另外煎炒至表面金黃焦香。`,
      `在大圓盤中分區擺放烤好的丹麥麵包、煎好的主蛋白、洋芋和生菜，在主料上淋上 ${sauces} 即成。`
    ];
  }

  // 4. Pasta
  if (displayName.includes("麵") || displayName.includes("義大利麵") || displayName.includes("長管麵") || displayName.includes("墨魚麵") || displayName.includes("粉")) {
    return [
      `湯鍋燒滾水並加鹽，放入麵條（如長管麵、墨魚麵或寬扁麵）依指示烹煮至彈牙（al dente），撈出保留 1/2 杯煮麵水。`,
      `平底鍋中火下油，煸香大蒜、洋蔥，隨後加入 ${lead}（如鮮蝦、雞肉、蛤蜊、培根）炒至熟透並散發香氣，先盛出備用。`,
      `倒入 ${sauces} 與少許煮麵水煮滾，再將煮好的麵條倒入鍋中大火翻炒，讓醬汁乳化並緊密裹住麵條。`,
      `起鍋前放回炒好的主配料與起司粉翻勻，盛入深盤中，表面撒上九層塔或黑胡椒即可享用。`
    ];
  }

  // 5. Rice Dish
  if (displayName.includes("飯") || displayName.includes("炊飯")) {
    return [
      `將 ${lead} 各自切好；起司準備妥當。漢堡排或豬排先煎好或烤熟備餐。`,
      `平底鍋中火下油，炒香蒜末與配菜，隨後加入蒸熟的香米飯或奶油飯，以中火快速翻炒均勻。`,
      `倒入調配好的 ${sauces} 翻炒，使飯粒充分吸收醬汁，若做焗烤飯則平鋪在烤模上撒滿起司，以 200°C 烤 8 分鐘至金黃。`,
      `將飯盛裝，擺上主角（如漢堡排加太陽蛋、厚切豬排或生蛋黃），即可搭配生菜趁熱享用。`
    ];
  }

  // 6. Fries
  if (displayName.includes("薯條")) {
    return [
      `將馬鈴薯切成條狀（或使用優質冷凍細薯），徹底用廚房紙巾吸乾表面水分；準備好 ${sauces}。`,
      `炸油加熱至 175°C，將薯條分批下鍋油炸約 5 分鐘，直到表面呈現誘人的金黃色且外殼酥脆後撈出，用吸油紙充分瀝乾。`,
      `趁熱將薯條倒入大盆中，均勻撒上海鹽調味，接著加入 ${sauces}（如松露醬、金沙醬或起司醬）輕輕拋拌均勻。`,
      `將薯條高高堆疊在鋪有防油紙的竹籃中，撒上少許巴西里碎，搭配剩餘沾醬即可趁熱享用。`
    ];
  }

  // 7. Quesadilla
  if (displayName.includes("酥餅")) {
    return [
      `將 ${lead}（如雞肉、香腸）與洋蔥切成小丁；起司備妥，麥餅皮回溫。`,
      `熱鍋下油，將主蛋白與洋蔥丁中火炒熟，加入少許鹽與胡椒調味後起鍋；將麥餅皮平鋪，在半邊鋪上起司與炒好的配料。`,
      `將餅皮對折呈半月形，放入無油平底鍋中，以中小火雙面各乾煎約 2-3 分鐘，煎至餅皮酥脆呈斑駁金黃、內餡起司完全融化。`,
      `將酥餅切成三角塊，整齊排入盤中，搭配 ${sauces}（如酪梨醬、莎莎醬或酸奶油）盛盤享用。`
    ];
  }

  // 8. Fried Appetizers
  if (displayName.includes("雞翅") || displayName.includes("炸魚") || displayName.includes("酥炸") || displayName.includes("拼盤") || displayName.includes("炸雞")) {
    return [
      `將 ${lead} 洗淨吸乾水分，以鹽、胡椒及部分香料醃製 10 分鐘，沾裹上一層薄薄的酥炸粉。`,
      `熱油鍋至 180°C，將裹好粉的食材分批放入油鍋中，炸至表面定型、呈金黃酥脆（雞翅與雞肉約需 5-6 分鐘，魷魚約 1.5 分鐘），撈起瀝油。`,
      `另用小鍋將 ${sauces}（如黑咖哩醬、水牛城辣醬）微溫加熱。如果是雞翅，可放入大碗中與辣醬快速拋拌均勻，讓醬汁完全裹覆。`,
      `盤中鋪上吸油紙，擺上炸物，旁邊附上檸檬角與沾醬，完成大份量的美式名店拼盤。`
    ];
  }

  // 9. Yogurt Bowl
  if (displayName.includes("優格碗") || displayName.includes("巴西莓")) {
    return [
      `將新鮮水果（如香蕉、芒果、莓果）洗淨並切成漂亮的片狀或丁狀；準備好燕麥堅果。`,
      `在洗淨的深玻璃碗中，倒入質地濃郁的優格（如果是巴西莓果碗，先混合莓果粉調出漂亮的紫色優格底）。`,
      `將切好的水果片依序整齊地排在優格表面，旁邊分區鋪上酥脆的穀物燕麥與原味堅果碎。`,
      `最後淋上 ${sauces} 點綴，維持亮眼且高顏值的健康早午餐擺盤。`
    ];
  }

  // 10. Salad
  if (displayName.includes("沙拉") || displayName.includes("佛陀碗")) {
    return [
      `將生菜充分洗淨，放入脫水器中徹底瀝乾水分，切成適口大小；將 ${lead} 各自切好分裝。`,
      `熱平底鍋將蛋白質（如舒肥雞胸、培根或鮮蝦）煎至雙面焦香熟透，或是準備好鹽水雞、燻鮭魚；麵包丁烤脆。`,
      `在大沙拉碗中放入生菜，倒入 2/3 份量的 ${sauces}（如凱薩醬或胡麻醬）輕快拋拌，讓每片生菜都沾上薄薄一層醬汁。`,
      `拌好的生菜裝入大盛盤中，表面鋪上準備好的蛋白質主料、番茄與麵包丁，最後均勻撒上帕瑪森起司粉與堅果即成。`
    ];
  }

  // 11. Burger & Sandwich
  if (displayName.includes("漢堡") || displayName.includes("三明治") || displayName.includes("Open")) {
    return [
      `將漢堡麵包或丹麥麵包切面抹奶油，以平底鍋煎至焦黃微脆；將生菜、洋蔥片及 ${lead} 準備齊全。`,
      `主肉排（如牛肉排、雙層排或藍帶豬排）以平底鍋中火煎至兩面金黃熟透，起鍋前放起司片蓋鍋悶 30 秒至微融。`,
      `在麵包內側抹上 ${sauces}，依序疊放生菜、番茄、主肉排與煎蛋，保持漢堡或開放三明治的飽滿層次。`,
      `蓋上上層麵包（或開放擺盤），附上烤好的薯條，盛盤趁熱享用。`
    ];
  }

  // 12. Big Plate
  if (displayName.includes("半雞") || displayName.includes("豬腳") || displayName.includes("拼盤")) {
    return [
      `將主肉（半雞或德國豬腳）洗淨擦乾，以海鹽、胡椒及香料醃漬 20 分鐘；將烤箱預熱至 200°C。`,
      `平底鍋大火下油，將半雞或豬腳外皮煎至金黃鎖住肉汁，移入烤箱以 190°C 烘烤約 30 分鐘，至外皮脆、內部熟透多汁。`,
      `烘烤的最後 5 分鐘，均勻刷上 ${sauces}（如 BBQ 醬或蜂蜜芥末醬），並將配菜（如烤玉米、薯條、酸菜）同步烤熱。`,
      `肉品出爐後靜置 5 分鐘切件，與配菜分區盛裝在大盛盤上上桌。`
    ];
  }

  // 13. Dessert
  if (categorySlug === "dessert" || displayName.includes("蛋糕") || displayName.includes("派") || displayName.includes("布朗尼")) {
    return [
      `將奶油起司或巧克力等主料回溫；烤箱預熱至 180°C，將模具準備妥當。`,
      `攪拌盆中混合無鹽奶油、細砂糖、蛋液與麵粉（若是蜜桃派則鋪入派皮與肉桂蜜桃餡），倒入模具中。`,
      `放入烤箱中烘烤約 25-30 分鐘，至蛋糕或布朗尼表面定型但中心仍保持微濕潤（起司蛋糕需水浴法烘烤），出爐後放涼。`,
      `盛盤時，搭配香草冰淇淋球或打發鮮奶油，淋上溫熱的 ${sauces}，即可享用經典的冷熱雙重口感。`
    ];
  }

  // 14. Default
  return [
    `將 ${lead} 依餐廳比例分區備妥；${sauces} 調味試吃，生菜或冷配料保持乾爽。`,
    `主食材（如肉品、海鮮、麵飯）先煎炒或烘烤至最美味的熟度，起鍋前放起司或大火收汁。`,
    `配菜與麵包依需要加熱或乾煎至酥脆，維持貳樓名店擺盤的豐富質地。`,
    `組盤時淋上或拌入特製醬汁，完成 ${displayName}。`
  ];
}
