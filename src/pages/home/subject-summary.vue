<template>
  <base-container>
    <div>
      <div class="subject-summary-container">
        <square-dots-icon class="summary-dots-icon" />
        <div class="subject-summary-img">
          <img src="@/assets/summary-img.png" alt="">
        </div>
        <div>
          <div class="subject-summary-content">
            <block-title :img="aboutTitleImage" class="about-title-image" title="盈算力" />
            是由注册于塞舌尔 Seychelles 的国际加密资产投资管理公司 Mineprofit 投资的去中心化算力投资平台，拥有塞舌尔金融牌照，受到塞舌尔金融服务管理局监管，保障广大投资者利益。
          </div>
        </div>
      </div>
    </div>
  </base-container>
</template>

<script>

import BaseContainer from '@/shared/components/base-container';
import bannerPhoneImage from '@/assets/banner-phone.png';
import aboutTitleImage from '@/assets/about-title.png';
import BlockTitle from './block-title';
import SquareDotsIcon from './square-dots-icon';

export default {
  components: {
    'base-container': BaseContainer,
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
