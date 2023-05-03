import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es } from './src/translations/resources';

i18n.use(initReactI18next).init({
    lng: 'es',
    compatibilityJSON: 'v3',
    resources: {
        en: en,
        es: es
    },
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18n;