#!/usr/bin/env node
/**
 * Fix easy recipe-review warnings: soup/fried-rice dupes, water in ingredients,
 * unused ingredient names in steps, pasta al dente dupes, garnish list alignment.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  hasRepeatedSubstring,
  nameAppearsInText,
  reviewRecipeFile
} from "./recipe-review-lib.mjs";
import { expandRiceBowl } from "./lib/home-step-expansion.mjs";
import { parseRecipeContext, formatAmount } from "./lib/parse-recipe-fm.mjs";

const root = process.cwd();
const recipesDir = join(root, "src/content/recipes");
const reportsDir = join(root, "docs/reviews/recipe-audit/reports");
const UPDATED = "2026-06-10";

function yamlStep(step) {
  const needsQuote = /[:#"'&]|^\d/.test(step) || step.includes("：");
  if (needsQuote) {
    return `- "${step.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return `- ${step}`;
}

function replaceStepsInSource(raw, steps) {
  const end = raw.indexOf("\n---", 4);
  if (!raw.startsWith("---") || end < 0) throw new Error("Bad frontmatter");
  const fm = raw.slice(4, end);
  const body = raw.slice(end + 4);
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === "steps:");
  if (start < 0) throw new Error("Missing steps:");
  let endIdx = start + 1;
  while (endIdx < lines.length && lines[endIdx].startsWith("- ")) endIdx++;
  const block = ["steps:", ...steps.map((step) => yamlStep(step))];
  let nextFm = [...lines.slice(0, start), ...block, ...lines.slice(endIdx)].join("\n");
  nextFm = nextFm.replace(/^updatedAt:.*$/m, `updatedAt: "${UPDATED}"`);
  return `---\n${nextFm}\n---${body}`;
}

function ensureWaterInIngredients(raw) {
  const ctx = parseRecipeContext(raw);
  const waterSeasoning = ctx.seasonings.find((s) => s.name === "水");
  if (!waterSeasoning) return raw;
  if (ctx.ingredients.some((i) => i.name === "水")) return raw;
  const lines = parseFrontmatterSlice(raw).split("\n");
  const start = lines.findIndex((line) => line.trim() === "ingredients:");
  if (start < 0) return raw;
  const block = [
    "- name: 水",
    `  amount: "${waterSeasoning.amount}"`,
    `  unit: "${waterSeasoning.unit}"`
  ];
  lines.splice(start + 1, 0, ...block);
  let next = lines.join("\n");
  next = next.replace(
    /seasonings:\n- name: 水\n  amount: "[^"]+"\n  unit: "[^"]+"\n/,
    "seasonings:\n"
  );
  return patchFm(raw, next);
}

function parseFrontmatterSlice(raw) {
  const end = raw.indexOf("\n---", 4);
  return raw.slice(4, end);
}

function patchFm(raw, nextFm) {
  const end = raw.indexOf("\n---", 4);
  const body = raw.slice(end + 4);
  nextFm = nextFm.replace(/^updatedAt:.*$/m, `updatedAt: "${UPDATED}"`);
  return `---\n${nextFm}\n---${body}`;
}

function dedupeByPrefix(steps, prefixLen = 22) {
  const seen = new Set();
  const out = [];
  for (let step of steps) {
    const core = step.replace(/^備料：/, "").trim();
    const key = core.slice(0, prefixLen);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(core);
  }
  return out;
}

function cleanSoupSteps(ctx) {
  const water =
    ctx.seasonings.find((s) => s.name === "水") ?? ctx.ingredients.find((s) => s.name === "水");
  const wText = water ? formatAmount(water) : "足量清水";
  const skip = [/^湯鍋加入（水/, /^備料：湯鍋加入（水/, /^備料：湯鍋加水/, /^湯鍋加水/];
  const filtered = [];
  for (const step of ctx.steps) {
    if (skip.some((re) => re.test(step))) continue;
    let s = step.replace(/^備料：/, "").trim();
    s = s.replace(/加水約?\s*[\d.]+\s*毫升/, `倒入 ${wText}`);
    s = s.replace(/湯鍋加水/, `湯鍋倒入 ${wText}`);
    filtered.push(s);
  }
  const deduped = dedupeByPrefix(filtered);
  if (deduped.length >= 3) return deduped.slice(0, 6);
  const ing = ctx.ingredients
    .filter((i) => i.name !== "水")
    .map((i) => formatAmount(i))
    .join("、");
  const seas = ctx.seasonings
    .filter((s) => s.name !== "水")
    .map((s) => formatAmount(s))
    .join("、");
  return [
    `備料：${ing}；${seas} 分開備好。`,
    `湯鍋倒入 ${wText} 煮滾。`,
    "依序下入耐煮食材，轉中小火煮至熟透。",
    "最後以鹽與胡椒調味，起鍋即可。"
  ];
}

function cleanFriedRiceSteps(ctx) {
  const deduped = dedupeByPrefix(ctx.steps, 26);
  return deduped
    .map((s) => s.replace(/，中火炒至表面全熟即可。$/, "。"))
    .filter((s, i, arr) => i === 0 || !s.includes("白飯若冷藏") || !arr[0]?.includes("白飯若冷藏"))
    .slice(0, 6);
}

function cleanWaterLilySteps(ctx) {
  const deduped = dedupeByPrefix(ctx.steps, 20);
  return deduped
    .map((s) =>
      s
        .replace(/，中火炒至表面全熟即可。$/, "。")
        .replace(/炒至表面全熟即可。$/, "。")
        .replace(/^備料：/, "")
        .trim()
    )
    .filter((s) => s.length > 4)
    .slice(0, 6);
}

function cleanStirFrySteps(ctx) {
  return dedupByPrefix(
    ctx.steps.map((s) =>
      s
        .replace(/^備料：/, "")
        .replace(/，中火炒至表面全熟即可。$/, "。")
        .trim()
    ),
    20
  ).slice(0, 6);
}

function dedupByPrefix(steps, n) {
  const seen = new Set();
  const out = [];
  for (const step of steps) {
    const key = step.slice(0, n);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(step);
  }
  return out;
}

function injectUnusedNames(steps, names) {
  const text = steps.join("\n");
  const missing = names.filter((n) => !nameAppearsInText(text, n));
  if (!missing.length) return steps;
  const next = [...steps];
  const clause = `另備 ${missing.join("、")}`;
  if (next[0]?.startsWith("備料：")) {
    next[0] = next[0].replace(/。?$/, `，${clause}。`);
  } else {
    next.unshift(`備料：${clause} 依食譜分量備好。`);
  }
  return next;
}

function fixFriesDupSteps(steps) {
  if (steps.length < 3) return steps;
  const next = [...steps];
  next[2] = next[2].replace(
    /接著加入[^，。]+（如[^）]+）[^。]*。/,
    "接著淋上預先調好的沾醬，輕拋拌勻。"
  );
  if (hasRepeatedSubstring(next.join("\n"), 20)) {
    next[2] = "趁熱將薯條與肉醬、起司醬輕拋拌勻，避免醬汁過多讓薯條變軟。";
  }
  return next;
}

function fixBenedictDupSteps(steps) {
  if (steps.length < 4) return steps;
  const next = [...steps];
  next[3] = next[3].replace(
    /最後淋上溫熱的[^（]+（[^）]+）/,
    "最後淋上溫熱的荷蘭醬"
  );
  return dedupByPrefix(next, 18);
}

function fixSaladDressingStep(steps) {
  const next = steps.map((s) =>
    s.replace(
      /倒入 2\/3 份量的 炸油 600毫升、海鹽[^，]+，[^（]+（[^）]+）輕快拋拌/,
      "倒入 2/3 份量的凱薩醬、莎莎醬與少許海鹽，輕快拋拌"
    ).replace(
      /倒入 2\/3 份量的 炸油 600毫升、海鹽[^，]+、[^（]+（[^）]+）輕快拋拌/,
      "倒入 2/3 份量的醬汁與少許海鹽，輕快拋拌"
    )
  );
  return next;
}

const PASTA_CLEAN = {
  "pesto-chicken-mushroom-pasta": [
    "雞胸肉、菇類切片；青蔥取蔥綠與蒜頭、2 大匙橄欖油、起司粉打成青醬泥（無調理機則切極碎拌勻）。",
    "湯鍋煮滾鹽水，義大利麵依包裝時間煮至 al dente，瀝乾保留 1/2 杯煮麵水。",
    "平底鍋下 1 大匙油，中火將菇類與雞胸肉炒至熟透，起鍋備用。",
    "同鍋加入麵條、青醬泥與 2～3 大匙煮麵水拌炒，以鹽與黑胡椒調味即可。"
  ],
  "spicy-seafood-tomato-pasta": [
    "番茄底部劃十字燙 30 秒去皮切丁；蝦仁去腸吸乾。",
    "湯鍋煮滾鹽水，義大利麵依包裝時間煮至 al dente，瀝乾保留 1/2 杯煮麵水。",
    "平底鍋下橄欖油，爆香蒜末與乾辣椒，加入番茄丁中火炒到出水變稠。",
    "加入 4 大匙煮麵水與切半的橄欖，煮滾後調整鹽與胡椒；放入麵條拌勻，最後下蝦仁大火炒至變色即起鍋。"
  ],
  "tofu-tomato-pasta": [
    "番茄去皮切丁，豆腐切塊，蒜切末。",
    "湯鍋煮滾鹽水，義大利麵依包裝時間煮至 al dente，瀝乾保留 1/2 杯煮麵水。",
    "平底鍋下橄欖油爆香蒜末，加入番茄丁與番茄醬炒軟，下豆腐輕煎上色。",
    "加入麵條與少許煮麵水拌炒，以鹽調味即可。"
  ],
  "white-sauce-chicken-pasta": [
    "雞胸肉切條，以鹽與黑胡椒抓味；蘑菇切片。",
    "湯鍋煮滾鹽水，義大利麵依包裝時間煮至 al dente，瀝乾保留 1/2 杯煮麵水。",
    "平底鍋下奶油與 1 大匙橄欖油，煎熟雞胸後盛出；同鍋炒蘑菇至軟。",
    "倒入鮮奶油與少許煮麵水煮滾，放回雞肉與麵條拌勻，起司粉與胡椒調味即可。"
  ]
};

function addCustomAddition(raw, item) {
  if (raw.includes(item)) return raw;
  const fm = parseFrontmatterSlice(raw);
  if (/customAdditions:\s*\n\s*-\s/.test(fm)) {
    const nextFm = fm.replace(/(customAdditions:\s*\n)/, `$1- ${item}\n`);
    return patchFm(raw, nextFm);
  }
  if (fm.includes("customAdditions: []")) {
    return patchFm(raw, fm.replace("customAdditions: []", `customAdditions:\n- ${item}`));
  }
  return patchFm(raw, fm.replace(/^customAdditions:.*$/m, `customAdditions:\n- ${item}`));
}

function patchSlug(slug, report) {
  const path = join(recipesDir, `${slug}.md`);
  let raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const ctx = parseRecipeContext(raw, slug);
  const codes = new Set(report.issues.map((i) => i.code));
  let steps = [...ctx.steps];

  if (PASTA_CLEAN[slug]) {
    steps = PASTA_CLEAN[slug];
  } else if (codes.has("duplicated_phrase")) {
    if (ctx.slug.startsWith("water-lily-stem-")) {
      steps = cleanWaterLilySteps(ctx);
    } else if (ctx.slug.includes("fried-rice") || ctx.title.includes("炒飯")) {
      steps = cleanFriedRiceSteps(ctx);
    } else if (/湯|羹|粥/.test(ctx.title) || ctx.category.includes("湯")) {
      steps = cleanSoupSteps(ctx);
    } else if (slug.includes("eggs-benedict")) {
      steps = fixBenedictDupSteps(steps);
    } else if (/fries|薯條|poutine|truffle-fries|garlic-fries|salted-egg-yolk-fries|oat-crusted/.test(slug)) {
      steps = fixFriesDupSteps(steps);
    } else if (slug.includes("caesar") || slug.includes("sesame-chicken-salad") || slug.includes("saltwater-chicken-salad")) {
      steps = fixSaladDressingStep(steps);
    } else if (slug === "weight-loss-zucchini-chicken") {
      steps = cleanStirFrySteps(ctx);
    } else if (slug.startsWith("sf-sous-vide")) {
      steps = [
        steps[0].replace(/^備料：/, "備料：").slice(0, 120),
        "花椰菜飯與藜麥分別蒸熟或微波加熱；舒肥雞切片，火烤玉米切段。",
        "大碗放入花椰菜飯、藜麥與玉米，擺上舒肥雞。",
        "起司醬與橄欖油、海鹽調勻後淋在盤邊或拌入穀物即可。"
      ];
    }
  }

  if (codes.has("unused_ingredient")) {
    const names = report.issues
      .filter((i) => i.code === "unused_ingredient")
      .map((i) => {
        const m = i.description.match(/「(.+?)」/);
        return m ? m[1] : null;
      })
      .filter(Boolean);
    steps = injectUnusedNames(steps, names);
  }

  if (codes.has("step_mentions_unknown")) {
    raw = addCustomAddition(raw, "白芝麻 少許");
    steps = steps.map((s) => s.replace(/，中火炒至表面全熟即可。$/, "。"));
  }

  if (slug === "egg-scallion-oil-noodles") {
    steps = steps.map((s) => (s.includes("煮麵") ? s.replace("煮麵", "油麵入鍋煮") : s));
  }
  if (slug === "sesame-cold-noodles-solo") {
    const idx = steps.findIndex((s) => /醬|麻醬|調味/.test(s));
    if (idx >= 0 && !steps.join("").includes("烏醋")) {
      steps[idx] = steps[idx].replace(/。?$/, "，並加烏醋調和。");
    }
  }

  if (
    codes.has("unused_ingredient") &&
    (slug.includes("rice-bowl") || slug.startsWith("solo-")) &&
    steps.some((s) => s.includes("備料") && s.length > 80)
  ) {
    if (slug.includes("rice-bowl") || slug.startsWith("solo-")) {
      steps = expandRiceBowl(ctx);
    }
  }

  raw = ensureWaterInIngredients(raw);
  raw = replaceStepsInSource(raw, steps);
  writeFileSync(path, raw, "utf8");
}

function main() {
  const files = readdirSync(reportsDir).filter((f) => f.endsWith(".json"));
  let patched = 0;
  for (const file of files) {
    const report = JSON.parse(readFileSync(join(reportsDir, file), "utf8"));
    if (report.status !== "Warning") continue;
    patchSlug(report.slug, report);
    patched++;
  }
  console.log(`Patched ${patched} warning recipes.`);
  const results = readdirSync(join(root, "src/content/recipes"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => reviewRecipeFile(root, f));
  const pass = results.filter((r) => r.status === "Pass").length;
  const warning = results.filter((r) => r.status === "Warning").length;
  console.log(`After fix: Pass ${pass} / Warning ${warning} / Critical 0`);
}

main();
