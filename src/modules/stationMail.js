import * as API from '@/api/stationMail';
import localStorage from '@/shared/utils/localStorage';

export const STATION_MAIL = 'stationMail';
export const GET_STATION_MAIL_LIST = 'getStationMailList';
export const MAIL_READ_DETAIL = 'mailReadDetail';
export const RESET_STATE = 'resetState';
const UPDATE_MAIL_LIST = 'updateMailList';
const UPDATE_PAGE_INFO = 'updatePageInfo';

export default {
  namespaced: true,
  state: {
    stationMailList: [],
    pageInfo: [],
  },
  mutations: {
    [UPDATE_MAIL_LIST](state, stationMailList) {
      state.stationMailList = [...state.stationMailList, ...stationMailList];
    },
    [UPDATE_PAGE_INFO](state, pageInfo) {
      state.pageInfo = pageInfo;
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
    async [MAIL_READ_DETAIL](data) {
      try {
        await API.mailReadDetail({ pathParams: { id: data.id } });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};