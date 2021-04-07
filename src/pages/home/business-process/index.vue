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
        <div class="video-container">
          <img :src="phoneBackground" alt="" class="phone-background">
          <video id="introduceVideo" class="purchase-video" :src="playingVideo" autoplay muted @ended="onVideoEnd" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockTitle from '@/pages/home/component/block-title';
import SquareDotsIcon from '@/pages/home/component/square-dots-icon';
import businessProcessImage from '@/assets/home/business-process-title.png';
import phoneBackground from '@/assets/home/phone.png';
import purchaceVideo from '@/assets/home/purchaceVideo.mp4';
import ShoppingBagOutlined from 'ahoney/lib/icons/ShoppingBagOutlined';
import MultipleRoundOutlined from 'ahoney/lib/icons/MultipleRoundOutlined';
import ShovelOutlined from 'ahoney/lib/icons/ShovelOutlined';
import BOutlined from 'ahoney/lib/icons/BOutlined';
import businessProcessItem from '@/pages/home/component/business-process-item';

export default {
  components: {
    'square-dots-icon': SquareDotsIcon,
    'block-title': BlockTitle,
    'business-process-item': businessProcessItem,
  },
  data() {
    return {
      businessProcessImage,
      purchaceVideo,
      playingVideo: purchaceVideo,
      phoneBackground,
      activeIndex: 0,
      videoGrouop: [purchaceVideo, purchaceVideo, purchaceVideo, purchaceVideo],
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
      document.getElementById('introduceVideo').src = this.videoGrouop[index];
    },
    onVideoEnd() {
      const count = (this.activeIndex + 1) % 4;
      this.activeIndex = count;
      document.getElementById('introduceVideo').src = this.videoGrouop[count];
    },
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
