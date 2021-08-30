<template>
  <div class="c2c-market-container">
    <div class="c2c-market-text">
      <transition name="title-fade">
        <BlockTitle
          v-if="isC2CAnimate"
          :img="c2cMarketTitleImg"
          class="c2c-market-title-img"
          :title="isChinese && $t('c2cMarket')"
        />
      </transition>
      <SquareDotsIcon v-if="isC2CAnimate" class="c2c-market-dots-icon" />
      <SquareDotsIcon v-if="isC2CAnimate" class="dots-icon-right" />
      <div v-if="isC2CAnimate" class="yellow-line" />
      <transition name="text-fade">
        <div v-if="isC2CAnimate" class="c2c-market-introduce">
          <div class="c2c-inline-mode">{{ $t('c2cInlineMode') }}</div>
          <div>{{ $t('c2cTradingFreely') }}</div>
        </div>
      </transition>
    </div>
    <div class="c2c-img-container">
      <transition name="image">
        <img v-show="isC2CAnimate" :src="aboutUsImage3" alt="" />
      </transition>
    </div>
  </div>
</template>

<script>
import c2cMarketTitleImg from '@/assets/ecosphere/c2c-market-title-img.png';
import aboutUsImage3 from '@/assets/ecosphere/about-us-image-3.png';
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
      aboutUsImage3,
      isChinese: getIsChinese(),
    };
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
@import '../animation.less';
</style>
