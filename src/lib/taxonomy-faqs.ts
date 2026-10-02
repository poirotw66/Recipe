import type { Locale } from "./i18n";
import { defaultLocale } from "./i18n";
import type { IngredientItem, ScenarioItem } from "./taxonomy";
import {
  getIngredientCategoryLabel,
  getIngredientLabel,
  getIngredientStorage,
  getScenarioLabel
} from "./taxonomy";

export interface TaxonomyFaq {
  question: string;
  answer: string;
}

const SCENARIO_FAQS: Record<string, Record<Locale, TaxonomyFaq[]>> = {
  "one-person-meal": {
    "zh-TW": [
      {
        question: "一人料理如何抓食材份量才不會煮太多吃不完？",
        answer: "一人份料理建議以「1 份主蛋白質（約 100～150 克）+ 1 碗主食 + 1 份蔬菜」為黃金比例。善用平底鍋或單手湯鍋，現煮現吃，既不會產生隔夜剩菜負擔，備料與收拾也最輕鬆。"
      },
      {
        question: "租屋小廚房只有一口爐具，如何高效率完成一人晚餐？",
        answer: "建議採取「一鍋到底」或「主食與配料同烹」的做法，例如炒飯、蓋飯、湯麵或炊飯。先處理肉類或配料，最後下主食與醬汁快速拌勻，省時又少洗鍋。"
      }
    ],
    en: [
      {
        question: "How do I portion a meal for one without creating too many leftovers?",
        answer: "A reliable single-serving baseline is one portion of protein (around 100-150g), one bowl of grain or noodles, and one handful of vegetables cooked in a single skillet or saucepan."
      },
      {
        question: "What is the fastest way to cook for one on a single burner?",
        answer: "Focus on one-pan dishes like fried rice, noodle soups, rice bowls, and skillet stir-fries where proteins and carbs share the pan to save both time and cleanup."
      }
    ],
    ja: [
      {
        question: "一人分の料理で作りすぎない分量の目安は？",
        answer: "主菜のタンパク質100〜150g、主食1人分、野菜ひとつかみを基準にすると、食べきりやすく無駄が出ません。"
      },
      {
        question: "コンロが一口しかない小さなキッチンでの効率的な作り方は？",
        answer: "丼もの、炒飯、具だくさんスープ、パスタなど、フライパン一つや小鍋一つで完結するワンパン料理が最適です。"
      }
    ],
    ko: [
      {
        question: "1인분 요리 시 남지 않게 양을 조절하는 팁은?",
        answer: "단백질 100~150g, 밥이나 면 1공기, 채소 한 줌을 기본 단위로 잡으면 혼자 먹기 알맞은 한 끼가 완성됩니다."
      },
      {
        question: "1구 인덕션이나 작은 주방에서 효율적으로 요리하려면?",
        answer: "볶음밥, 덮밥, 국수처럼 팬 하나로 주식과 반찬을 함께 조리하는 원팬 요리를 추천합니다."
      }
    ]
  },
  "ten-minute-meals": {
    "zh-TW": [
      {
        question: "如何在 10 分鐘內快速完成一道營養均衡的家常菜？",
        answer: "選擇快熟食材是關鍵，如雞蛋、嫩豆腐、薄肉片、蝦仁與快熟青菜。利用大火快炒、微波或清燙，搭配預調好的基本醬汁（如醬油、蒜末、香油），10 分鐘即可熱騰騰開動。"
      },
      {
        question: "想要 10 分鐘開飯，冰箱平時該常備哪些快手食材？",
        answer: "建議常備雞蛋、冷藏熟烏龍麵、常備肉片、水煮罐頭與蔥花。這些食材無需繁複解凍與刀工，隨取隨煮，是忙碌工作日最可靠的後盾。"
      }
    ],
    en: [
      {
        question: "How can I cook a balanced dinner in just 10 minutes?",
        answer: "Choose fast-cooking ingredients like eggs, tofu, thin-sliced meat, and leafy greens. Pair them with simple pantry sauces for a quick, wholesome meal."
      },
      {
        question: "What pantry staples are best for fast 10-minute cooking?",
        answer: "Keep eggs, pre-cooked noodles, canned tuna, and chopped scallions on hand. They require zero thawing and minimal prep."
      }
    ],
    ja: [
      {
        question: "10分で手早くバランスのよい食事を作るコツは？",
        answer: "卵、豆腐、薄切り肉など火の通りが早い食材を選び、タレを事前に合わせて短時間で仕上げるのがポイントです。"
      },
      {
        question: "10分料理のために常備しておくと便利な食材は？",
        answer: "卵、冷凍うどん、ツナ缶、冷凍刻みネギを常備しておくと、下処理なしですぐに調理できます。"
      }
    ],
    ko: [
      {
        question: "10분 안에 영양가 있는 한 끼를 빠르게 완성하려면?",
        answer: "달걀, 두부, 얇은 고기 등 익는 속도가 빠른 재료를 선택하고 간단한 기본 양념으로 센 불에 빠르게 조리하세요."
      },
      {
        question: "10분 요리에 가장 유용한 상비 재료는?",
        answer: "달걀, 우동 사리, 참치캔, 다진 파 등을 상비하면 해동이나 손질 시간 없이 바로 요리할 수 있습니다."
      }
    ]
  },
  "electric-pot-meals": {
    "zh-TW": [
      {
        question: "電鍋料理蒸煮時，外鍋水量與時間該如何拿捏？",
        answer: "一般一人份蒸肉片、豆腐或蛋料理，外鍋加 0.5～0.8 杯水（約 10～15 分鐘）；若是生米煮飯或燉湯，外鍋加 1～1.5 杯水（約 20～30 分鐘）。跳起後燜 3～5 分鐘再開蓋，口感更均勻。"
      },
      {
        question: "如何用電鍋一次搞定主食與配菜（一鍋兩菜）？",
        answer: "下層內鍋煮米飯或煲湯，上層架上耐熱蒸架與淺盤蒸雞胸或時蔬。利用電鍋上升蒸氣同步加熱，免看火、無油煙，非常適合租屋備餐。"
      }
    ],
    en: [
      {
        question: "How much water should go in the outer pot for electric pot cooking?",
        answer: "Use 0.5 to 0.8 cups of water for quick steaming like eggs, tofu, and sliced meat (10-15 minutes), and 1 to 1.5 cups for rice bowls and soups (20-30 minutes)."
      },
      {
        question: "Can I cook grains and proteins together in an electric pot?",
        answer: "Yes, place rice or soup in the main inner pot and stack a shallow steaming plate with vegetables and marinated meat on top for a hands-free complete meal."
      }
    ],
    ja: [
      {
        question: "電気鍋や炊飯器で蒸し料理をするときの水加減の目安は？",
        answer: "卵や豆腐、薄切り肉の蒸し料理なら外釜に水0.5〜0.8合分（約10〜15分）、スープや炊き込みご飯なら1〜1.5合分が適量です。"
      },
      {
        question: "主食とおかずを電気鍋で同時に作る方法は？",
        answer: "内鍋でご飯を炊きながら、上段の蒸し皿に下味をつけた肉や野菜をのせれば、一度の加熱で一汁一菜が完成します。"
      }
    ],
    ko: [
      {
        question: "전기냄비나 밥솥으로 찜 요리 시 물의 양은?",
        answer: "달걀, 두부, 얇은 고기 찜은 물 반 컵(약 10~15분), 밥이나 국물 요리는 1컵 이상(20~30분)을 넣고 조리 후 뜸을 들이면 좋습니다."
      },
      {
        question: "전기밥솥으로 밥과 반찬을 동시에 만드는 방법은?",
        answer: "내솥에 밥을 안치고 그 위에 찜기를 얹어 양념한 닭가슴살이나 채소를 올리면 한 번에 든든한 한 끼를 완성할 수 있습니다."
      }
    ]
  },
  "leftover-rice-meals": {
    "zh-TW": [
      {
        question: "冷藏剩飯如何炒出粒粒分明、不濕黏的炒飯？",
        answer: "冷藏米飯下鍋前先在碗中戴手套撥散，或拌入少許蛋液裹勻（黃金炒飯法）。鍋熱油熱後先大火快炒米飯蒸發多餘水氣，再加入配料，即可粒粒分明香氣四溢。"
      },
      {
        question: "剩飯保存與食品安全有何重要注意事項？",
        answer: "煮熟米飯請於室溫 1 小時內放涼並密封冷藏，並於 24 小時內食用完畢；再次加熱時務必徹底熱透至中心冒煙（74°C 以上），且剩飯只建議復熱一次。"
      }
    ],
    en: [
      {
        question: "How do I make fried rice fluffy and not mushy with chilled rice?",
        answer: "Gently break up cold rice grains with your hands before hitting the pan. Stir-fry over high heat to drive off surface moisture before seasoning."
      },
      {
        question: "What are the essential food safety tips for leftover rice?",
        answer: "Cool and refrigerate cooked rice within 1 hour. Consume within 24 hours and ensure it is reheated thoroughly until piping hot."
      }
    ],
    ja: [
      {
        question: "冷やご飯でパラパラの炒飯を作るコツは？",
        answer: "炒める前に手でご飯を軽くほぐし、必要なら少量の溶き卵をあらかじめ絡めてから、強火のフライパンで手早く炒めましょう。"
      },
      {
        question: "残りご飯の安全な保存と再加熱の注意点は？",
        answer: "炊き上がったご飯は粗熱が取れたらすぐに冷蔵し、24時間以内に中心までしっかり再加熱して食べきりましょう。"
      }
    ],
    ko: [
      {
        question: "찬밥으로 고슬고슬한 볶음밥을 만드는 비결은?",
        answer: "팬에 넣기 전 손으로 밥알을 가볍게 풀어주고, 달군 팬에 센 불로 볶아 수분을 날려주면 고슬고슬해집니다."
      },
      {
        question: "남은 밥의 안전한 보관 및 섭취 요령은?",
        answer: "남은 밥은 조리 후 한 시간 이내에 밀폐 냉장 보관하고, 24시간 이내에 속까지 김이 나도록 충분히 데워 드세요."
      }
    ]
  },
  "fridge-cleanout-meals": {
    "zh-TW": [
      {
        question: "清冰箱料理如何搭配多種剩餘食材才不會味道混亂？",
        answer: "掌握「1 款鹹香底醬（醬油、沙茶、咖哩或番茄酸甜）+ 耐炒蔬菜（高麗菜、洋蔥）+ 易熟蛋白質（蛋、豆腐、肉片）」原則，不同食材切成相近大小同炒即可和諧美味。"
      },
      {
        question: "零碎少量的蔬菜與肉片，最推薦做成什麼料理？",
        answer: "什錦炒飯、什錦炒麵、鹹粥或綜合蔬菜烘蛋是消耗零碎食材的最佳容器，不管食材種類多少都能完美包容。"
      }
    ],
    en: [
      {
        question: "How do I combine random leftover ingredients without clashing flavors?",
        answer: "Pick a unifying seasoning like soy sauce, garlic, or curry, cut ingredients into uniform bite-sized pieces, and anchor the dish with eggs or rice."
      },
      {
        question: "What are the best dishes for clearing out odds and ends from the fridge?",
        answer: "Fried rice, noodle stir-fries, savory congee, and vegetable omelets are the ultimate fridge-cleanout templates."
      }
    ],
    ja: [
      {
        question: "冷蔵庫の残り物を味を崩さずにまとめるコツは？",
        answer: "醤油ベースやカレー風味など味付けの軸を一つ決め、具材の大きさを揃えて炒め合わせると一体感が出ます。"
      },
      {
        question: "少しずつ余った野菜や肉を活用するおすすめメニューは？",
        answer: "五目炒飯、焼きそば、具だくさん雑炊、オムレツなどが、半端な食材を使い切るのに最適です。"
      }
    ],
    ko: [
      {
        question: "남은 재료들을 맛의 충돌 없이 조화롭게 요리하려면?",
        answer: "간장이나 굴소스처럼 기본 양념의 중심을 잡고, 재료의 크기를 비슷하게 썰어 볶아내면 자연스럽게 어우러집니다."
      },
      {
        question: "자투리 채소와 고기를 처리하기 가장 좋은 요리는?",
        answer: "모둠 볶음밥, 볶음면, 영양 죽, 달걀부침 등이 남은 재료를 맛있게 비워내기에 가장 좋습니다."
      }
    ]
  },
  "high-protein-meals": {
    "zh-TW": [
      {
        question: "一人份高蛋白料理該如何搭配才能滿足每日所需？",
        answer: "建議每餐攝取 20～30 克蛋白質，例如「1 片雞胸肉（約 150g）」或「1 盒豆腐 + 2 顆雞蛋」，搭配深綠色蔬菜與適量全穀雜糧，飽足又有精神。"
      },
      {
        question: "自製高蛋白便當，肉類冷藏後回熱如何保持軟嫩不柴？",
        answer: "料理前可用鹽水浸泡（鹽水醃漬法）或加少許太白粉與蛋白抓醃；回熱時以微波中火分次加熱，或淋少許高湯加蓋回熱，即可維持多汁口感。"
      }
    ],
    en: [
      {
        question: "How do I build a satisfying single-serving high-protein plate?",
        answer: "Target 20-30g of protein per meal by combining a lean protein source like chicken breast or salmon with eggs and tofu."
      },
      {
        question: "How do I keep meal-prepped chicken breast tender upon reheating?",
        answer: "Brine the meat briefly or velvet with a splash of egg white and starch before cooking. Reheat with a lid and a spoonful of water to preserve moisture."
      }
    ],
    ja: [
      {
        question: "一人分でしっかりタンパク質を摂る献立の組み立て方は？",
        answer: "鶏むね肉1枚や、豆腐と卵の組み合わせで1食あたり20〜30gのタンパク質を確保するのが理想的です。"
      },
      {
        question: "作り置きした高タンパク肉を温め直してもパサつかせない方法は？",
        answer: "加熱前に少量の酒や片栗粉で下味をもみ込むか、レンジで温める際に少量の水をかけてラップをし、蒸気でしっとり温めましょう。"
      }
    ],
    ko: [
      {
        question: "1인분 고단백 식단을 균형 있게 구성하려면?",
        answer: "닭가슴살 1쪽이나 두부와 달걀을 조합하여 한 끼당 20~30g의 순수 단백질을 섭취하도록 구성하세요."
      },
      {
        question: "밀프랩한 닭가슴살을 데워도 퍽퍽하지 않게 하려면?",
        answer: "조리 전 연육 과정을 거치거나, 데울 때 물을 한 스푼 뿌리고 뚜껑을 덮어 수분을 지키며 데우세요."
      }
    ]
  },
  "weight-loss-meals": {
    "zh-TW": [
      {
        question: "減脂家常料理如何少油少鹽又保持濃郁美味？",
        answer: "善用天然辛香料與鮮味食材，如蒜末、洋蔥、番茄、黑胡椒、檸檬汁與蕈菇。利用食材自身的酸甜與胺基酸提升鮮度，不必重油重鹽也能滿足味蕾。"
      },
      {
        question: "外食族自煮減脂餐，哪些食材飽足感最高且熱量低？",
        answer: "推薦青花菜、高麗菜、櫛瓜、白蘿蔔、板豆腐與蝦仁。水分與膳食纖維高，咀嚼感扎實，能大幅延緩飢餓感。"
      }
    ],
    en: [
      {
        question: "How can I cook low-calorie meals without sacrificing flavor?",
        answer: "Rely on natural flavor boosters like garlic, onions, tomatoes, mushrooms, black pepper, and citrus rather than heavy oils and sugars."
      },
      {
        question: "What low-calorie ingredients offer the highest satiety for weight loss?",
        answer: "Broccoli, cabbage, zucchini, firm tofu, and shrimp provide exceptional volume and fiber with minimal calories."
      }
    ],
    ja: [
      {
        question: "油や塩分を控えても美味しく満足できる減量料理のコツは？",
        answer: "にんにく、玉ねぎ、トマト、きのこ、黒胡椒、レモン汁など、素材の旨味や酸味を活かして満足度を高めましょう。"
      },
      {
        question: "ダイエット中に満腹感を得やすい低カロリー食材は？",
        answer: "ブロッコリー、キャベツ、ズッキーニ、木綿豆腐、えびなどは食物繊維と水分が豊富で、満腹感が持続します。"
      }
    ],
    ko: [
      {
        question: "기름과 염분을 줄이면서도 맛있는 다이어트 요리를 하려면?",
        answer: "마늘, 양파, 토마토, 버섯, 후추, 레몬즙 등 자연의 감칠맛과 향신료를 적극 활용하세요."
      },
      {
        question: "포만감이 높고 칼로리가 낮은 추천 재료는?",
        answer: "브로콜리, 양배추, 주키니 호박, 두부, 새우는 부피 대비 칼로리가 낮고 식이섬유가 풍부합니다."
      }
    ]
  },
  "bento-meals": {
    "zh-TW": [
      {
        question: "自製隔天便當菜，如何挑選不易變質且回熱依舊好吃的菜色？",
        answer: "優先選擇水分較少、質地扎實的食材，如滷肉燥、煎雞排、炒豆干、紅蘿蔔炒蛋。葉菜類建議選耐熱的高麗菜或青花菜，避免易出水變黃的葉菜。"
      },
      {
        question: "便當分裝冷藏與回熱的安全步驟是什麼？",
        answer: "菜餚烹煮後需在 2 小時內降溫分裝並放入冷藏室。隔天微波或電鍋蒸熱時，中心溫度務必達 74°C 以上，確保衛生安全。"
      }
    ],
    en: [
      {
        question: "Which dishes hold up best for next-day bento lunch boxes?",
        answer: "Choose low-moisture dishes like braised pork, pan-seared chicken, dried tofu stir-fries, and hearty greens like cabbage and broccoli."
      },
      {
        question: "What is the proper food safety routine for meal prep bentos?",
        answer: "Chill cooked meals within 2 hours in clean airtight containers. Reheat until steaming hot throughout (above 74°C/165°F) before eating."
      }
    ],
    ja: [
      {
        question: "翌日のお弁当に入れても傷みにくく美味しいおかずは？",
        answer: "汁気が少なくしっかり味のついた照り焼きチキン、煮卵、キャベツ炒め、ブロッコリーなどが向いています。"
      },
      {
        question: "お弁当の作り置きと衛生管理の注意点は？",
        answer: "調理後は清潔な容器に分けて2時間以内に冷蔵庫へ入れ、食べる際は中心までしっかり再加熱しましょう。"
      }
    ],
    ko: [
      {
        question: "다음 날 도시락 반찬으로 데워 먹기 가장 좋은 메뉴는?",
        answer: "수분이 적고 간이 잘 배는 조림류, 닭구이, 두부부침, 양배추볶음 등이 도시락 반찬에 최적입니다."
      },
      {
        question: "도시락 반찬 보관 시 지켜야 할 위생 수칙은?",
        answer: "조리 후 2시간 이내에 밀폐 용기에 담아 냉장 보관하고, 먹기 전 충분히 데워 드세요."
      }
    ]
  },
  "budget-meals": {
    "zh-TW": [
      {
        question: "預算有限時，哪些平價食材性價比最高且營養均衡？",
        answer: "雞蛋、板豆腐、高麗菜、豆芽菜、洋蔥與雞胸肉是平價食材的代表，成本極低卻具備優質蛋白質與維生素，搭配白飯即可飽足一餐。"
      },
      {
        question: "月底省錢料理如何避免餐餐單調？",
        answer: "更換調味核心是關鍵：同一款雞蛋豆腐，今天做醬油蔥花煎，明天改番茄燴煮，後天做咖哩拌飯，花費銅板價也能天天有新意。"
      }
    ],
    en: [
      {
        question: "What are the most cost-effective ingredients for budget-friendly meals?",
        answer: "Eggs, firm tofu, cabbage, bean sprouts, onions, and chicken breast provide maximum nutrition and volume per dollar."
      },
      {
        question: "How do I keep low-cost home cooking from getting repetitive?",
        answer: "Vary the seasonings: switch between garlic soy glaze, tomato reduction, and mild curry powder with the same core ingredients."
      }
    ],
    ja: [
      {
        question: "コスパが良く栄養バランスに優れた節約食材は？",
        answer: "卵、木綿豆腐、もやし、キャベツ、玉ねぎ、鶏むね肉は価格が安定しており、栄養価も抜群です。"
      },
      {
        question: "節約料理がマンネリ化しないための工夫は？",
        answer: "同じ食材でも、醤油だれ、トマト煮、カレー風味など味付けのバリエーションを変えることで飽きずに楽しめます。"
      }
    ],
    ko: [
      {
        question: "가성비가 가장 좋고 영양가 있는 알뜰 식재료는?",
        answer: "달걀, 두부, 콩나물, 양배추, 양파, 닭가슴살은 가격 부담이 적으면서도 영양이 뛰어난 대표 식재료입니다."
      },
      {
        question: "알뜰 식단이 지루해지지 않게 변화를 주는 방법은?",
        answer: "간장 양념, 토마토소스, 카레 등 소스를 번갈아 활용하면 같은 기본 재료로도 매일 색다른 맛을 즐길 수 있습니다."
      }
    ]
  },
  "air-fryer-meals": {
    "zh-TW": [
      {
        question: "氣炸鍋料理肉類與蔬菜時，需要額外刷油嗎？",
        answer: "帶皮肉類（如雞腿、五花肉、鮭魚）自帶天然油脂，無需額外抹油；蔬菜類（如秋葵、櫛瓜、花椰菜）則建議表面噴一層薄薄植物油，能避免乾燥焦黑並鎖住鮮甜汁水。"
      },
      {
        question: "氣炸鍋烹調時如何避免食材受熱不均勻？",
        answer: "食材切塊大小保持一致且在炸籃內平鋪單層、切勿堆疊重疊；烹調時間過半時抽出炸籃輕輕搖晃或翻面一次，上色與熟度會非常均勻。"
      }
    ],
    en: [
      {
        question: "Do meats and vegetables need added oil in an air fryer?",
        answer: "Naturally fatty meats like salmon and chicken wings need no added oil. Lean vegetables like broccoli and zucchini benefit from a light mist of oil to prevent drying out."
      },
      {
        question: "How do I ensure even cooking in an air fryer basket?",
        answer: "Arrange food in a single layer with space for air circulation, and shake or flip halfway through cooking."
      }
    ],
    ja: [
      {
        question: "エアフライヤー調理で油を塗る必要はある？",
        answer: "手羽先やサーモンなど脂のある食材は油不要ですが、野菜類は表面に薄く油を塗ると乾燥を防ぎジューシーに仕上がります。"
      },
      {
        question: "エアフライヤーで焼きムラを防ぐコツは？",
        answer: "食材を重ねずに平らに並べ、調理時間の半分が過ぎたところで一度バスケットを振るか裏返しましょう。"
      }
    ],
    ko: [
      {
        question: "에어프라이어 요리 시 기름을 발라야 하나요?",
        answer: "닭날개나 연어처럼 자체 기름이 있는 재료는 기름이 필요 없지만, 채소류는 얇게 오일을 발라주어야 마르지 않고 촉촉합니다."
      },
      {
        question: "에어프라이어로 고르게 익히는 요령은?",
        answer: "재료가 겹치지 않게 한 겹으로 펼치고, 조리 시간 중간에 한 번 뒤집어주면 골고루 바삭하게 익습니다."
      }
    ]
  },
  "late-night-meals": {
    "zh-TW": [
      {
        question: "深夜想吃熱呼呼的宵夜，如何準備負擔較低又滿足的料理？",
        answer: "建議以熱湯品、滑蛋或豆腐料理為主，如番茄豆腐蛋花湯、柴魚昆布烏龍麵。避免高糖高油重炸物，既暖胃好消化，也不會影響夜間睡眠。"
      },
      {
        question: "半夜飢腸轆轆，哪些料理能在 5 分鐘內快速完成？",
        answer: "微波蒸蛋、熱湯泡飯、快熟烏龍麵或起司豆腐，備料簡單且加熱神速，免動大油鍋，幾分鐘就能撫慰飢餓的胃。"
      }
    ],
    en: [
      {
        question: "What makes a satisfying late-night meal that won't disrupt sleep?",
        answer: "Opt for warm soups, soft-scrambled eggs, and tofu dishes like tomato egg drop soup or dashi broth noodles that are light on digestion."
      },
      {
        question: "What can I cook in under 5 minutes when late-night hunger strikes?",
        answer: "Steamed egg custard, quick udon in hot broth, or melted cheese over warm tofu come together in minutes without heavy cleanup."
      }
    ],
    ja: [
      {
        question: "夜遅くに食べても胃もたれしにくい夜食メニューは？",
        answer: "トマトと卵の中華スープ、温かいかき玉うどん、湯豆腐など、消化に優しく温かい汁物がおすすめです。"
      },
      {
        question: "夜中に5分ですぐ作れる手早い夜食は？",
        answer: "レンジ茶碗蒸し、お茶漬け、温かいだしうどんなどは、火を使わずにすぐ作れて胃にも優しいです。"
      }
    ],
    ko: [
      {
        question: "야식으로 위에 부담이 적고 속이 편안한 메뉴는?",
        answer: "토마토 달걀국, 따뜻한 온우동, 순두부탕처럼 소화가 잘되고 따뜻한 국물 요리를 추천합니다."
      },
      {
        question: "야심한 밤 5분 만에 빠르게 만들 수 있는 요리는?",
        answer: "전자레인지 달걀찜, 따뜻한 국밥, 치즈 두부 등은 짧은 시간에 부담 없이 허기를 달랠 수 있습니다."
      }
    ]
  },
  "meatless-meals": {
    "zh-TW": [
      {
        question: "無肉料理如何補充充足的蛋白質與飽足感？",
        answer: "善用雞蛋、板豆腐、毛豆、起司與各類菇類。豆腐與雞蛋能提供完整胺基酸，菇類則富含膳食纖維，口感豐富不空虛。"
      },
      {
        question: "蔬食料理如何營造鮮美濃郁的滋味層次？",
        answer: "利用乾香菇、番茄天然茄紅素、破布子與蒜香爆香，引出「天然鮮味（Umami）」，就算不加肉類也能醇厚甘甜。"
      }
    ],
    en: [
      {
        question: "How do I get enough protein and fullness in a meatless meal?",
        answer: "Combine eggs, firm tofu, edamame, and hearty mushrooms. Tofu and eggs supply complete proteins while mushrooms add meaty texture."
      },
      {
        question: "How do I create deep, savory flavors in vegetable dishes?",
        answer: "Harness natural umami from sautéed mushrooms, caramelized onions, ripe tomatoes, and garlic for deeply satisfying sauces."
      }
    ],
    ja: [
      {
        question: "肉なし料理で満足感とタンパク質を確保するコツは？",
        answer: "卵、木綿豆腐、きのこ類を組み合わせることで、良質なタンパク質としっかりとした食べ応えを得られます。"
      },
      {
        question: "野菜中心の料理にコクや旨味をプラスする方法は？",
        answer: "きのこの旨味、炒め玉ねぎの甘み、完熟トマトのグルタミン酸を活かすと、お肉がなくても深みのある味わいになります。"
      }
    ],
    ko: [
      {
        question: "고기 없는 식단에서 단백질과 포만감을 채우는 방법은?",
        answer: "달걀, 두부, 버섯을 풍성하게 조합하면 양질의 단백질과 쫄깃한 식감을 충분히 누릴 수 있습니다."
      },
      {
        question: "채소 요리에서 깊은 감칠맛을 내는 비결은?",
        answer: "버섯을 노릇하게 볶고 양파와 완숙 토마토의 풍미를 더해 자연스러운 감칠맛을 끌어내세요."
      }
    ]
  }
};

export const getScenarioFaqs = (
  scenario: ScenarioItem,
  locale: Locale = defaultLocale
): TaxonomyFaq[] => {
  const faqsForSlug = SCENARIO_FAQS[scenario.slug]?.[locale] ?? SCENARIO_FAQS[scenario.slug]?.[defaultLocale];
  if (faqsForSlug && faqsForSlug.length > 0) {
    return faqsForSlug;
  }

  const name = getScenarioLabel(scenario, locale);
  if (locale === "en") {
    return [
      {
        question: `What makes a great ${name.toLowerCase()} meal?`,
        answer: `Focus on reliable staples, simple preparation steps, and minimal cleanup so you can enjoy home cooking with less stress.`
      },
      {
        question: `How can I customize recipes in this category?`,
        answer: `Use your favorite proteins and seasonal vegetables, swapping pantry items according to what you have on hand.`
      }
    ];
  }
  if (locale === "ja") {
    return [
      {
        question: `${name}を上手に楽しむコツは？`,
        answer: `定番の食材を活用し、工程や洗い物を減らして気軽に作ることが長続きの秘訣です。`
      },
      {
        question: `このテーマのレシピをアレンジする方法は？`,
        answer: `手元の常備菜や好みの調味料を使い、冷蔵庫の残り物に合わせて自由に組み合わせてみてください。`
      }
    ];
  }
  if (locale === "ko") {
    return [
      {
        question: `${name}을(를) 맛있고 편하게 즐기는 팁은?`,
        answer: `손쉬운 기본 재료와 간단한 조리법을 활용해 설거지와 수고를 줄이는 것이 좋습니다.`
      },
      {
        question: `이 주제의 레시피를 다양하게 응용하려면?`,
        answer: `냉장고에 있는 자투리 채소와 좋아하는 양념을 더해 취향에 맞게 자유롭게 변형해 보세요.`
      }
    ];
  }

  return [
    {
      question: `${name}在日常備餐上有何料理技巧？`,
      answer: `掌握基本常備食材與固定烹調動線，簡化備料與洗碗流程，讓平日下廚輕鬆又無負擔。`
    },
    {
      question: `手邊食材不齊全時該如何調整？`,
      answer: `可參考食譜內的替換建議，以性質相近的蔬菜、蛋或豆製品替代，同樣能完成營養均衡的一餐。`
    }
  ];
};

export const getIngredientFaqs = (
  ingredient: IngredientItem,
  locale: Locale = defaultLocale
): TaxonomyFaq[] => {
  const name = getIngredientLabel(ingredient, locale);
  const category = getIngredientCategoryLabel(ingredient, locale);
  const storage = getIngredientStorage(ingredient, locale);
  const pairings = ingredient.commonPairings.slice(0, 3).join(locale === "en" || locale === "ko" ? ", " : "、");
  const substitutes = ingredient.substitutes.slice(0, 2).join(locale === "en" || locale === "ko" ? ", " : "、");

  if (locale === "en") {
    return [
      {
        question: `How do I choose fresh ${name}?`,
        answer: `Choose ${name} that looks vibrant and firm with no off odors or signs of wilting and excess moisture.`
      },
      {
        question: `What is the best way to store ${name}?`,
        answer: `${storage || "Keep refrigerated."} For best results, keep dry and sealed in an airtight container.`
      },
      {
        question: `What ingredients pair best with ${name}?`,
        answer: `${name} pairs well with ${pairings || "basic pantry staples"}. If you run out, try substituting with ${substitutes || "similar seasonal ingredients"}.`
      }
    ];
  }

  if (locale === "ja") {
    return [
      {
        question: `新鮮な${name}の見分け方は？`,
        answer: `色つやが良く、触ってしっかりとしたハリがあり、変色や傷み、異臭がないものを選びましょう。`
      },
      {
        question: `${name}の正しい保存方法は？`,
        answer: `${storage || "冷蔵庫で保存してください。"} 水気をしっかり拭き取り、密閉容器や保存袋に入れて保存すると長持ちします。`
      },
      {
        question: `${name}と相性の良い食材や代用品は？`,
        answer: `${name}は ${pairings || "定番の調味料や野菜"} とよく合います。手元にないときは ${substitutes || "類似の食材"} で代用できます。`
      }
    ];
  }

  if (locale === "ko") {
    return [
      {
        question: `신선한 ${name}을(를) 고르는 기준은?`,
        answer: `색이 선명하고 탄력이 있으며, 무르거나 변색 및 이상한 냄새가 없는 것을 고르는 것이 좋습니다.`
      },
      {
        question: `${name}의 올바른 보관 방법은?`,
        answer: `${storage || "냉장 보관을 권장합니다."} 물기를 제거하고 밀폐 용기에 담아 보관하면 신선도가 오래 유지됩니다.`
      },
      {
        question: `${name}와(과) 잘 어울리는 재료 및 대체 재료는?`,
        answer: `${name}은(는) ${pairings || "기본 상비 재료"}와(과) 잘 어울립니다. 없을 때는 ${substitutes || "비슷한 계열 재료"}로 대체해 보세요.`
      }
    ];
  }

  // zh-TW default
  let selectionTip = `挑選${name}時，以外觀飽滿結實、色澤自然、無枯萎出水或異味為新鮮原則。`;
  if (category.includes("蔬菜") || category.includes("根莖")) {
    selectionTip = `挑選${name}時，以外觀飽滿挺拔、色澤鮮亮自然、無萎凋枯黃或出水軟爛為原則；若有蒂頭應保持翠綠新鮮，帶有清新的蔬菜自然清香。`;
  } else if (category.includes("海鮮")) {
    selectionTip = `挑選${name}時，以肉質緊實富彈性、外觀濕潤有光澤、無暗沉脫水或刺鼻腥臭為新鮮標準；冷藏購買應注意保鮮溫度。`;
  } else if (category.includes("肉類")) {
    selectionTip = `挑選${name}時，以肉色粉嫩自然、觸感富彈性、表面微乾爽無黏液滲水且無酸敗異味為優；若是盒裝應確認密封包裝完整。`;
  } else if (category.includes("豆製品")) {
    selectionTip = `挑選${name}時，應確認包裝密封完好無膨包，質地平整有彈性，聞起來帶淡雅豆香而無酸臭發黏現象。`;
  } else if (category.includes("蛋類")) {
    selectionTip = `挑選${name}時，以蛋殼完整無裂痕、拿在手中略有沉重感為佳；新鮮蛋黃飽滿圓挺，蛋白濃稠層次分明。`;
  } else if (category.includes("主食") || category.includes("飯麵")) {
    selectionTip = `挑選${name}時，注意包裝密封防潮，乾燥麵體應無碎裂發霉，新鮮麵條則應無酸味或發黏受潮現象。`;
  }

  return [
    {
      question: `如何挑選與辨識新鮮的${name}？`,
      answer: selectionTip
    },
    {
      question: `${name}該如何正確保存以延長保鮮期？`,
      answer: `${storage || "建議冷藏保存。"} 若購買份量較大或短期內無法用完，建議依每次料理份量先分裝密封，避免反覆退冰或受潮造成變質。`
    },
    {
      question: `${name}適合搭配哪些食材？若手邊沒有能用什麼替代？`,
      answer: `${name}在日常料理中非常適合與 ${pairings || "常備辛香料"} 等食材一同拌炒、煮湯或做成蓋飯。若手邊正好缺少，料理時可嘗試用 ${substitutes || "性質相近食材"} 替代，同樣能做出可口均衡的家常菜色。`
    }
  ];
};
