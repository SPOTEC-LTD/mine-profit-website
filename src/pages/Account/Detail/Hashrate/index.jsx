import { Row, Col, Button, Spin } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import { EthIcon, BtcIcon } from '@/shared/components/ChainIcon';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { HASH_RATE, GET_PRODUCT_HASHRATE_STATISTICS } from '@/modules/account/hashRate';
import locationServices from '@/shared/services/location/locationServices';
import { accountHashRateListPath, accountOrdersPath } from '@/router/consts/urls';
import Link from '@/shared/components/Link';
import Card from '../components/Card';
import WidgetTitle from '../components/WidgetTitle';
import styles from './index.less?module';

const Hashrate = {
  computed: {
    ...mapState({
      getProductHashrateStatisticsLoading: state => state.loading.effects[`${HASH_RATE}/${GET_PRODUCT_HASHRATE_STATISTICS}`],
      statisticsList: state => state.hashRate.statisticsList,
      dynamicChainTypeList: state => state.dynamicChainTypeList,
    }),
    dynamicChainType() {
      const [chainInfo = { symbol: '', icon: '' }] = this.dynamicChainTypeList;
      return chainInfo;
    },

  },

  mounted() {
    this[GET_PRODUCT_HASHRATE_STATISTICS]();
  },

  methods: {
    ...mapActions(HASH_RATE, [GET_PRODUCT_HASHRATE_STATISTICS]),
    redirectToHashRateList(hashrateType) {
      locationServices.push(accountHashRateListPath, { query: { hashrateType } });
    },

    getCellNode({ title, value }) {
      return (
        <div>
          <div class={styles.label}>{title}</div>
          <div class={styles.value}>{value}</div>
        </div>
      );
    },

    getTablePartData(item) {
      const yTotalValue = bigNumberToFixed(item.yesterdayTotalOutput, 8);
      return [
        {
          title: this.$t('hashrateTotalHash'),
          value: `${bigNumberToFixed(item.totalAmount, 2)} ${item.unit}`,
        },
        {
          title: this.$t('hashrateAllNetOutput'),
          value: `${bigNumberToFixed(item.totalOutput, 8)} ${item.hashrateType}`,
        },
        {
          title: this.$t('hashrateYesterdayNetOutput'),
          value: `${yTotalValue > 0 ? `+${yTotalValue}` : yTotalValue} ${item.hashrateType}`,
        },
      ];
    },
  },

  render() {
    const iconMap = {
      [this.dynamicChainType.symbol]: (
        <img class='spotecicon' src={this.dynamicChainType.icon} alt="" />
      ),
      BTC: <BtcIcon />,
      ETH: <EthIcon />,
    };
    return (
      <Spin spinning={this.getProductHashrateStatisticsLoading}>
        <WidgetTitle
          scopedSlots={{
            rightContent: () => (
              <Link
                class="modal-text-link"
                target="_blank"
                to={accountOrdersPath}
              >
                {this.$t('markeMyOrde')}
              </Link>),
          }}
        >
          {this.$t('mineTitleHashrate')}
        </WidgetTitle>
        <Card>
          {
            this.statisticsList.map(item => {
              return (
                <Row gutter={10} type="flex" align="middle" class={styles['table-row']}>
                  <Col span={4}>
                    <div class={styles['coin-container']}>
                      {iconMap[item.hashrateType]}
                      <span>{item.hashrateType}</span>
                    </div>
                  </Col>
                  {
                    this.getTablePartData(item).map(({ title, value }) => (
                      <Col span={6}>
                        { this.getCellNode({ title, value }) }
                      </Col>
                    ))
                  }
                  <Col span={2}>
                    <Button type="primary" onClick={() => this.redirectToHashRateList(item.hashrateType)}>
                      {this.$t('webDefaultTitle')}
                    </Button>
                  </Col>
                </Row>
              );
            })
          }
        </Card>
      </Spin>
    );
  },
};

export default Hashrate;
