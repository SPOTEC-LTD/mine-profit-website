import { Tabs } from 'ant-design-vue';
import BaseContainer from '@/shared/components/BaseContainer';
import { ABOUT_US, ECOSPHERE } from '@/shared/consts/aboutUsType';
import Ecosphere from './Ecosphere';
import AboutCompany from './AboutCompany';
import './index.less';

const { TabPane } = Tabs;

const ProductMarketing = {
  data() {
    return {
      active: this.$route.query.type || ABOUT_US,
    };
  },

  mounted() {
    this.$router.push({ query: { ...this.$route.query, type: this.$route.query.type || ABOUT_US } });
  },

  methods: {
    callback(key) {
      this.$router.push({ query: { ...this.$route.query, type: key } });
    },
  },

  render() {
    return (
      <BaseContainer>
        <Tabs destroyInactiveTabPane defaultActiveKey={this.active} onChange={this.callback}>
          <TabPane key={ABOUT_US} tab={this.$t('aboutUs')}>
            <AboutCompany />
          </TabPane>
          <TabPane key={ECOSPHERE} tab={this.$t('ecosphere')}>
            <Ecosphere />
          </TabPane>
        </Tabs>
      </BaseContainer>
    );
  },
};

export default ProductMarketing;
