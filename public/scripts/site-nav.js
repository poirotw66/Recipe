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

  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.dataset.open === "true") {
      closeNav();
      toggle.focus();
    }
  });

  window.matchMedia("(min-width: 721px)").addEventListener("change", (event) => {
    if (event.matches) {
      closeNav();
    }
  });
}
