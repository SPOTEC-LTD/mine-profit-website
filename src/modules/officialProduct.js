import * as API from '@/api/officialMarket';

export const OFFICIAL_PRODUCT = 'officialProduct';
export const GET_OFFICIAL_PRODUCT_LIST = 'getOfficialProductList';
export const UPDATE_PRODUCT_LIST = 'updateProductList';
export const UPDATE_ACTIVE_COIN = 'updateActiveCoin';
export const PLACE_PRODUCT_ORDER = 'placeProductOrder';
export const UPDATE_PRODUCT_INFO = 'updateProductInfo';

const initValue = {
  allProductList: [],
  btcProductList: [],
  ethProductList: [],
  activeCoin: '',
  productOrderResult: {},
};

export default {
  namespaced: true,
  state: initValue,
  mutations: {
    [UPDATE_PRODUCT_LIST](state, { list, key }) {
      const resultKey = key || 'all';
      state[`${resultKey}ProductList`] = list;
    },
    [UPDATE_ACTIVE_COIN](state, coin) {
      state.activeCoin = coin;
    },
    [UPDATE_PRODUCT_INFO](state, productOrderResult) {
      state.productOrderResult = productOrderResult;
    },
  },
  actions: {
    async [GET_OFFICIAL_PRODUCT_LIST]({ commit }, data) {
      const { chainType } = data;
      try {
        const { body: { list } } = await API.getProductList({ data });
        commit(UPDATE_PRODUCT_LIST, { list, key: chainType });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async [PLACE_PRODUCT_ORDER]({ commit }, data) {
      try {
        const { body: { productOrderResult } } = await API.placeProductOrder({ data });
        commit(UPDATE_PRODUCT_INFO, productOrderResult);
        return Promise.resolve({ paySuccess: productOrderResult.success });
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
