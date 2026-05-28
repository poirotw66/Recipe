import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "package.json",
  "astro.config.mjs",
  "tsconfig.json",
  "src/layouts/BaseLayout.astro",
  "src/components/SeoHead.astro",
  "src/components/Header.astro",
  "src/components/Footer.astro",
  "src/pages/index.astro",
  "src/pages/recipes/index.astro",
  "src/pages/ingredients/index.astro",
  "src/pages/scenarios/index.astro",
  "src/pages/tools/fridge-recipe.astro",
  "src/pages/about.astro",
  "src/pages/contact.astro",
  "src/pages/privacy-policy.astro",
  "src/pages/terms.astro",
  "public/robots.txt",
  "public/ads.txt",
  "public/images/.gitkeep"
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
    markers: ["關鍵字", "設備", "先看熱門食材"]
  },
  {
    file: "src/pages/ingredients/index.astro",
    markers: ["分類區塊", "熱門食材", "相關情境入口"]
  },
  {
    file: "src/pages/tools/fridge-recipe.astro",
    markers: ["data-fridge-error", "Placeholder 結果", "data-fridge-results"]
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
