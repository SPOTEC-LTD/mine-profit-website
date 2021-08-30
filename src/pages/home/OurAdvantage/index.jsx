import CloudOutlined from 'ahoney/lib/icons/CloudOutlined';
import BlockTitle from '@/shared/components/BlockTitle';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import UmbrellaOutlined from 'ahoney/lib/icons/UmbrellaOutlined';
import MoneyLockOutlined from 'ahoney/lib/icons/MoneyLockOutlined';
import LightningOutlined from 'ahoney/lib/icons/LightningOutlined';
import advantageTitleImage from '@/assets/home/advantage-title.png';
import ShoppingBagOutlined from 'ahoney/lib/icons/ShoppingBagOutlined';
import AdvantageItem from '@/pages/home/component/AdvantageItem';
import styles from './index.less?module';

const OurAdvantage = {
  data() {
    return {
      isChinese: getIsChinese(),
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
      <div class={styles['our-advantage-container']}>
        <BlockTitle
          img={advantageTitleImage}
          class={styles['advantage-title-image']}
          title={this.isChinese && this.$t('ourAdvantage')}
        />
        <AdvantageItem advantages={this.advantages} />
      </div>
    );
  },
};

export default OurAdvantage;
