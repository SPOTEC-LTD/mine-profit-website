import SubjectSummary from '@/pages/AboutUs/AboutCompany/SubjectSummary';
import OurAdvantage from '@/pages/AboutUs/AboutCompany/OurAdvantage';
import OurVision from '@/pages/AboutUs/AboutCompany/OurVision';
import CooperationCompany from '@/pages/AboutUs/AboutCompany/CooperationCompany';
import './index.less';

const AboutCompany = {
  render() {
    return (
      <div>
        <SubjectSummary />
        <CooperationCompany />
        <OurAdvantage />
        <OurVision />
      </div>
    );
  },
};

export default AboutCompany;
