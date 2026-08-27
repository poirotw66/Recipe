import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const collectionDirs = {
  "zh-TW": "src/content/recipes",
  en: "src/content/recipes-en",
  ja: "src/content/recipes-ja",
  ko: "src/content/recipes-ko"
};

function getIngredientMatchNames(ingredient) {
  const names = new Set([ingredient.name, ...(ingredient.aliases ?? [])]);
  if (ingredient.labels) {
    for (const label of Object.values(ingredient.labels)) {
      names.add(label);
    }
  }
  return [...names];
}

function extractIngredientNames(source) {
  const names = [];
  const blockMatch = source.match(/^ingredients:\r?\n((?:(?:  - .+\r?\n)|(?:    .+\r?\n))+)/m);
  if (!blockMatch) {
    return names;
  }

  for (const line of blockMatch[1].split(/\r?\n/)) {
    const nameMatch = line.match(/^\s+name:\s*(.+)$/);
    if (!nameMatch) {
      continue;
    }
    names.push(nameMatch[1].trim().replace(/^['"]|['"]$/g, ""));
  }
  return names;
}

function loadRecipeIngredientNames(locale) {
  const dir = join(root, collectionDirs[locale]);
  const names = new Set();
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".md")) {
      continue;
    }
    const source = readFileSync(join(dir, file), "utf8");
    for (const name of extractIngredientNames(source)) {
      names.add(name);
    }
  }
  return names;
}

export function getVisibleIngredientSlugsByLocale(ingredients, locales) {
  const byLocale = {};
  for (const locale of locales) {
    const recipeIngredientNames = loadRecipeIngredientNames(locale);
    byLocale[locale] = ingredients
      .filter((ingredient) => {
        const matchNames = getIngredientMatchNames(ingredient);
        return matchNames.some((name) => recipeIngredientNames.has(name));
      })
      .map((ingredient) => ingredient.slug);
  }
  return byLocale;
}
