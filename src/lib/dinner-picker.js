/** Cycle only through recipes that fit the full prep + cook time budget. */
export function pickNextDinner(recipes, maxMinutes, currentSlug) {
  const eligible = recipes.filter((recipe) => recipe.totalTime <= maxMinutes);
  if (!eligible.length) return undefined;
  const currentIndex = eligible.findIndex((recipe) => recipe.slug === currentSlug);
  // Make a changed budget offer a different cooking option when one is available.
  if (currentIndex < 0) {
    return eligible.find((recipe) => recipe.totalTime > maxMinutes - 10) ?? eligible[0];
  }
  return eligible[(currentIndex + 1) % eligible.length];
}

export const dinnerSelectionStorageKey = "bloom-dinner-picker";

/** Restore only a supported budget and an eligible recipe in this locale's candidates. */
export function restoreDinnerSelection(serialized, recipes) {
  if (typeof serialized !== "string") return undefined;
  try {
    const value = JSON.parse(serialized);
    if (!value || Array.isArray(value) || typeof value !== "object"
      || ![10, 20, 30].includes(value.budget) || typeof value.slug !== "string") {
      return undefined;
    }
    const recipe = recipes.find((item) => item.slug === value.slug && item.totalTime <= value.budget);
    return recipe ? { budget: value.budget, slug: recipe.slug } : undefined;
  } catch {
    return undefined;
  }
}
