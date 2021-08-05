import './index.less';

const DetailContent = {
  props: {
    className: String,
    mount: [String, Number],
    unit: String,
    extraUnit: String,
  },

  render() {
    return (
      <div class={['detail-content-wrapper', this.className]}>
        <div class={['detail-main-content', { 'cn-detail-main-content': this.extraUnit }]}>
          <span class='product-details-mount'>{this.mount}</span>
          {this.unit && <span class='product-details-unit'>{this.unit}</span>}
        </div>
        {this.extraUnit && <div class='product-extra-unit'>{this.extraUnit}</div>}
      </div>
    );
  },
};

export default DetailContent;
