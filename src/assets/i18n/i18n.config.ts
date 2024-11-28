import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation';
import es from './locales/es/translation';
import ru from './locales/ru/translation';

const resources = {
  en: {
    translation: {
      ...en,
    },
  },
  es: {
    translation: {
      ...es,
    },
  },
  ru: {
    translation: {
      ...ru,
    },
  },
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    supportedLngs: ['en', 'ru', 'es', 'de'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
