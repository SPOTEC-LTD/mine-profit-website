import KeepTabs from '@/shared/components/KeepTabs';
import BaseContainer from '@/shared/components/BaseContainer';
import { ABOUT_US, ECOSPHERE } from '@/shared/consts/aboutUsType';
import Ecosphere from './Ecosphere';
import AboutCompany from './AboutCompany';

const { TabPane } = KeepTabs;
const ProductMarketing = {
  data() {
    return {
      active: this.$route.query.type || ABOUT_US,
    };
  },

  methods: {
    onTabsChange(newKey) {
      this.active = newKey;
    },
  },

  render() {
    return (
      <BaseContainer>
        <KeepTabs
          class='mine-tabs-line'
          value={this.active}
          onChange={this.onTabsChange}
          activeKeyName="type"
        >
          <TabPane key={ABOUT_US} tab={this.$t('aboutUs')}>
            <AboutCompany />
          </TabPane>
          <TabPane key={ECOSPHERE} tab={this.$t('ecosphere')}>
            <Ecosphere />
          </TabPane>
        </KeepTabs>
      </BaseContainer>
    );
  },
};

export default ProductMarketing;
