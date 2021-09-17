import dateUtils from '@/shared/intl/utils/dateUtils';
import preSaleDecImg from '@/assets/productMarket/preSaleDecImg.png';
import { PRE_SALE_NOW } from '@/shared/consts/preSaleStatus';
import styles from './index.less?module';

const PreSaleDec = {
  props: {
    preStatus: Number,
    preSaleStartTime: Number,
    preSaleEndTime: Number,
    isSaleOut: Boolean,
  },

  methods: {
    cardNode({ timeTitle }) {
      const startTime = dateUtils.formatDateTime(this.preSaleStartTime, 'YYYY.MM.DD HH:mm');
      const endTime = dateUtils.formatDateTime(this.preSaleEndTime, 'YYYY.MM.DD HH:mm');
      return (
        <div class={styles['pre-sale-container']}>
          <div class={styles['sale-title']}>
            <span class={styles['time-title']}>{timeTitle}</span>
            <img src={preSaleDecImg} alt="" class={styles['pre-sale-img']} />
          </div>
          <div class={styles['time-need']}>
            {`${startTime}-${endTime}`}
          </div>
        </div>
      );
    },
  },

  render() {
    const { preStatus, isSaleOut } = this;
    return (
      <div>
        {!isSaleOut && preStatus === PRE_SALE_NOW && (this.cardNode({ timeTitle: this.$t('preSaleNow') }))}
        {isSaleOut && (this.cardNode({ timeTitle: this.$t('marketSoldOut') }))}
      </div>
    );
  },
};

export default PreSaleDec;
