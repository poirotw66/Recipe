/** Pilot recipe slugs for spec-018 (PRD-006). */
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

export type PilotSlug = (typeof I18N_PILOT_SLUGS)[number];

export const I18N_PILOT_SLUG_SET = new Set<string>(I18N_PILOT_SLUGS);
