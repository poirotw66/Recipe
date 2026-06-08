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
    ingredientSlugs: ["egg", "tofu"],
    scenarios: ["一人料理", "10 分鐘料理"],
    equipment: ["平底鍋"],
    totalTime: 12,
    protein: 24
  },
  {
    slug: "tomato-egg-rice",
    title: "番茄雞蛋飯",
    ingredients: ["白飯", "雞蛋", "番茄"],
    ingredientSlugs: ["rice", "egg", "tomato"],
    scenarios: ["10 分鐘料理"],
    equipment: ["平底鍋"],
    totalTime: 15,
    protein: 19
  },
  {
    slug: "steamed-chicken-bento",
    title: "電鍋雞胸便當菜",
    ingredients: ["雞胸肉", "青花菜", "紅蘿蔔"],
    ingredientSlugs: ["chicken-breast", "broccoli"],
    scenarios: ["高蛋白料理", "便當菜"],
    equipment: ["電鍋"],
    totalTime: 20,
    protein: 34
  }
];

const slugToName = { egg: "雞蛋", tofu: "豆腐", tomato: "番茄", "chicken-breast": "雞胸肉" };
const enLookup = createIngredientLookup([{ slug: "egg", name: "Eggs", aliases: ["Egg", "Eggs"] }]);
const enEgg = resolveInputIngredients(["Eggs"], enLookup);
assert.equal(enEgg.matched[0]?.slug, "egg");

const split = splitIngredientInput("雞蛋、豆腐\n番茄");
assert.deepEqual(split, ["雞蛋", "豆腐", "番茄"]);

const resolved = resolveInputIngredients(["蛋", "豆腐"], ingredientLookup);
assert.deepEqual(
  resolved.matched.map((item) => item.slug),
  ["egg", "tofu"]
);
assert.deepEqual(resolved.unresolved, []);

const rankedQuick = rankRecipesForFridge(recipeFixtures, resolved.matched, ["quick"], {
  slugToName,
  preferenceConfig: {
    quick: { maxTime: 15, scenarios: ["10 分鐘料理"] }
  }
});
assert.equal(rankedQuick[0]?.slug, "tofu-scrambled-eggs");

const rankedProtein = rankRecipesForFridge(
  recipeFixtures,
  resolveInputIngredients(["雞胸肉"], ingredientLookup).matched,
  ["protein", "electricPot"],
  {
    slugToName,
    preferenceConfig: {
      protein: { minProtein: 20, scenarios: ["高蛋白料理"] },
      electricPot: { equipment: ["電鍋"] }
    }
  }
);

const rankedEn = rankRecipesForFridge(recipeFixtures, enEgg.matched, [], { slugToName });
assert.ok(rankedEn.some((item) => item.slug === "tofu-scrambled-eggs"));
assert.ok(rankedEn.some((item) => item.slug === "tomato-egg-rice"));
assert.equal(rankedProtein[0]?.slug, "steamed-chicken-bento");
assert.deepEqual(preferenceDefinitions.map((item) => item.key), ["quick", "protein", "electricPot", "airFryer"]);

const summary = summarizeMatches(resolved.matched, [], ["quick"]);
assert.match(summary, /已辨識食材：雞蛋、豆腐/);
assert.match(summary, /偏好：10 分鐘/);

console.log("Fridge matching logic passed.");
