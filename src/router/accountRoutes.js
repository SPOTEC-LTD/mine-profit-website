import AccountDetail from '@/pages/Account/Detail';
import HashRateList from '@/pages/Account/HashRate/List';
import HashRateTurnOn from '@/pages/Account/HashRateTurnOn';
import TransferHashrate from '@/pages/Account/TransferHashrate';
import PledgeHashrate from '@/pages/Account/PledgeHashrate';
import HashRateCoupons from '@/pages/Account/HashRateCoupons';
import BindPhone from '@/pages/Account/BindPhone';
import BindEmail from '@/pages/Account/BindEmail';
import SetDealPassword from '@/pages/Account/SetDealPassword';
import SetLoginPassword from '@/pages/Account/SetLoginPassword';
import RealNameAuth from '@/pages/Account/RealNameAuth';
import Orders from '@/pages/Account/Orders';
import Transactions from '@/pages/Account/Detail/Wallet/Transactions';
import Deposit from '@/pages/Account/Detail/Wallet/Deposit';
import Address from '@/pages/Account/Detail/Wallet/Address';
import PledgeRedeem from '@/pages/Account/PledgeRedeem';
import PledgeRepayment from '@/pages/Account/PledgeRepayment';
import Withdraw from '@/pages/Account/Detail/Wallet/Withdraw';
import BuyBack from '@/pages/Account/Detail/Wallet/BuyBack';
import BindInvitationCode from '@/pages/Account/BindInvitationCode';
import PledgeHelp from '@/pages/Account/PledgeHelp';
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
  {
    path: urls.addressPath,
    meta: { showBreadcrumb: true },
    name: 'withdrawAddressManagement',
    component: Address,
  },
  {
    path: urls.withdrawPath,
    meta: { showBreadcrumb: true },
    name: 'walletAllTypesCarry',
    component: Withdraw,
  },
  {
    path: urls.buyBackPath,
    meta: { showBreadcrumb: true },
    name: 'buyBack',
    component: BuyBack,
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
    name: 'hashRateDetail',
    meta: { showBreadcrumb: true },
    component: HashRateList,
  },
  {
    path: urls.transferHashratePath,
    name: 'transferHashrate',
    meta: { showBreadcrumb: true },
    component: TransferHashrate,
  },
  {
    path: urls.pledgeHashratePath,
    name: 'pledgePageTitle',
    meta: { showBreadcrumb: true },
    component: PledgeHashrate,
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
  {
    path: urls.pledgeRedeemPath,
    meta: { showBreadcrumb: true },
    name: 'payTypeRedeem',
    component: PledgeRedeem,
  },
  {
    path: urls.pledgeRepaymentPath,
    meta: { showBreadcrumb: true },
    name: 'payTypeRepay',
    component: PledgeRepayment,
  },
  {
    path: urls.bindInvitationCodePath,
    name: 'inputInviteCodeBind',
    component: BindInvitationCode,
  },
  {
    path: urls.pledgeHelpPath,
    name: 'pledgeHelp',
    component: PledgeHelp,
  },
];
