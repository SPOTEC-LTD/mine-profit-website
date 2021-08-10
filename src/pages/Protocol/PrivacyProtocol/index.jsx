import appIcon from '@/assets/protocol/app-icon.png';
import BaseContainer from '@/shared/components/BaseContainer';
import styles from '../index.less?module';

const PrivacyProtocol = {
  mounted() {
    document.title = this.$t('privacyProtocolName');
  },
  render() {
    return (
      <BaseContainer className={styles['container-wrap']} contentClassName={styles.content}>
        <div class={styles.wrapper}>
          <div class={styles['app-icon-box']}>
            <img class={styles['app-icon']} src={appIcon} alt="" />
          </div>
          <div class={styles['protocol-name']}>{`《${this.$t('privacyProtocolName')}》`}</div>
          <div class={styles['protocol-desc']}>{this.$t('privacyProtocolDescription')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('privacyProtocolTitle_1')}</div>
          </div>
          <div class={styles['sub-title']}>1.1</div>
          <div>{this.$t('privacyProtocolText_1_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>1.2</div>
          <div>{this.$t('privacyProtocolText_1_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>1.3</div>
          <div>{this.$t('privacyProtocolText_1_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>1.4</div>
          <div>{this.$t('privacyProtocolText_1_4')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('privacyProtocolTitle_2')}</div>
          </div>
          <div class={styles['sub-title']}>2.1</div>
          <div>{this.$t('privacyProtocolText_2_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>2.2</div>
          <div>{this.$t('privacyProtocolText_2_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>2.3</div>
          <div>{this.$t('privacyProtocolText_2_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>2.4</div>
          <div>{this.$t('privacyProtocolText_2_4')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('privacyProtocolTitle_3')}</div>
          </div>
          <div class={styles['sub-title']}>3.1</div>
          <div>{this.$t('privacyProtocolText_3_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>3.2</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('privacyProtocolText_3_2')}
            <div>{this.$t('privacyProtocolText_3_2_1')}</div>
            <div>{this.$t('privacyProtocolText_3_2_2')}</div>
            <div>{this.$t('privacyProtocolText_3_2_3')}</div>
            <div>{this.$t('privacyProtocolText_3_2_4')}</div>
            <div>{this.$t('privacyProtocolText_3_2_5')}</div>
            <div>{this.$t('privacyProtocolText_3_2_6')}</div>
            <div>{this.$t('privacyProtocolText_3_2_7')}</div>
            <div>{this.$t('privacyProtocolText_3_2_8')}</div>
            <div>{this.$t('privacyProtocolText_3_2_9')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>3.3</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('privacyProtocolText_3_3')}
            <div>{this.$t('privacyProtocolText_3_3_1')}</div>
            <div>{this.$t('privacyProtocolText_3_3_2')}</div>
            <div>{this.$t('privacyProtocolText_3_3_3')}</div>
            <div>{this.$t('privacyProtocolText_3_3_4')}</div>
            <div>{this.$t('privacyProtocolText_3_3_5')}</div>
            <div>{this.$t('privacyProtocolText_3_3_6')}</div>
          </div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('privacyProtocolTitle_4')}</div>
          </div>
          <div class={styles['sub-title']}>4.1</div>
          <div>{this.$t('privacyProtocolText_4_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>4.2</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('privacyProtocolText_4_2')}
            <div>{this.$t('privacyProtocolText_4_2_1')}</div>
            <div>{this.$t('privacyProtocolText_4_2_2')}</div>
            <div>{this.$t('privacyProtocolText_4_2_3')}</div>
            <div>{this.$t('privacyProtocolText_4_2_4')}</div>
            <div>{this.$t('privacyProtocolText_4_2_5')}</div>
            <div>{this.$t('privacyProtocolText_4_2_6')}</div>
            <div>{this.$t('privacyProtocolText_4_2_7')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>4.3</div>
          <div>{this.$t('privacyProtocolText_4_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>4.4</div>
          <div>{this.$t('privacyProtocolText_4_4')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('privacyProtocolTitle_5')}</div>
          </div>
          <div class={styles['sub-title']}>5.1</div>
          <div>{this.$t('privacyProtocolText_5_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>5.2</div>
          <div>{this.$t('privacyProtocolText_5_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>5.3</div>
          <div>{this.$t('privacyProtocolText_5_3')}</div>
          <div class={styles['item-gap']}>{this.$t('privacyProtocolFooterText')}</div>
        </div>
      </BaseContainer>
    );
  },
};

export default PrivacyProtocol;
