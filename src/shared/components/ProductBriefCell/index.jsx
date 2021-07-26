import getTimes from '@/shared/utils/getTimes';
import getCoinRate from '@/shared/utils/getCoinRate';
import TagGroup from '@/pages/home/component/TagGroup';
import ProductTitle from '@/shared/components/ProductTitle';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import RestC2CProduct from '@/shared/components/RestC2CProduct';
import ProductInfoSurvey from '@/shared/components/ProductInfoSurvey';
import RestOfficialProduct from '@/shared/components/RestOfficialProduct';
import OfficialProductInfoSurvey from '@/shared/components/OfficialProductInfoSurvey';
import './index.less';

const ProductBriefCell = {
  props: {
    productData: {
      type: Object,
      default: () => {},
    },
    isOfficialMarket: {
      type: Boolean,
      default: true,
    },
    rateList: {
      type: Array,
      default: true,
    },
  },

  methods: {
    onClickToDetail() {
      // TODO 跳转至产品详情
      console.log(this.productData.id);
    },

    getC2CProductTitleProps() {
      const { name, chainType } = this.productData;
      return { chainType, name };
    },

    getOfficialProductTitleProps() {
      const { name, chainType, ptName } = this.productData;
      return {
        chainType,
        name: ptName,
        leftExtra: name,
      };
    },
  },

  render() {
    const { isOfficialMarket } = this;
    const { price } = this.productData;
    const propsTitleProps = isOfficialMarket ? this.getOfficialProductTitleProps() : this.getC2CProductTitleProps();
    const rate = +getCoinRate({ rateList: this.rateList, coin: 'cny' });
    const cnyPrice = getTimes({ number: price, times: rate, decimal: 2 });

    return (
      <div class="product-brief-cell-container" onClick={this.onClickToDetail}>
        <div class='product-title-intro'>
          <ProductTitle {...{ attrs: propsTitleProps }} class='product-card-title' />
          {isOfficialMarket && <TagGroup productData={this.productData} />}
        </div>
        <div class='product-info-intro'>
          <ProductInfoSurvey
            infoUnit={`≈${cnyPrice} CNY`}
            infoName={this.$t('marketPartPrice')}
            infoValue={`${bigNumberToFixed(price, 2)} USDT`}
            className='market-part-wrapper'
          />
          {isOfficialMarket && <OfficialProductInfoSurvey dataSource={this.productData} />}
        </div>

        <div class='product-rest-intro'>
          {isOfficialMarket && <RestOfficialProduct productData={this.productData} />}
          {!isOfficialMarket && <RestC2CProduct productData={this.productData} />}
        </div>
      </div>
    );
  },
};

export default ProductBriefCell;
