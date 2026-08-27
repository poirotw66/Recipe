export const localeDifficulty = {
  en: { 簡單: "Easy", 中等: "Medium", 進階: "Advanced" },
  ja: { 簡單: "かんたん", 中等: "普通", 進階: "むずかしい" },
  ko: { 簡單: "쉬움", 中等: "보통", 進階: "어려움" }
};

export function yamlQuote(value) {
  const stringValue = String(value);
  if (stringValue === "") {
    return '""';
  }

  return /[:#\-\n'[\]{}]/.test(stringValue) || stringValue.includes('"')
    ? `"${stringValue.replace(/"/g, '\\"')}"`
    : stringValue;
}

function renderIngredient(item, locale) {
  const name = item.name && typeof item.name === "object" ? item.name[locale] : item.name;
  const unit = item.unit && typeof item.unit === "object" ? item.unit[locale] : item.unit;
  return [
    `- name: ${yamlQuote(name)}`,
    `  amount: "${String(item.amount)}"`,
    `  unit: ${yamlQuote(unit)}`,
    `  isCore: ${item.isCore ? "true" : "false"}`
  ].join("\n");
}

function renderSeasoning(item, locale) {
  const name = item.name && typeof item.name === "object" ? item.name[locale] : item.name;
  const unit = item.unit && typeof item.unit === "object" ? item.unit[locale] : item.unit;
  return [
    `- name: ${yamlQuote(name)}`,
    `  amount: "${String(item.amount)}"`,
    `  unit: ${yamlQuote(unit)}`
  ].join("\n");
}

function renderFaq(item) {
  return [`- question: ${yamlQuote(item.question)}`, `  answer: ${yamlQuote(item.answer)}`].join("\n");
}

export function renderRecipeMarkdown(recipe, locale, publishedAt) {
  const localeKey = locale === "zh-TW" ? "zh-TW" : locale;
  const lines = [
    "---",
    `title: ${yamlQuote(recipe.title[localeKey])}`,
    ...(locale === "zh-TW" ? [] : [`recipeId: ${recipe.slug}`]),
    `description: ${yamlQuote(recipe.description[localeKey])}`,
    `coverImage: /images/recipes/${recipe.slug}.svg`,
    `servings: ${recipe.servings}`,
    `prepTime: ${recipe.prepTime}`,
    `cookTime: ${recipe.cookTime}`,
    `totalTime: ${recipe.totalTime}`,
    `difficulty: ${yamlQuote(locale === "zh-TW" ? recipe.difficulty : localeDifficulty[locale][recipe.difficulty])}`,
    `calories: ${recipe.calories}`,
    `protein: ${recipe.protein}`,
    `fat: ${recipe.fat}`,
    `carbs: ${recipe.carbs}`,
    `category: "${String(recipe.category[localeKey]).replace(/"/g, '\\"')}"`,
    "scenarios:",
    ...recipe.scenarios[localeKey].map((item) => `- ${yamlQuote(item)}`),
    "equipment:",
    ...recipe.equipment[localeKey].map((item) => `- ${yamlQuote(item)}`),
    "tags:",
    ...recipe.tags[localeKey].map((item) => `- ${yamlQuote(item)}`),
    "restaurantSource:",
    `  restaurant: ${yamlQuote(recipe.restaurantSource.restaurant)}`,
    `  dishName: ${yamlQuote(recipe.restaurantSource.dishName)}`,
    `  region: ${yamlQuote(recipe.restaurantSource.region)}`,
    `intro: ${yamlQuote(recipe.intro[localeKey])}`,
    "steps:",
    ...recipe.steps[localeKey].map((item) => `- ${yamlQuote(item)}`),
    "tips:",
    ...recipe.tips[localeKey].map((item) => `- ${yamlQuote(item)}`),
    `storage: ${yamlQuote(recipe.storage[localeKey])}`,
    "substitutions:",
    ...recipe.substitutions[localeKey].map((item) => `- ${yamlQuote(item)}`),
    "relatedIngredients:",
    ...recipe.relatedIngredients.map((item) => `- ${yamlQuote(item)}`),
    ...(recipe.customAdditions[localeKey].length
      ? ["customAdditions:", ...recipe.customAdditions[localeKey].map((item) => `- ${yamlQuote(item)}`)]
      : ["customAdditions: []"]),
    "faqs:",
    ...recipe.faqs[localeKey].map(renderFaq),
    "featured: false",
    `publishedAt: ${yamlQuote(publishedAt)}`,
    `updatedAt: ${yamlQuote(publishedAt)}`,
    "ingredients:",
    ...recipe.ingredients.map((item) => renderIngredient(item, localeKey)),
    "seasonings:",
    ...recipe.seasonings.map((item) => renderSeasoning(item, localeKey)),
    "---",
    "",
    recipe.body[localeKey],
    ""
  ];

  return `${lines.join("\n")}\n`;
}

export function renderSvg(title, brandLabel) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff8ef" />
      <stop offset="100%" stop-color="#f7e2c8" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)" />
  <rect x="44" y="44" width="712" height="512" rx="28" fill="#fffdfa" stroke="#9a5a2e" stroke-width="3" />
  <text x="84" y="248" fill="#7a4a24" font-family="system-ui, 'Noto Sans TC', sans-serif" font-size="22" font-weight="700">${brandLabel}</text>
  <text x="84" y="322" fill="#2d2620" font-family="system-ui, 'Noto Sans TC', sans-serif" font-size="42" font-weight="800">${title}</text>
  <text x="84" y="386" fill="#75685d" font-family="system-ui, sans-serif" font-size="20">Restaurant-style portion placeholder cover</text>
</svg>
`;
}

export function buildLocaleSteps(zhSteps) {
  return {
    en: zhSteps.map((step) => step.replace(/貳樓|Second Floor Cafe/gi, "Dubu House")),
    ja: zhSteps.map((step) => `（再現手順）${step}`),
    ko: zhSteps.map((step) => `（재현 단계）${step}`)
  };
}
