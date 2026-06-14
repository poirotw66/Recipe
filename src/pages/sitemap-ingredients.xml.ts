import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { sortRecipesByPublishedDate } from "../lib/recipes";
import { absoluteUrl } from "../lib/seo";
import { getVisibleIngredients } from "../lib/taxonomy";

const renderUrlSet = (paths: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join("\n")}
</urlset>`;

export const GET: APIRoute = async () => {
  const recipes = sortRecipesByPublishedDate(await getCollection("recipes"));
  const visibleIngredients = getVisibleIngredients(recipes);

  return new Response(
    renderUrlSet(visibleIngredients.map((ingredient) => `/ingredients/${ingredient.slug}/`)),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
};
