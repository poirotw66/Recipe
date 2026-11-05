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
