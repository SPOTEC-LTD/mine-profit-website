import { Button } from 'ant-design-vue';
import getTimes from '@/shared/utils/getTimes';
import getMinus from '@/shared/utils/getMinus';
import getDivided from '@/shared/utils/getDivided';
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
    const { sale, total, status, onlineTime, customerLimit, tags, amount, unit } = this.productData;
    const isNewUser = tags.includes(NEW_USER_USED);
    const newUserTotal = getTimes({ number: customerLimit, times: amount, decimal: 0 });
    const restCount = getMinus({ number: total, minuend: sale, decimal: 0 });
    const isSaleOut = restCount <= 0;
    const finalTotal = isNewUser ? newUserTotal : total;
    const finalSale = isNewUser ? getMinus({ number: newUserTotal, minuend: total, decimal: 0 }) : sale;
    const decimalPercentage = getDivided({ number: finalSale, divisor: finalTotal, decimal: 2 });
    const salePercentage = getTimes({ number: decimalPercentage, times: 100, decimal: 0 });
    const isLookingForward = status === PLEASE_LOOK_FORWARD;

    return (
      <div class='rest-official-product-container'>
        <LineProgress
          name={this.$t('marketRemainHashrate')}
          number={`${restCount}/${finalTotal} ${unit}`}
          percentage={+getMinus({ number: 100, minuend: salePercentage, decimal: 0 })}
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
