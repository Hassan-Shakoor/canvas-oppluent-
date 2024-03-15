import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationFR from './locales/fr/translation.json';

// Initialize i18next
i18n
    .use(LanguageDetector)
    .use(initReactI18next) // Bind react-i18next to i18next
    .init({
        resources: {
            en: { translation: translationEN },
            es: { translation: translationES },
            fr: { translation: translationFR }
        },
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language if translation file not found
        interpolation: {
            escapeValue: false // React already does escaping
        },
        debug: true
    });

export default i18n;
