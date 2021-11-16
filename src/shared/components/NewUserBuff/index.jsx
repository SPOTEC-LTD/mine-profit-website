import newUsedImg from '@/assets/home/newUsed.png';
import Countdown from '@/shared/components/Countdown';
import NewCustomerImg from '@/assets/home/newCustomer.png';
import getNewRegisterTime from '@/shared/utils/getNewRegisterTime';
import './index.less';

const NewUserBuff = {
  props: {
    customerLimit: {
      type: Number,
      default: 0,
    },
    discountRate: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      newUsedImg,
      time: 0,
      NewCustomerImg,
    };
  },

  mounted() {
    this.time = getNewRegisterTime().countDownTime;
  },

  render() {
    return (
      <div class='new-user-container'>
        <div class='new-customer'>
          <img src={NewCustomerImg} alt="" class='new-customer-img' />
          <span class='new-customer-span'>{ this.$t('newUserUsed') }</span>
        </div>
        <div class='new-buy-title'>
          <img src={newUsedImg} alt="" class='new-user-img' />
          <div class='remain-time'>
            <Countdown deadline={this.time} prefix={this.$t('timeRemains')} />
          </div>
        </div>

        <div class='new-buy-content'>
          <div class='day-rate'>
            <span>{ this.$t('specialDiscount') }</span>
            <div>
              <span>{this.discountRate}</span>
              <span class="new-user-day">{ this.$t('discount') }</span>
            </div>
          </div>
          <div class="day-rate white-day-rate">
            <span class='limit-num'>{ this.$t('limitNum') }</span>
            <div>
              <span>{this.customerLimit}</span>
              <span class="new-user-day">{ this.$t('part') }</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export default NewUserBuff;
