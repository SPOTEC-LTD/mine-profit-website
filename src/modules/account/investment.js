import * as API from '@/api/account/investment';
import localStorage from '@/shared/utils/localStorage';
import { ALL, GAINING, SETTLED } from '@/pages/Account/Detail/Investment/consts/investmentStatus';

export const INVESTMENT = 'investment';
export const GET_INVESTMENT_LIST = 'getInvestmentList';

const UPDATE_INVESTMENT_LIST = 'updateInvestmentList';

const tabKeyMap = {
  all: ALL,
  gaining: GAINING,
  settled: SETTLED,
};

export default {
  namespaced: true,
  state: {
    allList: [],
    gainingList: [],
    settledList: [],
  },

  mutations: {
    [UPDATE_INVESTMENT_LIST](state, { data, type }) {
      state[`${type}List`] = data;
    },
  },

  actions: {
    async [GET_INVESTMENT_LIST]({ commit }, { type }) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const { body: { list } } = await API.getInvestmentList({ data: { type: tabKeyMap[type] }, pathParams: { userId } });
        commit(UPDATE_INVESTMENT_LIST, { data: list, type });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
