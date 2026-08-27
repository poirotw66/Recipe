import { getCollection } from "astro:content";
import { localePath, type Locale } from "./i18n";
import {
  getRecipeIndexEligibility,
  indexableRecipeLocales,
  type RecipeIndexTier
} from "./recipe-index-eligibility";
import type { LocalizedRecipeEntry } from "./recipe-locale";
import type { SitemapEntry } from "./sitemap";

export type RecipeSitemapGroup = "core" | "other-zh" | "en" | "ja-ko-pilot";

type LocalizedEntry = { locale: Locale; recipe: LocalizedRecipeEntry };

function belongsToGroup(
  group: RecipeSitemapGroup,
  locale: Locale,
  tier: RecipeIndexTier
): boolean {
  if (group === "core") return tier === "core";
  if (group === "other-zh") return locale === "zh-TW" && tier === "other";
  if (group === "en") return locale === "en" && tier === "other";
  return (locale === "ja" || locale === "ko") && tier === "pilot";
}

async function localizedEntries(): Promise<LocalizedEntry[]> {
  const [zh, en, ja, ko] = await Promise.all([
    getCollection("recipes"),
    getCollection("recipes-en"),
    getCollection("recipes-ja"),
    getCollection("recipes-ko")
  ]);

  return [
    ...zh.map((recipe) => ({ locale: "zh-TW" as const, recipe })),
    ...en.map((recipe) => ({ locale: "en" as const, recipe })),
    ...ja.map((recipe) => ({ locale: "ja" as const, recipe })),
    ...ko.map((recipe) => ({ locale: "ko" as const, recipe }))
  ];
}

export async function buildRecipeSitemapEntries(
  group: RecipeSitemapGroup
): Promise<SitemapEntry[]> {
  const all = await localizedEntries();
  const availableBySlug = new Map<string, Locale[]>();

  for (const { locale, recipe } of all) {
    const locales = availableBySlug.get(recipe.slug) ?? [];
    locales.push(locale);
    availableBySlug.set(recipe.slug, locales);
  }

  return all.flatMap(({ locale, recipe }) => {
    const eligibility = getRecipeIndexEligibility(recipe.slug, locale);
    if (!eligibility.indexable || !belongsToGroup(group, locale, eligibility.tier)) {
      return [];
    }

    const alternates = indexableRecipeLocales(
      recipe.slug,
      availableBySlug.get(recipe.slug) ?? [locale]
    ).map((alternateLocale) => ({
      locale: alternateLocale,
      path: localePath(alternateLocale, `/recipes/${recipe.slug}`)
    }));

    return [{
      path: localePath(locale, `/recipes/${recipe.slug}`),
      lastmod: recipe.data.updatedAt.toISOString().slice(0, 10),
      alternates
    }];
  });
}

export async function buildSubmittedRecipeSitemapEntries(): Promise<SitemapEntry[]> {
  const groups: RecipeSitemapGroup[] = ["core", "other-zh", "en", "ja-ko-pilot"];
  const entries = (await Promise.all(groups.map(buildRecipeSitemapEntries))).flat();
  return [...new Map(entries.map((entry) => [entry.path, entry])).values()];
}
