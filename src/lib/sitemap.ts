import type { Locale } from "./i18n";
import { absolutePageUrl, absoluteUrl } from "./seo";

export type SitemapEntry = {
  path: string;
  lastmod?: string;
  alternates?: Array<{ locale: Locale; path: string }>;
};

export const renderSitemapIndex = (paths: string[]): string => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <sitemap><loc>${absoluteUrl(path)}</loc></sitemap>`).join("\n")}
</sitemapindex>`;

const renderAlternateLinks = (entry: SitemapEntry): string => {
  if (!entry.alternates?.length) {
    return "";
  }
  const links = entry.alternates.map(
    (item) =>
      `    <xhtml:link rel="alternate" hreflang="${item.locale === "zh-TW" ? "zh-TW" : item.locale}" href="${absolutePageUrl(item.path)}"/>`
  );
  const defaultPath = entry.alternates.find((item) => item.locale === "zh-TW")?.path ?? entry.path;
  links.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${absolutePageUrl(defaultPath)}"/>`);
  return `\n${links.join("\n")}`;
};

export const renderUrlSet = (entries: SitemapEntry[]): string => {
  const hasAlternates = entries.some((entry) => (entry.alternates?.length ?? 0) > 0);
  const xhtmlNs = hasAlternates ? ` xmlns:xhtml="http://www.w3.org/1999/xhtml"` : "";
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${xhtmlNs}>
${entries
  .map(
    (entry) =>
      `  <url><loc>${absolutePageUrl(entry.path)}</loc>${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}${renderAlternateLinks(entry)}</url>`
  )
  .join("\n")}
</urlset>`;
};
