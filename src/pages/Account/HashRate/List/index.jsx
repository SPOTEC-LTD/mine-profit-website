import { mapActions, mapState } from 'vuex';
import { Spin, Button } from 'ant-design-vue';
import { platformCurrencyPaths } from '@/router/consts/urls';
import locationServices from '@/shared/services/location/locationServices';
import Select from '@/shared/components/Select';
import BaseContainer from '@/shared/components/BaseContainer';
import { HASH_RATE, GET_PRODUCT_HASHRATE_LIST, GET_DYNAMIC_HASH_INFO, hashrateStatusMap } from '@/modules/account/hashRate';
import { COMMON, GET_CHAIN_ORDER } from '@/modules/common';
import * as hashRateAPI from '@/api/account/hashRate';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import KeepTabs from '@/shared/components/KeepTabs';
import NoData from '@/shared/components/NoData';
import { getPledgesOderStatusList } from '@/pages/Account/HashRate/consts/pledgesOderStatus';
import TotalSection from './TotalSection';
import Ordinary from './Ordinary';
import Close from './Close';
import Pledges from './Pledges';
import Transfer from './Transfer';
import Shutdown from './Shutdown';
import DynamicHash from './DynamicHash';
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
      chainOrderList: state => state.common.chainOrderList,
      dynamicChainTypeList: state => state.dynamicChainTypeList,
    }),

    dynamicChain() {
      const [chainInfo = { symbol: '' }] = this.dynamicChainTypeList;
      return chainInfo.symbol;
    },
  },

  mounted() {
    const hashRate = this.$route.query.hashrateType;
    this[GET_CHAIN_ORDER]();
    if (hashRate === this.dynamicChain) {
      this[GET_DYNAMIC_HASH_INFO]();
    }
    if (hashRate) {
      this.hashrateType = hashRate;
    }
    this.getProductHashrateListAction();
  },

  methods: {
    ...mapActions(COMMON, [GET_CHAIN_ORDER]),
    ...mapActions(HASH_RATE, [GET_PRODUCT_HASHRATE_LIST, GET_DYNAMIC_HASH_INFO]),
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
      if (value === this.dynamicChain) {
        this[GET_DYNAMIC_HASH_INFO]();
      } else {
        this.getProductHashrateListAction();
      }
    },

    toTransferPage() {
      this.hashTypeStatusKey = hashrateStatusMap.TRANSFER;
      this.getProductHashrateListAction();
    },

    toEcologyPage() {
      locationServices.push(platformCurrencyPaths);
    },
  },

  render() {
    const isDynamicChain = this.hashrateType === this.dynamicChain;
    return (
      <BaseContainer>
        <div>
          <Select
            class={styles['hashrate-type-select']}
            value={this.hashrateType}
            onChange={this.handleSelectChange}
          >
            {
              this.chainOrderList.map(value => (
                <Select.Option key={value}>
                  {value}
                </Select.Option>
              ))
            }
          </Select>
          {isDynamicChain && (
            <Button class={styles['view-ecology']} type="primary" onClick={this.toEcologyPage}>
              {this.$t('viewEcology', { value: this.dynamicChain })}
            </Button>
          )}
        </div>
        <TotalSection
          hashrateType={this.hashrateType}
          statistics={this.statistics}
        />
        {!isDynamicChain && (
          <KeepTabs
            class={['mine-tabs-card', styles['hashrate-list-container']]}
            value={this.hashTypeStatusKey}
            onChange={this.onTabsChange}
          >
            <TabPane key={hashrateStatusMap.ORDINARY} tab={this.$t('typeNormal')}>
              <Spin spinning={this.getProductHashrateListLoading}>
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
              </Spin>
            </TabPane>
            <TabPane key={hashrateStatusMap.CLOSE} tab={this.$t('typeClose')}>
              <Spin spinning={this.getProductHashrateListLoading}>
                {
                  !!this.closeList.length ?
                    <Close dataSource={this.closeList} />
                    :
                    <NoData class={styles['no-data']} />
                }
              </Spin>
            </TabPane>
            <TabPane key={hashrateStatusMap.PLEDGES} class={styles['pledges-tab']} tab={this.$t('typePledge')}>

                <Select
                  class={styles['pledges-status-select']}
                  value={this.orderStatus}
                  onChange={this.onOrderChange}
                >
                  {
                    getPledgesOderStatusList().map(({ text, value }) => (
                      <Select.Option key={value}>
                        {text}
                      </Select.Option>
                    ))
                  }
                </Select>
                <Spin spinning={this.getProductHashrateListLoading}>
                  {
                    !!this.pledgesList.length ?
                      <Pledges dataSource={this.pledgesList} onRefresh={this.getProductHashrateListAction} />
                      :
                      <NoData class={styles['no-data']} />
                  }
                </Spin>
            </TabPane>
            <TabPane key={hashrateStatusMap.TRANSFER} tab={this.$t('typeTransfer')}>
              <Spin spinning={this.getProductHashrateListLoading}>
                {
                  !!this.transferList.length ?
                    <Transfer
                      dataSource={this.transferList}
                      onRefresh={this.getProductHashrateListAction}
                    />
                    :
                    <NoData class={styles['no-data']} />
                }
              </Spin>
            </TabPane>
            <TabPane key={hashrateStatusMap.SHUTDOWN} tab={this.$t('typeShutDown')}>
              <Spin spinning={this.getProductHashrateListLoading}>
                {
                  this.shutdownList.length ?
                    <Shutdown dataSource={this.shutdownList} onToTransferPage={this.toTransferPage} />
                    :
                  <NoData class={styles['no-data']} />
                }
              </Spin>
            </TabPane>
          </KeepTabs>
        )}
        {isDynamicChain && (
          <DynamicHash />
        )}
      </BaseContainer>
    );
  },
};

export default HashrateList;
