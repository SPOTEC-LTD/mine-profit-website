<template>
  <div div class="c2c-market-container">
    <div class="c2c-market-text">
      <BlockTitle :img="c2cMarketTitleImg" class="c2c-market-title-img" :title="isChinese && $t('c2cMarket')" />
      <SquareDotsIcon class="c2c-market-dots-icon" />
      <div class="c2c-market-introduce">
        <div class="c2c-inline-mode">{{ $t('c2cInlineMode') }}</div>
        <div>{{ $t('c2cTradingFreely') }}</div>
      </div>
    </div>
    <div :class="[ 'c2c-img-container', isC2CAnimate ? 'animate' : '']">
      <img src="@/assets/ecosphere/c2c-market-mine-img.png" alt="" />
    </div>
  </div>
</template>

<script>
import c2cMarketTitleImg from '@/assets/ecosphere/c2c-market-title-img.png';
import BlockTitle from '@/shared/components/BlockTitle';
import SquareDotsIcon from '@/shared/components/SquareDotsIcon';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    BlockTitle,
    SquareDotsIcon,
  },
  props: {
    isC2CAnimate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      c2cMarketTitleImg,
      isChinese: getIsChinese(),
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
