import AccountDetail from '@/pages/Account/Detail';
import HashRateList from '@/pages/Account/HashRate/List';
import HashRateCoupons from '@/pages/Account/HashRateCoupons';
import BindPhone from '@/pages/Account/BindPhone';
import BindEmail from '@/pages/Account/BindEmail';
import SetDealPassword from '@/pages/Account/SetDealPassword';
import SetLoginPassword from '@/pages/Account/SetLoginPassword';
import * as urls from './consts/urls';

export default [
  {
    path: urls.accountDetailPath,
    name: 'account',
    component: AccountDetail,
  },
  {
    path: urls.accountHashRateListPath,
    name: 'HashRateList',
    component: HashRateList,
  },
  {
    path: urls.hashRateCouponsPath,
    meta: { showBreadcrumb: true },
    name: 'hashRateCoupons',
    component: HashRateCoupons,
  },
  {
    path: urls.bindPhonePath,
    name: 'bindPhone',
    component: BindPhone,
  },
  {
    path: urls.bindEmailPath,
    name: 'bindEmail',
    component: BindEmail,
  },
  {
    path: urls.setDealPasswordPath,
    name: 'dealPasswordSet',
    component: SetDealPassword,
  },
  {
    path: urls.setLoginPasswordPath,
    name: 'loginPasswordSet',
    component: SetLoginPassword,
  },
];
