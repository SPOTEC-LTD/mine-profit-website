// import { getDepositList } from '@/api';

export const state = () => ({
  demandDepositList: [],
  hasGetInfo: false,
  unreadCount: 2323,
});

export const mutations = {
  updateDemandDepositList(_, demandDepositList) {
    state.demandDepositList = demandDepositList;
  },
};

export const actions = {
  async getDepositList() {
    try {
      // const { body: { demandDepositList } } = await getDepositList();
      // commit('updateDemandDepositList', demandDepositList);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
