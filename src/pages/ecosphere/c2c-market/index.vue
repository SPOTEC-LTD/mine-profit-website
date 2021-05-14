<template>
  <div div class="c2c-market-container">
    <div class="c2c-market-text">
      <block-title :img="c2cMarketTitleImg" class="c2c-market-title-img" :title="isChinese && $t('c2cMarket')" />
      <square-dots-icon class="c2c-market-dots-icon" />
      <div class="c2c-market-introduce">
        <div class="c2c-inline-mode">{{ $t('c2cInlineMode') }}</div>
        <div>{{ $t('c2cTradingFreely') }}</div>
      </div>
    </div>
    <div :class="[ 'c2c-img-container', isC2CAnimate ? 'animate' : '']">
      <img src="@/assets/ecosphere/c2c-market-mine-img.png" alt="">
    </div>
  </div>
</template>

<script>
import c2cMarketTitleImg from '@/assets/ecosphere/c2c-market-title-img.png';
import BlockTitle from '@/pages/home/component/block-title';
import SquareDotsIcon from '@/pages/home/component/square-dots-icon';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    'block-title': BlockTitle,
    'square-dots-icon': SquareDotsIcon,
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
