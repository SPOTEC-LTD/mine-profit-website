const formattedNumberFunc = options => {
  const { value, numberStyle, callback } = options;
  const finalValue = value || 0;

  const formattedNumber = new Intl.NumberFormat(
    'en-US',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  ).format(finalValue);

  let formatedCurrency;
  if (numberStyle === 'percent') {
    formatedCurrency = `${Math.floor(formattedNumber * 100)}%`;
  } else if (numberStyle === 'decimal') {
    formatedCurrency = formattedNumber.indexOf('-') !== -1
      ? `-${formattedNumber.split('-')[1]}` : `${formattedNumber}`;
  } else if (numberStyle === 'decimalinreport') {
    formatedCurrency = formattedNumber.indexOf('-') !== -1
      ? `($${formattedNumber.split('-')[1]})` : `$${formattedNumber}`;
  } else {
    formatedCurrency = formattedNumber.indexOf('-') !== -1
      ? `-$${formattedNumber.split('-')[1]}` : `$${formattedNumber}`;
  }
  if (typeof callback === 'function') {
    return callback(formatedCurrency);
  }
  return formatedCurrency;
};

export default formattedNumberFunc;
