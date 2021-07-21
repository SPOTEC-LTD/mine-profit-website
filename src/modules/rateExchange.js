import * as API from '@/api/rateExchange';

export const RATE_EXCHANGE = 'rateExchange';
export const GET_RATE_EXCHANGE = 'getRateExchange';

const UPDATE_RATE_EXCHANGE = 'updateRateExchange';

export default {
  namespaced: true,
  state: {
    rateExchangeList: [],
  },
  mutations: {
    [UPDATE_RATE_EXCHANGE](state, list) {
      state.rateExchangeList = list;
    },
  },
  actions: {
    async [GET_RATE_EXCHANGE]({ commit }) {
      try {
        const { body: { list } } = await API.getRateExchange();
        commit(UPDATE_RATE_EXCHANGE, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
