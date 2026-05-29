import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl } from "../lib/seo";

const renderUrlSet = (entries: Array<{ path: string; lastmod?: string }>) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) =>
      `  <url><loc>${absoluteUrl(entry.path)}</loc>${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}</url>`
  )
  .join("\n")}
</urlset>`;

export const GET: APIRoute = async () => {
  const recipes = await getCollection("recipes");
  const entries = recipes.map((recipe) => ({
    path: `/recipes/${recipe.slug}/`,
    lastmod: recipe.data.updatedAt.toISOString().slice(0, 10)
  }));

  return new Response(renderUrlSet(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
