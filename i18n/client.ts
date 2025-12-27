export const defaultLanguage = "en";

export const resources = {
  en: {
    common: require("./locales/en.json"),
  },
  fa: {
    common: require("./locales/fa.json"),
  },
} as const;
