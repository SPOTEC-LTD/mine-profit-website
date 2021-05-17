<template>
  <div>
    <div class="subject-summary-container">
      <square-dots-icon class="summary-dots-icon" />
      <div class="subject-summary-img">
        <a-carousel autoplay>
          <img v-for="item in finallySummaryImg" :key="item.id" :src="item.src" alt="">
        </a-carousel>
      </div>
      <div class="subject-summary-content-container">
        <div class="subject-summary-content">
          <block-title :img="aboutTitleImage" class="about-title-image" :title="isChinese && $t('essayHashRate')" />
          <div class="summary-content-text">
            <div class="introduce-detail">{{ $t('basicIntroduce') }} </div>
            <div class="introduce-detail">{{ $t('secondParagraphIntroduce') }} </div>
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
import BlockTitle from '@/pages/home/component/block-title';
import SquareDotsIcon from '@/pages/home/component/square-dots-icon';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import cnSummaryImg1 from '@/assets/home/summary-img-1.png';
import cnSummaryImg2 from '@/assets/home/summary-img-2.png';
import cnSummaryImg3 from '@/assets/home/summary-img-3.png';
import enSummaryImg1 from '@/assets/home/en-summary-img-1.png';
import enSummaryImg2 from '@/assets/home/en-summary-img-2.png';
import enSummaryImg3 from '@/assets/home/en-summary-img-3.png';

export default {
  components: {
    'block-title': BlockTitle,
    'square-dots-icon': SquareDotsIcon,
    'a-carousel': Carousel,
  },

  data() {
    return {
      bannerPhoneImage,
      aboutTitleImage,
      cnSummaryImgList: [{
        id: 1, src: cnSummaryImg1,
      },
      {
        id: 2, src: cnSummaryImg2,
      },
      {
        id: 3, src: cnSummaryImg3,
      }],
      enSummaryImgList: [{
        id: 1, src: enSummaryImg1,
      },
      {
        id: 2, src: enSummaryImg2,
      },
      {
        id: 3, src: enSummaryImg3,
      }],
      isChinese: getIsChinese(),
    };
  },
  computed: {
    finallySummaryImg() {
      return this.isChinese ? this.cnSummaryImgList : this.enSummaryImgList;
    },
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
