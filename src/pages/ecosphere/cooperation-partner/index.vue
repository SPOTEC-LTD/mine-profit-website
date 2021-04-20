<template>
  <div div class="cooperation-partner-container">
    <block-title
      :img="cooperationPartnerImg"
      class="cooperation-title-img"
      :title="$t('globalCooperationPartnersHunting')"
    />
    <square-dots-icon class="cooperation-dots-icon" />
    <square-dots-icon class="cooperation-dots-line-icon" />
    <div class="cooperation-partner-content">
      <div class="text-container">
        <div>{{ $t('huntCooperatorToDevelopMarket') }}</div>
        <div class="welcome-contact-us">{{ $t('welcomeContactUs') }}</div>
      </div>
      <div class="img-container">
        <img :src="earthImg" alt="" class="earth-img">
        <img :src="masterMinerImg" alt="" class="master-miner-img">
        <img :src="matureMiningFarmImg" alt="" class="mature-mining-farm-img">
        <div class="gradient-container1" />
        <div class="gradient-container2" />
      </div>
    </div>
  </div>
</template>

<script>
import cooperationPartnerImg from '@/assets/ecosphere/cooperation-partner-img.png';
import earthImg from '@/assets/ecosphere/earth-shadow.png';
import masterMinerImg from '@/assets/ecosphere/master-miner-img.png';
import matureMiningFarmImg from '@/assets/ecosphere/mature-mining-farm-img.png';
import BlockTitle from '@/pages/home/component/block-title';
import SquareDotsIcon from '@/pages/home/component/square-dots-icon';

export default {
  components: {
    'block-title': BlockTitle,
    'square-dots-icon': SquareDotsIcon,
  },

  data() {
    return {
      cooperationPartnerImg,
      earthImg,
      masterMinerImg,
      matureMiningFarmImg,
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
