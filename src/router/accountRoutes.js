import AccountDetail from '@/pages/Account/Detail';
import HashRateList from '@/pages/Account/HashRate/List';
import HashRateTurnOn from '@/pages/Account/HashRateTurnOn';
import TransferHashrate from '@/pages/Account/TransferHashrate';
import HashRateCoupons from '@/pages/Account/HashRateCoupons';
import BindPhone from '@/pages/Account/BindPhone';
import BindEmail from '@/pages/Account/BindEmail';
import SetDealPassword from '@/pages/Account/SetDealPassword';
import SetLoginPassword from '@/pages/Account/SetLoginPassword';
import RealNameAuth from '@/pages/Account/RealNameAuth';
import Orders from '@/pages/Account/Orders';
import Transactions from '@/pages/Account/Detail/Wallet/Transactions';
import Deposit from '@/pages/Account/Detail/Wallet/Deposit';
import * as urls from './consts/urls';

const walletRoutes = [
  {
    path: urls.transactionsPath,
    meta: { showBreadcrumb: true },
    name: 'transactions',
    component: Transactions,
  },
  {
    path: urls.depositPath,
    meta: { showBreadcrumb: true },
    name: 'walletAllTypesCharge',
    component: Deposit,
  },
];

export default [
  ...walletRoutes,
  {
    path: urls.accountDetailPath,
    name: 'account',
    component: AccountDetail,
  },
  {
    path: urls.accountOrdersPath,
    name: 'orders',
    meta: { showBreadcrumb: true },
    component: Orders,
  },
  {
    path: urls.accountHashRateListPath,
    name: 'hashRateList',
    component: HashRateList,
  },
  {
    path: urls.transferHashratePath,
    name: 'transferHashrate',
    meta: { showBreadcrumb: true },
    component: TransferHashrate,
  },
  {
    path: urls.hashRateTurnOnPath,
    name: 'hashRateTurnOn',
    meta: { showBreadcrumb: true },
    component: HashRateTurnOn,
  },
  {
    path: urls.hashRateCouponsPath,
    meta: { showBreadcrumb: true },
    name: 'hashRateCoupons',
    component: HashRateCoupons,
  },
  {
    path: urls.bindPhonePath,
    meta: { showBreadcrumb: true },
    name: 'bindPhone',
    component: BindPhone,
  },
  {
    path: urls.bindEmailPath,
    meta: { showBreadcrumb: true },
    name: 'bindEmail',
    component: BindEmail,
  },
  {
    path: urls.setDealPasswordPath,
    meta: { showBreadcrumb: true },
    name: 'dealPasswordSet',
    component: SetDealPassword,
  },
  {
    path: urls.setLoginPasswordPath,
    meta: { showBreadcrumb: true },
    name: 'loginPasswordSet',
    component: SetLoginPassword,
  },
  {
    path: urls.realNameAuthPath,
    meta: { showBreadcrumb: true },
    name: 'realNameAuth',
    component: RealNameAuth,
  },
];
