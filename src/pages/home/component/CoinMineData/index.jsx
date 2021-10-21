import { mapState } from 'vuex';
import styles from './index.less?module';

const CoinMineData = {
  props: {
    img: { type: String },
    title: { type: String },
    nowHashRate: { type: String },
    className: { type: String },
    unit: { type: String },
    coinProduce: { type: String },
    usdtProduce: { type: String },
    coinImg: String,
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
    return (
      <div class={[this.className, styles['coin-data-wrapper']]}>
        <div class={styles['coin-content-wrapper']}>
          <div class={styles['name-icon']}>
            <img src={this.img} alt="" class={styles[this.classMap[this.title.toLocaleLowerCase()]]} />
            <span>{this.title}</span>
          </div>

          <div class={styles['now-hash-rate']}>
            <span>{this.$t('nowHashRate')}</span>
            <div class={styles['hash-rate-details']}>
              <span class={styles['now-number']}>{ this.nowHashRate }</span>
              <span>{this.unit}</span>
            </div>
          </div>

          <div class={styles['coin-content']}>
            <span>{ this.$t('yesterdayProducer') }</span>
            <div class={styles['self-produce']}>
              <span>{this.coinProduce}</span>
              <span class={styles.unit}>{this.title}</span>
            </div>
            <div class={styles.approximation}>
              <span>≈{this.usdtProduce}</span>
              <span class={styles.unit}>USDT</span>
            </div>
          </div>
        </div>
        <img src={this.coinImg} alt="" class={styles['coin-img']} />
      </div>
    );
  },
};

export default CoinMineData;
