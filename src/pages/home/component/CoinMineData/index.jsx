import { mapState } from 'vuex';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import styles from './index.less?module';

const CoinMineData = {
  props: {
    info: { type: Object, default: () => {} },
  },

  computed: {
    ...mapState({
      dynamicChainTypeList: state => state.dynamicChainTypeList,
    }),

    classMap() {
      const [chainInfo = { symbol: '' }] = this.dynamicChainTypeList;
      const dynamic = chainInfo.symbol.toLocaleLowerCase();
      return {
        eth: 'eth-icon-img',
        btc: 'btc-icon-img',
        [dynamic]: 'dynamic-icon-img',
      };
    },
  },

  render() {
    const {
      icon, symbol, unit, hashrate, incomeCoin,
      incomeUsd, coinImg, whetherCustomToken, buybackCapitalPool,
    } = this.info;
    return (
      <div class={[this.className, styles['coin-data-wrapper']]}>
        <div class={styles['coin-content-wrapper']}>
          <div class={styles['name-icon']}>
            <img src={icon} alt="" class={styles[this.classMap[symbol.toLocaleLowerCase()]]} />
            <span>{symbol}</span>
          </div>

          <div class={styles['now-hash-rate']}>
            <span>{this.$t('nowHashRate')}</span>
            <div class={styles['hash-rate-details']}>
              <span class={styles['now-number']}>{hashrate}</span>
              <span>{unit}</span>
            </div>
          </div>

          <div class={styles['coin-content']}>
            <span>
              {whetherCustomToken ? this.$t('capitalPool') : this.$t('yesterdayProducer')}
            </span>
            <div class={styles['self-produce']}>
              <span>
                {whetherCustomToken
                  ? bigNumberToFixed(buybackCapitalPool, 2)
                  : incomeCoin
                }
              </span>
              <span class={styles.unit}>{whetherCustomToken ? 'USDT' : symbol}</span>
            </div>
            {!whetherCustomToken && (
              <div class={styles.approximation}>
                <span>≈{incomeUsd}</span>
                <span class={styles.unit}>USDT</span>
              </div>
            )}
          </div>
        </div>
        <img src={coinImg} alt="" class={styles['coin-img']} />
      </div>
    );
  },
};

export default CoinMineData;
