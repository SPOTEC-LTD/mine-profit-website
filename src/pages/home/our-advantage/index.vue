<template>
  <div>
    <div class="our-advantage-container">
      <square-dots-icon class="square-line-icon" />
      <square-dots-icon class="square-right-icon" />
      <block-title :img="advantageTitleImage" class="advantage-title-image" title="我们的优势" />
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

export default {
  components: {
    'advantage-item': AdvantageItem,
    'square-dots-icon': SquareDotsIcon,
    'block-title': BlockTitle,
  },

  data() {
    return {
      advantageTitleImage,
      advantages: [
        {
          title: '云端托管技术',
          content: '解决挖矿门槛问题',
          icon: <CloudOutlined />,
        },
        {
          title: '智能优惠电价',
          content: '有效降低挖矿成本',
          icon: <LightningOutlined />,
        },
        {
          title: '自由算力质押',
          content: '显著提高挖矿效益',
          icon: <MoneyLockOutlined />,
        },
        {
          title: '投资资产保护',
          content: '保障矿工资产安全',
          icon: <UmbrellaOutlined />,
        },
        {
          title: '算力交易市场',
          content: '轻松完成算力买卖',
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
