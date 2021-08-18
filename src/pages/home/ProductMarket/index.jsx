import RightOutlined from 'ahoney/lib/icons/RightOutlined';
import Title from '@/pages/home/component/Title';
import { officialMarketingPath } from '@/router/consts/urls';
import ProductListCell from '@/shared/components/ProductListCell';
import locationServices from '@/shared/services/location/locationServices';
import styles from './index.less?module';

const ProductMarket = {
  props: {
    productList: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    onClickMore() {
      locationServices.push(officialMarketingPath);
    },
  },

  render() {
    return (
      <div class={styles['product-market-wrapper']}>
        <Title title={this.$t('distilledHashRate')} />
        <ProductListCell productList={this.productList} />
        <div class={styles.more}>
          <div onClick={this.onClickMore} class={styles['more-cursor']}>
            <span>{this.$t('moreHashRate')}</span>
            <RightOutlined />
          </div>
        </div>
      </div>
    );
  },
};

export default ProductMarket;
