import * as API from '@/api/account/userInfo';
import localStorage from '@/shared/utils/localStorage';

export const ACCOUNT = 'account';

export const BIND_INVITATION_CODE = 'bindInvitationCode';
export const USER_REAL_NAME_AUTH = 'userRealNameAuth';
export const UPDATE_DEAL_PASSWORD = 'updateDealPassword';
export const UPDATE_LOGIN_PASSWORD = 'updateLoginPassword';
export const BIND_PHONE_OR_EMAIL = 'bindPhoneOrEmail';
export const UPDATE_BASE_INFO = 'updateBaseInfo';
export const GET_INVITE_DETAIL_LIST = 'getInviteDetailList';
export const GET_USER_BASE_INFO = 'getUserBaseInfo';
export const UPDATE_INVITE_DETAIL_LIST = 'updateInviteDetailList';

export default {
  namespaced: true,
  state: { inviteDetailList: [] },
  mutations: {
    [UPDATE_INVITE_DETAIL_LIST](state, list) {
      state.inviteDetailList = list;
    },
  },
  actions: {
    async [UPDATE_DEAL_PASSWORD](_, params) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        await API.updateDealPassword({ data: params, pathParams: { userId } });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [UPDATE_LOGIN_PASSWORD](_, params) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        await API.updateLoginPassword({ data: params, pathParams: { userId } });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [UPDATE_BASE_INFO](_, params) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        await API.updateUserBaseInfo({ data: params, pathParams: { userId } });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [BIND_PHONE_OR_EMAIL](_, params) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        await API.bindPhoneOrEmail({ data: params, pathParams: { userId } });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [BIND_INVITATION_CODE](_, params) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        await API.bindInvitationCode({ data: params, pathParams: { userId } });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [USER_REAL_NAME_AUTH](_, params) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        await API.userRealNameAuth({ data: params, pathParams: { userId } });

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_INVITE_DETAIL_LIST]({ commit }, params) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const {
          body: { list },
        } = await API.getInviteDetailList({ data: params, pathParams: { userId } });
        commit(UPDATE_INVITE_DETAIL_LIST, list);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_USER_BASE_INFO]() {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const {
          body: { userInfo },
        } = await API.getUserBaseInfo({ pathParams: { userId } });

        return Promise.resolve(userInfo);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
