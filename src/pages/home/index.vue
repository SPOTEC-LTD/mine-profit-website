<template>
  <base-container class="banner-container">
    <div class="banner-content">
      <div>
        <div class="banner-text">
          <div> Minprofit 盈算力</div>
          <div>全球顶尖云算力平台</div>
        </div>
        <a-button type="primary" shape="round" class="download-button" size="large">立即下载</a-button>
      </div>

      <img :src="bannerPhoneImage" class="banner-phone" alt="">
    </div>
  </base-container>
</template>

<script>
import { Button } from 'ant-design-vue';
import BaseContainer from '@/shared/components/base-container';
import bannerPhoneImage from '@/assets/banner-phone.png';

export default {
  components: {
    'a-button': Button,
    'base-container': BaseContainer,
  },

  data() {
    return {
      bannerPhoneImage,
    };
  },
};
</script>

<style lang="less">
@import './index.less';
</style>
