import type { Locale } from "../lib/i18n";

export interface IngredientsListPageContent {
  title: string;
  description: string;
  eyebrow: string;
  pageCopy: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchSubmit: string;
  categoriesEyebrow: string;
  popularEyebrow: string;
  relatedScenariosEyebrow: string;
  featuredRecipesEyebrow: string;
}

const zhTW: IngredientsListPageContent = {
  title: "食材列表",
  description: "從台灣常見食材開始找食譜，先用分類、熱門食材與情境入口建立長尾 SEO 的起點。",
  eyebrow: "Ingredients",
  pageCopy: "這裡已接上食材資料檔，先從分類、熱門食材與相關情境開始找，再慢慢縮小到適合今晚的料理方向。",
  searchLabel: "搜尋食材",
  searchPlaceholder: "搜尋食材，例如 雞蛋",
  searchSubmit: "搜尋食材",
  categoriesEyebrow: "分類區塊",
  popularEyebrow: "熱門食材",
  relatedScenariosEyebrow: "相關情境入口",
  featuredRecipesEyebrow: "熱門食譜"
};

const en: IngredientsListPageContent = {
  title: "Ingredient index",
  description: "Start with common Taiwanese ingredients—categories, popular picks, and scenario entry points.",
  eyebrow: "Ingredients",
  pageCopy: "Browse by category, popular ingredients, and related scenarios, then narrow down what to cook tonight.",
  searchLabel: "Search ingredients",
  searchPlaceholder: "Search ingredients, e.g. eggs",
  searchSubmit: "Search",
  categoriesEyebrow: "By category",
  popularEyebrow: "Popular ingredients",
  relatedScenariosEyebrow: "Related scenarios",
  featuredRecipesEyebrow: "Popular recipes"
};

const ja: IngredientsListPageContent = {
  title: "食材一覧",
  description: "台湾の身近な食材からレシピを探す。分類、人気食材、シナリオ入口から始められます。",
  eyebrow: "Ingredients",
  pageCopy: "分類、人気食材、関連シナリオから入って、今夜の料理を絞り込みましょう。",
  searchLabel: "食材を検索",
  searchPlaceholder: "食材を検索（例：卵）",
  searchSubmit: "検索",
  categoriesEyebrow: "カテゴリ別",
  popularEyebrow: "人気食材",
  relatedScenariosEyebrow: "関連シナリオ",
  featuredRecipesEyebrow: "人気レシピ"
};

const ko: IngredientsListPageContent = {
  title: "재료 목록",
  description: "대만 흔한 재료부터 레시피를 찾아보세요. 분류, 인기 재료, 상황별 입구가 있습니다.",
  eyebrow: "Ingredients",
  pageCopy: "분류, 인기 재료, 관련 상황에서 시작해 오늘 저녁 요리를 좁혀 보세요.",
  searchLabel: "재료 검색",
  searchPlaceholder: "재료 검색, 예: 달걀",
  searchSubmit: "검색",
  categoriesEyebrow: "분류별",
  popularEyebrow: "인기 재료",
  relatedScenariosEyebrow: "관련 상황",
  featuredRecipesEyebrow: "인기 레시피"
};

const byLocale: Record<Locale, IngredientsListPageContent> = {
  "zh-TW": zhTW,
  en,
  ja,
  ko
};

export function getIngredientsListPage(locale: Locale): IngredientsListPageContent {
  return byLocale[locale];
}
