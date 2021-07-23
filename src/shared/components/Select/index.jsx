import { Select } from 'ant-design-vue';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import './index.less';

const SelectWrap = {
  inheritAttrs: false,
  render() {
    return (
      <Select
        suffixIcon={<TriangleFilled className="select-icon" />}
        {...{
          on: this.$listeners,
          props: this.$attrs,
        }}
      >
        {this.$slots.default}
      </Select>
    );
  },
};

SelectWrap.Option = Select.Option;

export default SelectWrap;
