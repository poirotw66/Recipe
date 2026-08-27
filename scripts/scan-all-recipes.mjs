import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const dir = join(ROOT, "src/content/recipes");
const files = readdirSync(dir).filter((f) => f.endsWith(".md")).sort();

const LEFTOVER_RE = /剩菜|剩飯|剩肉|清庫存|隔夜剩|再利用|見底湯|見底時|清冰箱料理/g;
const SCENARIO_LEFTOVER = /冰箱清庫存|剩飯料理/;

/** @type {Record<string, unknown>} */
const report = {
  total: files.length,
  missingCover: [],
  thinSteps: [],
  leftover: {
    title: [],
    description: [],
    intro: [],
    steps: [],
    closing: [],
    scenario: [],
    slug: [],
  },
  svgCovers: [],
  duplicateTitles: new Map(),
};

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const raw = readFileSync(join(dir, file), "utf8").replace(/\r\n/g, "\n");
  const fmEnd = raw.indexOf("\n---\n", 4);
  const fm = raw.slice(0, fmEnd);
  const body = raw.slice(fmEnd + 5).trim();

  const scalar = (key) => fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, "m"))?.[1] ?? "";
  const title = scalar("title");
  const description = scalar("description");
  const intro = scalar("intro");
  const coverImage = fm.match(/^coverImage:\s*(.+)$/m)?.[1]?.trim() ?? "";

  const stepBlock = fm.match(/^steps:\n((?:- .+\n)+)/m)?.[1] ?? "";
  const stepCount = stepBlock ? [...stepBlock.matchAll(/^- /gm)].length : 0;

  if (!coverImage) report.missingCover.push(slug);
  if (coverImage.endsWith(".svg")) report.svgCovers.push(slug);
  if (stepCount < 3) report.thinSteps.push({ slug, stepCount });

  if (LEFTOVER_RE.test(title)) report.leftover.title.push({ slug, title });
  if (LEFTOVER_RE.test(description)) report.leftover.description.push({ slug, text: description });
  if (LEFTOVER_RE.test(intro)) report.leftover.intro.push({ slug, text: intro });
  if (LEFTOVER_RE.test(stepBlock)) report.leftover.steps.push(slug);
  if (LEFTOVER_RE.test(body)) report.leftover.closing.push({ slug });
  if (/leftover|clearout|fridge-bottom/.test(slug)) report.leftover.slug.push(slug);

  const scenarioBlock = fm.match(/^scenarios:\n((?:- .+\n)+)/m)?.[1] ?? "";
  const scenarios = [...scenarioBlock.matchAll(/^- (.+)$/gm)].map((m) => m[1].trim());
  for (const s of scenarios) {
    if (SCENARIO_LEFTOVER.test(s)) {
      report.leftover.scenario.push({ slug, scenario: s });
    }
  }

  const count = report.duplicateTitles.get(title) ?? 0;
  report.duplicateTitles.set(title, count + 1);
}

report.duplicateTitles = [...report.duplicateTitles.entries()]
  .filter(([, count]) => count > 1)
  .map(([title, count]) => ({ title, count }));

report.summary = {
  missingCover: report.missingCover.length,
  thinSteps: report.thinSteps.length,
  svgCovers: report.svgCovers.length,
  leftoverTitle: report.leftover.title.length,
  leftoverDescription: report.leftover.description.length,
  leftoverIntro: report.leftover.intro.length,
  leftoverSteps: report.leftover.steps.length,
  leftoverClosing: report.leftover.closing.length,
  leftoverScenarioTags: report.leftover.scenario.length,
  leftoverSlugs: report.leftover.slug.length,
  duplicateTitles: report.duplicateTitles.length,
};

import { writeFileSync } from "node:fs";
writeFileSync(join(ROOT, "scan-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report.summary, null, 2));
