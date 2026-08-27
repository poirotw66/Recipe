import type { APIRoute } from "astro";
import { renderSitemapIndex } from "../lib/sitemap";

export const GET: APIRoute = () =>
  new Response(
    renderSitemapIndex([
      "/sitemap-pages.xml",
      "/sitemap-core-recipes.xml",
      "/sitemap-other-zh-recipes.xml",
      "/sitemap-en-recipes.xml",
      "/sitemap-ja-ko-pilot.xml",
      "/sitemap-ingredients.xml",
      "/sitemap-scenarios.xml"
    ]),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
