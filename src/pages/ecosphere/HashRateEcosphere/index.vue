<template>
  <div div class="hashRate-ecosphere-container">
    <div>
      <BlockTitle :img="ecosphereTitleImg" class="ecosphere-title-img" :title="isChinese && $t('hashRateEcosphere')" />
      <SquareDotsIcon class="ecosphere-dots-icon" />
      <SquareDotsIcon class="ecosphere-right-dots-icon" />
      <SquareDotsIcon class="ecosphere-bottom-dots-icon" />
      <div class="ecosphere-intro">{{ $t('hashRateEcosphereIntroduce') }}</div>
      <div class="ecosphere-advantage">
        <div class="ecosphere-advantage-item">
          <img src="@/assets/ecosphere/paper-img.png" alt="" />
          <div>{{ $t('flexibleAllocationAssets') }}</div>
        </div>
        <div class="ecosphere-advantage-item">
          <img src="@/assets/ecosphere/money-img.png" alt="" />
          <div>{{ $t('increaseProfit') }}</div>
        </div>
        <div class="ecosphere-advantage-item">
          <img src="@/assets/ecosphere/piggyBank.png" alt="" />
          <div>{{ $t('eightTimes') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ecosphereTitleImg from '@/assets/ecosphere/ecosphere-title-img.png';
import BlockTitle from '@/shared/components/BlockTitle';
import SquareDotsIcon from '@/shared/components/SquareDotsIcon';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    BlockTitle,
    SquareDotsIcon,
  },

  data() {
    return {
      ecosphereTitleImg,
      isChinese: getIsChinese(),
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
