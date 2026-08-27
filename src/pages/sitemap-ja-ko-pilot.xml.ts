import type { APIRoute } from "astro";
import { buildRecipeSitemapEntries } from "../lib/recipe-sitemap";
import { renderUrlSet } from "../lib/sitemap";

export const GET: APIRoute = async () =>
  new Response(renderUrlSet(await buildRecipeSitemapEntries("ja-ko-pilot")), {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
