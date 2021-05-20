<template>
  <div div class="staking-market-container">
    <div class="staking-market-text">
      <BlockTitle
        :img="stakingMarketTitleImg"
        class="staking-market-title-img"
        :title="isChinese && $t('stakingMarket')"
      />
      <SquareDotsIcon class="staking-market-dots-icon" />
      <div class="staking-market-introduce">
        {{ $t('stakingMarketIntroduce') }}
      </div>
    </div>
    <div :class="[ 'staking-market-img-container', isStakingAnimate ? 'animate' : '']">
      <img class="step-line" src="@/assets/ecosphere/step-line.png" alt="" />
      <div class="step-card">
        <img src="@/assets/ecosphere/step-details.png" alt="" />
        <div class="step-card-text invite-text">
          <span>{{ $t('inviter') }}</span>
          <span class="title">{{ $t('InitiatePledgeInvitation') }}</span>
        </div>
        <div class="step-card-text invest-text">
          <span>{{ $t('investors') }}</span>
          <span class="title">{{ $t('WhetherAcceptInvitation') }}</span>
        </div>
        <div class="step-card-text ended-text" :class="{ ['en-ended-text']: isEnglish }">
          <span>{{ $t('end') }}</span>
          <span class="title">{{ $t('pledgeProcess') }}</span>
        </div>
        <div class="step-card-text start-system-text" :class="{ ['en-start-system-text']: isEnglish }">
          <span>{{ $t('start') }}</span>
          <span class="title">{{ $t('mpPledgeMonitoringSystem') }}</span>
        </div>
        <div class="step-card-text test-text" :class="{ ['en-test-text']: isEnglish }">
          <span>{{ $t('testInviterPledge') }}</span>
          <span class="title">{{ $t('WhetherRequireMet') }}</span>
        </div>
        <div class="step-card-text pledge-during-text">
          <span>{{ $t('pledgeDuring') }}</span>
          <span class="title">{{ $t('UntilPledgeExpires') }}</span>
        </div>
        <div class="step-card-text return-fund-text" :class="{ ['en-return-fund-text']: isEnglish }">
          <span>{{ $t('LiquidationSystem') }}</span>
          <span class="title">{{ $t('returnHashRate') }}</span>
          <span>{{ $t('ReturnFundsToInvestors') }}</span>
        </div>
        <div class="agreement-text" :class="{ ['en-agreement-text']: isEnglish }">{{ $t('accept') }}</div>
        <div class="refuse-text" :class="{ ['en-refuse-text']: isEnglish }">{{ $t('refuse') }}</div>
        <div class="positive-text" :class="{ ['en-positive-text']: isEnglish }">{{ $t('yes') }}</div>
        <div class="negative-text" :class="{ ['en-negative-text']: isEnglish }">{{ $t('no') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import stakingMarketTitleImg from '@/assets/ecosphere/staking-market-title-img.png';
import BlockTitle from '@/shared/components/BlockTitle';
import SquareDotsIcon from '@/shared/components/SquareDotsIcon';
import { getIsChinese, getIsEnglish } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    BlockTitle,
    SquareDotsIcon,
  },
  props: {
    isStakingAnimate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      stakingMarketTitleImg,
      isChinese: getIsChinese(),
      isEnglish: getIsEnglish(),
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
