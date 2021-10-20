import * as API from '@/api/activity';

export const ACTIVITY = 'activity';
export const GET_ACTIVITY_LIST = 'getActivityList';
export const UPDATE_ACTIVITY_LIST = 'updateActivityList';

const INIT_VALUE = {
  activityList: [],
};

export default {
  namespaced: true,
  state: INIT_VALUE,
  mutations: {
    [UPDATE_ACTIVITY_LIST](state, list) {
      state.activityList = list;
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
  },
};
