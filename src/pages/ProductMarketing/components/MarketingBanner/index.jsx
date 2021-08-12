import BaseContainer from '@/shared/components/BaseContainer';
import styles from './index.less?module';

const MarketingBanner = {
  render() {
    return (
      <div class={styles['marketing-banner-container']}>
        <BaseContainer hasBreadcrumb={false}>
          <div class={styles['marketing-banner-title']}>{this.$t('highFreeTrading')}</div>
          <div class={styles['marketing-banner-content']}>{this.$t('twoTypeOfMode')}</div>
        </BaseContainer>
      </div>
    );
  },
};

export default MarketingBanner;
