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

const transitionalLocaleShellPages = localizedShellPages.filter(
  (path) => path !== "/ingredients/" && path !== "/scenarios/"
);

const localizedTopicHubPages = topicHubs.map((hub) => `/${hub.slug}/`);

/** Brand replica pages are built and linked but were missing from the sitemap. */
const brandReplicaPages = ["second-floor-cafe", "dubu-house"].map(
  (brand) => `/restaurant-replicas/${brand}/`
);

const staticPages = [
  ...defaultPages,
  ...brandReplicaPages,
  ...["en" as const].flatMap((locale) => [
    ...localizedShellPages.map((path) => localePath(locale, path === "/" ? "/" : path.replace(/\/$/, ""))),
    ...localizedTopicHubPages.map((path) => localePath(locale, path.replace(/\/$/, ""))),
    ...brandReplicaPages.map((path) => localePath(locale, path.replace(/\/$/, "")))
  ]),
  ...(["ja", "ko"] as const).flatMap((locale) => [
    ...transitionalLocaleShellPages.map((path) =>
      localePath(locale, path === "/" ? "/" : path.replace(/\/$/, ""))
    ),
    ...localizedTopicHubPages.map((path) => localePath(locale, path.replace(/\/$/, ""))),
    ...brandReplicaPages.map((path) => localePath(locale, path.replace(/\/$/, "")))
  ])
];

export const GET: APIRoute = () =>
  new Response(renderUrlSet(staticPages.map((path) => ({ path }))), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
