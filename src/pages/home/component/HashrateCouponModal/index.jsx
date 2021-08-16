import * as homeAPI from '@/api/home';
import locationHelp from '@/shared/utils/locationHelp';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import { hashRateCouponsPath } from '@/router/consts/urls';
import HomeModal from '../HomeModal';

import styles from './index.less?module';

const HashrateCouponModal = {
  props: {
    info: Object,
  },
  methods: {
    close() {
      const { userId } = getUserInfoFunc();
      homeAPI.viewedHashrateCouponPopup({ pathParams: { userId, id: this.info.id } });
      this.$emit('viewed');
    },
    click() {
      locationHelp.open(hashRateCouponsPath);
      this.close();
    },
    getHashrateCouponContent() {
      const { name, unit, hashrateType, eachAmount, validity } = this.info;
      return (
        <div class={styles.wrapper}>
          <div class={styles.title}>{this.$t('hashRateCouponDialogGetCoupon')}</div>
          <div class={styles.name}>{name}</div>
          <div>
            <span class={styles.amount}>{`${eachAmount}${unit}`}</span>
            <span class={styles.validity}>{`${validity}${this.$t('day')}`}</span>
          </div>
          <div class={styles['hashrate-type']}>{this.$t('coinHashrate', { coin: hashrateType })}</div>
          <div class={styles['view-now']} onClick={this.click}>
            {this.$t('viewNow')}
          </div>
          <div class={styles.prompt}>{this.$t('hashRateCouponDialogContent')}</div>
        </div>
      );
    },
  },
  render() {
    return (
      <HomeModal
        onClose={this.close}
        scopedSlots={{ content: this.getHashrateCouponContent }}
      />
    );
  },
};

export default HashrateCouponModal;
