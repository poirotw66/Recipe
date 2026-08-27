import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const eligibilitySource = read("src/lib/recipe-index-eligibility.ts");
assert.match(eligibilitySource, /RECIPE_INDEX_OVERRIDES/);
assert.match(eligibilitySource, /resolveRecipeIndexEligibility/);
assert.match(eligibilitySource, /indexableRecipeLocales/);
assert.match(eligibilitySource, /"zh-TW": \{[\s\S]*?indexable: true,[\s\S]*?tier: "other"/);
assert.match(eligibilitySource, /en: \{[\s\S]*?indexable: true,[\s\S]*?tier: "other"/);
assert.match(eligibilitySource, /I18N_PILOT_SLUG_SET\.has\(slug\)/);
const auditedNoindexBlock = eligibilitySource.match(
  /RESTAURANT_AUDIT_TEMPORARY_NOINDEX_SLUGS = \[([\s\S]*?)\] as const/
)?.[1] ?? "";
const AUDITED_NOINDEX_SLUGS = [
  ...auditedNoindexBlock.matchAll(/"([^"]+)"/g)
].map((match) => match[1]);
assert.equal(AUDITED_NOINDEX_SLUGS.length, 25);

const pilotSource = read("src/lib/i18n-translated-slugs.ts");
const pilotBlock = pilotSource.match(/I18N_PILOT_SLUGS = \[([\s\S]*?)\] as const/)?.[1] ?? "";
const I18N_PILOT_SLUGS = [...pilotBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
assert.equal(I18N_PILOT_SLUGS.length, 15);

const robotsSource = read("src/pages/robots.txt.ts");
assert.doesNotMatch(robotsSource, /Disallow: \/\*\?(?:ingredients|preferences)=/);
assert.match(read("src/components/FridgeToolPage.astro"), /noindex, follow/);
assert.match(read("src/worker.ts"), /applyFridgeQueryRobots/);
assert.match(read("src/lib/fridge-indexing.ts"), /X-Robots-Tag/);

const sitemapIndexSource = read("src/pages/sitemap-index.xml.ts");
for (const name of [
  "sitemap-core-recipes.xml",
  "sitemap-other-zh-recipes.xml",
  "sitemap-en-recipes.xml",
  "sitemap-ja-ko-pilot.xml"
]) {
  assert.match(sitemapIndexSource, new RegExp(name.replaceAll(".", "\\.")));
}
assert.doesNotMatch(sitemapIndexSource, /["']\/sitemap-recipes\.xml["']/);
assert.match(read("src/pages/sitemap-recipes.xml.ts"), /buildSubmittedRecipeSitemapEntries/);

const distDir = join(root, "dist");
assert.equal(existsSync(distDir), true, "Run npm run build before the SEO index policy test.");
const xml = (name) => readFileSync(join(distDir, name), "utf8");
const primaryLocations = (body) => [...body.matchAll(/<url><loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const sitemapIndex = xml("sitemap-index.xml");
assert.doesNotMatch(sitemapIndex, /sitemap-recipes\.xml/);
assert.equal(primaryLocations(xml("sitemap-core-recipes.xml")).length, 0);

const zhCount = readdirSync(join(root, "src/content/recipes")).filter((name) => name.endsWith(".md")).length;
const enCount = readdirSync(join(root, "src/content/recipes-en")).filter((name) => name.endsWith(".md")).length;
const zhLocations = primaryLocations(xml("sitemap-other-zh-recipes.xml"));
const enLocations = primaryLocations(xml("sitemap-en-recipes.xml"));
const pilotLocations = primaryLocations(xml("sitemap-ja-ko-pilot.xml"));
const auditedNoindex = new Set(AUDITED_NOINDEX_SLUGS);
const indexablePilotSlugs = I18N_PILOT_SLUGS.filter((slug) => !auditedNoindex.has(slug));
assert.equal(zhLocations.length, zhCount - auditedNoindex.size);
assert.equal(enLocations.length, enCount - auditedNoindex.size);
assert.equal(pilotLocations.length, indexablePilotSlugs.length * 2);
assert.ok(zhLocations.every((url) => /\/recipes\//.test(url) && !/\/(?:en|ja|ko)\/recipes\//.test(url)));
assert.ok(enLocations.every((url) => /\/en\/recipes\//.test(url)));
assert.ok(pilotLocations.every((url) => /\/(?:ja|ko)\/recipes\//.test(url)));
assert.ok(indexablePilotSlugs.every((slug) => pilotLocations.some((url) => url.endsWith(`/ja/recipes/${slug}/`))));
assert.ok(indexablePilotSlugs.every((slug) => pilotLocations.some((url) => url.endsWith(`/ko/recipes/${slug}/`))));

const legacy = xml("sitemap-recipes.xml");
assert.match(legacy, /<urlset/);
assert.doesNotMatch(legacy, /<sitemapindex/);
assert.equal(
  primaryLocations(legacy).length,
  zhLocations.length + enLocations.length + pilotLocations.length
);

for (const name of readdirSync(distDir).filter((item) => /^sitemap-.*\.xml$/.test(item))) {
  assert.doesNotMatch(xml(name), /\?(?:ingredients|preferences)=/);
}

function listFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

const workerBundle = listFiles(join(distDir, "_worker.js"))
  .filter((path) => path.endsWith(".js") || path.endsWith(".mjs"))
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");
assert.match(workerBundle, /X-Robots-Tag/);
assert.match(workerBundle, /ingredients/);
assert.match(workerBundle, /preferences/);

for (const [locale, prefix] of [["zh-TW", ""], ["en", "/en"], ["ja", "/ja"], ["ko", "/ko"]]) {
  const html = readFileSync(join(distDir, prefix, "tools/fridge-recipe/index.html"), "utf8");
  const expected = `https://recipe.bloss0m.com${prefix}/tools/fridge-recipe/`;
  assert.match(html, new RegExp(`<link rel="canonical" href="${expected}"`));
}

console.log("SEO index policy checks passed.");
