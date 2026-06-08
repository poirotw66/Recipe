import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd();

const ZH_RECIPE_DIR = join(root, "src/content/recipes");

function listZhRecipeSlugs() {
  return readdirSync(ZH_RECIPE_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

const ZH_SLUGS = listZhRecipeSlugs();
const ALLOWED_SLUGS = new Set(ZH_SLUGS);

const LOCALES = [
  { code: "en", folder: "recipes-en" },
  { code: "ja", folder: "recipes-ja" },
  { code: "ko", folder: "recipes-ko" }
];

function splitFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return match[1];
}

function countStepsInYaml(yamlText) {
  const lines = yamlText.split(/\r?\n/);
  let inSteps = false;
  let count = 0;
  for (const line of lines) {
    if (line.trim() === "steps:") {
      inSteps = true;
      continue;
    }
    if (!inSteps) {
      continue;
    }
    if (/^\s*-\s/.test(line)) {
      count += 1;
      continue;
    }
    if (count > 0 && /^\s{2,}\S/.test(line)) {
      continue;
    }
    if (line.trim() !== "" && /^[a-zA-Z]/.test(line.trim())) {
      break;
    }
  }
  return count;
}

function parseFrontmatterLoose(yamlText) {
  const recipeId = yamlText.match(/^recipeId:\s*(\S+)/m)?.[1];
  const stepCount = countStepsInYaml(yamlText);
  const coverImage = yamlText.match(/^coverImage:\s*(\S+)/m)?.[1];
  return { recipeId, stepCount, coverImage };
}

function countZhSteps(slug) {
  const zh = readFileSync(join(ZH_RECIPE_DIR, `${slug}.md`), "utf8");
  const yaml = splitFrontmatter(zh);
  if (!yaml) return 0;
  return countStepsInYaml(yaml);
}

function verifySlugTranslations(slug) {
  const zhPath = join(ZH_RECIPE_DIR, `${slug}.md`);
  if (!existsSync(zhPath)) {
    console.error(`Missing zh recipe: ${slug}`);
    process.exit(1);
  }
  const zhSteps = countZhSteps(slug);
  if (zhSteps < 3) {
    console.error(`${slug}: zh steps must be >= 3`);
    process.exit(1);
  }

  for (let i = 0; i < LOCALES.length; i++) {
    const { folder } = LOCALES[i];
    const path = join(root, "src/content", folder, `${slug}.md`);
    if (!existsSync(path)) {
      console.error(`spec-018: missing ${folder}/${slug}.md`);
      process.exit(1);
    }
    const raw = readFileSync(path, "utf8");
    const yaml = splitFrontmatter(raw);
    if (!yaml) {
      console.error(`${folder}/${slug}: missing frontmatter`);
      process.exit(1);
    }
    const meta = parseFrontmatterLoose(yaml);
    if (meta.recipeId !== slug) {
      console.error(`${folder}/${slug}: recipeId must be ${slug}, got ${meta.recipeId}`);
      process.exit(1);
    }
    if (meta.stepCount !== zhSteps) {
      console.error(`${folder}/${slug}: step count ${meta.stepCount} !== zh ${zhSteps}`);
      process.exit(1);
    }
    if (!meta.coverImage?.startsWith("/images/")) {
      console.error(`${folder}/${slug}: invalid coverImage`);
      process.exit(1);
    }
    const imagePath = join(root, "public", meta.coverImage.replace(/^\//, ""));
    if (!existsSync(imagePath)) {
      console.error(`${folder}/${slug}: cover file missing ${meta.coverImage}`);
      process.exit(1);
    }
  }
}

for (const slug of ZH_SLUGS) {
  verifySlugTranslations(slug);
}

for (const { folder } of LOCALES) {
  const dir = join(root, "src/content", folder);
  if (!existsSync(dir)) {
    console.error(`Missing content dir ${folder}`);
    process.exit(1);
  }
  const extra = readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
  for (const slug of extra) {
    if (!ALLOWED_SLUGS.has(slug)) {
      console.error(`${folder}: unexpected slug ${slug} (no zh recipe)`);
      process.exit(1);
    }
  }
}

console.log(`Recipe i18n pairing checks passed (${ZH_SLUGS.length} zh × 3 locales).`);
