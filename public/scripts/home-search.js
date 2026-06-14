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

  const fridgePath = homeSearchForm.dataset.fridgePath ?? "/tools/fridge-recipe/";
  const errorEmpty = homeSearchForm.dataset.errorEmpty ?? "請先輸入 1 到 3 樣食材。";
  const errorMax = homeSearchForm.dataset.errorMax ?? "首頁搜尋最多 3 樣食材，請精簡後再試。";
  const tokens = splitIngredientInput(input.value);

  if (tokens.length === 0) {
    homeSearchError.textContent = errorEmpty;
    homeSearchError.hidden = false;
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  if (tokens.length > 3) {
    homeSearchError.textContent = errorMax;
    homeSearchError.hidden = false;
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  homeSearchError.hidden = true;
  input.removeAttribute("aria-invalid");
  const separator = fridgePath.startsWith("/en/") || fridgePath.startsWith("/ja/") || fridgePath.startsWith("/ko/") ? "," : "、";
  const basePath = fridgePath.endsWith("/") ? fridgePath.slice(0, -1) : fridgePath;
  window.location.href = `${basePath}?ingredients=${encodeURIComponent(tokens.join(separator))}#fridge-results`;
});
