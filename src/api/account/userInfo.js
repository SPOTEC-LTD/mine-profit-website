import { createAPI, httpMethod } from '@/shared/utils/request';

export const getUserBaseInfo = createAPI(httpMethod.GET, '/customer/users/:userId');
export const getUserBadge = createAPI(httpMethod.GET, '/customer/users/badge');
export const getInviteInfo = createAPI(httpMethod.GET, '/customer/users/:userId/invite');
export const updateDealPassword = createAPI(httpMethod.PUT, '/customer/users/:userId/deal');
export const updateUserBaseInfo = createAPI(httpMethod.PUT, '/customer/users/:userId/base');
export const getCountries = createAPI(httpMethod.GET, '/admin/countries');
export const bindPhoneOrEmail = createAPI(httpMethod.PUT, '/customer/users/:userId/binding');
export const updateLoginPassword = createAPI(httpMethod.PUT, '/customer/users/:userId/password');
export const bindInvitationCode = createAPI(httpMethod.PUT, '/customer/users/:userId/Invite');
export const userRealNameAuth = createAPI(httpMethod.POST, '/customer/kyc/:userId');
export const getVideoAuthCode = createAPI(httpMethod.GET, '/customer/kyc/:userId/code');
export const getInviteDetailList = createAPI(httpMethod.GET, '/customer/users/:userId/invite/list');
export const getInvitePack = createAPI(httpMethod.GET, '/customer/users/invite/pack');
