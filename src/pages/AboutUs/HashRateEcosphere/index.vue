<template>
  <div div class="hashRate-ecosphere-container">
    <transition name="image">
      <img v-if="showLeftImage" class="ecosphere-container-left" :src="aboutUsImage2" alt="" />
    </transition>
    <div>
      <transition name="title-fade">
        <BlockTitle
          v-if="showTitle"
          :img="ecosphereTitleImg"
          class="ecosphere-title-img"
          :title="isChinese && $t('hashRateEcosphere')"
        />
      </transition>
      <SquareDotsIcon class="ecosphere-dots-icon" />
      <SquareDotsIcon class="ecosphere-right-dots-icon" />
      <transition name="text-fade">
        <div v-if="showText" class="ecosphere-intro">
          {{ $t('hashRateEcosphereIntroduce', { enProductName: $t('enProductName') }) }}
        </div>
      </transition>
      <div class="ecosphere-advantage">
        <transition name="card-one-fade">
          <div v-if="showCardOne" class="ecosphere-advantage-item">
            <img src="@/assets/ecosphere/paper-img.png" alt="" />
            <div>{{ $t('flexibleAllocationAssets') }}</div>
          </div>
        </transition>
        <transition name="card-two-fade">
          <div v-if="showCardTwo" class="ecosphere-advantage-item">
            <img src="@/assets/ecosphere/money-img.png" alt="" />
            <div>{{ $t('increaseProfit') }}</div>
          </div>
        </transition>
        <transition name="card-three-fade">
          <div v-if="showCardThree" class="ecosphere-advantage-item">
            <img src="@/assets/ecosphere/piggyBank.png" alt="" />
            <div>{{ $t('eightTimes') }}</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ecosphereTitleImg from '@/assets/ecosphere/ecosphere-title-img.png';
import BlockTitle from '@/shared/components/BlockTitle';
import SquareDotsIcon from '@/shared/components/SquareDotsIcon';
import aboutUsImage2 from '@/assets/ecosphere/about-us-image-2.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    BlockTitle,
    SquareDotsIcon,
  },

  data() {
    return {
      ecosphereTitleImg,
      aboutUsImage2,
      isChinese: getIsChinese(),
      showText: false,
      showTitle: false,
      showLeftImage: false,
      showCardOne: false,
      showCardTwo: false,
      showCardThree: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showTitle = true;
      this.showText = true;
      this.showLeftImage = true;
      this.showCardOne = true;
      this.showCardTwo = true;
      this.showCardThree = true;
    });
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
@import '../animation.less';
</style>
