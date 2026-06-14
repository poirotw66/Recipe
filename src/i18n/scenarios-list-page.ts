import type { Locale } from "../lib/i18n";

export interface ScenariosListPageContent {
  title: string;
  description: string;
  eyebrow: string;
  pageCopy: string;
  featuredEyebrow: string;
  allEyebrow: string;
  recipeCountLabel: string;
  viewIngredients: string;
  viewRecipes: string;
}

const zhTW: ScenariosListPageContent = {
  title: "料理情境",
  description: "依一人料理、租屋料理、10 分鐘料理、電鍋料理等情境快速找食譜。",
  eyebrow: "Scenarios",
  pageCopy: "先從生活情境切入，讓使用者用「現在的狀況」找到適合的料理。",
  featuredEyebrow: "精選情境",
  allEyebrow: "全部情境",
  recipeCountLabel: "{count} 道相關食譜",
  viewIngredients: "改從食材找",
  viewRecipes: "看全部食譜"
};

const en: ScenariosListPageContent = {
  title: "Cooking scenarios",
  description: "Find recipes by real-life situations—cooking for one, rental kitchens, 10-minute meals, and more.",
  eyebrow: "Scenarios",
  pageCopy: "Start from how your day looks, then pick a scenario that fits tonight.",
  featuredEyebrow: "Featured scenarios",
  allEyebrow: "All scenarios",
  recipeCountLabel: "{count} related recipes",
  viewIngredients: "Browse by ingredient",
  viewRecipes: "View all recipes"
};

const ja: ScenariosListPageContent = {
  title: "料理シナリオ",
  description: "一人暮らし、賃貸キッチン、10分料理など、状況からレシピを探せます。",
  eyebrow: "Scenarios",
  pageCopy: "今の状況から入って、今夜に合う料理を見つけましょう。",
  featuredEyebrow: "おすすめシナリオ",
  allEyebrow: "すべてのシナリオ",
  recipeCountLabel: "関連レシピ {count} 件",
  viewIngredients: "食材から探す",
  viewRecipes: "レシピ一覧へ"
};

const ko: ScenariosListPageContent = {
  title: "요리 상황",
  description: "1인 요리, 원룸 주방, 10분 요리 등 상황별로 레시피를 찾아보세요.",
  eyebrow: "Scenarios",
  pageCopy: "오늘 상황에서 시작해, 지금 맞는 요리를 골라 보세요.",
  featuredEyebrow: "추천 상황",
  allEyebrow: "모든 상황",
  recipeCountLabel: "관련 레시피 {count}개",
  viewIngredients: "재료로 찾기",
  viewRecipes: "전체 레시피 보기"
};

const byLocale: Record<Locale, ScenariosListPageContent> = {
  "zh-TW": zhTW,
  en,
  ja,
  ko
};

export function getScenariosListPage(locale: Locale): ScenariosListPageContent {
  return byLocale[locale];
}
