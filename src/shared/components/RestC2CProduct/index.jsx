import { Button } from 'ant-design-vue';
import numberUtils from 'aa-utils/lib/numberUtils';
import getMinus from '@/shared/utils/getMinus';
import getDivided from '@/shared/utils/getDivided';
import LineProgress from '@/shared/components/LineProgress';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import './index.less';

const RestC2CProduct = {
  props: {
    productData: {
      type: Object,
      default: () => {},
    },
  },

  render() {
    const { totalAmount, saleAmount, unit } = this.productData;
    const rest = getMinus({ number: totalAmount, minuend: saleAmount, decimal: 2 });
    const salePercentage = getDivided({ number: saleAmount, divisor: totalAmount, decimal: 2 });
    const total = bigNumberToFixed(totalAmount, 2);

    return (
      <div class='rest-c2c-product-container'>
        <LineProgress
          name={this.$t('marketRemainHashrate')}
          number={`${rest}/${total} ${unit}`}
          percentage={+getMinus({ number: 100, minuend: numberUtils.times(salePercentage, 100), decimal: 0 })}
          class='sale-rest'
        />
        <Button type="primary" class='product-buy-button'>{this.$t('marketImmediateBuy')}</Button>
      </div>
    );
  },
};

export default RestC2CProduct;
