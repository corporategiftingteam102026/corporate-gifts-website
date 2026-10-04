import settingsData from "@/data/generated/site-settings.json";

export type SiteSettings = {
  businessName: string;
  tagline: string;
  businessEmail: string;
  phone: string;
  whatsapp: string;
  address: string;
  instagram: string;
  linkedin: string;
  aboutShort: string;
  footerText: string;
};

const EMPTY_SETTINGS: SiteSettings = {
  businessName: "",
  tagline: "",
  businessEmail: "",
  phone: "",
  whatsapp: "",
  address: "",
  instagram: "",
  linkedin: "",
  aboutShort: "",
  footerText: "",
};

export function getSiteSettings(): SiteSettings {
  return {
    ...EMPTY_SETTINGS,
    ...(settingsData as Partial<SiteSettings>),
  };
}
