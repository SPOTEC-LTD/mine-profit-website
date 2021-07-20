import AccountDetail from '@/pages/Account/Detail';
import HashrateList from '@/pages/Account/Hashrate/List';
import * as urls from './consts/urls';

export default [
  {
    path: urls.accountDetailPath,
    name: 'Detail',
    component: AccountDetail,
  },
  {
    path: urls.accountHashrateListPath,
    name: 'HashrateList',
    component: HashrateList,
  },
];
