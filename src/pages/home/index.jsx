import * as API from '@/api';
import * as homeAPI from '@/api/home';
import { mapActions, mapState } from 'vuex';
import isEmpty from 'lodash/isEmpty';
import ProductMarket from '@/pages/home/ProductMarket';
import BlockChainDate from '@/pages/home/BlockChainDate';
import BaseContainer from '@/shared/components/BaseContainer';
import { HOME, GET_MARKETS_LIST, GET_HASHRATE_COUPON_POPUP_LIST,
  GET_HOME_PRODUCT_LIST, GET_HASHRATE_POPUP_LIST } from '@/modules/home';
import OurAdvantage from '@/pages/home/OurAdvantage';
import localStorage from '@/shared/utils/localStorage';
import TradeBeforeVerified from '@/shared/components/TradeBeforeVerified';
import CooperationCompany from '@/pages/home/CooperationCompany';
import CorporateCulture from '@/pages/home/CorporateCulture';
import Banner from './Banner';
import Download from './Download';
import CoinMarkets from './CoinMarkets';
import Announcements from './Announcements';
import BannerModal from './component/BannerModal';
import HashrateModal from './component/HashrateModal';
import HashrateCouponModal from './component/HashrateCouponModal';

import styles from './index.less?module';

const Home = {
  async asyncData(ctx) {
    const props = {
      announcementList: [],
      versionInfo: {
        android: {
          version: '-',
        },
        iOS: {
          version: '-',
        },
      },
      bannersList: [],
    };
    const getAnnouncementPromise = API.getAnnouncementList({}, { ctx });
    const getBannersPromise = homeAPI.getBanners({}, { ctx });

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

    try {
      const { body: { list } } = await getBannersPromise;
      props.bannersList = list;
    } catch (error) {
      console.log('error');
    }

    return props;
  },
  data() {
    return {
      bannerPopupList: [],
      needPopupBannerList: [],
      isControlCheck: false,
      isVerifyChecked: true,
    };
  },
  computed: {
    ...mapState({
      marketsList: state => state.home.marketsList,
      productList: state => state.home.productList,
      marketsLoading: state => state.loading.effects[`${HOME}/${GET_MARKETS_LIST}`],
      hashrateCouponPopupList: state => state.home.hashrateCouponPopupList,
      hashrateCouponPopupListLoading: state => state.loading.effects[`${HOME}/${GET_HASHRATE_COUPON_POPUP_LIST}`],
      hashratePopupList: state => state.home.hashratePopupList,
      hashratePopupListLoading: state => state.loading.effects[`${HOME}/${GET_HASHRATE_POPUP_LIST}`],
    }),
    needPopupCouponList() {
      const [needPopupCoupon] = this.hashrateCouponPopupList;
      return needPopupCoupon ? [needPopupCoupon] : [];
    },
    needPopupHashrateList() {
      const [needPopupHashrate] = this.hashratePopupList;
      return needPopupHashrate ? [needPopupHashrate] : [];
    },
    isVisibleHashrateCoupon() {
      return isEmpty(this.hashratePopupList);
    },
    isVisibleBannerPopup() {
      return (isEmpty(this.needPopupCouponList) && !this.hashrateCouponPopupListLoading)
        && ((isEmpty(this.needPopupHashrateList) && !this.hashratePopupListLoading));
    },
  },

  mounted() {
    this.filterBannerPopupList();
    const { registerStatus, userId } = localStorage.getObject('userInfo');
    const isNotFirstShow = localStorage.get('isNotFirstShow');
    if (registerStatus && !isNotFirstShow) {
      this.isVerifyChecked = false;
      this.isControlCheck = true;
      localStorage.set('isNotFirstShow', true);
    }
    this[GET_MARKETS_LIST]();
    this[GET_HOME_PRODUCT_LIST]();

    if (userId) {
      this[GET_HASHRATE_COUPON_POPUP_LIST]({ userId });
      this[GET_HASHRATE_POPUP_LIST]({ userId });
    }
  },

  methods: {
    ...mapActions(HOME, [GET_MARKETS_LIST, GET_HOME_PRODUCT_LIST, GET_HASHRATE_COUPON_POPUP_LIST, GET_HASHRATE_POPUP_LIST]),
    filterBannerPopupList() {
      const localBannerPopupList = isEmpty(localStorage.getObject('bannerPopupList')) ?
        [] : localStorage.getObject('bannerPopupList');
      this.needPopupBannerList = this.bannersList.filter(newBanner => {
        let needPopup = true;
        localBannerPopupList.forEach(oldBanner => {
          if (newBanner.id === oldBanner.id && !oldBanner.isPopup) {
            needPopup = false;
          }
        });
        if (needPopup) {
          newBanner.isPopup = true;
        } else {
          newBanner.isPopup = false;
        }
        return newBanner.needPush;
      });
      const needPopupBanner = this.needPopupBannerList.find(item => item.isPopup);

      this.bannerPopupList = needPopupBanner ? [needPopupBanner] : [];
    },
    viewed(id) {
      const needPopupBannerList = this.needPopupBannerList.map(item => {
        if (item.id === id) {
          item.isPopup = false;
        }
        return item;
      });

      const localBannerPopupList = isEmpty(localStorage.getObject('bannerPopupList')) ?
        [] : localStorage.getObject('bannerPopupList');

      const recordId = {};

      const saveLocalBannerList = [...this.needPopupBannerList, ...localBannerPopupList].reduce((item, next) => {
        recordId[next.id] ? '' : recordId[next.id] = true && item.push(next);
        return item;
      }, []);

      const needPopupBanner = needPopupBannerList.find(item => item.isPopup);

      this.bannerPopupList = needPopupBanner ? [needPopupBanner] : [];
      localStorage.setObject('bannerPopupList', saveLocalBannerList);
    },
    hashrateCouponViewed() {
      this.hashrateCouponPopupList.shift();
    },

    hashrateViewed() {
      this.hashratePopupList.shift();
    },
  },

  render() {
    return (
      <div>
        <Banner list={this.bannersList} />
        <BaseContainer>
          <Announcements announcementList={this.announcementList} />
          <CoinMarkets data={this.marketsList} loading={this.marketsLoading} />
          <ProductMarket productList={this.productList} />
        </BaseContainer>

        <div class={styles['chain-data-wrap']}>
          <BaseContainer>
            <BlockChainDate />
            <OurAdvantage />
            <CooperationCompany />
          </BaseContainer>
        </div>

        <BaseContainer className={styles['download-wrap']}>
          <Download versionInfo={this.versionInfo} />
        </BaseContainer>

        <BaseContainer>
          <CorporateCulture />
        </BaseContainer>

        <TradeBeforeVerified
          isVerifiedKyc
          isControlCheck={this.isControlCheck}
          onVerifiedPass={() => {
            this.isVerifyChecked = true;
          }}
          onDialogClose={() => {
            this.isVerifyChecked = true;
          }}
        />
        {this.isVisibleBannerPopup && (
          <div>
            {this.bannerPopupList.map(item => (
              <div>{item.isPopup && <BannerModal info={item} onViewed={this.viewed} />}</div>
            ))}
          </div>
        )}
        {this.isVerifyChecked && (
          <div>
            {this.needPopupHashrateList.map(item => (
              <HashrateModal info={item} onViewed={this.hashrateViewed} />
            ))}
          </div>
        )}
        {this.isVisibleHashrateCoupon && (
          <div>
            {this.needPopupCouponList.map(item => (
              <HashrateCouponModal
                info={item}
                onViewed={this.hashrateCouponViewed}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
};

export default Home;
