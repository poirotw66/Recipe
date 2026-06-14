// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "static",
  site: "https://recipe.bloss0m.com",

  i18n: {
    defaultLocale: "zh-TW",
    locales: ["zh-TW", "en", "ja", "ko"],
    routing: {
      prefixDefaultLocale: false
    }
  },

  adapter: cloudflare()
});