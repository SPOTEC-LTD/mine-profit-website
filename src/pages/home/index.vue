<template>
  <div>
    <BaseContainer class="banner-container">
      <div class="banner-content">
        <div>
          <div class="banner-text">
            <div>{{ $t('mineprofitName') }}</div>
            <div>{{ $t('topHashRateFlatForm') }}</div>
          </div>
          <Button
            type="primary"
            shape="round"
            class="download-button"
            size="large"
            @click="redirectToDownloadGuidePage"
          >
            <QrCode class-name="qr-code" />
            <span> {{ $t('dowLoadRightNow') }} </span>
          </Button>
        </div>
        <img src="@/assets/home/banner-phone.png" class="banner-phone" alt="" />
      </div>
    </BaseContainer>
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
import { Button } from 'ant-design-vue';
import QrCode from 'ahoney/lib/icons/QrCode';
import BaseContainer from '@/shared/components/base-container';
import SubjectSummary from '@/pages/home/SubjectSummary';
import OurAdvantage from '@/pages/home/OurAdvantage';
import OurVision from '@/pages/home/OurVision';
import CooperationCompany from '@/pages/home/CooperationCompany';
import BusinessProcess from '@/pages/home/BusinessProcess';
import BlockChainDate from '@/pages/home/BlockChainDate';
import locationServices from '@/shared/services/location/locationServices';

export default {
  components: {
    Button,
    QrCode,
    BaseContainer,
    SubjectSummary,
    OurAdvantage,
    OurVision,
    CooperationCompany,
    BusinessProcess,
    BlockChainDate,
  },
  data() {
    return {};
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
