<template>
  <div>
    <div class="our-advantage-container">
      <square-dots-icon class="square-line-icon" />
      <square-dots-icon class="square-right-icon" />
      <block-title :img="advantageTitleImage" class="advantage-title-image" :title="isChinese && $t('ourAdvantage')" />
      <advantage-item :advantages="advantages" />
      <square-dots-icon class="square-blue-icon" />
    </div>
  </div>
</template>

<script>
import SquareDotsIcon from '@/pages/home/component/square-dots-icon';
import AdvantageItem from '@/pages/home/component/advantage-item';
import CloudOutlined from 'ahoney/lib/icons/CloudOutlined';
import LightningOutlined from 'ahoney/lib/icons/LightningOutlined';
import UmbrellaOutlined from 'ahoney/lib/icons/UmbrellaOutlined';
import ShoppingBagOutlined from 'ahoney/lib/icons/ShoppingBagOutlined';
import MoneyLockOutlined from 'ahoney/lib/icons/MoneyLockOutlined';
import BlockTitle from '@/pages/home/component/block-title';
import advantageTitleImage from '@/assets/home/advantage-title.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    'advantage-item': AdvantageItem,
    'square-dots-icon': SquareDotsIcon,
    'block-title': BlockTitle,
  },

  data() {
    return {
      isChinese: getIsChinese(),
      advantageTitleImage,
      advantages: [
        {
          title: this.$t('cloudHostingTechnology'),
          content: this.$t('solveThresholdProblem'),
          icon: <CloudOutlined />,
        },
        {
          title: this.$t('smartElectricityPrice'),
          content: this.$t('lowerMinerCosts'),
          icon: <LightningOutlined />,
        },
        {
          title: this.$t('pledgeFree'),
          content: this.$t('improveMiningEfficiency'),
          icon: <MoneyLockOutlined />,
        },
        {
          title: this.$t('investmentAssetProtection'),
          content: this.$t('ensureAssetsSafety'),
          icon: <UmbrellaOutlined />,
        },
        {
          title: this.$t('hashRateTradingMarkets'),
          content: this.$t('finishSalesEssay'),
          icon: <ShoppingBagOutlined />,
        },
      ],
    };
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
