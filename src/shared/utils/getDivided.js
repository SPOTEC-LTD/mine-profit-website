import BigNumber from 'bignumber.js';
import numberUtils from 'aa-utils/lib/numberUtils';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';

const getDivided = ({ number = 0, divisor = 0, decimal = 2, isRounding = false }) => {
  const dividedNumber = new BigNumber(number).dividedBy(divisor);
  const noRoundNumber = numberUtils.formatBigFloatNumber(
    `${dividedNumber}`,
    { minimumFractionDigits: decimal, maximumFractionDigits: decimal },
  );
  const result = isRounding ? bigNumberToFixed(dividedNumber, decimal) : noRoundNumber;
  return result;
};

export default getDivided;
