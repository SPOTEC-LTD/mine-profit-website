import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import BigNumber from 'bignumber.js';

const getDivided = ({ number = 0, divisor = 0, decimal = 2 }) => {
  const timesNumber = new BigNumber(number).dividedBy(divisor);
  return bigNumberToFixed(timesNumber, decimal);
};

export default getDivided;
