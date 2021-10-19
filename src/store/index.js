import { getUserBaseInfo } from '@/api/account/userInfo';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import { UPDATE_USER_INFO, UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import rank from '../modules/rank';
import loadingPlugin from './loadingPlugin';
import sign from '../modules/sign';
import home from '../modules/home';
import hashRate from '../modules/account/hashRate';
import investment from '../modules/account/investment';
import account from '../modules/account/account';
import common from '../modules/common';
import rateExchange from '../modules/rateExchange';
import hashRateCoupons from '../modules/hashRateCoupons';
import officialProduct from '../modules/officialProduct';
import c2cMarket from '../modules/c2cMarket';
import wallet from '../modules/account/wallet';
import user from '../modules/user';
import stationMail from '../modules/stationMail';
import platformCurrency from '../modules/platformCurrency';

export const strict = false;
export const plugins = [loadingPlugin()];

export const mutations = {
  [UPDATE_USER_INFO](state, userData) {
    state.userInfo = userData;
  },
  [UPDATE_HAS_PAGE_BUTTON_STATUS](state, status) {
    state.hasPageButton = status;
  },
};

export const state = () => ({
  userInfo: {},
  hasPageButton: false,
});

export const actions = {
  async nuxtServerInit({ commit }, ctx) {
    const { userId } = getUserInfoFunc(ctx);
    if (userId) {
      try {
        const { body: { userInfo } } = await getUserBaseInfo({ pathParams: { userId } }, { ctx, catchException: false });
        commit(UPDATE_USER_INFO, userInfo);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      commit(UPDATE_USER_INFO, {});
    }
  },
};

export const modules = {
  home,
  sign,
  hashRate,
  common,
  rateExchange,
  hashRateCoupons,
  officialProduct,
  account,
  c2cMarket,
  investment,
  wallet,
  rank,
  user,
  stationMail,
  platformCurrency,
};
