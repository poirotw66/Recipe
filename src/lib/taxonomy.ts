import ingredients from "../data/ingredients.json";
import scenarios from "../data/scenarios.json";
import topicHubs from "../data/topic-hubs.json";
import type { RecipeEntry } from "./recipes";

export interface IngredientItem {
  name: string;
  slug: string;
  aliases: string[];
  category: string;
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
  commonIngredients: string[];
  relatedScenarios: string[];
}

export const ingredientItems = ingredients as IngredientItem[];
export const scenarioItems = scenarios as ScenarioItem[];
export const topicHubItems = topicHubs as TopicHubItem[];

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

export const getRecipesByIngredient = (recipes: RecipeEntry[], ingredientSlug: string) => {
  const ingredient = getIngredientBySlug(ingredientSlug);

  if (!ingredient) {
    return [];
  }

  return recipes.filter((recipe) =>
    recipe.data.ingredients.some((item) => item.name === ingredient.name || ingredient.aliases.includes(item.name))
  );
};

export const getRecipesByScenario = (recipes: RecipeEntry[], scenarioSlug: string) => {
  const scenario = getScenarioBySlug(scenarioSlug);

  if (!scenario) {
    return [];
  }

  return recipes.filter((recipe) => recipe.data.scenarios.includes(scenario.name));
};

export const getRecipesByTopicHub = (recipes: RecipeEntry[], hubSlug: string) => {
  const hub = getTopicHubBySlug(hubSlug);

  if (!hub) {
    return [];
  }

  return recipes.filter((recipe) => hub.recipeTags.some((tag) => recipe.data.tags.includes(tag)));
};

export const recipeBelongsToTopicHub = (recipe: RecipeEntry, hubSlug: string) => {
  const hub = getTopicHubBySlug(hubSlug);

  if (!hub) {
    return false;
  }

  return hub.recipeTags.some((tag) => recipe.data.tags.includes(tag));
};

export const getTopicHubLinksForRecipe = (recipe: RecipeEntry) =>
  topicHubItems.filter((hub) => recipeBelongsToTopicHub(recipe, hub.slug));
