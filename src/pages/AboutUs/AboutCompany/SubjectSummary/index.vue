<template>
  <div>
    <div class="subject-summary-container">
      <SquareDotsIcon class="summary-dots-icon" />
      <div class="subject-summary-img">
        <Carousel autoplay>
          <img v-for="item in summaryImgList" :key="item.id" :src="item.src" alt="" />
        </Carousel>
      </div>
      <div class="subject-summary-content-container">
        <div class="subject-summary-content">
          <BlockTitle :img="aboutTitleImage" class="about-title-image" :title="isChinese && $t('essayHashRate')" />
          <div class="summary-content-text">
            <div class="introduce-detail" :class="[{ 'en-introduce-detail': isEnglish}]">{{ $t('basicIntroduce') }} </div>
            <div class="introduce-detail" :class="[{ 'en-introduce-detail': isEnglish}]">
              {{ $t('secondParagraphIntroduce') }}
            </div>
            <div>{{ $t('thirdlyParagraphIntroduce') }} </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel } from 'ant-design-vue';
import bannerPhoneImage from '@/assets/home/banner-phone.png';
import aboutTitleImage from '@/assets/home/about-title.png';
import BlockTitle from '@/shared/components/BlockTitle';
import SquareDotsIcon from '@/shared/components/SquareDotsIcon';
import { getIsChinese, getIsEnglish } from '@/shared/utils/getLocalLanguage';
import summaryImg1 from '@/assets/home/summary-img-1.png';
import summaryImg2 from '@/assets/home/summary-img-2.png';
import summaryImg3 from '@/assets/home/summary-img-3.png';

export default {
  components: {
    BlockTitle,
    SquareDotsIcon,
    Carousel,
  },
  data() {
    return {
      bannerPhoneImage,
      aboutTitleImage,
      summaryImgList: [{
        id: 1, src: summaryImg1,
      },
      {
        id: 2, src: summaryImg2,
      },
      {
        id: 3, src: summaryImg3,
      }],
      isChinese: getIsChinese(),
      isEnglish: getIsEnglish(),
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
