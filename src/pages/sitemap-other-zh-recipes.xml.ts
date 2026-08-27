import type { APIRoute } from "astro";
import { buildRecipeSitemapEntries } from "../lib/recipe-sitemap";
import { renderUrlSet } from "../lib/sitemap";

export const GET: APIRoute = async () =>
  new Response(renderUrlSet(await buildRecipeSitemapEntries("other-zh")), {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
