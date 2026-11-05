import assert from "node:assert/strict";
import { pickNextDinner, restoreDinnerSelection } from "../src/lib/dinner-picker.js";

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

const saved = JSON.stringify({ budget: 10, slug: "snack" });
assert.deepEqual(restoreDinnerSelection(saved, recipes), { budget: 10, slug: "snack" });
assert.deepEqual(
  restoreDinnerSelection(saved, recipes.map((recipe) => ({ ...recipe, title: "Translated title" }))),
  { budget: 10, slug: "snack" },
  "Restore by stable slug across languages, independent of translated labels"
);
assert.deepEqual(
  restoreDinnerSelection(JSON.stringify({ budget: 20, slug: "dinner", unexpected: "discard" }), recipes),
  { budget: 20, slug: "dinner" },
  "Only restore the supported fields"
);
for (const invalid of [
  null, undefined, "", "broken JSON", "null", "[]", "true", '"snack"',
  JSON.stringify({ budget: 15, slug: "snack" }),
  JSON.stringify({ budget: "10", slug: "snack" }),
  JSON.stringify({ budget: 10 }),
  JSON.stringify({ budget: 10, slug: 1 }),
  JSON.stringify({ budget: 10, slug: "removed-recipe" }),
  JSON.stringify({ budget: 10, slug: "slow" })
]) {
  assert.equal(restoreDinnerSelection(invalid, recipes), undefined);
}
assert.equal(restoreDinnerSelection(saved, []), undefined);
assert.equal(restoreDinnerSelection(saved, recipes.filter((recipe) => recipe.slug !== "snack")), undefined);
assert.equal(
  restoreDinnerSelection(saved, [{ slug: "snack", totalTime: 12 }]),
  undefined,
  "Reject a recipe whose time no longer fits the stored budget"
);
console.log("Dinner picker: time limits, cycling, budget changes, empty states, and session restoration passed.");
