<template>
  <div class="cooperation-container">
    <div class="cooperation-company-container">
      <BlockTitle
        :img="cooperationTitleImage"
        class="cooperation-title-image"
        :title="isChinese && $t('cooperationPartner')"
      />
      <div class="cooperation-introduce">
        <div>{{ $t('companyBackground') }}</div>
        <div>{{ $t('companyPartner') }}</div>
      </div>
    </div>
    <SquareDotsIcon class="cooperation-left-icon" />
    <div>
      <CooperationMap />
    </div>
  </div>
</template>

<script>

import SquareDotsIcon from '@/pages/home/component/SquareDotsIcon';
import BlockTitle from '@/pages/home/component/BlockTitle';
import CooperationMap from '@/pages/home/component/CooperationMap';
import cooperationTitleImage from '@/assets/home/cooperation-company.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    SquareDotsIcon,
    BlockTitle,
    CooperationMap,
  },

  data() {
    return {
      cooperationTitleImage,
      isChinese: getIsChinese(),
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
