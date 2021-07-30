import { createAPI, httpMethod } from '@/shared/utils/request';

export const getLeaderboardInfo = createAPI(httpMethod.GET, '/product/top/:topType/current');
export const getHistoryRankInfo = createAPI(httpMethod.GET, '/product/hashrate/reward/histories/app');
export const getHistoryDuration = createAPI(httpMethod.GET, '/product/hashrate/reward/histories/duration');
export const getRewardSettings = createAPI(httpMethod.GET, '/product/hashrate/reward/config/app');
