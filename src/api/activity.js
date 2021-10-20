import { createAPI, httpMethod } from '@/shared/utils/request';

export const getActivityList = createAPI(httpMethod.GET, '/operation/activity/list');
