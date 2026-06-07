const header = document.querySelector("[data-site-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-site-nav]");

if (header instanceof HTMLElement && toggle instanceof HTMLButtonElement && nav instanceof HTMLElement) {
  const closeNav = () => {
    header.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  const openNav = () => {
    header.dataset.open = "true";
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
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

  window.matchMedia("(min-width: 721px)").addEventListener("change", (event) => {
    if (event.matches) {
      closeNav();
    }
  });
}
