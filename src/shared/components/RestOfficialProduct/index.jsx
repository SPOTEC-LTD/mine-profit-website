import { Button } from 'ant-design-vue';
import includes from 'lodash/includes';
import getTimes from '@/shared/utils/getTimes';
import getMinus from '@/shared/utils/getMinus';
import getDivided from '@/shared/utils/getDivided';
import dateUtils from '@/shared/intl/utils/dateUtils';
import { NEW_USER_USED } from '@/shared/consts/productTag';
import LineProgress from '@/shared/components/LineProgress';
import sellOutImg from '@/assets/productMarket/sellOut.png';
import { PLEASE_LOOK_FORWARD } from '@/shared/consts/productStatus';
import LookForwardSale from '@/shared/components/LookForwardSale';
import PreSaleDec from '@/shared/components/PreSaleDec';
import { BEFORE_PRE_SALE } from '@/shared/consts/preSaleStatus';
import './index.less';

const RestOfficialProduct = {
  props: {
    productData: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    const {
      sale, total, status, customerLimit, tags, onlineTime,
      amount, preStatus, preSaleStartTime, preSaleEndTime,
    } = this.productData;
    return {
      isNewUser: includes(tags, NEW_USER_USED),
      isLookingForward: status === PLEASE_LOOK_FORWARD,
      newUserTotal: getTimes({ number: customerLimit, times: amount, decimal: 0 }),
      restCount: getMinus({ number: total, minuend: sale, decimal: 0 }),
      preSaleLookForward: preStatus === BEFORE_PRE_SALE,
      preSaleStart: dateUtils.formatDateTime(preSaleStartTime, 'YYYY-MM-DD HH:mm'),
      preSaleEnd: dateUtils.formatDateTime(preSaleEndTime, 'YYYY-MM-DD HH:mm'),
      LookForwardTime: dateUtils.formatDateTime(onlineTime, 'YYYY-MM-DD HH:mm'),
    };
  },

  computed: {
    isSaleOut() { return this.restCount <= 0; },
    finalTotal() {
      return this.isNewUser ? this.newUserTotal : this.productData.total;
    },
    finalSale() {
      const { sale, total } = this.productData;
      const newUsersTotal = getMinus({ number: this.newUserTotal, minuend: total, decimal: 0 });
      return this.isNewUser ? newUsersTotal : sale;
    },
  },

  render() {
    const { unit, preStatus, preSaleStartTime, preSaleEndTime } = this.productData;
    const {
      isLookingForward, restCount, isSaleOut, finalTotal, LookForwardTime,
      finalSale, preSaleLookForward, preSaleStart, preSaleEnd,
    } = this;

    const decimalPercentage = getDivided({ number: finalSale, divisor: finalTotal, decimal: 2 });
    const salePercentage = getTimes({ number: decimalPercentage, times: 100, decimal: 0 });
    const preSaleTime = `${preSaleStart}-${preSaleEnd}`;

    return (
      <div class='rest-official-product-container'>
        <LineProgress
          name={this.$t('marketRemainHashrate')}
          number={`${restCount}/${finalTotal} ${unit}`}
          percentage={+getMinus({ number: 100, minuend: salePercentage, decimal: 0 })}
          class='sale-rest'
        />

        {(!isLookingForward && preStatus) && (
          <PreSaleDec
            preStatus={preStatus}
            preSaleStartTime={preSaleStartTime}
            preSaleEndTime={preSaleEndTime}
            isSaleOut={isSaleOut}
          />
        )}

        {(!preStatus && !isLookingForward) && (
          <Button type="primary" class='product-buy-button' disabled={isSaleOut}>
            {this.$t('marketImmediateBuy')}
          </Button>
        )}

        {isLookingForward && (
          <LookForwardSale
            isPreSale={preSaleLookForward}
            time={preSaleLookForward ? preSaleTime : LookForwardTime}
          />
        )}

        {isSaleOut && <img src={sellOutImg} alt="" class='sale-out-img' />}
      </div>
    );
  },
};

export default RestOfficialProduct;
