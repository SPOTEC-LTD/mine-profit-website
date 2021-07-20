import { mapActions, mapState } from 'vuex';

import * as API from '@/api';
import { HOME, GET_MARKETS_LIST } from '@/modules/home';
import BaseContainer from '@/shared/components/BaseContainer';
import BlockChainDate from '@/pages/home/BlockChainDate';
import ProductMarket from '@/pages/home/ProductMarket';
import Banner from './Banner';
import Announcements from './Announcements';
import CoinMarkets from './CoinMarkets';

const Home = {
  async asyncData(ctx) {
    const props = {
      announcementList: [],
    };
    const getAnnouncementPromise = API.getAnnouncementList({}, { ctx });

    try {
      const { body: { list } } = await getAnnouncementPromise;
      props.announcementList = list;
    } catch (error) {
      console.log('error');
    }

    return props;
  },
  computed: {
    ...mapState({
      marketsList: state => state.home.marketsList,
      marketsLoading: state => state.loading.effects[`${HOME}/${GET_MARKETS_LIST}`],
    }),
  },
  mounted() {
    this[GET_MARKETS_LIST]();
  },
  methods: {
    ...mapActions(HOME, [GET_MARKETS_LIST]),
  },
  render() {
    return (
      <div>
        <Banner />
        <BaseContainer>
          <Announcements announcementList={this.announcementList} />
          <CoinMarkets data={this.marketsList} loading={this.marketsLoading} />
          <BlockChainDate />
          <ProductMarket />
        </BaseContainer>
      </div>
    );
  },
};

export default Home;
