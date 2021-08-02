import newBuyBuffImg from '@/assets/home/newBuyBuff.png';
import './index.less';

const MarketNewBuyBuff = {
  props: {
    buffRate: [Number, String],
    buffDays: {
      type: Number,
      default: 0,
    },
  },

  render() {
    return (
      <div class='market-new-buy-container'>
        <div class='new-buy-title'>
          <img src={newBuyBuffImg} alt="" class='new-buy-buff-img' />
          <div>{this.$t('marketNewBuyBuff')}</div>
        </div>
        <div class='new-buy-content'>
          <div class='day-rate'>
            <span>{this.$t('additionDay')}</span>
            <div>
              <span>{this.buffDays}</span>
              <span class="market-new-buy-day">{this.$t('day')}</span>
            </div>
          </div>
          <div class="day-rate white-day-rate" >
            <span>{this.$t('additionRatio')}</span>
            <div>
              <span>{this.buffRate}</span>
              <span class="market-new-buy-day">%</span>
            </div>
          </div>
          <div class='new-buy-mention-content'>{this.$t('newBuyDialogDesc')}</div>
        </div>
      </div>
    );
  },
};

export default MarketNewBuyBuff;
