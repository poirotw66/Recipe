import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { localePath } from "../lib/i18n";
import { listRecipesForLocale } from "../lib/recipe-locale";
import { sortRecipesByPublishedDate } from "../lib/recipes";
import { renderUrlSet } from "../lib/sitemap";
import { getVisibleIngredients } from "../lib/taxonomy";

export const GET: APIRoute = async () => {
  const zhRecipes = sortRecipesByPublishedDate(await getCollection("recipes"));
  const entries = getVisibleIngredients(zhRecipes).map((ingredient) => ({
    path: `/ingredients/${ingredient.slug}/`
  }));

  // During recovery, only zh-TW and en taxonomy pages are actively submitted.
  // ja/ko pages remain available, self-canonical, and discoverable through
  // hreflang, but are not pushed as a full non-pilot taxonomy cohort.
  for (const locale of ["en"] as const) {
    const recipes = sortRecipesByPublishedDate(await listRecipesForLocale(locale));
    for (const ingredient of getVisibleIngredients(recipes)) {
      entries.push({
        path: localePath(locale, `/ingredients/${ingredient.slug}`)
      });
    }
  }

  return new Response(renderUrlSet(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
