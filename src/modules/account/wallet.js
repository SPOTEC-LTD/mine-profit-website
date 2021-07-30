import * as API from '@/api/account/wallet';
import localStorage from '@/shared/utils/localStorage';

export const WALLET = 'wallet';
export const GET_WALLET_DETAIL = 'getWalletDetail';
export const GET_WITHDRAWAL_ADDRESS = 'getWithdrawalAddress';
export const WITHDRAWAL = 'withdrawal';
export const RESET_STATE = 'resetState';
export const ADD_ADDRESS = 'addAddress';
export const DELETE_ADDRESS = 'deleteAddress';
export const EDIT_ADDRESS = 'editAddress';

const UPDATE_WALLET_DETAIL = 'updateWalletDetail';
const UPDATE_WITHDRAWAL_ADDRESS = 'updateWithdrawalAddress';
const UPDATE_PAGE_INFO = 'updatePageInfo';

export default {
  namespaced: true,
  state: {
    walletDetailList: [],
    pageInfo: {
      pageNum: 0,
      pageSize: 0,
      total: 0,
      totalPage: 0,
    },
    withdrawalAddressList: [],
  },
  mutations: {
    [UPDATE_WALLET_DETAIL](state, list) {
      state.walletDetailList = list;
    },
    [UPDATE_WITHDRAWAL_ADDRESS](state, list) {
      state.withdrawalAddressList = [...state.withdrawalAddressList, ...list];
    },
    [UPDATE_PAGE_INFO](state, pageInfo) {
      state.pageInfo = pageInfo;
    },
    [RESET_STATE](state) {
      state.walletDetailList = [];
      state.withdrawalAddressList = [];
    },
  },
  actions: {
    async [GET_WALLET_DETAIL]({ commit }, data) {
      try {
        const { body: { list, pageInfo } } = await API.getWalletDetail({ data });
        commit(UPDATE_WALLET_DETAIL, list);
        commit(UPDATE_PAGE_INFO, pageInfo);
        return Promise.resolve({ length: list.length });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // async [GET_WITHDRAWAL_ADDRESS]({ commit }, data) {
    //   try {
    //     const { userId } = localStorage.getObject('userInfo');
    //     const { body: { list, pageInfo } } = await API.getWithdrawalAddress({ data, pathParams: { userId } });
    //     commit(UPDATE_WITHDRAWAL_ADDRESS, list);
    //     commit(UPDATE_PAGE_INFO, pageInfo);
    //     return Promise.resolve({ length: list.length });
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // },
    // async [WITHDRAWAL](_, data) {
    //   try {
    //     await API.updateWithDraw({ data });
    //     return Promise.resolve();
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // },
    // async [ADD_ADDRESS](_, data) {
    //   try {
    //     const { userId } = localStorage.getObject('userInfo');
    //     await API.addAddress({ data, pathParams: { userId } });
    //     return Promise.resolve();
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // },
    // async [DELETE_ADDRESS](_, { id }) {
    //   try {
    //     const { userId } = localStorage.getObject('userInfo');
    //     await API.deleteAddress({ pathParams: { userId, id } });
    //     return Promise.resolve();
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // },
    // async [EDIT_ADDRESS](_, { id, data }) {
    //   try {
    //     const { userId } = localStorage.getObject('userInfo');
    //     await API.editAddress({ data, pathParams: { userId, id } });
    //     return Promise.resolve();
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // },
  },
};
