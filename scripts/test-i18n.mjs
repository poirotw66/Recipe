import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const i18nSource = readFileSync(join(root, "src/lib/i18n.ts"), "utf8");

assert.match(i18nSource, /defaultLocale = "zh-TW"/);
assert.match(i18nSource, /function localePath/);

const ingredients = JSON.parse(readFileSync(join(root, "src/data/ingredients.json"), "utf8"));
assert.ok(ingredients[0].labels?.en, "ingredients must include labels.en after spec-017 migration");

const seoHead = readFileSync(join(root, "src/components/SeoHead.astro"), "utf8");
assert.match(seoHead, /hreflang/);

for (const path of [
  "src/pages/[locale]/index.astro",
  "src/pages/[locale]/about.astro",
  "src/pages/[locale]/ingredients/index.astro"
]) {
  assert.ok(readFileSync(join(root, path), "utf8").length > 10, `missing ${path}`);
}

console.log("i18n spec-017 smoke checks passed.");
