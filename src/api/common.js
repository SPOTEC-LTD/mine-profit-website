import { createAPI, httpMethod } from '@/shared/utils/request';

export const getChainOrder = createAPI(httpMethod.GET, '/product/unit/order');
export const getDynamicChainType = createAPI(httpMethod.GET, '/product/unit/dynamicChainType');
