<template>
  <div div class="staking-market-container">
    <div class="staking-market-text">
      <block-title :img="stakingMarketTitleImg" class="staking-market-title-img" :title="$t('stakingMarket')" />
      <square-dots-icon class="staking-market-dots-icon" />
      <div class="staking-market-introduce">
        {{ $t('stakingMarketIntroduce') }}
      </div>
    </div>
    <div class="staking-market-img-container">
      <img class="step-line" src="@/assets/ecosphere/step-line.png" alt="">
      <div class="step-card">
        <img src="@/assets/ecosphere/step-details.png" alt="">
        <div class="step-card-text invite-text">
          <span>{{ $t('inviter') }}</span>
          <span class="title">{{ $t('InitiatePledgeInvitation') }}</span>
        </div>
        <div class="step-card-text invest-text">
          <span>{{ $t('investors') }}</span>
          <span class="title">{{ $t('WhetherAcceptInvitation') }}</span>
        </div>
        <div class="step-card-text ended-text">
          <span>{{ $t('end') }}</span>
          <span class="title">{{ $t('pledgeProcess') }}</span>
        </div>
        <div class="step-card-text start-system-text">
          <span>{{ $t('start') }}</span>
          <span class="title">{{ $t('mpPledgeMonitoringSystem') }}</span>
        </div>
        <div class="step-card-text test-text">
          <span>{{ $t('testInviterPledge') }}</span>
          <span class="title">{{ $t('WhetherRequireMet') }}</span>
        </div>
        <div class="step-card-text pledge-during-text">
          <span>{{ $t('pledgeDuring') }}</span>
          <span class="title">{{ $t('UntilPledgeExpires') }}</span>
        </div>
        <div class="step-card-text return-fund-text">
          <span>{{ $t('LiquidationSystem') }}</span>
          <span class="title">{{ $t('returnHashRate') }}</span>
          <span>{{ $t('ReturnFundsToInvestors') }}</span>
        </div>
        <div class="agreement-text">{{ $t('accept') }}</div>
        <div class="refuse-text">{{ $t('refuse') }}</div>
        <div class="positive-text">{{ $t('yes') }}</div>
        <div class="negative-text">{{ $t('no') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import stakingMarketTitleImg from '@/assets/ecosphere/staking-market-title-img.png';
import BlockTitle from '@/pages/home/component/block-title';
import SquareDotsIcon from '@/pages/home/component/square-dots-icon';

export default {
  components: {
    'block-title': BlockTitle,
    'square-dots-icon': SquareDotsIcon,
  },
  data() {
    return {
      stakingMarketTitleImg,
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
