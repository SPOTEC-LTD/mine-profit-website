import './index.less';

const ProductInfoSurvey = {
  props: {
    className: { type: String },
    infoName: { type: String },
    infoValue: { type: String },
    infoUnit: { type: String },
    extraInfo: { type: String },
  },

  render() {
    return (
      <div class={['product-info-survey-wrapper', this.className]} >
        <span class='info-survey-name'>{this.infoName}</span>
        <div class='survey-value-wrapper'>
          <span class='info-survey-value'>{this.infoValue}</span>
          <span class='info-survey-extra-value'>{this.extraInfo}</span>
        </div>
        <span class='info-survey-unit'>{this.infoUnit}</span>
      </div>
    );
  },
};

export default ProductInfoSurvey;
