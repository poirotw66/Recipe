import type { Locale } from "./i18n";
import { defaultLocale } from "./i18n";

export interface TopicHubFaq {
  question: string;
  answer: string;
}

const TOPIC_HUB_FAQS: Record<string, Record<Locale, TopicHubFaq[]>> = {
  brunch: {
    "zh-TW": [
      {
        question: "假日在家準備早午餐，如何掌控牛排、煎蛋與吐司的出菜節奏才能同時熱騰騰上桌？",
        answer: "建議掌握「先慢後快、善用餘溫」原則。先煎烤需要靜置的肉品（如牛排、雞胸），離鍋靜置（約 5 分鐘）的空檔，立刻利用同一只鍋子鍋底牛油餘溫煎蛋與烘烤麵包；最後組合蔬菜與水果，即可同時熱騰騰、外酥內嫩盛盤。"
      },
      {
        question: "早午餐常見的生菜沙拉與水果配菜，如何處理才能保持乾爽不水爛？",
        answer: "葉菜洗淨後務必用蔬菜脫水器徹底甩乾水分；沙拉醬汁建議食用前再淋上，或裝在小沾盅內供沾取，避免水分滲出浸濕旁邊剛煎好的脆皮吐司或肉排。"
      }
    ],
    en: [
      {
        question: "How do I time a brunch plate so the steak, eggs, and toast are all served hot together?",
        answer: "Follow a sear-and-rest sequence: cook thicker proteins like steak or chicken first. While the meat rests for 5 minutes, use the hot skillet drippings to fry eggs and toast bread, then assemble fresh produce just before serving."
      },
      {
        question: "How do I prevent brunch salad and fruit sides from making toast soggy?",
        answer: "Spin washed salad greens thoroughly dry with a salad spinner. Serve dressings on the side in a ramekin so moisture does not migrate into crisp toast or seared meat."
      }
    ],
    ja: [
      {
        question: "休日のブランチで、ステーキや目玉焼き、トーストを同時に温かい状態で出すコツは？",
        answer: "肉類を先に焼いて5分ほど休ませる（肉汁を落ち着かせる）間に、同じフライパンに残った旨味のある油で卵を焼き、トーストを温めます。最後にサラダを添えると全て出来立てで揃います。"
      },
      {
        question: "ブランチの生野菜やフルーツでトーストが水っぽくならないようにするには？",
        answer: "野菜は水切り器でしっかり水分を切り、ドレッシングは食べる直前にかけるか小皿に添えて、トーストや肉のサクサク感を保ちましょう。"
      }
    ],
    ko: [
      {
        question: "홈브런치 만들 때 스테이크, 달걀, 토스트를 동시에 따뜻하게 서빙하는 팁은?",
        answer: "스테이크나 닭고기를 먼저 구워 육즙이 퍼지도록 5분간 레스팅하는 동안, 팬에 남은 오일로 달걀을 굽고 빵을 데우면 모든 요리를 따뜻하게 동시에 즐길 수 있습니다."
      },
      {
        question: "브런치 샐러드와 과일 물기로 토스트가 눅눅해지지 않게 하려면?",
        answer: "샐러드 채소는 야채 탈수기로 물기를 완전히 털어내고, 드레싱은 따로 작은 소스볼에 담아내면 토스트와 고기의 바삭함을 끝까지 유지할 수 있습니다."
      }
    ]
  },
  beef: {
    "zh-TW": [
      {
        question: "料理牛排或牛肉片前，為什麼一定要「室溫回溫」與「吸乾水分」？",
        answer: "冷藏牛肉若直接下鍋，會使鍋溫急遽下降導致肉汁流失變水煮；料理前置於室溫回溫 15～20 分鐘，並用廚房紙巾徹底吸乾表面血水，下鍋時才能在高溫下迅速產生梅納反應，形成焦香外皮並鎖住鮮美肉汁。"
      },
      {
        question: "牛肉片或牛肉塊如何切才能保持軟嫩不乾柴？",
        answer: "觀察牛肉紋理，下刀時刀刃與肉紋呈 90 度垂直「頂刀切（逆紋切）」，切斷長纖維筋膜；若順著紋理切會使纖維保持完整，咀嚼時容易咬不斷或乾柴塞牙。"
      }
    ],
    en: [
      {
        question: "Why should beef be brought to room temperature and patted dry before cooking?",
        answer: "Cold meat dropped into a hot skillet drops the pan temperature and steams rather than sears. Resting beef at room temperature for 15-20 minutes and patting it thoroughly dry ensures a crisp Maillard crust and juicy interior."
      },
      {
        question: "How should beef be sliced to stay tender and easy to chew?",
        answer: "Always slice beef across the grain (perpendicular to muscle fibers). Cutting across muscle fibers shortens them, yielding tender bites instead of stringy, tough meat."
      }
    ],
    ja: [
      {
        question: "牛肉を調理する前に常温に戻し、水分を拭き取る理由は？",
        answer: "冷たいまま焼くと鍋の温度が下がり、肉汁が出て煮物状態になってしまいます。15〜20分室温に戻し、キッチンペーパーで余分なドリップを吸い取ることで、強火で香ばしい焼き目がつき旨味が閉じ込められます。"
      },
      {
        question: "牛肉を柔らかく仕上げる切り方のコツは？",
        answer: "肉の繊維の流れをよく観察し、繊維に対して直角に刃を入れる「逆目切り」をします。長い繊維を断ち切ることで、加熱しても硬くなりにくく噛み切りやすくなります。"
      }
    ],
    ko: [
      {
        question: "소고기를 굽기 전 실온에 두고 핏물을 닦아내야 하는 이유는?",
        answer: "차가운 고기를 바로 팬에 넣으면 팬 온도가 떨어져 육즙이 빠져나옵니다. 조리 15~20분 전 실온에 꺼내두고 키친타월로 표면 수분을 꼼꼼히 닦아야 마이야르 반응이 일어나며 겉바속촉하게 구워집니다."
      },
      {
        question: "소고기를 질기지 않고 부드럽게 써는 방법은?",
        answer: "소고기 결(근육 섬유)을 관찰한 뒤, 결의 수직 방향(결 반대 방향)으로 썰어 긴 근섬유를 끊어주면 조리 후에도 훨씬 연하고 부드럽습니다."
      }
    ]
  },
  "air-fryer": {
    "zh-TW": [
      {
        question: "氣炸鍋料理如何避免肉類外乾內柴或受熱不均？",
        answer: "氣炸鍋利用高速熱風對流，水分蒸發較快。烹調少油肉品（如雞胸、魚排）時表面需刷一層薄油鎖水；食材在炸籃內切勿重疊堆擠，烹調至中途拉出炸籃翻面或輕晃，即可受熱均勻且外酥內嫩。"
      },
      {
        question: "氣炸鍋使用後如何快速去油污與異味？",
        answer: "使用後趁炸籃微溫時加入溫水與中性洗碗精浸泡 10 分鐘，用海綿輕刷避免破壞不沾塗層；若有殘留肉類異味，可放入檸檬片或柑橘皮以 160°C 烘烤 3～5 分鐘，即可自然去味。"
      }
    ],
    en: [
      {
        question: "How do I prevent air-fried meats from turning dry or cooking unevenly?",
        answer: "Air fryers use rapid hot air circulation that quickly evaporates surface moisture. Lightly brush lean cuts (like chicken breast or fish) with oil to seal in juices, avoid overcrowding the basket, and flip halfway through cooking."
      },
      {
        question: "What is the best way to clean and deodorize an air fryer basket?",
        answer: "Soak the warm basket in warm water and mild dish soap for 10 minutes, using a soft sponge to protect the nonstick coating. To clear stubborn food odors, air-fry lemon slices or orange peels at 160°C (320°F) for 3-5 minutes."
      }
    ],
    ja: [
      {
        question: "ノンフライヤーで肉がパサついたり加熱ムラになるのを防ぐには？",
        answer: "熱風循環で水分が飛びやすいため、鶏むね肉や白身魚など脂の少ない食材には薄く油を塗ります。バスケットに食材を重ねず並べ、途中で一度裏返すと均一にサクサクジューシーに仕上がります。"
      },
      {
        question: "ノンフライヤーの油汚れやにおいをすっきり落とす方法は？",
        answer: "使用後の温かいうちにぬるま湯と中性洗剤で10分浸け置きし、柔らかいスポンジで洗います。においが残る場合は、レモンのスライスを入れて160°Cで3〜5分加熱すると消臭できます。"
      }
    ],
    ko: [
      {
        question: "에어프라이어 요리 시 고기가 퍽퍽해지거나 덜 익는 것을 방지하려면?",
        answer: "열풍 순환으로 수분이 빠르게 증발하므로 닭가슴살이나 생선 같은 저지방 육류는 겉면에 오일을 살짝 발라줍니다. 바스켓에 겹치지 않게 펼쳐 담고 중간에 한 번 뒤집어주어야 고르게 익습니다."
      },
      {
        question: "에어프라이어 바스켓의 기름때와 냄새를 손쉽게 세척하는 방법은?",
        answer: "온기가 남아있을 때 미온수와 중성세제를 풀어 10분간 불린 후 부드러운 스펀지로 닦아 코팅을 보호합니다. 냄새가 밸 때는 레몬 조각을 넣고 160°C에서 3~5분 돌리면 상쾌하게 탈취됩니다."
      }
    ]
  },
  pasta: {
    "zh-TW": [
      {
        question: "義大利麵如何煮出彈牙口感（Al Dente）並讓醬汁濃稠附著？",
        answer: "煮麵水需加入足量鹽（約 1 公升水加 7～10 克鹽），煮麵時間比包裝建議少 1～2 分鐘；保留半碗含有澱粉質的煮麵水，在最後將麵條撈入醬汁鍋時分次加入，大火快速翻拌產生「乳化作用（Emulsification）」，醬汁便能緊緊裹住麵條。"
      },
      {
        question: "一人份義大利麵如何掌控份量與時間？",
        answer: "一人份乾麵條重量約為 80～100 克（可用食指與拇指圈起約 10 元硬幣大小）。一人份非常適合蒜香清炒或一鍋到底料理，少油煙且 12～15 分鐘即可完成。"
      }
    ],
    en: [
      {
        question: "How do I cook pasta al dente and ensure sauce coats every strand evenly?",
        answer: "Salt the cooking water generously (around 7-10g salt per liter of water) and boil pasta 1-2 minutes shy of package directions. Reserve half a cup of starchy pasta water and toss it vigorously with the pasta and sauce over heat to create an emulsified glaze."
      },
      {
        question: "What is the standard single serving of dried pasta and the quickest way to cook it?",
        answer: "A standard single portion is 80-100g of dry pasta (about a coin-sized diameter between thumb and index finger). Aglio e olio or one-pot pasta techniques are ideal for single servings and take under 15 minutes."
      }
    ],
    ja: [
      {
        question: "パスタをアルデンテに茹で、ソースをしっかり絡める（乳化させる）コツは？",
        answer: "湯量1Lに対して塩7〜10gを加え、表示時間より1〜2分短めに茹でます。茹で汁を大さじ2〜3杯残しておき、フライパンでソースと合わせる際に強火で素早く混ぜ合わせることで、乳化して麺によく絡みます。"
      },
      {
        question: "一人分のパスタの適量と短時間で作る方法は？",
        answer: "乾麺で80〜100g（親指と人差し指で1円玉大をつまむ程度）が1人分の目安です。アーリオ・オーリオなどのシンプルなオイル系やワンパンパスタなら、15分以内で洗い物も少なく作れます。"
      }
    ],
    ko: [
      {
        question: "파스타 면을 알덴테로 삶고 소스가 겉돌지 않게 에멀전하는 비법은?",
        answer: "물 1L당 소금 7~10g을 넣고 포장지 권장 시간보다 1~2분 덜 삶습니다. 전분기가 녹아있는 면수를 반 컵 정도 남겨 소스 팬에 붓고 센 불에서 빠르게 저어주면 오일과 물이 유화되어 소스가 면에 착 감깁니다."
      },
      {
        question: "1인분 파스타 정량과 가장 빠르게 만드는 조리법은?",
        answer: "1인분 건면 기준 80~100g(엄지와 검지로 500원 동전 크기만큼 쥐었을 때)이 적당합니다. 마늘 오일 파스타나 원팬 파스타 방식을 활용하면 설거지도 줄이고 15분 만에 완성됩니다."
      }
    ]
  },
  "quick-meals": {
    "zh-TW": [
      {
        question: "10 分鐘下班快速出餐，最省時的備料策略是什麼？",
        answer: "善用「易熟蛋白質（如雞蛋、嫩豆腐、薄肉片、蝦仁、毛豆）」與「免長時間燉煮蔬菜（如高麗菜絲、番茄、青花菜、鴻喜菇）」。烹調前先將調味料（如醬油、烏醋、鹽）預調成綜合醬汁，下鍋一次倒入快速拌勻收汁。"
      },
      {
        question: "忙碌時如何利用常備食材在 10 分鐘內變出一道菜？",
        answer: "平日可在冰箱常備洗淨切段的蔥花、冷凍肉片、雞蛋與冷凍白飯。回家直接熱平底鍋，倒入白飯、雞蛋與蔥花快炒 5 分鐘即成蛋炒飯，或利用湯鍋煮味噌豆腐蔬菜湯，省時兼顧營養。"
      }
    ],
    en: [
      {
        question: "What is the best prep strategy for cooking a satisfying dinner in under 10 minutes?",
        answer: "Rely on fast-cooking proteins (eggs, silken tofu, sliced meat, shrimp) and tender produce (cabbage ribbons, mushrooms, cherry tomatoes). Pre-mix seasonings into a single bowl before heating the pan so you can glaze and serve without delay."
      },
      {
        question: "How can basic kitchen staples produce a balanced 10-minute weeknight meal?",
        answer: "Keep sliced scallions, frozen rice portions, and eggs on hand. A piping-hot pan turns chilled rice and eggs into fragrant fried rice in 5 minutes, or transforms broth and tofu into a comforting soup with minimal effort."
      }
    ],
    ja: [
      {
        question: "10分で夕食を仕上げるための最も時短な下ごしらえのコツは？",
        answer: "火が通りやすいタンパク質（卵、豆腐、薄切り肉、むきエビ）と、さっと火が通る野菜（千切りキャベツ、キノコ、ミニトマト）を選びます。調味料は事前に小さな器に合わせておき、フライパンに一気に入れると焦げつきを防ぎ短時間で決まります。"
      },
      {
        question: "常備食材を使って10分でバランスの良い一品を作るには？",
        answer: "刻みネギ、冷凍ご飯、卵、薄切り肉を常備しておくと、熱したフライパンで5分炒めるだけでパラパラ炒飯が完成し、小鍋で味噌汁やスープを作るのも手軽です。"
      }
    ],
    ko: [
      {
        question: "퇴근 후 10분 만에 든든한 저녁을 완성하는 가장 빠른 조리 전략은?",
        answer: "빨리 익는 단백질(달걀, 연두부, 대패삼겹살, 칵테일 새우)과 손질이 빠른 채소(양배추채, 버섯, 방울토마토)를 선택하세요. 양념장은 조리 시작 전 미리 한 그릇에 섞어두고 팬에 한 번에 부어야 타지 않고 신속합니다."
      },
      {
        question: "냉장고 속 기본 상비 재료로 10분 만에 영양가 있는 한 끼를 만들려면?",
        answer: "송송 썬 대파, 소분 냉동밥, 달걀을 항상 구비해 두면 센 불에서 5분 만에 고소한 파달걀볶음밥이 완성되며, 냄비에 끓여내는 두부된장국도 10분 내로 충분히 차릴 수 있습니다."
      }
    ]
  }
};

export function getTopicHubFaqs(slug: string, locale: Locale = defaultLocale): TopicHubFaq[] {
  const hubData = TOPIC_HUB_FAQS[slug];
  if (!hubData) return [];
  return hubData[locale] ?? hubData[defaultLocale] ?? [];
}
