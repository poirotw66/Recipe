/**
 * Normalize a page path to the trailing-slash form the site actually serves.
 *
 * Cloudflare assets run with `html_handling: "force-trailing-slash"`, so
 * `/recipes` 301s to `/recipes/`. Canonical, JSON-LD, sitemap <loc>, and
 * internal page links must already be that final form or Search Console
 * files them under "Page with redirect".
 */
export const pageUrlPath = (path: string): string => {
  const base = path.startsWith("/") ? path : `/${path}`;
  const match = /^([^?#]*)([?#].*)?$/.exec(base);
  const pathname = match?.[1] ?? base;
  const suffix = match?.[2] ?? "";
  if (pathname === "" || pathname === "/") {
    return `/${suffix}`;
  }
  if (pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(pathname)) {
    return `${pathname}${suffix}`;
  }
  return `${pathname}/${suffix}`;
};
