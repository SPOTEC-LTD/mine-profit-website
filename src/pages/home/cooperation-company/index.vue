<template>
  <div class="cooperation-container">
    <div class="cooperation-company-container">
      <block-title :img="cooperationTitleImage" class="cooperation-title-image" title="合作伙伴" />
      <div class="cooperation-introduce">
        Mineprofit 的投资方有十几年的世界各地发电站投资背景。
        与大多数云算力和数字矿业不同，盈算力与世界各地的拥有剩余电力的发电站和当地的电气公司合作，
        通过搭建与整合中型数字矿场，智能电价计费模式，并额外支付分红给投资者和电力提供方，达到真正的全赢目标。
      </div>
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
