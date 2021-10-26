import * as API from '@/api/activity';
import localStorage from '@/shared/utils/localStorage';

export const ACTIVITY = 'activity';
export const GET_ACTIVITY_LIST = 'getActivityList';
export const GET_HASH_MODAL_LIST = 'getHashModalList';

export const UPDATE_ACTIVITY_LIST = 'updateActivityList';
const UPDATE_HASH_MODAL_LIST = 'updateHashModalList';

const INIT_VALUE = {
  activityList: [],
  hashModalList: [],
};

export default {
  namespaced: true,
  state: INIT_VALUE,
  mutations: {
    [UPDATE_ACTIVITY_LIST](state, list) {
      state.activityList = list;
    },
    [UPDATE_HASH_MODAL_LIST](state, list) {
      state.hashModalList = list;
    },
  },
  actions: {
    async [GET_ACTIVITY_LIST]({ commit }) {
      try {
        const { body: { list } } = await API.getActivityList();
        commit(UPDATE_ACTIVITY_LIST, list);
        return Promise.resolve({ length: list.length });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_HASH_MODAL_LIST]({ commit }, data) {
      const { userId } = localStorage.getObject('userInfo');
      try {
        const { body: { list } } = await API.getHashModalList({ data, pathParams: { userId } });
        commit(UPDATE_HASH_MODAL_LIST, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
