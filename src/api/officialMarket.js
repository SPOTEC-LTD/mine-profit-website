import { createAPI, httpMethod } from '@/shared/utils/request';

export const getProductList = createAPI(httpMethod.GET, '/customer/product/list');
export const getProductDetails = createAPI(httpMethod.GET, '/customer/product/detail/:id');
export const getOrderList = createAPI(httpMethod.GET, '/customer/product/orderPages');
export const preOrderProduct = createAPI(httpMethod.POST, '/customer/product/preOrder');
export const placeProductOrder = createAPI(httpMethod.POST, '/customer/product/order');
export const getProductTemplateInfo = createAPI(httpMethod.GET, '/product/productTemplate/:id/info');
