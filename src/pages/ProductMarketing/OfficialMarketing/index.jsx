import { Spin } from 'ant-design-vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import NoData from '@/shared/components/NoData';
import KeepTabs from '@/shared/components/KeepTabs';
import { ALL, BTC, ETH } from '@/shared/consts/coinType';
import BaseContainer from '@/shared/components/BaseContainer';
import ProductListCell from '@/shared/components/ProductListCell';
import { UPDATE_PRODUCT_LIST, OFFICIAL_PRODUCT,
  GET_OFFICIAL_PRODUCT_LIST, UPDATE_ACTIVE_COIN } from '@/modules/officialProduct';
import TopNav from '../components/TopNav';
import styles from './index.less?module';

const { TabPane } = KeepTabs;

const OfficialMarketing = {
  data() {
    return {
      activeChainType: this.$route.query.OfficialCoinType || ALL,
    };
  },

  computed: mapState({
    activeCoin: state => state.officialProduct.activeCoin,
    allProductList: state => state.officialProduct.allProductList,
    btcProductList: state => state.officialProduct.btcProductList,
    ethProductList: state => state.officialProduct.ethProductList,
    getListLoading: state => state.loading.effects[`${OFFICIAL_PRODUCT}/${GET_OFFICIAL_PRODUCT_LIST}`],
  }),

  mounted() {
    const chainType = this.activeChainType || this.activeCoin || ALL;
    this.activeChainType = chainType;
    const data = chainType === ALL ? {} : { chainType };
    this.getProductList(data);
  },

  methods: {
    ...mapActions(OFFICIAL_PRODUCT, [GET_OFFICIAL_PRODUCT_LIST]),
    ...mapMutations(OFFICIAL_PRODUCT, [UPDATE_ACTIVE_COIN, UPDATE_PRODUCT_LIST]),

    onTabsChange(newKey) {
      this.activeChainType = newKey;
      const data = newKey === ALL ? {} : { chainType: newKey };
      this.getProductList(data);
    },

    getProductList(data) {
      this[GET_OFFICIAL_PRODUCT_LIST](data)
        .then(() => {
          if (window) {
            window.scrollTo(0, 0);
          }
        });
    },
  },

  destroyed() {
    this[UPDATE_ACTIVE_COIN](this.active);
    this[UPDATE_PRODUCT_LIST]({ list: [], key: this.active });
  },

  render() {
    return (
      <BaseContainer class={styles['product-list-wrapper']}>
        <TopNav />
        <Spin spinning={this.getListLoading}>
          <KeepTabs
            class='mine-tabs-card'
            activeKeyName="OfficialCoinType"
            value={this.activeChainType}
            onChange={this.onTabsChange}
          >
            <TabPane key={ALL} tab={this.$t('all')}>
              {!!this.allProductList.length ? <ProductListCell productList={this.allProductList} /> : <NoData />}
            </TabPane>
            <TabPane key={BTC} tab={this.$t('BTCHashRate')}>
              {!!this.btcProductList.length ? <ProductListCell productList={this.btcProductList} /> : <NoData />}
            </TabPane>
            <TabPane key={ETH} tab={this.$t('ETHHashRate')}>
              {!!this.ethProductList.length ? <ProductListCell productList={this.ethProductList} /> : <NoData />}
            </TabPane>
          </KeepTabs>
        </Spin>
      </BaseContainer>
    );
  },
};

export default OfficialMarketing;
