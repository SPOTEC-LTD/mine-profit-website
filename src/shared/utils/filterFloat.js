/* eslint-disable no-useless-escape */
const filterFloat = ({ value, preValue, precision, enableMinus }) => {
  let nextValue = value.replace(/[^\-\d.]/g, '');
  const matchDecimalPoint = nextValue.match(/[.]/g) || [];
  if (matchDecimalPoint.length > 1) {
    return preValue;
  }

  if (!enableMinus) {
    nextValue = value.replace(/[^0-9.]/g, '');
  }

  const floatNumberReg = /^\-?\d+\.?\d*$/;

  if (nextValue && nextValue.length > 1 && !floatNumberReg.test(nextValue)) {
    return preValue;
  }

  const twoDecimalNumReg = new RegExp(`^(\\-)*(\\d+)\\.(\\d{${precision}}).*$`);

  return nextValue.replace(twoDecimalNumReg, '$1$2.$3');
};

export default filterFloat;
