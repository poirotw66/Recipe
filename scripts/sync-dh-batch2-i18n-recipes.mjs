#!/usr/bin/env node
/**
 * Sync en/ja/ko steps for DH batch 2 (10 slugs) to match zh detail steps.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const UPDATED = "2026-07-06";

const SLUGS = [
  "dh-deep-fried-tofu",
  "dh-fried-oysters",
  "dh-french-fries-with-korean-flavored-sauce",
  "dh-korean-style-bbq-fish-ball",
  "dh-korean-vermicelli-tofu-roll",
  "dh-korean-cheese-egg-roll",
  "dh-truffle-cheese-egg-roll",
  "dh-steamed-eggs-with-cheese-roe",
  "dh-tofu-ice-cream-with-tapioca",
  "dh-bbq-wrap"
];

const STEPS = {
  "dh-deep-fried-tofu": {
    en: [
      "Remove 1 pack soft tofu from the container and cut into about 1.5 cm thick slices (too thin breaks easily; too thick won't cook through). Lightly sprinkle both sides with a pinch of salt and white pepper; rest 5 minutes to season.",
      "Layer paper towels above and below the tofu slices, then place a flat plate on top and press gently for 3 minutes to absorb surface moisture (less moisture means less splatter and a crisper crust).",
      "Pour a thin layer of cornstarch or sweet potato starch into a shallow dish. Coat both sides of each slice evenly, then shake off excess (a thick coating hurts crispness).",
      "Pour oil into a fryer to about 3 cm deep and heat over medium heat. Insert chopsticks or a thermometer to confirm 170°C (steady small bubbles around the chopsticks).",
      "Fry tofu in batches without stacking. Fry over medium heat about 3 minutes until golden and bubbly with lightly charred edges; when slices slide easily with a spatula, flip and fry 1 minute more until evenly colored on both sides.",
      "Lift out with a slotted spoon and drain on a rack or paper towels for 1 minute until excess oil drips off.",
      "In a small bowl, mix 1 Tbsp soy sauce, 1 Tbsp minced garlic, and 1 tsp sugar into a dipping sauce. Plate hot fried tofu, sprinkle with chopped scallions and sesame seeds, and serve with the dipping sauce."
    ],
    ja: [
      "純豆腐 1パックを取り出し、厚さ約1.5cmに切る（薄すぎると崩れ、厚すぎると火が通りにくい）。両面に塩ひとつまみと白胡椒を軽く振り、5分置いて味をなじませる。",
      "豆腐の上下にキッチンペーパーを敷き、その上に平皿をのせて3分間軽く押し、表面の水分をできるだけ吸い取る（水分が少ないほど油はねが少なく、衣はサクサクになる）。",
      "浅い皿にトウモロコシ粉または片栗粉を薄く敷き、豆腐を両面均一にまぶしてから軽く振り、余分な粉を落とす（粉が厚いとサクサク感が損なわれる）。",
      "揚げ鍋に油を深さ約3cmまで注ぎ、中火で加熱する。箸や温度計で170°Cを確認する（箸の周りに小さな泡が続く状態）。",
      "豆腐は重ねずに分批で入れる。中火で約3分、表面がきつね色で泡立ち、縁が軽く焦げたら、ヘラで動かしやすくなったタイミングでひっくり返し、さらに1分両面を均一に揚げる。",
      "穴あきおたしで取り出し、網またはキッチンペーパーの上で1分油を切る。",
      "小鉢に醤油 大さじ1、みじん切りニンニク 大さじ1、砂糖 小さじ1を混ぜてタレを作る。揚げたての豆腐を盛り、刻みネギとごまを振り、タレをつけて食べる。"
    ],
    ko: [
      "순두부 1팩을 꺼내 두께 약 1.5cm로 썬다(너무 얇으면 부서지고, 너무 두꺼우면 속까지 익기 어렵다). 양면에 소금 한 꼬집과 흰후추를 가볍게 뿌리고 5분 재워 간을 냅니다.",
      "두부 위아래에 키친타월을 깔고 그 위에 평평한 접시를 올려 3분간 가볍게 눌러 표면 수분을 최대한 제거합니다(수분이 적을수록 기름 튐이 적고 겉이 더 바삭해집니다).",
      "얕은 접시에 옥수수전분 또는 고구마전분을 얇게 깔고 두부 양면을 고르게 묻힌 뒤 가볍게 털어 여분의 가루를 떨어냅니다(가루가 두꺼우면 바삭함이 떨어집니다).",
      "튀김냄비에 기름을 깊이 약 3cm까지 붓고 중불로 달굽니다. 젓가락이나 온도계로 170°C를 확인합니다(젓가락 주변에 작은 거품이 지속적으로 올라올 때).",
      "두부는 겹치지 않게 나눠 넣습니다. 중불로 약 3분간 튀겨 표면이 금색으로 부풀고 가장자리가 살짝 탈 때까지 익힌 뒤, 뒤집개로 밀면 잘 미끄러지면 뒤집어 1분 더 양면이 고르게 색이 나도록 튀깁니다.",
      "체로 건져 거름망이나 키친타월 위에서 1분간 기름을 뺍니다.",
      "작은 그릇에 간장 1큰술, 다진 마늘 1큰술, 설탕 1작은술을 섞어 찍어먹는 소스를 만듭니다. 튀긴 두부를 뜨거울 때 담고 다진 파와 참깨를 뿌려 소스에 찍어 먹습니다."
    ]
  },
  "dh-fried-oysters": {
    en: [
      "Rinse 150 g fresh oysters gently under running water. Drain and pat each oyster dry with paper towels (the drier the surface, the better the coating adheres and the crispier the fry).",
      "Mix 150 g all-purpose flour with a pinch of salt and a pinch of black pepper powder. Prepare separate shallow dishes of beaten egg and breadcrumbs.",
      "Coat each oyster in flour → egg → breadcrumbs, pressing lightly at each layer so the coating sticks. Rest on a plate 2 minutes so the coating sets.",
      "Pour enough oil into a fryer and heat over medium heat to 175°C (thermometer steady, or chopsticks inserted in oil produce steady bubbles).",
      "Fry oysters in batches without crowding. Fry about 2 minutes until golden and crisp; edges curl slightly while the inside stays juicy (overcooking makes them tough and shrunken).",
      "Drain on a rack for 1 minute to keep the crust crisp.",
      "Plate and serve hot with tartar sauce, Korean chili paste, or lemon wedges; sprinkle with chopped scallions and sesame seeds."
    ],
    ja: [
      "新鮮な生牡蠣 150gを流水で軽く洗い、水切り後キッチンペーパーで1粒ずつ水分を吸い取る（表面が乾いているほど衣がつき、揚げ後はサクサクになる）。",
      "中力粉 150gに塩ひとつまみと胡椒ひとつまみを混ぜる。別の浅い皿に溶き卵とパン粉を用意する。",
      "牡蠣を乾粉→卵→パン粉の順に衣をつけ、各層で軽く押して付着させ、皿に並べ2分置いて衣を定着させる。",
      "揚げ鍋に十分な油を注ぎ、中火で175°Cまで加熱する（温度計が安定するか、箸を入れると泡が続く状態）。",
      "牡蠣は詰め込まず分批で入れる。約2分揚げて外側がきつね色でサクサク、身の端が少し丸まり中はジューシーならすぐに上げる（長く揚げると硬く縮む）。",
      "網の上で1分油を切り、衣のサクサク感を保つ。",
      "盛り付け、タルタルソース、韓国唐辛子味噌、またはレモンと一緒に温かいうちに。刻みネギとごまを振る。"
    ],
    ko: [
      "신선한 생굴 150g을 흐르는 물에 가볍게 씻고, 건진 뒤 키친타월로 한 알씩 수분을 닦아냅니다(표면이 건조할수록 튀김옷이 잘 붙고 더 바삭해집니다).",
      "박력분 150g에 소금 한 꼬집과 후추 한 꼬집을 섞습니다. 별도의 얕은 접시에 풀어둔 달걀과 빵가루를 준비합니다.",
      "굴을 밀가루 → 달걀 → 빵가루 순으로 입히고 각 층마다 가볍게 눌러 옷이 붙게 한 뒤 접시에 두고 2분간 놓아 옷이 고정되게 합니다.",
      "튀김냄비에 기름을 충분히 붓고 중불로 175°C까지 달굽니다(온도계가 안정되거나 젓가락을 넣었을 때 거품이 지속적으로 올라올 때).",
      "굴은 겹치지 않게 나눠 넣습니다. 약 2분간 튀겨 겉이 금색으로 바삭하고 살 가장자리가 살짝 말리며 속은 육즙이 남을 때 건집니다(오래 튀기면 질기고 줄어듭니다).",
      "거름망 위에서 1분간 기름을 빼 겉을 바삭하게 유지합니다.",
      "접시에 담아 타르타르 소스, 고추장 또는 레몬과 함께 뜨거울 때 드세요. 다진 파와 참깨를 뿌립니다."
    ]
  },
  "dh-french-fries-with-korean-flavored-sauce": {
    en: [
      "Use 200 g frozen fries (or cut potatoes into thick sticks about 1 cm square). Soak in cold water 10 minutes to remove surface starch, drain, and pat completely dry with paper towels (dry surface reduces oil splatter).",
      "In a small bowl, mix 1.5 Tbsp Korean chili paste, 1 Tbsp honey, and a pinch of salt into a Korean dipping sauce; set aside.",
      "Pour enough oil into a fryer and heat over medium heat to 160°C (thermometer steady). Fry fries in batches without stacking.",
      "First fry about 5 minutes until slightly soft and pale yellow. Drain and rest on a rack 5 minutes (lets interior moisture escape for a crisper second fry).",
      "Raise oil temperature to 190°C. Return fries and fry about 2 minutes until golden and crisp with a hollow tap sound.",
      "Drain oil and toss hot fries with a pinch of salt.",
      "Plate and drizzle or serve with the Korean dipping sauce; sprinkle with chopped scallions and sesame seeds and serve hot."
    ],
    ja: [
      "フライドポテト 200g（またはじゃがいもを辺1cm程度の太めの棒状に切る）を冷水に10分浸し表面のでんぷんを落とし、水切り後キッチンペーパーで完全に乾かす（表面が乾いていると油はねが少ない）。",
      "小鉢に韓国唐辛子味噌 大さじ1.5、はちみつ 大さじ1、塩ひとつまみを混ぜて韓国風タレを作り、取っておく。",
      "揚げ鍋に十分な油を注ぎ、中火で160°Cまで加熱する（温度計が安定する状態）。ポテトは重ねず分批で入れる。",
      "最初の揚げは約5分、やわらかく色が薄い黄色になったら上げ、網の上で5分休ませる（内部の水分が抜け、二度揚げでよりサクサクになる）。",
      "油温を190°Cに上げ、ポテトを戻して約2分揚げ、きつね色でサクサク、軽く叩くと中が空洞感が出たら上げる。",
      "油を切り、熱いうちに塩ひとつまみを振って均一に混ぜる。",
      "盛り付け、韓国風タレをかけるか添え、刻みネギとごまを振って温かいうちに。"
    ],
    ko: [
      "감자튀김 200g(또는 감자를 한 변 약 1cm 정육면체 굵기로 썰기)을 찬물에 10분 담가 표면 전분을 제거하고, 건진 뒤 키친타월로 완전히 말립니다(표면이 마르면 기름 튐이 적습니다).",
      "작은 그릇에 고추장 1.5큰술, 꿀 1큰술, 소금 한 꼬집을 섞어 한국식 찍어먹는 소스를 만들어 둡니다.",
      "튀김냄비에 기름을 충분히 붓고 중불로 160°C까지 달굽니다(온도계가 안정될 때). 감자튀김은 겹치지 않게 나눠 넣습니다.",
      "첫 번째 튀김은 약 5분간 살짝 부드럽고 연한 노란색이 될 때까지 튀긴 뒤 건져 거름망에서 5분 쉬게 합니다(내부 수분이 빠져 재튀김 시 더 바삭해집니다).",
      "기름 온도를 190°C로 올리고 감자튀김을 다시 넣어 약 2분간 금색으로 바삭하게 튀깁니다(가볍게 두드리면 속이 비어 있는 느낌이 날 때).",
      "기름을 빼고 뜨거울 때 소금 한 꼬집을 뿌려 고루 버무립니다.",
      "접시에 담아 한국식 소스를 뿌리거나 곁들이고, 다진 파와 참깨를 뿌려 뜨거울 때 드세요."
    ]
  },
  "dh-korean-style-bbq-fish-ball": {
    en: [
      "If 150 g Korean fish cake balls are frozen, thaw at room temperature 10 minutes. Slice 0.5 onion into strips and cut 1 scallion into sections.",
      "Pour 1 Tbsp toasted sesame oil into a skillet and heat over low heat. Add 1.5 Tbsp Korean chili paste and stir-fry until fragrant red oil appears (about 30 seconds; do not scorch).",
      "Add 1 Tbsp minced garlic and 1 tsp sugar; stir quickly for a sweet-spicy base. Drizzle in 1 Tbsp soy sauce and stir-fry evenly.",
      "Add fish balls and stir-fry over medium heat 2 minutes, turning often, until lightly charred on the surface (centers should stay tender).",
      "Add onion strips and stir-fry 1 minute until translucent and sweet.",
      "Add 3 Tbsp water, cover, and simmer over medium-low heat 2 minutes until sauce clings to the fish balls with a light gloss.",
      "Transfer to a plate, sprinkle with chopped scallions and sesame seeds, and serve hot."
    ],
    ja: [
      "韓国練り物ボール 150gが冷凍なら室温で10分解凍する。玉ねぎ 0.5個を細切り、青ねぎ 1本を切る。",
      "フライパンにごま油 大さじ1を入れ弱火で熱し、韓国唐辛子味噌 大さじ1.5を加えて赤い油が香るまで炒める（約30秒、焦がさない）。",
      "みじん切りニンニク 大さじ1と砂糖 小さじ1を加えて素早く混ぜ甘辛のベースにする。醤油 大さじ1を回し入れ均一に炒める。",
      "練り物を入れ中火で2分、時々返しながら表面に軽い焦げ目がつくまで炒める（中心は柔らかいまま）。",
      "玉ねぎを加え1分炒め、半透明で甘みが出るまで。",
      "水 大さじ3を加え蓋をし、弱めの中火で2分煮て汁気を絞り、タレが練り物に光沢を持って絡むまで。",
      "皿に盛り、刻みネギとごまを振って温かいうちに。"
    ],
    ko: [
      "한국 어묵볼 150g이 냉동이면 실온에서 10분 해동합니다. 양파 0.5개는 채 썰고, 대파 1대는 토막 냅니다.",
      "프라이팬에 참기름 1큰술을 넣고 약불로 달군 뒤 고추장 1.5큰술을 넣어 붉은 기름 향이 날 때까지 볶습니다(약 30초, 타지 않게).",
      "다진 마늘 1큰술과 설탕 1작은술을 넣어 빠르게 섞어 단맛과 매운맛 베이스를 만듭니다. 간장 1큰술을 둘러 고르게 볶습니다.",
      "어묵을 넣고 중불로 2분간 자주 뒤집으며 표면에 살짝 그을린 자국이 날 때까지 볶습니다(가운데는 부드럽게 유지).",
      "양파 채를 넣고 1분간 볶아 반투명해지고 단맛이 나게 합니다.",
      "물 3큰술을 넣고 뚜껑을 덮어 중약불로 2분간 졸여 소스가 어묵에 윤기 있게 붙게 합니다.",
      "접시에 담아 다진 파와 참깨를 뿌리고 뜨거울 때 드세요."
    ]
  },
  "dh-korean-vermicelli-tofu-roll": {
    en: [
      "Soak Korean glass noodles in cold water 20 minutes until soft; drain and cut into about 5 cm lengths. Cut tofu skin or soft tofu into strips. Mince 0.5 onion and cut 1 scallion into sections. Blanch carrot and spinach, squeeze dry, and shred.",
      "Heat a little oil in a skillet over low heat and sauté 1 Tbsp minced garlic until fragrant. If using ground beef or minced mushrooms, cook until browned and separated.",
      "Add minced onion and scallion sections; stir-fry 1 minute until aromatic. Season with 1 Tbsp soy sauce, 1 Tbsp toasted sesame oil, and a pinch of salt; remove from heat.",
      "Mix the stir-fried filling with glass noodle pieces. Taste and adjust salt (filling should be slightly salty so the roll won't taste bland).",
      "Lay tofu skin flat. Layer spinach shreds, carrot shreds, and the glass noodle filling. Roll tightly from the near edge with the seam facing down to set shape.",
      "Brush a skillet lightly with oil. Over medium heat, pan-fry all four sides of each roll 1–2 minutes until golden and crisp and the seam seals.",
      "Move to a cutting board and slice about 2 cm thick with cut sides up. Plate, sprinkle with chopped scallions and sesame seeds, and serve hot."
    ],
    ja: [
      "韓国春雨を冷水に20分浸して柔らかくし、水切りして約5cmに切る。豆腐皮または純豆腐を細切りに、玉ねぎ 0.5個をみじん切り、青ねぎ 1本を切る。にんじんとほうれん草は湯通しして水気を絞り細切りに。",
      "フライパンに少量の油を入れ弱火でみじん切りニンニク 大さじ1を炒める。牛肉末やしいたけみじん切りがあれば加えて色が変わるまで炒める。",
      "玉ねぎみじん切りと青ねぎを加え1分炒めて香りを出す。醤油 大さじ1、ごま油 大さじ1、塩ひとつまみで味を整え火を止める。",
      "炒めた具と春雨を混ぜて餡にする。味見して塩加減を調整する（巻き込むと薄くなるので少し濃いめがよい）。",
      "豆腐皮を広げ、ほうれん草、にんじん、春雨餡を順にのせ、手前からきつめに巻き、切り口を下にして形を整える。",
      "フライパンに薄く油を引き、中火で四面を1～2分ずつ焼き、きつね色でサクサク、切り口が閉じるまで。",
      "まな板に移し厚さ約2cmに切り、断面を上にして盛る。刻みネギとごまを振って温かいうちに。"
    ],
    ko: [
      "한국 당면을 찬물에 20분 담가 부드럽게 한 뒤 건져 약 5cm 길이로 자릅니다. 두부피나 순두부는 채 썰고, 양파 0.5개는 다지며, 대파 1대는 토막 냅니다. 당근과 시금치는 데쳐 물기를 짜 채 썹니다.",
      "프라이팬에 기름을 조금 두르고 약불로 다진 마늘 1큰술을 볶아 향을 냅니다. 다진 소고기나 표고버섯이 있으면 넣어 익을 때까지 볶습니다.",
      "다진 양파와 대파를 넣고 1분간 볶아 향을 냅니다. 간장 1큰술, 참기름 1큰술, 소금 한 꼬집으로 간을 맞추고 불을 끕니다.",
      "볶은 재료와 당면을 섞어 속을 만듭니다. 맛을 보고 간을 조절합니다(말면 맛이 옅어지므로 속은 약간 짜게).",
      "두부피를 펴고 시금치, 당근, 당면 속을 순서대로 올린 뒤 가까운 쪽에서 단단히 말아 접합부가 아래로 가게 합니다.",
      "프라이팬에 기름을 얇게 바르고 중불로 네 면을 각 1~2분씩 굽어 금색으로 바삭하게 하고 접합부가 닫히게 합니다.",
      "도마에 옮겨 두께 약 2cm로 썰어 단면이 위로 가게 담습니다. 다진 파와 참깨를 뿌려 뜨거울 때 드세요."
    ]
  },
  "dh-korean-cheese-egg-roll": {
    en: [
      "Beat 3 eggs in a bowl with a pinch of salt and 1 Tbsp toasted sesame oil until smooth with fine bubbles. Cut 60 g shredded mozzarella into short pieces, slice 1 cheddar cheese slice into strips, cut 30 g flying fish roe and 50 g crab sticks into short pieces, and mince scallions.",
      "Brush a skillet or Korean egg-roll pan lightly with oil and preheat over low heat. Pour in about 1/3 of the egg mixture and tilt to spread a thin sheet.",
      "When the sheet is half set (surface still slightly wet, edges firm), layer mozzarella, cheddar strips, flying fish roe, crab sticks, and minced scallion on the side nearest you.",
      "Gently roll into a log with a spatula and push to one end of the pan. Pour in another 1/3 of egg so the new layer connects to the rolled log.",
      "Repeat fill → roll → add egg until all egg is used, rolling 2–3 layers total. On the last layer you may roll without filling for a clean outer wrap.",
      "Pan-fry the whole roll 1 minute more, pressing lightly on all sides until lightly browned and cheese begins to melt.",
      "Move to a cutting board, rest 1 minute, slice into about 2 cm thick rounds with cut sides up. Plate, sprinkle with chopped scallions and sesame seeds, and serve hot."
    ],
    ja: [
      "卵 3個をボウルに割り入れ、塩ひとつまみとごま油 大さじ1を加え、細かい泡が立つまで均一に混ぜる。モッツァレラチーズ 60gを短く切り、チェダーチーズ 1枚を細切り、飛び魚の卵 30gとかにかま 50gを短く切り、青ねぎをみじん切りにする。",
      "フライパンまたは韓国風卵焼き鍋に薄く油を引き弱火で予熱する。溶き卵の約1/3を流し入れ、鍋を傾けて薄い卵皮に広げる。",
      "卵皮が半熟（表面はまだ少し湿り、端は固まった状態）になったら、手前側にモッツァレラ、チェダー、飛び魚の卵、かにかま、青ねぎをのせる。",
      "ヘラで手前から優しく巻いて長方形にし、鍋の端に寄せる。残りの卵の約1/3を流し入れ、既に巻いた卵とつなげる。",
      "具をのせ→巻く→卵を足すを繰り返し、合計2～3層になるまで。最後の層は具なしで巻いてもよい。",
      "卵焼き全体をさらに1分、四面を軽く押して表面が少し焦げ、チーズが溶け始めたら火を止める。",
      "まな板に移し1分休ませ、厚さ約2cmの輪切りにして断面を上に盛る。刻みネギとごまを振って温かいうちに。"
    ],
    ko: [
      "달걀 3개를 그릇에 풀고 소금 한 꼬집과 참기름 1큰술을 넣어 고른 거품이 날 때까지 섞습니다. 모짜렐라 치즈 60g은 짧게 자르고, 체다 치즈 1장은 채 썰며, 날치알 30g과 맛살 50g은 짧게 자르고, 대파는 다집니다.",
      "프라이팬이나 한국식 계란말이 팬에 기름을 얇게 바르고 약불로 예열합니다. 풀어둔 달걀의 약 1/3을 붓고 팬을 기울여 얇은 계란피로 펼칩니다.",
      "계란피가 반쯤 익었을 때(표면은 약간 젖고 가장자리는 굳은 상태) 가까운 쪽에 모짜렐라, 체다, 날치알, 맛살, 다진 대파를 올립니다.",
      "뒤집개로 가까운 쪽에서 가볍게 말아 길게 만든 뒤 팬 한쪽 끝으로 밉니다. 남은 달걀의 약 1/3을 붓고 기존 말이와 연결합니다.",
      "속 채우기 → 말기 → 달걀 추가를 반복해 총 2~3겹이 될 때까지 합니다. 마지막 겹은 속 없이 말아도 됩니다.",
      "통째로 1분 더 굽으며 네 면을 가볍게 눌러 표면이 살짝 그을리고 치즈가 녹기 시작하면 불을 끕니다.",
      "도마에 옮겨 1분 쉬운 뒤 두께 약 2cm 원형으로 썰어 단면이 위로 가게 담습니다. 다진 파와 참깨를 뿌려 뜨거울 때 드세요."
    ]
  },
  "dh-truffle-cheese-egg-roll": {
    en: [
      "Beat 3 eggs in a bowl with a pinch of salt and 1 Tbsp toasted sesame oil until smooth. Cut 60 g shredded mozzarella into short pieces and set 1 tsp black truffle paste aside in a small dish (do not add all at once; high heat dissipates aroma).",
      "Brush a skillet or Korean egg-roll pan lightly with oil and preheat over low heat. Pour in about 1/3 of the egg mixture and tilt to spread a thin sheet.",
      "When the sheet is half set, layer part of the mozzarella on the side nearest you and dot about 1/3 of the truffle paste with a teaspoon.",
      "Gently roll into a log with a spatula and push to the edge. Pour in another 1/3 of egg to connect, then repeat cheese and truffle before rolling again.",
      "Repeat until all egg is used, rolling 2–3 layers total. On the last layer you may add cheese only for an even outer color.",
      "Pan-fry the whole roll 1 minute more, pressing lightly on all sides until lightly browned and cheese begins to melt (truffle aroma should be clear, not bitter).",
      "Move to a cutting board, rest 1 minute, slice into thick rounds. Drizzle a little more truffle paste if desired, sprinkle with chopped scallions and sesame seeds, and serve hot."
    ],
    ja: [
      "卵 3個をボウルに割り入れ、塩ひとつまみとごま油 大さじ1を加え均一に混ぜる。モッツァレラチーズ 60gを短く切り、黒トリュフペースト 小さじ1は小皿に分けておく（一度に全部入れない。高温で香りが飛ぶ）。",
      "フライパンまたは韓国風卵焼き鍋に薄く油を引き弱火で予熱する。溶き卵の約1/3を流し入れ、鍋を傾けて薄い卵皮に広げる。",
      "卵皮が半熟になったら、手前側にモッツァレラの一部をのせ、小さじ1/3程度のトリュフペーストを点々とのせる。",
      "ヘラで手前から優しく巻き、鍋の端に寄せる。残りの卵の約1/3を流し入れつなげ、チーズとトリュフをのせて再び巻く。",
      "卵がなくなるまで繰り返し、合計2～3層に。最後の層はチーズのみでも外側の色が均一になる。",
      "卵焼き全体をさらに1分、四面を軽く押して表面が少し焦げ、チーズが溶け始めたら火を止める（トリュフの香りははっきり、焦げ苦味は出さない）。",
      "まな板に移し1分休ませ、厚めの輪切りにする。必要ならトリュフペーストを少し足し、刻みネギとごまを振って温かいうちに。"
    ],
    ko: [
      "달걀 3개를 그릇에 풀고 소금 한 꼬집과 참기름 1큰술을 넣어 고르게 섞습니다. 모짜렐라 치즈 60g은 짧게 자르고, 검은 트러플 페이스트 1작은술은 작은 그릇에 따로 둡니다(한꺼번에 넣지 않음, 고온에서 향이 날아감).",
      "프라이팬이나 한국식 계란말이 팬에 기름을 얇게 바르고 약불로 예열합니다. 풀어둔 달걀의 약 1/3을 붓고 팬을 기울여 얇은 계란피로 펼칩니다.",
      "계란피가 반쯤 익었을 때 가까운 쪽에 모짜렐라 일부를 올리고 작은술로 트러플 페이스트 약 1/3을 점처럼 올립니다.",
      "뒤집개로 가볍게 말아 팬 끝으로 밀고, 달걀의 약 1/3을 더 붓여 연결한 뒤 치즈와 트러플을 올려 다시 맙니다.",
      "달걀이 다 떨어질 때까지 반복해 총 2~3겹으로 맙니다. 마지막 겹은 치즈만 넣어도 겉 색이 고릅니다.",
      "통째로 1분 더 굽으며 네 면을 가볍게 눌러 표면이 살짝 그을리고 치즈가 녹기 시작하면 불을 끕니다(트러플 향은 뚜렷하고 탄 맛은 나지 않게).",
      "도마에 옮겨 1분 쉬운 뒤 두껍게 썹니다. 원하면 트러플 페이스트를 조금 더 뿌리고, 다진 파와 참깨를 뿌려 뜨거울 때 드세요."
    ]
  },
  "dh-steamed-eggs-with-cheese-roe": {
    en: [
      "Brush the inside of a clay pot or heavy small pot lightly with oil to prevent sticking. Beat 1 egg in a bowl with 400 ml broth, a pinch of salt, and 1 Tbsp toasted sesame oil (egg-to-broth ratio about 1:400 for a silky, soupy texture).",
      "Whisk briskly in one direction until fully smooth; do not whip in lots of foam. Strain through a fine sieve 1–2 times to remove bubbles and egg white lumps (strained custard sets with a smoother surface).",
      "Preheat the clay pot over low heat 1 minute, then pour in the egg mixture. Stir gently with chopsticks or a spoon about 2 minutes until about 50% set and semi-flowing (like soft scrambled eggs; do not over-stir into crumbs).",
      "Reduce heat. Lay 1 cheddar cheese slice on top, then evenly sprinkle 30 g flying fish roe (cheese underneath, roe on top keeps layers distinct when heated).",
      "Cover and steam over very low heat 5–6 minutes until the center still jiggles slightly and the surface is set without large bubbles (too high heat causes a honeycomb texture).",
      "Turn off heat and rest covered 2 minutes so cheese melts and roe stays springy.",
      "Score gently around the pot edge with a spoon and serve directly in the clay pot to share. Sprinkle with chopped scallions and sesame seeds and serve hot."
    ],
    ja: [
      "土鍋または厚手の小鍋の内側に薄く油を塗り、くっつきを防ぐ。卵 1個をボウルに割り入れ、だし 400ml、塩ひとつまみ、ごま油 大さじ1を加える（卵とだしの比率は約1:400で、なめらかでスープ感のある仕上がり）。",
      "同じ方向に素早く混ぜて完全に均一にする。泡立てすぎない。細いざるで1～2回こして泡と卵白の塊を取り除く（こすと表面がより滑らかになる）。",
      "土鍋を弱火で1分予熱し、卵液を注ぐ。箸またはスプーンで約2分、約5割固まり半流動状になるまで優しく混ぜる（柔らかい炒り卵のような質感。混ぜすぎて細かくしない）。",
      "弱火に下げ、チェダーチーズ 1枚をのせ、その上に飛び魚の卵 30gを均等に振る（チーズを下、卵を上にすると加熱後の層がはっきりする）。",
      "蓋をし極弱火で5～6分蒸す。中心がわずかに揺れ、表面は固まり大きな泡が出ない状態（火力が強いと蜂の巣状になる）。",
      "火を止め蓋をしたまま2分休ませ、チーズを溶かし飛び魚の卵の弾力を保つ。",
      "スプーンで鍋の縁に沿って軽く切り分け、土鍋のまま共有する。刻みネギとごまを振って温かいうちに。"
    ],
    ko: [
      "도자기 냄비나 두꺼운 작은 냄비 안쪽에 기름을 얇게 발라 눌어붙지 않게 합니다. 달걀 1개를 그릇에 풀고 육수 400ml, 소금 한 꼬집, 참기름 1큰술을 넣습니다(달걀과 육수 비율 약 1:400으로 부드럽고 국물 느낌이 납니다).",
      "한 방향으로 빠르게 저어 완전히 고르게 섞습니다. 거품을 과하게 내지 않습니다. 고운 체에 1~2번 걸러 거품과 흰자 덩어리를 제거합니다(거르면 표면이 더 매끈해집니다).",
      "도자기 냄비를 약불로 1분 예열한 뒤 달걀액을 붓습니다. 젓가락이나 숟가락으로 약 2분간 약 50% 익어 반쯤 흐르는 상태가 될 때까지 가볍게 젓습니다(부드러운 스크램블 같은 질감, 과하게 저어 부스러지지 않게).",
      "약불로 줄입니다. 체다 치즈 1장을 깔고 그 위에 날치알 30g을 고르게 뿌립니다(치즈 아래, 알 위로 하면 가열 후 층이 분명합니다).",
      "뚜껑을 덮고 아주 약한 불로 5~6분 찝습니다. 가운데가 살짝 흔들리고 표면은 굳었으나 큰 거품이 나지 않을 때(불이 세면 벌집 모양이 됩니다).",
      "불을 끄고 뚜껑을 덮은 채 2분 더 두어 치즈가 녹고 날치알 탄력을 유지합니다.",
      "숟가락으로 냄비 가장자리를 따라 가볍게 나누고 도자기 냄비째 나눠 드세요. 다진 파와 참깨를 뿌려 뜨거울 때 드세요."
    ]
  },
  "dh-tofu-ice-cream-with-tapioca": {
    en: [
      "Rinse 150 g non-GMO soybeans and soak in cold water at least 4 hours (or 2 hours in warm water) until plump. Drain and blend with 300 ml water in a blender until silky smooth.",
      "Pour soy milk into a pot, heat over low heat while stirring constantly. After boiling, simmer on lower heat 3 minutes to remove beany taste; cool to room temperature. Stir in 30 g brown sugar and a pinch of salt (adjust sweetness to taste).",
      "Pour cooled soy milk into a sealed container, cover, and freeze. Every 30 minutes remove and scrape with a fork; repeat 3–4 times (about 2 hours) until texture is creamy like ice cream (if short on time, chill 4 hours for a softer tofu slush texture).",
      "Cook 50 g brown sugar tapioca pearls per package directions. Simmer until centers are clear and pearls are chewy (usually 15–20 minutes). Rinse in cold water, toss with a little syrup to prevent sticking, and drain.",
      "In a small pot, simmer remaining 20 g brown sugar with 30 ml water over low heat, stirring until thick enough to coat a spoon with caramel aroma; set aside.",
      "Scoop 2 balls of tofu ice cream into a bowl or glass (ice cream should be creamy, not runny).",
      "Layer tapioca pearls on top, then drizzle warm brown sugar syrup (warm sauce over cold ice cream gives the best contrast). Serve immediately while cold."
    ],
    ja: [
      "非遺伝子組み換え大豆 150gを洗い、冷水に最低4時間（またはぬるま湯で2時間）浸して膨らませる。水切り後、水 300mlと一緒にミキサーでなめらかな豆乳にする。",
      "豆乳を鍋に入れ弱火でかき混えながら加熱する。沸騰後さらに弱火で3分煮て豆臭さを取り、室温まで冷ます。黒砂糖 30gと塩ひとつまみを溶かす（甘さは好みで調整）。",
      "冷ました豆乳を密封容器に入れ蓋をし冷凍する。30分ごとに取り出してフォークでほぐし、3～4回繰り返す（約2時間）でアイスクリームのようななめらかさに（時間が足りなければ冷蔵4時間で豆腐シャーベット風にも）。",
      "黒糖タピオカ 50gを表示通りに茹で、弱火で中心が透明になり外側がモチモチになるまで煮る（通常15～20分）。冷水で洗い、少量のシロップをまぶしてくっつきを防ぎ、水切りする。",
      "小鍋で残りの黒砂糖 20gと水 30mlを弱火でかき混え、スプーンにとろみがつき焦糖の香りが出るまで煮る。",
      "ボウルまたはグラスに豆腐アイスクリームを2球すくう（水っぽくなく、なめらかな状態）。",
      "タピオカをのせ、温かい黒糖シロップをかける（温かいタレと冷たいアイスの対比がよい）。冷たいうちにすぐ提供する。"
    ],
    ko: [
      "비유전자변형 대두 150g을 씻어 찬물에 최소 4시간(또는 미지근한 물에 2시간) 담가 불립니다. 건진 뒤 물 300ml와 함께 믹서에 갈아 고운 두유를 만듭니다.",
      "두유를 냄비에 붓고 약불로 계속 저으며 가열합니다. 끓인 뒤 더 약한 불로 3분 더 끓여 콩 냄새를 빼고 실온까지 식힙니다. 흑설탕 30g과 소금 한 꼬집을 녹입니다(단맛은 취향에 맞게 조절).",
      "식힌 두유를 밀폐 용기에 담아 뚜껑을 덮고 냉동합니다. 30분마다 꺼내 포크로 긁어 3~4번 반복합니다(약 2시간) 크리미한 아이스크림 질감이 될 때까지(시간이 부족하면 냉장 4시간으로 두부 셔벗 느낌도 가능).",
      "흑당 타피오카 펄 50g을 포장 지시대로 끓인 뒤 약불로 가운데가 투명하고 겉은 쫄깃해질 때까지 삶습니다(보통 15~20분). 찬물에 헹구고 소량 시럽을 버무려 붙지 않게 한 뒤 건집니다.",
      "작은 냄비에 남은 흑설탕 20g과 물 30ml를 약불로 계속 저으며 숟가락에 걸릴 정도로 걸죽해지고 캐러멜 향이 날 때까지 끓입니다.",
      "그릇이나 유리컵에 두부 아이스크림 2스쿱을 담습니다(물기 없이 크리미한 상태).",
      "타피오카 펄을 올리고 따뜻한 흑당 시럽을 뿌립니다(따뜻한 소스와 차가운 아이스의 대비가 좋습니다). 차가울 때 바로 드세요."
    ]
  },
  "dh-bbq-wrap": {
    en: [
      "Rinse and drain 100 g cabbage; use large leaves as wrappers (or heat a tortilla in a dry skillet over medium heat 20–30 seconds per side until lightly spotted but still soft and pliable). Cut scallions into long sections.",
      "Marinate 180 g beef brisket slices with 1 Tbsp soy sauce, minced garlic from 1 head of garlic, and a little sugar for 10 minutes. If 150 g Korean rice cakes are firm from refrigeration, soak in warm water 10 minutes until slightly softened.",
      "Pour 1 Tbsp toasted sesame oil into a skillet over medium heat. Lay out beef slices and pan-fry about 1 minute per side until colored with light char. Add rice cakes and garlic slices; stir-fry 2 minutes until meat is cooked and rice cakes are soft and chewy. Slice into strips.",
      "In a small bowl, mix 1.5 Tbsp Korean chili paste with a little sesame oil into a drizzle sauce. Arrange cabbage leaves (or tortillas), meat strips, rice cakes, scallion sections, garlic slices, and sauce separately.",
      "Lay a cabbage leaf (or tortilla) flat. Stack from bottom to top: scallion sections → meat strips → rice cake strips → garlic slices (drizzle sauce last to keep the wrapper from getting soggy).",
      "Roll tightly from the bottom into a cylinder. Fold in both ends, then roll once more to secure the filling.",
      "Cut in half or on a diagonal to show the cross-section. Plate and drizzle a little more Korean chili paste if desired; sprinkle with chopped scallions and sesame seeds and serve hot."
    ],
    ja: [
      "キャベツ 100gを洗って水切りし、大きな葉を包み用にする（またはトルティーヤを乾いたフライパンで中火、片面20～30秒ずつ軽い斑点が出るまで加熱し柔らかく保つ）。青ねぎを長めに切る。",
      "牛バラ薄切り 180gを醤油 大さじ1、にんにく 1個のみじん切り、砂糖少々で10分漬ける。韓国餅 150gが冷蔵で硬ければぬるま湯に10分浸してやわらかくする。",
      "フライパンにごま油 大さじ1を中火で熱し、牛肉を広げ片面約1分ずつ焼き色と軽い焦げ目をつける。餅とにんにく薄切りを加え2分炒め、肉に火が通り餅がモチモチになったら細切りにする。",
      "小鉢に韓国唐辛子味噌 大さじ1.5とごま油少々を混ぜてかけるタレを作る。キャベツ葉（またはトルティーヤ）、肉、餅、青ねぎ、にんく、タレを分けて並べる。",
      "キャベツ葉（またはトルティーヤ）を広げ、下から順に青ねぎ→肉→餅→にんにくをのせる（タレは最後にかけ、包みが濡れすぎないように）。",
      "下からきつめに巻き、両端を折り込んでさらに巻き、具が散らないようにする。",
      "半分または斜め切りにして断面を見せる。盛り付け、必要なら韓国唐辛子味噌を少し足し、刻みネギとごまを振って温かいうちに。"
    ],
    ko: [
      "양배추 100g을 씻어 건지고 큰 잎을 싸개로 씁니다(또는 또띠아를 마른 팬에 중불로 양면 각 20~30초 가볍게 반점이 날 때까지 데워 부드럽게 유지). 대파는 길게 썹니다.",
      "소고기 삼겹살 슬라이스 180g을 간장 1큰술, 마늘 1통 다진 것, 설탕 조금으로 10분 재웁니다. 떡 150g이 냉장으로 딱딱하면 미지근한 물에 10분 담가 살짝 부드럽게 합니다.",
      "프라이팬에 참기름 1큰술을 중불로 달군 뒤 고기를 펼쳐 한 면당 약 1분씩 익혀 살짝 그을린 향을 냅니다. 떡과 마늘 슬라이스를 넣고 2분 볶아 고기가 익고 떡이 쫄깃해지면 채 썹니다.",
      "작은 그릇에 고추장 1.5큰술과 참기름 조금을 섞어 뿌릴 소스를 만듭니다. 양배추 잎(또는 또띠아), 고기, 떡, 대파, 마늘, 소스를 나눠 준비합니다.",
      "양배추 잎(또는 또띠아)을 펴고 아래에서 위로 대파 → 고기 → 떡 → 마늘 순으로 올립니다(소스는 마지막에 뿌려 싸개가 젖지 않게).",
      "아래에서 단단히 말아 원통 모양으로 만든 뒤 양끝을 접고 한 번 더 말아 속이 흩어지지 않게 합니다.",
      "반으로 또는 사선으로 잘라 단면을 보이게 담습니다. 원하면 고추장을 조금 더 뿌리고, 다진 파와 참깨를 뿌려 뜨거울 때 드세요."
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
    locale === "en" && (/[:#"'&]|^\d/.test(step) || step.includes("："));
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
