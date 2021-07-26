import { Button } from 'ant-design-vue';
import getTimes from '@/shared/utils/getTimes';
import numberUtils from 'aa-utils/lib/numberUtils';
import { NEW_USER_USED } from '@/shared/consts/productTag';
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
    const { sale, total, status, onlineTime, customerLimit, tags, amount } = this.productData;
    const newUserTotal = getTimes({ number: customerLimit, times: amount, decimal: 0 });
    const isNewUser = tags.includes(NEW_USER_USED);
    const restCount = numberUtils.minus(+total, +sale);
    const isSaleOut = restCount <= 0;
    const salePercentage = numberUtils.divide(+sale, +total);
    const isLookingForward = status === PLEASE_LOOK_FORWARD;
    const finalTotal = isNewUser ? newUserTotal : total;

    return (
      <div class='rest-official-product-container'>
        <LineProgress
          name={this.$t('marketRemainHashrate')}
          number={`${restCount}/${finalTotal}${this.$t('part')}`}
          percentage={numberUtils.times(salePercentage, 100)}
          class='sale-rest'
        />

        {!isLookingForward && (
          <Button type="primary" class='product-buy-button' disabled={isSaleOut}>
            {this.$t('marketImmediateBuy')}
          </Button>
        )}

        {isSaleOut && <img src={sellOutImg} alt="" class='sale-out-img' />}
        {isLookingForward && <LookForwardSale time={onlineTime} />}
      </div>
    );
  },
};

export default RestOfficialProduct;
