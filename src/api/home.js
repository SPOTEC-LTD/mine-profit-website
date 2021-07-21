import { createAPI, httpMethod } from '@/shared/utils/request';

export const getMineField = createAPI(httpMethod.GET, '/operation/pool/app/all');
export const getHomeProductList = createAPI(httpMethod.GET, '/customer/product/list');
