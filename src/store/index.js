import { getUserBaseInfo } from '@/api/account/userInfo';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import loadingPlugin from './loadingPlugin';
import sign from '../modules/sign';
import home from '../modules/home';
import hashRate from '../modules/account/hashRate';
import publicData from '../modules/public';
import rateExchange from '../modules/rateExchange';
import officialMarket from '../modules/officialMarket';

const UPDATE_USER_INFO = 'updateUserInfo';

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
    try {
      const { body: { userInfo } } = await getUserBaseInfo({ pathParams: { userId } }, { ctx, catchException: false });
      commit(UPDATE_USER_INFO, userInfo);
    } catch (error) {
      console.log('error', error);
    }
  },
};

export const modules = {
  home,
  sign,
  hashRate,
  publicData,
  rateExchange,
  officialMarket,
};
