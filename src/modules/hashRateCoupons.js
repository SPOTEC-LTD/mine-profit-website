import * as API from '@/api/hashRateCoupons';
import localStorage from '@/shared/utils/localStorage';

export const HASH_RATE_COUPONS = 'hashRateCoupons';
export const GET_COUPONS = 'getCoupons';
const UPDATE_COUPONS = 'updateCoupons';

export default {
  namespaced: true,
  state: {
    couponsList: [],
  },
  mutations: {
    [UPDATE_COUPONS](state, couponsList) {
      state.couponsList = couponsList;
    },
  },
  actions: {
    async [GET_COUPONS]({ commit }, data) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const { body: { list } } = await API.getCoupons({ data, pathParams: { userId } });
        commit(UPDATE_COUPONS, list);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
