import * as API from '@/api';
import * as HomeAPI from '@/api/home';

export const HOME = 'home';
export const GET_MARKETS_LIST = 'getMarketsList';
export const GET_HOME_PRODUCT_LIST = 'getHomeProductList';

const UPDATE_MARKETS_LIST = 'updateMarketsList';
const UPDATE_HOME_PRODUCT_LIST = 'updateHomeProductList';

export default {
  namespaced: true,
  state: {
    demandDepositList: [],
    hasGetInfo: false,
    unreadCount: 2323234,
    marketsList: [],
    productList: [],
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
  },
  actions: {
    // 获取用户相关信息
    async getDepositList({ commit }) {
      try {
        // const { body: { demandDepositList } } = await getDepositList();
        // commit('updateDemandDepositList', demandDepositList);

        return Promise.resolve();
      } catch (error) {
        console.log('error', error);

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
  },
};
