import { createAPI, httpMethod } from '@/shared/utils/request';

export const getUserBaseInfo = createAPI(httpMethod.GET, '/customer/users/:userId');
export const getUserBadge = createAPI(httpMethod.GET, '/customer/users/badge');
export const getInviteInfo = createAPI(httpMethod.GET, '/customer/users/:userId/invite');
