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
      <our-advantage />
      <cooperation-company />
    </base-container>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import QrCode from 'ahoney/lib/icons/QrCode';
import BaseContainer from '@/shared/components/base-container';
import bannerPhoneImage from '@/assets/banner-phone.png';
import OurAdvantage from '@/pages/home/our-advantage';
import SubjectSummary from '@/pages/home/subject-summary';
import cooperationCompany from '@/pages/home/cooperation-company';

export default {
  components: {
    'a-button': Button,
    'h-qrcode': QrCode,
    'base-container': BaseContainer,
    'subject-summary': SubjectSummary,
    'our-advantage': OurAdvantage,
    'cooperation-company': cooperationCompany,
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
