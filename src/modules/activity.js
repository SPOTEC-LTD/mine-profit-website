import * as API from '@/api/activity';
import localStorage from '@/shared/utils/localStorage';

export const ACTIVITY = 'activity';
export const GET_ACTIVITY_LIST = 'getActivityList';
export const GET_HASH_MODAL_LIST = 'getHashModalList';
export const ACTIVITY_VIEW_COUNT = 'activityViewCount';
export const GET_ACTIVITY_PUSH_LIST = 'getActivityPushList';

export const UPDATE_ACTIVITY_LIST = 'updateActivityList';
const UPDATE_HASH_MODAL_LIST = 'updateHashModalList';
export const UPDATE_ACTIVITY_PUSH_LIST = 'updateActivityPushList';

const INIT_VALUE = {
  activityList: [],
  hashModalList: [],
  activityPushList: [],
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
    [UPDATE_ACTIVITY_PUSH_LIST](state, list) {
      state.activityPushList = list;
    },
  },
  actions: {
    async [GET_ACTIVITY_PUSH_LIST]({ commit }) {
      try {
        const { body: { list } } = await API.getActivityPushList();
        commit(UPDATE_ACTIVITY_PUSH_LIST, list);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [ACTIVITY_VIEW_COUNT](_, { id }) {
      try {
        await API.activityViewCount({ pathParams: { id } });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
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
