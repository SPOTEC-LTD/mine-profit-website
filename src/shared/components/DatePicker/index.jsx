import { DatePicker } from 'ant-design-vue';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import './index.less';

const DatePickerWrap = {
  inheritAttrs: false,
  render() {
    return (
      <span>
        <DatePicker
          placeholder={this.$t('selectDate')}
          format='YYYY.MM.DD'
          suffixIcon={<TriangleFilled className="date-picker-icon" />}
          {...{
            on: this.$listeners,
            props: this.$attrs,
          }}
        >
          {this.$slots.default}
        </DatePicker>
      </span>
    );
  },
};

export default DatePickerWrap;
