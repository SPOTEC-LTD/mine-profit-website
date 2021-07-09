<template>
  <div>
    <div class="banner-box">
      <Carousel autoplay>
        <img v-for="item in finallyBannerImgList" :key="item.id" :src="item.src" alt="" />
      </Carousel>
    </div>
    <BaseContainer>
      <SubjectSummary />
      <OurAdvantage />
      <CooperationCompany />
      <BusinessProcess />
      <BlockChainDate />
      <OurVision />
    </BaseContainer>
  </div>
</template>

<script>
import { Carousel } from 'ant-design-vue';
import BaseContainer from '@/shared/components/BaseContainer';
import SubjectSummary from '@/pages/home/SubjectSummary';
import OurAdvantage from '@/pages/home/OurAdvantage';
import OurVision from '@/pages/home/OurVision';
import CooperationCompany from '@/pages/home/CooperationCompany';
import BusinessProcess from '@/pages/home/BusinessProcess';
import BlockChainDate from '@/pages/home/BlockChainDate';
import locationServices from '@/shared/services/location/locationServices';
import cnHomeBanner1 from '@/assets/home/home-banner-1.png';
import cnHomeBanner2 from '@/assets/home/home-banner-2.png';
import cnHomeBanner3 from '@/assets/home/home-banner-3.png';
import enHomeBanner1 from '@/assets/home/en-home-banner-1.png';
import enHomeBanner2 from '@/assets/home/en-home-banner-2.png';
import enHomeBanner3 from '@/assets/home/en-home-banner-3.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    BaseContainer,
    SubjectSummary,
    OurAdvantage,
    OurVision,
    CooperationCompany,
    BusinessProcess,
    BlockChainDate,
    Carousel,
  },
  data() {
    return {
      cnBannerImgList: [{
        id: 1, src: cnHomeBanner1,
      },
      {
        id: 2, src: cnHomeBanner2,
      },
      {
        id: 3, src: cnHomeBanner3,
      }],
      enBannerImgList: [{
        id: 1, src: enHomeBanner1,
      },
      {
        id: 2, src: enHomeBanner2,
      },
      {
        id: 3, src: enHomeBanner3,
      }],
    };
  },
  computed: {
    finallyBannerImgList() {
      return getIsChinese() ? this.cnBannerImgList : this.enBannerImgList;
    },
  },
  methods: {
    redirectToDownloadGuidePage() {
      locationServices.push('/download');
    },
  },
};
</script>

<style lang="less" scope>
@import './index.less';
</style>
