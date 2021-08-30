<template>
  <div div class="cooperation-partner-container">
    <transition name="title-fade">
      <BlockTitle
        v-if="isShowCooperation"
        :img="cooperationPartnerImg"
        class="cooperation-title-img"
        :title="isChinese && $t('globalCooperationPartnersHunting')"
      />
    </transition>
    <SquareDotsIcon v-if="isShowCooperation" class="cooperation-dots-icon" />
    <SquareDotsIcon v-if="isShowCooperation" class="cooperation-dots-line-icon" />
    <div class="cooperation-partner-content">
      <transition name="text-fade">
        <div v-if="isShowCooperation" class="text-container">
          <div>{{ $t('huntCooperatorToDevelopMarket') }}</div>
          <div class="welcome-contact-us">{{ $t('welcomeContactUs') }}</div>
        </div>
      </transition>
      <transition name="earth-fade">
        <div v-if="isShowCooperation" class="img-container">
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
      </transition>
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
  props: {
    isShowCooperation: {
      type: Boolean,
      default: false,
    },
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

<style lang="less" scoped>
@import './index.less';
@import '../animation.less';
</style>
