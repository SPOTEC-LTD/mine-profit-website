/* eslint-disable no-underscore-dangle */
const createLoadingPlugin = ({ namespace: NAMESPACE = 'loading' } = {}) => {
  const SHOW = '@@LOADING/SHOW';
  const HIDE = '@@LOADING/HIDE';
  return store => {
    if (store.state[NAMESPACE]) {
      throw new Error(
        `createLoadingPlugin: ${NAMESPACE} exited in current store`,
      );
    }
    store.registerModule(NAMESPACE, {
      namespaced: true,
      state: {
        global: false,
        models: {},
        effects: {},
      },
      mutations: {
        [SHOW]: (state, { payload: { actionType } }) => {
          const namespace = actionType.split('/')[0];
          state.global = true;
          state.models = { ...state.models, [namespace]: true };
          state.effects = { ...state.effects, [actionType]: true };
        },
        [HIDE]: (state, { payload: { actionType } }) => {
          const namespace = actionType.split('/')[0];
          const effects = { ...state.effects, [actionType]: false };
          const models = {
            ...state.models,
            [namespace]: Object.keys(effects).some(actionTypeItem => {
              const _namespace = actionTypeItem.split('/')[0];
              if (_namespace !== namespace) return false;
              return effects[actionType];
            }),
          };
          const global = Object.keys(models).some(namespaceValue => {
            return models[namespaceValue];
          });
          state.effects = effects;
          state.global = global;
          state.models = models;
        },
      },
    });
    store.subscribeAction({
      before: action => {
        store.commit(
          {
            type: `${NAMESPACE}/${SHOW}`,
            payload: { actionType: action.type },
          },
          { root: true },
        );
      },
      after: action => {
        store.commit(
          {
            type: `${NAMESPACE}/${HIDE}`,
            payload: { actionType: action.type },
          },
          { root: true },
        );
      },
      error: action => {
        store.commit(
          {
            type: `${NAMESPACE}/${HIDE}`,
            payload: { actionType: action.type },
          },
          { root: true },
        );
      },
    });
  };
};

export default createLoadingPlugin;
