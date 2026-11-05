const header = document.querySelector("[data-site-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-site-nav]");

if (header instanceof HTMLElement && toggle instanceof HTMLButtonElement && nav instanceof HTMLElement) {
  // The narrow header has two rows. Keep its menu inside the remaining viewport,
  // including after web fonts load or the user changes text size/orientation.
  const updateHeaderHeight = () => {
    header.style.setProperty("--site-header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
  };
  updateHeaderHeight();
  if ("ResizeObserver" in window) {
    new ResizeObserver(updateHeaderHeight).observe(header);
  } else {
    window.addEventListener("resize", updateHeaderHeight);
  }

  const closeNav = () => {
    header.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  const openNav = () => {
    header.dataset.open = "true";
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    if (window.matchMedia("(max-width: 720px)").matches) {
      nav.querySelector("a[href]")?.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener("click", () => {
    if (header.dataset.open === "true") {
      closeNav();
      return;
    }
    openNav();
  });

  const closeTopicMenus = () => {
    document.querySelectorAll(".site-nav__topics--desktop[open]").forEach((element) => {
      if (element instanceof HTMLDetailsElement) {
        element.open = false;
      }
    });
  };

  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      closeNav();
      closeTopicMenus();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    const insideTopics = target instanceof Element && target.closest(".site-nav__topics--desktop");
    if (!insideTopics) {
      closeTopicMenus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (header.dataset.open === "true") {
        closeNav();
        toggle.focus();
      }
      closeTopicMenus();
    }
  });

  document.addEventListener("focusin", (event) => {
    if (header.dataset.open === "true" && event.target instanceof Node && !header.contains(event.target)) {
      closeNav();
    }
  });

  window.matchMedia("(min-width: 721px)").addEventListener("change", (event) => {
    if (event.matches) {
      closeNav();
    }
  });
}
