import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const menuUrl = "https://www.dubuhouse.com.tw/Menu.html";
const outputPath = join(root, "src/data/dubu-house-menu.json");
const docPath = join(root, "docs/content/dubu-house-menu-replication.md");

const categoryMeta = {
  1: { slug: "soondubu", name: "韓式嫩豆腐煲系列", group: "main" },
  2: { slug: "stone-pot-rice", name: "韓式石鍋飯系列", group: "main" },
  3: { slug: "appetizer", name: "精選前菜", group: "classic" },
  4: { slug: "dessert", name: "甜品", group: "classic" },
  5: { slug: "beverage", name: "飲品", group: "skip" },
  6: { slug: "gift", name: "伴手禮", group: "skip" },
  7: { slug: "specialty", name: "特色料理", group: "classic" },
  8: { slug: "chef-recommendation", name: "主廚推薦", group: "classic" },
  16: { slug: "kings-table", name: "王的餐桌", group: "seasonal" },
  17: { slug: "rose-coffee", name: "有機玫X深焙咖", group: "skip" },
  18: { slug: "truffle-tteok-season", name: "黑鑽松露年糕季", group: "seasonal" }
};

const slugOverrides = {
  嫩豆腐煲: "dh-classic-soondubu",
  韓式石鍋飯: "dh-classic-stone-pot-rice",
  鴨賞石鍋飯: "dh-duck-jerky-stone-pot-rice",
  黃金雞石鍋飯: "dh-golden-chicken-stone-pot-rice",
  吻仔魚石鍋飯: "dh-whitebait-stone-pot-rice",
  鮮蚵韓式石鍋飯: "dh-oyster-stone-pot-rice",
  泡菜嫩豆腐煲: "dh-kimchi-soondubu",
  泡菜鮮菇嫩豆腐煲: "dh-kimchi-mushroom-soondubu",
  起司泡菜鮮菇嫩豆腐煲: "dh-cheese-kimchi-mushroom-soondubu",
  人蔘砂鍋雞: "dh-ginseng-chicken-clay-pot",
  韓國人蔘雞火鍋: "dh-ginseng-chicken-hot-pot",
  肯瓊醬韓式炸雞: "dh-cajun-korean-fried-chicken",
  洋蔥白醬韓式炸雞: "dh-creamy-onion-korean-fried-chicken",
  蜂蜜蒜味韓式炸雞: "dh-honey-garlic-korean-fried-chicken",
  原味韓式炸雞: "dh-original-korean-fried-chicken",
  辣味韓式炸雞: "dh-spicy-korean-fried-chicken",
  醬味韓式炸雞: "dh-bbq-korean-fried-chicken",
  韓式起司烘蛋捲: "dh-korean-cheese-egg-roll",
  "蟹味韓式起司烘蛋捲": "dh-crab-cheese-egg-roll",
  "韓式宮廷炒年糕(牛&豬)": "dh-royal-stir-fried-rice-cake",
  韓式宮廷炒年糕: "dh-royal-stir-fried-rice-cake",
  松露韓式起司烘蛋捲: "dh-truffle-cheese-egg-roll"
};

const usedSlugs = new Set();

function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "");
}

function decodeHtml(value) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyEnglish(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function buildSlug(displayName, englishName) {
  if (slugOverrides[displayName]) {
    return slugOverrides[displayName];
  }

  const englishSlug = slugifyEnglish(englishName || displayName);
  let base = englishSlug ? `dh-${englishSlug}` : `dh-item-${Buffer.from(displayName).toString("hex").slice(0, 8)}`;
  if (!usedSlugs.has(base)) {
    return base;
  }

  const suffix = slugifyEnglish(displayName.replace(/韓式|嫩豆腐煲|石鍋飯|炸雞/g, ""));
  let candidate = suffix ? `${base}-${suffix}` : `${base}-variant`;
  let index = 2;
  while (usedSlugs.has(candidate)) {
    candidate = `${base}-${suffix || "variant"}-${index}`;
    index += 1;
  }
  return candidate;
}

function normalizeDishName(value) {
  return value
    .replace(/-300x300px-72dpi/gi, "")
    .replace(/\(吻仔魚\)/g, "（吻仔魚）")
    .replace(/-$/g, "")
    .trim();
}

function parseDishBlocks(sectionSource) {
  const itemPattern =
    /<li class=\\"liItem\\">([\s\S]*?)<\/li>/g;
  const dishes = [];
  let match;

  while ((match = itemPattern.exec(sectionSource)) !== null) {
    const block = match[1];
    const titleMatch = block.match(/<div class=\\"divLiTitle\\">([^<]+)<\/div>/);
    const englishMatch = block.match(/<div class=\\"divLiTitle2\\">([^<]+)/);
    const optionsMatch = block.match(/<div class=\\"divLiText\\">([^<]+)<\/div>/);
    const descriptionMatch = block.match(/<div class=\\"divLiText3\\">([^<]+)<\/div>/);
    const imgMatch = block.match(/alt=\\"([^"]+)\\"/);

    const displayName = normalizeDishName(decodeHtml(titleMatch?.[1] || imgMatch?.[1] || ""));
    if (!displayName || displayName.includes("組合餐") || displayName.includes("專屬")) {
      continue;
    }

    const englishName = decodeHtml(englishMatch?.[1] || "");
    const options = decodeHtml(optionsMatch?.[1] || "");
    const description = decodeHtml(descriptionMatch?.[1] || "");

    dishes.push({
      name: displayName,
      englishName,
      options,
      description,
      vegetarian: /蔬食/.test(block) || /可做蔬食/.test(options),
      spicy: /辣/.test(displayName) || /Spicy|매운/.test(block)
    });
  }

  return dishes;
}

function parseMenuSource(source) {
  const activeSource = stripComments(source);
  const getItemStart = activeSource.indexOf("function GetItem(m, p)");
  const getItemEnd = activeSource.indexOf("} else if (m == 2)", getItemStart);
  if (getItemStart < 0 || getItemEnd < 0) {
    throw new Error("Unable to locate GetItem() in Dubu House menu source.");
  }

  const body = activeSource.slice(getItemStart, getItemEnd);
  const sectionPattern = /(?:else )?if \(p == (\d+)\)\s*\{([\s\S]*?)(?=(?:else )?if \(p == \d+\)|$)/g;
  const categories = [];
  const seenNames = new Set();
  usedSlugs.clear();

  let match;
  while ((match = sectionPattern.exec(body)) !== null) {
    const pageId = Number(match[1]);
    const meta = categoryMeta[pageId];
    if (!meta || meta.group === "skip") {
      continue;
    }

    const titleMatch = match[2].match(/\.html\("([^"<]+)/);
    const sectionName = titleMatch ? titleMatch[1].replace(/ \(圖片僅供參考.*$/, "") : meta.name;
    const dishes = parseDishBlocks(match[2])
      .filter((dish) => {
        if (seenNames.has(dish.name)) {
          return false;
        }
        seenNames.add(dish.name);
        return true;
      })
      .map((dish) => {
        const components = [dish.options, dish.description]
          .filter(Boolean)
          .join("；")
          .replace(/\s+/g, " ")
          .trim();

        return {
          name: dish.name,
          englishName: dish.englishName,
          components: components || dish.name,
          slug: (() => {
            const slug = buildSlug(dish.name, dish.englishName);
            usedSlugs.add(slug);
            return slug;
          })(),
          vegetarian: dish.vegetarian,
          spicy: dish.spicy
        };
      });

    if (!dishes.length) {
      continue;
    }

    categories.push({
      slug: meta.slug,
      name: sectionName,
      group: meta.group,
      items: dishes
    });
  }

  return categories;
}

function buildTopSignatures(categories) {
  const preferred = [
    "嫩豆腐煲",
    "打爆起司年糕嫩豆腐煲",
    "肯瓊醬韓式炸雞",
    "韓式金絲豆腐捲",
    "韓式爆漿黑糖餅",
    "韓式石鍋飯"
  ];
  const allItems = categories.flatMap((category) => category.items);
  return preferred
    .map((name) => allItems.find((item) => item.name === name))
    .filter(Boolean)
    .slice(0, 6);
}

function buildMarkdown(menu) {
  const lines = [
    "# 涓豆腐 Dubu House — 完整菜單與還原規格",
    "",
    "> 更新日期：2026-06-03",
    "> 專區：`/restaurant-replicas/`",
    `> 食譜前綴：\`dh-*\`（共 **${menu.recipeCount}** 篇）`,
    `> 官方菜單：[dubuhouse.com.tw/Menu.html](${menuUrl})`,
    "",
    "---",
    "",
    "## 品牌與用餐規則",
    "",
    "| 項目 | 內容 |",
    "| --- | --- |",
    "| 品牌 | 涓豆腐 Dubu House（JBSD，韓國嫩豆腐煲連鎖，2008 進台） |",
    "| 類型 | 韓式嫩豆腐煲、石鍋飯、炸雞、韓式前菜與特色料理 |",
    "| 還原重點 | 湯頭辣度、嫩豆腐口感、石鍋鍋巴、韓式醬料比例 |",
    "| 文案 | 使用「參考涓豆腐常見做法」「還原版」，不宣稱官方授權 |",
    "",
    "### 附餐與升級（官網備註）",
    "",
    "- 嫩豆腐煲、石鍋飯可搭配白飯、拉麵或烏龍麵（依門市備註為準）",
    "- 組合餐可升級黃金雞石鍋飯、鴨賞石鍋飯、吻仔魚石鍋飯（加價依官網）",
    "- 飲品、伴手禮、組合餐本批不產生食譜，僅收錄可獨立還原的單品",
    "",
    "## 資料檔",
    "",
    "| 檔案 | 用途 |",
    "| --- | --- |",
    "| [`src/data/dubu-house-menu.json`](../../src/data/dubu-house-menu.json) | 結構化菜單（無價格、含成分） |",
    "| [`scripts/scrape-dubu-house-menu.mjs`](../../scripts/scrape-dubu-house-menu.mjs) | 從官網 Menu.html 同步菜單 |",
    "| [`scripts/generate-dubu-house-recipes.mjs`](../../scripts/generate-dubu-house-recipes.mjs) | 食譜產生器 |",
    "",
    "## TOP 招牌",
    "",
    "| 品項 | 食譜 slug |",
    "| --- | --- |"
  ];

  for (const item of menu.topSignatures) {
    lines.push(`| ${item.name} | \`${item.slug}\` |`);
  }

  let sectionIndex = 1;
  for (const category of menu.categories) {
    lines.push("", "---", "", `## ${sectionIndex}. ${category.name}`, "", "| 品項 | 成分 | slug |", "| --- | --- | --- |");
    for (const item of category.items) {
      lines.push(`| ${item.name} | ${item.components} | \`${item.slug}\` |`);
    }
    sectionIndex += 1;
  }

  lines.push("", "---", "", "## 產生指令", "", "```bash", "node scripts/scrape-dubu-house-menu.mjs", "node scripts/generate-dubu-house-recipes.mjs", "```", "");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const response = await fetch(menuUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch Dubu House menu: ${response.status}`);
  }

  const source = await response.text();
  const categories = parseMenuSource(source);
  const topSignatures = buildTopSignatures(categories);
  const recipeCount = categories.reduce((total, category) => total + category.items.length, 0);

  const menu = {
    brand: "涓豆腐 Dubu House",
    brandEnglish: "JBSD Dubu House",
    menuVersion: "2026-06-03",
    menuUrl,
    recipePrefix: "dh-",
    recipeCount,
    rules: {
      soondubuSides: "白飯、拉麵或烏龍麵（依門市）",
      stonePotUpgrades: "可升級黃金雞、鴨賞、吻仔魚石鍋飯",
      excludedFromRecipes: ["飲品", "伴手禮", "多人組合餐"]
    },
    topSignatures,
    categories
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  mkdirSync(dirname(docPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(menu, null, 2)}\n`, "utf8");
  writeFileSync(docPath, buildMarkdown(menu), "utf8");

  console.log(`Dubu House menu synced: ${recipeCount} dishes across ${categories.length} categories.`);
  console.log(`Wrote ${outputPath}`);
  console.log(`Wrote ${docPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
