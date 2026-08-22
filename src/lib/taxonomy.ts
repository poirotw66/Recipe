import ingredients from "../data/ingredients.json";
import scenarios from "../data/scenarios.json";
import topicHubs from "../data/topic-hubs.json";
import type { Locale } from "./i18n";
import { defaultLocale } from "./i18n";
import type { RecipeEntry } from "./recipes";

export type LocalizedLabels = Partial<Record<Locale, string>> & { "zh-TW": string };
export interface LocaleCopyBlock {
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  storage?: string;
}

type NonDefaultLocale = Exclude<Locale, "zh-TW">;
type LocaleCopyMap = Partial<Record<NonDefaultLocale, LocaleCopyBlock>>;

export interface IngredientItem {
  name: string;
  slug: string;
  aliases: string[];
  category: string;
  labels?: LocalizedLabels;
  categoryLabels?: LocalizedLabels;
  description: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  carbsPer100g: number;
  storage: string;
  commonPairings: string[];
  substitutes: string[];
  relatedScenarios: string[];
  localeCopy?: LocaleCopyMap;
}

export interface ScenarioItem {
  name: string;
  slug: string;
  labels?: LocalizedLabels;
  description: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  relatedScenarios: string[];
  commonIngredients: string[];
  localeCopy?: LocaleCopyMap;
}

export interface TopicHubItem {
  name: string;
  slug: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  recipeTags: string[];
  recipeTagsByLocale?: Partial<Record<Locale, string[]>>;
  /** Match recipes whose scenarios frontmatter includes these scenario names */
  recipeScenarios?: string[];
  /** Preferred scenario slug matching for localized recipe collections */
  recipeScenarioSlugs?: string[];
  commonIngredients: string[];
  relatedScenarios: string[];
  localeCopy?: LocaleCopyMap;
}

export const ingredientItems = ingredients as IngredientItem[];
export const scenarioItems = scenarios as ScenarioItem[];
export const topicHubItems = topicHubs as TopicHubItem[];

export const getIngredientLabel = (item: IngredientItem, locale: Locale) =>
  item.labels?.[locale] ?? item.labels?.[defaultLocale] ?? item.name;

export const getIngredientCategoryLabel = (item: IngredientItem, locale: Locale) =>
  item.categoryLabels?.[locale] ?? item.categoryLabels?.[defaultLocale] ?? item.category;

export const getScenarioLabel = (item: ScenarioItem, locale: Locale) =>
  item.labels?.[locale] ?? item.labels?.[defaultLocale] ?? item.name;

const getLocaleCopyField = <T extends keyof LocaleCopyBlock>(
  localeCopy: LocaleCopyMap | undefined,
  locale: Locale,
  field: T,
  zhValue: LocaleCopyBlock[T]
): LocaleCopyBlock[T] =>
  locale === "zh-TW" ? zhValue : localeCopy?.[locale]?.[field] ?? localeCopy?.en?.[field] ?? zhValue;

export const getScenarioDescription = (item: ScenarioItem, locale: Locale) =>
  getLocaleCopyField(item.localeCopy, locale, "description", item.description);

export const getScenarioSeoTitle = (item: ScenarioItem, locale: Locale) =>
  getLocaleCopyField(item.localeCopy, locale, "seoTitle", item.seoTitle);

export const getScenarioSeoDescription = (item: ScenarioItem, locale: Locale) =>
  getLocaleCopyField(item.localeCopy, locale, "seoDescription", item.seoDescription);

export const getScenarioTags = (item: ScenarioItem, locale: Locale) =>
  getLocaleCopyField(item.localeCopy, locale, "tags", item.tags);

export const getTopicHubDescription = (item: TopicHubItem, locale: Locale) =>
  getLocaleCopyField(item.localeCopy, locale, "description", item.description);

export const getTopicHubSeoTitle = (item: TopicHubItem, locale: Locale) =>
  getLocaleCopyField(item.localeCopy, locale, "seoTitle", item.seoTitle);

export const getTopicHubSeoDescription = (item: TopicHubItem, locale: Locale) =>
  getLocaleCopyField(item.localeCopy, locale, "seoDescription", item.seoDescription);

export const getTopicHubTags = (item: TopicHubItem, locale: Locale) =>
  getLocaleCopyField(item.localeCopy, locale, "tags", item.tags);

export const getIngredientDescription = (item: IngredientItem, locale: Locale) =>
  getLocaleCopyField(item.localeCopy, locale, "description", item.description);

export const getIngredientStorage = (item: IngredientItem, locale: Locale) =>
  getLocaleCopyField(item.localeCopy, locale, "storage", item.storage);

const listJoinForLocale = (items: string[], locale: Locale): string => {
  if (items.length === 0) {
    return "";
  }
  const separator = locale === "en" || locale === "ko" ? ", " : "、";
  return items.join(separator);
};

/** Composes a richer intro from existing taxonomy fields (ponytail: no per-slug JSON). */
export const buildIngredientIntro = (
  item: IngredientItem,
  locale: Locale,
  recipeCount: number
): string => {
  const name = getIngredientLabel(item, locale);
  const category = getIngredientCategoryLabel(item, locale);
  const description = getIngredientDescription(item, locale);
  const storage = getIngredientStorage(item, locale);
  const pairings = listJoinForLocale(item.commonPairings.slice(0, 3), locale);
  const substitutes = listJoinForLocale(item.substitutes.slice(0, 2), locale);

  if (locale === "en") {
    const parts = [
      `${name} is a ${category.toLowerCase()} staple on Bloom Kitchen, with ${recipeCount} related recipe${recipeCount === 1 ? "" : "s"}. ${description}`,
      storage ? `For storage, ${storage.charAt(0).toLowerCase()}${storage.slice(1)}` : "",
      pairings ? `It pairs well with ${pairings}.` : "",
      substitutes ? `If you are out of it, try ${substitutes} instead.` : ""
    ];
    return parts.filter(Boolean).join(" ");
  }

  if (locale === "ja") {
    const parts = [
      `${name}は${category}の定番食材で、Bloom Kitchen には関連レシピが ${recipeCount} 件あります。${description}`,
      storage ? `保存の目安は、${storage}` : "",
      pairings ? `よく一緒に使うのは ${pairings} などです。` : "",
      substitutes ? `手元にない場合は ${substitutes} で代用できます。` : ""
    ];
    return parts.filter(Boolean).join(" ");
  }

  if (locale === "ko") {
    const parts = [
      `${name}는 ${category} 계열의 흔한 재료로, Bloom Kitchen에 관련 레시피 ${recipeCount}개가 있습니다. ${description}`,
      storage ? `보관은 ${storage}` : "",
      pairings ? `${pairings} 등과 자주 곁들여 씁니다.` : "",
      substitutes ? `없을 때는 ${substitutes}로 대체할 수 있습니다.` : ""
    ];
    return parts.filter(Boolean).join(" ");
  }

  const parts = [
    `${name}是${category}類的常見選擇，Bloom Kitchen 目前收錄 ${recipeCount} 道相關食譜。${description}`,
    storage ? `保存上，${storage}` : "",
    pairings ? `常與 ${pairings} 等食材搭配。` : "",
    substitutes ? `若手邊沒有，可用 ${substitutes} 替代。` : ""
  ];
  return parts.filter(Boolean).join("");
};

export const formatIngredientRecipesLead = (
  locale: Locale,
  ingredientName: string,
  shownCount: number,
  totalCount: number
): string => {
  if (locale === "en") {
    return `Pick from these ${shownCount} recipe${shownCount === 1 ? "" : "s"} with ${ingredientName}${totalCount > shownCount ? ":" : "."}`;
  }
  if (locale === "ja") {
    return `${ingredientName} を使うレシピ ${shownCount} 件${totalCount > shownCount ? "：" : "。"}`;
  }
  if (locale === "ko") {
    return `${ingredientName}가 들어간 레시피 ${shownCount}개${totalCount > shownCount ? ":" : "."}`;
  }
  return `以下 ${shownCount} 道食譜都用到 ${ingredientName}，可依時間與設備挑選${totalCount > shownCount ? "：" : "。"}`;
};

export const ingredientRecipesLinkSeparator = (locale: Locale): string =>
  locale === "en" || locale === "ko" ? ", " : "、";

export const ingredientRecipesLinkSuffix = (locale: Locale, totalCount: number, shownCount: number): string => {
  if (totalCount <= shownCount) {
    return locale === "en" ? "." : "。";
  }
  if (locale === "en") {
    return ", and more.";
  }
  if (locale === "ja") {
    return " など。";
  }
  if (locale === "ko") {
    return " 等.";
  }
  return " 等。";
};

export const getIngredientsByCategoryLocalized = (locale: Locale) =>
  ingredientItems.reduce<Record<string, IngredientItem[]>>((groups, ingredient) => {
    const key = getIngredientCategoryLabel(ingredient, locale);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(ingredient);
    return groups;
  }, {});

export const getIngredientBySlug = (slug: string) =>
  ingredientItems.find((ingredient) => ingredient.slug === slug);

export const getScenarioBySlug = (slug: string) =>
  scenarioItems.find((scenario) => scenario.slug === slug);

export const getTopicHubBySlug = (slug: string) =>
  topicHubItems.find((hub) => hub.slug === slug);

export const getIngredientByName = (name: string) =>
  ingredientItems.find((ingredient) => ingredient.name === name || ingredient.aliases.includes(name));

export const getScenarioByName = (name: string) =>
  scenarioItems.find((scenario) => scenario.name === name);

export const getIngredientsByCategory = () =>
  ingredientItems.reduce<Record<string, IngredientItem[]>>((groups, ingredient) => {
    if (!groups[ingredient.category]) {
      groups[ingredient.category] = [];
    }

    groups[ingredient.category].push(ingredient);
    return groups;
  }, {});

export const getIngredientMatchNames = (ingredient: IngredientItem) => {
  const names = new Set<string>([ingredient.name, ...ingredient.aliases]);
  if (ingredient.labels) {
    for (const label of Object.values(ingredient.labels)) {
      names.add(label);
    }
  }
  return [...names];
};

export const recipeUsesIngredient = (recipe: RecipeEntry, ingredient: IngredientItem) =>
  recipe.data.ingredients.some((item) => getIngredientMatchNames(ingredient).includes(item.name));

export const countRecipesForIngredient = (recipes: RecipeEntry[], ingredient: IngredientItem) =>
  recipes.filter((recipe) => recipeUsesIngredient(recipe, ingredient)).length;

export const ingredientHasRecipes = (recipes: RecipeEntry[], ingredient: IngredientItem) =>
  countRecipesForIngredient(recipes, ingredient) > 0;

export const filterIngredientsWithRecipes = (recipes: RecipeEntry[], ingredients: IngredientItem[]) =>
  ingredients.filter((ingredient) => ingredientHasRecipes(recipes, ingredient));

export const getVisibleIngredients = (recipes: RecipeEntry[]) =>
  filterIngredientsWithRecipes(recipes, ingredientItems);

export const getIngredientsByCategoryLocalizedVisible = (recipes: RecipeEntry[], locale: Locale) => {
  const visibleSlugs = new Set(getVisibleIngredients(recipes).map((ingredient) => ingredient.slug));
  return Object.entries(getIngredientsByCategoryLocalized(locale)).reduce<Record<string, IngredientItem[]>>(
    (groups, [category, items]) => {
      const visibleItems = items.filter((item) => visibleSlugs.has(item.slug));
      if (visibleItems.length > 0) {
        groups[category] = visibleItems;
      }
      return groups;
    },
    {}
  );
};

export const getPopularIngredients = (recipes: RecipeEntry[], limit = 8) =>
  [...ingredientItems]
    .map((ingredient) => ({
      ingredient,
      count: countRecipesForIngredient(recipes, ingredient),
    }))
    .filter((entry) => entry.count > 0)
    .sort(
      (left, right) =>
        right.count - left.count ||
        left.ingredient.name.localeCompare(right.ingredient.name, "zh-Hant")
    )
    .slice(0, limit)
    .map((entry) => entry.ingredient);

export const getRecipesByIngredient = (recipes: RecipeEntry[], ingredientSlug: string) => {
  const ingredient = getIngredientBySlug(ingredientSlug);

  if (!ingredient) {
    return [];
  }

  return recipes.filter((recipe) => recipeUsesIngredient(recipe, ingredient));
};

export const getTopicHubRecipeTags = (hub: TopicHubItem, locale: Locale) =>
  hub.recipeTagsByLocale?.[locale] ?? hub.recipeTagsByLocale?.[defaultLocale] ?? hub.recipeTags;

export const getTopicHubScenarioSlugs = (hub: TopicHubItem) => {
  if (hub.recipeScenarioSlugs?.length) {
    return hub.recipeScenarioSlugs;
  }

  return (hub.recipeScenarios ?? [])
    .map((scenarioName) => getScenarioByName(scenarioName)?.slug)
    .filter((slug): slug is string => Boolean(slug));
};

export const recipeMatchesScenario = (
  recipe: RecipeEntry,
  scenarioSlug: string,
  locale: Locale = defaultLocale
) => {
  const scenario = getScenarioBySlug(scenarioSlug);
  if (!scenario) {
    return false;
  }

  const scenarioName = getScenarioLabel(scenario, locale);
  return recipe.data.scenarios.includes(scenarioName);
};

export const getRecipesByScenario = (
  recipes: RecipeEntry[],
  scenarioSlug: string,
  locale: Locale = defaultLocale
) => {
  const scenario = getScenarioBySlug(scenarioSlug);

  if (!scenario) {
    return [];
  }

  return recipes.filter((recipe) => recipeMatchesScenario(recipe, scenario.slug, locale));
};

export const recipeBelongsToTopicHub = (
  recipe: RecipeEntry,
  hubSlug: string,
  locale: Locale = defaultLocale
) => {
  const hub = getTopicHubBySlug(hubSlug);

  if (!hub) {
    return false;
  }

  const recipeTags = getTopicHubRecipeTags(hub, locale);
  const tagMatch = recipeTags.length > 0 && recipeTags.some((tag) => recipe.data.tags.includes(tag));
  const scenarioMatch = getTopicHubScenarioSlugs(hub).some((scenarioSlug) =>
    recipeMatchesScenario(recipe, scenarioSlug, locale)
  );
  return tagMatch || scenarioMatch;
};

export const getRecipesByTopicHub = (
  recipes: RecipeEntry[],
  hubSlug: string,
  locale: Locale = defaultLocale
) => {
  const hub = getTopicHubBySlug(hubSlug);

  if (!hub) {
    return [];
  }

  return recipes.filter((recipe) => recipeBelongsToTopicHub(recipe, hub.slug, locale));
};

export const getTopicHubLinksForRecipe = (recipe: RecipeEntry) =>
  topicHubItems.filter((hub) => recipeBelongsToTopicHub(recipe, hub.slug));
