import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import detector from "i18next-browser-languagedetector"

import translationEg from "./locales/eg/translation.json";
import translationAr from "./locales/ar/translation.json";
i18n
  .use(LanguageDetector)
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation:
          translationEg

      },
      ar: {
        translation:
          translationAr

      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;