import { Button, Statistic } from 'ant-design-vue';
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

        {isLookForward && (
          <Button class={['disabled-btn', 'all-btn-size']} disabled={true}>
            {this.$t('marketExpect')}
          </Button>
        )}

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
