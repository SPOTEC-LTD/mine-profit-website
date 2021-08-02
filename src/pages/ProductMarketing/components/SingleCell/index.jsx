import './index.less';

const SingleCell = {
  props: { className: { type: String } },

  render() {
    return (
      <div class={['single-cell-wrapper', this.className]}>
        <div class='single-cell-title'>
          {this.$scopedSlots.icon && this.$scopedSlots.icon()}
          <span>{this.$scopedSlots.title && this.$scopedSlots.title()}</span>
        </div>
        <div>{this.$scopedSlots.default && this.$scopedSlots.default()}</div>
      </div>
    );
  },
};

export default SingleCell;
