/** Batch 1 — spec-018 pilot (15). */
export const I18N_PILOT_SLUGS = [
  "tomato-egg-rice",
  "scallion-egg-rice",
  "garlic-oil-pasta",
  "tomato-garlic-pasta",
  "pesto-chicken-pasta",
  "beef-broccoli-stirfry",
  "scallion-beef-stirfry",
  "airfryer-garlic-chicken-broccoli",
  "tofu-scrambled-eggs",
  "tomato-tofu-soup",
  "steamed-chicken-bento",
  "mushroom-beef-rice-bowl",
  "onion-egg-rice-bowl",
  "broccoli-mushroom-chicken-rice-bowl",
  "creamy-mushroom-pasta"
] as const;

/** Batch 2 — PRD-006 Phase C (20). */
export const I18N_BATCH_02_SLUGS = [
  "air-fryer-salmon-broccoli",
  "cabbage-egg-stir-fry",
  "garlic-mushroom-chicken",
  "onion-tomato-egg-fried-rice",
  "pesto-salmon-pasta",
  "scallion-beef-fried-rice",
  "white-sauce-chicken-pasta",
  "air-fryer-garlic-shrimp",
  "air-fryer-crispy-chicken-bites",
  "solo-mapo-tofu-rice-bowl",
  "solo-three-cup-chicken-rice",
  "quick-kimchi-fried-rice",
  "air-fryer-butter-corn",
  "air-fryer-crispy-tofu-cubes",
  "air-fryer-garlic-mushrooms",
  "air-fryer-garlic-okra",
  "air-fryer-garlic-pork-chop",
  "air-fryer-honey-sweet-potato",
  "air-fryer-lemon-fish-fillet",
  "air-fryer-soy-chicken-wings"
] as const;

export const I18N_VERIFIED_TRANSLATION_SLUGS = [...I18N_PILOT_SLUGS, ...I18N_BATCH_02_SLUGS] as const;

export const I18N_PILOT_SLUG_SET = new Set<string>(I18N_PILOT_SLUGS);
