export const brandName = "Bloom Kitchen";
export const brandTagline = "今天煮什麼";
export const brandDisplayName = `${brandName} | ${brandTagline}`;
export const siteName = brandName;
export const siteTitleSuffix = brandDisplayName;

export const contactEmail = "poirotw66@gmail.com";
export const bloss0mSiteUrl = "https://www.bloss0m.com/";
export const bloomPickerUrl = "https://www.bloss0m.com/bloom-picker/";
export const bloomRenderUrl = "https://www.bloss0m.com/bloom-render/";
export const recipeSiteUrl = "https://recipe.bloss0m.com/";

export const bloss0mBrandName = "Bloss0m";

/** Canonical origin: env override, then astro.config site, then recipeSiteUrl. */
export const getSiteUrl = (): string => {
  const fromEnv = import.meta.env.PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const fromAstro = import.meta.env.SITE?.trim();
  if (fromAstro) return fromAstro.replace(/\/$/, "");
  return recipeSiteUrl.replace(/\/$/, "");
};

export type EcosystemLink = {
  label: string;
  href: string;
  current?: boolean;
};

export const bloss0mEcosystemLinks: EcosystemLink[] = [
  { label: bloss0mBrandName, href: bloss0mSiteUrl },
  { label: "Bloom Picker", href: bloomPickerUrl },
  { label: "Bloom Render", href: bloomRenderUrl },
  { label: brandName, href: recipeSiteUrl, current: true }
];

export const legalLastUpdated = "2026-06-03";

export const adsenseClient = import.meta.env.PUBLIC_ADSENSE_CLIENT?.trim() ?? "";
export const adsenseReady = /^ca-pub-\d{16}$/.test(adsenseClient);
