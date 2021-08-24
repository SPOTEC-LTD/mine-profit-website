import OfficialMarketing from '@/pages/ProductMarketing/OfficialMarketing';
import C2CMarketing from '@/pages/ProductMarketing/C2CMarketing';
import OfficialProductDetails from '@/pages/ProductMarketing/OfficialMarketing/OfficialProductDetails';
import productTemplate from '@/pages/ProductMarketing/ProductTemplate';
import C2CProductDetails from '@/pages/ProductMarketing/C2CMarketing/C2CProductDetails';
import OfficialProductSettlement from '@/pages/ProductMarketing/OfficialMarketing/Settlement';
import C2CProductSettlement from '@/pages/ProductMarketing/C2CMarketing/Settlement';
import * as urls from './consts/urls';

export default [
  {
    path: urls.marketingPaths,
    redirect: urls.officialMarketingPath,
    name: 'hashRateMarket',
  },
  {
    path: urls.officialMarketingPath,
    name: 'officialMarketing',
    component: OfficialMarketing,
  },
  {
    path: urls.c2cMarketingPath,
    name: 'marketC2CMarket',
    component: C2CMarketing,
  },
  {
    path: urls.officialDetailsPath,
    meta: { showBreadcrumb: true },
    name: 'marketHashDetail',
    component: OfficialProductDetails,
  },
  {
    path: urls.productTemplatePath,
    meta: { showBreadcrumb: true },
    name: 'marketHashDetail__template',
    component: productTemplate,
  },
  {
    path: urls.c2cDetailsPath,
    meta: { showBreadcrumb: true },
    name: 'marketHashDetail__c2c',
    component: C2CProductDetails,
  },
  {
    path: urls.officialSettlementPath,
    meta: { showBreadcrumb: true },
    name: 'marketConfirmSettle',
    component: OfficialProductSettlement,
  },
  {
    path: urls.c2cSettlementPath,
    meta: { showBreadcrumb: true },
    name: 'marketConfirmSettle__c2c',
    component: C2CProductSettlement,
  },
];
