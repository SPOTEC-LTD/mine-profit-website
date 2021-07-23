import numberUtils from 'aa-utils/lib/numberUtils';

const unitArray = ['H', 'K', 'M', 'G', 'T', 'P', 'E'];

function getHashrateUnit(num) {
  const resultHashRate = { hashrate: num, unit: '' };
  if (!+num) { return resultHashRate; }

  const hashrate = Math.min(Math.floor(Math.log10(num) / 3), unitArray.length - 1);
  const finalUnit = unitArray[hashrate];
  resultHashRate.hashrate = numberUtils.formatNumber(num / 1000 ** hashrate, { minimumFractionDigits: 2 });
  resultHashRate.unit = finalUnit;
  return resultHashRate;
}

export default getHashrateUnit;
