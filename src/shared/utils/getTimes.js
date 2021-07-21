import BigNumber from 'bignumber.js';

const getTimes = ({ number = 0, times = 0, decimal = 2, isFormat = false }) => {
  if (!number) {
    number = 0;
  }
  if (isFormat) {
    return new BigNumber(number).multipliedBy(times).toFormat(decimal);
  }
  return new BigNumber(number).multipliedBy(times).toFixed(decimal);
};

export default getTimes;
