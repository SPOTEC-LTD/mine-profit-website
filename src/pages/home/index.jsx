import * as API from '@/api';
import * as homeAPI from '@/api/home';
import { mapActions, mapState } from 'vuex';
import isEmpty from 'lodash/isEmpty';
import ProductMarket from '@/pages/home/ProductMarket';
import BlockChainDate from '@/pages/home/BlockChainDate';
import BaseContainer from '@/shared/components/BaseContainer';
import {
  HOME, GET_MARKETS_LIST, GET_HASHRATE_COUPON_POPUP_LIST,
  GET_HOME_PRODUCT_LIST, GET_HASHRATE_POPUP_LIST, GET_WEEKLY_REPORT_POPUP_INFO,
} from '@/modules/home';
import { ACTIVITY, GET_ACTIVITY_PUSH_LIST } from '@/modules/activity';
import { STATION_MAIL, GET_WEEKLY_REPORT_DETAIL } from '@/modules/stationMail';
import OurAdvantage from '@/pages/home/OurAdvantage';
import localStorage from '@/shared/utils/localStorage';
import TradeBeforeVerified from '@/shared/components/TradeBeforeVerified';
import CooperationCompany from '@/pages/home/CooperationCompany';
import CorporateCulture from '@/pages/home/CorporateCulture';
import WeeklyOutputReportModal from '@/shared/components/PageHeader/StationMail/WeeklyOutputReportModal';
import { HAVE_REPORT } from './consts/haveWeeklyReport';
import { NOT_EJECTED } from './consts/weeklyStatus';
import Banner from './Banner';
import Download from './Download';
import CoinMarkets from './CoinMarkets';
import Announcements from './Announcements';
import BannerModal from './component/BannerModal';
import HashrateModal from './component/HashrateModal';
import HashrateCouponModal from './component/HashrateCouponModal';
import ActivityModal from './component/ActivityModal';

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
    const getHomeAnnouncementPromise = API.getHomeAnnouncementList({}, { ctx });
    const getBannersPromise = homeAPI.getBanners({}, { ctx });
    const fetchAppVersionPromise = API.fetchAppVersion({}, { ctx });

    try {
      const { body: { list } } = await getHomeAnnouncementPromise;
      props.announcementList = list;
    } catch (error) {
      console.log('error');
    }

    try {
      const { body } = await fetchAppVersionPromise;
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
      activityPopupList: [],
      needPopupActivityList: [],
      isControlCheck: false,
      isVerifyChecked: true,
    };
  },
  computed: {
    ...mapState({
      activityPushList: state => state.activity.activityPushList,
      marketsList: state => state.home.marketsList,
      productList: state => state.home.productList,
      hashrateCouponPopupList: state => state.home.hashrateCouponPopupList,
      hashratePopupList: state => state.home.hashratePopupList,
      weeklyReportInfo: state => state.home.weeklyReportInfo,
      weeklyReportDetail: state => state.stationMail.weeklyReportDetail,
      marketsLoading: state => state.loading.effects[`${HOME}/${GET_MARKETS_LIST}`],
      hashrateCouponPopupListLoading: state => state.loading.effects[`${HOME}/${GET_HASHRATE_COUPON_POPUP_LIST}`],
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
    isVisibleActivityPopup() {
      return this.isVisibleBannerPopup && isEmpty(this.bannerPopupList);
    },
    isVisibleWeeklyReport() {
      const { haveWeeklyReport, status } = this.weeklyReportInfo;
      const isVisible = !isEmpty(this.weeklyReportDetail) && this.isVisibleActivityPopup
        && haveWeeklyReport === HAVE_REPORT
        && status === NOT_EJECTED
        && isEmpty(this.activityPopupList);
      return isVisible;
    },
  },

  mounted() {
    this.filterBannerPopupList();
    this[GET_ACTIVITY_PUSH_LIST]().then(() => {
      this.filterActivityPopupList();
    });
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
      this[GET_WEEKLY_REPORT_POPUP_INFO]({ userId })
        .then(({ haveWeeklyReport, status, id }) => {
          if (haveWeeklyReport === HAVE_REPORT && status === NOT_EJECTED) {
            this[GET_WEEKLY_REPORT_DETAIL]({ id });
          }
        });
    }
  },

  methods: {
    ...mapActions(HOME, [
      GET_MARKETS_LIST, GET_HOME_PRODUCT_LIST, GET_HASHRATE_COUPON_POPUP_LIST,
      GET_HASHRATE_POPUP_LIST, GET_WEEKLY_REPORT_POPUP_INFO,
    ]),
    ...mapActions(STATION_MAIL, [GET_WEEKLY_REPORT_DETAIL]),
    ...mapActions(ACTIVITY, [GET_ACTIVITY_PUSH_LIST]),
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
    filterActivityPopupList() {
      const localActivityPopupList = isEmpty(localStorage.getObject('activityPopupList')) ?
        [] : localStorage.getObject('activityPopupList');
      this.needPopupActivityList = this.activityPushList.filter(newActivity => {
        let needPopup = true;
        localActivityPopupList.forEach(oldActivity => {
          if (newActivity.id === oldActivity.id && !oldActivity.isPopup) {
            needPopup = false;
          }
        });
        if (needPopup) {
          newActivity.isPopup = true;
        } else {
          newActivity.isPopup = false;
        }
        return newActivity.needPush;
      });
      const needPopupActivity = this.needPopupActivityList.find(item => item.isPopup);

      this.activityPopupList = needPopupActivity ? [needPopupActivity] : [];
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
    activityViewed(id) {
      const needPopupActivityList = this.needPopupActivityList.map(item => {
        if (item.id === id) {
          item.isPopup = false;
        }
        return item;
      });

      const localActivityPopupList = isEmpty(localStorage.getObject('activityPopupList')) ?
        [] : localStorage.getObject('activityPopupList');

      const recordId = {};

      const saveLocalActivityList = [...this.needPopupActivityList, ...localActivityPopupList].reduce((item, next) => {
        recordId[next.id] ? '' : recordId[next.id] = true && item.push(next);
        return item;
      }, []);

      const needPopupActivity = needPopupActivityList.find(item => item.isPopup);

      this.activityPopupList = needPopupActivity ? [needPopupActivity] : [];
      localStorage.setObject('activityPopupList', saveLocalActivityList);
    },
    hashrateCouponViewed() {
      this.hashrateCouponPopupList.shift();
    },

    hashrateViewed() {
      this.hashratePopupList.shift();
    },

    viewedReport() {
      const { id } = this.weeklyReportDetail;
      const { userId } = localStorage.getObject('userInfo');
      homeAPI.viewedWeeklyReportPopup({ pathParams: { id } })
        .then(() => {
          this[GET_WEEKLY_REPORT_POPUP_INFO]({ userId });
        });
    },
  },

  render() {
    return (
      <div>
        {/* id为下载页面所需，切勿删除，如加元素在download组件之上，请放置在download-top-container中 */}
        <div id="download-top-container">
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
        {this.isVisibleActivityPopup && (
          <div>
            {this.activityPopupList.map(item => (
              <div>{item.isPopup && <ActivityModal info={item} onViewed={this.activityViewed} />}</div>
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

        {this.isVisibleWeeklyReport && (
          <WeeklyOutputReportModal value={true} reportInfo={this.weeklyReportDetail} onClose={this.viewedReport} />
        )}
      </div>
    );
  },
};

export default Home;
