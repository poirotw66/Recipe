import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const ingredients = JSON.parse(readFileSync(join(ROOT, "src/data/ingredients.json"), "utf8"));
const recipeDir = join(ROOT, "src/content/recipes");

function getIngredientNames(raw) {
  const normalized = raw.replace(/\r\n/g, "\n");
  const fmEnd = normalized.indexOf("\n---\n", 4);
  const fm = normalized.slice(0, fmEnd);
  const block =
    fm.match(/^ingredients:\n([\s\S]*?)(?=^seasonings:|^intro:|^steps:|^tips:|^storage:|^tags:|^customAdditions:|^relatedIngredients:|^featured:|^publishedAt:)/m)?.[1] ?? "";
  return [...block.matchAll(/name:\s*"?([^"\n]+)"?/g)].map((match) => match[1].trim());
}

const ranked = ingredients
  .map((ingredient) => {
    const names = new Set([ingredient.name, ...ingredient.aliases]);
    let count = 0;
    for (const file of readdirSync(recipeDir).filter((f) => f.endsWith(".md"))) {
      const raw = readFileSync(join(recipeDir, file), "utf8");
      if (getIngredientNames(raw).some((name) => names.has(name))) count++;
    }
    return { name: ingredient.name, slug: ingredient.slug, count };
  })
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-Hant"));

console.log("Top 10 by recipe count:");
ranked.slice(0, 10).forEach((item, index) => {
  console.log(`${index + 1}. ${item.name} (${item.count})`);
});
