<template>
  <div>
    <base-container class="background-container">
      <div class="top-content">
        <div>
          <img :src="bannerFontsImg" class="banner-fonts" alt="">
          <div class="scan-download">
            <div class="qrcode">
              <qrcode :value="`${mobileSiteHost}/download/pre-dispatch`" />
            </div>
            <div class="download-text">
              <div class="apple-download">
                <img src="@/assets/download/apple.png" alt="">
                <div>{{ $t('appVersion') }} {{ iosVersion }}</div>
              </div>
              <div class="android-download">
                <img src="@/assets/download/android.png" alt="">
                <div>{{ $t('appVersion') }} {{ androidVersion }}</div>
              </div>
              <div class="download-right-now">{{ $t('downloadRightNow') }}</div>
            </div>
          </div>
        </div>
      </div>
    </base-container>
    <base-container>
      <hashRate-ecosphere />
      <c2c-market :isC2CAnimate="isC2CAnimate" />
      <staking-market :isStakingAnimate="isStakingAnimate" />
      <cooperation-partner />
    </base-container>
  </div>
</template>

<script>
import { fetchAppVersion } from '@/api';
import throttle from 'lodash/throttle';

import QRcode from '@/shared/components/qrcode';
import BaseContainer from '@/shared/components/base-container';
import bannerFontsImg from '@/assets/ecosphere/bannerfonts.png';
import hashRateEcosphere from '@/pages/ecosphere/hashRate-ecosphere';
import stakingMarket from '@/pages/ecosphere/staking-market';
import c2cMarket from '@/pages/ecosphere/c2c-market';
import cooperationPartner from '@/pages/ecosphere/cooperation-partner';

export default {
  components: {
    qrcode: QRcode,
    'base-container': BaseContainer,
    'hashRate-ecosphere': hashRateEcosphere,
    'c2c-market': c2cMarket,
    'staking-market': stakingMarket,
    'cooperation-partner': cooperationPartner,
  },

  async asyncData() {
    try {
      const { body: { android, iOS } } = await fetchAppVersion();
      const androidVersion = android.version;
      const iosVersion = iOS.version;
      return {
        androidVersion,
        iosVersion,
      };
    } catch (error) {
      console.log('error', error);
    }
    return {};
  },
  data() {
    return {
      bannerFontsImg,
      iosVersion: '',
      androidVersion: '',
      mobileSiteHost: process.env.MOBILE_SITE_HOST,
      isC2CAnimate: false,
      isStakingAnimate: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.onHandleScroll, 500), false);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onHandleScroll);
  },
  methods: {
    onHandleScroll() {
      const { scrollTop } = document.documentElement;
      if (scrollTop > 330 && scrollTop < 1080) {
        this.isC2CAnimate = true;
      } else if (scrollTop > 1200 && scrollTop < 2250) {
        this.isStakingAnimate = true;
      }
    },
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
