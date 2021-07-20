import BigNumber from 'bignumber.js';

function bigNumberToFixed(number, decimal) {
  return new BigNumber(number).toFixed(decimal);
}

export default bigNumberToFixed;
