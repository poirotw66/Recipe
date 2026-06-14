import type { Locale } from "../lib/i18n";

export interface RecipesListPageContent {
  title: string;
  description: string;
  eyebrow: string;
  pageCopy: string;
  searchLabel: string;
  searchPlaceholder: string;
  categoryLabel: string;
  timeLabel: string;
  toolLabel: string;
  filterAll: string;
  timeUnder10: string;
  timeUnder15: string;
  timeUnder30: string;
  resetFilters: string;
  resultCountAll: string;
  resultCountFiltered: string;
  emptyMessage: string;
  adLabel: string;
  viewIngredients: string;
  viewScenarios: string;
  emptyLocale: string;
  viewZh: string;
}

const zhTW: RecipesListPageContent = {
  title: "食譜列表",
  description: "整理適合台灣小廚房的一人份與家常料理，快速查看時間、工具與常見食材。",
  eyebrow: "Recipes",
  pageCopy: "這裡收錄目前站上的 recipe content collection，方便依料理型態、準備時間與常用工具快速掃讀。",
  searchLabel: "關鍵字搜尋",
  searchPlaceholder: "例如：蛋、豆腐、便當",
  categoryLabel: "類型",
  timeLabel: "時間",
  toolLabel: "工具",
  filterAll: "全部",
  timeUnder10: "10 分鐘內",
  timeUnder15: "15 分鐘內",
  timeUnder30: "30 分鐘內",
  resetFilters: "清除全部篩選",
  resultCountAll: "目前共 {count} 道食譜",
  resultCountFiltered: "{filters}共找到 {count} 道食譜",
  emptyMessage: "找不到符合條件的食譜，請換一個關鍵字。",
  adLabel: "食譜列表廣告位",
  viewIngredients: "查看食材索引",
  viewScenarios: "查看情境分類",
  emptyLocale: "此語言尚無食譜內容，請先瀏覽繁體中文版。",
  viewZh: "瀏覽繁體中文食譜"
};

const en: RecipesListPageContent = {
  title: "Recipe index",
  description: "Taiwanese home cooking for small kitchens—browse by style, time, and tools.",
  eyebrow: "Recipes",
  pageCopy: "Browse the full recipe collection and filter by dish type, prep time, or cookware.",
  searchLabel: "Keyword search",
  searchPlaceholder: "e.g. eggs, tofu, bento",
  categoryLabel: "Type",
  timeLabel: "Time",
  toolLabel: "Tools",
  filterAll: "All",
  timeUnder10: "Under 10 min",
  timeUnder15: "Under 15 min",
  timeUnder30: "Under 30 min",
  resetFilters: "Clear all filters",
  resultCountAll: "{count} recipes in total",
  resultCountFiltered: "{filters} — {count} recipes found",
  emptyMessage: "No recipes match. Try another keyword.",
  adLabel: "Recipe list ad slot",
  viewIngredients: "Browse ingredients",
  viewScenarios: "Browse scenarios",
  emptyLocale: "Recipes in this language are coming soon. Browse Traditional Chinese recipes for now.",
  viewZh: "View Traditional Chinese recipes"
};

const ja: RecipesListPageContent = {
  title: "レシピ一覧",
  description: "台湾の家庭料理。短時間で作れる一人前のレシピ。",
  eyebrow: "Recipes",
  pageCopy: "料理の型、調理時間、調理器具で絞り込みながらレシピを探せます。",
  searchLabel: "キーワード検索",
  searchPlaceholder: "例：卵、豆腐、お弁当",
  categoryLabel: "タイプ",
  timeLabel: "時間",
  toolLabel: "調理器具",
  filterAll: "すべて",
  timeUnder10: "10分以内",
  timeUnder15: "15分以内",
  timeUnder30: "30分以内",
  resetFilters: "フィルターをすべて解除",
  resultCountAll: "全 {count} 件のレシピ",
  resultCountFiltered: "{filters} — {count} 件見つかりました",
  emptyMessage: "条件に合うレシピがありません。別のキーワードをお試しください。",
  adLabel: "レシピ一覧広告枠",
  viewIngredients: "食材インデックスへ",
  viewScenarios: "シナリオ一覧へ",
  emptyLocale: "この言語のレシピは準備中です。繁体字版をご覧ください。",
  viewZh: "繁体字レシピを見る"
};

const ko: RecipesListPageContent = {
  title: "레시피 목록",
  description: "대만 가정식. 소규모 주방에 맞는 빠른 한 끼 레시피.",
  eyebrow: "Recipes",
  pageCopy: "요리 유형, 준비 시간, 조리 도구로 레시피를 빠르게 찾아보세요.",
  searchLabel: "키워드 검색",
  searchPlaceholder: "예: 달걀, 두부, 도시락",
  categoryLabel: "유형",
  timeLabel: "시간",
  toolLabel: "도구",
  filterAll: "전체",
  timeUnder10: "10분 이내",
  timeUnder15: "15분 이내",
  timeUnder30: "30분 이내",
  resetFilters: "필터 모두 지우기",
  resultCountAll: "총 {count}개 레시피",
  resultCountFiltered: "{filters} — {count}개 찾음",
  emptyMessage: "조건에 맞는 레시피가 없습니다. 다른 키워드를 시도해 보세요.",
  adLabel: "레시피 목록 광고",
  viewIngredients: "재료 인덱스 보기",
  viewScenarios: "상황별 분류 보기",
  emptyLocale: "이 언어의 레시피는 준비 중입니다. 번체 중국어 레시피를 먼저 이용해 주세요.",
  viewZh: "번체 중국어 레시피 보기"
};

const byLocale: Record<Locale, RecipesListPageContent> = {
  "zh-TW": zhTW,
  en,
  ja,
  ko
};

export function getRecipesListPage(locale: Locale): RecipesListPageContent {
  return byLocale[locale];
}
