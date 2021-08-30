import RightOutlined from 'ahoney/lib/icons/RightOutlined';
import BlockTitle from '@/shared/components/BlockTitle';
import { officialMarketingPath } from '@/router/consts/urls';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import ProductListCell from '@/shared/components/ProductListCell';
import marketTitleImg from '@/assets/home/hash-rate-market-title.png';
import locationServices from '@/shared/services/location/locationServices';
import styles from './index.less?module';

const ProductMarket = {
  props: {
    productList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isChinese: getIsChinese(),
    };
  },

  methods: {
    onClickMore() {
      locationServices.push(officialMarketingPath);
    },
  },

  render() {
    return (
      <div class={styles['product-market-wrapper']}>
        <BlockTitle
          img={marketTitleImg}
          class={styles['market-title-image']}
          title={this.isChinese && this.$t('distilledHashRate')}
        />

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
