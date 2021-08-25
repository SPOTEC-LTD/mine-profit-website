import { Input } from 'ant-design-vue';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';

const FormatInput = {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    formatReg: RegExp,
  },

  data() {
    return { inputValue: '' };
  },

  computed: {
    isControl() {
      return !isUndefined(this.value);
    },
  },

  methods: {
    formatter(newValue) {
      if (!this.formatReg) {
        return newValue;
      }
      return newValue.replace(this.formatReg, '');
    },

    onTextChange(e) {
      const resultValue = this.formatter(e.target.value);
      if (!this.isControl) {
        this.inputValue = resultValue;
      }
      if (this.value !== resultValue) {
        this.$emit('change', resultValue);
      }
      this.$forceUpdate();
    },
  },

  render() {
    const finlayProps = {
      on: omit(this.$listeners, ['change', 'input']),
      props: this.$attrs,
      scopedSlots: this.$scopedSlots,
    };

    const resultValue = this.isControl ? this.value : this.inputValue;

    console.log(this.isControl, 'isControl');

    return (
      <Input
        value={resultValue}
        onInput={this.onTextChange}
        {...finlayProps}
      />
    );
  },
};

export default FormatInput;
