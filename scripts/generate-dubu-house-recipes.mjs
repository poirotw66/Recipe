import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { renderRecipeMarkdown, renderSvg } from "./lib/restaurant-recipe-markdown.mjs";
import { buildDetailedDhSteps } from "./lib/dh-zh-steps.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const menuPath = join(root, "src/data/dubu-house-menu.json");
const recipeDirs = {
  "zh-TW": join(root, "src/content/recipes"),
  en: join(root, "src/content/recipes-en"),
  ja: join(root, "src/content/recipes-ja"),
  ko: join(root, "src/content/recipes-ko")
};
const imagesDir = join(root, "public/images/recipes");
const publishedAt = "2026-06-03";
const brandName = "涓豆腐 Dubu House";
const brandLabel = "Dubu House Replica";

// Unified multi-language ingredients & seasonings dictionary to eliminate unit mismatches and warning triggers
const INGREDIENT_DICT = {
  "嫩豆腐": { name: { "zh-TW": "嫩豆腐", en: "soft tofu", ja: "純豆腐", ko: "순두부" }, unit: { "zh-TW": "包", en: "pack", ja: "パック", ko: "팩" }, amount: 1 },
  "牛": { name: { "zh-TW": "牛肉片", en: "beef slices", ja: "牛肉スライス", ko: "소고기 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 120 },
  "牛肉": { name: { "zh-TW": "牛肉片", en: "beef slices", ja: "牛肉スライス", ko: "소고기 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 120 },
  "羊": { name: { "zh-TW": "羊肉片", en: "lamb slices", ja: "羊肉スライス", ko: "양고기 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 120 },
  "羊肉": { name: { "zh-TW": "羊肉片", en: "lamb slices", ja: "羊肉スライス", ko: "양고기 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 120 },
  "豬": { name: { "zh-TW": "豬肉片", en: "pork slices", ja: "豚肉スライス", ko: "돼지고기 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 120 },
  "豬肉": { name: { "zh-TW": "豬肉片", en: "pork slices", ja: "豚肉スライス", ko: "돼지고기 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 120 },
  "豬肉片": { name: { "zh-TW": "豬肉片", en: "pork slices", ja: "豚肉スライス", ko: "돼지고기 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 120 },
  "霜降牛": { name: { "zh-TW": "霜降牛肉片", en: "prime beef slices", ja: "霜降り牛肉スライス", ko: "살치살 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "牛五花": { name: { "zh-TW": "牛五花肉片", en: "beef brisket slices", ja: "牛カルビスライス", ko: "우삼겹 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 180 },
  "翼板牛": { name: { "zh-TW": "翼板牛肉", en: "flat iron steak", ja: "羽下肉", ko: "살치살" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 200 },
  "豬後腿肉": { name: { "zh-TW": "豬後腿肉丁", en: "pork hind shank cubes", ja: "豚もも肉角切り", ko: "돼지 뒷다리살" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 200 },
  "鮮切鯛魚": { name: { "zh-TW": "鯛魚片", en: "snapper slices", ja: "鯛の切り身", ko: "도미 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "酥炸旗魚": { name: { "zh-TW": "酥炸旗魚塊", en: "crispy fried sailfish", ja: "カジキマグロの唐揚げ", ko: "바삭한 새치 튀김" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "鮮魚": { name: { "zh-TW": "鯛魚片", en: "snapper slices", ja: "鯛の切り身", ko: "도미 슬라이스" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "飛虎魚": { name: { "zh-TW": "鬼頭刀魚片", en: "mahi-mahi fillet", ja: "シイラフィレ", ko: "만새기 필레" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 180 },
  "鮮蚵": { name: { "zh-TW": "新鮮生蠔", en: "fresh oysters", ja: "新鮮な牡蠣", ko: "생굴" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 100 },
  "蛤蜊": { name: { "zh-TW": "蛤蜊", en: "clams", ja: "アサリ", ko: "바지락" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 200 },
  "鮮蝦": { name: { "zh-TW": "白蝦", en: "shrimp", ja: "エビ", ko: "새우" }, unit: { "zh-TW": "隻", en: "pcs", ja: "尾", ko: "마리" }, amount: 6 },
  "白蝦": { name: { "zh-TW": "白蝦", en: "shrimp", ja: "エビ", ko: "새우" }, unit: { "zh-TW": "隻", en: "pcs", ja: "尾", ko: "마리" }, amount: 6 },
  "中卷": { name: { "zh-TW": "透抽", en: "squid", ja: "イカ", ko: "오징어" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "透抽": { name: { "zh-TW": "透抽", en: "squid", ja: "イカ", ko: "오징어" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "去骨雞腿肉": { name: { "zh-TW": "去骨雞腿肉", en: "boneless chicken thigh", ja: "鶏もも肉", ko: "닭다리살" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 250 },
  "植物雞": { name: { "zh-TW": "植物肉雞塊", en: "plant-based chicken nuggets", ja: "植物性チキンナゲット", ko: "대체육 치킨너겟" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "鮮菇": { name: { "zh-TW": "鮮香菇", en: "shiitake mushrooms", ja: "しいたけ", ko: "표고버섯" }, unit: { "zh-TW": "朵", en: "pcs", ja: "枚", ko: "개" }, amount: 3 },
  "鮮香菇": { name: { "zh-TW": "鮮香菇", en: "shiitake mushrooms", ja: "しいたけ", ko: "표고버섯" }, unit: { "zh-TW": "朵", en: "pcs", ja: "枚", ko: "개" }, amount: 3 },
  "洋蔥": { name: { "zh-TW": "洋蔥", en: "onion", ja: "玉ねぎ", ko: "양파" }, unit: { "zh-TW": "顆", en: "pc", ja: "個", ko: "개" }, amount: 0.5 },
  "青蔥": { name: { "zh-TW": "青蔥", en: "scallion", ja: "青ネギ", ko: "대파" }, unit: { "zh-TW": "根", en: "stalk", ja: "本", ko: "대" }, amount: 1 },
  "高湯": { name: { "zh-TW": "高湯", en: "kelp broth", ja: "出汁", ko: "육수" }, unit: { "zh-TW": "毫升", en: "ml", ja: "ml", ko: "ml" }, amount: 400 },
  "海菜": { name: { "zh-TW": "海帶芽", en: "seaweed", ja: "ワカメ", ko: "미역" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 15 },
  "起司年糕": { name: { "zh-TW": "起司年糕", en: "cheese-stuffed rice cake", ja: "チーズトック", ko: "치즈떡" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 80 },
  "年糕": { name: { "zh-TW": "韓式年糕條", en: "Korean rice cakes", ja: "トック", ko: "떡볶이 떡" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "韓式年糕條": { name: { "zh-TW": "韓式年糕條", en: "Korean rice cakes", ja: "トック", ko: "떡볶이 떡" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "野菜": { name: { "zh-TW": "高麗菜", en: "cabbage", ja: "キャベツ", ko: "양배추" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 100 },
  "高麗菜": { name: { "zh-TW": "高麗菜", en: "cabbage", ja: "キャベツ", ko: "양배추" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 100 },
  "泡菜": { name: { "zh-TW": "韓式泡菜", en: "Korean kimchi", ja: "キムチ", ko: "김치" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 100 },
  "白米": { name: { "zh-TW": "白米", en: "uncooked white rice", ja: "米", ko: "쌀" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "胡蘿蔔": { name: { "zh-TW": "胡蘿蔔", en: "carrot", ja: "にんじん", ko: "당근" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 30 },
  "菠菜": { name: { "zh-TW": "菠菜", en: "spinach", ja: "ほうれん草", ko: "시금치" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 50 },
  "豆芽": { name: { "zh-TW": "黃豆芽", en: "soybean sprouts", ja: "豆もやし", ko: "콩나물" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 50 },
  "木耳": { name: { "zh-TW": "黑木耳", en: "wood ear mushroom", ja: "きくらげ", ko: "목이버섯" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 30 },
  "冬粉": { name: { "zh-TW": "韓式冬粉", en: "Korean potato starch noodles", ja: "韓国春雨", ko: "당면" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 100 },
  "脆薯": { name: { "zh-TW": "馬鈴薯條", en: "potato fries", ja: "ポテトフライ", ko: "감자튀김" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 200 },
  "魚丸": { name: { "zh-TW": "韓式魚板丸", en: "Korean fish balls", ja: "お묵", ko: "어묵" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "雞蛋": { name: { "zh-TW": "雞蛋", en: "egg", ja: "卵", ko: "달걀" }, unit: { "zh-TW": "顆", en: "pc", ja: "個", ko: "개" }, amount: 1 },
  "魚卵": { name: { "zh-TW": "飛魚卵", en: "flying fish roe", ja: "とびこ", ko: "날치알" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 30 },
  "飛魚卵": { name: { "zh-TW": "飛魚卵", en: "flying fish roe", ja: "とびこ", ko: "날치알" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 30 },
  "蟹味棒": { name: { "zh-TW": "蟹味棒", en: "crab sticks", ja: "カニカマ", ko: "게맛살" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 50 },
  "絲瓜": { name: { "zh-TW": "絲瓜", en: "loofah", ja: "ヘチマ", ko: "수박" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "大白菜": { name: { "zh-TW": "山東大白菜", en: "napa cabbage", ja: "白菜", ko: "배추" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 200 },
  "山東大白菜": { name: { "zh-TW": "山東大白菜", en: "napa cabbage", ja: "白菜", ko: "배추" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 200 },
  "紅棗": { name: { "zh-TW": "紅棗", en: "red dates", ja: "ナツメ", ko: "대추" }, unit: { "zh-TW": "顆", en: "pcs", ja: "個", ko: "개" }, amount: 4 },
  "人蔘": { name: { "zh-TW": "新鮮高麗人蔘", en: "fresh Korean ginseng", ja: "高麗人参", ko: "인삼" }, unit: { "zh-TW": "支", en: "root", ja: "本", ko: "뿌리" }, amount: 1 },
  "糯米": { name: { "zh-TW": "糯米", en: "glutinous rice", ja: "もち米", ko: "찹쌀" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 50 },
  "春雞": { name: { "zh-TW": "全雞", en: "whole Cornish hen", ja: "丸鶏", ko: "영계" }, unit: { "zh-TW": "隻", en: "whole", ja: "羽", ko: "마리" }, amount: 1 },
  "生蠔": { name: { "zh-TW": "新鮮生蠔", en: "fresh oysters", ja: "牡蠣", ko: "굴" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "新鮮生蠔": { name: { "zh-TW": "新鮮生蠔", en: "fresh oysters", ja: "牡蠣", ko: "굴" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "豆腐": { name: { "zh-TW": "嫩豆腐", en: "soft tofu", ja: "純豆腐", ko: "순두부" }, unit: { "zh-TW": "包", en: "pack", ja: "パック", ko: "팩" }, amount: 1 },
  "馬鈴薯": { name: { "zh-TW": "馬鈴薯", en: "potato", ja: "じゃがいも", ko: "감자" }, unit: { "zh-TW": "顆", en: "pc", ja: "個", ko: "개" }, amount: 2 },
  "火腿": { name: { "zh-TW": "火腿丁", en: "diced ham", ja: "ハム", ko: "햄" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 50 },
  "火腿丁": { name: { "zh-TW": "火腿丁", en: "diced ham", ja: "ハム", ko: "햄" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 50 },
  "德式香腸": { name: { "zh-TW": "德式香腸丁", en: "sausage coins", ja: "ソーセージ", ko: "소시지" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 50 },
  "德式香腸丁": { name: { "zh-TW": "德式香腸丁", en: "sausage coins", ja: "ソーセージ", ko: "소시지" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 50 },
  "玉米": { name: { "zh-TW": "玉米粒", en: "sweet corn", ja: "コーン", ko: "옥수수" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 30 },
  "玉米粒": { name: { "zh-TW": "玉米粒", en: "sweet corn", ja: "コーン", ko: "옥수수" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 30 },
  "甜椒": { name: { "zh-TW": "彩椒丁", en: "diced bell pepper", ja: "パプリカ", ko: "파프리카" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 30 },
  "彩椒丁": { name: { "zh-TW": "彩椒丁", en: "diced bell pepper", ja: "パプリカ", ko: "파프리카" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 30 },
  "芝麻": { name: { "zh-TW": "芝麻", en: "sesame seeds", ja: "ごま", ko: "참깨" }, unit: { "zh-TW": "少許", en: "pinch", ja: "少々", ko: "약간" }, amount: 0.25 },
  "蔥花": { name: { "zh-TW": "蔥花", en: "chopped scallions", ja: "刻みネギ", ko: "다진 파" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 1 },

  // Seasonings
  "切達起司": { name: { "zh-TW": "切達起司片", en: "cheddar cheese slice", ja: "チェダーチーズ", ko: "체다치즈" }, unit: { "zh-TW": "片", en: "slice", ja: "枚", ko: "장" }, amount: 1 },
  "切達起司片": { name: { "zh-TW": "切達起司片", en: "cheddar cheese slice", ja: "チェダーチーズ", ko: "체다치즈" }, unit: { "zh-TW": "片", en: "slice", ja: "枚", ko: "장" }, amount: 1 },
  "莫札瑞拉起司": { name: { "zh-TW": "莫札瑞拉起司絲", en: "mozzarella cheese", ja: "モッツァレラチーズ", ko: "모짜렐라 치즈" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 60 },
  "莫札瑞拉起司絲": { name: { "zh-TW": "莫札瑞拉起司絲", en: "mozzarella cheese", ja: "モッツァレラチーズ", ko: "모짜렐라 치즈" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 60 },
  "韓式辣醬": { name: { "zh-TW": "韓式辣椒醬", en: "Korean chili paste (gochujang)", ja: "コチュジャン", ko: "고추장" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 1.5 },
  "醬油": { name: { "zh-TW": "醬油", en: "soy sauce", ja: "醤油", ko: "간장" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 1 },
  "蒜末": { name: { "zh-TW": "蒜末", en: "minced garlic", ja: "みじん切りニンニク", ko: "다진 마늘" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 1 },
  "芝麻油": { name: { "zh-TW": "韓式芝麻油", en: "toasted sesame oil", ja: "ごま油", ko: "참기름" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 1 },
  "韓式芝麻油": { name: { "zh-TW": "韓式芝麻油", en: "toasted sesame oil", ja: "ごま油", ko: "참기름" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 1 },
  "韓式辣椒粉": { name: { "zh-TW": "韓式辣椒粉", en: "Korean chili flakes (gochugaru)", ja: "韓国唐辛子粉", ko: "고춧가루" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 1 },
  "黑糖": { name: { "zh-TW": "黑糖粉", en: "brown sugar", ja: "黒糖", ko: "흑설탕" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 50 },
  "肉桂": { name: { "zh-TW": "肉桂粉", en: "cinnamon powder", ja: "シナモンパウダー", ko: "계피가루" }, unit: { "zh-TW": "小匙", en: "tsp", ja: "小さじ", ko: "작은술" }, amount: 0.5 },
  "堅果粒": { name: { "zh-TW": "綜合堅果碎", en: "crushed mixed nuts", ja: "砕いたナッツ", ko: "모둠 견과류 분태" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 20 },
  "非基改黃豆": { name: { "zh-TW": "非基改黃豆", en: "non-GMO soybeans", ja: "非遺伝子組み換え大豆", ko: "비유전자조작 대두" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "黑糖珍珠": { name: { "zh-TW": "黑糖珍珠", en: "tapioca pearls in brown sugar", ja: "黒糖タピオカ", ko: "흑당 타피오카 펄" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 50 },
  "黑松露": { name: { "zh-TW": "黑松露醬", en: "black truffle paste", ja: "黒トリュフソース", ko: "블랙 트러플 페이스트" }, unit: { "zh-TW": "小匙", en: "tsp", ja: "小さじ", ko: "작은술" }, amount: 1 },
  "黑松露醬": { name: { "zh-TW": "黑松露醬", en: "black truffle paste", ja: "黒トリュフソース", ko: "블랙 트러플 페이스트" }, unit: { "zh-TW": "小匙", en: "tsp", ja: "小さじ", ko: "작은술" }, amount: 1 },
  "黑炸醬": { name: { "zh-TW": "韓式黑炸醬", en: "Korean black bean paste (chunjang)", ja: "춘장", ko: "짜장 소스" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 2 },
  "巧達起司醬": { name: { "zh-TW": "巧達起司醬", en: "cheddar cheese sauce", ja: "チェダーチーズソース", ko: "체다치즈 소스" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 2 },
  "玫瑰醬": { name: { "zh-TW": "韓式玫瑰醬", en: "K-Rose sauce", ja: "ロゼソース", ko: "로제 소스" }, unit: { "zh-TW": "毫模升", en: "ml", ja: "ml", ko: "ml" }, amount: 150 },
  "春川辣醬": { name: { "zh-TW": "春川辣炒醬", en: "Chuncheon spicy stir-fry sauce", ja: "タッカル비소스", ko: "닭갈비 소스" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 3 },
  "韓式BBQ醬": { name: { "zh-TW": "韓式BBQ燒烤醬", en: "Korean BBQ marinade", ja: "韓国風BBQソース", ko: "갈비 양념" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 3 },
  "肯瓊醬": { name: { "zh-TW": "蜂蜜肯瓊醬", en: "honey cajun sauce", ja: "ケイジャンソース", ko: "케이준 소스" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 3 },
  "洋蔥白醬": { name: { "zh-TW": "洋蔥白奶油醬", en: "creamy onion white sauce", ja: "オニオンホワイトソース", ko: "양파 화이트 소스" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 3 },
  "蜂蜜蒜味醬": { name: { "zh-TW": "蜂蜜蒜味醬", en: "honey garlic glaze", ja: "ハニーガーリックソース", ko: "허니 갈릭 소스" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 3 },
  "糖醋醬": { name: { "zh-TW": "韓式糖醋醬汁", en: "sweet and sour sauce", ja: "甘酢ダレ", ko: "탕수육 소스" }, unit: { "zh-TW": "毫升", en: "ml", ja: "ml", ko: "ml" }, amount: 150 },
  "韓式糖醋醬汁": { name: { "zh-TW": "韓式糖醋醬汁", en: "sweet and sour sauce", ja: "甘酢ダレ", ko: "탕수육 소스" }, unit: { "zh-TW": "毫升", en: "ml", ja: "ml", ko: "ml" }, amount: 150 },
  "鹽": { name: { "zh-TW": "鹽", en: "salt", ja: "塩", ko: "소금" }, unit: { "zh-TW": "少許", en: "pinch", ja: "少々", ko: "약간" }, amount: 0.25 },
  "糖": { name: { "zh-TW": "白糖", en: "sugar", ja: "砂糖", ko: "설탕" }, unit: { "zh-TW": "小匙", en: "tsp", ja: "小さじ", ko: "작은술" }, amount: 1 },
  "白糖": { name: { "zh-TW": "白糖", en: "sugar", ja: "砂糖", ko: "설탕" }, unit: { "zh-TW": "小匙", en: "tsp", ja: "小さじ", ko: "작은술" }, amount: 1 },
  "胡椒粉": { name: { "zh-TW": "胡椒粉", en: "black pepper powder", ja: "コショウ粉", ko: "후춧가루" }, unit: { "zh-TW": "少許", en: "pinch", ja: "少々", ko: "약간" }, amount: 0.25 },
  "蜂蜜": { name: { "zh-TW": "蜂蜜", en: "honey", ja: "ハチミツ", ko: "꿀" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 1 },
  "韓式炸雞粉": { name: { "zh-TW": "韓式炸雞粉", en: "Korean fried chicken mix", ja: "韓国風唐揚げ粉", ko: "치킨 튀김가루" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "中筋麵粉": { name: { "zh-TW": "中筋麵粉", en: "all-purpose flour", ja: "中力粉", ko: "중력분" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 150 },
  "奶油": { name: { "zh-TW": "無鹽奶油", en: "unsalted butter", ja: "無塩バター", ko: "무염 버터" }, unit: { "zh-TW": "克", en: "g", ja: "g", ko: "g" }, amount: 20 },
  "加價": { name: { "zh-TW": "白糖", en: "sugar", ja: "砂糖", ko: "설탕" }, unit: { "zh-TW": "小匙", en: "tsp", ja: "小さじ", ko: "작은술" }, amount: 1 },
  "咖哩粉": { name: { "zh-TW": "咖哩粉", en: "curry powder", ja: "カレー粉", ko: "카레가루" }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 1.5 }
};

const categoryConfig = {
  soondubu: {
    tag: "嫩豆腐煲",
    category: "韓式鍋物",
    enCategory: "Korean hot pot",
    jaCategory: "韓国鍋料理",
    koCategory: "한국식 전골",
    scenarios: ["一人料理"],
    localeScenarios: { en: ["Cooking for one"], ja: ["一人分の料理"], ko: ["1인 요리"] },
    equipment: ["韓式辣湯鍋", "小湯鍋"],
    localeEquipment: { en: ["Korean stew pot", "Saucepan"], ja: ["韓国鍋", "小鍋"], ko: ["한국식 냄비", "작은 냄비"] },
    servings: 2, prepTime: 20, cookTime: 18, difficulty: "中等",
    nutrition: { calories: 520, protein: 28, fat: 24, carbs: 42 },
    substitutions: ["嫩豆腐", "韓式辣醬"],
    storage: "嫩豆腐煲建議現煮現吃；湯頭與豆腐分開冷藏可保存 1 天，回熱時小火加湯。",
    tips: [
      "湯頭要先炒香料與辣醬，再下高湯煮到有層次，最後才下嫩豆腐，口感才會接近門市。",
      "起司或海鮮版本請在最後 2 分鐘加入，避免過煮影響滑嫩度。"
    ]
  },
  "stone-pot-rice": {
    tag: "石鍋飯",
    category: "韓式飯食",
    enCategory: "Stone pot rice",
    jaCategory: "石焼ご飯",
    koCategory: "돌솥밥",
    scenarios: ["一人料理", "高蛋白料理"],
    localeScenarios: { en: ["Cooking for one", "High-protein meals"], ja: ["一人分の料理", "高タンパク料理"], ko: ["1인 요리", "고단백 요리"] },
    equipment: ["石鍋或鑄鐵鍋", "平底鍋"],
    localeEquipment: { en: ["Stone pot or cast-iron pot", "Skillet"], ja: ["石鍋または鋳鉄鍋", "フライパン"], ko: ["돌솥 또는 주물냄비", "프라이팬"] },
    servings: 1, prepTime: 15, cookTime: 20, difficulty: "中等",
    nutrition: { calories: 610, protein: 26, fat: 18, carbs: 82 },
    substitutions: ["白米", "芝麻油"],
    storage: "石鍋飯建議現做現吃；若要帶走，配料與白飯分開保存。",
    tips: [
      "米飯先煮至八分熟再入石鍋，才能做出鍋巴又不夠硬。",
      "上桌前淋芝麻油並靠餘熱逼出香氣，是還原涓豆腐石鍋飯的關鍵。"
    ]
  },
  appetizer: {
    tag: "韓式前菜",
    category: "前菜",
    enCategory: "Korean appetizers",
    jaCategory: "韓国前菜",
    koCategory: "한국식 전채",
    scenarios: ["一人料理", "宵夜料理"],
    localeScenarios: { en: ["Cooking for one", "Late-night meals"], ja: ["一人分の料理", "夜食"], ko: ["1인 요리", "야식"] },
    equipment: ["炸鍋", "平底鍋"],
    localeEquipment: { en: ["Fryer", "Skillet"], ja: ["フライヤー", "フライパン"], ko: ["튀김냄비", "프라이팬"] },
    servings: 2, prepTime: 18, cookTime: 16, difficulty: "中等",
    nutrition: { calories: 430, protein: 16, fat: 22, carbs: 38 },
    substitutions: ["韓式冬粉", "豆腐"],
    storage: "炸物前菜當天最好吃；冷藏後以烤箱回脆。",
    tips: [
      "前菜講究熱燙上桌，炸物起鍋後立刻瀝油並附上沾醬。",
      "涼拌或蒸蛋類前菜請控制火候，保留滑嫩口感。"
    ]
  },
  specialty: {
    tag: "特色料理",
    category: "韓式主菜",
    enCategory: "Korean mains",
    jaCategory: "韓国主菜",
    koCategory: "한국식 메인",
    scenarios: ["高蛋白料理"],
    localeScenarios: { en: ["High-protein meals"], ja: ["高タンパク料理"], ko: ["고단백 요리"] },
    equipment: ["平底鍋", "湯鍋"],
    localeEquipment: { en: ["Skillet", "Pot"], ja: ["フライパン", "鍋"], ko: ["프라이팬", "냄비"] },
    servings: 2, prepTime: 22, cookTime: 22, difficulty: "中等",
    nutrition: { calories: 640, protein: 30, fat: 26, carbs: 58 },
    substitutions: ["年糕", "韓式辣醬"],
    storage: "特色料理建議現做現吃；含海鮮的版本請當天食用。",
    tips: [
      "韓式特色菜多半靠醬料炒香，請先把醬炒出紅油再下主料。",
      "年糕或煎餅類料理要保留外酥內軟，火太大容易焦硬。"
    ]
  },
  "chef-recommendation": {
    tag: "主廚推薦",
    category: "韓式主菜",
    enCategory: "Chef specials",
    jaCategory: "シェフおすすめ",
    koCategory: "셰프 추천",
    scenarios: ["宵夜料理"],
    localeScenarios: { en: ["Late-night meals"], ja: ["夜食"], ko: ["야식"] },
    equipment: ["炸鍋", "鐵板或平底鍋"],
    localeEquipment: { en: ["Fryer", "Griddle or skillet"], ja: ["フライヤー", "철판 또는 프라이팬"], ko: ["튀김냄비", "철판 또는 프라이팬"] },
    servings: 2, prepTime: 25, cookTime: 20, difficulty: "進階",
    nutrition: { calories: 720, protein: 34, fat: 36, carbs: 52 },
    substitutions: ["去骨雞腿肉", "切達起司"],
    storage: "炸雞建議現炸現吃；鐵板肉類可冷藏 1 天後回鍋加熱。",
    tips: [
      "韓式炸雞要分兩次炸，皮才會薄脆；醬汁最後再裹。",
      "鐵板料理請預熱鍋具，讓肉汁鎖住再上桌。"
    ]
  },
  dessert: {
    tag: "甜品",
    category: "甜點",
    enCategory: "Desserts",
    jaCategory: "デザート",
    koCategory: "디저트",
    scenarios: ["一人料理"],
    localeScenarios: { en: ["Cooking for one"], ja: ["一人分の料理"], ko: ["1인 요리"] },
    equipment: ["平底鍋", "攪拌盆"],
    localeEquipment: { en: ["Skillet", "Mixing bowl"], ja: ["フライパン", "ボウル"], ko: ["프라이팬", "믹싱 볼"] },
    servings: 2, prepTime: 15, cookTime: 12, difficulty: "簡單",
    nutrition: { calories: 380, protein: 6, fat: 14, carbs: 56 },
    substitutions: ["黑糖", "豆腐"],
    storage: "甜點建議現做現吃；含冰淇淋的版本請分開保存。",
    tips: [
      "韓式黑糖餅要保留外脆內流心，火溫不可過高。",
      "豆腐甜品重豆香，豆腐與糖漿最後再組合。"
    ]
  },
  "kings-table": {
    tag: "王的餐桌",
    category: "限定主菜",
    enCategory: "Limited specials",
    jaCategory: "限定メニュー",
    koCategory: "한정 메뉴",
    scenarios: ["一人料理"],
    localeScenarios: { en: ["Cooking for one"], ja: ["一人分の料理"], ko: ["1인 요리"] },
    equipment: ["平底鍋", "小湯鍋"],
    localeEquipment: { en: ["Skillet", "Saucepan"], ja: ["フライパン", "小鍋"], ko: ["프라이팬", "작은 냄비"] },
    servings: 2, prepTime: 20, cookTime: 18, difficulty: "中等",
    nutrition: { calories: 560, protein: 24, fat: 24, carbs: 48 },
    substitutions: ["年糕", "雞蛋"],
    storage: "限定菜色建議現做現吃。",
    tips: ["限定系列通常以單一強烈風味辨識，先把核心醬料炒香最重要。"]
  },
  "truffle-tteok-season": {
    tag: "季節限定",
    category: "限定主菜",
    enCategory: "Seasonal specials",
    jaCategory: "季節限定",
    koCategory: "시즌 한정",
    scenarios: ["一人料理"],
    localeScenarios: { en: ["Cooking for one"], ja: ["一人分の料理"], ko: ["1인 요리"] },
    equipment: ["平底鍋", "湯鍋"],
    localeEquipment: { en: ["Skillet", "Pot"], ja: ["フライパン", "鍋"], ko: ["프라이팬", "냄비"] },
    servings: 2, prepTime: 22, cookTime: 20, difficulty: "進階",
    nutrition: { calories: 680, protein: 26, fat: 30, carbs: 62 },
    substitutions: ["起司年糕", "黑松露"],
    storage: "含起司與松露的料理建議現做現吃。",
    tips: ["松露與起司請在最後階段加入，才能保留香氣與牽絲感。"]
  }
};

// Help map slug to its detailed list of ingredients & seasonings
function getIngredientsAndSeasoningsForSlug(slug, displayName) {
  let ingKeys = [];
  let seaKeys = [];

  // Parse based on typical recipe profiles
  if (slug.includes("soondubu")) {
    ingKeys = ["嫩豆腐", "洋蔥", "青蔥", "高湯"];
    seaKeys = ["韓式辣醬", "醬油", "蒜末", "韓式芝麻油"];
    
    // Customize components
    if (slug.includes("cheese-stuffed-rice-cake-soondubu")) {
      ingKeys.splice(1, 0, "起司年糕");
      seaKeys.unshift("切達起司", "莫札瑞拉起司絲");
    }
    else if (slug.includes("fresh-fish-seaweed")) {
      ingKeys.splice(1, 0, "鮮切鯛魚", "海菜");
      if (slug.includes("rice-cake")) {
        ingKeys.splice(1, 0, "起司年糕");
      }
      seaKeys.unshift("切達起司");
    }
    else if (slug.includes("plant-based-fried-chicken")) {
      ingKeys.splice(1, 0, "植物雞", "鮮香菇");
    }
    else if (slug.includes("kimchi-mushroom")) {
      ingKeys.splice(1, 0, "泡菜", "鮮香菇");
    }
    else if (slug.includes("cheese-kimchi-mushroom")) {
      ingKeys.splice(1, 0, "泡菜", "鮮香菇");
      seaKeys.unshift("切達起司", "莫札瑞拉起司絲");
    }
    else if (slug.includes("kimchi")) {
      ingKeys.splice(1, 0, "泡菜", "豬肉片");
    }
    else if (slug.includes("mushroom")) {
      ingKeys.splice(1, 0, "鮮香菇");
    }
    else if (slug.includes("curry")) {
      ingKeys.splice(1, 0, "豬肉片");
      seaKeys[0] = "咖哩粉";
    }
    else if (slug.includes("cheese-soondubu")) {
      seaKeys.unshift("切達起司", "莫札瑞拉起司絲");
      ingKeys.splice(1, 0, "牛肉");
    }
    else if (slug.includes("cheese-vegetable")) {
      ingKeys.splice(1, 0, "高麗菜", "鮮香菇");
      seaKeys = ["切達起司", "莫札瑞拉起司絲", "醬油", "蒜末", "韓式芝麻油"];
    }
    else if (slug.includes("vegetable")) {
      ingKeys.splice(1, 0, "高麗菜", "鮮香菇");
      seaKeys = ["醬油", "蒜末", "韓式芝麻油", "鹽"];
    }
    else if (slug.includes("combo")) {
      ingKeys.splice(1, 0, "牛肉", "白蝦", "蛤蜊");
    }
    else if (slug.includes("dumpling")) {
      ingKeys.splice(1, 0, "餃子", "豬肉片");
    }
    else if (slug.includes("clams-shrimp")) {
      ingKeys = ["嫩豆腐", "蛤蜊", "白蝦", "洋蔥", "青蔥", "高湯"];
      seaKeys = ["醬油", "蒜末", "韓式芝麻油", "鹽"];
    }
    else if (slug.includes("kimchi-seafood")) {
      ingKeys.splice(1, 0, "泡菜", "白蝦", "蛤蜊");
    }
    else if (slug.includes("seafood")) {
      ingKeys.splice(1, 0, "白蝦", "蛤蜊", "透抽");
    }
    else if (slug.includes("seaweed-oyster")) {
      ingKeys.splice(1, 0, "海菜", "新鮮生蠔");
      seaKeys = ["醬油", "蒜末", "韓式芝麻油", "鹽"];
    }
    else if (slug.includes("fish")) {
      ingKeys.splice(1, 0, "鮮切鯛魚");
    }
  } else if (slug.includes("stone-pot-rice")) {
    if (slug.includes("duck-jerky")) {
      ingKeys = ["白米", "鴨賞", "高麗菜", "青蔥"];
      seaKeys = ["韓式芝麻油", "醬油", "鹽"];
    } else if (slug.includes("golden-chicken")) {
      ingKeys = ["白米", "去骨雞腿肉", "鮮香菇", "青蔥"];
      seaKeys = ["韓式芝麻油", "醬油", "白糖"];
    } else {
      ingKeys = ["白米", "胡蘿蔔", "菠菜", "青蔥"];
      seaKeys = ["韓式芝麻油", "醬油", "鹽"];
    }
  } else if (slug.includes("bibimbap")) {
    ingKeys = ["白米", "霜降牛", "胡蘿蔔", "菠菜", "黃豆芽", "黑木耳", "雞蛋"];
    seaKeys = ["韓式芝麻油", "韓國辣醬", "芝麻"];
  } else if (slug.includes("fried-chicken") && !slug.includes("stired") && !slug.includes("stir-fried") && !slug.includes("rice-cake")) {
    if (slug.includes("combo")) {
      ingKeys = ["去骨雞腿肉"];
      seaKeys = ["韓式炸雞粉", "韓式辣醬", "蜂蜜", "芝麻", "鹽", "胡椒粉", "韓式芝麻油"];
    } else {
      ingKeys = ["去骨雞腿肉", "洋蔥", "青蔥"];
      if (slug.includes("cajun")) {
        seaKeys = ["韓式炸雞粉", "肯瓊醬", "韓式芝麻油", "芝麻", "鹽", "胡椒粉"];
      } else if (slug.includes("creamy-onion")) {
        seaKeys = ["韓式炸雞粉", "洋蔥白醬", "韓式芝麻油", "芝麻", "鹽", "胡椒粉"];
      } else if (slug.includes("honey-garlic")) {
        seaKeys = ["韓式炸雞粉", "蜂蜜蒜味醬", "韓式芝麻油", "芝麻", "鹽", "胡椒粉"];
      } else if (slug.includes("original")) {
        seaKeys = ["韓式炸雞粉", "鹽", "胡椒粉", "韓式芝麻油"];
      } else if (slug.includes("spicy")) {
        seaKeys = ["韓式炸雞粉", "韓式辣醬", "蜂蜜", "芝麻", "鹽", "胡椒粉", "韓式芝麻油"];
      } else if (slug.includes("bbq")) {
        seaKeys = ["韓式炸雞粉", "韓式BBQ醬", "蜂蜜", "芝麻", "鹽", "胡椒粉", "韓式芝麻油"];
      }
    }
  } else if (slug.includes("pancake") && !slug.includes("brown-sugar")) {
    seaKeys = ["中筋麵粉", "雞蛋", "鹽", "韓式芝麻油"];
    if (slug.includes("potato")) {
      ingKeys = ["馬鈴薯", "火腿丁", "德式香腸丁", "玉米粒", "彩椒丁"];
      seaKeys.unshift("莫札瑞拉起司絲");
    } else if (slug.includes("vegetable")) {
      ingKeys = ["絲瓜", "胡蘿蔔", "洋蔥"];
    } else if (slug.includes("kimchi")) {
      ingKeys = ["泡菜", "豆腐", "青蔥"];
    } else if (slug.includes("seafood")) {
      ingKeys = ["透抽", "白蝦", "青蔥"];
    }
  } else if (slug.includes("egg-roll") || slug.includes("steamed-eggs")) {
    ingKeys = ["雞蛋"];
    seaKeys = ["鹽", "韓式芝麻油"];
    if (slug.includes("truffle")) {
      seaKeys.unshift("黑松露醬", "莫札瑞拉起司絲");
    } else if (slug.includes("steamed-eggs-with-cheese-roe")) {
      ingKeys.push("飛魚卵");
      seaKeys.unshift("切達起司片", "高湯");
    } else {
      ingKeys.push("飛魚卵", "蟹味棒");
      seaKeys.unshift("莫札瑞拉起司絲", "切達起司片");
    }
  } else if (slug.includes("ginseng-chicken")) {
    ingKeys = ["春雞", "糯米", "人蔘", "紅棗", "山東大白菜", "蒜頭"];
    seaKeys = ["鹽", "胡椒粉"];
    if (slug.includes("hot-pot")) {
      ingKeys.push("韓式年糕條", "鮮香菇");
    }
  } else if (slug.includes("rice-cake")) {
    if (slug.includes("royal")) {
      ingKeys = ["年糕", "牛肉", "洋蔥", "胡蘿蔔", "木耳"];
      seaKeys = ["醬油", "韓式芝麻油", "白糖", "蒜末"];
    } else if (slug.includes("truffle")) {
      ingKeys = ["起司年糕", "洋蔥"];
      seaKeys = ["黑炸醬", "巧達起司醬", "黑松露醬", "蒜末"];
    } else if (slug.includes("plant-based-fried-chicken")) {
      ingKeys = ["植物雞", "年糕", "洋蔥"];
      seaKeys = ["韓式辣醬", "蜂蜜", "蒜末", "芝麻"];
    } else if (slug.includes("cheese-pink-sauce")) {
      ingKeys = ["透抽", "年糕", "洋蔥"];
      seaKeys = ["玫瑰醬", "莫札瑞拉起司絲", "蒜末"];
    } else if (slug.includes("spicy-pan-fried-seafood")) {
      ingKeys = ["年糕", "白蝦", "蛤蜊", "透抽", "洋蔥"];
      seaKeys = ["韓式辣醬", "韓式辣椒粉", "白糖", "蒜末"];
    } else {
      ingKeys = ["年糕", "洋蔥", "青蔥"];
      seaKeys = ["醬油", "韓式芝麻油", "蒜末", "鹽"];
    }
  } else {
    // Other dishes
    ingKeys = ["主食材", "洋蔥", "青蔥"];
    seaKeys = ["醬油", "韓式芝麻油", "蒜末", "鹽"];
    
    if (slug.includes("french-fries")) {
      ingKeys = ["脆薯"];
      seaKeys = ["韓式辣醬", "蜂蜜", "鹽"];
    } else if (slug.includes("deep-fried-tofu")) {
      ingKeys = ["豆腐"];
      seaKeys = ["醬油", "蒜末", "白糖"];
    } else if (slug.includes("fish-ball")) {
      ingKeys = ["魚丸", "洋蔥", "青蔥"];
      seaKeys = ["韓式辣醬", "醬油", "白糖", "蒜末"];
    } else if (slug.includes("glass-noodle")) {
      ingKeys = ["冬粉", "胡蘿蔔", "菠菜", "洋蔥", "木耳"];
      seaKeys = ["醬油", "韓式芝麻油", "白糖", "蒜末"];
    } else if (slug.includes("bbq-beef")) {
      ingKeys = ["翼板牛", "洋蔥", "青蔥"];
      seaKeys = ["韓式BBQ醬", "韓式芝麻油", "蒜末"];
    } else if (slug.includes("sweet-and-sour-pork")) {
      ingKeys = ["豬後腿肉", "胡蘿蔔", "洋蔥"];
      seaKeys = ["中筋麵粉", "韓式糖醋醬汁", "鹽", "胡椒粉"];
    } else if (slug.includes("fried-oysters")) {
      ingKeys = ["生蠔"];
      seaKeys = ["中筋麵粉", "鹽", "胡椒粉"];
    } else if (slug.includes("bbq-wrap")) {
      ingKeys = ["牛五花", "高麗菜", "年糕", "蒜頭"];
      seaKeys = ["韓式辣醬", "醬油", "韓式芝麻油"];
    } else if (slug.includes("ox-bone-soup")) {
      ingKeys = ["霜降牛", "高湯", "青蔥"];
      seaKeys = ["鹽", "胡椒粉"];
    } else if (slug.includes("fried-chicken-combo")) {
      ingKeys = ["去骨雞腿肉"];
      seaKeys = ["韓式炸雞粉", "韓式辣醬", "蜂蜜", "芝麻"];
    } else if (slug.includes("fish-fillet") || slug.includes("fly-fish")) {
      ingKeys = ["飛虎魚", "胡蘿蔔", "洋蔥"];
      seaKeys = ["醬油", "白糖", "鹽"];
    } else if (slug.includes("fried-squid")) {
      ingKeys = ["透抽", "洋蔥", "青蔥"];
      seaKeys = ["韓式辣醬", "韓式辣椒粉", "白糖", "蒜末"];
    } else if (slug.includes("fried-chicken") && slug.includes("spicy")) {
      ingKeys = ["去骨雞腿肉", "洋蔥", "青蔥"];
      seaKeys = ["春川辣醬", "韓式芝麻油", "蒜末"];
    } else if (slug.includes("brown-sugar-pancake")) {
      ingKeys = ["中筋麵粉", "黑糖", "肉桂", "堅果粒"];
      seaKeys = ["奶油", "鹽"];
    } else if (slug.includes("tofu-ice-cream")) {
      ingKeys = ["非基改黃豆", "黑糖珍珠"];
      seaKeys = ["黑糖", "鹽"];
    }
  }

  // Map keys to full objects
  const ingredients = ingKeys.map((key) => {
    const info = INGREDIENT_DICT[key] || { name: { "zh-TW": key, en: key, ja: key, ko: key }, unit: { "zh-TW": "個", en: "pcs", ja: "個", ko: "개" }, amount: 1 };
    return {
      name: info.name,
      amount: info.amount,
      unit: info.unit,
      isCore: true
    };
  });

  const seasonings = seaKeys.map((key) => {
    const info = INGREDIENT_DICT[key] || { name: { "zh-TW": key, en: key, ja: key, ko: key }, unit: { "zh-TW": "大匙", en: "tbsp", ja: "大さじ", ko: "큰술" }, amount: 1 };
    return {
      name: info.name,
      amount: info.amount,
      unit: info.unit
    };
  });

  return { ingredients, seasonings };
}

// Build fully translated dynamic steps for the four locales based on dish type
function buildStepsForLocale(slug, displayName, ingredients, seasonings, locale) {
  const main = ingredients[0]?.name[locale] || displayName;
  const sub1 = ingredients[1]?.name[locale] || "";
  const sub2 = ingredients[2]?.name[locale] || "";
  const sea0 = seasonings[0]?.name[locale] || "";
  const sea1 = seasonings[1]?.name[locale] || "";

  if (slug.includes("soondubu")) {
    const meatObj = ingredients.find(i => ["牛肉", "豬肉", "羊肉", "霜降牛", "牛五花", "去骨雞腿肉", "植物雞"].includes(i.name["zh-TW"]));
    const meat = meatObj ? meatObj.name[locale] : "";
    const toppings = seasonings.filter(s => s.name["zh-TW"].includes("起司") || s.name["zh-TW"].includes("起司絲") || s.name["zh-TW"].includes("起司片")).map(s => s.name[locale]).join(locale === "zh-TW" ? "與" : " and ");
    const paste = seasonings.find(s => s.name["zh-TW"].includes("醬") || s.name["zh-TW"].includes("粉"))?.name[locale] || (locale === "zh-TW" ? "韓式辣椒醬" : "Korean chili paste");

    if (locale === "zh-TW") {
      let step1 = `在辣湯鍋中倒入韓式芝麻油，加入蒜末、洋蔥與 ${paste} 爆炒香。`;
      if (meat) step1 += `接著放入 ${meat} 炒至變色。`;
      
      const subItems = ingredients.filter(i => i.name["zh-TW"] !== "嫩豆腐" && i.name["zh-TW"] !== "洋蔥" && i.name["zh-TW"] !== "青蔥" && i.name["zh-TW"] !== "高湯" && !["牛肉", "豬肉", "羊肉", "霜降牛", "牛五花", "去骨雞腿肉", "植物雞"].includes(i.name["zh-TW"]));
      let step2 = "注入高湯與醬油，大火煮滾後轉小火。";
      if (subItems.length > 0) {
        step2 += `加入 ${subItems.map(i => i.name["zh-TW"]).join("、")} 慢火燉煮 5 分鐘。`;
      } else {
        step2 += "慢火燉煮 5 分鐘使其入味。";
      }

      let step4 = "最後 2 分鐘";
      if (toppings) step4 += `在表面鋪上 ${toppings} 並`;
      step4 += "打入一顆雞蛋，待呈半熟即可連鍋滾燙上桌。";

      return [
        step1,
        step2,
        `用湯匙將嫩豆腐大塊舀入鍋中鋪平在中央，以中火煮滾，注意動作要輕，防止嫩豆腐攪碎。`,
        step4
      ];
    }
    if (locale === "en") {
      let step1 = `Heat toasted sesame oil in a small pot. Sauté garlic, onion, and ${paste} until fragrant.`;
      if (meat) step1 += ` Add ${meat} and stir-fry until cooked.`;

      const subItems = ingredients.filter(i => i.name["zh-TW"] !== "嫩豆腐" && i.name["zh-TW"] !== "洋蔥" && i.name["zh-TW"] !== "青蔥" && i.name["zh-TW"] !== "高湯" && !["牛肉", "豬肉", "羊肉", "霜降牛", "牛五花", "去骨雞腿肉", "植物雞"].includes(i.name["zh-TW"]));
      let step2 = "Pour in kelp broth and soy sauce. Bring to a boil, then lower the heat.";
      if (subItems.length > 0) {
        step2 += ` Add ${subItems.map(i => i.name["en"]).join(", ")} and simmer for 5 minutes.`;
      } else {
        step2 += " Simmer for 5 minutes.";
      }

      let step4 = "In the last 2 minutes, ";
      if (toppings) step4 += `top with ${toppings} and `;
      step4 += "crack an egg. Serve boiling hot in the pot.";

      return [
        step1,
        step2,
        `Scoop large chunks of soft tofu into the center of the pot. Cook over medium heat, pushing gently to prevent breaking.`,
        step4
      ];
    }
    if (locale === "ja") {
      let step1 = `小鍋にごま油を熱し、ニンニク、玉ねぎ、${paste}を炒めて香りを立たせます。`;
      if (meat) step1 += ` そこに${meat}を加えて炒め合わせます。`;

      const subItems = ingredients.filter(i => i.name["zh-TW"] !== "嫩豆腐" && i.name["zh-TW"] !== "洋蔥" && i.name["zh-TW"] !== "青蔥" && i.name["zh-TW"] !== "高湯" && !["牛肉", "豬肉", "羊肉", "霜降牛", "牛五花", "去骨雞腿肉", "植物雞"].includes(i.name["zh-TW"]));
      let step2 = "出汁と醤油を加え、強火で沸騰させた後、弱火にします。";
      if (subItems.length > 0) {
        step2 += ` ${subItems.map(i => i.name["ja"]).join("、")}を加えて5分間煮込みます。`;
      } else {
        step2 += " 5分間煮込みます。";
      }

      let step4 = "仕上げの2分前に";
      if (toppings) step4 += `${toppings}をトッピングし、`;
      step4 += "卵を割り入れます。熱々の状態で提供します。";

      return [
        step1,
        step2,
        `おたま等で大ぶりにすくった純豆腐を鍋の中央に入れ、優しく崩れないよう中火で温めます。`,
        step4
      ];
    }
    if (locale === "ko") {
      let step1 = `뚝배기에 참기름을 두르고 다진 마늘, 양파, ${paste}을 넣어 볶습니다.`;
      if (meat) step1 += ` 이어 ${meat}을 넣고 익을 때까지 볶아줍니다.`;

      const subItems = ingredients.filter(i => i.name["zh-TW"] !== "嫩豆腐" && i.name["zh-TW"] !== "洋蔥" && i.name["zh-TW"] !== "青蔥" && i.name["zh-TW"] !== "高湯" && !["牛肉", "豬肉", "羊肉", "霜降牛", "牛五五花", "去骨雞腿肉", "植物雞"].includes(i.name["zh-TW"]));
      let step2 = "육수와 간장을 붓고 끓으면 약불로 줄입니다.";
      if (subItems.length > 0) {
        step2 += ` ${subItems.map(i => i.name["ko"]).join(", ")}을 넣고 5분간 끓입니다.`;
      } else {
        step2 += " 5분간 끓입니다.";
      }

      let step4 = "마지막 2분 전에 ";
      if (toppings) step4 += `${toppings}을 얹고 `;
      step4 += "달걀을 풀어 넣습니다. 뜨거울 때 서빙합니다.";

      return [
        step1,
        step2,
        `순두부를 큼직하게 숟가락으로 떠서 넣고 순두부가 깨지지 않도록 살살 끓여줍니다.`,
        step4
      ];
    }
  }

  if (slug.includes("stone-pot-rice")) {
    const subItems = ingredients.filter(i => i.name["zh-TW"] !== "白米");
    const subNames = subItems.map(i => i.name[locale]).join(locale === "zh-TW" ? "、" : ", ");
    const hasSugar = seasonings.some(s => s.name["zh-TW"] === "白糖");

    if (locale === "zh-TW") {
      let step2 = `平底鍋倒入韓式芝麻油，將 ${subNames} 分開炒熟，加入少許鹽與醬油輕調味`;
      if (hasSugar) step2 += "，雞肉炒時加入少許白糖增添風味";
      step2 += "。";
      return [
        `將 ${main} 洗淨，加高湯放入石鍋或電鍋中煮成Q彈的白米飯備用。`,
        step2,
        `在石鍋內壁均勻刷上韓式芝麻油，鋪上白米飯，再把炒好的配料排在米飯上。`,
        `將石鍋移至火上以中火加熱，結出酥脆鍋巴並聞到香氣後關火，趁熱拌勻食用。`
      ];
    }
    if (locale === "en") {
      let step2 = `Heat toasted sesame oil in a skillet, sauté ${subNames} separately, and season with salt and soy sauce`;
      if (hasSugar) step2 += " (add a pinch of sugar for chicken)";
      step2 += ".";
      return [
        `Wash ${main}, add kelp broth, and cook until fluffy. Set aside.`,
        step2,
        `Brush toasted sesame oil generously on the stone pot, spread cooked rice, and arrange ingredients on top.`,
        `Heat stone pot over medium until crackling sound is heard and a crispy crust forms. Serve hot.`
      ];
    }
    if (locale === "ja") {
      let step2 = `フライパンにごま油を熱し、${subNames}をそれぞれ炒め、塩と醤油で味付けします`;
      if (hasSugar) step2 += "（鶏肉は少々の砂糖を加えて炒めます）";
      step2 += "。";
      return [
        `${main}を研いで高麗だし汁で炊飯しておきます。`,
        step2,
        `石鍋の内側にごま油を塗り、ご飯を詰めて、炒めた具材を上に並べます。`,
        `石鍋を中火にかけて数分加熱し、香ばしいおこげができたら火を止め、熱いうちに召し上がります。`
      ];
    }
    if (locale === "ko") {
      let step2 = `팬에 참기름을 두르고 ${subNames}을 각각 볶아소금과 간장으로 가볍게 간합니다`;
      if (hasSugar) step2 += " (닭고기는 설탕을 약간 넣어 볶아줍니다)";
      step2 += ".";
      return [
        `${main}을 씻어 육수를 넣고 밥을 고슬고슬하게 짓습니다.`,
        step2,
        `돌솥 안쪽에 참기름을 바른 후 밥을 담고 볶아둔 고명을 얹습니다.`,
        `돌솥을 불에 올려 가볍게 누룽지가 생길 때까지 달구어 낸 후 따뜻하게 서빙합니다.`
      ];
    }
  }

  if (slug.includes("bibimbap")) {
    if (locale === "zh-TW") {
      return [
        `將 ${main} 煮熟。熱鍋下油，將 ${sub1} 炒熟備用。`,
        `將胡蘿蔔、菠菜、黃豆芽、黑木耳等五色配菜切絲炒熟，加入鹽與韓式芝麻油調味。`,
        `石鍋刷一層韓式芝麻油，鋪上白米飯，均勻碼上炒好的肉與蔬菜，中間打入一顆雞蛋。`,
        `中火加熱至鍋底結出香脆鍋巴，上桌前淋上芝麻與韓國辣醬，拌勻享用。`
      ];
    }
    if (locale === "en") {
      return [
        `Cook ${main}. Sauté ${sub1} in a pan with soy sauce and set aside.`,
        `Stir-fry carrot, spinach, soybean sprouts, and wood ear mushroom separately with salt and toasted sesame oil.`,
        `Brush a stone pot with toasted sesame oil, add rice, arrange beef and vegetables on top, and add a raw egg yolk.`,
        `Heat until a crispy rice crust forms, drizzle with sesame seeds and Korean chili paste, mix and enjoy.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}を炊きます。フライパンに油を熱し、${sub1}を炒めて取り出しておきます。`,
        `にんじん、ほうれん草、豆もやし、きくらげなどの野菜をそれぞれ炒め、塩とごま油で軽く味付けします。`,
        `石鍋にごま油を塗り、ご飯を敷き、炒めた肉と野菜を並べ、中央に卵黄を落とします。`,
        `おこげを作り、仕上げにコチュジャンとごまをかけ、熱いうちによく混ぜて召し上がります。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}으로 밥을 짓습니다. 팬에 기름을 두르고 ${sub1}를 볶아 따로 둡니다.`,
        `당근, 시금치, 콩나물, 목이버섯을 각각 볶아 소금과 참기름으로 간을 합니다.`,
        `돌솥에 참기름을 바르고 밥을 담은 후 고기와 야채를 얹고 달걀 노른자를 올립니다.`,
        `누룽지가 생길 때까지 달군 후 고추장과 참깨를 두르고 뜨겁게 비벼 먹습니다.`
      ];
    }
  }

  if (slug.includes("fried-chicken") && !slug.includes("rice-cake") && !slug.includes("stired")) {
    const isOriginal = slug.includes("original");
    const hasHoney = seasonings.some(s => s.name["zh-TW"] === "蜂蜜");

    if (locale === "zh-TW") {
      let step1 = `將去骨雞腿肉切塊，加入蒜末、鹽、胡椒粉與少許韓式芝麻油醃漬 30 分鐘入味。`;
      let step4 = "";
      if (isOriginal) {
        step4 = "直接將炸好的原味雞塊盛盤，搭配醃洋蔥或青蔥一同食用。";
      } else {
        let saucePart = `加入 ${seasonings[1].name[locale]}`;
        if (hasHoney) saucePart += "與蜂蜜";
        step4 = `另起鍋用韓式芝麻油爆香洋蔥與青蔥，${saucePart} 調勻煮稠，關火後倒入炸雞塊裹勻，最後撒上芝麻即可。`;
      }
      return [
        step1,
        `雞肉均勻裹上 ${seasonings[0].name[locale]}，油鍋加熱至 170°C 下鍋炸 7 分鐘撈出。`,
        `油溫升至 185°C，把雞塊回炸 2 分鐘，至外表金黃香脆後撈出。`,
        step4
      ];
    }
    if (locale === "en") {
      let step1 = `Cut chicken into pieces, and marinate with garlic, salt, black pepper powder, and toasted sesame oil for 30 minutes.`;
      let step4 = "";
      if (isOriginal) {
        step4 = "Plate the fried original chicken pieces directly and serve with pickled onions or green scallions.";
      } else {
        let saucePart = `add ${seasonings[1].name[locale]}`;
        if (hasHoney) saucePart += " and honey";
        step4 = `Heat toasted sesame oil in a clean pan. Sauté onion and scallion, ${saucePart} until thick. Turn off heat, coat chicken, and garnish with sesame seeds.`;
      }
      return [
        step1,
        `Coat chicken with ${seasonings[0].name[locale]}. Deep-fry at 170°C for 7 minutes, then drain.`,
        `Heat oil to 185°C and fry chicken again for 2 minutes until extra crispy and golden.`,
        step4
      ];
    }
    if (locale === "ja") {
      let step1 = `鶏肉を切り、にんにく、塩、コショウ粉、少すごま油を揉み込んで30分間漬け込みます。`;
      let step4 = "";
      if (isOriginal) {
        step4 = "揚げたてのオリジナルチキンを皿に盛り付け、甘酢漬けの玉ねぎや青ネギを添えて召し上がります。";
      } else {
        let saucePart = `${seasonings[1].name[locale]}を加えて`;
        if (hasHoney) saucePart = `${seasonings[1].name[locale]}とハチミツを加えて`;
        step4 = `別のフライパンにごま油を熱し、玉ねぎと青ネギを炒め、${saucePart}温めます。火を止めてチキンを絡め、ごまを振ります。`;
      }
      return [
        step1,
        `鶏肉に${seasonings[0].name[locale]}をまぶし、170℃の油で7分間揚げて取り出します。`,
        `油の温度を185℃に上げ、再度二度揚げを2分間行い、サクサクに仕上げます。`,
        step4
      ];
    }
    if (locale === "ko") {
      let step1 = `닭고기를 한입 크기로 자른 후 다진 마늘, 소금, 후춧가루, 참기름 약간을 넣어 30분간 재워둡니다.`;
      let step4 = "";
      if (isOriginal) {
        step4 = "튀겨낸 오리지널 치킨을 그릇에 담고 절임 양파나 대파를 곁들여 함께 섭취합니다.";
      } else {
        let saucePart = `${seasonings[1].name[locale]}을 넣어`;
        if (hasHoney) saucePart = `${seasonings[1].name[locale]}와 꿀을 넣어`;
        step4 = `팬에 참기름을 두르고 양파와 대파를 볶다가 ${saucePart} 끓여 불을 끄고 튀긴 닭고기를 넣어 버무린 뒤 참깨를 뿌립니다.`;
      }
      return [
        step1,
        `닭고기에 ${seasonings[0].name[locale]}을 입힙니다. 170°C의 기름에서 1차로 7분간 튀긴 후 건져냅니다.`,
        `기름 온도를 185°C로 올리고 닭고기를 다시 넣어 2차로 2분간 더 바삭하게 튀깁니다.`,
        step4
      ];
    }
  }

  if (slug.includes("pancake") && !slug.includes("brown-sugar")) {
    const subItems = ingredients.filter(i => i.name["zh-TW"] !== "中筋麵粉" && i.name["zh-TW"] !== "雞蛋" && i.name["zh-TW"] !== "鹽" && i.name["zh-TW"] !== "韓式芝麻油" && i.name["zh-TW"] !== "豆腐");
    const subList = subItems.map(i => i.name[locale]).join(locale === "zh-TW" ? "、" : ", ");
    const subListZh = subItems.map(i => i.name["zh-TW"]).join("、");
    const hasCheese = seasonings.some(s => s.name["zh-TW"].includes("起司") || s.name["zh-TW"].includes("起司絲"));
    const cheeseName = hasCheese ? seasonings.find(s => s.name["zh-TW"].includes("起司") || s.name["zh-TW"].includes("起司絲")).name[locale] : "";

    if (locale === "zh-TW") {
      let step1 = `將 ${main} 和其他配料切成細絲或小丁。`;
      if (slug.includes("kimchi")) step1 += " 嫩豆腐壓碎瀝乾水分。";

      let step3 = `平底鍋倒入韓式芝麻油線燒熱，舀入麵糊並用鍋鏟鋪平、壓薄。以中火煎至底部呈金黃酥脆。`;
      if (hasCheese) step3 += ` 均勻撒上 ${cheeseName}。`;

      let step4 = `將煎餅翻面，沿鍋邊再補少許韓式芝麻油，繼續煎至雙面皆呈現金黃香脆後，切塊即可盛盤享用。`;
      if (hasCheese) step4 = `將煎餅翻面（使起司朝下煎融呈焦香起司皮），沿鍋邊再補少許韓式芝麻油，繼續煎至金黃香脆，切塊即可盛盤享用。`;

      return [
        step1,
        `在碗中將中筋麵粉、雞蛋、鹽與適量清水攪拌均勻，倒入切好的 ${subListZh} 混合成均勻煎餅糊。`,
        step3,
        step4
      ];
    }
    if (locale === "en") {
      let step1 = `Finely shred or dice ${main}.`;
      if (slug.includes("kimchi")) step1 += " Mash tofu and squeeze out excess water.";

      let step3 = `Heat toasted sesame oil in a skillet, pour in the batter, and spread it thin. Fry over medium heat until bottom is crispy.`;
      if (hasCheese) step3 += ` Sprinkle ${cheeseName} evenly on top.`;

      let step4 = `Carefully flip the pancake, drizzle more toasted sesame oil around edges, and fry until both sides are golden and crunchy. Slice and serve.`;
      if (hasCheese) step4 = `Flip the pancake (let cheese touch skillet to melt and crisp), drizzle toasted sesame oil, and cook until golden. Slice and serve.`;

      return [
        step1,
        `In a bowl, whisk all-purpose flour, egg, salt, and water. Stir in the sliced ${subList || main} to form a thick batter.`,
        step3,
        step4
      ];
    }
    if (locale === "ja") {
      let step1 = `${main}を細切りまたは粗みじん切りにしておきます。`;
      if (slug.includes("kimchi")) step1 += " 純豆腐は水切りして崩しておきます。";

      let step3 = `フライパンにごま油を熱し、生地を流し込んで薄く広げます。中火で底がカリッと香ばしくなるまで焼きます。`;
      if (hasCheese) step3 += ` 全体に${cheeseName}を散らします。`;

      let step4 = `裏返し、フライパンの端からさらに少すごま油を回し入れ、両面がきつね色になるまでサクサクに焼いて切り分けます。`;
      if (hasCheese) step4 = `裏返し（チーズを下にして香ばしく焼き上げ）、ごま油を回し入れ、サクサクになるまで両面を焼き上げて切り分けます。`;

      return [
        step1,
        `ボウルに中力粉、卵、塩、水を混ぜ合わせ、切った${subList || main}を加えて生地を作ります。`,
        step3,
        step4
      ];
    }
    if (locale === "ko") {
      let step1 = `${main}을 잘게 채 썰거나 다져 둡니다.`;
      if (slug.includes("kimchi")) step1 += " 두부는 으깨어 물기를 짜둡니다.";

      return [
        step1,
        `볼에 중력분, 달걀, 소금, 물을 넣고 섞은 후 채 썬 ${subList || main}을 넣어 고르게 반죽을 만듭니다.`,
        `팬에 참기름을 두르고 반죽을 올려 뒤집개로 얇고 평평하게 폅니다. 중불에서 바닥이 바삭해질 때까지 굽습니다.`,
        `전 뒤집개로 뒤집고 가장자리에 참기름을 살짝 보충한 뒤 양면이 모두 바삭하고 노릇하게 구워지면 썰어 냅니다.`
      ];
    }
  }

  if (slug.includes("egg-roll") || slug.includes("steamed-eggs")) {
    const isSteamed = slug.includes("steamed-eggs");
    const subItems = ingredients.filter(i => i.name["zh-TW"] !== "雞蛋");
    const hasTruffle = seasonings.some(s => s.name["zh-TW"] === "黑松露醬");
    const hasMozzarella = seasonings.some(s => s.name["zh-TW"] === "莫札瑞拉起司絲");
    const hasCheddar = seasonings.some(s => s.name["zh-TW"] === "切達起司片");

    if (locale === "zh-TW") {
      const subNames = subItems.map(i => i.name["zh-TW"]).join("、");
      let toppingsList = [];
      if (hasTruffle) toppingsList.push("黑松露醬");
      if (hasMozzarella) toppingsList.push("莫札瑞拉起司絲");
      if (hasCheddar) toppingsList.push("切達起司片");
      const toppingsName = toppingsList.join("與");

      const fillings = [subNames, toppingsName].filter(Boolean).join("與");

      if (isSteamed) {
        return [
          `在碗中打入 ${main}，加入高湯、鹽與芝麻油打均勻。`,
          `將蛋液倒入陶鍋中，以小火慢燉並用筷子輕輕攪拌，避免底部焦黏。`,
          `當蛋液煮至七分熟，均勻鋪上 ${fillings || "起司片與飛魚卵"}。`,
          `蓋上鍋蓋，以極小火繼續燜煮 2 分鐘，至起司完全融化即可熱騰騰上桌。`
        ];
      }
      return [
        `在碗中打入 ${main}，加入少許鹽與調味料打均勻。`,
        `平底鍋或玉子燒鍋刷上韓式芝麻油加熱，倒入三分之一蛋液以小火慢煎，均勻鋪上 ${fillings || "起司片與飛魚卵"}。`,
        `小心將半熟蛋皮捲起推至一端，再分次倒入剩餘蛋液，與已捲好的蛋捲連接後繼續捲起。`,
        `重複此步驟至蛋液用完。盛出切成厚片，趁熱呈現起司融化牽絲的滑嫩口感。`
      ];
    }
    if (locale === "en") {
      const subNames = subItems.map(i => i.name["en"]).join(", ");
      let toppingsList = [];
      if (hasTruffle) toppingsList.push("black truffle sauce");
      if (hasMozzarella) toppingsList.push("mozzarella cheese");
      if (hasCheddar) toppingsList.push("cheddar cheese");
      const toppingsName = toppingsList.join(" and ");

      const fillings = [subNames, toppingsName].filter(Boolean).join(" and ");

      if (isSteamed) {
        return [
          `Beat ${main} in a bowl, add kelp broth, salt, and toasted sesame oil. Mix well.`,
          `Pour egg mixture into a clay pot, cook over low heat, and stir gently with chopsticks to prevent burning.`,
          `When eggs are 70% cooked, top with ${fillings || "cheese and roe"}.`,
          `Cover with lid, simmer on low heat for 2 minutes until cheese melts, and serve hot.`
        ];
      }
      return [
        `Beat ${main} in a bowl with a pinch of salt and seasonings.`,
        `Brush toasted sesame oil on an egg roll pan over low heat. Pour in 1/3 of egg mixture. Arrange ${fillings || "cheese and roe"} on top.`,
        `Gently roll the semi-cooked egg sheet, push it to the end, pour in more egg to connect, and roll again.`,
        `Repeat until all egg is used. Remove from heat, let cool slightly, slice into thick rounds, and serve hot.`
      ];
    }
    if (locale === "ja") {
      const subNames = subItems.map(i => i.name["ja"]).join("、");
      let toppingsList = [];
      if (hasTruffle) toppingsList.push("黒トリュフソース");
      if (hasMozzarella) toppingsList.push("モッツァレラチーズ");
      if (hasCheddar) toppingsList.push("チェダーチーズ");
      const toppingsName = toppingsList.join("と");

      const fillings = [subNames, toppingsName].filter(Boolean).join("と");

      if (isSteamed) {
        return [
          `ボウルに${main}を割り入れ、出汁、塩、ごま油を加えてよくかき混ぜます。`,
          `卵液を土鍋に流し込み、弱火で加熱しながら、底が焦げ付かないよう箸で優しくかき混ぜます。`,
          `卵が7割ほど固まったら、${fillings || "チーズと魚卵"}を均一にのせます。`,
          `蓋をして極弱火で2分間蒸らし、チーズがとろりと溶けたら熱々のまま提供します。`
        ];
      }
      return [
        `ボウルに${main}を割り入れ、塩少々と調味料を加えてよくかき混ぜます。`,
        `卵焼き器にごま油を薄く熱し、卵液の1/3を注いで弱火にし、${fillings || "チーズと魚卵"}を均一にのせます。`,
        `端から丁寧にロールし、奥に戻します。卵液を追加して巻き込みながらさらにロールします。`,
        `卵液がなくなるまで繰り返します。厚めに切り分け、チーズがとろける食感を楽しみます。`
      ];
    }
    if (locale === "ko") {
      const subNames = subItems.map(i => i.name["ko"]).join(", ");
      let toppingsList = [];
      if (hasTruffle) toppingsList.push("블랙 트러플 소스");
      if (hasMozzarella) toppingsList.push("모짜렐라 치즈");
      if (hasCheddar) toppingsList.push("체다 치즈");
      const toppingsName = toppingsList.join("와 ");

      const fillings = [subNames, toppingsName].filter(Boolean).join("와 ");

      if (isSteamed) {
        return [
          `볼에 ${main}을 풀고 육수, 소금, 참기름을 넣어 골고루 섞어줍니다.`,
          `달걀물을 뚝배기에 붓고 약불에서 타지 않도록 숟가락이나 젓가락으로 살살 저어가며 끓입니다.`,
          `달걀이 70% 정도 익었을 때 ${fillings || "치즈와 날치알"}을 얹습니다.`,
          `뚜껑을 덮고 극약불에서 2분간 뜸을 들여 치즈가 다 녹으면 뜨겁게 완성합니다.`
        ];
      }
      return [
        `볼에 ${main}을 깨뜨려 넣고 소금 약간과 양념을 더해 잘 풀어줍니다.`,
        `팬에 참기름을 두르고 달군 후 달걀물의 1/3을 부어 약불에서 반쯤 익힙니다. 그 위에 ${fillings || "치즈와 날치알"}을 얹어줍니다.`,
        `달걀을 말아 끝으로 밀어둔 뒤, 남은 달걀물을 더 부어 연결해 가며 다시 돌돌 말아줍니다.`,
        `달걀물을 모두 사용할 때까지 반복합니다. 완성되면 도톰하게 썰어 서빙합니다.`
      ];
    }
  }

  if (slug.includes("ginseng-chicken")) {
    const isHotPot = slug.includes("hot-pot");
    if (locale === "zh-TW") {
      let step2 = `大砂鍋中放入填好料的春雞，加入新鮮高麗人蔘、紅棗、山東大白菜與蒜頭。`;
      if (isHotPot) step2 += " 鋪入韓式年糕條與鮮香菇。";
      return [
        `將 ${main} 洗淨，糯米浸泡 1 小時後填入雞腹腔中，用牙籤或棉線將開口封緊。`,
        step2,
        `倒入足量清水沒過食材，大火煮沸後撇去浮沫，轉小火蓋上砂鍋蓋慢燉 1.5 至 2 小時。`,
        `燉煮至雞肉骨軟肉綿、湯頭呈現濃郁的乳白色，加入少許鹽與胡椒粉調味即可整鍋上桌。`
      ];
    }
    if (locale === "en") {
      let step2 = `Place stuffed chicken in a large clay pot, add ginseng root, red dates, garlic, and cabbage.`;
      if (isHotPot) step2 += " Add Korean rice cakes and shiitake mushrooms.";
      return [
        `Clean ${main}, soak glutinous rice for 1 hour, stuff rice into chicken cavity, and seal opening.`,
        step2,
        `Pour in water to submerge hen. Boil on high heat, skim foam, cover and simmer for 1.5 to 2 hours.`,
        `Simmer until chicken meat is extremely tender and broth is milky white. Season with salt and pepper.`
      ];
    }
    if (locale === "ja") {
      let step2 = `大きな土鍋に丸鶏を入れ、高麗人参、ナツメ、ニンニク、白菜を加えます。`;
      if (isHotPot) step2 += " トックとしいたけをのせます。";
      return [
        `${main}をきれいに洗い、1時間浸水させたもち米を鶏의腹部に詰め、口を爪楊枝等で閉じます。`,
        step2,
        `具材が浸るまで水を注ぎ、強火で沸騰させてアクを取り除き、弱火にして蓋をし、1.5〜2時間じっくりと煮込みます。`,
        `肉が骨からホロホロと外れ、スープが白濁するまで煮込んだら、塩とコショウで味を調え、土鍋ごと運びます。`
      ];
    }
    if (locale === "ko") {
      let step2 = `큰 뚝배기에 속을 채운 닭을 담고 인삼, 대추, 마늘, 배추를 함께 넣습니다.`;
      if (isHotPot) step2 += " 떡볶이 떡과 표고버섯을 얹습니다.";
      return [
        `${main}의 내부를 깨끗이 씻어내고, 1시간 동안 불린 찹쌀을 닭 속안에 채워 넣은 후 입구를 이쑤시개로 꿰매어 봉합니다.`,
        step2,
        `재료가 잠길 정도로 물을 붓고 강불에서 끓여 거품을 걷어낸 뒤, 뚜껑을 덮고 약불에서 1.5~2시간 동안 푹 끓입니다.`,
        `닭고기가 아주 부드러워지고 국물이 뽀얗게 우러나면 소금과 후춧가루로 간을 맞추어 서빙합니다.`
      ];
    }
  }

  if (slug.includes("rice-cake")) {
    const riceCakeObj = ingredients.find(i => i.name["zh-TW"].includes("年糕")) || ingredients[0];
    const riceCake = riceCakeObj.name[locale];
    const proteins = ingredients.filter(i => !i.name["zh-TW"].includes("年糕") && i.name["zh-TW"] !== "洋蔥" && i.name["zh-TW"] !== "青蔥" && i.name["zh-TW"] !== "蒜頭");
    
    const hasSesame = seasonings.some(s => s.name["zh-TW"].includes("芝麻"));
    const hasCheese = seasonings.some(s => s.name["zh-TW"].includes("起司") || s.name["zh-TW"].includes("起司絲") || s.name["zh-TW"].includes("起司片"));
    
    const sauceSeasonings = seasonings.filter(s => 
      !s.name["zh-TW"].includes("芝麻") && 
      !s.name["zh-TW"].includes("起司絲") && 
      !s.name["zh-TW"].includes("起司片")
    );

    if (locale === "zh-TW") {
      const proteinNames = proteins.map(i => i.name["zh-TW"]).join("、");
      const sauceNames = sauceSeasonings.map(s => s.name["zh-TW"]).join("、");
      
      let step2 = `熱平底鍋下油，炒香蒜末與洋蔥，`;
      if (proteinNames) step2 += `加入 ${proteinNames} 翻炒至熟透。`;
      else step2 += "翻炒調味。";

      let step3 = `倒入調製好的 ${sauceNames || "醬汁"} 與少量高湯，放入浸泡好的 ${riceCake}，以中火煮沸，持續翻拌防止年糕黏底。`;

      let step4 = `待年糕煮熟且醬汁收濃，`;
      let toppings = [];
      if (hasCheese) toppings.push("起司");
      if (hasSesame) toppings.push("芝麻");
      if (toppings.length > 0) {
        step4 += `在表面均勻撒上 ${toppings.join("與")}，`;
      }
      step4 += `關火微火燜煮 1 分鐘即可盛盤。`;

      return [
        `將 ${riceCake} 放入溫水中浸泡 15 分鐘使其變軟，撈出瀝乾備用。`,
        step2,
        step3,
        step4
      ];
    }
    if (locale === "en") {
      const proteinNames = proteins.map(i => i.name["en"]).join(", ");
      const sauceNames = sauceSeasonings.map(s => s.name["en"]).join(", ");
      
      let step2 = `Heat oil in a pan, sauté garlic and onion, `;
      if (proteinNames) step2 += `then add ${proteinNames} and stir-fry until cooked.`;
      else step2 += "and stir-fry.";

      let step3 = `Pour in the prepared ${sauceNames || "sauce"} and a little broth. Add the soaked ${riceCake}, bring to a boil, and stir constantly to prevent sticking.`;

      let step4 = `When the rice cakes are chewy and the sauce is thick, `;
      let toppings = [];
      if (hasCheese) toppings.push("cheese");
      if (hasSesame) toppings.push("sesame seeds");
      if (toppings.length > 0) {
        step4 += `top with ${toppings.join(" and ")}, `;
      }
      step4 += `and let simmer for 1 minute before serving.`;

      return [
        `Soak ${riceCake} in warm water for 15 minutes to soften, then drain and set aside.`,
        step2,
        step3,
        step4
      ];
    }
    if (locale === "ja") {
      const proteinNames = proteins.map(i => i.name["ja"]).join("、");
      const sauceNames = sauceSeasonings.map(s => s.name["ja"]).join("、");
      
      let step2 = `フライパンに油を熱し、ニンニクと玉ねぎを炒め，`;
      if (proteinNames) step2 += `${proteinNames}を加えてしっかりと炒め合わせます。`;
      else step2 += "炒め合わせます。";

      let step3 = `合わせた${sauceNames || "タレ"}と少量の出汁を加え、トックを入れて中火で煮立て、焦げ付かないよう絶えず混ぜながら煮詰めます。`;

      let step4 = `トックが柔らかくなりタレが煮詰まったら、`;
      let toppings = [];
      if (hasCheese) toppings.push("チーズ");
      if (hasSesame) toppings.push("ごま");
      if (toppings.length > 0) {
        step4 += `仕上げに${toppings.join("と")}をのせて`;
      }
      step4 += `蓋をし、余熱で1分間温めてから盛り付けます。`;

      return [
        `${riceCake}をぬるま湯に15分間浸して柔らかくし、水気を切っておきます。`,
        step2,
        step3,
        step4
      ];
    }
    if (locale === "ko") {
      const proteinNames = proteins.map(i => i.name["ko"]).join(", ");
      const sauceNames = sauceSeasonings.map(s => s.name["ko"]).join(", ");
      
      let step2 = `팬에 식용유를 두르고 다진 마늘과 양파를 볶다가 `;
      if (proteinNames) step2 += `${proteinNames}를 넣어 함께 볶아줍니다.`;
      else step2 += "볶아줍니다.";

      let step3 = `준비해 둔 ${sauceNames || "양념"}와 육수를 붓고 떡을 넣어 중불에서 끓이며 바닥에 붙지 않도록 잘 저어줍니다.`;

      let step4 = `소스가 걸쭉하게 졸아들면 `;
      let toppings = [];
      if (hasCheese) toppings.push("치즈");
      if (hasSesame) toppings.push("참깨");
      if (toppings.length > 0) {
        step4 += `마지막에 ${toppings.join("와 ")}을 얹고 `;
      }
      step4 += `약불에서 1분간 뜸을 들인 후 완성합니다.`;

      return [
        `${riceCake}을 미지근한 물에 15분간 담가 말랑하게 만든 후 물기를 빼둡니다.`,
        step2,
        step3,
        step4
      ];
    }
  }

  if (slug.includes("brown-sugar-pancake") || slug.includes("tofu-ice-cream")) {
    if (locale === "zh-TW") {
      return [
        `將 ${main} 混合製作出甜點基底（調配成麵糊發酵，或用非基改黃豆磨製豆漿）。`,
        `平底鍋倒入少許油或無鹽奶油，將麵糊以小火慢煎上色（或將煮熟豆沙泥倒入攪拌盆打至棉柔冰淇淋質地）。`,
        `準備 ${sub1} 與調味內餡（準備黑糖粉、肉桂粉、綜合堅果碎，或用小鍋熬煮黑糖珍珠至Q彈軟糯）。`,
        `將兩者組合（黑糖肉桂餡包入麵糰壓扁煎熟，或在豆腐冰淇淋上淋上溫熱的黑糖珍珠），即刻盛盤享用。`
      ];
    }
    if (locale === "en") {
      return [
        `Mix ${main} to create the dessert base (knead dough for pancake, or puree soybeans for ice cream).`,
        `Heat oil or butter in a skillet and cook the base over low heat (or whip the soybean puree in a mixing bowl until fluffy).`,
        `Prepare ${sub1} (mix brown sugar, cinnamon powder, and crushed mixed nuts, or simmer tapioca pearls in sugar syrup).`,
        `Combine them (stuff pancake dough and griddle until sugar melts, or drizzle tapioca pearls over tofu ice cream).`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}を混ぜてデザートのベースを準備します（ホットクの生地を作るか、大豆を処理します）。`,
        `フライパンにごま油やバターを熱し、弱火でゆっくりと焼きます（または茹でた大豆をフードプロセッサーで滑らかなアイス状に仕上げます）。`,
        `${sub1}（黒糖シナモン堅果餡、または黒糖タピオカパール）を温めて準備します。`,
        `２つを組み合わせ（生地に餡を包んで平らに焼き上げるか、豆腐アイスに黒糖タピオカをトッピングします）。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}을 섞어 디저트 베이스를 만듭니다(호떡 반죽을 발효시키거나, 삶은 대두로 두유를 만듭니다).`,
        `팬에 식용유나 버터를 두르고 약불에서 노릇하게 구워냅니다(혹은 콩 퓨레를 휘핑하여 부드러운 아이스크림으로 만듭니다).`,
        `${sub1}을 준비합니다(흑설탕 계피 견과 소를 섞거나, 흑당 타피오카 펄이 졸여질 때까지 졸입니다).`,
        `두 가지를 결합하여(반죽에 소를 넣어 구워 완성하거나, 두부 아이스크림 위에 흑당 펄을 얹어 완성합니다).`
      ];
    }
  }

  // General main / appetizer / other dishes
  // 1. french-fries
  if (slug.includes("french-fries")) {
    if (locale === "zh-TW") {
      return [
        `將${main}準備好，烤箱或氣炸鍋預熱。`,
        `將${main}放入氣炸鍋以 180°C 氣炸 12 分鐘至金黃酥脆。`,
        `另起小鍋，以微火將韓式辣醬與蜂蜜加熱調勻。`,
        `將炸好的薯條與調好的醬汁快速拌勻即可盛盤食用。`
      ];
    }
    if (locale === "en") {
      return [
        `Prepare ${main} and preheat the air fryer.`,
        `Air-fry at 180°C for 12 minutes until crispy and golden.`,
        `In a separate pan, warm Korean chili paste and honey over low heat.`,
        `Toss fries with the sauce and serve.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}を準備し、ノンフライヤーを予熱します。`,
        `180℃で12分間、きつね色になるまで揚げ焼きにします。`,
        `別の小鍋で、コチュジャンとはちみつを弱火で温め混ぜ合わせます。`,
        `ポテトとタレを素早く絡めて皿に盛り付けます。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}을 준비하고 에어프라이어를 예열합니다.`,
        `에어프라이어에 넣어 180°C에서 12분간 바삭하고 노릇하게 튀겨냅니다.`,
        `다른 팬에 고추장과 꿀을 약불에서 섞어 데워줍니다.`,
        `튀겨진 감자튀김을 양념에 빠르게 버무려 완성합니다.`
      ];
    }
  }

  // 2. deep-fried-tofu
  if (slug.includes("deep-fried-tofu")) {
    if (locale === "zh-TW") {
      return [
        `將${main}切成一口大小的塊狀，用廚房紙巾吸乾表面水分。`,
        `在鍋中倒入適量食用油燒熱，放入豆腐塊，以中火煎炸至外表呈現金黃酥脆後撈出瀝乾。`,
        `將醬油、蒜末與白糖混合均勻，調製成經典的蒜蓉醬汁。`,
        `將炸好的豆腐盛盤，淋上調製好的蒜蓉醬油即可熱騰騰享用。`
      ];
    }
    if (locale === "en") {
      return [
        `Cut ${main} into bite-sized cubes and drain excess water.`,
        `Fry tofu cubes in hot oil over medium heat until golden and crispy, then drain.`,
        `Mix soy sauce, minced garlic, and sugar to make the classic dipping sauce.`,
        `Plate the tofu, drizzle with the garlic soy sauce, and serve hot.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}を一口大に切り、キッチンペーパーで水気をしっかりと拭き取ります。`,
        `鍋に油を熱し、豆腐を入れて中火できつね色になるまで揚げ、油を切ります。`,
        `醤油、にんにくみじん切り、白糖を混ぜ合わせ、タレを作ります。`,
        `揚げたての豆腐を皿に盛り付け、タレをかけて熱いうちに召し上がります。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}를 한입 크기로 썰고 키친타월로 물기를 닦아냅니다.`,
        `팬에 기름을 넉넉히 두르고 두부를 넣어 중불에서 노릇하게 튀겨낸 후 기름을 뺍니다.`,
        `간장, 다진 마늘, 설탕을 섞어 마늘 간장 소스를 만듭니다.`,
        `튀긴 두부를 접시에 담고 준비한 소스를 뿌려 완성합니다.`
      ];
    }
  }

  // 3. fish-ball
  if (slug.includes("fish-ball")) {
    if (locale === "zh-TW") {
      return [
        `將${main}清洗乾淨，洋蔥切絲，青蔥切段備用。`,
        `熱平底鍋倒入少許油，放入蒜末與洋蔥炒香，接著放入魚丸翻炒至表面微黃。`,
        `倒入調製好的韓式辣醬、醬油與白糖，加入少許清水，以中火煮滾收汁。`,
        `待醬汁濃稠、魚丸均勻裹上醬料後，放入青蔥段快速翻炒均勻即可起鍋。`
      ];
    }
    if (locale === "en") {
      return [
        `Clean ${main}, slice onion, and cut green scallion into segments.`,
        `Heat oil in a pan, sauté garlic and onion, then add fish balls and fry until lightly browned.`,
        `Add Korean chili paste, soy sauce, sugar, and a little water. Simmer over medium heat.`,
        `When the sauce thickens and coats the fish balls, add scallions, toss quickly, and serve.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}を洗い、玉ねぎをスライスし、青ネギをブツ切りにします。`,
        `フライパンに油を熱し、にんにくと玉ねぎを炒め、魚団子を加えて軽く焼き色をつけます。`,
        `コチュジャン、醤油、白糖、少量の水を加え、中火でタレを煮詰めます。`,
        `タレが絡まったら青ネギを加え、素早く炒め合わせて完成です。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}을 씻고 양파는 채 썰고 대파는 큼직하게 썰어둡니다.`,
        `팬에 기름을 두르고 다진 마늘과 양파를 볶다가 어묵볼을 넣어 겉면이 노릇해질 때까지 볶습니다.`,
        `고추장, 간장, 설탕, 물을 약간 넣어 중불에서 소스가 졸아들 때까지 끓입니다.`,
        `소스가 고르게 배면 대파를 넣고 가볍게 버무리듯 볶아 마무리합니다.`
      ];
    }
  }

  // 4. glass-noodle
  if (slug.includes("glass-noodle")) {
    if (locale === "zh-TW") {
      return [
        `將${main}用溫水泡軟，菠菜切段汆燙後擠乾水分，胡蘿蔔、洋蔥與黑木耳切絲備用。`,
        `熱鍋倒入油，放入蒜末爆香，加入胡蘿蔔絲、洋蔥絲與黑木耳絲炒熟。`,
        `放入泡軟的冬粉，倒入醬油與白糖翻炒均勻，使冬粉充分吸收醬汁與著色。`,
        `最後加入菠菜段，淋上韓式芝麻油快速拌炒均勻，起鍋盛盤即可。`
      ];
    }
    if (locale === "en") {
      return [
        `Soak ${main} in warm water. Blanch and drain spinach. Shred carrot, onion, and black wood ear mushroom.`,
        `Heat oil in a pan, sauté garlic, then stir-fry carrot, onion, and wood ear mushroom until tender.`,
        `Add the soaked glass noodles, soy sauce, and sugar. Toss until the noodles absorb the sauce evenly.`,
        `Add spinach, drizzle with toasted sesame oil, toss quickly, and plate.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}をぬるま湯で戻します。ほうれん草は茹でて水気を絞り、にんじん、玉ねぎ、きくらげは細切りにします。`,
        `フライパンに油を熱し、にんにくを炒め、にんじん、玉ねぎ、きくらげを加えて炒めます。`,
        `戻した春雨、醤油、白糖を加え、春雨がタレを吸って色づくまでよく炒め合わせます。`,
        `最後にほうれん草を加え、ごま油を回し入れて素早く和え，完成です。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}은 따뜻한 물에 불리고, 시금치는 데쳐 물기를 짭니다. 당근, 양파, 목이버섯은 채 썰어 둡니다.`,
        `팬에 기름을 두르고 다진 마늘을 볶다가 당근, 양파, 목이버섯을 넣어 볶습니다.`,
        `불린 당면과 간장, 설탕을 넣고 당면에 색이 고르게 배고 익을 때까지 함께 볶아줍니다.`,
        `마지막으로 시금치를 넣고 참기름을 둘러 빠르게 버무려 낸 후 그릇에 담아냅니다.`
      ];
    }
  }

  // 5. bbq-beef
  if (slug.includes("bbq-beef")) {
    if (locale === "zh-TW") {
      return [
        `將${main}切成適當厚片，洋蔥切絲，青蔥切段備用。`,
        `將牛肉片與蒜末、韓式BBQ醬抓醃 15 分鐘使其入味。`,
        `熱鍋倒入韓式芝麻油，下洋蔥絲炒香炒軟，接著放入醃好的牛肉片大火快炒。`,
        `炒至牛肉變色熟透後，加入青蔥段大火翻炒數秒即可盛入預熱好的鐵板中上桌。`
      ];
    }
    if (locale === "en") {
      return [
        `Slice ${main}, slice onion, and cut green scallion into segments.`,
        `Marinate beef with minced garlic and Korean BBQ sauce for 15 minutes.`,
        `Heat toasted sesame oil in a pan, sauté onion, then add marinated beef and stir-fry over high heat.`,
        `Once cooked, add scallions, toss for a few seconds, and transfer to a hot plate.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}をスライスし、玉ねぎを切り、青ネギをブツ切りにします。`,
        `${main}ににんにくと韓国BBQソースを揉み込み、15分間漬けます。`,
        `フライパンにごま油を熱し、玉ねぎを炒め、漬けた牛肉を加えて強火で一気に炒めます。`,
        `肉に火が通ったら青ネギを加え、数秒炒め合わせて熱い鉄板に盛り付けます。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}는 슬라이스하고 양파는 채 썰며 대파는 큼직하게 썰어둡니다.`,
        `${main}에 다진 마늘과 한국식 BBQ 소스를 넣어 15분간 재워둡니다.`,
        `팬에 참기름을 두르고 양파를 볶다가 재워둔 소고기를 넣어 센 불에서 빠르게 볶습니다.`,
        `고기가 익으면 대파를 넣고 몇 초간 더 볶은 후 달군 철판에 올려 서빙합니다.`
      ];
    }
  }

  // 6. sweet-and-sour-pork
  if (slug.includes("sweet-and-sour-pork")) {
    if (locale === "zh-TW") {
      return [
        `將${main}切條，加入鹽與胡椒粉醃製 15 分鐘。胡蘿蔔與洋蔥切成小片。`,
        `將醃好的肉條均勻裹上中筋麵粉調製的粉漿，入油鍋炸至表面金黃熟透撈出。`,
        `另起鍋加熱韓式糖醋醬汁，放入胡蘿蔔片與洋蔥片煮滾至微軟。`,
        `將炸好的肉條盛盤，淋上調好的糖醋醬汁即可享用。`
      ];
    }
    if (locale === "en") {
      return [
        `Cut ${main} into strips, season with salt and pepper powder for 15 minutes. Slice carrot and onion.`,
        `Coat pork with all-purpose flour batter and deep-fry until golden and cooked, then drain.`,
        `Heat Korean sweet and sour sauce in a pan, add carrot and onion, and simmer.`,
        `Plate the pork and pour the sauce over.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}を細切りにし、塩とコショウ粉で15分間下味をつけます。にんじんと玉ねぎは小さく切ります。`,
        `豚肉に中力粉の水溶き衣をまぶし、油でカリッと揚げて油を切ります。`,
        `別の鍋で韓国風甘酢ソースを温め、にんじんと玉ねぎを加えて軽く煮ます。`,
        `揚げた肉を皿に盛り、甘酢ソースをかけます。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}을 길게 썰어 소금과 후춧가루로 15분간 밑간합니다. 당근과 양파는 한입 크기로 썹니다.`,
        `밑간한 고기에 중력분 반죽 옷을 입히고 기름에 바삭하게 튀겨내어 기름을 니다.`,
        `팬에 탕수 소스를 넣고 끓으면 당근과 양파를 넣어 살짝 익힙니다.`,
        `튀긴 고기를 그릇에 담고 소스를 부어 내거나 따로 찍어 먹을 수 있게 서빙합니다.`
      ];
    }
  }

  // 7. fried-oysters
  if (slug.includes("fried-oysters")) {
    if (locale === "zh-TW") {
      return [
        `將${main}清洗乾淨，用廚房紙巾徹底吸乾水分。`,
        `將生蠔均勻撒上少許鹽與胡椒粉，靜置 5 分鐘進行基礎調味。`,
        `將生蠔均勻裹上一層中筋麵粉，放入 170°C 的油鍋中煎炸至表面金黃酥脆。`,
        `撈出瀝乾油分，盛盤搭配調味醬汁或胡椒鹽即可熱呼呼食用。`
      ];
    }
    if (locale === "en") {
      return [
        `Wash ${main} and dry them thoroughly with paper towels.`,
        `Sprinkle oysters with a pinch of salt and pepper powder, let sit for 5 minutes.`,
        `Coat oysters with all-purpose flour, and fry in 170°C oil until golden and crispy.`,
        `Drain well, plate, and serve hot with dipping sauce or pepper salt.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}をきれいに洗い、キッチンペーパーで水気をしっかりと拭き取ります。`,
        `牡蠣に塩とコショウ粉を軽く振り、5分間置いて下味をつけます。`,
        `中力粉をまぶし、170℃の油できつね色になるまでサクサクに揚げます。`,
        `油を切って皿に盛り付け、ソースやレモンを添えて熱いうちに召し上がります。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}을 깨끗이 씻어 키친타월로 물기를 완전히 제거합니다.`,
        `생굴에 소금과 후춧가루를 약간 뿌려 5분간 밑간을 해둡니다.`,
        `밑간한 굴에 중력분을 고르게 입히고 170°C 기름에서 바삭하게 튀겨냅니다.`,
        `건져내어 기름을 빼고 접시에 담고 소스나 소금을 곁들여 완성합니다.`
      ];
    }
  }

  // 8. bbq-wrap
  if (slug.includes("bbq-wrap")) {
    if (locale === "zh-TW") {
      return [
        `將高麗菜葉洗淨瀝乾，${main}切片，蒜頭切片備用。`,
        `年糕放入溫水泡軟，${main}用醬油醃製 10 分鐘。`,
        `熱平底鍋倒入韓式芝麻油，將醃好的${main}與年糕、蒜片一同入鍋大火翻炒至肉熟透。`,
        `起鍋盛盤，將炒好的肉片、年糕與蒜頭用高麗菜葉包食，搭配韓式辣醬一同享用。`
      ];
    }
    if (locale === "en") {
      return [
        `Clean and drain cabbage leaves. Slice ${main} and garlic.`,
        `Soak rice cakes in warm water. Marinate meat with soy sauce for 10 minutes.`,
        `Heat toasted sesame oil in a skillet, stir-fry marinated meat, rice cakes, and garlic until cooked.`,
        `Plate and serve the meat, rice cakes, and garlic wrapped in cabbage leaves, and enjoy with Korean chili paste.`
      ];
    }
    if (locale === "ja") {
      return [
        `キャベツ葉を洗って水気を切り、${main}とニンニクをスライスしておきます。`,
        `トックはぬるま湯に浸して柔らかくし、肉は醤油で10分間下味をつけます。`,
        `フライパンにごま油を熱し、肉、トック、ニンニクスライスを加えて強火で炒め合わせます。`,
        `皿に盛り、キャベツ葉で炒めた肉、トック、ニンニクを包み、コチュジャンを添えていただきます。`
      ];
    }
    if (locale === "ko") {
      return [
        `양배추 잎을 씻어 물기를 빼고, ${main}와 마늘은 얇게 썰어둡니다.`,
        `떡은 따뜻한 물에 불리고, 고기는 간장을 넣어 10분간 재워둡니다.`,
        `팬에 참기름을 두르고 재워둔 고기, 떡, 마늘편을 넣어 센 불에서 볶아줍니다.`,
        `접시에 담고 양배추 잎에 고기, 떡, 마늘을 싸서 취향에 따라 고추장을 곁들여 먹습니다.`
      ];
    }
  }

  // 9. ox-bone-soup
  if (slug.includes("ox-bone-soup")) {
    if (locale === "zh-TW") {
      return [
        `將${main}切成薄片，青蔥切成細蔥花備用。`,
        `在湯鍋中倒入高湯（牛骨高湯），大火煮滾。`,
        `放入${main}薄片，快速涮煮至肉片變色熟透（約 1 分鐘），關火撇去表面浮沫。`,
        `撒入細蔥花，加入適量鹽與胡椒粉調味，即可盛碗享用濃郁的雪濃湯。`
      ];
    }
    if (locale === "en") {
      return [
        `Slice ${main} thinly and chop green scallion.`,
        `Pour beef bone broth into a pot and bring to a boil.`,
        `Add meat slices, cook quickly until color changes (about 1 minute), turn off heat and skim foam.`,
        `Garnish with scallions and season with salt and pepper powder to taste.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}を薄切りにし、青ネギを小口切りにします。`,
        `鍋に牛骨だしスープを注ぎ、強火で沸騰させます。`,
        `${main}を加え、肉の色が変わるまでさっと火を通し、火を止めてアクをすくい取ります。`,
        `刻みネギを散らし、塩とコショウ粉で味を調えて器に盛ります。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}은 얇게 썰고 대파는 송송 썰어둡니다.`,
        `냄비에 사골 육수를 붓고 센 불에서 끓입니다.`,
        `${main} 슬라이스를 넣고 고기 색이 변할 때까지 살짝 익힌 후 불을 끄고 거품을 걷어냅니다.`,
        `대파를 뿌리고 소금과 후춧가루로 간을 맞추어 그릇에 담아 완성합니다.`
      ];
    }
  }

  // 10. fried-chicken-combo
  if (slug.includes("fried-chicken-combo")) {
    if (locale === "zh-TW") {
      return [
        `將${main}切成一口大小，加入鹽、胡椒粉醃製 20 分鐘。`,
        `將雞肉均勻裹上韓式炸雞粉，放入 170°C 的油鍋中炸 7 分鐘撈出，再以 185°C 回炸 2 分鐘至金黃酥脆。`,
        `另起鍋倒入少許韓式芝麻油，加入韓式辣醬與蜂蜜，以微火煮滾調勻成濃稠醬汁。`,
        `倒入炸好的雞腿肉裹勻醬汁，撒上芝麻即可熱騰騰裝盤享用。`
      ];
    }
    if (locale === "en") {
      return [
        `Cut ${main} into bite-sized pieces and season with salt and pepper powder for 20 minutes.`,
        `Coat chicken with Korean fried chicken powder. Fry at 170°C for 7 minutes, then double-fry at 185°C for 2 minutes until extra crispy.`,
        `Heat toasted sesame oil in a pan, add Korean chili paste and honey, and cook over low heat to make a thick sauce.`,
        `Toss fried chicken in the sauce to coat evenly, garnish with sesame seeds, and serve.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}を一口大に切り、塩とコショウ粉で20分間下味をつけます。`,
        `鶏肉にフライドチキンパウダーをまぶし、170℃の油で7分間揚げ、185℃で2分間二度揚げしてサクサクにします。`,
        `別の鍋にごま油を熱し、コチュジャンとはちみつを弱火で温めてとろりとしたタレを作ります。`,
        `揚げたチキンをタレに絡め、ごまを振って完成です。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}을 한입 크기로 자르고 소금과 후춧가루로 20분간 밑간을 해둡니다.`,
        `닭고기에 튀김가루를 입히고 170°C 기름에서 7분간 튀긴 후, 185°C에서 2분간 더 바삭하게 재차 튀겨냅니다.`,
        `팬에 참기름을 두르고 고추장과 꿀을 약불에서 끓여 끈적한 소스를 만듭니다.`,
        `튀긴 닭고기를 넣어 소스가 고르게 버무려지면 참깨를 뿌려 장식합니다.`
      ];
    }
  }

  // 11. fish-fillet / fly-fish
  if (slug.includes("fish-fillet") || slug.includes("fly-fish")) {
    if (locale === "zh-TW") {
      return [
        `將${main}切片，胡蘿蔔與洋蔥切成細片備用。`,
        `魚肉片撒上少許鹽醃製 10 分鐘，平底鍋熱油，將魚片煎至兩面微黃熟透後盛出。`,
        `同鍋爆香洋蔥片與胡蘿蔔片，倒入醬油與白糖調製的醬汁，以中火煮滾。`,
        `倒入煎好的魚片，快速翻炒均勻，讓魚肉均勻吸附醬汁即可起鍋。`
      ];
    }
    if (locale === "en") {
      return [
        `Slice ${main} and cut carrot and onion into thin pieces.`,
        `Season fish with a pinch of salt for 10 minutes. Pan-fry in a skillet until golden on both sides.`,
        `In the same pan, sauté onion and carrot, then pour in soy sauce and sugar mixture and boil.`,
        `Add the cooked fish slices, toss quickly to coat with the sauce, and serve.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}をスライスし、にんじんと玉ねぎを薄切りにします。`,
        `魚に塩少々を振って10分間置き、フライパンで両面がきつね色になるまで焼いて取り出します。`,
        `同じフライパンで玉ねぎとにんじんを炒め、醤油と白糖を合わせたソースを注いで沸騰させます。`,
        `焼いた魚を戻し入れ、ソースを素早く絡めて完成です。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}을 슬라이스하고 당근과 양파는 얇게 썰어둡니다.`,
        `생선에 소금을 뿌려 10분간 두고, 팬에 구워 앞뒤로 노릇하게 익혀 꺼내둡니다.`,
        `같은 팬에 양파와 당근을 볶다가 간장과 설탕 소스를 붓고 끓입니다.`,
        `구워둔 생선을 넣어 양념에 빠르게 버무리며 조려 완성합니다.`
      ];
    }
  }

  // 12. fried-squid
  if (slug.includes("fried-squid")) {
    if (locale === "zh-TW") {
      return [
        `將${main}清洗乾淨並切成圈狀，洋蔥切絲，青蔥切段備用。`,
        `熱平底鍋倒入少許油，爆香蒜末與洋蔥絲。`,
        `放入透抽圈大火快炒，加入調配好的韓式辣醬、韓式辣椒粉與白糖。`,
        `炒至透抽熟透且收汁上色，最後加入青蔥段大火翻炒均勻即可出鍋。`
      ];
    }
    if (locale === "en") {
      return [
        `Clean and cut ${main} into rings. Shred onion and cut green scallion into segments.`,
        `Heat oil in a pan, and sauté garlic and onion.`,
        `Add squid rings and stir-fry over high heat, then add Korean chili paste, chili powder, and sugar.`,
        `Stir-fry until squid is cooked, add scallions, toss quickly, and serve.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}をきれいに洗って輪切りにし、玉ねぎをスライス、青ネギをブツ切りにします。`,
        `フライパンに油を熱し、にんにくと玉ねぎを炒めます。`,
        `${main}を加えて強火で炒め、コチュジャン、粉唐辛子、白糖を入れます。`,
        `イカに火が通ってタレが絡んだら、青ネギを加えて素早く炒め合わせます。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}을 씻어 링 모양으로 썰고 양파는 채 썰고 대파는 큼직하게 썹니다.`,
        `팬에 식용유를 두르고 다진 마늘과 양파를 볶습니다.`,
        `${main}을 넣어 센 불에서 빠르게 볶아준 후 고추장, 고춧가루, 설탕을 가합니다.`,
        `오징어가 다 익고 양념이 고루 배면 대파를 넣고 가볍게 볶아 완성합니다.`
      ];
    }
  }

  // 13. spicy-stired-fried-chicken
  if (slug.includes("spicy-stired-fried-chicken")) {
    if (locale === "zh-TW") {
      return [
        `將${main}切成一口大小，洋蔥切絲，青蔥切段備用。`,
        `將雞腿肉塊與蒜末、春川辣醬混合抓醃 20 分鐘使其入味。`,
        `熱鍋倒入韓式芝麻油，炒香洋蔥絲，放入醃好的雞腿肉大火快炒。`,
        `炒至雞肉熟透、醬汁濃稠上色，最後加入青蔥段翻炒均勻即可盛盤。`
      ];
    }
    if (locale === "en") {
      return [
        `Cut ${main} into bite-sized pieces. Slice onion and cut green scallion into segments.`,
        `Marinate chicken with minced garlic and Chuncheon spicy sauce for 20 minutes.`,
        `Heat toasted sesame oil in a pan, sauté onion, and add marinated chicken to stir-fry.`,
        `Stir-fry until chicken is cooked, add scallions, toss quickly, and serve.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}を一口大に切り、玉ねぎを切り、青ネギをブツ切りにします。`,
        `${main}ににんにくと春川スパイシーソースを揉み込み、20分間漬けます。`,
        `フライパンにごま油を熱し、玉ねぎを炒め、漬けた鶏肉を加えて炒め合わせます。`,
        `鶏肉に火が通ってタレが煮詰まったら、青ネギを加えて素早く炒め合わせます。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}을 한입 크기로 자르고 양파는 채 썰며 대파는 큼직하게 썹니다.`,
        `${main}에 다진 마늘과 춘천 불닭 소스를 넣어 20분간 재워둡니다.`,
        `팬에 참기름을 두르고 양파를 볶다가 재워둔 닭고기를 넣어 볶습니다.`,
        `닭고기가 다 익고 양념이 걸쭉해지면 대파를 넣어 가볍게 볶아 마무리합니다.`
      ];
    }
  }

  // 14. vermicelli-tofu-roll
  if (slug.includes("vermicelli-tofu-roll")) {
    if (locale === "zh-TW") {
      return [
        `將${main}壓碎並瀝乾水分，洋蔥與青蔥切成細末備用。`,
        `將豆腐泥與洋蔥碎、蔥末、蒜末、醬油、鹽混合拌勻，捏成捲狀。`,
        `熱平底鍋倒入少許食用油，將豆腐捲入鍋煎炸至表面金黃微脆。`,
        `盛盤後淋上少許韓式芝麻油增添香氣，即可熱呼呼食用。`
      ];
    }
    if (locale === "en") {
      return [
        `Mash ${main} and drain excess water. Finely chop onion and green scallion.`,
        `Mix tofu, onion, scallion, garlic, soy sauce, and salt, and shape into rolls.`,
        `Heat oil in a skillet and pan-fry tofu rolls until golden and crispy.`,
        `Plate, drizzle with toasted sesame oil for aroma, and serve hot.`
      ];
    }
    if (locale === "ja") {
      return [
        `${main}は水切りして崩し、玉ねぎと青ネギをみじん切りにします。`,
        `${main}、玉ねぎ、青ネギ、にんにく、醤油、塩を混ぜ合わせ、ロール状に形を整えます。`,
        `フライパンに油を熱し、豆腐ロールを入れてきつね色でサクサクになるまで焼きます。`,
        `皿に盛り付け、ごま油を回しかけて香りを立たせていただきます。`
      ];
    }
    if (locale === "ko") {
      return [
        `${main}은 물기를 빼서 으깨고 양파와 대파는 잘게 다져둡니다.`,
        `으깬 ${main}와 다진 양파, 파, 마늘, 간장, 소금을 섞어 롤 모양으로 빚습니다.`,
        `팬에 식용유를 두르고 두부 롤을 넣어 노릇하고 바삭하게 구워냅니다.`,
        `접시에 담고 참기름을 살짝 뿌려 향을 더한 뒤 서빙합니다.`
      ];
    }
  }

  const hasSalt = seasonings.some(s => s.name["zh-TW"] === "鹽");
  const hasPepper = seasonings.some(s => s.name["zh-TW"] === "胡椒粉" || s.name["zh-TW"] === "胡椒");
  const hasSesameTop = seasonings.some(s => s.name["zh-TW"].includes("芝麻"));
  const hasSoy = seasonings.some(s => s.name["zh-TW"].includes("醬油"));

  if (locale === "zh-TW") {
    let step1 = `將主食材 ${main} 處理切好。`;
    if (hasSoy) step1 += `加入蒜末與醬油醃製 15 分鐘入味。`;
    else if (hasSalt || hasPepper) step1 += `加入少許鹽與胡椒粉醃製。`;

    let step2 = `熱平底鍋倒入芝麻油，爆香蒜末，接著放入 ${main} 翻炒。`;
    let step3 = `倒入調製好的 ${sea0 || "醬汁"} 與少量高湯，以中火翻炒收汁。`;
    
    let step4 = `完成後立即盛盤`;
    if (hasSesameTop) step4 += `，在表面撒上少許芝麻`;
    step4 += `即可熱呼呼享用。`;

    return [step1, step2, step3, step4];
  }
  if (locale === "en") {
    let step1 = `Prepare and cut ${main}.`;
    if (hasSoy) step1 += ` Marinate with minced garlic and soy sauce for 15 minutes.`;
    else if (hasSalt || hasPepper) step1 += ` Season with a pinch of salt and pepper.`;

    let step2 = `Heat sesame oil in a skillet, sauté garlic, then add ${main} and stir-fry.`;
    let step3 = `Pour in the prepared ${sea0 || "sauce"} and a little broth. Toss over medium heat until cooked.`;
    
    let step4 = `Transfer to a serving plate`;
    if (hasSesameTop) step4 += ` and garnish with sesame seeds`;
    step4 += ` to serve.`;

    return [step1, step2, step3, step4];
  }
  if (locale === "ja") {
    let step1 = `${main}を適切な大きさに切ります。`;
    if (hasSoy) step1 += ` ニンニクと醤油を揉み込んで15分間置いておきます。`;
    else if (hasSalt || hasPepper) step1 += ` 塩とコショウ粉を揉み込んで下味をつけます。`;

    let step2 = `フライパンにごごま油を熱し、にんにくを炒め、${main}を加えて炒め合わせます。`;
    let step3 = `合わせた${sea0 || "ソース"}と出汁を流し入れ、中火で炒め絡めて火を通します。`;

    let step4 = `皿に盛り付け`;
    if (hasSesameTop) step4 += `、お好みでごまを散らして`;
    step4 += `完成です。`;

    return [step1, step2, step3, step4];
  }
  if (locale === "ko") {
    let step1 = `${main}을 알맞은 크기로 썰어줍니다.`;
    if (hasSoy) step1 += ` 다진 마늘과 간장을 넣어 15분간 재워둡니다.`;
    else if (hasSalt || hasPepper) step1 += ` 소금과 후춧가루로 밑간합니다.`;

    let step2 = `팬에 참기름을 두르고 다진 마늘을 볶아 향을 낸 후, ${main}을 넣고 볶습니다.`;
    let step3 = `준비한 ${sea0 || "소스"}와 육수를 붓고 중불에서 저어가며 소스가 고르게 밸 때까지 졸여줍니다.`;

    let step4 = `완성되면 그릇에 담고`;
    if (hasSesameTop) step4 += ` 참깨를 솔솔 뿌려`;
    step4 += ` 장식합니다.`;

    return [step1, step2, step3, step4];
  }
}

function buildCustomAdditions(displayName, item, locale) {
  const isVeg = item.vegetarian;
  if (isVeg) {
    return {
      "zh-TW": ["可改為全素配料", "蔥花"],
      en: ["Can be made vegetarian", "chopped scallions"],
      ja: ["完全菜食に変更可", "刻みネギ"],
      ko: ["비건 버전 변경 가능", "다진 파"]
    }[locale];
  }
  return {
    "zh-TW": ["蔥花", "芝麻"],
    en: ["chopped scallions", "sesame seeds"],
    ja: ["刻みネギ", "ごま"],
    ko: ["다진 파", "참깨"]
  }[locale];
}

// Tips mapped dynamically
function buildTipsForLocale(slug, categorySlug, locale) {
  if (slug.includes("soondubu")) {
    return {
      "zh-TW": [
        "嫩豆腐非常易碎，請在湯底完全煮滾後，再大塊舀入並小火慢推加熱。",
        "起司片與雞蛋在關火前 1 分鐘鋪上，利用餘溫燜融可保留最佳口感。"
      ],
      en: [
        "Soft tofu breaks easily. Scoop in large chunks only after the broth is boiling.",
        "Add cheese slices and egg in the last minute. The residual heat will melt them beautifully."
      ],
      ja: [
        "純豆腐は崩れやすいので、スープがしっかり沸騰してから大ぶりにすくい入れ、優しく温めます。",
        "スライスチーズと卵は仕上げの1分前にのせ、余熱でとろりと溶かすのがコツです。"
      ],
      ko: [
        "순두부는 쉽게 깨지므로 국물이 완전히 끓은 후에 큼직하게 떠 넣고 살살 끓여주세요.",
        "슬라이스 치즈와 달걀은 불을 끄기 1분 전에 얹어 잔열로 녹여내야 가장 맛있습니다."
      ]
    }[locale];
  }
  if (slug.includes("fried-chicken")) {
    return {
      "zh-TW": [
        "一定要進行二次油炸，第一次低溫鎖住肉汁，第二次高溫逼出多餘油分並使表皮極度酥脆。",
        "醬汁請一定要關火快速裹勻，否則在高溫下翻炒會使脆皮軟化。"
      ],
      en: [
        "Double-frying is essential. The first fry cooks the meat, and the second fry makes it crispy.",
        "Turn off the heat before tossing with the sauce, otherwise, the crispy skin will turn soggy."
      ],
      ja: [
        "必ず二度揚げしてください。1度目で肉汁を閉じ込め、2度目の高温で余分な油を落としてサクサクにします。",
        "ソースを絡めるときは必ず火を止めて手早く行います。火を通しすぎると衣が柔らかくなってしまいます。"
      ],
      ko: [
        "반드시 두 번 튀겨내어야 육즙을 가두고 겉을 극대화하여 바삭하게 튀길 수 있습니다.",
        "양념에 버무릴 때는 꼭 불을 끄고 빠르게 버무려야 바삭한 튀김옷이 눅눅해지지 않습니다."
      ]
    }[locale];
  }
  
  // Default tips
  return {
    "zh-TW": [
      "烹調前請將醬料調和均勻，一次下鍋能確保風味分布完美。",
      "熱鍋熱油能快速鎖住食材水分，維持多汁口感。"
    ],
    en: [
      "Mix the seasonings completely before cooking to ensure even flavor distribution.",
      "A hot pan with hot oil is key to locking in juices and flavor."
    ],
    ja: [
      "調理前に調味料をよく混ぜ合わせておくことで、均一に味が広がります。",
      "熱したフライパンと十分な油で素早く炒めることが、水分を逃がさないコツです。"
    ],
    ko: [
      "조리 전에 양념장을 골고루 섞어두어야 뭉침 없이 일정한 맛을 낼 수 있습니다.",
      "충분히 달군 팬에 센불로 빠르게 볶아내야 채소와 고기의 수분을 가둘 수 있습니다."
    ]
  }[locale];
}

function buildRecipe(entry) {
  const config = categoryConfig[entry.categorySlug] || categoryConfig["specialty"];
  const slug = entry.item.slug;

  // Generate multi-language ingredients & seasonings
  const { ingredients, seasonings } = getIngredientsAndSeasoningsForSlug(slug, entry.displayName, entry.categorySlug);

  return {
    slug,
    title: {
      "zh-TW": entry.displayName,
      en: entry.item.englishName || entry.displayName,
      ja: `${entry.displayName} 再現レシピ`,
      ko: `${entry.displayName} 스타일 레시피`
    },
    description: {
      "zh-TW": `參考涓豆腐常見做法還原 ${entry.displayName}，保留 ${config.tag} 系列的湯頭層次、配料比例與上桌份量。`,
      en: `Dubu House-inspired ${config.enCategory.toLowerCase()} recreating ${entry.displayName} with restaurant-style broth depth and plating.`,
      ja: `涓豆腐の ${entry.displayName} を家庭で再現する、${config.jaCategory} 向けレシピです。`,
      ko: `涓豆腐 ${entry.displayName} 를 집에서 재현하는 ${config.koCategory} 레시피입니다.`
    },
    servings: config.servings,
    prepTime: config.prepTime,
    cookTime: config.cookTime,
    totalTime: config.prepTime + config.cookTime,
    difficulty: config.difficulty,
    calories: config.nutrition.calories,
    protein: config.nutrition.protein,
    fat: config.nutrition.fat,
    carbs: config.nutrition.carbs,
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
      restaurant: brandName,
      dishName: entry.displayName,
      region: "全台連鎖"
    },
    intro: {
      "zh-TW": `這道 ${entry.displayName} 還原版，以 ${ingredients[0]?.name["zh-TW"] || config.tag} 為核心，依照餐廳常見的備料、爆香、下鍋與上桌順序撰寫。`,
      en: "This version follows the common Dubu House prep and finishing order for a closer restaurant-style result.",
      ja: "涓豆腐でよく見られる下ごしらえと仕上げの流れを意識した再現レシピです。",
      ko: "涓豆腐에서 흔히 쓰는 준비와 마무리 순서를 참고한 재현 레시피입니다."
    },
    steps: {
      "zh-TW": buildDetailedDhSteps({
        slug,
        title: entry.displayName,
        ingredients,
        seasonings,
        equipment: config.equipment
      }),
      en: buildStepsForLocale(slug, entry.displayName, ingredients, seasonings, "en"),
      ja: buildStepsForLocale(slug, entry.displayName, ingredients, seasonings, "ja"),
      ko: buildStepsForLocale(slug, entry.displayName, ingredients, seasonings, "ko")
    },
    tips: {
      "zh-TW": buildTipsForLocale(slug, entry.categorySlug, "zh-TW"),
      en: buildTipsForLocale(slug, entry.categorySlug, "en"),
      ja: buildTipsForLocale(slug, entry.categorySlug, "ja"),
      ko: buildTipsForLocale(slug, entry.categorySlug, "ko")
    },
    storage: {
      "zh-TW": config.storage,
      en: "Best enjoyed on the day it is made; refrigerate components separately when possible.",
      ja: "できれば当日中がおすすめ。保存する場合は具材とスープを分けて冷蔵します。",
      ko: "가급적 당일 섭취를 권장하며, 보관 시 재료와 국물을 나누어 냉장하세요."
    },
    substitutions: {
      "zh-TW": [ingredients[0]?.name["zh-TW"] || "主要食材", seasonings[0]?.name["zh-TW"] || "調味醬"],
      en: [ingredients[0]?.name["en"] || "Main ingredient", seasonings[0]?.name["en"] || "Marinade"],
      ja: [ingredients[0]?.name["ja"] || "主食材", seasonings[0]?.name["ja"] || "調味ソース"],
      ko: [ingredients[0]?.name["ko"] || "주재료", seasonings[0]?.name["ko"] || "양념 소스"]
    },
    relatedIngredients: ingredients.slice(0, 4).map((item) => item.name["zh-TW"]),
    customAdditions: {
      "zh-TW": buildCustomAdditions(entry.displayName, entry.item, "zh-TW"),
      en: buildCustomAdditions(entry.displayName, entry.item, "en"),
      ja: buildCustomAdditions(entry.displayName, entry.item, "ja"),
      ko: buildCustomAdditions(entry.displayName, entry.item, "ko")
    },
    faqs: {
      "zh-TW": [
        {
          question: `如何把 ${entry.displayName} 做得更像涓豆腐？`,
          answer: `先把 ${config.tag} 的醬料或湯頭煮到正確濃度，最後再下主要配料與嫩豆腐，最能還原門市口感。`
        }
      ],
      en: [
        {
          question: `How do I make this ${entry.displayName} closer to Dubu House?`,
          answer: "Finish the signature broth or sauce first, then add delicate ingredients at the end."
        }
      ],
      ja: [
        {
          question: `${entry.displayName} を店っぽくするコツは？`,
          answer: "スープやタレの濃度を先に整え、最後に具材を加えるのが近道です。"
        }
      ],
      ko: [
        {
          question: `${entry.displayName} 를 매장 스타일에 가깝게 만드는 방법은?`,
          answer: "국물이나 소스 농도를 먼저 맞추고 마지막에 재료를 넣으세요."
        }
      ]
    },
    ingredients,
    seasonings,
    body: {
      "zh-TW": `${entry.displayName} 的在家還原版，重點是還原涓豆腐 ${config.tag} 的湯頭或醬料層次，以及餐廳常見 of 2 人份鍋物／主菜份量。\n\n依照步驟先完成醬料或湯底，再組合主食材，就能做出接近門市視覺與風味的還原版。`,
      en: `This home version recreates the layered broth and generous plating associated with Dubu House ${config.enCategory.toLowerCase()}.`,
      ja: `この再現版は、涓豆腐らしいスープの層とボリューム感を意識して作っています。`,
      ko: `이 재현 버전은 涓豆腐 특유의 국물 층과 넉넉한 한 접시 구성을 목표로 했습니다.`
    }
  };
}

function clearGeneratedArtifacts() {
  for (const dir of Object.values(recipeDirs)) {
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (file.startsWith("dh-") && file.endsWith(".md")) {
        unlinkSync(join(dir, file));
      }
    }
  }

  if (existsSync(imagesDir)) {
    for (const file of readdirSync(imagesDir)) {
      if (file.startsWith("dh-") && file.endsWith(".svg")) {
        unlinkSync(join(imagesDir, file));
      }
    }
  }
}

function flattenFoodItems(menu) {
  return menu.categories.flatMap((category) =>
    category.items.map((item) => ({
      categorySlug: category.slug,
      displayName: item.name,
      item
    }))
  );
}

function writeRecipes(recipes) {
  clearGeneratedArtifacts();

  for (const recipe of recipes) {
    writeFileSync(join(recipeDirs["zh-TW"], `${recipe.slug}.md`), renderRecipeMarkdown(recipe, "zh-TW", publishedAt), "utf8");
    writeFileSync(join(recipeDirs.en, `${recipe.slug}.md`), renderRecipeMarkdown(recipe, "en", publishedAt), "utf8");
    writeFileSync(join(recipeDirs.ja, `${recipe.slug}.md`), renderRecipeMarkdown(recipe, "ja", publishedAt), "utf8");
    writeFileSync(join(recipeDirs.ko, `${recipe.slug}.md`), renderRecipeMarkdown(recipe, "ko", publishedAt), "utf8");
    writeFileSync(join(imagesDir, `${recipe.slug}.svg`), renderSvg(recipe.title["zh-TW"], brandLabel), "utf8");
  }
}

function main() {
  const menu = JSON.parse(readFileSync(menuPath, "utf8"));
  const entries = flattenFoodItems(menu);
  const recipes = entries.map((entry) => buildRecipe(entry));
  writeRecipes(recipes);
  console.log(`Generated ${recipes.length} Dubu House recipes.`);
}

main();
