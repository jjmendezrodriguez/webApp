// i18n configuration
// Configures internationalization with ES and EN languages

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

/**
 * Get saved language preference from localStorage
 * Falls back to Spanish if no preference is saved
 */
const getSavedLanguage = (): string => {
  const saved = localStorage.getItem("preferred-language");
  return saved && (saved === "es" || saved === "en") ? saved : "es";
};

/**
 * Initialize i18n with saved language preference and translations
 * Default language: Spanish (es)
 * Fallback language: English (en)
 * Reads user preference from localStorage
 */
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: getSavedLanguage(), // Use saved language or default to Spanish
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
