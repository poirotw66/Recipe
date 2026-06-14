const panel = document.querySelector("[data-recipe-filter-panel]");
const keywordInput = document.querySelector("[data-recipe-keyword]");
const resultCount = document.querySelector("[data-recipe-result-count]");
const emptyState = document.querySelector("[data-recipe-empty]");
const recipeCards = Array.from(document.querySelectorAll("[data-recipe-search]"));
const filterButtons = Array.from(document.querySelectorAll("[data-filter-group]"));
const resetButton = document.querySelector("[data-reset-filters]");

if (
  panel instanceof HTMLElement &&
  keywordInput instanceof HTMLInputElement &&
  resultCount instanceof HTMLElement &&
  emptyState instanceof HTMLElement &&
  recipeCards.length > 0 &&
  filterButtons.length > 0
) {
  const filterAll = panel.dataset.filterAll ?? "all";
  const resultCountAll = panel.dataset.resultCountAll ?? "{count} recipes";
  const resultCountFiltered = panel.dataset.resultCountFiltered ?? "{filters} — {count} recipes";
  const labelKeyword = panel.dataset.filterLabelKeyword ?? "Keyword";
  const labelCategory = panel.dataset.filterLabelCategory ?? "Type";
  const labelTime = panel.dataset.filterLabelTime ?? "Time";
  const labelTool = panel.dataset.filterLabelTool ?? "Tool";

  const normalize = (value) => value.trim().toLowerCase();
  const state = {
    keyword: "",
    category: filterAll,
    time: filterAll,
    tool: filterAll
  };

  const timeMatched = (timeValue, totalTime) => {
    if (timeValue === filterAll) return true;
    const maxMinutes = Number(timeValue);
    if (Number.isNaN(maxMinutes)) return true;
    return totalTime <= maxMinutes;
  };

  const markActiveChip = () => {
    filterButtons.forEach((button) => {
      if (!(button instanceof HTMLElement)) return;
      const group = button.dataset.filterGroup;
      const value = button.dataset.filterValue ?? "";
      const activeValue = group ? state[group] : "";
      const active = value === activeValue;
      button.classList.toggle("chip-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (resetButton instanceof HTMLButtonElement) {
      const hasActiveFilters =
        state.keyword.length > 0 ||
        state.category !== filterAll ||
        state.time !== filterAll ||
        state.tool !== filterAll;
      resetButton.hidden = !hasActiveFilters;
    }
  };

  const syncParams = () => {
    const url = new URL(window.location.href);
    if (state.keyword.length > 0) {
      url.searchParams.set("keyword", state.keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    if (state.category !== filterAll) {
      url.searchParams.set("category", state.category);
    } else {
      url.searchParams.delete("category");
    }
    if (state.time !== filterAll) {
      url.searchParams.set("time", state.time);
    } else {
      url.searchParams.delete("time");
    }
    if (state.tool !== filterAll) {
      url.searchParams.set("tool", state.tool);
    } else {
      url.searchParams.delete("tool");
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  };

  const formatTemplate = (template, values) =>
    Object.entries(values).reduce(
      (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
      template
    );

  const applyFilter = () => {
    const keyword = normalize(state.keyword);
    let visibleCount = 0;

    recipeCards.forEach((card) => {
      const haystack = (card.getAttribute("data-recipe-search") ?? "").toLowerCase();
      const category = card.getAttribute("data-recipe-category") ?? "";
      const totalTime = Number(card.getAttribute("data-recipe-time") ?? "0");
      const equipment = card.getAttribute("data-recipe-equipment") ?? "";

      const keywordMatched = keyword.length === 0 || haystack.includes(keyword);
      const categoryMatched = state.category === filterAll || category === state.category;
      const timeFilterMatched = timeMatched(state.time, totalTime);
      const toolMatched = state.tool === filterAll || equipment.includes(state.tool);
      const matched = keywordMatched && categoryMatched && timeFilterMatched && toolMatched;

      card.classList.toggle("is-hidden", !matched);
      if (matched) visibleCount += 1;
    });

    const activeFilters = [];
    if (state.keyword.length > 0) activeFilters.push(`${labelKeyword}「${state.keyword}」`);
    if (state.category !== filterAll) activeFilters.push(`${labelCategory}「${state.category}」`);
    if (state.time !== filterAll) {
      const timeButton = filterButtons.find(
        (button) =>
          button instanceof HTMLElement &&
          button.dataset.filterGroup === "time" &&
          button.dataset.filterValue === state.time
      );
      const timeLabel =
        timeButton instanceof HTMLElement ? timeButton.textContent?.trim() ?? state.time : state.time;
      activeFilters.push(`${labelTime}「${timeLabel}」`);
    }
    if (state.tool !== filterAll) activeFilters.push(`${labelTool}「${state.tool}」`);

    resultCount.textContent =
      activeFilters.length > 0
        ? formatTemplate(resultCountFiltered, {
            filters: activeFilters.join("、"),
            count: visibleCount
          })
        : formatTemplate(resultCountAll, { count: recipeCards.length });
    emptyState.hidden = visibleCount > 0;
    markActiveChip();
  };

  const params = new URLSearchParams(window.location.search);
  state.keyword = params.get("keyword")?.trim() ?? "";
  state.category = params.get("category")?.trim() || filterAll;
  state.time = params.get("time")?.trim() || filterAll;
  state.tool = params.get("tool")?.trim() || filterAll;
  keywordInput.value = state.keyword;
  applyFilter();

  keywordInput.addEventListener("input", () => {
    state.keyword = keywordInput.value.trim();
    applyFilter();
    syncParams();
  });

  filterButtons.forEach((button) => {
    if (!(button instanceof HTMLElement)) return;
    button.addEventListener("click", () => {
      const group = button.dataset.filterGroup;
      const value = button.dataset.filterValue;
      if (!group || !value) return;
      state[group] = value;
      applyFilter();
      syncParams();
    });
  });

  if (resetButton instanceof HTMLButtonElement) {
    resetButton.addEventListener("click", () => {
      state.keyword = "";
      state.category = filterAll;
      state.time = filterAll;
      state.tool = filterAll;
      keywordInput.value = "";
      applyFilter();
      syncParams();
      keywordInput.focus();
    });
  }
}
