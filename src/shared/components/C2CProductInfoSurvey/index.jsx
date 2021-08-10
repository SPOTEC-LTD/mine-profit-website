import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import ProductInfoSurvey from '@/shared/components/ProductInfoSurvey';
import './index.less';

const C2CProductInfoSurvey = {
  props: {
    c2cProductData: {
      type: Object,
      default: () => {},
    },
  },

  render() {
    const { chainType, income, unit } = this.c2cProductData;

    return (
      <div class='c2c-product-cell-wrapper'>
        <ProductInfoSurvey
          infoUnit={`${chainType}/${unit}`}
          infoName={this.$t('marketNetOutput')}
          infoValue={bigNumberToFixed(income, 8)}
        />
        <ProductInfoSurvey
          infoUnit={this.$t('day')}
          infoName={this.$t('marketStartMineTime')}
          infoValue='T+1'
        />
      </div>
    );
  },
};

export default C2CProductInfoSurvey;
