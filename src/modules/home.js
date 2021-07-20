import * as API from '@/api';

export const HOME = 'home';
export const GET_MARKETS_LIST = 'getMarketsList';

const UPDATE_MARKETS_LIST = 'updateMarketsList';

export default {
  namespaced: true,
  state: {
    demandDepositList: [],
    hasGetInfo: false,
    unreadCount: 2323234,
    marketsList: [],
  },
  mutations: {
    updateDemandDepositList(state, demandDepositList) {
      state.demandDepositList = demandDepositList;
    },
    [UPDATE_MARKETS_LIST](state, list) {
      state.marketsList = list;
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
  },
};
