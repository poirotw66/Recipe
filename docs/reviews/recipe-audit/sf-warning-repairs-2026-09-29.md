# San Francisco Warning Recipe Repairs — 2026-09-29

## Scope

Text review and recipe-specific repairs were completed for 46 `sf-*` Warning recipes in zh-TW, English, Japanese, and Korean. The 19 SF Critical/noindex recipes and five recipes assigned to the parent agent are outside this report. Per-recipe records are in `docs/reviews/recipe-audit/reports/<slug>.json`.

Repairs addressed recipe-specific mismatches across ingredients, preparation state, quantities, serving yield, steps, equipment, sauce definitions, timing, food-safety endpoints, storage, FAQs, and unsupported nutrition or restaurant-provenance claims. Each article was reviewed as a complete four-locale body; changes were not limited to metadata.

## Verification

- `node scripts/verify-recipe-scenarios.mjs` passed; the recipe scenario labels use the repository taxonomy and are nonempty in all four locales for this scope.
- All 184 locale front matters parsed; article dates, category quoting, report dates/status, step presence, servings and timing, ingredient/seasoning counts, and amount arrays were checked for cross-locale consistency.
- English article fields contain no Han text after excluding `relatedIngredients`, which stores canonical Chinese ingredient lookup keys and is rendered only in zh-TW. The parent agent also reported that its global changed-English CJK scan and 114-recipe quantity multiset scan both returned zero.
- No full site build was run in this subtask; the parent agent owns the integrated build and commit/push.

## Verification limitation

This is a text and structured-content review only. No kitchen trial was performed, so actual preparation time, yield, texture, taste, storage life, and recipe performance remain unverified. The edits do not claim test evidence or traceable restaurant provenance.

## Reviewed slugs

- `sf-bloody-mary-spicy-rice`
- `sf-brownie-ice-cream`
- `sf-campfire-lemon-zucchini-fish-fillet`
- `sf-cheesy-chicken-egg-rice`
- `sf-cheesy-local-sausage-cream-pasta`
- `sf-chicken-quesadilla`
- `sf-classic-beef-mushroom-eggs-benedict`
- `sf-classic-caesar-salad`
- `sf-classic-ham-mushroom-eggs-benedict`
- `sf-classic-pesto-shrimp-pasta`
- `sf-crispy-calamari-cocktail-sauce`
- `sf-dawn-shrimp-chicken-linguine`
- `sf-greek-campfire-grilled-chicken-brunch`
- `sf-griddled-butter-ham-sandwich`
- `sf-homestyle-meat-sauce-penne-with-meatballs`
- `sf-keto-surf-and-turf-platter`
- `sf-kids-cream-chicken-penne`
- `sf-local-sausage-quesadilla`
- `sf-mushroom-cheese-omelette`
- `sf-oat-crusted-fish-and-fries`
- `sf-orange-danish-mushroom-poached-potato`
- `sf-orange-danish-poached-seafood-potato`
- `sf-orange-danish-sous-vide-steak`
- `sf-orange-danish-sunny-sous-vide-chicken`
- `sf-poached-egg-smoked-beef-danish-open`
- `sf-poutine-meat-sauce-fries`
- `sf-salted-egg-bitter-melon-pasta`
- `sf-salted-egg-seafood-pizza`
- `sf-salted-egg-yolk-fries`
- `sf-san-francisco-garlic-fries`
- `sf-second-floor-fiesta-shrimp-penne`
- `sf-second-floor-saltwater-chicken-salad`
- `sf-sichuan-chicken-mushroom-eggs-benedict`
- `sf-smoked-salmon-caesar-salad`
- `sf-smoked-salmon-mushroom-eggs-benedict`
- `sf-sous-vide-chicken-caesar-salad`
- `sf-south-sea-spiced-chicken-rice`
- `sf-spicy-pepper-karaage-pasta`
- `sf-spicy-spanish-surf-and-turf-rice`
- `sf-spicy-tomato-bacon-penne`
- `sf-strong-chocolate-cake`
- `sf-supreme-cheese-omelette`
- `sf-truffle-fries`
- `sf-truffle-mushroom-cream-pasta`
- `sf-white-wine-garlic-clam-squid-ink-pasta`
- `sf-worcester-meat-sauce-omelette`
