import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import RightOutlined from 'ahoney/lib/icons/RightOutlined';
import './index.less';

const CellValue = {
  props: {
    value: [String, Number],
    unit: String,
    showIcon: Boolean,
    className: String,
  },

  render() {
    return (
      <div class={classNames('p-cell', this.className)}>
        <span class="p-cell-value">{isUndefined(this.value) ? this.$scopedSlots.value() : this.value }</span>
        {this.unit && (<span class='p-cell-unit'>{this.unit}</span>)}
        {this.showIcon && <RightOutlined className='p-icon' />}
      </div>
    );
  },
};

export default CellValue;
