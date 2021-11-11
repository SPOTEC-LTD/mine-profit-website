import includes from 'lodash/includes';
import getTimes from '@/shared/utils/getTimes';
import getCoinRate from '@/shared/utils/getCoinRate';
import TagGroup from '@/pages/home/component/TagGroup';
import { POWER_OFF } from '@/shared/consts/isPowerOff';
import { NEW_USER_USED } from '@/shared/consts/productTag';
import PersonAvatar from '@/shared/components/PersonAvatar';
import ProductTitle from '@/shared/components/ProductTitle';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import RestC2CProduct from '@/shared/components/RestC2CProduct';
import PowerOffButton from '@/shared/components/PowerOffButton';
import ProductInfoSurvey from '@/shared/components/ProductInfoSurvey';
import RestOfficialProduct from '@/shared/components/RestOfficialProduct';
import locationServices from '@/shared/services/location/locationServices';
import { officialDetailsPath, c2cDetailsPath } from '@/router/consts/urls';
import C2CProductInfoSurvey from '@/shared/components/C2CProductInfoSurvey';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
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
        locationServices.push(officialDetailsPath, { params: { id: this.productData.id } });
        return;
      }
      locationServices.push(c2cDetailsPath, { params: { id: this.productData.id } });
    },

    getC2CProductTitleProps() {
      const { name, chainType } = this.productData;
      return { chainType, name };
    },

    getC2CPowerOffButton() {
      const { hasPowerOff } = this.productData;
      return hasPowerOff === POWER_OFF ? { rightContent: () => <PowerOffButton/> } : {};
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
      const { price, discountPrice, tags, popularizePrice } = this.productData;
      const isNewUser = includes(tags, NEW_USER_USED);
      const normalPrice = !isNewUser && !popularizePrice;
      const reducedPrice = isNewUser ? discountPrice : popularizePrice;
      const finalPrice = normalPrice ? price : reducedPrice;

      const officialProductProps = {
        infoUnit: getIsChinese() ? `≈${getTimes({ number: finalPrice, times: rate, decimal: 2 })} CNY` : '',
        infoName: this.$t('marketPartPrice'),
        infoValue: `${bigNumberToFixed(normalPrice ? price : reducedPrice, 2)} USDT`,
        extraInfo: normalPrice ? '' : `${bigNumberToFixed(price, 2)} USDT`,
      };
      return officialProductProps;
    },

    getC2CSurveyProps(rate) {
      const { price, unit } = this.productData;
      const cnyPrice = getTimes({ number: price, times: rate, decimal: 2 });
      return {
        infoUnit: getIsChinese() ? `≈${cnyPrice} CNY/${unit}` : '',
        infoName: this.$t('sellPrice'),
        infoValue: `${bigNumberToFixed(price, 2)} USDT/${unit}`,
      };
    },
  },

  render() {
    const { isOfficialMarket } = this;
    const rate = +getCoinRate({ rateList: this.rateList, coin: 'cny' });
    const propsTitleProps = isOfficialMarket ? this.getOfficialProductTitleProps() : this.getC2CProductTitleProps();
    const propsSurveyProps = isOfficialMarket ? this.getOfficialProductSurveyProps(rate) : this.getC2CSurveyProps(rate);
    const titleScope = this.isOfficialMarket ? {} : this.getC2CPowerOffButton();
    const isPowerOff = !!Object.keys(titleScope).length;

    return (
      <div class="product-brief-cell-container" onClick={this.onClickToDetail}>
        <div class='product-title-intro'>
          <ProductTitle
            {...{ attrs: propsTitleProps }}
            scopedSlots={titleScope}
            class={['product-card-title', { 'power-off-product-title': isPowerOff }]}
          />
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
