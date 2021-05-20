<template>
  <div class="our-vision-container">
    <BlockTitle :img="ourVision" class="our-vision-title-image" :title="isChinese && $t('ourVision')" />
    <div class="our-mission">
      <div class="img-container">
        <span class="img-mask" />
        <img :src="missionOneImg" alt="" />
      </div>
      <OurMissionItem :content="$t('beValidPath')" :title="$t('ourMission')" />
    </div>

    <div class="our-mission">
      <OurMissionItem :content="$t('beWinWinPath')" :title="$t('ourTarget')" />
      <div class="img-container">
        <span class="img-mask" />
        <img :src="missionTwoImg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>

import BlockTitle from '@/shared/components/BlockTitle';
import OurMissionItem from '@/pages/home/component/OurMissionItem';
import ourVision from '@/assets/home/our-vsion-title.png';
import missionOneImg from '@/assets/home/mission-1.png';
import missionTwoImg from '@/assets/home/mission-2.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    BlockTitle,
    OurMissionItem,
  },

  data() {
    return {
      ourVision,
      missionOneImg,
      missionTwoImg,
      isChinese: getIsChinese(),
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
