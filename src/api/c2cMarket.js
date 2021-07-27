import { createAPI, httpMethod } from '@/shared/utils/request';

export const getC2CList = createAPI(httpMethod.GET, '/customer/c2c/list');
export const getC2CDetails = createAPI(httpMethod.GET, '/customer/c2c/detail/:id');
export const cancelSubject = createAPI(httpMethod.POST, '/customer/c2c/cancel/:id');
export const preSubjectOrder = createAPI(httpMethod.GET, '/customer/c2c/preOrder/:id');
export const placeSubjectOrder = createAPI(httpMethod.POST, '/customer/c2c/order');
export const transSubject = createAPI(httpMethod.POST, '/customer/c2c/trans');
export const getShareSubject = createAPI(httpMethod.GET, '/customer/c2c/share/:id');
export const getShareDetail = createAPI(httpMethod.GET, '/customer/c2c/shareDetail/:id');
export const getTransCount = createAPI(httpMethod.GET, '/customer/c2c/transAmount/:ptId/:hasPowerOff');
