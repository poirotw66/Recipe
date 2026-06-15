import { readFileSync, writeFileSync } from "node:fs";

const filePath = "scripts/generate-dubu-house-recipes.mjs";
let content = readFileSync(filePath, "utf8");

// 1. Update function signature and condition
content = content.replace(
  "function getIngredientsAndSeasoningsForSlug(slug, displayName) {\n  let ingKeys = [];\n  let seaKeys = [];\n\n  if (slug.includes(\"soondubu\")) {",
  "function getIngredientsAndSeasoningsForSlug(slug, displayName, categorySlug) {\n  let ingKeys = [];\n  let seaKeys = [];\n\n  if (categorySlug === \"soondubu\" || slug.includes(\"soondubu\")) {"
);

// 2. Update fresh-fish-seaweed block
content = content.replace(
  `    else if (slug.includes("fresh-fish-seaweed")) {
      ingKeys.splice(1, 0, "鮮切鯛魚", "海菜");
      seaKeys.unshift("切達起司");
    }`,
  `    else if (slug.includes("fresh-fish-seaweed")) {
      ingKeys.splice(1, 0, "鮮切鯛魚", "海菜");
      if (slug.includes("rice-cake")) {
        ingKeys.splice(1, 0, "起司年糕");
      }
      seaKeys.unshift("切達起司");
    }`
);

// 3. Add fallback inside rice-cake
content = content.replace(
  `    } else if (slug.includes("spicy-pan-fried-seafood")) {
      ingKeys = ["年糕", "白蝦", "蛤蜊", "透抽", "洋蔥"];
      seaKeys = ["韓式辣醬", "韓式辣椒粉", "白糖", "蒜末"];
    }
  } else {`,
  `    } else if (slug.includes("spicy-pan-fried-seafood")) {
      ingKeys = ["年糕", "白蝦", "蛤蜊", "透抽", "洋蔥"];
      seaKeys = ["韓式辣醬", "韓式辣椒粉", "白糖", "蒜末"];
    } else {
      ingKeys = ["年糕", "洋蔥", "青蔥"];
      seaKeys = ["醬油", "韓式芝麻油", "蒜末", "鹽"];
    }
  } else {`
);

// 4. Update the call in buildRecipe
content = content.replace(
  "const { ingredients, seasonings } = getIngredientsAndSeasoningsForSlug(slug, entry.displayName);",
  "const { ingredients, seasonings } = getIngredientsAndSeasoningsForSlug(slug, entry.displayName, entry.categorySlug);"
);

writeFileSync(filePath, content, "utf8");
console.log("Successfully applied patch 2 to generate-dubu-house-recipes.mjs!");
