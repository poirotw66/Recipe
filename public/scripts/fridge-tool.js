const fridgeForm = document.querySelector("[data-fridge-form]");
const fridgeInput = document.querySelector("[data-fridge-input]");
const fridgeError = document.querySelector("[data-fridge-error]");
const fridgeEmptyState = document.querySelector("[data-fridge-empty]");
const fridgeResults = document.querySelector("[data-fridge-results]");
const fridgeClearButton = document.querySelector("[data-fridge-clear]");
const fridgeSummaryCopy = document.querySelector("[data-result-summary-copy]");
const quickIngredientButtons = document.querySelectorAll("[data-quick-ingredient]");

const syncClearButton = () => {
  if (!(fridgeInput instanceof HTMLTextAreaElement) || !(fridgeClearButton instanceof HTMLElement)) {
    return;
  }

  fridgeClearButton.hidden = fridgeInput.value.trim().length === 0;
};

const showResults = (value) => {
  if (
    !(fridgeEmptyState instanceof HTMLElement) ||
    !(fridgeResults instanceof HTMLElement) ||
    !(fridgeSummaryCopy instanceof HTMLElement)
  ) {
    return;
  }

  fridgeEmptyState.hidden = true;
  fridgeResults.hidden = false;
  fridgeSummaryCopy.textContent = `你輸入的食材：${value}。目前先顯示 placeholder 推薦，下一階段會換成真正的比對結果。`;
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

  fridgeInput.value = normalized;
  fridgeError.hidden = true;
  fridgeInput.removeAttribute("aria-invalid");
  showResults(normalized);
  syncClearButton();

  const url = new URL(window.location.href);
  url.searchParams.set("ingredients", normalized);
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
  if (!(fridgeInput instanceof HTMLTextAreaElement) || !(fridgeError instanceof HTMLElement)) {
    return;
  }

  fridgeInput.value = "";
  fridgeError.hidden = true;
  fridgeInput.removeAttribute("aria-invalid");
  syncClearButton();
  fridgeInput.focus();
});

quickIngredientButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!(button instanceof HTMLButtonElement) || !(fridgeInput instanceof HTMLTextAreaElement)) {
      return;
    }

    const ingredient = button.dataset.quickIngredient ?? "";
    const currentValues = fridgeInput.value
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (!currentValues.includes(ingredient)) {
      currentValues.push(ingredient);
    }

    fridgeInput.value = currentValues.join("、");
    syncClearButton();
    fridgeInput.focus();
  });
});

const initialIngredients = new URL(window.location.href).searchParams.get("ingredients");
if (initialIngredients && fridgeInput instanceof HTMLTextAreaElement) {
  fridgeInput.value = initialIngredients;
  submitValue(initialIngredients);
} else {
  syncClearButton();
}
