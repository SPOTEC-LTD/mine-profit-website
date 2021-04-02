<template>
  <div>
    <div class="subject-summary-container">
      <square-dots-icon class="summary-dots-icon" />
      <div class="subject-summary-img">
        <img src="@/assets/home/summary-img.png" alt="">
      </div>
      <div class="subject-summary-content-container">
        <div class="subject-summary-content">
          <block-title :img="aboutTitleImage" class="about-title-image" :title="$t('essayHashRate')" />
          <div class="summary-content-text">{{ $t('companyIntroduction') }} </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import bannerPhoneImage from '@/assets/home/banner-phone.png';
import aboutTitleImage from '@/assets/home/about-title.png';
import BlockTitle from '@/pages/home/component/block-title';
import SquareDotsIcon from '@/pages/home/component/square-dots-icon';

export default {
  components: {
    'block-title': BlockTitle,
    'square-dots-icon': SquareDotsIcon,
  },

  data() {
    return {
      bannerPhoneImage,
      aboutTitleImage,
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
