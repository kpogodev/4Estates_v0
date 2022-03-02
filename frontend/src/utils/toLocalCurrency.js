export const toLocalCurrency = (locales, price) => {
  return price.toLocaleString(locales, { style: 'currency', currency: 'GBP' });
};
