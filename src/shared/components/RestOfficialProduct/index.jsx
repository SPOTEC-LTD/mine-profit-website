import { Button } from 'ant-design-vue';
import numberUtils from 'aa-utils/lib/numberUtils';
import LineProgress from '@/shared/components/LineProgress';
import sellOutImg from '@/assets/productMarket/sellOut.png';
import { PLEASE_LOOK_FORWARD } from '@/shared/consts/productStatus';
import LookForwardSale from '@/shared/components/LookForwardSale';
import './index.less';

const RestOfficialProduct = {
  props: {
    productData: {
      type: Object,
      default: () => {},
    },
  },

  render() {
    const { sale, total, status, onlineTime } = this.productData;
    const restCount = numberUtils.minus(+total, +sale);
    const isSaleOut = restCount <= 0;
    const salePercentage = numberUtils.divide(+sale, +total);

    return (
      <div class='rest-official-product-container'>
        <LineProgress
          name={this.$t('marketRemainHashrate')}
          number={`${restCount}/${total}${this.$t('part')}`}
          percentage={numberUtils.times(salePercentage, 100)}
          class='sale-rest'
        />
        <Button type="primary" class='product-buy-button' disabled={isSaleOut}>{this.$t('marketImmediateBuy')}</Button>
        {isSaleOut && <img src={sellOutImg} alt="" class='sale-out-img' />}

        {status === PLEASE_LOOK_FORWARD && <LookForwardSale time={onlineTime} />}
      </div>
    );
  },
};

export default RestOfficialProduct;
