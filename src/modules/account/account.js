import * as API from '@/api/account/userInfo';
import localStorage from '@/shared/utils/localStorage';
import { UPDATE_USER_INFO } from '@/store/consts/actionType';

export const ACCOUNT = 'account';

export const BIND_INVITATION_CODE = 'bindInvitationCode';
export const USER_REAL_NAME_AUTH = 'userRealNameAuth';
export const UPDATE_DEAL_PASSWORD = 'updateDealPassword';
export const UPDATE_LOGIN_PASSWORD = 'updateLoginPassword';
export const BIND_PHONE_OR_EMAIL = 'bindPhoneOrEmail';
export const UPDATE_BASE_INFO = 'updateBaseInfo';
export const GET_INVITE_DETAIL_INFO = 'getInviteDetailInfo';
export const GET_ALL_LEVEL_INFO = 'getAllLevelInfo';
export const GET_USER_BASE_INFO = 'getUserBaseInfo';
export const UPDATE_INVITE_DETAIL_INFO = 'updateInviteDetailList';
export const UPDATE_ALL_LEVEL_INFO = 'updateAllLevelInfo';

export default {
  namespaced: true,
  state: {
    inviteDetailInfo: {},
    allLevelDetail: {
      currentUserLevel: 3,
      levelInfoList: [{
        level: 1,
        icon: null,
        name: '天使宝宝1',
      },
      {
        level: 2,
        icon: null,
        name: '天使宝宝2',
      },
      {
        level: 3,
        icon: null,
        name: '天使宝宝3',
      },
      {
        level: 4,
        icon: null,
        name: '天使宝宝4',
      }],
    },
  },
  mutations: {
    [UPDATE_INVITE_DETAIL_INFO](state, info) {
      state.inviteDetailInfo = info;
    },
    [UPDATE_ALL_LEVEL_INFO](state, info) {
      state.allLevelDetail = info;
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
    async [GET_INVITE_DETAIL_INFO]({ commit }, params) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const { body: { userInvite } } = await API.getInviteDetailList({ data: params, pathParams: { userId } });
        commit(UPDATE_INVITE_DETAIL_INFO, userInvite);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_USER_BASE_INFO]({ commit }) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const {
          body: { userInfo },
        } = await API.getUserBaseInfo({ pathParams: { userId } });
        commit(UPDATE_USER_INFO, userInfo, { root: true });

        return Promise.resolve(userInfo);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_ALL_LEVEL_INFO]({ commit }) {
      try {
        const { body: { allLevelDetail } } = await API.getAllLevelInfo();
        commit(UPDATE_ALL_LEVEL_INFO, allLevelDetail);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
