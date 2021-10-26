import { createAPI, httpMethod } from '@/shared/utils/request';

export const getActivityList = createAPI(httpMethod.GET, '/operation/activity/list');
export const getActivityDetail = createAPI(httpMethod.GET, '/operation/activity/:id/info');
