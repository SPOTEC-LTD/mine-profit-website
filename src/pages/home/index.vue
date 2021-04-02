<template>
  <div>
    <base-container class="banner-container">
      <div class="banner-content">
        <div>
          <div class="banner-text">
            <div> {{ $t('mineprofitName') }}</div>
            <div>{{ $t('topHashRateFlatForm') }}</div>
          </div>
          <a-button type="primary" shape="round" class="download-button" size="large">
            <h-qrcode class-name="qr-code" />
            <span>
              {{ $t('dowLoadRightNow') }}
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
      <block-chain-data />
      <our-vision />
    </base-container>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import QrCode from 'ahoney/lib/icons/QrCode';
import BaseContainer from '@/shared/components/base-container';
import bannerPhoneImage from '@/assets/home/banner-phone.png';
import OurAdvantage from '@/pages/home/our-advantage';
import SubjectSummary from '@/pages/home/subject-summary';
import cooperationCompany from '@/pages/home/cooperation-company';
import blockChainDate from '@/pages/home/block-chain-data';
import ourVision from '@/pages/home/our-vision';

export default {
  components: {
    'a-button': Button,
    'h-qrcode': QrCode,
    'base-container': BaseContainer,
    'subject-summary': SubjectSummary,
    'our-advantage': OurAdvantage,
    'cooperation-company': cooperationCompany,
    'block-chain-data': blockChainDate,
    'our-vision': ourVision,
  },
  data() {
    return {
      bannerPhoneImage,
    };
  },
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c);
    },
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
