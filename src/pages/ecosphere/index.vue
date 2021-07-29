<template>
  <BaseContainer>
    <HashRateEcosphere />
    <C2CMarket :isC2CAnimate="isC2CAnimate" />
    <StakingMarket :isStakingAnimate="isStakingAnimate" />
    <CooperationPartner />
  </BaseContainer>
</template>

<script>
import throttle from 'lodash/throttle';
import BaseContainer from '@/shared/components/BaseContainer';
import HashRateEcosphere from '@/pages/ecosphere/HashRateEcosphere';
import StakingMarket from '@/pages/ecosphere/StakingMarket';
import C2CMarket from '@/pages/ecosphere/C2CMarket';
import CooperationPartner from '@/pages/ecosphere/CooperationPartner';

export default {
  components: {
    BaseContainer,
    HashRateEcosphere,
    C2CMarket,
    StakingMarket,
    CooperationPartner,
  },
  data() {
    return {
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
