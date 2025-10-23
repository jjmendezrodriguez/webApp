// Example of how to use i18n in components
// This file demonstrates the useTranslation hook

import { useTranslation } from "react-i18next";

/**
 * Example component showing i18n usage
 */
export function I18nExample() {
  const { t, i18n } = useTranslation();

  // Change language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {/* Access translations with t() function */}
      <h1>{t("auth.login.title")}</h1>
      <p>{t("auth.errors.invalidEmail")}</p>

      {/* Language switcher */}
      <button onClick={() => changeLanguage("es")}>Español</button>
      <button onClick={() => changeLanguage("en")}>English</button>

      {/* Current language */}
      <p>Current: {i18n.language}</p>
    </div>
  );
}

/**
 * Usage in auth components:
 *
 * import { useTranslation } from 'react-i18next'
 *
 * function LoginModal() {
 *   const { t } = useTranslation()
 *
 *   return (
 *     <div>
 *       <h2>{t('auth.login.title')}</h2>
 *       <input placeholder={t('auth.login.email')} />
 *       <button>{t('auth.login.submit')}</button>
 *     </div>
 *   )
 * }
 */
