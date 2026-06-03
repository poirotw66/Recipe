import type { CollectionEntry } from "astro:content";

export type RecipeEntry = CollectionEntry<"recipes">;

export const sortRecipesByPublishedDate = (recipes: RecipeEntry[]) =>
  [...recipes].sort((left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime());

export const getFeaturedRecipes = (recipes: RecipeEntry[], limit = 3) =>
  sortRecipesByPublishedDate(recipes.filter((recipe) => recipe.data.featured)).slice(0, limit);

export const getLatestRecipes = (recipes: RecipeEntry[], limit = 3) =>
  sortRecipesByPublishedDate(recipes).slice(0, limit);

export const getRecipeMeta = (recipe: RecipeEntry) => [
  `${recipe.data.totalTime} 分鐘`,
  `${recipe.data.servings} 人份`,
  recipe.data.equipment[0] ?? recipe.data.category
];

export const getRecipeCardHighlights = (recipe: RecipeEntry) => {
  const coreIngredients = recipe.data.ingredients.filter((item) => item.isCore);
  const ingredientNames = (coreIngredients.length > 0 ? coreIngredients : recipe.data.ingredients)
    .slice(0, 3)
    .map((item) => item.name);

  return {
    timeLabel: `${recipe.data.totalTime} 分鐘`,
    equipmentLabel: recipe.data.equipment[0] ?? recipe.data.category,
    difficultyLabel: recipe.data.difficulty,
    ingredientNames
  };
};

export const getRelatedRecipes = (recipes: RecipeEntry[], currentSlug: string, limit = 3) => {
  const currentRecipe = recipes.find((recipe) => recipe.slug === currentSlug);

  if (!currentRecipe) {
    return [];
  }

  const scored = recipes
    .filter((recipe) => recipe.slug !== currentSlug)
    .map((recipe) => {
      const sharedScenarios = recipe.data.scenarios.filter((scenario) =>
        currentRecipe.data.scenarios.includes(scenario)
      ).length;
      const sharedIngredients = recipe.data.ingredients.filter((ingredient) =>
        currentRecipe.data.ingredients.some((currentIngredient) => currentIngredient.name === ingredient.name)
      ).length;
      const sharedEquipment = recipe.data.equipment.filter((equipment) =>
        currentRecipe.data.equipment.includes(equipment)
      ).length;

      return {
        recipe,
        score: sharedScenarios * 3 + sharedIngredients * 2 + sharedEquipment
      };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || right.recipe.data.publishedAt.getTime() - left.recipe.data.publishedAt.getTime());

  return scored.slice(0, limit).map((item) => item.recipe);
};
