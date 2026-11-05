import assert from "node:assert/strict";
import { pickNextDinner } from "../src/lib/dinner-picker.js";

const recipes = [
  { slug: "dinner", totalTime: 20 },
  { slug: "quick", totalTime: 10 },
  { slug: "slow", totalTime: 30 },
  { slug: "snack", totalTime: 5 }
];

assert.equal(pickNextDinner(recipes, 10)?.slug, "quick");
assert.equal(pickNextDinner(recipes, 10, "quick")?.slug, "snack");
assert.equal(pickNextDinner(recipes, 10, "snack")?.slug, "quick");
assert.equal(pickNextDinner(recipes, 20)?.slug, "dinner");
assert.equal(pickNextDinner(recipes, 30)?.slug, "slow");
assert.equal(pickNextDinner(recipes, 30, "quick")?.slug, "slow");
assert.equal(pickNextDinner(recipes, 10, "slow")?.slug, "quick");
assert.equal(pickNextDinner(recipes, 4), undefined);
assert.equal(pickNextDinner([], 30), undefined);
assert.equal(pickNextDinner([recipes[1]], 10, "quick")?.slug, "quick");
assert.equal(recipes[0].slug, "dinner", "Selection must not reorder the source data");
console.log("Dinner picker: time limits, cycling, budget changes, and empty states passed.");
