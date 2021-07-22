<template>
  <div>
    <HashRateEcosphere />
    <C2CMarket :isC2CAnimate="isC2CAnimate" />
    <StakingMarket :isStakingAnimate="isStakingAnimate" />
    <CooperationPartner />
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import HashRateEcosphere from '@/pages/AboutUs/Ecosphere/HashRateEcosphere';
import StakingMarket from '@/pages/AboutUs/Ecosphere/StakingMarket';
import C2CMarket from '@/pages/AboutUs/Ecosphere/C2CMarket';
import CooperationPartner from '@/pages/AboutUs/Ecosphere/CooperationPartner';

export default {
  components: {
    HashRateEcosphere,
    C2CMarket,
    StakingMarket,
    CooperationPartner,
  },
  data() {
    return {
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
