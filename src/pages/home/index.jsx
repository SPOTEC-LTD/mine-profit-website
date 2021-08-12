import * as API from '@/api';
import { mapActions, mapState } from 'vuex';
import ProductMarket from '@/pages/home/ProductMarket';
import BlockChainDate from '@/pages/home/BlockChainDate';
import BaseContainer from '@/shared/components/BaseContainer';
import { HOME, GET_MARKETS_LIST, GET_HOME_PRODUCT_LIST } from '@/modules/home';
import RankEnter from '@/pages/home/RankEnter';
import TradeBeforeVerified from '@/shared/components/TradeBeforeVerified';
import localStorage from '@/shared/utils/localStorage';
import Banner from './Banner';
import Announcements from './Announcements';
import CoinMarkets from './CoinMarkets';
import Download from './Download';

import styles from './index.less?module';

const Home = {
  async asyncData(ctx) {
    const props = {
      announcementList: [],
      versionInfo: {},
    };
    const getAnnouncementPromise = API.getAnnouncementList({}, { ctx });

    try {
      const { body: { list } } = await getAnnouncementPromise;
      props.announcementList = list;
    } catch (error) {
      console.log('error');
    }

    try {
      const { body } = await API.fetchAppVersion({}, { ctx });
      props.versionInfo = body;
    } catch (error) {
      console.log('error', error);
    }

    return props;
  },

  computed: {
    ...mapState({
      marketsList: state => state.home.marketsList,
      productList: state => state.home.productList,
      marketsLoading: state => state.loading.effects[`${HOME}/${GET_MARKETS_LIST}`],
    }),
  },

  mounted() {
    const { registerStatus } = localStorage.getObject('userInfo');
    const isNotFirstShow = localStorage.get('isNotFirstShow');
    if (registerStatus && !isNotFirstShow) {
      this.isControlCheck = true;
      localStorage.set('isNotFirstShow', true);
    }
    this[GET_MARKETS_LIST]();
    this[GET_HOME_PRODUCT_LIST]();
  },

  methods: {
    ...mapActions(HOME, [GET_MARKETS_LIST, GET_HOME_PRODUCT_LIST]),
  },

  render() {
    return (
      <div>
        <Banner />
        <BaseContainer>
          <Announcements announcementList={this.announcementList} />
          <CoinMarkets data={this.marketsList} loading={this.marketsLoading} />
          <ProductMarket productList={this.productList} />
        </BaseContainer>
        <RankEnter />
        <BaseContainer>
          <BlockChainDate />
        </BaseContainer>
        <BaseContainer className={styles['download-wrap']}>
          <Download versionInfo={this.versionInfo} />
        </BaseContainer>

        <TradeBeforeVerified
          isVerifiedKyc
          isControlCheck={this.isControlCheck}
        />
      </div>
    );
  },
};

export default Home;
