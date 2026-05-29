import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "package.json",
  "astro.config.mjs",
  "tsconfig.json",
  "src/content.config.ts",
  "src/layouts/BaseLayout.astro",
  "src/layouts/RecipeLayout.astro",
  "src/layouts/StaticArticleLayout.astro",
  "src/components/SeoHead.astro",
  "src/components/Header.astro",
  "src/components/Footer.astro",
  "src/components/RecipeCard.astro",
  "src/components/JsonLd.astro",
  "src/components/AdSlot.astro",
  "src/lib/fridge.js",
  "src/pages/index.astro",
  "src/pages/recipes/index.astro",
  "src/pages/recipes/[slug].astro",
  "src/pages/ingredients/index.astro",
  "src/pages/ingredients/[slug].astro",
  "src/pages/scenarios/index.astro",
  "src/pages/scenarios/[slug].astro",
  "src/pages/tools/fridge-recipe.astro",
  "src/pages/about.astro",
  "src/pages/contact.astro",
  "src/pages/privacy-policy.astro",
  "src/pages/terms.astro",
  "src/pages/robots.txt.ts",
  "src/pages/sitemap-index.xml.ts",
  "src/pages/sitemap-pages.xml.ts",
  "src/pages/sitemap-recipes.xml.ts",
  "src/pages/sitemap-ingredients.xml.ts",
  "src/pages/sitemap-scenarios.xml.ts",
  "src/lib/seo.ts",
  "src/lib/site.ts",
  "src/lib/taxonomy.ts",
  "public/ads.txt",
  "public/scripts/fridge-tool.js",
  "public/images/.gitkeep",
  "src/content/recipes/tofu-scrambled-eggs.md",
  "src/content/recipes/tomato-egg-rice.md",
  "src/content/recipes/steamed-chicken-bento.md",
  "src/data/ingredients.json",
  "src/data/scenarios.json"
];

const root = process.cwd();
const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));

if (missing.length) {
  console.error(`Missing required files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

const baseLayout = readFileSync(join(root, "src/layouts/BaseLayout.astro"), "utf8");
const seoHead = readFileSync(join(root, "src/components/SeoHead.astro"), "utf8");
const recipeLayout = readFileSync(join(root, "src/layouts/RecipeLayout.astro"), "utf8");
const staticLayout = readFileSync(join(root, "src/layouts/StaticArticleLayout.astro"), "utf8");
const adSlot = readFileSync(join(root, "src/components/AdSlot.astro"), "utf8");
const siteConfig = readFileSync(join(root, "src/lib/site.ts"), "utf8");
const fridgeLogic = readFileSync(join(root, "src/lib/fridge.js"), "utf8");
const robotsRoute = readFileSync(join(root, "src/pages/robots.txt.ts"), "utf8");
const ads = readFileSync(join(root, "public/ads.txt"), "utf8");
const contentConfig = readFileSync(join(root, "src/content.config.ts"), "utf8");

const requiredHeadParts = [
  "<title>",
  'name="description"',
  'rel="canonical"',
  'property="og:title"',
  'property="og:image"',
  'name="twitter:title"',
  'name="twitter:image"'
];

const headSource = `${baseLayout}\n${seoHead}`;
const missingHeadParts = requiredHeadParts.filter((part) => !headSource.includes(part));

if (missingHeadParts.length) {
  console.error(`SEO head is missing markers: ${missingHeadParts.join(", ")}`);
  process.exit(1);
}

if (!recipeLayout.includes('slot name="structured-data"')) {
  console.error("RecipeLayout must expose a structured-data slot.");
  process.exit(1);
}

if (!staticLayout.includes("最後更新")) {
  console.error("StaticArticleLayout must render the legal page last-updated caption.");
  process.exit(1);
}

if (!siteConfig.includes("PUBLIC_ADSENSE_CLIENT") || !adSlot.includes("adsbygoogle")) {
  console.error("AdSlot must support AdSense client configuration and adsbygoogle markup.");
  process.exit(1);
}

if (!robotsRoute.includes("User-agent: *") || !robotsRoute.includes("sitemap-index.xml")) {
  console.error("robots.txt route must allow crawlers and include a sitemap-index reference.");
  process.exit(1);
}

if (!ads.includes("google.com") && !ads.includes("PLACEHOLDER")) {
  console.error("ads.txt must contain either a Google ads.txt entry or a clear placeholder.");
  process.exit(1);
}

if (!contentConfig.includes("defineCollection") || !contentConfig.includes("totalTime")) {
  console.error("src/content.config.ts must define the recipes collection schema.");
  process.exit(1);
}

if (!fridgeLogic.includes("rankRecipesForFridge") || !fridgeLogic.includes("resolveInputIngredients")) {
  console.error("src/lib/fridge.js must provide fridge matching helpers.");
  process.exit(1);
}

const pageExpectations = [
  {
    file: "src/pages/index.astro",
    markers: ["data-home-search-error", "/tools/fridge-recipe", "RecipeCard"]
  },
  {
    file: "src/pages/recipes/index.astro",
    markers: ["關鍵字搜尋", "RecipeCard", "AdSlot", 'getCollection("recipes")']
  },
  {
    file: "src/pages/recipes/[slug].astro",
    markers: ["buildRecipeJsonLd", "buildFaqJsonLd", "AdSlot", "相關食譜", "相關食材"]
  },
  {
    file: "src/pages/ingredients/index.astro",
    markers: ["RecipeCard", "getIngredientsByCategory", "scenarioItems"]
  },
  {
    file: "src/pages/ingredients/[slug].astro",
    markers: ["buildDefinedTermJsonLd", "getStaticPaths", "相關食譜"]
  },
  {
    file: "src/pages/scenarios/index.astro",
    markers: ["scenarioItems", "buildCollectionPageJsonLd"]
  },
  {
    file: "src/pages/scenarios/[slug].astro",
    markers: ["buildThingJsonLd", "getStaticPaths", "推薦食譜"]
  },
  {
    file: "src/pages/about.astro",
    markers: ["關於本站", "contactEmail", "內容原則"]
  },
  {
    file: "src/pages/contact.astro",
    markers: ["聯絡我們", "mailto:", "敏感個資"]
  },
  {
    file: "src/pages/privacy-policy.astro",
    markers: ["Google AdSense", "Cookie", "contactEmail"]
  },
  {
    file: "src/pages/terms.astro",
    markers: ["智慧財產", "Google AdSense", "contactEmail"]
  },
  {
    file: "src/pages/tools/fridge-recipe.astro",
    markers: ["data-fridge-error", "data-fridge-results", "data-fridge-no-results", "fridge-tool-data"]
  }
];

for (const page of pageExpectations) {
  const source = readFileSync(join(root, page.file), "utf8");
  const missingMarkers = page.markers.filter((marker) => !source.includes(marker));

  if (missingMarkers.length) {
    console.error(`${page.file} is missing required spec markers: ${missingMarkers.join(", ")}`);
    process.exit(1);
  }
}

console.log("Site skeleton verification passed.");
