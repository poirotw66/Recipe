import ingredients from "../data/ingredients.json";
import scenarios from "../data/scenarios.json";
import topicHubs from "../data/topic-hubs.json";
import type { Locale } from "./i18n";
import { defaultLocale } from "./i18n";
import type { RecipeEntry } from "./recipes";

export type LocalizedLabels = Partial<Record<Locale, string>> & { "zh-TW": string };

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

export const getPopularIngredients = (recipes: RecipeEntry[], limit = 8) =>
  [...ingredientItems]
    .map((ingredient) => ({
      ingredient,
      count: countRecipesForIngredient(recipes, ingredient),
    }))
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
