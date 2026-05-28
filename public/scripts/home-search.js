const homeSearchForm = document.querySelector("[data-home-search]");
const homeSearchError = document.querySelector("[data-home-search-error]");

homeSearchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = homeSearchForm.querySelector('input[name="ingredients"]');

  if (!(input instanceof HTMLInputElement) || !(homeSearchError instanceof HTMLElement)) {
    return;
  }

  const value = input.value.trim();

  if (!value) {
    homeSearchError.hidden = false;
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  homeSearchError.hidden = true;
  input.removeAttribute("aria-invalid");
  window.location.href = `/tools/fridge-recipe?ingredients=${encodeURIComponent(value)}`;
});
