<template>
  <div div class="hashRate-ecosphere-container">
    <div>
      <block-title :img="ecosphereTitleImg" class="ecosphere-title-img" :title="$t('hashRateEcosphere')" />
      <square-dots-icon class="ecosphere-dots-icon" />
      <square-dots-icon class="ecosphere-right-dots-icon" />
      <square-dots-icon class="ecosphere-bottom-dots-icon" />
      <div class="ecosphere-intro">{{ $t('hashRateEcosphereIntroduce') }}</div>
      <div class="ecosphere-advantage">
        <div class="ecosphere-advantage-item">
          <img src="@/assets/ecosphere/paper-img.png" alt="">
          <div>{{ $t('flexibleAllocationAssets') }}</div>
        </div>
        <div class="ecosphere-advantage-item">
          <img src="@/assets/ecosphere/money-img.png" alt="">
          <div>{{ $t('increaseProfit') }}</div>
        </div>
        <div class="ecosphere-advantage-item">
          <img src="@/assets/ecosphere/piggyBank.png" alt="">
          <div>{{ $t('eightTimes') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ecosphereTitleImg from '@/assets/ecosphere/ecosphere-title-img.png';
import BlockTitle from '@/pages/home/component/block-title';
import SquareDotsIcon from '@/pages/home/component/square-dots-icon';

export default {
  components: {
    'block-title': BlockTitle,
    'square-dots-icon': SquareDotsIcon,
  },

  data() {
    return {
      ecosphereTitleImg,
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
