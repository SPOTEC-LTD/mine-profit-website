import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';

import styles from './index.less?modules';

const BottomTips = {
  props: {
    note: String,
    default: '',
  },
  render() {
    return (
      <div class={styles['bottom-tips']}>
        <InfoCircleFilled />
        <div class={styles['tips-box']}>
          <span>{this.$t('tips')}</span>
          <div>{this.note}</div>
        </div>
      </div>
    );
  },
};

export default BottomTips;
