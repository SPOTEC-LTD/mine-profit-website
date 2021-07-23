import { createAPI, httpMethod } from '@/shared/utils/request';

export const getCoupons = createAPI(httpMethod.GET, '/product/hashrate/coupons/customer/:userId/web');
