import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import BigNumber from 'bignumber.js';
import numberUtils from 'aa-utils/lib/numberUtils';

const getMinus = ({ number = 0, minuend = 0, decimal = 2, isRounding = false }) => {
  const minusNumber = new BigNumber(number).minus(minuend);
  const result = isRounding ? bigNumberToFixed(minusNumber, decimal)
    : numberUtils.formatBigFloatNumber(`${minusNumber}`, { minimumFractionDigits: decimal, maximumFractionDigits: decimal });
  return result;
};

export default getMinus;
