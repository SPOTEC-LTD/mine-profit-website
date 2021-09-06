import { getMineDatalist } from '@/api';
import CoinMineData from '@/pages/home/component/CoinMineData';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import getHashrateUnit from '@/shared/utils/getHashrateUnit';
import blockChainImg from '@/assets/home/block-chain-title.png';
import BlockTitle from '@/shared/components/BlockTitle';
import btcIcon from '@/assets/home/icon-btc.png';
import ethIcon from '@/assets/home/icon-eth.png';
import ethCoinImg from '@/assets/home/eth-icon-coin.png';
import btcCoinImg from '@/assets/home/btc-icon-coin.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import styles from './index.less?module';

const BlockChainDate = {
  data() {
    return {
      blockChainImg,
      btcIcon,
      ethIcon,
      isChinese: getIsChinese(),
      iconMap: { btc: btcIcon, eth: ethIcon },
      coinImgMap: { btc: btcCoinImg, eth: ethCoinImg },
      coinList: [
        { icon: btcIcon, symbol: 'BTC', hashrate: '-', incomeCoin: '', incomeUsd: '-', unit: '-', coinImg: '' },
        { icon: ethIcon, symbol: 'ETH', hashrate: '-', incomeCoin: '', incomeUsd: '-', unit: '-', coinImg: '' },
      ],
    };
  },

  mounted() {
    this.fetchCoinDataList();
  },

  methods: {
    fetchCoinDataList() {
      getMineDatalist().then(data => {
        const { body: { list } } = data;
        const dataList = list.map(item => {
          item.icon = this.iconMap[item.symbol];
          item.coinImg = this.coinImgMap[item.symbol];
          item.symbol = item.symbol.toUpperCase();
          const { hashrate, unit } = getHashrateUnit(item.hashrate);
          item.hashrate = hashrate;
          item.unit = `${unit}${item.incomeHashrateUnitSuffix || 'H/s'}`;
          item.incomeCoin = bigNumberToFixed(item.incomeCoin, 8);
          item.incomeUsd = bigNumberToFixed(item.incomeUsd, 8);
          return item;
        });
        if (list.length) {
          this.coinList = dataList;
        }
      });
    },
  },

  render() {
    return (
        <div>
          <BlockTitle
            img={blockChainImg}
            title={this.isChinese && this.$t('mineData')}
            class={styles['block-chain-img']}
          />
          <div class={styles['coin-data-container']}>
            {this.coinList.map((item, index) => (
              <CoinMineData
                key={index}
                img={item.icon}
                title={item.symbol}
                unit={item.unit}
                nowHashRate={item.hashrate}
                coinProduce={item.incomeCoin}
                usdtProduce={item.incomeUsd}
                coinImg={item.coinImg}
              />
            ))}
          </div>
        </div>
    );
  },
};

export default BlockChainDate;
