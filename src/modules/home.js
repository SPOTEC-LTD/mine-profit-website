export default {
  namespaced: true,
  state: {
    demandDepositList: [],
    hasGetInfo: false,
    unreadCount: 2323234,
  },
  mutations: {
    updateDemandDepositList(state, demandDepositList) {
      state.demandDepositList = demandDepositList;
    },
  },
  actions: {
    // 获取用户相关信息
    async getDepositList({ commit }) {
      try {
        // const { body: { demandDepositList } } = await getDepositList();
        // commit('updateDemandDepositList', demandDepositList);

        return Promise.resolve();
      } catch (error) {
        console.log('error', error);

        return Promise.reject(error);
      }
    },
  },
};
