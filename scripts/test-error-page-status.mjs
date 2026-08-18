import assert from "node:assert/strict";
import { asNotFound, isErrorPagePath } from "../src/lib/error-page.ts";


assert.equal(isErrorPagePath("/404"), true);
assert.equal(isErrorPagePath("/404/"), true);
assert.equal(isErrorPagePath("/404.html"), true);
assert.equal(isErrorPagePath("/en/404/"), true);
assert.equal(isErrorPagePath("/ja/404"), true);
assert.equal(isErrorPagePath("/ko/404.html"), true);
assert.equal(isErrorPagePath("/recipes/"), false);
assert.equal(isErrorPagePath("/en/recipes/tomato-egg-rice/"), false);

const found = asNotFound(new Response("missing", { status: 200 }));
assert.equal(found.status, 404);
assert.equal(found.headers.get("X-Robots-Tag"), "noindex, follow");
assert.equal(await found.text(), "missing");

const already = asNotFound(new Response("nope", { status: 404 }));
assert.equal(already.status, 404);

const redirect = asNotFound(
  new Response(null, { status: 307, headers: { Location: "/404/" } })
);
assert.equal(redirect.status, 307);
assert.equal(redirect.headers.get("Location"), "/404/");

console.log("Error page status checks passed.");
