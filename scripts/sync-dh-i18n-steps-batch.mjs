#!/usr/bin/env node
/**
 * Sync en/ja/ko steps for 12 dh recipes to match zh; set updatedAt 2026-07-06.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const UPDATED = "2026-07-06";

const SLUGS = [
  "dh-golden-chicken-stone-pot-rice",
  "dh-original-korean-fried-chicken",
  "dh-spicy-korean-fried-chicken",
  "dh-honey-garlic-korean-fried-chicken",
  "dh-bbq-korean-fried-chicken",
  "dh-cajun-korean-fried-chicken",
  "dh-creamy-onion-korean-fried-chicken",
  "dh-korean-fried-chicken-combo",
  "dh-korean-bbq-beef-short-ribs",
  "dh-korean-sweet-and-sour-pork",
  "dh-spicy-stired-fried-chicken",
  "dh-stired-fried-fish-fillet-with-vegetables"
];

const FC_BASE = {
  en: [
    "Cut boneless chicken thigh 250 g into bite-size pieces (about 3–4 cm); pat the surface thoroughly dry with paper towels.",
    "Massage with a pinch of salt, a pinch of black pepper powder, and 1 tbsp toasted sesame oil; refrigerate 30 minutes to marinate.",
    "Spread 150 g Korean fried chicken mix in a deep plate; coat each piece evenly, press lightly, and shake off excess flour.",
    "Fill the fryer with enough oil and use a kitchen thermometer to confirm 170°C; fry chicken in batches over medium heat about 7 minutes until set on the outside and cooked through inside (avoid crowding to keep oil temperature steady).",
    "Drain and rest on a wire rack 3–5 minutes so steam escapes from inside.",
    "Raise oil temperature to 185°C; return chicken for a second fry 1.5–2 minutes until golden and crispy, then drain on a wire rack."
  ],
  ja: [
    "鶏もも肉 250gを一口大（約3～4cm）に切り、キッチンペーパーで表面の水分を十分に拭き取る。",
    "塩 少々、コショウ粉 少々、ごま油 大さじ1でもみ込み、冷蔵庫で30分漬け込む。",
    "深めの皿に韓国風唐揚げ粉 150gを広げ、鶏肉を1枚ずつ均一にまぶし軽く押して、余分な粉を払う。",
    "揚げ油を十分に注ぎ、キッチン温度計で170℃を確認。鶏肉は温度が下がらないよう少量ずつ入れ、中火で約7分揚げ、表面が固まり中心まで火が通るまで。",
    "油を切り、網またはラックの上で3～5分休ませ、内部の蒸気を逃がす。",
    "油温を185℃に上げ、再度1.5～2分揚げて黄金色にサクサクにし、網で油を切る。"
  ],
  ko: [
    "닭다리살 250g을 한입 크기(약 3~4cm)로 자르고 키친타월로 표면 수분을 충분히 제거합니다.",
    "소금 약간, 후춧가루 약간, 참기름 1큰술을 넣고 재워 냉장고에서 30분 숙성합니다.",
    "깊은 접시에 치킨 튀김가루 150g을 펴고 닭고기를 한 조각씩 고루 입혀 살짝 누른 뒤 남은 가루를 털어냅니다.",
    "튀김냄비에 기름을 충분히 넣고 키친 온도계로 170°C를 확인합니다. 닭고기는 소량씩 넣어 온도가 떨어지지 않게 하고 중불로 약 7분 튀겨 겉은 잡히고 속까지 익힙니다.",
    "건져 기름을 빼고 철망이나 랙 위에서 3~5분 쉬어 속 김이 빠지게 합니다.",
    "기름 온도를 185°C로 올려 1.5~2분 더 튀겨 황금색으로 바삭하게 만든 뒤 철망에서 기름을 뺍니다."
  ]
};

const FC_SAUTE = {
  en: "In another skillet, heat 1 tbsp toasted sesame oil over low heat; sauté onion ½ pc julienned and scallion 1 stalk cut into segments until fragrant (about 1 minute).",
  ja: "別のフライパンを弱火で熱し、ごま油 大さじ1で玉ねぎ 1/2個の千切りと青ネギ 1本のぶつ切りを約1分炒めて香りを出す。",
  ko: "다른 팬에 참기름 1큰술을 약불로 달군 뒤 양파 1/2개 채 썰기와 대파 1대를 약 1분 볶아 향을 냅니다."
};

const FC_COAT_OFF_HEAT = {
  en: "stir until slightly thickened, turn off heat, quickly toss fried chicken to coat (turning off heat keeps the crust crispy), sprinkle a pinch of sesame seeds, and serve.",
  ja: "少しとろみがついたら火を止め、揚げ鶏を素早く絡める（火を止めたまま操作すると衣が柔らかくなりにくい）。ごま 少々を振って完成。",
  ko: "살짝 걸쭉해지면 불을 끄고 튀긴 닭고기를 빠르게 버무려 양념을 입힙니다(불을 끈 상태에서 하면 바삭함이 유지됩니다). 참깨 약간을 뿌려 냅니다."
};

function fcSauced(sauceLine) {
  return {
    en: [...FC_BASE.en, FC_SAUTE.en, `${sauceLine.en}; ${FC_COAT_OFF_HEAT.en}`],
    ja: [...FC_BASE.ja, FC_SAUTE.ja, `${sauceLine.ja}；${FC_COAT_OFF_HEAT.ja}`],
    ko: [...FC_BASE.ko, FC_SAUTE.ko, `${sauceLine.ko}; ${FC_COAT_OFF_HEAT.ko}`]
  };
}

const STEPS = {
  "dh-original-korean-fried-chicken": {
    en: [
      ...FC_BASE.en,
      "While hot, sprinkle a pinch of sesame seeds and seasoned pepper salt; serve with onion ½ pc julienned and scallion 1 stalk cut into segments plated separately to match the restaurant original fried chicken style."
    ],
    ja: [
      ...FC_BASE.ja,
      "熱いうちにごま 少々と胡椒塩を振り、玉ねぎ 1/2個の千切りと青ネギ 1本のぶつ切りを別添えにして、店舗のオリジナル唐揚げの食べ方に合わせて盛り付ける。"
    ],
    ko: [
      ...FC_BASE.ko,
      "뜨거울 때 참깨 약간과 후추소금을 뿌리고, 양파 1/2개 채 썰기와 대파 1대를 곁들여 따로 담아 매장 오리지널 치킨 스타일로 낸다."
    ]
  },
  "dh-spicy-korean-fried-chicken": fcSauced({
    en: "Add 1.5 tbsp Korean chili paste (gochujang) and 1 tbsp honey",
    ja: "コチュジャン 大さじ1.5とハチミツ 大さじ1を加え、攪拌",
    ko: "고추장 1.5큰술과 꿀 1큰술을 넣고 저어"
  }),
  "dh-honey-garlic-korean-fried-chicken": fcSauced({
    en: "Add 3 tbsp honey garlic glaze",
    ja: "ハニーガーリックソース 大さじ3を加え、攪拌",
    ko: "허니 갈릭 소스 3큰술을 넣고 저어"
  }),
  "dh-bbq-korean-fried-chicken": fcSauced({
    en: "Add 3 tbsp Korean BBQ marinade and 1 tbsp honey",
    ja: "韓国風BBQソース 大さじ3とハチミツ 大さじ1を加え、攪拌",
    ko: "갈비 양념 3큰술과 꿀 1큰술을 넣고 저어"
  }),
  "dh-cajun-korean-fried-chicken": fcSauced({
    en: "Add 3 tbsp honey cajun sauce",
    ja: "ケイジャンソース 大さじ3を加え、攪拌",
    ko: "케이준 소스 3큰술을 넣고 저어"
  }),
  "dh-creamy-onion-korean-fried-chicken": fcSauced({
    en: "Add 3 tbsp creamy onion white sauce",
    ja: "オニオンホワイトソース 大さじ3を加え、攪拌",
    ko: "양파 화이트 소스 3큰술을 넣고 저어"
  }),
  "dh-korean-fried-chicken-combo": {
    en: [
      ...FC_BASE.en,
      "In two skillets, heat ½ tbsp toasted sesame oil each over low heat and sauté julienned onion: in one skillet mix in 1.5 tbsp Korean chili paste (gochujang) and ½ tbsp honey for a spicy sauce; in the other whisk ½ tbsp honey with ½ tbsp toasted sesame oil for a honey glaze; simmer both until slightly thickened, then turn off heat.",
      "Divide fried chicken in half; quickly toss each portion off heat with a different sauce, sprinkle a pinch of sesame seeds, and plate in two sections while hot."
    ],
    ja: [
      ...FC_BASE.ja,
      "フライパン2つにそれぞれごま油 大さじ1/2を弱火で熱し、千切り玉ねぎを炒める。1つにはコチュジャン 大さじ1.5とハチミツ 大さじ1/2を加えて辛味ダレに、もう1つにはハチミツ 大さじ1/2とごま油 大さじ1/2で蜜ダレを作る。両方とも少しとろみがついたら火を止める。",
      "揚げ鶏を半分ずつ分け、火を止めた状態でそれぞれのダレを素早く絡め、ごま 少々を振って2種類に分けて温かいうちに盛る。"
    ],
    ko: [
      ...FC_BASE.ko,
      "팬 2개에 각각 참기름 1/2큰술을 약불로 달군 뒤 양파 채를 볶습니다. 한쪽에는 고추장 1.5큰술과 꿀 1/2큰술을 넣어 매운 소스로, 다른 쪽에는 꿀 1/2큰술과 참기름 1/2큰술로 꿀 소스를 만듭니다. 둘 다 살짝 걸쭉해지면 불을 끕니다.",
      "튀긴 치킨을 반으로 나누어 불을 끈 상태에서 각각 다른 소스에 빠르게 버무리고 참깨 약간을 뿌려 두 가지로 나눠 뜨겁게 낸다."
    ]
  },
  "dh-golden-chicken-stone-pot-rice": {
    en: [
      "Wash uncooked white rice 150 g; soak with broth or water at a 1:1.2 ratio for 20 minutes, then cook until grains are separate and pleasantly chewy; fluff to release steam.",
      "Cut boneless chicken thigh 250 g into small pieces; marinate 10 minutes with 1 tbsp soy sauce and 1 tsp sugar; slice shiitake mushrooms 3 pcs and cut scallion 1 stalk into segments.",
      "Heat a skillet over medium heat with 1 tbsp toasted sesame oil; spread chicken in a single layer and sear until golden on the surface (about 3 minutes); flip and cook 2 more minutes until done; transfer out.",
      "Add a little more oil to the same pan; stir-fry mushroom slices 2 minutes until they release moisture and lightly brown; mix with chicken and set aside.",
      "Brush the stone pot interior evenly with 1 tbsp toasted sesame oil; layer hot rice and press flat; arrange chicken and mushrooms neatly on top; scatter scallion segments.",
      "Heat the stone pot over medium heat 4–6 minutes until you hear sizzling at the bottom and smell toasted rice crust; turn off heat.",
      "Before serving, mix from the outside inward with a spoon; enjoy the crust and toppings while hot."
    ],
    ja: [
      "米 150gを洗い、1:1.2の割合でだし汁または水に20分浸し、粒立ちのよいもちもちご飯に炊く。炊き上がったら軽くほぐして蒸気を逃がす。",
      "鶏もも肉 250gを小さく切り、醤油 大さじ1と砂糖 小さじ1でもみ込み10分漬ける。しいたけ 3枚を薄切り、青ネギ 1本をぶつ切りにしておく。",
      "フライパンを中火に熱し、ごま油 大さじ1で鶏肉を広げて表面がこんがりするまで焼く（約3分）。ひっくり返してさらに2分火を通し、取り出す。",
      "同じフライパンに油を少し足し、しいたけを2分炒めて水分が出て軽く焦げるまで。鶏肉と和えておく。",
      "石鍋の内側にごま油 大さじ1を均一に塗り、熱いご飯を敷き平らに押す。炒めた鶏肉としいたけを整えてのせ、青ネギを散らす。",
      "石鍋を中火で4～6分加熱し、底からパチパチ音がしておこげの香りが立ったら火を止める。",
      "食べる前にスプーンで外側から内側へ混ぜ、おこげと具材を熱いうちにいただく。"
    ],
    ko: [
      "쌀 150g을 씻어 1:1.2 비율로 육수나 물에 20분 불린 뒤 알이 살아 쫄깃한 밥으로 짓고, 완성 후 가볍게 풀어 김이 빠지게 합니다.",
      "닭다리살 250g을 작게 썰어 간장 1큰술, 설탕 1작은술로 10분 재웁니다. 표고버섯 3개를 슬라이스하고 대파 1대를 토막 내 둡니다.",
      "팬에 참기름 1큰술을 중불로 달군 뒤 닭고기를 펼쳐 겉이 노릇해질 때까지 굽습니다(약 3분). 뒤집어 2분 더 익힌 뒤 건져 둡니다.",
      "같은 팬에 기름을 조금 더 넣고 표고버섯을 2분 볶아 물기가 나오고 살짝 갈색이 날 때까지 합니다. 닭고기와 섞어 둡니다.",
      "돌솥 안쪽에 참기름 1큰술을 고르게 바르고 뜨거운 밥을 깔아 평평하게 누릅니다. 볶은 닭고기와 버섯을 정갈하게 올리고 대파를 뿌립니다.",
      "돌솥을 중불로 4~6분 가열해 바닥에서 지글지글 소리가 나고 누룽지 향이 나면 불을 끕니다.",
      "상에 내기 전 숟가락으로 바깥에서 안쪽으로 비벼 누룽지와 토핑을 뜨겁게 즐깁니다."
    ]
  },
  "dh-korean-bbq-beef-short-ribs": {
    en: [
      "Slice flat iron steak 200 g against the grain into sheets about 0.3 cm thick; julienne onion ½ pc and cut scallion 1 stalk into segments.",
      "Mix 3 tbsp Korean BBQ marinade, 1 tbsp toasted sesame oil, and 1 tbsp minced garlic into a marinade; massage beef slices 15–30 minutes (overnight in the fridge for deeper flavor).",
      "Preheat a griddle or cast-iron pan over high heat until faint smoke rises; add 1 tsp toasted sesame oil to coat the pan.",
      "Lay beef slices in a single layer; let sit 2 minutes without moving until char marks form on the bottom, then flip.",
      "After flipping, cook 1.5–2 minutes more; add julienned onion and stir-fry over high heat 1 minute until translucent and sweet.",
      "When beef is cooked, snip into bite-size pieces directly on the griddle with kitchen scissors; scatter scallion segments.",
      "Serve immediately, matching Dubu House tabletop BBQ pacing; pair with rice or lettuce wraps."
    ],
    ja: [
      "羽下肉 200gを繊維に逆らって厚さ約0.3cmの薄切りにし、玉ねぎ 1/2個を千切り、青ネギ 1本をぶつ切りにする。",
      "韓国風BBQソース 大さじ3、ごま油 大さじ1、みじん切りニンニク 大さじ1を混ぜたタレでもみ込み、15～30分漬ける（冷蔵庫で一晩漬けるとより旨い）。",
      "鉄板または鋳鉄フライパンを強火で予熱し、軽く煙が出るまで熱する。ごま油 小さじ1で油を引く。",
      "牛肉を1枚ずつ広げ、2分間動かさずに焼き、底面に焦げ目がついたらひっくり返す。",
      "ひっくり返したらさらに1.5～2分焼き、千切り玉ねぎを加えて強火で1分炒め、透明になって甘みが出るまで。",
      "牛肉に火が通ったら、キッチンバサミで鉄板上で食べやすい大きさに切り、青ネギを散らす。",
      "熱いうちに提供し、涓豆腐の鉄板焼きのペースに合わせる。ご飯やレタス包みと一緒にどうぞ。"
    ],
    ko: [
      "살치살 200g을 결 반대로 약 0.3cm 두께로 얇게 썰고, 양파 1/2개는 채 썰며, 대파 1대는 토막 냅니다.",
      "갈비 양념 3큰술, 참기름 1큰술, 다진 마늘 1큰술을 섞어 양념장을 만든 뒤 소고기를 15~30분 재웁니다(냉장고에서 하룻밤 재우면 더 깊은 맛).",
      "철판이나 무쇠팬을 강불로 예열해 연기가 살짝 날 때까지 달굽니다. 참기름 1작은술로 팬을 코팅합니다.",
      "소고기를 한 겹으로 펼쳐 2분간 움직이지 않고 굽다 바닥에 그을림이 생기면 뒤집습니다.",
      "뒤집은 뒤 1.5~2분 더 굽고, 양파 채를 넣어 강불로 1분 볶아 투명하고 달콤해질 때까지 합니다.",
      "고기가 익으면 키친 가위로 철판 위에서 한입 크기로 잘라 대파를 뿌립니다.",
      "뜨거울 때 바로 내며, 涓豆腐 철판 구이 리듬을 재현합니다. 밥이나 상추쌈과 함께 드세요."
    ]
  },
  "dh-korean-sweet-and-sour-pork": {
    en: [
      "Cut pork hind shank cubes 200 g into about 2 cm pieces; cut carrot 30 g into diamond slices and dice onion ½ pc.",
      "Marinate pork with a pinch of salt and a pinch of black pepper powder for 10 minutes; dredge each piece in all-purpose flour, shake off excess.",
      "Heat fryer oil to 170°C; fry pork in batches about 4–5 minutes until golden and cooked through; drain and rest 2 minutes.",
      "Raise oil to 185°C; second fry 1 minute for a crisper crust; set aside.",
      "In another skillet, leave 1 tbsp oil; sauté onion and carrot over medium heat 1–2 minutes.",
      "Pour in 150 ml Korean sweet and sour sauce; boil over high heat, then simmer over medium-low about 2 minutes until slightly thickened.",
      "Add fried pork and toss quickly to coat; turn off heat and serve hot to match the restaurant sweet-and-sour pork texture."
    ],
    ja: [
      "豚もも肉角切り 200gを約2cm角に切り、にんじん 30gを菱形切り、玉ねぎ 1/2個を角切りにする。",
      "豚肉を塩 少々とコショウ粉 少々でもみ込み10分漬ける。中力粉を適量まぶし、余分な粉を払う。",
      "揚げ油を170℃に熱し、豚肉を少量ずつ4～5分揚げて黄金色に火を通す。油を切り2分休ませる。",
      "油温を185℃に上げ、再度1分揚げて衣をよりサクサクにし、取り出す。",
      "別のフライパンに油 大さじ1を残し、中火で玉ねぎとにんじんを1～2分炒める。",
      "甘酢ダレ 150mlを加え、強火で煮立てたら中弱火で約2分とろみがつくまで煮る。",
      "揚げ豚肉を加えて素早く絡め、火を止めて熱いうちに盛り、店舗の酢豚の食感に近づける。"
    ],
    ko: [
      "돼지 뒷다리살 200g을 약 2cm 크기로 썰고, 당근 30g은 마름모로, 양파 1/2개는 깍둑썰기합니다.",
      "돼지고기에 소금 약간, 후춧가루 약간을 넣고 10분 재웁니다. 중력분을 적당히 묻혀 남은 가루를 털어냅니다.",
      "튀김 기름을 170°C로 달군 뒤 돼지고기를 소량씩 4~5분 튀겨 황금색으로 익힙니다. 건져 2분 쉽니다.",
      "기름 온도를 185°C로 올려 1분 더 튀겨 겉을 더 바삭하게 한 뒤 꺼냅니다.",
      "다른 팬에 기름 1큰술을 남기고 중불로 양파와 당근을 1~2분 볶습니다.",
      "탕수육 소스 150ml을 넣고 강불로 끓인 뒤 중약불로 약 2분 졸여 살짝 걸쭉하게 합니다.",
      "튀긴 돼지고기를 넣어 빠르게 버무린 뒤 불을 끄고 뜨겁게 내며, 매장 탕수육 식감을 재현합니다."
    ]
  },
  "dh-spicy-stired-fried-chicken": {
    en: [
      "Cut boneless chicken thigh 250 g into about 3 cm chunks; julienne onion ½ pc and cut scallion 1 stalk into segments.",
      "Marinate chicken with 1.5 tbsp Chuncheon spicy stir-fry sauce and 1 tbsp minced garlic for 20 minutes (reserve the remaining sauce for later).",
      "Heat a heavy skillet or cast-iron pan over high heat with 1 tbsp toasted sesame oil; spread marinated chicken and sear until the surface changes color (about 3 minutes).",
      "Add julienned onion and stir-fry 1 minute; pour in the remaining 1.5 tbsp Chuncheon spicy stir-fry sauce and 2–3 tbsp water; cover and simmer over medium heat 5 minutes.",
      "Uncover, raise heat to high, and reduce, stirring constantly until the sauce thickens and coats the chicken.",
      "Add scallion segments and a pinch of sesame seeds; toss briefly and serve hot."
    ],
    ja: [
      "鶏もも肉 250gを約3cm角に切り、玉ねぎ 1/2個を千切り、青ネギ 1本をぶつ切りにする。",
      "鶏肉にタッカルビソース 大さじ1.5とみじん切りニンニク 大さじ1でもみ込み20分漬ける（残りのソースは後で使う）。",
      "厚手のフライパンまたは鋳鉄鍋を強火で熱し、ごま油 大さじ1で漬けた鶏肉を広げ、表面の色が変わるまで焼く（約3分）。",
      "千切り玉ねぎを加えて1分炒め、残りのタッカルビソース 大さじ1.5と水 大さじ2～3を加え、蓋をして中火で5分煮る。",
      "蓋を外し強火に上げ、ソースがとろみを帯びて鶏肉に絡むまで絶えず炒める。",
      "青ネギとごま 少々を加え、さっと和えて熱いうちに盛る。"
    ],
    ko: [
      "닭다리살 250g을 약 3cm 크기로 썰고, 양파 1/2개는 채 썰며, 대파 1대는 토막 냅니다.",
      "닭고기에 닭갈비 소스 1.5큰술, 다진 마늘 1큰술을 넣고 20분 재웁니다(남은 소스는 나중에 씁니다).",
      "두꺼운 팬이나 무쇠팬을 강불로 달군 뒤 참기름 1큰술에 재운 닭고기를 펼쳐 겉색이 변할 때까지 굽습니다(약 3분).",
      "양파 채를 넣어 1분 볶고, 남은 닭갈비 소스 1.5큰술과 물 2~3큰술을 넣어 뚜껑을 덮고 중불로 5분 끓입니다.",
      "뚜껑을 열고 강불로 올려 소스가 걸쭉해져 닭고기에 묻을 때까지 계속 볶습니다.",
      "대파와 참깨 약간을 넣어 살짝 버무린 뒤 뜨겁게 낸다."
    ]
  },
  "dh-stired-fried-fish-fillet-with-vegetables": {
    en: [
      "Pat mahi-mahi fillet 180 g dry with paper towels; slice carrot 30 g thinly and julienne onion ½ pc.",
      "Lightly salt the fish with a pinch of salt for 10 minutes; drain excess moisture.",
      "Heat a skillet over medium heat with 1 tbsp toasted sesame oil; pan-fry fish on one side 2 minutes until golden, flip and cook 2 minutes more; set aside.",
      "In the same pan, stir-fry julienned onion 1 minute until translucent; add carrot slices and stir 1 minute.",
      "Add 1 tbsp soy sauce, 1 tsp sugar, and 3 tbsp water; boil over high heat, then simmer over medium-low 1–2 minutes until slightly thickened.",
      "Gently return fish to the pan; spoon sauce over the fillets and swirl the pan off heat to coat (avoid flipping hard so the fish does not break apart).",
      "Transfer to a plate and serve hot to match the restaurant glazed fish flavor."
    ],
    ja: [
      "シイラフィレ 180gの水分をキッチンペーパーで拭き取る。にんじん 30gを薄切り、玉ねぎ 1/2個を千切りにする。",
      "魚に塩 少々を振り10分軽く漬け、水分を切る。",
      "フライパンを中火に熱し、ごま油 大さじ1で魚を片面2分焼いてこんがりさせ、ひっくり返してさらに2分焼き、取り出す。",
      "同じフライパンで千切り玉ねぎを1分炒めて透明にし、にんじんを加えて1分炒める。",
      "醤油 大さじ1、砂糖 小さじ1、水 大さじ3を加え、強火で煮立てたら中弱火で1～2分とろみがつくまで煮る。",
      "魚をそっと戻し、タレをかけながら火を止めて鍋を軽く振り絡める（強く返さず形を崩さない）。",
      "皿に盛り、熱いうちに提供し、店舗の醤焼き魚の風味に近づける。"
    ],
    ko: [
      "만새기 필레 180g의 수분을 키친타월로 닦습니다. 당근 30g은 얇게 썰고, 양파 1/2개는 채 썹니다.",
      "생선에 소금 약간을 뿌려 10분 가볍게 절인 뒤 물기를 뺍니다.",
      "팬에 참기름 1큰술을 중불로 달군 뒤 생선을 한 면 2분 굽다 노릇해지면 뒤집어 2분 더 굽고 꺼냅니다.",
      "같은 팬에 양파 채를 1분 볶아 투명해지게 하고 당근을 넣어 1분 볶습니다.",
      "간장 1큰술, 설탕 1작은술, 물 3큰술을 넣고 강불로 끓인 뒤 중약불로 1~2분 졸여 살짝 걸쭉하게 합니다.",
      "생선을 살짝 다시 넣고 소스를 끼얹으며 불을 끈 뒤 팬을 가볍게 흔들어 양념을 입힙니다(세게 뒤집지 않아 형태가 흐트러지지 않게).",
      "접시에 담아 뜨겁게 내며, 매장 양념 구이 생선 맛을 재현합니다."
    ]
  }
};

const PINCH_FIXES = {
  en: [
    [/(- name: (?:salt|black pepper powder|sesame seeds))\n  amount: "0\.25"\n  unit: pinch/g, "$1\n  amount: pinch\n  unit: \"\""]
  ],
  ja: [
    [/(- name: (?:塩|コショウ粉|ごま))\n  amount: "0\.25"\n  unit: 少々/g, "$1\n  amount: 少々\n  unit: \"\""]
  ],
  ko: [
    [/(- name: (?:소금|후춧가루|참깨))\n  amount: "0\.25"\n  unit: 약간/g, "$1\n  amount: 약간\n  unit: \"\""]
  ]
};

const localeDirs = {
  en: "src/content/recipes-en",
  ja: "src/content/recipes-ja",
  ko: "src/content/recipes-ko"
};

function yamlStep(step, locale) {
  const needsQuote =
    /^[\p{L}\p{N}_]+:\s/u.test(step) ||
    (locale === "en" && (/[:#"'&]|^\d/.test(step) || step.includes("：")));
  if (needsQuote) {
    return `- "${step.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return `- ${step}`;
}

function splitMarkdown(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("Invalid frontmatter");
  return { fm: match[1], body: match[2] };
}

function replaceStepsBlock(fm, steps, locale) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "steps:");
  if (start < 0) throw new Error("Missing steps:");
  let end = start + 1;
  while (end < lines.length && (lines[end].startsWith("- ") || lines[end].startsWith('- "'))) end++;
  const block = ["steps:", ...steps.map((s) => yamlStep(s, locale))];
  return [...lines.slice(0, start), ...block, ...lines.slice(end)].join("\n");
}

function fixPinchSeasonings(fm, locale) {
  let next = fm;
  for (const [pattern, replacement] of PINCH_FIXES[locale]) {
    next = next.replace(pattern, replacement);
  }
  return next;
}

const updatedFiles = [];

for (const slug of SLUGS) {
  for (const locale of ["en", "ja", "ko"]) {
    const path = join(ROOT, localeDirs[locale], `${slug}.md`);
    const raw = readFileSync(path, "utf8");
    const { fm, body } = splitMarkdown(raw);
    let nextFm = replaceStepsBlock(fm, STEPS[slug][locale], locale);
    nextFm = fixPinchSeasonings(nextFm, locale);
    nextFm = nextFm.replace(/^updatedAt:.*$/m, `updatedAt: "${UPDATED}"`);
    const trimmedBody = body.trimStart();
    writeFileSync(path, `---\n${nextFm}\n---\n\n${trimmedBody}`, "utf8");
    updatedFiles.push(path);
  }
}

console.log(`Updated ${updatedFiles.length} files:`);
for (const f of updatedFiles) console.log(f);
