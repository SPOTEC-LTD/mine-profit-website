import includes from 'lodash/includes';
import getTimes from '@/shared/utils/getTimes';
import getCoinRate from '@/shared/utils/getCoinRate';
import TagGroup from '@/pages/home/component/TagGroup';
import { NEW_USER_USED } from '@/shared/consts/productTag';
import PersonAvatar from '@/shared/components/PersonAvatar';
import ProductTitle from '@/shared/components/ProductTitle';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import RestC2CProduct from '@/shared/components/RestC2CProduct';
import ProductInfoSurvey from '@/shared/components/ProductInfoSurvey';
import RestOfficialProduct from '@/shared/components/RestOfficialProduct';
import locationServices from '@/shared/services/location/locationServices';
import { officialDetailsPath, c2cDetailsPath } from '@/router/consts/urls';
import C2CProductInfoSurvey from '@/shared/components/C2CProductInfoSurvey';
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
      if (this.isOfficialMarket) {
        locationServices.push(officialDetailsPath, { query: { id: this.productData.id } });
        return;
      }
      locationServices.push(c2cDetailsPath, { query: { id: this.productData.id } });
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

    getOfficialProductSurveyProps(rate) {
      const { price, discountPrice, tags } = this.productData;
      const isNewUser = includes(tags, NEW_USER_USED);
      const cnyPrice = getTimes({ number: isNewUser ? discountPrice : price, times: rate, decimal: 2 });
      const normalUser = {
        infoUnit: `≈${cnyPrice} CNY`,
        infoName: this.$t('marketPartPrice'),
        infoValue: `${bigNumberToFixed(price, 2)} USDT`,
      };
      const newUser = {
        infoUnit: `≈${cnyPrice} CNY`,
        infoName: this.$t('marketPartPrice'),
        infoValue: `${bigNumberToFixed(discountPrice, 2)}`,
        extraInfo: `${bigNumberToFixed(price, 2)} USDT`,
      };
      return isNewUser ? newUser : normalUser;
    },

    getC2CSurveyProps(rate) {
      const { price } = this.productData;
      const cnyPrice = getTimes({ number: price, times: rate, decimal: 2 });
      return {
        infoUnit: `≈${cnyPrice} CNY`,
        infoName: this.$t('sellPrice'),
        infoValue: `${bigNumberToFixed(price, 2)} USDT`,
      };
    },
  },

  render() {
    const { isOfficialMarket } = this;
    const rate = +getCoinRate({ rateList: this.rateList, coin: 'cny' });
    const propsTitleProps = isOfficialMarket ? this.getOfficialProductTitleProps() : this.getC2CProductTitleProps();
    const propsSurveyProps = isOfficialMarket ? this.getOfficialProductSurveyProps(rate) : this.getC2CSurveyProps(rate);

    return (
      <div class="product-brief-cell-container" onClick={this.onClickToDetail}>
        <div class='product-title-intro'>
          <ProductTitle {...{ attrs: propsTitleProps }} class='product-card-title' />
          {isOfficialMarket && <TagGroup productData={this.productData} />}
          {!isOfficialMarket && <PersonAvatar productData={this.productData} />}
        </div>
        <div class='product-info-intro'>
          <ProductInfoSurvey
            {...{ attrs: propsSurveyProps }}
            className='market-part-wrapper'
          />

          {!isOfficialMarket && <C2CProductInfoSurvey c2cProductData={this.productData} />}
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
