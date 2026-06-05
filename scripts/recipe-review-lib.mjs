import { readFileSync } from "node:fs";
import { join } from "node:path";

export const recipesDir = (root) => join(root, "src/content/recipes");

/**
 * @param {string} source
 */
export function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : "";
}

/**
 * @param {string} fm
 * @param {string} key
 */
export function parseScalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, "") : null;
}

/**
 * @param {string} fm
 * @param {string} key
 */
export function parseNumber(fm, key) {
  const raw = parseScalar(fm, key);
  if (raw === null) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

/**
 * @param {string} fm
 */
export function parseStringListItems(fm, key) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === `${key}:`);
  if (start < 0) return [];
  const items = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line)) break;
    const m = line.match(/^\s*-\s+(.+)$/);
    if (m) items.push(m[1].trim().replace(/^['"]|['"]$/g, ""));
  }
  return items;
}

/**
 * @param {string} fm
 * @param {string} key
 */
export function parseListSection(fm, key) {
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

export function parseSteps(fm) {
  return parseListSection(fm, "steps");
}

export function parseIngredientNames(fm) {
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

export function parseSeasoningNames(fm) {
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

const ALIAS_MAP = {
  雞蛋: ["蛋", "蛋液", "炒蛋", "雞蛋"],
  番茄: ["番茄", "番茄丁", "茄", "番茄醬"],
  青蔥: ["蔥", "蔥花", "青蔥"],
  白飯: ["飯", "米飯", "剩飯", "白飯"],
  蒜頭: ["蒜", "蒜末", "蒜頭", "蒜香"],
  橄欖油: ["油", "橄欖油"],
  青花菜: ["青花菜", "花椰菜", "西蘭花"],
  鹽: ["鹽", "鹹"],
  胡椒: ["胡椒", "黑胡椒"],
  醬油: ["醬油", "醬"],
  鮭魚: ["鮭魚", "鮭"],
  板豆腐: ["豆腐", "板豆腐"],
  豆腐: ["豆腐", "板豆腐"],
  義大利麵: ["麵", "義大利麵", "麵條"],
  鴻喜菇: ["菇", "菇類", "鴻喜菇"],
  甜椒粉: ["甜椒", "甜椒粉", "紐奧良", "Cajun"]
};

export function aliasesForName(name) {
  if (ALIAS_MAP[name]) return [...new Set([name, ...ALIAS_MAP[name]])];
  const base = [name];
  if (name.length >= 2) base.push(name.slice(0, 2));
  return base;
}

export function nameAppearsInText(text, name) {
  return aliasesForName(name).some((token) => token.length >= 1 && text.includes(token));
}

/**
 * @param {string} text
 * @param {number} minLen
 */
export function hasRepeatedSubstring(text, minLen = 18) {
  for (let len = Math.min(40, text.length); len >= minLen; len--) {
    for (let i = 0; i <= text.length - len * 2; i++) {
      const slice = text.slice(i, i + len);
      if (slice.trim().length < minLen) continue;
      if (text.indexOf(slice, i + len) !== -1) return slice;
    }
  }
  return null;
}

/**
 * @param {object} ctx
 */
export function mechanicalIssues(ctx) {
  const {
    servings,
    prepTime,
    cookTime,
    totalTime,
    ingredients,
    seasonings,
    allNamed,
    customAdditions,
    substitutions,
    steps,
    stepsText
  } = ctx;
  const issues = [];

  if (steps.length < 3) {
    issues.push({
      type: "Format_Inconsistency",
      code: "thin_steps",
      severity: "Warning",
      description: `步驟僅 ${steps.length} 則，低於 schema 至少 3 則。`,
      suggested_fix: "補齊或拆分烹調步驟至至少 3 則。",
      source: "precheck"
    });
  }

  if (
    prepTime !== null &&
    cookTime !== null &&
    totalTime !== null &&
    totalTime < prepTime + cookTime
  ) {
    issues.push({
      type: "Metadata_Mismatch",
      code: "time_mismatch",
      severity: "Warning",
      description: `totalTime（${totalTime}）小於 prepTime + cookTime（${prepTime + cookTime}）。`,
      suggested_fix: "調整 frontmatter 時間欄位使其一致。",
      source: "precheck"
    });
  }

  const vagueSeasonings = new Set(["鹽", "糖", "胡椒", "黑胡椒", "白胡椒"]);
  for (const name of allNamed) {
    if (vagueSeasonings.has(name)) continue;
    if (!nameAppearsInText(stepsText, name)) {
      issues.push({
        type: "Ingredient_Mismatch",
        code: "unused_ingredient",
        severity: "Warning",
        description: `食材／調味清單有「${name}」，但步驟文字未出現（啟發式比對）。`,
        suggested_fix: "在步驟中使用該材料，或從清單移除。",
        source: "precheck"
      });
    }
  }

  const knownOptional = new Set(
    [...customAdditions, ...substitutions].flatMap((item) => aliasesForName(item))
  );
  const garnishTokens = ["香菜", "白芝麻"];
  for (const token of garnishTokens) {
    if (!stepsText.includes(token)) continue;
    const inLists =
      allNamed.some((n) => nameAppearsInText(token, n)) ||
      customAdditions.some((c) => c.includes(token));
    if (!inLists) {
      issues.push({
        type: "Ingredient_Mismatch",
        code: "step_mentions_unknown",
        severity: "Warning",
        description: `步驟提到「${token}」，但未列在食材／customAdditions／substitutions。`,
        suggested_fix: "列入 customAdditions 或改寫步驟。",
        source: "precheck"
      });
    }
  }

  return issues;
}

/**
 * @param {object} ctx
 */
export function contentIssues(ctx) {
  const { slug, title, category, servings, ingredients, steps, stepsText, equipment } = ctx;
  const issues = [];
  const isPasta =
    category === "飯麵" &&
    (slug.includes("pasta") || title.includes("義大利麵") || title.includes("義麵"));
  const isSoup = category === "湯品" || title.includes("湯");
  const hasRiceIng = ingredients.some((n) => n.includes("飯") || n === "白飯");

  if (stepsText.includes("每粒米飯") && isPasta && !hasRiceIng) {
    issues.push({
      type: "Logic_Error",
      code: "template_rice_in_pasta",
      severity: "Critical",
      description: "義麵食譜步驟出現「每粒米飯」等炒飯模板用語，與料理類型不符。",
      suggested_fix: "刪除炒飯模板句，改寫為麵條裹醬／收汁描述。",
      source: "content_rules"
    });
  }

  const soupBoilPhrase = "使食材的精華風味與湯頭完美融合";
  const boilCount = stepsText.split(soupBoilPhrase).length - 1;
  if (boilCount >= 2) {
    issues.push({
      type: "Logic_Error",
      code: "duplicate_boilerplate",
      severity: "Warning",
      description: `步驟中「${soupBoilPhrase}」重複 ${boilCount} 次，可讀性差。`,
      suggested_fix: "合併為一段清楚火候說明。",
      source: "content_rules"
    });
  }

  if ((stepsText.match(/慢火燉煮/g) || []).length >= 2 && !isSoup) {
    issues.push({
      type: "Logic_Error",
      code: "soup_template_in_nonsoup",
      severity: "Warning",
      description: "非湯品食譜重複出現「慢火燉煮」等燉湯模板句。",
      suggested_fix: "改寫為符合快炒／煎烤／拌麵的動作描述。",
      source: "content_rules"
    });
  }

  if ((stepsText.match(/al dente/gi) || []).length >= 2) {
    issues.push({
      type: "Format_Inconsistency",
      code: "duplicate_al_dente",
      severity: "Warning",
      description: "al dente 說明重複或句子在換行處截斷。",
      suggested_fix: "保留一句煮麵彈牙說明即可。",
      source: "content_rules"
    });
  }

  if (stepsText.includes("大火大火")) {
    issues.push({
      type: "Format_Inconsistency",
      code: "duplicate_word",
      severity: "Warning",
      description: "步驟出現「大火大火」重複用字。",
      suggested_fix: "改為單一「大火」。",
      source: "content_rules"
    });
  }

  if (title.includes("牛肉") && stepsText.includes("保持蔬菜脆綠")) {
    issues.push({
      type: "Logic_Error",
      code: "veg_template_in_meat",
      severity: "Warning",
      description: "牛肉料理步驟混入「保持蔬菜脆綠」等模板句，邏輯不連貫。",
      suggested_fix: "改寫為蔥段／牛肉嫩度相關描述。",
      source: "content_rules"
    });
  }

  const dup = hasRepeatedSubstring(stepsText, 20);
  if (dup && dup.length >= 20) {
    issues.push({
      type: "Logic_Error",
      code: "duplicated_phrase",
      severity: "Warning",
      description: `步驟內有重複長句（例如「${dup.slice(0, 24)}…」），疑似批次產文殘留。`,
      suggested_fix: "刪除重複句並精簡步驟。",
      source: "content_rules"
    });
  }

  if (isSoup && /加水|倒入水|注入水/.test(stepsText) && !ingredients.some((n) => n.includes("水"))) {
    issues.push({
      type: "Ingredient_Mismatch",
      code: "water_not_listed",
      severity: "Warning",
      description: "湯品步驟需要加水，但食材清單未標示水量。",
      suggested_fix: "在步驟或食材中標明水量（如 600 ml）。",
      source: "content_rules"
    });
  }

  if (
    servings !== null &&
    servings >= 2 &&
    ingredients.includes("雞胸肉") &&
    /amount:\s*'?1'?\s*\n\s*unit:\s*片/m.test(ctx.rawFm)
  ) {
    issues.push({
      type: "Proportion_Error",
      code: "servings_vs_protein",
      severity: "Warning",
      description: `標示 ${servings} 人份，但雞胸肉僅 1 片，份量可能不足。`,
      suggested_fix: "改為 2 片或將 servings 改為 1。",
      source: "content_rules"
    });
  }

  if (
    ingredients.some((n) => n.includes("鮭魚")) &&
    equipment.some((e) => e.includes("氣炸")) &&
    !/厚度|公分|cm|全熟|中心/.test(stepsText)
  ) {
    issues.push({
      type: "Safety_Risk",
      code: "salmon_doneness_vague",
      severity: "Warning",
      description: "氣炸鮭魚未說明厚度或熟透判斷，較厚切塊可能有食安風險。",
      suggested_fix: "補充厚度、時間調整或剖面／溫度判斷。",
      source: "content_rules"
    });
  }

  if (title.includes("青醬") && ingredients.includes("青蔥") && !ingredients.some((n) => n.includes("羅勒"))) {
    issues.push({
      type: "Metadata_Mismatch",
      code: "pesto_naming",
      severity: "Warning",
      description: "標題「青醬」易聯想羅勒青醬，內容為青蔥蒜味醬。",
      suggested_fix: "標題改為「青蔥蒜味」或在 intro 第一句澄清。",
      source: "content_rules"
    });
  }

  return issues;
}

/**
 * @param {Array<{ severity: string }>} issues
 */
export function worstStatus(issues) {
  if (issues.some((i) => i.severity === "Critical")) return "Critical";
  if (issues.length) return "Warning";
  return "Pass";
}

/**
 * @param {Array} issues
 */
export function confidenceScore(issues) {
  let score = 92;
  for (const i of issues) {
    if (i.severity === "Critical") score -= 18;
    else score -= 6;
  }
  return Math.max(40, Math.min(95, score));
}

/**
 * @param {string} root
 * @param {string} file
 */
export function reviewRecipeFile(root, file) {
  const slug = file.replace(/\.md$/, "");
  const source = readFileSync(join(recipesDir(root), file), "utf8");
  const fm = parseFrontmatter(source);
  const title = parseScalar(fm, "title") ?? slug;
  const category = parseScalar(fm, "category") ?? "";
  const servings = parseNumber(fm, "servings");
  const prepTime = parseNumber(fm, "prepTime");
  const cookTime = parseNumber(fm, "cookTime");
  const totalTime = parseNumber(fm, "totalTime");
  const ingredients = parseIngredientNames(fm);
  const seasonings = parseSeasoningNames(fm);
  const allNamed = [...ingredients, ...seasonings];
  const customAdditions = parseStringListItems(fm, "customAdditions");
  const substitutions = parseStringListItems(fm, "substitutions");
  const equipment = parseStringListItems(fm, "equipment");
  const steps = parseSteps(fm);
  const stepsText = steps.join("\n");

  const ctx = {
    slug,
    title,
    category,
    servings,
    prepTime,
    cookTime,
    totalTime,
    ingredients,
    seasonings,
    allNamed,
    customAdditions,
    substitutions,
    equipment,
    steps,
    stepsText,
    rawFm: fm
  };

  const issues = [...mechanicalIssues(ctx), ...contentIssues(ctx)];
  const status = worstStatus(issues);

  return {
    slug,
    title,
    reviewed_at: new Date().toISOString().slice(0, 10),
    status,
    confidence_score: confidenceScore(issues),
    issues
  };
}
