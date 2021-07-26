import KeepTabs from '@/shared/components/KeepTabs';
import BaseContainer from '@/shared/components/BaseContainer';
import { OFFICIAL_PRODUCT, C2C_PRODUCT } from '@/shared/consts/productType';
import OfficialMarketing from './OfficialMarketing';
import C2CMarketing from './C2CMarketing';
import styles from './index.less?module';

const { TabPane } = KeepTabs;

const ProductMarketing = {
  data() {
    return {
      active: this.$route.query.type || OFFICIAL_PRODUCT,
    };
  },

  methods: {
    onTabsChange(newKey) {
      this.active = newKey;
    },
  },

  render() {
    return (
      <BaseContainer class={styles['product-market-wrapper']}>
        <KeepTabs
          class='mine-tabs-line'
          value={this.active}
          onChange={this.onTabsChange}
          activeKeyName="type"
        >
          <TabPane key={OFFICIAL_PRODUCT} tab={this.$t('marketOfficialMarket')}>
            <OfficialMarketing />
          </TabPane>
          <TabPane key={C2C_PRODUCT} tab={this.$t('marketC2CMarket')}>
            <C2CMarketing />
          </TabPane>
        </KeepTabs>
      </BaseContainer>
    );
  },
};

export default ProductMarketing;
