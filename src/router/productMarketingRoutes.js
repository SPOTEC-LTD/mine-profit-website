import OfficialMarketing from '@/pages/ProductMarketing/OfficialMarketing';
import C2CMarketing from '@/pages/ProductMarketing/C2CMarketing';
import * as urls from './consts/urls';

export default [
  {
    path: urls.officialMarketingPath,
    name: 'hashRateMarket',
    component: OfficialMarketing,
  },
  {
    path: urls.c2cMarketingPath,
    name: 'marketC2CMarket',
    component: C2CMarketing,
  },
];
