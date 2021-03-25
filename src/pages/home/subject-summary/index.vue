<template>
  <div>
    <div class="subject-summary-container">
      <square-dots-icon class="summary-dots-icon" />
      <div class="subject-summary-img">
        <img src="@/assets/summary-img.png" alt="">
      </div>
      <div class="subject-summary-content-container">
        <div class="subject-summary-content">
          <block-title :img="aboutTitleImage" class="about-title-image" title="盈算力" />
          <div class="summary-content-text">
            是由注册于塞舌尔 Seychelles 的国际加密资产投资管理公司 Mineprofit 投资的去中心化算力投资平台，拥有塞舌尔金融牌照，受到塞舌尔金融服务管理局监管，保障广大投资者利益。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import bannerPhoneImage from '@/assets/banner-phone.png';
import aboutTitleImage from '@/assets/about-title.png';
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
