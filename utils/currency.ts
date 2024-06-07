export type CurrencyOptions = {
  locale: string;
  currencyCode: string;
  float?: boolean;
};

export const CurrencyHandler = {
  withCurrency(value: number, options?: CurrencyOptions) {
    const { currencyCode = 'BRL', locale = 'pt-BR', float } = options || {};
    return Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(float ? value : value / 100);
  },

  asInteger(value: string | number) {
    return Number(String(value).replace(/\D/g, ''));
  },

  asFloat(value: string | number) {
    return Number(String(value).replace(/\D/g, '')) / 100;
  },
};
