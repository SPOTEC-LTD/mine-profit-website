import KeepTabs from '@/shared/components/KeepTabs';
import InviteDetail from '../InviteDetail';
import PromoteRules from '../PromoteRules';
import PromoteLevel from '../PromoteLevel';
import { INVITE_DETAIL, PROMOTE_RANK, PROMOTE_RULE } from '../../consts/tabsActiveValue';

import styles from './index.less?module';

const { TabPane } = KeepTabs;

const BaseInfoModalContent = {
  props: {
    active: { type: String, default: INVITE_DETAIL },
  },
  methods: {
    onTabsChange(value) {
      this.$emit('tabsActiveChange', value);
    },
  },
  render() {
    return (
      <div class={styles.wrapper}>
        <KeepTabs
          class="mine-tabs-card"
          activeKeyName="OfficialCoinType"
          value={this.active}
          onChange={this.onTabsChange}
        >
          <TabPane key={INVITE_DETAIL} tab={this.$t('inviteFriendsDetail')}>
            {this.active === INVITE_DETAIL && <InviteDetail />}
          </TabPane>
          <TabPane key={PROMOTE_RULE} tab={this.$t('promoteRule')}>
            {this.active === PROMOTE_RULE && <PromoteRules />}
          </TabPane>
          <TabPane key={PROMOTE_RANK} tab={this.$t('promoteRank')}>
            {this.active === PROMOTE_RANK && <PromoteLevel />}
          </TabPane>
        </KeepTabs>
      </div>
    );
  },
};

export default BaseInfoModalContent;
