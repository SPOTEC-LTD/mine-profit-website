<template>
  <div>
    <div class="subject-summary-container">
      <SquareDotsIcon class="summary-dots-icon" />
      <SquareDotsIcon class="summary-left-dots-icon" />
      <SquareDotsIcon class="dots-icon-right-bottom" />
      <div class="subject-summary-content-container">
        <div class="subject-summary-content">
          <transition name="title-fade">
            <BlockTitle
              v-if="showTitle"
              :img="aboutTitleImage"
              class="about-title-image"
              :title="isChinese && $t('essayHashRate')"
            />
          </transition>
          <transition name="text-fade">
            <div v-if="showText" class="summary-content-text">
              <div class="introduce-detail" :class="[{ 'en-introduce-detail': isEnglish}]">{{ $t('basicIntroduce') }} </div>
              <div class="introduce-detail" :class="[{ 'en-introduce-detail': isEnglish}]">
                {{ $t('secondParagraphIntroduce') }}
              </div>
              <div>{{ $t('thirdlyParagraphIntroduce') }} </div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="image">
        <img v-if="showRightImage" class="summary-right-content" :src="aboutUsImage1" alt="" />
      </transition>
    </div>
  </div>
</template>

<script>
import bannerPhoneImage from '@/assets/home/banner-phone.png';
import aboutTitleImage from '@/assets/home/about-title.png';
import BlockTitle from '@/shared/components/BlockTitle';
import SquareDotsIcon from '@/shared/components/SquareDotsIcon';
import { getIsChinese, getIsEnglish } from '@/shared/utils/getLocalLanguage';
import aboutUsImage1 from '@/assets/ecosphere/about-us-image-1.png';

export default {
  components: {
    BlockTitle,
    SquareDotsIcon,
  },
  data() {
    return {
      bannerPhoneImage,
      aboutTitleImage,
      aboutUsImage1,
      isChinese: getIsChinese(),
      isEnglish: getIsEnglish(),
      showTitle: false,
      showText: false,
      showRightImage: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showTitle = true;
      this.showText = true;
      this.showRightImage = true;
    });
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
@import '../animation.less';
</style>
