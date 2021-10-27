import { mapState } from 'vuex';
import { Table } from 'ant-design-vue';
import numberUtils from 'aa-utils/lib/numberUtils';
import getHashrateUnit from '@/shared/utils/getHashrateUnit';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import CoinLineChart from './CoinLineChart';
import styles from './index.less?module';

const CoinMarkets = {
  props: {
    loading: Boolean,
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      showMore: false,
    };
  },

  computed: {
    ...mapState({
      dynamicChainTypeList: state => state.dynamicChainTypeList,
    }),
    dynamicChain() {
      const [chainInfo = { symbol: '' }] = this.dynamicChainTypeList;
      return chainInfo.symbol;
    },
    isHidden() {
      return !this.showMore && this.data.length > 3;
    },
    marketsList() {
      const rebuildList = this.data.map((item, index) => {
        let textColor = '';
        if (item.priceRate !== 0) {
          textColor = item.priceRate > 0 ? 'coin-color-blue' : 'coin-color-red';
        }
        const resultDecimal = item.symbol.toUpperCase() === this.dynamicChain ? 10 : 2;

        return {
          key: index,
          ...item,
          textColor,
          price: bigNumberToFixed(item.price, resultDecimal),
          priceRate: numberUtils.formatPercent(item.priceRate, {
            minimumFractionDigits: 2,
            usePlus: item.priceRate > 0,
          }),
        };
      });
      if (this.isHidden) {
        return rebuildList.splice(0, 3);
      }
      return rebuildList;
    },
  },

  render() {
    const columns = [
      {
        title: this.$t('chainType'),
        dataIndex: 'coin',
        class: styles['coin-name-row'],
        customRender: (_, { symbol, icon, symbolCN }) => {
          return (
            <div class={styles['coin-name']}>
              <img src={icon} alt="" />
              <span>{symbol.toUpperCase()}</span>
              <span class={styles['coin-symbolCN']}>{symbolCN}</span>
            </div>
          );
        },
      },
      {
        title: this.$t('currentPrice'),
        dataIndex: 'price',
        align: 'right',
        customRender: value => {
          return (
            <div class={styles['coin-price']}>
              {`$${value}`}
            </div>
          );
        },
      },
      {
        title: this.$t('priceRate'),
        dataIndex: 'priceRate',
        align: 'right',
        width: 220,
        customRender: (_, { priceRate, textColor }) => {
          return (
            <div class={[styles['coin-price'], styles[textColor]]}>{priceRate}</div>
          );
        },
      },
      {
        title: this.$t('marketQuotations'),
        dataIndex: 'latest',
        align: 'right',
        width: 240,
        customRender: value => {
          return (
            <CoinLineChart data={value} />
          );
        },
      },
      {
        title: this.$t('kLineHashRate'),
        dataIndex: 'globalHashrate',
        align: 'right',
        width: 260,
        class: styles['coin-price-row'],
        customRender: (_, { globalHashrate, hashrateUnitSuffix }) => {
          const { hashrate, unit } = getHashrateUnit(globalHashrate);
          return (
            <div class={styles['coin-price']}>
              {`${hashrate} ${unit}${hashrateUnitSuffix}`}
            </div>
          );
        },
      },
    ];

    return (
      <div class={styles['coin-markets-box']}>
        <Table
          columns={columns}
          dataSource={this.marketsList}
          loading={this.loading}
          pagination={false}
          class={styles['coin-markets-table']}
        />
        {this.isHidden && (
          <div class={styles.more}>
            <span onClick={() => { this.showMore = true; }}>{this.$t('moreCoinPrice')}</span>
          </div>
        )}
      </div>
    );
  },
};

export default CoinMarkets;
