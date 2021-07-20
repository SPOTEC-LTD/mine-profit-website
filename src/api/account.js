import { createAPI, httpMethod } from '@/shared/utils/request';

export const getUserBaseInfo = createAPI(httpMethod.GET, '/customer/users/:userId');
