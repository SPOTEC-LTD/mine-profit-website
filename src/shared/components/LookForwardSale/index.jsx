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
      <div>
        <div class='look-forward-title'>
          <span class='time-title'>{this.$t('marketExpect')}</span>
          <img src={coinImg} alt="" class='look-forward-img' />
        </div>
        <div class='start-time'>{`${saleTime} ${this.$t('marketOnlineTime')}`}</div>
      </div>
    );
  },
};

export default LookForwardSale;
