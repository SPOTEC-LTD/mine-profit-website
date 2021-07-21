import AccountDetail from '@/pages/Account/Detail';
import HashRateList from '@/pages/Account/HashRate/List';
import * as urls from './consts/urls';

export default [
  {
    path: urls.accountDetailPath,
    name: 'Detail',
    component: AccountDetail,
  },
  {
    path: urls.accountHashRateListPath,
    name: 'HashRateList',
    component: HashRateList,
  },
];
