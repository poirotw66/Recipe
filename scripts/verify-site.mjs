import { existsSync, readFileSync, readdirSync } from "node:fs";
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
  "src/content/recipes/cabbage-egg-stir-fry.md",
  "src/content/recipes/garlic-mushroom-chicken.md",
  "src/content/recipes/air-fryer-salmon-broccoli.md",
  "src/content/recipes/onion-egg-rice-bowl.md",
  "src/content/recipes/carrot-chicken-rice-bowl.md",
  "src/content/recipes/tomato-tofu-soup.md",
  "src/content/recipes/cabbage-mushroom-rice.md",
  "src/content/recipes/broccoli-mushroom-egg.md",
  "src/content/recipes/scallion-egg-rice.md",
  "src/data/ingredients.json",
  "src/data/scenarios.json"
];

const root = process.cwd();
const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));

if (missing.length) {
  console.error(`Missing required files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

const read = (file) => readFileSync(join(root, file), "utf8");

const baseLayout = read("src/layouts/BaseLayout.astro");
const seoHead = read("src/components/SeoHead.astro");
const recipeLayout = read("src/layouts/RecipeLayout.astro");
const staticLayout = read("src/layouts/StaticArticleLayout.astro");
const adSlot = read("src/components/AdSlot.astro");
const siteConfig = read("src/lib/site.ts");
const fridgeLogic = read("src/lib/fridge.js");
const fridgePage = read("src/pages/tools/fridge-recipe.astro");
const robotsRoute = read("src/pages/robots.txt.ts");
const ads = read("public/ads.txt");
const contentConfig = read("src/content.config.ts");
const ingredients = JSON.parse(read("src/data/ingredients.json"));
const scenarios = JSON.parse(read("src/data/scenarios.json"));
const recipeFiles = readdirSync(join(root, "src/content/recipes")).filter((file) => file.endsWith(".md"));

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

if (!contentConfig.includes("defineCollection") || !contentConfig.includes("totalTime") || !contentConfig.includes("簡單")) {
  console.error("src/content.config.ts must define the recipes collection schema.");
  process.exit(1);
}

if (!fridgeLogic.includes("rankRecipesForFridge") || !fridgeLogic.includes("resolveInputIngredients") || !fridgeLogic.includes("高蛋白料理")) {
  console.error("src/lib/fridge.js must provide fridge matching helpers and clean preference labels.");
  process.exit(1);
}

if (!fridgePage.includes("data-fridge-results") || !fridgePage.includes("fridge-tool-data") || !fridgePage.includes("雞蛋")) {
  console.error("Fridge tool page must expose result containers and embedded local data.");
  process.exit(1);
}

if (recipeFiles.length < 12) {
  console.error(`Spec-007 requires at least 12 recipe markdown files; found ${recipeFiles.length}.`);
  process.exit(1);
}

if (ingredients.length < 12 || scenarios.length < 8) {
  console.error("Spec-007 requires at least 12 ingredients and 8 scenarios.");
  process.exit(1);
}

const scenarioSlugs = scenarios.map((item) => item.slug);
for (const slug of ["fridge-cleanout-meals", "air-fryer-meals"]) {
  if (!scenarioSlugs.includes(slug)) {
    console.error(`Scenario taxonomy is missing ${slug}.`);
    process.exit(1);
  }
}

const pageExpectations = [
  {
    file: "src/pages/index.astro",
    markers: ["data-home-search-error", "/tools/fridge-recipe", "RecipeCard", "featuredScenarios"]
  },
  {
    file: "src/pages/recipes/index.astro",
    markers: ["RecipeCard", "AdSlot", 'getCollection("recipes")']
  },
  {
    file: "src/pages/recipes/[slug].astro",
    markers: ["buildRecipeJsonLd", "buildFaqJsonLd", "AdSlot"]
  },
  {
    file: "src/pages/ingredients/index.astro",
    markers: ["RecipeCard", "getIngredientsByCategory", "scenarioItems"]
  },
  {
    file: "src/pages/ingredients/[slug].astro",
    markers: ["buildDefinedTermJsonLd", "getStaticPaths"]
  },
  {
    file: "src/pages/scenarios/index.astro",
    markers: ["scenarioItems", "buildCollectionPageJsonLd"]
  },
  {
    file: "src/pages/scenarios/[slug].astro",
    markers: ["buildThingJsonLd", "getStaticPaths"]
  },
  {
    file: "src/pages/about.astro",
    markers: ["contactEmail"]
  },
  {
    file: "src/pages/contact.astro",
    markers: ["mailto:"]
  },
  {
    file: "src/pages/privacy-policy.astro",
    markers: ["Google AdSense", "Cookie", "contactEmail"]
  },
  {
    file: "src/pages/terms.astro",
    markers: ["Google AdSense", "contactEmail"]
  }
];

for (const page of pageExpectations) {
  const source = read(page.file);
  const missingMarkers = page.markers.filter((marker) => !source.includes(marker));

  if (missingMarkers.length) {
    console.error(`${page.file} is missing required spec markers: ${missingMarkers.join(", ")}`);
    process.exit(1);
  }
}

console.log("Site verification passed.");
