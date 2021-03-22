<template>
  <div>
    <base-container class="banner-container">
      <div class="banner-content">
        <div>
          <div class="banner-text">
            <div> Minprofit 盈算力</div>
            <div>全球顶尖云算力平台</div>
          </div>
          <a-button type="primary" shape="round" class="download-button" size="large">
            <h-qrcode class-name="qr-code" />
            <span>
              立即下载
            </span>
          </a-button>
        </div>

        <img :src="bannerPhoneImage" class="banner-phone" alt="">
      </div>
    </base-container>
    <base-container>
      <subject-summary />
    </base-container>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import QrCode from 'ahoney/lib/icons/QrCode';
import BaseContainer from '@/shared/components/base-container';
import bannerPhoneImage from '@/assets/banner-phone.png';
import SubjectSummary from './subject-summary.vue';

export default {
  components: {
    'a-button': Button,
    'h-qrcode': QrCode,
    'base-container': BaseContainer,
    'subject-summary': SubjectSummary,
  },

  data() {
    return {
      bannerPhoneImage,
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
