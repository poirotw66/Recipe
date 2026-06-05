import { nonDefaultLocales, type Locale } from "./i18n";

export type NonDefaultLocale = Exclude<Locale, "zh-TW">;

export function localeStaticPaths() {
  return nonDefaultLocales.map((locale) => ({
    params: { locale }
  }));
}

function isNonDefaultLocale(param: string): param is NonDefaultLocale {
  return (nonDefaultLocales as readonly string[]).includes(param);
}

export function requireNonDefaultLocale(param: string | undefined): NonDefaultLocale {
  if (!param || !isNonDefaultLocale(param)) {
    throw new Error(`Invalid locale route param: ${param}`);
  }
  return param;
}
