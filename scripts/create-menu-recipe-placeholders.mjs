import { readFileSync, writeFileSync, readdirSync, existsSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const RECIPE_DIR = join(ROOT, "src/content/recipes");
const IMAGE_DIR = join(ROOT, "public/images/recipes");

const MENU_SLUGS = [
  "surf-turf-brunch",
  "pan-seared-flap-steak-brunch",
  "crispy-cod-brunch",
  "roasted-lemon-salmon-brunch",
  "smoked-salmon-brunch",
  "mushroom-soft-egg-brunch",
  "herb-pan-chicken-brunch",
  "classic-caesar-chicken-salad",
  "smoked-salmon-caesar-salad",
  "garlic-cream-shrimp-pasta",
  "truffle-mushroom-farfalle",
  "spicy-garlic-bacon-pasta",
  "garden-vegetable-pasta",
  "spicy-seafood-tomato-pasta",
  "cajun-fries",
  "fish-and-chips",
  "fried-trio-platter",
  "chefs-daily-soup",
  "honey-cajun-chicken-wings",
  "seasonal-greens-salad-bowl",
];

const palettes = [
  { bg0: "#e8f3ec", bg1: "#fdf3d8", accent: "#2f7d4f" },
  { bg0: "#f3ece8", bg1: "#fde8d8", accent: "#8b5a2b" },
  { bg0: "#e8eef3", bg1: "#f0f4fd", accent: "#3d5a80" },
  { bg0: "#f3e8f0", bg1: "#fde8f3", accent: "#7d2f5c" },
  { bg0: "#eef3e8", bg1: "#f5fde8", accent: "#4a7d2f" },
];

function hashSlug(slug) {
  let hash = 0;
  for (const char of slug) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(title, maxCharsPerLine = 14) {
  if (title.length <= maxCharsPerLine) {
    return [title];
  }
  const lines = [];
  let line = "";
  for (const char of title) {
    if (line.length >= maxCharsPerLine) {
      lines.push(line);
      line = "";
    }
    line += char;
  }
  if (line) {
    lines.push(line);
  }
  return lines.slice(0, 2);
}

function buildSvg(title, slug) {
  const palette = palettes[hashSlug(slug) % palettes.length];
  const lines = wrapTitle(title);
  const titleY = lines.length > 1 ? 400 : 420;
  const titleBlocks = lines
    .map((line, index) => {
      const y = titleY + index * 52;
      return `<text x="600" y="${y}" text-anchor="middle" font-family="Noto Sans TC, PingFang TC, sans-serif" font-size="44" font-weight="700" fill="#2f3a34">${escapeXml(line)}</text>`;
    })
    .join("\n  ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bg-${slug}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.bg0}"/>
      <stop offset="100%" stop-color="${palette.bg1}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg-${slug})"/>
  <circle cx="180" cy="160" r="72" fill="${palette.accent}" opacity="0.14"/>
  <circle cx="1020" cy="740" r="96" fill="#f2b84b" opacity="0.18"/>
  ${titleBlocks}
  <text x="600" y="520" text-anchor="middle" font-family="Noto Sans TC, PingFang TC, sans-serif" font-size="22" fill="#6b7a72">成品照片準備中</text>
</svg>
`;
}

function readTitle(slug) {
  const source = readFileSync(join(RECIPE_DIR, `${slug}.md`), "utf8");
  const match = source.match(/^title:\s*"(.+)"\s*$/m) ?? source.match(/^title:\s*(.+)\s*$/m);
  if (!match) {
    throw new Error(`Missing title in ${slug}.md`);
  }
  return match[1].trim();
}

for (const slug of MENU_SLUGS) {
  const title = readTitle(slug);
  const svgPath = join(IMAGE_DIR, `${slug}.svg`);
  writeFileSync(svgPath, buildSvg(title, slug), "utf8");

  const webpPath = join(IMAGE_DIR, `${slug}.webp`);
  if (existsSync(webpPath)) {
    unlinkSync(webpPath);
  }

  const mdPath = join(RECIPE_DIR, `${slug}.md`);
  const md = readFileSync(mdPath, "utf8");
  const updated = md.replace(
    /^coverImage:\s*.+$/m,
    `coverImage: /images/recipes/${slug}.svg`
  );
  writeFileSync(mdPath, updated, "utf8");

  console.log("placeholder", slug);
}

console.log(`Done: ${MENU_SLUGS.length} SVG placeholders`);
