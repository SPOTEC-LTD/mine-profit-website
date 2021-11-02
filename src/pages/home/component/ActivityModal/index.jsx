import { mapActions } from 'vuex';
import locationHelp from '@/shared/utils/locationHelp';
import {
  rankPath,
  accountDetailPath,
  platformCurrencyPath,
  activityContentPath,
  noviceBenefitsPath,
} from '@/router/consts/urls';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import {
  ONLY_SHOW,
  RANK,
  INVITE_FRIENDS,
  NOVICE_ACTIVITY,
  HASHRATE_ACTIVITY,
  LINK,
  H5_CONTENT,
} from '@/shared/consts/activityTypes';
import { ACTIVITY, ACTIVITY_VIEW_COUNT, ACTIVITY_SHOW_COUNT } from '@/modules/activity';
import { PROMOTE_RULE } from '@/pages/Account/Detail/consts/tabsActiveValue';
import HomeModal from '../HomeModal';
import styles from './index.less?module';

const ActivityModal = {
  props: {
    info: Object,
  },
  watch: {
    info() {
      this.updateActivityShowCount();
    },
  },
  mounted() {
    this.updateActivityShowCount();
  },
  methods: {
    ...mapActions(ACTIVITY, [ACTIVITY_VIEW_COUNT, ACTIVITY_SHOW_COUNT]),
    updateActivityShowCount() {
      this[ACTIVITY_SHOW_COUNT]({ id: this.info.activityCommonId });
    },
    toActivityDetailPage() {
      const { type, linkUrl, id, activityCommonId } = this.info;
      const { userId = 'null' } = getUserInfoFunc();
      const activityTypeMap = {
        [RANK]: () => locationHelp.open(rankPath),
        [INVITE_FRIENDS]: () => {
          const pathParams = { query: { inviteModelActiveKey: PROMOTE_RULE } };
          locationHelp.open(accountDetailPath, pathParams);
        },
        [NOVICE_ACTIVITY]: () => locationHelp.open(noviceBenefitsPath),
        [HASHRATE_ACTIVITY]: () => locationHelp.open(platformCurrencyPath),
        [LINK]: () => window.open(linkUrl),
        [H5_CONTENT]: () => locationHelp.open(activityContentPath, { params: { userId, id: activityCommonId } }),
      };
      if (type !== ONLY_SHOW) {
        this[ACTIVITY_VIEW_COUNT]({ id: activityCommonId });
        activityTypeMap[type]();
      }
      this.$emit('viewed', id);
    },
    close() {
      this.$emit('viewed', this.info.id);
    },
    getActivityModalContent() {
      const { pushImage } = this.info;
      return (
        <div class={styles['activity-image-box']}>
          <img class={styles['push-image']} src={pushImage} alt="" onClick={this.toActivityDetailPage} />
        </div>
      );
    },
  },
  render() {
    return (
      <HomeModal
        onClose={this.close}
        scopedSlots={{
          content: this.getActivityModalContent,
        }}
      />
    );
  },
};

export default ActivityModal;
