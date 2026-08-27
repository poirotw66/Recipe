import type { APIRoute } from "astro";
import { buildSubmittedRecipeSitemapEntries } from "../lib/recipe-sitemap";
import { renderUrlSet } from "../lib/sitemap";

export const GET: APIRoute = async () => {
  // Backwards compatibility for previously submitted sitemap URL. This stays
  // a URL set (not a nested sitemap index) and mirrors the actively submitted
  // recipe groups without re-exposing every locale page.
  return new Response(renderUrlSet(await buildSubmittedRecipeSitemapEntries()), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
