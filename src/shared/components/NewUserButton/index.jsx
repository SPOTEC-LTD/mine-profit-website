import newCustomerImg from '@/assets/productMarket/newCustomer.png';
import './index.less';

const NewUserButton = {
  props: ['className'],

  render() {
    return (
      <div class={['new-customer-tag', this.className]} >
        <img src={newCustomerImg} alt="" class="new-customer-img" />
        <span class='new-customer-span'>{this.$t('newUserUsed')}</span>
      </div>
    );
  },
};

export default NewUserButton;
