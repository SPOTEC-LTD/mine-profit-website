import * as homeAPI from '@/api/home';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import locationHelp from '@/shared/utils/locationHelp';
import { accountHashRateListPath } from '@/router/consts/urls';
import HomeModal from '../HomeModal';

import styles from './index.less?module';

const HashrateModal = {
  props: {
    info: Object,
  },
  methods: {
    close() {
      const { userId } = getUserInfoFunc();
      homeAPI.viewedHashratePopup({ pathParams: { userId, id: this.info.id } });
      this.$emit('viewed');
    },
    toMineHashratePage() {
      locationHelp.open(accountHashRateListPath, { query: { hashrateType: this.info.hashrateType } });
      this.close();
    },
    getHashrateContent() {
      const { name, unit, hashrateType, eachAmount, validity } = this.info;

      return (
        <div class={styles.wrapper}>
          <div class={styles.container}>
            <div class={styles.name}>{name}</div>
            <div>
              <span class={styles.amount}>{`${eachAmount}${unit}`}</span>
              <span class={styles.validity}>{`${validity}${this.$t('day')}`}</span>
            </div>
            <div class={styles['hashrate-type']}>{this.$t('coinHashrate', { coin: hashrateType })}</div>
            <div class={styles['view-now']} onClick={this.toMineHashratePage}>
              {this.$t('viewNow')}
            </div>
            <span class={styles.tag}>{this.$t('vipHashrateUsed')}</span>
          </div>
        </div>
      );
    },
  },
  render() {
    return (
      <HomeModal
        width={543}
        onClose={this.close}
        scopedSlots={{ content: this.getHashrateContent }}
      />
    );
  },
};

export default HashrateModal;
