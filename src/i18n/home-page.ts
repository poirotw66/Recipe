import type { Locale } from "../lib/i18n";

export interface HomeTopicHubCard {
  slug: string;
  label: string;
  title: string;
  description: string;
  cover: string;
}

export interface HomePageContent {
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroCopy: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchSubmit: string;
  searchErrorEmpty: string;
  searchErrorMax: string;
  quickIngredientsAriaLabel: string;
  scenariosEyebrow: string;
  scenariosTitle: string;
  featuredEyebrow: string;
  featuredTitle: string;
  viewAllRecipes: string;
  topicHubsEyebrow: string;
  topicHubsTitle: string;
  enterTopicHub: string;
  ingredientsEyebrow: string;
  ingredientsTitle: string;
  topicHubs: HomeTopicHubCard[];
  scenarioDescriptions: Record<string, string>;
}

const topicCovers = {
  "quick-meals": "/images/recipes/quick-kimchi-fried-rice.webp",
  "air-fryer": "/images/recipes/air-fryer-salmon-broccoli.webp",
  brunch: "/images/recipes/surf-turf-brunch.webp",
  beef: "/images/recipes/scallion-beef-fried-rice.webp",
  pasta: "/images/recipes/garlic-cream-shrimp-pasta.webp",
  "restaurant-replicas": "/images/recipes/solo-three-cup-chicken-rice.webp"
} as const;

const zhTW: HomePageContent = {
  metaDescription:
    "今晚煮什麼｜Bloom Kitchen 用冰箱現有食材，快速找到今晚能煮的簡單料理，從雞蛋、豆腐、高麗菜一路找到適合的一人份家常菜。",
  heroEyebrow: "今晚煮什麼",
  heroTitle: "先看冰箱，再決定晚餐",
  heroCopy: "輸入 1 到 3 樣現有食材，為你挑選今晚適合的簡單料理。",
  searchLabel: "輸入你有的食材",
  searchPlaceholder: "雞蛋、豆腐、高麗菜",
  searchSubmit: "找今天能煮的料理",
  searchErrorEmpty: "請先輸入 1 到 3 樣食材。",
  searchErrorMax: "首頁搜尋最多 3 樣食材，請精簡後再試。",
  quickIngredientsAriaLabel: "快速食材入口",
  scenariosEyebrow: "料理情境",
  scenariosTitle: "依今晚狀況挑方向",
  featuredEyebrow: "精選食譜",
  featuredTitle: "今晚，從這幾道開始",
  viewAllRecipes: "看全部食譜",
  topicHubsEyebrow: "主題專區",
  topicHubsTitle: "依心情，走進不同的小廚房角落",
  enterTopicHub: "進入專區 →",
  ingredientsEyebrow: "常用食材",
  ingredientsTitle: "從常備食材找做法",
  topicHubs: [
    {
      slug: "quick-meals",
      label: "Quick",
      title: "10 分鐘專區",
      description: "忙碌平日晚餐與宵夜，從炒飯、拌麵到快手主菜快速開飯。",
      cover: topicCovers["quick-meals"]
    },
    {
      slug: "air-fryer",
      label: "Air Fryer",
      title: "氣炸鍋專區",
      description: "少顧鍋的一人份主菜，雞肉、海鮮與蔬菜都能快速完成。",
      cover: topicCovers["air-fryer"]
    },
    {
      slug: "brunch",
      label: "Brunch",
      title: "早午餐專區",
      description: "牛排、海鮮、雞肉與蛋奶素主盤，週末在家也能吃出餐廳感。",
      cover: topicCovers.brunch
    },
    {
      slug: "beef",
      label: "Beef",
      title: "牛肉專區",
      description: "炒飯、快炒、湯品與蓋飯，一人份晚餐與便當都適合。",
      cover: topicCovers.beef
    },
    {
      slug: "pasta",
      label: "Pasta",
      title: "義大利麵專區",
      description: "青醬、蒜香、番茄與白醬麵，從雞肉到海鮮一次找齊。",
      cover: topicCovers.pasta
    },
    {
      slug: "restaurant-replicas",
      label: "Replica",
      title: "名店還原專區",
      description: "還原富錦樹、欣葉、明福、鼎泰豐等名店代表菜，完整工序與上桌份量。",
      cover: topicCovers["restaurant-replicas"]
    }
  ],
  scenarioDescriptions: {
    "one-person-meal": "適合一個人快速完成、不需要準備太多鍋具與配菜的家常料理。",
    "ten-minute-meals": "當天很忙、想快速開飯時最適合的短流程料理集合。",
    "high-protein-meals": "以雞胸肉、豆腐、雞蛋等高蛋白食材為主的日常主菜方向。",
    "weight-loss-meals": "以清爽、份量感足、較低負擔的主菜與配菜為主的料理情境。",
    "bento-meals": "適合提前準備、分裝帶走，也能在隔天加熱後維持口感的料理。",
    "budget-meals": "用常備食材與少量調味就能完成，適合控制餐費的平日菜色。"
  }
};

const en: HomePageContent = {
  metaDescription:
    "Bloom Kitchen helps you cook tonight with what is already in your fridge—quick Taiwanese home recipes for solo cooks and small kitchens.",
  heroEyebrow: "今晚煮什麼",
  heroTitle: "Check the fridge first, then pick dinner",
  heroCopy: "Enter 1 to 3 ingredients you have on hand and we will surface recipes you can cook tonight.",
  searchLabel: "What do you have?",
  searchPlaceholder: "eggs, tofu, cabbage",
  searchSubmit: "Find recipes for tonight",
  searchErrorEmpty: "Enter at least 1 ingredient (up to 3).",
  searchErrorMax: "Home search supports up to 3 ingredients. Please shorten your list.",
  quickIngredientsAriaLabel: "Quick ingredient shortcuts",
  scenariosEyebrow: "Scenarios",
  scenariosTitle: "Pick a direction for tonight",
  featuredEyebrow: "Featured recipes",
  featuredTitle: "Start with these tonight",
  viewAllRecipes: "Browse all recipes",
  topicHubsEyebrow: "Topic hubs",
  topicHubsTitle: "Explore a different corner of the kitchen",
  enterTopicHub: "Enter hub →",
  ingredientsEyebrow: "Popular ingredients",
  ingredientsTitle: "Cook from staples you already buy",
  topicHubs: [
    {
      slug: "quick-meals",
      label: "Quick",
      title: "10-minute meals",
      description: "Fast weeknight dinners and late-night plates—from fried rice and noodles to speedy mains.",
      cover: topicCovers["quick-meals"]
    },
    {
      slug: "air-fryer",
      label: "Air Fryer",
      title: "Air fryer hub",
      description: "Hands-off solo mains with chicken, seafood, and vegetables done in the air fryer.",
      cover: topicCovers["air-fryer"]
    },
    {
      slug: "brunch",
      label: "Brunch",
      title: "Brunch plates",
      description: "Steak, seafood, chicken, and vegetarian mains that feel like weekend restaurant brunch.",
      cover: topicCovers.brunch
    },
    {
      slug: "beef",
      label: "Beef",
      title: "Beef recipes",
      description: "Fried rice, stir-fries, soups, and rice bowls for solo dinners and lunch boxes.",
      cover: topicCovers.beef
    },
    {
      slug: "pasta",
      label: "Pasta",
      title: "Pasta hub",
      description: "Pesto, garlic, tomato, and cream sauces—from chicken to seafood in one place.",
      cover: topicCovers.pasta
    },
    {
      slug: "restaurant-replicas",
      label: "Replica",
      title: "Restaurant replicas",
      description: "Recreate signature dishes from famous Taiwanese restaurants with full steps and plating.",
      cover: topicCovers["restaurant-replicas"]
    }
  ],
  scenarioDescriptions: {
    "one-person-meal": "Everyday cooking for one person without extra pots or side dishes.",
    "ten-minute-meals": "Short workflows when you are busy and need dinner on the table fast.",
    "high-protein-meals": "Main dishes built around chicken breast, tofu, eggs, and other protein staples.",
    "weight-loss-meals": "Lighter, satisfying plates with vegetables and lean proteins.",
    "bento-meals": "Recipes that pack well for lunch boxes or batch prep.",
    "budget-meals": "Affordable staples turned into filling solo meals."
  }
};

const ja: HomePageContent = {
  metaDescription:
    "今晚煮什麼｜Bloom Kitchen は冷蔵庫の食材から、今夜作れる台湾の家庭料理を素早く見つけられるレシピサイトです。",
  heroEyebrow: "今晚煮什麼",
  heroTitle: "まず冷蔵庫を見て、今夜の料理を決める",
  heroCopy: "手持ちの食材を 1〜3 個入力すると、今夜作れるレシピを絞り込めます。",
  searchLabel: "手持ちの食材を入力",
  searchPlaceholder: "卵、豆腐、キャベツ",
  searchSubmit: "今夜作れる料理を探す",
  searchErrorEmpty: "食材を 1〜3 個入力してください。",
  searchErrorMax: "ホーム検索は最大 3 個までです。食材を減らして再試行してください。",
  quickIngredientsAriaLabel: "よく使う食材ショートカット",
  scenariosEyebrow: "料理シーン",
  scenariosTitle: "今夜の状況から選ぶ",
  featuredEyebrow: "おすすめレシピ",
  featuredTitle: "今夜はここから",
  viewAllRecipes: "すべてのレシピを見る",
  topicHubsEyebrow: "特集",
  topicHubsTitle: "気分に合わせてキッチンの片隅へ",
  enterTopicHub: "特集へ →",
  ingredientsEyebrow: "よく使う食材",
  ingredientsTitle: "定番食材から料理を探す",
  topicHubs: [
    {
      slug: "quick-meals",
      label: "Quick",
      title: "10分料理",
      description: "忙しい平日の夜や夜食に。炒飯・麺・快手主菜まで。",
      cover: topicCovers["quick-meals"]
    },
    {
      slug: "air-fryer",
      label: "Air Fryer",
      title: "エアフライヤー",
      description: "鶏肉・海鮮・野菜の一人分主菜を、あまり鍋を見なくても完成。",
      cover: topicCovers["air-fryer"]
    },
    {
      slug: "brunch",
      label: "Brunch",
      title: "ブランチ",
      description: "ステーキ、海鮮、鶏肉、卵料理の主菜で週末のレストラン気分。",
      cover: topicCovers.brunch
    },
    {
      slug: "beef",
      label: "Beef",
      title: "牛肉料理",
      description: "炒飯、炒め物、スープ、丼もの。一人分の夕食やお弁当に。",
      cover: topicCovers.beef
    },
    {
      slug: "pasta",
      label: "Pasta",
      title: "パスタ",
      description: "ジェノベーゼ、ガーリック、トマト、クリームソースをまとめて。",
      cover: topicCovers.pasta
    },
    {
      slug: "restaurant-replicas",
      label: "Replica",
      title: "名店再現",
      description: "台湾の有名レストランの代表料理を、手順と盛り付けごと再現。",
      cover: topicCovers["restaurant-replicas"]
    }
  ],
  scenarioDescriptions: {
    "one-person-meal": "一人分を、余計な鍋や副菜なしでさっと作る日常料理。",
    "ten-minute-meals": "忙しい日に、短い手順で素早く食卓を整えるコレクション。",
    "high-protein-meals": "鶏胸肉、豆腐、卵など高タンパク食材を中心にした主菜。",
    "weight-loss-meals": "さっぱりしていて満足感のある、負担の少ない主菜と副菜。",
    "bento-meals": "お弁当やまとめ作りに向いたレシピ。",
    "budget-meals": "身近で安い食材で、しっかり食べられる一人分の料理。"
  }
};

const ko: HomePageContent = {
  metaDescription:
    "今晚煮什麼｜Bloom Kitchen은 냉장고 재료로 오늘 밤 만들 수 있는 대만 가정식 레시피를 빠르게 찾아줍니다.",
  heroEyebrow: "今晚煮什麼",
  heroTitle: "냉장고를 먼저 보고, 오늘 저녁을 정하세요",
  heroCopy: "가지고 있는 재료 1~3가지를 입력하면 오늘 만들 수 있는 요리를 골라 드립니다.",
  searchLabel: "가진 재료 입력",
  searchPlaceholder: "달걀, 두부, 양배추",
  searchSubmit: "오늘 만들 수 있는 요리 찾기",
  searchErrorEmpty: "재료를 1~3가지 입력해 주세요.",
  searchErrorMax: "홈 검색은 최대 3가지 재료까지입니다. 목록을 줄여 주세요.",
  quickIngredientsAriaLabel: "빠른 재료 바로가기",
  scenariosEyebrow: "요리 상황",
  scenariosTitle: "오늘 밤 상황에 맞게 고르기",
  featuredEyebrow: "추천 레시피",
  featuredTitle: "오늘 밤은 여기서 시작",
  viewAllRecipes: "전체 레시피 보기",
  topicHubsEyebrow: "테마 허브",
  topicHubsTitle: "기분에 맞는 작은 주방 코너로",
  enterTopicHub: "허브로 이동 →",
  ingredientsEyebrow: "자주 쓰는 재료",
  ingredientsTitle: "상비 재료로 요리 찾기",
  topicHubs: [
    {
      slug: "quick-meals",
      label: "Quick",
      title: "10분 요리",
      description: "바쁜 평일 저녁과 야식. 볶음밥, 면, 빠른 메인 요리까지.",
      cover: topicCovers["quick-meals"]
    },
    {
      slug: "air-fryer",
      label: "Air Fryer",
      title: "에어프라이어",
      description: "닭고기, 해산물, 채소로 만드는 1인분 메인을 손이 덜 가게.",
      cover: topicCovers["air-fryer"]
    },
    {
      slug: "brunch",
      label: "Brunch",
      title: "브런치",
      description: "스테이크, 해산물, 닭고기, 계란 요리로 주말 레스토랑 분위기.",
      cover: topicCovers.brunch
    },
    {
      slug: "beef",
      label: "Beef",
      title: "소고기 요리",
      description: "볶음밥, 볶음, 국물, 덮밥. 1인 저녁과 도시락에 맞는 요리.",
      cover: topicCovers.beef
    },
    {
      slug: "pasta",
      label: "Pasta",
      title: "파스타",
      description: "페스토, 마늘, 토마토, 크림 소스를 한곳에서.",
      cover: topicCovers.pasta
    },
    {
      slug: "restaurant-replicas",
      label: "Replica",
      title: "맛집 재현",
      description: "대만 유명 레스토랑 대표 메뉴를 단계와 플레이팅까지 재현.",
      cover: topicCovers["restaurant-replicas"]
    }
  ],
  scenarioDescriptions: {
    "one-person-meal": "여분의 냄비나 반찬 없이 한 사람 분을 빠르게 만드는 집밥.",
    "ten-minute-meals": "바쁜 날 빠르게 식사를 차릴 때 좋은 짧은 레시피 모음.",
    "high-protein-meals": "닭가슴살, 두부, 달걀 등 고단백 재료 중심의 메인 요리.",
    "weight-loss-meals": "가볍지만 든든한 채소와 단백질 위주의 요리.",
    "bento-meals": "도시락이나 미리 준비해 두기 좋은 요리.",
    "budget-meals": "흔하고 저렴한 재료로 만드는 든든한 1인 식사."
  }
};

const byLocale: Record<Locale, HomePageContent> = {
  "zh-TW": zhTW,
  en,
  ja,
  ko
};

export function getHomePage(locale: Locale): HomePageContent {
  return byLocale[locale];
}
