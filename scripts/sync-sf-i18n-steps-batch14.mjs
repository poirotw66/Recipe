#!/usr/bin/env node
/**
 * Sync en/ja/ko steps for 14 sf recipes to match zh; set updatedAt 2026-07-06.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const UPDATED = "2026-07-06";

const SLUGS = [
  "sf-oat-crusted-fish-and-fries",
  "sf-classic-caesar-salad",
  "sf-smoked-salmon-caesar-salad",
  "sf-sous-vide-chicken-caesar-salad",
  "sf-roasted-sesame-chicken-salad",
  "sf-second-floor-saltwater-chicken-salad",
  "sf-green-superhero-quinoa-buddha-bowl",
  "sf-acai-berry-yogurt-bowl",
  "sf-tropical-yogurt-bowl",
  "sf-keto-surf-and-turf-platter",
  "sf-poutine-meat-sauce-fries",
  "sf-salted-egg-yolk-fries",
  "sf-san-francisco-garlic-fries",
  "sf-truffle-fries"
];

const STEPS = {
  "sf-oat-crusted-fish-and-fries": {
    en: [
      "Remove 燕麥炸魚 as needed and 薯條 250 g from the refrigerator; pat dry with paper towels. Pour 炸油 600 ml into the fryer and begin preheating.",
      "Use a kitchen thermometer to confirm oil at 175°C; fry fries in batches 5 minutes until golden and set, then drain.",
      "Keep oil at 175–180°C; fry oat-crusted fish 4–5 minutes until the coating is golden and crisp and the fish is cooked through (internal 63°C or flakes easily with a fork).",
      "Drain fish on a wire rack 1 minute.",
      "(Optional) Raise oil to 185°C and refry fries 1 minute for extra crispness.",
      "Toss hot fries with 海鹽 1/2 tsp.",
      "Arrange oat-crusted fish and fries in separate zones on a sharing platter; serve with 塔塔醬 as needed for dipping while hot."
    ],
    ja: [
      "燕麥炸魚 適量とフライドポテト 250gを冷蔵庫から取り出し、キッチンペーパーで表面の水分を拭き取る。揚げ油 600mlを揚げ鍋に注ぎ予熱を始める。",
      "キッチン温度計で油温 175°Cを確認。ポテトは少量ずつ入れ、5分揚げて黄金色に形が固まったら油を切る。",
      "油温を175～180°Cに保ち、燕麥炸魚を4～5分揚げ、衣が黄金色でサクサク、魚の中心まで火が通るまで（内部63°C、またはフォークでほぐれる）。",
      "揚げた魚を網の上で1分油を切る。",
      "（任意）油温を185°Cに上げ、ポテトを1分再揚げしてよりサクサクに。",
      "熱いポテトに海塩 小さじ1/2を振り混ぜる。",
      "シェア皿に燕麥炸魚とポテトを分けて盛り、塔塔醬 適量を添えて温かいうちに。"
    ],
    ko: [
      "燕麥炸魚 적량과 감자튀김 250g을 냉장고에서 꺼내 키친타월로 표면 수분을 닦습니다. 튀김기름 600ml을 넣고 예열합니다.",
      "키친 온도계로 기름 온도 175°C를 확인합니다. 감자튀김은 소량씩 넣어 5분 튀겨 황금색으로 형이 잡히면 건집니다.",
      "기름 온도를 175~180°C로 유지하고 燕麥炸魚를 4~5분 튀겨 겉은 노릇하고 바삭하며 속까지 익힙니다(내부 63°C 또는 포크로 쉽게 갈라질 때).",
      "튀긴 생선을 철망 위에서 1분 기름을 뺍니다.",
      "(선택) 기름 온도를 185°C로 올려 감자튀김을 1분 더 튀겨 더 바삭하게 합니다.",
      "뜨거운 감자튀김에 바다소금 1/2작은술을 뿌려 버무립니다.",
      "나눠 먹는 접시에 燕麥炸魚와 감자튀김을 구역 나눠 담고 塔塔醬 적량을 곁들여 뜨거울 때 드세요."
    ]
  },
  "sf-classic-caesar-salad": {
    en: [
      "Separate, wash, and spin-dry 綜合生菜 120 g; tear into bite-size pieces and place in a large salad bowl, keeping leaves crisp.",
      "Cut 培根 80 g into pinky-width strips; in a dry skillet over medium heat with no added oil, render 4–5 minutes until fat releases and edges are crisp; drain on paper towels and keep warm.",
      "Toss 麵包丁 40 g with a little rendered bacon fat, spread on a baking sheet, and bake at 180°C 8–10 minutes until golden and crisp; cool for extra crunch.",
      "In a deep bowl, whisk 凱薩醬 2 tbsp, 莎莎醬 2 tbsp, and 海鹽 1/2 tsp into a dressing; taste for salt.",
      "Pour about 2/3 of the dressing into the salad bowl and toss gently so each leaf is lightly coated without crushing out excess moisture.",
      "Transfer dressed greens to a large platter; top with bacon and toasted croutons, then drizzle remaining dressing.",
      "Finish with grated parmesan and cracked black pepper; serve while croutons are still crisp."
    ],
    ja: [
      "綜合生菜 120gを葉に分け冷水で洗い、サラダスピナーでしっかり水気を切る。食べやすい大きさにちぎり大きめのボウルに入れ、葉が立つように。",
      "培根 80gを小指幅の細切りにし、油なしのフライパンを中火で熱し、4～5分炒めて脂が出て端がカリカリになるまで。キッチンペーパーで油を切り温かいうちに。",
      "麵包丁 40gに残ったベーコン油を少し和え、天板に広げ180°Cで8～10分焼き黄金色にサクサクに。冷ますとよりカリッと。",
      "深めのボウルで凱薩醬 大さじ2、莎莎醬 大さじ2、海塩 小さじ1/2を混ぜ、塩味を確認。",
      "ボウルにドレッシングの約2/3を入れ、葉が薄く均一に絡むよう軽く和える。水分を出しすぎない。",
      "和えたレタスを大きめの平皿に盛り、培根と焼いた麵包丁をのせ、残りのドレッシングをかける。",
      "パルメザンチーズと黒胡椒を振り、麵包丁がまだサクサクのうちにシェアして。"
    ],
    ko: [
      "綜合生菜 120g을 잎으로 나눠 찬물에 씻고 샐러드 스피너로 물기를 뺍니다. 한입 크기로 찢어 큰 샐러드 그릇에 담아 잎이 곧게 서게 합니다.",
      "培根 80g을 새끼손가락 너비로 길게 썰고, 기름 없이 팬을 중불로 달군 뒤 4~5분 볶아 기름이 나오고 가장자리가 바삭해질 때까지 합니다. 키친타월로 기름을 빼고 따뜻하게 둡니다.",
      "麵包丁 40g에 남은 베이컨 기름을 조금 버무려 팬에 펴 180°C에서 8~10분 굽습니다. 황금색으로 바삭해지면 식히면 더 바삭합니다.",
      "깊은 그릇에 凱薩醬 2큰술, 莎莎醬 2큰술, 바다소금 1/2작은술을 섞어 드레싱을 만듭니다. 짠맛을 확인합니다.",
      "샐러드 그릇에 드레싱의 약 2/3를 넣고 가볍게 버무려 각 잎에 얇게 묻히되 과하게 눌러 물기가 나오지 않게 합니다.",
      "버무린 채소를 큰 접시에 옮기고 培根과 구운 麵包丁을 올린 뒤 남은 드레싱을 뿌립니다.",
      "파마산 치즈 가루와 후추를 뿌리고 麵包丁이 아직 바삭할 때 나눠 드세요."
    ]
  },
  "sf-smoked-salmon-caesar-salad": {
    en: [
      "Separate, wash, and spin-dry greens from 凱薩沙拉 as needed; tear into bite-size pieces and place in a large salad bowl.",
      "Remove 燻鮭魚 120 g from the refrigerator; slice thinly against the grain about 0.3 cm, lay flat to prevent sticking, and rest 5 minutes to warm slightly.",
      "For 溏心蛋 as needed, simmer in boiling water about 6.5 minutes (adjust to taste), shock in ice water, peel, halve, and keep yolks runny.",
      "Lightly toss greens with 海鹽 1/2 tsp; confirm leaves are dry with no pooled moisture so dressing adheres.",
      "Pour about 2/3 of the Caesar dressing (included with the salad or store-bought) into the bowl and toss gently so each leaf is lightly coated.",
      "Transfer dressed greens to a large platter; arrange smoked salmon and soft eggs around the center in a radiating share-plate style.",
      "Drizzle remaining dressing on top; finish with black pepper and parmesan; serve while salmon is still cool and yolks are runny."
    ],
    ja: [
      "凱薩沙拉 適量のレタスを葉に分け洗い、サラダスピナーでしっかり水気を切り、食べやすい大きさにちぎって大ボウルに。",
      "燻鮭魚 120gを冷蔵庫から取り出し、繊維に逆らって約0.3cmの薄切りにし、重ならないよう広げ、約5分常温で戻す。",
      "溏心蛋 適量を沸騰した湯で約6.5分茹で（好みで調整）、氷水にさらして殻をむき半分に切り、黄身はとろりのまま。",
      "レタスに海塩 小さじ1/2を軽く和え、葉面が乾いて水が溜まっていないことを確認（ドレッシングが絡みやすくなる）。",
      "凱薩サラダ付きのソース（または市販凱薩醬）の約2/3をボウルに入れ、葉が薄く均一に絡むよう軽く和える。",
      "和えたレタスを大皿中央に盛り、周囲に燻鮭魚と溏心蛋を放射状に並べ、店舗のシェア皿風に。",
      "残りのソースをかけ、黒胡椒とパルメザンを振る。燻鮭魚が冷たく、黄身がとろけるうちに。"
    ],
    ko: [
      "凱薩沙拉 적량의 상추를 잎으로 나눠 씻고 샐러드 스피너로 물기를 뺀 뒤 한입 크기로 찢어 큰 그릇에 담습니다.",
      "燻鮭魚 120g을 냉장고에서 꺼내 결 반대로 약 0.3cm 두께로 얇게 썰고 펼쳐 붙지 않게 한 뒤 약 5분 실온에 둡니다.",
      "溏心蛋 적량을 끓는 물에 약 6.5분 삶습니다(취향에 맞게 조절). 찬물에 담갔다가 껍질을 벗겨 반으로 자르고 노른자는 반숙으로 둡니다.",
      "상추에 바다소금 1/2작은술을 가볍게 버무려 잎이 마르고 물기가 고이지 않았는지 확인합니다.",
      "凱薩沙拉에 동봉된 드레싱(또는 시판 凱薩醬)의 약 2/3를 그릇에 넣고 잎마다 얇게 묻도록 가볍게 버무립니다.",
      "버무린 채소를 큰 접시 중앙에 올리고 주변에 燻鮭魚와 溏心蛋을 방사형으로 배치합니다.",
      "남은 드레싱을 뿌리고 후추와 파마산을 올립니다. 燻鮭魚는 차갑고 노른자가 흐를 때 드세요."
    ]
  },
  "sf-sous-vide-chicken-caesar-salad": {
    en: [
      "Wash, spin-dry, and tear greens from 凱薩沙拉 as needed into a large salad bowl; remove 舒肥雞 180 g from the refrigerator and rest 10 minutes.",
      "Heat a skillet over medium with 1 tbsp of the 炸油 600 ml; slice sous-vide chicken and sear one side 1.5 minutes until colored, flip 1 minute to warm through (already cooked—do not overcook or it turns tough).",
      "Rest seared chicken 2 minutes, then slice against the grain into about 1 cm strips to keep juices in.",
      "Lightly toss greens with 海鹽 1/2 tsp; confirm leaves are dry with no pooled moisture.",
      "Pour about 2/3 of the Caesar dressing (included or store-bought) into the bowl and toss gently so each leaf is lightly coated.",
      "Spread dressed greens on a large platter; arrange chicken slices neatly on top, mounding slightly in the center for restaurant-style volume.",
      "Drizzle remaining dressing; finish with parmesan and croutons if using; serve while chicken is warm and greens are crisp."
    ],
    ja: [
      "凱薩沙拉 適量のレタスを洗い脱水してちぎり大ボウルに。舒肥雞 180gを冷蔵庫から取り出し10分常温で戻す。",
      "フライパンを中火に熱し、揚げ油 600mlのうち大さじ1を入れる。舒肥雞をスライスし片面1.5分焼き色がつくまで、裏返して1分温める（すでに火が通っているので加熱しすぎない）。",
      "焼いた舒肥雞を2分休ませ、繊維に逆らって約1cm幅の細切りにし、肉汁を保つ。",
      "レタスに海塩 小さじ1/2を軽く和え、葉面が乾いていることを確認。",
      "凱薩サラダ付きソース（または市販凱薩醬）の約2/3を入れ、葉が薄く均一に絡むよう軽く和える。",
      "和えたレタスを大皿に広げ、舒肥雞を整然と並べ、中央を少し高くして店舗風のボリュームに。",
      "残りソースをかけ、パルメザンと麵包丁（あれば）を振る。舒肥雞が温かくレタスがシャキッとしているうちに。"
    ],
    ko: [
      "凱薩沙拉 적량의 상추를 씻어 탈수하고 찢어 큰 그릇에 담습니다. 舒肥雞 180g을 냉장고에서 꺼내 10분 실온에 둡니다.",
      "팬을 중불로 달군 뒤 튀김기름 600ml 중 1큰술을 넣습니다. 舒肥雞를 슬라이스해 한 면을 1.5분 굽습니다. 뒤집어 1분 더 데웁니다(이미 익었으므로 과열하지 않습니다).",
      "구운 舒肥雞를 2분 쉬인 뒤 결 반대로 약 1cm 너비로 썰어 육즙을 유지합니다.",
      "상추에 바다소금 1/2작은술을 가볍게 버무려 잎이 마른지 확인합니다.",
      "凱薩沙拉에 동봉된 드레싱(또는 시판 凱薩醬)의 약 2/3를 넣고 잎마다 얇게 묻도록 가볍게 버무립니다.",
      "버무린 채소를 큰 접시에 펴고 舒肥雞를 정돈해 올리며 중앙을 살짝 쌓아 식당 분량감을 냅니다.",
      "남은 드레싱을 뿌리고 파마산과 麵包丁(있으면)을 올립니다. 舒肥雞는 따뜻하고 상추는 아삭할 때 드세요."
    ]
  },
  "sf-roasted-sesame-chicken-salad": {
    en: [
      "Separate, wash, and spin-dry 綜合生菜 120 g; halve 小番茄 8 pcs; thinly slice 酸黃瓜 50 g; keep separate to avoid excess moisture.",
      "Cut 炸雞 as needed into bite-size pieces; fry at 170°C about 6–7 minutes until golden and cooked through; drain on a wire rack to stay crisp.",
      "While chicken is still warm, snip into about 3 cm pieces with kitchen shears for easy mixing.",
      "In a deep bowl, whisk 焙煎胡麻醬 2 tbsp with 海鹽 1/2 tsp; taste for salt and aroma.",
      "Add greens to a large salad bowl; pour about 2/3 of the sesame dressing and toss gently to coat each leaf.",
      "Transfer dressed greens to a large platter; mound fried chicken in the center and garnish with tomatoes and pickles for color and acidity.",
      "Drizzle remaining sesame dressing; sprinkle a little white sesame; serve while chicken skin is still crisp."
    ],
    ja: [
      "綜合生菜 120gを葉に分け洗い脱水し、食べやすくちぎる。小番茄 8個を半分に、酸黃瓜 50gを薄切りにし、水分が出ないよう別置き。",
      "炸雞 適量を食べやすい大きさに切り、油温170°Cで6～7分揚げ黄金色に火を通す。網の上で油を切りサクサクを保つ。",
      "温かいうちにキッチンバサミで約3cm角に切り、サラダに混ぜやすくする。",
      "深めのボウルで焙煎胡麻醬 大さじ2と海塩 小さじ1/2を混ぜ、塩味と香りを確認。",
      "大ボウルにレタスを入れ、胡麻ドレッシングの約2/3をかけ、葉が均一に絡むよう軽く和える。",
      "和えたレタスを大皿に盛り、中央に炸雞をのせ、周りに小番茄と酸黃瓜を彩りと酸味で添える。",
      "残りの胡麻醬をかけ、白ごまを少々振る。炸雞の皮がまだサクサクのうちに。"
    ],
    ko: [
      "綜合生菜 120g을 잎으로 나눠 씻고 탈수한 뒤 한입 크기로 찢습니다. 小番茄 8개는 반으로 자르고 酸黃瓜 50g은 얇게 썰어 물기가 나오지 않게 따로 둡니다.",
      "炸雞 적량을 한입 크기로 자르고 기름 온도 170°C에서 6~7분 튀겨 황금색으로 익힙니다. 철망에 걸어 바삭함을 유지합니다.",
      "따뜻할 때 가위로 약 3cm 크기로 잘라 샐러드에 섞기 쉽게 합니다.",
      "깊은 그릇에 焙煎胡麻醬 2큰술과 바다소금 1/2작은술을 섞어 짠맛과 향을 확인합니다.",
      "큰 그릇에 상추를 넣고 참깨 드레싱의 약 2/3를 넣어 잎마다 고루 묻도록 가볍게 버무립니다.",
      "버무린 채소를 큰 접시에 올리고 가운데에 炸雞를 쌓아 주변에 小番茄와 酸黃瓜를 색과 산미로 곁들입니다.",
      "남은 焙煎胡麻醬을 뿌리고 흰참깨를 조금 뿌립니다. 炸雞 껍질이 아직 바삭할 때 드세요."
    ]
  },
  "sf-second-floor-saltwater-chicken-salad": {
    en: [
      "Wash, spin-dry, and tear 綜合生菜 120 g; seed and thinly slice 山苦瓜 120 g, blanch 1 minute, shock in ice water to reduce bitterness, and drain.",
      "Cut 火烤玉米 100 g into short segments; sear in a lightly oiled skillet about 3 minutes until charred spots appear; finish with a pinch of 海鹽.",
      "Remove 鹽水雞 as needed from the refrigerator; shred against the grain into strips, keeping meat moist; warm slightly.",
      "In a small bowl, whisk 鹽水雞油醋 2 tbsp, 辣椒粉 1/2 tsp, and 辣椒碎 1/2 tsp into a tangy spicy vinaigrette.",
      "Add greens to a salad bowl; pour about 2/3 of the vinaigrette and toss gently so each leaf is lightly coated.",
      "Transfer dressed greens to a large platter; mound shredded saltwater chicken in the center with bitter melon and grilled corn in separate zones.",
      "Drizzle remaining vinaigrette; add extra 辣椒碎 to taste; serve while chicken is still warm and corn is fragrant with char."
    ],
    ja: [
      "綜合生菜 120gを洗い脱水してちぎる。山苦瓜 120gを種を取り薄切りにし、沸騰湯で1分湯通り、氷水で苦味を取り水切り。",
      "火烤玉米 100gを短く切り、少し油を熱したフライパンで約3分焼き焦げ目がつくまで。海塩 少々で味を整える。",
      "鹽水雞 適量を冷蔵庫から取り出し、繊維に逆らって手でほぐし、肉汁を保ったまま少し常温で戻す。",
      "小ボウルで鹽水雞油醋 大さじ2、辣椒粉 小さじ1/2、辣椒碎 小さじ1/2を混ぜ、酸味のあるスパイシー油醋に。",
      "ボウルにレタスを入れ、油醋の約2/3をかけ、葉が薄く絡むよう軽く和える。",
      "和えたレタスを大皿に盛り、中央に鹽水雞をのせ、周囲に山苦瓜と火烤玉米を分けて並べる。",
      "残りの油醋をかけ、好みで辣椒碎を追加。鹽水雞が温かく、玉米に焦げ香がのっているうちに。"
    ],
    ko: [
      "綜合生菜 120g을 씻어 탈수하고 찢습니다. 山苦瓜 120g은 씨를 제거해 얇게 썰어 끓는 물에 1분 데친 뒤 찬물에 담가 쓴맛을 빼고 건집니다.",
      "火烤玉米 100g을 짧게 자르고 기름을 조금 넣은 팬에서 약 3분 굽습니다. 겉에 탄 자국이 나면 바다소금 약간으로 간합니다.",
      "鹽水雞 적량을 냉장고에서 꺼내 결 반대로 손으로 찢어 촉촉하게 유지한 뒤 살짝 데웁니다.",
      "작은 그릇에 鹽水雞油醋 2큰술, 辣椒粉 1/2작은술, 辣椒碎 1/2작은술을 섞어 새콤매운 비네그레트를 만듭니다.",
      "샐러드 그릇에 상추를 넣고 비네그레트의 약 2/3를 넣어 잎마다 얇게 묻도록 가볍게 버무립니다.",
      "버무린 채소를 큰 접시에 올리고 가운데에 鹽水雞를 쌓아 주변에 山苦瓜와 火烤玉米를 구역 나눠 배치합니다.",
      "남은 비네그레트를 뿌리고 취향에 따라 辣椒碎를 더 뿌립니다. 鹽水雞는 따뜻하고 火烤玉米에 그을린 향이 날 때 드세요."
    ]
  },
  "sf-green-superhero-quinoa-buddha-bowl": {
    en: [
      "Rinse 藜麥 80 g; simmer with a 1:2 water ratio, cover on low 15 minutes until absorbed, rest off heat 5 minutes, then fluff with a fork and cool.",
      "Cut 花椰菜 120 g into small florets; blanch in salted boiling water 3 minutes until tender-crisp and drain; cut 蘆筍 as needed on the bias, blanch 2 minutes, then shock in ice water to stay bright green.",
      "Bring a pot of water to a boil with 1 tsp vinegar; reduce to low, stir a gentle whirlpool, add 雞蛋 2 pcs for poached eggs, cook about 3 minutes until whites set and yolks runny, then drain.",
      "Heat a skillet over medium with half of 橄欖油 1.5 tbsp; quickly sauté blanched cauliflower and asparagus 1 minute; season with 海鹽 1/3 tsp and set aside.",
      "In a deep bowl or shallow plate, spread a layer of quinoa as the grain base, leaving edges for garnish.",
      "Top quinoa with sautéed cauliflower and asparagus, 莎莎 as needed, and 2 poached eggs in the center.",
      "Drizzle remaining olive oil, sprinkle chopped nuts, break poached eggs so yolk flows into the bowl, and serve."
    ],
    ja: [
      "藜麥 80gを洗い、水1:2で沸騰後弱火で蓋をして15分煮込み、火を止めて5分蒸らし、フォークでほぐして冷ます。",
      "花椰菜 120gを小房に切り、塩を加えた湯で3分湯通りシャキッとしたら水切り。蘆筍 適量を斜め切りにし、同じ鍋で2分湯通り、氷水で色を止める。",
      "湯鍋に酢 小さじ1を加え沸騰させ、弱火にしスプーンで渦を作り、雞蛋 2個を水波蛋に約3分、白身が固まり黄身がとろりになるまで茹で、水切り。",
      "フライパンを中火に熱し、橄欖油 大さじ1.5の半分で湯通しした花椰菜と蘆筍を1分さっと炒め、海塩 小さじ1/3で味付け。",
      "深めのボウルまたは平皿に藜麥を穀物ベースとして敷き、縁に飾り用のスペースを残す。",
      "藜麥の上に炒めた花椰菜と蘆筍、莎莎 適量を分けて盛り、中央に水波蛋 2個。",
      "残りの橄欖油をかけ、ナッツを振り、水波蛋を割って黄身を流し込んで完成。"
    ],
    ko: [
      "藜麥 80g을 씻어 물 1:2 비율로 끓인 뒤 약불에 뚜껑을 덮고 15분 끓여 흡수되면 불을 끄고 5분 더 둔 다음 포크로 풀어 식힙니다.",
      "花椰菜 120g을 작은 송이로 자르고 소금물에 3분 데쳐 아삭하게 익힌 뒤 건집니다. 蘆筍 적량은 사선으로 썰어 같은 물에 2분 데친 뒤 찬물에 담가 녹색을 유지합니다.",
      "냄비에 식초 1작은술을 넣고 끓인 뒤 약불로 줄이고 숟가락으로 완만한 소용돌이를 만든 다음 雞蛋 2개를 수란으로 약 3분 삶아 흰자가 굳고 노른자가 반숙일 때 건집니다.",
      "팬을 중불로 달군 뒤 橄欖油 1.5큰술의 절반을 넣고 데친 花椰菜와 蘆筍를 1분 빠르게 볶아 바다소금 1/3작은술로 간합니다.",
      "깊은 그릇이나 넓은 접시 바닥에 藜麥를 곡물 베이스로 깔고 가장자리는 장식 공간으로 둡니다.",
      "藜麥 위에 볶은 花椰菜와 蘆筍, 莎莎 적량을 구역 나눠 올리고 가운데에 수란 2개를 둡니다.",
      "남은 橄欖油를 뿌리고 견과를 뿌린 뒤 수란을 터뜨려 노른자가 그릇 안으로 흐르게 합니다."
    ]
  },
  "sf-acai-berry-yogurt-bowl": {
    en: [
      "Rinse and drain 巴西莓 150 g and 綜合莓果 150 g; peel 香蕉 150 g and slice on the bias—half as rounds, half diced, kept separate.",
      "Spread 穀物 80 g on a baking sheet; bake at 160°C 8 minutes until golden and crisp; cool. Chop 堅果 30 g finely.",
      "Blend 巴西莓 with banana dice and one-third of the mixed berries until thick and stackable (add 1–2 tbsp cold water if too thick).",
      "Pour açaí puree into a deep glass bowl and smooth the base to about 2 cm thick.",
      "Top with remaining berries and banana rounds, arranging from the rim toward the center for visual layers.",
      "Scatter toasted grains and nuts in separate zones beside the fruit; add grains at the last moment to stay crisp.",
      "Drizzle 橄欖油 1.5 tbsp lightly and sprinkle 海鹽 1/3 tsp; serve while grains are still crunchy."
    ],
    ja: [
      "巴西莓 150gと綜合莓果 150gを洗い水切り。香蕉 150gを皮をむき斜め切りにし、半分は輪切り、半分は角切りに分ける。",
      "穀物 80gを天板に広げ160°Cで8分焼き黄金色にサクサクに。冷ます。堅果 30gを細かく切る。",
      "巴西莓、香蕉の角切り、綜合莓果の1/3をミキサーで重ねて盛れる濃さの泥状に（硬ければ冷水大さじ1～2を加える）。",
      "深いガラスボウルにアサイー泥を流し込み、底を約2cmの厚さに均す。",
      "残りの綜合莓果と香蕉の輪切りを縁から中心へ放射状に並べ、層を見せる。",
      "フルーツの横に分けて焼いた穀物と堅果をのせ、穀物は最後に加えてサクサクを保つ。",
      "橄欖油 大さじ1.5を軽くかけ、海塩 小さじ1/3を振る。穀物がまだカリッとしているうちに。"
    ],
    ko: [
      "巴西莓 150g과 綜合莓果 150g을 씻어 물기를 뺍니다. 香蕉 150g은 껍질을 벗겨 사선으로 썰어 절반은 둥글게, 절반은 깍둑썰기해 따로 둡니다.",
      "穀物 80g을 팬에 펴 160°C에서 8분 굽습니다. 황금색으로 바삭해지면 식힙니다. 堅果 30g을 잘게 썹니다.",
      "巴西莓, 바나나 깍둑, 綜合莓果의 1/3를 믹서에 갈아 쌓을 수 있을 만큼 걸쭉하게 만듭니다(너무 걸쭉하면 찬물 1~2큰술을 넣습니다).",
      "깊은 유리 그릇에 아사이 퓨레를 붓고 바닥을 약 2cm 두께로 고릅니다.",
      "남은 綜合莓果와 바나나 둥근 조각을 가장자리에서 중심으로 방사형으로 올려 층을 살립니다.",
      "과일 옆 구역에 구운 穀物과 堅果를 나눠 뿌리고 穀物은 마지막에 올려 바삭함을 유지합니다.",
      "橄欖油 1.5큰술을 가볍게 뿌리고 바다소금 1/3작은술을 뿌립니다. 穀物이 아직 바삭할 때 드세요."
    ]
  },
  "sf-tropical-yogurt-bowl": {
    en: [
      "Peel 香蕉 150 g and slice into rounds; cut 芒果 150 g into chunks; wash and cut 季節水果 150 g into bite-size pieces; keep separate.",
      "Spread 穀物 80 g on a baking sheet; bake at 160°C 8 minutes until golden and crisp; cool. Chop 堅果 30 g.",
      "In a deep glass bowl, lay a base layer of banana rounds, curling slightly up at the edges for stacking.",
      "Top bananas with 芒果 chunks and seasonal fruit, arranged in zones from the outside in for tropical color layers.",
      "Scatter toasted 穀物 80 g in zones over the fruit, then add 堅果 30 g beside it; add grains last to stay crisp.",
      "Drizzle 橄欖油 1.5 tbsp and use the back of a spoon to spread lightly over the fruit.",
      "Finish with 海鹽 1/3 tsp to lift sweetness; serve immediately while grains are crisp and fruit is fresh."
    ],
    ja: [
      "香蕉 150gを皮をむき輪切りに、芒果 150gを塊切り、季節水果 150gを洗って食べやすい大きさに切り、分けておく。",
      "穀物 80gを天板に広げ160°Cで8分焼き黄金色にサクサクに。冷ます。堅果 30gを刻む。",
      "深いガラスボウルに香蕉の輪切りを底に敷き、縁を少し立ち上げて積みやすくする。",
      "香蕉の上に芒果と季節水果を外から内へ分けて並べ、トロピカルな色の層に。",
      "フルーツ上に焼いた穀物 80gを分けて振り、横に堅果 30gをのせ、穀物は最後に加える。",
      "橄欖油 大さじ1.5を軽くかけ、スプーンの裏でフルーツ表面に均す。",
      "海塩 小さじ1/3で甘みを引き立て、穀物がサクサク、フルーツが新鮮なうちに。"
    ],
    ko: [
      "香蕉 150g은 껍질을 벗겨 둥글게 썰고, 芒果 150g은 덩어리로, 季節水果 150g은 씻어 한입 크기로 자릅니다. 따로 둡니다.",
      "穀物 80g을 팬에 펴 160°C에서 8분 굽습니다. 황금색으로 바삭해지면 식힙니다. 堅果 30g을 다집니다.",
      "깊은 유리 그릇 바닥에 香蕉 둥근 조각을 깔고 가장자리를 살짝 올려 쌓기 쉽게 합니다.",
      "바나나 위에 芒果와 季節水果를 바깥에서 안쪽으로 구역 나눠 올려 열대 과일 색 층을 만듭니다.",
      "과일 위에 구운 穀物 80g을 구역별로 뿌리고 옆에 堅果 30g을 올립니다. 穀物은 마지막에 넣어 바삭함을 유지합니다.",
      "橄欖油 1.5큰술을 가볍게 뿌리고 숟가락 뒤로 과일 표면에 고르게 펴줍니다.",
      "바다소금 1/3작은술로 단맛을 살리고 穀物이 바삭하고 과일이 신선할 때 바로 드세요."
    ]
  },
  "sf-keto-surf-and-turf-platter": {
    en: [
      "Rest 舒肥牛 as needed 10 minutes; slice thinly against the grain about 0.5 cm. Cut 巴沙魚 180 g into chunks, pat dry, and season with 海鹽 1/3 tsp and a little black pepper.",
      "Slice 炒菇 120 g; in a skillet over medium with half of 橄欖油 1.5 tbsp, sauté until golden and moisture evaporates, about 4 minutes; set aside.",
      "Add a little more oil to the same pan; over high heat sear basa one side 2 minutes until golden, flip 1.5 minutes until cooked through; keep warm.",
      "Wipe the pan clean, heat over high, lay sous-vide beef in a single layer, rest 30 seconds, then toss quickly 1 minute until warmed and lightly colored (do not overcook).",
      "Shred or slice 起司 40 g; while mushrooms are hot, top with cheese, cover 30 seconds until slightly melted.",
      "Wash and spin-dry 綜合生菜 120 g; spread on a large platter as the base.",
      "Arrange warmed beef, seared basa, and cheesy mushrooms in separate zones over the greens in a radiating surf-and-turf style; serve warm."
    ],
    ja: [
      "舒肥牛 適量を10分常温で戻し、繊維に逆らって約0.5cmの薄切りに。巴沙魚 180gを塊切りにし、キッチンペーパーで水気を切り、海塩 小さじ1/3と黒胡椒少々を振る。",
      "炒菇 120gをスライスし、フライパンを中火に熱して橄欖油 大さじ1.5の半分で約4分炒め、黄金色に水分が飛ぶまで。",
      "同じ鍋に油を少し足し、強火で巴沙魚を片面2分こんがり、裏返して1.5分火を通す。保温。",
      "鍋を拭き強火にし、舒肥牛を一枚重ねに並べ30秒静置後、1分さっと炒め温め軽く色づくまで（加熱しすぎない）。",
      "起司 40gを削るか薄切りにし、熱い炒菇の上にのせ、蓋をして30秒ほど溶かす。",
      "綜合生菜 120gを洗い脱水し、大皿の底に敷く。",
      "レタスの上に舒肥牛、煎めた巴沙魚、起司炒菇を分けて放射状に並べ、温かいうちに海陸プレートとして。"
    ],
    ko: [
      "舒肥牛 적량을 10분 실온에 둔 뒤 결 반대로 약 0.5cm 두께로 얇게 썹니다. 巴沙魚 180g은 덩어리로 자르고 키친타월로 말린 뒤 바다소금 1/3작은술과 후추 약간을 뿌립니다.",
      "炒菇 120g을 슬라이스하고 팬을 중불로 달군 뒤 橄欖油 1.5큰술의 절반으로 약 4분 볶아 황금색이 되고 물기가 날 때까지 합니다.",
      "같은 팬에 기름을 조금 더 넣고 강불로 巴沙魚 한 면을 2분 굽습니다. 뒤집어 1.5분 더 익혀 보온합니다.",
      "팬을 닦고 강불로 달군 뒤 舒肥牛를 한 겹으로 펼쳐 30초 두었다가 1분 빠르게 볶아 데우고 살짝 색을 냅니다(과열하지 않습니다).",
      "起司 40g을 갈다거나 얇게 썰어 뜨거운 炒菇 위에 올리고 뚜껑을 덮어 30초 살짝 녹입니다.",
      "綜合生菜 120g을 씻어 탈수한 뒤 큰 접시 바닥에 깝니다.",
      "상추 위에 舒肥牛, 구운 巴沙魚, 치즈 炒菇를 구역 나눠 방사형으로 올려 따뜻할 때 바다·육 해산물 플래터로 드세요."
    ]
  },
  "sf-poutine-meat-sauce-fries": {
    en: [
      "Pat 薯條 250 g thoroughly dry with paper towels; portion 肉醬 as needed and 起司醬 2 tbsp separately; microwave meat sauce 30 seconds until slightly warm if needed.",
      "Pour 炸油 600 ml into the fryer; heat to 160°C, fry fries in batches 3 minutes until set but not colored; drain.",
      "Raise oil to 175°C; refry the same batch 3–4 minutes until golden and crisp; drain on a wire rack 2 minutes.",
      "While fries are still hot, toss in a large bowl with 海鹽 1/2 tsp.",
      "Drizzle 起司醬 2 tbsp and toss quickly so fries are lightly coated.",
      "Pour warm 肉醬 as needed in stages, tossing lightly to mimic poutine’s half-melted sauce on crisp fries.",
      "Mound high in a parchment-lined basket; serve remaining meat sauce and cheese sauce on the side while sauce is warm and fries are crisp."
    ],
    ja: [
      "薯條 250gをキッチンペーパーで徹底的に水気を切る。肉醬 適量と起司醬 大さじ2を分けておき、肉醬は必要なら電子レンジ30秒ほど温める。",
      "揚げ油 600mlを注ぎ、温度計で160°Cを確認。ポテトを少量ずつ3分揚げ形だけ固め、まだ色づかないうちに油を切る。",
      "油温を175°Cに上げ、同じポテトを3～4分再揚げして黄金色にサクサクに。網の上で2分油を切る。",
      "熱いうち大ボウルに入れ、海塩 小さじ1/2を振り混ぜる。",
      "起司醬 大さじ2をかけ、素早く和えてポテトに薄く絡める。",
      "温かい肉醬 適量を数回に分けてかけ、軽く和え、プーティン風に「熱いソースが冷たいポテトで半溶け」する食感に。",
      "耐油紙を敷いたバスケットに高く盛り、残りの肉醬と起司醬を添え、ソースが温かくポテトがサクサクのうちに。"
    ],
    ko: [
      "薯條 250g을 키친타월로 표면 수분을 충분히 닦습니다. 肉醬 적량과 起司醬 2큰술을 나눠 두고 肉醬은 필요하면 전자레인지 30초 데웁니다.",
      "튀김기름 600ml을 넣고 온도계로 160°C를 확인합니다. 감자튀김을 소량씩 3분 튀겨 형만 잡고 색이 나기 전에 건집니다.",
      "기름 온도를 175°C로 올려 같은 감자튀김을 3~4분 더 튀겨 황금색으로 바삭하게 합니다. 철망에서 2분 기름을 뺍니다.",
      "뜨거울 때 큰 그릇에 넣고 바다소금 1/2작은술을 뿌려 버무립니다.",
      "起司醬 2큰술을 뿌리고 빠르게 버무려 감자튀김에 얇게 묻힙니다.",
      "따뜻한 肉醬 적량을 나눠 부으며 가볍게 버무려 푸틴처럼 뜨거운 소스가 차가운 감자튀김에서 반쯤 녹는 식감을 냅니다.",
      "기름종이 깐 바구니에 높게 쌓고 남은 肉醬와 起司醬를 곁들입니다. 소스는 따뜻하고 감자튀김은 바삭할 때 드세요."
    ]
  },
  "sf-salted-egg-yolk-fries": {
    en: [
      "Pat 薯條 250 g thoroughly dry; finely chop 九層塔 10 g; have 金沙醬 as needed, 鹹蛋黃醬 2 tbsp, and 辣椒碎 1/2 tsp ready.",
      "Heat 炸油 600 ml to 160°C; blanch-fry fries in batches 3 minutes; drain and rest.",
      "Raise oil to 175°C; refry 3–4 minutes until golden and crisp; drain on a wire rack.",
      "While fries are hot, toss in a large bowl with 海鹽 1/2 tsp.",
      "In a small pan over very low heat, stir 鹹蛋黃醬 2 tbsp with 金沙醬 as needed until flowing (add 1 tsp warm water if too thick).",
      "Pour golden sauce over fries and toss quickly to coat evenly; mix in 辣椒碎 1/2 tsp and chopped basil.",
      "Mound high in a basket; sprinkle a little more basil on top; serve while sauce is still flowing and fries are crisp."
    ],
    ja: [
      "薯條 250gを徹底的に水気を切る。九層塔 10gを細かく刻み、金沙醬 適量、鹹蛋黃醬 大さじ2、辣椒碎 小さじ1/2を用意。",
      "揚げ油 600mlを160°Cに熱し、ポテトを少量ずつ3分初揚げ、油を切って休ませる。",
      "油温を175°Cに上げ、3～4分再揚げして黄金色にサクサクに。網で油を切る。",
      "熱いうち大ボウルに入れ、海塩 小さじ1/2を軽く和える。",
      "小鍋を弱火にし、鹹蛋黃醬 大さじ2と金沙醬 適量を混ぜ流れるような状態に（濃ければぬるま湯小さじ1を加える）。",
      "金沙ソースをポテトにかけ素早く和え、辣椒碎 小さじ1/2と九層塔を混ぜる。",
      "バスケットに高く盛り、表面に九層塔を少々振る。ソースが流れるうち、ポテトがサクサクのときに。"
    ],
    ko: [
      "薯條 250g을 충분히 말립니다. 九層塔 10g을 잘게 썰고 金沙醬 적량, 鹹蛋黃醬 2큰술, 辣椒碎 1/2작은술을 준비합니다.",
      "튀김기름 600ml을 160°C로 달군 뒤 감자튀김을 소량씩 3분 1차 튀기고 기름을 빼 쉽니다.",
      "기름 온도를 175°C로 올려 3~4분 더 튀겨 황금색으로 바삭하게 합니다. 철망에 걸어 기름을 뺍니다.",
      "뜨거울 때 큰 그릇에 넣고 바다소금 1/2작은술을 가볍게 버무립니다.",
      "작은 냄비를 아주 약불로 달군 뒤 鹹蛋黃醬 2큰술과 金沙醬 적량을 섞어 흐르게 만듭니다(너무 걸쭉하면 미지근한 물 1작은술을 넣습니다).",
      "황금 소스를 감자튀김에 뿌려 빠르게 버무려 고루 묻히고 辣椒碎 1/2작은술과 九層塔를 섞습니다.",
      "바구니에 높게 쌓고 위에 九層塔를 조금 더 뿌립니다. 소스가 흐르고 감자튀김이 바삭할 때 드세요."
    ]
  },
  "sf-san-francisco-garlic-fries": {
    en: [
      "Pat 薯條 250 g thoroughly dry with paper towels; bring 蒜味奶油醬 3 tbsp to room temperature.",
      "Heat 炸油 600 ml to 160°C; blanch-fry fries in batches 3 minutes until set; drain.",
      "Raise oil to 175°C; refry 3–4 minutes until golden and crisp; drain on a wire rack 2 minutes.",
      "While fries are hot, toss in a large bowl with 海鹽 1/2 tsp.",
      "Drizzle 蒜味奶油醬 3 tbsp in two stages; toss after the first pour so fries are lightly coated.",
      "For extra garlic richness, add the second drizzle and toss gently so each fry picks up sauce (work off heat to keep butter in the sauce from over-melting).",
      "Mound in a parchment-lined basket; serve remaining garlic butter sauce on the side while warm."
    ],
    ja: [
      "薯條 250gをキッチンペーパーで徹底的に水気を切る。蒜味奶油醬 大さじ3を常温に戻す。",
      "揚げ油 600mlを160°Cに熱し、ポテトを少量ずつ3分初揚げして形を固め、油を切る。",
      "油温を175°Cに上げ、3～4分再揚げして黄金色にサクサクに。網の上で2分油を切る。",
      "熱いうち大ボウルに入れ、海塩 小さじ1/2を均一に振る。",
      "蒜味奶油醬 大さじ3を2回に分けてかけ、1回目の後に和えてポテトに薄く絡める。",
      "濃いニンニク風味が好きなら2回目をかけて軽く和える（火を止めた状態で、ソースのバターが溶けすぎないように）。",
      "耐油紙のバスケットに盛り、残りの蒜味奶油醬を添えて温かいうちに。"
    ],
    ko: [
      "薯條 250g을 키친타월로 표면 수분을 충분히 닦습니다. 蒜味奶油醬 3큰술을 실온에 둡니다.",
      "튀김기름 600ml을 160°C로 달군 뒤 감자튀김을 소량씩 3분 1차 튀겨 형을 잡고 건집니다.",
      "기름 온도를 175°C로 올려 3~4분 더 튀겨 황금색으로 바삭하게 합니다. 철망에서 2분 기름을 뺍니다.",
      "뜨거울 때 큰 그릇에 넣고 바다소금 1/2작은술을 고루 뿌립니다.",
      "蒜味奶油醬 3큰술을 두 번에 나눠 뿌리고 첫 번째 후 버무려 감자튀김에 얇게 묻힙니다.",
      "진한 마늘 향을 원하면 두 번째로 한 번 더 뿌리고 가볍게 버무립니다(불을 끈 상태에서 소스의 버터가 과하게 녹지 않게 합니다).",
      "기름종이 깐 바구니에 담고 남은 蒜味奶油醬를 곁들여 따뜻할 때 드세요."
    ]
  },
  "sf-truffle-fries": {
    en: [
      "Pat 薯條 250 g thoroughly dry with paper towels; portion 松露醬 3 tbsp and 起司粉 40 g separately.",
      "Heat 炸油 600 ml to 160°C; blanch-fry fries in batches 3 minutes; drain.",
      "Raise oil to 175°C; refry 3–4 minutes until crisp outside and tender inside; drain on a wire rack 2 minutes.",
      "While fries are hot, toss in a large bowl with 海鹽 1/2 tsp.",
      "Add half of 起司粉 40 g and toss quickly so heat slightly melts the cheese.",
      "Drizzle 松露醬 3 tbsp and toss gently; sprinkle remaining cheese on top.",
      "Mound high in a basket; serve while truffle aroma is strong and fries are still crisp."
    ],
    ja: [
      "薯條 250gをキッチンペーパーで徹底的に水気を切る。松露醬 大さじ3と起司粉 40gを分けておく。",
      "揚げ油 600mlを160°Cに熱し、ポテトを少量ずつ3分初揚げ、油を切る。",
      "油温を175°Cに上げ、3～4分再揚げして外はサクッと中はほくほくに。網の上で2分油を切る。",
      "熱いうち大ボウルに入れ、海塩 小さじ1/2で味付け。",
      "起司粉 40gの半分を振り、熱でチーズが少しとろけるよう素早く和える。",
      "松露醬 大さじ3をかけ軽く和え、残りの起司粉を表面に振る。",
      "バスケットに高く盛り、トリュフの香りが濃いうち、ポテトがサクサクのときに。"
    ],
    ko: [
      "薯條 250g을 키친타월로 표면 수분을 충분히 닦습니다. 松露醬 3큰술과 起司粉 40g을 나눠 둡니다.",
      "튀김기름 600ml을 160°C로 달군 뒤 감자튀김을 소량씩 3분 1차 튀기고 건집니다.",
      "기름 온도를 175°C로 올려 3~4분 더 튀겨 겉은 바삭하고 속은 부드럽게 합니다. 철망에서 2분 기름을 뺍니다.",
      "뜨거울 때 큰 그릇에 넣고 바다소금 1/2작은술로 간합니다.",
      "起司粉 40g의 절반을 뿌리고 빠르게 버무려 열로 치즈가 살짝 녹게 합니다.",
      "松露醬 3큰술을 뿌려 가볍게 버무리고 남은 起司粉를 위에 뿌립니다.",
      "바구니에 높게 쌓아 트러플 향이 진하고 감자튀김이 아직 바삭할 때 드세요."
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
