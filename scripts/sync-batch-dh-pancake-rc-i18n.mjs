#!/usr/bin/env node
/**
 * Sync en/ja/ko steps for 12 DH pancake / rice-cake / noodle slugs to match zh.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const UPDATED = "2026-07-06";

const SLUGS = [
  "dh-vegetable-pancake",
  "dh-seafood-pancake",
  "dh-kimchi-tofu-pancake",
  "dh-potato-pancake-with-cheese",
  "dh-brown-sugar-pancake",
  "dh-royal-stir-fried-rice-cake",
  "dh-spicy-pan-fried-seafood-rice-cake",
  "dh-spicy-pan-fried-squid",
  "dh-cheese-pink-sauce-fried-squid-with-rice-cake",
  "dh-truffle-jjajang-cheese-rice-cake",
  "dh-plant-based-fried-chicken-with-rice-cake",
  "dh-fried-glass-noodle"
];

const STEPS = {
  "dh-vegetable-pancake": {
    en: [
      "Prep: Peel loofah 150 g and cut into fine shreds; toss with a pinch of salt, rest 5 minutes, then squeeze out moisture. Cut carrot 30 g into fine shreds; slice onion ½ thinly.",
      "In a large bowl, mix all-purpose flour 150 g, egg 1, salt pinch, and cold water 120 ml into a slightly thick, lump-free batter; rest 10 minutes so the flour hydrates.",
      "Fold the vegetables into the batter and gently mix until evenly coated (do not over-stir or the batter will thin from released moisture).",
      "Preheat a 26 cm skillet over medium heat for 2 minutes; add toasted sesame oil 1 Tbsp and swirl to coat. When ripples appear in the oil, the pan is hot enough.",
      "Pour in all the batter and spread from the center outward with a spatula into a round pancake about 20 cm across. Pan-fry over medium heat 3–4 minutes until the bottom is golden and set and the edges lift slightly.",
      "Carefully flip with a wide spatula and cook 3 minutes more; press lightly with the spatula so the center cooks through. When both sides are golden and crisp, transfer to a board.",
      "Cut into pieces and serve hot with soy-vinegar dipping sauce or Korean dipping sauce."
    ],
    ja: [
      "下準備：ヘチマ 150gの皮をむき細切りにし、塩を少々もみ込んで5分置き、水気をしぼる。にんじん 30gを細切り、玉ねぎ 1/2個を薄切りにする。",
      "大きめのボウルに中力粉 150g、卵 1個、塩 少々、冷水 120mlを混ぜ、粉粒のないやや濃い生地にする。10分置いて粉に水分を含ませる。",
      "切った野菜を生地に加え、軽く混ぜて全体にまんべんなく絡める（混ぜすぎると水分が出て薄くなるので注意）。",
      "26cmのフライパンを中火で2分予熱し、ごま油 大さじ1を入れて鍋面に回す。油に波紋が出たら十分な温度。",
      "生地をすべて流し込み、ヘラで中心から外へ広げ、直径約20cmの円形にする。中火で3～4分、底面がきつね色に固まり縁が少し浮いたら。",
      "大きめのヘラで裏返し、さらに3分焼く。途中で軽く押さえて中心まで火を通す。両面がきつね色でカリッとしたら取り出す。",
      "まな板で切り分け、醤油酢のつけダレや韓国風つけダレを添えて温かいうちに。"
    ],
    ko: [
      "준비: 수세미오이 150g 껍질을 벗기고 가늘게 채 썰어 소금을 조금 넣고 5분 재운 뒤 물기를 짭니다. 당근 30g은 가늘게 채 썰고, 양파 1/2개는 얇게 썹니다.",
      "큰 볼에 중력분 150g, 달걀 1개, 소금 약간, 찬물 120ml를 섞어 덩어리 없는 살짝 걸쭉한 반죽을 만듭니다. 10분 두어 밀가루가 수분을 흡수하게 합니다.",
      "썬 채소를 반죽에 넣고 가볍게 섞어 고루 묻힙니다(과하게 저으면 물이 나와 반죽이 묽어집니다).",
      "26cm 프라이팬을 중불로 2분 예열한 뒤 참기름 1큰술을 넣어 골고루 돌립니다. 기름에 잔물결이 생기면 충분히 달궈진 것입니다.",
      "반죽을 모두 부어 뒤집개로 가운데에서 바깥으로 펴 직경 약 20cm 원형 전을 만듭니다. 중불로 3~4분 굽어 바닥이 노릇하게 익고 가장자리가 살짝 들뜰 때까지 합니다.",
      "큰 뒤집개로 조심히 뒤집어 3분 더 굽습니다. 가운데까지 익도록 가볍게 눌러 줍니다. 양면이 노릇하고 바삭하면 꺼냅니다.",
      "도마에서 잘라 간장식초 찍어먹는 소스나 한식 찍어먹는 소스와 함께 뜨거울 때 낸다."
    ]
  },
  "dh-seafood-pancake": {
    en: [
      "Prep: Clean squid 150 g, remove innards, and cut into rings; peel shrimp 6, leave tails on, and devein; cut scallion 1 into thin segments. Pat seafood dry with paper towels.",
      "In a large bowl, mix all-purpose flour 150 g, egg 1, salt pinch, and cold water 120 ml into a slightly thick, lump-free batter; rest 10 minutes so the flour hydrates.",
      "Fold seafood and scallion into the batter and gently mix until evenly coated (seafood must be well drained so the batter does not thin).",
      "Preheat a 26 cm skillet over medium heat for 2 minutes; add toasted sesame oil 1 Tbsp and swirl to coat. When ripples appear in the oil, the pan is hot enough.",
      "Pour in all the batter and spread from the center outward with a spatula into a round pancake. Pan-fry over medium heat 3–4 minutes until the bottom is golden and set and the edges lift slightly.",
      "Carefully flip and cook 3 minutes more; press lightly so the center cooks through. When shrimp turn pink and squid curl, doneness is right—both sides golden and crisp, then remove.",
      "Cut into pieces and serve hot with soy-vinegar dipping sauce or Korean dipping sauce."
    ],
    ja: [
      "下準備：イカ 150gの内臓を取り洗い輪切りに、エビ 6尾は殻をむき尾を残して背ワタを取る。長ねぎ 1本を細切りにする。海鮮はキッチンペーパーで水気を拭く。",
      "大きめのボウルに中力粉 150g、卵 1個、塩 少々、冷水 120mlを混ぜ、粉粒のないやや濃い生地にする。10分置いて粉に水分を含ませる。",
      "海鮮と長ねぎを生地に加え、軽く混ぜて全体にまんべんなく絡める（海鮮はよく水切りし、生地が薄くならないように）。",
      "26cmのフライパンを中火で2分予熱し、ごま油 大さじ1を入れて鍋面に回す。油に波紋が出たら十分な温度。",
      "生地をすべて流し込み、ヘラで中心から外へ広げて円形にする。中火で3～4分、底面がきつね色に固まり縁が少し浮いたら。",
      "裏返し、さらに3分焼く。軽く押さえて中心まで火を通す。エビがピンク色、イカが丸まれば火が通った目安。両面きつね色でカリッとしたら取り出す。",
      "切り分け、醤油酢のつけダレや韓国風つけダレを添えて温かいうちに。"
    ],
    ko: [
      "준비: 오징어 150g 내장을 제거하고 씻어 링으로 썰고, 새우 6마리는 껍질을 벗기고 꼬리는 남긴 뒤 내장을 뺍니다. 대파 1대를 가늘게 썹니다. 해산물은 키친타월로 표면 수분을 닦습니다.",
      "큰 볼에 중력분 150g, 달걀 1개, 소금 약간, 찬물 120ml를 섞어 덩어리 없는 살짝 걸쭉한 반죽을 만듭니다. 10분 두어 밀가루가 수분을 흡수하게 합니다.",
      "해산물과 대파를 반죽에 넣고 가볍게 섞어 고루 묻힙니다(해산물은 반드시 잘 말려 반죽이 묽어지지 않게 합니다).",
      "26cm 프라이팬을 중불로 2분 예열한 뒤 참기름 1큰술을 넣어 골고루 돌립니다. 기름에 잔물결이 생기면 충분히 달궈진 것입니다.",
      "반죽을 모두 부어 뒤집개로 가운데에서 바깥으로 펴 원형 전을 만듭니다. 중불로 3~4분 굽어 바닥이 노릇하게 익고 가장자리가 살짝 들뜰 때까지 합니다.",
      "조심히 뒤집어 3분 더 굽습니다. 가운데까지 익도록 가볍게 누릅니다. 새우가 분홍색이 되고 오징어가 말리면 익은 것입니다. 양면이 노릇하고 바삭하면 꺼냅니다.",
      "잘라 간장식초 찍어먹는 소스나 한식 찍어먹는 소스와 함께 뜨거울 때 낸다."
    ]
  },
  "dh-kimchi-tofu-pancake": {
    en: [
      "Prep: Squeeze excess brine from kimchi 100 g and cut into small pieces; wrap soft tofu 1 pack in paper towels and press 5 minutes to remove moisture, then crumble by hand; cut scallion 1 into thin segments.",
      "In a large bowl, mix all-purpose flour 150 g, egg 1, salt pinch, and cold water 120 ml into a slightly thick, lump-free batter; rest 10 minutes so the flour hydrates.",
      "Fold kimchi, crumbled tofu, and scallion into the batter and gently mix until even (kimchi is already drained to keep the batter from thinning).",
      "Preheat a 26 cm skillet over medium heat for 2 minutes; add toasted sesame oil 1 Tbsp and swirl to coat. When ripples appear in the oil, the pan is hot enough.",
      "Pour in all the batter and spread from the center outward with a spatula into a round pancake. Pan-fry over medium heat 3–4 minutes until the bottom is golden and set and the edges lift slightly.",
      "Carefully flip and cook 3 minutes more; press lightly so the center cooks through. When both sides are golden and crisp, remove from the pan.",
      "Cut into pieces and serve hot with soy-vinegar dipping sauce or Korean dipping sauce."
    ],
    ja: [
      "下準備：キムチ 100gの汁気を軽くしぼり細切りに、絹ごし豆腐 1丁をキッチンペーパーで包み5分押して水気を取り、手で崩す。長ねぎ 1本を細切りにする。",
      "大きめのボウルに中力粉 150g、卵 1個、塩 少々、冷水 120mlを混ぜ、粉粒のないやや濃い生地にする。10分置いて粉に水分を含ませる。",
      "キムチ、豆腐の崩し身、長ねぎを生地に加え、軽く混ぜて均一に（キムチは水気をしぼっておき、生地が薄くならないように）。",
      "26cmのフライパンを中火で2分予熱し、ごま油 大さじ1を入れて鍋面に回す。油に波紋が出たら十分な温度。",
      "生地をすべて流し込み、ヘラで中心から外へ広げて円形にする。中火で3～4分、底面がきつね色に固まり縁が少し浮いたら。",
      "裏返し、さらに3分焼く。軽く押さえて中心まで火を通す。両面がきつね色でカリッとしたら取り出す。",
      "切り分け、醤油酢のつけダレや韓国風つけダレを添えて温かいうちに。"
    ],
    ko: [
      "준비: 김치 100g의 국물을 살짝 짜고 잘게 썰고, 순두부 1모는 키친타월로 싸 5분 눌러 물기를 뺀 뒤 손으로 부숩니다. 대파 1대를 가늘게 썹니다.",
      "큰 볼에 중력분 150g, 달걀 1개, 소금 약간, 찬물 120ml를 섞어 덩어리 없는 살짝 걸쭉한 반죽을 만듭니다. 10분 두어 밀가루가 수분을 흡수하게 합니다.",
      "김치, 부순 두부, 대파를 반죽에 넣고 가볍게 섞어 고루 묻힙니다(김치는 물기를 짜 두어 반죽이 묽어지지 않게 합니다).",
      "26cm 프라이팬을 중불로 2분 예열한 뒤 참기름 1큰술을 넣어 골고루 돌립니다. 기름에 잔물결이 생기면 충분히 달궈진 것입니다.",
      "반죽을 모두 부어 뒤집개로 가운데에서 바깥으로 펴 원형 전을 만듭니다. 중불로 3~4분 굽어 바닥이 노릇하게 익고 가장자리가 살짝 들뜰 때까지 합니다.",
      "조심히 뒤집어 3분 더 굽습니다. 가운데까지 익도록 가볍게 누릅니다. 양면이 노릇하고 바삭하면 꺼냅니다.",
      "잘라 간장식초 찍어먹는 소스나 한식 찍어먹는 소스와 함께 뜨거울 때 낸다."
    ]
  },
  "dh-potato-pancake-with-cheese": {
    en: [
      "Prep: Peel potatoes 2 and cut into fine shreds; soak 5 minutes to remove starch, then drain. Have ham dice 50 g, sausage dice 50 g, corn kernels 30 g, and bell pepper dice 30 g ready.",
      "In a large bowl, mix all-purpose flour 150 g, egg 1, salt pinch, and cold water 120 ml into a slightly thick, lump-free batter; rest 10 minutes so the flour hydrates.",
      "Fold potato shreds and all add-ins into the batter and gently mix until evenly coated (potato shreds must be well drained to avoid thinning the batter).",
      "Preheat a 26 cm skillet over medium heat for 2 minutes; add toasted sesame oil 1 Tbsp and swirl to coat. When ripples appear in the oil, the pan is hot enough.",
      "Pour in all the batter and spread into a round pancake with a spatula. Pan-fry over medium heat 3–4 minutes until the bottom is golden and set; then evenly sprinkle mozzarella shreds 60 g on top.",
      "Carefully flip and cook 3 minutes more; press lightly so the center cooks through and the cheese is half melted. When both sides are golden and crisp, remove from the pan.",
      "Cut into pieces and serve hot with soy-vinegar dipping sauce or Korean dipping sauce—the cheese pull is best while hot."
    ],
    ja: [
      "下準備：じゃがいも 2個の皮をむき細切りにし、5分水にさらしてでんぷんを抜き水切りする。ハムダイス 50g、ソーセージダイス 50g、コーン 30g、パプリカダイス 30gを用意。",
      "大きめのボウルに中力粉 150g、卵 1個、塩 少々、冷水 120mlを混ぜ、粉粒のないやや濃い生地にする。10分置いて粉に水分を含ませる。",
      "じゃがいもと具材をすべて生地に加え、軽く混ぜて全体にまんべんなく絡める（じゃがいもはよく水切りし、出水を防ぐ）。",
      "26cmのフライパンを中火で2分予熱し、ごま油 大さじ1を入れて鍋面に回す。油に波紋が出たら十分な温度。",
      "生地をすべて流し込み、ヘラで円形に広げ、中火で3～4分、底面がきつね色に固まったら、モッツァレラチーズ 60gを均等に振る。",
      "裏返し、さらに3分焼く。軽く押さえて中心まで火を通し、チーズが半分溶けるまで。両面きつね色でカリッとしたら取り出す。",
      "切り分け、醤油酢のつけダレや韓国風つけダレを添えて温かいうちに。チーズの伸びが一番よい。"
    ],
    ko: [
      "준비: 감자 2개 껍질을 벗기고 가늘게 채 썰어 5분 담가 전분을 빼고 건집니다. 햄 다이스 50g, 소시지 다이스 50g, 옥수수 30g, 파프리카 다이스 30g을 준비합니다.",
      "큰 볼에 중력분 150g, 달걀 1개, 소금 약간, 찬물 120ml를 섞어 덩어리 없는 살짝 걸쭉한 반죽을 만듭니다. 10분 두어 밀가루가 수분을 흡수하게 합니다.",
      "감자 채와 모든 재료를 반죽에 넣고 가볍게 섞어 고루 묻힙니다(감자 채는 반드시 잘 말려 물이 나오지 않게 합니다).",
      "26cm 프라이팬을 중불로 2분 예열한 뒤 참기름 1큰술을 넣어 골고루 돌립니다. 기름에 잔물결이 생기면 충분히 달궈진 것입니다.",
      "반죽을 모두 부어 뒤집개로 원형으로 펴 중불로 3~4분 굽어 바닥이 노릇하게 익으면 모짜렐라 치즈 60g을 고르게 뿌립니다.",
      "조심히 뒤집어 3분 더 굽습니다. 가운데까지 익고 치즈가 반쯤 녹도록 가볍게 누릅니다. 양면이 노릇하고 바삭하면 꺼냅니다.",
      "잘라 간장식초 찍어먹는 소스나 한식 찍어먹는 소스와 함께 뜨거울 때 낸다. 치즈 늘어남이 가장 좋다."
    ]
  },
  "dh-brown-sugar-pancake": {
    en: [
      "Filling: Mix brown sugar powder 50 g with cinnamon powder ½ tsp and mixed nut crumbles 20 g until even; divide into 4 equal portions and set aside.",
      "In a large bowl, combine all-purpose flour 150 g and salt pinch; slowly add warm water 100 ml and knead into a smooth, non-sticky dough. Cover and rest 15 minutes.",
      "Divide the rested dough into 4 equal pieces. Flatten each into a round, wrap 1 portion of brown sugar filling, pinch the seam tightly closed (to prevent bursting while frying), then gently press into a pancake about 1 cm thick.",
      "Preheat a 26 cm skillet over medium-low heat for 2 minutes; spread unsalted butter 20 g in a thin layer across the pan. The pan should be hot but not smoking.",
      "Place the filled rounds in the pan with space between them. Pan-fry 3 minutes until the bottom is golden and slightly puffed; press lightly with a spatula for even heating.",
      "Carefully flip and cook 3 minutes more until both sides are golden and the pancake puffs slightly. Turn off heat, cover, and steam 1 minute so the filling melts into a thick syrup.",
      "Cut open and enjoy while hot—watch for molten brown sugar. Best texture is crisp outside and chewy inside."
    ],
    ja: [
      "餡：黒糖粉 50gにシナモン粉 小さじ1/2、ミックスナッツの粗みじん切り 20gを混ぜ均一にし、4等分しておく。",
      "大きめのボウルに中力粉 150gと塩 少々を入れ、ぬるま湯 100mlを少しずつ加えて滑らかで手に付かない生地にこね、ラップをして15分休ませる。",
      "休ませた生地を4等分し、それぞれを平らに伸ばして黒糖餡を1分ずつ包み、口をしっかり閉じる（揚げるときに破裂しないよう）。厚さ約1cmの円形に軽く押す。",
      "26cmのフライパンを弱めの中火で2分予熱し、無塩バター 20gを薄く鍋面に塗る。煙が出ない程度に熱い状態に。",
      "生地を間隔を空けて並べ、3分焼き底面がきつね色で少し膨らんだら、ヘラで軽く押して均一に加熱する。",
      "裏返し、さらに3分両面きつね色で少し膨らむまで。火を止め蓋をして1分蒸らし、黒糖餡をとろみのあるシロップ状にする。",
      "温かいうちに切って食べる。黒糖がとろけるのでやけどに注意。外はカリッ、中はもちっとした食感が一番よい。"
    ],
    ko: [
      "속: 흑설탕가루 50g에 계피가루 1/2작은술, 견과류 다진 것 20g을 섞어 고르게 한 뒤 4등분해 둡니다.",
      "큰 볼에 중력분 150g과 소금 약간을 넣고 미지근한 물 100ml를 조금씩 넣어 매끈하고 손에 달라붙지 않는 반죽을 치대고 랩을 씌워 15분 휴지합니다.",
      "휴지한 반죽을 4등분해 각각 둥글게 펴 흑설탕 속 1분을 넣고 입구를 꼼꼼히 막은 뒤(튀길 때 터지지 않게) 두께 약 1cm 원형으로 가볍게 누릅니다.",
      "26cm 프라이팬을 중약불로 2분 예열한 뒤 무염 버터 20g을 얇게 바릅니다. 연기가 나지 않을 정도로 달궈집니다.",
      "반죽을 간격을 두고 넣고 3분 굽어 바닥이 노릇하고 살짝 부풀면 뒤집개로 가볍게 눌러 고르게 가열합니다.",
      "조심히 뒤집어 3분 더 양면이 노릇하고 살짝 부풀 때까지 굽습니다. 불을 끄고 뚜껑을 덮어 1분 더 두어 속이 걸쭉한 시럽이 되게 합니다.",
      "뜨거울 때 잘라 먹습니다. 흑설탕이 터질 수 있으니 주의하세요. 겉은 바삭하고 속은 쫄깃할 때가 가장 좋습니다."
    ]
  },
  "dh-royal-stir-fried-rice-cake": {
    en: [
      "Prep: If Korean rice cake sticks 150 g are firm from the fridge, soak in warm water 10 minutes until slightly soft, then drain. Bring beef slices 120 g to room temperature; shred onion ½, carrot 30 g, and rehydrated wood ear mushroom 30 g.",
      "In a small bowl, mix soy sauce 1 Tbsp, toasted sesame oil 1 Tbsp, sugar 1 tsp, and minced garlic 1 Tbsp into a stir-fry sauce; set aside.",
      "Preheat a skillet over medium heat with 1 Tbsp oil; add beef and stir-fry over high heat 1–2 minutes until the surface changes color; remove and set aside.",
      "In the same pan, add onion, carrot, and wood ear mushroom; stir-fry over medium heat 2 minutes until vegetables soften slightly and release aroma.",
      "Return beef to the pan, add drained rice cakes and the prepared sauce, and stir-fry over high heat 1 minute until the rice cakes are evenly coated.",
      "Pour in broth or water 100 ml, cover, and simmer over medium heat 5 minutes, stirring every 1–2 minutes to prevent sticking.",
      "Uncover and reduce over high heat 1–2 minutes until the sauce is thick and clings to the rice cakes. Top with sesame seeds or scallions and serve hot."
    ],
    ja: [
      "下準備：韓国餅 150gが冷蔵で硬い場合はぬるま湯に10分浸し、やや柔らかくなったら水切り。牛肉薄切り 120gは室温に戻す。玉ねぎ 1/2個を千切り、にんじん 30gを千切り、きくらげ 30gを戻して千切りに。",
      "小鉢に醤油 大さじ1、ごま油 大さじ1、砂糖 小さじ1、にんにくみじん切り 大さじ1を混ぜ炒めダレを作る。",
      "フライパンを中火で熱し、油 大さじ1を入れ、牛肉を強火で1～2分、表面の色が変わるまで炒め、取り出す。",
      "同じ鍋に玉ねぎ、にんじん、きくらげを加え、中火で2分、野菜がやや柔らかく香りが出るまで炒める。",
      "牛肉を戻し、水切りした餅と炒めダレを加え、強火で1分、餅に均一に絡める。",
      "だしまたは水 100mlを加え、蓋をして中火で5分煮る。1～2分ごとに混ぜ、くっつかないようにする。",
      "蓋を外し強火で1～2分汁気を飛ばし、タレが餅に絡むとろみに。ごまやネギを振って温かいうちに。"
    ],
    ko: [
      "준비: 떡볶이 떡 150g이 냉장으로 딱딱하면 미지근한 물에 10분 담가 살짝 부드럽게 한 뒤 건집니다. 소고기 슬라이스 120g은 실온에 둡니다. 양파 1/2개는 채 썰고, 당근 30g은 채 썰며, 목이버섯 30g은 불려 채 썹니다.",
      "작은 그릇에 간장 1큰술, 참기름 1큰술, 설탕 1작은술, 다진 마늘 1큰술을 섞어 볶음 소스를 만듭니다.",
      "프라이팬을 중불로 달군 뒤 기름 1큰술을 넣고 소고기를 강불로 1~2분 볶아 겉색이 변하면 건져 둡니다.",
      "같은 팬에 양파, 당근, 목이버섯을 넣고 중불로 2분 볶아 채소가 살짝 부드러워지고 향이 날 때까지 합니다.",
      "소고기를 다시 넣고 건진 떡과 소스를 넣어 강불로 1분 볶아 떡에 고루 묻힙니다.",
      "육수나 물 100ml를 넣고 뚜껑을 덮어 중불로 5분 끓입니다. 1~2분마다 저어 눌어붙지 않게 합니다.",
      "뚜껑을 열고 강불로 1~2분 졸여 소스가 떡에 걸쭉하게 묻을 때까지 합니다. 참깨나 파를 뿌려 뜨거울 때 낸다."
    ]
  },
  "dh-spicy-pan-fried-seafood-rice-cake": {
    en: [
      "Prep: If Korean rice cake sticks 150 g are firm from the fridge, soak in warm water 10 minutes until slightly soft, then drain. Clean squid 150 g, remove innards, and cut into rings; peel shrimp 6, leave tails on; purge and rinse clams 200 g; shred onion ½.",
      "In a small bowl, mix gochujang 1.5 Tbsp, gochugaru 1 Tbsp, sugar 1 tsp, and minced garlic 1 Tbsp into a spicy stir-fry sauce; set aside.",
      "Preheat a skillet over medium heat with 1 Tbsp oil; stir-fry onion and minced garlic 1 Tbsp 1 minute until translucent and fragrant.",
      "Add squid, shrimp, and clams; stir-fry over high heat 2 minutes until shrimp turn pink and clams open (discard any that stay closed).",
      "Add drained rice cakes and the prepared spicy sauce; stir-fry over high heat 1 minute until the rice cakes are evenly coated.",
      "Pour in broth or water 100 ml, cover, and simmer over medium heat 5 minutes, stirring to prevent sticking so the rice cakes absorb the sauce.",
      "Uncover and reduce over high heat 1–2 minutes until the sauce is thick and clings to the rice cakes and seafood. Top with sesame seeds or scallions and serve hot."
    ],
    ja: [
      "下準備：韓国餅 150gが冷蔵で硬い場合はぬるま湯に10分浸し、やや柔らかくなったら水切り。イカ 150gの内臓を取り輪切り、エビ 6尾は殻をむき尾を残す。アサリ 200gは砂抜きして洗う。玉ねぎ 1/2個を千切りに。",
      "小鉢にコチュジャン 大さじ1.5、唐辛子粉 大さじ1、砂糖 小さじ1、にんにくみじん切り 大さじ1を混ぜ辣炒めダレを作る。",
      "フライパンを中火で熱し、油 大さじ1で玉ねぎとにんにくみじん切り 大さじ1を1分炒め、透明に香りが出るまで。",
      "イカ、エビ、アサリを加え、強火で2分、エビがピンク色、アサリが開いたら（開かないものは除く）。",
      "水切りした餅と辣炒めダレを加え、強火で1分、餅に均一に絡める。",
      "だしまたは水 100mlを加え、蓋をして中火で5分煮る。混ぜながらくっつかないようにし、餅に汁を吸わせる。",
      "蓋を外し強火で1～2分汁気を飛ばし、タレが餅と海鮮に絡むとろみに。ごまやネギを振って温かいうちに。"
    ],
    ko: [
      "준비: 떡볶이 떡 150g이 냉장으로 딱딱하면 미지근한 물에 10분 담가 살짝 부드럽게 한 뒤 건집니다. 오징어 150g 내장을 제거하고 링으로 썰고, 새우 6마리는 껍질을 벗기고 꼬리는 남깁니다. 조개 200g은 토사하고 씻습니다. 양파 1/2개는 채 썹니다.",
      "작은 그릇에 고추장 1.5큰술, 고춧가루 1큰술, 설탕 1작은술, 다진 마늘 1큰술을 섞어 매운 볶음 소스를 만듭니다.",
      "프라이팬을 중불로 달군 뒤 기름 1큰술에 양파와 다진 마늘 1큰술을 1분 볶아 투명하고 향이 날 때까지 합니다.",
      "오징어, 새우, 조개를 넣고 강불로 2분 볶아 새우가 분홍색이 되고 조개가 벌어지면 됩니다(안 벌어진 것은 버립니다).",
      "건진 떡과 매운 소스를 넣고 강불로 1분 볶아 떡에 고루 묻힙니다.",
      "육수나 물 100ml를 넣고 뚜껑을 덮어 중불로 5분 끓이며 저어 눌어붙지 않게 하고 떡이 소스를 흡수하게 합니다.",
      "뚜껑을 열고 강불로 1~2분 졸여 소스가 떡과 해산물에 걸쭉하게 묻을 때까지 합니다. 참깨나 파를 뿌려 뜨거울 때 낸다."
    ]
  },
  "dh-spicy-pan-fried-squid": {
    en: [
      "Prep: Clean squid 150 g, remove innards and cartilage, rinse, and cut into rings or score; shred onion ½; cut scallion 1 into segments. Pat squid dry with paper towels.",
      "In a small bowl, mix gochujang 1.5 Tbsp, gochugaru 1 Tbsp, sugar 1 tsp, minced garlic 1 Tbsp, and water 2 Tbsp into a spicy stir-fry sauce; set aside.",
      "Bring a pot of water to a boil; blanch squid 30 seconds until curled and opaque, then drain immediately (shortens later stir-fry time and prevents toughness).",
      "Preheat a skillet over medium heat with 1 Tbsp oil; stir-fry minced garlic and onion 1–2 minutes until translucent and fragrant.",
      "Add drained squid and stir-fry over high heat 1 minute; pour in the prepared spicy sauce and keep stir-frying 1–2 minutes until evenly coated.",
      "Reduce over medium-high heat 1 minute until the sauce is thick, glossy, and clings to the squid.",
      "Taste and adjust heat level; finish with sesame seeds and scallions and serve hot."
    ],
    ja: [
      "下準備：イカ 150gの内臓と軟骨を取り洗い、輪切りまたは花刀に。玉ねぎ 1/2個を千切り、長ねぎ 1本を切る。イカはキッチンペーパーで水気を拭く。",
      "小鉢にコチュジャン 大さじ1.5、唐辛子粉 大さじ1、砂糖 小さじ1、にんにくみじん切り 大さじ1、水 大さじ2を混ぜ辣炒めダレを作る。",
      "湯鍋の湯を沸かし、イカを30秒湯通しして丸まり色が変わったらすぐ水切り（後の炒め時間を短くし、硬くなりすぎないため）。",
      "フライパンを中火で熱し、油 大さじ1でにんにくと玉ねぎを1～2分炒め、透明に香りが出るまで。",
      "水切りしたイカを加え、強火で1分炒める。辣炒めダレを入れ、さらに1～2分均一に絡める。",
      "中強火で1分汁気を飛ばし、タレがとろみを帯びイカにしっかり付くまで。",
      "味を見て辛さを調整し、ごまと長ねぎを振って温かいうちに。"
    ],
    ko: [
      "준비: 오징어 150g의 내장과 연골을 제거하고 씻어 링으로 썰거나 칼집을 냅니다. 양파 1/2개는 채 썰고, 대파 1대는 토막 냅니다. 오징어는 키친타월로 물기를 닦습니다.",
      "작은 그릇에 고추장 1.5큰술, 고춧가루 1큰술, 설탕 1작은술, 다진 마늘 1큰술, 물 2큰술을 섞어 매운 볶음 소스를 만듭니다.",
      "냄비에 물을 끓여 오징어를 30초 데쳐 말리고 색이 변하면 바로 건집니다(이후 볶는 시간을 줄이고 질기지 않게 합니다).",
      "프라이팬을 중불로 달군 뒤 기름 1큰술에 다진 마늘과 양파를 1~2분 볶아 투명하고 향이 날 때까지 합니다.",
      "건진 오징어를 넣고 강불로 1분 볶습니다. 매운 소스를 부어 1~2분 더 고루 묻힙니다.",
      "중강불로 1분 졸여 소스가 걸쭉하고 윤기 있게 오징어에 밀착할 때까지 합니다.",
      "간을 맞춰 매운맛을 조절하고 참깨와 대파를 뿌려 뜨거울 때 낸다."
    ]
  },
  "dh-cheese-pink-sauce-fried-squid-with-rice-cake": {
    en: [
      "Prep: If Korean rice cake sticks 150 g are firm from the fridge, soak in warm water 10 minutes until slightly soft, then drain. Clean squid 150 g, remove innards, and cut into rings; shred onion ½. Pat squid dry with paper towels.",
      "Preheat a skillet over medium heat with 1 Tbsp oil; stir-fry onion 2 minutes until slightly soft and translucent.",
      "Add squid and stir-fry over high heat 1–2 minutes until curled and opaque; remove squid and onion and set aside (prevents overcooking and toughness).",
      "In the same pan, add drained rice cakes, rose sauce 150 ml, minced garlic 1 Tbsp, and mozzarella shreds 60 g; stir-fry over medium heat 1 minute until the rice cakes are coated.",
      "Pour in broth or water 100 ml, cover, and simmer over medium heat 5 minutes, stirring to prevent sticking.",
      "Uncover, return squid and onion, and reduce over high heat 1–2 minutes until the sauce is thick, rosy, and clings to everything.",
      "Before serving, toss in another mozzarella shreds 60 g until melted and stretchy; top with sesame seeds or scallions and serve hot."
    ],
    ja: [
      "下準備：韓国餅 150gが冷蔵で硬い場合はぬるま湯に10分浸し、やや柔らかくなったら水切り。イカ 150gの内臓を取り輪切り、玉ねぎ 1/2個を千切り。イカはキッチンペーパーで水気を拭く。",
      "フライパンを中火で熱し、油 大さじ1で玉ねぎを2分炒め、やや柔らかく透明になるまで。",
      "イカを加え、強火で1～2分、丸まり色が変わったらイカと玉ねぎを取り出しておく（加熱しすぎて硬くならないよう）。",
      "同じ鍋に水切りした餅、ローズソース 150ml、にんにくみじん切り 大さじ1、モッツァレラチーズ 60gを加え、中火で1分、餅に絡める。",
      "だしまたは水 100mlを加え、蓋をして中火で5分煮る。混ぜながらくっつかないようにする。",
      "蓋を外し、イカと玉ねぎを戻して強火で1～2分汁気を飛ばし、タレがローズ色でとろみを帯び具材に絡むまで。",
      "仕上げにモッツァレラチーズ 60gを加え溶けて伸びるまで混ぜ、ごまやネギを振って温かいうちに。"
    ],
    ko: [
      "준비: 떡볶이 떡 150g이 냉장으로 딱딱하면 미지근한 물에 10분 담가 살짝 부드럽게 한 뒤 건집니다. 오징어 150g 내장을 제거하고 링으로 썰고, 양파 1/2개는 채 썹니다. 오징어는 키친타월로 물기를 닦습니다.",
      "프라이팬을 중불로 달군 뒤 기름 1큰술에 양파를 2분 볶아 살짝 부드럽고 투명해질 때까지 합니다.",
      "오징어를 넣고 강불로 1~2분 볶아 말리고 색이 변하면 오징어와 양파를 건져 둡니다(과하게 익어 질기지 않게).",
      "같은 팬에 건진 떡, 로제 소스 150ml, 다진 마늘 1큰술, 모짜렐라 치즈 60g을 넣고 중불로 1분 볶아 떡에 묻힙니다.",
      "육수나 물 100ml를 넣고 뚜껑을 덮어 중불로 5분 끓이며 저어 눌어붙지 않게 합니다.",
      "뚜껑을 열고 오징어와 양파를 다시 넣어 강불로 1~2분 졸여 소스가 로제색으로 걸쭉하게 재료에 묻을 때까지 합니다.",
      "마무리로 모짜렐라 치즈 60g을 더 넣어 녹고 늘어날 때까지 버무리고 참깨나 파를 뿌려 뜨거울 때 낸다."
    ]
  },
  "dh-truffle-jjajang-cheese-rice-cake": {
    en: [
      "Prep: If cheese rice cakes 80 g are firm from the fridge, soak in warm water 10 minutes until slightly soft, then drain; shred onion ½.",
      "In a small bowl, mix Korean black jjajang paste 2 Tbsp, cheddar cheese sauce 2 Tbsp, truffle sauce 1 tsp, minced garlic 1 Tbsp, and water 2 Tbsp into a truffle jjajang sauce; set aside.",
      "Preheat a skillet over medium heat with 1 Tbsp oil; stir-fry onion 2 minutes until translucent and fragrant.",
      "Add drained cheese rice cakes and stir-fry over high heat 1 minute until lightly colored on the surface.",
      "Pour in the prepared truffle jjajang sauce and keep stir-frying 1 minute until each rice cake is evenly coated.",
      "Pour in broth or water 100 ml, cover, and simmer over medium heat 5 minutes, stirring to prevent sticking so the rice cakes absorb the sauce.",
      "Uncover and reduce over high heat 1–2 minutes until the sauce is thick and clings to the rice cakes. Before serving, stir in another cheddar cheese sauce 2 Tbsp until melted and stretchy; top with sesame seeds or scallions and serve hot."
    ],
    ja: [
      "下準備：チーズ餅 80gが冷蔵で硬い場合はぬるま湯に10分浸し、やや柔らかくなったら水切り。玉ねぎ 1/2個を千切りに。",
      "小鉢に韓国黒ジャージャン 大さじ2、チェダーチーズソース 大さじ2、トリュフソース 小さじ1、にんにくみじん切り 大さじ1、水 大さじ2を混ぜ松露ジャージャンダレを作る。",
      "フライパンを中火で熱し、油 大さじ1で玉ねぎを2分炒め、透明に香りが出るまで。",
      "水切りしたチーズ餅を加え、強火で1分、表面が少し色づくまで炒める。",
      "松露ジャージャンダレを入れ、さらに1分、餅全体に均一に絡める。",
      "だしまたは水 100mlを加え、蓋をして中火で5分煮る。混ぜながらくっつかないようにし、餅に汁を吸わせる。",
      "蓋を外し強火で1～2分汁気を飛ばし、タレが餅に絡むとろみに。仕上げにチェダーチーズソース 大さじ2を加え溶けて伸びるまで混ぜ、ごまやネギを振って温かいうちに。"
    ],
    ko: [
      "준비: 치즈 떡 80g이 냉장으로 딱딱하면 미지근한 물에 10분 담가 살짝 부드럽게 한 뒤 건집니다. 양파 1/2개는 채 썹니다.",
      "작은 그릇에 한국식 검은 짜장 2큰술, 체다 치즈 소스 2큰술, 트러플 소스 1작은술, 다진 마늘 1큰술, 물 2큰술을 섞어 트러플 짜장 소스를 만듭니다.",
      "프라이팬을 중불로 달군 뒤 기름 1큰술에 양파를 2분 볶아 투명하고 향이 날 때까지 합니다.",
      "건진 치즈 떡을 넣고 강불로 1분 볶아 겉이 살짝 색이 날 때까지 합니다.",
      "만든 트러플 짜장 소스를 넣고 1분 더 볶아 떡마다 고루 묻힙니다.",
      "육수나 물 100ml를 넣고 뚜껑을 덮어 중불로 5분 끓이며 저어 눌어붙지 않게 하고 떡이 소스를 흡수하게 합니다.",
      "뚜껑을 열고 강불로 1~2분 졸여 소스가 떡에 걸쭉하게 묻을 때까지 합니다. 마무리로 체다 치즈 소스 2큰술을 더 넣어 녹고 늘어날 때까지 버무리고 참깨나 파를 뿌려 뜨거울 때 낸다."
    ]
  },
  "dh-plant-based-fried-chicken-with-rice-cake": {
    en: [
      "Prep: If Korean rice cake sticks 150 g are firm from the fridge, soak in warm water 10 minutes until slightly soft, then drain. Bring plant-based chicken bites 150 g to room temperature; shred onion ½.",
      "In a small bowl, mix gochujang 1.5 Tbsp, honey 1 Tbsp, minced garlic 1 Tbsp, sesame seeds pinch, and water 2 Tbsp into a sweet-spicy sauce; set aside.",
      "Preheat a skillet over medium heat with 1 Tbsp oil; stir-fry onion 1 minute until translucent and fragrant.",
      "Add plant-based chicken bites and stir-fry over high heat 2–3 minutes until golden and lightly crisp on the surface (adjust time per package directions).",
      "Add drained rice cakes and the prepared sweet-spicy sauce; stir-fry over high heat 1 minute until the rice cakes are evenly coated.",
      "Pour in broth or water 100 ml, cover, and simmer over medium heat 5 minutes, stirring to prevent sticking.",
      "Uncover and reduce over high heat 1–2 minutes until the sauce is thick and clings to the rice cakes and chicken. Top with sesame seeds or scallions and serve hot."
    ],
    ja: [
      "下準備：韓国餅 150gが冷蔵で硬い場合はぬるま湯に10分浸し、やや柔らかくなったら水切り。植物性チキン 150gは室温に戻す。玉ねぎ 1/2個を千切りに。",
      "小鉢にコチュジャン 大さじ1.5、はちみつ 大さじ1、にんにくみじん切り 大さじ1、ごま 少々、水 大さじ2を混ぜ甘辛ダレを作る。",
      "フライパンを中火で熱し、油 大さじ1で玉ねぎを1分炒め、透明に香りが出るまで。",
      "植物性チキンを加え、強火で2～3分、表面がきつね色で軽くカリッとするまで炒める（表示の調理時間に合わせる）。",
      "水切りした餅と甘辛ダレを加え、強火で1分、餅に均一に絡める。",
      "だしまたは水 100mlを加え、蓋をして中火で5分煮る。混ぜながらくっつかないようにする。",
      "蓋を外し強火で1～2分汁気を飛ばし、タレが餅とチキンに絡むとろみに。ごまやネギを振って温かいうちに。"
    ],
    ko: [
      "준비: 떡볶이 떡 150g이 냉장으로 딱딱하면 미지근한 물에 10분 담가 살짝 부드럽게 한 뒤 건집니다. 식물성 치킨 150g은 실온에 둡니다. 양파 1/2개는 채 썹니다.",
      "작은 그릇에 고추장 1.5큰술, 꿀 1큰술, 다진 마늘 1큰술, 참깨 약간, 물 2큰술을 섞어 달콤매운 소스를 만듭니다.",
      "프라이팬을 중불로 달군 뒤 기름 1큰술에 양파를 1분 볶아 투명하고 향이 날 때까지 합니다.",
      "식물성 치킨을 넣고 강불로 2~3분 볶아 겉이 노릇하고 살짝 바삭해질 때까지 합니다(포장 표시 시간에 맞춤).",
      "건진 떡과 달콤매운 소스를 넣고 강불로 1분 볶아 떡에 고루 묻힙니다.",
      "육수나 물 100ml를 넣고 뚜껑을 덮어 중불로 5분 끓이며 저어 눌어붙지 않게 합니다.",
      "뚜껑을 열고 강불로 1~2분 졸여 소스가 떡과 치킨에 걸쭉하게 묻을 때까지 합니다. 참깨나 파를 뿌려 뜨거울 때 낸다."
    ]
  },
  "dh-fried-glass-noodle": {
    en: [
      "Prep: Soak Korean glass noodles 100 g in cold water 20 minutes until soft, then drain; shred carrot 30 g, cut spinach 50 g into segments, shred onion ½, and shred rehydrated wood ear mushroom 30 g. Marinate shredded meat with soy sauce and minced garlic 10 minutes.",
      "Bring a pot of water to a rolling boil; blanch soaked glass noodles 2 minutes until translucent, then immediately rinse with cold water, drain, and cut into about 4-inch lengths.",
      "In a small bowl, mix soy sauce 1 Tbsp, toasted sesame oil 1 Tbsp, sugar 1 tsp, and minced garlic 1 Tbsp into a stir-fry sauce; set aside.",
      "Preheat a skillet over medium heat with toasted sesame oil 1 Tbsp; stir-fry onion and carrot 2 minutes until slightly softened and fragrant.",
      "Add marinated meat and stir-fry over high heat 1–2 minutes until the color changes; add spinach and wood ear mushroom and stir-fry 1 minute.",
      "Add drained glass noodles and the prepared sauce; stir-fry over medium heat 2–3 minutes until the noodles are evenly colored and seasoned without clumping.",
      "Taste and adjust salt and sweetness; finish with sesame seeds and serve hot."
    ],
    ja: [
      "下準備：韓国春雨 100gを冷水に20分浸して柔らかくし水切り。にんじん 30gを千切り、ほうれん草 50gを切る、玉ねぎ 1/2個を千切り、きくらげ 30gを戻して千切りに。肉糸は醤油とにんにくで10分もみ込む。",
      "湯鍋にたっぷりの湯を強火で沸かし、戻した春雨を2分湯通しして透明になったらすぐ冷水で冷やし水切り、約10cmの長さに切る。",
      "小鉢に醤油 大さじ1、ごま油 大さじ1、砂糖 小さじ1、にんにくみじん切り 大さじ1を混ぜ炒めダレを作る。",
      "フライパンを中火で熱し、ごま油 大さじ1で玉ねぎとにんじんを2分炒め、やや柔らかく香りが出るまで。",
      "もみ込んだ肉糸を加え、強火で1～2分色が変わるまで炒める。ほうれん草ときくらげを加え1分炒める。",
      "水切りした春雨と炒めダレを加え、中火で2～3分、麺に均一に色と味が付き、団子にならないまで炒める。",
      "味を見て塩味と甘さを調整し、ごまを振って温かいうちに。"
    ],
    ko: [
      "준비: 한국 당면 100g을 찬물에 20분 담가 부드럽게 한 뒤 건집니다. 당근 30g은 채 썰고, 시금치 50g은 토막 내고, 양파 1/2개는 채 썰며, 목이버섯 30g은 불려 채 썹니다. 고기 채는 간장과 다진 마늘로 10분 재웁니다.",
      "냄비에 물을 넉넉히 강불로 끓여 불린 당면을 2분 데쳐 투명해지면 바로 찬물에 헹구고 건져 약 10cm 길이로 자릅니다.",
      "작은 그릇에 간장 1큰술, 참기름 1큰술, 설탕 1작은술, 다진 마늘 1큰술을 섞어 볶음 소스를 만듭니다.",
      "프라이팬을 중불로 달군 뒤 참기름 1큰술에 양파와 당근을 2분 볶아 살짝 부드럽고 향이 날 때까지 합니다.",
      "재운 고기 채를 넣고 강불로 1~2분 볶아 색이 변하면 시금치와 목이버섯을 넣고 1분 볶습니다.",
      "건진 당면과 소스를 넣고 중불로 2~3분 볶아 면에 색과 맛이 고루 배고 뭉치지 않게 합니다.",
      "간을 맞춰 짠맛과 단맛을 조절하고 참깨를 뿌려 뜨거울 때 낸다."
    ]
  }
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

const updatedFiles = [];

for (const slug of SLUGS) {
  for (const locale of ["en", "ja", "ko"]) {
    const path = join(ROOT, localeDirs[locale], `${slug}.md`);
    const raw = readFileSync(path, "utf8");
    const { fm, body } = splitMarkdown(raw);
    let nextFm = replaceStepsBlock(fm, STEPS[slug][locale], locale);
    nextFm = nextFm.replace(/^updatedAt:.*$/m, `updatedAt: "${UPDATED}"`);
    const trimmedBody = body.trimStart();
    writeFileSync(path, `---\n${nextFm}\n---\n\n${trimmedBody}`, "utf8");
    updatedFiles.push(path);
  }
}

console.log(`Updated ${updatedFiles.length} files:`);
for (const f of updatedFiles) console.log(f);
