export const siteName = "今天煮什麼";
export const contactEmail = "poirotw66@gmail.com";
export const bloss0mSiteUrl = "https://bloss0m.com";
export const legalLastUpdated = "2026-05-29";

export const adsenseClient = import.meta.env.PUBLIC_ADSENSE_CLIENT?.trim() ?? "";
export const adsenseReady = /^ca-pub-\d{16}$/.test(adsenseClient);
