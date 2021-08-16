<template>
  <div>
    <div class="business-process-container">
      <SquareDotsIcon class="business-square-line-icon" />
      <SquareDotsIcon class="business-square-icon" />
      <BlockTitle
        :img="businessProcessImage"
        class="business-process-title-image"
        :title="isChinese && $t('businessProcess')"
      />
      <div class="process-details">
        <BusinessProcessItem
          :business-process="businessProcess"
          :active-index="activeIndex"
          @changeActivesIndex="changeActivesIndex"
        />
        <VideoGroup
          :video-groupe="finallyVideoGroupe"
          :active-index="activeIndex"
          @onEnded="onEnded"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BlockTitle from '@/shared/components/BlockTitle';
import SquareDotsIcon from '@/shared/components/SquareDotsIcon';
import businessProcessImage from '@/assets/home/business-process-title.png';
import purchaceVideo from '@/assets/home/purchaceVideo.mp4';
import enPurchaceVideo from '@/assets/home/enPurchaceVideo.mp4';
import cloudManagementVideo from '@/assets/home/cloudManagementVideo.mp4';
import enCloudManagementVideo from '@/assets/home/enCloudManagementVideo.mp4';
import miningProfitVideo from '@/assets/home/miningProfitVideo.mp4';
import enMiningProfitVideo from '@/assets/home/enMiningProfitVideo.mp4';
import withdrawFreelyVideo from '@/assets/home/withdrawFreelyVideo.mp4';
import enWithdrawFreelyVideo from '@/assets/home/enWithdrawFreelyVideo.mp4';
import ShoppingBagOutlined from 'ahoney/lib/icons/ShoppingBagOutlined';
import MultipleRoundOutlined from 'ahoney/lib/icons/MultipleRoundOutlined';
import ShovelOutlined from 'ahoney/lib/icons/ShovelOutlined';
import BOutlined from 'ahoney/lib/icons/BOutlined';
import BusinessProcessItem from '@/pages/home/component/BusinessProcessItem';
import VideoGroup from '@/pages/home/component/VideoGroup';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    BlockTitle,
    SquareDotsIcon,
    BusinessProcessItem,
    VideoGroup,
  },
  data() {
    return {
      isChinese: getIsChinese(),
      businessProcessImage,
      activeIndex: 0,
      cnVideoGroupe: [purchaceVideo, cloudManagementVideo, miningProfitVideo, withdrawFreelyVideo],
      enVideoGroupe: [enPurchaceVideo, enCloudManagementVideo, enMiningProfitVideo, enWithdrawFreelyVideo],
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

  computed: {
    finallyVideoGroupe() {
      return getIsChinese() ? this.cnVideoGroupe : this.enVideoGroupe;
    },
  },

  watch: {
    activeIndex(newIndex, oldIndex) {
      const video = document.querySelectorAll('.purchase-video');
      video[newIndex].play();
      video[oldIndex].pause();
      video[oldIndex].currentTime = 0;
    },
  },
  mounted() {
    const video = document.querySelectorAll('.purchase-video');
    video[this.activeIndex].play();
  },
  methods: {
    changeActivesIndex(index) {
      this.activeIndex = index;
    },
    onEnded() {
      const count = (this.activeIndex + 1) % 4;
      this.activeIndex = count;
    },
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
