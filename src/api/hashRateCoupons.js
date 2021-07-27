import { createAPI, httpMethod } from '@/shared/utils/request';

export const getCoupons = createAPI(httpMethod.GET, '/product/hashrate/coupons/customer/:userId/web');
export const getVipCoupons = createAPI(httpMethod.GET, '/product/hashrate/coupons/customer/:userId/app');
