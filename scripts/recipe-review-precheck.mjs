import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const recipesDir = join(root, "src/content/recipes");
const outDir = join(root, "docs/reviews/recipe-audit");
const outFile = join(outDir, "latest-precheck.json");

const args = process.argv.slice(2);
const slugFlag = args.indexOf("--slug");
const singleSlug = slugFlag >= 0 ? args[slugFlag + 1] : null;
const shouldWrite = args.includes("--write") || !args.includes("--stdout-only");

/**
 * @param {string} source
 */
function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : "";
}

/**
 * @param {string} fm
 * @param {string} key
 */
function parseScalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, "") : null;
}

/**
 * @param {string} fm
 * @param {string} key
 */
function parseNumber(fm, key) {
  const raw = parseScalar(fm, key);
  if (raw === null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

/**
 * @param {string} fm
 */
function parseStringListItems(fm, key) {
  const block = fm.match(new RegExp(`^${key}:\\n([\\s\\S]*?)(?=^[a-zA-Z_]+:|$)`, "m"));
  if (!block) return [];
  const items = [];
  for (const line of block[1].split("\n")) {
    const m = line.match(/^\s*-\s+(.+)$/);
    if (m) items.push(m[1].trim().replace(/^['"]|['"]$/g, ""));
  }
  return items;
}

/**
 * @param {string} fm
 * @param {string} key
 */
function parseListSection(fm, key) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === `${key}:`);
  if (start < 0) return [];
  const items = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line)) break;
    if (line.startsWith("- ")) items.push(line.slice(2).trim());
  }
  return items;
}

/**
 * @param {string} fm
 */
function parseSteps(fm) {
  return parseListSection(fm, "steps");
}

/**
 * @param {string} fm
 */
function parseIngredientNames(fm) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "ingredients:");
  if (start < 0) return [];
  const names = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line)) break;
    const m = line.match(/^\s*-\s*name:\s*(.+)$/);
    if (m) names.push(m[1].trim().replace(/^['"]|['"]$/g, ""));
  }
  return names;
}

/**
 * @param {string} fm
 */
function parseSeasoningNames(fm) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "seasonings:");
  if (start < 0) return [];
  const names = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line)) break;
    const m = line.match(/^\s*-\s*name:\s*(.+)$/);
    if (m) names.push(m[1].trim().replace(/^['"]|['"]$/g, ""));
  }
  return names;
}

/**
 * @param {string} name
 */
const ALIAS_MAP = {
  雞蛋: ["蛋", "蛋液", "炒蛋", "雞蛋"],
  番茄: ["番茄", "番茄丁", "茄", "番茄醬"],
  青蔥: ["蔥", "蔥花", "青蔥"],
  白飯: ["飯", "米飯", "剩飯", "白飯"],
  蒜頭: ["蒜", "蒜末", "蒜頭", "蒜香", "蒜泥"],
  橄欖油: ["油", "橄欖油"],
  青花菜: ["青花菜", "花椰菜", "西蘭花"],
  鹽: ["鹽", "鹹"],
  胡椒: ["胡椒", "黑胡椒", "胡椒粉"],
  醬油: ["醬油", "醬"],
  鮭魚: ["鮭魚", "鮭"],
  韓式芝麻油: ["芝麻", "芝麻油", "韓式芝麻油"],
  芝麻油: ["芝麻", "芝麻油"],
  韓式年糕條: ["年糕", "韓式年糕條", "韓式年糕"],
  起司年糕: ["年糕", "起司年糕"],
  黑松露醬: ["松露", "黑松露醬", "黑松露"],
  韓式糖醋醬汁: ["糖醋醬", "韓式糖醋醬汁", "糖醋"],
  莫札瑞拉起司絲: ["起司", "莫札瑞拉", "莫札瑞拉起司絲"],
  切達起司片: ["起司", "切達", "切達起司片"],
  去骨雞腿肉: ["雞肉", "雞腿肉", "去骨雞腿肉", "雞塊"],
  霜降牛肉片: ["牛肉", "牛肉片", "霜降牛", "肉片"],
  牛肉片: ["牛肉", "牛肉片", "肉片"],
  豬肉片: ["豬肉", "豬肉片", "肉片"],
  豬後腿肉丁: ["豬肉", "豬後腿肉", "豬後腿肉丁", "肉丁"],
  羊肉片: ["羊肉", "羊肉片", "肉片"],
  鮮切鯛魚: ["魚片", "鯛魚", "鮮切鯛魚"],
  鬼頭刀魚片: ["魚片", "鬼頭刀", "鬼頭刀魚片"],
  鮮香菇: ["鮮菇", "香菇", "鮮香菇"],
  植物肉雞塊: ["植物雞", "植物肉雞塊"],
  新鮮生蠔: ["生蠔", "新鮮生蠔"],
  飛魚卵: ["魚卵", "飛魚卵"],
  綜合堅果碎: ["堅果", "堅果粒", "綜合堅果碎"],
  肉桂粉: ["肉桂", "肉桂粉"]
};

function aliasesForName(name) {
  if (ALIAS_MAP[name]) return [...new Set([name, ...ALIAS_MAP[name]])];
  const base = [name];
  if (name.length >= 2) base.push(name.slice(0, 2));
  return base;
}

/**
 * @param {string} text
 * @param {string} name
 */
function nameAppearsInText(text, name) {
  return aliasesForName(name).some((token) => token.length >= 1 && text.includes(token));
}

/**
 * @param {string} file
 */
function precheckFile(file) {
  const slug = file.replace(/\.md$/, "");
  const source = readFileSync(join(recipesDir, file), "utf8");
  const fm = parseFrontmatter(source);
  const title = parseScalar(fm, "title") ?? slug;
  const servings = parseNumber(fm, "servings");
  const prepTime = parseNumber(fm, "prepTime");
  const cookTime = parseNumber(fm, "cookTime");
  const totalTime = parseNumber(fm, "totalTime");
  const ingredients = parseIngredientNames(fm);
  const seasonings = parseSeasoningNames(fm);
  const allNamed = [...ingredients, ...seasonings];
  const customAdditions = parseStringListItems(fm, "customAdditions");
  const substitutions = parseStringListItems(fm, "substitutions");
  const steps = parseSteps(fm);
  const stepsText = steps.join("\n");

  const mechanical_issues = [];

  if (steps.length < 3) {
    mechanical_issues.push({
      type: "Format_Inconsistency",
      code: "thin_steps",
      severity: "Warning",
      description: `Only ${steps.length} step(s); schema expects at least 3.`
    });
  }

  if (
    prepTime !== null &&
    cookTime !== null &&
    totalTime !== null &&
    totalTime < prepTime + cookTime
  ) {
    mechanical_issues.push({
      type: "Metadata_Mismatch",
      code: "time_mismatch",
      severity: "Warning",
      description: `totalTime ${totalTime} < prepTime ${prepTime} + cookTime ${cookTime}.`
    });
  }

  const vagueSeasonings = new Set(["鹽", "糖", "胡椒", "黑胡椒", "白胡椒"]);
  for (const name of allNamed) {
    if (vagueSeasonings.has(name)) continue;
    if (!nameAppearsInText(stepsText, name)) {
      mechanical_issues.push({
        type: "Ingredient_Mismatch",
        code: "unused_ingredient",
        severity: "Warning",
        description: `Listed item "${name}" not found in steps text (heuristic).`
      });
    }
  }

  const knownOptional = new Set(
    [...customAdditions, ...substitutions].flatMap((item) => aliasesForName(item))
  );
  const garnishTokens = ["蔥花", "香菜", "芝麻", "胡椒", "檸檬"];
  for (const token of garnishTokens) {
    if (stepsText.includes(token) && !knownOptional.has(token)) {
      const inLists =
        allNamed.some((n) => nameAppearsInText(token, n)) ||
        customAdditions.some((c) => c.includes(token) || token.includes(c));
      if (!inLists) {
        mechanical_issues.push({
          type: "Ingredient_Mismatch",
          code: "step_mentions_unknown",
          severity: "Warning",
          description: `Steps mention "${token}" but it is not in ingredients/seasonings/customAdditions/substitutions.`
        });
      }
    }
  }


  let status = "Pass";
  if (mechanical_issues.some((i) => i.severity === "Critical")) status = "Critical";
  else if (mechanical_issues.length) status = "Warning";

  return {
    slug,
    title,
    servings,
    prepTime,
    cookTime,
    totalTime,
    ingredient_count: ingredients.length,
    seasoning_count: seasonings.length,
    step_count: steps.length,
    status,
    mechanical_issues
  };
}

const files = readdirSync(recipesDir)
  .filter((f) => f.endsWith(".md"))
  .filter((f) => (singleSlug ? f === `${singleSlug}.md` : true))
  .sort();

if (singleSlug && files.length === 0) {
  console.error(`No recipe found for slug: ${singleSlug}`);
  process.exit(1);
}

const results = files.map(precheckFile);
const summary = {
  generated_at: new Date().toISOString().slice(0, 10),
  recipe_count: results.length,
  pass: results.filter((r) => r.status === "Pass").length,
  warning: results.filter((r) => r.status === "Warning").length,
  critical: results.filter((r) => r.status === "Critical").length,
  recipes: results
};

const payload = JSON.stringify(summary, null, 2);

if (shouldWrite) {
  mkdirSync(join(outDir, "reports"), { recursive: true });
  writeFileSync(outFile, payload);
  console.log(`Wrote ${outFile} (${summary.recipe_count} recipes, ${summary.warning} warnings)`);
} else {
  console.log(payload);
}
