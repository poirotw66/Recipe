/** @deprecated Import from `./i18n-translated-slugs` */
export { I18N_PILOT_SLUGS, I18N_PILOT_SLUG_SET } from "./i18n-translated-slugs";
import type { I18N_PILOT_SLUGS } from "./i18n-translated-slugs";

export type PilotSlug = (typeof I18N_PILOT_SLUGS)[number];
