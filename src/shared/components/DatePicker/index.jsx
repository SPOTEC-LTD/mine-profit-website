import { DatePicker } from 'ant-design-vue';
import { TriangleFilled, Calendar } from 'ahoney/lib/icons';
import './index.less';

const DatePickerWrap = {
  inheritAttrs: false,
  props: {
    value: Number,
  },
  render() {
    return (
      <span>
        {/* <Calendar className="date-picker-icon" /> */}
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

DatePickerWrap.Option = DatePicker.Option;

export default DatePickerWrap;
