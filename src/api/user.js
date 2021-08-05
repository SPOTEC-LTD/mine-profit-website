import { createAPI, httpMethod } from '@/shared/utils/request';

export const getUserBallance = createAPI(httpMethod.GET, '/customer/users/:userId/balance');
export const getUserInfo = createAPI(httpMethod.GET, '/customer/users/:userId');
