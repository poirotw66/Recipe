const normalizeText = (value) => value.trim().toLowerCase();

export const splitIngredientInput = (value) =>
  value
    .split(/[,\n\u3001\uFF0C/]+/)
    .map((item) => item.trim())
    .filter(Boolean);

export const createIngredientLookup = (ingredients) => {
  const entries = [];

  for (const ingredient of ingredients) {
    const names = [ingredient.name, ...(ingredient.aliases ?? [])]
      .map((item) => item.trim())
      .filter(Boolean);

    entries.push({
      ...ingredient,
      names,
      normalizedNames: names.map(normalizeText)
    });
  }

  return entries;
};

export const resolveInputIngredients = (tokens, ingredientLookup) => {
  const matched = [];
  const unresolved = [];

  for (const token of tokens) {
    const normalizedToken = normalizeText(token);

    if (!normalizedToken) {
      continue;
    }

    const found = ingredientLookup.find((ingredient) =>
      ingredient.normalizedNames.some((name) => name === normalizedToken || name.includes(normalizedToken) || normalizedToken.includes(name))
    );

    if (found) {
      if (!matched.some((item) => item.slug === found.slug)) {
        matched.push(found);
      }
      continue;
    }

    unresolved.push(token);
  }

  return { matched, unresolved };
};

const preferenceMatchers = {
  quick: (recipe) => recipe.totalTime <= 15 || recipe.scenarios.includes("10 分鐘料理"),
  protein: (recipe) => (recipe.protein ?? 0) >= 20 || recipe.scenarios.includes("高蛋白料理"),
  electricPot: (recipe) => recipe.equipment.includes("電鍋"),
  airFryer: (recipe) => recipe.equipment.includes("氣炸鍋")
};

export const preferenceDefinitions = [
  { key: "quick", label: "10 分鐘", matcher: preferenceMatchers.quick },
  { key: "protein", label: "高蛋白", matcher: preferenceMatchers.protein },
  { key: "electricPot", label: "電鍋", matcher: preferenceMatchers.electricPot },
  { key: "airFryer", label: "氣炸鍋", matcher: preferenceMatchers.airFryer }
];

export const preferenceMatchesRecipe = (recipe, preferenceKey, config) => {
  if (!config || !preferenceKey) {
    return false;
  }

  const rule = config[preferenceKey];
  if (!rule) {
    return false;
  }

  if (rule.maxTime !== undefined && recipe.totalTime <= rule.maxTime) {
    return true;
  }
  if (rule.minProtein !== undefined && (recipe.protein ?? 0) >= rule.minProtein) {
    return true;
  }
  if (rule.scenarios?.some((scenario) => recipe.scenarios?.includes(scenario))) {
    return true;
  }
  if (rule.equipment?.some((tool) => recipe.equipment?.includes(tool))) {
    return true;
  }

  return false;
};

export const scoreRecipeForFridge = (
  recipe,
  matchedIngredients,
  selectedPreferences = [],
  options = {}
) => {
  const { preferenceConfig, preferenceLabels } = options;
  const recipeSlugs = recipe.ingredientSlugs ?? [];
  const useSlugs = recipeSlugs.length > 0;
  const matchedSlugs = new Set(matchedIngredients.map((item) => item.slug));

  const matchedOnRecipe = matchedIngredients.filter((ingredient) =>
    useSlugs ? recipeSlugs.includes(ingredient.slug) : recipe.ingredients?.includes(ingredient.name)
  );
  const matchedIngredientNames = matchedOnRecipe.map((item) => item.name);

  const slugToName = options.slugToName ?? {};
  const missingIngredients = useSlugs
    ? recipeSlugs
        .filter((slug) => !matchedSlugs.has(slug))
        .map((slug) => slugToName[slug] ?? slug)
    : (recipe.ingredients ?? []).filter((item) => !matchedIngredientNames.includes(item));

  const matchedPreferences = selectedPreferences
    .filter((key) => {
      if (preferenceConfig) {
        return preferenceMatchesRecipe(recipe, key, preferenceConfig);
      }
      const definition = preferenceDefinitions.find((item) => item.key === key);
      return definition?.matcher(recipe) ?? false;
    })
    .map((key) => preferenceLabels?.[key] ?? preferenceDefinitions.find((item) => item.key === key)?.label ?? key);

  const score =
    matchedIngredientNames.length * 100 -
    missingIngredients.length * 12 +
    matchedPreferences.length * 18 -
    recipe.totalTime;

  return {
    ...recipe,
    matchedIngredientNames,
    missingIngredients,
    matchedPreferences,
    score
  };
};

export const rankRecipesForFridge = (recipes, matchedIngredients, selectedPreferences = [], options = {}) =>
  recipes
    .map((recipe) => scoreRecipeForFridge(recipe, matchedIngredients, selectedPreferences, options))
    .filter((recipe) => recipe.matchedIngredientNames.length > 0)
    .sort((left, right) =>
      right.score - left.score ||
      right.matchedIngredientNames.length - left.matchedIngredientNames.length ||
      left.missingIngredients.length - right.missingIngredients.length ||
      left.totalTime - right.totalTime
    );

export const summarizeMatches = (matchedIngredients, unresolvedIngredients, selectedPreferences = []) => {
  const matchedLabel = matchedIngredients.length > 0
    ? matchedIngredients.map((item) => item.name).join("、")
    : "沒有命中食材";
  const unresolvedLabel = unresolvedIngredients.length > 0
    ? `，未辨識：${unresolvedIngredients.join("、")}`
    : "";
  const preferenceLabel = selectedPreferences.length > 0
    ? `，偏好：${preferenceDefinitions
        .filter((item) => selectedPreferences.includes(item.key))
        .map((item) => item.label)
        .join("、")}`
    : "";

  return `已辨識食材：${matchedLabel}${unresolvedLabel}${preferenceLabel}`;
};
