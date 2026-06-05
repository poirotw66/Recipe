import zhTW from "../i18n/ui/zh-TW.json";
import en from "../i18n/ui/en.json";
import ja from "../i18n/ui/ja.json";
import ko from "../i18n/ui/ko.json";

export const defaultLocale = "zh-TW" as const;
export const locales = ["zh-TW", "en", "ja", "ko"] as const;
export type Locale = (typeof locales)[number];
export const nonDefaultLocales = locales.filter((l) => l !== defaultLocale) as Exclude<
  Locale,
  "zh-TW"
>[];

const uiMap: Record<Locale, Record<string, unknown>> = {
  "zh-TW": zhTW,
  en,
  ja,
  ko
};

export const localeToHtmlLang: Record<Locale, string> = {
  "zh-TW": "zh-Hant",
  en: "en",
  ja: "ja",
  ko: "ko"
};

export const localeToOgLocale: Record<Locale, string> = {
  "zh-TW": "zh_TW",
  en: "en_US",
  ja: "ja_JP",
  ko: "ko_KR"
};

export const localeLabels: Record<Locale, string> = {
  "zh-TW": "繁體中文",
  en: "English",
  ja: "日本語",
  ko: "한국어"
};

/** Compact labels for header language select */
export const localeSelectLabels: Record<Locale, string> = {
  "zh-TW": "繁中",
  en: "EN",
  ja: "日本語",
  ko: "한국어"
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getNested(dict: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (typeof current !== "object" || current === null || !(part in current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function t(locale: Locale, key: string): string {
  const value = getNested(uiMap[locale], key) ?? getNested(uiMap[defaultLocale], key);
  return value ?? key;
}

/** Path without locale prefix, e.g. /recipes/foo from /en/recipes/foo */
export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  for (const locale of nonDefaultLocales) {
    const prefix = `/${locale}`;
    if (normalized === prefix || normalized === `${prefix}/`) {
      return "/";
    }
    if (normalized.startsWith(`${prefix}/`)) {
      return normalized.slice(prefix.length) || "/";
    }
  }
  return normalized;
}

export function detectLocaleFromPath(pathname: string): Locale {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  for (const locale of nonDefaultLocales) {
    if (normalized === `/${locale}` || normalized === `/${locale}/` || normalized.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return defaultLocale;
}

/** Build localized path; default locale has no prefix. */
export function localePath(locale: Locale, path: string): string {
  const base = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) {
    return base === "/" ? "/" : base.endsWith("/") ? base : `${base}/`;
  }
  if (base === "/" || base === "") {
    return `/${locale}/`;
  }
  const trimmed = base.replace(/\/$/, "");
  return `/${locale}${trimmed}/`;
}

export function hreflangCode(locale: Locale): string {
  if (locale === "zh-TW") return "zh-TW";
  return locale;
}

export function alternateUrlsForPath(
  siteUrl: string,
  pathWithoutLocale: string,
  limitToLocales?: Locale[]
): Array<{ locale: Locale; href: string }> {
  const selected = limitToLocales ?? [...locales];
  return selected.map((locale) => ({
    locale,
    href: new URL(localePath(locale, pathWithoutLocale), siteUrl).toString()
  }));
}
