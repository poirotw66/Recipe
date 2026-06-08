#!/usr/bin/env node
/**
 * Replace SEO template steps in zh recipes (spec-018 sync).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const UPDATED = "2026-06-07";

const ZH_STEP_FIX = {
  "beef-tomato-noodles":
    "湯鍋下橄欖油，中大火炒番茄，不停翻動至略軟出汁。",
  "broccoli-mushroom-chicken-rice-bowl":
    "平底鍋中小火下油爆香蒜末，下雞胸炒至變色，再加入菇類與青花菜拌炒。",
  "broccoli-mushroom-egg":
    "平底鍋中火下油炒菇類至出水，加入青花菜拌炒。",
  "broccoli-tofu-garlic-stirfry":
    "中火下油爆香蒜末，青花菜炒到翠綠，放回豆腐，以鹽與醬油調味。",
  "cabbage-carrot-chicken-rice-bowl":
    "中火下油爆香蒜末，雞胸炒至熟透，再加入蔬菜拌炒 3～4 分鐘。",
  "chicken-broccoli-pasta":
    "同鍋爆香蒜末與青花菜，加入麵條、雞肉與少許煮麵水拌勻。",
  "curry-beef-rice":
    "平底鍋下油，中小火炒洋蔥至透明，加入咖哩粉拌炒 30 秒至出香。",
  "garlic-cabbage-tofu-braise":
    "少油中火爆香蒜片，加入高麗菜拌炒 2 分鐘。",
  "garlic-egg-cabbage-bento-side":
    "平底鍋少油中小火爆香蒜末，轉大火下高麗菜快炒均勻至略軟仍帶脆。",
  "garlic-mushroom-tofu-rice-bowl":
    "先將豆腐煎至表面金黃，再下菇類與蒜末中小火炒至蒜香溢出。",
  "garlic-tofu-chicken-pan-main":
    "同鍋補少許油，爆香蒜末並炒雞胸至熟，放回豆腐，加醬油與鹽略收汁。",
  "garlic-tomato-tofu-eggs":
    "同鍋爆香蒜末與番茄至軟，放回豆腐，倒入蛋液快炒至半凝固，以鹽與醬油調味。",
  "mushroom-cabbage-rice-bowl":
    "熱油爆香蒜末，加入菇類與高麗菜拌炒 3 分鐘。",
  "onion-beef-rice-bowl":
    "平底鍋下油，洋蔥炒至透明；轉大火下牛肉快炒至表面變色（約七八分熟）即起鍋，避免過老。",
  "onion-cabbage-mushroom-saute":
    "熱油爆香蒜末與洋蔥，加入高麗菜與菇類拌炒至軟。",
  "onion-tomato-egg-fried-rice":
    "蛋液炒至半熟盛起；同鍋補油，中小火炒香洋蔥與番茄。",
  "scallion-beef-fried-rice":
    "同鍋補油，中小火爆香蔥白，下白飯與醬油快炒，最後放回牛肉與蔥花拌勻。",
  "tofu-cabbage-mushroom-stirfry":
    "同鍋補油，中小火爆香蒜末，下高麗菜與菇類炒軟，放回豆腐，以醬油與鹽調味。",
  "tomato-beef-rice-bowl":
    "平底鍋下油，中小火炒番茄至略軟出汁。",
  "tomato-cabbage-soft-eggs":
    "熱油中小火爆香蒜末與番茄至軟，加入高麗菜。",
  "tomato-garlic-cabbage-eggs":
    "熱油爆香蒜末與番茄至軟，加入高麗菜拌炒。",
  "tomato-garlic-pasta":
    "平底鍋下油，中小火爆香蒜末，再加入番茄丁炒至略軟出汁。"
};

function patchFile(relPath, mutator) {
  const path = join(root, relPath);
  let raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const end = raw.indexOf("\n---", 4);
  if (!raw.startsWith("---") || end < 0) throw new Error(`Bad FM ${relPath}`);
  const fm = raw.slice(4, end);
  const body = raw.slice(end);
  const next = mutator(fm);
  raw = `---\n${next}\n---${body}`;
  writeFileSync(path, raw, "utf8");
}

function replaceStepLine(fm, oldSub, newStep) {
  const needle = `- ${oldSub}`;
  const repl = `- ${newStep}`;
  if (!fm.includes(needle)) {
    throw new Error(`Missing step line: ${oldSub.slice(0, 40)}…`);
  }
  return fm.replace(needle, repl).replace(/^updatedAt:.*$/m, `updatedAt: '${UPDATED}'`);
}

const oldLines = JSON.parse(
  readFileSync(join(root, "docs/reviews/i18n-template-old-steps.json"), "utf8")
);

let n = 0;
for (const [slug, newStep] of Object.entries(ZH_STEP_FIX)) {
  const oldStep = oldLines[slug];
  if (!oldStep) throw new Error(`No old line for ${slug}`);
  patchFile(`src/content/recipes/${slug}.md`, (fm) => replaceStepLine(fm, oldStep, newStep));
  for (const folder of ["recipes-en", "recipes-ja", "recipes-ko"]) {
    patchFile(`src/content/${folder}/${slug}.md`, (fm) =>
      fm.replace(/^updatedAt:.*$/m, `updatedAt: '${UPDATED}'`)
    );
  }
  n += 1;
}

patchFile("src/content/recipes/scallion-beef-fried-rice.md", (fm) =>
  fm
    .replace(
      "避免久炒導致口感過老乾柴盛起。",
      "避免久炒導致口感過老，盛出備用。"
    )
    .replace(/^updatedAt:.*$/m, `updatedAt: '${UPDATED}'`)
);

console.log(`Patched ${n} zh recipes (+ scallion typo).`);
