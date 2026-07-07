#!/usr/bin/env node
/**
 * Sync en/ja/ko steps and seasonings for batch 5 (13 slugs) to match zh.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const UPDATED = "2026-07-06";

const SLUGS = [
  "broccoli-mushroom-chicken-rice-bowl",
  "cabbage-carrot-chicken-rice-bowl",
  "curry-beef-rice",
  "garlic-tomato-chicken-rice-bowl",
  "mushroom-beef-rice-bowl",
  "onion-beef-rice-bowl",
  "tofu-egg-savory-rice-bowl",
  "tomato-beef-rice-bowl",
  "beef-tomato-noodles",
  "chicken-broccoli-pasta",
  "creamy-mushroom-pasta",
  "garden-vegetable-pasta",
  "garlic-cream-shrimp-pasta"
];

const STEPS = {
  "broccoli-mushroom-chicken-rice-bowl": {
    en: [
      "Dice chicken breast 220 g against the grain into about ½-inch cubes; cut broccoli 140 g into small florets; slice mushrooms 120 g; mince 2 garlic cloves. Portion 2 bowls cooked white rice into serving bowls.",
      "Toss chicken with 1 tsp soy sauce and rest 5–10 minutes to marinate (reserve 1 tsp soy sauce for stir-frying).",
      "Optional: blanch broccoli florets 30 seconds and drain to shorten pan time.",
      "Heat 1 tbsp olive oil in a skillet over medium heat. Spread chicken in a single layer; sear 2 minutes until golden on the bottom, flip and cook 1–2 minutes more until cooked through (no pink inside).",
      "Add mushrooms and minced garlic; stir-fry over medium heat 2 minutes until slightly softened and releasing moisture.",
      "Add broccoli and the remaining 1 tsp soy sauce; stir-fry over high heat 1–2 minutes until broccoli is bright green and evenly coated.",
      "Taste and portion chicken and vegetables over rice. For bento, cool to room temperature before closing the lid so rice stays fluffy."
    ],
    ja: [
      "鶏むね肉 220gを繊維に逆らって1.5cm角に切り、ブロッコリー 140gを小房に、きのこ 120gを薄切り、にんにく 2片をみじん切りにする。ご飯（白米） 2碗分を丼に分けておく。",
      "鶏肉を醤油 小さじ1でもみ込み、5～10分置いて味をなじませる（醤油 小さじ1は炒め用に取っておく）。",
      "ブロッコリーは30秒湯通しして水切りしてもよい（省略可。炒め時間を短くできる）。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1で鶏肉を広げ、底面が2分でこんがり色づくまで焼き、ひっくり返して1～2分、中心まで火を通す（断面にピンクが残らない）。",
      "きのことにんにくを加え、中火で2分炒め、やわらかく水分が出るまで。",
      "ブロッコリーと残りの醤油 小さじ1を加え、強火で1～2分、ブロッコリーが鮮やかな緑でタレが絡むまで炒める。",
      "味を見て鶏肉と野菜をご飯の上に盛る。お弁当は室温まで冷ましてから蓋を閉めると米がべたつきにくい。"
    ],
    ko: [
      "닭가슴살 220g을 결 반대로 1.5cm 정도 깍둑썰기하고, 브로콜리 140g은 작은 송이로, 버섯 120g은 슬라이스하며, 마늘 2쪽을 다집니다. 밥 2공기를 그릇에 나눠 둡니다.",
      "닭고기에 간장 1작은술을 넣고 5~10분 재워 맛을 냅니다(간장 1작은술은 볶을 때 씁니다).",
      "브로콜리는 30초 데쳐 건져도 됩니다(생략 가능, 볶는 시간을 줄일 수 있음).",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 닭고기를 펼쳐 2분간 바닥이 노릇해질 때까지 굽고, 뒤집어 1~2분 더 익혀 속까지 익힙니다(단면에 핑크가 없을 때).",
      "버섯과 다진 마늘을 넣고 중불로 2분 볶아 살짝 부드러워지고 물기가 나올 때까지 합니다.",
      "브로콜리와 남은 간장 1작은술을 넣고 강불로 1~2분 볶아 브로콜리가 선명한 녹색이 되고 양념이 고루 묻을 때까지 합니다.",
      "간을 맞춘 뒤 닭고기와 채소를 밥 위에 올립니다. 도시락은 실온까지 식힌 뒤 뚜껑을 닫으면 밥이 덜 눅눅해집니다."
    ]
  },
  "cabbage-carrot-chicken-rice-bowl": {
    en: [
      "Dice chicken breast 220 g against the grain; cut cabbage 180 g into bite-size pieces; dice carrot 80 g finely; mince 1 garlic clove. Portion 2 bowls cooked white rice into serving bowls.",
      "Toss chicken with 1 tsp soy sauce and rest 5–10 minutes to marinate (reserve 1 tsp soy sauce for finishing).",
      "Heat 1 tbsp olive oil in a skillet over medium heat; stir-fry carrot 2 minutes until slightly softened.",
      "Push carrot to the side; spread chicken in the pan and cook over medium heat 3–4 minutes until golden outside and cooked through (no pink inside).",
      "Add cabbage and minced garlic; stir-fry over high heat 1–2 minutes until bright green.",
      "Drizzle the remaining 1 tsp soy sauce around the edge of the pan; stir-fry over high heat 30 seconds to reduce juices.",
      "Taste and portion over rice. For bento, cool to room temperature before closing the lid."
    ],
    ja: [
      "鶏むね肉 220gを繊維に逆らって角切り、キャベツ 180gを一口大に、にんじん 80gを細かく角切り、にんにく 1片をみじん切りにする。ご飯（白米） 2碗分を丼に盛っておく。",
      "鶏肉を醤油 小さじ1でもみ込み、5～10分置いて味をなじませる（醤油 小さじ1は仕上げ用に取っておく）。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1でにんじんを2分炒め、やわらかくする。",
      "にんじんを端に寄せ、鶏肉を広げて中火で3～4分、表面がこんがり中心まで火が通るまで炒める（断面にピンクが残らない）。",
      "キャベツとにんにくを加え、強火で1～2分、鮮やかな緑になるまで炒める。",
      "残りの醤油 小さじ1を鍋の縁から回し入れ、強火で30秒汁気を飛ばす。",
      "味を見てご飯の上に盛る。お弁当は室温まで冷ましてから蓋を閉める。"
    ],
    ko: [
      "닭가슴살 220g을 결 반대로 깍둑썰기하고, 양배추 180g은 한입 크기로, 당근 80g은 잘게 깍둑썰기하며, 마늘 1쪽을 다집니다. 밥 2공기를 그릇에 담아 둡니다.",
      "닭고기에 간장 1작은술을 넣고 5~10분 재웁니다(간장 1작은술은 마무리용으로 남깁니다).",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 당근을 2분 볶아 살짝 부드럽게 합니다.",
      "당근을 한쪽으로 밀고 닭고기를 펼쳐 중불로 3~4분 볶아 겉은 노릇하고 속까지 익힙니다(단면에 핑크가 없을 때).",
      "양배추와 다진 마늘을 넣고 강불로 1~2분 볶아 선명한 녹색이 될 때까지 합니다.",
      "남은 간장 1작은술을 팬 가장자리에 둘러 강불로 30초 졸입니다.",
      "간을 맞춰 밥 위에 올립니다. 도시락은 실온까지 식힌 뒤 뚜껑을 닫으세요."
    ]
  },
  "curry-beef-rice": {
    en: [
      "Dice beef 100 g against the grain; slice onion ½ thinly along the grain; dice carrot 50 g. Portion 1 bowl cooked rice into a large bowl and keep warm.",
      "Heat 1 tbsp olive oil in a skillet over medium heat; stir-fry onion and carrot 2–3 minutes until slightly softened and fragrant.",
      "Add beef and stir-fry over high heat 1–2 minutes until the surface changes color.",
      "Sprinkle in 1.5 tbsp curry powder and stir-fry 30 seconds until fragrant (keep heat moderate to avoid scorching).",
      "Pour in 200 ml water; bring to a boil over high heat, then cover and simmer on low 10–12 minutes until beef is tender and the sauce slightly thickens.",
      "Season with a pinch of salt to taste; ladle curry beef and sauce over rice and serve."
    ],
    ja: [
      "牛肉 100gを繊維に逆らって角切り、玉ねぎ 1/2個を繊維に沿って薄切り、にんじん 50gを角切りにする。ご飯（白米） 1碗分を大きめの丼に盛り保温しておく。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1で玉ねぎとにんじんを2～3分炒め、やわらかく香りが出るまで。",
      "牛肉を加え、強火で1～2分、表面の色が変わるまで炒める。",
      "カレー粉 大さじ1.5を振り入れ、30秒香りが立つまで炒める（焦がさないよう火力に注意）。",
      "水 200mlを加え、強火で沸騰させたら弱火で蓋をして10～12分、牛肉がやわらかく汁が少しとろみがつくまで煮る。",
      "塩 少々で味を見て、カレー牛肉と汁をご飯にかけて完成。"
    ],
    ko: [
      "소고기 100g을 결 반대로 깍둑썰기하고, 양파 1/2개를 결 따라 얇게 채 썰며, 당근 50g을 깍둑썰기합니다. 밥 1공기를 큰 그릇에 담아 보온해 둡니다.",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 양파와 당근을 2~3분 볶아 살짝 부드럽고 향이 날 때까지 합니다.",
      "소고기를 넣고 강불로 1~2분 볶아 겉색이 변할 때까지 합니다.",
      "카레가루 1.5큰술을 뿌려 30초 향이 날 때까지 볶습니다(타지 않게 불 조절).",
      "물 200ml을 넣고 강불로 끓인 뒤 약불에 뚜껑을 덮고 10~12분 끓여 소고기가 부드럽고 국물이 살짝 걸쭉해질 때까지 합니다.",
      "소금 약간으로 간을 맞춘 뒤 카레 소고기와 국물을 밥 위에 올려 냅니다."
    ]
  },
  "garlic-tomato-chicken-rice-bowl": {
    en: [
      "Dice chicken breast 130 g against the grain; cut tomato 1 into chunks; mince 2 garlic cloves. Portion 1 bowl cooked rice into a large bowl and keep warm.",
      "Toss chicken with 0.75 tsp soy sauce and rest 5–10 minutes to marinate (reserve 0.75 tsp soy sauce for stir-frying).",
      "Heat 1 tbsp olive oil in a skillet over medium heat; sauté minced garlic 30 seconds until fragrant.",
      "Add tomato chunks and cook over medium heat 2–3 minutes until slightly softened and juicy.",
      "Spread chicken in the pan and cook over medium heat 3–4 minutes until golden outside and cooked through (no pink inside).",
      "Drizzle the remaining 0.75 tsp soy sauce; stir-fry over high heat 30 seconds until the sauce thickens slightly and coats the chicken.",
      "Season with a pinch of salt to taste; ladle chicken and tomato juices over rice and toss while hot."
    ],
    ja: [
      "鶏むね肉 130gを繊維に逆らって角切り、トマト 1個を塊切り、にんにく 2片をみじん切りにする。ご飯（白米） 1碗分を大きめの丼に盛り保温しておく。",
      "鶏肉を醤油 小さじ0.75でもみ込み、5～10分置いて味をなじませる（醤油 小さじ0.75は炒め用に取っておく）。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1でにんにくを30秒炒めて香りを出す。",
      "トマトを加え、中火で2～3分、やわらかく汁が出るまで炒める。",
      "鶏肉を広げ、中火で3～4分、表面がこんがり中心まで火が通るまで炒める（断面にピンクが残らない）。",
      "残りの醤油 小さじ0.75を回し入れ、強火で30秒、タレが少しとろみを帯び肉に絡むまで炒める。",
      "塩 少々で味を見て、鶏肉とトマトの汁をご飯にかけ、温かいうちに混ぜて食べる。"
    ],
    ko: [
      "닭가슴살 130g을 결 반대로 깍둑썰기하고, 토마토 1개는 덩어리로, 마늘 2쪽을 다집니다. 밥 1공기를 큰 그릇에 담아 보온해 둡니다.",
      "닭고기에 간장 0.75작은술을 넣고 5~10분 재웁니다(간장 0.75작은술은 볶을 때 씁니다).",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 다진 마늘을 30초 볶아 향을 냅니다.",
      "토마토를 넣고 중불로 2~3분 볶아 살짝 부드러워지고 즙이 나올 때까지 합니다.",
      "닭고기를 펼쳐 중불로 3~4분 볶아 겉은 노릇하고 속까지 익힙니다(단면에 핑크가 없을 때).",
      "남은 간장 0.75작은술을 둘러 강불로 30초 볶아 소스가 살짝 걸쭉해져 고기에 묻을 때까지 합니다.",
      "소금 약간으로 간을 맞춘 뒤 닭고기와 토마토 즙을 밥에 올려 뜨거울 때 비벼 먹습니다."
    ]
  },
  "mushroom-beef-rice-bowl": {
    en: [
      "Dice beef 100 g against the grain; slice mushrooms 80 g; mince 2 garlic cloves. Portion 1 bowl cooked white rice into a large bowl and keep warm.",
      "Toss beef with 0.75 tbsp soy sauce and rest 5–10 minutes to marinate (reserve 0.75 tbsp soy sauce for finishing).",
      "Heat 1 tbsp olive oil in a skillet over medium heat; sauté minced garlic 30 seconds until fragrant.",
      "Add mushrooms and stir-fry over medium heat 2 minutes until slightly softened, releasing moisture, and lightly browned at the edges.",
      "Spread beef in the pan and cook over medium heat 3–4 minutes until the surface changes color and cooked through.",
      "Pour in 60 ml water; cover and simmer on low 3–4 minutes. Uncover, drizzle the remaining 0.75 tbsp soy sauce, and stir-fry over high heat 30 seconds to reduce.",
      "Taste and ladle beef and sauce over rice."
    ],
    ja: [
      "牛肉 100gを繊維に逆らって角切り、きのこ 80gを薄切り、にんにく 2片をみじん切りにする。ご飯（白米） 1碗分を大きめの丼に盛り保温しておく。",
      "牛肉を醤油 大さじ0.75でもみ込み、5～10分置いて味をなじませる（醤油 大さじ0.75は仕上げ用に取っておく）。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1でにんにくを30秒炒めて香りを出す。",
      "きのこを加え、中火で2分、やわらかく水分が出て縁が少し色づくまで炒める。",
      "牛肉を広げ、中火で3～4分、表面の色が変わり中心まで火が通るまで炒める。",
      "水 60mlを加え、弱火で蓋をして3～4分煮る。蓋を外し、残りの醤油 大さじ0.75を回し入れ、強火で30秒汁気を飛ばす。",
      "味を見て、牛肉とタレをご飯にかけて完成。"
    ],
    ko: [
      "소고기 100g을 결 반대로 깍둑썰기하고, 버섯 80g은 슬라이스하며, 마늘 2쪽을 다집니다. 밥 1공기를 큰 그릇에 담아 보온해 둡니다.",
      "소고기에 간장 0.75큰술을 넣고 5~10분 재웁니다(간장 0.75큰술은 마무리용으로 남깁니다).",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 다진 마늘을 30초 볶아 향을 냅니다.",
      "버섯을 넣고 중불로 2분 볶아 살짝 부드러워지고 물기가 나오며 가장자리가 살짝 갈색이 될 때까지 합니다.",
      "소고기를 펼쳐 중불로 3~4분 볶아 겉색이 변하고 속까지 익힙니다.",
      "물 60ml을 넣고 약불에 뚜껑을 덮고 3~4분 끓입니다. 뚜껑을 열고 남은 간장 0.75큰술을 둘러 강불로 30초 졸입니다.",
      "간을 맞춘 뒤 소고기와 소스를 밥 위에 올립니다."
    ]
  },
  "onion-beef-rice-bowl": {
    en: [
      "Dice beef 100 g against the grain; slice onion ½ thinly. Portion 1 bowl cooked white rice into a large bowl and keep warm.",
      "Toss beef with 0.75 tbsp soy sauce and rest 5–10 minutes to marinate (reserve 0.75 tbsp soy sauce for the sauce).",
      "In a small bowl, stir together the remaining 0.75 tbsp soy sauce, 1 tsp sugar, and 80 ml water.",
      "Heat 1 tbsp olive oil in a skillet over medium heat; stir-fry onion 2–3 minutes until translucent, soft, and sweet-smelling.",
      "Spread beef in the pan and cook over medium heat 3–4 minutes until the surface changes color and cooked through.",
      "Pour in the sauce; cover and simmer on low 3–4 minutes. Uncover and stir-fry over high heat 30 seconds until slightly thickened (keep a little moisture for mixing with rice).",
      "Taste and ladle beef and sauce over rice."
    ],
    ja: [
      "牛肉 100gを繊維に逆らって角切り、玉ねぎ 1/2個を薄切りにする。ご飯（白米） 1碗分を大きめの丼に盛り保温しておく。",
      "牛肉を醤油 大さじ0.75でもみ込み、5～10分置いて味をなじませる（醤油 大さじ0.75はタレ用に取っておく）。",
      "小鉢に残りの醤油 大さじ0.75、砂糖 小さじ1、水 80mlを混ぜてタレを作る。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1で玉ねぎを2～3分炒め、透明になりやわらかく甘い香りが出るまで。",
      "牛肉を広げ、中火で3～4分、表面の色が変わり中心まで火が通るまで炒める。",
      "タレを加え、弱火で蓋をして3～4分煮る。蓋を外し、強火で30秒、少しとろみがつくまで炒める（ご飯と和える余裕のあるとろみに）。",
      "味を見て、牛肉とタレをご飯にかけて完成。"
    ],
    ko: [
      "소고기 100g을 결 반대로 깍둑썰기하고, 양파 1/2개를 가늘게 채 썹니다. 밥 1공기를 큰 그릇에 담아 보온해 둡니다.",
      "소고기에 간장 0.75큰술을 넣고 5~10분 재웁니다(간장 0.75큰술은 소스용으로 남깁니다).",
      "작은 그릇에 남은 간장 0.75큰술, 설탕 1작은술, 물 80ml을 섞어 소스를 만듭니다.",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 양파를 2~3분 볶아 투명하고 부드러우며 달콤한 향이 날 때까지 합니다.",
      "소고기를 펼쳐 중불로 3~4분 볶아 겉색이 변하고 속까지 익힙니다.",
      "소스를 넣고 약불에 뚜껑을 덮고 3~4분 끓입니다. 뚜껑을 열고 강불로 30초 볶아 살짝 걸쭉해질 때까지 합니다(밥과 비빌 만큼 촉촉하게).",
      "간을 맞춘 뒤 소고기와 소스를 밥 위에 올립니다."
    ]
  },
  "tofu-egg-savory-rice-bowl": {
    en: [
      "Cut tofu ½ box into about ½-inch cubes and pat dry with paper towels; beat 1 egg with a pinch of salt; slice 1 scallion for garnish. Portion 1 bowl cooked rice into a large bowl and keep warm.",
      "Lightly toss tofu with 0.5 tsp soy sauce to season (reserve 0.5 tsp soy sauce for finishing).",
      "Heat 1 tbsp olive oil in a skillet over medium heat; spread tofu in a single layer and pan-fry 3–4 minutes until golden on the bottom, flip and cook 2 minutes more until lightly crisp.",
      "Push tofu to the side; pour in the egg, lower heat, and gently fold egg with tofu; cover and cook 1–2 minutes until eggs are about 70% set (center still slightly moist).",
      "Add scallion and toss 10 seconds.",
      "Drizzle the remaining 0.5 tsp soy sauce; stir-fry over high heat 20 seconds until evenly coated.",
      "Taste and ladle tofu-egg mixture and juices over rice; toss while hot."
    ],
    ja: [
      "豆腐 1/2丁を1.5cm角に切り、キッチンペーパーで表面の水分を拭く。卵 1個を塩 少々で溶き、長ねぎ 1本を小口切りにする。ご飯（白米） 1碗分を大きめの丼に盛り保温しておく。",
      "豆腐を醤油 小さじ0.5で軽くもみ込んで味をつける（醤油 小さじ0.5は仕上げ用に取っておく）。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1で豆腐を広げ、底面が3～4分でこんがり色づくまで焼き、ひっくり返して2分、香ばしく。",
      "豆腐を端に寄せ、卵を流し入れ、弱火で軽く混ぜ、蓋をして1～2分、卵が7分熟（中心が少し湿る）になるまで。",
      "長ねぎを加え、10秒混ぜる。",
      "残りの醤油 小さじ0.5を回し入れ、強火で20秒、全体に絡める。",
      "味を見て、豆腐と卵のあんをご飯にかけ、温かいうちに混ぜて食べる。"
    ],
    ko: [
      "두부 1/2모를 1.5cm 정도 깍둑썰기하고 키친타월로 표면 수분을 뺍니다. 달걀 1개에 소금 약간을 넣어 풀고, 대파 1대를 송송 썹니다. 밥 1공기를 큰 그릇에 담아 보온해 둡니다.",
      "두부에 간장 0.5작은술을 가볍게 버무려 밑간합니다(간장 0.5작은술은 마무리용으로 남깁니다).",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 두부를 펼쳐 3~4분간 바닥이 노릇해질 때까지 굽고, 뒤집어 2분 더 살짝 바삭하게 합니다.",
      "두부를 한쪽으로 밀고 달걀을 부어 약불로 가볍게 섞은 뒤 뚜껑을 덮고 1~2분 익혀 달걀이 70% 정도 익을 때까지 합니다(가운데는 살짝 촉촉하게).",
      "대파를 넣고 10초 버무립니다.",
      "남은 간장 0.5작은술을 둘러 강불로 20초 볶아 고루 묻힙니다.",
      "간을 맞춘 뒤 두부 달걀과 국물을 밥에 올려 뜨거울 때 비벼 먹습니다."
    ]
  },
  "tomato-beef-rice-bowl": {
    en: [
      "Dice beef 100 g against the grain; cut tomato 1 into chunks. Portion 1 bowl cooked rice into a large bowl and keep warm.",
      "Toss beef with 0.5 tsp soy sauce and rest 5–10 minutes to marinate (reserve 0.5 tsp soy sauce for finishing).",
      "Heat 1 tbsp olive oil in a skillet over medium heat; cook tomato chunks 2–3 minutes until slightly softened and juicy.",
      "Spread beef in the pan and cook over medium heat 3–4 minutes until the surface changes color and cooked through.",
      "Stir in 1 tbsp tomato paste and ½ tsp sugar; cook 1 minute until the sauce thickens.",
      "Drizzle the remaining 0.5 tsp soy sauce; stir-fry over high heat 30 seconds to reduce.",
      "Taste (add a pinch more sugar if tomato is tart); ladle tomato beef and sauce over rice."
    ],
    ja: [
      "牛肉 100gを繊維に逆らって角切り、トマト 1個を塊切りにする。ご飯（白米） 1碗分を大きめの丼に盛り保温しておく。",
      "牛肉を醤油 小さじ0.5でもみ込み、5～10分置いて味をなじませる（醤油 小さじ0.5は仕上げ用に取っておく）。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1でトマトを2～3分炒め、やわらかく汁が出るまで。",
      "牛肉を広げ、中火で3～4分、表面の色が変わり中心まで火が通るまで炒める。",
      "トマトケチャップ 大さじ1と砂糖 小さじ1/2を加え、1分炒めてタレをとろみさせる。",
      "残りの醤油 小さじ0.5を回し入れ、強火で30秒汁気を飛ばす。",
      "味を見て（トマトが酸っぱい場合は砂糖を少し足す）、トマト牛肉とタレをご飯にかけて完成。"
    ],
    ko: [
      "소고기 100g을 결 반대로 깍둑썰기하고, 토마토 1개는 덩어리로 썹니다. 밥 1공기를 큰 그릇에 담아 보온해 둡니다.",
      "소고기에 간장 0.5작은술을 넣고 5~10분 재웁니다(간장 0.5작은술은 마무리용으로 남깁니다).",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 토마토를 2~3분 볶아 살짝 부드러워지고 즙이 나올 때까지 합니다.",
      "소고기를 펼쳐 중불로 3~4분 볶아 겉색이 변하고 속까지 익힙니다.",
      "케첩 1큰술과 설탕 1/2작은술을 넣고 1분 볶아 소스를 걸쭉하게 합니다.",
      "남은 간장 0.5작은술을 둘러 강불로 30초 졸입니다.",
      "간을 맞춥니다(토마토가 시면 설탕을 조금 더 넣음). 토마토 소고기와 소스를 밥 위에 올립니다."
    ]
  },
  "beef-tomato-noodles": {
    en: [
      "Slice beef 100 g thinly against the grain; cut tomato 1 into chunks; prepare noodles 1 serving per package directions.",
      "Bring a pot of salted water to a boil; cook noodles 7–10 minutes per package until springy, drain, and portion into a large bowl.",
      "Heat 1 tbsp olive oil in a skillet over medium-high heat; cook tomato chunks 2–3 minutes until slightly softened and juicy.",
      "Add 1 tbsp tomato paste, 1 tbsp soy sauce, ½ tsp sugar, and 500 ml water; bring to a boil over high heat, then simmer on medium-low 5 minutes until flavors meld.",
      "Raise heat to high; add beef slices and separate with chopsticks; cook 1–2 minutes until just colored; turn off heat (do not overcook).",
      "Ladle hot broth and beef over the noodles; top with scallions or black pepper if desired; serve hot."
    ],
    ja: [
      "牛肉 100gを繊維に逆らって薄切り、トマト 1個を塊切り、麺 1人前を用意する。",
      "湯鍋にたっぷりの湯を沸かし、塩を少々入れ、麺を表示時間の7～10分ゆで、弾力が出たら水切りして大きめの丼に盛る。",
      "フライパンを中強火に熱し、オリーブオイル 大さじ1でトマトを2～3分炒め、やわらかく汁が出るまで。",
      "トマトケチャップ 大さじ1、醤油 大さじ1、砂糖 小さじ1/2、水 500mlを加え、強火で沸騰させてから中弱火で5分、味をなじませる。",
      "強火に戻し、牛肉を加えて箸でほぐし、1～2分色が変わったら火を止める（煮込みすぎない）。",
      "熱いスープと牛肉を麺にかけ、好みで長ねぎや黒胡椒を振り、温かいうちに食べる。"
    ],
    ko: [
      "소고기 100g을 결 반대로 얇게 썰고, 토마토 1개는 덩어리로, 면 1인분을 준비합니다.",
      "냄비에 물을 넉넉히 끓이고 소금을 조금 넣은 뒤 면을 포장 표시 시간 7~10분 삶아 탄력이 나면 건져 큰 그릇에 담습니다.",
      "팬에 올리브 오일 1큰술을 중강불로 달군 뒤 토마토를 2~3분 볶아 살짝 부드러워지고 즙이 나올 때까지 합니다.",
      "케첩 1큰술, 간장 1큰술, 설탕 1/2작은술, 물 500ml을 넣고 강불로 끓인 뒤 중약불로 5분 끓여 맛을 냅니다.",
      "강불로 올려 소고기를 넣고 젓가락으로 풀어 1~2분 색이 변하면 불을 끕니다(오래 끓이지 않음).",
      "뜨거운 국물과 소고기를 면 위에 부어 취향에 따라 파나 후추를 뿌리고 뜨거울 때 먹습니다."
    ]
  },
  "chicken-broccoli-pasta": {
    en: [
      "Cut chicken breast 120 g into strips against the grain; season with a pinch of salt and black pepper and rest 5 minutes. Cut broccoli 100 g into small florets; mince 2 garlic cloves.",
      "Bring a pot of salted water to a boil; cook spaghetti 80 g 7–9 minutes per package until al dente, drain, and reserve ½ cup pasta water.",
      "Heat 1 tbsp olive oil in a skillet over medium heat; lay chicken in a single layer and pan-fry 5–6 minutes until golden both sides and cooked through (no pink inside); set aside.",
      "Add ½ tbsp more olive oil to the same pan if needed; sauté minced garlic 30 seconds until fragrant.",
      "Add broccoli and stir-fry over medium heat 2 minutes until bright green and slightly tender (blanch 1 minute first if you prefer softer).",
      "Add pasta, chicken, and 3–4 tbsp pasta water; toss over high heat 1–2 minutes until pasta is coated and lightly glossy.",
      "Taste and adjust salt and pepper; plate and serve hot."
    ],
    ja: [
      "鶏むね肉 120gを繊維に逆らって細切りにし、塩 少々と黒胡椒 少々でもみ込み5分置く。ブロッコリー 100gを小房に、にんにく 2片をみじん切りにする。",
      "湯鍋にたっぷりの湯を沸かし、塩を少々入れ、スパゲッティ 80gを表示時間の7～9分アルデンテに茹で、水切りして茹で汁を半カップ取っておく。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1で鶏肉を一枚に広げ、両面こんがり中心まで5～6分焼き（断面にピンクが残らない）、取り出す。",
      "同じ鍋にオリーブオイル 大さじ1/2を足し（油が足りなければ）、にんにくを30秒炒めて香りを出す。",
      "ブロッコリーを加え、中火で2分、鮮やかな緑でやややわらかくなるまで炒める（柔らかくしたい場合は1分湯通ししてから）。",
      "パスタ、鶏肉、茹で汁 大さじ3～4を加え、強火で1～2分、パスタに油汁が絡み少しとろみがつくまで和える。",
      "塩と胡椒で味を見て、皿に盛り温かいうちに食べる。"
    ],
    ko: [
      "닭가슴살 120g을 결 반대로 채 썰고 소금 약간과 후추 약간으로 5분 재웁니다. 브로콜리 100g은 작은 송이로, 마늘 2쪽을 다집니다.",
      "냄비에 물을 넉넉히 끓이고 소금을 조금 넣은 뒤 스파게티 80g을 포장 표시 7~9분 알덴테로 삶아 건지고 삶은 물 반 컵을 남깁니다.",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 닭고기를 한 겹으로 펼쳐 양면이 노릇하고 속까지 5~6분 굽습니다(단면에 핑크가 없을 때). 건져 둡니다.",
      "같은 팬에 올리브 오일 1/2큰술을 더 넣고(기름이 부족하면), 다진 마늘을 30초 볶아 향을 냅니다.",
      "브로콜리를 넣고 중불로 2분 볶아 선명한 녹색이 되고 살짝 부드러워질 때까지 합니다(더 부드럽게 하려면 1분 데친 뒤 볶아도 됨).",
      "파스타, 닭고기, 삶은 물 3~4큰술을 넣고 강불로 1~2분 버무려 면에 기름기가 고루 묻고 살짝 걸쭉해질 때까지 합니다.",
      "소금과 후추로 간을 맞춰 접시에 담아 뜨거울 때 냅니다."
    ]
  },
  "creamy-mushroom-pasta": {
    en: [
      "Slice mushrooms 80 g.",
      "Bring a pot of salted water to a boil; cook spaghetti 80 g 7–9 minutes per package until al dente, drain, and reserve ½ cup pasta water.",
      "Heat a skillet over medium heat with 1 tsp butter; melt butter and stir-fry mushrooms 2–3 minutes until softened and lightly browned at the edges.",
      "Lower heat; pour in 120 ml milk and stir gently. Bring to a simmer and reduce on low about 2 minutes until sauce coats a spoon (keep heat low to avoid scorching).",
      "Add pasta and 3–4 tbsp pasta water; toss over medium-high heat 1–2 minutes until every strand is coated with cream sauce.",
      "Season with a pinch of salt and black pepper to taste; plate and serve hot."
    ],
    ja: [
      "きのこ 80gを薄切りにする。",
      "湯鍋にたっぷりの湯を沸かし、塩を少々入れ、スパゲッティ 80gを表示時間の7～9分アルデンテに茹で、水切りして茹で汁を半カップ取っておく。",
      "フライパンを中火に熱し、バター 小さじ1を溶かしてきのこを2～3分炒め、やわらかく縁が少し色づくまで。",
      "弱火にし、牛乳 120mlを加えて軽く混ぜ、沸騰させてから弱火で約2分、スプーンにとろみがつくまで煮詰める（焦がさないよう小火で）。",
      "パスタと茹で汁 大さじ3～4を加え、中強火で1～2分、麺全体にクリームソースが絡むまで和える。",
      "塩 少々と黒胡椒 少々で味を見て、皿に盛り温かいうちに食べる。"
    ],
    ko: [
      "버섯 80g을 슬라이스합니다.",
      "냄비에 물을 넉넉히 끓이고 소금을 조금 넣은 뒤 스파게티 80g을 포장 표시 7~9분 알덴테로 삶아 건지고 삶은 물 반 컵을 남깁니다.",
      "팬을 중불로 달군 뒤 버터 1작은술을 녹이고 버섯을 2~3분 볶아 부드러워지고 가장자리가 살짝 갈색이 될 때까지 합니다.",
      "약불로 줄이고 우유 120ml을 넣어 가볍게 저어 끓인 뒤 약불로 약 2분 졸여 숟가락에 소스가 걸릴 때까지 합니다(타지 않게 약불 유지).",
      "파스타와 삶은 물 3~4큰술을 넣고 중강불로 1~2분 버무려 면 전체에 크림 소스가 고루 묻을 때까지 합니다.",
      "소금 약간과 후추 약간으로 간을 맞춰 접시에 담아 뜨거울 때 냅니다."
    ]
  },
  "garden-vegetable-pasta": {
    en: [
      "Dice tomato 1; dice zucchini ½ and bell pepper ¼ into about ½ cm cubes; mince 2 garlic cloves.",
      "Bring a pot of salted water to a boil; cook spaghetti 80 g 7–9 minutes per package until al dente, drain, and reserve ½ cup pasta water.",
      "Heat a skillet over medium-high heat with 1.5 tbsp olive oil; stir-fry bell pepper and zucchini 2 minutes until edges soften.",
      "Add tomato and minced garlic; cook over medium heat 2 minutes until tomato releases juice and softens.",
      "Stir in 1 tbsp tomato paste and 3–4 tbsp pasta water; bring to a simmer and reduce over medium heat about 1 minute.",
      "Add pasta and toss over high heat 1 minute until coated with sauce.",
      "Season with a pinch of salt and black pepper to taste; drizzle the remaining ½ tbsp olive oil before serving if desired."
    ],
    ja: [
      "トマト 1個を角切り、ズッキーニ 1/2本とパプリカ 1/4個を0.5cm角に、にんにく 2片をみじん切りにする。",
      "湯鍋にたっぷりの湯を沸かし、塩を少々入れ、スパゲッティ 80gを表示時間の7～9分アルデンテに茹で、水切りして茹で汁を半カップ取っておく。",
      "フライパンを中強火に熱し、オリーブオイル 大さじ1.5でパプリカとズッキーニを2分炒め、縁がやわらかくなるまで。",
      "トマトとにんにくを加え、中火で2分、トマトが汁を出してやわらかくなるまで炒める。",
      "トマトケチャップ 大さじ1と茹で汁 大さじ3～4を加え、沸騰させてから中火で約1分とろみをつける。",
      "パスタを加え、強火で1分、ソースが絡むまで和える。",
      "塩 少々と黒胡椒 少々で味を見て、仕上げに残りのオリーブオイル 大さじ1/2を回しかけてもよい。"
    ],
    ko: [
      "토마토 1개를 깍둑썰기하고, 주키니 1/2개와 피망 1/4개를 0.5cm 정도 깍둑썰기하며, 마늘 2쪽을 다집니다.",
      "냄비에 물을 넉넉히 끓이고 소금을 조금 넣은 뒤 스파게티 80g을 포장 표시 7~9분 알덴테로 삶아 건지고 삶은 물 반 컵을 남깁니다.",
      "팬에 올리브 오일 1.5큰술을 중강불로 달군 뒤 피망과 주키니를 2분 볶아 가장자리가 살짝 부드러워질 때까지 합니다.",
      "토마토와 다진 마늘을 넣고 중불로 2분 볶아 토마토가 즙을 내고 부드러워질 때까지 합니다.",
      "케첩 1큰술과 삶은 물 3~4큰술을 넣고 끓인 뒤 중불로 약 1분 졸입니다.",
      "파스타를 넣고 강불로 1분 버무려 소스가 고루 묻을 때까지 합니다.",
      "소금 약간과 후추 약간으로 간을 맞춥니다. 마무리에 남은 올리브 오일 1/2큰술을 둘러도 좋습니다."
    ]
  },
  "garlic-cream-shrimp-pasta": {
    en: [
      "Peel and devein shrimp 120 g; pat dry with paper towels. Mince 3 garlic cloves.",
      "Bring a pot of salted water to a boil; cook spaghetti 80 g 7–9 minutes per package until al dente, drain, and reserve 1 cup pasta water.",
      "Heat a skillet over medium heat with 1 tbsp olive oil and minced garlic; cook over low heat about 30 seconds until fragrant (do not burn).",
      "Raise heat to high; add shrimp and stir-fry 1–2 minutes until pink and curled; remove promptly.",
      "Lower heat; add 20 g butter and 100 ml milk; stir gently until simmering; add 3–4 tbsp pasta water to reach a creamy sauce consistency.",
      "Add pasta and shrimp; toss over high heat 1 minute until sauce coats the noodles. Season with a pinch of salt, black pepper, and 1 tsp lemon juice; serve hot."
    ],
    ja: [
      "エビ 120gの背ワタを取り洗い、キッチンペーパーで水気を拭く。にんにく 3片をみじん切りにする。",
      "湯鍋にたっぷりの湯を沸かし、塩を少々入れ、スパゲッティ 80gを表示時間の7～9分アルデンテに茹で、水切りして茹で汁を1カップ取っておく。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1とにんにくを弱火で約30秒、香りが立つまで炒める（焦がさない）。",
      "強火に上げ、エビを加え1～2分、ピンク色でカーブしたらすぐ取り出す。",
      "弱火にし、バター 20gと牛乳 100mlを加えて軽く混ぜ沸騰させ、茹で汁 大さじ3～4でクリームソースのとろみに調整する。",
      "パスタとエビを加え、強火で1分ソースを絡める。塩 少々、黒胡椒 少々、レモン汁 小さじ1で味を見て、温かいうちに食べる。"
    ],
    ko: [
      "새우 120g의 내장을 제거하고 씻어 키친타월로 물기를 뺍니다. 마늘 3쪽을 다집니다.",
      "냄비에 물을 넉넉히 끓이고 소금을 조금 넣은 뒤 스파게티 80g을 포장 표시 7~9분 알덴테로 삶아 건지고 삶은 물 1컵을 남깁니다.",
      "팬에 올리브 오일 1큰술과 다진 마늘을 중불로 달군 뒤 약불로 약 30초 볶아 향을 냅니다(타지 않게).",
      "강불로 올려 새우를 넣고 1~2분 볶아 분홍색으로 말리면 바로 건집니다.",
      "약불로 줄이고 버터 20g과 우유 100ml을 넣어 가볍게 저어 끓인 뒤 삶은 물 3~4큰술로 크림 소스 농도를 맞춥니다.",
      "파스타와 새우를 넣고 강불로 1분 버무려 소스가 면에 묻게 합니다. 소금 약간, 후추 약간, 레몬즙 1작은술로 간을 맞춰 뜨거울 때 냅니다."
    ]
  }
};

/** Seasoning patches keyed by locale file path suffix */
const SEASONING_PATCHES = {
  "broccoli-mushroom-chicken-rice-bowl": {
    en: { add: [{ name: "Olive oil", amount: "1", unit: "Tbsp" }] },
    ja: { add: [{ name: "オリーブオイル", amount: "1", unit: "大さじ" }] },
    ko: { add: [{ name: "올리브 오일", amount: "1", unit: "큰술" }] }
  },
  "cabbage-carrot-chicken-rice-bowl": {
    en: { add: [{ name: "Olive oil", amount: "1", unit: "Tbsp" }] },
    ja: { add: [{ name: "オリーブオイル", amount: "1", unit: "大さじ" }] },
    ko: { add: [{ name: "올리브 오일", amount: "1", unit: "큰술" }] }
  },
  "garlic-tomato-chicken-rice-bowl": {
    en: { add: [{ name: "Olive oil", amount: "1", unit: "Tbsp" }] },
    ja: { add: [{ name: "オリーブオイル", amount: "1", unit: "大さじ" }] },
    ko: { add: [{ name: "올리브 오일", amount: "1", unit: "큰술" }] }
  },
  "mushroom-beef-rice-bowl": {
    en: {
      ingredientsAdd: [{ name: "Water", amount: "60", unit: "ml", isCore: false }],
      add: [{ name: "Olive oil", amount: "1", unit: "Tbsp" }]
    },
    ja: {
      ingredientsAdd: [{ name: "水", amount: "60", unit: "ml", isCore: false }],
      add: [{ name: "オリーブオイル", amount: "1", unit: "大さじ" }]
    },
    ko: {
      ingredientsAdd: [{ name: "물", amount: "60", unit: "ml", isCore: false }],
      add: [{ name: "올리브 오일", amount: "1", unit: "큰술" }]
    }
  },
  "onion-beef-rice-bowl": {
    en: {
      ingredientsAdd: [{ name: "Water", amount: "80", unit: "ml", isCore: false }],
      add: [{ name: "Olive oil", amount: "1", unit: "Tbsp" }]
    },
    ja: {
      ingredientsAdd: [{ name: "水", amount: "80", unit: "ml", isCore: false }],
      add: [{ name: "オリーブオイル", amount: "1", unit: "大さじ" }]
    },
    ko: {
      ingredientsAdd: [{ name: "물", amount: "80", unit: "ml", isCore: false }],
      add: [{ name: "올리브 오일", amount: "1", unit: "큰술" }]
    }
  },
  "tofu-egg-savory-rice-bowl": {
    en: { add: [{ name: "Olive oil", amount: "1", unit: "Tbsp" }] },
    ja: { add: [{ name: "オリーブオイル", amount: "1", unit: "大さじ" }] },
    ko: { add: [{ name: "올리브 오일", amount: "1", unit: "큰술" }] }
  },
  "tomato-beef-rice-bowl": {
    en: { add: [{ name: "Olive oil", amount: "1", unit: "Tbsp" }] },
    ja: { add: [{ name: "オリーブオイル", amount: "1", unit: "大さじ" }] },
    ko: { add: [{ name: "올리브 오일", amount: "1", unit: "큰술" }] }
  },
  "curry-beef-rice": {
    en: {
      ingredientsAdd: [{ name: "Water", amount: "200", unit: "ml", isCore: false }]
    },
    ja: {
      ingredientsAdd: [{ name: "水", amount: "200", unit: "ml", isCore: false }]
    },
    ko: {
      ingredientsAdd: [{ name: "물", amount: "200", unit: "ml", isCore: false }]
    }
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

function hasSeasoning(fm, name) {
  return new RegExp(`^- name: ${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "m").test(fm);
}

function insertYamlListItems(fm, key, items) {
  const marker = `${key}:`;
  const start = fm.indexOf(marker);
  if (start < 0) return fm;
  let pos = start + marker.length;
  while (pos < fm.length && fm[pos] !== "\n") pos++;
  pos++;

  let end = pos;
  const lines = fm.slice(pos).split("\n");
  let consumed = 0;
  for (const line of lines) {
    if (line.startsWith("- ")) {
      consumed += line.length + 1;
      continue;
    }
    break;
  }
  end = pos + consumed;

  const block = items
    .map((item) => {
      const core = item.isCore !== undefined ? `\n  isCore: ${item.isCore}` : "";
      return `- name: ${item.name}\n  amount: '${item.amount}'\n  unit: ${item.unit}${core}`;
    })
    .join("\n");

  return fm.slice(0, end) + (end > pos && !fm.slice(pos, end).endsWith("\n") ? "\n" : "") + block + "\n" + fm.slice(end);
}

function patchSeasonings(fm, slug, locale) {
  const patch = SEASONING_PATCHES[slug]?.[locale];
  if (!patch) return fm;
  let next = fm;
  if (patch.ingredientsAdd) {
    for (const item of patch.ingredientsAdd) {
      if (!hasSeasoning(next, item.name)) {
        next = insertYamlListItems(next, "ingredients", [item]);
      }
    }
  }
  if (patch.add) {
    for (const item of patch.add) {
      if (!hasSeasoning(next, item.name)) {
        next = insertYamlListItems(next, "seasonings", [item]);
      }
    }
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
    nextFm = patchSeasonings(nextFm, slug, locale);
    nextFm = nextFm.replace(/^updatedAt:.*$/m, `updatedAt: "${UPDATED}"`);
    const trimmedBody = body.trimStart();
    writeFileSync(path, `---\n${nextFm}\n---\n\n${trimmedBody}`, "utf8");
    updatedFiles.push(path);
  }
}

console.log(`Updated ${updatedFiles.length} files:`);
for (const f of updatedFiles) console.log(f);
