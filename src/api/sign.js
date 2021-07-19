import { createAPI, httpMethod } from '@/shared/utils/request';

export const getCountries = createAPI(httpMethod.GET, '/admin/countries');
export const getPhoneCode = createAPI(httpMethod.GET, '/message/codes/phone');
export const getEmailCode = createAPI(httpMethod.GET, '/message/codes/email');
export const verifyLogin = createAPI(httpMethod.POST, '/customer/users/login/code');
export const passwordLogin = createAPI(httpMethod.POST, '/customer/users/login/password');
