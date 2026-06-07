import { localePath, t, type Locale } from "./i18n";

export interface NavLink {
  href: string;
  label: string;
  emphasis?: "button";
}

export function getPrimaryNavLinks(locale: Locale): NavLink[] {
  return [
    { href: localePath(locale, "/recipes"), label: t(locale, "nav.recipes") },
    { href: localePath(locale, "/ingredients"), label: t(locale, "nav.ingredients") },
    { href: localePath(locale, "/scenarios"), label: t(locale, "nav.scenarios") }
  ];
}

export function getTopicNavLinks(locale: Locale): NavLink[] {
  return [
    { href: localePath(locale, "/quick-meals"), label: t(locale, "nav.quickMeals") },
    { href: localePath(locale, "/air-fryer"), label: t(locale, "nav.airFryer") },
    { href: localePath(locale, "/brunch"), label: t(locale, "nav.brunch") },
    { href: localePath(locale, "/pasta"), label: t(locale, "nav.pasta") },
    { href: localePath(locale, "/beef"), label: t(locale, "nav.beef") }
  ];
}

export function getUtilityNavLinks(locale: Locale): NavLink[] {
  return [
    {
      href: localePath(locale, "/tools/fridge-recipe"),
      label: t(locale, "nav.fridge"),
      emphasis: "button"
    }
  ];
}

export function getAllNavLinks(locale: Locale): NavLink[] {
  return [...getPrimaryNavLinks(locale), ...getTopicNavLinks(locale), ...getUtilityNavLinks(locale)];
}

/** @deprecated Use getPrimaryNavLinks(locale) — default zh-TW paths for legacy imports */
export const primaryNavLinks: NavLink[] = getPrimaryNavLinks("zh-TW");
export const topicNavLinks: NavLink[] = getTopicNavLinks("zh-TW");
export const utilityNavLinks: NavLink[] = getUtilityNavLinks("zh-TW");
export const allNavLinks: NavLink[] = getAllNavLinks("zh-TW");
