import './index.less';

const SingleCell = {
  props: {
    className: { type: String },
    isC2CMarket: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    officialMarketNode() {
      return (
        <div class={'official-cell-wrapper'}>
          <div class='single-cell-title'>
            {this.$scopedSlots.icon && this.$scopedSlots.icon()}
            <span>{this.$scopedSlots.title && this.$scopedSlots.title()}</span>
          </div>
          <div>{this.$scopedSlots.default && this.$scopedSlots.default()}</div>
        </div>
      );
    },

    c2cProductNode() {
      return (
        <div class='c2c-cell-wrapper'>
          <div class='single-cell-img'>{this.$scopedSlots.icon && this.$scopedSlots.icon()}</div>
          <div class='c2c-cell-detail'>
            <span>{this.$scopedSlots.title && this.$scopedSlots.title()}</span>
            <div>{this.$scopedSlots.default && this.$scopedSlots.default()}</div>
          </div>
        </div>
      );
    },
  },

  render() {
    return (
      <div class={['single-cell-wrapper', this.className]}>
        {this.isC2CMarket ? this.c2cProductNode() : this.officialMarketNode()}
      </div>
    );
  },
};

export default SingleCell;
