import numberUtils from 'aa-utils/lib/numberUtils';
import proportionIcon from '@/assets/account/proportion-icon.png';
import styles from './index.less?module';

const ProportionDetails = {
  props: {
    promotionBonus: { type: String },
    proportion: { type: String },
    levelName: { type: String },
  },
  render() {
    return (
      <div class={styles.wrapper}>
        <img class={styles.icon} src={proportionIcon} alt="" />
        <div class={styles.title}>{this.$t('ratioDialogRatio')}</div>
        <div class={styles.description}>{this.$t('ratioDialogDesc')}</div>
        <div class={styles['default-bonus']}>
          <div>{this.$t('ratioDialogRatioDefault')}</div>
          <div>{numberUtils.formatPercent(this.proportion, { minimumFractionDigits: 2 })}</div>
        </div>
        <div class={styles['other-bonus']}>
          <div>{`"${this.levelName}"${this.$t('ratioDialogOutputAddition')}`}</div>
          <div>{numberUtils.formatPercent(this.promotionBonus, { minimumFractionDigits: 2 })}</div>
        </div>
      </div>
    );
  },
};

export default ProportionDetails;
