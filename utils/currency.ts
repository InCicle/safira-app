import { LanguageType } from '@/safira-app/interfaces/Language';

export type CurrencyCodeType = 'BRL' | 'USD';

export type CurrencyOptions = {
  float?: boolean;
  locale: LanguageType;
  currencyCode?: CurrencyCodeType;
};

const currencyCodeMap: Record<LanguageType, CurrencyCodeType> = {
  'pt': 'BRL',
  'pt-BR': 'BRL',
  'en': 'USD',
  'en-US': 'USD',
} as const;

export const CurrencyHandler = {
  withCurrency(value: number, options?: CurrencyOptions) {
    options = options || { locale: LanguageType.en, currencyCode: 'USD' };
    return Intl.NumberFormat(options.locale, {
      style: 'currency',
      currency:  options.currencyCode || currencyCodeMap[options.locale],
    }).format(options.float ? value : value / 100);
  },

  asInteger(value: string | number) {
    return Number(String(value).replace(/\D/g, ''));
  },

  asFloat(value: string | number) {
    return Number(String(value).replace(/\D/g, '')) / 100;
  },
};
