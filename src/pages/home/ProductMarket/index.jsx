import RightOutlined from 'ahoney/lib/icons/RightOutlined';
import Title from '@/pages/home/component/Title';
import ProductBriefCell from '@/shared/components/ProductBriefCell';

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
      // TODO 跳转至产品列表页面
      console.log('linkToList');
    },
  },

  render() {
    return (
      <div>
        <Title title={this.$t('distilledHashRate')} />
        {this.productList.map(item => <ProductBriefCell productData={item} key={item.id} />)}
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
