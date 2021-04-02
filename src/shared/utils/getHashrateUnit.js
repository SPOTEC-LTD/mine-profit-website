import numberUtils from 'aa-utils/lib/numberUtils';

const unitArray = ['H', 'K', 'M', 'G', 'T', 'P', 'E'];

function getHashrateUnit(num) {
  if (!+num) {
    return num;
  }
  const hashrate = Math.min(Math.floor(Math.log10(num) / 3), unitArray.length - 1);
  const finalUnit = unitArray[hashrate];
  return `${numberUtils.formatNumber(num / 1000 ** hashrate, { minimumFractionDigits: 2 })}${finalUnit}`;
}

export default getHashrateUnit;
