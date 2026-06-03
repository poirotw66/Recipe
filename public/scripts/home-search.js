const homeSearchForm = document.querySelector("[data-home-search]");
const homeSearchError = document.querySelector("[data-home-search-error]");

const splitIngredientInput = (value) =>
  value
    .split(/[,\n\u3001\uFF0C/]+/)
    .map((item) => item.trim())
    .filter(Boolean);

homeSearchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = homeSearchForm.querySelector("[data-home-search-input]");

  if (!(input instanceof HTMLInputElement) || !(homeSearchError instanceof HTMLElement)) {
    return;
  }

  const tokens = splitIngredientInput(input.value);

  if (tokens.length === 0) {
    homeSearchError.textContent = "請先輸入 1 到 3 樣食材。";
    homeSearchError.hidden = false;
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  if (tokens.length > 3) {
    homeSearchError.textContent = "首頁搜尋最多 3 樣食材，請精簡後再試。";
    homeSearchError.hidden = false;
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  homeSearchError.hidden = true;
  input.removeAttribute("aria-invalid");
  window.location.href = `/tools/fridge-recipe?ingredients=${encodeURIComponent(tokens.join("、"))}#fridge-results`;
});
