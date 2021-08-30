import throttle from 'lodash/throttle';
import SubjectSummary from '@/pages/AboutUs/SubjectSummary';
import HashRateEcosphere from '@/pages/AboutUs/HashRateEcosphere';
import StakingMarket from '@/pages/AboutUs/StakingMarket';
import C2CMarket from '@/pages/AboutUs/C2CMarket';
import CooperationPartner from '@/pages/AboutUs/CooperationPartner';
import BaseContainer from '@/shared/components/BaseContainer';

const AboutUs = {
  data() {
    return {
      isC2CAnimate: false,
      isStakingAnimate: false,
      isShowCooperation: false,
    };
  },

  created() {
    this.scrollThrottle = throttle(this.onHandleScroll, 300);
  },

  mounted() {
    window.addEventListener('scroll', this.scrollThrottle, false);
  },

  destroyed() {
    window.removeEventListener('scroll', this.scrollThrottle);
  },
  methods: {
    onHandleScroll() {
      const { scrollTop } = document.documentElement;
      if (scrollTop > 368 && scrollTop < 900) {
        this.isC2CAnimate = true;
      } else if (scrollTop > 900 && scrollTop < 1710) {
        this.isStakingAnimate = true;
      } else if (scrollTop >= 1710) {
        this.isShowCooperation = true;
      }
    },
  },
  render() {
    return (
      <BaseContainer>
        <SubjectSummary />
        <HashRateEcosphere />
        <C2CMarket isC2CAnimate={this.isC2CAnimate} />
        <StakingMarket isStakingAnimate={this.isStakingAnimate} />
        <CooperationPartner isShowCooperation={this.isShowCooperation} />
      </BaseContainer>
    );
  },
};

export default AboutUs;
