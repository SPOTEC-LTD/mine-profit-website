import { Statistic } from 'ant-design-vue';
import classNames from 'classnames';
import BgInput from '../BgInput';

import './index.less';

// const { Countdown } = Statistic;

const VerificationInput = {
  inheritAttrs: false,
  props: {
    className: String,
    getVerCode: Function,
    showDivider: Boolean,
  },

  data() {
    return { isCountDown: false };
  },

  methods: {
    handleGetVerCode() {
      // this.getVerCode().then(() => {
        this.isCountDown = true;
      // });
    },

    handleCountDownFinish() {
      this.isCountDown = false;
    },

    getButton() {
      return (
        <div class="ver-send-button">
          {
            this.showDivider && <div class="ver-divider" />
          }
          {
          this.isCountDown
            ? (
            <Statistic.Countdown
              value={Date.now() + 1000 * 60}
              format="ss"
              onFinish={this.handleCountDownFinish}
            />)
            : <div onClick={this.handleGetVerCode}>{this.$t('fetchVerificationCode')}</div>
          }
        </div>
      );
    },
  },

  render() {
    const finlayProps = {
      on: this.$listeners,
      attrs: this.$attrs,
    };

    return (
      <BgInput
        class={classNames('verification-input', this.className)}
        label={this.$t('verificationCode')}
        suffix={this.getButton()}
        {...finlayProps}
      />
    );
  },
};

export default VerificationInput;
