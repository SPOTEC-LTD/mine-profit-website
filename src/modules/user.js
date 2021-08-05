import * as API from '@/api/user';
import localStorage from '@/shared/utils/localStorage';

export const USER = 'user';
export const GET_USER_BALLANCE = 'getUserBallance';

const UPDATE_USER_BALLANCE = 'updateUserBallance';

export default {
  namespaced: true,
  state: {
    userBallance: [],
  },
  mutations: {
    [UPDATE_USER_BALLANCE](state, list) {
      state.userBallance = list;
    },
  },
  actions: {
    async [GET_USER_BALLANCE]({ commit }) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        const { body: { list } } = await API.getUserBallance({ pathParams: { userId } });

        commit(UPDATE_USER_BALLANCE, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
