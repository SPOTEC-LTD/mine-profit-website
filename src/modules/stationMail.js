import * as API from '@/api/stationMail';
import { getUserBadge } from '@/api/account/userInfo';
import localStorage from '@/shared/utils/localStorage';

export const STATION_MAIL = 'stationMail';
export const GET_STATION_MAIL_LIST = 'getStationMailList';
export const GET_USER_BADGE = 'getUserBadge';
export const MAIL_READ_DETAIL = 'mailReadDetail';
export const RESET_STATE = 'resetState';
export const GET_WEEKLY_REPORT_DETAIL = 'getWeeklyReportDetail';
const UPDATE_MAIL_LIST = 'updateMailList';
const UPDATE_PAGE_INFO = 'updatePageInfo';
const UPDATE_BADGE_INFO = 'updateBadgeInfo';
const UPDATE_REPORT_DETAIL = 'updateReportDetail';

export default {
  namespaced: true,
  state: {
    stationMailList: [],
    badgeInfo: {},
    pageInfo: [],
    weeklyReportDetail: {
      amount: '0',
      btcAmount: '0',
      ethAmount: '0',
      weeklyRanking: '0',
      btcPercentage: '0',
      annualizedRateOfReturn: '0',
      miningCycle: '',
    },
  },
  mutations: {
    [UPDATE_MAIL_LIST](state, stationMailList) {
      state.stationMailList = [...state.stationMailList, ...stationMailList];
    },
    [UPDATE_PAGE_INFO](state, pageInfo) {
      state.pageInfo = pageInfo;
    },
    [UPDATE_BADGE_INFO](state, badge) {
      state.badgeInfo = badge;
    },
    [UPDATE_REPORT_DETAIL](state, reportDetail) {
      state.weeklyReportDetail = reportDetail;
    },
    [RESET_STATE](state) {
      state.stationMailList = [];
    },
  },
  actions: {
    async [GET_STATION_MAIL_LIST]({ commit }, data) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const { body: { list, pageInfo } } = await API.getStationMailList({ data, pathParams: { userId } });
        commit(UPDATE_MAIL_LIST, list);
        commit(UPDATE_PAGE_INFO, pageInfo);

        return Promise.resolve({ length: list.length });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [MAIL_READ_DETAIL](_, data) {
      try {
        await API.mailReadDetail({ pathParams: { id: data.id } });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_WEEKLY_REPORT_DETAIL]({ commit }, { id }) {
      try {
        const { body: { weeklyReportInfoVo } } = await API.getWeeklyReportDetail({ pathParams: { id } });
        commit(UPDATE_REPORT_DETAIL, weeklyReportInfoVo);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_USER_BADGE]({ commit }) {
      try {
        const { body: { badge } } = await getUserBadge({}, { checkLoginStatus: false });
        commit(UPDATE_BADGE_INFO, badge);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
