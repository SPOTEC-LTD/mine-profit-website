import appIcon from '@/assets/protocol/app-icon.png';
import BaseContainer from '@/shared/components/BaseContainer';
import styles from '../index.less?module';

const ServiceProtocol = {
  mounted() {
    document.title = this.$t('serviceProtocolName');
  },
  render() {
    return (
      <BaseContainer className={styles['container-wrap']} contentClassName={styles.content}>
        <div class={styles.wrapper}>
          <div class={styles['app-icon-box']}>
            <img class={styles['app-icon']} src={appIcon} alt="" />
          </div>
          <div class={styles['protocol-name']}>{`《${this.$t('serviceProtocolName')}》`}</div>
          <div class={styles['protocol-desc']}>{this.$t('serviceProtocolDescription')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_1')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>1.1</div>
          <div>{this.$t('serviceProtocolText_1_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>1.2</div>
          <div>{this.$t('serviceProtocolText_1_2')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_2')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>2.1</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('serviceProtocolText_2_1')}
            <div>{this.$t('serviceProtocolText_2_1_1')}</div>
            <div>{this.$t('serviceProtocolText_2_1_2')}</div>
            <div>{this.$t('serviceProtocolText_2_1_3')}</div>
            <div>{this.$t('serviceProtocolText_2_1_4')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>2.2</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('serviceProtocolText_2_2')}
            <div>{this.$t('serviceProtocolText_2_2_1')}</div>
            <div>{this.$t('serviceProtocolText_2_2_2')}</div>
            <div>{this.$t('serviceProtocolText_2_2_3')}</div>
            <div>{this.$t('serviceProtocolText_2_2_4')}</div>
            <div>{this.$t('serviceProtocolText_2_2_5')}</div>
            <div>{this.$t('serviceProtocolText_2_2_6')}</div>
          </div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_3')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>3.1</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('serviceProtocolText_3_1')}
            <div>{this.$t('serviceProtocolText_3_1_1')}</div>
            <div>{this.$t('serviceProtocolText_3_1_2')}</div>
            <div>{this.$t('serviceProtocolText_3_1_3')}</div>
            <div>{this.$t('serviceProtocolText_3_1_4')}</div>
            <div>{this.$t('serviceProtocolText_3_1_5')}</div>
            <div>{this.$t('serviceProtocolText_3_1_6')}</div>
          </div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_4')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>4.1</div>
          <div>{this.$t('serviceProtocolText_4_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>4.2</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('serviceProtocolText_4_2')}
            <div>{this.$t('serviceProtocolText_4_2_1')}</div>
            <div>{this.$t('serviceProtocolText_4_2_2')}</div>
            <div>{this.$t('serviceProtocolText_4_2_3')}</div>
            <div>{this.$t('serviceProtocolText_4_2_4')}</div>
            <div>{this.$t('serviceProtocolText_4_2_5')}</div>
            <div>{this.$t('serviceProtocolText_4_2_6')}</div>
          </div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_5')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>5.1</div>
          <div>{this.$t('serviceProtocolText_5_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>5.2</div>
          <div>{this.$t('serviceProtocolText_5_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>5.3</div>
          <div>{this.$t('serviceProtocolText_5_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>5.4</div>
          <div>{this.$t('serviceProtocolText_5_4')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>5.5</div>
          <div>{this.$t('serviceProtocolText_5_5')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>5.6</div>
          <div>{this.$t('serviceProtocolText_5_6')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_6')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>6.1</div>
          <div>{this.$t('serviceProtocolText_6_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>6.2</div>
          <div>{this.$t('serviceProtocolText_6_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>6.3</div>
          <div>{this.$t('serviceProtocolText_6_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>6.4</div>
          <div>{this.$t('serviceProtocolText_6_4')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>6.5</div>
          <div>{this.$t('serviceProtocolText_6_5')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_7')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.1</div>
          <div>{this.$t('serviceProtocolText_7_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.2</div>
          <div>{this.$t('serviceProtocolText_7_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.3</div>
          <div>{this.$t('serviceProtocolText_7_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.4</div>
          <div>{this.$t('serviceProtocolText_7_4')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.5</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('serviceProtocolText_7_5')}
            <div>{this.$t('serviceProtocolText_7_5_1')}</div>
            <div>{this.$t('serviceProtocolText_7_5_2')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.6</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('serviceProtocolText_7_6')}
            <div>{this.$t('serviceProtocolText_7_6_1')}</div>
            <div>{this.$t('serviceProtocolText_7_6_2')}</div>
            <div>{this.$t('serviceProtocolText_7_6_3')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.7</div>
          <div>{this.$t('serviceProtocolText_7_7')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.8</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('serviceProtocolText_7_8')}
            <div>{this.$t('serviceProtocolText_7_8_1')}</div>
            <div>{this.$t('serviceProtocolText_7_8_2')}</div>
            <div>{this.$t('serviceProtocolText_7_8_3')}</div>
            <div>{this.$t('serviceProtocolText_7_8_4')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.9</div>
          <div>{this.$t('serviceProtocolText_7_9')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.10</div>
          <div>{this.$t('serviceProtocolText_7_10')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.11</div>
          <div>{this.$t('serviceProtocolText_7_11')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.12</div>
          <div>{this.$t('serviceProtocolText_7_12')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>7.13</div>
          <div>{this.$t('serviceProtocolText_7_13')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_8')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.1</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('serviceProtocolText_8_1')}
            <div>{this.$t('serviceProtocolText_8_1_1')}</div>
            <div>{this.$t('serviceProtocolText_8_1_2')}</div>
            <div>{this.$t('serviceProtocolText_8_1_3')}</div>
            <div>{this.$t('serviceProtocolText_8_1_4')}</div>
            <div>{this.$t('serviceProtocolText_8_1_5')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.2</div>
          <div>{this.$t('serviceProtocolText_8_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.3</div>
          <div>{this.$t('serviceProtocolText_8_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.4</div>
          <div>{this.$t('serviceProtocolText_8_4')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.5</div>
          <div>{this.$t('serviceProtocolText_8_5')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.6</div>
          <div>{this.$t('serviceProtocolText_8_6')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.7</div>
          <div>{this.$t('serviceProtocolText_8_7')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.8</div>
          <div>{this.$t('serviceProtocolText_8_8')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.9</div>
          <div>{this.$t('serviceProtocolText_8_9')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.10</div>
          <div>{this.$t('serviceProtocolText_8_10')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.11</div>
          <div>{this.$t('serviceProtocolText_8_11')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.12</div>
          <div>{this.$t('serviceProtocolText_8_12')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>8.13</div>
          <div>{this.$t('serviceProtocolText_8_13')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_9')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>9.1</div>
          <div>{this.$t('serviceProtocolText_9_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>9.2</div>
          <div>{this.$t('serviceProtocolText_9_2')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_10')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>10.1</div>
          <div>{this.$t('serviceProtocolText_10_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>10.2</div>
          <div>{this.$t('serviceProtocolText_10_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>10.3</div>
          <div>{this.$t('serviceProtocolText_10_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>10.4</div>
          <div class={styles['sub-item-gap']}>
            {this.$t('serviceProtocolText_10_4')}
            <div>{this.$t('serviceProtocolText_10_4_1')}</div>
            <div>{this.$t('serviceProtocolText_10_4_2')}</div>
            <div>{this.$t('serviceProtocolText_10_4_3')}</div>
            <div>{this.$t('serviceProtocolText_10_4_4')}</div>
            <div>{this.$t('serviceProtocolText_10_4_5')}</div>
            <div>{this.$t('serviceProtocolText_10_4_6')}</div>
            <div>{this.$t('serviceProtocolText_10_4_7')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>10.5</div>
          <div>{this.$t('serviceProtocolText_10_5')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>10.6</div>
          <div>{this.$t('serviceProtocolText_10_6')}</div>
          <div class={styles['protocol-title-box']}>
            <div class={styles['protocol-title']}>{this.$t('serviceProtocolTitle_11')}</div>
          </div>
          <div class={[styles['item-gap'], styles['sub-title']]}>11.1</div>
          <div>{this.$t('serviceProtocolText_11_1')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>11.2</div>
          <div>{this.$t('serviceProtocolText_11_2')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>11.3</div>
          <div>{this.$t('serviceProtocolText_11_3')}</div>
          <div class={[styles['item-gap'], styles['sub-title']]}>11.4</div>
          <div>{this.$t('serviceProtocolText_11_4')}</div>
        </div>
      </BaseContainer>
    );
  },
};

export default ServiceProtocol;
