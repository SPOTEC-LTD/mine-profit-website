import { createAPI, httpMethod } from '@/shared/utils/request';

export const getRateExchange = createAPI(httpMethod.GET, '/customer/rate');
