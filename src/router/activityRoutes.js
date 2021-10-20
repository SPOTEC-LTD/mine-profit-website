import Activity from '@/pages/Activity';
import Rank from '@/pages/Rank';
import * as urls from './consts/urls';

export default [
  {
    path: urls.activityPath,
    name: 'activity',
    component: Activity,
  },
  {
    path: urls.rankPath,
    name: 'rank',
    component: Rank,
  },
];
