import { Table } from 'ant-design-vue';
import numberUtils from 'aa-utils/lib/numberUtils';
import getHashrateUnit from '@/shared/utils/getHashrateUnit';

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
    isHidden() {
      return !this.showMore && this.data.length > 3;
    },
    marketsList() {
      const rebuildList = this.data.map((item, index) => {
        return {
          key: index,
          ...item,
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
        customRender: (_, { price }) => {
          return (
            <div class={styles['coin-price']}>
              {`$${numberUtils.formatNumber(price, { minimumFractionDigits: 2 })}`}
            </div>
          );
        },
      },
      {
        title: this.$t('priceRate'),
        dataIndex: 'priceRate',
        align: 'right',
        width: 220,
        customRender: (_, { priceRate }) => {
          return (
            <div class={styles['coin-price']}>
              {
                numberUtils.formatPercent(priceRate, {
                  minimumFractionDigits: 2,
                  usePlus: priceRate > 0,
                })
              }
            </div>
          );
        },
      },
      {
        title: this.$t('marketQuotations'),
        dataIndex: 'market',
        align: 'right',
        width: 340,
        // TODO: 待添加 k线图
      },
      {
        title: this.$t('kLineHashRate'),
        dataIndex: 'globalHashrate',
        align: 'right',
        width: 260,
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
