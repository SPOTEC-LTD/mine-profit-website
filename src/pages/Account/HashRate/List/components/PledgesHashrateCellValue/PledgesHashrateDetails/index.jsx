import { Spin } from 'ant-design-vue';
import { mapState } from 'vuex';
import numberUtils from 'aa-utils/lib/numberUtils';
import isEmpty from 'lodash/isEmpty';
import dateUtils from '@/shared/intl/utils/dateUtils';

import styles from './index.less?module';

const ORIGINAL_PLEDGE_HASHRATE = 1;

const PledgesHashrateDetails = {
  props: {
    loading: { type: Boolean },
  },
  computed: {
    ...mapState({
      info: state => state.hashRate.hashratePledgesSourceInfo,
    }),
  },
  render() {
    return (
      <Spin spinning={this.loading}>
        <div class={styles.content}>
          {this.info.map(({ type, amount, unit, excavationTime, passTime, transCloseDays, buffList }) => (
            <div class={styles.wrapper} key={type}>
              <div class={styles.title}>
                <div>
                  {type === ORIGINAL_PLEDGE_HASHRATE
                    ? this.$t('pledgeDialogOriginal')
                    : this.$t('pledgeDialogGet')}
                </div>
                <div>{`${amount}${unit}`}</div>
              </div>
              {(!!transCloseDays || excavationTime !== null || !isEmpty(buffList)) && (
                <div class={styles.table}>
                  {!!transCloseDays && (
                    <div class={styles['close-day']}>
                      <span>{this.$t('marketClosePeriod')}</span>
                      <div>
                        <span>{`${passTime}/${transCloseDays} `}</span>
                        <span class={styles['day-unit']}>{this.$t('day')}</span>
                      </div>
                    </div>
                  )}
                  {excavationTime && (
                    <div class={styles['excavation-time']}>
                      <span>{this.$t('marketStartMineTime')}</span>
                      <span>{dateUtils.formatDate(excavationTime, 'YYYY.MM.DD')}</span>
                    </div>
                  )}
                  {buffList.map(item => (
                    <div class={styles.buff} key={item.id}>
                      <div>
                        <span>{`${item.amount} ${unit} `}</span>
                        <span class={styles['add-rate']}>
                          {numberUtils.formatPercent(item.buffRate, {
                            usePlus: true,
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div>
                        <span>{`${item.passTime}/${item.buffDays} `}</span>
                        <span class={styles['day-unit']}>{this.$t('day')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Spin>
    );
  },
};

export default PledgesHashrateDetails;
