import { createAPI, httpMethod } from '@/shared/utils/request';

export const getProductHashrateStatistics = createAPI(httpMethod.GET, '/product/hashrate/:userId/statistics');
export const getProductShutdownHashrate = createAPI(httpMethod.GET, '/product/hashrate/:userId/shutdown');
export const getProductOrdinaryHashrate = createAPI(httpMethod.GET, '/product/hashrate/:userId/ordinary');
export const getProductCloseHashrate = createAPI(httpMethod.GET, '/product/hashrate/:userId/close');
export const getProductTransferHashrate = createAPI(httpMethod.GET, '/product/hashrate/:userId/transfer');
export const getProductPledgesHashrate = createAPI(httpMethod.GET, '/product/hashrate/pledges/:userId/list');

export const getOrdinaryHashrateBuff = createAPI(httpMethod.GET, '/product/hashrate/:userId/ordinary/buff');
export const getCloseHashrateBuff = createAPI(httpMethod.GET, '/product/hashrate/:userId/close/buff');
export const getHashratePledgesSourceInfo = createAPI(httpMethod.GET, '/product/hashrate/pledges/:userId/:id/source/info');
export const hashrateTransfer = createAPI(httpMethod.POST, '/customer/c2c/trans');
export const cancelTransfer = createAPI(httpMethod.POST, '/customer/c2c/cancel/:id');
export const getTransferableAmount = createAPI(httpMethod.GET, '/customer/c2c/transAmount/:ptId/:hasPowerOff');

export const getHashRateTurnOnDetail = createAPI(httpMethod.GET, '/product/hashrate/:userId/:productTemplateId/action');
export const getHashRatePledgeDetail = createAPI(httpMethod.GET,
  '/product/hashrate/pledges/:userId/:productTemplateId/info');
export const getPledgeDurationList = createAPI(httpMethod.GET, '/product/hashrate/pledges/duration/list');
export const hashratePledge = createAPI(httpMethod.POST, '/product/hashrate/pledges/:userId/:productTemplateId');
export const cancelHashratePledge = createAPI(httpMethod.PUT, '/product/hashrate/pledges/:userId/:id/cancel');
export const hashRatePowerOn = createAPI(httpMethod.PUT, '/product/hashrate/:userId/action');
export const getPledgeRedeemInfo = createAPI(httpMethod.GET, '/product/hashrate/pledges/:userId/:id/redeem');
export const getPledgeRepaymentInfo = createAPI(httpMethod.GET, '/product/hashrate/pledges/:userId/:id/repayment');
export const pledgeRedeemPay = createAPI(httpMethod.PUT, '/product/hashrate/pledges/:userId/:id/redeem');
export const pledgeRepaymentPay = createAPI(httpMethod.PUT, '/product/hashrate/pledges/:userId/:id/repayment');
export const pledgeConfirmSettle = createAPI(httpMethod.PUT, '/product/hashrate/pledges/:userId/:id/settle');
export const getDynamicHashInfo = createAPI(httpMethod.GET, '/product/hashrate/:userId/mpt');
