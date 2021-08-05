import * as API from '@/api/hashRateCoupons';
import localStorage from '@/shared/utils/localStorage';

export const HASH_RATE_COUPONS = 'hashRateCoupons';
export const GET_COUPONS = 'getCoupons';
export const GET_VIP_COUPONS = 'getVipCoupons';
export const RESET_STATE = 'resetState';
export const RESET_VIP_COUPONS_LIST = 'resetVipCouponsList';

const UPDATE_COUPONS = 'updateCoupons';
const UPDATE_VIP_COUPONS = 'updateVipCoupons';

export default {
  namespaced: true,
  state: {
    couponsList: [],
    vipCouponsList: [],
  },
  mutations: {
    [UPDATE_COUPONS](state, couponsList) {
      state.couponsList = couponsList;
    },

    [UPDATE_VIP_COUPONS](state, vipCouponsList) {
      state.vipCouponsList = vipCouponsList;
    },

    [RESET_VIP_COUPONS_LIST](state) {
      state.vipCouponsList = [];
    },

    [RESET_STATE](state) {
      state.couponsList = [];
      state.vipCouponsList = [];
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

    async [GET_VIP_COUPONS]({ commit }, data) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const { body: { list } } = await API.getVipCoupons({ data, pathParams: { userId } });
        commit(RESET_VIP_COUPONS_LIST, []);
        commit(UPDATE_VIP_COUPONS, list);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
