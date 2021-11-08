import BigNumber from 'bignumber.js';
import numberUtils from 'aa-utils/lib/numberUtils';

function bigNumberToFixed(number, decimal, isRounding = true) {
  const fixedNumber = new BigNumber(number).toFixed(decimal);
  const noRoundNumber = numberUtils.formatBigFloatNumber(
    `${number}`,
    { minimumFractionDigits: decimal, maximumFractionDigits: decimal },
  );
  const result = isRounding ? fixedNumber : noRoundNumber;
  return result;
}

export default bigNumberToFixed;
