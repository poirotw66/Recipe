import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const RECIPE_DIR = join(ROOT, "src/content/recipes");
const IMAGE_DIR = join(ROOT, "public/images/recipes");

const palettes = [
  { bg0: "#e8f3ec", bg1: "#fdf3d8", accent: "#2f7d4f" },
  { bg0: "#f3ece8", bg1: "#fde8d8", accent: "#8b5a2b" },
  { bg0: "#e8eef3", bg1: "#f0f4fd", accent: "#3d5a80" },
  { bg0: "#eef3e8", bg1: "#f5fde8", accent: "#4a7d2f" }
];

function hashSlug(slug) {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return hash;
}

function buildSvg(slug, title) {
  const palette = palettes[hashSlug(slug) % palettes.length];
  const label = title.length > 14 ? `${title.slice(0, 13)}…` : title;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="${title}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${palette.bg0}"/><stop offset="100%" stop-color="${palette.bg1}"/></linearGradient></defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect x="40" y="40" width="720" height="520" rx="20" fill="#fffdf7" stroke="${palette.accent}" stroke-width="3" opacity="0.92"/>
  <text x="80" y="280" fill="#2d2620" font-family="system-ui, 'Noto Sans TC', sans-serif" font-size="42" font-weight="700">${label}</text>
  <text x="80" y="340" fill="#6f6258" font-family="system-ui, sans-serif" font-size="22">Bloom Kitchen</text>
</svg>`;
}

let created = 0;
for (const file of readdirSync(RECIPE_DIR).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const svgPath = join(IMAGE_DIR, `${slug}.svg`);
  const webpPath = join(IMAGE_DIR, `${slug}.webp`);
  if (existsSync(webpPath) || existsSync(svgPath)) continue;
  const source = readFileSync(join(RECIPE_DIR, file), "utf8");
  const titleMatch = source.match(/^title: "?([^"\n]+)"?/m);
  const title = titleMatch?.[1] ?? slug;
  writeFileSync(svgPath, buildSvg(slug, title), "utf8");
  created += 1;
}
console.log(`Created ${created} recipe cover SVG placeholders.`);
