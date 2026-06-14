import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scenarioPath = path.join(rootDir, "src/data/scenarios.json");
const topicHubPath = path.join(rootDir, "src/data/topic-hubs.json");
const ingredientPath = path.join(rootDir, "src/data/ingredients.json");

const scenarioLocaleCopy = {
  "one-person-meal": {
    en: {
      description: "Home-style dishes that are easy to make for one without juggling multiple pots or side dishes.",
      seoTitle: "Cooking for One Recipes | Easy Dinners for Solo Living",
      seoDescription: "Browse cooking-for-one ideas with eggs, tofu, leftover rice, and other quick dinner staples.",
      tags: ["Single serving", "Home cooking", "Low effort"]
    },
    ja: {
      description: "鍋や副菜をたくさん用意しなくても、一人分を手早く作れる家庭料理です。",
      seoTitle: "一人分の料理レシピ | 一人暮らしに合う簡単夕食",
      seoDescription: "卵、豆腐、残りご飯などを使った、一人分の料理アイデアをまとめました。",
      tags: ["一人分", "家庭料理", "手軽"]
    },
    ko: {
      description: "여러 냄비나 반찬 준비 없이 혼자 먹기 좋게 빠르게 만들 수 있는 집밥 요리입니다.",
      seoTitle: "1인 요리 레시피 | 자취생을 위한 간단한 저녁",
      seoDescription: "달걀, 두부, 남은 밥 등으로 만드는 1인분 집밥 레시피를 모았습니다.",
      tags: ["1인분", "집밥", "간편"]
    }
  },
  "ten-minute-meals": {
    en: {
      description: "A collection of short-step meals for the days you are busy and need dinner fast.",
      seoTitle: "10-Minute Meal Recipes | Quick Home Dinners",
      seoDescription: "When you need dinner fast, start with 10-minute meals using eggs, tomatoes, tofu, and other pantry basics.",
      tags: ["Quick", "Weeknight dinner", "Time-saving"]
    },
    ja: {
      description: "忙しい日にさっと食べたいときに役立つ、短い工程で作れる料理のまとめです。",
      seoTitle: "10分料理レシピ | 手早く作れる家庭の夕食",
      seoDescription: "卵、トマト、豆腐などの定番食材で、すぐ作れる10分料理を集めました。",
      tags: ["時短", "平日ごはん", "手軽"]
    },
    ko: {
      description: "바쁜 날에도 빠르게 식사를 차릴 수 있는 짧은 조리 과정의 요리 모음입니다.",
      seoTitle: "10분 요리 레시피 | 빠르게 완성하는 집밥 저녁",
      seoDescription: "달걀, 토마토, 두부 같은 기본 재료로 빠르게 만들 수 있는 10분 요리를 모았습니다.",
      tags: ["빠른 요리", "평일 저녁", "시간 절약"]
    }
  },
  "high-protein-meals": {
    en: {
      description: "Everyday main dishes built around high-protein staples such as chicken breast, tofu, and eggs.",
      seoTitle: "High-Protein Recipes | Easy Chicken Breast and Tofu Meals",
      seoDescription: "Find satisfying high-protein meals with chicken breast, eggs, tofu, and other simple everyday ingredients.",
      tags: ["High protein", "Fitness", "Main dish"]
    },
    ja: {
      description: "鶏むね肉、豆腐、卵などの高タンパク食材を中心にした、毎日作りやすい主菜です。",
      seoTitle: "高タンパク料理レシピ | 鶏むね肉と豆腐の簡単ごはん",
      seoDescription: "鶏むね肉、卵、豆腐などで作る、満足感のある高タンパク料理をまとめました。",
      tags: ["高タンパク", "筋トレ", "主菜"]
    },
    ko: {
      description: "닭가슴살, 두부, 달걀 같은 고단백 재료를 중심으로 한 일상용 메인 요리입니다.",
      seoTitle: "고단백 요리 레시피 | 닭가슴살과 두부로 만드는 간단한 식사",
      seoDescription: "닭가슴살, 달걀, 두부로 만드는 든든한 고단백 집밥 레시피를 모았습니다.",
      tags: ["고단백", "운동식", "메인 요리"]
    }
  },
  "weight-loss-meals": {
    en: {
      description: "Light, satisfying meals built around clean flavors, good volume, and a lighter everyday feel.",
      seoTitle: "Light & Lean Recipes | Fresh and Filling Home Cooking",
      seoDescription: "Start your light and lean meal planning with chicken breast, broccoli, mushrooms, and other lighter staples.",
      tags: ["Light", "Fresh", "High fiber"]
    },
    ja: {
      description: "さっぱりした味わいでボリューム感もあり、日々の負担を抑えやすい料理シーンです。",
      seoTitle: "低脂質レシピ | さっぱり食べ応えのある家庭料理",
      seoDescription: "鶏むね肉、ブロッコリー、きのこなどから探せる、軽やかな料理をまとめました。",
      tags: ["低脂質", "さっぱり", "食物繊維"]
    },
    ko: {
      description: "산뜻한 맛과 충분한 포만감을 갖추면서도 비교적 가볍게 먹기 좋은 요리 모음입니다.",
      seoTitle: "다이어트 요리 레시피 | 산뜻하면서 든든한 집밥",
      seoDescription: "닭가슴살, 브로콜리, 버섯처럼 가볍게 활용하기 좋은 재료로 찾는 다이어트 요리입니다.",
      tags: ["다이어트", "산뜻함", "고식이섬유"]
    }
  },
  "bento-meals": {
    en: {
      description: "Recipes that hold up well for make-ahead packing and still taste good after reheating the next day.",
      seoTitle: "Bento-Friendly Recipes | Make-Ahead Home-Style Main Dishes",
      seoDescription: "Find lunchbox-friendly dishes with chicken breast, mushrooms, reliable staples, and easy weekday pairings.",
      tags: ["Lunchbox", "Packable", "Workday"]
    },
    ja: {
      description: "作り置きして詰めやすく、翌日に温め直しても食感が保ちやすい料理です。",
      seoTitle: "お弁当向けレシピ | 作り置きしてもおいしい家庭の主菜",
      seoDescription: "蒸し鶏、きのこの副菜、定番の主食合わせなど、お弁当に向く料理をまとめました。",
      tags: ["お弁当", "詰めやすい", "平日"]
    },
    ko: {
      description: "미리 준비해 나눠 담기 좋고, 다음 날 다시 데워도 식감이 잘 유지되는 요리입니다.",
      seoTitle: "도시락 반찬 레시피 | 미리 준비해도 맛있는 집밥 메인 메뉴",
      seoDescription: "닭가슴살, 버섯 반찬, 든든한 주식 조합 등 도시락으로 챙기기 좋은 요리를 모았습니다.",
      tags: ["도시락", "소분 가능", "평일"]
    }
  },
  "budget-meals": {
    en: {
      description: "Weeknight meals built from pantry staples and a little seasoning to help keep food costs under control.",
      seoTitle: "Budget-Friendly Recipes | Home Dinners with Eggs and Tofu",
      seoDescription: "When you want to spend less, start with eggs, tofu, leftover rice, and other affordable kitchen staples.",
      tags: ["Budget", "Home cooking", "Pantry staples"]
    },
    ja: {
      description: "常備食材と少ない調味料で作れて、食費を抑えたい平日に向く料理です。",
      seoTitle: "節約レシピ | 卵と豆腐で作る家庭の夕食",
      seoDescription: "食費を抑えたいときに、卵、豆腐、残りご飯などから探しやすい料理をまとめました。",
      tags: ["節約", "家庭料理", "常備菜"]
    },
    ko: {
      description: "기본 식재료와 적은 양념만으로 만들 수 있어 식비를 아끼고 싶은 평일에 잘 맞는 요리입니다.",
      seoTitle: "알뜰 요리 레시피 | 달걀과 두부로 만드는 집밥 저녁",
      seoDescription: "식비를 줄이고 싶을 때 달걀, 두부, 남은 밥 같은 기본 재료로 찾기 좋은 요리입니다.",
      tags: ["절약", "집밥", "상비 반찬"]
    }
  },
  "fridge-cleanout-meals": {
    en: {
      description: "Flexible meals for using up odds and ends in the fridge and turning what you already have into a meal.",
      seoTitle: "Use-Up-the-Fridge Recipes | Make a Meal from What You Have",
      seoDescription: "When only a few ingredients are left, start here for flexible fridge-cleanout ideas that cut waste and planning stress.",
      tags: ["Use-it-up", "Leftovers", "Flexible"]
    },
    ja: {
      description: "冷蔵庫に残った半端な食材を優先して使い切り、今ある材料で一食にまとめる料理です。",
      seoTitle: "冷蔵庫整理レシピ | あるもので作る今日の一皿",
      seoDescription: "食材が少しずつ残った日に、無駄を減らしながら気軽に作れる冷蔵庫整理料理をまとめました。",
      tags: ["使い切り", "残りもの", "自由に組み合わせ"]
    },
    ko: {
      description: "냉장고에 조금씩 남은 재료를 우선 소진하면서 있는 재료로 한 끼를 만드는 요리입니다.",
      seoTitle: "냉장고 정리 레시피 | 집에 있는 재료로 만드는 한 끼",
      seoDescription: "재료가 조금씩 남았을 때 음식물 낭비와 장보기 부담을 줄여 주는 냉장고 정리 요리를 모았습니다.",
      tags: ["냉장고 털기", "남은 재료", "유연한 조합"]
    }
  },
  "air-fryer-meals": {
    en: {
      description: "Air fryer ideas that cut down on stove watching while still delivering quick mains and side dishes.",
      seoTitle: "Air Fryer Recipes | Quick Main Dishes with Less Stove Watching",
      seoDescription: "Use the air fryer to speed up dinner with salmon, chicken breast, broccoli, and other easy combinations.",
      tags: ["Air fryer", "Hands-off", "Quick main dish"]
    },
    ja: {
      description: "エアフライヤーでつきっきり時間を減らし、主菜も副菜も手早く作れる料理です。",
      seoTitle: "エアフライヤーレシピ | 見張りを減らせる手軽な主菜",
      seoDescription: "サーモン、鶏むね肉、ブロッコリーなどで作る、手早いエアフライヤー料理をまとめました。",
      tags: ["エアフライヤー", "ほったらかし", "時短主菜"]
    },
    ko: {
      description: "에어프라이어로 불 앞에 오래 서 있지 않아도 메인과 사이드를 빠르게 완성할 수 있는 요리입니다.",
      seoTitle: "에어프라이어 요리 레시피 | 덜 지켜봐도 되는 빠른 메인 메뉴",
      seoDescription: "연어, 닭가슴살, 브로콜리 같은 재료로 식사 준비를 빠르게 끝내는 에어프라이어 레시피입니다.",
      tags: ["에어프라이어", "덜 지켜봄", "빠른 메인"]
    }
  },
  "electric-pot-meals": {
    en: {
      description: "Electric-pot meals that can handle both the main dish and the side, perfect for small kitchens and busy weekdays.",
      seoTitle: "Electric Pot Recipes | Easy One-Person Home Cooking",
      seoDescription: "Find one-person electric-pot meals such as steamed chicken breast, braised tofu, and simple soups for weekday dinners.",
      tags: ["Electric pot", "Hands-off", "Small-space cooking"]
    },
    ja: {
      description: "電気鍋ひとつで主食とおかずをまとめて作れ、小さなキッチンや平日に向く料理です。",
      seoTitle: "電気鍋レシピ | 一人分で作りやすい家庭料理",
      seoDescription: "蒸し鶏むね肉、豆腐の煮物、簡単スープなど、一人分の電気鍋料理をまとめました。",
      tags: ["電気鍋", "ほったらかし", "省スペース調理"]
    },
    ko: {
      description: "전기냄비 하나로 주식과 반찬을 함께 만들 수 있어 작은 주방과 평일 식사 준비에 잘 맞는 요리입니다.",
      seoTitle: "전기냄비 요리 레시피 | 1인분 집밥에 좋은 간편 메뉴",
      seoDescription: "찐 닭가슴살, 두부 조림, 간단한 국물 요리 등 1인분 전기냄비 레시피를 모았습니다.",
      tags: ["전기냄비", "방치 조리", "소형 주방"]
    }
  },
  "leftover-rice-meals": {
    en: {
      description: "Turn yesterday's rice into fried rice, rice bowls, or savory pancakes for a faster, less wasteful meal.",
      seoTitle: "Leftover Rice Recipes | Quick Fried Rice and Rice Bowl Ideas",
      seoDescription: "Use leftover rice for fried rice, rice bowls, and egg pancakes that make an easy one-person meal in around 10 minutes.",
      tags: ["Leftover rice", "Use-it-up", "Quick fix"]
    },
    ja: {
      description: "前日のご飯を炒飯、丼、焼きものに変えて、無駄を減らしながら手早く食べられる料理です。",
      seoTitle: "残りご飯レシピ | 炒飯や丼に変える時短ごはん",
      seoDescription: "冷蔵庫に残りご飯がある日に、炒飯、丼、卵焼き風で一人分を素早く作れる料理をまとめました。",
      tags: ["残りご飯", "使い切り", "時短"]
    },
    ko: {
      description: "어제 남은 밥을 볶음밥, 덮밥, 전처럼 바꿔 음식물 낭비를 줄이면서 빠르게 한 끼를 만들 수 있는 요리입니다.",
      seoTitle: "남은 밥 요리 레시피 | 볶음밥과 덮밥으로 빠르게 완성",
      seoDescription: "냉장고에 밥이 남아 있을 때 볶음밥, 덮밥, 달걀전으로 10분 안팎에 만들기 좋은 레시피입니다.",
      tags: ["남은 밥", "냉장고 털기", "간단 조리"]
    }
  },
  "late-night-meals": {
    en: {
      description: "Lighter one-person meals for late at night when you want something filling but not too greasy or complicated.",
      seoTitle: "Late-Night Recipes | Fast One-Person Suppers",
      seoDescription: "Browse lighter late-night meals like noodle soups, fried rice, and easy one-pot dishes with short cooking steps.",
      tags: ["Late night", "Light", "Single serving"]
    },
    ja: {
      description: "夜遅くに小腹を満たしたいときに向く、重すぎず工程も多すぎない一人分の料理です。",
      seoTitle: "夜食レシピ | 深夜でも手早く作れる一人分ごはん",
      seoDescription: "汁麺、炒飯、小鍋料理など、手順が短くて重すぎない夜食向けレシピをまとめました。",
      tags: ["夜食", "軽め", "一人分"]
    },
    ko: {
      description: "늦은 밤에 출출할 때 너무 기름지거나 복잡하지 않게 만들 수 있는 가벼운 1인분 요리입니다.",
      seoTitle: "야식 레시피 | 밤에도 빠르게 만드는 1인분 식사",
      seoDescription: "국수, 볶음밥, 간단한 냄비 요리처럼 조리 단계가 짧고 부담이 덜한 야식 레시피를 모았습니다.",
      tags: ["야식", "가벼움", "1인분"]
    }
  },
  "meatless-meals": {
    en: {
      description: "Meat-free one-person dishes built around eggs, tofu, vegetables, and mushrooms without heavy cooking.",
      seoTitle: "Meatless Recipes | Eggs, Tofu, and Vegetables for One",
      seoDescription: "Start with tofu, eggs, mushrooms, and vegetables for meatless meals that still feel filling on a busy night.",
      tags: ["Meatless", "Vegetarian-friendly", "Vegetables"]
    },
    ja: {
      description: "卵、豆腐、野菜、きのこを中心にした、強火に頼らず作りやすい一人分の料理です。",
      seoTitle: "肉なしレシピ | 卵と豆腐と野菜で作る一人分ごはん",
      seoDescription: "豆腐、卵、きのこ、野菜を使って、平日でも満足感のある肉なし料理を探せます。",
      tags: ["肉なし", "卵乳菜食", "野菜"]
    },
    ko: {
      description: "달걀, 두부, 채소, 버섯을 중심으로 하여 센 불 없이도 든든하게 만들 수 있는 1인분 요리입니다.",
      seoTitle: "무고기 요리 레시피 | 달걀과 두부, 채소로 만드는 1인 식사",
      seoDescription: "두부, 달걀, 버섯, 채소로 평일 저녁에도 든든하게 먹기 좋은 무고기 레시피를 모았습니다.",
      tags: ["고기 없음", "채식 친화", "채소"]
    }
  }
};

const topicHubLocaleCopy = {
  pasta: {
    en: {
      description: "Explore garlic, tomato, pesto, cream, meat, and seafood pasta recipes, including easy pesto chicken, salmon, and shrimp ideas for small kitchens.",
      seoTitle: "Pasta Recipe Hub | Pesto, Seafood, and Easy Weeknight Pasta",
      seoDescription: "The pasta hub collects pesto chicken, pesto salmon, pesto shrimp, garlic, and tomato pasta ideas for one-person dinners.",
      tags: ["Single serving", "Quick cook", "Pesto", "Seafood"]
    },
    ja: {
      description: "にんにく、トマト、ジェノベーゼ、クリーム、肉系、魚介系のパスタをまとめた特集で、小さなキッチンでも作りやすい内容です。",
      seoTitle: "パスタレシピ特集 | ジェノベーゼと魚介と手早い家パスタ",
      seoDescription: "ジェノベーゼチキン、サーモン、えび、にんにく、トマトなど、一人分のパスタレシピをまとめました。",
      tags: ["一人分", "時短", "ジェノベーゼ", "魚介"]
    },
    ko: {
      description: "마늘, 토마토, 페스토, 크림, 고기, 해산물 파스타를 모은 전용 허브로, 작은 주방에서도 만들기 좋은 레시피를 담았습니다.",
      seoTitle: "파스타 레시피 허브 | 페스토와 해산물, 평일용 간편 파스타",
      seoDescription: "페스토 치킨, 페스토 연어, 페스토 새우, 마늘, 토마토 파스타 등 1인분 저녁에 좋은 레시피를 모았습니다.",
      tags: ["1인분", "빠른 조리", "페스토", "해산물"]
    }
  },
  beef: {
    en: {
      description: "A beef-focused collection with fried rice, rice bowls, quick stir-fries, soups, and pan-seared mains that fit small kitchens and weeknight dinners.",
      seoTitle: "Beef Recipe Hub | Home-Style Fried Rice, Soups, and Weeknight Beef",
      seoDescription: "The beef hub gathers onion beef rice bowls, garlic beef slices, beef fried rice, and soup ideas for one-person meals.",
      tags: ["Single serving", "High protein", "Home-style beef"]
    },
    ja: {
      description: "炒飯や丼、さっと炒める副菜、スープ、焼き物まで、一人分で作りやすい牛肉料理をまとめた特集です。",
      seoTitle: "牛肉レシピ特集 | 炒飯・炒め物・スープの家庭牛肉料理",
      seoDescription: "ねぎ入り牛肉炒飯、玉ねぎ牛丼、にんにく牛肉炒め、牛肉スープなどの一人分レシピをまとめました。",
      tags: ["一人分", "高タンパク", "家庭の牛肉料理"]
    },
    ko: {
      description: "볶음밥, 덮밥, 빠른 볶음반찬, 국물 요리, 구이 메인까지 작은 주방과 평일 저녁에 맞는 소고기 요리 모음입니다.",
      seoTitle: "소고기 레시피 허브 | 볶음밥, 국물, 집밥 소고기 메뉴",
      seoDescription: "파 소고기 볶음밥, 양파 소고기 덮밥, 마늘 소고기 볶음, 소고기 수프 등 1인분 레시피를 모았습니다.",
      tags: ["1인분", "고단백", "집밥 소고기"]
    }
  },
  brunch: {
    en: {
      description: "A brunch collection of one-person plates, from surf-and-turf and steak to salmon, cod, and vegetarian options for a more special at-home meal.",
      seoTitle: "Brunch Recipe Hub | Steak, Seafood, Chicken, and Home Brunch Plates",
      seoDescription: "The brunch hub gathers steak, roasted salmon, smoked salmon, seafood plates, and soft egg dishes for weekend cooking at home.",
      tags: ["Single serving", "Weekend", "Brunch"]
    },
    ja: {
      description: "海陸の盛り合わせ、ステーキ、サーモン、タラ、卵や野菜中心の一皿まで、一人分のブランチ主皿を集めた特集です。",
      seoTitle: "ブランチレシピ特集 | ステーキ・魚介・鶏肉の家ブランチ",
      seoDescription: "ステーキ、ローストサーモン、スモークサーモン、やわらか卵料理など、週末に楽しみたいブランチをまとめました。",
      tags: ["一人分", "週末", "ブランチ"]
    },
    ko: {
      description: "해산물과 고기를 곁들인 한 접시, 스테이크, 연어, 대구, 달걀 중심 메뉴까지 집에서 조금 특별하게 즐기기 좋은 브런치 모음입니다.",
      seoTitle: "브런치 레시피 허브 | 스테이크, 해산물, 치킨 홈 브런치",
      seoDescription: "스테이크, 구운 연어, 훈제 연어, 부드러운 달걀 요리 등 주말 한 끼에 어울리는 브런치 메뉴를 모았습니다.",
      tags: ["1인분", "주말", "브런치"]
    }
  },
  "air-fryer": {
    en: {
      description: "A hub for one-person air fryer mains and sides that let you finish dinner or meal prep with less hands-on stove time.",
      seoTitle: "Air Fryer Recipe Hub | Easy One-Person Main Dishes",
      seoDescription: "The air fryer hub includes salmon, chicken breast, wings, tofu, and vegetables that work well for weekday dinners and lunch boxes.",
      tags: ["Air fryer", "Hands-off", "Single serving"]
    },
    ja: {
      description: "エアフライヤーで作る一人分の主菜と副菜を集めた特集で、夕食やお弁当準備を手軽に進められます。",
      seoTitle: "エアフライヤーレシピ特集 | 一人分の手軽な主菜",
      seoDescription: "サーモン、鶏むね肉、手羽先、豆腐、野菜など、平日ごはんに合うエアフライヤー料理をまとめました。",
      tags: ["エアフライヤー", "ほったらかし", "一人分"]
    },
    ko: {
      description: "에어프라이어로 만드는 1인분 메인과 사이드를 모은 허브로, 저녁이나 도시락 준비를 더 수월하게 해 줍니다.",
      seoTitle: "에어프라이어 레시피 허브 | 1인분 메인 요리 모음",
      seoDescription: "연어, 닭가슴살, 닭날개, 두부, 채소 등 평일 저녁과 도시락에 잘 맞는 에어프라이어 요리를 모았습니다.",
      tags: ["에어프라이어", "덜 손감", "1인분"]
    }
  },
  "restaurant-replicas": {
    en: {
      description: "A collection that recreates signature dishes from famous Taiwanese restaurants with full steps, sauce ratios, and serving style instead of shortcut versions.",
      seoTitle: "Restaurant Replica Recipe Hub | Recreating Signature Taiwanese Dishes",
      seoDescription: "The restaurant replica hub covers signature dishes inspired by well-known Taiwanese restaurants, with full process notes and home-kitchen adaptations.",
      tags: ["Restaurant replica", "Taiwanese cuisine", "Michelin-inspired"]
    },
    ja: {
      description: "台湾の有名店やミシュラン掲載店の看板料理を、工程やたれの比率、盛り付け量まで含めて再現する特集です。",
      seoTitle: "名店再現レシピ特集 | 台湾の人気店と代表料理を家庭で再現",
      seoDescription: "台湾の有名店をイメージした代表料理を、工程を省かずに家庭向けへ落とし込んだ再現レシピです。",
      tags: ["名店再現", "台湾料理", "ミシュラン風"]
    },
    ko: {
      description: "대만의 유명 식당과 미슐랭 식당 대표 메뉴를 공정, 소스 비율, 담음새까지 살려 재현하는 레시피 모음입니다.",
      seoTitle: "맛집 재현 레시피 허브 | 대만 대표 요리를 집에서 재현",
      seoDescription: "대만 유명 식당의 대표 메뉴를 집에서도 재현할 수 있도록 공정과 비율을 자세히 담은 레시피 허브입니다.",
      tags: ["맛집 재현", "대만 요리", "미슐랭 감성"]
    }
  },
  "quick-meals": {
    en: {
      description: "A hub for one-person meals that come together in about 10 to 15 minutes, ideal for busy weeknights and late suppers.",
      seoTitle: "10-Minute Recipe Hub | Fast One-Person Dinners",
      seoDescription: "The quick-meals hub gathers fried rice, mixed noodles, soups, and fast mains built around eggs, tofu, and pantry-friendly staples.",
      tags: ["10 minutes", "Quick fix", "Single serving"]
    },
    ja: {
      description: "10分から15分ほどで作れる一人分料理を集めた特集で、忙しい平日や夜食にも向いています。",
      seoTitle: "10分料理特集 | 一人分で手早く作れる夕食",
      seoDescription: "炒飯、和え麺、スープ、手早い主菜など、卵や豆腐を使ってすぐ作れる料理をまとめました。",
      tags: ["10分", "時短", "一人分"]
    },
    ko: {
      description: "10분에서 15분 안팎으로 완성되는 1인분 요리를 모은 허브로, 바쁜 평일 저녁과 야식에 잘 맞습니다.",
      seoTitle: "10분 요리 허브 | 빠르게 만드는 1인분 저녁",
      seoDescription: "볶음밥, 비빔면, 국물, 빠른 메인 요리 등 달걀과 두부, 상비 재료로 만들기 좋은 메뉴를 모았습니다.",
      tags: ["10분", "간단 조리", "1인분"]
    }
  }
};

const ingredientLocaleCopy = {
  egg: {
    en: {
      description: "Eggs are one of the most versatile home-cooking staples, perfect for stir-fries, steamed dishes, rice bowls, and lunch boxes.",
      storage: "Keep refrigerated and avoid the fridge door, where temperatures fluctuate the most."
    },
    ja: {
      description: "卵は家庭料理で最も使いやすい定番食材の一つで、炒め物、蒸し物、ご飯もの、お弁当に幅広く使えます。",
      storage: "冷蔵保存し、温度変化の大きいドアポケットは避けてください。"
    },
    ko: {
      description: "달걀은 가장 흔하고 활용도가 높은 집밥 재료로, 볶음, 찜, 덮밥, 도시락 반찬에 두루 잘 어울립니다.",
      storage: "냉장 보관하고, 온도 변화가 큰 냉장고 문 쪽은 피하세요."
    }
  },
  tofu: {
    en: {
      description: "Tofu is affordable and versatile, making it especially useful for cooking for one and protein-rich home meals.",
      storage: "After opening, keep tofu refrigerated in clean water and finish it within 1 to 2 days for the best flavor."
    },
    ja: {
      description: "豆腐は手頃で使い道が広く、一人分の料理や高タンパクの家庭料理に特に便利です。",
      storage: "開封後は清水に浸して冷蔵し、風味が安定しているうちに1〜2日で使い切るのがおすすめです。"
    },
    ko: {
      description: "두부는 가격 부담이 적고 활용 범위가 넓어 1인 요리와 고단백 집밥에 특히 잘 맞습니다.",
      storage: "개봉 후에는 깨끗한 물에 담가 냉장 보관하고, 맛이 가장 안정적인 1~2일 안에 먹는 것이 좋습니다."
    }
  },
  beef: {
    en: {
      description: "Beef brings rich flavor and solid protein, making it great for stir-fries, rice bowls, easy soups, and pan-seared meals for one.",
      storage: "Use refrigerated beef within 1 to 2 days, or portion and freeze it for longer storage."
    },
    ja: {
      description: "牛肉は旨みが強くタンパク質も豊富で、炒め物、丼、簡単なスープ、焼き物の一人分料理に向いています。",
      storage: "冷蔵なら1〜2日以内に使い、長く保存したい場合は小分けして冷凍してください。"
    },
    ko: {
      description: "소고기는 풍미가 진하고 단백질이 많아 볶음, 덮밥, 간단한 국물, 구이 한 끼 메뉴에 잘 어울립니다.",
      storage: "냉장 보관한 소고기는 1~2일 안에 조리하고, 더 오래 보관하려면 소분해 냉동하세요."
    }
  },
  "chicken-breast": {
    en: {
      description: "Chicken breast is a lean, high-protein staple that works well for lunch boxes and lighter everyday meals.",
      storage: "Keep refrigerated for up to 2 days, and freeze in portions if you will not cook it the same day."
    },
    ja: {
      description: "鶏むね肉は高タンパクで軽く食べやすい定番食材で、お弁当や軽めの食事に向いています。",
      storage: "冷蔵で2日ほど保存でき、当日使わない場合は小分けして冷凍するのがおすすめです。"
    },
    ko: {
      description: "닭가슴살은 고단백이면서 부담이 적은 대표 단백질 재료로, 도시락과 가벼운 식사에 잘 맞습니다.",
      storage: "냉장으로는 2일 정도 보관 가능하며, 당일 조리하지 않을 경우 소분해 냉동하는 것이 좋습니다."
    }
  },
  tomato: {
    en: {
      description: "Tomatoes add acidity, sweetness, and moisture, helping simple home dishes come together quickly.",
      storage: "Refrigerate once ripe and avoid bruising; for better flavor, let tomatoes sit at room temperature before chilling."
    },
    ja: {
      description: "トマトは酸味と甘み、水分を加えてくれるので、家庭料理の味を手早く整えやすい食材です。",
      storage: "熟したら冷蔵し、傷つけないように保存します。風味を残したいときは室温に置いてから冷蔵してください。"
    },
    ko: {
      description: "토마토는 산미와 단맛, 촉촉함을 더해 간단한 집밥의 맛을 빠르게 잡아 주는 재료입니다.",
      storage: "익은 뒤에는 냉장 보관하고 눌리지 않게 두세요. 풍미를 살리고 싶다면 잠시 실온에 두었다가 냉장하세요."
    }
  },
  pasta: {
    en: {
      description: "Pasta is quick to cook and easy to store, making it a dependable base for garlic, tomato, or creamy one-person dinners.",
      storage: "Store unopened pasta in a cool, dry place; once opened, seal it tightly to keep out moisture."
    },
    ja: {
      description: "パスタは調理が早く保存もしやすいため、にんにく、トマト、クリーム系の一人分夕食に便利な主食です。",
      storage: "未開封は冷暗所、開封後は湿気を避けてしっかり密封して保存してください。"
    },
    ko: {
      description: "파스타는 빨리 익고 보관도 쉬워 마늘, 토마토, 크림 소스 계열의 1인 저녁에 쓰기 좋은 주식입니다.",
      storage: "개봉 전에는 서늘하고 건조한 곳에 두고, 개봉 후에는 밀봉해 습기를 피하세요."
    }
  },
  noodles: {
    en: {
      description: "Noodles are a familiar staple for soups and saucy dishes, and they turn into an easy meal once paired with broth or seasoning.",
      storage: "Keep unopened noodles in a cool, dry place, and seal them well after opening to prevent moisture and clumping."
    },
    ja: {
      description: "麺は汁物や味つけ麺に使いやすい定番主食で、スープやたれと合わせるだけで一食になります。",
      storage: "未開封は冷暗所で、開封後は湿気による固まりを防ぐためにしっかり密封してください。"
    },
    ko: {
      description: "국수는 국물 요리와 양념 면에 두루 쓰이는 기본 주식으로, 육수나 양념만 있으면 한 끼로 만들기 쉽습니다.",
      storage: "개봉 전에는 서늘하고 건조한 곳에 보관하고, 개봉 후에는 습기와 뭉침을 막도록 잘 밀봉하세요."
    }
  },
  udon: {
    en: {
      description: "Udon has a satisfying chew and holds up well in soups, stir-fries, and cozy one-person dinners.",
      storage: "Keep unopened udon in a cool, dry place; refrigerate after opening and use it soon."
    },
    ja: {
      description: "うどんは厚みのある食感でのびにくく、汁物、焼きうどん、温かい一人分の食事に向いています。",
      storage: "未開封は冷暗所、開封後は密封して冷蔵し、早めに使い切ってください。"
    },
    ko: {
      description: "우동은 두툼하고 쫄깃한 식감이 있어 국물, 볶음, 따뜻한 1인분 식사에 잘 어울립니다.",
      storage: "개봉 전에는 서늘하고 건조한 곳에 두고, 개봉 후에는 밀봉해 냉장 보관하며 빨리 드세요."
    }
  },
  "guanmiao-noodles": {
    en: {
      description: "Guanmiao noodles are a classic Tainan-style dried noodle that works well in simple soups or tossed noodle dishes.",
      storage: "Store unopened noodles in a cool, dry place; once opened, seal them tightly to protect them from moisture."
    },
    ja: {
      description: "関廟麺は台南で親しまれる乾麺で、和え麺にも汁麺にも使いやすい家庭向けの主食です。",
      storage: "未開封は冷暗所、開封後は湿気を避けてしっかり密封してください。"
    },
    ko: {
      description: "관묘면은 타이난에서 친숙한 건면으로, 비빔면과 국물면 모두에 잘 어울리는 집밥용 면입니다.",
      storage: "개봉 전에는 서늘하고 건조한 곳에 두고, 개봉 후에는 습기를 막도록 잘 밀봉하세요."
    }
  },
  rice: {
    en: {
      description: "Cooked rice is one of the most dependable staples and works well for fried rice, rice bowls, and lunch boxes.",
      storage: "Let cooked rice cool before refrigerating, and reheat it within a day for the best texture and flavor."
    },
    ja: {
      description: "ご飯は最も定番の主食で、炒飯、丼、お弁当など幅広い料理の土台になります。",
      storage: "炊いたご飯は冷ましてから冷蔵し、1日以内に温め直すと風味が保ちやすいです。"
    },
    ko: {
      description: "밥은 가장 기본이 되는 주식으로, 볶음밥, 덮밥, 도시락까지 다양하게 활용할 수 있습니다.",
      storage: "지은 밥은 식힌 뒤 냉장 보관하고, 하루 안에 다시 데워 먹는 것이 맛과 식감이 좋습니다."
    }
  },
  scallion: {
    en: {
      description: "Scallions add fragrance fast and make simple dishes feel more complete with very little effort.",
      storage: "Wrap scallions in a paper towel and refrigerate them to extend freshness and reduce excess moisture."
    },
    ja: {
      description: "ねぎは香りをすばやく足してくれるので、簡単な料理でも仕上がり感を出しやすい食材です。",
      storage: "キッチンペーパーで包んで冷蔵すると、鮮度が保ちやすく水気も抑えられます。"
    },
    ko: {
      description: "대파는 향을 빠르게 더해 주어 간단한 요리도 완성도 있게 느껴지게 해 주는 재료입니다.",
      storage: "키친타월로 감싸 냉장 보관하면 신선함이 더 오래 가고 수분도 덜 찹니다."
    }
  },
  mushroom: {
    en: {
      description: "Mushrooms deepen savory flavor and show up often in lunch boxes, electric-pot meals, and lighter dishes.",
      storage: "Keep mushrooms refrigerated and dry, since trapped moisture will make them release water and lose texture."
    },
    ja: {
      description: "きのこはうま味を補いやすく、お弁当、電気鍋料理、軽めの献立によく使われます。",
      storage: "冷蔵しつつ乾いた状態を保ち、水気がこもって食感が落ちないようにしてください。"
    },
    ko: {
      description: "버섯은 감칠맛을 더해 주어 도시락 반찬, 전기냄비 요리, 가벼운 식단에 자주 쓰입니다.",
      storage: "냉장 보관하되 건조하게 유지하세요. 수분이 차면 물이 생기고 식감이 떨어집니다."
    }
  },
  broccoli: {
    en: {
      description: "Broccoli is a favorite in lunch boxes and lighter meals because it adds fiber, color, and satisfying volume.",
      storage: "Keep broccoli dry in the refrigerator, and wash it only before cooking to help it last longer."
    },
    ja: {
      description: "ブロッコリーは食物繊維とボリューム感を足しやすく、お弁当や軽めの食事によく合います。",
      storage: "冷蔵中は乾いた状態を保ち、洗うのは調理直前にすると長持ちしやすくなります。"
    },
    ko: {
      description: "브로콜리는 식이섬유와 푸짐한 느낌을 더해 주어 도시락과 가벼운 식사에 자주 쓰입니다.",
      storage: "냉장 보관할 때는 물기를 최대한 줄이고, 씻는 것은 조리 직전에 하는 편이 더 오래 갑니다."
    }
  },
  cabbage: {
    en: {
      description: "Cabbage stores well and pairs with almost anything, making it a dependable choice for stir-fries, soups, and fridge-cleanout meals.",
      storage: "A whole cabbage keeps well in the refrigerator; once cut, wrap it and use it within about 3 days."
    },
    ja: {
      description: "キャベツは日持ちしやすく合わせやすいため、炒め物、スープ、冷蔵庫整理メニューに便利です。",
      storage: "丸ごとなら冷蔵で比較的長持ちします。切った後は包んで、3日ほどで使い切るのがおすすめです。"
    },
    ko: {
      description: "양배추는 오래 두기 쉽고 어디에나 잘 어울려 볶음, 국물, 냉장고 털기 요리에 좋은 기본 채소입니다.",
      storage: "통째로는 냉장 보관 시 비교적 오래 가고, 자른 뒤에는 잘 감싸서 3일 안에 쓰는 것이 좋습니다."
    }
  },
  onion: {
    en: {
      description: "Onions bring sweetness and aroma, making them a strong flavor base for skillet dishes, air fryer meals, and soups.",
      storage: "Store whole onions in a cool, ventilated place; refrigerate cut onions and use them soon."
    },
    ja: {
      description: "玉ねぎは甘みと香りを出してくれるので、フライパン料理、エアフライヤー料理、スープの土台に向いています。",
      storage: "丸ごとは風通しのよい冷暗所で保存し、切った後は冷蔵して早めに使ってください。"
    },
    ko: {
      description: "양파는 단맛과 향을 더해 팬 요리, 에어프라이어 요리, 국물 요리의 바탕 맛을 잡아 줍니다.",
      storage: "통양파는 서늘하고 통풍이 되는 곳에 두고, 자른 양파는 냉장 보관 후 빨리 사용하세요."
    }
  },
  carrot: {
    en: {
      description: "Carrots keep well, are easy to prep, and add gentle sweetness to soups, stir-fries, and lunch box sides.",
      storage: "Dry the surface before refrigerating to help preserve both crunch and sweetness."
    },
    ja: {
      description: "にんじんは日持ちしやすく切りやすいため、スープ、お弁当の副菜、家庭の炒め物に使いやすい野菜です。",
      storage: "表面の水気を取ってから冷蔵すると、歯ざわりと甘みを保ちやすくなります。"
    },
    ko: {
      description: "당근은 오래 두기 쉽고 손질도 쉬워 국, 도시락 반찬, 집반찬 볶음에 자주 쓰이는 채소입니다.",
      storage: "겉면의 물기를 제거한 뒤 냉장 보관하면 아삭함과 단맛을 더 오래 유지할 수 있습니다."
    }
  },
  daikon: {
    en: {
      description: "Daikon radish is juicy and mildly sweet, making it a good fit for soups, braises, and simple side dishes.",
      storage: "Whole daikon lasts well in the refrigerator; once cut, wrap it and finish it within about 3 days."
    },
    ja: {
      description: "大根はみずみずしくやさしい甘みがあり、煮物、スープ、漬け物風の副菜に向いています。",
      storage: "丸ごとなら冷蔵で比較的長持ちし、切った後は包んで3日ほどで使い切ってください。"
    },
    ko: {
      description: "무는 수분이 많고 은은한 단맛이 있어 국물, 조림, 간단한 반찬에 잘 어울립니다.",
      storage: "통째로는 냉장 보관 시 비교적 오래 가고, 자른 뒤에는 잘 감싸 3일 안에 사용하는 것이 좋습니다."
    }
  },
  garlic: {
    en: {
      description: "Garlic quickly boosts aroma and depth, making it a reliable helper for stir-fries and protein-forward main dishes.",
      storage: "Keep whole garlic in a cool, ventilated place, and use chopped garlic as soon as possible."
    },
    ja: {
      description: "にんにくは香りの層を手早く増やしてくれるので、炒め物やタンパク質メインの料理に欠かせません。",
      storage: "皮つきのままなら風通しのよい場所で保存し、刻んだ後は早めに使い切ってください。"
    },
    ko: {
      description: "마늘은 향과 풍미를 빠르게 끌어올려 주어 볶음 요리와 단백질 메인 메뉴에 특히 유용합니다.",
      storage: "껍질째는 서늘하고 통풍이 되는 곳에 두고, 다진 뒤에는 가능한 빨리 사용하는 것이 좋습니다."
    }
  },
  shrimp: {
    en: {
      description: "Shrimp cooks quickly and has a naturally sweet seafood flavor, making it great for garlic pasta, pesto dishes, and fast mains.",
      storage: "Cook refrigerated shrimp the same day when possible, or freeze it in portions and cook promptly after thawing."
    },
    ja: {
      description: "えびは火の通りが早く甘みもあり、にんにく系やジェノベーゼのパスタ、手早い主菜に向いています。",
      storage: "冷蔵ならできるだけ当日に調理し、保存する場合は小分け冷凍して解凍後はすぐ加熱してください。"
    },
    ko: {
      description: "새우는 익는 속도가 빠르고 단맛이 좋아 마늘 파스타, 페스토 요리, 간단한 메인 메뉴에 잘 맞습니다.",
      storage: "냉장 새우는 가능한 한 당일 조리하고, 보관이 필요하면 소분 냉동한 뒤 해동 후 바로 익히세요."
    }
  },
  salmon: {
    en: {
      description: "Salmon is an easy main protein that turns into a full meal quickly with an air fryer or oven.",
      storage: "Use refrigerated salmon the same day or the next day, or freeze it in portions if you need to keep it longer."
    },
    ja: {
      description: "サーモンはシンプルな主菜にしやすく、エアフライヤーやオーブンがあれば一食を手早く仕上げられます。",
      storage: "冷蔵なら当日または翌日までに使い、先延ばしする場合は小分けして冷凍してください。"
    },
    ko: {
      description: "연어는 메인 요리로 만들기 쉬운 재료로, 에어프라이어와 오븐을 쓰면 한 끼를 빠르게 완성할 수 있습니다.",
      storage: "냉장 연어는 당일이나 다음 날까지 조리하고, 더 미룰 경우에는 소분해 냉동하세요."
    }
  },
  potato: {
    en: {
      description: "Potatoes keep well and work in many formats, from air-fried sides to stews and one-person comfort meals.",
      storage: "Store unwashed potatoes in a cool, ventilated place; once cut, refrigerate and cook them soon."
    },
    ja: {
      description: "じゃがいもは日持ちしやすく、エアフライヤーの副菜、煮込み料理、一人分の主食風メニューまで幅広く使えます。",
      storage: "洗っていない状態で風通しのよい冷暗所に置き、切った後は冷蔵して早めに調理してください。"
    },
    ko: {
      description: "감자는 오래 두기 쉽고 활용 범위가 넓어 에어프라이어 사이드, 조림, 든든한 1인 식사에 모두 잘 어울립니다.",
      storage: "씻지 않은 감자는 서늘하고 통풍이 되는 곳에 두고, 자른 뒤에는 냉장 보관 후 빨리 조리하세요."
    }
  },
  bacon: {
    en: {
      description: "Bacon adds deep savory aroma to pasta, stir-fries, and quick side dishes even in small amounts.",
      storage: "Refrigerate after opening and use within 3 to 5 days, or freeze portions to keep it longer."
    },
    ja: {
      description: "ベーコンは少量でも香りとコクが出るため、パスタ、炒め物、副菜に使いやすい食材です。",
      storage: "開封後は冷蔵し、3〜5日ほどで使い切るか、小分け冷凍して保存してください。"
    },
    ko: {
      description: "베이컨은 적은 양으로도 짭조름한 풍미를 더해 파스타, 볶음, 간단한 반찬에 잘 어울립니다.",
      storage: "개봉 후에는 냉장 보관하고 3~5일 안에 사용하거나, 소분 냉동해 더 오래 보관하세요."
    }
  },
  cod: {
    en: {
      description: "Cod has a delicate texture and mild flavor, which makes it a good choice for pan-searing, roasting, and lighter main dishes.",
      storage: "Cook refrigerated cod the same day if possible, and seal it well before freezing to prevent it from drying out."
    },
    ja: {
      description: "タラは身がやわらかく風味も穏やかで、焼き物やエアフライヤー向けの軽めの主菜に向いています。",
      storage: "冷蔵ならできるだけ当日に調理し、冷凍する場合は乾燥を防ぐようしっかり密封してください。"
    },
    ko: {
      description: "대구는 살이 부드럽고 비린 향이 적어 팬 구이, 오븐, 가벼운 메인 메뉴에 잘 어울립니다.",
      storage: "냉장 보관한 대구는 가능한 한 당일 조리하고, 냉동할 때는 마르지 않도록 단단히 밀봉하세요."
    }
  },
  "chicken-wings": {
    en: {
      description: "Chicken wings are perfect for the air fryer or oven and make a satisfying late-night or snack-style meal for one.",
      storage: "Cook within 1 to 2 days if refrigerated, and portion wings before freezing for easier one-person meals."
    },
    ja: {
      description: "手羽先はエアフライヤーやオーブンに向いていて、夜食や小さめの主菜として満足感があります。",
      storage: "冷蔵なら1〜2日以内に調理し、冷凍する前に一人分ずつ小分けしておくと便利です。"
    },
    ko: {
      description: "닭날개는 에어프라이어나 오븐에 잘 맞아 야식이나 간단한 한 끼 메인 메뉴로 만족감이 좋습니다.",
      storage: "냉장이라면 1~2일 안에 조리하고, 냉동 전에는 1인분씩 나눠 두면 사용하기 편합니다."
    }
  },
  "sweet-potato": {
    en: {
      description: "Sweet potatoes bring natural sweetness and work well in air-fried, steamed, or simple one-person side dishes.",
      storage: "Keep sweet potatoes in a cool, ventilated place for several days; refrigerate cut pieces and use them soon."
    },
    ja: {
      description: "さつまいもは甘みがはっきりしていて、エアフライヤー、蒸し料理、主食代わりの副菜に向いています。",
      storage: "風通しのよい場所で数日保存でき、切った後は冷蔵して早めに使ってください。"
    },
    ko: {
      description: "고구마는 단맛이 분명해 에어프라이어, 찜 요리, 든든한 1인분 사이드 메뉴에 잘 어울립니다.",
      storage: "서늘하고 통풍이 되는 곳에 며칠 보관할 수 있고, 자른 뒤에는 냉장 후 빨리 드세요."
    }
  },
  okra: {
    en: {
      description: "Okra cooks quickly and works well in air-fried or lightly stir-fried side dishes for a lighter meal.",
      storage: "Refrigerate okra and cook it within about 3 days to keep the texture at its best."
    },
    ja: {
      description: "オクラは火の通りが早く、エアフライヤーやさっと炒める副菜にすると軽やかに仕上がります。",
      storage: "冷蔵保存し、食感を保つため3日ほどで調理するのがおすすめです。"
    },
    ko: {
      description: "오크라는 빨리 익어 에어프라이어나 가벼운 볶음 반찬으로 만들기 좋은 산뜻한 채소입니다.",
      storage: "냉장 보관하고 식감을 유지하려면 3일 안에 조리하는 것이 좋습니다."
    }
  },
  corn: {
    en: {
      description: "Corn adds sweetness and works well in air fryer sides, quick stir-fries, soups, and rice bowls.",
      storage: "Keep corn refrigerated, and use cut kernels within about 2 days."
    },
    ja: {
      description: "とうもろこしは甘みがあり、エアフライヤーの副菜、炒め物、スープ、丼ものに使いやすい食材です。",
      storage: "冷蔵保存し、実を外した後は2日ほどで使い切るのがおすすめです。"
    },
    ko: {
      description: "옥수수는 단맛이 좋아 에어프라이어 사이드, 볶음, 국물, 덮밥에 두루 잘 어울립니다.",
      storage: "냉장 보관하고, 알갱이를 떼어낸 뒤에는 2일 안에 사용하는 것이 좋습니다."
    }
  },
  kimchi: {
    en: {
      description: "Kimchi brings bright heat and tang, making it perfect for fried rice, mixed noodles, and quick Korean-style meals.",
      storage: "Keep kimchi refrigerated, and avoid letting other foods pick up its strong aroma after opening."
    },
    ja: {
      description: "キムチは酸味と辛みで食欲を引き立て、炒飯、和え麺、韓国風の手早い一人分料理に向いています。",
      storage: "冷蔵保存し、開封後はほかの食材に香りが移らないように注意してください。"
    },
    ko: {
      description: "김치는 새콤하고 매콤한 맛으로 볶음밥, 비빔면, 빠른 한식풍 1인 요리에 잘 어울립니다.",
      storage: "냉장 보관하고, 개봉 후에는 다른 식재료에 냄새가 배지 않도록 주의하세요."
    }
  },
  mackerel: {
    en: {
      description: "Mackerel is rich and flavorful, making it a strong choice for pan-seared or air-fried one-person main dishes.",
      storage: "Cook refrigerated mackerel the same day when possible; lemon or ginger helps if the fish smells strong."
    },
    ja: {
      description: "サバは脂がのって風味も濃く、焼き物やエアフライヤー向けの一人分主菜に向いています。",
      storage: "冷蔵ならできるだけ当日に調理し、においが気になるときはレモンやしょうがを合わせてください。"
    },
    ko: {
      description: "고등어는 기름기가 풍부하고 맛이 진해 팬 구이나 에어프라이어용 1인분 메인 메뉴에 잘 맞습니다.",
      storage: "냉장 고등어는 가능한 한 당일 조리하고, 비린 향이 강하면 레몬이나 생강을 곁들이세요."
    }
  },
  pork: {
    en: {
      description: "Pork is versatile and works well in stir-fries, teriyaki-style dishes, rice bowls, and lunch box mains.",
      storage: "Use refrigerated pork within 1 to 2 days, or freeze it in portions for longer storage."
    },
    ja: {
      description: "豚肉は使い道が広く、炒め物、照り焼き、丼、お弁当の主菜まで幅広く活躍します。",
      storage: "冷蔵なら1〜2日以内に使い、長く保存する場合は小分けして冷凍してください。"
    },
    ko: {
      description: "돼지고기는 활용도가 높아 볶음, 데리야키풍 반찬, 덮밥, 도시락 메인 반찬까지 폭넓게 쓰입니다.",
      storage: "냉장 보관한 돼지고기는 1~2일 안에 사용하고, 오래 두려면 소분해 냉동하세요."
    }
  },
  "canned-tuna": {
    en: {
      description: "Canned tuna is ready to use straight from the pantry, making it great for quick rice bowls, salads, and low-cost meals.",
      storage: "Keep unopened cans in a cool place; once opened, refrigerate and finish within 1 to 2 days."
    },
    ja: {
      description: "ツナ缶は開けてすぐ使えるので、丼、サラダ、手早い節約ごはんに便利です。",
      storage: "未開封は冷暗所で保存し、開封後は冷蔵して1〜2日で使い切ってください。"
    },
    ko: {
      description: "참치 통조림은 바로 사용할 수 있어 덮밥, 샐러드, 저렴하고 빠른 한 끼 메뉴에 잘 맞습니다.",
      storage: "개봉 전에는 서늘한 곳에 두고, 개봉 후에는 냉장 보관해 1~2일 안에 드세요."
    }
  },
  "green-pepper": {
    en: {
      description: "Green bell peppers stay crisp in the pan and work well with meats in fast home-style stir-fries.",
      storage: "Keep refrigerated and avoid crushing them; once cut, try to use them within about 2 days."
    },
    ja: {
      description: "ピーマンは炒めても歯ざわりが残りやすく、肉と合わせた家庭の炒め物に向いています。",
      storage: "冷蔵保存し、つぶれないように置いてください。切った後は2日ほどで使い切るのがおすすめです。"
    },
    ko: {
      description: "피망은 볶아도 아삭함이 남아 고기와 함께하는 집반찬 볶음에 잘 어울립니다.",
      storage: "냉장 보관하고 눌리지 않게 두세요. 자른 뒤에는 2일 안에 쓰는 편이 좋습니다."
    }
  },
  cucumber: {
    en: {
      description: "Cucumbers are crisp and juicy, making them a fresh match for salads, cold noodles, and quick dressed sides.",
      storage: "Refrigerate cucumbers and keep them away from ethylene-producing fruit so they do not soften too quickly."
    },
    ja: {
      description: "きゅうりはみずみずしく歯ざわりがよく、サラダ、冷たい麺、あえる副菜にぴったりです。",
      storage: "冷蔵保存し、エチレンを出す果物と離して置くとやわらかくなりにくくなります。"
    },
    ko: {
      description: "오이는 아삭하고 수분이 많아 샐러드, 냉면류, 간단한 무침 반찬에 잘 어울립니다.",
      storage: "냉장 보관하고 에틸렌을 내는 과일과 떨어뜨려 두면 물러지는 속도를 줄일 수 있습니다."
    }
  },
  zucchini: {
    en: {
      description: "Zucchini is quick to cook and full of moisture, which makes it useful for stir-fries, air fryer sides, and lighter meals.",
      storage: "Refrigerate zucchini, keep it from trapping too much moisture, and use cut pieces soon."
    },
    ja: {
      description: "ズッキーニは水分が多く火の通りも早いので、炒め物、エアフライヤー、副菜、軽めの料理に使いやすいです。",
      storage: "冷蔵保存し、蒸れすぎないようにして、切った後は早めに使ってください。"
    },
    ko: {
      description: "주키니는 수분이 많고 빨리 익어 볶음, 에어프라이어 사이드, 가벼운 요리에 잘 어울립니다.",
      storage: "냉장 보관하되 습기가 차지 않게 하고, 자른 뒤에는 빨리 조리하세요."
    }
  },
  ginger: {
    en: {
      description: "Ginger cuts through richness and removes unwanted odors, making it a common aromatic for meat dishes and soups.",
      storage: "Keep unpeeled ginger refrigerated; once peeled, seal it well and use it soon."
    },
    ja: {
      description: "しょうがは臭みを抑えて香りを立ててくれるので、肉料理、煮込み、スープでよく使われます。",
      storage: "皮つきのままなら冷蔵でき、皮をむいた後は密封して早めに使ってください。"
    },
    ko: {
      description: "생강은 잡내를 줄이고 향을 살려 주어 고기 볶음, 조림, 국물 요리에서 자주 쓰이는 향신 재료입니다.",
      storage: "껍질째는 냉장 보관하고, 껍질을 벗긴 뒤에는 밀봉해 가능한 빨리 사용하세요."
    }
  },
  shallot: {
    en: {
      description: "Shallots have a concentrated aroma and are often used to build the base flavor of braises and savory sauces.",
      storage: "Store whole shallots in a ventilated spot; refrigerate them after cutting and use them soon."
    },
    ja: {
      description: "エシャロットは香りが濃く、煮込みや肉そぼろのような料理の土台の香りづけによく使われます。",
      storage: "丸ごとは風通しのよい場所に置き、切った後は冷蔵して早めに使ってください。"
    },
    ko: {
      description: "샬롯은 향이 진해 조림이나 다진 고기 양념처럼 바탕 풍미를 잡는 요리에 자주 쓰입니다.",
      storage: "통째로는 통풍이 되는 곳에 두고, 자른 뒤에는 냉장 보관 후 빨리 사용하세요."
    }
  },
  "basil-taiwan": {
    en: {
      description: "Thai basil has a distinctive fragrance and is a signature finishing herb in many Taiwanese stir-fries.",
      storage: "Wrap Thai basil in a paper towel and refrigerate it so excess moisture does not make it wilt too quickly."
    },
    ja: {
      description: "ホーロクバジルは香りが個性的で、台湾の炒め物を仕上げる定番のハーブです。",
      storage: "キッチンペーパーで包んで冷蔵し、水気で傷まないようにしてください。"
    },
    ko: {
      description: "타이 바질은 향이 뚜렷해 대만식 볶음 요리의 마무리를 살려 주는 대표 허브입니다.",
      storage: "키친타월로 감싸 냉장 보관해 수분 때문에 무르지 않도록 하세요."
    }
  },
  ham: {
    en: {
      description: "Ham is ready to use straight from the package and quickly adds savory flavor and protein to eggs, fried rice, and lunch boxes.",
      storage: "Keep unopened ham refrigerated, and finish it within 2 to 3 days after opening."
    },
    ja: {
      description: "ハムは袋から出してすぐ使え、卵料理、炒飯、お弁当に塩気とタンパク質を手早く足せます。",
      storage: "未開封でも冷蔵し、開封後は2〜3日以内に使い切ってください。"
    },
    ko: {
      description: "햄은 바로 사용할 수 있어 달걀요리, 볶음밥, 도시락 반찬에 짭조름한 맛과 단백질을 빠르게 더해 줍니다.",
      storage: "개봉 전에도 냉장 보관하고, 개봉 후에는 2~3일 안에 먹는 것이 좋습니다."
    }
  },
  "fish-ball": {
    en: {
      description: "Fish balls are easy to keep on hand and add quick substance to noodle soups, hot pots, and simple soup meals.",
      storage: "Keep fish balls refrigerated for 2 to 3 days, or freeze them longer; they do not need to thaw completely before cooking."
    },
    ja: {
      description: "魚団子は煮崩れしにくく、汁麺、鍋、手早いスープに数個入れるだけで満足感が出ます。",
      storage: "冷蔵なら2〜3日、冷凍ならより長く保存できます。調理前に完全解凍する必要はありません。"
    },
    ko: {
      description: "어묵·물고기 완자는 오래 두기 좋고 국수, 전골, 간단한 국물 요리에 넣으면 금방 든든해집니다.",
      storage: "냉장으로는 2~3일, 냉동하면 더 오래 보관할 수 있으며 조리 전 완전히 해동하지 않아도 됩니다."
    }
  },
  cheese: {
    en: {
      description: "Cheese adds rich dairy depth to pasta, roasted vegetables, and egg dishes, making it a handy extra for Western-style home cooking.",
      storage: "Keep unopened cheese refrigerated, and finish it within about a week after opening while sealed well."
    },
    ja: {
      description: "チーズはパスタ、焼き野菜、卵料理に濃厚なコクを足してくれるので、洋風の家庭料理で重宝します。",
      storage: "未開封でも冷蔵し、開封後はしっかり密封して1週間ほどで使い切ってください。"
    },
    ko: {
      description: "치즈는 파스타, 구운 채소, 달걀요리에 진한 유제품 풍미를 더해 서양식 집밥에 두루 유용합니다.",
      storage: "개봉 전후 모두 냉장 보관하고, 개봉 후에는 밀봉해 1주일 안에 먹는 것이 좋습니다."
    }
  },
  "instant-noodles": {
    en: {
      description: "Instant noodles are fast and flexible, making them perfect for late-night meals, budget dishes, or quick upgrades with eggs and vegetables.",
      storage: "Store instant noodles in a cool, dry place and keep them away from moisture."
    },
    ja: {
      description: "インスタント麺は調理が早くアレンジもしやすいので、夜食や節約ごはん、卵や野菜を足す一杯に向いています。",
      storage: "湿気を避けて冷暗所で保存してください。"
    },
    ko: {
      description: "라면은 조리가 빠르고 응용하기 쉬워 야식, 절약 식사, 달걀과 채소를 더한 간단한 한 끼에 잘 맞습니다.",
      storage: "서늘하고 건조한 곳에 보관해 습기를 피하세요."
    }
  },
  "bok-choy": {
    en: {
      description: "Bok choy cooks quickly and stays tender, making it one of the most common green vegetables in Taiwanese home cooking.",
      storage: "Wrap bok choy in a paper towel and refrigerate it; for the best flavor, use it within 2 to 3 days."
    },
    ja: {
      description: "チンゲン菜は火の通りが早くやわらかく仕上がるので、台湾の家庭料理でよく使われる青菜です。",
      storage: "キッチンペーパーで包んで冷蔵し、風味のよい2〜3日以内に使うのがおすすめです。"
    },
    ko: {
      description: "청경채는 빨리 익고 부드럽게 익어 대만 집밥에서 자주 쓰이는 대표적인 초록 채소입니다.",
      storage: "키친타월로 감싸 냉장 보관하고, 맛이 좋을 때인 2~3일 안에 사용하는 것이 좋습니다."
    }
  },
  "dried-tofu": {
    en: {
      description: "Dried tofu is firm, affordable, and protein-rich, making it useful for lunch box sides and savory snacks for one.",
      storage: "Keep dried tofu refrigerated and finish it within 3 to 4 days after opening."
    },
    ja: {
      description: "厚揚げは炒めても煮ても崩れにくく、タンパク質も多いため、お弁当や小さなおかずに向いています。",
      storage: "冷蔵保存し、開封後は3〜4日以内に使い切ってください。"
    },
    ko: {
      description: "건두부는 볶음과 조림에 잘 버티고 단백질도 높아 도시락 반찬과 간단한 술안주용 1인 요리에 좋습니다.",
      storage: "냉장 보관하고, 개봉 후에는 3~4일 안에 드세요."
    }
  },
  pumpkin: {
    en: {
      description: "Pumpkin is naturally sweet and creamy, making it a good match for electric-pot dishes, soups, and simple roasted sides.",
      storage: "Whole pumpkin keeps for several days in a cool place; once cut, wrap it and refrigerate it until cooking."
    },
    ja: {
      description: "かぼちゃは自然な甘みとなめらかな食感があり、電気鍋料理、ポタージュ、焼き副菜に向いています。",
      storage: "丸ごとは涼しい場所で数日保存でき、切った後は包んで冷蔵し、早めに調理してください。"
    },
    ko: {
      description: "호박은 자연스러운 단맛과 포슬한 식감이 있어 전기냄비 요리, 수프, 간단한 구이 반찬에 잘 맞습니다.",
      storage: "통째로는 서늘한 곳에 며칠 둘 수 있고, 자른 뒤에는 랩으로 감싸 냉장 후 빨리 조리하세요."
    }
  },
  clam: {
    en: {
      description: "Clams add a deep seafood sweetness and are easy to use in soups, noodle dishes, and quick Taiwanese-style stir-fries.",
      storage: "Clams are best cooked the day you buy them; if needed, chill them on ice briefly and avoid trapping them in a closed container."
    },
    ja: {
      description: "あさりはだしのような旨みが強く、澄まし汁、麺料理、台湾風のさっと炒める料理に使いやすいです。",
      storage: "購入当日に調理するのが理想で、少し置く場合は氷を当てて冷蔵し、密閉しすぎないようにしてください。"
    },
    ko: {
      description: "조개는 감칠맛이 깊어 맑은 국물, 면 요리, 대만식 빠른 볶음 요리에 넣기 좋은 해산물입니다.",
      storage: "구입한 날 바로 조리하는 것이 가장 좋고, 잠시 둘 때는 얼음을 깔아 냉장하며 너무 밀폐하지 마세요."
    }
  },
  "green-bean": {
    en: {
      description: "Green beans stay crisp in the pan and are a fast option for garlicky stir-fries and lunch box sides.",
      storage: "Keep green beans refrigerated and dry, and use them within about 3 to 4 days."
    },
    ja: {
      description: "いんげんは炒めても歯ざわりが残りやすく、にんにく炒めやお弁当の副菜に便利です。",
      storage: "冷蔵しつつ乾いた状態を保ち、3〜4日ほどで使い切ってください。"
    },
    ko: {
      description: "강낭콩은 볶아도 아삭함이 살아 있어 마늘 볶음과 도시락 반찬으로 빠르게 만들기 좋습니다.",
      storage: "냉장 보관하면서 물기를 줄이고, 3~4일 안에 사용하는 것이 좋습니다."
    }
  },
  "cherry-tomato": {
    en: {
      description: "Cherry tomatoes are juicy and bright, making them useful for salads, pasta sides, and quick flavor boosts in small portions.",
      storage: "Keep cherry tomatoes refrigerated and avoid crushing them; once opened, use them soon."
    },
    ja: {
      description: "ミニトマトは酸味と甘みがあり、サラダ、パスタの付け合わせ、少量の彩りづけに便利です。",
      storage: "冷蔵保存し、つぶれないように置いて、開封後は早めに使ってください。"
    },
    ko: {
      description: "방울토마토는 상큼하고 달콤해 샐러드, 파스타 곁들임, 소량의 맛 보강용으로 쓰기 좋습니다.",
      storage: "냉장 보관하고 눌리지 않게 두며, 개봉 후에는 빨리 드세요."
    }
  },
  milk: {
    en: {
      description: "Milk forms the base of cream sauces, soups, and tender pan-cooked dishes in many Western-style home recipes.",
      storage: "Keep milk refrigerated and finish it within about 3 days after opening."
    },
    ja: {
      description: "牛乳はホワイトソース、スープ、やわらかな焼き料理のベースになり、洋風の家庭料理でよく使われます。",
      storage: "冷蔵保存し、開封後は3日ほどで飲み切るか料理に使い切ってください。"
    },
    ko: {
      description: "우유는 화이트소스, 수프, 부드러운 팬 요리의 바탕이 되어 서양식 집밥에서 자주 쓰입니다.",
      storage: "냉장 보관하고, 개봉 후에는 3일 안에 마시거나 조리에 사용하는 것이 좋습니다."
    }
  },
  squid: {
    en: {
      description: "Squid has a clean sweetness and cooks quickly, making it great for stir-fries, brief boiling, and pasta dishes for one.",
      storage: "Squid is best cooked the day you buy it, and should be kept chilled and dry if you need to wait."
    },
    ja: {
      description: "いかは甘みがあり扱いやすく、さっと炒める料理、下ゆで、パスタなど一人分でも使いやすい食材です。",
      storage: "購入当日に調理するのが理想で、少し置く場合は冷蔵しつつできるだけ乾いた状態を保ってください。"
    },
    ko: {
      description: "오징어는 단맛이 있고 다루기 쉬워 빠른 볶음, 데침, 파스타 같은 1인분 요리에 잘 맞습니다.",
      storage: "구입한 날 조리하는 것이 가장 좋고, 잠시 보관할 때는 냉장하면서 물기가 차지 않게 두세요."
    }
  },
  "preserved-radish": {
    en: {
      description: "Preserved radish is salty and aromatic, and it turns into a classic Taiwanese home dish when stir-fried with eggs.",
      storage: "Keep unopened preserved radish in a cool, dry place; once opened, seal and refrigerate it to prevent moisture."
    },
    ja: {
      description: "菜脯は塩気とうま味があり、卵と炒めるだけで台湾らしい定番のおかずになります。",
      storage: "未開封は冷暗所で保存し、開封後は湿気を避けるため密封して冷蔵してください。"
    },
    ko: {
      description: "무말랭이는 짭조름하고 감칠맛이 있어 달걀과 볶기만 해도 대만식 집반찬이 되는 재료입니다.",
      storage: "개봉 전에는 서늘하고 건조한 곳에 두고, 개봉 후에는 습기를 막기 위해 밀봉해 냉장하세요."
    }
  },
  "rice-vermicelli": {
    en: {
      description: "Rice vermicelli cooks quickly and absorbs flavor well, making it a popular Taiwanese staple for soups and stir-fries.",
      storage: "Keep rice vermicelli sealed in a cool, dry place to protect it from moisture."
    },
    ja: {
      description: "ビーフンは火が通りやすく味も入りやすいため、汁ビーフンや炒めビーフンに向く台湾でなじみ深い主食です。",
      storage: "湿気を避けて密封し、冷暗所で保存してください。"
    },
    ko: {
      description: "쌀국수는 빨리 익고 양념이 잘 배어 국물과 볶음 요리에 모두 어울리는 대만식 면 주식입니다.",
      storage: "밀봉한 상태로 서늘하고 건조한 곳에 두어 습기를 막아 주세요."
    }
  },
  "cured-pork": {
    en: {
      description: "Cured pork has a concentrated aroma and adds a lot of flavor to fried rice, steamed sides, and pasta with only a small amount.",
      storage: "Keep cured pork refrigerated or frozen, and blanch slices first if you want to soften the saltiness before cooking."
    },
    ja: {
      description: "臘肉は香りが濃く、炒飯、蒸し料理、パスタに少量入れるだけでもしっかり味が決まります。",
      storage: "冷蔵または冷凍で保存し、塩気をやわらげたいときは調理前にさっと下ゆでしてください。"
    },
    ko: {
      description: "라육은 향이 진해 볶음밥, 찜 반찬, 파스타에 조금만 넣어도 풍미가 확 살아납니다.",
      storage: "냉장이나 냉동으로 보관하고, 짠맛이 강하면 조리 전에 살짝 데쳐 사용하세요."
    }
  },
  "water-spinach": {
    en: {
      description: "Water spinach is a classic Taiwanese leafy vegetable that comes together quickly with garlic or fermented tofu.",
      storage: "Wrap water spinach in a paper towel and refrigerate it, then use it within 2 to 3 days."
    },
    ja: {
      description: "空芯菜は台湾でとても親しまれている葉物野菜で、にんにく炒めや腐乳炒めにすると手早く仕上がります。",
      storage: "キッチンペーパーで包んで冷蔵し、2〜3日以内に使い切ってください。"
    },
    ko: {
      description: "공심채는 대만에서 아주 친숙한 잎채소로, 마늘 볶음이나 발효두부 볶음으로 빠르게 만들기 좋습니다.",
      storage: "키친타월로 감싸 냉장 보관하고, 2~3일 안에 사용하는 것이 좋습니다."
    }
  },
  "chives-garlic": {
    en: {
      description: "Garlic chives have a distinct aroma and quickly lift egg dishes, dumpling fillings, and noodle stir-fries.",
      storage: "Keep garlic chives refrigerated and dry so they do not trap moisture and wilt."
    },
    ja: {
      description: "ニラは香りがはっきりしていて、卵料理、餃子の具、炒め麺に少量加えるだけで味が立ちます。",
      storage: "冷蔵保存し、蒸れないように乾いた状態を保ってください。"
    },
    ko: {
      description: "부추는 향이 뚜렷해 달걀요리, 만두소, 볶음면에 조금만 넣어도 맛이 확 살아납니다.",
      storage: "냉장 보관하면서 물기가 차지 않게 해 무르지 않도록 하세요."
    }
  },
  eggplant: {
    en: {
      description: "Eggplant absorbs flavor well and works for garlicky braises, minced meat dishes, or lighter air fryer versions.",
      storage: "Refrigerate eggplant carefully to avoid bruising, and cook it soon after cutting."
    },
    ja: {
      description: "なすは味をよく吸うので、にんにく焼き、ひき肉煮、少ない油のエアフライヤー料理に向いています。",
      storage: "傷つけないように冷蔵し、切った後は早めに調理してください。"
    },
    ko: {
      description: "가지는 양념을 잘 흡수해 마늘 조림, 다진 고기 요리, 기름을 줄인 에어프라이어 버전에 잘 어울립니다.",
      storage: "눌리지 않게 냉장 보관하고, 자른 뒤에는 가능한 빨리 조리하세요."
    }
  },
  "bean-sprouts": {
    en: {
      description: "Bean sprouts are crisp, inexpensive, and useful for quick stir-fries, noodle soups, and blanched vegetable sides.",
      storage: "Bean sprouts are best cooked the same day or the day after refrigeration before they soften."
    },
    ja: {
      description: "もやしは安くて歯ざわりもよく、さっと炒める料理、汁麺、ゆで野菜のかさ増しに便利です。",
      storage: "冷蔵したら当日か翌日までに使うと、やわらかくなりにくく食感を保ちやすいです。"
    },
    ko: {
      description: "콩나물은 저렴하고 아삭해 빠른 볶음, 국수 국물, 데친 채소 반찬에 활용하기 좋은 재료입니다.",
      storage: "냉장 후에는 당일이나 다음 날 안에 조리해야 쉽게 무르지 않고 식감을 살릴 수 있습니다."
    }
  },
  "fried-tofu": {
    en: {
      description: "Fried tofu soaks up broth and seasoning easily, which makes it a handy soy product for braises, hot pots, and simmered dishes.",
      storage: "Keep fried tofu refrigerated for 2 to 3 days, and finish cooked portions the same day when possible."
    },
    ja: {
      description: "油揚げはだしや味を吸いやすく、煮物、鍋物、さっと煮る料理で使いやすい豆製品です。",
      storage: "冷蔵で2〜3日保存でき、すでに加熱したものはできるだけ当日中に食べ切ってください。"
    },
    ko: {
      description: "유부는 국물과 양념을 잘 흡수해 조림, 전골, 간단한 국물 요리에 쓰기 좋은 두부 가공품입니다.",
      storage: "냉장으로 2~3일 보관 가능하며, 이미 익힌 것은 가능하면 당일 안에 드세요."
    }
  },
  "chicken-thigh": {
    en: {
      description: "Chicken thigh has a good balance of richness and meatiness, and stays juicier than chicken breast in braises, air fryer meals, and skillet dishes.",
      storage: "Use refrigerated chicken thigh within 1 to 2 days, or freeze portions for longer storage."
    },
    ja: {
      description: "鶏もも肉は脂と肉のうま味のバランスがよく、照り焼きやエアフライヤー料理でもパサつきにくいです。",
      storage: "冷蔵なら1〜2日以内に使い、長く保存したいときは小分けして冷凍してください。"
    },
    ko: {
      description: "닭다리살은 기름기와 육향의 균형이 좋아 조림, 에어프라이어, 팬 요리에서도 닭가슴살보다 퍽퍽하지 않게 만들기 쉽습니다.",
      storage: "냉장이라면 1~2일 안에 사용하고, 더 오래 두려면 소분해 냉동하세요."
    }
  },
  "glass-noodles": {
    en: {
      description: "Glass noodles absorb flavor easily and cook quickly after soaking, making them useful for shrimp dishes, hot pots, and cold salads.",
      storage: "Keep glass noodles sealed in a cool, dry place."
    },
    ja: {
      description: "春雨は味が入りやすく、戻してしまえばすぐ火が通るので、えび料理、鍋物、和え物に向いています。",
      storage: "密封して冷暗所で保存してください。"
    },
    ko: {
      description: "당면은 양념이 잘 배고 불린 뒤 금방 익어 새우 요리, 전골, 무침에 잘 어울립니다.",
      storage: "밀봉한 상태로 서늘하고 건조한 곳에 보관하세요."
    }
  },
  dumplings: {
    en: {
      description: "Dumplings are a freezer-friendly emergency staple that can quickly become a full one-person dinner by boiling, steaming, or pan-frying.",
      storage: "Keep dumplings frozen and follow the package guidance for storage time."
    },
    ja: {
      description: "水餃は冷凍庫にあると心強い主食で、ゆでる、蒸す、焼くのどれでも一人分の夕食をすぐ用意できます。",
      storage: "冷凍保存し、保存期間はパッケージ表示を目安にしてください。"
    },
    ko: {
      description: "만두는 냉동실에 두기 좋은 비상 주식으로, 삶기, 찌기, 굽기만 해도 1인분 저녁을 빠르게 만들 수 있습니다.",
      storage: "냉동 보관하고, 보관 기간은 제품 포장 안내를 따르세요."
    }
  },
  sausage: {
    en: {
      description: "Sausage turns nicely savory when browned and works well in fried rice, side dishes, or quick air fryer mains.",
      storage: "Keep sausage refrigerated or frozen, and cook it soon after opening."
    },
    ja: {
      description: "ソーセージは焼くと香ばしく、ご飯のおかず、炒飯、エアフライヤーの主菜に使いやすいです。",
      storage: "冷蔵または冷凍で保存し、開封後は早めに調理してください。"
    },
    ko: {
      description: "소시지는 노릇하게 구우면 밥반찬이 잘 되고, 볶음밥이나 에어프라이어 메인 메뉴로도 쓰기 좋습니다.",
      storage: "냉장 또는 냉동 보관하고, 개봉 후에는 빨리 조리하세요."
    }
  },
  milkfish: {
    en: {
      description: "Milkfish is a signature Taiwanese fish that works well pan-seared or steamed, with the belly cut especially prized for its richness.",
      storage: "Cook refrigerated milkfish the same day, or portion and freeze it carefully if needed."
    },
    ja: {
      description: "サバヒーは台湾を代表する魚で、焼いても蒸しても家庭料理になりやすく、腹側は脂のりのよさで特に人気です。",
      storage: "冷蔵なら当日中に調理し、冷凍する場合は小分けしてしっかり包んでください。"
    },
    ko: {
      description: "밀크피시는 대만을 대표하는 생선으로, 굽거나 찌기만 해도 집밥 메인 메뉴가 되며 배쪽 부위는 특히 기름져 인기가 높습니다.",
      storage: "냉장 상태에서는 당일 조리하고, 냉동이 필요하면 소분해 꼼꼼히 포장하세요."
    }
  },
  whitebait: {
    en: {
      description: "Whitebait is delicate and naturally sweet, and is often used in egg dishes and light soups in Taiwanese home cooking.",
      storage: "Whitebait is best cooked the same day, since it does not keep well for long in the refrigerator."
    },
    ja: {
      description: "しらすはやわらかく甘みがあり、卵料理や軽い汁物によく使われる台湾の身近な海鮮です。",
      storage: "日持ちしにくいため、冷蔵してもできるだけ当日に調理するのがおすすめです。"
    },
    ko: {
      description: "멸치는 부드럽고 은은한 단맛이 있어 달걀요리와 가벼운 국물에 자주 쓰이는 친숙한 해산물입니다.",
      storage: "오래 두기 어렵기 때문에 냉장하더라도 가능한 한 당일 조리하는 것이 좋습니다."
    }
  },
  "flat-rice-noodles": {
    en: {
      description: "Flat rice noodles are smooth and tender, making them a familiar base for dry stir-fries and soup noodle dishes.",
      storage: "Keep fresh flat rice noodles refrigerated for 2 to 3 days; dried ones should stay sealed in a cool, dry place."
    },
    ja: {
      description: "粄條はつるっとした食感で、炒め麺にも汁麺にも使いやすい、客家料理や南部料理で親しまれる主食です。",
      storage: "生タイプは冷蔵で2〜3日、乾燥タイプは密封して冷暗所で保存してください。"
    },
    ko: {
      description: "쌀국수는 매끈하고 부드러운 식감으로 볶음면과 국물면 모두에 잘 어울리는 친숙한 면 요리 재료입니다.",
      storage: "생면은 냉장으로 2~3일, 건면은 밀봉해 서늘하고 건조한 곳에 보관하세요."
    }
  },
  "bamboo-shoot": {
    en: {
      description: "Bamboo shoots are crisp and fibrous, making them a seasonal but distinctly Taiwanese vegetable for stir-fries, braises, and soups.",
      storage: "Keep bamboo shoots refrigerated in water if fresh, and follow the package directions for canned or vacuum-packed versions."
    },
    ja: {
      description: "たけのこは歯ざわりがよく繊維感もあり、肉との炒め物、煮物、スープで存在感のある季節野菜です。",
      storage: "生のものは水に浸して冷蔵し、缶詰や真空パックは表示に従って保存してください。"
    },
    ko: {
      description: "죽순은 아삭하고 섬유감이 있어 고기 볶음, 조림, 국물 요리에 잘 어울리는 계절감 있는 채소입니다.",
      storage: "생 죽순은 물에 담가 냉장 보관하고, 통조림이나 진공 포장은 제품 안내에 따라 보관하세요."
    }
  },
  "bitter-melon": {
    en: {
      description: "Bitter melon has a gentle bitterness followed by sweetness, and is a classic summer vegetable in Taiwanese home cooking.",
      storage: "Keep bitter melon refrigerated, and cook it soon after cutting so it does not soften too much."
    },
    ja: {
      description: "にがうりはほろ苦さのあとに甘みがあり、塩卵炒めや肉との炒め物で親しまれる台湾の夏野菜です。",
      storage: "冷蔵保存し、切った後はやわらかくなりすぎないうちに早めに調理してください。"
    },
    ko: {
      description: "여주는 은은한 쌉쌀함 뒤에 단맛이 돌아 대만 여름 집반찬에서 자주 보이는 채소입니다.",
      storage: "냉장 보관하고, 자른 뒤에는 물러지기 전에 빨리 조리하는 것이 좋습니다."
    }
  },
  "thousand-layer-tofu": {
    en: {
      description: "Thousand-layer tofu holds its shape well in hot pots, braises, and grilled dishes while soaking up plenty of flavor.",
      storage: "Keep thousand-layer tofu refrigerated for 2 to 3 days, and finish it soon after opening."
    },
    ja: {
      description: "百頁豆腐は煮ても焼いても崩れにくく、鍋物、焼き物、煮物でしっかり味を吸ってくれます。",
      storage: "冷蔵で2〜3日保存でき、開封後はできるだけ早めに使い切ってください。"
    },
    ko: {
      description: "백페이지두부는 전골, 구이, 조림에서도 형태가 잘 유지되면서 양념을 듬뿍 머금는 두부 가공품입니다.",
      storage: "냉장으로 2~3일 보관 가능하며, 개봉 후에는 가능한 빨리 드세요."
    }
  },
  "water-lily-stem": {
    en: {
      description: "Water lily stem is crisp and lightly fragrant, making it a popular Taiwanese water vegetable for fast stir-fries and simple soups.",
      storage: "Wrap water lily stem in a paper towel and refrigerate it, then cook it within 2 to 3 days and wash it right before using."
    },
    ja: {
      description: "水蓮はしゃきっとした食感とやさしい香りがあり、さっと炒める料理や軽いスープで人気の台湾野菜です。",
      storage: "キッチンペーパーで包んで冷蔵し、2〜3日以内に調理してください。洗うのは使う直前がおすすめです。"
    },
    ko: {
      description: "연꽃줄기는 아삭한 식감과 은은한 향이 있어 빠른 볶음과 가벼운 국물 요리에 인기 있는 대만 채소입니다.",
      storage: "키친타월로 감싸 냉장 보관하고 2~3일 안에 조리하세요. 씻는 것은 사용 직전에 하는 편이 좋습니다."
    }
  }
};

const readJson = async (filePath) => JSON.parse(await readFile(filePath, "utf8"));

const ensureCoverage = (items, mapping, label) => {
  const itemSlugs = new Set(items.map((item) => item.slug));
  const mappingSlugs = new Set(Object.keys(mapping));
  const missing = [...itemSlugs].filter((slug) => !mappingSlugs.has(slug));
  const extra = [...mappingSlugs].filter((slug) => !itemSlugs.has(slug));

  if (missing.length > 0 || extra.length > 0) {
    throw new Error(
      `${label} coverage mismatch\nMissing: ${missing.join(", ") || "(none)"}\nExtra: ${extra.join(", ") || "(none)"}`
    );
  }
};

const applyLocaleCopy = (items, mapping) =>
  items.map((item) => ({
    ...item,
    localeCopy: mapping[item.slug]
  }));

const writeJson = async (filePath, value) => {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const main = async () => {
  const scenarios = await readJson(scenarioPath);
  const topicHubs = await readJson(topicHubPath);
  const ingredients = await readJson(ingredientPath);

  ensureCoverage(scenarios, scenarioLocaleCopy, "scenarios");
  ensureCoverage(topicHubs, topicHubLocaleCopy, "topic hubs");
  ensureCoverage(ingredients, ingredientLocaleCopy, "ingredients");

  const patchedScenarios = applyLocaleCopy(scenarios, scenarioLocaleCopy);
  const patchedTopicHubs = applyLocaleCopy(topicHubs, topicHubLocaleCopy);
  const patchedIngredients = applyLocaleCopy(ingredients, ingredientLocaleCopy);

  await writeJson(scenarioPath, patchedScenarios);
  await writeJson(topicHubPath, patchedTopicHubs);
  await writeJson(ingredientPath, patchedIngredients);

  console.log(
    JSON.stringify(
      {
        scenariosPatched: patchedScenarios.length,
        topicHubsPatched: patchedTopicHubs.length,
        ingredientsPatched: patchedIngredients.length
      },
      null,
      2
    )
  );
};

await main();
