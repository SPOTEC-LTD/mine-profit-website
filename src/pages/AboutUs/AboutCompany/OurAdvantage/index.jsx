import SquareDotsIcon from '@/shared/components/SquareDotsIcon';
import AdvantageItem from '@/pages/AboutUs/AboutCompany/component/AdvantageItem';
import CloudOutlined from 'ahoney/lib/icons/CloudOutlined';
import LightningOutlined from 'ahoney/lib/icons/LightningOutlined';
import UmbrellaOutlined from 'ahoney/lib/icons/UmbrellaOutlined';
import ShoppingBagOutlined from 'ahoney/lib/icons/ShoppingBagOutlined';
import MoneyLockOutlined from 'ahoney/lib/icons/MoneyLockOutlined';
import BlockTitle from '@/shared/components/BlockTitle';
import advantageTitleImage from '@/assets/home/advantage-title.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import styles from './index.less?module';

const OurAdvantage = {
  data() {
    return {
      isChinese: getIsChinese(),
      advantageTitleImage,
      advantages: [
        {
          title: this.$t('cloudHostingTechnology'),
          content: this.$t('solveThresholdProblem'),
          icon: <CloudOutlined />,
        },
        {
          title: this.$t('smartElectricityPrice'),
          content: this.$t('lowerMinerCosts'),
          icon: <LightningOutlined />,
        },
        {
          title: this.$t('pledgeFree'),
          content: this.$t('improveMiningEfficiency'),
          icon: <MoneyLockOutlined />,
        },
        {
          title: this.$t('investmentAssetProtection'),
          content: this.$t('ensureAssetsSafety'),
          icon: <UmbrellaOutlined />,
        },
        {
          title: this.$t('hashRateTradingMarkets'),
          content: this.$t('finishSalesEssay'),
          icon: <ShoppingBagOutlined />,
        },
      ],
    };
  },

  render() {
    return (
      <div>
        <div class={styles['our-advantage-container']}>
          <SquareDotsIcon class={styles['square-right-icon']} />
          <BlockTitle
            img={advantageTitleImage}
            class={styles['advantage-title-image']}
            title={this.isChinese && this.$t('ourAdvantage')}
          />
          <AdvantageItem advantages={this.advantages} />
          <SquareDotsIcon class={styles['square-blue-icon']} />
        </div>
      </div>
    );
  },
};

export default OurAdvantage;
