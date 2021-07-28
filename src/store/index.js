import { getUserBaseInfo } from '@/api/account/userInfo';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import { UPDATE_USER_INFO } from '@/store/consts/actionType';
import loadingPlugin from './loadingPlugin';
import sign from '../modules/sign';
import home from '../modules/home';
import hashRate from '../modules/account/hashRate';
import investment from '../modules/account/investment';
import account from '../modules/account/account';
import publicData from '../modules/public';
import rateExchange from '../modules/rateExchange';
import hashRateCoupons from '../modules/hashRateCoupons';
import officialProduct from '../modules/officialProduct';
import c2cMarket from '../modules/c2cMarket';

export const strict = false;
export const plugins = [loadingPlugin()];

export const mutations = {
  [UPDATE_USER_INFO](state, userData) {
    state.userInfo = userData;
  },
};

export const state = () => ({
  userInfo: {},
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
  publicData,
  rateExchange,
  hashRateCoupons,
  officialProduct,
  account,
  c2cMarket,
  investment,
};
