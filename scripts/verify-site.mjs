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
  "src/pages/404.astro",
  "public/images/og-default.jpg",
  "public/images/site-icon-512.png",
  "public/favicon-48.png",
  "public/apple-touch-icon.png",
  "docs/ops/search-console-setup.md",
  "docs/ops/monthly-traffic-review.md",
  "src/pages/robots.txt.ts",
  "src/pages/sitemap-index.xml.ts",
  "src/pages/sitemap-pages.xml.ts",
  "src/pages/sitemap-recipes.xml.ts",
  "src/pages/sitemap-ingredients.xml.ts",
  "src/pages/sitemap-scenarios.xml.ts",
  "src/lib/seo.ts",
  "src/lib/site.ts",
  "src/lib/navigation.ts",
  "src/lib/taxonomy.ts",
  "src/components/Breadcrumb.astro",
  "public/ads.txt",
  "public/scripts/fridge-tool.js",
  "public/scripts/recipe-list-filter.js",
  "public/scripts/site-nav.js",
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
const fridgePage = read("src/components/FridgeToolPage.astro");
const fridgeRoute = read("src/pages/tools/fridge-recipe.astro");
const robotsRoute = read("src/pages/robots.txt.ts");
const ads = read("public/ads.txt");
const seoLib = read("src/lib/seo.ts");
const contentConfig = read("src/content.config.ts");
const ingredients = JSON.parse(read("src/data/ingredients.json"));
const scenarios = JSON.parse(read("src/data/scenarios.json"));
const recipeFiles = readdirSync(join(root, "src/content/recipes")).filter((file) => file.endsWith(".md"));
const phase2RecipeThreshold = 50;
const phase2CategoryTargets = {
  "家常菜": 16,
  "飯麵": 14,
  "主菜": 8,
  "湯品": 6,
  "便當菜": 6
};

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

if (!siteConfig.includes('brandDisplayName') || !siteConfig.includes("bloom-picker")) {
  console.error("Spec-010 requires Bloom Kitchen brand constants and Bloss0m ecosystem URLs in site.ts.");
  process.exit(1);
}

if (
  !siteConfig.includes("PUBLIC_GA_MEASUREMENT_ID") ||
  !siteConfig.includes("gaReady") ||
  !baseLayout.includes("googletagmanager.com/gtag/js")
) {
  console.error("Spec-014 requires GA4 measurement ID support in site.ts and BaseLayout.");
  process.exit(1);
}

if (!seoHead.includes("google-site-verification") || !seoHead.includes("gscVerification")) {
  console.error("SeoHead must support optional Search Console verification meta (spec-014).");
  process.exit(1);
}

if (!seoHead.includes("defaultOgImagePath")) {
  console.error("SeoHead must default to raster defaultOgImagePath (spec-014).");
  process.exit(1);
}

if (!baseLayout.includes('rel="icon"') || !baseLayout.includes("/favicon-48.png")) {
  console.error("BaseLayout must declare favicon links for search and browser icons.");
  process.exit(1);
}

const header = read("src/components/Header.astro");
const footer = read("src/components/Footer.astro");

if (!header.includes("brandDisplayName") || !header.includes('class="brand"')) {
  console.error("Header must render single-line Bloom Kitchen brand (spec-010).");
  process.exit(1);
}

if (!header.includes("nav-toggle") || !header.includes("site-nav__group") || !header.includes("site-nav.js")) {
  console.error("Header must provide layered mobile navigation (spec-011).");
  process.exit(1);
}

if (!footer.includes("footer-ecosystem") || !footer.includes("bloss0mEcosystemLinks")) {
  console.error("Footer must include Bloss0m ecosystem links (spec-010).");
  process.exit(1);
}

if (!seoHead.includes("siteTitleSuffix") || !seoHead.includes("og:site_name")) {
  console.error("SeoHead must use Bloom Kitchen title suffix (spec-010).");
  process.exit(1);
}

const recipeSchema = read("src/lib/recipe-schema.ts");
if (
  !contentConfig.includes("defineCollection") ||
  !contentConfig.includes('"recipes-en"') ||
  !recipeSchema.includes("totalTime") ||
  !contentConfig.includes("簡單")
) {
  console.error("src/content.config.ts must define multi-locale recipe collections (spec-018).");
  process.exit(1);
}

if (!seoLib.includes("buildItemListJsonLd") || !seoLib.includes('"ItemList"')) {
  console.error("src/lib/seo.ts must provide buildItemListJsonLd for spec-009.");
  process.exit(1);
}

if (
  !seoLib.includes('"@type": "HowToStep"') ||
  !seoLib.includes("name: stepName(position)") ||
  !seoLib.includes("#step-${position}") ||
  !seoLib.includes("image: coverImageUrl")
) {
  console.error("src/lib/seo.ts must emit complete HowToStep recipeInstructions for Recipe rich results.");
  process.exit(1);
}

if (!fridgeLogic.includes("rankRecipesForFridge") || !fridgeLogic.includes("resolveInputIngredients") || !fridgeLogic.includes("高蛋白料理")) {
  console.error("src/lib/fridge.js must provide fridge matching helpers and clean preference labels.");
  process.exit(1);
}

if (
  !fridgePage.includes("data-fridge-results") ||
  !fridgePage.includes("fridge-tool-data") ||
  !fridgePage.includes("data-fridge-form") ||
  !fridgePage.includes("Breadcrumb") ||
  !fridgePage.includes('id="fridge-results"') ||
  !fridgePage.includes("data-fridge-low-hit") ||
  !fridgeRoute.includes("FridgeToolPage")
) {
  console.error("Fridge tool page must expose result containers and embedded local data.");
  process.exit(1);
}

if (recipeFiles.length < 12) {
  console.error(`Spec-007 requires at least 12 recipe markdown files; found ${recipeFiles.length}.`);
  process.exit(1);
}

if (recipeFiles.length >= phase2RecipeThreshold) {
  const categoryCounts = Object.fromEntries(Object.keys(phase2CategoryTargets).map((name) => [name, 0]));

  for (const file of recipeFiles) {
    const source = read(`src/content/recipes/${file}`);
    const categoryMatch = source.match(/^category:\s*"([^"]+)"\s*$/m);

    if (!categoryMatch) {
      console.error(`Recipe ${file} is missing category frontmatter.`);
      process.exit(1);
    }

    const category = categoryMatch[1];
    if (Object.hasOwn(categoryCounts, category)) {
      categoryCounts[category] += 1;
    }
  }

  const failedCategories = Object.entries(phase2CategoryTargets)
    .filter(([category, expected]) => (categoryCounts[category] ?? 0) < expected)
    .map(([category, expected]) => `${category} (${categoryCounts[category] ?? 0}/${expected})`);

  if (failedCategories.length) {
    console.error(
      `Spec-008 category distribution is below target:\n${failedCategories.map((item) => `- ${item}`).join("\n")}`
    );
    process.exit(1);
  }

  for (const file of recipeFiles) {
    const source = read(`src/content/recipes/${file}`);
    const slug = file.replace(/\.md$/, "");
    const coverMatch = source.match(/^coverImage:\s*(.+)$/m);

    if (!coverMatch) {
      console.error(`Spec-008: recipe ${file} is missing coverImage frontmatter.`);
      process.exit(1);
    }

    const coverImage = coverMatch[1].trim();
    const expectedWebp = `/images/recipes/${slug}.webp`;
    const expectedSvg = `/images/recipes/${slug}.svg`;

    if (!coverImage.startsWith("/images/recipes/")) {
      console.error(`Spec-008: recipe ${file} coverImage must start with /images/recipes/.`);
      process.exit(1);
    }

    if (coverImage !== expectedWebp && coverImage !== expectedSvg) {
      console.error(
        `Spec-008: recipe ${file} coverImage must be ${expectedWebp} or ${expectedSvg}, found ${coverImage}.`
      );
      process.exit(1);
    }

    const imagePath = join(root, "public", coverImage.replace(/^\//, ""));

    if (!existsSync(imagePath)) {
      console.error(`Spec-008: recipe ${file} coverImage file is missing at ${imagePath}.`);
      process.exit(1);
    }
  }
}

if (ingredients.length < 12 || scenarios.length < 8) {
  console.error("Spec-007 requires at least 12 ingredients and 8 scenarios.");
  process.exit(1);
}

if (ingredients.length < 30) {
  console.error(`Spec-016 requires at least 30 ingredients; found ${ingredients.length}.`);
  process.exit(1);
}

if (scenarios.length < 12) {
  console.error(`Spec-016 requires at least 12 scenarios; found ${scenarios.length}.`);
  process.exit(1);
}

const topicHubs = JSON.parse(read("src/data/topic-hubs.json"));
if (!topicHubs.some((hub) => hub.slug === "air-fryer") || !topicHubs.some((hub) => hub.slug === "quick-meals")) {
  console.error("Spec-018 requires air-fryer and quick-meals topic hubs.");
  process.exit(1);
}

if (!topicHubs.some((hub) => hub.slug === "restaurant-replicas")) {
  console.error("Restaurant replicas topic hub is missing from topic-hubs.json.");
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
    markers: [
      "data-home-search-error",
      "data-home-search-input",
      "/tools/fridge-recipe",
      "RecipeCard",
      "topic-hub-grid",
      "topic-card",
      "#fridge-results",
      "/quick-meals/",
      "/air-fryer/",
      "/restaurant-replicas/"
    ]
  },
  {
    file: "src/pages/air-fryer/index.astro",
    markers: ["getTopicHubBySlug", "RecipeCard", "/air-fryer/"]
  },
  {
    file: "src/pages/quick-meals/index.astro",
    markers: ["getTopicHubBySlug", "RecipeCard", "/quick-meals/"]
  },
  {
    file: "src/pages/brunch/index.astro",
    markers: ["TopicHubIntro", "hub-section"]
  },
  {
    file: "src/pages/beef/index.astro",
    markers: ["TopicHubIntro", "hub-section"]
  },
  {
    file: "src/pages/pasta/index.astro",
    markers: ["TopicHubIntro", "hub-section"]
  },
  {
    file: "src/pages/restaurant-replicas/index.astro",
    markers: ["getTopicHubBySlug", "restaurant-replica-catalog.json", "/restaurant-replicas/"]
  },
  {
    file: "src/components/TopicHubIntro.astro",
    markers: ["hub-hero", "hub-hero__bg", "featured-card"]
  },
  {
    file: "src/pages/recipes/index.astro",
    markers: ["RecipeCard", "AdSlot", 'getCollection("recipes")', "buildItemListJsonLd", "Breadcrumb", "recipe-list-filter.js", "data-reset-filters"]
  },
  {
    file: "src/pages/recipes/[slug].astro",
    markers: [
      "buildRecipeJsonLd",
      "buildFaqJsonLd",
      "AdSlot",
      "recipe-key-facts",
      "steps-list--numbered",
      'id={`step-${index + 1}`}'
    ]
  },
  {
    file: "src/pages/ingredients/index.astro",
    markers: ["RecipeCard", "getIngredientsByCategory", "scenarioItems", "buildItemListJsonLd", "Breadcrumb"]
  },
  {
    file: "src/pages/scenarios/index.astro",
    markers: ["scenarioItems", "buildCollectionPageJsonLd", "buildItemListJsonLd", "Breadcrumb"]
  },
  {
    file: "src/pages/scenarios/[slug].astro",
    markers: ["本情境熱門", "buildThingJsonLd", "getStaticPaths", "buildItemListJsonLd"]
  },
  {
    file: "src/pages/ingredients/[slug].astro",
    markers: ["用這個食材還能做", "buildDefinedTermJsonLd"]
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
    markers: ["Google Analytics", "Google AdSense", "Cookie", "contactEmail"]
  },
  {
    file: "src/pages/404.astro",
    markers: ["找不到頁面", "/recipes/", "/tools/fridge-recipe/"]
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

const astroConfig = read("astro.config.mjs");
if (!astroConfig.includes('defaultLocale: "zh-TW"') || !astroConfig.includes("prefixDefaultLocale: false")) {
  console.error("astro.config.mjs must configure i18n with zh-TW default and unprefixed default locale.");
  process.exit(1);
}

if (!seoHead.includes('rel="alternate"') || !seoHead.includes("hreflang")) {
  console.error("SeoHead must emit hreflang alternate links (spec-017).");
  process.exit(1);
}

if (!existsSync(join(root, "src/pages/[locale]/index.astro"))) {
  console.error("spec-017: missing src/pages/[locale]/index.astro");
  process.exit(1);
}

const firstIngredient = ingredients[0];
if (!firstIngredient?.labels?.["zh-TW"] || !firstIngredient?.labels?.en) {
  console.error("spec-017: ingredients.json entries must include labels.zh-TW and labels.en");
  process.exit(1);
}

console.log("Site verification passed.");
