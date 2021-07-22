import { Tabs } from 'ant-design-vue';
import BaseContainer from '@/shared/components/BaseContainer';
import { OFFICIAL_PRODUCT, C2C_PRODUCT } from '@/shared/consts/productType';
import OfficialMarketing from './OfficialMarketing';
import C2CMarketing from './C2CMarketing';
import './index.less';

const { TabPane } = Tabs;

const ProductMarketing = {
  data() {
    return {
      active: this.$route.query.type || OFFICIAL_PRODUCT,
    };
  },

  mounted() {
    this.$router.push({ query: { ...this.$route.query, type: this.$route.query.type || OFFICIAL_PRODUCT } });
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
          <TabPane key={OFFICIAL_PRODUCT} tab={this.$t('marketOfficialMarket')}>
            <OfficialMarketing />
          </TabPane>
          <TabPane key={C2C_PRODUCT} tab={this.$t('marketC2CMarket')}>
            <C2CMarketing />
          </TabPane>
        </Tabs>
      </BaseContainer>
    );
  },
};

export default ProductMarketing;
