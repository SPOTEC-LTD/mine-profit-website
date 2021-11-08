import * as API from '@/api';
import * as HomeAPI from '@/api/home';

export const HOME = 'home';
export const GET_MARKETS_LIST = 'getMarketsList';
export const GET_HOME_PRODUCT_LIST = 'getHomeProductList';
export const GET_HASHRATE_COUPON_POPUP_LIST = 'getHashrateCouponPopupList';
export const GET_HASHRATE_POPUP_LIST = 'getHashratePopupList';
export const GET_WEEKLY_REPORT_POPUP_INFO = 'getWeeklyReportPopupInfo';
export const UPDATE_BANNER_SHOW_COUNT = 'updateBannerShowCount';
export const UPDATE_BANNER_CLICK_COUNT = 'updateBannerClickCount';

const UPDATE_MARKETS_LIST = 'updateMarketsList';
const UPDATE_HOME_PRODUCT_LIST = 'updateHomeProductList';
const UPDATE_COUPON_POPUP_LIST = 'updateCouponPopupList';
const UPDATE_HASHRATE_POPUP_LIST = 'updateHashratePopupList';
const UPDATE_WEEKLY_REPORT_INFO = 'updateWeeklyReportInfo';

export default {
  namespaced: true,
  state: {
    demandDepositList: [],
    hasGetInfo: false,
    unreadCount: 2323234,
    marketsList: [],
    productList: [],
    hashrateCouponPopupList: [],
    hashratePopupList: [],
    weeklyReportInfo: {},
  },
  mutations: {
    updateDemandDepositList(state, demandDepositList) {
      state.demandDepositList = demandDepositList;
    },
    [UPDATE_MARKETS_LIST](state, list) {
      state.marketsList = list;
    },
    [UPDATE_HOME_PRODUCT_LIST](state, list) {
      state.productList = list;
    },
    [UPDATE_COUPON_POPUP_LIST](state, list) {
      state.hashrateCouponPopupList = list;
    },
    [UPDATE_HASHRATE_POPUP_LIST](state, list) {
      state.hashratePopupList = list;
    },
    [UPDATE_WEEKLY_REPORT_INFO](state, weeklyReportInfo) {
      state.weeklyReportInfo = weeklyReportInfo;
    },
  },
  actions: {
    async [UPDATE_BANNER_SHOW_COUNT](_, { id }) {
      try {
        await HomeAPI.updateBannerShowCount({ pathParams: { id } });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [UPDATE_BANNER_CLICK_COUNT](_, { id }) {
      try {
        await HomeAPI.updateBannerClickCount({ pathParams: { id } });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_MARKETS_LIST]({ commit }) {
      try {
        const { body: { list } } = await API.getMarketsList();
        commit(UPDATE_MARKETS_LIST, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_HOME_PRODUCT_LIST]({ commit }) {
      try {
        const { body: { list } } = await HomeAPI.getHomeProductList({ data: { isLimit3: true } });
        commit(UPDATE_HOME_PRODUCT_LIST, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_HASHRATE_COUPON_POPUP_LIST]({ commit }, { userId }) {
      try {
        const { body: { list } } = await HomeAPI.getHashrateCouponPopupList({ pathParams: { userId } });
        commit(UPDATE_COUPON_POPUP_LIST, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_HASHRATE_POPUP_LIST]({ commit }, { userId }) {
      try {
        const { body: { list } } = await HomeAPI.getHashratePopupList({ pathParams: { userId } });
        commit(UPDATE_HASHRATE_POPUP_LIST, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_WEEKLY_REPORT_POPUP_INFO]({ commit }, { userId }) {
      try {
        const { body: { weeklyReportVo } } = await HomeAPI.getWeeklyReportPopupInfo({ pathParams: { userId } });
        commit(UPDATE_WEEKLY_REPORT_INFO, weeklyReportVo);
        return Promise.resolve(weeklyReportVo);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
