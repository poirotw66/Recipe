import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const dir = join(ROOT, "src/content/recipes");

const LEFTOVER_SCENARIO = new Set(["冰箱清庫存", "剩飯料理"]);
const LEFTOVER_TAG = new Set(["清冰箱", "剩飯料理", "剩飯"]);

const DEFAULT_SCENARIO = "10 分鐘料理";

function normalizeScenarios(lines) {
  const kept = lines.filter((s) => !LEFTOVER_SCENARIO.has(s));
  if (kept.length === 0) {
    kept.push("一人料理", DEFAULT_SCENARIO);
  } else if (!kept.includes(DEFAULT_SCENARIO) && !kept.includes("一人料理")) {
    kept.push(DEFAULT_SCENARIO);
  }
  return [...new Set(kept)];
}

function normalizeTags(lines) {
  return lines
    .map((t) => (LEFTOVER_TAG.has(t) ? "家常" : t))
    .filter((t, i, arr) => arr.indexOf(t) === i);
}

function patchListSection(fm, key, normalize) {
  const lines = fm.split("\n");
  const start = lines.findIndex((line) => line === `${key}:`);
  if (start < 0) return fm;

  const items = [];
  let end = start + 1;
  for (; end < lines.length; end++) {
    const line = lines[end];
    if (/^[a-zA-Z_][a-zA-Z0-9_]*:/.test(line)) break;
    const m = line.match(/^\s*-\s+(.+)$/);
    if (m) items.push(m[1].trim().replace(/^['"]|['"]$/g, ""));
  }

  if (!items.some((item) => LEFTOVER_SCENARIO.has(item) || LEFTOVER_TAG.has(item))) {
    return fm;
  }

  const nextItems = normalize(items);
  const rebuilt = [
    ...lines.slice(0, start + 1),
    ...nextItems.map((item) => `- ${item}`),
    ...lines.slice(end),
  ];
  return rebuilt.join("\n");
}

let updated = 0;
for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const path = join(dir, file);
  let fm = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const fmEnd = fm.indexOf("\n---\n", 4);
  if (fmEnd < 0) continue;

  let front = fm.slice(0, fmEnd);
  const body = fm.slice(fmEnd);

  const before = front;
  front = patchListSection(front, "scenarios", normalizeScenarios);
  front = patchListSection(front, "tags", normalizeTags);

  if (front !== before) {
    writeFileSync(path, `${front}${body}`, "utf8");
    updated += 1;
  }
}

console.log(`Updated scenarios/tags in ${updated} recipe files.`);
