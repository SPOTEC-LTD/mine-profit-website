import coinImg from '@/assets/productMarket/coin.png';
import dateUtils from '@/shared/intl/utils/dateUtils';
import './index.less';

const LookForwardSale = {
  props: {
    time: { type: Number },
  },
  render() {
    const saleTime = dateUtils.formatDateTime(this.time, 'YYYY-MM-DD HH:mm');
    return (
      <div class="look-forward-container">
        <img src={coinImg} alt="" class='look-forward-img' />
        <div class='look-forward-text'>
          <span>{this.$t('marketExpect')}</span>
          <span class='start-time'>{`${saleTime} ${this.$t('marketOnlineTime')}`}</span>
        </div>
      </div>
    );
  },
};

export default LookForwardSale;
