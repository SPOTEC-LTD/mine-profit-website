import hashrateImage from '@/assets/rank/hashrate-image.png';
import hashrateVoucherImage from '@/assets/rank/hashrate-voucher-image.png';

import './index.less';

const VIP_HASHRATE = 1;

const RewardCard = {
  props: {
    info: {
      type: Object,
      default: {},
    },
  },

  render() {
    const { info } = this;
    const showRank = info.startRank === info.endRank ? info.startRank : `${info.startRank}~${info.endRank}`;
    return (
      <div class='reward-card-wrapper'>
        <div class='card-top'>
          <div class='top-text-box'>
            <span class='top-text'>{showRank}</span>
            <span>{this.$t('ranking')}</span>
          </div>
        </div>
        <div class='card-bottom'>
          {info.configList.map(item => (
            <div class='card-bottom-item'>
              <img
                class='reward-item-icon'
                src={item.rewardType === VIP_HASHRATE ? hashrateImage : hashrateVoucherImage}
                alt=''
              />
              <div>
                <div class='reward-item-type'>
                  {item.rewardType === VIP_HASHRATE ? this.$t('hashrateVIPHash') : this.$t('hashRateCoupons')}
                </div>
                <div class='reward-item-name'>{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export default RewardCard;
