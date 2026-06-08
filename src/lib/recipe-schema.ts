import { z } from "astro:content";

const ingredientShape = z.object({
  name: z.string().min(1),
  amount: z.string().min(1),
  unit: z.string(),
  isCore: z.boolean().default(false)
});

const seasoningShape = z.object({
  name: z.string().min(1),
  amount: z.string().min(1),
  unit: z.string()
});

const faqShape = z.object({
  question: z.string().min(1),
  answer: z.string().min(1)
});

const restaurantSourceShape = z.object({
  restaurant: z.string().min(1),
  dishName: z.string().min(1).optional(),
  region: z.string().min(1).optional()
});

export function defineRecipeSchema(
  difficultyValues: readonly [string, ...string[]],
  withRecipeId: boolean
) {
  const difficulty = z.enum(difficultyValues);
  const base = z
    .object({
      ...(withRecipeId ? { recipeId: z.string().min(1) } : {}),
      title: z.string().min(1),
      description: z.string().min(1),
      coverImage: z.string().min(1),
      servings: z.number().int().positive(),
      prepTime: z.number().int().nonnegative(),
      cookTime: z.number().int().nonnegative(),
      totalTime: z.number().int().positive(),
      difficulty,
      calories: z.number().int().positive().optional(),
      protein: z.number().positive().optional(),
      fat: z.number().positive().optional(),
      carbs: z.number().positive().optional(),
      category: z.string().min(1),
      scenarios: z.array(z.string().min(1)).min(1),
      equipment: z.array(z.string().min(1)).min(1),
      ingredients: z.array(ingredientShape).min(1),
      seasonings: z.array(seasoningShape),
      tags: z.array(z.string().min(1)).default([]),
      restaurantSource: restaurantSourceShape.optional(),
      intro: z.string().min(1),
      steps: z.array(z.string().min(1)).min(3),
      tips: z.array(z.string().min(1)).default([]),
      storage: z.string().min(1),
      substitutions: z.array(z.string().min(1)).default([]),
      customAdditions: z.array(z.string()).default([]),
      faqs: z.array(faqShape).default([]),
      relatedIngredients: z.array(z.string().min(1)).default([]),
      featured: z.boolean().default(false),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date()
    })
    .refine((recipe) => recipe.totalTime >= recipe.prepTime + recipe.cookTime, {
      message: "totalTime must be greater than or equal to prepTime + cookTime"
    });

  return base;
}
