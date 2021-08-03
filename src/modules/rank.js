import * as API from '@/api/rank';
import localStorage from '@/shared/utils/localStorage';

export const RANK = 'rank';
export const GET_REWARD_SET_LIST = 'getRewardSetList';
export const GET_HISTORY_RANK_INFO = 'getHistoryRankInfo';
export const GET_HISTORY_DURATION = 'getHistoryDuration';

export const UPDATE_REWARD_SET_LIST = 'updateRewardSetList';
export const UPDATE_HISTORY_RANK_INFO = 'updateHistoryRankInfo';
export const UPDATE_HISTORY_DURATION = 'updateHistoryDuration';

export default {
  namespaced: true,
  state: {
    rewardSetList: [],
    historyRankInfo: {},
    historyDuration: [],
  },
  mutations: {
    [UPDATE_REWARD_SET_LIST](state, list) {
      state.rewardSetList = list;
    },
    [UPDATE_HISTORY_RANK_INFO](state, info) {
      state.historyRankInfo = info;
    },
    [UPDATE_HISTORY_DURATION](state, list) {
      state.historyDuration = list;
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
    async [GET_HISTORY_RANK_INFO]({ commit }, params) {
      const { userId } = localStorage.getObject('userInfo');

      try {
        const { body: { topHashrate } } = await API.getHistoryRankInfo({ data: { userId, ...params } });
        commit(UPDATE_HISTORY_RANK_INFO, topHashrate);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [GET_HISTORY_DURATION]({ commit }, type) {
      try {
        const { body: { list } } = await API.getHistoryDuration({ data: { type } });
        commit(UPDATE_HISTORY_DURATION, list);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
