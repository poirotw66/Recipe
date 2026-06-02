const fridgeForm = document.querySelector("[data-fridge-form]");
const fridgeInput = document.querySelector("[data-fridge-input]");
const fridgeError = document.querySelector("[data-fridge-error]");
const fridgeEmptyState = document.querySelector("[data-fridge-empty]");
const fridgeNoResults = document.querySelector("[data-fridge-no-results]");
const fridgeResults = document.querySelector("[data-fridge-results]");
const fridgeClearButton = document.querySelector("[data-fridge-clear]");
const fridgeSummaryCopy = document.querySelector("[data-result-summary-copy]");
const fridgeNoResultCopy = document.querySelector("[data-no-result-copy]");
const fridgeResultGrid = document.querySelector("[data-result-grid]");
const quickIngredientButtons = document.querySelectorAll("[data-quick-ingredient]");
const preferenceButtons = document.querySelectorAll("[data-preference]");
const dataElement = document.querySelector("#fridge-tool-data");

const toolData = dataElement ? JSON.parse(dataElement.textContent ?? "{}") : { ingredients: [], recipes: [], preferences: [] };
const selectedPreferences = new Set();

const splitIngredientInput = (value) =>
  value
    .split(/[,\n\u3001\uFF0C/]+/)
    .map((item) => item.trim())
    .filter(Boolean);

const normalizeText = (value) => value.trim().toLowerCase();

const ingredientLookup = (toolData.ingredients ?? []).map((ingredient) => {
  const names = [ingredient.name, ...(ingredient.aliases ?? [])].map((item) => item.trim()).filter(Boolean);

  return {
    ...ingredient,
    names,
    normalizedNames: names.map(normalizeText)
  };
});

const resolveInputIngredients = (tokens) => {
  const matched = [];
  const unresolved = [];

  tokens.forEach((token) => {
    const normalizedToken = normalizeText(token);

    if (!normalizedToken) {
      return;
    }

    const found = ingredientLookup.find((ingredient) =>
      ingredient.normalizedNames.some((name) => name === normalizedToken || name.includes(normalizedToken) || normalizedToken.includes(name))
    );

    if (found) {
      if (!matched.some((item) => item.slug === found.slug)) {
        matched.push(found);
      }
      return;
    }

    unresolved.push(token);
  });

  return { matched, unresolved };
};

const preferenceMatchers = {
  quick: (recipe) => recipe.totalTime <= 15 || recipe.scenarios.includes("10 分鐘料理"),
  protein: (recipe) => (recipe.protein ?? 0) >= 20 || recipe.scenarios.includes("高蛋白料理"),
  electricPot: (recipe) => recipe.equipment.includes("電鍋"),
  airFryer: (recipe) => recipe.equipment.includes("氣炸鍋")
};

const preferenceLabels = Object.fromEntries((toolData.preferences ?? []).map((item) => [item.key, item.label]));

const rankRecipes = (matchedIngredients) =>
  (toolData.recipes ?? [])
    .map((recipe) => {
      const matchedIngredientNames = matchedIngredients
        .map((ingredient) => ingredient.name)
        .filter((name) => recipe.ingredients.includes(name));
      const missingIngredients = recipe.ingredients.filter((item) => !matchedIngredientNames.includes(item));
      const matchedPreferences = Array.from(selectedPreferences)
        .filter((preference) => preferenceMatchers[preference]?.(recipe))
        .map((preference) => preferenceLabels[preference] ?? preference);
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
    })
    .filter((recipe) => recipe.matchedIngredientNames.length > 0)
    .sort((left, right) =>
      right.score - left.score ||
      right.matchedIngredientNames.length - left.matchedIngredientNames.length ||
      left.missingIngredients.length - right.missingIngredients.length ||
      left.totalTime - right.totalTime
    );

const syncClearButton = () => {
  if (!(fridgeInput instanceof HTMLTextAreaElement) || !(fridgeClearButton instanceof HTMLElement)) {
    return;
  }

  fridgeClearButton.hidden = fridgeInput.value.trim().length === 0;
};

const renderRecipeCard = (recipe) => {
  const matchedLabel = recipe.matchedIngredientNames.length > 0 ? recipe.matchedIngredientNames.join("、") : "沒有命中";
  const missingLabel = recipe.missingIngredients.length > 0 ? recipe.missingIngredients.join("、") : "不缺主食材";
  const preferenceMarkup = recipe.matchedPreferences.length > 0
    ? `<div class="chip-row">${recipe.matchedPreferences.map((item) => `<span class="chip">${item}</span>`).join("")}</div>`
    : "";

  const imageAlt = `${recipe.title}成品圖`;
  const imageMarkup = recipe.coverImage
    ? `<div class="recipe-image"><img src="${recipe.coverImage}" alt="${imageAlt}" loading="lazy" decoding="async" width="800" height="600" /></div>`
    : `<div class="recipe-image" aria-hidden="true"></div>`;

  return `
    <article class="card recipe-card fridge-result-card">
      <a class="recipe-card__link" href="/recipes/${recipe.slug}/">
        ${imageMarkup}
        <div class="card-body">
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <div class="meta-row">
            <span class="chip note">${recipe.totalTime} 分鐘</span>
            <span class="chip">${recipe.difficulty}</span>
            ${recipe.protein ? `<span class="chip">蛋白質 ${recipe.protein}g</span>` : ""}
          </div>
          <div class="chip-row">
            <span class="chip note">命中：${matchedLabel}</span>
            <span class="chip">還缺：${missingLabel}</span>
          </div>
          ${preferenceMarkup}
        </div>
      </a>
    </article>
  `;
};

const showNoResults = (copy) => {
  if (!(fridgeEmptyState instanceof HTMLElement) || !(fridgeNoResults instanceof HTMLElement) || !(fridgeResults instanceof HTMLElement)) {
    return;
  }

  fridgeEmptyState.hidden = true;
  fridgeResults.hidden = true;
  fridgeNoResults.hidden = false;

  if (fridgeNoResultCopy instanceof HTMLElement) {
    fridgeNoResultCopy.textContent = copy;
  }

  if (fridgeResultGrid instanceof HTMLElement) {
    fridgeResultGrid.innerHTML = "";
  }
};

const showResults = (summary, recipes) => {
  if (
    !(fridgeEmptyState instanceof HTMLElement) ||
    !(fridgeNoResults instanceof HTMLElement) ||
    !(fridgeResults instanceof HTMLElement) ||
    !(fridgeSummaryCopy instanceof HTMLElement) ||
    !(fridgeResultGrid instanceof HTMLElement)
  ) {
    return;
  }

  fridgeEmptyState.hidden = true;
  fridgeNoResults.hidden = true;
  fridgeResults.hidden = false;
  fridgeSummaryCopy.textContent = summary;
  fridgeResultGrid.innerHTML = recipes.slice(0, 6).map(renderRecipeCard).join("");
};

const syncPreferenceButtons = () => {
  preferenceButtons.forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const key = button.dataset.preference ?? "";
    const active = selectedPreferences.has(key);
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("chip-active", active);
  });
};

const submitValue = (value) => {
  if (!(fridgeInput instanceof HTMLTextAreaElement) || !(fridgeError instanceof HTMLElement)) {
    return;
  }

  const normalized = value.trim();

  if (!normalized) {
    fridgeError.hidden = false;
    fridgeInput.setAttribute("aria-invalid", "true");
    fridgeInput.focus();
    syncClearButton();
    return;
  }

  const tokens = splitIngredientInput(normalized);
  const { matched, unresolved } = resolveInputIngredients(tokens);

  fridgeInput.value = normalized;
  fridgeError.hidden = true;
  fridgeInput.removeAttribute("aria-invalid");
  syncClearButton();

  const summary = [
    matched.length > 0 ? `已辨識食材：${matched.map((item) => item.name).join("、")}` : "還沒有辨識到可用食材",
    unresolved.length > 0 ? `未辨識：${unresolved.join("、")}` : "",
    selectedPreferences.size > 0
      ? `偏好：${Array.from(selectedPreferences).map((key) => preferenceLabels[key] ?? key).join("、")}`
      : ""
  ]
    .filter(Boolean)
    .join("；");

  const rankedRecipes = rankRecipes(matched);

  if (rankedRecipes.length === 0) {
    showNoResults(
      unresolved.length > 0
        ? `目前沒有找到含有 ${unresolved.join("、")} 的食譜。可以改輸入常見食材，像是雞蛋、豆腐、番茄或雞胸肉。`
        : "目前沒有符合這組食材的食譜。可以再加一個主食材，或回到食譜列表找靈感。"
    );
  } else {
    showResults(summary, rankedRecipes);
  }

  const url = new URL(window.location.href);
  url.searchParams.set("ingredients", normalized);
  if (selectedPreferences.size > 0) {
    url.searchParams.set("preferences", Array.from(selectedPreferences).join(","));
  } else {
    url.searchParams.delete("preferences");
  }
  window.history.replaceState({}, "", url);
};

if (fridgeInput instanceof HTMLTextAreaElement) {
  fridgeInput.addEventListener("input", syncClearButton);
}

fridgeForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!(fridgeInput instanceof HTMLTextAreaElement)) {
    return;
  }

  submitValue(fridgeInput.value);
});

fridgeClearButton?.addEventListener("click", () => {
  if (
    !(fridgeInput instanceof HTMLTextAreaElement) ||
    !(fridgeError instanceof HTMLElement) ||
    !(fridgeEmptyState instanceof HTMLElement) ||
    !(fridgeNoResults instanceof HTMLElement) ||
    !(fridgeResults instanceof HTMLElement)
  ) {
    return;
  }

  fridgeInput.value = "";
  fridgeError.hidden = true;
  fridgeInput.removeAttribute("aria-invalid");
  fridgeEmptyState.hidden = false;
  fridgeNoResults.hidden = true;
  fridgeResults.hidden = true;
  selectedPreferences.clear();
  syncPreferenceButtons();
  syncClearButton();

  const url = new URL(window.location.href);
  url.searchParams.delete("ingredients");
  url.searchParams.delete("preferences");
  window.history.replaceState({}, "", url);
  fridgeInput.focus();
});

quickIngredientButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!(button instanceof HTMLButtonElement) || !(fridgeInput instanceof HTMLTextAreaElement)) {
      return;
    }

    const ingredient = button.dataset.quickIngredient ?? "";
    const currentValues = splitIngredientInput(fridgeInput.value);

    if (!currentValues.includes(ingredient)) {
      currentValues.push(ingredient);
    }

    fridgeInput.value = currentValues.join("、");
    syncClearButton();
    fridgeInput.focus();
  });
});

preferenceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const key = button.dataset.preference ?? "";

    if (!key) {
      return;
    }

    if (selectedPreferences.has(key)) {
      selectedPreferences.delete(key);
    } else {
      selectedPreferences.add(key);
    }

    syncPreferenceButtons();
  });
});

const url = new URL(window.location.href);
const initialIngredients = url.searchParams.get("ingredients");
const initialPreferences = url.searchParams.get("preferences");

if (initialPreferences) {
  initialPreferences
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .forEach((item) => selectedPreferences.add(item));
}

syncPreferenceButtons();

if (initialIngredients && fridgeInput instanceof HTMLTextAreaElement) {
  fridgeInput.value = initialIngredients;
  submitValue(initialIngredients);
} else {
  syncClearButton();
}
