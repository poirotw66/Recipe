import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const slugs = [
  "air-fryer-garlic-pork-chop", "air-fryer-garlic-shrimp", "air-fryer-salmon-broccoli",
  "airfryer-garlic-chicken-broccoli", "airfryer-tofu-mushroom-main", "air-fryer-crispy-tofu-cubes",
  "air-fryer-garlic-mushrooms", "air-fryer-garlic-okra", "air-fryer-butter-corn",
  "air-fryer-honey-sweet-potato", "air-fryer-lemon-fish-fillet", "air-fryer-soy-chicken-wings",
  "budget-tofu-rice-bowl", "budget-simple-egg-fried-rice", "budget-cabbage-noodle-soup",
  "bento-ginger-chicken", "bento-honey-soy-pork", "bento-stir-fried-cabbage",
  "high-protein-chicken-broccoli-bowl", "high-protein-shrimp-tofu-bowl", "high-protein-tofu-steak-plate",
  "weight-loss-zucchini-chicken", "weight-loss-shrimp-veg-salad", "solo-sesame-chicken-rice",
  "solo-ginger-pork-rice", "canned-tuna-rice-bowl", "clearout-veggie-egg-fried-rice",
  "garlic-mushroom-chicken", "broccoli-mushroom-chicken-rice-bowl", "tomato-beef-rice-bowl"
];

const localeDirs = { zh: "recipes", en: "recipes-en", ja: "recipes-ja", ko: "recipes-ko" };
const isAir = (slug) => slug.startsWith("air-fryer") || slug.startsWith("airfryer");
const isRice = (slug) => /rice|bowl|bento|noodle|fried-rice/.test(slug);
const isSoup = (slug) => slug.includes("soup");
const isProtein = (slug) => /chicken|pork|beef|shrimp|salmon|tuna|steak|wings|fish/.test(slug);

const copy = {
  zh: {
    airTip: "食材表面先擦乾並單層鋪放，籃內留出熱風循環空間，成品才會均勻上色。",
    proteinTip: "肉類起鍋後先靜置 2～3 分鐘再切，肉汁較不易流失；厚度不同時以最厚處熟度為準。",
    riceTip: "冷飯或煮好的麵條下鍋前先攤開散熱，能減少結塊並讓醬汁更均勻附著。",
    soupTip: "湯品最後再調鹽，因為水分收濃後鹹度會上升，較容易掌握味道。",
    vegTip: "蔬菜下鍋前盡量瀝乾，避免鍋內水分過多而變成燜煮，口感會更清脆。",
    airQ: "食材厚度不同時要怎麼調整氣炸時間？",
    airA: "先以食譜時間完成，再從最厚處確認熟度；較厚的部位可每次增加 2～3 分鐘，避免一次加太久。",
    proteinQ: "如何避免主食材變乾？",
    proteinA: "依厚度調整火候，起鍋後靜置再切；若要保存，完全放涼後密封冷藏並用較低溫回熱。",
    riceQ: "可以提前準備嗎？",
    riceA: "可以，煮好的主食與配料分開冷藏，食用前再加熱拌合，口感與風味會比混合後久放更好。",
    soupQ: "湯品可以隔夜嗎？",
    soupA: "可以，放涼後盡快密封冷藏，隔天充分加熱；葉菜類建議食用前再加入。",
    vegQ: "蔬菜出水時怎麼辦？",
    vegA: "先把食材表面水分瀝乾，並分批下鍋保留鍋面溫度，就能減少出水與軟爛。"
  },
  en: {
    airTip: "Pat ingredients dry and arrange them in a single layer with room for airflow so they brown evenly.",
    proteinTip: "Rest meat for 2–3 minutes before slicing; when pieces vary in thickness, check the thickest center for doneness.",
    riceTip: "Spread chilled rice or cooked noodles before cooking so they separate instead of clumping and take on sauce evenly.",
    soupTip: "Season soup at the end because reducing the liquid concentrates salt and makes the final balance easier to control.",
    vegTip: "Drain vegetables well before cooking; excess water steams them and softens the texture.",
    airQ: "How should I adjust the air-frying time for different thicknesses?",
    airA: "Start with the stated time and check the thickest piece. Add 2–3 minutes at a time rather than extending the cook in one large jump.",
    proteinQ: "How do I keep the main ingredient from drying out?",
    proteinA: "Adjust the heat for thickness, rest before slicing, and reheat chilled portions gently after cooling them completely.",
    riceQ: "Can I prepare this ahead of time?",
    riceA: "Yes. Refrigerate the cooked starch and toppings separately, then reheat and combine just before serving for better texture.",
    soupQ: "Can I keep the soup overnight?",
    soupA: "Yes. Cool it promptly, refrigerate it sealed, and reheat thoroughly the next day; add leafy greens just before serving.",
    vegQ: "What should I do if the vegetables release water?",
    vegA: "Drain them well and cook in batches so the pan stays hot instead of turning the vegetables soft and watery."
  },
  ja: {
    airTip: "食材の表面を拭いてから一段に並べ、熱風の通り道を空けると均一に焼き色がつきます。",
    proteinTip: "肉は焼き上がってから2～3分休ませて切ります。厚みが違う場合は最も厚い部分で火通りを確認します。",
    riceTip: "冷やご飯やゆで麺は広げてから加熱すると、固まりにくく調味料も均一になじみます。",
    soupTip: "汁が煮詰まると塩味が強くなるため、塩は最後に味を見て加えます。",
    vegTip: "野菜の水気をよく切ってから炒めると、蒸れにくく歯ごたえが残ります。",
    airQ: "厚みが違う食材の加熱時間はどう調整しますか？",
    airA: "表示時間で一度確認し、最も厚い部分の火通りを見ます。必要なら2～3分ずつ追加してください。",
    proteinQ: "主材料をパサつかせないコツは？",
    proteinA: "厚みに合わせて火加減を調整し、焼き上がりを休ませてから切ります。保存分は低めの温度で温め直します。",
    riceQ: "作り置きできますか？",
    riceA: "できます。主食と具材を分けて冷蔵し、食べる直前に温めて合わせると食感を保てます。",
    soupQ: "スープは翌日も食べられますか？",
    soupA: "粗熱を早く取り、密閉して冷蔵してください。翌日は十分に温め、葉物は食べる直前に加えます。",
    vegQ: "野菜から水が出るときは？",
    vegA: "水気を切って少量ずつ炒め、フライパンの温度を保つと水っぽくなりにくいです。"
  },
  ko: {
    airTip: "재료 표면의 물기를 닦고 한 겹으로 놓아 열풍이 지나갈 공간을 만들면 고르게 노릇해집니다.",
    proteinTip: "고기는 조리 후 2~3분 쉬었다가 자르고, 두께가 다르면 가장 두꺼운 부분의 익힘을 확인하세요.",
    riceTip: "찬밥이나 삶은 면은 조리 전에 펼쳐 두면 뭉치지 않고 양념이 고르게 배어듭니다.",
    soupTip: "국물은 졸아들면 더 짜질 수 있으므로 소금은 마지막에 간을 보고 넣으세요.",
    vegTip: "채소의 물기를 충분히 빼고 볶아야 수분이 많이 생기지 않고 식감이 살아납니다.",
    airQ: "재료 두께가 다르면 조리 시간을 어떻게 조절하나요?",
    airA: "표시된 시간에 먼저 확인하고 가장 두꺼운 부분의 익힘을 봅니다. 필요하면 2~3분씩 추가하세요.",
    proteinQ: "주재료가 퍽퍽해지지 않게 하는 법은?",
    proteinA: "두께에 맞춰 불을 조절하고 조리 후 잠시 쉬었다가 자르세요. 남은 음식은 낮은 온도로 부드럽게 데웁니다.",
    riceQ: "미리 만들어 둘 수 있나요?",
    riceA: "가능합니다. 밥이나 면과 속재료를 따로 냉장한 뒤 먹기 직전에 데워 섞으면 식감이 좋습니다.",
    soupQ: "국을 다음 날 먹어도 되나요?",
    soupA: "가능합니다. 빠르게 식혀 밀폐 냉장하고 다음 날 충분히 데우세요. 잎채소는 먹기 직전에 넣습니다.",
    vegQ: "채소에서 물이 많이 나오면 어떻게 하나요?",
    vegA: "물기를 빼고 나누어 볶아 팬의 온도를 유지하면 물이 생기고 흐물해지는 것을 줄일 수 있습니다."
  }
};

function addBlock(raw, key, lines) {
  const marker = `${key}:\n`;
  const at = raw.indexOf(marker);
  if (at < 0) throw new Error(`Missing ${key}`);
  const start = at + marker.length;
  const next = raw.slice(start).search(/^[a-zA-Z_][a-zA-Z0-9_]*:/m);
  if (next < 0) throw new Error(`Missing next section after ${key}`);
  const insertAt = start + next;
  return `${raw.slice(0, insertAt)}${lines.map((x) => `- ${x}`).join("\n")}\n${raw.slice(insertAt)}`;
}

for (const slug of slugs) {
  for (const [locale, dir] of Object.entries(localeDirs)) {
    const path = join(root, "src/content", dir, `${slug}.md`);
    let raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
    const c = copy[locale];
    const tip = isAir(slug) ? c.airTip : isProtein(slug) ? c.proteinTip : isSoup(slug) ? c.soupTip : isRice(slug) ? c.riceTip : c.vegTip;
    const question = isAir(slug) ? c.airQ : isProtein(slug) ? c.proteinQ : isSoup(slug) ? c.soupQ : isRice(slug) ? c.riceQ : c.vegQ;
    const answer = isAir(slug) ? c.airA : isProtein(slug) ? c.proteinA : isSoup(slug) ? c.soupA : isRice(slug) ? c.riceA : c.vegA;
    if (!raw.includes(`- ${tip}`)) raw = addBlock(raw, "tips", [tip]);
    const faqLine = `- question: "${question}"\n  answer: "${answer}"\n`;
    // Remove a previous misplaced insertion, then append inside the faqs list.
    raw = raw.replace(faqLine, "");
    let faqStart = raw.indexOf("faqs:\n");
    if (faqStart < 0) {
      const fallback = raw.indexOf("relatedIngredients:") >= 0 ? raw.indexOf("relatedIngredients:") : raw.indexOf("featured:");
      if (fallback < 0) throw new Error(`Missing insertion point for faqs: ${locale}/${slug}`);
      raw = `${raw.slice(0, fallback)}faqs:\n${faqLine}${raw.slice(fallback)}`;
      raw = raw.replace(/^faqs:\n([\s\S]*?)relatedIngredients:/m, (_m, body) => `faqs:\n${body.replace(faqLine, "")}relatedIngredients:`);
      faqStart = raw.indexOf("faqs:\n");
    }
    if (raw.indexOf("faqs:\n") < 0) throw new Error(`Missing faqs: ${locale}/${slug}`);
    const faqBodyStart = faqStart + "faqs:\n".length;
    const nextSection = raw.slice(faqBodyStart).search(/^[a-zA-Z_][a-zA-Z0-9_]*:/m);
    if (nextSection < 0) throw new Error(`Missing next section after faqs: ${locale}/${slug}`);
    const faqAt = faqBodyStart + nextSection;
    raw = `${raw.slice(0, faqAt)}${faqLine}${raw.slice(faqAt)}`;
    raw = raw.replace(/^updatedAt:.*$/m, 'updatedAt: "2026-07-30"');
    writeFileSync(path, raw, "utf8");
  }
}
console.log(`Supplemented ${slugs.length} recipes across ${Object.keys(localeDirs).length} locales.`);
