import * as API from '@/api';
import * as homeAPI from '@/api/home';
import { mapActions, mapState } from 'vuex';
import isEmpty from 'lodash/isEmpty';
import ProductMarket from '@/pages/home/ProductMarket';
import BlockChainDate from '@/pages/home/BlockChainDate';
import BaseContainer from '@/shared/components/BaseContainer';
import {
  HOME,
  GET_MARKETS_LIST,
  GET_HASHRATE_COUPON_POPUP_LIST,
  GET_HOME_PRODUCT_LIST,
  GET_HASHRATE_POPUP_LIST,
  GET_WEEKLY_REPORT_POPUP_INFO,
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
import {
  HASHRATE_MODAL,
  HASHRATE_COUPON_MODAL,
  BANNER_MODAL,
  ACTIVITY_MODAL,
  WEEKLY_OUTPUT_REPORT_MODAL,
} from './consts/homeModalType';
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
      needPopupBannerList: [],
      needPopupActivityList: [],
      isControlCheck: false,
      isVerifyChecked: true,
      allNeedPopupInfoList: [],
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
    }),
    currentPopupInfo() {
      return this.allNeedPopupInfoList[0];
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
      this[GET_HASHRATE_COUPON_POPUP_LIST]({ userId }).then(() => {
        const formatList = this.hashrateCouponPopupList.map(item => {
          item.popupType = HASHRATE_COUPON_MODAL;
          return item;
        });
        this.allNeedPopupInfoList = [...this.allNeedPopupInfoList, ...formatList];
      });
      this[GET_HASHRATE_POPUP_LIST]({ userId }).then(() => {
        const formatList = this.hashratePopupList.map(item => {
          item.popupType = HASHRATE_MODAL;
          return item;
        });
        this.allNeedPopupInfoList = [...this.allNeedPopupInfoList, ...formatList];
      });
      this[GET_WEEKLY_REPORT_POPUP_INFO]({ userId }).then(({ haveWeeklyReport, status, id }) => {
        if (haveWeeklyReport === HAVE_REPORT && status === NOT_EJECTED) {
          this[GET_WEEKLY_REPORT_DETAIL]({ id }).then(() => {
            this.weeklyReportDetail.popupType = WEEKLY_OUTPUT_REPORT_MODAL;
            this.allNeedPopupInfoList = [...this.allNeedPopupInfoList, this.weeklyReportDetail];
          });
        }
      });
    }
  },

  methods: {
    ...mapActions(HOME, [
      GET_MARKETS_LIST,
      GET_HOME_PRODUCT_LIST,
      GET_HASHRATE_COUPON_POPUP_LIST,
      GET_HASHRATE_POPUP_LIST,
      GET_WEEKLY_REPORT_POPUP_INFO,
    ]),
    ...mapActions(STATION_MAIL, [GET_WEEKLY_REPORT_DETAIL]),
    ...mapActions(ACTIVITY, [GET_ACTIVITY_PUSH_LIST]),
    moveCurrentModalInfo() {
      this.allNeedPopupInfoList.shift();
    },
    filterBannerPopupList() {
      const localBannerPopupList = isEmpty(localStorage.getObject('bannerPopupList'))
        ? []
        : localStorage.getObject('bannerPopupList');
      this.needPopupBannerList = this.bannersList.filter(newBanner => {
        let needPopup = true;
        newBanner.popupType = BANNER_MODAL;
        localBannerPopupList.forEach(oldBanner => {
          if (newBanner.id === oldBanner.id && !oldBanner.isPopup) {
            needPopup = false;
          }
        });
        newBanner.isPopup = needPopup;
        return newBanner.needPush;
      });
      const realPopupBannerList = this.needPopupBannerList.filter(item => item.isPopup);

      this.allNeedPopupInfoList = [...this.allNeedPopupInfoList, ...realPopupBannerList];
    },
    filterActivityPopupList() {
      const localActivityPopupList = isEmpty(localStorage.getObject('activityPopupList'))
        ? []
        : localStorage.getObject('activityPopupList');
      this.needPopupActivityList = this.activityPushList.filter(newActivity => {
        let needPopup = true;
        newActivity.popupType = ACTIVITY_MODAL;
        localActivityPopupList.forEach(oldActivity => {
          if (newActivity.id === oldActivity.id && !oldActivity.isPopup) {
            needPopup = false;
          }
        });
        newActivity.isPopup = needPopup;
        return newActivity.needPush;
      });
      const realPopupActivity = this.needPopupActivityList.filter(item => item.isPopup);

      this.allNeedPopupInfoList = [...this.allNeedPopupInfoList, ...realPopupActivity];
    },
    viewed(id) {
      const needPopupBannerList = this.needPopupBannerList.map(item => {
        if (item.id === id) {
          item.isPopup = false;
        }
        return item;
      });

      const localBannerPopupList = isEmpty(localStorage.getObject('bannerPopupList'))
        ? []
        : localStorage.getObject('bannerPopupList');

      const recordId = {};

      const saveLocalBannerList = [...needPopupBannerList, ...localBannerPopupList].reduce((item, next) => {
        recordId[next.id] ? '' : (recordId[next.id] = true && item.push(next));
        return item;
      }, []);
      localStorage.setObject('bannerPopupList', saveLocalBannerList);
      this.moveCurrentModalInfo();
    },
    activityViewed(id) {
      const needPopupActivityList = this.needPopupActivityList.map(item => {
        if (item.id === id) {
          item.isPopup = false;
        }
        return item;
      });

      const localActivityPopupList = isEmpty(localStorage.getObject('activityPopupList'))
        ? []
        : localStorage.getObject('activityPopupList');

      const recordId = {};

      const saveLocalActivityList = [...needPopupActivityList, ...localActivityPopupList].reduce((item, next) => {
        recordId[next.id] ? '' : (recordId[next.id] = true && item.push(next));
        return item;
      }, []);
      localStorage.setObject('activityPopupList', saveLocalActivityList);
      this.moveCurrentModalInfo();
    },
    hashrateCouponViewed() {
      this.moveCurrentModalInfo();
    },

    hashrateViewed() {
      this.moveCurrentModalInfo();
    },

    viewedReport() {
      const { id } = this.weeklyReportDetail;
      const { userId } = localStorage.getObject('userInfo');
      homeAPI.viewedWeeklyReportPopup({ pathParams: { id } }).then(() => {
        this[GET_WEEKLY_REPORT_POPUP_INFO]({ userId });
      });
      this.moveCurrentModalInfo();
    },
    getModal(type) {
      const modalMap = {
        [HASHRATE_MODAL]: <HashrateModal info={this.currentPopupInfo} onViewed={this.hashrateViewed} />,
        [HASHRATE_COUPON_MODAL]: (
          <HashrateCouponModal info={this.currentPopupInfo} onViewed={this.hashrateCouponViewed} />
        ),
        [BANNER_MODAL]: <BannerModal info={this.currentPopupInfo} onViewed={this.viewed} />,
        [ACTIVITY_MODAL]: <ActivityModal info={this.currentPopupInfo} onViewed={this.activityViewed} />,
        [WEEKLY_OUTPUT_REPORT_MODAL]: (
          <WeeklyOutputReportModal value={true} reportInfo={this.currentPopupInfo} onClose={this.viewedReport} />
        ),
      };

      return modalMap[type];
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
        {!isEmpty(this.currentPopupInfo) && this.isVerifyChecked && this.getModal(this.currentPopupInfo.popupType)}
      </div>
    );
  },
};

export default Home;
