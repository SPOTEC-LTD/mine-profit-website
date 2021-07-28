import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';

const getOrderBalance = balanceList => {
  if (isEmpty(balanceList)) {
    return [];
  }
  const coinList = ['USDT', 'BTC', 'ETH'];
  return coinList.map(coin => find(balanceList, { chainType: coin }));
};

export default getOrderBalance;
