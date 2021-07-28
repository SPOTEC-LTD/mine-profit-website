<template>
  <div>
    <SubjectSummary />
    <OurAdvantage />
    <CooperationCompany />
    <OurVision />
  </div>
</template>

<script>
import SubjectSummary from '@/pages/AboutUs/AboutCompany/SubjectSummary';
import OurAdvantage from '@/pages/AboutUs/AboutCompany/OurAdvantage';
import OurVision from '@/pages/AboutUs/AboutCompany/OurVision';
import CooperationCompany from '@/pages/AboutUs/AboutCompany/CooperationCompany';

export default {
  components: {
    SubjectSummary,
    OurAdvantage,
    OurVision,
    CooperationCompany,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
