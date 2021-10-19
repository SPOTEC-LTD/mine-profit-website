import { createAPI, httpMethod } from '@/shared/utils/request';

export const getPlatformCurrencyDetail = createAPI(httpMethod.GET, '/customer/mptEnv/detail');
export const getDynamicChainInfo = createAPI(httpMethod.GET, '/product/unit/dynamicChainType');
