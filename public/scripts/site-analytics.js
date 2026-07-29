(() => {
  const locale = document.documentElement.lang || "zh-Hant";

  window.bloomTrack = (eventName, parameters = {}) => {
    if (typeof eventName !== "string" || !eventName) {
      return;
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        page_locale: locale,
        transport_type: "beacon",
        ...parameters
      });
    }
  };

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      if (link.classList.contains("recipe-card__link")) {
        const url = new URL(link.href, window.location.href);
        const parts = url.pathname.split("/").filter(Boolean);
        const recipeIndex = parts.indexOf("recipes");
        const recipeSlug = recipeIndex >= 0 ? parts[recipeIndex + 1] : "";

        window.bloomTrack("recipe_card_click", {
          recipe_slug: recipeSlug,
          link_url: url.pathname
        });
      }

      if (link.origin !== window.location.origin) {
        window.bloomTrack("outbound_link_click", {
          link_domain: link.hostname,
          link_url: link.href
        });
      }
    },
    { capture: true }
  );
})();
