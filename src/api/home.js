import { createAPI, httpMethod } from '@/shared/utils/request';

export const getMineField = createAPI(httpMethod.GET, '/operation/pool/app/all');
export const getHomeProductList = createAPI(httpMethod.GET, '/customer/product/list');
export const getBanners = createAPI(httpMethod.GET, '/operation/banner/list');
export const getHashrateCouponPopupList = createAPI(httpMethod.GET, '/product/hashrate/coupons/customer/:userId/home');
export const getHashratePopupList = createAPI(httpMethod.GET, '/product/hashrate/template/customer/:userId/home');
export const viewedHashratePopup = createAPI(httpMethod.PUT, '/product/hashrate/template/customer/:userId/:id/home');
export const viewedHashrateCouponPopup = createAPI(httpMethod.PUT, '/product/hashrate/coupons/customer/:userId/:id/home');
export const getBannerDetail = createAPI(httpMethod.GET, '/operation/banner/:id');
