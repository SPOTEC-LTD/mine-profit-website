import { getUserBaseInfo } from '@/api/account/userInfo';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import { UPDATE_USER_INFO } from '@/store/consts/actionType';
import loadingPlugin from './loadingPlugin';
import sign from '../modules/sign';
import home from '../modules/home';
import hashRate from '../modules/account/hashRate';
import publicData from '../modules/public';
import rateExchange from '../modules/rateExchange';
import officialMarket from '../modules/officialMarket';

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
  officialMarket,
};
