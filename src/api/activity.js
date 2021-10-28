import { createAPI, httpMethod } from '@/shared/utils/request';

export const getActivityList = createAPI(httpMethod.GET, '/operation/activity/list');
export const getActivityDetail = createAPI(httpMethod.GET, '/operation/activity/:id/info');
export const getActivityPushList = createAPI(httpMethod.GET, '/operation/activity/push/list');
export const activityViewCount = createAPI(httpMethod.PUT, '/operation/activity/:id/click');
export const getBenefitsInfo = createAPI(httpMethod.GET, '/product/benefits/mark/info');
export const getHashModalList = createAPI(httpMethod.GET, '/product/benefits/:userId/receive/benefits');
