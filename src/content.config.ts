import { defineCollection } from "astro:content";
import { defineRecipeSchema } from "./lib/recipe-schema";

const recipes = defineCollection({
  type: "content",
  schema: defineRecipeSchema(["簡單", "中等", "進階"] as const, false)
});

const recipesEn = defineCollection({
  type: "content",
  schema: defineRecipeSchema(["Easy", "Medium", "Advanced"] as const, true)
});

const recipesJa = defineCollection({
  type: "content",
  schema: defineRecipeSchema(["かんたん", "普通", "むずかしい"] as const, true)
});

const recipesKo = defineCollection({
  type: "content",
  schema: defineRecipeSchema(["쉬움", "보통", "어려움"] as const, true)
});

export const collections = {
  recipes,
  "recipes-en": recipesEn,
  "recipes-ja": recipesJa,
  "recipes-ko": recipesKo
};
