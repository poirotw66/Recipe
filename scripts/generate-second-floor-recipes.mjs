import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const menuPath = join(root, "src/data/second-floor-menu.json");
const researchPath = join(root, "docs/content/second-floor-cafe-menu-replication.md");
const recipeDirs = {
  "zh-TW": join(root, "src/content/recipes"),
  en: join(root, "src/content/recipes-en"),
  ja: join(root, "src/content/recipes-ja"),
  ko: join(root, "src/content/recipes-ko")
};
const imagesDir = join(root, "public/images/recipes");
const publishedAt = "2026-06-09";

const categoryConfig = {
  "sharing-plate": {
    tag: "分享盤",
    category: "開胃菜",
    enCategory: "Appetizers",
    jaCategory: "前菜",
    koCategory: "애피타이저",
    scenarios: ["一人料理", "宵夜料理"],
    localeScenarios: {
      en: ["Cooking for one", "Late-night meals"],
      ja: ["一人分の料理", "夜食"],
      ko: ["1인 요리", "야식"]
    },
    equipment: ["炸鍋", "烤箱"],
    localeEquipment: {
      en: ["Fryer", "Oven"],
      ja: ["フライヤー", "オーブン"],
      ko: ["튀김냄비", "오븐"]
    },
    servings: 2,
    prepTime: 18,
    cookTime: 18,
    difficulty: "中等",
    nutrition: { calories: 560, protein: 22, fat: 28, carbs: 48 },
    substitutions: ["冷凍薯條", "蘿蔓心"],
    storage: "炸物建議當天吃完；冷藏後回烤 6 到 8 分鐘恢復脆度。",
    tips: [
      "分享盤的關鍵是一次做好主炸物與沾醬，起鍋後立刻組盤才會接近門市口感。",
      "若有生菜或冷醬，請最後才放，避免熱氣讓配菜出水。"
    ]
  },
  "light-plate": {
    tag: "均衡盤",
    category: "輕食沙拉",
    enCategory: "Light plates",
    jaCategory: "ライトプレート",
    koCategory: "라이트 플레이트",
    scenarios: ["一人料理", "減脂料理"],
    localeScenarios: {
      en: ["Cooking for one", "Light & lean meals"],
      ja: ["一人分の料理", "低脂質の料理"],
      ko: ["1인 요리", "다이어트 요리"]
    },
    equipment: ["平底鍋", "沙拉碗"],
    localeEquipment: {
      en: ["Skillet", "Salad bowl"],
      ja: ["フライパン", "サラダボウル"],
      ko: ["프라이팬", "샐러드 볼"]
    },
    servings: 1,
    prepTime: 20,
    cookTime: 12,
    difficulty: "簡單",
    nutrition: { calories: 430, protein: 24, fat: 18, carbs: 30 },
    substitutions: ["綜合生菜", "花椰菜飯"],
    storage: "沙拉與優格碗建議現做現吃；熟食配料可冷藏 1 天後再重新組裝。",
    tips: [
      "先把穀物、蛋白質與醬汁分開準備，最後再拌合，口感會更接近餐廳出餐。",
      "輕食盤的份量要足，主配料不要切得太碎，擺盤才有 Second Floor Cafe 的豐盛感。"
    ]
  },
  "open-sandwich": {
    tag: "開放三明治",
    category: "早午餐",
    enCategory: "Open sandwiches",
    jaCategory: "オープンサンド",
    koCategory: "오픈 샌드위치",
    scenarios: ["一人料理", "10 分鐘料理"],
    localeScenarios: {
      en: ["Cooking for one", "10-minute meals"],
      ja: ["一人分の料理", "10分でできる料理"],
      ko: ["1인 요리", "10분 요리"]
    },
    equipment: ["平底鍋", "烤箱"],
    localeEquipment: {
      en: ["Skillet", "Oven"],
      ja: ["フライパン", "オーブン"],
      ko: ["프라이팬", "오븐"]
    },
    servings: 1,
    prepTime: 18,
    cookTime: 14,
    difficulty: "中等",
    nutrition: { calories: 520, protein: 24, fat: 26, carbs: 38 },
    substitutions: ["酸種麵包", "丹麥麵包"],
    storage: "建議現做現吃；若要提前準備，麵包與配料請分開保存，食用前再組裝。",
    tips: [
      "麵包要先烤到外脆內軟，再疊上溫熱主料，才會有門市開放三明治的對比口感。",
      "水波蛋與生菜最後上桌，才能保留蛋黃流心和葉菜的新鮮度。"
    ]
  },
  "sf-brunch": {
    tag: "早午餐",
    category: "早午餐",
    enCategory: "Brunch",
    jaCategory: "ブランチ",
    koCategory: "브런치",
    scenarios: ["一人料理", "早午餐"],
    localeScenarios: {
      en: ["Cooking for one", "Brunch"],
      ja: ["一人分の料理", "ブランチ"],
      ko: ["1인 요리", "브런치"]
    },
    equipment: ["平底鍋", "小湯鍋"],
    localeEquipment: {
      en: ["Skillet", "Saucepan"],
      ja: ["フライパン", "小鍋"],
      ko: ["프라이팬", "작은 냄비"]
    },
    servings: 1,
    prepTime: 20,
    cookTime: 18,
    difficulty: "中等",
    nutrition: { calories: 610, protein: 28, fat: 30, carbs: 46 },
    substitutions: ["歐包", "綜合生菜"],
    storage: "早午餐盤建議現做現吃；蛋料理與吐司放久會失去最佳口感。",
    tips: [
      "把麵包、蛋、主蛋白與配菜分段完成，最後再整盤擺出，最能還原 Second Floor Cafe 的早午餐節奏。",
      "班尼蛋與歐姆蕾都要保留蛋體濕潤度，不要過熟。"
    ]
  },
  "main-rice-noodle": {
    tag: "主餐飯麵",
    category: "飯麵",
    enCategory: "Rice & pasta",
    jaCategory: "ご飯とパスタ",
    koCategory: "밥과 파스타",
    scenarios: ["一人料理", "高蛋白料理"],
    localeScenarios: {
      en: ["Cooking for one", "High-protein meals"],
      ja: ["一人分の料理", "高タンパク料理"],
      ko: ["1인 요리", "고단백 요리"]
    },
    equipment: ["平底鍋", "湯鍋"],
    localeEquipment: {
      en: ["Skillet", "Pot"],
      ja: ["フライパン", "鍋"],
      ko: ["프라이팬", "냄비"]
    },
    servings: 1,
    prepTime: 18,
    cookTime: 18,
    difficulty: "中等",
    nutrition: { calories: 690, protein: 30, fat: 26, carbs: 72 },
    substitutions: ["義大利麵", "香米"],
    storage: "飯麵主餐當天最好吃；冷藏後可加少量高湯或鮮奶回炒回溫。",
    tips: [
      "飯麵系列的重點是先把主醬煮到有厚度，再把主食拌進去，整體會更接近貳樓的濃郁口感。",
      "海鮮與肉類不要一次炒太老，最後回鍋拌勻即可。"
    ]
  },
  "big-bite": {
    tag: "手抓主餐",
    category: "漢堡三明治",
    enCategory: "Handheld mains",
    jaCategory: "ハンバーガーとサンド",
    koCategory: "버거와 샌드위치",
    scenarios: ["一人料理", "便當菜"],
    localeScenarios: {
      en: ["Cooking for one", "Bento-friendly dishes"],
      ja: ["一人分の料理", "お弁当向けのおかず"],
      ko: ["1인 요리", "도시락 반찬"]
    },
    equipment: ["平底鍋", "烤箱"],
    localeEquipment: {
      en: ["Skillet", "Oven"],
      ja: ["フライパン", "オーブン"],
      ko: ["프라이팬", "오븐"]
    },
    servings: 1,
    prepTime: 18,
    cookTime: 15,
    difficulty: "中等",
    nutrition: { calories: 740, protein: 32, fat: 38, carbs: 58 },
    substitutions: ["漢堡麵包", "布里歐麵包"],
    storage: "建議現做現吃；麵包與熱主料分開保存，可避免回溫後濕軟。",
    tips: [
      "手抓主餐要先把主肉排煎好，再讓麵包吸收少量奶油或肉汁，整體更像店裡現做版本。",
      "醬料別一次下太多，維持可手拿的結構會更接近 Big Bite 系列。"
    ]
  },
  "big-plate": {
    tag: "盤餐",
    category: "排餐盤",
    enCategory: "Big plates",
    jaCategory: "プレートメイン",
    koCategory: "플레이트 메인",
    scenarios: ["一人料理", "高蛋白料理"],
    localeScenarios: {
      en: ["Cooking for one", "High-protein meals"],
      ja: ["一人分の料理", "高タンパク料理"],
      ko: ["1인 요리", "고단백 요리"]
    },
    equipment: ["烤箱", "鑄鐵鍋"],
    localeEquipment: {
      en: ["Oven", "Cast-iron pan"],
      ja: ["オーブン", "鋳鉄フライパン"],
      ko: ["오븐", "무쇠 팬"]
    },
    servings: 2,
    prepTime: 25,
    cookTime: 35,
    difficulty: "進階",
    nutrition: { calories: 980, protein: 48, fat: 54, carbs: 56 },
    substitutions: ["玉米筍", "馬鈴薯塊"],
    storage: "大盤主餐可冷藏 1 天；回熱時建議主菜與配菜分開處理。",
    tips: [
      "Big Plate 系列要把主菜烤到外層上色、內部保汁，再搭配三樣配菜組盤，視覺才夠完整。",
      "豬腳與半雞都需要靜置後再切，肉汁才不會流失。"
    ]
  },
  kids: {
    tag: "兒童餐",
    category: "兒童餐",
    enCategory: "Kids plates",
    jaCategory: "キッズプレート",
    koCategory: "키즈 플레이트",
    scenarios: ["一人料理", "便當菜"],
    localeScenarios: {
      en: ["Cooking for one", "Bento-friendly dishes"],
      ja: ["一人分の料理", "お弁当向けのおかず"],
      ko: ["1인 요리", "도시락 반찬"]
    },
    equipment: ["平底鍋"],
    localeEquipment: {
      en: ["Skillet"],
      ja: ["フライパン"],
      ko: ["프라이팬"]
    },
    servings: 1,
    prepTime: 15,
    cookTime: 14,
    difficulty: "簡單",
    nutrition: { calories: 520, protein: 22, fat: 20, carbs: 58 },
    substitutions: ["白飯", "玉米粒"],
    storage: "兒童餐建議當天吃完；若要帶便當，蛋與醬汁請煮到稍微收乾。",
    tips: [
      "兒童餐版本以口感溫和、醬汁不過重為主，重點是把蛋白質和主食做得好入口。",
      "配色可保留玉米、番茄或生菜，視覺會更像門市套餐。"
    ]
  },
  dessert: {
    tag: "甜點",
    category: "甜點",
    enCategory: "Desserts",
    jaCategory: "デザート",
    koCategory: "디저트",
    scenarios: ["一人料理"],
    localeScenarios: {
      en: ["Cooking for one"],
      ja: ["一人分の料理"],
      ko: ["1인 요리"]
    },
    equipment: ["烤箱", "攪拌盆"],
    localeEquipment: {
      en: ["Oven", "Mixing bowl"],
      ja: ["オーブン", "ボウル"],
      ko: ["오븐", "믹싱 볼"]
    },
    servings: 2,
    prepTime: 20,
    cookTime: 28,
    difficulty: "中等",
    nutrition: { calories: 420, protein: 7, fat: 24, carbs: 46 },
    substitutions: ["鮮奶油", "香草冰淇淋"],
    storage: "甜點可冷藏 2 天；含冰淇淋的版本請分開保存，食用前再組合。",
    tips: [
      "貳樓甜點重視溫熱主體搭配冰涼配料，出餐前再完成最後組合最重要。",
      "蛋糕與派皮不要過度烘烤，保留中心濕潤感更接近餐廳版本。"
    ]
  },
  "linkou-special": {
    tag: "林口限定",
    category: "限定主餐",
    enCategory: "Linkou specials",
    jaCategory: "林口限定",
    koCategory: "린커우 한정",
    scenarios: ["一人料理", "早午餐"],
    localeScenarios: {
      en: ["Cooking for one", "Brunch"],
      ja: ["一人分の料理", "ブランチ"],
      ko: ["1인 요리", "브런치"]
    },
    equipment: ["平底鍋", "烤箱"],
    localeEquipment: {
      en: ["Skillet", "Oven"],
      ja: ["フライパン", "オーブン"],
      ko: ["프라이팬", "오븐"]
    },
    servings: 1,
    prepTime: 20,
    cookTime: 18,
    difficulty: "中等",
    nutrition: { calories: 620, protein: 30, fat: 28, carbs: 48 },
    substitutions: ["皮塔餅", "櫛瓜"],
    storage: "限定餐點建議現做現吃；魚排與雞肉分開保存，回熱時較能保留口感。",
    tips: [
      "限定版本通常靠香料與搭配飲品做出識別度，主蛋白先調味靜置會更有層次。",
      "擺盤時保留沙拉、麵包與主菜的分區感，視覺會更接近門市。"
    ]
  },
  limitedOrSeasonal: {
    tag: "季節限定",
    category: "限定主餐",
    enCategory: "Seasonal specials",
    jaCategory: "季節限定",
    koCategory: "시즌 한정",
    scenarios: ["一人料理"],
    localeScenarios: {
      en: ["Cooking for one"],
      ja: ["一人分の料理"],
      ko: ["1인 요리"]
    },
    equipment: ["平底鍋", "烤箱"],
    localeEquipment: {
      en: ["Skillet", "Oven"],
      ja: ["フライパン", "オーブン"],
      ko: ["프라이팬", "오븐"]
    },
    servings: 1,
    prepTime: 20,
    cookTime: 18,
    difficulty: "中等",
    nutrition: { calories: 640, protein: 28, fat: 28, carbs: 58 },
    substitutions: ["時蔬", "白飯"],
    storage: "限定品項以現做現吃為佳；若需冷藏，醬汁與主體請分開保存。",
    tips: [
      "限定品項通常以單一強烈味型作為辨識點，先把那個核心風味做好最重要。",
      "若參考的是食記版本，建議用門市常見配菜邏輯補齊整體份量。"
    ]
  }
};

const slugMap = {
  "舊金山蒜香薯條": "sf-san-francisco-garlic-fries",
  "燕麥脆脆炸魚薯條": "sf-oat-crusted-fish-and-fries",
  "松露薯條": "sf-truffle-fries",
  "普丁肉醬薯條": "sf-poutine-meat-sauce-fries",
  "金黃流沙薯條": "sf-salted-egg-yolk-fries",
  "莎莎黑咖哩炸雞": "sf-salsa-black-curry-fried-chicken",
  "墨西哥雞肉酥餅": "sf-chicken-quesadilla",
  "墨西哥 Local 香腸酥餅": "sf-local-sausage-quesadilla",
  "酥炸鮮魷佐雞尾酒醬": "sf-crispy-calamari-cocktail-sauce",
  "水牛城辣雞翅": "sf-buffalo-chicken-wings",
  "貳樓金牌鹽水雞沙拉": "sf-second-floor-saltwater-chicken-salad",
  "焙煎胡麻雞沙拉": "sf-roasted-sesame-chicken-salad",
  "經典凱薩沙拉": "sf-classic-caesar-salad",
  "經典舒肥雞凱薩沙拉": "sf-sous-vide-chicken-caesar-salad",
  "經典燻鮭魚凱薩沙拉": "sf-smoked-salmon-caesar-salad",
  "綠超人藜麥佛陀碗": "sf-green-superhero-quinoa-buddha-bowl",
  "舒肥雞藜麥花椰飯": "sf-sous-vide-chicken-quinoa-cauliflower-rice",
  "生酮總匯海陸拼盤": "sf-keto-surf-and-turf-platter",
  "熱帶水果優格碗": "sf-tropical-yogurt-bowl",
  "巴西莓果優格碗": "sf-acai-berry-yogurt-bowl",
  "酪梨慢煎培根／歐包 Open": "sf-avocado-bacon-open-toast",
  "水波燻牛肉／丹麥 Open": "sf-poached-egg-smoked-beef-danish-open",
  "酪梨燻鮭魚／歐包 Open": "sf-avocado-smoked-salmon-open-toast",
  "酪梨 Local 香腸／丹麥 Open": "sf-avocado-local-sausage-danish-open",
  "黑松露厚切藍帶豬／歐包 Open": "sf-black-truffle-cordon-bleu-pork-open",
  "橙香法式丹麥 Sunny 舒肥雞": "sf-orange-danish-sunny-sous-vide-chicken",
  "橙香法式丹麥 水波海鮮洋芋": "sf-orange-danish-poached-seafood-potato",
  "橙香法式丹麥 舒肥牛排": "sf-orange-danish-sous-vide-steak",
  "橙香法式丹麥 蕈菇水波洋芋": "sf-orange-danish-mushroom-poached-potato",
  "經典火腿奶油炒菇班尼蛋": "sf-classic-ham-mushroom-eggs-benedict",
  "台胃口水雞奶油炒菇班尼蛋": "sf-sichuan-chicken-mushroom-eggs-benedict",
  "經典牛肉奶油炒菇班尼蛋": "sf-classic-beef-mushroom-eggs-benedict",
  "燻鮭魚奶油炒菇班尼蛋": "sf-smoked-salmon-mushroom-eggs-benedict",
  "總匯奶起司歐姆蕾": "sf-supreme-cheese-omelette",
  "烏斯特肉醬歐姆蕾": "sf-worcester-meat-sauce-omelette",
  "蕈菇奶起司歐姆蕾": "sf-mushroom-cheese-omelette",
  "辣茄汁香煸培根長管麵": "sf-spicy-tomato-bacon-penne",
  "曙光汁鮮蝦雞肉麵": "sf-dawn-shrimp-chicken-linguine",
  "香爆椒麻唐揚雞麵": "sf-spicy-pepper-karaage-pasta",
  "家鄉肉醬長管麵佐老媽肉丸": "sf-homestyle-meat-sauce-penne-with-meatballs",
  "經典青醬鮮蝦麵": "sf-classic-pesto-shrimp-pasta",
  "酒香蒜味蛤蜊墨魚麵": "sf-white-wine-garlic-clam-squid-ink-pasta",
  "台式熱炒鹹蛋苦瓜麵": "sf-salted-egg-bitter-melon-pasta",
  "起司 Local 香腸奶白麵": "sf-cheesy-local-sausage-cream-pasta",
  "貳樓費氏鮮蝦長管麵": "sf-second-floor-fiesta-shrimp-penne",
  "巴薩米克蕈菇麵": "sf-balsamic-mushroom-pasta",
  "松露蕈菇奶油麵": "sf-truffle-mushroom-cream-pasta",
  "血腥瑪麗辣味飯": "sf-bloody-mary-spicy-rice",
  "老闆黑胡椒漢堡排飯": "sf-black-pepper-hamburg-rice",
  "西班牙辣炒海陸飯": "sf-spicy-spanish-surf-and-turf-rice",
  "焗厚切豬排奶油飯": "sf-baked-thick-cut-pork-cream-rice",
  "月見苦瓜奶油飯": "sf-moon-view-bitter-melon-cream-rice",
  "厚烤奶油 Ham 三明治": "sf-griddled-butter-ham-sandwich",
  "老墨辣鞭炮漢堡": "sf-spicy-mexican-firecracker-burger",
  "實打實招牌漢堡": "sf-signature-double-stack-burger",
  "BBQ 溫烤半雞": "sf-bbq-roasted-half-chicken",
  "主廚脆皮豬腳": "sf-chef-crispy-pork-knuckle",
  "牛蛋小堡堡套餐": "sf-mini-beef-egg-burger-set",
  "吃光光起司蛋雞肉飯": "sf-cheesy-chicken-egg-rice",
  "北鼻奶油雞肉長管麵": "sf-kids-cream-chicken-penne",
  強的: "sf-strong-chocolate-cake",
  "布朗尼冰淇淋": "sf-brownie-ice-cream",
  "全美起司蛋糕": "sf-american-cheesecake",
  "鄉村肉桂蜜桃派": "sf-country-cinnamon-peach-pie",
  "Greek style 野炊系炭烤雞肉早午餐": "sf-greek-campfire-grilled-chicken-brunch",
  "野炊系義式檸香櫛瓜魚菲力": "sf-campfire-lemon-zucchini-fish-fillet",
  甘味飯: "sf-sweet-savory-rice",
  "金黃流沙海鮮披薩": "sf-salted-egg-seafood-pizza",
  "朝日藍帶豬排堡": "sf-asahi-cordon-bleu-pork-burger",
  "南洋辛香雞肉飯": "sf-south-sea-spiced-chicken-rice"
};

const limitedComponents = {
  甘味飯: "蜜餞、香米、鹹甜醬汁",
  "金黃流沙海鮮披薩": "海鮮、九層塔、金沙醬、披薩餅皮",
  "朝日藍帶豬排堡": "藍帶豬排、漢堡麵包、生菜、起司",
  "南洋辛香雞肉飯": "雞肉、南洋辛香醬、香米、時蔬"
};

const top10Names = [
  "曙光汁鮮蝦雞肉麵",
  "水波燻牛肉／丹麥 Open",
  "香爆椒麻唐揚雞麵",
  "橙香法式丹麥 Sunny 舒肥雞",
  "主廚脆皮豬腳",
  "血腥瑪麗辣味飯",
  "台式熱炒鹹蛋苦瓜麵",
  "貳樓金牌鹽水雞沙拉",
  "起司 Local 香腸奶白麵",
  "燻鮭魚奶油炒菇班尼蛋"
];

const localeDifficulty = {
  en: {
    簡單: "Easy",
    中等: "Medium",
    進階: "Advanced"
  },
  ja: {
    簡單: "かんたん",
    中等: "普通",
    進階: "むずかしい"
  },
  ko: {
    簡單: "쉬움",
    中等: "보통",
    進階: "어려움"
  }
};

const sauceLikeTokens = new Set([
  "蒜味奶油醬",
  "松露醬",
  "肉醬",
  "金沙醬",
  "黑咖哩醬",
  "酪梨醬",
  "起司醬",
  "酸奶油",
  "BBQ",
  "BBQ 醬",
  "雞尾酒醬",
  "水牛城醬",
  "藍紋起司醬",
  "鹽水雞油醋",
  "辣椒粉",
  "焙煎胡麻醬",
  "芝麻",
  "凱薩醬",
  "莎莎醬",
  "巴薩米克",
  "蜂蜜芥末",
  "白芝麻",
  "黑胡椒",
  "Pico de gallo",
  "曙光奶油醬",
  "茄汁",
  "青醬",
  "白酒",
  "辣椒碎",
  "松子",
  "伏特加",
  "番茄汁",
  "黑胡椒醬",
  "奶油白醬",
  "松露奶油醬",
  "楓糖漿",
  "鹹甜醬汁",
  "南洋辛香醬"
]);

const stapleTokens = {
  pasta: ["義大利麵"],
  penne: ["長管麵"],
  squidInkPasta: ["墨魚麵"],
  rice: ["香米"],
  creamyRice: ["奶油飯"],
  sandwich: ["吐司"],
  burger: ["漢堡麵包"],
  pizza: ["披薩餅皮"],
  pie: ["派皮"]
};

function yamlQuote(value) {
  const stringValue = String(value);
  if (stringValue === "") {
    return '""';
  }

  return /[:#\-\n'[\]{}]/.test(stringValue) || stringValue.includes('"')
    ? `"${stringValue.replace(/"/g, '\\"')}"`
    : stringValue;
}

function renderIngredient(item) {
  return [
    `- name: ${yamlQuote(item.name)}`,
    `  amount: "${String(item.amount)}"`,
    `  unit: ${yamlQuote(item.unit)}`,
    `  isCore: ${item.isCore ? "true" : "false"}`
  ].join("\n");
}

function renderSeasoning(item) {
  return [
    `- name: ${yamlQuote(item.name)}`,
    `  amount: "${String(item.amount)}"`,
    `  unit: ${yamlQuote(item.unit)}`
  ].join("\n");
}

function renderFaq(item) {
  return [`- question: ${yamlQuote(item.question)}`, `  answer: ${yamlQuote(item.answer)}`].join("\n");
}

function renderRecipeMarkdown(recipe, locale) {
  const localeKey = locale === "zh-TW" ? "zh-TW" : locale;
  const lines = [
    "---",
    `title: ${yamlQuote(recipe.title[localeKey])}`,
    ...(locale === "zh-TW" ? [] : [`recipeId: ${recipe.slug}`]),
    `description: ${yamlQuote(recipe.description[localeKey])}`,
    `coverImage: /images/recipes/${recipe.slug}.svg`,
    `servings: ${recipe.servings}`,
    `prepTime: ${recipe.prepTime}`,
    `cookTime: ${recipe.cookTime}`,
    `totalTime: ${recipe.totalTime}`,
    `difficulty: ${yamlQuote(locale === "zh-TW" ? recipe.difficulty : localeDifficulty[locale][recipe.difficulty])}`,
    `calories: ${recipe.calories}`,
    `protein: ${recipe.protein}`,
    `fat: ${recipe.fat}`,
    `carbs: ${recipe.carbs}`,
    `category: "${String(recipe.category[localeKey]).replace(/"/g, '\\"')}"`,
    "scenarios:",
    ...recipe.scenarios[localeKey].map((item) => `- ${yamlQuote(item)}`),
    "equipment:",
    ...recipe.equipment[localeKey].map((item) => `- ${yamlQuote(item)}`),
    "tags:",
    ...recipe.tags[localeKey].map((item) => `- ${yamlQuote(item)}`),
    "restaurantSource:",
    `  restaurant: ${yamlQuote(recipe.restaurantSource.restaurant)}`,
    `  dishName: ${yamlQuote(recipe.restaurantSource.dishName)}`,
    `  region: ${yamlQuote(recipe.restaurantSource.region)}`,
    `intro: ${yamlQuote(recipe.intro[localeKey])}`,
    "steps:",
    ...recipe.steps[localeKey].map((item) => `- ${yamlQuote(item)}`),
    "tips:",
    ...recipe.tips[localeKey].map((item) => `- ${yamlQuote(item)}`),
    `storage: ${yamlQuote(recipe.storage[localeKey])}`,
    "substitutions:",
    ...recipe.substitutions[localeKey].map((item) => `- ${yamlQuote(item)}`),
    "relatedIngredients:",
    ...recipe.relatedIngredients.map((item) => `- ${yamlQuote(item)}`),
    ...(recipe.customAdditions[localeKey].length
      ? ["customAdditions:", ...recipe.customAdditions[localeKey].map((item) => `- ${yamlQuote(item)}`)]
      : ["customAdditions: []"]),
    "faqs:",
    ...recipe.faqs[localeKey].map(renderFaq),
    "featured: false",
    `publishedAt: ${yamlQuote(publishedAt)}`,
    `updatedAt: ${yamlQuote(publishedAt)}`,
    "ingredients:",
    ...recipe.ingredients.map(renderIngredient),
    "seasonings:",
    ...recipe.seasonings.map(renderSeasoning),
    "---",
    "",
    recipe.body[localeKey],
    ""
  ];

  return `${lines.join("\n")}\n`;
}

function renderSvg(title) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff4e6" />
      <stop offset="100%" stop-color="#f4dcc2" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)" />
  <rect x="44" y="44" width="712" height="512" rx="28" fill="#fffdfa" stroke="#8f5b34" stroke-width="3" />
  <text x="84" y="248" fill="#6f4428" font-family="system-ui, 'Noto Sans TC', sans-serif" font-size="22" font-weight="700">Second Floor Cafe Replica</text>
  <text x="84" y="322" fill="#2d2620" font-family="system-ui, 'Noto Sans TC', sans-serif" font-size="42" font-weight="800">${title}</text>
  <text x="84" y="386" fill="#75685d" font-family="system-ui, sans-serif" font-size="20">Restaurant-style portion placeholder cover</text>
</svg>
`;
}

function stripPriceFields(value) {
  if (Array.isArray(value)) {
    return value.map((item) => stripPriceFields(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== "price")
      .map(([key, nested]) => [key, stripPriceFields(nested)])
  );
}

function parseTableRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|")) {
    return null;
  }

  const cells = trimmed
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());

  if (!cells.length || cells.every((cell) => /^:?-+:?$/.test(cell))) {
    return null;
  }

  if (
    cells[0] === "品項" ||
    cells[0] === "序" ||
    cells[0] === "項目" ||
    cells[0] === "杯次" ||
    cells[0] === "分類"
  ) {
    return null;
  }

  return cells;
}

function buildBrunchDisplayName(subcategoryName, itemName) {
  if (subcategoryName.includes("橙香法式丹麥")) {
    return `橙香法式丹麥 ${itemName}`;
  }

  if (subcategoryName.includes("班尼蛋奶油炒菇")) {
    return `${itemName}奶油炒菇班尼蛋`;
  }

  if (subcategoryName.includes("歐姆蕾")) {
    return `${itemName}歐姆蕾`;
  }

  return `${subcategoryName} ${itemName}`;
}

function parseResearchComponents(markdown) {
  const lines = markdown.split(/\r?\n/);
  const componentMap = new Map();
  let currentSection = "";
  let currentSubcategory = "";

  for (const line of lines) {
    if (line.startsWith("## 1. 分享盤")) {
      currentSection = "sharing-plate";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## 2. 均衡盤")) {
      currentSection = "light-plate";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## 3. 開放三明治")) {
      currentSection = "open-sandwich";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## 4. 貳樓早午餐")) {
      currentSection = "sf-brunch";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## 5. 主餐｜飯麵")) {
      currentSection = "main-rice-noodle";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## 6. 主餐｜手抓")) {
      currentSection = "big-bite";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## 7. 主餐｜盤餐")) {
      currentSection = "big-plate";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## 8. 小大人餐")) {
      currentSection = "kids";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## 9. 甜點")) {
      currentSection = "dessert";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## 11. 林口店限定")) {
      currentSection = "linkou-special";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## 分店／季節限定")) {
      currentSection = "limitedOrSeasonal";
      currentSubcategory = "";
      continue;
    }

    if (line.startsWith("## ")) {
      currentSection = "";
      currentSubcategory = "";
      continue;
    }

    if (currentSection === "sf-brunch" && line.startsWith("### ")) {
      currentSubcategory = line.replace(/^###\s+/, "").trim();
      continue;
    }

    const cells = parseTableRow(line);
    if (!cells) {
      continue;
    }

    if (currentSection === "limitedOrSeasonal") {
      const itemName = cells[0];
      const components = limitedComponents[itemName];
      if (components) {
        componentMap.set(itemName, components);
      }
      continue;
    }

    if (!currentSection || cells.length < 3) {
      continue;
    }

    const itemName = cells[0];
    const rawComponents = cells[2];

    if (currentSection === "sf-brunch") {
      const displayName = buildBrunchDisplayName(currentSubcategory, itemName);
      componentMap.set(displayName, rawComponents);
      componentMap.set(`sf-brunch::${currentSubcategory}::${itemName}`, rawComponents);
      continue;
    }

    componentMap.set(itemName, rawComponents);
  }

  const baseCaesar = componentMap.get("經典凱薩沙拉");
  for (const [name, value] of componentMap.entries()) {
    if (value.startsWith("凱薩 + ") && baseCaesar) {
      const extra = value.replace("凱薩 + ", "");
      componentMap.set(name, `${baseCaesar}、${extra}`);
    }
  }

  return componentMap;
}

function ensureDir(path) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

function clearGeneratedArtifacts() {
  for (const directory of Object.values(recipeDirs)) {
    ensureDir(directory);
    for (const file of readdirSync(directory)) {
      if (file.startsWith("sf-") && file.endsWith(".md")) {
        unlinkSync(join(directory, file));
      }
    }
  }

  ensureDir(imagesDir);
  for (const file of readdirSync(imagesDir)) {
    if (file.startsWith("sf-") && file.endsWith(".svg")) {
      unlinkSync(join(imagesDir, file));
    }
  }
}

function addComponentsToItem(item, components) {
  if (typeof item === "string") {
    return components ? { name: item, components } : { name: item };
  }

  const stripped = stripPriceFields(item);
  const { name, ...rest } = stripped;
  return components ? { name, components, ...rest } : { name, ...rest };
}

function normalizeMenu(menu, componentMap) {
  const nextMenu = stripPriceFields(menu);

  nextMenu.categories = nextMenu.categories.map((category) => {
    if (category.slug === "sf-brunch") {
      return {
        ...category,
        subcategories: category.subcategories.map((subcategory) => ({
          ...subcategory,
          items: subcategory.items.map((item) =>
            addComponentsToItem(item, componentMap.get(`sf-brunch::${subcategory.name}::${item.name}`))
          )
        }))
      };
    }

    return {
      ...category,
      items: category.items.map((item) => addComponentsToItem(item, componentMap.get(item.name)))
    };
  });

  nextMenu.limitedOrSeasonal = nextMenu.limitedOrSeasonal.map((item) =>
    addComponentsToItem(item, componentMap.get(item.name))
  );

  const knownComponents = new Map();
  for (const category of nextMenu.categories) {
    if (category.slug === "sf-brunch") {
      for (const subcategory of category.subcategories) {
        for (const item of subcategory.items) {
          const displayName = buildBrunchDisplayName(subcategory.name, item.name);
          if (item.components) {
            knownComponents.set(displayName, item.components);
          }
        }
      }
      continue;
    }

    for (const item of category.items) {
      if (item.components) {
        knownComponents.set(item.name, item.components);
      }
    }
  }

  for (const item of nextMenu.limitedOrSeasonal) {
    if (item.components) {
      knownComponents.set(item.name, item.components);
    }
  }

  nextMenu.top10 = top10Names.map((name) => addComponentsToItem(name, knownComponents.get(name)));

  return nextMenu;
}

function flattenFoodItems(menu) {
  const items = [];
  for (const category of menu.categories) {
    if (category.slug === "sf-drinks" || category.slug === "cocktail-beer") {
      continue;
    }

    if (category.slug === "sf-brunch") {
      for (const subcategory of category.subcategories) {
        for (const item of subcategory.items) {
          items.push({
            categorySlug: category.slug,
            subcategoryName: subcategory.name,
            displayName: buildBrunchDisplayName(subcategory.name, item.name),
            item
          });
        }
      }
      continue;
    }

    for (const item of category.items) {
      items.push({
        categorySlug: category.slug,
        subcategoryName: "",
        displayName: item.name,
        item
      });
    }
  }

  for (const item of menu.limitedOrSeasonal) {
    items.push({
      categorySlug: "limitedOrSeasonal",
      subcategoryName: "",
      displayName: item.name,
      item
    });
  }

  return items;
}

function splitComponents(components) {
  return components
    .replace(/\（.*?\）/g, "")
    .replace(/\s*\+\s*/g, "、")
    .replace(/\s*×\s*/g, "、")
    .split(/[、，]/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function inferStaples(displayName, categorySlug, tokens) {
  const extra = [];
  const hasAny = (patterns) => tokens.some((token) => patterns.some((pattern) => token.includes(pattern)));

  if (categorySlug === "main-rice-noodle" || categorySlug === "kids") {
    if (displayName.includes("墨魚麵") && !hasAny(["墨魚麵"])) {
      extra.push(...stapleTokens.squidInkPasta);
    } else if (displayName.includes("長管麵") && !hasAny(["長管麵"])) {
      extra.push(...stapleTokens.penne);
    } else if (displayName.includes("麵") && !hasAny(["麵", "麵條", "長管麵", "墨魚麵"])) {
      extra.push(...stapleTokens.pasta);
    }

    if (displayName.includes("奶油飯") && !hasAny(["奶油飯"])) {
      extra.push(...stapleTokens.creamyRice);
    } else if (displayName.includes("飯") && !hasAny(["香米", "白飯", "奶油飯", "花椰菜飯", "番紅花飯"])) {
      extra.push(...stapleTokens.rice);
    }
  }

  if ((categorySlug === "open-sandwich" || categorySlug === "sf-brunch") && !hasAny(["歐包", "丹麥", "吐司", "皮塔餅"])) {
    extra.push("歐包");
  }

  if (categorySlug === "big-bite") {
    if (displayName.includes("漢堡") && !hasAny(["漢堡麵包", "小漢堡"])) {
      extra.push(...stapleTokens.burger);
    }
    if (displayName.includes("三明治") && !hasAny(["吐司", "麵包"])) {
      extra.push(...stapleTokens.sandwich);
    }
  }

  if (displayName.includes("披薩") && !hasAny(["披薩餅皮"])) {
    extra.push(...stapleTokens.pizza);
  }

  if (displayName.includes("派") && !hasAny(["派皮"])) {
    extra.push(...stapleTokens.pie);
  }

  if ((categorySlug === "sf-brunch" || categorySlug === "kids") && displayName.includes("蛋") && !hasAny(["蛋", "水波蛋", "荷包蛋", "歐姆蕾"])) {
    extra.push("雞蛋");
  }

  return extra;
}

function normalizeSeasoningName(token) {
  if (token === "BBQ") {
    return "BBQ 醬";
  }
  if (token === "巴薩米克") {
    return "巴薩米克醋";
  }
  if (token === "黑胡椒") {
    return "黑胡椒碎";
  }
  if (token === "芝麻") {
    return "白芝麻";
  }
  if (token === "茄汁") {
    return "番茄醬汁";
  }
  if (token === "檸香") {
    return "檸檬奶油醬";
  }
  if (token === "巧克力") {
    return "巧克力醬";
  }
  return token;
}

function inferSignatureSeasonings(displayName, item, categorySlug) {
  const extra = [];
  if (displayName.includes("曙光")) {
    extra.push("曙光奶油醬");
  }
  if (displayName.includes("青醬")) {
    extra.push("青醬");
  }
  if (displayName.includes("松露")) {
    extra.push("松露醬");
  }
  if (displayName.includes("黑胡椒")) {
    extra.push("黑胡椒醬");
  }
  if (displayName.includes("血腥瑪麗")) {
    extra.push("番茄汁", "伏特加", "辣醬");
  }
  if (displayName.includes("流沙") || displayName.includes("鹹蛋")) {
    extra.push("鹹蛋黃醬");
  }
  if (displayName.includes("奶白")) {
    extra.push("奶油白醬");
  }
  if (displayName.includes("奶油") && categorySlug !== "dessert" && !displayName.includes("奶油炒菇")) {
    extra.push("鮮奶油");
  }
  if (displayName.includes("椒麻") || item.spicy) {
    extra.push("辣椒碎");
  }
  if (displayName.includes("BBQ")) {
    extra.push("BBQ 醬");
  }
  return extra;
}

function buildBaseSeasonings(categorySlug) {
  if (categorySlug === "dessert") {
    return [
      { name: "無鹽奶油", amount: "30", unit: "公克" },
      { name: "細砂糖", amount: "2", unit: "大匙" }
    ];
  }

  if (categorySlug === "light-plate") {
    return [
      { name: "橄欖油", amount: "1.5", unit: "大匙" },
      { name: "海鹽", amount: "1/3", unit: "小匙" }
    ];
  }

  if (categorySlug === "big-plate") {
    return [
      { name: "橄欖油", amount: "2", unit: "大匙" },
      { name: "海鹽", amount: "1", unit: "小匙" },
      { name: "黑胡椒碎", amount: "1/2", unit: "小匙" }
    ];
  }

  if (categorySlug === "sharing-plate") {
    return [
      { name: "炸油", amount: "600", unit: "毫升" },
      { name: "海鹽", amount: "1/2", unit: "小匙" }
    ];
  }

  return [
    { name: "橄欖油", amount: "1", unit: "大匙" },
    { name: "海鹽", amount: "1/3", unit: "小匙" },
    { name: "黑胡椒碎", amount: "1/4", unit: "小匙" }
  ];
}

function measureIngredient(name) {
  const entries = [
    [/薯條|炒薯|薯塊/, ["250", "公克"]],
    [/雞翅/, ["8", "隻"]],
    [/半雞/, ["1/2", "隻"]],
    [/豬腳/, ["900", "公克"]],
    [/舒肥牛排|牛排/, ["220", "公克"]],
    [/牛肉排|漢堡排/, ["180", "公克"]],
    [/燻牛肉|牛肉/, ["160", "公克"]],
    [/舒肥雞|雞肉|口水雞|唐揚雞|炭烤雞肉/, ["180", "公克"]],
    [/豬排|藍帶豬排/, ["220", "公克"]],
    [/培根/, ["80", "公克"]],
    [/Local 香腸|香腸/, ["140", "公克"]],
    [/鮮蝦|蝦仁|海鮮/, ["180", "公克"]],
    [/蛤蜊/, ["400", "公克"]],
    [/魷魚|鮮魷/, ["300", "公克"]],
    [/燻鮭|鮭魚/, ["120", "公克"]],
    [/巴沙魚|魚菲力|魚排/, ["180", "公克"]],
    [/綜合生菜|西洋菜/, ["120", "公克"]],
    [/小番茄/, ["8", "顆"]],
    [/玉米|火烤玉米/, ["100", "公克"]],
    [/紅蘿蔔/, ["60", "公克"]],
    [/山苦瓜|苦瓜/, ["120", "公克"]],
    [/杏鮑菇|炒菇|綜合蕈菇|蕈菇/, ["120", "公克"]],
    [/洋蔥/, ["80", "公克"]],
    [/山藥/, ["80", "公克"]],
    [/花椰菜/, ["120", "公克"]],
    [/綜合莓果|巴西莓|季節水果|香蕉|芒果/, ["150", "公克"]],
    [/穀物|藜麥/, ["80", "公克"]],
    [/堅果/, ["30", "公克"]],
    [/優格/, ["200", "公克"]],
    [/歐包|丹麥麵包|橙香丹麥|皮塔餅|吐司|漢堡麵包|披薩餅皮|派皮/, ["2", "份"]],
    [/水波蛋|荷包蛋|雞蛋/, ["2", "顆"]],
    [/歐姆蕾/, ["3", "顆蛋"]],
    [/義大利麵|長管麵|墨魚麵/, ["180", "公克"]],
    [/香米|白飯|番紅花飯|奶油飯|花椰菜飯/, ["220", "公克"]],
    [/4 吋巧克力蛋糕|起司蛋糕|布朗尼|肉桂蜜桃派/, ["1", "份"]],
    [/奶油起司/, ["80", "公克"]],
    [/香草冰淇淋/, ["2", "球"]],
    [/酸黃瓜|酸菜/, ["50", "公克"]],
    [/麵包丁/, ["40", "公克"]],
    [/帕瑪森|起司|綜合起司/, ["40", "公克"]],
    [/鵪鶉蛋/, ["4", "顆"]],
    [/檸檬/, ["1/2", "顆"]],
    [/酪梨/, ["1", "顆"]],
    [/番茄乾/, ["40", "公克"]],
    [/九層塔/, ["10", "公克"]],
    [/豆類|毛豆/, ["80", "公克"]],
    [/時蔬/, ["100", "公克"]],
    [/蜜餞/, ["40", "公克"]]
  ];

  for (const [pattern, [amount, unit]] of entries) {
    if (pattern.test(name)) {
      return { amount, unit };
    }
  }

  return { amount: "適量", unit: "" };
}

function measureSeasoning(name) {
  const entries = [
    [/炸油/, ["600", "毫升"]],
    [/橄欖油|無鹽奶油/, ["1", "大匙"]],
    [/海鹽/, ["1/3", "小匙"]],
    [/黑胡椒碎|白芝麻|松子|辣椒碎|辣椒粉/, ["1/2", "小匙"]],
    [/凱薩醬|焙煎胡麻醬|蜂蜜芥末|酪梨醬|雞尾酒醬|起司醬|藍紋起司醬|鹽水雞油醋|莎莎醬|BBQ 醬|黑咖哩醬|楓糖漿|鹹蛋黃醬/, ["2", "大匙"]],
    [/蒜味奶油醬|松露醬|曙光奶油醬|番茄醬汁|青醬|奶油白醬|松露奶油醬|南洋辛香醬|檸檬奶油醬/, ["3", "大匙"]],
    [/番茄汁|伏特加|白酒/, ["2", "大匙"]],
    [/酸奶油/, ["1.5", "大匙"]],
    [/細砂糖/, ["2", "大匙"]],
    [/巧克力醬/, ["1.5", "大匙"]],
    [/巴薩米克醋/, ["1", "大匙"]]
  ];

  for (const [pattern, [amount, unit]] of entries) {
    if (pattern.test(name)) {
      return { amount, unit };
    }
  }

  return { amount: "適量", unit: "" };
}

function pickCoreIngredients(tokens, categorySlug) {
  return tokens.filter((token) => !sauceLikeTokens.has(token) && !token.endsWith("醬"));
}

function dedupeStrings(items) {
  return [...new Set(items.filter(Boolean))];
}

function buildIngredientsAndSeasonings(displayName, item, categorySlug) {
  const componentTokens = splitComponents(item.components ?? "");
  const tokens = dedupeStrings([...componentTokens, ...inferStaples(displayName, categorySlug, componentTokens)]);
  const ingredientTokens = pickCoreIngredients(tokens, categorySlug);
  const seasoningTokens = dedupeStrings([
    ...componentTokens.filter((token) => sauceLikeTokens.has(token) || token.endsWith("醬")),
    ...inferSignatureSeasonings(displayName, item, categorySlug).map(normalizeSeasoningName)
  ]);

  const ingredients = ingredientTokens.slice(0, 8).map((name, index) => {
    const measured = measureIngredient(name);
    return {
      name,
      amount: measured.amount,
      unit: measured.unit,
      isCore: index < 4
    };
  });

  const seasonings = dedupeStrings([...buildBaseSeasonings(categorySlug).map((entry) => entry.name), ...seasoningTokens]).map(
    (name) => {
      const baseSeasoning = buildBaseSeasonings(categorySlug).find((entry) => entry.name === name);
      if (baseSeasoning) {
        return baseSeasoning;
      }

      const measured = measureSeasoning(name);
      return {
        name,
        amount: measured.amount,
        unit: measured.unit
      };
    }
  );

  return { ingredients, seasonings };
}

function adjustNutrition(baseNutrition, displayName, categorySlug) {
  const nutrition = { ...baseNutrition };

  if (/雞|牛|豬|魚|鮭|蝦|蛤蜊|魷/.test(displayName)) {
    nutrition.protein += 8;
    nutrition.calories += 70;
  }

  if (/沙拉|佛陀碗|優格碗/.test(displayName)) {
    nutrition.calories -= 80;
    nutrition.carbs -= 10;
  }

  if (/甜點|蛋糕|派|布朗尼/.test(displayName) || categorySlug === "dessert") {
    nutrition.carbs += 18;
    nutrition.fat += 6;
  }

  if (/薯條|漢堡|三明治|豬腳/.test(displayName)) {
    nutrition.calories += 110;
    nutrition.fat += 8;
  }

  if (/飯|麵|長管麵|墨魚麵/.test(displayName)) {
    nutrition.carbs += 12;
  }

  return nutrition;
}

function humanizeSlug(slug) {
  return slug
    .replace(/^sf-/, "")
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function buildDescription(displayName, components, categoryTag) {
  return `參考貳樓 Second Floor Cafe 常見做法，以 ${components} 還原 ${displayName} 的餐廳份量與風味層次。`;
}

function buildIntro(displayName, components, categoryTag) {
  return `這道 ${displayName} 參考貳樓 Second Floor Cafe 常見做法，會先把 ${components.split("、").slice(0, 3).join("、")} 分段處理，再依 ${categoryTag} 的出餐邏輯完成整盤。`;
}

function buildZhSteps(displayName, item, categorySlug, ingredients, seasonings) {
  const ingredientLead = ingredients.slice(0, 3).map((entry) => entry.name).join("、");
  const sauceLead = seasonings.slice(0, 2).map((entry) => entry.name).join("與");

  if (categorySlug === "sharing-plate") {
    return [
      `先把 ${ingredientLead} 整理成餐廳份量，炸物拍乾或裹粉，冷醬與配菜另外備好。`,
      `依序把主炸物炸到表面金黃酥脆，薯條或餅皮另外炸好或烤好，讓雙重口感更接近門市分享盤。`,
      `把 ${sauceLead} 調到濃稠可附著的狀態，再依品項加入辣味、起司或莎莎等標誌風味。`,
      "起鍋後立刻組盤，熱食放中央、冷醬與生菜放邊側，維持貳樓常見的大份量分享感。"
    ];
  }

  if (categorySlug === "light-plate") {
    return [
      `把 ${ingredientLead} 按沙拉碗或佛陀碗的比例備妥，熟食與冷食分區放置。`,
      "需要加熱的蛋白質、穀物或花椰菜飯先完成，保持表面微焦但中心仍保濕。",
      `把 ${sauceLead} 調勻後少量分次拌入，避免整碗過濕失去餐廳的清爽層次。`,
      "最後用生菜、水果或穀物把高度堆出來，再把主蛋白放在最上層完成餐廳式擺盤。"
    ];
  }

  if (categorySlug === "open-sandwich") {
    return [
      `先把 ${ingredientLead} 各自處理好，麵包烤到外脆內軟，蛋與生菜分開準備。`,
      "把主蛋白煎到剛好上色，再同步完成水波蛋或熱配菜，保持中心仍有濕潤度。",
      `依序把 ${sauceLead}、主料、蛋與生菜堆疊在麵包上，保留 Second Floor Cafe 常見的高低層次。`,
      "上桌前補一點胡椒、檸檬或巴薩米克，讓開放三明治既有厚度也有清爽收尾。"
    ];
  }

  if (categorySlug === "sf-brunch") {
    return [
      `先把 ${ingredientLead} 與配菜分別備好，麵包、蛋料理和沙拉配件同步規劃。`,
      "主蛋白先煎或烤到七八分熟，吐司與薯塊另外上色，蛋料理最後才完成以保留質地。",
      `把 ${sauceLead} 調整到可覆蓋食材但不會壓過主味的濃度，再依品項加入在蛋上或主料上。`,
      "組盤時保留主菜、蛋料理、麵包與生菜的分區，做出貳樓早午餐滿版又清楚的結構。"
    ];
  }

  if (categorySlug === "main-rice-noodle") {
    return [
      `把 ${ingredientLead} 切成適合拌炒或鋪面的份量，麵或飯先煮到接近完成狀態。`,
      "先把主蛋白和配菜炒出香氣，再另外收醬，讓餐廳版主醬有厚度與光澤。",
      `把主食與 ${sauceLead} 一起拌勻，最後再回放主蛋白與起司或香草，保持每口都有完整配料。`,
      "起鍋後以單盤主餐份量盛出，讓醬汁集中在主食表面，視覺與口感都更接近 Second Floor Cafe。"
    ];
  }

  if (categorySlug === "big-bite") {
    return [
      `先把 ${ingredientLead} 分別處理，麵包回烤、主排煎香、配菜保持乾爽。`,
      "主肉排或三明治內餡先做到多汁但可堆疊的狀態，避免組裝後整體鬆散。",
      `在麵包內側抹上 ${sauceLead}，再依序疊上熱主料、起司與爽口配菜。`,
      "薯塊或附餐另外裝盤，主體壓合後立刻上桌，才能保留 Big Bite 系列的厚實口感。"
    ];
  }

  if (categorySlug === "big-plate") {
    return [
      `主菜先用鹽、胡椒與核心醬料醃好，${ingredientLead} 也各自整理成可同時出餐的份量。`,
      "把半雞或豬腳先煎上色再進烤箱，期間同步完成玉米、薯條與酸菜等配菜。",
      `回到最後階段時再刷上 ${sauceLead} 或搭配醬料，讓表面亮澤但不過度潮濕。`,
      "切件後連同三樣配菜整盤排開，保留大盤主餐的豐盛感與明顯主副菜分區。"
    ];
  }

  if (categorySlug === "kids") {
    return [
      `先把 ${ingredientLead} 做成容易入口的大小，調味比一般主餐再柔和一些。`,
      "主蛋白與主食先完成八成，蔬菜與蛋再補進去，讓整體口感濕潤但不會糊在一起。",
      `把 ${sauceLead} 控制在薄薄包覆食材的程度，保留貳樓兒童餐好入口又有奶香的特色。`,
      "最後搭配小份配菜與飲品邏輯組盤，讓成品保有套餐感而不失去家裡可操作性。"
    ];
  }

  if (categorySlug === "dessert") {
    return [
      `先把 ${ingredientLead} 依甜點基底處理好，冷熱配件與醬料分開準備。`,
      "蛋糕、派或布朗尼主體先烤到中心仍微濕潤，再讓表面定型。",
      `上桌前補上 ${sauceLead}、冰淇淋或奶油起司，做出貳樓常見的熱冷對比。`,
      "最後以單盤甜點份量擺盤，讓主體、醬料與冰涼配件各自清楚可見。"
    ];
  }

  return [
    `先把 ${ingredientLead} 分別備料，讓主食、主蛋白和配菜都能在同一時間完成。`,
    "主體先煎炒或烘烤至接近餐廳出餐的熟度，再把配角食材依序加入。",
    `把 ${sauceLead} 調好後分次加入，讓每一層都有味道但不會蓋過主要食材。`,
    "最後以 Second Floor Cafe 常見的單盤份量組裝，保留主角突出、配料飽滿的視覺重點。"
  ];
}

function buildLocaleSteps(zhSteps) {
  return {
    en: [...zhSteps],
    ja: [...zhSteps],
    ko: [...zhSteps]
  };
}

function buildCustomAdditions(displayName, item, categorySlug) {
  if (item.spicy || displayName.includes("辣")) {
    return {
      "zh-TW": ["辣椒碎加量", "自製辣醬"],
      en: ["Extra chili flakes", "House chili sauce"],
      ja: ["唐辛子追加", "自家製辛味ソース"],
      ko: ["추가 고춧가루", "수제 칠리소스"]
    };
  }

  if (categorySlug === "open-sandwich" || categorySlug === "sf-brunch") {
    return {
      "zh-TW": ["水波蛋加一顆", "巴薩米克另外放"],
      en: ["Extra poached egg", "Balsamic on the side"],
      ja: ["ポーチドエッグ追加", "バルサミコ別添え"],
      ko: ["수란 추가", "발사믹 별도 제공"]
    };
  }

  if (categorySlug === "big-bite") {
    return {
      "zh-TW": ["雙份起司", "酸黃瓜片"],
      en: ["Double cheese", "Pickle slices"],
      ja: ["チーズ増量", "ピクルス追加"],
      ko: ["더블 치즈", "피클 추가"]
    };
  }

  if (categorySlug === "dessert") {
    return {
      "zh-TW": ["香草冰淇淋", "打發鮮奶油"],
      en: ["Vanilla ice cream", "Whipped cream"],
      ja: ["バニラアイス", "ホイップクリーム"],
      ko: ["바닐라 아이스크림", "휘핑크림"]
    };
  }

  return {
    "zh-TW": [],
    en: [],
    ja: [],
    ko: []
  };
}

function buildFaq(displayName, components) {
  return {
    "zh-TW": [
      {
        question: `想把 ${displayName} 做得更像貳樓版本，最重要的是什麼？`,
        answer: `先把 ${components.split("、").slice(0, 2).join("與")} 的火候抓對，再讓醬汁在最後階段包住主體，整體會更接近 Second Floor Cafe 的厚度與份量感。`
      }
    ],
    en: [
      {
        question: `What makes this ${displayName} feel closer to the restaurant version?`,
        answer: "Build the signature sauce separately, then finish the plate at the last minute so the texture stays layered and generous."
      }
    ],
    ja: [
      {
        question: `${displayName} を店っぽく仕上げるコツは？`,
        answer: "主役の具材を先に整え、最後にソースをまとわせてから盛り付けると、レストランらしい厚みが出ます。"
      }
    ],
    ko: [
      {
        question: `${displayName} 를 매장 스타일에 가깝게 만드는 핵심은 무엇인가요?`,
        answer: "주재료의 익힘을 먼저 맞추고 마지막에 소스를 입혀 마무리하면 매장 같은 두께감과 볼륨이 살아납니다."
      }
    ]
  };
}

function buildBody(displayName, components, categoryTag) {
  return {
    "zh-TW": `${displayName} 的在家還原版，重點是把 ${components.split("、").slice(0, 3).join("、")} 做出分層口感，並保留貳樓常見的 ${categoryTag} 大份量出餐感。\n\n只要依照先處理主料、再完成醬汁、最後整盤組裝的順序，就能做出接近 Second Floor Cafe 門市視覺與口味的還原版。`,
    en: `This home version keeps the layered plating and full-portion feeling associated with Second Floor Cafe.\n\nFollow the same order of preparing the main components first, finishing the sauce second, and plating at the end for the closest restaurant-style result.`,
    ja: `この再現版は、Second Floor Cafe らしいボリューム感と重ねた食感を意識して組み立てています。\n\n主役の具材、ソース、盛り付けの順で仕上げると、店で出てくるような完成度に近づけます。`,
    ko: `이 재현 버전은 Second Floor Cafe 특유의 넉넉한 한 접시 구성과 층이 살아 있는 식감을 목표로 했습니다.\n\n주재료 준비, 소스 완성, 마지막 플레이팅 순서를 지키면 매장 스타일에 더 가깝게 만들 수 있습니다.`
  };
}

function buildRecipe(entry) {
  const config = categoryConfig[entry.categorySlug];
  const slug = slugMap[entry.displayName];
  if (!slug) {
    throw new Error(`Missing slug mapping for ${entry.displayName}`);
  }

  if (!entry.item.components) {
    throw new Error(`Missing components for ${entry.displayName}`);
  }

  const { ingredients, seasonings } = buildIngredientsAndSeasonings(
    entry.displayName,
    entry.item,
    entry.categorySlug
  );
  const nutrition = adjustNutrition(config.nutrition, entry.displayName, entry.categorySlug);
  const zhSteps = buildZhSteps(entry.displayName, entry.item, entry.categorySlug, ingredients, seasonings);
  const customAdditions = buildCustomAdditions(entry.displayName, entry.item, entry.categorySlug);
  const faq = buildFaq(entry.displayName, entry.item.components);
  const body = buildBody(entry.displayName, entry.item.components, config.tag);

  return {
    slug,
    title: {
      "zh-TW": entry.displayName,
      en: humanizeSlug(slug),
      ja: `${entry.displayName} 再現レシピ`,
      ko: `${entry.displayName} 스타일 레시피`
    },
    description: {
      "zh-TW": buildDescription(entry.displayName, entry.item.components, config.tag),
      en: `Second Floor Cafe-inspired ${config.enCategory.toLowerCase()} with restaurant-style portions and ${entry.item.components}.`,
      ja: `Second Floor Cafe 風に ${entry.item.components} を組み合わせた、店の一皿を意識した再現レシピです。`,
      ko: `Second Floor Cafe 스타일로 ${entry.item.components} 구성을 살린, 매장 분량 기준의 재현 레시피입니다.`
    },
    servings: config.servings,
    prepTime: config.prepTime,
    cookTime: config.cookTime,
    totalTime: config.prepTime + config.cookTime,
    difficulty: config.difficulty,
    calories: nutrition.calories,
    protein: nutrition.protein,
    fat: nutrition.fat,
    carbs: nutrition.carbs,
    category: {
      "zh-TW": config.category,
      en: config.enCategory,
      ja: config.jaCategory,
      ko: config.koCategory
    },
    scenarios: {
      "zh-TW": config.scenarios,
      en: config.localeScenarios.en,
      ja: config.localeScenarios.ja,
      ko: config.localeScenarios.ko
    },
    equipment: {
      "zh-TW": config.equipment,
      en: config.localeEquipment.en,
      ja: config.localeEquipment.ja,
      ko: config.localeEquipment.ko
    },
    tags: {
      "zh-TW": ["名店還原", config.tag],
      en: ["Restaurant replica", config.enCategory],
      ja: ["名店再現", config.jaCategory],
      ko: ["맛집 재현", config.koCategory]
    },
    restaurantSource: {
      restaurant: "貳樓 Second Floor Cafe",
      dishName: entry.displayName,
      region: "全台連鎖"
    },
    intro: {
      "zh-TW": buildIntro(entry.displayName, entry.item.components, config.tag),
      en: `This version references common Second Floor Cafe techniques and builds the plate in the same restaurant-style order.`,
      ja: "Second Floor Cafe でよく見られる組み立て方を参考にし、皿全体の流れごと再現するイメージで作ります。",
      ko: "Second Floor Cafe에서 자주 보이는 조리 흐름을 참고해 한 접시 전체의 완성도를 살리는 방식으로 만듭니다."
    },
    steps: {
      "zh-TW": zhSteps,
      ...buildLocaleSteps(zhSteps)
    },
    tips: {
      "zh-TW": config.tips,
      en: [
        "Finish the main component and sauce separately before plating so the textures stay layered.",
        "Keep cold garnish and hot proteins apart until the final minute for a more restaurant-like result."
      ],
      ja: [
        "主役の具材とソースは別々に完成させ、最後に盛り付けると食感の差が残せます。",
        "冷たい付け合わせと温かい主菜は最後まで分けておくと、店らしい仕上がりになります。"
      ],
      ko: [
        "주재료와 소스를 따로 완성한 뒤 마지막에 합치면 질감 차이가 더 살아납니다.",
        "차가운 가니시와 뜨거운 단백질은 마지막에 합쳐야 매장 같은 결과가 납니다."
      ]
    },
    storage: {
      "zh-TW": config.storage,
      en: "Best enjoyed on the day it is made; refrigerate components separately when possible and reheat gently.",
      ja: "できれば当日中がおすすめ。保存する場合は具材とソースを分けて冷蔵し、食べる前にやさしく温め直します。",
      ko: "가급적 당일 섭취를 권장합니다. 보관할 때는 재료와 소스를 나누어 냉장하고 먹기 직전에 부드럽게 다시 데우세요."
    },
    substitutions: {
      "zh-TW": config.substitutions,
      en: [...config.substitutions],
      ja: [...config.substitutions],
      ko: [...config.substitutions]
    },
    relatedIngredients: ingredients.slice(0, 4).map((item) => item.name),
    customAdditions,
    faqs: faq,
    ingredients,
    seasonings,
    body
  };
}

function writeRecipes(recipes) {
  clearGeneratedArtifacts();

  for (const recipe of recipes) {
    writeFileSync(join(recipeDirs["zh-TW"], `${recipe.slug}.md`), renderRecipeMarkdown(recipe, "zh-TW"), "utf8");
    writeFileSync(join(recipeDirs.en, `${recipe.slug}.md`), renderRecipeMarkdown(recipe, "en"), "utf8");
    writeFileSync(join(recipeDirs.ja, `${recipe.slug}.md`), renderRecipeMarkdown(recipe, "ja"), "utf8");
    writeFileSync(join(recipeDirs.ko, `${recipe.slug}.md`), renderRecipeMarkdown(recipe, "ko"), "utf8");
    writeFileSync(join(imagesDir, `${recipe.slug}.svg`), renderSvg(recipe.title["zh-TW"]), "utf8");
  }
}

function main() {
  const menu = JSON.parse(readFileSync(menuPath, "utf8"));
  const researchMarkdown = readFileSync(researchPath, "utf8");
  const componentMap = parseResearchComponents(researchMarkdown);
  const normalizedMenu = normalizeMenu(menu, componentMap);
  writeFileSync(menuPath, `${JSON.stringify(normalizedMenu, null, 2)}\n`, "utf8");

  const entries = flattenFoodItems(normalizedMenu);
  const recipes = entries.map((entry) => buildRecipe(entry));
  writeRecipes(recipes);

  console.log(`Generated ${recipes.length} Second Floor recipes.`);
}

main();
