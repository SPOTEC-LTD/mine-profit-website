import * as API from '@/api/platformCurrency';

export const PLATFORM_CURRENCY = 'platformCurrency';
export const GET_PLATFORM_CURRENCY_DETAIL = 'getPlatformCurrencyDetail';
export const GET_DYNAMIC_CHAIN_INFO = 'getDynamicChainInfo';

const UPDATE_PLATFORM_CURRENCY_DETAIL = 'updatePlatformCurrencyDetail';
const UPDATE_DYNAMIC_CHAIN_INFO = 'updateDynamicChainInfo';

export default {
  namespaced: true,
  state: {
    platformCurrencyDetail: {
      income: 0,
      todayInjectionL: 0,
      fundPoolRest: 0,
      fundPoolTotal: 0,
      payback: 0,
      introUrl: '',
    },
    dynamicChainInfo: {
      symbol: 'MPT',
      fullName: 'MineProfit Token',
    },
  },
  mutations: {
    [UPDATE_PLATFORM_CURRENCY_DETAIL](state, info) {
      state.platformCurrencyDetail = info;
    },
    [UPDATE_DYNAMIC_CHAIN_INFO](state, info) {
      state.dynamicChainInfo = info;
    },
  },
  actions: {
    async [GET_PLATFORM_CURRENCY_DETAIL]({ commit }) {
      try {
        const { body: { mptEnvDetail } } = await API.getPlatformCurrencyDetail();
        commit(UPDATE_PLATFORM_CURRENCY_DETAIL, mptEnvDetail);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_DYNAMIC_CHAIN_INFO]({ commit }) {
      try {
        const { body: { list } } = await API.getDynamicChainInfo();
        commit(UPDATE_DYNAMIC_CHAIN_INFO, list[0]);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
