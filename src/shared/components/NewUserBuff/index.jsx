import { Statistic } from 'ant-design-vue';
import newUsedImg from '@/assets/home/newUsed.png';
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
    this.time = getNewRegisterTime()?.countDownTime;
  },

  render() {
    const format = this.$t('remainTime', {
      day: 'DD',
      hour: 'HH',
      minute: 'mm',
      second: 'ss',
    });

    return (
      <div class='new-user-container'>
        <div class='new-customer'>
          <img src={NewCustomerImg} alt="" class='new-customer-img' />
          <span class='new-customer-span'>{ this.$t('newUserUsed') }</span>
        </div>
        <div class='new-buy-title'>
          <img src={newUsedImg} alt="" class='new-user-img' />
          <div class='remain-time'>
            <Statistic.Countdown
              class='time-countdown'
              value={Date.now() + this.time}
              format={format}
            />
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
          <div class={['day-rate', 'white-day-rate']}>
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
