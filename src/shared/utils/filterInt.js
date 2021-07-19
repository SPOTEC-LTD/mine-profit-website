/* eslint-disable no-useless-escape */
export const filterInt = ({ value, enableMinus, preValue }) => {
  let nextValue = value.replace(/[^\-\d]/g, '');

  if (!enableMinus) {
    nextValue = value.replace(/[^\d]/g, '');
  }

  const intNumberReg = /^\-?\d+$/;

  if (nextValue && nextValue.length > 1 && !intNumberReg.test(nextValue)) {
    return preValue;
  }

  return nextValue;
};

export default filterInt;
