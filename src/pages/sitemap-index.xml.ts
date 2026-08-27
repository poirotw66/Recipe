import type { APIRoute } from "astro";
import { renderSitemapIndex } from "../lib/sitemap";

export const GET: APIRoute = () =>
  new Response(
    renderSitemapIndex([
      "/sitemap-pages.xml",
      "/sitemap-recipes.xml",
      "/sitemap-ingredients.xml",
      "/sitemap-scenarios.xml"
    ]),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
