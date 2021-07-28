import numberUtils from 'aa-utils/lib/numberUtils';
import {
  BtcFilled, EthFilled, CheckCircleOutlined, CheckCircleFilled,
} from 'ahoney/lib/icons';

import { FOREVER } from '@/shared/consts/validPeriodStatus';
import dateUtils from '@/shared/intl/utils/dateUtils';
import InfoTooltip from '@/shared/components/InfoTooltip';

import styles from './index.less?module';

const HeaderNav = {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    chooseId: {
      type: Number,
      default: 1481,
    },
  },

  methods: {
    handleClick() {
      const { id, name } = this.data;
      this.$emit('handleClickSingle', { id, name });
    },
  },

  computed: {
    finallyTimeString() {
      const { validPeriodStatus, validStartTime, validEndTime } = this.data;

      const dateFormat = 'YYYY/MM/DD';

      const getFormatTime = () => (
        `${dateUtils.formatDateTime(validStartTime, dateFormat)}-${dateUtils.formatDateTime(validEndTime, dateFormat)}`
      );
      const getNotForeverValue = () => `${this.$t('vipCouponDate')} ${getFormatTime()}`;

      return validPeriodStatus !== FOREVER ? getNotForeverValue() : this.$t('vipCouponDateForever');
    },
  },

  render() {
    const { id, name, eachAmount, unit, hashrateType,
      proportion, validity, useLimitation } = this.data;

    return (
      <div class={styles['card-box']}>
        <div class={styles['card-outer']}>
          <div class={styles['card-inner']}>
            <div class={styles['card-top']}>
              {hashrateType === 'BTC'
                ? <BtcFilled className={styles['icon-btc']} />
                : <EthFilled className={styles['icon-eth']} />
              }
              <div class={styles['card-header-info']}>
                <InfoTooltip
                  content={name}
                  trigger='click'
                >
                  <div class={styles['card-title']}>{name}</div>
                </InfoTooltip>
                <div class={styles['card-time']}>
                  {this.finallyTimeString}
                </div>
              </div>
            </div>
            <div class={styles['card-bottom']}>
              <div>{`${this.$t('hashRateNum')}${eachAmount}${unit} ${hashrateType}`}</div>
              <div>{`${this.$t('shareRatio')}${numberUtils.formatPercent(proportion, { minimumFractionDigits: 2 })}`}</div>
              <div>{`${this.$t('outPutTime')}${validity}${this.$t('day')}`}</div>
              <div>{`${this.$t('vipCouponUseLimit')}${useLimitation}${unit}`}</div>
            </div>
          </div>
        </div>
        <div class={styles['choose-icon']} onClick={this.handleClick} >
          {this.chooseId === id ? <CheckCircleFilled /> : <CheckCircleOutlined />}
        </div>
      </div>
    );
  },
};

export default HeaderNav;
