import * as commonAPI from '@/api/common';

export const COMMON = 'common';
export const GET_CHAIN_ORDER = 'getChainOrder';

const UPDATE_CHAIN_ORDER_LIST = 'updateChainOrderList';
export default {
  namespaced: true,
  state: {
    chainOrderList: [],
  },
  mutations: {
    [UPDATE_CHAIN_ORDER_LIST](state, chainOrderList) {
      state.chainOrderList = chainOrderList;
    },
  },
  actions: {
    async [GET_CHAIN_ORDER]({ commit }) {
      try {
        const { body: { list } } = await commonAPI.getChainOrder();
        commit(UPDATE_CHAIN_ORDER_LIST, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
