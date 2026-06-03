const keywordInput = document.querySelector("[data-recipe-keyword]");
const resultCount = document.querySelector("[data-recipe-result-count]");
const emptyState = document.querySelector("[data-recipe-empty]");
const recipeCards = Array.from(document.querySelectorAll("[data-recipe-search]"));
const filterButtons = Array.from(document.querySelectorAll("[data-filter-group]"));
const resetButton = document.querySelector("[data-reset-filters]");

if (
  keywordInput instanceof HTMLInputElement &&
  resultCount instanceof HTMLElement &&
  emptyState instanceof HTMLElement &&
  recipeCards.length > 0 &&
  filterButtons.length > 0
) {
  const normalize = (value) => value.trim().toLowerCase();
  const state = {
    keyword: "",
    category: "全部",
    time: "全部",
    tool: "全部"
  };

  const timeMatched = (timeLabel, totalTime) => {
    if (timeLabel === "全部") return true;
    if (timeLabel === "10 分鐘內") return totalTime <= 10;
    if (timeLabel === "15 分鐘內") return totalTime <= 15;
    if (timeLabel === "30 分鐘內") return totalTime <= 30;
    return true;
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
        state.category !== "全部" ||
        state.time !== "全部" ||
        state.tool !== "全部";
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
    if (state.category !== "全部") {
      url.searchParams.set("category", state.category);
    } else {
      url.searchParams.delete("category");
    }
    if (state.time !== "全部") {
      url.searchParams.set("time", state.time);
    } else {
      url.searchParams.delete("time");
    }
    if (state.tool !== "全部") {
      url.searchParams.set("tool", state.tool);
    } else {
      url.searchParams.delete("tool");
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  };

  const applyFilter = () => {
    const keyword = normalize(state.keyword);
    let visibleCount = 0;

    recipeCards.forEach((card) => {
      const haystack = (card.getAttribute("data-recipe-search") ?? "").toLowerCase();
      const category = card.getAttribute("data-recipe-category") ?? "";
      const totalTime = Number(card.getAttribute("data-recipe-time") ?? "0");
      const equipment = card.getAttribute("data-recipe-equipment") ?? "";

      const keywordMatched = keyword.length === 0 || haystack.includes(keyword);
      const categoryMatched = state.category === "全部" || category === state.category;
      const timeFilterMatched = timeMatched(state.time, totalTime);
      const toolMatched = state.tool === "全部" || equipment.includes(state.tool);
      const matched = keywordMatched && categoryMatched && timeFilterMatched && toolMatched;

      card.classList.toggle("is-hidden", !matched);
      if (matched) visibleCount += 1;
    });

    const activeFilters = [];
    if (state.keyword.length > 0) activeFilters.push(`關鍵字「${state.keyword}」`);
    if (state.category !== "全部") activeFilters.push(`類型「${state.category}」`);
    if (state.time !== "全部") activeFilters.push(`時間「${state.time}」`);
    if (state.tool !== "全部") activeFilters.push(`工具「${state.tool}」`);

    resultCount.textContent = activeFilters.length > 0
      ? `${activeFilters.join("、")}共找到 ${visibleCount} 道食譜`
      : `目前共 ${recipeCards.length} 道食譜`;
    emptyState.hidden = visibleCount > 0;
    markActiveChip();
  };

  const params = new URLSearchParams(window.location.search);
  state.keyword = params.get("keyword")?.trim() ?? "";
  state.category = params.get("category")?.trim() || "全部";
  state.time = params.get("time")?.trim() || "全部";
  state.tool = params.get("tool")?.trim() || "全部";
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
      state.category = "全部";
      state.time = "全部";
      state.tool = "全部";
      keywordInput.value = "";
      applyFilter();
      syncParams();
      keywordInput.focus();
    });
  }
}
