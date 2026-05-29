import type { APIRoute } from "astro";
import { absoluteUrl } from "../lib/seo";

const renderSitemapIndex = (paths: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <sitemap><loc>${absoluteUrl(path)}</loc></sitemap>`).join("\n")}
</sitemapindex>`;

export const GET: APIRoute = () =>
  new Response(
    renderSitemapIndex(["/sitemap-pages.xml", "/sitemap-recipes.xml", "/sitemap-ingredients.xml", "/sitemap-scenarios.xml"]),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
