import * as API from '@/api/sign';
import { UPDATE_USER_INFO } from '@/store/consts/actionType';

export const SIGN = 'sign';
export const GET_PHONE_CODE = 'getPhoneCode';
export const GET_EMAIL_CODE = 'getEmailCode';
export const LOGIN = 'Login';

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    async [GET_PHONE_CODE](_, params) {
      try {
        await API.getPhoneCode({ data: params });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [GET_EMAIL_CODE](_, params) {
      try {
        await API.getEmailCode({ data: params });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [LOGIN]({ commit }, data) {
      const { isVerificationLogin, ...apiParams } = data;
      const finlayAPI = isVerificationLogin ? API.verifyLogin : API.passwordLogin;
      try {
        const { body: { appLogin } } = await finlayAPI({ data: apiParams });
        commit(UPDATE_USER_INFO, appLogin, { root: true });
        return Promise.resolve(appLogin);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
