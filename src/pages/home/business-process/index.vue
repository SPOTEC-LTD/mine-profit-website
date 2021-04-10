<template>
  <div>
    <div class="business-process-container">
      <square-dots-icon class="business-square-line-icon" />
      <square-dots-icon class="business-square-icon" />
      <block-title :img="businessProcessImage" class="business-process-title-image" :title="$t('businessProcess')" />
      <div class="process-details">
        <business-process-item
          :business-process="businessProcess"
          :active-index="activeIndex"
          @changeActivesIndex="changeActivesIndex"
        />
        <video-group
          :video-groupe="videoGroupe"
          :active-index="activeIndex"
          @onTimeupdate="onTimeupdate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BlockTitle from '@/pages/home/component/block-title';
import SquareDotsIcon from '@/pages/home/component/square-dots-icon';
import businessProcessImage from '@/assets/home/business-process-title.png';
import purchaceVideo from '@/assets/home/purchaceVideo.mp4';
import cloudManagementVideo from '@/assets/home/cloudManagementVideo.mp4';
import miningProfitVideo from '@/assets/home/miningProfitVideo.mp4';
import withdrawFreelyVideo from '@/assets/home/withdrawFreelyVideo.mp4';
import ShoppingBagOutlined from 'ahoney/lib/icons/ShoppingBagOutlined';
import MultipleRoundOutlined from 'ahoney/lib/icons/MultipleRoundOutlined';
import ShovelOutlined from 'ahoney/lib/icons/ShovelOutlined';
import BOutlined from 'ahoney/lib/icons/BOutlined';
import businessProcessItem from '@/pages/home/component/business-process-item';
import VideoGroup from '@/pages/home/component/video-group';

export default {
  components: {
    'block-title': BlockTitle,
    'square-dots-icon': SquareDotsIcon,
    'business-process-item': businessProcessItem,
    'video-group': VideoGroup,
  },
  data() {
    return {
      businessProcessImage,
      activeIndex: 0,
      videoGroupe: [purchaceVideo, cloudManagementVideo, miningProfitVideo, withdrawFreelyVideo],
      businessProcess: [
        {
          title: this.$t('purchaseCloudHashRate'),
          content: this.$t('freeTradingByOfficialMarket'),
          icon: <ShoppingBagOutlined />,
        },
        {
          title: this.$t('MineprofitCloudManagement'),
          content: this.$t('autoDeployWithoutSet'),
          icon: <MultipleRoundOutlined />,
        },
        {
          title: this.$t('profitOfMining'),
          content: this.$t('autoClearToWallet'),
          icon: <ShovelOutlined />,
        },
        {
          title: this.$t('withdrawFreely'),
          content: this.$t('withdrawFreelyByBlockChain'),
          icon: <BOutlined />,
        },
      ],
    };
  },
  methods: {
    changeActivesIndex(index) {
      this.activeIndex = index;
      const video = document.querySelectorAll('.purchase-video');
      video[index].play();
    },
    onTimeupdate({ target }, index) {
      const video = document.querySelectorAll('.purchase-video');
      const count = (index + 1) % 4;
      if (target.currentTime === target.duration) {
        video[count].play();
        this.activeIndex = count;
      }
    },
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
