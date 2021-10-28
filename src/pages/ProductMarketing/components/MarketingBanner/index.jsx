import BaseContainer from '@/shared/components/BaseContainer';
import styles from './index.less?module';

const MarketingBanner = {
  render() {
    return (
      <div class={styles['marketing-banner-container']}>
        <BaseContainer hasBreadcrumb={false} class={styles['banner-text-container']}>
          <div class={styles['marketing-banner-title']}>{this.$t('highFreeTrading')}</div>
          <div class={styles['marketing-banner-content']}>
            {this.$t('twoTypeOfMode', { enProductName: this.$t('enProductName') })}
          </div>
        </BaseContainer>
      </div>
    );
  },
};

export default MarketingBanner;
