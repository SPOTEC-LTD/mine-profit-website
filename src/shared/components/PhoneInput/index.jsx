import { Select } from 'ant-design-vue';
import classNames from 'classnames';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import filterInt from '@/shared/utils/filterInt';
import BgInput from '../BgInput';
import './index.less';

const PhoneInput = {
  props: {
    className: {
      type: String,
    },
    value: {
      type: String,
    },
    countries: {
      type: Array,
      default: () => [],
    },
    phonePrefix: {
      type: String,
      default: '+86',
    },
  },

  data() {
    return {
      popupShow: false,
      areaCode: 23,
    };
  },

  computed: {
    phoneValue() {
      return filterInt({ value: this.value, enableMinus: false });
    },
  },

  methods: {
    handleShowPick() {
      this.popupShow = true;
    },

    handleAreaCodeChange(value) {
      if (value) {
        this.$emit('phonePrefixChange', value.code);
      }
      this.popupShow = false;
    },
  },

  render() {
    const finlayProps = {
      on: this.$listeners,
      props: this.$attrs,
    };

    const selectNode = (
      <Select
        class="phone-prefix-select"
        defaultValue={this.phonePrefix}
        onChange={this.handleAreaCodeChange}
        showSearch
        suffixIcon={<TriangleFilled className="select-icon" />}
        dropdownMatchSelectWidth={false}
      >
      {
        this.countries.map(item => (
          <Select.Option key={item.nation}>
            {`${item.code} ${item.zh}`}
          </Select.Option>
        ))
      }

    </Select>
    );
    return (
      <BgInput
        className="phone-input"
        prefix={selectNode}
        value={this.phoneValue}
        maxLength={11}
        label="手机号"
        {...finlayProps}
      />
    );
  },
};

export default PhoneInput;
