import { readFileSync, writeFileSync } from "node:fs";

const filePath = "scripts/generate-dubu-house-recipes.mjs";
const content = readFileSync(filePath, "utf8");

const startMarker = "function buildStepsForLocale(slug, displayName, ingredients, seasonings, locale) {";

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
  throw new Error("Could not find start of buildStepsForLocale function");
}

// Locate the end of buildStepsForLocale function. It ends with a closing brace at the root of function scope.
const nextFunctionMarker = "function buildCustomAdditions(displayName, item, locale) {";
const nextIndex = content.indexOf(nextFunctionMarker);
if (nextIndex === -1) {
  throw new Error("Could not find buildCustomAdditions function");
}

// Scan backwards from nextIndex to find the closing brace of buildStepsForLocale
let endIndex = -1;
for (let i = nextIndex - 1; i >= startIndex; i--) {
  if (content[i] === "}") {
    endIndex = i + 1;
    break;
  }
}

if (endIndex === -1) {
  throw new Error("Could not find the end brace of buildStepsForLocale");
}

// Read new function body from text file
const newFunctionBody = readFileSync("scripts/new-function.txt", "utf8").trim();

const newContent = content.substring(0, startIndex) + newFunctionBody + "\n\n";
writeFileSync(filePath, newContent + content.substring(nextIndex), "utf8");
console.log("Successfully patched generate-dubu-house-recipes.mjs from scripts/new-function.txt!");
