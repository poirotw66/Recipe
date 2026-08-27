#!/usr/bin/env node
/**
 * Sync en/ja/ko steps, ingredients, and seasonings for SF brunch batch (10 slugs).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const UPDATED = "2026-07-06";

const SLUGS = [
  "sf-classic-beef-mushroom-eggs-benedict",
  "sf-classic-ham-mushroom-eggs-benedict",
  "sf-sichuan-chicken-mushroom-eggs-benedict",
  "sf-smoked-salmon-mushroom-eggs-benedict",
  "sf-mushroom-cheese-omelette",
  "sf-supreme-cheese-omelette",
  "sf-worcester-meat-sauce-omelette",
  "sf-orange-danish-mushroom-poached-potato",
  "sf-orange-danish-poached-seafood-potato",
  "sf-orange-danish-sous-vide-steak"
];

const STEPS = {
  "sf-classic-beef-mushroom-eggs-benedict": {
    en: [
      "Slice 2 baguette rolls crosswise; butter the cut sides and bake at 180°C / 350°F 5–7 minutes until golden and lightly crisp.",
      "Heat a skillet over medium with 1/2 tbsp olive oil and a little butter; add 120 g sautéed mushrooms; stir-fry until they release moisture, then reduce heat until dry; sprinkle 1/6 tsp sea salt and a little cracked black pepper; keep warm.",
      "Pat dry 160 g beef with paper towels; add 1/2 tbsp olive oil to the same skillet; sear over medium-high 1.5–2 minutes per side until browned outside and still tender inside; slice and keep warm.",
      "Bring a saucepan of water to a boil with 1 tbsp white vinegar; reduce heat; stir a gentle whirlpool with a spoon; crack in 2 eggs and poach over low heat about 3 minutes until whites set and yolks runny; drain well.",
      "In a separate small pan over low heat, gently warm the remaining 1/2 tbsp olive oil into a warm drizzling sauce.",
      "Divide toasted baguette on plates; layer sautéed mushrooms, beef slices, and 2 poached eggs on each.",
      "Drizzle warm olive oil sauce; sprinkle 1/3 tsp sea salt and 1/4 tsp cracked black pepper; serve hot."
    ],
    ja: [
      "歐包2份を横切りにし、切り口にバターを薄く塗り、180℃のオーブンで5～7分焼いて表面をきつね色に軽くカリカリにする。",
      "フライパンを中火に熱し、オリーブオイル大さじ1/2とバターを少し加え、奶油炒菇120gを炒め、水分が出たら弱火で煮詰め、海塩小さじ1/6と黒胡椒を少々振る。温めておく。",
      "牛肉160gの水分をキッチンペーパーで拭き取る。同じ鍋にオリーブオイル大さじ1/2を足し、強めの中火で片面1.5～2分ずつ焼き、表面に焼き色がつき中心は柔らかいままにする。切って温めておく。",
      "小鍋で湯を沸かし酢大さじ1を加え、弱火にしてスプーンで渦を作り、卵2個を割り入れ約3分ポーチする（白身が固まり黄身がとろり）。水気を切る。",
      "別の小鍋で弱火、残りのオリーブオイル大さじ1/2を温め、かけるソースにする。",
      "焼いた歐包2枚を皿に分け、奶油炒菇、牛肉、水波蛋2個を順にのせる。",
      "温かいオリーブオイルソースをかけ、海塩小さじ1/3と黒胡椒小さじ1/4を振り、温かいうちに供する。"
    ],
    ko: [
      "歐包 2份를 가로로 잘라 단면에 버터를 살짝 바르고, 180°C 오븐에서 5~7분 굽혀 표면이 금색으로 바삭하게 만듭니다.",
      "팬을 중불로 달군 뒤 올리브 오일 1/2큰술과 버터를 조금 넣고 奶油炒菇 120g을 볶아 물기가 나오면 약불로 졸인 다음 바다소금 1/6작은술과 후추를 조금 뿌립니다. 보온합니다.",
      "牛肉 160g의 수분을 키친타월로 닦습니다. 같은 팬에 올리브 오일 1/2큰술을 더 넣고 중강불로 양면 각 1.5~2분 굽혀 겉은 색이 나고 속은 부드럽게 합니다. 썰어 보온합니다.",
      "냄비에 물을 끓이고 식초 1큰술을 넣은 뒤 약불로 줄이고 숟가락으로 소용돌이를 만든 다음 달걀 2개를 넣어 약 3분 수란합니다(흰자가 굳고 노른자가 흐르게). 물기를 뺍니다.",
      "다른 작은 팬에 약불로 남은 올리브 오일 1/2큰술을 데워 뿌릴 소스로 만듭니다.",
      "구운 歐包 두 조각을 접시에 나눠 담고 奶油炒菇, 牛肉, 水波蛋 2개를 순서대로 올립니다.",
      "따뜻한 올리브 오일 소스를 뿌리고 바다소금 1/3작은술과 후추 1/4작은술을 뿌려 뜨거울 때 냅니다."
    ]
  },
  "sf-classic-ham-mushroom-eggs-benedict": {
    en: [
      "Slice 2 baguette rolls crosswise; butter the cut sides and bake at 180°C / 350°F 5–7 minutes until golden and lightly crisp.",
      "Heat a skillet over medium with 1/2 tbsp olive oil and a little butter; add 120 g sautéed mushrooms; stir-fry until they release moisture, then reduce heat until dry; sprinkle 1/6 tsp sea salt and a little cracked black pepper; keep warm.",
      "Add ham to taste to the same skillet; cook over medium-low until lightly browned and fragrant; keep warm. Warm hollandaise to taste over a double boiler or very low heat to avoid splitting.",
      "Bring a saucepan of water to a boil with 1 tbsp white vinegar; reduce heat; stir a gentle whirlpool with a spoon; crack in 2 eggs and poach over low heat about 3 minutes until whites set and yolks runny; drain well.",
      "Divide toasted baguette on plates; layer sautéed mushrooms, ham, and 2 poached eggs on each.",
      "Drizzle warm hollandaise to taste, then 1 tbsp olive oil; sprinkle 1/3 tsp sea salt and 1/4 tsp cracked black pepper.",
      "Check the sauce coats evenly; serve hot while yolks run and bread stays warm."
    ],
    ja: [
      "歐包2份を横切りにし、切り口にバターを薄く塗り、180℃のオーブンで5～7分焼いて表面をきつね色に軽くカリカリにする。",
      "フライパンを中火に熱し、オリーブオイル大さじ1/2とバターを少し加え、奶油炒菇120gを炒め、水分が出たら弱火で煮詰め、海塩小さじ1/6と黒胡椒を少々振る。温めておく。",
      "同じ鍋に火腿適量を入れ、中弱火で表面が軽く焦げて香りが立つまで焼く。温めておく。荷蘭醬適量は湯せんまたは弱火で温め、分離しないよう注意する。",
      "小鍋で湯を沸かし酢大さじ1を加え、弱火にしてスプーンで渦を作り、卵2個を割り入れ約3分ポーチする（白身が固まり黄身がとろり）。水気を切る。",
      "焼いた歐包2枚を皿に分け、奶油炒菇、火腿、水波蛋2個を順にのせる。",
      "温かい荷蘭醬適量をかけ、さらにオリーブオイル大さじ1、海塩小さじ1/3、黒胡椒小さじ1/4を振る。",
      "ソースが均一にかかっていることを確認し、黄身がとろり、パンが温かいうちに供する。"
    ],
    ko: [
      "歐包 2份를 가로로 잘라 단면에 버터를 살짝 바르고, 180°C 오븐에서 5~7분 굽혀 표면이 금색으로 바삭하게 만듭니다.",
      "팬을 중불로 달군 뒤 올리브 오일 1/2큰술과 버터를 조금 넣고 奶油炒菇 120g을 볶아 물기가 나오면 약불로 졸인 다음 바다소금 1/6작은술과 후추를 조금 뿌립니다. 보온합니다.",
      "같은 팬에 火腿 적당량을 넣고 중약불로 겉이 살짝 노릇하고 향이 날 때까지 굽습니다. 보온합니다. 荷蘭醬 적당량은 중탕이나 약불로 데워 기름이 분리되지 않게 합니다.",
      "냄비에 물을 끓이고 식초 1큰술을 넣은 뒤 약불로 줄이고 숟가락으로 소용돌이를 만든 다음 달걀 2개를 넣어 약 3분 수란합니다(흰자가 굳고 노른자가 흐르게). 물기를 뺍니다.",
      "구운 歐包 두 조각을 접시에 나눠 담고 奶油炒菇, 火腿, 水波蛋 2개를 순서대로 올립니다.",
      "따뜻한 荷蘭醬 적당량을 뿌린 뒤 올리브 오일 1큰술을 더하고 바다소금 1/3작은술과 후추 1/4작은술을 뿌립니다.",
      "소스가 고르게 묻었는지 확인한 뒤 노른자가 흐르고 빵이 따뜻할 때 낸다."
    ]
  },
  "sf-sichuan-chicken-mushroom-eggs-benedict": {
    en: [
      "Slice 2 baguette rolls crosswise; butter the cut sides and bake at 180°C / 350°F 5–7 minutes until golden and lightly crisp.",
      "Heat a skillet over medium with 1/2 tbsp olive oil and a little butter; add 120 g sautéed mushrooms; stir-fry until they release moisture, then reduce heat until dry; sprinkle 1/6 tsp sea salt and a little cracked black pepper; keep warm.",
      "Add 180 g Sichuan-style chicken to the same skillet; reheat over medium-low and toss with 1/2 tsp chili flakes so chili oil coats evenly; keep warm.",
      "Bring a saucepan of water to a boil with 1 tbsp white vinegar; reduce heat; stir a gentle whirlpool with a spoon; crack in 2 eggs and poach over low heat about 3 minutes until whites set and yolks runny; drain well.",
      "In a separate small pan over low heat, gently warm the remaining 1/2 tbsp olive oil into a warm drizzling sauce.",
      "Divide toasted baguette on plates; layer sautéed mushrooms, Sichuan chicken, and 2 poached eggs on each.",
      "Drizzle warm olive oil sauce; sprinkle 1/3 tsp sea salt, 1/4 tsp cracked black pepper, and a little more chili flakes; serve hot."
    ],
    ja: [
      "歐包2份を横切りにし、切り口にバターを薄く塗り、180℃のオーブンで5～7分焼いて表面をきつね色に軽くカリカリにする。",
      "フライパンを中火に熱し、オリーブオイル大さじ1/2とバターを少し加え、奶油炒菇120gを炒め、水分が出たら弱火で煮詰め、海塩小さじ1/6と黒胡椒を少々振る。温めておく。",
      "同じ鍋に口水雞180gを入れ、中弱火で素早く温め、辣椒碎小さじ1/2を加えて辣油が均一に絡むまで和える。温めておく。",
      "小鍋で湯を沸かし酢大さじ1を加え、弱火にしてスプーンで渦を作り、卵2個を割り入れ約3分ポーチする（白身が固まり黄身がとろり）。水気を切る。",
      "別の小鍋で弱火、残りのオリーブオイル大さじ1/2を温め、かけるソースにする。",
      "焼いた歐包2枚を皿に分け、奶油炒菇、口水雞、水波蛋2個を順にのせる。",
      "温かいオリーブオイルソースをかけ、海塩小さじ1/3、黒胡椒小さじ1/4、辣椒碎を少々振り、温かいうちに供する。"
    ],
    ko: [
      "歐包 2份를 가로로 잘라 단면에 버터를 살짝 바르고, 180°C 오븐에서 5~7분 굽혀 표면이 금색으로 바삭하게 만듭니다.",
      "팬을 중불로 달군 뒤 올리브 오일 1/2큰술과 버터를 조금 넣고 奶油炒菇 120g을 볶아 물기가 나오면 약불로 졸인 다음 바다소금 1/6작은술과 후추를 조금 뿌립니다. 보온합니다.",
      "같은 팬에 口水雞 180g을 넣고 중약불로 빠르게 데운 뒤 辣椒碎 1/2작은술을 넣어 매운 기름이 고루 묻게 합니다. 보온합니다.",
      "냄비에 물을 끓이고 식초 1큰술을 넣은 뒤 약불로 줄이고 숟가락으로 소용돌이를 만든 다음 달걀 2개를 넣어 약 3분 수란합니다(흰자가 굳고 노른자가 흐르게). 물기를 뺍니다.",
      "다른 작은 팬에 약불로 남은 올리브 오일 1/2큰술을 데워 뿌릴 소스로 만듭니다.",
      "구운 歐包 두 조각을 접시에 나눠 담고 奶油炒菇, 口水雞, 水波蛋 2개를 순서대로 올립니다.",
      "따뜻한 올리브 오일 소스를 뿌리고 바다소금 1/3작은술, 후추 1/4작은술, 辣椒碎을 조금 더 뿌려 뜨거울 때 냅니다."
    ]
  },
  "sf-smoked-salmon-mushroom-eggs-benedict": {
    en: [
      "Slice 2 baguette rolls crosswise; butter the cut sides and bake at 180°C / 350°F 5–7 minutes until golden and lightly crisp.",
      "Heat a skillet over medium with 1/2 tbsp olive oil and a little butter; add 120 g sautéed mushrooms; stir-fry until they release moisture, then reduce heat until dry; sprinkle 1/6 tsp sea salt and a little cracked black pepper; keep warm.",
      "Bring 120 g smoked salmon to room temperature from the fridge; roll into bite-size portions; drain capers to taste.",
      "Bring a saucepan of water to a boil with 1 tbsp white vinegar; reduce heat; stir a gentle whirlpool with a spoon; crack in 2 eggs and poach over low heat about 3 minutes until whites set and yolks runny; drain well.",
      "In a separate small pan over low heat, gently warm the remaining 1/2 tbsp olive oil into a warm drizzling sauce.",
      "Divide toasted baguette on plates; layer sautéed mushrooms, smoked salmon, and 2 poached eggs on each; garnish with capers to taste.",
      "Drizzle warm olive oil sauce; sprinkle 1/3 tsp sea salt and 1/4 tsp cracked black pepper; serve hot."
    ],
    ja: [
      "歐包2份を横切りにし、切り口にバターを薄く塗り、180℃のオーブンで5～7分焼いて表面をきつね色に軽くカリカリにする。",
      "フライパンを中火に熱し、オリーブオイル大さじ1/2とバターを少し加え、奶油炒菇120gを炒め、水分が出たら弱火で煮詰め、海塩小さじ1/6と黒胡椒を少々振る。温めておく。",
      "燻鮭120gを冷蔵から取り出し室温に戻し、食べやすい大きさに巻く。酸豆適量は水気を切っておく。",
      "小鍋で湯を沸かし酢大さじ1を加え、弱火にしてスプーンで渦を作り、卵2個を割り入れ約3分ポーチする（白身が固まり黄身がとろり）。水気を切る。",
      "別の小鍋で弱火、残りのオリーブオイル大さじ1/2を温め、かけるソースにする。",
      "焼いた歐包2枚を皿に分け、奶油炒菇、燻鮭、水波蛋2個を順にのせ、酸豆適量を添える。",
      "温かいオリーブオイルソースをかけ、海塩小さじ1/3と黒胡椒小さじ1/4を振り、温かいうちに供する。"
    ],
    ko: [
      "歐包 2份를 가로로 잘라 단면에 버터를 살짝 바르고, 180°C 오븐에서 5~7분 굽혀 표면이 금색으로 바삭하게 만듭니다.",
      "팬을 중불로 달군 뒤 올리브 오일 1/2큰술과 버터를 조금 넣고 奶油炒菇 120g을 볶아 물기가 나오면 약불로 졸인 다음 바다소금 1/6작은술과 후추를 조금 뿌립니다. 보온합니다.",
      "燻鮭 120g을 냉장에서 꺼내 실온에 두고 한입 크기로 말아 둡니다. 酸豆 적당량은 물기를 뺍니다.",
      "냄비에 물을 끓이고 식초 1큰술을 넣은 뒤 약불로 줄이고 숟가락으로 소용돌이를 만든 다음 달걀 2개를 넣어 약 3분 수란합니다(흰자가 굳고 노른자가 흐르게). 물기를 뺍니다.",
      "다른 작은 팬에 약불로 남은 올리브 오일 1/2큰술을 데워 뿌릴 소스로 만듭니다.",
      "구운 歐包 두 조각을 접시에 나눠 담고 奶油炒菇, 燻鮭, 水波蛋 2개를 순서대로 올리고 酸豆 적당량을 곁들입니다.",
      "따뜻한 올리브 오일 소스를 뿌리고 바다소금 1/3작은술과 후추 1/4작은술을 뿌려 뜨거울 때 냅니다."
    ]
  },
  "sf-mushroom-cheese-omelette": {
    en: [
      "Beat 3 eggs for the omelette with 1/3 tsp sea salt, 1/4 tsp cracked black pepper, and a little cream; prep 120 g sautéed mushrooms, 40 g mixed cheese, and 2 baguette rolls.",
      "Heat a skillet over medium with a little butter; cook sautéed mushrooms until they release moisture, then reduce heat until dry; keep warm.",
      "Split and butter 2 baguette rolls; bake at 180°C / 350°F 5 minutes until lightly golden, or toast both sides in a dry skillet over low heat.",
      "Reheat the skillet to medium; melt butter; pour in the eggs; stir in circles with a spatula until half-set and the bottom lightly firms.",
      "Spread sautéed mushrooms and 40 g mixed cheese in the center; fold carefully into a half-moon with the spatula.",
      "Cover and cook over low heat 30 seconds until cheese fully melts and the center stays moist; check the fold is cooked through.",
      "Plate the omelette and toasted baguette separately; serve hot."
    ],
    ja: [
      "歐姆蕾用の卵3個を溶き、海塩小さじ1/3、黒胡椒小さじ1/4と生クリーム少々を加えて混ぜる。奶油炒菇120g、綜合起司40g、歐包2份を用意する。",
      "フライパンを中火に熱し、バターを少し加え、奶油炒菇を炒め、水分が出たら弱火で煮詰める。温めておく。",
      "歐包2份を横切りにしてバターを塗り、180℃のオーブンで5分焼いて軽く焦げ色をつける（または弱火のフライパンで両面を焼く）。",
      "フライパンを再度中火に熱し、バターを溶かして卵液を流し入れ、ヘラで素早く円を描くように混ぜ、半熟で底が軽く固まるまで炒める。",
      "炒めたきのこと綜合起司40gを卵の中央にのせ、ヘラで慎重に半円形に折りたたむ。",
      "弱火で蓋をして30秒、チーズが完全に溶け中心がしっとりするまで加熱し、折り目が火が通っていることを確認する。",
      "歐姆蕾と焼いた歐包を別々に盛り、温かいうちに供する。"
    ],
    ko: [
      "歐姆蕾용 달걀 3개를 풀고 바다소금 1/3작은술, 후추 1/4작은술과 생크림을 조금 넣어 섞습니다. 奶油炒菇 120g, 綜合起司 40g, 歐包 2份를 준비합니다.",
      "팬을 중불로 달군 뒤 버터를 조금 넣고 奶油炒菇을 볶아 물기가 나오면 약불로 졸입니다. 보온합니다.",
      "歐包 2份를 가로로 잘라 버터를 바르고 180°C 오븐에서 5분 굽혀 살짝 노릇하게 하거나 약불 팬에서 양면을 굽습니다.",
      "팬을 다시 중불로 달군 뒤 버터를 녹이고 달걀물을 부어 주걱으로 빠르게 원을 그리며 저어 반쯤 익고 바닥이 살짝 굳을 때까지 합니다.",
      "볶은 버섯과 綜合起司 40g을 달걀 중앙에 올리고 주걱으로 조심스럽게 반달 모양으로 접습니다.",
      "약불에 뚜껑을 덮고 30초간 치즈가 완전히 녹고 가운데는 촉촉할 때까지 익힌 뒤 접힌 부분이 익었는지 확인합니다.",
      "歐姆蕾와 구운 歐包를 따로 담아 뜨거울 때 냅니다."
    ]
  },
  "sf-supreme-cheese-omelette": {
    en: [
      "Beat 3 eggs for the omelette with 1/3 tsp sea salt, 1/4 tsp cracked black pepper, and a little cream; prep ham to taste, 100 g corn, 40 g mixed cheese, 250 g fried potatoes, and 2 baguette rolls.",
      "Heat a skillet over medium with 1/2 tbsp olive oil; stir-fry ham and corn 2 minutes until fragrant; keep warm.",
      "In another skillet, fry 250 g potatoes over medium until golden and crisp; season lightly with salt and pepper; keep warm. Split and butter baguette rolls; bake until lightly golden.",
      "Reheat the skillet to medium; melt butter; pour in the eggs; stir in circles with a spatula until half-set.",
      "Spread ham-corn mixture and 40 g mixed cheese in the center; fold into a half-moon with the spatula.",
      "Cover and cook over low heat 30 seconds until cheese melts and the center stays moist; check the fold is cooked through.",
      "On a large round plate, arrange the omelette, fried potatoes, and baguette; serve hot."
    ],
    ja: [
      "歐姆蕾用の卵3個を溶き、海塩小さじ1/3、黒胡椒小さじ1/4と生クリーム少々を加えて混ぜる。火腿適量、玉米100g、綜合起司40g、炒薯250g、歐包2份を用意する。",
      "フライパンを中火に熱し、オリーブオイル大さじ1/2で火腿と玉米を2分炒めて香りを出す。温めておく。",
      "別のフライパンで炒薯250gを中火で表面がきつね色になるまで焼き、塩と胡椒を少々振る。温めておく。歐包2份は横切りにしてバターを塗り、軽く焦げ色がつくまで焼く。",
      "フライパンを再度中火に熱し、バターを溶かして卵液を流し入れ、ヘラで素早く円を描くように混ぜ、半熟になるまで炒める。",
      "火腿と玉米、綜合起司40gを卵の中央にのせ、ヘラで半円形に折りたたむ。",
      "弱火で蓋をして30秒、チーズが溶け中心がしっとりするまで加熱し、折り目が火が通っていることを確認する。",
      "大きな丸皿に歐姆蕾、炒薯、歐包を分けて盛り、温かいうちに供する。"
    ],
    ko: [
      "歐姆蕾용 달걀 3개를 풀고 바다소금 1/3작은술, 후추 1/4작은술과 생크림을 조금 넣어 섞습니다. 火腿 적당량, 玉米 100g, 綜合起司 40g, 炒薯 250g, 歐包 2份를 준비합니다.",
      "팬을 중불로 달군 뒤 올리브 오일 1/2큰술로 火腿과 玉米를 2분 볶아 향을 냅니다. 보온합니다.",
      "다른 팬에서 炒薯 250g을 중불로 겉이 금색으로 바삭해질 때까지 굽고 소금과 후추를 조금 뿌립니다. 보온합니다. 歐包 2份는 가로로 잘라 버터를 바르고 살짝 노릇하게 굽습니다.",
      "팬을 다시 중불로 달군 뒤 버터를 녹이고 달걀물을 부어 주걱으로 빠르게 원을 그리며 저어 반쯤 익을 때까지 합니다.",
      "火腿과 玉米, 綜合起司 40g을 달걀 중앙에 올리고 주걱으로 반달 모양으로 접습니다.",
      "약불에 뚜껑을 덮고 30초간 치즈가 녹고 가운데는 촉촉할 때까지 익힌 뒤 접힌 부분이 익었는지 확인합니다.",
      "큰 원형 접시에 歐姆蕾, 炒薯, 歐包를 나눠 담아 뜨거울 때 냅니다."
    ]
  },
  "sf-worcester-meat-sauce-omelette": {
    en: [
      "Beat 3 eggs for the omelette with 1/3 tsp sea salt, 1/4 tsp cracked black pepper, and a little cream; prep Worcestershire meat sauce to taste, 40 g mixed cheese, 250 g fried potatoes, and 2 baguette rolls.",
      "Heat a skillet over medium with 1/2 tbsp olive oil; add Worcestershire meat sauce to taste; cook until slightly reduced and fragrant; keep warm.",
      "In another skillet, fry 250 g potatoes over medium until golden and crisp; season lightly with salt and pepper. Split and butter baguette rolls; bake until lightly golden.",
      "Reheat the skillet to medium; melt butter; pour in the eggs; stir in circles with a spatula until half-set.",
      "Spread meat sauce and 40 g mixed cheese in the center; fold into a half-moon with the spatula.",
      "Cover and cook over low heat 30 seconds until cheese melts and the center stays moist; check the fold is cooked through.",
      "On a large round plate, arrange the omelette, fried potatoes, and baguette; serve hot."
    ],
    ja: [
      "歐姆蕾用の卵3個を溶き、海塩小さじ1/3、黒胡椒小さじ1/4と生クリーム少々を加えて混ぜる。烏斯特肉醬適量、綜合起司40g、炒薯250g、歐包2份を用意する。",
      "フライパンを中火に熱し、オリーブオイル大さじ1/2で烏斯特肉醬適量を入れ、少し煮詰めて香りを出す。温めておく。",
      "別のフライパンで炒薯250gを中火で表面がきつね色になるまで焼き、塩と胡椒を少々振る。歐包2份は横切りにしてバターを塗り、軽く焦げ色がつくまで焼く。",
      "フライパンを再度中火に熱し、バターを溶かして卵液を流し入れ、ヘラで素早く円を描くように混ぜ、半熟になるまで炒める。",
      "肉醬と綜合起司40gを卵の中央にのせ、ヘラで半円形に折りたたむ。",
      "弱火で蓋をして30秒、チーズが溶け中心がしっとりするまで加熱し、折り目が火が通っていることを確認する。",
      "大きな丸皿に歐姆蕾、炒薯、歐包を分けて盛り、温かいうちに供する。"
    ],
    ko: [
      "歐姆蕾용 달걀 3개를 풀고 바다소금 1/3작은술, 후추 1/4작은술과 생크림을 조금 넣어 섞습니다. 烏斯特肉醬 적당량, 綜合起司 40g, 炒薯 250g, 歐包 2份를 준비합니다.",
      "팬을 중불로 달군 뒤 올리브 오일 1/2큰술로 烏斯特肉醬 적당량을 넣어 살짝 졸여 향을 냅니다. 보온합니다.",
      "다른 팬에서 炒薯 250g을 중불로 겉이 금색으로 바삭해질 때까지 굽고 소금과 후추를 조금 뿌립니다. 歐包 2份는 가로로 잘라 버터를 바르고 살짝 노릇하게 굽습니다.",
      "팬을 다시 중불로 달군 뒤 버터를 녹이고 달걀물을 부어 주걱으로 빠르게 원을 그리며 저어 반쯤 익을 때까지 합니다.",
      "肉醬과 綜合起司 40g을 달걀 중앙에 올리고 주걱으로 반달 모양으로 접습니다.",
      "약불에 뚜껑을 덮고 30초간 치즈가 녹고 가운데는 촉촉할 때까지 익힌 뒤 접힌 부분이 익었는지 확인합니다.",
      "큰 원형 접시에 歐姆蕾, 炒薯, 歐包를 나눠 담아 뜨거울 때 냅니다."
    ]
  },
  "sf-orange-danish-mushroom-poached-potato": {
    en: [
      "Arrange 2 orange Danish pastries on a baking sheet; bake at 180°C / 350°F 3–5 minutes until crisp outside and soft inside; portion 2 tbsp cheese sauce into a small bowl.",
      "Heat a skillet over medium with 1/2 tbsp olive oil; stir-fry 120 g mushrooms until they release moisture, then reduce heat until dry; sprinkle 1/6 tsp sea salt and a little cracked black pepper; keep warm.",
      "In another skillet, fry 250 g potatoes over medium until golden and crisp; keep warm.",
      "Bring a saucepan of water to a boil with 1 tbsp white vinegar; reduce heat; stir a gentle whirlpool with a spoon; crack in 2 eggs and poach over low heat about 3 minutes until whites set and yolks runny; drain well.",
      "On a large plate, arrange toasted orange Danish, mushrooms, fried potatoes, and 2 poached eggs.",
      "Drizzle 2 tbsp cheese sauce and 1 tbsp olive oil over the components; sprinkle 1/3 tsp sea salt and 1/4 tsp cracked black pepper.",
      "Check the sauce is evenly distributed; serve hot."
    ],
    ja: [
      "橙香丹麥2份を天板に並べ、180℃のオーブンで3～5分焼いて外はサクッと中はふんわりにする。起司醬大さじ2を小鉢に盛る。",
      "フライパンを中火に熱し、オリーブオイル大さじ1/2で炒菇120gを炒め、水分が出たら弱火で煮詰め、海塩小さじ1/6と黒胡椒を少々振る。温めておく。",
      "別のフライパンで炒薯250gを中火で表面がきつね色になるまで焼く。温めておく。",
      "小鍋で湯を沸かし酢大さじ1を加え、弱火にしてスプーンで渦を作り、卵2個を割り入れ約3分ポーチする（白身が固まり黄身がとろり）。水気を切る。",
      "大きな皿に焼いた橙香丹麥、炒菇、炒薯、水波蛋2個を分けて盛る。",
      "具材に起司醬大さじ2とオリーブオイル大さじ1をかけ、海塩小さじ1/3と黒胡椒小さじ1/4を振る。",
      "ソースが均一にかかっていることを確認し、温かいうちに供する。"
    ],
    ko: [
      "橙香丹麥 2份를 베이킹 시트에 올리고 180°C 오븐에서 3~5분 굽혀 겉은 바삭하고 속은 부드럽게 만듭니다. 起司醬 2큰술을 작은 그릇에 담아 둡니다.",
      "팬을 중불로 달군 뒤 올리브 오일 1/2큰술로 炒菇 120g을 볶아 물기가 나오면 약불로 졸인 다음 바다소금 1/6작은술과 후추를 조금 뿌립니다. 보온합니다.",
      "다른 팬에서 炒薯 250g을 중불로 겉이 금색으로 바삭해질 때까지 굽습니다. 보온합니다.",
      "냄비에 물을 끓이고 식초 1큰술을 넣은 뒤 약불로 줄이고 숟가락으로 소용돌이를 만든 다음 달걀 2개를 넣어 약 3분 수란합니다(흰자가 굳고 노른자가 흐르게). 물기를 뺍니다.",
      "큰 접시에 구운 橙香丹麥, 炒菇, 炒薯, 水波蛋 2개를 나눠 담습니다.",
      "재료 위에 起司醬 2큰술과 올리브 오일 1큰술을 뿌리고 바다소금 1/3작은술과 후추 1/4작은술을 뿌립니다.",
      "소스가 고르게 묻었는지 확인한 뒤 뜨거울 때 냅니다."
    ]
  },
  "sf-orange-danish-poached-seafood-potato": {
    en: [
      "Arrange 2 orange Danish pastries on a baking sheet; bake at 180°C / 350°F 3–5 minutes until crisp outside and soft inside.",
      "Pat dry 180 g seafood with paper towels; heat a skillet over medium with 1/2 tbsp olive oil; sear until the surface changes color and centers are cooked through; keep warm.",
      "In the same skillet with a little more oil, stir-fry 120 g mushrooms until they release moisture, then reduce heat until dry; sprinkle 1/6 tsp sea salt and a little cracked black pepper; keep warm.",
      "In another skillet, fry 250 g potatoes over medium until golden and crisp; keep warm.",
      "Bring a saucepan of water to a boil with 1 tbsp white vinegar; reduce heat; stir a gentle whirlpool with a spoon; crack in 2 eggs and poach over low heat about 3 minutes until whites set and yolks runny; drain well.",
      "On a large plate, arrange toasted orange Danish, seafood, mushrooms, fried potatoes, and 2 poached eggs.",
      "Drizzle 1 tbsp olive oil; sprinkle 1/3 tsp sea salt and 1/4 tsp cracked black pepper; serve hot."
    ],
    ja: [
      "橙香丹麥2份を天板に並べ、180℃のオーブンで3～5分焼いて外はサクッと中はふんわりにする。",
      "海鮮180gの水分をキッチンペーパーで拭き取る。フライパンを中火に熱し、オリーブオイル大さじ1/2で表面の色が変わり中心まで火が通るまで焼く。温めておく。",
      "同じ鍋に油を少し足し、炒菇120gを炒め、水分が出たら弱火で煮詰め、海塩小さじ1/6と黒胡椒を少々振る。温めておく。",
      "別のフライパンで炒薯250gを中火で表面がきつね色になるまで焼く。温めておく。",
      "小鍋で湯を沸かし酢大さじ1を加え、弱火にしてスプーンで渦を作り、卵2個を割り入れ約3分ポーチする（白身が固まり黄身がとろり）。水気を切る。",
      "大きな皿に焼いた橙香丹麥、海鮮、炒菇、炒薯、水波蛋2個を分けて盛る。",
      "オリーブオイル大さじ1をかけ、海塩小さじ1/3と黒胡椒小さじ1/4を振り、温かいうちに供する。"
    ],
    ko: [
      "橙香丹麥 2份를 베이킹 시트에 올리고 180°C 오븐에서 3~5분 굽혀 겉은 바삭하고 속은 부드럽게 만듭니다.",
      "海鮮 180g의 수분을 키친타월로 닦습니다. 팬을 중불로 달군 뒤 올리브 오일 1/2큰술로 겉색이 변하고 속까지 익을 때까지 굽습니다. 보온합니다.",
      "같은 팬에 기름을 조금 더 넣고 炒菇 120g을 볶아 물기가 나오면 약불로 졸인 다음 바다소금 1/6작은술과 후추를 조금 뿌립니다. 보온합니다.",
      "다른 팬에서 炒薯 250g을 중불로 겉이 금색으로 바삭해질 때까지 굽습니다. 보온합니다.",
      "냄비에 물을 끓이고 식초 1큰술을 넣은 뒤 약불로 줄이고 숟가락으로 소용돌이를 만든 다음 달걀 2개를 넣어 약 3분 수란합니다(흰자가 굳고 노른자가 흐르게). 물기를 뺍니다.",
      "큰 접시에 구운 橙香丹麥, 海鮮, 炒菇, 炒薯, 水波蛋 2개를 나눠 담습니다.",
      "올리브 오일 1큰술을 뿌리고 바다소금 1/3작은술과 후추 1/4작은술을 뿌려 뜨거울 때 냅니다."
    ]
  },
  "sf-orange-danish-sous-vide-steak": {
    en: [
      "Arrange 2 orange Danish pastries on a baking sheet; bake at 180°C / 350°F 3–5 minutes until crisp outside and soft inside; portion 2 tbsp honey mustard into a small bowl.",
      "Pat dry 220 g sous-vide steak with paper towels; sprinkle 1/6 tsp sea salt and a little cracked black pepper; heat a skillet over high with 1/2 tbsp olive oil; sear 1–1.5 minutes per side until charred outside; rest 3 minutes and slice.",
      "In another skillet, fry 250 g potatoes over medium until golden and crisp; keep warm.",
      "Heat a skillet over medium with a little butter; crack in 2 eggs; cover and fry 2–3 minutes until whites set and yolks runny (sunny-side up); keep warm.",
      "On a large plate, arrange toasted orange Danish, sliced steak, fried potatoes, and 2 sunny-side-up eggs.",
      "Drizzle 2 tbsp honey mustard over the steak and eggs, then 1 tbsp olive oil; sprinkle 1/3 tsp sea salt and 1/4 tsp cracked black pepper.",
      "Check the sauce is evenly distributed; serve hot."
    ],
    ja: [
      "橙香丹麥2份を天板に並べ、180℃のオーブンで3～5分焼いて外はサクッと中はふんわりにする。蜂蜜芥末大さじ2を小鉢に盛る。",
      "舒肥牛排220gの水分をキッチンペーパーで拭き取り、海塩小さじ1/6と黒胡椒を少々振る。フライパンを強火に熱し、オリーブオイル大さじ1/2で片面1～1.5分ずつ焼き表面を焦げ目がつくまで焼く。3分休ませてから切る。",
      "別のフライパンで炒薯250gを中火で表面がきつね色になるまで焼く。温めておく。",
      "フライパンを中火に熱し、バターを少し加え、荷包蛋2個を割り入れ、蓋をして2～3分、白身が固まり黄身がとろり（サニーサイドアップ）になるまで焼く。温めておく。",
      "大きな皿に焼いた橙香丹麥、舒肥牛排、炒薯、荷包蛋2個を分けて盛る。",
      "牛排と卵に蜂蜜芥末大さじ2をかけ、さらにオリーブオイル大さじ1、海塩小さじ1/3、黒胡椒小さじ1/4を振る。",
      "ソースが均一にかかっていることを確認し、温かいうちに供する。"
    ],
    ko: [
      "橙香丹麥 2份를 베이킹 시트에 올리고 180°C 오븐에서 3~5분 굽혀 겉은 바삭하고 속은 부드럽게 만듭니다. 蜂蜜芥末 2큰술을 작은 그릇에 담아 둡니다.",
      "舒肥牛排 220g의 수분을 키친타월로 닦고 바다소금 1/6작은술과 후추를 조금 뿌립니다. 팬을 강불로 달군 뒤 올리브 오일 1/2큰술로 양면 각 1~1.5분 굽혀 겉이 탄 색이 나게 합니다. 3분 쉰 뒤 썹니다.",
      "다른 팬에서 炒薯 250g을 중불로 겉이 금색으로 바삭해질 때까지 굽습니다. 보온합니다.",
      "팬을 중불로 달군 뒤 버터를 조금 넣고 荷包蛋 2개를 깨 넣어 뚜껑을 덮고 2~3분간 흰자가 굳고 노른자가 흐르게(써니사이드업) 굽습니다. 보온합니다.",
      "큰 접시에 구운 橙香丹麥, 舒肥牛排, 炒薯, 荷包蛋 2개를 나눠 담습니다.",
      "牛排와 달걀에 蜂蜜芥末 2큰술을 뿌린 뒤 올리브 오일 1큰술을 더하고 바다소금 1/3작은술과 후추 1/4작은술을 뿌립니다.",
      "소스가 고르게 묻었는지 확인한 뒤 뜨거울 때 냅니다."
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

function yamlListEnd(fm, key) {
  const marker = `${key}:`;
  const start = fm.indexOf(marker);
  if (start < 0) return -1;
  let pos = start + marker.length;
  while (pos < fm.length && fm[pos] !== "\n") pos++;
  pos++;

  const lines = fm.slice(pos).split("\n");
  let consumed = 0;
  let inItem = false;
  for (const line of lines) {
    if (line.startsWith("- ")) {
      inItem = true;
      consumed += line.length + 1;
      continue;
    }
    if (inItem && (line.startsWith("  ") || line === "")) {
      consumed += line.length + 1;
      continue;
    }
    break;
  }
  return pos + consumed;
}

function parseYamlList(fm, key) {
  const marker = `${key}:`;
  const start = fm.indexOf(marker);
  if (start < 0) return [];
  const end = yamlListEnd(fm, key);
  const block = fm.slice(start + marker.length + 1, end);
  const items = [];
  let cur = null;
  for (const line of block.split("\n")) {
    if (line.startsWith("- name:")) {
      if (cur) items.push(cur);
      cur = { name: line.slice(7).trim() };
    } else if (cur && line.startsWith("  amount:")) {
      cur.amount = line.split(":").slice(1).join(":").trim().replace(/^['"]|['"]$/g, "");
    } else if (cur && line.startsWith("  unit:")) {
      cur.unit = line.split(":").slice(1).join(":").trim();
    } else if (cur && line.startsWith("  isCore:")) {
      cur.isCore = line.split(":")[1].trim() === "true";
    }
  }
  if (cur) items.push(cur);
  return items;
}

function formatYamlList(key, items) {
  const body = items
    .map((item) => {
      const core = item.isCore !== undefined ? `\n  isCore: ${item.isCore}` : "";
      const amount =
        item.amount === "適量" || /^\d/.test(item.amount) || item.amount.includes("/")
          ? `"${item.amount}"`
          : item.amount;
      return `- name: ${item.name}\n  amount: ${amount}\n  unit: ${item.unit}${core}`;
    })
    .join("\n");
  return `${key}:\n${body}`;
}

function replaceYamlList(fm, key, items) {
  const marker = `${key}:`;
  const start = fm.indexOf(marker);
  if (start < 0) return fm;
  const end = yamlListEnd(fm, key);
  const block = formatYamlList(key, items);
  return fm.slice(0, start) + block + "\n" + fm.slice(end);
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

function countSteps(fm) {
  const lines = fm.split("\n");
  const start = lines.findIndex((l) => l === "steps:");
  let count = 0;
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (l.match(/^[a-zA-Z]/)) break;
    if (l.startsWith("- ") || l.startsWith('- "')) count++;
  }
  return count;
}

const updatedFiles = [];

for (const slug of SLUGS) {
  const zhRaw = readFileSync(join(ROOT, "src/content/recipes", `${slug}.md`), "utf8");
  const { fm: zhFm } = splitMarkdown(zhRaw);
  const zhSteps = countSteps(zhFm);
  const zhIngredients = parseYamlList(zhFm, "ingredients");
  const zhSeasonings = parseYamlList(zhFm, "seasonings");

  for (const locale of ["en", "ja", "ko"]) {
    const path = join(ROOT, localeDirs[locale], `${slug}.md`);
    const raw = readFileSync(path, "utf8");
    const { fm, body } = splitMarkdown(raw);
    const steps = STEPS[slug][locale];
    if (steps.length !== zhSteps) {
      throw new Error(`${slug} ${locale}: step count ${steps.length} != zh ${zhSteps}`);
    }
    let nextFm = replaceStepsBlock(fm, steps, locale);
    nextFm = replaceYamlList(nextFm, "ingredients", zhIngredients);
    nextFm = replaceYamlList(nextFm, "seasonings", zhSeasonings);
    nextFm = nextFm.replace(/^updatedAt:.*$/m, `updatedAt: "${UPDATED}"`);
    const trimmedBody = body.trimStart();
    const next = `---\n${nextFm}\n---\n\n${trimmedBody}`;
    if (next !== raw.replace(/\r\n/g, "\n")) {
      writeFileSync(path, next, "utf8");
      updatedFiles.push(path);
    }
  }
}

console.log(`Updated ${updatedFiles.length} files`);
