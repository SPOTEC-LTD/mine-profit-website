import * as API from '@/api/c2cMarket';
import { c2cInitData } from '@/shared/consts/c2cMarketInitialData';

export const C2C_MARKET = 'c2cMarket';
export const GET_C2C_MARKET_LIST = 'getC2CMarketList';
export const UPDATE_C2C_MARKET_LIST = 'updateC2CMarketList';
export const UPDATE_PAGE_INFO = 'updatePageInfo';
export const UPDATE_ACTIVE_COIN = 'updateActiveCoin';
export const RESET_STATE = 'resetState';
export const PLACE_C2C_ORDER = 'placeC2COrder';
export const UPDATE_ORDER_INFO = 'updateOrderInfo';

const initValue = {
  c2cMarketList: [],
  paramData: c2cInitData,
  pageInfo: '',
  c2cOrderResult: {},
};

export default {
  namespaced: true,
  state: initValue,
  mutations: {
    [UPDATE_C2C_MARKET_LIST](state, list) {
      state.c2cMarketList = [...state.c2cMarketList, ...list];
    },
    [UPDATE_PAGE_INFO](state, pageInfo) {
      state.pageInfo = pageInfo;
    },
    [UPDATE_ACTIVE_COIN](state, paramData) {
      state.paramData = paramData;
    },
    [RESET_STATE](state) {
      state.c2cMarketList = [];
    },
    [UPDATE_ORDER_INFO](state, c2cOrderResult) {
      state.c2cOrderResult = c2cOrderResult;
    },
  },
  actions: {
    async [GET_C2C_MARKET_LIST]({ commit }, data) {
      try {
        const { body: { list, pageInfo } } = await API.getC2CList({ data });
        commit(UPDATE_C2C_MARKET_LIST, list);
        commit(UPDATE_PAGE_INFO, pageInfo);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [PLACE_C2C_ORDER]({ commit }, data) {
      try {
        const { body: { c2cOrderResult } } = await API.placeSubjectOrder({ data });
        commit(UPDATE_ORDER_INFO, c2cOrderResult);
        return Promise.resolve({ paySuccess: c2cOrderResult.success });
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
