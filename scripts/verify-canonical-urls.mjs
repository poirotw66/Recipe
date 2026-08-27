/**
 * Guards SEO URL invariants: Cloudflare force-trailing-slash means `/foo`
 * 301s to `/foo/`. Canonical, hreflang, JSON-LD, sitemap <loc>, and internal
 * <a href> must already be the final form or Search Console files redirects.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const distDir = join(root, "dist");
const origin = "https://recipe.bloss0m.com";

if (!existsSync(distDir)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "_astro" || name === "_worker.js") continue;
      walk(full);
    } else if (name.endsWith(".html")) {
      htmlFiles.push(full);
    }
  }
};
walk(distDir);

/** URL path a built file is served at, e.g. dist/recipes/x/index.html -> /recipes/x/ */
const servedPath = (file) => {
  const rel = relative(distDir, file).split("\\").join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  if (rel === "404.html") return "/404/";
  return `/${rel}`;
};

const builtPaths = new Set(htmlFiles.map(servedPath));

const isAsset = (pathname) => /\.[a-z0-9]+$/i.test(pathname);
const wouldRedirect = (pathname) =>
  pathname !== "" && pathname !== "/" && !pathname.endsWith("/") && !isAsset(pathname);

const errors = [];
const add = (file, message) => errors.push(`${relative(root, file)}: ${message}`);

const attr = (tag, name) => {
  const match = new RegExp(`${name}="([^"]*)"`).exec(tag);
  return match?.[1] ?? null;
};

const localPath = (href) => {
  if (!href) return null;
  if (href.startsWith(origin)) return href.slice(origin.length) || "/";
  if (href.startsWith("http://") || href.startsWith("https://")) return null;
  if (!href.startsWith("/")) return null;
  return href;
};

const splitPath = (value) => value.split("#")[0].split("?")[0];

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const url = servedPath(file);
  const isErrorPage = /<meta name="robots" content="[^"]*noindex/.test(html);

  const canonicalTag = /<link rel="canonical"[^>]*>/.exec(html)?.[0];
  if (!canonicalTag) {
    add(file, 'missing <link rel="canonical">');
  } else {
    const canonical = attr(canonicalTag, "href");
    if (!canonical?.startsWith(origin)) {
      add(file, `canonical is not an absolute ${origin} URL: ${canonical}`);
    } else {
      const canonicalPath = canonical.slice(origin.length) || "/";
      if (wouldRedirect(splitPath(canonicalPath))) {
        add(file, `canonical points at a redirect (missing trailing slash): ${canonicalPath}`);
      } else if (!isErrorPage && canonicalPath !== url && !builtPaths.has(canonicalPath)) {
        add(file, `canonical points at a page that is not built: ${canonicalPath}`);
      }
    }
  }

  for (const tag of html.match(/<link rel="alternate"[^>]*>/g) ?? []) {
    const path = localPath(attr(tag, "href"));
    if (!path) continue;
    if (wouldRedirect(splitPath(path))) {
      add(file, `hreflang href points at a redirect: ${path}`);
    } else if (!builtPaths.has(splitPath(path))) {
      add(file, `hreflang href points at a page that is not built: ${path}`);
    }
  }

  for (const tag of html.match(/<a [^>]*href="[^"]*"[^>]*>/g) ?? []) {
    const path = localPath(attr(tag, "href"));
    if (!path) continue;
    if (wouldRedirect(splitPath(path))) {
      add(file, `internal link points at a redirect: ${attr(tag, "href")}`);
    }
  }

  for (const match of html.matchAll(
    /"(?:url|item|@id|mainEntityOfPage|inDefinedTermSet)":"(https:\/\/recipe\.bloss0m\.com[^"]*)"/g
  )) {
    const path = splitPath(match[1].slice(origin.length) || "/");
    if (wouldRedirect(path)) {
      add(file, `JSON-LD URL points at a redirect: ${match[1]}`);
    }
  }
}

const sitemapPaths = new Set();
for (const name of readdirSync(distDir)) {
  if (!/^sitemap-.*\.xml$/.test(name)) continue;
  const xml = readFileSync(join(distDir, name), "utf8");
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const loc = match[1];
    if (!loc.startsWith(origin)) {
      errors.push(`${name}: <loc> is not on ${origin}: ${loc}`);
      continue;
    }
    const path = loc.slice(origin.length) || "/";
    if (path.endsWith(".xml")) continue;
    sitemapPaths.add(path);
    if (wouldRedirect(splitPath(path))) {
      errors.push(`${name}: <loc> points at a redirect: ${path}`);
    } else if (!builtPaths.has(path)) {
      errors.push(`${name}: <loc> has no built page: ${path}`);
    }
  }
  for (const match of xml.matchAll(/xhtml:link[^>]*href="([^"]+)"/g)) {
    const path = match[1].slice(origin.length) || "/";
    if (wouldRedirect(splitPath(path))) {
      errors.push(`${name}: hreflang alternate points at a redirect: ${path}`);
    } else if (!builtPaths.has(path)) {
      errors.push(`${name}: hreflang alternate has no built page: ${path}`);
    }
  }
}

for (const file of htmlFiles) {
  const url = servedPath(file);
  if (url === "/404/" || url.endsWith("/404/")) continue;
  const html = readFileSync(file, "utf8");
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
  if (!sitemapPaths.has(url)) {
    errors.push(`sitemap: indexable page is missing from the sitemap: ${url}`);
  }
}

if (!sitemapPaths.has("/restaurant-replicas/second-floor-cafe/")) {
  errors.push("sitemap: missing brand page /restaurant-replicas/second-floor-cafe/");
}
if (!sitemapPaths.has("/restaurant-replicas/dubu-house/")) {
  errors.push("sitemap: missing brand page /restaurant-replicas/dubu-house/");
}

if (errors.length > 0) {
  console.error(`Canonical/sitemap verification failed (${errors.length} issue(s)):`);
  for (const error of errors.slice(0, 40)) console.error(`  - ${error}`);
  if (errors.length > 40) console.error(`  ... and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `Canonical/sitemap verification passed (${htmlFiles.length} pages, ${sitemapPaths.size} sitemap URLs).`
);
