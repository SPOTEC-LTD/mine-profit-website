import { Select, Spin } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import BaseContainer from '@/shared/components/BaseContainer';
import { HASH_RATE, GET_PRODUCT_HASHRATE_LIST, hashrateStatusMap } from '@/modules/account/hashRate';
import * as hashRateAPI from '@/api/account/hashRate';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import KeepTabs from '@/shared/components/KeepTabs';
import NoData from '@/shared/components/NoData';
import TotalSection from './TotalSection';
import Ordinary from './Ordinary';
import styles from './index.less?module';

const { TabPane } = KeepTabs;

const HashrateList = {
  async asyncData(ctx) {
    const { userId } = getUserInfoFunc(ctx);

    const props = {
      statistics: [{}],
    };
    try {
      const { body: { list } } = await hashRateAPI.getProductHashrateStatistics({ pathParams: { userId } }, { ctx });
      props.statistics = list;
    } catch (error) {
      console.log('error', error);
    }

    return props;
  },

  data() {
    return {
      hashrateType: this.$route.query.hashrateType || 'BTC',
      unit: 'T',
      hashTypeStatusKey: this.$route.query.activeName || hashrateStatusMap.ORDINARY,
      orderStatus: null,
    };
  },

  computed: {
    ...mapState({
      getProductHashrateListLoading: state => state.loading.effects[`${HASH_RATE}/${GET_PRODUCT_HASHRATE_LIST}`],
      ordinaryList: state => state.hashRate[hashrateStatusMap.ORDINARY],
      closeList: state => state.hashRate[hashrateStatusMap.CLOSE],
      pledgesList: state => state.hashRate[hashrateStatusMap.PLEDGES],
      transferList: state => state.hashRate[hashrateStatusMap.TRANSFER],
      shutdownList: state => state.hashRate[hashrateStatusMap.SHUTDOWN],
    }),
  },

  mounted() {
    if (this.$route.query.hashrateType) {
      this.hashrateType = this.$route.query.hashrateType;
    }
    this.getProductHashrateListAction();
  },

  methods: {
    ...mapActions(HASH_RATE, [GET_PRODUCT_HASHRATE_LIST]),
    onOrderChange(value) {
      this.orderStatus = value;
      this.getProductHashrateListAction();
    },

    onTabsChange(newActiveTabKey) {
      this.hashTypeStatusKey = newActiveTabKey;
      this.getProductHashrateListAction();
    },

    getParams() {
      const paramsMap = {
        [hashrateStatusMap.PLEDGES]: {
          status: this.orderStatus,
        },
      };

      return paramsMap[this.hashTypeStatusKey] || {};
    },

    getProductHashrateListAction() {
      this[GET_PRODUCT_HASHRATE_LIST]({
        hashrateType: this.hashrateType,
        ...this.getParams(),
        hashTypeStatusKey: this.hashTypeStatusKey,
      });
    },

    handleSelectChange(value) {
      this.hashrateType = value;
      if (this.$route.query.hashrateType !== value) {
        this.$router.replace({ query: { ...this.$route.query, hashrateType: value } });
      }
      this.getProductHashrateListAction();
    },

    toTransferPage() {
      this.hashTypeStatusKey = hashrateStatusMap.TRANSFER;
      this.getProductHashrateListAction();
    },
  },

  render() {
    return (
      <BaseContainer>
        <div>
          <Select
            class={styles['hashrate-type-select']}
            defaultValue='BTC'
            onChange={this.handleSelectChange}
            suffixIcon={<TriangleFilled className="select-icon" />}
          >
            {
              ['BTC', 'ETH'].map(value => (
                <Select.Option key={value}>
                  {value}
                </Select.Option>
              ))
            }
          </Select>
        </div>
        <TotalSection
          hashrateType={this.hashrateType}
          statistics={this.statistics}
        />
          <Spin spinning={this.getProductHashrateListLoading}>
            <KeepTabs
              class="mine-tabs-card"
              value={this.hashTypeStatusKey}
              onChange={this.onTabsChange}
            >
              <TabPane key={hashrateStatusMap.ORDINARY} tab={this.$t('typeNormal')}>
              {
                  !!this.ordinaryList.length ?
                    <Ordinary
                      dataSource={this.ordinaryList}
                      onRefresh={this.getProductHashrateListAction}
                      onToTransferPage={this.toTransferPage}
                    />
                    :
                    <NoData class={styles['no-data']} />
                }
              </TabPane>
              {/* <TabPane name={hashrateStatusMap.CLOSE} title={this.$t('typeClose')}>
                {
                  !!this.closeList.length ?
                    <Close dataSource={this.closeList} />
                    :
                    <NoData class={styles['no-data']} />
                }

              </TabPane>
              <TabPane name={hashrateStatusMap.PLEDGES} class={styles['pledges-tab']} title={this.$t('typePledge')}>
                {
                  !!this.pledgesList.length ?
                    <Pledges dataSource={this.pledgesList} onRefresh={this.getProductHashrateListAction} />
                    :
                    <NoData class={styles['no-data']} />
                }
              </TabPane>
              <TabPane name={hashrateStatusMap.TRANSFER} title={this.$t('typeTransfer')}>
                {
                  !!this.transferList.length ?
                    <Transfer
                      dataSource={this.transferList}
                      onRefresh={this.getProductHashrateListAction}
                    />
                    :
                    <NoData class={styles['no-data']} />
                }
              </TabPane>
              <TabPane name={hashrateStatusMap.SHUTDOWN} title={this.$t('typeShutDown')}>
                {
                  this.shutdownList.length ?
                    <Shutdown dataSource={this.shutdownList} onToTransferPage={this.toTransferPage} />
                    :
                  <NoData class={styles['no-data']} />
                }
              </TabPane> */}
            </KeepTabs>
          </Spin>
      </BaseContainer>
    );
  },
};

export default HashrateList;
