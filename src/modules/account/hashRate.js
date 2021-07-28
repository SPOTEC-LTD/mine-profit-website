import * as API from '@/api/account/hashRate';
import localStorage from '@/shared/utils/localStorage';

export const hashrateStatusMap = {
  ORDINARY: 'ordinary',
  PLEDGES: 'pledges',
  SHUTDOWN: 'shutdown',
  CLOSE: 'close',
  TRANSFER: 'transfer',
};

const hashrateListApiMap = {
  [hashrateStatusMap.ORDINARY]: API.getProductOrdinaryHashrate,
  [hashrateStatusMap.CLOSE]: API.getProductCloseHashrate,
  [hashrateStatusMap.PLEDGES]: API.getProductPledgesHashrate,
  [hashrateStatusMap.SHUTDOWN]: API.getProductShutdownHashrate,
  [hashrateStatusMap.TRANSFER]: API.getProductTransferHashrate,
};

export const HASH_RATE = 'hashRate';
export const GET_PRODUCT_HASHRATE_STATISTICS = 'getProductHashrateStatistics';
export const GET_PRODUCT_HASHRATE_LIST = 'getProductOrdinaryHashrate';
export const GET_ORDINARY_HASHRATE_BUFF = 'getOrdinaryHashrateBuff';
export const GET_CLOSE_HASHRATE_BUFF = 'getCloseHashrateBuff';
export const GET_HASHRATE_PLEDGES_SOURCE_INFO = 'getHashratePledgesSourceInfo';
export const GET_TRANSFERABLE_AMOUNT = 'getTransferableAmount';
export const HASHRATE_TRANSFER = 'hashrateTransfer';
export const HASHRATE_PLEDGE = 'hashratePledge';
export const CANCEL_HASHRATE_PLEDGE = 'cancelHashratePledge';
export const HASHRATE_POWER_ON = 'hashRatePowerOn';
export const GET_PLEDGE_REDEEM_INFO = 'getPledgeRedeemInfo';
export const GET_PLEDGE_REPAYMENT_INFO = 'getPledgeRepaymentInfo';
export const PLEDGE_REDEEM_PAY = 'pledgeRedeemPay';
export const PLEDGE_REPAYMENT_PAY = 'pledgeRepaymentPay';
export const PLEDGE_CONFIRM_SETTLE = 'pledgeConfirmSettle';

const UPDATE_PRODUCT_HASHRATE_STATISTICS_LIST = 'updateProductHashrateStatisticsList';
const UPDATE_PRODUCT_HASHRATE_LIST = 'updateProductHashrateList';
export const UPDATE_HASHRATE_BUFF_LIST = 'updateHashrateBuffList';
export const UPDATE_HASHRATE_PLEDGES_SOURCE_INFO = 'updateHashratePledgesSourceInfo';
export const TRANSFER_CANCEL_ACTION = 'cancelTransfer';
export const UPDATE_TRANSFERABLE_AMOUNT = 'updateTransferableAmount';
export const UPDATE_PLEDGE_REDEEM_INFO = 'updatePledgeRedeemInfo';
export const UPDATE_PLEDGE_REPAYMENT_INFO = 'updatePledgeRepaymentInfo';

export default {
  namespaced: true,
  state: {
    statisticsList: [
      {
        hashrateType: 'BTC',
        unit: 'T',
        totalAmount: '0',
        totalOutput: '0',
        yesterdayTotalOutput: '0',
      },
      {
        hashrateType: 'ETH',
        unit: 'M',
        totalAmount: '0',
        totalOutput: '0',
        yesterdayTotalOutput: '0',
        isShutdown: 1,
      },
    ],
    ordinary: [],
    pledges: [],
    shutdown: [],
    close: [],
    transfer: [],
    hashrateBuffList: [],
    hashratePledgesSourceInfo: [],
    transferableAmount: {
      amount: 0,
      refPrice: 0,
    },
    pledgeRedeemInfo: {
      principal: 0,
      payAmountUsdt: 0,
      penaltyInterest: 0,

    },
    pledgeRepaymentInfo: {
      principal: 0,
      remainTime: 0,
    },
  },
  mutations: {
    [UPDATE_PRODUCT_HASHRATE_STATISTICS_LIST](state, { data }) {
      state.statisticsList = data;
    },
    [UPDATE_PRODUCT_HASHRATE_LIST](state, { data, key }) {
      state[key] = data;
    },
    [UPDATE_HASHRATE_BUFF_LIST](state, list) {
      state.hashrateBuffList = list;
    },
    [UPDATE_HASHRATE_PLEDGES_SOURCE_INFO](state, list) {
      state.hashratePledgesSourceInfo = list;
    },
    [UPDATE_TRANSFERABLE_AMOUNT](state, params) {
      state.transferableAmount = params;
    },
    [UPDATE_PLEDGE_REDEEM_INFO](state, params) {
      state.pledgeRedeemInfo = params;
    },
    [UPDATE_PLEDGE_REPAYMENT_INFO](state, params) {
      state.pledgeRepaymentInfo = params;
    },
  },
  actions: {
    async [GET_PRODUCT_HASHRATE_STATISTICS]({ commit }) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const { body: { list } } = await API.getProductHashrateStatistics({ pathParams: { userId } });
        commit(UPDATE_PRODUCT_HASHRATE_STATISTICS_LIST, { data: list });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [GET_PRODUCT_HASHRATE_LIST]({ commit }, params) {
      const { userId } = localStorage.getObject('userInfo');
      const { hashTypeStatusKey, ...restParams } = params;
      const resultAPI = hashrateListApiMap[hashTypeStatusKey];

      try {
        const { body: { list } } = await resultAPI({ data: restParams, pathParams: { userId } });
        commit(UPDATE_PRODUCT_HASHRATE_LIST, { data: list, key: hashTypeStatusKey });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_ORDINARY_HASHRATE_BUFF]({ commit }, params) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const { body: { list } } = await API.getOrdinaryHashrateBuff({ data: params, pathParams: { userId } });

        commit(UPDATE_HASHRATE_BUFF_LIST, list);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_CLOSE_HASHRATE_BUFF]({ commit }, params) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const { body: { list } } = await API.getCloseHashrateBuff({ data: params, pathParams: { userId } });

        commit(UPDATE_HASHRATE_BUFF_LIST, list);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [GET_HASHRATE_PLEDGES_SOURCE_INFO]({ commit }, { id, ...rest }) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const { body: { list } } = await API.getHashratePledgesSourceInfo({ data: rest, pathParams: { userId, id } });
        commit(UPDATE_HASHRATE_PLEDGES_SOURCE_INFO, list);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_TRANSFERABLE_AMOUNT]({ commit }, params) {
      try {
        const { body: { c2cTransAmount } } = await API.getTransferableAmount({ pathParams: params });
        commit(UPDATE_TRANSFERABLE_AMOUNT, c2cTransAmount);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [TRANSFER_CANCEL_ACTION](_, params) {
      try {
        await API.cancelTransfer({ pathParams: params });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [HASHRATE_TRANSFER](_, params) {
      try {
        await API.hashrateTransfer({ data: params });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [HASHRATE_PLEDGE](_, { productTemplateId, ...rest }) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        const { body: { long } } = await API.hashratePledge({ pathParams: { userId, productTemplateId }, data: rest });

        return Promise.resolve(long);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [CANCEL_HASHRATE_PLEDGE](_, params) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        await API.cancelHashratePledge({ pathParams: { userId, ...params } });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [HASHRATE_POWER_ON](_, params) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        await API.hashRatePowerOn({ pathParams: { userId }, data: params });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_PLEDGE_REDEEM_INFO]({ commit }, params) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        const { body: { pledgeRedeemInfo } } = await API.getPledgeRedeemInfo({ pathParams: { userId, ...params } });

        commit(UPDATE_PLEDGE_REDEEM_INFO, pledgeRedeemInfo);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_PLEDGE_REPAYMENT_INFO]({ commit }, params) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        const { body: { pledgeRepaymentInfo } } = await API.getPledgeRepaymentInfo({ pathParams: { userId, ...params } });

        commit(UPDATE_PLEDGE_REPAYMENT_INFO, pledgeRepaymentInfo);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [PLEDGE_REDEEM_PAY](_, { id, ...rest }) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        const { body: { productOrderResult } } = await API.pledgeRedeemPay(
          { pathParams: { userId, id }, data: rest },
        );

        return Promise.resolve(productOrderResult);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [PLEDGE_REPAYMENT_PAY](_, { id, ...rest }) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        const { body: { productOrderResult } } = await API.pledgeRepaymentPay({ pathParams: { userId, id }, data: rest });

        return Promise.resolve(productOrderResult);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [PLEDGE_CONFIRM_SETTLE](_, params) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        await API.pledgeConfirmSettle({ pathParams: { userId, ...params } });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
