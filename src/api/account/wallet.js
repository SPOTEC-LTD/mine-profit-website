import { createAPI, httpMethod } from '@/shared/utils/request';

export const getWalletDetail = createAPI(httpMethod.GET, '/customer/ledger/page');
export const getWalletAssets = createAPI(httpMethod.GET, '/customer/assets/balance');
export const getRechargeAddresses = createAPI(httpMethod.GET, '/wallet/deposit/addresses');
export const getWithdrawalAddress = createAPI(httpMethod.GET, '/customer/withdraw/addresses/:userId/web');
export const addAddress = createAPI(httpMethod.POST, '/customer/withdraw/addresses/:userId');
export const deleteAddress = createAPI(httpMethod.DELETE, '/customer/withdraw/addresses/:userId/:id');
export const editAddress = createAPI(httpMethod.PUT, '/customer/withdraw/addresses/:userId/:id');
export const updateWithDraw = createAPI(httpMethod.POST, '/customer/withdraw');
export const getAllBalance = createAPI(httpMethod.GET, '/customer/withdraw/balanceNHandlingFee');
export const getWalletBalance = createAPI(httpMethod.GET, '/customer/users/:userId/balance');
export const getBuyBackDetail = createAPI(httpMethod.GET, '/customer/buy_back/detail');
export const officialBuyBack = createAPI(httpMethod.POST, '/customer/buy_back');
export const getLedgerTypeList = createAPI(httpMethod.GET, '/finance/ledger/typeList');
