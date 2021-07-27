import produce from 'immer';
import { Spin, Pagination } from 'ant-design-vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import NoData from '@/shared/components/NoData';
import KeepTabs from '@/shared/components/KeepTabs';
import { BTC, ETH, ALL } from '@/shared/consts/coinType';
import BaseContainer from '@/shared/components/BaseContainer';
import ProductListCell from '@/shared/components/ProductListCell';
import { PAGE_SIZE, PAGE_NUM } from '@/shared/consts/defaultInfoAmount';
import FieldOrderList from '@/shared/components/FieldOrder/FieldOrderList';
import { C2C_MARKET, GET_C2C_MARKET_LIST, UPDATE_ACTIVE_COIN, RESET_STATE } from '@/modules/c2cMarket';
import TopNav from '../components/TopNav';
import styles from './index.less?module';

const { TabPane } = KeepTabs;

const C2CMarketing = {
  data() {
    return {
      activeChainType: this.$route.query.c2cCoinType || ALL,
    };
  },

  computed: mapState({
    paramData: state => state.c2cMarket.paramData,
    c2cMarketList: state => state.c2cMarket.c2cMarketList,
    pageInfo: state => state.c2cMarket.pageInfo,
    getListLoading: state => state.loading.effects[`${C2C_MARKET}/${GET_C2C_MARKET_LIST}`],
  }),

  mounted() {
    const chainType = this.activeChainType || this.paramData.chainType || ALL;
    this.activeChainType = chainType;
    const resultParamData = produce(this.paramData, draft => {
      draft.chainType = chainType === ALL ? undefined : chainType;
    });
    this.getProductList(resultParamData);
  },

  methods: {
    ...mapActions(C2C_MARKET, [GET_C2C_MARKET_LIST]),
    ...mapMutations(C2C_MARKET, [UPDATE_ACTIVE_COIN, RESET_STATE]),

    getProductList(data) {
      this[RESET_STATE]();
      this[UPDATE_ACTIVE_COIN](data);
      this[GET_C2C_MARKET_LIST](data)
        .then(() => {
          if (window) {
            window.scrollTo(0, 0);
          }
        });
    },

    onTabsChange(key) {
      this.activeChainType = key;
      const resultParamData = produce(this.paramData, draft => {
        draft.chainType = key === ALL ? undefined : key;
      });
      this.getProductList(resultParamData);
    },

    handleSortChange(options = {}) {
      const { order, field } = options;
      const resultParamData = produce(this.paramData, draft => {
        draft.order = order;
        draft.field = field;
      });
      this.getProductList(resultParamData);
    },

    onPageChange(current) {
      const resultParamData = produce(this.paramData, draft => {
        draft.pageNum = current;
      });
      this.getProductList(resultParamData);
    },

    getFieldOrderList() {
      const orderData = [
        { label: this.$t('publishTime'), field: 'createTime', defaultOrder: 'descend' },
        { label: this.$t('unitPrice'), field: 'price' },
      ];
      return (
        <div class={styles['field-order-wrapper']}>
          <span class={styles['field-order-title']}>{this.$t('fieldOrder')}</span>
          <FieldOrderList dataSource={orderData} onChange={value => { this.handleSortChange(value); }} />
        </div>
      );
    },

    getPageTotalNode(total) {
      return (
        <span class={styles['page-total-wrapper']}>
          <span>{this.$t('altogether')}</span>
          <span class={styles['page-total']}>{total}</span>
          <span>{this.$t('number')}</span>
        </span>
      );
    },

    ListNode() {
      return (
        this.c2cMarketList.length ?
          <ProductListCell productList={this.c2cMarketList} isOfficialMarket={false}/>
          :
          <NoData />
      );
    },
  },

  destroyed() {
    this[RESET_STATE]();
    this[UPDATE_ACTIVE_COIN](this.paramData);
  },

  render() {
    return (
      <BaseContainer class={styles['product-list-wrapper']}>
        <TopNav />
        <Spin spinning={this.getListLoading}>
          <KeepTabs
            class='mine-tabs-card'
            activeKeyName="c2cCoinType"
            value={this.activeChainType}
            onChange={this.onTabsChange}
            scopedSlots={{ tabBarExtraContent: this.getFieldOrderList }}
          >
            <TabPane key={ALL} tab={this.$t('all')}>
              {this.ListNode()}
            </TabPane>
            <TabPane key={BTC} tab={this.$t('BTCHashRate')}>
              {this.ListNode()}
            </TabPane>
            <TabPane key={ETH} tab={this.$t('ETHHashRate')}>
              {this.ListNode()}
            </TabPane>
          </KeepTabs>
          <Pagination
            total={this.pageInfo.total}
            showTotal={total => this.getPageTotalNode(total)}
            pageSize={PAGE_SIZE}
            defaultCurrent={PAGE_NUM}
            onChange={this.onPageChange}
          />
        </Spin>
      </BaseContainer>
    );
  },
};

export default C2CMarketing;
