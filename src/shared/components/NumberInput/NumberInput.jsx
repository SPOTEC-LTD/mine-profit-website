import { Input } from 'ant-design-vue';
import isUndefined from 'lodash/isUndefined';
import filterInt from '@/shared/utils/filterInt';
import filterFloat from '@/shared/utils/filterFloat';
import omit from 'lodash/omit';
import { INT } from './numberType';

const NumberInput = {
  inheritAttrs: false,
  props: {
    value: [String, Number],
    precision: Number,
    numberType: String,
    buttonNode: Function,
    min: Number,
    max: Number,
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
      if (+newValue <= 0) {
        return newValue;
      }
      let newNumber;
      const preValue = this.isControl ? this.value : this.inputValue;

      if (newValue < this.min || newValue > this.max) {
        return preValue;
      }

      if (this.numberType === INT) {
        newNumber = filterInt({ value: newValue, preValue });
      } else {
        newNumber = filterFloat({ value: newValue, preValue, precision: this.precision });
      }
      return newNumber;
    },

    onNumberChange(e) {
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

    return (
      <Input
        value={resultValue}
        onInput={this.onNumberChange}
        {...finlayProps}
      />
    );
  },
};

export default NumberInput;
