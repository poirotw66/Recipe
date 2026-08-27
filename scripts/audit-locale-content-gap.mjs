import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const distDir = join(root, "dist");

function readMain(pathname) {
  const relativePath = pathname.replace(/^\//, "").replace(/\/$/, "");
  const filePath = join(distDir, relativePath, "index.html");
  if (!existsSync(filePath)) {
    return null;
  }
  const html = readFileSync(filePath, "utf8");
  const match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  return match ? match[1] : null;
}

function mainLength(pathname) {
  const main = readMain(pathname);
  if (!main) {
    return null;
  }
  return main.replace(/\s+/g, " ").trim().length;
}

function countRecipeCards(pathname) {
  const main = readMain(pathname);
  if (!main) {
    return null;
  }
  return (main.match(/class="recipe-card/g) ?? []).length;
}

function zhPathFromLocale(pathname) {
  return pathname.replace(/^\/(en|ja|ko)/, "") || "/";
}

function walkHtmlFiles(dir, base = "", files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      walkHtmlFiles(fullPath, `${base}/${entry}`, files);
    } else if (entry === "index.html") {
      files.push(`${base}/` || "/");
    }
  }
  return files;
}

const placeholderMarkers = [
  "coming soon",
  "See the Traditional Chinese",
  "繁体字版",
  "번체 중국어",
  "順次拡充",
  "順次 보완"
];

const localePages = walkHtmlFiles(distDir).filter((path) => /^\/(en|ja|ko)\//.test(path));
const rows = [];

for (const localePath of localePages) {
  const zhPath = zhPathFromLocale(localePath);
  const localeLen = mainLength(localePath);
  const zhLen = mainLength(zhPath);
  if (localeLen === null) {
    continue;
  }

  const ratio = zhLen ? localeLen / zhLen : null;
  const main = readMain(localePath) ?? "";
  const placeholders = placeholderMarkers.filter((marker) => main.toLowerCase().includes(marker.toLowerCase()));
  const recipeCards = countRecipeCards(localePath);
  const zhCards = countRecipeCards(zhPath);

  if (
    localePath.endsWith("/404/") ||
    (ratio !== null && ratio >= 0.85 && placeholders.length === 0)
  ) {
    continue;
  }

  rows.push({
    path: localePath,
    localeLen,
    zhLen,
    ratioPct: ratio === null ? null : Math.round(ratio * 100),
    recipeCards,
    zhCards,
    placeholders
  });
}

rows.sort((left, right) => {
  const leftRatio = left.ratioPct ?? 999;
  const rightRatio = right.ratioPct ?? 999;
  return leftRatio - rightRatio;
});

console.log(`Locale pages with content gaps: ${rows.length}\n`);
for (const row of rows.slice(0, 30)) {
  const flags = [
    row.ratioPct !== null ? `${row.ratioPct}% of zh` : "no zh peer",
    row.recipeCards !== null && row.zhCards !== null ? `cards ${row.recipeCards}/${row.zhCards}` : null,
    row.placeholders.length > 0 ? `placeholder: ${row.placeholders.join(", ")}` : null
  ]
    .filter(Boolean)
    .join(" | ");
  console.log(`${row.path} (${row.localeLen} chars) — ${flags}`);
}
