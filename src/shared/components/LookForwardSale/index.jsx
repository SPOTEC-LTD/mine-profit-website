import coinImg from '@/assets/productMarket/coin.png';
import './index.less';

const LookForwardSale = {
  props: {
    time: String,
    isPreSale: Boolean,
  },
  render() {
    return (
      <div>
        <div class='look-forward-title'>
          <span class='time-title'>
            {this.isPreSale ? this.$t('preSaleTime') : this.$t('marketExpect')}
          </span>
          <img src={coinImg} alt="" class='look-forward-img' />
        </div>
        <div class='start-time'>
          <span>{this.time}</span>
          {!this.isPreSale && <span>{this.$t('marketOnlineTime')}</span>}
        </div>
      </div>
    );
  },
};

export default LookForwardSale;
