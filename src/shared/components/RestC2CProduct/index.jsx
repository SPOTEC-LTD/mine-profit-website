import { Button } from 'ant-design-vue';
import LineProgress from '@/shared/components/LineProgress';
import './index.less';

const RestC2CProduct = {
  props: {
    productData: {
      type: Object,
      default: () => {},
    },
  },

  render() {
    // TODO fix data to c2cMarket data
    return (
      <div class='rest-product-container'>
        <LineProgress
          name={this.$t('marketRemainHashrate')}
          number={`95/100${this.$t('part')}`}
          percentage={30}
          class='sale-rest'
        />
        <Button type="primary" class='product-buy-button'>{this.$t('marketImmediateBuy')}</Button>
      </div>
    );
  },
};

export default RestC2CProduct;
