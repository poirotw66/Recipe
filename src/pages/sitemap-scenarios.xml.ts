import type { APIRoute } from "astro";
import { localePath } from "../lib/i18n";
import { renderUrlSet } from "../lib/sitemap";
import { scenarioItems } from "../lib/taxonomy";

export const GET: APIRoute = () => {
  const entries = [
    ...scenarioItems.map((scenario) => ({ path: `/scenarios/${scenario.slug}/` })),
    // Keep taxonomy submission aligned with the staged recipe rollout: zh-TW
    // and en are active, while ja/ko stay available but unsubmitted for now.
    ...(["en"] as const).flatMap((locale) =>
      scenarioItems.map((scenario) => ({
        path: localePath(locale, `/scenarios/${scenario.slug}`)
      }))
    )
  ];

  return new Response(renderUrlSet(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
