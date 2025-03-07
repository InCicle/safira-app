export type CurrencyOptions = {
  locale: 'pt'|'en'|'pt-BR'|'en-US';
  currencyCode: 'BRL'|'USD';
  float?: boolean;
};

export const CurrencyHandler = {
  withCurrency(value: number, options?: CurrencyOptions) {
    options = options || { locale: 'en', currencyCode: 'USD' };
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
