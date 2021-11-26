import { mapState, mapMutations } from 'vuex';
import classNames from 'classnames';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION,
} from '@/modules/manMachineVerification';
import Countdown from './Countdown';
import LabelInput from '../LabelInput';

import './index.less';

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
  computed: {
    ...mapState({
      isVerificationSuccess: state => state.manMachineVerification.isVerificationSuccess,
      isPhoneOrEmailVerification: state => state.manMachineVerification.isPhoneOrEmailVerification,
    }),
  },
  watch: {
    isVerificationSuccess(value) {
      if (value) {
        if (this.isPhoneOrEmailVerification) {
          this.handleGetVerCode();
          this[UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION](false);
        }
      }
    },
  },
  methods: {
    ...mapMutations(MAN_MACHINE_VERIFICATION, [UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION]),
    handleGetVerCode() {
      this.getVerCode().then(() => {
        this.isCountDown = true;
      });
    },

    handleCountDownFinish() {
      this.isCountDown = false;
    },

  },

  render() {
    const finlayProps = {
      on: this.$listeners,
      attrs: this.$attrs,
    };

    return (
      <LabelInput
        class={classNames('verification-input', this.className)}
        label={this.$t('verificationCode')}
        suffix={
          <Countdown
            value={this.isCountDown}
            onClick={this.handleGetVerCode}
            showDivider={this.showDivider}
            onFinish={this.handleCountDownFinish}
          />
        }
        {...finlayProps}
      />
    );
  },
};

export default VerificationInput;
