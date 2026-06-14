import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "./i18n";
import { defaultLocale, localePath, locales } from "./i18n";
import { getIngredientBySlug, ingredientHasRecipes } from "./taxonomy";
import { sortRecipesByPublishedDate } from "./recipes";

export type RecipeCollectionId = "recipes" | "recipes-en" | "recipes-ja" | "recipes-ko";

export type LocalizedRecipeEntry =
  | CollectionEntry<"recipes">
  | CollectionEntry<"recipes-en">
  | CollectionEntry<"recipes-ja">
  | CollectionEntry<"recipes-ko">;

const collectionByLocale: Record<Locale, RecipeCollectionId> = {
  "zh-TW": "recipes",
  en: "recipes-en",
  ja: "recipes-ja",
  ko: "recipes-ko"
};

export function recipeCollectionId(locale: Locale): RecipeCollectionId {
  return collectionByLocale[locale];
}

export function recipeDetailPath(slug: string, locale: Locale): string {
  return localePath(locale, `/recipes/${slug}`);
}

export async function getLocalizedRecipe(
  slug: string,
  locale: Locale
): Promise<LocalizedRecipeEntry | undefined> {
  const collection = recipeCollectionId(locale);
  const entries = await getCollection(collection);
  return entries.find((entry) => entry.slug === slug);
}

export async function listRecipesForLocale(locale: Locale): Promise<LocalizedRecipeEntry[]> {
  const collection = recipeCollectionId(locale);
  const entries = await getCollection(collection);
  return entries;
}

/** Locales that have a built recipe detail page for this slug (pilot set only). */
export async function localesWithRecipeTranslation(slug: string): Promise<Locale[]> {
  const available: Locale[] = ["zh-TW"];
  for (const locale of ["en", "ja", "ko"] as const) {
    const entry = await getLocalizedRecipe(slug, locale);
    if (entry) {
      available.push(locale);
    }
  }
  return available;
}

export function localizedRecipeHref(slug: string, locale: Locale): string {
  return recipeDetailPath(slug, locale);
}

/** Locales where this ingredient slug has at least one related recipe. */
export async function localesWithVisibleIngredient(slug: string): Promise<Locale[]> {
  const ingredient = getIngredientBySlug(slug);
  if (!ingredient) {
    return [];
  }

  const available: Locale[] = [];
  for (const locale of locales) {
    const recipes = sortRecipesByPublishedDate(await listRecipesForLocale(locale));
    if (ingredientHasRecipes(recipes, ingredient)) {
      available.push(locale);
    }
  }
  return available;
}
