import { Select } from 'ant-design-vue';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import { ZH } from '@@/I18n';
import filterInt from '@/shared/utils/filterInt';
import LabelInput from '../LabelInput';
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
      this.$emit('phonePrefixChange', value.label);
      this.popupShow = false;
    },
  },

  render() {
    const finlayProps = {
      on: this.$listeners,
      attrs: this.$attrs,
    };

    const lang = this.$i18n.locale === ZH ? 'zh' : 'en';

    const selectNode = (
      <Select
        class="phone-prefix-select"
        defaultValue={{ label: this.phonePrefix, key: 37 }}
        onChange={this.handleAreaCodeChange}
        showSearch
        labelInValue
        optionFilterProp="search"
        optionLabelProp="label"
        suffixIcon={<TriangleFilled className="select-icon" />}
        dropdownMatchSelectWidth={false}
      >
      {
        this.countries.map(item => (
          <Select.Option search={`${item.code} ${item[lang]}`} key={item.nation} label={item.code}>
            {`${item.code} ${item[lang]}`}
          </Select.Option>
        ))
      }

    </Select>
    );
    return (
      <LabelInput
        className="phone-input"
        prefix={selectNode}
        value={this.phoneValue}
        maxLength={11}
        onChange={value => this.$emit('change', value)}
        {...finlayProps}
        label={this.$t('signInPhoneNum')}
      />
    );
  },
};

export default PhoneInput;
