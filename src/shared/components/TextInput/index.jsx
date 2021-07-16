import { Input } from 'ant-design-vue';
import trimStart from 'lodash/trimStart';
import isUndefined from 'lodash/isUndefined';

const TextInput = {
  inheritAttrs: false,
  props: {
    value: String,
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
      return trimStart(newValue);
    },

    onChange(value) {
      if (!this.isControl) {
        this.inputValue = value;
      }

      if (this.value !== value) {
        this.$emit('handleChange', value);
      }
    },
  },

  render() {
    const { rows, ...props } = this.$attrs;
    const finlayProps = {
      on: this.$listeners,
      props,
      scopedSlots: this.$scopedSlots,
    };

    const resultValue = this.isControl ? this.value : this.inputValue;

    return (
      <Input
        value={resultValue}
        formatter={this.formatter}
        onInput={this.onChange}
        {...finlayProps}
        rows={rows || '2'}
      />
    );
  },
};

export default TextInput;
