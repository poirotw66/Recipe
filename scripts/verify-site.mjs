import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "package.json",
  "astro.config.mjs",
  "tsconfig.json",
  "src/content.config.ts",
  "src/layouts/BaseLayout.astro",
  "src/layouts/RecipeLayout.astro",
  "src/components/SeoHead.astro",
  "src/components/Header.astro",
  "src/components/Footer.astro",
  "src/components/RecipeCard.astro",
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
  "public/robots.txt",
  "public/ads.txt",
  "public/images/.gitkeep",
  "src/content/recipes/tofu-scrambled-eggs.md",
  "src/content/recipes/tomato-egg-rice.md",
  "src/content/recipes/steamed-chicken-bento.md",
  "src/data/ingredients.json",
  "src/data/scenarios.json",
  "src/lib/taxonomy.ts"
];

const root = process.cwd();
const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));

if (missing.length) {
  console.error(`Missing required files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

const layout = readFileSync(join(root, "src/layouts/BaseLayout.astro"), "utf8");
const seoHead = readFileSync(join(root, "src/components/SeoHead.astro"), "utf8");
const requiredHeadParts = ["<title>", 'name="description"', 'rel="canonical"', 'property="og:title"'];
const headSource = `${layout}\n${seoHead}`;
const missingHeadParts = requiredHeadParts.filter((part) => !headSource.includes(part));

if (missingHeadParts.length) {
  console.error(`BaseLayout is missing SEO markers: ${missingHeadParts.join(", ")}`);
  process.exit(1);
}

const robots = readFileSync(join(root, "public/robots.txt"), "utf8");
if (!robots.includes("User-agent: *") || !robots.includes("Sitemap:")) {
  console.error("robots.txt must allow crawlers and include a Sitemap line.");
  process.exit(1);
}

const ads = readFileSync(join(root, "public/ads.txt"), "utf8");
if (!ads.includes("google.com") && !ads.includes("PLACEHOLDER")) {
  console.error("ads.txt must contain either a Google ads.txt entry or a clear placeholder.");
  process.exit(1);
}

const pageExpectations = [
  {
    file: "src/pages/index.astro",
    markers: ["熱門食材", "冰箱剩料工具", "data-home-search-error"]
  },
  {
    file: "src/pages/recipes/index.astro",
    markers: ["關鍵字", "設備", "RecipeCard", "getCollection(\"recipes\")"]
  },
  {
    file: "src/pages/recipes/[slug].astro",
    markers: ["常見問題", "相關食譜", "相關食材", "getStaticPaths"]
  },
  {
    file: "src/pages/ingredients/index.astro",
    markers: ["分類區塊", "熱門食材", "相關情境入口", "getIngredientsByCategory"]
  },
  {
    file: "src/pages/ingredients/[slug].astro",
    markers: ["保存方式", "相關食譜", "相關情境", "getStaticPaths"]
  },
  {
    file: "src/pages/tools/fridge-recipe.astro",
    markers: ["data-fridge-error", "Placeholder 結果", "data-fridge-results"]
  },
  {
    file: "src/pages/scenarios/index.astro",
    markers: ["精選情境", "全部情境", "scenarioItems"]
  },
  {
    file: "src/pages/scenarios/[slug].astro",
    markers: ["推薦食譜", "常見食材", "相關情境", "getStaticPaths"]
  }
];

const contentConfig = readFileSync(join(root, "src/content.config.ts"), "utf8");
if (!contentConfig.includes("defineCollection") || !contentConfig.includes("totalTime")) {
  console.error("src/content.config.ts must define the recipes collection schema.");
  process.exit(1);
}

for (const page of pageExpectations) {
  const source = readFileSync(join(root, page.file), "utf8");
  const missingMarkers = page.markers.filter((marker) => !source.includes(marker));

  if (missingMarkers.length) {
    console.error(`${page.file} is missing required spec markers: ${missingMarkers.join(", ")}`);
    process.exit(1);
  }
}

console.log("Site skeleton verification passed.");
