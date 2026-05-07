import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: { translation: { greeting: 'Good Morning' } },
  es: { translation: { greeting: 'Buenos Días' } },
  ht: { translation: { greeting: 'Bonjou' } },
  pt: { translation: { greeting: 'Bom dia' } },
  fr: { translation: { greeting: 'Bonjour' } },
  ja: { translation: { greeting: 'おはようございます' } },
};

i18n
  .use(LanguageDetector) // Automatically detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
