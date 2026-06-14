import type { APIRoute } from "astro";
import { localePath } from "../lib/i18n";
import { absoluteUrl } from "../lib/seo";
import topicHubs from "../data/topic-hubs.json";

const defaultPages = [
  "/",
  "/recipes/",
  "/ingredients/",
  "/scenarios/",
  "/brunch/",
  "/pasta/",
  "/beef/",
  "/air-fryer/",
  "/quick-meals/",
  "/restaurant-replicas/",
  "/tools/fridge-recipe/",
  "/about/",
  "/contact/",
  "/privacy-policy/",
  "/terms/",
  "/404/"
];

const localizedShellPages = [
  "",
  "/recipes/",
  "/ingredients/",
  "/scenarios/",
  "/tools/fridge-recipe/",
  "/about/",
  "/contact/",
  "/privacy-policy/",
  "/terms/",
  "/404/"
];

const localizedTopicHubPages = topicHubs.map((hub) => `/${hub.slug}/`);

const staticPages = [
  ...defaultPages,
  ...(["en", "ja", "ko"] as const).flatMap((locale) => [
    ...localizedShellPages.map((path) =>
      localePath(locale, path === "" ? "/" : path.replace(/\/$/, ""))
    ),
    ...localizedTopicHubPages.map((path) => localePath(locale, path.replace(/\/$/, "")))
  ])
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
