import * as API from '@/api/rank';

export const RANK = 'rank';
export const GET_REWARD_SET_LIST = 'getRewardSetList';

export const UPDATE_REWARD_SET_LIST = 'updateRewardSetList';

export default {
  namespaced: true,
  state: {
    rewardSetList: [],
  },
  mutations: {
    [UPDATE_REWARD_SET_LIST](state, list) {
      state.rewardSetList = list;
    },
  },
  actions: {
    async [GET_REWARD_SET_LIST]({ commit }, params) {
      try {
        const { body: { list } } = await API.getRewardSettings({ data: params });
        commit(UPDATE_REWARD_SET_LIST, list);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
