export const getCurrencySymbol = (currencyStr?: string): string => {
  if (!currencyStr) return '$';
  if (currencyStr.includes('€')) return '€';
  if (currencyStr.includes('£')) return '£';
  if (currencyStr.includes('₹')) return '₹';
  if (currencyStr.includes('₨')) return '₨';
  if (currencyStr.includes('د.إ')) return 'د.إ';
  if (currencyStr.includes('ر.س')) return 'ر.س';
  if (currencyStr.includes('¥')) return '¥';
  if (currencyStr.includes('Fr')) return 'Fr';
  if (currencyStr.includes('RM')) return 'RM';
  if (currencyStr.includes('৳')) return '৳';
  return '$';
};

export const formatMoney = (amount: number, currencyStr?: string): string => {
  const sym = getCurrencySymbol(currencyStr);
  return `${sym}${amount.toLocaleString()}`;
};
