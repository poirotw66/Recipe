import assert from "node:assert/strict";

import ingredients from "../src/data/ingredients.json" with { type: "json" };
import {
  createIngredientLookup,
  preferenceDefinitions,
  rankRecipesForFridge,
  resolveInputIngredients,
  splitIngredientInput,
  summarizeMatches
} from "../src/lib/fridge.js";

const ingredientLookup = createIngredientLookup(ingredients);

const recipeFixtures = [
  {
    slug: "tofu-scrambled-eggs",
    title: "豆腐炒蛋",
    ingredients: ["雞蛋", "豆腐", "青蔥"],
    scenarios: ["一人份料理", "10 分鐘料理"],
    equipment: ["平底鍋"],
    totalTime: 12,
    protein: 24
  },
  {
    slug: "tomato-egg-rice",
    title: "番茄雞蛋飯",
    ingredients: ["白飯", "雞蛋", "番茄"],
    scenarios: ["10 分鐘料理"],
    equipment: ["平底鍋"],
    totalTime: 15,
    protein: 19
  },
  {
    slug: "steamed-chicken-bento",
    title: "電鍋雞胸便當",
    ingredients: ["雞胸肉", "蘑菇", "花椰菜"],
    scenarios: ["高蛋白菜單", "便當菜"],
    equipment: ["電鍋"],
    totalTime: 20,
    protein: 34
  }
];

const split = splitIngredientInput("雞蛋、豆腐\n番茄");
assert.deepEqual(split, ["雞蛋", "豆腐", "番茄"]);

const resolved = resolveInputIngredients(["蛋", "豆腐"], ingredientLookup);
assert.deepEqual(
  resolved.matched.map((item) => item.slug),
  ["egg", "tofu"]
);
assert.deepEqual(resolved.unresolved, []);

const rankedQuick = rankRecipesForFridge(recipeFixtures, resolved.matched, ["quick"]);
assert.equal(rankedQuick[0]?.slug, "tofu-scrambled-eggs");

const rankedProtein = rankRecipesForFridge(recipeFixtures, resolveInputIngredients(["雞胸肉"], ingredientLookup).matched, ["protein", "electricPot"]);
assert.equal(rankedProtein[0]?.slug, "steamed-chicken-bento");
assert.deepEqual(preferenceDefinitions.map((item) => item.key), ["quick", "protein", "electricPot", "airFryer"]);

const summary = summarizeMatches(resolved.matched, [], ["quick"]);
assert.match(summary, /已辨識食材：雞蛋、豆腐/);
assert.match(summary, /偏好：10 分鐘/);

console.log("Fridge matching logic passed.");
