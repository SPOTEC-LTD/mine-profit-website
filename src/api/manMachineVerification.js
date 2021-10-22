import { createAPI, httpMethod } from '@/shared/utils/request';

export const getPicture = createAPI(httpMethod.GET, '/captcha/get');
export const reqCheck = createAPI(httpMethod.POST, '/captcha/check');
