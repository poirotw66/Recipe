import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, relative } from "node:path";
import { getVisibleIngredientSlugsByLocale } from "./lib/visible-ingredients.mjs";

const root = process.cwd();
const distDir = join(root, "dist");
const locales = ["zh-TW", "en", "ja", "ko"];
const nonDefaultLocales = ["en", "ja", "ko"];

function localePath(locale, path) {
  const base = path.startsWith("/") ? path : `/${path}`;
  if (locale === "zh-TW") {
    return base === "/" ? "/" : base.endsWith("/") ? base : `${base}/`;
  }
  if (base === "/" || base === "") {
    return `/${locale}/`;
  }
  const trimmed = base.replace(/\/$/, "");
  return `/${locale}${trimmed}/`;
}

function normalizeInternalPath(rawHref) {
  if (!rawHref || typeof rawHref !== "string") {
    return null;
  }
  if (
    rawHref.startsWith("http://") ||
    rawHref.startsWith("https://") ||
    rawHref.startsWith("mailto:") ||
    rawHref.startsWith("tel:") ||
    rawHref.startsWith("#") ||
    rawHref.startsWith("javascript:")
  ) {
    return null;
  }
  if (!rawHref.startsWith("/")) {
    return null;
  }
  const [pathname] = rawHref.split("#");
  const [pathOnly] = pathname.split("?");
  if (!pathOnly || pathOnly === "/") {
    return "/";
  }

  const assetPattern = /\.(png|jpe?g|webp|gif|svg|ico|css|js|mjs|json|xml|txt|woff2?|ttf|map)$/i;
  if (assetPattern.test(pathOnly) || pathOnly.startsWith("/_astro/") || pathOnly.startsWith("/scripts/") || pathOnly.startsWith("/images/")) {
    return null;
  }

  return pathOnly.endsWith("/") ? pathOnly : `${pathOnly}/`;
}

function resolveDistFile(pathname) {
  const normalized = normalizeInternalPath(pathname);
  if (!normalized) {
    return null;
  }
  if (normalized === "/") {
    const rootIndex = join(distDir, "index.html");
    return existsSync(rootIndex) ? rootIndex : null;
  }
  const relativePath = normalized.replace(/^\//, "").replace(/\/$/, "");
  const asDirectoryIndex = join(distDir, relativePath, "index.html");
  if (existsSync(asDirectoryIndex)) {
    return asDirectoryIndex;
  }
  const asHtmlFile = join(distDir, `${relativePath}.html`);
  if (existsSync(asHtmlFile)) {
    return asHtmlFile;
  }
  return null;
}

function walkHtmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walkHtmlFiles(fullPath, files);
      continue;
    }
    if (entry.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

function htmlFileToPathname(filePath) {
  const rel = relative(distDir, filePath).replace(/\\/g, "/");
  if (rel === "index.html") {
    return "/";
  }
  if (rel.endsWith("/index.html")) {
    return `/${rel.slice(0, -"/index.html".length)}/`;
  }
  return `/${rel.replace(/\.html$/, "")}/`;
}

function extractHrefValues(html) {
  const hrefs = [];
  const patterns = [
    /href="([^"]+)"/g,
    /href='([^']+)'/g,
    /<option[^>]*value="(\/[^"]*)"/g
  ];
  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      hrefs.push(match[1]);
    }
  }
  return hrefs;
}

function extractHreflangPaths(html) {
  const paths = [];
  for (const match of html.matchAll(/<link[^>]*hreflang="[^"]+"[^>]*href="([^"]+)"/g)) {
    try {
      const url = new URL(match[1]);
      paths.push(normalizeInternalPath(url.pathname));
    } catch {
      // ignore malformed urls
    }
  }
  return paths.filter(Boolean);
}

function loadJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8"));
}

function loadRecipeSlugs() {
  const dir = join(root, "src/content/recipes");
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function recordFailure(failures, source, href, pathname) {
  failures.push({ source, href, pathname });
}

function needsBuild() {
  if (!existsSync(distDir)) {
    return true;
  }
  const routeMarkers = [
    "en/restaurant-replicas/index.html",
    "en/404/index.html",
    "en/scenarios/one-person-meal/index.html",
    "en/ingredients/egg/index.html"
  ];
  return routeMarkers.some((marker) => !existsSync(join(distDir, marker)));
}

async function main() {
  if (needsBuild()) {
    console.log("dist/ is missing or stale. Running `npm run build` for route verification...");
    execSync("npm run build", { stdio: "inherit", cwd: root });
  }

  const scenarios = loadJson("src/data/scenarios.json");
  const ingredients = loadJson("src/data/ingredients.json");
  const topicHubs = loadJson("src/data/topic-hubs.json");
  const recipeSlugs = loadRecipeSlugs();
  const visibleIngredientSlugsByLocale = getVisibleIngredientSlugsByLocale(ingredients, locales);

  const shellPaths = [
    "/",
    "/recipes/",
    "/ingredients/",
    "/scenarios/",
    "/about/",
    "/contact/",
    "/privacy-policy/",
    "/terms/",
    "/tools/fridge-recipe/"
  ];
  const topicHubPaths = topicHubs.map((hub) => `/${hub.slug}/`);

  const expectedPaths = new Set();
  for (const locale of locales) {
    for (const shellPath of shellPaths) {
      expectedPaths.add(normalizeInternalPath(localePath(locale, shellPath)));
    }
    for (const hubPath of topicHubPaths) {
      expectedPaths.add(normalizeInternalPath(localePath(locale, hubPath)));
    }
    for (const scenario of scenarios) {
      expectedPaths.add(normalizeInternalPath(localePath(locale, `/scenarios/${scenario.slug}`)));
    }
    for (const slug of visibleIngredientSlugsByLocale[locale] ?? []) {
      expectedPaths.add(normalizeInternalPath(localePath(locale, `/ingredients/${slug}`)));
    }
    for (const slug of recipeSlugs) {
      expectedPaths.add(normalizeInternalPath(localePath(locale, `/recipes/${slug}`)));
    }
  }

  const failures = [];
  const checked = new Set();

  const checkPath = (source, href, pathname) => {
    const normalized = normalizeInternalPath(pathname ?? href);
    if (!normalized) {
      return;
    }
    const key = `${source} -> ${normalized}`;
    if (checked.has(key)) {
      return;
    }
    checked.add(key);
    if (!resolveDistFile(normalized)) {
      recordFailure(failures, source, href ?? pathname, normalized);
    }
  };

  for (const expected of expectedPaths) {
    checkPath("expected-route", expected, expected);
  }

  const navPaths = [
    "/recipes",
    "/ingredients",
    "/scenarios",
    "/quick-meals",
    "/air-fryer",
    "/brunch",
    "/pasta",
    "/beef",
    "/restaurant-replicas",
    "/tools/fridge-recipe"
  ];
  for (const locale of locales) {
    for (const navPath of navPaths) {
      checkPath("navigation", localePath(locale, navPath), localePath(locale, navPath));
    }
  }

  const htmlFiles = walkHtmlFiles(distDir);
  for (const filePath of htmlFiles) {
    const sourcePath = htmlFileToPathname(filePath);
    const html = readFileSync(filePath, "utf8");

    for (const href of extractHrefValues(html)) {
      checkPath(sourcePath, href, href);
    }
    for (const hreflangPath of extractHreflangPaths(html)) {
      checkPath(`${sourcePath} [hreflang]`, hreflangPath, hreflangPath);
    }

    const suffix = sourcePath.replace(/^\/(en|ja|ko)(\/|$)/, "/") === sourcePath
      ? sourcePath
      : sourcePath.replace(/^\/(en|ja|ko)/, "") || "/";
    if (suffix !== "/404/") {
      const ingredientMatch = suffix.match(/^\/ingredients\/([^/]+)\/?$/);
      for (const locale of locales) {
        if (ingredientMatch) {
          const slug = ingredientMatch[1];
          const visibleSlugs = visibleIngredientSlugsByLocale[locale] ?? [];
          if (!visibleSlugs.includes(slug)) {
            continue;
          }
        }
        const switched = localePath(locale, suffix);
        checkPath(`${sourcePath} [lang-switch]`, switched, switched);
      }
    }
  }

  const sitemapFiles = [
    "sitemap-pages.xml",
    "sitemap-recipes.xml",
    "sitemap-ingredients.xml",
    "sitemap-scenarios.xml"
  ];
  for (const sitemapFile of sitemapFiles) {
    const sitemapPath = join(distDir, sitemapFile);
    if (!existsSync(sitemapPath)) {
      recordFailure(failures, "sitemap", sitemapFile, sitemapFile);
      continue;
    }
    const xml = readFileSync(sitemapPath, "utf8");
    for (const match of xml.matchAll(/<loc>https?:\/\/[^<]+\/([^<]*)<\/loc>/g)) {
      const full = match[0].match(/<loc>([^<]+)<\/loc>/)?.[1];
      if (!full) {
        continue;
      }
      try {
        const pathname = normalizeInternalPath(new URL(full).pathname);
        if (pathname) {
          checkPath(`sitemap:${sitemapFile}`, pathname, pathname);
        }
      } catch {
        recordFailure(failures, `sitemap:${sitemapFile}`, full, full);
      }
    }
  }

  if (failures.length > 0) {
    console.error(`Found ${failures.length} broken internal route(s):`);
    const grouped = new Map();
    for (const failure of failures) {
      if (!grouped.has(failure.pathname)) {
        grouped.set(failure.pathname, []);
      }
      grouped.get(failure.pathname).push(failure);
    }
    for (const [pathname, items] of grouped) {
      console.error(`\n- ${pathname}`);
      const sampleSources = [...new Set(items.map((item) => item.source))].slice(0, 5);
      for (const source of sampleSources) {
        console.error(`  from: ${source}`);
      }
      if (items.length > sampleSources.length) {
        console.error(`  (${items.length} references total)`);
      }
    }
    process.exit(1);
  }

  console.log(
    `No broken internal routes found (${expectedPaths.size} expected routes, ${htmlFiles.length} HTML files scanned).`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
