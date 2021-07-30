import numberUtils from 'aa-utils/lib/numberUtils';
import rankTop1 from '@/assets/rank/rank-top-1.png';
import rankTop2 from '@/assets/rank/rank-top-2.png';
import rankTop3 from '@/assets/rank/rank-top-3.png';
import rankTop4 from '@/assets/rank/rank-top-4.png';
import rankTop5 from '@/assets/rank/rank-top-5.png';
import rankTop6 from '@/assets/rank/rank-top-6.png';
import rankTop7 from '@/assets/rank/rank-top-7.png';
import rankTop8 from '@/assets/rank/rank-top-8.png';
import rankTop9 from '@/assets/rank/rank-top-9.png';
import rankTop10 from '@/assets/rank/rank-top-10.png';
import defaultAvatar from '@/assets/rank/defaultAvatar.png';

import './index.less';

const topImgMap = {
  1: rankTop1,
  2: rankTop2,
  3: rankTop3,
  4: rankTop4,
  5: rankTop5,
  6: rankTop6,
  7: rankTop7,
  8: rankTop8,
  9: rankTop9,
  10: rankTop10,
};

const RankCard = {
  props: {
    position: {
      type: Number,
      default: 0,
    },
    amount: {
      type: String,
      default: '0',
    },
    name: {
      type: String,
      default: '-',
    },
    avatar: { type: String },
    unit: {
      type: String,
      default: 'USDT',
    },
  },

  render() {
    const { position, amount, avatar, name, unit } = this;
    const isInRank = position ? position <= 10 : false;
    let imageSrc;
    const topStyle = position > 3 ? 'top-10' : 'top-3';
    if (isInRank) {
      imageSrc = topImgMap[position];
    }
    return (
      <div
        class={[
          'rank-card-wrapper',
          { 'top-1-bg': position === 1 },
          { 'top-2-bg': position === 2 },
          { 'top-3-bg': position === 3 },
        ]}
      >
        <div class="rank-card-left">
          {isInRank ? (
            <div class="top-position-wrapper">
              <img class={topStyle} src={imageSrc} alt="" />
            </div>
          ) : (
            <div class="no-rank">
              <div class="rank-position">{position || '-'}</div>
              <div class="no-rank-text">{this.$t('noInLeaderboard')}</div>
            </div>
          )}
          <div class="user-info">
            <img class="avatar" src={avatar || defaultAvatar} alt="" />
            <div class="name">{name}</div>
          </div>
        </div>
        <div class="rank-card-right">
          <span class="amount">
            {numberUtils.formatNumber(amount, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: false,
            })}
          </span>
          <span class="unit">{unit}</span>
        </div>
      </div>
    );
  },
};

export default RankCard;
