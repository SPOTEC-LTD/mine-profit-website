import includes from 'lodash/includes';
import { Popover } from 'ant-design-vue';
import getTimes from '@/shared/utils/getTimes';
import numberUtils from 'aa-utils/lib/numberUtils';
import NewBuyBuffButton from '@/shared/components/NewBuyBuffButton';
import NewUserButton from '@/shared/components/NewUserButton';
import NewUserBuff from '@/shared/components/NewUserBuff';
import MarketNewBuyBuff from '@/shared/components/MarketNewBuyBuff';
import MarketRenewBuff from '@/shared/components/MarketRenewBuff';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { NEW_USER_USED, MARKET_NEW_BUY_BUFF, MARKET_RENEW_BUFF } from '@/shared/consts/productTag';
import './index.less';

const TagGroup = {
  props: {
    className: String,
    productData: {
      type: Object,
      default: () => {},
    },
    isSettlementPage: {
      type: Boolean,
      default: false,
    },
    purchaseAmount: [Number, String],
  },

  methods: {
    mentionTips(options = {}) {
      const { content, trigger } = options;
      return (
        <Popover
          overlayClassName='mention-tips'
          placement='right'
          scopedSlots={{ content: () => content() }}
          destroyTooltipOnHide={true}
        >
          {trigger && trigger()}
        </Popover>
      );
    },

    newUserMentionNode() {
      const { customerLimit, discountRate } = this.productData;
      return (
        <NewUserBuff
          customerLimit={customerLimit}
          discountRate={getTimes({ number: discountRate, times: 10, decimal: 1 })}
        />
      );
    },

    marketNewBuyBuffNode() {
      const { buffDays, buffRate } = this.productData;
      return (
        <MarketNewBuyBuff
          buffDays={buffDays}
          buffRate={getTimes({ number: buffRate, times: 100, decimal: 0 })}
        />
      );
    },

    marketRenewBuffNode() {
      const { dupAmount, dupBuffDays, unit } = this.productData;
      return (
        <MarketRenewBuff
          dupAmount={bigNumberToFixed(dupAmount, 2)}
          dupBuffDays={dupBuffDays}
          unit={unit}
        />
      );
    },

    marketNewBuyDecNode() {
      const { buffDays, buffRate } = this.productData;
      return (
        <span>{this.$t('marketDiscountNewBuyDes', { buffDays, buffRate: `+${numberUtils.times(+buffRate, 100)}%` })} </span>
      );
    },

    marketRenewDecNode() {
      const { dupAmount, dupBuffDays, unit } = this.productData;
      const buyAmount = this.purchaseAmount > +dupAmount ? dupAmount : this.purchaseAmount;
      const resultDupAmount = +dupAmount ? buyAmount : dupAmount;
      return (
        <div>
          {this.$t('marketDiscountRenewLeft')}
          <span class='market-renew-mount'>{`${bigNumberToFixed(resultDupAmount, 2)}${unit}`}</span>
          <span>{this.$t('marketDiscountRenewRight', { buffDays: dupBuffDays })} </span>
        </div>
      );
    },
  },

  render() {
    const { tags } = this.productData;
    const isNewUser = includes(tags, NEW_USER_USED) && !this.isSettlementPage;
    const isNewBuy = includes(tags, MARKET_NEW_BUY_BUFF);
    const isRenewBuy = includes(tags, MARKET_RENEW_BUFF);

    return (
      <div class={['tag-groups', { 'settlement-wrapper': this.isSettlementPage }, this.className]}>
        {isNewUser && (
          this.mentionTips({
            content: this.newUserMentionNode,
            trigger: () => <NewUserButton class='group-tag' />,
          })
        )}

        {isNewBuy && (
          <div class='tag-market-button-buff'>
            { this.mentionTips({
              content: this.marketNewBuyBuffNode,
              trigger: () => <NewBuyBuffButton class='group-tag'>{this.$t('marketNewBuyBuff')}</NewBuyBuffButton>,
            })}
            {this.isSettlementPage && <div class='tag-market-button-suffix'>{this.marketNewBuyDecNode()}</div>}
          </div>
        )}

        {isRenewBuy && (
          <div class='tag-market-button-buff'>
            { this.mentionTips({
              content: this.marketRenewBuffNode,
              trigger: () => <NewBuyBuffButton class='group-tag'>{this.$t('marketRenewBuff')}</NewBuyBuffButton>,
            })}
            {this.isSettlementPage && <div class='tag-market-button-suffix'>{this.marketRenewDecNode()}</div>}
          </div>
        )}

      </div>
    );
  },
};

export default TagGroup;
