#!/usr/bin/env node
/**
 * Sync en/ja/ko steps for 14 sf recipes to match zh; set updatedAt 2026-07-06.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const UPDATED = "2026-07-06";

const SLUGS = [
  "sf-orange-danish-sunny-sous-vide-chicken",
  "sf-greek-campfire-grilled-chicken-brunch",
  "sf-griddled-butter-ham-sandwich",
  "sf-balsamic-mushroom-pasta",
  "sf-cheesy-local-sausage-cream-pasta",
  "sf-classic-pesto-shrimp-pasta",
  "sf-dawn-shrimp-chicken-linguine",
  "sf-homestyle-meat-sauce-penne-with-meatballs",
  "sf-kids-cream-chicken-penne",
  "sf-salted-egg-bitter-melon-pasta",
  "sf-second-floor-fiesta-shrimp-penne",
  "sf-spicy-pepper-karaage-pasta",
  "sf-spicy-tomato-bacon-penne",
  "sf-truffle-mushroom-cream-pasta"
];

const PASTA_BOIL = {
  spaghetti: {
    en: "Bring a large pot of water to a rolling boil over high heat; add sea salt 1/3 tsp. Cook spaghetti 180 g 1 minute less than package time until al dente; drain and reserve about ½ cup pasta cooking water.",
    ja: "湯鍋にたっぷりの湯を強火で沸騰させ、海塩 小さじ1/3を加える。スパゲッティ 180gを表示時間より1分短くアルデンテに茹で、水切りして茹で汁を約半カップ取っておく。",
    ko: "냄비에 물을 넉넉히 강불로 끓인 뒤 바다소금 1/3작은술을 넣습니다. 스파게티 180g을 포장 표시보다 1분 짧게 알덴테로 삶아 건지고 삶은 물 약 반 컵을 남깁니다."
  },
  penne: {
    en: "Bring a large pot of water to a rolling boil over high heat; add sea salt 1/3 tsp. Cook penne 180 g 1 minute less than package time until al dente; drain and reserve about ½ cup pasta cooking water.",
    ja: "湯鍋にたっぷりの湯を強火で沸騰させ、海塩 小さじ1/3を加える。ペンネ 180gを表示時間より1分短くアルデンテに茹で、水切りして茹で汁を約半カップ取っておく。",
    ko: "냄비에 물을 넉넉히 강불로 끓인 뒤 바다소금 1/3작은술을 넣습니다. 펜네 180g을 포장 표시보다 1분 짧게 알덴테로 삶아 건지고 삶은 물 약 반 컵을 남깁니다."
  },
  penneLight: {
    en: "Bring a large pot of water to a rolling boil over high heat; add sea salt 1/3 tsp (slightly less salty than the adult version). Cook penne 180 g 1 minute less than package time until al dente; drain and reserve about ½ cup pasta cooking water.",
    ja: "湯鍋にたっぷりの湯を強火で沸騰させ、海塩 小さじ1/3を加える（大人版よりやや薄味）。ペンネ 180gを表示時間より1分短くアルデンテに茹で、水切りして茹で汁を約半カップ取っておく。",
    ko: "냄비에 물을 넉넉히 강불로 끓인 뒤 바다소금 1/3작은술을 넣습니다(어른용보다 약간 담백하게). 펜네 180g을 포장 표시보다 1분 짧게 알덴테로 삶아 건지고 삶은 물 약 반 컵을 남깁니다."
  }
};

const STEPS = {
  "sf-orange-danish-sunny-sous-vide-chicken": {
    en: [
      "Arrange orange Danish pastry 2 portions on a baking sheet; bake at 350°F for 3–5 minutes until the outside is crisp and the inside stays soft. Portion honey mustard 2 Tbsp into a small bowl.",
      "Pat sous vide chicken 180 g dry with paper towels; season with sea salt 1/6 tsp and a pinch of black pepper. Heat olive oil ½ Tbsp in a skillet over medium heat; sear skin-side down 3 minutes until golden, flip and cook 2 minutes more until cooked through; slice and keep warm.",
      "In another skillet over medium heat, pan-fry potato hash 250 g until golden and crisp at the edges; set aside and keep warm.",
      "Add a little butter to a skillet over medium heat; crack sunny-side eggs 2 and cover; fry 2–3 minutes until the whites are set and yolks runny (sunny side up); keep warm.",
      "On a large round plate, arrange sections of baked orange Danish, sous vide chicken, potato hash, and 2 sunny-side eggs.",
      "Drizzle honey mustard 2 Tbsp over the chicken and eggs, then olive oil 1 Tbsp; sprinkle sea salt 1/3 tsp and black pepper ¼ tsp.",
      "Check that the sauce is evenly distributed and serve immediately while hot."
    ],
    ja: [
      "橙香丹麥 2份を天板に並べ、180℃のオーブンで3～5分、外側が香ばしく中がふんわりするまで焼く。蜂蜜芥末 大さじ2を小鉢に盛る。",
      "舒肥雞 180gの水気をキッチンペーパーで拭き、海塩 小さじ1/6と黒胡椒 少々を振る。フライパンを中火に熱し、オリーブオイル 大さじ1/2で皮目を下に3分こんがり焼き、ひっくり返してさらに2分火を通し、スライスして保温する。",
      "炒薯 250gを別のフライパンで中火、表面がこんがり焦げるまで炒め、取り出して保温する。",
      "フライパンを中火に熱し、バターを少々加え、荷包蛋 2個を割り入れて蓋をする。2～3分、白身が固まり黄身がとろり（サニーサイドアップ）したら取り出して保温する。",
      "大きな丸皿に、焼いた橙香丹麥、舒肥雞、炒薯、荷包蛋 2個を分けて盛る。",
      "鶏肉と卵に蜂蜜芥末 大さじ2をかけ、続けてオリーブオイル 大さじ1、海塩 小さじ1/3、黒胡椒 小さじ1/4を振る。",
      "ソースが均一にかかっていることを確認し、熱いうちに提供する。"
    ],
    ko: [
      "橙香丹麥 2份을 오븐 팬에 올리고 180°C에서 3~5분 굽어 겉은 바삭하고 속은 부드럽게 합니다. 꿀 머스타드 2큰술을 작은 그릇에 담아 둡니다.",
      "舒肥雞 180g의 수분을 키친타월로 닦고 바다소금 1/6작은술과 후추 약간을 뿌립니다. 팬에 올리브 오일 1/2큰술을 중불로 달군 뒤 껍질 면을 아래로 3분 노릇하게 굽고, 뒤집어 2분 더 익힌 뒤 썰어 따뜻하게 보관합니다.",
      "炒薯 250g은 다른 팬에 중불로 겉이 노릇하고 바삭해질 때까지 볶아 따뜻하게 둡니다.",
      "팬에 버터를 조금 넣고 중불로 달군 뒤 荷包蛋 2개를 깨어 뚜껑을 덮습니다. 2~3분간 흰자가 익고 노른자가 흐르게(써니사이드업) 익힌 뒤 따뜻하게 둡니다.",
      "큰 원형 접시에 구운 橙香丹麥, 舒肥雞, 炒薯, 荷包蛋 2개를 구역별로 담습니다.",
      "닭고기와 달걀에 꿀 머스타드 2큰술을 뿌리고 올리브 오일 1큰술을 더한 뒤 바다소금 1/3작은술과 후추 1/4작은술을 뿌립니다.",
      "소스가 고루 묻었는지 확인하고 뜨거울 때 바로 낸다."
    ]
  },
  "sf-greek-campfire-grilled-chicken-brunch": {
    en: [
      "If charcoal-grilled chicken 180 g is refrigerated, bring to room temperature; wash salad greens as needed and drain. Have pita bread 2 portions ready.",
      "Heat pita in a skillet or oven at 350°F for 2–3 minutes until lightly charred outside and still soft inside; cut open and set aside.",
      "Sear charcoal-grilled chicken in a preheated skillet over medium heat, 2–3 minutes per side until golden and heated through; slice and set aside.",
      "Place salad greens in a large bowl; drizzle olive oil ½ Tbsp, sprinkle sea salt 1/6 tsp and a pinch of black pepper; toss gently.",
      "On a large round plate, arrange pita, sliced charcoal-grilled chicken, and dressed salad in separate sections.",
      "Drizzle the remaining olive oil ½ Tbsp over the chicken; sprinkle sea salt 1/3 tsp and black pepper ¼ tsp.",
      "Check that each section is at the right temperature and serve immediately while hot, keeping the Greek brunch compartmentalized plating."
    ],
    ja: [
      "炭烤雞肉 180gが冷蔵の場合は常温に戻す。皮塔餅 2份とサラダ 適量を洗って水気を切り、用意しておく。",
      "フライパンまたは180℃のオーブンで皮塔餅を2～3分加熱し、外側が軽く焦げて中が柔らかい状態にし、切っておく。",
      "予熱したフライパンに炭烤雞肉を入れ、中火で両面各2～3分、表面が香ばしく中心まで熱くなるまで焼き、スライスする。",
      "サラダ 適量を大きなボウルに入れ、オリーブオイル 大さじ1/2、海塩 小さじ1/6、黒胡椒 少々を加え、軽く和える。",
      "大きな丸皿に皮塔餅、炭烤雞肉のスライス、和えたサラダを分けて盛る。",
      "残りのオリーブオイル 大さじ1/2を鶏肉にかけ、海塩 小さじ1/3と黒胡椒 小さじ1/4を振る。",
      "各パーツの温度を確認し、熱いうちに提供する。ギリシャ風ブランチの分け盛り感を保つ。"
    ],
    ko: [
      "炭烤雞肉 180g이 냉장 상태면 실온에 두어 해동합니다. 皮塔餅 2份과 沙拉 適量을 씻어 물기를 빼고 준비합니다.",
      "팬이나 180°C 오븐에서 皮塔餅을 2~3분 데워 겉은 살짝 태우고 속은 부드럽게 한 뒤 잘라 둡니다.",
      "예열된 팬에 炭烤雞肉을 넣고 중불로 양면 각 2~3분 굽어 겉은 노릇하고 속까지 익힌 뒤 썰어 둡니다.",
      "沙拉 適量을 큰 그릇에 담고 올리브 오일 1/2큰술, 바다소금 1/6작은술, 후추 약간을 뿌려 가볍게 버무립니다.",
      "큰 원형 접시에 皮塔餅, 炭烤雞肉 슬라이스, 버무린 샐러드를 구역별로 담습니다.",
      "남은 올리브 오일 1/2큰술을 닭고기에 뿌리고 바다소금 1/3작은술과 후추 1/4작은술을 뿌립니다.",
      "각 구역의 온도를 확인하고 뜨거울 때 바로 내며, 그리스식 브런치의 분리 플레이팅을 유지한다."
    ]
  },
  "sf-griddled-butter-ham-sandwich": {
    en: [
      "Split baguette 2 portions horizontally; spread butter evenly on the cut sides. Have ham as needed, cheese 40 g, sunny-side eggs 2, and potato wedges 250 g ready.",
      "Heat a skillet over low heat; toast baguette cut-side down until both sides are golden and crisp; set aside.",
      "In the same skillet over medium heat, pan-fry ham as needed until lightly browned and fragrant; keep warm.",
      "Add a little butter to the skillet; crack sunny-side eggs 2, cover, and fry 2–3 minutes until whites are set and yolks are semi-runny; keep warm.",
      "Roast or pan-fry potato wedges 250 g at 350°F until golden and crisp; season lightly with salt and pepper.",
      "On the toasted baguette, layer cheese 40 g, ham, and fried eggs in order; top with the other baguette half and press lightly.",
      "Drizzle maple syrup 2 Tbsp and cream as needed; serve with potato wedges, sprinkled with sea salt 1/3 tsp and black pepper ¼ tsp while hot."
    ],
    ja: [
      "歐包 2份を横切り、切り口にバターを均一に塗る。火腿 適量、起司 40g、荷包蛋 2個、薯塊 250gを用意する。",
      "フライパンを弱火に熱し、歐包の切り口を下にして両面がこんがりサクッとするまで焼き、取り出す。",
      "同じフライパンを中火にし、火腿 適量を表面が軽く焦げ香りが立つまで焼き、保温する。",
      "フライパンにバターを少々加え、荷包蛋 2個を割り入れて蓋をし、2～3分、白身が固まり黄身が半熟になったら保温する。",
      "薯塊 250gを180℃のオーブンで焼くかフライパンでこんがりサクッとするまで調理し、塩と胡椒を少々振る。",
      "焼いた歐包に起司 40g、火腿、荷包蛋を順にのせ、もう一片の歐包を重ねて軽く押す。",
      "楓糖漿 大さじ2と鮮奶油 適量をかけ、薯塊を添え、海塩 小さじ1/3と黒胡椒 小さじ1/4を振って熱いうちに提供する。"
    ],
    ko: [
      "歐包 2份을 가로로 자르고 안쪽에 버터를 고르게 바릅니다. 火腿 適量, 起司 40g, 荷包蛋 2개, 薯塊 250g을 준비합니다.",
      "팬을 약불로 달군 뒤 歐包 안쪽을 아래로 두고 양면이 노릇하고 바삭해질 때까지 굽고 꺼냅니다.",
      "같은 팬을 중불로 달군 뒤 火腿 適量을 겉이 살짝 태워 향이 날 때까지 굽고 따뜻하게 둡니다.",
      "팬에 버터를 조금 넣고 荷包蛋 2개를 깨어 뚜껑을 덮어 2~3분간 흰자가 익고 노른자가 반숙이 되면 따뜻하게 둡니다.",
      "薯塊 250g을 180°C 오븐에 굽거나 팬에 노릇하고 바삭하게 조리한 뒤 소금과 후추를 약간 뿌립니다.",
      "구운 歐包 위에 起司 40g, 火腿, 荷包蛋을 순서대로 올리고 다른 歐包 조각을 덮어 살짝 누릅니다.",
      "楓糖漿 2큰술과 鮮奶油 適量을 뿌리고 薯塊을 곁들여 바다소금 1/3작은술과 후추 1/4작은술을 뿌려 뜨겁게 낸다."
    ]
  },
  "sf-balsamic-mushroom-pasta": {
    en: [
      "Prep: slice mushrooms 120 g; crack raw egg 1 into a small bowl; mince garlic 2 cloves; toast pine nuts ½ tsp in a dry pan over low heat until fragrant and set aside.",
      PASTA_BOIL.spaghetti.en.replace("sea salt 1/3 tsp.", "sea salt 1/3 tsp (about 1 Tbsp salt per liter of water)."),
      "Heat olive oil 1 Tbsp in a skillet over medium heat; sauté minced garlic until lightly golden and fragrant, about 30 seconds.",
      "Add mushrooms in a single layer; cook without changing heat until they release moisture, then raise heat to high and cook until edges are lightly charred and deeply fragrant, about 5–6 minutes. Drizzle balsamic vinegar as needed and toss quickly to color the mushrooms.",
      "Lower heat; add 3–4 Tbsp pasta water and black pepper ¼ tsp; stir until the sauce slightly thickens.",
      "Raise heat to high; add cooked pasta and toasted pine nuts; toss vigorously 1–2 minutes until sauce coats the noodles. During the last 30 seconds off heat, pour raw egg along the pan edge and toss quickly off heat for a silky, creamy finish.",
      "Plate in a deep dish; adjust salt to taste and serve hot to match Second Floor Cafe balsamic mushroom pasta."
    ],
    ja: [
      "下準備：蕈菇 120gをスライスし、生蛋 1個を小鉢に割る。にんにく 2片をみじん切りにし、松子 小さじ1/2を乾いた鍋で弱火焙煎して取り出す。",
      "湯鍋にたっぷりの湯を強火で沸騰させ、海塩 小さじ1/3（1リットルあたり大さじ1程度）を加える。義大利麵 180gを表示時間より1分短くアルデンテに茹で、水切りして茹で汁を約半カップ取っておく。",
      "フライパンを中火に熱し、オリーブオイル 大さじ1でにんにくを約30秒、軽く黄金色で香りが立つまで炒める。",
      "蕈菇を広げて入れ、火力を変えずに水分が出るまで炒め、強火に上げて縁が軽く焦げ香りが濃くなるまで5～6分。バ薩米克 適量を回し入れ、素早く和えて色づける。",
      "弱火にし、茹で汁 大さじ3～4と黒胡椒 小さじ1/4を加え、汁が少しとろみがつくまで攪拌する。",
      "強火に戻し、茹でた麺と炒めた松子を入れ、1～2分素早く和える。火を止める30秒前に生蛋を鍋の縁から回し入れ、火を止めたまま素早く和えてなめらかなクリーム感を出す。",
      "深皿に盛り、塩で味を調え、熱いうちに提供する。貳樓バルサミコきのこパスタの甘酸っぱい香りを再現する。"
    ],
    ko: [
      "준비: 蕈菇 120g을 슬라이스하고, 生蛋 1개를 작은 그릇에 깹니다. 마늘 2쪽을 다지고, 松子 1/2작은술을 마른 팬에 약불로 볶아 향을 낸 뒤 덜어둡니다.",
      "냄비에 물을 넉넉히 강불로 끓인 뒤 바다소금 1/3작은술(리터당 약 1큰술 분량)을 넣습니다. 義大利麵 180g을 포장 표시보다 1분 짧게 알덴테로 삶아 건지고 삶은 물 약 반 컵을 남깁니다.",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 다진 마늘을 약 30초 볶아 살짝 노릇하고 향이 날 때까지 합니다.",
      "버섯을 한 겹으로 펼쳐 넣고 불을 바꾸지 않고 수분이 나올 때까지 볶은 뒤 강불로 올려 가장자리가 살짝 태고 향이 진해질 때까지 5~6분 볶습니다. 巴薩米克 適量을 둘러 빠르게 버무려 색을 냅니다.",
      "약불로 줄이고 삶은 물 3~4큰술과 후추 1/4작은술을 넣어 국물이 살짝 걸쭉해질 때까지 저어줍니다.",
      "강불로 올려 삶은 면과 볶은 松子를 넣고 1~2분 빠르게 버무립니다. 불을 끄기 30초 전에 生蛋를 팬 가장자리에 넣고 불을 끈 채 빠르게 버무려 부드러운 크림감을 냅니다.",
      "깊은 접시에 담아 소금으로 간을 맞추고 뜨겁게 내며, 貳樓 발사믹 버섯 파스타의 새콤달콤한 향을 재현한다."
    ]
  },
  "sf-cheesy-local-sausage-cream-pasta": {
    en: [
      "Prep: slice Local sausage 140 g on the bias; shred three-cheese blend 40 g; wash basil 10 g; mince garlic 2 cloves.",
      PASTA_BOIL.spaghetti.en,
      "Heat a skillet over medium heat; add sausage slices without oil and render over low heat until golden and slightly curled on both sides, about 4–5 minutes. Set aside, leaving about 1 Tbsp fat in the pan.",
      "In the same pan, sauté minced garlic and chili flakes ½ tsp over low heat until fragrant, about 30 seconds.",
      "Add cream white sauce 3 Tbsp and 3–4 Tbsp pasta water; stir and simmer until lightly boiling and slightly thickened; stir in half the shredded cheese until melted.",
      "Raise heat to high; add pasta and sausage slices; toss vigorously 1–2 minutes until white sauce emulsifies and coats the noodles. If too thick, add 1–2 Tbsp pasta water.",
      "Off heat, fold in remaining cheese and basil; plate in a deep dish, sprinkle black pepper, and serve hot to match Second Floor Cafe cheesy Local sausage cream pasta."
    ],
    ja: [
      "下準備：Local 香腸 140gを斜め切り、三種起司 40gを削る。九層塔 10gを洗い、にんにく 2片をみじん切りにする。",
      PASTA_BOIL.spaghetti.ja,
      "フライパンを中火に熱し、油を入れずにLocal 香腸を弱火で脂を出しながら両面がこんがり軽く丸まるまで4～5分焼き、取り出す。鍋に油 大さじ1程度残す。",
      "同じ鍋でにんにくと辣椒碎 小さじ1/2を弱火で約30秒、香りが立つまで炒める。",
      "奶油白醬 大さじ3と茹で汁 大さじ3～4を加え、軽く沸騰し少しとろみがつくまで攪拌し、起司の半分を溶かす。",
      "強火に上げ、麺と香腸を入れ、1～2分素早く和え白醬が麺に絡む。とろみすぎる場合は茹で汁 大さじ1～2を足す。",
      "火を止め、残りの起司と九層塔を和え、深皿に盛り黒胡椒を振って熱いうちに提供する。貳樓チーズLocal香腸クリームパスタの濃厚さを再現する。"
    ],
    ko: [
      "준비: Local 香腸 140g을 사선으로 썰고, 三種起司 40g을 갈아 둡니다. 九層塔 10g을 씻고 마늘 2쪽을 다집니다.",
      PASTA_BOIL.spaghetti.ko,
      "팬을 중불로 달군 뒤 기름 없이 Local 香腸을 약불로 지방을 빼며 양면이 노릇하고 살짝 말릴 때까지 4~5분 굽고 꺼냅니다. 팬에 기름 약 1큰술을 남깁니다.",
      "같은 팬에 다진 마늘과 辣椒碎 1/2작은술을 약불로 약 30초 볶아 향을 냅니다.",
      "奶油白醬 3큰술과 삶은 물 3~4큰술을 넣어 살짝 끓이고 걸쭉해질 때까지 저은 뒤 치즈의 절반을 녹입니다.",
      "강불로 올려 면과 소시지를 넣고 1~2분 빠르게 버무려 화이트 소스가 면에 고루 묻게 합니다. 너무 걸쭉하면 삶은 물 1~2큰술을 보충합니다.",
      "불을 끄고 남은 치즈와 九層塔을 넣어 버무린 뒤 깊은 접시에 담아 후추를 뿌려 뜨겁게 낸다. 貳樓 치즈 Local 소시지 크림 파스타의 진한 맛을 재현한다."
    ]
  },
  "sf-classic-pesto-shrimp-pasta": {
    en: [
      "Prep: peel and devein shrimp 180 g; pat thoroughly dry with paper towels. Shred cheese 40 g; mince garlic 2 cloves; toast pine nuts ½ tsp in a dry pan over low heat and set aside.",
      PASTA_BOIL.spaghetti.en,
      "Heat olive oil 1 Tbsp in a skillet over medium-high heat; lay shrimp in a single layer and sear about 1 minute per side until pink, curled, and springy. Season lightly with sea salt and black pepper; set aside.",
      "Lower heat; sauté minced garlic until fragrant, about 20 seconds.",
      "Add pesto 3 Tbsp and 2–3 Tbsp pasta water; stir until oil and water emulsify into a glossy sauce.",
      "Raise heat to high; add pasta and shrimp; toss vigorously 1–2 minutes. Off heat, fold in half the shredded cheese and toasted pine nuts.",
      "Plate in a deep dish; top with remaining cheese and black pepper; serve hot to match Second Floor Cafe classic pesto shrimp pasta."
    ],
    ja: [
      "下準備：鮮蝦 180gの背ワタを取り洗い、キッチンペーパーで十分に水気を拭く。起司 40gを削り、にんにく 2片をみじん切り、松子 小さじ1/2を乾いた鍋で弱火焙煎する。",
      PASTA_BOIL.spaghetti.ja,
      "フライパンを中強火に熱し、オリーブオイル 大さじ1でエビを一枚に広げ、片面約1分、ピンク色でカーブし弾力が出たら取り出す。海塩と黒胡椒 少々を振る。",
      "弱火にし、にんにくを約20秒香りが立つまで炒める。",
      "青醬 大さじ3と茹で汁 大さじ2～3を加え、油と水が乳化してなめらかになるまで攪拌する。",
      "強火に上げ、麺とエビを入れ1～2分素早く和える。火を止め、起司の半分と焙煎した松子を和える。",
      "深皿に盛り、残りの起司と黒胡椒を振って熱いうちに提供する。貳樓クラシックジェノベーゼエビパスタの層を再現する。"
    ],
    ko: [
      "준비: 鮮蝦 180g의 내장을 제거하고 씻어 키친타월로 충분히 말립니다. 起司 40g을 갈고 마늘 2쪽을 다지며, 松子 1/2작은술을 마른 팬에 약불로 볶아 둡니다.",
      PASTA_BOIL.spaghetti.ko,
      "팬에 올리브 오일 1큰술을 중강불로 달군 뒤 새우를 한 겹으로 펼쳐 면당 약 1분씩 분홍색으로 말리고 탄력이 생기면 건집니다. 바다소금과 후추 약간을 뿌립니다.",
      "약불로 줄이고 다진 마늘을 약 20초 볶아 향을 냅니다.",
      "青醬 3큰술과 삶은 물 2~3큰술을 넣어 기름과 물이 유화되어 윤기 나는 소스가 될 때까지 저어줍니다.",
      "강불로 올려 면과 새우를 넣고 1~2분 빠르게 버무립니다. 불을 끄고 치즈의 절반과 볶은 松子를 넣어 섞습니다.",
      "깊은 접시에 담아 남은 치즈와 후추를 뿌려 뜨겁게 내며, 貳樓 클래식 페스토 새우 파스타의 층을 재현한다."
    ]
  },
  "sf-dawn-shrimp-chicken-linguine": {
    en: [
      "Prep: cut chicken 180 g into about 2 cm cubes and pat dry; peel and devein shrimp as needed and pat dry. Slice roasted red pepper as needed; shred cheese 40 g; mince garlic 2 cloves.",
      PASTA_BOIL.spaghetti.en.replace("spaghetti", "linguine"),
      "Heat olive oil 1 Tbsp in a skillet over medium heat; lay chicken cubes in a single layer and sear until golden, about 3 minutes; flip and cook 2 minutes more until cooked through; set aside.",
      "Add a little more oil to the same pan; stir-fry shrimp over medium-high heat until pink and curled, about 1.5 minutes; combine with chicken and keep warm.",
      "Sauté minced garlic and roasted red pepper strips over medium heat for 1 minute to release sweet pepper aroma.",
      "Add Dawn cream sauce 3 Tbsp and 3–4 Tbsp pasta water; stir over low heat until sauce simmers and turns smooth; fold in half the shredded cheese until melted.",
      "Raise heat to high; add pasta, chicken, and shrimp; toss vigorously 1–2 minutes until Dawn sauce coats the noodles.",
      "Off heat, sprinkle remaining cheese; plate in a deep dish and serve hot to match Second Floor Cafe Dawn shrimp chicken linguine."
    ],
    ja: [
      "下準備：雞肉 180gを約2cm角に切り水気を拭く。蝦 適量の背ワタを取り洗い水気を拭く。炙燒紅椒 適量を細切り、起司絲 40gを用意し、にんにく 2片をみじん切りにする。",
      PASTA_BOIL.spaghetti.ja.replace("スパゲッティ", "リングイネ"),
      "フライパンを中火に熱し、オリーブオイル 大さじ1で鶏肉を広げ、表面がこんがりするまで約3分焼き、ひっくり返してさらに2分火を通し、取り出す。",
      "同じ鍋に油を少し足し、中強火でエビを約1.5分、ピンク色でカーブするまで炒め、鶏肉と合わせて保温する。",
      "にんにくと炙燒紅椒を中火で1分炒め、甘いピーマンの香りを出す。",
      "曙光奶油醬 大さじ3と茹で汁 大さじ3～4を加え、弱火で微沸騰し滑らかになるまで攪拌し、起司の半分を溶かす。",
      "強火に上げ、麺と鶏肉・エビを入れ、1～2分素早く和え曙光醬が麺に絡むまで。",
      "火を止め、残りの起司を振り、深皿に盛って熱いうちに提供する。貳樓曙光汁鮮蝦雞肉麵の温かい奶香を再現する。"
    ],
    ko: [
      "준비: 雞肉 180g을 약 2cm 큐브로 자르고 물기를 뺍니다. 蝦 適量의 내장을 제거하고 씻어 말립니다. 炙燒紅椒 適量을 채 썰고, 起司絲 40g을 준비하며 마늘 2쪽을 다집니다.",
      PASTA_BOIL.spaghetti.ko.replace("스파게티", "링귀네"),
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 닭고기를 펼쳐 겉이 노릇해질 때까지 약 3분 굽고, 뒤집어 2분 더 익힌 뒤 꺼냅니다.",
      "같은 팬에 기름을 조금 더 넣고 중강불로 새우를 약 1.5분 볶아 분홍색으로 말리면 닭고기와 합쳐 따뜻하게 둡니다.",
      "다진 마늘과 炙燒紅椒을 중불로 1분 볶아 단고추 향을 냅니다.",
      "曙光奶油醬 3큰술과 삶은 물 3~4큰술을 넣어 약불로 살짝 끓이고 매끈해질 때까지 저으며 치즈의 절반을 녹입니다.",
      "강불로 올려 면과 닭고기, 새우를 넣고 1~2분 빠르게 버무려 曙光醬이 면에 고루 묻게 합니다.",
      "불을 끄고 남은 치즈를 뿌려 깊은 접시에 담아 뜨겁게 내며, 貳樓 曙光 새우 닭 파스타의 따뜻한 크림 향을 재현한다."
    ]
  },
  "sf-homestyle-meat-sauce-penne-with-meatballs": {
    en: [
      "Prep: halve beef meatballs 160 g; dice sun-dried tomatoes 40 g; shred cheese 40 g; mince garlic 2 cloves and onion ¼.",
      PASTA_BOIL.penne.en,
      "Heat olive oil 1 Tbsp in a skillet over medium heat; sauté onion and garlic until translucent and sweet, about 2 minutes.",
      "Add halved meatballs; sear 1.5–2 minutes per side until browned and heated through; set aside.",
      "In the same pan, add meat sauce as needed and diced sun-dried tomatoes; bring to a boil over medium heat, then simmer on low 3–4 minutes until slightly thickened. Add 2–3 Tbsp pasta water to adjust consistency.",
      "Raise heat to high; add penne; toss vigorously 1–2 minutes so sauce enters the tube centers.",
      "Off heat, fold in half the shredded cheese; return seared meatballs on top.",
      "Plate in a deep dish; top with remaining cheese and black pepper; serve hot to match Second Floor Cafe homestyle meat sauce penne with meatballs."
    ],
    ja: [
      "下準備：牛肉丸 160gを半分に切る。番茄乾 40gを細かく刻み、起司 40gを削る。にんにく 2片と洋蔥 1/4個をみじん切りにする。",
      PASTA_BOIL.penne.ja,
      "フライパンを中火に熱し、オリーブオイル 大さじ1で玉ねぎとにんにくを約2分、透明で甘みが出るまで炒める。",
      "半分にした牛肉丸を加え、片面1.5～2分、表面が香ばしく中心まで熱くなるまで焼き、取り出す。",
      "同じ鍋に肉醬 適量と番茄乾を加え、中火で煮立たせてから弱火で3～4分とろみがつくまで煮る。茹で汁 大さじ2～3で濃度を調整する。",
      "強火に上げ、ペンネを入れ1～2分素早く和え、ソースが管状の芯に入るようにする。",
      "火を止め、起司の半分を和え、焼いた肉丸を戻す。",
      "深皿に盛り、残りの起司と黒胡椒を振って熱いうちに提供する。貳樓故郷風ミートソースペンネと肉丸の満足感を再現する。"
    ],
    ko: [
      "준비: 牛肉丸 160g을 반으로 자르고, 番茄乾 40g을 잘게 썹니다. 起司 40g을 갈고 마늘 2쪽과 양파 1/4개를 다집니다.",
      PASTA_BOIL.penne.ko,
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 양파와 마늘을 약 2분 볶아 투명하고 단맛이 날 때까지 합니다.",
      "반으로 자른 牛肉丸을 넣어 면당 1.5~2분씩 겉은 노릇하고 속까지 익을 때까지 굽고 꺼냅니다.",
      "같은 팬에 肉醬 適量과 番茄乾을 넣어 중불로 끓인 뒤 약불로 3~4분 졸여 살짝 걸쭉하게 합니다. 삶은 물 2~3큰술로 농도를 맞춥니다.",
      "강불로 올려 펜네를 넣고 1~2분 빠르게 버무려 소스가 관 모양 속까지 들어가게 합니다.",
      "불을 끄고 치즈의 절반을 넣어 섞은 뒤 구운 미트볼을 다시 올립니다.",
      "깊은 접시에 담아 남은 치즈와 후추를 뿌려 뜨겁게 내며, 貳樓 고향식 미트소스 펜네와 미트볼의 푸짐함을 재현한다."
    ]
  },
  "sf-kids-cream-chicken-penne": {
    en: [
      "Prep: dice chicken 180 g into about 1.5 cm cubes; wash corn 100 g and peas as needed and drain. Dice cheese 40 g.",
      PASTA_BOIL.penneLight.en,
      "Heat olive oil 1 Tbsp in a skillet over medium heat; spread chicken cubes in a single layer and cook until fully done and lightly golden, about 5–6 minutes; set aside.",
      "In the same pan, stir-fry corn and peas 2 minutes until slightly tender but still sweet and crisp.",
      "Add white sauce as needed, cream as needed, and 3–4 Tbsp pasta water; stir over low heat until lightly simmering and smooth, not too salty; fold in half the diced cheese until melted.",
      "Raise heat to high; add penne and chicken; toss gently 1–2 minutes until white sauce coats evenly (keep heat moderate to avoid splitting the cream).",
      "Off heat, fold in remaining cheese; plate in a shallow dish and serve warm to match Second Floor Cafe kids cream chicken penne."
    ],
    ja: [
      "下準備：雞肉 180gを約1.5cm角に切る。玉米 100gと豌豆 適量を洗って水気を切り、起司 40gを角切りにする。",
      PASTA_BOIL.penneLight.ja,
      "フライパンを中火に熱し、オリーブオイル 大さじ1で鶏肉を広げ、中心まで火が通り表面が軽くこんがりするまで5～6分焼き、取り出す。",
      "同じ鍋で玉米と豌豆を2分炒め、やや柔らかく甘みと歯応えを残す。",
      "白醬 適量、鮮奶油 適量、茹で汁 大さじ3～4を加え、弱火で微沸騰し滑らかで塩味が強すぎないようにする。起司の半分を溶かす。",
      "強火に上げ、ペンネと鶏肉を入れ、1～2分優しく和える（火力を上げすぎずクリームの分離を防ぐ）。",
      "火を止め、残りの起司を和え、浅い皿に盛って温かいうちに提供する。貳樓キッズクリームチキンペンネのやさしい味を再現する。"
    ],
    ko: [
      "준비: 雞肉 180g을 약 1.5cm 큐브로 자르고, 玉米 100g과 豌豆 適量을 씻어 물기를 뺍니다. 起司 40g을 작은 큐브로 썹니다.",
      PASTA_BOIL.penneLight.ko,
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 닭고기를 펼쳐 속까지 익고 겉이 살짝 노릇해질 때까지 5~6분 굽고 꺼냅니다.",
      "같은 팬에 玉米과 豌豆을 2분 볶아 살짝 부드러우면서도 달콤하고 아삭하게 합니다.",
      "白醬 適量, 鮮奶油 適量, 삶은 물 3~4큰술을 넣어 약불로 살짝 끓이고 매끈하되 너무 짜지 않게 합니다. 치즈의 절반을 녹입니다.",
      "강불로 올려 펜네와 닭고기를 넣고 1~2분 부드럽게 버무려 화이트 소스가 고루 묻게 합니다(불이 너무 세면 크림이 분리되지 않게 주의).",
      "불을 끄고 남은 치즈를 넣어 섞은 뒤 얕은 접시에 담아 따뜻하게 내며, 貳樓 키즈 크림 치킨 펜네의 부드러운 맛을 재현한다."
    ]
  },
  "sf-salted-egg-bitter-melon-pasta": {
    en: [
      "Prep: seed and thinly slice bitter melon 120 g; salt 5 minutes, rinse to remove bitterness, and squeeze dry. Cut king oyster mushrooms 120 g into strips; peel and thinly slice yam 80 g and soak in cold water. Shell salted eggs as needed, separate whites and yolks, and dice. Mince garlic 2 cloves.",
      PASTA_BOIL.spaghetti.en,
      "Heat olive oil 1 Tbsp in a skillet over medium heat; sauté minced garlic and chili flakes ½ tsp until fragrant, about 30 seconds.",
      "Add king oyster mushrooms and yam slices; stir-fry over medium heat 3–4 minutes until slightly tender and colored. Add bitter melon and stir-fry over high heat 1–2 minutes until bright green and still crisp.",
      "Push salted egg whites to the side; add salted egg yolks and salted egg yolk sauce 2 Tbsp to the center; press and stir over low heat into a flowing texture, about 1 minute; toss with vegetables.",
      "Add 3–4 Tbsp pasta water; stir until sauce thickens and emulsifies.",
      "Raise heat to high; add pasta and toss vigorously 1–2 minutes until salted egg sauce coats noodles and vegetables.",
      "Taste and adjust with black pepper; plate in a deep dish and serve hot to match Second Floor Cafe Taiwanese salted egg bitter melon pasta."
    ],
    ja: [
      "下準備：山苦瓜 120gの種を取り薄切りにし、塩もみ5分後に洗って苦味を取り絞る。杏鮑菇 120gを細切り、山藥 80gを皮をむいて薄切りにし冷水に浸す。鹹蛋 適量を殻から取り出し白黄を分けて切る。にんにく 2片をみじん切りにする。",
      PASTA_BOIL.spaghetti.ja,
      "フライパンを中火に熱し、オリーブオイル 大さじ1でにんにくと辣椒碎 小さじ1/2を約30秒香りが立つまで炒める。",
      "杏鮑菇と山藥を加え、中火で3～4分やや柔らかく色づくまで炒める。山苦瓜を加え強火で1～2分、鮮やかな緑で歯応えを残す。",
      "鹹蛋白を鍋の端に寄せ、中央に鹹蛋黃と鹹蛋黃醬 大さじ2を入れ、弱火で約1分押しながら炒めて流動状にし、具材と和える。",
      "茹で汁 大さじ3～4を加え、ソースがとろみを持ち乳化するまで攪拌する。",
      "強火に上げ、麺を入れ1～2分素早く和え、鹹蛋醬が麺と野菜に絡むまで。",
      "黒胡椒で味を見て、深皿に盛り熱いうちに提供する。貳樓台湾風鹹蛋苦瓜麵の甘塩っぱさを再現する。"
    ],
    ko: [
      "준비: 山苦瓜 120g의 씨를 제거하고 얇게 썰어 소금에 5분 절인 뒤 씻어 쓴맛을 빼고 짭니다. 杏鮑菇 120g을 채 썰고, 山藥 80g은 껍질을 벗겨 얇게 썰어 찬물에 담급니다. 鹹蛋 適量을 껍질에서 꺼내 흰자와 노른자를 나누어 썹니다. 마늘 2쪽을 다집니다.",
      PASTA_BOIL.spaghetti.ko,
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 다진 마늘과 辣椒碎 1/2작은술을 약 30초 볶아 향을 냅니다.",
      "杏鮑菇과 山藥을 넣고 중불로 3~4분 볶아 살짝 부드럽고 색이 나게 합니다. 山苦瓜을 넣고 강불로 1~2분 볶아 선명한 녹색과 아삭함을 유지합니다.",
      "鹹蛋白을 팬 한쪽으로 밀고 가운데에 鹹蛋黃과 鹹蛋黃醬 2큰술을 넣어 약불로 약 1분 눌러 볶아 흐르는 상태로 만든 뒤 채소와 섞습니다.",
      "삶은 물 3~4큰술을 넣어 소스가 걸쭉하게 유화될 때까지 저어줍니다.",
      "강불로 올려 면을 넣고 1~2분 빠르게 버무려 鹹蛋醬이 면과 채소에 고루 묻게 합니다.",
      "후추로 간을 맞춰 깊은 접시에 담아 뜨겁게 내며, 貳樓 대만식 鹹蛋 苦瓜 파스타의 짭짤달콤한 층을 재현한다."
    ]
  },
  "sf-second-floor-fiesta-shrimp-penne": {
    en: [
      "Prep: peel and devein shrimp 180 g and pat dry; mix taco seasoning as needed with chili flakes ½ tsp into a Mexican spice blend. Mince garlic 2 cloves.",
      PASTA_BOIL.penne.en,
      "Heat olive oil 1 Tbsp in a skillet over medium-high heat; lay shrimp in a single layer, sprinkle taco spice blend, and sear about 1 minute per side until pink, curled, and lightly charred with spice aroma; set aside.",
      "Lower heat; sauté minced garlic until fragrant, about 20 seconds.",
      "Add cream sauce as needed and 3–4 Tbsp pasta water; stir over low heat until lightly simmering and smooth with a creamy aroma.",
      "Raise heat to high; add penne and seared shrimp; toss vigorously 1–2 minutes until cream sauce coats the tube centers.",
      "Plate in a deep dish; sprinkle black pepper and a little chili flakes; serve hot to match Second Floor Cafe fiesta shrimp penne."
    ],
    ja: [
      "下準備：鮮蝦 180gの背ワタを取り洗い水気を拭く。Taco 調味 適量と辣椒碎 小さじ1/2を混ぜメキシコ風スパイスにする。にんにく 2片をみじん切りにする。",
      PASTA_BOIL.penne.ja,
      "フライパンを中強火に熱し、オリーブオイル 大さじ1でエビを広げ、Tacoスパイスを振り、片面約1分、ピンク色でカーブし香りが立つまで焼き、取り出す。",
      "弱火にし、にんにくを約20秒香りが立つまで炒める。",
      "奶油醬 適量と茹で汁 大さじ3～4を加え、弱火で微沸騰し滑らかで奶香が出るまで攪拌する。",
      "強火に上げ、ペンネと焼いたエビを入れ1～2分素早く和え、奶油醬が管状の芯に絡むまで。",
      "深皿に盛り、黒胡椒と辣椒碎 少々を振って熱いうちに提供する。貳樓フィエスタエビペンネの異国香料風味を再現する。"
    ],
    ko: [
      "준비: 鮮蝦 180g의 내장을 제거하고 씻어 말립니다. Taco 調味 適量과 辣椒碎 1/2작은술을 섞어 멕시코 향신료 블렌드를 만듭니다. 마늘 2쪽을 다집니다.",
      PASTA_BOIL.penne.ko,
      "팬에 올리브 오일 1큰술을 중강불로 달군 뒤 새우를 펼쳐 Taco 향신료를 뿌리고 면당 약 1분씩 분홍색으로 말리고 향이 날 때까지 굽고 꺼냅니다.",
      "약불로 줄이고 다진 마늘을 약 20초 볶아 향을 냅니다.",
      "奶油醬 適量과 삶은 물 3~4큰술을 넣어 약불로 살짝 끓이고 매끈하고 크리미한 향이 날 때까지 저어줍니다.",
      "강불로 올려 펜네와 구운 새우를 넣고 1~2분 빠르게 버무려 크림 소스가 관 모양 속까지 묻게 합니다.",
      "깊은 접시에 담아 후추와 辣椒碎 약간을 뿌려 뜨겁게 내며, 貳樓 피에스타 새우 펜네의 이국적 향신료 맛을 재현한다."
    ]
  },
  "sf-spicy-pepper-karaage-pasta": {
    en: [
      "Prep: air-fry or deep-fry karaage chicken 180 g at 350°F until golden and crisp (if raw, cook to center 165°F or above); cut into chunks. Slice bird's eye chilies as needed; wash basil 10 g; shred cheese 40 g; mince garlic 2 cloves.",
      PASTA_BOIL.spaghetti.en,
      "Heat olive oil 1 Tbsp in a skillet over medium heat; sauté minced garlic and bird's eye chili rings until fragrant, about 30 seconds (do not burn).",
      "Add tomato sauce as needed and chili flakes ½ tsp; bring to a boil over medium heat, then simmer on low 2 minutes until slightly thickened.",
      "Add 3–4 Tbsp pasta water; stir until sauce emulsifies smoothly; fold in half the shredded cheese until melted.",
      "Raise heat to high; add pasta; toss vigorously 1 minute until tomato sauce coats the noodles.",
      "Off heat, add karaage chunks and basil; toss gently a few times so crisp coating picks up sauce (avoid over-stirring and softening the chicken).",
      "Plate in a deep dish; top with remaining cheese and black pepper; serve hot to match Second Floor Cafe spicy pepper karaage pasta."
    ],
    ja: [
      "下準備：唐揚雞 180gを180℃で空揚げまたは揚げて黄金色にサクッとする（生の場合は中心74℃以上）。切り分ける。朝天椒 適量を輪切り、九層塔 10gを洗い、起司絲 40gを用意し、にんにく 2片をみじん切りにする。",
      PASTA_BOIL.spaghetti.ja,
      "フライパンを中火に熱し、オリーブオイル 大さじ1でにんにくと朝天椒を約30秒香りが立つまで炒める（焦がさない）。",
      "茄汁 適量と辣椒碎 小さじ1/2を加え、中火で煮立たせてから弱火で2分とろみがつくまで煮る。",
      "茹で汁 大さじ3～4を加え、ソースが乳化して滑らかになるまで攪拌し、起司の半分を溶かす。",
      "強火に上げ、麺を入れ1分素早く和え、茄汁が麺に絡むまで。",
      "火を止め、切った唐揚雞と九層塔を入れ、軽く数回和えて衣にソースをつける（かき混ぜすぎて軟らかくしない）。",
      "深皿に盛り、残りの起司と黒胡椒を振って熱いうちに提供する。貳樓香爆椒麻唐揚雞麵の甘酸辣を再現する。"
    ],
    ko: [
      "준비: 唐揚雞 180g을 180°C에서 에어프라이 또는 튀겨 황금색으로 바삭하게 합니다(생닭이면 속까지 74°C 이상). 토막내 둡니다. 朝天椒 適量을 채 썰고, 九層塔 10g을 씻으며, 起司絲 40g을 준비하고 마늘 2쪽을 다집니다.",
      PASTA_BOIL.spaghetti.ko,
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 다진 마늘과 朝天椒를 약 30초 볶아 향을 냅니다(타지 않게).",
      "茄汁 適量과 辣椒碎 1/2작은술을 넣어 중불로 끓인 뒤 약불로 2분 졸여 살짝 걸쭉하게 합니다.",
      "삶은 물 3~4큰술을 넣어 소스가 매끈하게 유화될 때까지 저으며 치즈의 절반을 녹입니다.",
      "강불로 올려 면을 넣고 1분 빠르게 버무려 토마토 소스가 면에 고루 묻게 합니다.",
      "불을 끄고 자른 唐揚雞과 九層塔을 넣어 가볍게 몇 번만 버무려 바삭한 겉에 소스가 묻게 합니다(과하게 저어 닭이 눅눅해지지 않게).",
      "깊은 접시에 담아 남은 치즈와 후추를 뿌려 뜨겁게 내며, 貳樓 매콤한 고추 카라아게 파스타의 단맛·신맛·매운맛을 재현한다."
    ]
  },
  "sf-spicy-tomato-bacon-penne": {
    en: [
      "Prep: dice bacon 80 g; dice tomatoes as needed; shred cheese 40 g; mince garlic 2 cloves.",
      PASTA_BOIL.penne.en,
      "Cook bacon dice in a skillet over low heat without added oil until fat renders and pieces are golden and crisp, about 4–5 minutes. Set bacon aside, leaving about 1 Tbsp fat in the pan.",
      "Over medium heat in the same pan, sauté minced garlic until fragrant, about 20 seconds; add diced tomatoes and stir-fry 2 minutes until slightly soft and juicy.",
      "Add chili sauce as needed and chili flakes ½ tsp; bring to a boil over medium heat. Add 3–4 Tbsp pasta water and simmer 2 minutes until tomato-chili sauce slightly thickens.",
      "Raise heat to high; add penne; toss vigorously 1–2 minutes so sauce enters the tube centers.",
      "Off heat, fold in half the shredded cheese; return crisp bacon and toss.",
      "Plate in a deep dish; top with remaining cheese and black pepper; serve hot to match Second Floor Cafe spicy tomato bacon penne."
    ],
    ja: [
      "下準備：培根 80gを細かく刻み、番茄 適量を角切り、起司 40gを削り、にんにく 2片をみじん切りにする。",
      PASTA_BOIL.penne.ja,
      "フライパンを弱火にし、油を加えず培根を脂を出しながら4～5分、こんがりサクッとするまで炒め、取り出す。鍋に油 大さじ1程度残す。",
      "同じ鍋を中火にし、にんにくを約20秒香りが立つまで炒め、番茄を加え2分やわらかく汁が出るまで炒める。",
      "辣醬 適量と辣椒碎 小さじ1/2を加え中火で煮立たせ、茹で汁 大さじ3～4を足し2分とろみがつくまで煮る。",
      "強火に上げ、ペンネを入れ1～2分素早く和え、ソースが管芯に入るまで。",
      "火を止め、起司の半分を和え、サクッとした培根を戻す。",
      "深皿に盛り、残りの起司と黒胡椒を振って熱いうちに提供する。貳樓辣茄汁培根ペンネの酸辣燻製風味を再現する。"
    ],
    ko: [
      "준비: 培根 80g을 잘게 썰고, 番茄 適量을 깍둑썰기하며, 起司 40g을 갈고 마늘 2쪽을 다집니다.",
      PASTA_BOIL.penne.ko,
      "팬을 약불로 달군 뒤 기름 없이 培根을 지방이 나올 때까지 4~5분 볶아 노릇하고 바삭하게 만든 뒤 꺼냅니다. 팬에 기름 약 1큰술을 남깁니다.",
      "같은 팬을 중불로 달군 뒤 다진 마늘을 약 20초 볶아 향을 내고 番茄을 넣어 2분 볶아 살짝 부드럽고 즙이 나게 합니다.",
      "辣醬 適量과 辣椒碎 1/2작은술을 넣어 중불로 끓인 뒤 삶은 물 3~4큰술을 보충해 2분 졸여 토마토-고추 소스가 살짝 걸쭉해지게 합니다.",
      "강불로 올려 펜네를 넣고 1~2분 빠르게 버무려 소스가 관 속까지 들어가게 합니다.",
      "불을 끄고 치즈의 절반을 넣어 섞은 뒤 바삭한 培根을 다시 넣어 버무립니다.",
      "깊은 접시에 담아 남은 치즈와 후추를 뿌려 뜨겁게 내며, 貳樓 매운 토마토 베이컨 펜네의 매콤·훈제 풍미를 재현한다."
    ]
  },
  "sf-truffle-mushroom-cream-pasta": {
    en: [
      "Prep: slice mixed mushrooms 120 g and pat dry with paper towels; shred cheese 40 g; mince garlic 2 cloves.",
      PASTA_BOIL.spaghetti.en,
      "Heat olive oil 1 Tbsp in a skillet over medium heat; lay mushroom slices in a single layer; cook without changing heat until they release moisture, then raise heat to high and cook until edges are lightly charred, about 5–6 minutes; set aside.",
      "Lower heat; sauté minced garlic until fragrant, about 20 seconds.",
      "Add truffle cream sauce 3 Tbsp, cream as needed, and 3–4 Tbsp pasta water; stir over low heat until lightly simmering and smooth; fold in half the shredded cheese until melted.",
      "Raise heat to high; add pasta and seared mushrooms; toss vigorously 1–2 minutes until cream sauce coats the noodles.",
      "Off heat, fold in truffle sauce 3 Tbsp and remaining cheese (add truffle sauce off heat to preserve aroma).",
      "Plate in a deep dish; sprinkle black pepper and serve hot to match Second Floor Cafe truffle mushroom cream pasta."
    ],
    ja: [
      "下準備：綜合蕈菇 120gをスライスしキッチンペーパーで水気を拭く。起司 40gを削り、にんにく 2片をみじん切りにする。",
      PASTA_BOIL.spaghetti.ja,
      "フライパンを中火に熱し、オリーブオイル 大さじ1できのこを広げ、火力を変えず水分が出るまで炒め、強火で縁が軽く焦げるまで5～6分焼き、取り出す。",
      "弱火にし、にんにくを約20秒香りが立つまで炒める。",
      "松露奶油醬 大さじ3、鮮奶油 適量、茹で汁 大さじ3～4を加え、弱火で微沸騰し滑らかになるまで攪拌し、起司の半分を溶かす。",
      "強火に上げ、麺と焼いたきのこを入れ1～2分素早く和え、奶油醬が麺に絡むまで。",
      "火を止め、松露醬 大さじ3と残りの起司を和える（松露醬は火を止めてから加え香りを保つ）。",
      "深皿に盛り、黒胡椒を振って熱いうちに提供する。貳樓トリュフきのこクリームパスタの濃厚な香りを再現する。"
    ],
    ko: [
      "준비: 綜合蕈菇 120g을 슬라이스하고 키친타월로 물기를 뺍니다. 起司 40g을 갈고 마늘 2쪽을 다집니다.",
      PASTA_BOIL.spaghetti.ko,
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 버섯을 한 겹으로 펼쳐 불을 바꾸지 않고 수분이 나올 때까지 볶은 뒤 강불로 가장자리가 살짝 태울 때까지 5~6분 굽고 꺼냅니다.",
      "약불로 줄이고 다진 마늘을 약 20초 볶아 향을 냅니다.",
      "松露奶油醬 3큰술, 鮮奶油 適量, 삶은 물 3~4큰술을 넣어 약불로 살짝 끓이고 매끈해질 때까지 저으며 치즈의 절반을 녹입니다.",
      "강불로 올려 면과 구운 버섯을 넣고 1~2분 빠르게 버무려 크림 소스가 면에 고루 묻게 합니다.",
      "불을 끄고 松露醬 3큰술과 남은 치즈를 넣어 섞습니다(松露醬은 불을 끈 뒤 넣어 향을 살립니다).",
      "깊은 접시에 담아 후추를 뿌려 뜨겁게 내며, 貳樓 트러플 버섯 크림 파스타의 진한 향을 재현한다."
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
