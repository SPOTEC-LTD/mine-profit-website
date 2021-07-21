const getCoinRate = ({ rateList = [], coin }) => {
  return rateList.filter(({ chainType }) => chainType === coin)[0]?.rate || 1;
};

export default getCoinRate;
