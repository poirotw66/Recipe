import { getCollection } from "astro:content";
import type { Locale } from "./i18n";
import { defaultLocale, localePath, t } from "./i18n";
import { preferenceDefinitions } from "./fridge.js";
import {
  getIngredientByName,
  getIngredientLabel,
  ingredientItems,
  type IngredientItem
} from "./taxonomy";
import { listRecipesForLocale } from "./recipe-locale";

const quickIngredientSlugs = ["egg", "tofu", "tomato", "chicken-breast", "cabbage", "mushroom"] as const;

export function resolveIngredientNameToSlug(name: string): string | undefined {
  const trimmed = name.trim();
  if (!trimmed) {
    return undefined;
  }

  const direct = getIngredientByName(trimmed);
  if (direct) {
    return direct.slug;
  }

  const byLabel = ingredientItems.find((item) =>
    Object.values(item.labels ?? {}).some((label) => label === trimmed)
  );
  return byLabel?.slug;
}

export function recipeIngredientSlugs(ingredientNames: string[]): string[] {
  const slugs: string[] = [];
  for (const name of ingredientNames) {
    const slug = resolveIngredientNameToSlug(name);
    if (slug && !slugs.includes(slug)) {
      slugs.push(slug);
    }
  }
  return slugs;
}

export function buildLocalizedFridgeIngredients(locale: Locale) {
  return ingredientItems.map((item) => {
    const label = getIngredientLabel(item, locale);
    const aliases =
      locale === defaultLocale
        ? item.aliases
        : item.aliases.filter((alias) => alias !== item.name);

    return {
      slug: item.slug,
      name: label,
      aliases: [label, ...aliases].filter((value, index, array) => array.indexOf(value) === index)
    };
  });
}

function preferenceConfigForLocale(locale: Locale) {
  const isZh = locale === defaultLocale;
  return {
    quick: {
      maxTime: 15,
      scenarios: isZh ? ["10 分鐘料理"] : ["10-minute meals", "10 分鐘料理"]
    },
    protein: {
      minProtein: 20,
      scenarios: isZh ? ["高蛋白料理"] : ["High-protein meals", "高蛋白料理"]
    },
    electricPot: {
      equipment: isZh ? ["電鍋"] : ["Rice cooker", "電鍋"]
    },
    airFryer: {
      equipment: isZh ? ["氣炸鍋"] : ["Air fryer", "氣炸鍋"]
    }
  };
}

export async function buildFridgeToolPayload(locale: Locale) {
  const recipes = await listRecipesForLocale(locale);
  const localizedIngredients = buildLocalizedFridgeIngredients(locale);
  const quickIngredients = quickIngredientSlugs
    .map((slug) => ingredientItems.find((item) => item.slug === slug))
    .filter((item): item is IngredientItem => Boolean(item))
    .map((item) => getIngredientLabel(item, locale));

  const recipeSummaries = recipes.map((recipe) => ({
    slug: recipe.slug,
    title: recipe.data.title,
    coverImage: recipe.data.coverImage,
    description: recipe.data.description,
    totalTime: recipe.data.totalTime,
    protein: recipe.data.protein ?? 0,
    difficulty: recipe.data.difficulty,
    equipment: recipe.data.equipment,
    scenarios: recipe.data.scenarios,
    ingredientSlugs: recipeIngredientSlugs(recipe.data.ingredients.map((item) => item.name))
  }));

  const preferences = preferenceDefinitions.map((item) => ({
    key: item.key,
    label: t(locale, `fridge.pref.${item.key}`)
  }));

  return {
    locale,
    recipeBasePath: localePath(locale, "/recipes").replace(/\/$/, ""),
    ingredients: localizedIngredients,
    slugToName: Object.fromEntries(localizedIngredients.map((item) => [item.slug, item.name])),
    recipes: recipeSummaries,
    preferences,
    preferenceConfig: preferenceConfigForLocale(locale),
    quickIngredients,
    strings: {
      minutes: t(locale, "fridge.minutes"),
      protein: t(locale, "fridge.protein"),
      matched: t(locale, "fridge.matched"),
      missing: t(locale, "fridge.missing"),
      noMatch: t(locale, "fridge.noMatch"),
      noMissing: t(locale, "fridge.noMissing"),
      summaryIdentified: t(locale, "fridge.summaryIdentified"),
      summaryNone: t(locale, "fridge.summaryNone"),
      summaryUnresolved: t(locale, "fridge.summaryUnresolved"),
      summaryPrefs: t(locale, "fridge.summaryPrefs"),
      errorEmpty: t(locale, "fridge.errorEmpty"),
      noResultsUnresolved: t(locale, "fridge.noResultsUnresolved"),
      noResultsDefault: t(locale, "fridge.noResultsDefault")
    }
  };
}
