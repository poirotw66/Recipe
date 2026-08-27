const checks = [
  {
    name: "robots.txt Disallow",
    url: "https://recipe.bloss0m.com/robots.txt",
    test: (body) => body.includes("Disallow: /*?ingredients=")
  },
  {
    name: "sitemap-index",
    url: "https://recipe.bloss0m.com/sitemap-index.xml",
    test: (body) => body.includes("sitemap-recipes.xml")
  },
  {
    name: "cabbage intro links",
    url: "https://recipe.bloss0m.com/ingredients/cabbage/",
    test: (body) => body.includes('href="/recipes/') && body.includes("page-copy")
  },
  {
    name: "scenario hubIntro",
    url: "https://recipe.bloss0m.com/scenarios/ten-minute-meals/",
    test: (body) => body.includes("Bloom Kitchen") && body.includes('href="/recipes/')
  },
  {
    name: "homepage inline links",
    url: "https://recipe.bloss0m.com/",
    test: (body) => body.includes('href="/scenarios/ten-minute-meals') && body.includes('href="/ingredients/egg')
  },
  {
    name: "topic hub inline links",
    url: "https://recipe.bloss0m.com/quick-meals/",
    test: (body) =>
      body.includes('href="/ingredients/') &&
      body.includes('href="/scenarios/') &&
      (body.includes("除了下方食譜卡片") || body.includes("entry points"))
  },
  {
    name: "recipe intro tail link",
    url: "https://recipe.bloss0m.com/recipes/tomato-egg-rice/",
    test: (body) => {
      const intro = body.match(/class="article recipe-intro"[\s\S]*?<\/p>/);
      return Boolean(intro?.[0]?.includes('href="/ingredients/'));
    }
  }
];

let failed = 0;

for (const check of checks) {
  const response = await fetch(check.url);
  const body = await response.text();
  const ok = response.ok && check.test(body);
  console.log(`${ok ? "PASS" : "FAIL"} ${check.name} (${response.status})`);
  if (!ok) {
    failed += 1;
  }
}

if (failed > 0) {
  process.exitCode = 1;
}
