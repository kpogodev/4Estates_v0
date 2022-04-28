export const toLocalCurrency = (locales, price, currency) => {
  return price.toLocaleString(locales, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2 })
}
