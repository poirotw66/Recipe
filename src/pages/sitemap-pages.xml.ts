import type { APIRoute } from "astro";
import { localePath } from "../lib/i18n";
import { renderUrlSet } from "../lib/sitemap";
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
  "/terms/"
];

const localizedShellPages = [
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

const localizedTopicHubPages = topicHubs.map((hub) => `/${hub.slug}/`);

const staticPages = [
  ...defaultPages,
  ...(["en", "ja", "ko"] as const).flatMap((locale) => [
    ...localizedShellPages.map((path) => localePath(locale, path === "/" ? "/" : path.replace(/\/$/, ""))),
    ...localizedTopicHubPages.map((path) => localePath(locale, path.replace(/\/$/, "")))
  ])
];

export const GET: APIRoute = () =>
  new Response(renderUrlSet(staticPages.map((path) => ({ path }))), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
