import { LanguageType } from '@/safira-app/interfaces/Language';

export type CurrencyCodeType = 'BRL' | 'USD';

export type CurrencyOptions = {
  locale: LanguageType;
  currencyCode: CurrencyCodeType;
  float?: boolean;
};

export const CurrencyHandler = {
  withCurrency(value: number, options?: CurrencyOptions) {
    options = options || { locale: LanguageType.en, currencyCode: 'USD' };
    return Intl.NumberFormat(options.locale, {
      style: 'currency',
      currency: options.currencyCode,
    }).format(options.float ? value : value / 100);
  },

  asInteger(value: string | number) {
    return Number(String(value).replace(/\D/g, ''));
  },

  asFloat(value: string | number) {
    return Number(String(value).replace(/\D/g, '')) / 100;
  },
};
