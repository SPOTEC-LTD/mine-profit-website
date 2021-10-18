import * as commonAPI from '@/api/common';

export const COMMON = 'common';
export const GET_CHAIN_ORDER = 'getChainOrder';
export const GET_DYNAMIC_CHAIN_TYPE = 'getDynamicChainType';

const UPDATE_CHAIN_ORDER_LIST = 'updateChainOrderList';
const DYNAMIC_CHAIN_TYPE_LIST = 'dynamicChainTypeList';
export default {
  namespaced: true,
  state: {
    chainOrderList: [],
    dynamicChainTypeList: [{ symbol: '' }],
  },
  mutations: {
    [UPDATE_CHAIN_ORDER_LIST](state, chainOrderList) {
      state.chainOrderList = chainOrderList;
    },
    [DYNAMIC_CHAIN_TYPE_LIST](state, chainTypeList) {
      state.dynamicChainTypeList = chainTypeList;
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
    async [GET_DYNAMIC_CHAIN_TYPE]({ commit }) {
      try {
        const { body: { list } } = await commonAPI.getDynamicChainType();
        commit(DYNAMIC_CHAIN_TYPE_LIST, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
