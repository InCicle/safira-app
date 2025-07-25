import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from './locales/pt.json';
import en from './locales/en.json';
import { getDefaultLanguage } from '@/utils/getDefaultLanguage';

export const resources = {
  pt: {
    translation: {
      ...pt,
    },
  },
  'pt-BR': {
    translation: {
      ...pt,
    },
  },
  en: {
    translation: {
      ...en,
    },
  },
  'en-US': {
    translation: {
      ...en,
    },
  },
};

const defineLanguage = getDefaultLanguage();

const i18nConfig = {
  resources,
  lng: defineLanguage,
};

i18n.use(initReactI18next).init(i18nConfig);

export { i18n };
