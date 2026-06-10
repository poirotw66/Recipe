import {
  parseFrontmatter,
  parseListSection,
  parseNumber,
  parseScalar,
  parseStringListItems
} from "../recipe-review-lib.mjs";

/**
 * @param {string} fm
 * @returns {Array<{ name: string; amount: string; unit: string }>}
 */
export function parseIngredientsDetailed(fm) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "ingredients:");
  if (start < 0) return [];
  const items = [];
  let current = null;
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line) && !line.startsWith("  ")) break;
    const nameMatch = line.match(/^\s*-\s*name:\s*(.+)$/);
    if (nameMatch) {
      current = { name: stripQuotes(nameMatch[1]), amount: "", unit: "" };
      items.push(current);
      continue;
    }
    if (!current) continue;
    const amountMatch = line.match(/^\s*amount:\s*(.+)$/);
    if (amountMatch) current.amount = stripQuotes(amountMatch[1]);
    const unitMatch = line.match(/^\s*unit:\s*(.+)$/);
    if (unitMatch) current.unit = stripQuotes(unitMatch[1]);
  }
  return items;
}

/**
 * @param {string} fm
 */
export function parseSeasoningsDetailed(fm) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "seasonings:");
  if (start < 0) return [];
  const items = [];
  let current = null;
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line) && !line.startsWith("  ")) break;
    const nameMatch = line.match(/^\s*-\s*name:\s*(.+)$/);
    if (nameMatch) {
      current = { name: stripQuotes(nameMatch[1]), amount: "", unit: "" };
      items.push(current);
      continue;
    }
    if (!current) continue;
    const amountMatch = line.match(/^\s*amount:\s*(.+)$/);
    if (amountMatch) current.amount = stripQuotes(amountMatch[1]);
    const unitMatch = line.match(/^\s*unit:\s*(.+)$/);
    if (unitMatch) current.unit = stripQuotes(unitMatch[1]);
  }
  return items;
}

function stripQuotes(value) {
  return value.trim().replace(/^['"]|['"]$/g, "");
}

/**
 * @param {string} source
 */
export function parseRecipeContext(source, slugFromPath = "") {
  const fm = parseFrontmatter(source);
  const recipeId = parseScalar(fm, "recipeId");
  const slug = parseScalar(fm, "slug") ?? recipeId ?? slugFromPath;
  return {
    fm,
    slug,
    title: parseScalar(fm, "title") ?? "",
    category: parseScalar(fm, "category") ?? "",
    prepTime: parseNumber(fm, "prepTime") ?? 0,
    cookTime: parseNumber(fm, "cookTime") ?? 0,
    totalTime: parseNumber(fm, "totalTime") ?? 0,
    steps: parseListSection(fm, "steps"),
    intro: parseScalar(fm, "intro") ?? "",
    equipment: parseStringListItems(fm, "equipment"),
    tags: parseStringListItems(fm, "tags"),
    ingredients: parseIngredientsDetailed(fm),
    seasonings: parseSeasoningsDetailed(fm)
  };
}

/**
 * @param {string} item
 */
export function formatAmount(item) {
  if (!item.amount && !item.unit) return item.name;
  const unit = item.unit || "";
  return `${item.name} ${item.amount}${unit}`;
}
