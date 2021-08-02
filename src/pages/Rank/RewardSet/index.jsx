import { mapState } from 'vuex';
import isEmpty from 'lodash/isEmpty';
import { Spin } from 'ant-design-vue';
import { RANK, GET_REWARD_SET_LIST } from '@/modules/rank';
import NoData from '@/shared/components/NoData';
import RewardCard from './RewardCard';
import styles from './index.less?module';

const RewardSet = {
  computed: {
    ...mapState({
      list: state => state.rank.rewardSetList,
      loading: state => state.loading.effects[`${RANK}/${GET_REWARD_SET_LIST}`],
    }),
  },
  render() {
    return (
      <Spin spinning={this.loading}>
        <div class={styles['reward-set']}>
          {this.list.map(item => (
            <RewardCard info={item} />
          ))}
          {
            isEmpty(this.list) && <NoData />
          }
        </div>
      </Spin>
    );
  },
};

export default RewardSet;
