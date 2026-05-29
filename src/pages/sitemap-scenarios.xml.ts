import type { APIRoute } from "astro";
import { absoluteUrl } from "../lib/seo";
import { scenarioItems } from "../lib/taxonomy";

const renderUrlSet = (paths: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join("\n")}
</urlset>`;

export const GET: APIRoute = () =>
  new Response(renderUrlSet(scenarioItems.map((scenario) => `/scenarios/${scenario.slug}/`)), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
