import appIcon from '@/assets/protocol/app-icon.png';
import BaseContainer from '@/shared/components/BaseContainer';
import styles from '../index.less?module';

const InvestProtocol = {
  mounted() {
    document.title = this.$t('investProtocolName', { enProductName: this.$t('enProductName') });
  },
  render() {
    return (
      <BaseContainer className={styles['container-wrap']} contentClassName={styles.content}>
        <div class={styles.wrapper}>
          <div class={styles['app-icon-box']}>
            <img class={styles['app-icon']} src={appIcon} alt="" />
          </div>
          <div class={styles['protocol-name']}>
            {`《${this.$t('investProtocolName', { enProductName: this.$t('enProductName') })}》`}
          </div>
          <div class={styles['protocol-desc']}>{this.$t('investProtocolDescription')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_1')}</div>
          </div>
          <div class={styles['sub-title']}>1.1</div>
          <div>
            {this.$t('investProtocolText_1_1', {
              zhProductName: this.$t('zhProductName'),
              enProductName: this.$t('enProductName'),
            })}
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>1.2</div>
          <div>{this.$t('investProtocolText_1_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>1.3</div>
          <div>{this.$t('investProtocolText_1_3')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_2')}</div>
          </div>
          <div class={styles['sub-title']}>2.1</div>
          <div>
            {this.$t('investProtocolText_2_1', {
              enProductName: this.$t('enProductName'),
              zhProductName: this.$t('zhProductName'),
            })}
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>2.2</div>
          <div>{this.$t('investProtocolText_2_2')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_3')}</div>
          </div>
          <div>{this.$t('investProtocolText_3')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_4')}</div>
          </div>
          <div>{this.$t('investProtocolText_4')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_5')}</div>
          </div>
          <div class={styles['sub-title']}>5.1</div>
          <div>{this.$t('investProtocolText_5_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>5.2</div>
          <div>{this.$t('investProtocolText_5_2')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_6')}</div>
          </div>
          <div class={styles['sub-item-gap']}>
            {this.$t('investProtocolTitle_6_1')}
            <div>{this.$t('investProtocolTitle_6_1_1')}</div>
            <div>{this.$t('investProtocolTitle_6_1_2')}</div>
            <div>{this.$t('investProtocolTitle_6_1_3')}</div>
          </div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_7')}</div>
          </div>
          <div>{this.$t('investProtocolText_7')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_8')}</div>
          </div>
          <div class={styles['sub-title']}>8.1</div>
          <div>{this.$t('investProtocolText_8_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.2</div>
          <div>{this.$t('investProtocolText_8_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.3</div>
          <div>{this.$t('investProtocolText_8_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.4</div>
          <div>{this.$t('investProtocolText_8_4')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_9')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>9.1</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('investProtocolTitle_9_1')}
            <div>{this.$t('investProtocolTitle_9_1_1')}</div>
            <div>{this.$t('investProtocolTitle_9_1_2')}</div>
            <div>{this.$t('investProtocolTitle_9_1_3')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>9.2</div>
          <div>{this.$t('investProtocolText_9_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>9.3</div>
          <div>{this.$t('investProtocolText_9_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>9.4</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('investProtocolTitle_9_4')}
            <div>{this.$t('investProtocolTitle_9_4_1')}</div>
            <div>
              {this.$t('investProtocolTitle_9_4_2', {
                enProductName: this.$t('enProductName'),
                zhProductName: this.$t('zhProductName'),
              })}
            </div>
          </div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_10')}</div>
          </div>
          <div>{this.$t('investProtocolText_10')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('investProtocolTitle_11')}</div>
          </div>
          <div>{this.$t('investProtocolText_11')}</div>
          <div class={styles['item-gap']}>{this.$t('investProtocolFooterText')}</div>
        </div>
      </BaseContainer>
    );
  },
};

export default InvestProtocol;
