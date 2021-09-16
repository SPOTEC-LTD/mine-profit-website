import preSaleTagImg from '@/assets/productMarket/preSaleTagImg.png';
import './index.less';

const PreSaleButton = {
  props: ['className'],

  render() {
    return (
      <div class={['pre-sale-tag', this.className]} >
        <img src={preSaleTagImg} alt="" class="pre-sale-tag-img" />
        <span class='new-customer-span'>{this.$t('preSale')}</span>
      </div>
    );
  },
};

export default PreSaleButton;
