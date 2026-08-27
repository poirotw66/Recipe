#!/usr/bin/env node
/**
 * Sync en/ja/ko steps for 14 sf recipes (batch 3) to match zh; set updatedAt 2026-07-06.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const UPDATED = "2026-07-06";

const SLUGS = [
  "sf-white-wine-garlic-clam-squid-ink-pasta",
  "sf-salted-egg-seafood-pizza",
  "sf-asahi-cordon-bleu-pork-burger",
  "sf-signature-double-stack-burger",
  "sf-spicy-mexican-firecracker-burger",
  "sf-mini-beef-egg-burger-set",
  "sf-bbq-roasted-half-chicken",
  "sf-buffalo-chicken-wings",
  "sf-salsa-black-curry-fried-chicken",
  "sf-campfire-lemon-zucchini-fish-fillet",
  "sf-chef-crispy-pork-knuckle",
  "sf-chicken-quesadilla",
  "sf-local-sausage-quesadilla",
  "sf-crispy-calamari-cocktail-sauce"
];

const STEPS = {
  "sf-white-wine-garlic-clam-squid-ink-pasta": {
    en: [
      "Prep: soak clams 400 g in water 1 hour to purge sand, then rinse and drain; slice garlic 適量 thin; wash basil 10 g and set aside.",
      "Bring a large pot of water to a rolling boil; add sea salt 1/3 tsp; cook squid ink pasta 180 g 1 minute less than package time until al dente; drain and reserve about 1 cup pasta water (this dish finishes brothy).",
      "Heat a skillet over medium-high with olive oil 1 tbsp; add garlic slices and cook over low heat until golden (about 1 minute), taking care not to burn.",
      "Raise heat to high; add clams and white wine 2 tbsp; cover immediately and steam 2–3 minutes until clams open; discard any that stay closed.",
      "Uncover and reduce heat to medium; add 5–6 tbsp pasta water and black pepper 1/4 tsp; stir and simmer until the broth slightly thickens and tastes sweet from the clams.",
      "Raise heat to high; add cooked squid ink pasta and toss vigorously 1–2 minutes so the noodles absorb the wine-clam liquor.",
      "Turn off heat; fold in basil leaves for aroma.",
      "Serve in a deep plate with lightly brothy noodles while hot to match Second Floor Cafe white wine garlic clam squid ink pasta."
    ],
    ja: [
      "下準備：あさり 400gを1時間水に浸して砂抜き後、洗って水切り；にんにく 適量を薄切り；バジル 10gを洗っておく。",
      "湯鍋にたっぷりの湯を強火で沸騰させ、海塩 1/3小匙を加え、イカスミパスタ 180gを表示時間より1分短くアルデンテに茹で、水切りして茹で汁を約1カップ取っておく（汁気のある仕上がり）。",
      "フライパンを中強火で熱し、オリーブオイル 大さじ1でにんにくを弱火で約1分、黄金色になるまで炒める（焦がさない）。",
      "強火に上げ、あさりと白ワイン 大さじ2を加え、すぐ蓋をして2～3分蒸し、殻が開いたら完成；開かないものは捨てる。",
      "蓋を外し中火に；茹で汁 大さじ5～6と黒胡椒 1/4小匙を加え、汁が少しとろみ、あさりの甘みが出るまで煮る。",
      "強火に戻し、茹でたパスタを加え1～2分素早く和え、麺に酒香あさり汁が染み込むようにする。",
      "火を止め、バジルの葉を加えて香りを立てる。",
      "深皿に盛り、浅い汁でパスタを和えて温かいうちに、貳樓酒香蒜味蛤蜊墨魚麵の爽やかな海鮮風味を再現する。"
    ],
    ko: [
      "준비: 조개 400g을 물에 1시간 담가 모래를 빼고 씻어 건집니다; 마늘 適量을 얇게 썰고; 바질 10g을 씻어 둡니다.",
      "냄비에 물을 넉넉히 끓인 뒤 바다소금 1/3작은술을 넣고 오징어먹물 파스타 180g을 포장 표시보다 1분 짧게 알덴테로 삶아 건지고 삶은 물 약 1컵을 남깁니다(국물감 있는 마무리).",
      "팬에 올리브 오일 1큰술을 중강불로 달군 뒤 마늘 슬라이스를 약불로 약 1분 황금색이 될 때까지 볶습니다(타지 않게).",
      "강불로 올려 조개와 백포도주 2큰술을 넣고 바로 뚜껑을 덮어 2~3분 찐 뒤 조개가 열리면 완성; 열리지 않은 것은 버립니다.",
      "뚜껑을 열고 중불로 줄인 뒤 삶은 물 5~6큰술과 후추 1/4작은술을 넣어 국물이 살짝 걸쭉하고 조개 단맛이 나도록 끓입니다.",
      "강불로 올려 삶은 파스타를 넣고 1~2분 빠르게 버무려 면이 와인 조개 국물을 흡수하게 합니다.",
      "불을 끄고 바질 잎을 넣어 향을 냅니다.",
      "깊은 접시에 담아 국물이 살짝 있는 파스타로 뜨겁게 내며, 貳樓酒香蒜味蛤蜊墨魚麵의 상큼한 해산물 풍미를 재현합니다."
    ]
  },
  "sf-salted-egg-seafood-pizza": {
    en: [
      "Prep: clean seafood mix 180 g (shrimp, squid, etc.) and cut bite-size; pat thoroughly dry; wash basil 10 g; blend salted egg sauce 適量 with salted egg yolk sauce 2 tbsp into a flowing golden base and taste to adjust.",
      "Preheat oven to 220°C; brush pizza crusts 2 pc lightly with olive oil 1 tbsp.",
      "Heat a little oil in a skillet over medium; spread seafood in a single layer and sear until 70% cooked with light char (shrimp pink, squid curled, about 2 minutes); set aside to avoid overcooking in the oven.",
      "Spread the golden sauce evenly on crusts, leaving about 1 cm bare at the edge.",
      "Top with seared seafood and basil; season with sea salt 1/3 tsp and black pepper 1/4 tsp.",
      "Bake at 220°C for 8–10 minutes until the crust is golden crisp and the sauce bubbles lightly.",
      "Rest 2 minutes, slice, and serve hot to match Second Floor Cafe golden flowing seafood pizza."
    ],
    ja: [
      "下準備：海鮮 180g（エビ、イカなど）を洗って一口大に切り、水気を十分に拭く；バジル 10gを洗う；金沙醬 適量と鹹蛋黃醬 大さじ2を混ぜて流沙ソースを作り味を見る。",
      "オーブンを220℃に予熱；ピザ生地 2枚にオリーブオイル 大さじ1を軽く塗る。",
      "フライパンを中火で少し油を熱し、海鮮を一枚に広げて表面が軽く焦げ、7分火が通るまで（エビがピンク、イカが丸まる、約2分）炒め、取り出す（オーブンで煮詰まらないように）。",
      "生地に流沙ソースを均一に塗り、縁から約1cmは空ける。",
      "炒めた海鮮とバジルをのせ、海塩 1/3小匙と黒胡椒 1/4小匙で味を整える。",
      "220℃で8～10分焼き、生地が黄金色にサクサク、ソースが軽く泡立つまで。",
      "2分休ませて切り分け、温かいうちに貳樓金黃流沙海鮮披薩の塩香流沙風味を再現する。"
    ],
    ko: [
      "준비: 해산물 180g(새우, 오징어 등)을 씻어 한입 크기로 자르고 물기를 완전히 뺍니다; 바질 10g을 씻습니다; 金沙醬 適量과 鹹蛋黃醬 2큰술을 섞어 흐르는 황금 소스를 만들고 간을 맞춥니다.",
      "오븐을 220°C로 예열합니다; 피자 도우 2장에 올리브 오일 1큰술을 가볍게 바릅니다.",
      "팬에 기름을 조금 넣고 중불로 달군 뒤 해산물을 한 겹으로 펼쳐 70% 익고 겉이 살짝 탈 때까지 볶습니다(새우 분홍, 오징어 말림, 약 2분); 건져 둡니다(오븐에서 과하게 익지 않게).",
      "도우에 황금 소스를 고르게 바르고 가장자리 1cm 정도는 비웁니다.",
      "볶은 해산물과 바질을 올리고 바다소금 1/3작은술과 후추 1/4작은술로 간합니다.",
      "220°C에서 8~10분 굽혀 도우가 황금빛 바삭하고 소스가 살짝 끓을 때까지 합니다.",
      "2분 식힌 뒤 잘라 뜨겁게 내며, 貳樓金黃流沙海鮮披薩의 짭짤한 황금 소스 풍미를 재현합니다."
    ]
  },
  "sf-asahi-cordon-bleu-pork-burger": {
    en: [
      "Rest cordon bleu pork cutlet 220 g at room temperature 10 minutes; split burger buns 2 pc; wash lettuce and drain; slice tomato thin.",
      "Heat olive oil 1 tbsp in a skillet over medium; season both sides of the cutlet with sea salt 1/3 tsp and black pepper 1/4 tsp.",
      "Pan-fry cutlet over medium heat 3 minutes until golden on the bottom; flip and cook 3 minutes more; if cheese inside is not melted, cover and steam on low 1 minute, then remove.",
      "Wipe the pan; toast bun cut sides dry without oil 1–2 minutes until golden crisp; set aside.",
      "Lay cheese 40 g on the hot cutlet; cover or microwave 20 seconds until edges soften.",
      "On the bottom bun, layer lettuce, tomato, and hot cutlet; cap with top bun and press gently to set.",
      "Halve or serve whole while hot to match Second Floor Cafe Asahi cordon bleu pork burger."
    ],
    ja: [
      "藍帶豬排 220gを冷蔵庫から取り出し10分常温に戻す；ハンバーガーバンズ 2個を横切り；レタスを洗って水切り、トマトを薄切りにする。",
      "フライパンを中火で熱し、オリーブオイル 大さじ1を入れる；豚カツ両面に海塩 1/3小匙と黒胡椒 1/4小匙を振る。",
      "中火で3分焼き底面がこんがりしたらひっくり返し、さらに3分；中のチーズが溶けていなければ弱火で蓋をして1分蒸し、取り出す。",
      "同じ鍋を拭き、バンの切り口を下にして油なしで1～2分、表面が焦げてサクサクに；取り出す。",
      "熱い豚カツに起司 40gをのせ、蓋または電子レンジ20秒で縁が溶けるまで。",
      "下のバンにレタス、トマト、熱い豚カツを重ね、上のバンをかぶせて軽く押す。",
      "半分に切るかそのまま温かいうちに、貳樓朝日藍帶豬排堡の厚みを再現する。"
    ],
    ko: [
      "코르동 블루 돈까스 220g을 냉장에서 꺼내 실온에 10분 둡니다; 햄버거 번 2개를 가로로 자릅니다; 상추를 씻어 건지고 토마토를 얇게 썹니다.",
      "팬에 올리브 오일 1큰술을 중불로 달굽니다; 돈까스 양면에 바다소금 1/3작은술과 후추 1/4작은술을 뿌립니다.",
      "중불로 3분 굽다 바닥이 노릇해지면 뒤집어 3분 더 굽습니다; 속 치즈가 안 녹으면 약불에 뚜껑을 덮어 1분 찐 뒤 꺼냅니다.",
      "팬을 닦고 번 안쪽을 아래로 놓고 기름 없이 1~2분 노릇바삭하게 토스트합니다.",
      "뜨거운 돈까스 위에 치즈 40g을 올리고 뚜껑을 덮거나 전자레인지 20초 가열해 가장자리가 녹을 때까지 합니다.",
      "아래 번에 상추, 토마토, 뜨거운 돈까스를 올리고 윗번을 덮어 살짝 누릅니다.",
      "반으로 자르거나 통째로 뜨겁게 내며, 貳樓朝日藍帶豬排堡의 두툼한 식감을 재현합니다."
    ]
  },
  "sf-signature-double-stack-burger": {
    en: [
      "Set out beef patty 180 g, bacon 80 g, fried fish 適量, potato wedges 250 g, and burger buns 2 pc; wash and slice lettuce and tomato and keep dry.",
      "Cook bacon 80 g in a skillet over medium until crisp both sides (about 3 minutes); drain on paper towels.",
      "Add olive oil 1 tbsp to the same pan and heat until shimmering; season beef both sides with sea salt 1/3 tsp and black pepper 1/4 tsp; lay in pan and sear 3 minutes without moving.",
      "Flip beef and cook 2–3 minutes until cooked through (no pink inside); cover 30 seconds at the end to rest juices.",
      "Reheat fried fish in an air fryer at 180°C for 4 minutes, or pan-fry with a little oil 2 minutes per side until golden crisp.",
      "Toast bun cut sides dry 1–2 minutes until golden; cook wedges per package until golden.",
      "Spread balsamic sauce 適量 on the bottom bun; stack lettuce, tomato, beef, bacon, and fried fish; cap and press gently.",
      "Halve the burger, plate with hot wedges to match Second Floor Cafe signature double-stack burger."
    ],
    ja: [
      "牛肉パティ 180g、ベーコン 80g、炸魚 適量、ポテト 250g、ハンバーガーバンズ 2個を用意；レタスとトマトを洗って切り、水気を切る。",
      "フライパンを中火でベーコン 80gを両面こんがりになるまで約3分焼き、キッチンペーパーで油を切る。",
      "同じ鍋にオリーブオイル 大さじ1を加えて熱する；牛肉両面に海塩 1/3小匙と黒胡椒 1/4小匙を振り、動かさず3分焼く。",
      "ひっくり返して2～3分、中心まで火が通るまで（断面にピンクが残らない）；最後に蓋をして30秒休ませる。",
      "炸魚を180℃のノンフライヤーで4分再加熱、または少し油で両面2分ずつサクサクに。",
      "バンの切り口を1～2分こんがり焼く；ポテトは表示通りに黄金色まで。",
      "下のバンにバサミック醬 適量を塗り、レタス、トマト、牛肉、ベーコン、炸魚を重ね、上をかぶせて軽く押す。",
      "ハンバーガーを半分に切り、温かいポテトと一緒に盛り、貳樓實打實招牌漢堡の二層肉感を再現する。"
    ],
    ko: [
      "소고기 패티 180g, 베이컨 80g, 튀김 생선 適量, 감자 웨지 250g, 햄버거 번 2개를 준비합니다; 상추와 토마토를 씻어 썰고 물기를 뺍니다.",
      "팬에 베이컨 80g을 중불로 양면이 바삭해질 때까지 약 3분 굽고 키친타월에 올려 기름을 뺍니다.",
      "같은 팬에 올리브 오일 1큰술을 넣어 달군 뒤 소고기 양면에 바다소금 1/3작은술과 후추 1/4작은술을 뿌리고 3분간 움직이지 않고 굽습니다.",
      "뒤집어 2~3분 더 익혀 속까지 익힙니다(단면에 핑크가 없을 때); 마지막에 뚜껑을 덮어 30초 쉽니다.",
      "튀김 생선을 에어프라이어 180°C에서 4분 재가열하거나 팬에 기름을 조금 넣어 양면 2분씩 바삭하게 굽습니다.",
      "번 안쪽을 1~2분 노릇하게 토스트합니다; 웨지는 포장 표시대로 황금색까지 조리합니다.",
      "아래 번에 발사믹 소스 適量을 바르고 상추, 토마토, 소고기, 베이컨, 튀김 생선을 올린 뒤 윗번을 덮어 살짝 누릅니다.",
      "햄버거를 반으로 자르고 뜨거운 웨지와 함께 내며, 貳樓實打實招牌漢堡의 이중 고기감을 재현합니다."
    ]
  },
  "sf-spicy-mexican-firecracker-burger": {
    en: [
      "Set out beef patty 180 g, cheese 40 g, fried jalapeños 適量, potato wedges 250 g, and burger buns 2 pc; wash and slice lettuce and tomato.",
      "Heat olive oil 1 tbsp in a skillet over medium until shimmering; season beef with sea salt 1/3 tsp, black pepper 1/4 tsp, and chili flakes 1/2 tsp.",
      "Sear beef 3 minutes until the bottom chars; flip and cook 2–3 minutes until done; top with cheese 40 g, cover 30 seconds until slightly melted.",
      "Toast bun cut sides in the same pan 1–2 minutes until golden; cook wedges until golden.",
      "Spread a little olive oil and BBQ sauce 2 tbsp on the bottom bun; layer lettuce, tomato, and hot beef.",
      "Add fried jalapeños 適量; cap with top bun and press gently.",
      "Halve the burger, plate with hot wedges while hot to match the Mexican firecracker burger heat."
    ],
    ja: [
      "牛肉パティ 180g、起司 40g、炸墨西哥辣椒 適量、ポテト 250g、ハンバーガーバンズ 2個を用意；レタスとトマトを洗って切る。",
      "フライパンを中火でオリーブオイル 大さじ1を熱し、牛肉に海塩 1/3小匙、黒胡椒 1/4小匙、辣椒碎 1/2小匙を振る。",
      "牛肉を3分焼き底面に焦げ目をつけ、ひっくり返して2～3分火を通す；起司 40gをのせ蓋をして30秒溶かす。",
      "同じ鍋でバンの切り口を1～2分こんがり焼く；ポテトを黄金色まで調理。",
      "下のバンにオリーブオイル 少々とBBQ 醬 大さじ2を塗り、レタス、トマト、熱い牛肉を重ねる。",
      "炸墨西哥辣椒 適量をのせ、上のバンをかぶせて軽く押す。",
      "ハンバーガーを半分に切り、温かいポテトと一緒に、老墨辣鞭炮漢堡の辛さを再現する。"
    ],
    ko: [
      "소고기 패티 180g, 치즈 40g, 튀긴 할라페뇨 適量, 감자 웨지 250g, 햄버거 번 2개를 준비합니다; 상추와 토마토를 씻어 썹니다.",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 소고기에 바다소금 1/3작은술, 후추 1/4작은술, 고춧가루 1/2작은술을 뿌립니다.",
      "소고기를 3분 굽다 바닥에 그을림을 내고 뒤집어 2~3분 익힙니다; 치즈 40g을 올리고 뚜껑을 덮어 30초 녹입니다.",
      "같은 팬에서 번 안쪽을 1~2분 노릇하게 토스트합니다; 웨지를 황금색까지 조리합니다.",
      "아래 번에 올리브 오일 약간과 BBQ 소스 2큰술을 바르고 상추, 토마토, 뜨거운 소고기를 올립니다.",
      "튀긴 할라페뇨 適量을 올리고 윗번을 덮어 살짝 누릅니다.",
      "햄버거를 반으로 자르고 뜨거운 웨지와 함께 내며, 老墨辣鞭炮漢堡의 매운맛을 재현합니다."
    ]
  },
  "sf-mini-beef-egg-burger-set": {
    en: [
      "Split mini burger buns 適量; rest beef patty 180 g at room temperature; prepare fried egg 適量 and fries 250 g; wash and slice lettuce and tomato.",
      "Heat olive oil 1 tbsp in a skillet over medium; season beef both sides with sea salt 1/3 tsp and black pepper 1/4 tsp; sear 3 minutes without moving.",
      "Flip and cook 2–3 minutes until done; set aside and keep warm.",
      "Crack egg into the same pan; cook over medium-low into a sunny-side or fully set egg (whites set, yolk runny or firm to taste, about 2–3 minutes).",
      "Toast mini bun cut sides dry 1 minute until lightly crisp.",
      "Cook fries per package until golden; dust lightly with salt.",
      "Stack lettuce, beef, and egg on the bottom mini bun; cap and plate with fries as a kids set while hot."
    ],
    ja: [
      "小漢堡 適量を横切り、牛肉パティ 180gを常温に戻す；煎蛋 適量とフライドポテト 250gを用意；レタスとトマトを洗って切る。",
      "フライパンを中火でオリーブオイル 大さじ1を熱し、牛肉両面に海塩 1/3小匙と黒胡椒 1/4小匙を振り、動かさず3分焼く。",
      "ひっくり返して2～3分火を通し、取り出して保温。",
      "同じ鍋に卵を割り入れ、弱めの中火で目玉焼きまたは全熟に（白身が固まり、黄身は好みでとろとろか全熟、約2～3分）。",
      "小バンの切り口を1分、軽くこんがり焼く。",
      "フライドポテトは表示通りに黄金色まで揚げ、塩を少々振る。",
      "下の小バンにレタス、牛肉、煎蛋を重ね、上をかぶせてフライと一緒にキッズセットとして温かいうちに盛る。"
    ],
    ko: [
      "미니 햄버거 번 適量을 가로로 자르고 소고기 패티 180g을 실온에 둡니다; 계란 프라이 適量과 감자튀김 250g을 준비합니다; 상추와 토마토를 씻어 썹니다.",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 소고기 양면에 바다소금 1/3작은술과 후추 1/4작은술을 뿌리고 3분간 움직이지 않고 굽습니다.",
      "뒤집어 2~3분 더 익힌 뒤 건져 보온합니다.",
      "같은 팬에 달걀을 깨뜨려 중약불로 계란 프라이 또는 완숙으로 굽습니다(흰자가 익고 노른자는 취향대로, 약 2~3분).",
      "미니 번 안쪽을 1분 가볍게 노릇하게 토스트합니다.",
      "감자튀김은 포장 표시대로 황금색까지 조리하고 소금을 살짝 뿌립니다.",
      "아래 미니 번에 상추, 소고기, 계란 프라이를 올리고 윗번을 덮어 감자튀김과 함께 키즈 세트로 뜨겁게 낸다."
    ]
  },
  "sf-bbq-roasted-half-chicken": {
    en: [
      "Clean and pat dry half chicken 1/2 pc; rub inside and out with olive oil 2 tbsp, sea salt 1 tsp, and black pepper 1/2 tsp; refrigerate 20 minutes; preheat oven to 200°C.",
      "Sear skin-side down in a cast-iron or heavy skillet over high heat until golden to lock juices (about 4 minutes); flip and sear 2 minutes more.",
      "Transfer to a roasting pan; bake at 190°C about 25 minutes until juices run clear when pierced at the thickest part of the thigh.",
      "During the last 5 minutes, brush BBQ sauce 2 tbsp and add roasted corn 100 g and fries 250 g to heat in the oven.",
      "Rest 5 minutes out of the oven so juices redistribute.",
      "Carve along the bone and arrange chicken, corn, and fries on a large platter.",
      "Drizzle a little more BBQ sauce if desired; serve hot to match Second Floor Cafe BBQ roasted half chicken."
    ],
    ja: [
      "半雞 1/2隻を洗って水気を拭き、内外にオリーブオイル 大さじ2、海塩 1小匙、黒胡椒 1/2小匙をすり込み、20分冷蔵；オーブンを200℃に予熱。",
      "鋳鉄鍋または厚手のフライパンを強火で熱し、皮目を下に4分こんがり焼いて肉汁を閉じ込める；ひっくり返してさらに2分。",
      "ロースト皿に移し、190℃で約25分、太ももの厚い部分に刺して汁が透明になるまで焼く。",
      "最後の5分にBBQ 醬 大さじ2を塗り、烤玉米 100gとフライドポテト 250gをオーブンで一緒に温める。",
      "オーブンから出して5分休ませ、肉汁を均す。",
      "骨に沿って切り分け、鶏肉、トウモロコシ、フライを大皿に分けて盛る。",
      "好みでBBQソースを少し足し、温かいうちに貳樓BBQ 溫烤半雞のボリューム感を再現する。"
    ],
    ko: [
      "반마리 닭 1/2隻를 씻어 물기를 닦고 안팎에 올리브 오일 2큰술, 바다소금 1작은술, 후추 1/2작은술을 문질러 20분 냉장합니다; 오븐을 200°C로 예열합니다.",
      "무쇠팬이나 두꺼운 팬을 강불로 달군 뒤 껍질 아래로 4분 노릇하게 굽어 육즙을 가둡니다; 뒤집어 2분 더 굽습니다.",
      "로스팅 팬에 옮겨 190°C에서 약 25분, 허벅지 가장 두꺼운 부분을 찔러 국물이 맑을 때까지 굽습니다.",
      "마지막 5분에 BBQ 소스 2큰술을 바르고 구운 옥수수 100g과 감자튀김 250g을 오븐에서 함께 데웁니다.",
      "오븐에서 꺼내 5분 쉬어 육즙이 고르게 퍼지게 합니다.",
      "뼈를 따라 썰어 닭고기, 옥수수, 감자튀김을 큰 접시에 나눠 담습니다.",
      "취향에 따라 BBQ 소스를 조금 더 뿌려 뜨겁게 내며, 貳樓BBQ 溫烤半雞의 푸짐한 한 접시를 재현합니다."
    ]
  },
  "sf-buffalo-chicken-wings": {
    en: [
      "Rinse chicken wings 8 pc; pat thoroughly dry; massage with sea salt 1/2 tsp and a pinch of black pepper; rest 10 minutes.",
      "Coat wings evenly in a thin layer of crispy fry mix (or all-purpose flour); press lightly and shake off excess.",
      "Fill fryer with oil 600 ml; heat to 170°C; fry wings in batches over medium heat 6 minutes until set and cooked through.",
      "Drain on a wire rack and rest 3 minutes to release steam.",
      "Raise oil to 185°C; second fry 1.5–2 minutes until golden crisp; drain.",
      "Warm buffalo sauce 適量 in a small pan over low heat (do not boil); turn off heat and toss wings quickly to coat.",
      "Line a plate with paper towels; arrange wings with blue cheese sauce 2 tbsp and chili flakes 1/2 tsp for dipping; serve hot to share."
    ],
    ja: [
      "炸雞翅 8隻を洗い、キッチンペーパーで十分に水気を拭く；海塩 1/2小匙と黒胡椒 少々でもみ込み10分置く。",
      "鶏手羽を薄い衣の酥炸粉（または薄力粉）に均一にまぶし、軽く押して余分な粉を払う。",
      "揚げ油 600mlを175℃に熱し、手羽を少量ずつ中火で6分、形が固まり中心まで火が通るまで揚げる。",
      "網に上げて3分休ませ、内部の蒸気を逃がす。",
      "油温を185℃に上げ、1.5～2分再度揚げて黄金色にサクサクにし、油を切る。",
      "小鍋で水牛城醬 適量を弱火で温める（沸騰させない）；火を止めて揚げ手羽を素早く絡める。",
      "皿にキッチンペーパーを敷き、手羽を盛る；藍紋起司醬 大さじ2と辣椒碎 1/2小匙を添えて温かいうちにシェア。"
    ],
    ko: [
      "닭날개 8개를 씻고 키친타월로 물기를 완전히 뺍니다; 바다소금 1/2작은술과 후추 약간을 넣고 10분 재웁니다.",
      "닭날개에 얇은 튀김가루(또는 밀가루)를 고루 입혀 살짝 누르고 남은 가루를 털어냅니다.",
      "튀김기름 600ml를 170°C로 달군 뒤 닭날개를 소량씩 중불로 6분 튀겨 겉이 잡히고 속까지 익힙니다.",
      "철망에 올려 3분 쉬어 속 김이 빠지게 합니다.",
      "기름 온도를 185°C로 올려 1.5~2분 더 튀겨 황금색 바삭하게 만든 뒤 기름을 뺍니다.",
      "작은 냄비에 버팔로 소스 適量을 약불로 데웁니다(끓이지 않음); 불을 끄고 튀긴 날개를 빠르게 버무려 양념을 입힙니다.",
      "접시에 키친타월을 깔고 날개를 올립니다; 블루치즈 소스 2큰술과 고춧가루 1/2작은술을 곁들여 뜨겁게 나눠 먹습니다."
    ]
  },
  "sf-salsa-black-curry-fried-chicken": {
    en: [
      "Cut fried chicken 適量 into bite-size pieces; pat thoroughly dry; massage with sea salt 1/2 tsp and a pinch of black pepper; rest 10 minutes.",
      "Coat chicken evenly in a thin layer of crispy fry mix; press lightly and shake off excess.",
      "Fill fryer with oil 600 ml; heat to 170°C; fry chicken in batches over medium heat 6–7 minutes until cooked through and set on the outside.",
      "Drain on a wire rack and rest 3 minutes.",
      "Raise oil to 185°C; second fry 1.5–2 minutes until golden crisp; drain.",
      "Mix black curry sauce 2 tbsp with salsa sauce 2 tbsp and chili flakes 1/2 tsp into a dual dip.",
      "Plate fried chicken with the black curry salsa sauce on the side for dipping to match Second Floor Cafe share-plate crispness."
    ],
    ja: [
      "炸雞 適量を一口大に切り、キッチンペーパーで十分に水気を拭く；海塩 1/2小匙と黒胡椒 少々でもみ込み10分置く。",
      "鶏肉を薄い酥炸粉に均一にまぶし、軽く押して余分な粉を払う。",
      "揚げ油 600mlを170℃に熱し、鶏肉を少量ずつ中火で6～7分、中心まで火が通り表面が固まるまで揚げる。",
      "網に上げて3分休ませる。",
      "油温を185℃に上げ、1.5～2分再度揚げて黄金色にサクサクにし、油を切る。",
      "小鉢に黑咖哩醬 大さじ2と莎莎醬 大さじ2、辣椒碎 1/2小匙を混ぜて二種ダレにする。",
      "揚げ鶏を盛り、黑咖哩莎莎醬を別添えにしてつけて、貳樓シェアプレートのサクサク感を再現する。"
    ],
    ko: [
      "튀김 닭 適量을 한입 크기로 자르고 키친타월로 물기를 완전히 뺍니다; 바다소금 1/2작은술과 후추 약간을 넣고 10분 재웁니다.",
      "닭고기에 얇은 튀김가루를 고루 입혀 살짝 누르고 남은 가루를 털어냅니다.",
      "튀김기름 600ml를 170°C로 달군 뒤 닭고기를 소량씩 중불로 6~7분 튀겨 속까지 익고 겉이 잡힐 때까지 합니다.",
      "철망에 올려 3분 쉽니다.",
      "기름 온도를 185°C로 올려 1.5~2분 더 튀겨 황금색 바삭하게 만든 뒤 기름을 뺍니다.",
      "작은 그릇에 흑카레 소스 2큰술, 살사 소스 2큰술, 고춧가루 1/2작은술을 섞어 이중 딥 소스를 만듭니다.",
      "튀긴 닭을 담고 흑카레 살사 소스를 곁들여 찍어 먹으며, 貳樓 공유 플레이트의 바삭함을 재현합니다."
    ]
  },
  "sf-campfire-lemon-zucchini-fish-fillet": {
    en: [
      "Pat fish fillet 180 g dry with paper towels; slice zucchini 適量 into 0.5 cm rounds; prepare lemon sauce 適量.",
      "Season both sides of fish with sea salt 1/3 tsp and black pepper 1/4 tsp; rest 5 minutes.",
      "Heat olive oil 1 tbsp in a skillet over medium until shimmering; sear fish skin-side down (if skin-on) 3 minutes until golden on the bottom.",
      "Flip and cook 2–3 minutes until opaque and flakes easily with a fork; set aside and keep warm.",
      "In the same pan, sauté zucchini rounds over medium 2 minutes until edges lightly char and still crisp-tender.",
      "Turn off heat; squeeze a little lemon juice and fold in lemon sauce 適量 into a warm glaze.",
      "Plate fish and zucchini separately; drizzle lemon sauce and serve hot for the Linkou campfire lemon zucchini fish fillet."
    ],
    ja: [
      "魚菲力 180gをキッチンペーパーで水気を拭く；ズッキーニ 適量を0.5cmの輪切りに；檸香醬汁 適量を用意。",
      "魚両面に海塩 1/3小匙と黒胡椒 1/4小匙を振り、5分置いて味をなじませる。",
      "フライパンを中火でオリーブオイル 大さじ1を熱し、皮目を下に（皮がある場合）3分、底面がこんがりするまで焼く。",
      "ひっくり返して2～3分、不透明になりフォークでほぐれるまで；取り出して保温。",
      "同じ鍋でズッキーニを中火で2分、縁が軽く焦げてまだシャキッとするまで炒める。",
      "火を止め、レモン汁を少し絞り、檸香醬汁 適量を加えて温かいソースにする。",
      "魚とズッキーニを分けて盛り、檸香ソースをかけて温かいうちに林口限定野炊風味を再現する。"
    ],
    ko: [
      "생선 필레 180g의 물기를 키친타월로 닦습니다; 주키니 適量을 0.5cm 두께로 썹니다; 레몬 소스 適量을 준비합니다.",
      "생선 양면에 바다소금 1/3작은술과 후추 1/4작은술을 뿌려 5분 재웁니다.",
      "팬에 올리브 오일 1큰술을 중불로 달군 뒤 껍질이 있으면 껍질 아래로 3분 바닥이 노릇해질 때까지 굽습니다.",
      "뒤집어 2~3분 불투명해지고 포크로 쉽게 갈라질 때까지 굽습니다; 건져 보온합니다.",
      "같은 팬에 주키니를 중불로 2분 볶아 가장자리가 살짝 탄 뒤에도 아삭함을 유지합니다.",
      "불을 끄고 레몬즙을 조금 짜고 레몬 소스 適量을 넣어 따뜻한 소스로 만듭니다.",
      "생선과 주키니를 나눠 담고 레몬 소스를 뿌려 뜨겁게 내며, 林口限定野炊風味을 재현합니다."
    ]
  },
  "sf-chef-crispy-pork-knuckle": {
    en: [
      "Clean and dry German pork knuckle 900 g; score the skin; rub inside and out with olive oil 2 tbsp, sea salt 1 tsp, and black pepper 1/2 tsp; marinate 20 minutes; preheat oven to 200°C.",
      "Sear skin-side down in a cast-iron pan over high heat until golden (about 5 minutes); flip and sear 2 minutes more to lock juices.",
      "Transfer to a roasting pan; bake at 190°C about 35 minutes until skin blisters crisp and meat is tender.",
      "During the last 5 minutes, add roasted corn 100 g and fries 250 g to the oven; brush a little more olive oil if needed for color.",
      "Rest out of the oven 5 minutes.",
      "Carve along the joints; arrange pork knuckle, corn, fries, and sauerkraut 50 g on a large platter.",
      "Serve with mustard 適量 for dipping to match Second Floor Cafe chef crispy pork knuckle."
    ],
    ja: [
      "德式豬腳 900gを洗って拭き、皮に切り込みを入れる；内外にオリーブオイル 大さじ2、海塩 1小匙、黒胡椒 1/2小匙をすり込み20分漬ける；オーブンを200℃に予熱。",
      "鋳鉄鍋を強火で熱し、皮目を下に5分こんがり焼く；ひっくり返してさらに2分肉汁を閉じ込める。",
      "ロースト皿に移し、190℃で約35分、皮がパリパリに泡立ち、肉が柔らかくなるまで焼く。",
      "最後の5分に烤玉米 100gとフライドポテト 250gをオーブンで加熱；必要ならオリーブオイルを少し塗って色づけ。",
      "オーブンから出して5分休ませる。",
      "関節に沿って切り分け、豚足、トウモロコシ、フライ、酸菜 50gを大皿に分けて盛る。",
      "芥末 適量を添えてつけて、貳樓主廚脆皮豬腳の大皿盛りを再現する。"
    ],
    ko: [
      "독일식 족발 900g을 씻어 닦고 껍질에 칼집을 냅니다; 안팎에 올리브 오일 2큰술, 바다소금 1작은술, 후추 1/2작은술을 문질러 20분 재웁니다; 오븐을 200°C로 예열합니다.",
      "무쇠팬을 강불로 달군 뒤 껍질 아래로 5분 노릇하게 굽습니다; 뒤집어 2분 더 굽어 육즙을 가둡니다.",
      "로스팅 팬에 옮겨 190°C에서 약 35분, 껍질이 바삭하게 부풀고 속이 부드러워질 때까지 굽습니다.",
      "마지막 5분에 구운 옥수수 100g과 감자튀김 250g을 오븐에서 함께 데웁니다; 필요하면 올리브 오일을 조금 더 발라 색을 냅니다.",
      "오븐에서 꺼내 5분 쉽니다.",
      "관절을 따라 썰어 족발, 옥수수, 감자튀김, 사우어크라우트 50g을 큰 접시에 나눠 담습니다.",
      "머스타드 適量을 곁들여 찍어 먹으며, 貳樓主廚脆皮豬腳의 푸짐한 플레이팅을 재현합니다."
    ]
  },
  "sf-chicken-quesadilla": {
    en: [
      "Dice chicken 180 g and onion finely; warm tortillas 適量; shred cheese 40 g.",
      "Heat a little oil in a skillet over medium; sauté onion 1 minute, add chicken and stir-fry 4–5 minutes until cooked through; season with sea salt 1/2 tsp and a pinch of black pepper; set aside.",
      "Heat another skillet over low; lay a tortilla flat and cover half with cheese, cooked chicken, and salsa 適量.",
      "Fold into a half-moon and press flat with a spatula.",
      "Cook over medium-low 2–3 minutes until the bottom is speckled golden and cheese begins to melt.",
      "Flip and cook 2–3 minutes more until crisp and cheese flows.",
      "Cut into wedges; serve with guacamole 2 tbsp, sour cream 1.5 tbsp, and BBQ 適量 for dipping."
    ],
    ja: [
      "雞肉 180gを細かく角切り、玉ねぎをみじん切りに；薄餅 適量を常温に戻し、起司 40gを削る。",
      "フライパンを中火で少し油を熱し、玉ねぎを1分炒め、雞肉を加えて4～5分色が変わり火が通るまで炒める；海塩 1/2小匙と黒胡椒 少々で味を整え、取り出す。",
      "別のフライパンを弱火で熱し、薄餅を広げ、半分に起司、炒めた雞肉、莎莎 適量をのせる。",
      "半月形に折り、ヘラで軽く押して平らにする。",
      "弱めの中火で2～3分、底面に斑点のこんがり色と起司が溶け始めるまで焼く。",
      "ひっくり返してさらに2～3分、パリッとして起司がとろけるまで。",
      "三角に切り分け、酪梨醬 大さじ2、酸奶油 大さじ1.5、BBQ 適量を添えて温かいうちにシェア。"
    ],
    ko: [
      "닭고기 180g을 잘게 깍둑썰기하고 양파를 잘게 다집니다; 또르띠야 適量을 실온에 두고 치즈 40g을 갈아 둡니다.",
      "팬에 기름을 조금 넣고 중불로 달군 뒤 양파를 1분 볶고 닭고기를 넣어 4~5분 익을 때까지 볶습니다; 바다소금 1/2작은술과 후추 약간으로 간한 뒤 건져 둡니다.",
      "다른 팬을 약불로 달군 뒤 또르띠야를 펼치고 반쪽에 치즈, 볶은 닭고기, 살사 適量을 올립니다.",
      "반달 모양으로 접고 뒤집개로 살짝 눌러 평평하게 합니다.",
      "중약불로 2~3분 바닥에 반점처럼 노릇해지고 치즈가 녹기 시작할 때까지 굽습니다.",
      "뒤집어 2~3분 더 바삭하고 치즈가 흐를 때까지 굽습니다.",
      "삼각형으로 잘라 과카몰리 2큰술, 사워크림 1.5큰술, BBQ 適量을 곁들여 뜨겁게 나눠 먹습니다."
    ]
  },
  "sf-local-sausage-quesadilla": {
    en: [
      "Slice sausage 140 g thin; dice onion finely; warm tortillas 適量; shred cheese 40 g.",
      "Heat a little oil in a skillet over medium; sauté onion 1 minute, add sausage and cook until lightly charred and oily (about 3 minutes); season with sea salt 1/2 tsp; set aside.",
      "Heat another skillet over low; lay a tortilla flat and cover half with cheese, sausage-onion filling, and salsa 適量.",
      "Fold into a half-moon and press with a spatula.",
      "Cook over medium-low 2–3 minutes until the bottom is golden speckled and cheese edges melt.",
      "Flip and cook 2–3 minutes more until crisp and cheese is fully melted.",
      "Cut into wedges; serve with guacamole 2 tbsp, sour cream 1.5 tbsp, and BBQ 適量 while hot."
    ],
    ja: [
      "香腸 140gを薄切り、玉ねぎをみじん切りに；薄餅 適量を常温に戻し、起司 40gを削る。",
      "フライパンを中火で少し油を熱し、玉ねぎを1分炒め、香腸を加えて3分軽く焦げて脂が出るまで炒める；海塩 1/2小匙で味を整え、取り出す。",
      "別のフライパンを弱火で熱し、薄餅を広げ、半分に起司、香腸玉ねぎ餡、莎莎 適量をのせる。",
      "半月形に折り、ヘラで軽く押す。",
      "弱めの中火で2～3分、底面がこんがり斑点になり起司の縁が溶けるまで焼く。",
      "ひっくり返してさらに2～3分、パリッとして起司が完全に溶けるまで。",
      "切り分け、酪梨醬 大さじ2、酸奶油 大さじ1.5、BBQ 適量を添えて温かいうちにシェア。"
    ],
    ko: [
      "소시지 140g을 얇게 썰고 양파를 잘게 다집니다; 또르띠야 適量을 실온에 두고 치즈 40g을 갈아 둡니다.",
      "팬에 기름을 조금 넣고 중불로 달군 뒤 양파를 1분 볶고 소시지를 넣어 3분 살짝 탄 뒤 기름이 나올 때까지 볶습니다; 바다소금 1/2작은술로 간한 뒤 건져 둡니다.",
      "다른 팬을 약불로 달군 뒤 또르띠야를 펼치고 반쪽에 치즈, 소시지 양파 속, 살사 適量을 올립니다.",
      "반달 모양으로 접고 뒤집개로 살짝 누릅니다.",
      "중약불로 2~3분 바닥이 노릇한 반점이 생기고 치즈 가장자리가 녹을 때까지 굽습니다.",
      "뒤집어 2~3분 더 바삭하고 치즈가 완전히 녹을 때까지 굽습니다.",
      "잘라 과카몰리 2큰술, 사워크림 1.5큰술, BBQ 適量을 곁들여 뜨겁게 나눠 먹습니다."
    ]
  },
  "sf-crispy-calamari-cocktail-sauce": {
    en: [
      "Cut squid 300 g into rings or strips; pat thoroughly dry; lightly season with sea salt 1/2 tsp and a pinch of black pepper; rest 10 minutes.",
      "Coat squid evenly in a thin layer of crispy fry mix; shake off excess.",
      "Fill fryer with oil 600 ml; heat to 175°C; fry squid in batches 1.5–2 minutes until golden and springy (do not overcook or it toughens).",
      "Drain on a wire rack or paper towels.",
      "Cook fries 250 g per package until golden; dust lightly with salt.",
      "Cut lemon 1/2 into wedges; portion cocktail sauce 2 tbsp into a small dish.",
      "Line a large plate with paper towels; arrange crispy squid and fries with lemon wedges and cocktail sauce for dipping."
    ],
    ja: [
      "魷魚 300gを輪切りまたは細切りにし、キッチンペーパーで十分に水気を拭く；海塩 1/2小匙と黒胡椒 少々で軽く10分漬ける。",
      "イカを薄い酥炸粉に均一にまぶし、余分な粉を払う。",
      "揚げ油 600mlを175℃に熱し、イカを少量ずつ1.5～2分、黄金色で弾力が残るまで揚げる（長く揚げすぎない）。",
      "網またはキッチンペーパーで油を切る。",
      "フライドポテト 250gは表示通りに黄金色まで揚げ、塩を少々振る。",
      "檸檬 1/2個をくし形に切る；雞尾酒醬 大さじ2を小皿に盛る。",
      "大皿にキッチンペーパーを敷き、酥炸イカとフライを盛り、檸檬と雞尾酒醬を添えてつける。"
    ],
    ko: [
      "오징어 300g을 링 또는 채 썰고 키친타월로 물기를 완전히 뺍니다; 바다소금 1/2작은술과 후추 약간으로 10분 가볍게 절입니다.",
      "오징어에 얇은 튀김가루를 고루 입혀 남은 가루를 털어냅니다.",
      "튀김기름 600ml를 175°C로 달군 뒤 오징어를 소량씩 1.5~2분 튀겨 황금색이고 탄력이 남을 때까지 합니다(오래 튀기지 않음).",
      "철망이나 키친타월에 올려 기름을 뺍니다.",
      "감자튀김 250g은 포장 표시대로 황금색까지 조리하고 소금을 살짝 뿌립니다.",
      "레몬 1/2개를 웨지로 썹니다; 칵테일 소스 2큰술을 작은 그릇에 담습니다.",
      "큰 접시에 키친타월을 깔고 바삭한 오징어와 감자튀김을 올리고 레몬 웨지와 칵테일 소스를 곁들입니다."
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
