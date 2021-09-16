import { Button, Statistic } from 'ant-design-vue';
import getMinus from '@/shared/utils/getMinus';
import DateUtils from '@/shared/intl/utils/dateUtils';
import { BEFORE_PRE_SALE, PRE_SALE_NOW } from '@/shared/consts/preSaleStatus';
import getNewRegisterTime from '@/shared/utils/getNewRegisterTime';
import TradeBeforeVerified from '@/shared/components/TradeBeforeVerified';
import './index.less';

const PurchaseButton = {
  props: {
    isLookForward: Boolean,
    isNew: Boolean,
    isNoRest: Boolean,
    lineTime: {
      type: Number,
      default: 0,
    },
    preStatus: {
      type: Number,
      default: 0,
    },
    preSaleStartTime: {
      type: Number,
      default: 0,
    },
    preSaleEndTime: {
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
      nowTime: DateUtils.formatToTimestamp(DateUtils.getToday()),
      preSaleLookForward: this.preStatus === BEFORE_PRE_SALE,
      formatPreSaleEndTime: DateUtils.formatDateTime(this.preSaleEndTime),
    };
  },

  computed: {
    restPreSaleTime() {
      return +getMinus({ number: this.preSaleEndTime, minuend: this.nowTime, decimal: 0 });
    },
  },

  methods: {
    purchaseNow() {
      this.$emit('purchaseNow');
    },

    saleNowCountDownNode(type, timeStamp, endTime) {
      const format = this.$t(type, {
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
              <Statistic.Countdown value={Date.now() + timeStamp} format={format} />
            </div>
            {endTime && (<div class="sale-now-end-time">{`${endTime} ${this.$t('closeTime')}`}</div>)}
          </button>
        </TradeBeforeVerified>
      );
    },

    lookForwardNode(lookForwardType) {
      const format = this.$t(lookForwardType, { day: 'DD', hour: 'HH', minute: 'mm', second: 'ss' });
      const startDate = DateUtils.formatDateTime(this.lineTime);
      const restTime = +getMinus({ number: this.lineTime, minuend: this.nowTime, decimal: 0 });
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
    const { isNew, isLookForward, isNoRest, preStatus, preSaleLookForward, newUserTime, restPreSaleTime } = this;
    const unNormalButton = isNoRest || isLookForward || isNew || preStatus;
    const isEmpty = !isNew && isNoRest;
    const lookForwardType = preSaleLookForward ? 'preSaleStartTime' : 'remainTime';

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

        {isNew && this.saleNowCountDownNode('newUserRemainTime', newUserTime)}

        {(!isEmpty && preStatus === PRE_SALE_NOW) && (
          this.saleNowCountDownNode('preSaleRemainTime', restPreSaleTime, this.formatPreSaleEndTime)
        )}

        {isLookForward && this.lookForwardNode(lookForwardType)}

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
