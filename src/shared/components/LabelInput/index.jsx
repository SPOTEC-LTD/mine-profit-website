import classNames from 'classnames';
import omit from 'lodash/omit';
import isUndefined from 'lodash/isUndefined';
import './index.less';

const LabelInput = {
  props: {
    className: String,
    label: [String, Object],
    error: [String, Object],
    value: String,
    suffix: [String, Object],
    prefix: [String, Object],
  },

  data() {
    return {
      dataValue: '0',
      selfValue: '',
      isFocus: false,
    };
  },

  methods: {
    handleChange(e) {
      if (!isUndefined(this.value)) {
        this.selfValue = e.target.value;
      }
      this.$emit('change', e.target.value);
    },

    handleFocus() {
      this.isFocus = true;
    },

    handleBlur() {
      this.isFocus = false;
    },

    handleLabelClick() {
      this.$refs.input.focus();
    },
  },

  render() {
    const finallyValue = isUndefined(this.value) ? this.selfValue : this.value;

    return (
      <div class={classNames('bg-input-control', this.className)}>
        <div
          class={[
            'bg-input-field',
            {
              'bg-input-affix': this.prefix || this.suffix,
              'bg-input-focused': this.isFocus,
            },
          ]}
        >

          { this.prefix && (
            <div class="bg-input-prefix">{this.prefix}</div>
          ) }
          <div class="bg-input-warper">
            <input
              ref="input"
              data-value={finallyValue.length}
              class="bg-input"
              type="text"
              value={finallyValue}
              {...{
                on: omit(this.$listeners, 'change'),
                attrs: this.$attrs,
              }}
              onInput={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <label class="bg-input-label" onClick={this.handleLabelClick}>{this.label}</label>
          </div>

          { this.suffix && (
            <div class="bg-input-suffix">
              {this.suffix}
            </div>
          ) }
        </div>
        {
          this.error && (
            <div class="bg-input_bottom_message">
            <span class="error_message">{this.error}</span>
          </div>
          )
        }
      </div>
    );
  },
};

export default LabelInput;
