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
export const GET_BUY_BACK_DETAIL = 'getBuyBackDetail';
export const OFFICIAL_BUY_BACK = 'officialBuyBack';
export const GET_LEDGER_TYPE_LIST = 'getLedgerTypeList';

const UPDATE_LEDGER_TYPE_LIST = 'updateLedgerTypeList';
const UPDATE_LEDGER_TYPE_MAP = 'updateLedgerTypeMap';
const UPDATE_BUY_BACK_DETAIL = 'updateBuyBackDetail';
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
    buyBackDetail: {},
    ledgerTypeList: [],
    ledgerTypeMap: {},
  },
  mutations: {
    [UPDATE_WALLET_DETAIL](state, list) {
      state.walletDetailList = list;
    },

    [UPDATE_WITHDRAWAL_ADDRESS](state, list) {
      state.withdrawalAddressList = list;
    },

    [UPDATE_BUY_BACK_DETAIL](state, detail) {
      state.buyBackDetail = detail;
    },

    [UPDATE_PAGE_INFO](state, pageInfo) {
      state.pageInfo = pageInfo;
    },

    [UPDATE_LEDGER_TYPE_LIST](state, typeList) {
      state.ledgerTypeList = typeList;
    },

    [UPDATE_LEDGER_TYPE_MAP](state, typeMap) {
      state.ledgerTypeMap = typeMap;
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
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [GET_WITHDRAWAL_ADDRESS]({ commit }, data) {
      try {
        const { userId } = localStorage.getObject('userInfo');
        const { body: { list } } = await API.getWithdrawalAddress({ data, pathParams: { userId } });
        commit(UPDATE_WITHDRAWAL_ADDRESS, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [ADD_ADDRESS](_, data) {
      try {
        const { userId } = localStorage.getObject('userInfo');
        await API.addAddress({ data, pathParams: { userId } });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [DELETE_ADDRESS](_, { id }) {
      try {
        const { userId } = localStorage.getObject('userInfo');
        await API.deleteAddress({ pathParams: { userId, id } });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [EDIT_ADDRESS](_, { id, data }) {
      try {
        const { userId } = localStorage.getObject('userInfo');
        await API.editAddress({ data, pathParams: { userId, id } });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [WITHDRAWAL](_, data) {
      try {
        await API.updateWithDraw({ data });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_BUY_BACK_DETAIL]({ commit }) {
      try {
        const { body: { buyBackDetail } } = await API.getBuyBackDetail();
        commit(UPDATE_BUY_BACK_DETAIL, buyBackDetail);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [OFFICIAL_BUY_BACK](_, data) {
      try {
        await API.officialBuyBack({ data });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_LEDGER_TYPE_LIST]({ commit }) {
      try {
        const { body: { list } } = await API.getLedgerTypeList();
        const resultList = list.map(item => ({
          text: item.label,
          value: item.code,
        }));
        const resultMap = list.reduce((map, item) => ({
          [item.code]: item.label,
          ...map,
        }), {});
        commit(UPDATE_LEDGER_TYPE_LIST, resultList);
        commit(UPDATE_LEDGER_TYPE_MAP, resultMap);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
