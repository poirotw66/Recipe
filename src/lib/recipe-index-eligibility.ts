import { I18N_PILOT_SLUG_SET } from "./i18n-translated-slugs.ts";
import type { Locale } from "./i18n.ts";

export type RecipeIndexTier = "core" | "other" | "pilot";

export type RecipeIndexEligibility = {
  indexable: boolean;
  tier: RecipeIndexTier;
  reason: string;
};

export type RecipeIndexOverrides = Record<
  string,
  Partial<Record<Locale, RecipeIndexEligibility>>
>;

/**
 * The 25-slug restaurant-replica audit cohort. The owner released this cohort
 * from noindex on 2026-10-02 before kitchen trials; content warnings remain.
 */
export const RESTAURANT_AUDIT_REVIEWED_SLUGS = [
  "dh-fried-glass-noodle",
  "dh-ginseng-chicken-clay-pot",
  "dh-ginseng-chicken-hot-pot",
  "dh-ox-bone-soup",
  "dh-steamed-eggs-with-cheese-roe",
  "dh-tofu-ice-cream-with-tapioca",
  "sf-acai-berry-yogurt-bowl",
  "sf-american-cheesecake",
  "sf-asahi-cordon-bleu-pork-burger",
  "sf-balsamic-mushroom-pasta",
  "sf-bbq-roasted-half-chicken",
  "sf-black-truffle-cordon-bleu-pork-open",
  "sf-buffalo-chicken-wings",
  "sf-chef-crispy-pork-knuckle",
  "sf-country-cinnamon-peach-pie",
  "sf-green-superhero-quinoa-buddha-bowl",
  "sf-mini-beef-egg-burger-set",
  "sf-moon-view-bitter-melon-cream-rice",
  "sf-roasted-sesame-chicken-salad",
  "sf-salsa-black-curry-fried-chicken",
  "sf-signature-double-stack-burger",
  "sf-sous-vide-chicken-quinoa-cauliflower-rice",
  "sf-spicy-mexican-firecracker-burger",
  "sf-sweet-savory-rice",
  "sf-tropical-yogurt-bowl"
] as const;

/**
 * Explicit exceptions to default eligibility belong here. This cohort has no
 * noindex overrides after the owner's 2026-10-02 indexing decision.
 */
export const RECIPE_INDEX_OVERRIDES: RecipeIndexOverrides = {};

const DEFAULT_ELIGIBILITY: Record<Locale, RecipeIndexEligibility> = {
  "zh-TW": {
    indexable: true,
    tier: "other",
    reason: "Default indexable zh-TW recipe; awaiting GSC evidence for core or removal decisions."
  },
  en: {
    indexable: true,
    tier: "other",
    reason: "Default indexable English recipe; awaiting GSC evidence for core or removal decisions."
  },
  ja: {
    indexable: true,
    tier: "other",
    reason: "Transitional indexable Japanese recipe; not actively submitted until promoted with evidence."
  },
  ko: {
    indexable: true,
    tier: "other",
    reason: "Transitional indexable Korean recipe; not actively submitted until promoted with evidence."
  }
};

function defaultEligibility(slug: string, locale: Locale): RecipeIndexEligibility {
  if ((locale === "ja" || locale === "ko") && I18N_PILOT_SLUG_SET.has(slug)) {
    return {
      indexable: true,
      tier: "pilot",
      reason: "Existing spec-018 pilot recipe; explicitly selected before the recovery rollout."
    };
  }

  return DEFAULT_ELIGIBILITY[locale];
}

export function resolveRecipeIndexEligibility(
  slug: string,
  locale: Locale,
  overrides: RecipeIndexOverrides = RECIPE_INDEX_OVERRIDES
): RecipeIndexEligibility {
  return overrides[slug]?.[locale] ?? defaultEligibility(slug, locale);
}

export function getRecipeIndexEligibility(
  slug: string,
  locale: Locale
): RecipeIndexEligibility {
  return resolveRecipeIndexEligibility(slug, locale);
}

export function indexableRecipeLocales(
  slug: string,
  availableLocales: readonly Locale[],
  overrides: RecipeIndexOverrides = RECIPE_INDEX_OVERRIDES
): Locale[] {
  return availableLocales.filter(
    (locale) => resolveRecipeIndexEligibility(slug, locale, overrides).indexable
  );
}
