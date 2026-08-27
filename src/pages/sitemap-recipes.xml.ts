import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { localePath, type Locale } from "../lib/i18n";
import { localesWithRecipeTranslation } from "../lib/recipe-locale";
import { renderUrlSet, type SitemapEntry } from "../lib/sitemap";

export const GET: APIRoute = async () => {
  const recipes = await getCollection("recipes");
  const alternatesBySlug = new Map<string, Array<{ locale: Locale; path: string }>>();

  for (const recipe of recipes) {
    const available = await localesWithRecipeTranslation(recipe.slug);
    alternatesBySlug.set(
      recipe.slug,
      available.map((locale) => ({
        locale,
        path: localePath(locale, `/recipes/${recipe.slug}`)
      }))
    );
  }

  const entries: SitemapEntry[] = recipes.map((recipe) => ({
    path: `/recipes/${recipe.slug}/`,
    lastmod: recipe.data.updatedAt.toISOString().slice(0, 10),
    alternates: alternatesBySlug.get(recipe.slug)
  }));

  for (const locale of ["en", "ja", "ko"] as const) {
    const collection = locale === "en" ? "recipes-en" : locale === "ja" ? "recipes-ja" : "recipes-ko";
    const localized = await getCollection(collection);
    for (const recipe of localized) {
      entries.push({
        path: localePath(locale, `/recipes/${recipe.slug}`),
        lastmod: recipe.data.updatedAt.toISOString().slice(0, 10),
        alternates: alternatesBySlug.get(recipe.slug)
      });
    }
  }

  return new Response(renderUrlSet(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
