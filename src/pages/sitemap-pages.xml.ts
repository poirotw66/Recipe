import type { APIRoute } from "astro";
import { absoluteUrl } from "../lib/seo";

const staticPages = [
  "/",
  "/recipes/",
  "/ingredients/",
  "/scenarios/",
  "/tools/fridge-recipe/",
  "/about/",
  "/contact/",
  "/privacy-policy/",
  "/terms/"
];

const renderUrlSet = (paths: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join("\n")}
</urlset>`;

export const GET: APIRoute = () =>
  new Response(renderUrlSet(staticPages), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
