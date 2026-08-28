import assert from "node:assert/strict";
import { pageUrlPath } from "../src/lib/page-url.js";

assert.equal(pageUrlPath("/"), "/");
assert.equal(pageUrlPath("/about"), "/about/");
assert.equal(pageUrlPath("/about/"), "/about/");
assert.equal(pageUrlPath("/recipes"), "/recipes/");
assert.equal(pageUrlPath("/tools/fridge-recipe?ingredients=egg"), "/tools/fridge-recipe/?ingredients=egg");
assert.equal(pageUrlPath("/recipes?keyword=soup#list"), "/recipes/?keyword=soup#list");
assert.equal(pageUrlPath("/images/og-default.jpg"), "/images/og-default.jpg");
assert.equal(pageUrlPath("about"), "/about/");

console.log("pageUrlPath checks passed.");
