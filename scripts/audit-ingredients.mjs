import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ingredients = JSON.parse(readFileSync("src/data/ingredients.json", "utf8"));
const names = new Set(ingredients.map((item) => item.name));
const aliasToName = new Map();

for (const item of ingredients) {
  for (const alias of item.aliases) {
    aliasToName.set(alias, item.name);
  }
}

const resolve = (name) => (names.has(name) ? name : aliasToName.get(name) ?? null);

const seasoningAllowlist = new Set([
  "鹽",
  "醬油",
  "糖",
  "水",
  "黑胡椒",
  "白胡椒",
  "米酒",
  "太白粉",
  "香油",
  "麻油",
  "橄欖油",
  "番茄醬",
  "咖哩粉",
  "蠔油",
  "起司粉",
  "奶油",
  "牛奶",
  "檸檬汁",
  "薑片"
]);

const recipeDir = "src/content/recipes";
const fromIngredients = new Set();
const fromSeasonings = new Set();

for (const file of readdirSync(recipeDir).filter((name) => name.endsWith(".md"))) {
  const text = readFileSync(join(recipeDir, file), "utf8");
  let mode = "";

  for (const line of text.split("\n")) {
    if (line.startsWith("ingredients:")) {
      mode = "ingredients";
    } else if (line.startsWith("seasonings:")) {
      mode = "seasonings";
    } else if (line.startsWith("tags:")) {
      mode = "";
    }

    const match = line.match(/^\s+- name: "(.+)"/);
    if (!match || !mode) {
      continue;
    }

    if (mode === "ingredients") {
      fromIngredients.add(match[1]);
    } else {
      fromSeasonings.add(match[1]);
    }
  }
}

const unmappedIngredients = [...fromIngredients].filter((name) => !resolve(name)).sort();
const unmappedSeasonings = [...fromSeasonings]
  .filter((name) => !resolve(name) && !seasoningAllowlist.has(name))
  .sort();

const substitutes = new Set();
for (const item of ingredients) {
  for (const substitute of item.substitutes) {
    substitutes.add(substitute);
  }
}

const substitutesWithoutEntry = [...substitutes].filter((name) => !resolve(name)).sort();

console.log(JSON.stringify({ unmappedIngredients, unmappedSeasonings, substitutesWithoutEntry }, null, 2));
