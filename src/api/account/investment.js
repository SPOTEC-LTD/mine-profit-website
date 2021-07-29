import { createAPI, httpMethod } from '@/shared/utils/request';

export const getInvestmentList = createAPI(httpMethod.GET, '/product/hashrate/pledges/:userId/investment');
export const getOrderPages = createAPI(httpMethod.GET, '/customer/product/orderPages');
