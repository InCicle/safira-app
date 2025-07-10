export const LanguageType = {
  'pt-BR': 'pt-BR',
  'en-US': 'en-US',
  en: 'en',
  pt: 'pt',
} as const;

export type LanguageType = (typeof LanguageType)[keyof typeof LanguageType];
