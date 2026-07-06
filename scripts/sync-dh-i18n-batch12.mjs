#!/usr/bin/env node
/**
 * Sync en/ja/ko for 12 dh-* Dubu House recipes to match zh step counts and ingredients.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const UPDATED = "2026-07-06";

const SLUGS = [
  "dh-clams-shrimp-soondubu",
  "dh-seafood-soondubu",
  "dh-combo-soondubu",
  "dh-plant-based-fried-chicken-with-mushroom-soondubu",
  "dh-cheese-stuffed-rice-cake-soondubu",
  "dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed",
  "dh-ginseng-chicken-clay-pot",
  "dh-ginseng-chicken-hot-pot",
  "dh-ox-bone-soup",
  "dh-bibimbap",
  "dh-classic-stone-pot-rice",
  "dh-duck-jerky-stone-pot-rice"
];

const STEPS = {
  "dh-clams-shrimp-soondubu": {
    en: [
      "Prep: purge clams 200 g in salted water 30 minutes, then rinse; peel 6 shrimp leaving tails on and devein; slice ½ onion into strips and cut 1 scallion into sections; portion 1 tbsp minced garlic, 1 tbsp soy sauce, 1 tbsp Korean sesame oil, and a pinch of salt separately.",
      "Preheat a Korean spicy stew pot or thick-bottomed small pot over medium heat for 1 minute. Add 1 tbsp Korean sesame oil, then sauté 1 tbsp minced garlic and onion strips until translucent and fragrant (about 2 minutes).",
      "Add clams 200 g, cover, and steam over high heat 2 minutes until shells open. Uncover, add 6 shrimp, and stir-fry quickly until pink and curled (about 1 minute).",
      "Pour in 400 ml broth and 1 tbsp soy sauce. Bring to a boil over high heat, then reduce to medium-low. Season with a pinch of salt and simmer 5–8 minutes until the broth is sweet and all clams are open.",
      "Lower the heat. Scoop 1 pack soft tofu in large chunks into the center of the pot. Gently push along the edge with a spoon so broth flows over the tofu without vigorous stirring (simmer 2 more minutes until piping hot).",
      "Before turning off the heat, crack in 1 egg and wait until the white sets and the yolk is still soft-set. Top with scallions and sesame seeds and serve boiling hot in the pot."
    ],
    ja: [
      "下準備：アサリ 200gを塩水で30分吐かせ洗う。エビ 6尾は殻をむき尾を残し、背ワタを取る。玉ねぎ 1/2個は千切り、青ネギ 1本は小口切り。にんにくみじん切り 大さじ1、醤油 大さじ1、ごま油 大さじ1、塩 少々をそれぞれ用意する。",
      "韓国鍋または厚手の小鍋を中火で1分予熱し、ごま油 大さじ1を入れ、にんにくみじん切り 大さじ1と玉ねぎを透明になるまで炒める（約2分）。",
      "アサリ 200gを入れ、強火で蓋をして2分蒸す。蓋を開け、エビ 6尾を加え、身がピンクに丸まるまでさっと炒める（約1分）。",
      "出汁 400mlと醤油 大さじ1を注ぎ、強火で沸騰させてから中弱火に。塩 少々で味を整え、5～8分煮込み、スープが甘くアサリが開くまで。",
      "弱火にし、純豆腐 1パックを大きめにすくって鍋中央へ。スプーンで鍋縁を軽く押して汁を通し、強く混ぜない（さらに2分、熱々まで）。",
      "火を止める直前に卵 1個を割り入れ、白身が固まり黄身が半熟になったら、ネギとごまを振り、熱々のまま鍋ごと提供する。"
    ],
    ko: [
      "준비: 바지락 200g을 소금물에 30분 토사한 뒤 씻는다. 새우 6마리는 껍질을 벗기고 꼬리를 남긴 채 내장을 제거한다. 양파 1/2개는 채 썰고, 대파 1대는 어슷썰기한다. 다진 마늘 1큰술, 간장 1큰술, 참기름 1큰술, 소금 약간을 각각 준비한다.",
      "한국식 냄비나 두꺼운 바닥 작은 냄비를 중불로 1분 예열한 뒤 참기름 1큰술을 넣고, 다진 마늘 1큰술과 양파를 투명해질 때까지 볶는다(약 2분).",
      "바지락 200g을 넣고 강불에 뚜껑을 닫아 2분 찐다. 뚜껑을 열고 새우 6마리를 넣어 분홍색으로 말릴 때까지 빠르게 볶는다(약 1분).",
      "육수 400ml와 간장 1큰술을 붓고 강불로 끓인 뒤 중약불로 줄인다. 소금 약간으로 간을 맞추고 5~8분 끓여 국물이 달고 바지락이 모두 벌어질 때까지 한다.",
      "약불로 줄이고 순두부 1팩을 큼직하게 떠서 냄비 중앙에 넣는다. 숟가락으로 가장자리를 가볍게 밀어 국물이 두부에 흐르게 하고 세게 젓지 않는다(2분 더 끓여 뜨겁게).",
      "불을 끄기 직전 달걀 1개를 풀어 넣고 흰자가 익고 노른자가 반숙이 되면 파와 참깨를 뿌려 뜨거울 때 냄비째 낸다."
    ]
  },
  "dh-seafood-soondubu": {
    en: [
      "Prep: purge clams 200 g and rinse; peel 6 shrimp leaving tails on; clean squid 150 g, remove innards, rinse, and cut into rings; slice ½ onion into strips and cut 1 scallion into sections; portion 1 tbsp minced garlic, 1.5 tbsp Korean chili paste (gochujang), 1 tbsp soy sauce, and 1 tbsp Korean sesame oil separately.",
      "Preheat a Korean spicy stew pot or thick-bottomed small pot over medium heat for 1 minute. Add 1 tbsp Korean sesame oil, sauté 1 tbsp minced garlic and onion strips until translucent, then add 1.5 tbsp gochujang and stir until fragrant and the oil turns red (about 1 minute; do not scorch).",
      "Add 6 shrimp and stir-fry over high heat until pink and curled (about 1–2 minutes) to lock in seafood flavor.",
      "Pour in 400 ml broth and 1 tbsp soy sauce. Bring to a boil over high heat, then reduce to medium-low. Add clams 200 g and squid 150 g, cover, and simmer 5–8 minutes until clams open and squid is cooked through.",
      "Lower the heat. Scoop 1 pack soft tofu in large chunks into the center of the pot. Gently push along the edge so broth flows over the tofu without vigorous stirring (simmer 2 more minutes until piping hot).",
      "Before turning off the heat, crack in 1 egg and wait until the white sets and the yolk is soft-set. Top with scallions and sesame seeds and serve boiling hot in the pot."
    ],
    ja: [
      "下準備：アサリ 200gを吐かせ洗う。エビ 6尾は殻をむき尾を残す。イカ 150gは内臓を取り洗い輪切りに。玉ねぎ 1/2個は千切り、青ネギ 1本は小口切り。にんにくみじん切り 大さじ1、コチュジャン 大さじ1.5、醤油 大さじ1、ごま油 大さじ1を分けて用意。",
      "韓国鍋または厚手の小鍋を中火で1分予熱し、ごま油 大さじ1を入れ、にんにくみじん切り 大さじ1と玉ねぎを炒め、コチュジャン 大さじ1.5を加えて香りと赤油が出るまで炒める（約1分、焦がさない）。",
      "エビ 6尾を入れ、強火で1～2分、ピンクに丸まるまでさっと炒め、旨みを閉じ込める。",
      "出汁 400mlと醤油 大さじ1を注ぎ、強火で沸騰させ中弱火に。アサリ 200gとイカ 150gを加え、蓋をして5～8分煮込み、アサリが開きイカに火が通るまで。",
      "弱火にし、純豆腐 1パックを大きめにすくって鍋中央へ。鍋縁を軽く押して汁を通し、強く混ぜない（さらに2分、熱々まで）。",
      "火を止める直前に卵 1個を割り入れ、白身が固まり黄身が半熟になったら、ネギとごまを振り、熱々のまま鍋ごと提供する。"
    ],
    ko: [
      "준비: 바지락 200g을 토사해 씻는다. 새우 6마리는 껍질을 벗기고 꼬리를 남긴다. 오징어 150g은 내장을 제거해 씻고 둥글게 썬다. 양파 1/2개는 채 썰고, 대파 1대는 어슷썰기한다. 다진 마늘 1큰술, 고추장 1.5큰술, 간장 1큰술, 참기름 1큰술을 따로 준비한다.",
      "한국식 냄비나 두꺼운 바닥 작은 냄비를 중불로 1분 예열한 뒤 참기름 1큰술을 넣고, 다진 마늘 1큰술과 양파를 볶은 다음 고추장 1.5큰술을 넣어 향과 붉은 기름이 나올 때까지 볶는다(약 1분, 태우지 않게).",
      "새우 6마리를 넣고 강불로 1~2분 볶아 분홍색으로 말릴 때까지 해산물 향을 가둔다.",
      "육수 400ml와 간장 1큰술을 붓고 강불로 끓인 뒤 중약불로 줄인다. 바지락 200g과 오징어 150g을 넣고 뚜껑을 닫아 5~8분 끓여 바지락이 벌어지고 오징어가 익을 때까지 한다.",
      "약불로 줄이고 순두부 1팩을 큼직하게 떠서 냄비 중앙에 넣는다. 가장자리를 가볍게 밀어 국물이 두부에 흐르게 하고 세게 젓지 않는다(2분 더 끓여 뜨겁게).",
      "불을 끄기 직전 달걀 1개를 풀어 넣고 흰자가 익고 노른자가 반숙이 되면 파와 참깨를 뿌려 뜨거울 때 냄비째 낸다."
    ]
  },
  "dh-combo-soondubu": {
    en: [
      "Prep: spread out beef slices 120 g; purge clams 200 g and rinse, peel 6 shrimp leaving tails on; slice ½ onion into strips and cut 1 scallion into sections; portion 1 tbsp minced garlic, 1.5 tbsp gochujang, 1 tbsp soy sauce, and 1 tbsp Korean sesame oil separately.",
      "Preheat a Korean spicy stew pot or thick-bottomed small pot over medium heat for 1 minute. Add 1 tbsp Korean sesame oil, sauté 1 tbsp minced garlic and onion strips until translucent, then add 1.5 tbsp gochujang and stir until fragrant and the oil turns red (about 1 minute; do not scorch).",
      "Add beef slices 120 g and stir-fry over high heat until the surface changes color and no red juices run (about 2–3 minutes) to lock in meat juices.",
      "Pour in 400 ml broth and 1 tbsp soy sauce. Bring to a boil over high heat, then reduce to medium-low. Add 6 shrimp and clams 200 g, cover, and simmer 5–8 minutes until seafood is cooked and clams open.",
      "Lower the heat. Scoop 1 pack soft tofu in large chunks into the center of the pot. Gently push along the edge so broth flows over the tofu without vigorous stirring (simmer 2 more minutes until piping hot).",
      "Before turning off the heat, crack in 1 egg and wait until the white sets and the yolk is soft-set. Top with scallions and sesame seeds and serve boiling hot in the pot."
    ],
    ja: [
      "下準備：牛肉薄切り 120gを広げる。アサリ 200gを吐かせ洗う。エビ 6尾は殻をむき尾を残す。玉ねぎ 1/2個は千切り、青ネギ 1本は小口切り。にんにくみじん切り 大さじ1、コチュジャン 大さじ1.5、醤油 大さじ1、ごま油 大さじ1を分けて用意。",
      "韓国鍋または厚手の小鍋を中火で1分予熱し、ごま油 大さじ1を入れ、にんにくみじん切り 大さじ1と玉ねぎを炒め、コチュジャン 大さじ1.5を加えて香りと赤油が出るまで炒める（約1分、焦がさない）。",
      "牛肉薄切り 120gを入れ、強火で2～3分、色が変わり赤い汁が出ないまでさっと炒め、肉汁を閉じ込める。",
      "出汁 400mlと醤油 大さじ1を注ぎ、強火で沸騰させ中弱火に。エビ 6尾とアサリ 200gを加え、蓋をして5～8分煮込み、海鮮に火が通りアサリが開くまで。",
      "弱火にし、純豆腐 1パックを大きめにすくって鍋中央へ。鍋縁を軽く押して汁を通し、強く混ぜない（さらに2分、熱々まで）。",
      "火を止める直前に卵 1個を割り入れ、白身が固まり黄身が半熟になったら、ネギとごまを振り、熱々のまま鍋ごと提供する。"
    ],
    ko: [
      "준비: 소고기 슬라이스 120g을 펼쳐 둔다. 바지락 200g을 토사해 씻고, 새우 6마리는 껍질을 벗기고 꼬리를 남긴다. 양파 1/2개는 채 썰고, 대파 1대는 어슷썰기한다. 다진 마늘 1큰술, 고추장 1.5큰술, 간장 1큰술, 참기름 1큰술을 따로 준비한다.",
      "한국식 냄비나 두꺼운 바닥 작은 냄비를 중불로 1분 예열한 뒤 참기름 1큰술을 넣고, 다진 마늘 1큰술과 양파를 볶은 다음 고추장 1.5큰술을 넣어 향과 붉은 기름이 나올 때까지 볶는다(약 1분, 태우지 않게).",
      "소고기 슬라이스 120g을 넣고 강불로 2~3분 볶아 표면 색이 변하고 붉은 육즙이 나오지 않을 때까지 고기 국물을 가둔다.",
      "육수 400ml와 간장 1큰술을 붓고 강불로 끓인 뒤 중약불로 줄인다. 새우 6마리와 바지락 200g을 넣고 뚜껑을 닫아 5~8분 끓여 해산물이 익고 바지락이 벌어질 때까지 한다.",
      "약불로 줄이고 순두부 1팩을 큼직하게 떠서 냄비 중앙에 넣는다. 가장자리를 가볍게 밀어 국물이 두부에 흐르게 하고 세게 젓지 않는다(2분 더 끓여 뜨겁게).",
      "불을 끄기 직전 달걀 1개를 풀어 넣고 흰자가 익고 노른자가 반숙이 되면 파와 참깨를 뿌려 뜨거울 때 냄비째 낸다."
    ]
  },
  "dh-plant-based-fried-chicken-with-mushroom-soondubu": {
    en: [
      "Prep: bring plant-based chicken nuggets 150 g to room temperature; remove stems from 3 shiitake mushrooms and cut into thick slices; slice ½ onion into strips and cut 1 scallion into sections; portion 1 tbsp minced garlic, 1.5 tbsp gochujang, 1 tbsp soy sauce, and 1 tbsp Korean sesame oil separately.",
      "Preheat a Korean spicy stew pot or thick-bottomed small pot over medium heat for 1 minute. Add 1 tbsp Korean sesame oil, sauté 1 tbsp minced garlic and onion strips until translucent, then add 1.5 tbsp gochujang and stir until fragrant and the oil turns red (about 1 minute; do not scorch).",
      "Add plant-based chicken nuggets 150 g and pan-fry over medium heat until golden and lightly crisp on the surface (about 3 minutes) to release aroma.",
      "Pour in 400 ml broth and 1 tbsp soy sauce. Bring to a boil over high heat, then reduce to medium-low. Add 3 shiitake mushrooms, cover, and simmer 5–8 minutes until mushrooms are tender and the broth is flavorful.",
      "Lower the heat. Scoop 1 pack soft tofu in large chunks into the center of the pot. Gently push along the edge so broth flows over the tofu without vigorous stirring (simmer 2 more minutes until piping hot).",
      "Before turning off the heat, crack in 1 egg and wait until the white sets and the yolk is soft-set. Top with scallions and sesame seeds and serve boiling hot in the pot."
    ],
    ja: [
      "下準備：植物肉チキン 150gを室温に戻す。しいたけ 3個は軸を取り厚切り。玉ねぎ 1/2個は千切り、青ネギ 1本は小口切り。にんにくみじん切り 大さじ1、コチュジャン 大さじ1.5、醤油 大さじ1、ごま油 大さじ1を分けて用意。",
      "韓国鍋または厚手の小鍋を中火で1分予熱し、ごま油 大さじ1を入れ、にんにくみじん切り 大さじ1と玉ねぎを炒め、コチュジャン 大さじ1.5を加えて香りと赤油が出るまで炒める（約1分、焦がさない）。",
      "植物肉チキン 150gを入れ、中火で表面がきつね色に軽く焦げるまで焼く（約3分）、香りを出す。",
      "出汁 400mlと醤油 大さじ1を注ぎ、強火で沸騰させ中弱火に。しいたけ 3個を加え、蓋をして5～8分煮込み、きのこに火が通りスープに味が染みるまで。",
      "弱火にし、純豆腐 1パックを大きめにすくって鍋中央へ。鍋縁を軽く押して汁を通し、強く混ぜない（さらに2分、熱々まで）。",
      "火を止める直前に卵 1個を割り入れ、白身が固まり黄身が半熟になったら、ネギとごまを振り、熱々のまま鍋ごと提供する。"
    ],
    ko: [
      "준비: 식물성 치킨 너겟 150g을 실온에 둔다. 표고버섯 3개는 기둥을 제거하고 두껍게 썬다. 양파 1/2개는 채 썰고, 대파 1대는 어슷썰기한다. 다진 마늘 1큰술, 고추장 1.5큰술, 간장 1큰술, 참기름 1큰술을 따로 준비한다.",
      "한국식 냄비나 두꺼운 바닥 작은 냄비를 중불로 1분 예열한 뒤 참기름 1큰술을 넣고, 다진 마늘 1큰술과 양파를 볶은 다음 고추장 1.5큰술을 넣어 향과 붉은 기름이 나올 때까지 볶는다(약 1분, 태우지 않게).",
      "식물성 치킨 너겟 150g을 넣고 중불로 표면이 노릇하고 살짝 바삭해질 때까지 굽는다(약 3분), 향을 낸다.",
      "육수 400ml와 간장 1큰술을 붓고 강불로 끓인 뒤 중약불로 줄인다. 표고버섯 3개를 넣고 뚜껑을 닫아 5~8분 끓여 버섯이 익고 국물에 맛이 배일 때까지 한다.",
      "약불로 줄이고 순두부 1팩을 큼직하게 떠서 냄비 중앙에 넣는다. 가장자리를 가볍게 밀어 국물이 두부에 흐르게 하고 세게 젓지 않는다(2분 더 끓여 뜨겁게).",
      "불을 끄기 직전 달걀 1개를 풀어 넣고 흰자가 익고 노른자가 반숙이 되면 파와 참깨를 뿌려 뜨거울 때 냄비째 낸다."
    ]
  },
  "dh-cheese-stuffed-rice-cake-soondubu": {
    en: [
      "Prep: if cheese-stuffed rice cakes 80 g are firm from the fridge, soak in warm water 10 minutes; slice ½ onion into strips and cut 1 scallion into sections; portion 1 tbsp minced garlic, 1.5 tbsp gochujang, 1 tbsp soy sauce, and 1 tbsp Korean sesame oil separately.",
      "Preheat a Korean spicy stew pot or thick-bottomed small pot over medium heat for 1 minute. Add 1 tbsp Korean sesame oil, sauté 1 tbsp minced garlic and onion strips until translucent, then add 1.5 tbsp gochujang and stir until fragrant and the oil turns red (about 1 minute; do not scorch).",
      "Pour in 400 ml broth and 1 tbsp soy sauce. Bring to a boil over high heat, then reduce to medium-low. Add cheese-stuffed rice cakes 80 g and simmer 5–8 minutes until the broth is flavorful and the rice cakes are soft and chewy.",
      "Gently press the rice cakes so a little cheese oozes out and enriches the broth (press lightly to avoid breaking them).",
      "Lower the heat. Scoop 1 pack soft tofu in large chunks into the center of the pot. Gently push along the edge so broth flows over the tofu without vigorous stirring (simmer 2 more minutes until piping hot).",
      "Before turning off the heat, layer 1 cheddar cheese slice and shredded mozzarella 60 g, let the cheese half-melt, then crack in 1 egg. When the white sets and the yolk is soft-set, top with scallions and sesame seeds and serve boiling hot in the pot."
    ],
    ja: [
      "下準備：チーズ入りトッポッキ 80gが冷蔵で硬い場合はぬるま湯に10分浸す。玉ねぎ 1/2個は千切り、青ネギ 1本は小口切り。にんにくみじん切り 大さじ1、コチュジャン 大さじ1.5、醤油 大さじ1、ごま油 大さじ1を分けて用意。",
      "韓国鍋または厚手の小鍋を中火で1分予熱し、ごま油 大さじ1を入れ、にんにくみじん切り 大さじ1と玉ねぎを炒め、コチュジャン 大さじ1.5を加えて香りと赤油が出るまで炒める（約1分、焦がさない）。",
      "出汁 400mlと醤油 大さじ1を注ぎ、強火で沸騰させ中弱火に。チーズ入りトッポッキ 80gを加え、5～8分煮込み、スープに味が染みトッポッキが柔らかくもちもちになるまで。",
      "トッポッキを軽く押して中のチーズを少し出し、スープを濃くする（割れないよう優しく）。",
      "弱火にし、純豆腐 1パックを大きめにすくって鍋中央へ。鍋縁を軽く押して汁を通し、強く混ぜない（さらに2分、熱々まで）。",
      "火を止める直前にチェダーチーズ 1枚とモッツァレラチーズ 60gをのせ、半溶けさせてから卵 1個を割り入れる。白身が固まり黄身が半熟になったら、ネギとごまを振り、熱々のまま鍋ごと提供する。"
    ],
    ko: [
      "준비: 치즈 떡 80g이 냉장에서 딱딱하면 미지근한 물에 10분 담근다. 양파 1/2개는 채 썰고, 대파 1대는 어슷썰기한다. 다진 마늘 1큰술, 고추장 1.5큰술, 간장 1큰술, 참기름 1큰술을 따로 준비한다.",
      "한국식 냄비나 두꺼운 바닥 작은 냄비를 중불로 1분 예열한 뒤 참기름 1큰술을 넣고, 다진 마늘 1큰술과 양파를 볶은 다음 고추장 1.5큰술을 넣어 향과 붉은 기름이 나올 때까지 볶는다(약 1분, 태우지 않게).",
      "육수 400ml와 간장 1큰술을 붓고 강불로 끓인 뒤 중약불로 줄인다. 치즈 떡 80g을 넣고 5~8분 끓여 국물에 맛이 배고 떡이 부드럽고 쫄깃해질 때까지 한다.",
      "떡을 가볍게 눌러 속 치즈가 조금 나오게 하여 국물을 진하게 한다(부서지지 않게 조심).",
      "약불로 줄이고 순두부 1팩을 큼직하게 떠서 냄비 중앙에 넣는다. 가장자리를 가볍게 밀어 국물이 두부에 흐르게 하고 세게 젓지 않는다(2분 더 끓여 뜨겁게).",
      "불을 끄기 직전 체다 치즈 1장과 모짜렐라 치즈 60g을 올려 반쯤 녹인 뒤 달걀 1개를 풀어 넣는다. 흰자가 익고 노른자가 반숙이 되면 파와 참깨를 뿌려 뜨거울 때 냄비째 낸다."
    ]
  },
  "dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed": {
    en: [
      "Prep: soak cheese-stuffed rice cakes 80 g in warm water 10 minutes; cut sea bream fillet 150 g into chunks and pat dry; soak wakame 15 g in cold water until soft and drain; slice ½ onion into strips and cut 1 scallion into sections; portion 1 tbsp minced garlic, 1.5 tbsp gochujang, 1 tbsp soy sauce, and 1 tbsp Korean sesame oil separately.",
      "Preheat a Korean spicy stew pot or thick-bottomed small pot over medium heat for 1 minute. Add 1 tbsp Korean sesame oil, sauté 1 tbsp minced garlic and onion strips until translucent, then add 1.5 tbsp gochujang and stir until fragrant and the oil turns red (about 1 minute; do not scorch).",
      "Add sea bream fillet 150 g and sear over high heat until the surface turns white and sets (about 1–2 minutes); avoid over-turning so the fish does not break apart.",
      "Pour in 400 ml broth and 1 tbsp soy sauce. Bring to a boil over high heat, then reduce to medium-low. Add cheese-stuffed rice cakes 80 g and wakame 15 g and simmer 5–8 minutes until rice cakes are chewy and fish is cooked through.",
      "Gently press the rice cakes so a little cheese oozes out to enrich the broth. Lower the heat, scoop 1 pack soft tofu in large chunks into the center, and gently push along the edge (simmer 2 more minutes until piping hot).",
      "Before turning off the heat, layer 1 cheddar cheese slice, let it half-melt, then crack in 1 egg. When the white sets and the yolk is soft-set, top with scallions and sesame seeds and serve boiling hot in the pot."
    ],
    ja: [
      "下準備：チーズ入りトッポッキ 80gをぬるま湯に10分浸す。タイの切り身 150gは角切りにしキッチンペーパーで水気を取る。わかめ 15gは冷水で戻して水切り。玉ねぎ 1/2個は千切り、青ネギ 1本は小口切り。にんにくみじん切り 大さじ1、コチュジャン 大さじ1.5、醤油 大さじ1、ごま油 大さじ1を分けて用意。",
      "韓国鍋または厚手の小鍋を中火で1分予熱し、ごま油 大さじ1を入れ、にんにくみじん切り 大さじ1と玉ねぎを炒め、コチュジャン 大さじ1.5を加えて香りと赤油が出るまで炒める（約1分、焦がさない）。",
      "タイの切り身 150gを入れ、強火で1～2分、表面が白く固まるまで焼く。ひっくり返しすぎない。",
      "出汁 400mlと醤油 大さじ1を注ぎ、強火で沸騰させ中弱火に。チーズ入りトッポッキ 80gとわかめ 15gを加え、5～8分煮込み、トッポッキがもちもちになり魚に火が通るまで。",
      "トッポッキを軽く押してチーズを少し出しスープを濃くする。弱火にし、純豆腐 1パックを大きめにすくって鍋縁を軽く押す（さらに2分、熱々まで）。",
      "火を止める直前にチェダーチーズ 1枚をのせ半溶けさせ、卵 1個を割り入れる。白身が固まり黄身が半熟になったら、ネギとごまを振り、熱々のまま鍋ごと提供する。"
    ],
    ko: [
      "준비: 치즈 떡 80g을 미지근한 물에 10분 담근다. 도미살 150g은 토막내고 키친타월로 물기를 뺀다. 미역 15g은 찬물에 불려 건진다. 양파 1/2개는 채 썰고, 대파 1대는 어슷썰기한다. 다진 마늘 1큰술, 고추장 1.5큰술, 간장 1큰술, 참기름 1큰술을 따로 준비한다.",
      "한국식 냄비나 두꺼운 바닥 작은 냄비를 중불로 1분 예열한 뒤 참기름 1큰술을 넣고, 다진 마늘 1큰술과 양파를 볶은 다음 고추장 1.5큰술을 넣어 향과 붉은 기름이 나올 때까지 볶는다(약 1분, 태우지 않게).",
      "도미살 150g을 넣고 강불로 1~2분 굽어 표면이 하얗게 익을 때까지 한다. 너무 자주 뒤집지 않는다.",
      "육수 400ml와 간장 1큰술을 붓고 강불로 끓인 뒤 중약불로 줄인다. 치즈 떡 80g과 미역 15g을 넣고 5~8분 끓여 떡이 쫄깃하고 생선이 익을 때까지 한다.",
      "떡을 가볍게 눌러 치즈를 조금 나오게 하여 국물을 진하게 한다. 약불로 줄이고 순두부 1팩을 큼직하게 떠서 가장자리를 가볍게 밀어 끓인다(2분 더).",
      "불을 끄기 직전 체다 치즈 1장을 올려 반쯤 녹인 뒤 달걀 1개를 풀어 넣는다. 흰자가 익고 노른자가 반숙이 되면 파와 참깨를 뿌려 뜨거울 때 냄비째 낸다."
    ]
  },
  "dh-ginseng-chicken-clay-pot": {
    en: [
      "Clean 1 whole chicken inside and out and pat dry; trim excess fat. Scrub and slice 1 fresh Korean ginseng root, pit 4 red dates, cut napa cabbage 200 g into sections, and peel 1 garlic bulb into cloves.",
      "Soak glutinous rice 50 g in cold water 30 minutes and drain. Stuff into the chicken cavity and seal with toothpicks or kitchen twine to keep rice from leaking.",
      "Add about 800 ml water or broth to a clay pot or thick soup pot. Add the chicken, ginseng, red dates, napa cabbage, and garlic. Bring to a boil over high heat and skim foam.",
      "Reduce to medium-low, cover, and maintain a gentle simmer 35–40 minutes. Avoid opening the lid often to preserve the broth aroma.",
      "Insert a skewer into the thickest part of the thigh; clear juices mean it is done. Season with a pinch of salt and a pinch of black pepper to taste.",
      "Serve whole or cut into pieces with the broth; dipping sauce optional. The stuffed glutinous rice is best eaten while hot."
    ],
    ja: [
      "全鶏 1羽を内外とも洗い水気を拭き、余分な脂を取る。高麗人参 1本はブラシで洗い薄切り、ナツメ 4粒は種を取り、白菜 200gはざっくり切り、ニンニク 1個は皮をむいて瓣にする。",
      "もち米 50gを冷水に30分浸し水切りし、鶏の腹に詰め、爪楊枝や糸で口を閉じる。",
      "土鍋または厚手の鍋に水または出汁 約800mlを入れ、鶏、人参、ナツメ、白菜、ニンニクを入れ、強火で沸騰させアクを取る。",
      "中火に下げ蓋をし、35～40分弱火でコトコト煮る。蓋を開けすぎない。",
      "竹串をもも肉の厚い部分に刺し、透明な汁が出れば火が通った証。塩 少々と胡椒 少々で味を整える。",
      "丸ごとまたは切り分けてスープと一緒に提供。腹のもち米は熱いうちがおすすめ。"
    ],
    ko: [
      "통닭 1마리를 안팎으로 씻어 말리고 지방을 다듬는다. 인삼 1뿌리는 솔질해 얇게 썰고, 대추 4알은 씨를 제거하며, 배추 200g은 뭉텅이로 자르고, 마늘 1통은 까서 쪽으로 나눈다.",
      "찹쌀 50g을 찬물에 30분 불려 건진 뒤 닭 배 속에 넣고 이쑤시개나 실로 입구를 막는다.",
      "뚝배기나 두꺼운 냄비에 물 또는 육수 약 800ml를 넣고 닭, 인삼, 대추, 배추, 마늘을 넣어 강불로 끓여 거품을 걷는다.",
      "중약불로 줄여 뚜껑을 닫고 35~40분 약불로 끓인다. 뚜껑을 자주 열지 않는다.",
      "꼬치를 닭다리 가장 두꺼운 부분에 꽂아 맑은 육즙이 나오면 익은 것이다. 소금 약간과 후추 약간으로 간한다.",
      "통째로 또는 잘라 국물과 함께 낸다. 배 속 찹쌀은 뜨거울 때 먹는 것이 좋다."
    ]
  },
  "dh-ginseng-chicken-hot-pot": {
    en: [
      "Clean 1 whole chicken inside and out and pat dry. Scrub and slice 1 fresh Korean ginseng root, pit 4 red dates, cut napa cabbage 200 g into sections, and peel 1 garlic bulb into cloves. Soak Korean rice cake sticks 150 g in warm water 10 minutes; remove stems from 3 shiitake mushrooms and cut into thick slices.",
      "Soak glutinous rice 50 g in cold water 30 minutes and drain. Stuff into the chicken cavity and seal with toothpicks or kitchen twine.",
      "Add about 1.5 L water or broth to a clay pot or thick soup pot. Add the chicken, ginseng, red dates, napa cabbage, garlic, and shiitake. Bring to a boil over high heat and skim foam.",
      "Reduce to medium-low, cover, and simmer 50–60 minutes until the bones are soft and the meat is tender. Skim foam as needed to keep the surface clear.",
      "In the last 10 minutes, add Korean rice cake sticks 150 g and cook until chewy and floating (do not overcook or they will break down).",
      "Season with a pinch of salt and a pinch of black pepper to taste. Serve with broth and ingredients; dipping sauce optional for sharing."
    ],
    ja: [
      "全鶏 1羽を内外とも洗い水気を拭く。高麗人参 1本は薄切り、ナツメ 4粒は種を取り、白菜 200gは切り、ニンニク 1個は瓣に。トッポッキ 150gはぬるま湯に10分浸し、しいたけ 3個は軸を取り厚切り。",
      "もち米 50gを冷水に30分浸し水切りし、鶏の腹に詰め、爪楊枝や糸で口を閉じる。",
      "土鍋または厚手の鍋に水または出汁 約1.5Lを入れ、鶏、人参、ナツメ、白菜、ニンニク、しいたけを入れ、強火で沸騰させアクを取る。",
      "中火に下げ蓋をし、50～60分煮込み骨が柔らかく肉がほろほろになるまで。アクを軽く取り表面を澄ませる。",
      "仕上げ10分前にトッポッキ 150gを加え、もちもち浮くまで煮る（煮込みすぎない）。",
      "塩 少々と胡椒 少々で味を整え、スープと具材を一緒に提供。蘸醬はお好みで。"
    ],
    ko: [
      "통닭 1마리를 안팎으로 씻어 말린다. 인삼 1뿌리는 얇게 썰고, 대추 4알은 씨를 제거하며, 배추 200g은 자르고, 마늘 1통은 쪽으로 나눈다. 떡볶이 떡 150g은 미지근한 물에 10분 담그고, 표고버섯 3개는 기둥을 제거해 두껍게 썬다.",
      "찹쌀 50g을 찬물에 30분 불려 건진 뒤 닭 배 속에 넣고 이쑤시개나 실로 입구를 막는다.",
      "뚝배기나 두꺼운 냄비에 물 또는 육수 약 1.5L를 넣고 닭, 인삼, 대추, 배추, 마늘, 표고버섯을 넣어 강불로 끓여 거품을 걷는다.",
      "중약불로 줄여 뚜껑을 닫고 50~60분 끓여 뼈가 부드럽고 고기가 푹 익을 때까지 한다. 거품을 가볍게 걷어 국물 표면을 맑게 한다.",
      "마지막 10분에 떡볶이 떡 150g을 넣어 쫄깃하게 떠오를 때까지 끓인다(너무 오래 끓이지 않는다).",
      "소금 약간과 후추 약간으로 간을 맞추고 국물과 재료를 함께 낸다. 찍어먹는 소스는 선택."
    ]
  },
  "dh-ox-bone-soup": {
    en: [
      "Spread out marbled beef slices 150 g on a plate and pat dry with paper towels. Finely chop 1 scallion for garnish.",
      "Pour 400 ml broth into a soup pot. Bring to a boil over high heat, then reduce to medium and keep the surface at a steady gentle boil (about 95°C; avoid a rolling boil that toughens the meat).",
      "Pick up beef slices with chopsticks and swish in the hot broth until the color changes and the center is still lightly pink (about 30–60 seconds). Remove immediately.",
      "Ladle hot broth into a bowl, add the swished beef, and season with a pinch of salt and a pinch of black pepper.",
      "Top with chopped scallions and serve while the broth is still piping hot; drizzle a little sesame oil if desired.",
      "Best made and served immediately; do not leave the beef soaking in the broth or the texture will toughen."
    ],
    ja: [
      "霜降り牛肉の薄切り 150gを皿に広げ、キッチンペーパーで表面の水分を取る。青ネギ 1本は細かく刻む。",
      "鍋に出汁 400mlを入れ、強火で沸騰させてから中火に。湯面を95°C前後のコトコト状態に保つ（大沸騰は肉が硬くなる）。",
      "箸で牛肉をつまみ、熱いスープですばやくシャブシャブし、色が変わり中心がほんのりピンクのまま（30～60秒）ですぐ取り出す。",
      "碗に熱いスープを盛り、牛肉を入れ、塩 少々と胡椒 少々で味を整える。",
      "刻みネギを振り、スープが熱々のうちに提供。好みでごま油を少し。",
      "できたてをすぐ食べる。牛肉をスープに長く浸すと硬くなる。"
    ],
    ko: [
      "마블링 소고기 슬라이스 150g을 접시에 펼치고 키친타월로 표면 수분을 뺀다. 대파 1대는 잘게 썰어 둔다.",
      "냄비에 육수 400ml를 붓고 강불로 끓인 뒤 중불로 줄여 국물 표면이 95°C 정도로 약하게 끓게 유지한다(강하게 끓이면 고기가 질겨진다).",
      "젓가락으로 소고기를 집어 뜨거운 국물에 30~60초 빠르게 데쳐 색이 변하고 가운데가 살짝 분홍일 때 바로 건진다.",
      "그릇에 뜨거운 국물을 담고 데친 소고기를 넣어 소금 약간과 후추 약간으로 간한다.",
      "다진 파를 올리고 국물이 끓는 동안 낸다. 취향에 따라 참기름을 조금 둘러도 좋다.",
      "바로 만들어 바로 먹는 것이 좋다. 소고기를 국물에 오래 담그면 질겨진다."
    ]
  },
  "dh-bibimbap": {
    en: [
      "Rinse uncooked white rice 150 g and cook with 360 ml water (or broth) until grains are separate and slightly chewy. Fluff with a rice paddle to release steam and keep warm.",
      "Marinate marbled beef slices 150 g with 1 tbsp Korean sesame oil and a little salt for 10 minutes. Julienne carrot 30 g, cut spinach 50 g into sections, and rinse soybean sprouts and wood ear mushrooms.",
      "Bring a small pot of water to a boil. Blanch spinach 30 seconds, drain, and squeeze dry; blanch soybean sprouts 1 minute and drain; blanch sliced wood ear mushrooms 1 minute. Set each aside separately.",
      "Heat 1 tbsp Korean sesame oil in a skillet over medium heat. Stir-fry beef until cooked and lightly caramelized (about 2 minutes) and remove. In the same pan, stir-fry carrot (about 1 minute) and other vegetables in sequence, seasoning each lightly with salt and a little sesame oil. Set aside separately.",
      "Brush the stone pot evenly with 1–2 tbsp Korean sesame oil, spread hot rice and press flat, arrange meat and vegetables by color, leaving a center space.",
      "Crack in 1 egg and heat the stone pot over medium 3–5 minutes until you hear sizzling and smell toasted rice crust (nurungji).",
      "Before serving, drizzle 1 tbsp Korean chili paste (gochujang) and a pinch of sesame seeds. Mix from the edge inward with a spoon; if no stone pot, mix in a bowl and enjoy."
    ],
    ja: [
      "白米 150gを洗い、水（または出汁）360mlで粒が立ち歯応えのあるご飯に炊く。しゃもじでほぐして湯気を飛ばし保温。",
      "霜降り牛肉薄切り 150gをごま油 大さじ1と塩少々で10分もみ込む。にんじん 30gは千切り、ほうれん草 50gは切り、もやしときくらげを洗う。",
      "小鍋で湯を沸かし、ほうれん草を30秒湯通しして絞る。もやしは1分、きくらげは細切りにして1分湯通し。それぞれ分ける。",
      "フライパンにごま油 大さじ1を中火で熱し、牛肉を2分炒めて焦げ香を出して取り出す。同じ鍋でにんじん（約1分）と野菜を順に炒め、塩とごま油少々で味付け。",
      "石鍋の内側にごま油 大さじ1～2を塗り、熱いご飯を敷き平らにし、肉と野菜を色別に並べ中央を空ける。",
      "卵 1個を割り入れ、中火で3～5分、底部がジュッと音を立て鍋巴の香りが出たら火を止める。",
      "提供前にコチュジャン 大さじ1とごま 少々をかけ、外から内へ混ぜる。石鍋がなければ碗で混ぜてもよい。"
    ],
    ko: [
      "백미 150g을 씻어 물(또는 육수) 360ml로 밥알이 살아 있고 쫄깃하게 밥을 짓는다. 주걱으로 풀어 김을 빼고 보온한다.",
      "마블링 소고기 슬라이스 150g을 참기름 1큰술과 소금 약간으로 10분 재운다. 당근 30g은 채 썰고, 시금치 50g은 자르며, 콩나물과 목이버섯을 씻는다.",
      "작은 냄비에 물을 끓여 시금치를 30초 데친 뒤 짜고, 콩나물은 1분, 목이버섯 채는 1분 데쳐 각각 건진다.",
      "팬에 참기름 1큰술을 중불로 달군 뒤 소고기를 2분 볶아 노릇한 향을 내며 건진다. 같은 팬에서 당근(약 1분)과 채소를 순서대로 볶아 소금과 참기름으로 간한다.",
      "돌솥 안쪽에 참기름 1~2큰술을 고르게 바르고 뜨거운 밥을 펴 누른 뒤 고기와 채소를 색별로 올리고 가운데를 비운다.",
      "달걀 1개를 풀어 중불로 3~5분 가열해 바닥에서 지글지글 소리가 나고 누룽지 향이 나면 불을 끈다.",
      "낼 때 고추장 1큰술과 참깨 약간을 뿌리고 가장자리에서 안쪽으로 비벼 먹는다. 돌솥이 없으면 그릇에서 비벼도 된다."
    ]
  },
  "dh-classic-stone-pot-rice": {
    en: [
      "Rinse uncooked white rice 150 g, add 360 ml water (rice-to-water ratio about 1:2.4), soak 20 minutes, and cook until grains are separate and slightly chewy. Fluff to release steam and keep warm.",
      "Julienne carrot 30 g, cut spinach 50 g into sections, and cut 1 scallion into short sections. Blanch spinach 30 seconds and carrot 1 minute in boiling water; drain and toss each separately with a little salt and sesame oil.",
      "Heat 1 tbsp Korean sesame oil in a skillet over medium heat. Stir-fry carrot and spinach separately 1–2 minutes until tender but still colorful. Set aside.",
      "Brush the stone pot evenly with 1–2 tbsp Korean sesame oil (enough oil helps form nurungji), spread hot rice, and press flat with a rice paddle.",
      "Arrange stir-fried carrot, spinach, and scallions neatly on the rice by color; leave a center space if desired.",
      "Place the stone pot over medium heat 4–6 minutes until a golden crust forms on the bottom, you smell toasted rice, and hear sizzling. Turn off the heat.",
      "Before serving, season with 1 tbsp soy sauce and a pinch of salt. Mix and enjoy, or eat the crispy crust with the toppings."
    ],
    ja: [
      "白米 150gを洗い、水 360ml（米と水の比約1:2.4）を加え20分浸し、粒が立ち歯応えのあるご飯に炊く。ほぐして湯気を飛ばす。",
      "にんじん 30gは千切り、ほうれん草 50gは切り、青ネギ 1本は小口切り。沸騰した湯でほうれん草30秒、にんじん1分湯通しし、水切りして塩とごま油少々で和える。",
      "フライパンにごま油 大さじ1を中火で熱し、にんじんとほうれん草を別々に1～2分炒め、色を保ちながら火を通す。",
      "石鍋の内側にごま油 大さじ1～2を塗り（油が多いほど鍋巴がつきやすい）、熱いご飯を敷きしゃもじで軽く押す。",
      "炒めたにんじん、ほうれん草、青ネギを色別に整えて並べる。",
      "石鍋を中火で4～6分加熱し、底部に黄金色の鍋巴ができ焦げ香とジュッという音が出たら火を止める。",
      "提供前に醤油 大さじ1と塩 少々で味を整え、混ぜて食べるか、鍋巴と具を一緒に楽しむ。"
    ],
    ko: [
      "백미 150g을 씻어 물 360ml(쌀과 물 비율 약 1:2.4)을 넣고 20분 불린 뒤 밥알이 살아 있고 쫄깃하게 짓는다. 풀어 김을 뺀다.",
      "당근 30g은 채 썰고, 시금치 50g은 자르며, 대파 1대는 어슷썰기한다. 끓는 물에 시금치 30초, 당근 1분 데쳐 건진 뒤 소금과 참기름 약간으로 각각 버무린다.",
      "팬에 참기름 1큰술을 중불로 달군 뒤 당근과 시금치를 따로 1~2분 볶아 색을 유지하며 익힌다.",
      "돌솥 안쪽에 참기름 1~2큰술을 고르게 바르고(기름이 충분해야 누룽지가 잘 생김) 뜨거운 밥을 펴 주걱으로 가볍게 누른다.",
      "볶은 당근, 시금치, 대파를 색별로 정갈하게 올린다.",
      "돌솥을 중불로 4~6분 가열해 바닥에 황금빛 누룽지가 생기고 향과 지글지글 소리가 나면 불을 끈다.",
      "낼 때 간장 1큰술과 소금 약간으로 간을 맞추고 비벼 먹거나 누룽지와 반찬을 함께 즐긴다."
    ]
  },
  "dh-duck-jerky-stone-pot-rice": {
    en: [
      "Rinse uncooked white rice 150 g, add 360 ml water, soak 20 minutes, and cook until grains are separate and slightly chewy. Fluff to release steam and keep warm.",
      "Slice duck jerky 1 pack thinly; shred cabbage 100 g and cut 1 scallion into short sections. Blanch cabbage 1 minute and drain; if jerky is very firm, steam 3 minutes before slicing.",
      "Heat 1 tbsp Korean sesame oil in a skillet over medium heat. Stir-fry cabbage 100 g about 2 minutes, add duck jerky and scallion, and stir-fry 1 minute. Season with 1 tbsp soy sauce and a pinch of salt. Set aside.",
      "Brush the stone pot evenly with 1–2 tbsp Korean sesame oil, spread hot rice and press flat, and arrange the stir-fried toppings neatly on top.",
      "Place the stone pot over medium heat 4–6 minutes until a golden nurungji crust forms, you smell toasted rice, and hear sizzling. Turn off the heat.",
      "Before serving, mix rice and toppings together, or enjoy the crispy edge crust with duck jerky and vegetables for the best flavor."
    ],
    ja: [
      "白米 150gを洗い、水 360mlを加え20分浸し、粒が立ち歯応えのあるご飯に炊く。ほぐして湯気を飛ばす。",
      "鴨賞 1個を薄切り、キャベツ 100gは千切り、青ネギ 1本は小口切り。キャベツは1分湯通し。鴨賞が硬い場合は3分蒸してから切る。",
      "フライパンにごま油 大さじ1を中火で熱し、キャベツ 100gを約2分炒め、鴨賞と青ネギを加え1分炒める。醤油 大さじ1と塩 少々で味付け。",
      "石鍋の内側にごま油 大さじ1～2を塗り、熱いご飯を敷き押し、炒めた具を整えて並べる。",
      "石鍋を中火で4～6分加熱し、底部に黄金色の鍋巴ができ焦げ香とジュッという音が出たら火を止める。",
      "提供前にご飯と具を混ぜるか、鍋巴と鴨賞・野菜を一緒に楽しむ。"
    ],
    ko: [
      "백미 150g을 씻어 물 360ml을 넣고 20분 불린 뒤 밥알이 살아 있고 쫄깃하게 짓는다. 풀어 김을 뺀다.",
      "오리 육포 1개를 얇게 썰고, 양배추 100g은 채 썰며, 대파 1대는 어슷썰기한다. 양배추는 1분 데친다. 육포가 딱딱하면 3분 찐 뒤 썬다.",
      "팬에 참기름 1큰술을 중불로 달군 뒤 양배추 100g을 약 2분 볶고, 오리 육포와 대파를 넣어 1분 볶는다. 간장 1큰술과 소금 약간으로 간한다.",
      "돌솥 안쪽에 참기름 1~2큰술을 고르게 바르고 뜨거운 밥을 펴 누른 뒤 볶은 토핑을 정갈하게 올린다.",
      "돌솥을 중불로 4~6분 가열해 바닥에 황금빛 누룽지가 생기고 향과 지글지글 소리가 나면 불을 끈다.",
      "낼 때 밥과 토핑을 비벼 먹거나 가장자리 누룽지와 오리 육포·채소를 함께 먹으면 맛이 좋다."
    ]
  }
};

const SOONDUBU_SEASONINGS = {
  withGochujang: {
    en: [
      { name: "Korean chili paste (gochujang)", amount: "1.5", unit: "tbsp" },
      { name: "soy sauce", amount: "1", unit: "tbsp" },
      { name: "minced garlic", amount: "1", unit: "tbsp" },
      { name: "Korean sesame oil", amount: "1", unit: "tbsp" }
    ],
    ja: [
      { name: "コチュジャン", amount: "1.5", unit: "大さじ" },
      { name: "醤油", amount: "1", unit: "大さじ" },
      { name: "みじん切りニンニク", amount: "1", unit: "大さじ" },
      { name: "ごま油", amount: "1", unit: "大さじ" }
    ],
    ko: [
      { name: "고추장", amount: "1.5", unit: "큰술" },
      { name: "간장", amount: "1", unit: "큰술" },
      { name: "다진 마늘", amount: "1", unit: "큰술" },
      { name: "참기름", amount: "1", unit: "큰술" }
    ]
  },
  withSalt: {
    en: [
      { name: "soy sauce", amount: "1", unit: "tbsp" },
      { name: "minced garlic", amount: "1", unit: "tbsp" },
      { name: "Korean sesame oil", amount: "1", unit: "tbsp" },
      { name: "salt", amount: "0.25", unit: "pinch" }
    ],
    ja: [
      { name: "醤油", amount: "1", unit: "大さじ" },
      { name: "みじん切りニンニク", amount: "1", unit: "大さじ" },
      { name: "ごま油", amount: "1", unit: "大さじ" },
      { name: "塩", amount: "0.25", unit: "少々" }
    ],
    ko: [
      { name: "간장", amount: "1", unit: "큰술" },
      { name: "다진 마늘", amount: "1", unit: "큰술" },
      { name: "참기름", amount: "1", unit: "큰술" },
      { name: "소금", amount: "0.25", unit: "약간" }
    ]
  }
};

const INGREDIENTS = {
  "dh-clams-shrimp-soondubu": {
    en: [
      { name: "soft tofu", amount: "1", unit: "pack", isCore: true },
      { name: "clams", amount: "200", unit: "g", isCore: true },
      { name: "shrimp", amount: "6", unit: "pcs", isCore: true },
      { name: "onion", amount: "0.5", unit: "pc", isCore: true },
      { name: "scallion", amount: "1", unit: "stalk", isCore: true },
      { name: "broth", amount: "400", unit: "ml", isCore: true }
    ],
    ja: [
      { name: "純豆腐", amount: "1", unit: "パック", isCore: true },
      { name: "アサリ", amount: "200", unit: "g", isCore: true },
      { name: "エビ", amount: "6", unit: "尾", isCore: true },
      { name: "玉ねぎ", amount: "0.5", unit: "個", isCore: true },
      { name: "青ネギ", amount: "1", unit: "本", isCore: true },
      { name: "出汁", amount: "400", unit: "ml", isCore: true }
    ],
    ko: [
      { name: "순두부", amount: "1", unit: "팩", isCore: true },
      { name: "바지락", amount: "200", unit: "g", isCore: true },
      { name: "새우", amount: "6", unit: "마리", isCore: true },
      { name: "양파", amount: "0.5", unit: "개", isCore: true },
      { name: "대파", amount: "1", unit: "대", isCore: true },
      { name: "육수", amount: "400", unit: "ml", isCore: true }
    ]
  },
  "dh-seafood-soondubu": {
    en: [
      { name: "soft tofu", amount: "1", unit: "pack", isCore: true },
      { name: "shrimp", amount: "6", unit: "pcs", isCore: true },
      { name: "clams", amount: "200", unit: "g", isCore: true },
      { name: "squid", amount: "150", unit: "g", isCore: true },
      { name: "onion", amount: "0.5", unit: "pc", isCore: true },
      { name: "scallion", amount: "1", unit: "stalk", isCore: true },
      { name: "broth", amount: "400", unit: "ml", isCore: true }
    ],
    ja: [
      { name: "純豆腐", amount: "1", unit: "パック", isCore: true },
      { name: "エビ", amount: "6", unit: "尾", isCore: true },
      { name: "アサリ", amount: "200", unit: "g", isCore: true },
      { name: "イカ", amount: "150", unit: "g", isCore: true },
      { name: "玉ねぎ", amount: "0.5", unit: "個", isCore: true },
      { name: "青ネギ", amount: "1", unit: "本", isCore: true },
      { name: "出汁", amount: "400", unit: "ml", isCore: true }
    ],
    ko: [
      { name: "순두부", amount: "1", unit: "팩", isCore: true },
      { name: "새우", amount: "6", unit: "마리", isCore: true },
      { name: "바지락", amount: "200", unit: "g", isCore: true },
      { name: "오징어", amount: "150", unit: "g", isCore: true },
      { name: "양파", amount: "0.5", unit: "개", isCore: true },
      { name: "대파", amount: "1", unit: "대", isCore: true },
      { name: "육수", amount: "400", unit: "ml", isCore: true }
    ]
  },
  "dh-combo-soondubu": {
    en: [
      { name: "soft tofu", amount: "1", unit: "pack", isCore: true },
      { name: "beef slices", amount: "120", unit: "g", isCore: true },
      { name: "shrimp", amount: "6", unit: "pcs", isCore: true },
      { name: "clams", amount: "200", unit: "g", isCore: true },
      { name: "onion", amount: "0.5", unit: "pc", isCore: true },
      { name: "scallion", amount: "1", unit: "stalk", isCore: true },
      { name: "broth", amount: "400", unit: "ml", isCore: true }
    ],
    ja: [
      { name: "純豆腐", amount: "1", unit: "パック", isCore: true },
      { name: "牛肉薄切り", amount: "120", unit: "g", isCore: true },
      { name: "エビ", amount: "6", unit: "尾", isCore: true },
      { name: "アサリ", amount: "200", unit: "g", isCore: true },
      { name: "玉ねぎ", amount: "0.5", unit: "個", isCore: true },
      { name: "青ネギ", amount: "1", unit: "本", isCore: true },
      { name: "出汁", amount: "400", unit: "ml", isCore: true }
    ],
    ko: [
      { name: "순두부", amount: "1", unit: "팩", isCore: true },
      { name: "소고기 슬라이스", amount: "120", unit: "g", isCore: true },
      { name: "새우", amount: "6", unit: "마리", isCore: true },
      { name: "바지락", amount: "200", unit: "g", isCore: true },
      { name: "양파", amount: "0.5", unit: "개", isCore: true },
      { name: "대파", amount: "1", unit: "대", isCore: true },
      { name: "육수", amount: "400", unit: "ml", isCore: true }
    ]
  },
  "dh-plant-based-fried-chicken-with-mushroom-soondubu": {
    en: [
      { name: "soft tofu", amount: "1", unit: "pack", isCore: true },
      { name: "plant-based chicken nuggets", amount: "150", unit: "g", isCore: true },
      { name: "shiitake mushrooms", amount: "3", unit: "pcs", isCore: true },
      { name: "onion", amount: "0.5", unit: "pc", isCore: true },
      { name: "scallion", amount: "1", unit: "stalk", isCore: true },
      { name: "broth", amount: "400", unit: "ml", isCore: true }
    ],
    ja: [
      { name: "純豆腐", amount: "1", unit: "パック", isCore: true },
      { name: "植物肉チキン", amount: "150", unit: "g", isCore: true },
      { name: "しいたけ", amount: "3", unit: "個", isCore: true },
      { name: "玉ねぎ", amount: "0.5", unit: "個", isCore: true },
      { name: "青ネギ", amount: "1", unit: "本", isCore: true },
      { name: "出汁", amount: "400", unit: "ml", isCore: true }
    ],
    ko: [
      { name: "순두부", amount: "1", unit: "팩", isCore: true },
      { name: "식물성 치킨 너겟", amount: "150", unit: "g", isCore: true },
      { name: "표고버섯", amount: "3", unit: "개", isCore: true },
      { name: "양파", amount: "0.5", unit: "개", isCore: true },
      { name: "대파", amount: "1", unit: "대", isCore: true },
      { name: "육수", amount: "400", unit: "ml", isCore: true }
    ]
  },
  "dh-cheese-stuffed-rice-cake-soondubu": {
    en: [
      { name: "soft tofu", amount: "1", unit: "pack", isCore: true },
      { name: "cheese-stuffed rice cake", amount: "80", unit: "g", isCore: true },
      { name: "onion", amount: "0.5", unit: "pc", isCore: true },
      { name: "scallion", amount: "1", unit: "stalk", isCore: true },
      { name: "broth", amount: "400", unit: "ml", isCore: true }
    ],
    ja: [
      { name: "純豆腐", amount: "1", unit: "パック", isCore: true },
      { name: "チーズ入りトッポッキ", amount: "80", unit: "g", isCore: true },
      { name: "玉ねぎ", amount: "0.5", unit: "個", isCore: true },
      { name: "青ネギ", amount: "1", unit: "本", isCore: true },
      { name: "出汁", amount: "400", unit: "ml", isCore: true }
    ],
    ko: [
      { name: "순두부", amount: "1", unit: "팩", isCore: true },
      { name: "치즈 떡", amount: "80", unit: "g", isCore: true },
      { name: "양파", amount: "0.5", unit: "개", isCore: true },
      { name: "대파", amount: "1", unit: "대", isCore: true },
      { name: "육수", amount: "400", unit: "ml", isCore: true }
    ]
  },
  "dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed": {
    en: [
      { name: "soft tofu", amount: "1", unit: "pack", isCore: true },
      { name: "cheese-stuffed rice cake", amount: "80", unit: "g", isCore: true },
      { name: "sea bream fillet", amount: "150", unit: "g", isCore: true },
      { name: "wakame", amount: "15", unit: "g", isCore: true },
      { name: "onion", amount: "0.5", unit: "pc", isCore: true },
      { name: "scallion", amount: "1", unit: "stalk", isCore: true },
      { name: "broth", amount: "400", unit: "ml", isCore: true }
    ],
    ja: [
      { name: "純豆腐", amount: "1", unit: "パック", isCore: true },
      { name: "チーズ入りトッポッキ", amount: "80", unit: "g", isCore: true },
      { name: "タイの切り身", amount: "150", unit: "g", isCore: true },
      { name: "わかめ", amount: "15", unit: "g", isCore: true },
      { name: "玉ねぎ", amount: "0.5", unit: "個", isCore: true },
      { name: "青ネギ", amount: "1", unit: "本", isCore: true },
      { name: "出汁", amount: "400", unit: "ml", isCore: true }
    ],
    ko: [
      { name: "순두부", amount: "1", unit: "팩", isCore: true },
      { name: "치즈 떡", amount: "80", unit: "g", isCore: true },
      { name: "도미살", amount: "150", unit: "g", isCore: true },
      { name: "미역", amount: "15", unit: "g", isCore: true },
      { name: "양파", amount: "0.5", unit: "개", isCore: true },
      { name: "대파", amount: "1", unit: "대", isCore: true },
      { name: "육수", amount: "400", unit: "ml", isCore: true }
    ]
  },
  "dh-ginseng-chicken-clay-pot": {
    en: [
      { name: "whole chicken", amount: "1", unit: "whole", isCore: true },
      { name: "glutinous rice", amount: "50", unit: "g", isCore: true },
      { name: "fresh Korean ginseng", amount: "1", unit: "root", isCore: true },
      { name: "red dates", amount: "4", unit: "pcs", isCore: true },
      { name: "napa cabbage", amount: "200", unit: "g", isCore: true },
      { name: "garlic bulb", amount: "1", unit: "bulb", isCore: true }
    ],
    ja: [
      { name: "全鶏", amount: "1", unit: "羽", isCore: true },
      { name: "もち米", amount: "50", unit: "g", isCore: true },
      { name: "高麗人参", amount: "1", unit: "本", isCore: true },
      { name: "ナツメ", amount: "4", unit: "粒", isCore: true },
      { name: "白菜", amount: "200", unit: "g", isCore: true },
      { name: "ニンニク", amount: "1", unit: "個", isCore: true }
    ],
    ko: [
      { name: "통닭", amount: "1", unit: "마리", isCore: true },
      { name: "찹쌀", amount: "50", unit: "g", isCore: true },
      { name: "인삼", amount: "1", unit: "뿌리", isCore: true },
      { name: "대추", amount: "4", unit: "알", isCore: true },
      { name: "배추", amount: "200", unit: "g", isCore: true },
      { name: "마늘", amount: "1", unit: "통", isCore: true }
    ]
  },
  "dh-ginseng-chicken-hot-pot": {
    en: [
      { name: "whole chicken", amount: "1", unit: "whole", isCore: true },
      { name: "glutinous rice", amount: "50", unit: "g", isCore: true },
      { name: "fresh Korean ginseng", amount: "1", unit: "root", isCore: true },
      { name: "red dates", amount: "4", unit: "pcs", isCore: true },
      { name: "napa cabbage", amount: "200", unit: "g", isCore: true },
      { name: "garlic bulb", amount: "1", unit: "bulb", isCore: true },
      { name: "Korean rice cake sticks", amount: "150", unit: "g", isCore: true },
      { name: "shiitake mushrooms", amount: "3", unit: "pcs", isCore: true }
    ],
    ja: [
      { name: "全鶏", amount: "1", unit: "羽", isCore: true },
      { name: "もち米", amount: "50", unit: "g", isCore: true },
      { name: "高麗人参", amount: "1", unit: "本", isCore: true },
      { name: "ナツメ", amount: "4", unit: "粒", isCore: true },
      { name: "白菜", amount: "200", unit: "g", isCore: true },
      { name: "ニンニク", amount: "1", unit: "個", isCore: true },
      { name: "トッポッキ", amount: "150", unit: "g", isCore: true },
      { name: "しいたけ", amount: "3", unit: "個", isCore: true }
    ],
    ko: [
      { name: "통닭", amount: "1", unit: "마리", isCore: true },
      { name: "찹쌀", amount: "50", unit: "g", isCore: true },
      { name: "인삼", amount: "1", unit: "뿌리", isCore: true },
      { name: "대추", amount: "4", unit: "알", isCore: true },
      { name: "배추", amount: "200", unit: "g", isCore: true },
      { name: "마늘", amount: "1", unit: "통", isCore: true },
      { name: "떡볶이 떡", amount: "150", unit: "g", isCore: true },
      { name: "표고버섯", amount: "3", unit: "개", isCore: true }
    ]
  },
  "dh-ox-bone-soup": {
    en: [
      { name: "marbled beef slices", amount: "150", unit: "g", isCore: true },
      { name: "broth", amount: "400", unit: "ml", isCore: true },
      { name: "scallion", amount: "1", unit: "stalk", isCore: true }
    ],
    ja: [
      { name: "霜降り牛肉の薄切り", amount: "150", unit: "g", isCore: true },
      { name: "出汁", amount: "400", unit: "ml", isCore: true },
      { name: "青ネギ", amount: "1", unit: "本", isCore: true }
    ],
    ko: [
      { name: "마블링 소고기 슬라이스", amount: "150", unit: "g", isCore: true },
      { name: "육수", amount: "400", unit: "ml", isCore: true },
      { name: "대파", amount: "1", unit: "대", isCore: true }
    ]
  },
  "dh-bibimbap": {
    en: [
      { name: "uncooked white rice", amount: "150", unit: "g", isCore: true },
      { name: "marbled beef slices", amount: "150", unit: "g", isCore: true },
      { name: "carrot", amount: "30", unit: "g", isCore: true },
      { name: "spinach", amount: "50", unit: "g", isCore: true },
      { name: "soybean sprouts", amount: "1", unit: "bunch", isCore: true },
      { name: "wood ear mushroom", amount: "1", unit: "pc", isCore: true },
      { name: "egg", amount: "1", unit: "pc", isCore: true }
    ],
    ja: [
      { name: "白米", amount: "150", unit: "g", isCore: true },
      { name: "霜降り牛肉薄切り", amount: "150", unit: "g", isCore: true },
      { name: "にんじん", amount: "30", unit: "g", isCore: true },
      { name: "ほうれん草", amount: "50", unit: "g", isCore: true },
      { name: "もやし", amount: "1", unit: "袋", isCore: true },
      { name: "きくらげ", amount: "1", unit: "枚", isCore: true },
      { name: "卵", amount: "1", unit: "個", isCore: true }
    ],
    ko: [
      { name: "백미", amount: "150", unit: "g", isCore: true },
      { name: "마블링 소고기 슬라이스", amount: "150", unit: "g", isCore: true },
      { name: "당근", amount: "30", unit: "g", isCore: true },
      { name: "시금치", amount: "50", unit: "g", isCore: true },
      { name: "콩나물", amount: "1", unit: "봉", isCore: true },
      { name: "목이버섯", amount: "1", unit: "개", isCore: true },
      { name: "달걀", amount: "1", unit: "개", isCore: true }
    ]
  },
  "dh-classic-stone-pot-rice": {
    en: [
      { name: "uncooked white rice", amount: "150", unit: "g", isCore: true },
      { name: "carrot", amount: "30", unit: "g", isCore: true },
      { name: "spinach", amount: "50", unit: "g", isCore: true },
      { name: "scallion", amount: "1", unit: "stalk", isCore: true }
    ],
    ja: [
      { name: "白米", amount: "150", unit: "g", isCore: true },
      { name: "にんじん", amount: "30", unit: "g", isCore: true },
      { name: "ほうれん草", amount: "50", unit: "g", isCore: true },
      { name: "青ネギ", amount: "1", unit: "本", isCore: true }
    ],
    ko: [
      { name: "백미", amount: "150", unit: "g", isCore: true },
      { name: "당근", amount: "30", unit: "g", isCore: true },
      { name: "시금치", amount: "50", unit: "g", isCore: true },
      { name: "대파", amount: "1", unit: "대", isCore: true }
    ]
  },
  "dh-duck-jerky-stone-pot-rice": {
    en: [
      { name: "uncooked white rice", amount: "150", unit: "g", isCore: true },
      { name: "duck jerky", amount: "1", unit: "pack", isCore: true },
      { name: "cabbage", amount: "100", unit: "g", isCore: true },
      { name: "scallion", amount: "1", unit: "stalk", isCore: true }
    ],
    ja: [
      { name: "白米", amount: "150", unit: "g", isCore: true },
      { name: "鴨賞", amount: "1", unit: "個", isCore: true },
      { name: "キャベツ", amount: "100", unit: "g", isCore: true },
      { name: "青ネギ", amount: "1", unit: "本", isCore: true }
    ],
    ko: [
      { name: "백미", amount: "150", unit: "g", isCore: true },
      { name: "오리 육포", amount: "1", unit: "개", isCore: true },
      { name: "양배추", amount: "100", unit: "g", isCore: true },
      { name: "대파", amount: "1", unit: "대", isCore: true }
    ]
  }
};

const SEASONINGS = {
  "dh-clams-shrimp-soondubu": SOONDUBU_SEASONINGS.withSalt,
  "dh-seafood-soondubu": SOONDUBU_SEASONINGS.withGochujang,
  "dh-combo-soondubu": SOONDUBU_SEASONINGS.withGochujang,
  "dh-plant-based-fried-chicken-with-mushroom-soondubu": SOONDUBU_SEASONINGS.withGochujang,
  "dh-cheese-stuffed-rice-cake-soondubu": {
    en: [
      { name: "cheddar cheese slice", amount: "1", unit: "slice" },
      { name: "shredded mozzarella", amount: "60", unit: "g" },
      { name: "Korean chili paste (gochujang)", amount: "1.5", unit: "tbsp" },
      { name: "soy sauce", amount: "1", unit: "tbsp" },
      { name: "minced garlic", amount: "1", unit: "tbsp" },
      { name: "Korean sesame oil", amount: "1", unit: "tbsp" }
    ],
    ja: [
      { name: "チェダーチーズ", amount: "1", unit: "枚" },
      { name: "モッツァレラチーズ", amount: "60", unit: "g" },
      { name: "コチュジャン", amount: "1.5", unit: "大さじ" },
      { name: "醤油", amount: "1", unit: "大さじ" },
      { name: "みじん切りニンニク", amount: "1", unit: "大さじ" },
      { name: "ごま油", amount: "1", unit: "大さじ" }
    ],
    ko: [
      { name: "체다 치즈", amount: "1", unit: "장" },
      { name: "모짜렐라 치즈", amount: "60", unit: "g" },
      { name: "고추장", amount: "1.5", unit: "큰술" },
      { name: "간장", amount: "1", unit: "큰술" },
      { name: "다진 마늘", amount: "1", unit: "큰술" },
      { name: "참기름", amount: "1", unit: "큰술" }
    ]
  },
  "dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed": {
    en: [
      { name: "cheddar cheese slice", amount: "1", unit: "slice" },
      { name: "Korean chili paste (gochujang)", amount: "1.5", unit: "tbsp" },
      { name: "soy sauce", amount: "1", unit: "tbsp" },
      { name: "minced garlic", amount: "1", unit: "tbsp" },
      { name: "Korean sesame oil", amount: "1", unit: "tbsp" }
    ],
    ja: [
      { name: "チェダーチーズ", amount: "1", unit: "枚" },
      { name: "コチュジャン", amount: "1.5", unit: "大さじ" },
      { name: "醤油", amount: "1", unit: "大さじ" },
      { name: "みじん切りニンニク", amount: "1", unit: "大さじ" },
      { name: "ごま油", amount: "1", unit: "大さじ" }
    ],
    ko: [
      { name: "체다 치즈", amount: "1", unit: "장" },
      { name: "고추장", amount: "1.5", unit: "큰술" },
      { name: "간장", amount: "1", unit: "큰술" },
      { name: "다진 마늘", amount: "1", unit: "큰술" },
      { name: "참기름", amount: "1", unit: "큰술" }
    ]
  },
  "dh-ginseng-chicken-clay-pot": {
    en: [
      { name: "salt", amount: "0.25", unit: "pinch" },
      { name: "black pepper", amount: "0.25", unit: "pinch" }
    ],
    ja: [
      { name: "塩", amount: "0.25", unit: "少々" },
      { name: "胡椒", amount: "0.25", unit: "少々" }
    ],
    ko: [
      { name: "소금", amount: "0.25", unit: "약간" },
      { name: "후추", amount: "0.25", unit: "약간" }
    ]
  },
  "dh-ginseng-chicken-hot-pot": {
    en: [
      { name: "salt", amount: "0.25", unit: "pinch" },
      { name: "black pepper", amount: "0.25", unit: "pinch" }
    ],
    ja: [
      { name: "塩", amount: "0.25", unit: "少々" },
      { name: "胡椒", amount: "0.25", unit: "少々" }
    ],
    ko: [
      { name: "소금", amount: "0.25", unit: "약간" },
      { name: "후추", amount: "0.25", unit: "약간" }
    ]
  },
  "dh-ox-bone-soup": {
    en: [
      { name: "salt", amount: "0.25", unit: "pinch" },
      { name: "black pepper", amount: "0.25", unit: "pinch" }
    ],
    ja: [
      { name: "塩", amount: "0.25", unit: "少々" },
      { name: "胡椒", amount: "0.25", unit: "少々" }
    ],
    ko: [
      { name: "소금", amount: "0.25", unit: "약간" },
      { name: "후추", amount: "0.25", unit: "약간" }
    ]
  },
  "dh-bibimbap": {
    en: [
      { name: "Korean sesame oil", amount: "1", unit: "tbsp" },
      { name: "Korean chili paste (gochujang)", amount: "1", unit: "tbsp" },
      { name: "sesame seeds", amount: "0.25", unit: "pinch" }
    ],
    ja: [
      { name: "ごま油", amount: "1", unit: "大さじ" },
      { name: "コチュジャン", amount: "1", unit: "大さじ" },
      { name: "ごま", amount: "0.25", unit: "少々" }
    ],
    ko: [
      { name: "참기름", amount: "1", unit: "큰술" },
      { name: "고추장", amount: "1", unit: "큰술" },
      { name: "참깨", amount: "0.25", unit: "약간" }
    ]
  },
  "dh-classic-stone-pot-rice": {
    en: [
      { name: "Korean sesame oil", amount: "1", unit: "tbsp" },
      { name: "soy sauce", amount: "1", unit: "tbsp" },
      { name: "salt", amount: "0.25", unit: "pinch" }
    ],
    ja: [
      { name: "ごま油", amount: "1", unit: "大さじ" },
      { name: "醤油", amount: "1", unit: "大さじ" },
      { name: "塩", amount: "0.25", unit: "少々" }
    ],
    ko: [
      { name: "참기름", amount: "1", unit: "큰술" },
      { name: "간장", amount: "1", unit: "큰술" },
      { name: "소금", amount: "0.25", unit: "약간" }
    ]
  },
  "dh-duck-jerky-stone-pot-rice": {
    en: [
      { name: "Korean sesame oil", amount: "1", unit: "tbsp" },
      { name: "soy sauce", amount: "1", unit: "tbsp" },
      { name: "salt", amount: "0.25", unit: "pinch" }
    ],
    ja: [
      { name: "ごま油", amount: "1", unit: "大さじ" },
      { name: "醤油", amount: "1", unit: "大さじ" },
      { name: "塩", amount: "0.25", unit: "少々" }
    ],
    ko: [
      { name: "참기름", amount: "1", unit: "큰술" },
      { name: "간장", amount: "1", unit: "큰술" },
      { name: "소금", amount: "0.25", unit: "약간" }
    ]
  }
};

const SUBSTITUTIONS = {
  "dh-cheese-stuffed-rice-cake-with-fresh-fish-seaweed": {
    en: ["soft tofu", "cheddar cheese slice"],
    ja: ["純豆腐", "チェダーチーズ"],
    ko: ["순두부", "체다 치즈"]
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

function formatYamlList(key, items, withCore = false) {
  const lines = [`${key}:`];
  for (const item of items) {
    lines.push(`- name: ${item.name}`);
    lines.push(`  amount: "${item.amount}"`);
    lines.push(`  unit: ${item.unit}`);
    if (withCore) lines.push(`  isCore: ${item.isCore}`);
  }
  return lines.join("\n");
}

function replaceYamlSection(fm, key, items, withCore = false) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === `${key}:`);
  if (start < 0) throw new Error(`Missing ${key}:`);
  let end = start + 1;
  while (end < lines.length) {
    const line = lines[end];
    if (line.startsWith("- ")) {
      end++;
      continue;
    }
    if (line.startsWith("  ")) {
      end++;
      continue;
    }
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line)) break;
    if (line.trim() === "") {
      end++;
      continue;
    }
    break;
  }
  const block = formatYamlList(key, items, withCore).split("\n");
  return [...lines.slice(0, start), ...block, ...lines.slice(end)].join("\n");
}

function replaceSubstitutions(fm, items) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "substitutions:");
  if (start < 0) return fm;
  let end = start + 1;
  while (end < lines.length && lines[end].startsWith("- ")) end++;
  const block = ["substitutions:", ...items.map((item) => `- ${item}`)];
  return [...lines.slice(0, start), ...block, ...lines.slice(end)].join("\n");
}

const updatedFiles = [];

for (const slug of SLUGS) {
  for (const locale of ["en", "ja", "ko"]) {
    const path = join(ROOT, localeDirs[locale], `${slug}.md`);
    const raw = readFileSync(path, "utf8");
    const { fm, body } = splitMarkdown(raw);
    let nextFm = replaceStepsBlock(fm, STEPS[slug][locale], locale);
    nextFm = replaceYamlSection(nextFm, "ingredients", INGREDIENTS[slug][locale], true);
    nextFm = replaceYamlSection(nextFm, "seasonings", SEASONINGS[slug][locale], false);
    if (SUBSTITUTIONS[slug]?.[locale]) {
      nextFm = replaceSubstitutions(nextFm, SUBSTITUTIONS[slug][locale]);
    }
    nextFm = nextFm.replace(/^updatedAt:.*$/m, `updatedAt: "${UPDATED}"`);
    const trimmedBody = body.trimStart();
    writeFileSync(path, `---\n${nextFm}\n---\n\n${trimmedBody}`, "utf8");
    updatedFiles.push(path);
  }
}

console.log(`Updated ${updatedFiles.length} files:`);
for (const f of updatedFiles) console.log(f);

