<template>
  <div class="cooperation-container">
    <div class="cooperation-company-container">
      <block-title :img="cooperationTitleImage" class="cooperation-title-image" :title="$t('cooperationPartner')" />
      <div class="cooperation-introduce">{{ $t('companyIntroduce') }}</div>
    </div>
    <square-dots-icon class="cooperation-left-icon" />
    <div>
      <cooperation-map />
    </div>
  </div>
</template>

<script>

import SquareDotsIcon from '@/pages/home/component/square-dots-icon';
import BlockTitle from '@/pages/home/component/block-title';
import cooperationMap from '@/pages/home/component/cooperation-map';
import cooperationTitleImage from '@/assets/home/cooperation-company.png';

export default {
  components: {
    'square-dots-icon': SquareDotsIcon,
    'block-title': BlockTitle,
    'cooperation-map': cooperationMap,
  },

  data() {
    return {
      cooperationTitleImage,
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
