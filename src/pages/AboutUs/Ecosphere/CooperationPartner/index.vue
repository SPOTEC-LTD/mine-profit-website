<template>
  <div div class="cooperation-partner-container">
    <BlockTitle
      :img="cooperationPartnerImg"
      class="cooperation-title-img"
      :title="isChinese && $t('globalCooperationPartnersHunting')"
    />
    <SquareDotsIcon class="cooperation-dots-icon" />
    <SquareDotsIcon class="cooperation-dots-line-icon" />
    <div class="cooperation-partner-content">
      <div class="text-container">
        <div>{{ $t('huntCooperatorToDevelopMarket') }}</div>
        <div class="welcome-contact-us">{{ $t('welcomeContactUs') }}</div>
      </div>
      <div class="img-container">
        <img :src="earthImg" alt="" class="earth-img" />
        <div class="mature-mining-farm-img">
          <span class="mature-mining-text">{{ $t('forMatureMiningFarm') }}</span>
          <img :src="matureMiningFarmImg" alt="" />
        </div>
        <div class="master-miner-img">
          <span class="master-miner-text">{{ $t('ForAMasterMiner') }}</span>
          <img :src="masterMinerImg" alt="" />
        </div>
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
import BlockTitle from '@/shared/components/BlockTitle';
import SquareDotsIcon from '@/shared/components/SquareDotsIcon';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    BlockTitle,
    SquareDotsIcon,
  },

  data() {
    return {
      cooperationPartnerImg,
      earthImg,
      masterMinerImg,
      matureMiningFarmImg,
      isChinese: getIsChinese(),
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
