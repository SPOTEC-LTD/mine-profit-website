<template>
  <div class="staking-market-container">
    <div class="staking-market-text">
      <transition name="title-fade">
        <BlockTitle
          v-if="isStakingAnimate"
          :img="stakingMarketTitleImg"
          class="staking-market-title-img"
          :title="isChinese && $t('stakingMarket')"
        />
      </transition>
      <transition name="text-fade">
        <div v-if="isStakingAnimate" class="staking-market-introduce">
          {{ $t('stakingMarketIntroduce') }}
        </div>
      </transition>
    </div>
    <div v-show="isStakingAnimate" class="flow-container">
      <video class="flow-chart" autoplay muted :src="flowVideo" alt="" />
      <transition name="robot-fade">
        <img v-if="isStakingAnimate" class="flow-robot" :src="robotImage" alt="" />
      </transition>
    </div>
  </div>
</template>

<script>
import stakingMarketTitleImg from '@/assets/ecosphere/staking-market-title-img.png';
import BlockTitle from '@/shared/components/BlockTitle';
import { getIsChinese, getIsEnglish } from '@/shared/utils/getLocalLanguage';
import flowVideo from '@/assets/ecosphere/flow-video.mp4';
import enFlowVideo from '@/assets/ecosphere/en-flow-video.mp4';
import robotImage from '@/assets/ecosphere/robot.png';

export default {
  components: {
    BlockTitle,
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
      robotImage,
      isChinese: getIsChinese(),
      isEnglish: getIsEnglish(),
    };
  },
  computed: {
    flowVideo() {
      let flowVideoUrl = flowVideo;
      if (this.isEnglish) {
        flowVideoUrl = enFlowVideo;
      }
      return flowVideoUrl;
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
@import '../animation.less';
</style>
