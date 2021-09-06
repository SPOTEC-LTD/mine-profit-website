import { Button, Statistic } from 'ant-design-vue';
import getMinus from '@/shared/utils/getMinus';
import DateUtils from '@/shared/intl/utils/dateUtils';
import getNewRegisterTime from '@/shared/utils/getNewRegisterTime';
import TradeBeforeVerified from '@/shared/components/TradeBeforeVerified';
import './index.less';

const PurchaseButton = {
  props: {
    isLookForward: { type: Boolean },
    isNew: { type: Boolean },
    isNoRest: { type: Boolean },
    lineTime: {
      type: Number,
      default: 0,
    },
  },

  mounted() {
    const { countDownTime, endTime } = getNewRegisterTime();
    this.newUserTime = countDownTime;
    this.newUserEndTime = endTime;
  },

  data() {
    return {
      newUserTime: 0,
      newUserEndTime: 0,
    };
  },

  methods: {
    purchaseNow() {
      this.$emit('purchaseNow');
    },

    newUserPurchaseNode() {
      const format = this.$t('newUserRemainTime', {
        day: 'DD',
        hour: 'HH',
        minute: 'mm',
        second: 'ss',
      });
      return (
        <TradeBeforeVerified onVerifiedPass={this.purchaseNow}>
          <button class={['new-user-btn', 'all-btn-size']}>
            <div class='new-user-text'>{this.$t('shareInvestNow')}</div>
            <div class='new-user-count'>
              <Statistic.Countdown value={Date.now() + this.newUserTime} format={format} />
            </div>
          </button>
        </TradeBeforeVerified>
      );
    },

    lookForwardNode() {
      const format = this.$t('remainTime', { day: 'DD', hour: 'HH', minute: 'mm', second: 'ss' });
      const startDate = DateUtils.formatDateTime(this.lineTime);
      const nowTime = DateUtils.formatToTimestamp(DateUtils.getToday());
      const restTime = +getMinus({ number: this.lineTime, minuend: nowTime, decimal: 0 });
      return (
        <button class={['look-forward-btn', 'all-btn-size']} disabled={true}>
          <div class='new-user-text'>{this.$t('marketExpect')}</div>
          <div class='look-forward-count'>
            <Statistic.Countdown value={Date.now() + restTime} format={format} />
            <div>{`${startDate} ${this.$t('marketOnlineTime')}`}</div>
          </div>
        </button>
      );
    },
  },

  render() {
    const { isNew, isLookForward, isNoRest } = this;
    const unNormalButton = isNoRest || isLookForward || isNew;
    const isEmpty = !isNew && isNoRest;

    return (
      <div class="operate-btn-wrapper">
        {!unNormalButton && (
          <TradeBeforeVerified onVerifiedPass={this.purchaseNow}>
            <Button
              class={['primary-buy-btn', 'all-btn-size']}
              type="primary"
            >
              {this.$t('shareInvestNow')}
            </Button>
          </TradeBeforeVerified>
        )}

        {isNew && this.newUserPurchaseNode()}

        {isLookForward && this.lookForwardNode()}

        {isEmpty && (
          <Button class={['disabled-btn', 'all-btn-size']} disabled={true}>
            {this.$t('marketSoldOut')}
          </Button>
        )}
      </div>
    );
  },
};

export default PurchaseButton;
