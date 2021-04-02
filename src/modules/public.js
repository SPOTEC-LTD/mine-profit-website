export default {
  namespaced: true,
  state: {
    error: {
      type: '',
      msg: '',
    },
  },
  mutations: {
    updateError(state, error) {
      state.error = error;
    },
  },
  actions: {
  },
};
