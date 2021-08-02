import newBuyBuffImg from '@/assets/home/newBuyBuff.png';
import RichText from '@/shared/components/RichText';
import './index.less';

const MarketRenewBuff = {
  props: {
    dupAmount: {
      type: String,
      default: '',
    },
    dupBuffDays: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: '',
    },
  },

  render() {
    return (
      <div class='market-renew-buff-container'>
        <div class='new-buy-title'>
          <img src={newBuyBuffImg} alt="" class='new-buy-buff-img' />
          <div>{this.$t('marketRenewBuff')}</div>
        </div>

        <div class='new-buy-content'>
          <div class='day-rate'>
            <span>{this.$t('renewalDialogTitleOne')}</span>
            <div>
              <span>{this.dupBuffDays}</span>
              <span class="day">{this.$t('day')}</span>
            </div>
          </div>
          <div class="day-rate white-day-rate">
            <span>{this.$t('renewalDialogRenewableHashrate')}</span>
            <div>
              <span>{this.dupAmount}</span>
              <span class="day">{this.unit}</span>
            </div>
          </div>

          <div class='mention-content'>
            <div class='mention-item'>{this.$t('renewalDialogDesOne')}</div>
            <div class='mention-item'>
              {this.$t('renewalDialogTitleTwo')}
              <div class='little-mention'>
                <RichText content={this.$t('renewalDialogDesTwo')} />
              </div>
            </div>
            <div class='mention-item'>
              {this.$t('renewalDialogTitleThree')}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export default MarketRenewBuff;
