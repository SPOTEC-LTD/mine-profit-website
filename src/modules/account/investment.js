import * as API from '@/api/account/investment';
import localStorage from '@/shared/utils/localStorage';
import { GAINING, SETTLED } from '@/pages/Account/Detail/Investment/consts/investmentStatus';

export const INVESTMENT = 'investment';
export const GET_INVESTMENT_LIST = 'getInvestmentList';
export const GET_ORDERS = 'getOrders';
export const UPDATE_ORDERS_LIST = 'updateOrdersList';

const UPDATE_INVESTMENT_LIST = 'updateInvestmentList';

const tabKeyMap = {
  gaining: GAINING,
  settled: SETTLED,
};

export default {
  namespaced: true,
  state: {
    orderData: {
      list: [],
      pageInfo: {
        pageNum: 0,
        pageSize: 0,
        total: 0,
        totalPage: 0,
      },
    },
    gainingList: [],
    settledList: [],
  },

  mutations: {
    [UPDATE_ORDERS_LIST](state, { data }) {
      state.orderData = data;
    },

    [UPDATE_INVESTMENT_LIST](state, { data, type }) {
      state[`${type}List`] = data;
    },
  },

  actions: {
    async [GET_ORDERS]({ commit }, { data }) {
      try {
        const { body: { list, pageInfo } } = await API.getOrderPages({ data });
        commit(UPDATE_ORDERS_LIST, { data: {
          list: list.map((item, index) => ({ id: `${data.pageNum}-${index}`, ...item })),
          pageInfo,
        } });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

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
