import { Statistic } from 'ant-design-vue';
import { mapState, mapMutations } from 'vuex';
import classNames from 'classnames';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION,
} from '@/modules/manMachineVerification';
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
                  suffix="s"
                  onFinish={this.handleCountDownFinish}
                />
            )
            : <div class="get-vercode-button" onClick={this.handleGetVerCode}>{this.$t('fetchVerificationCode')}</div>
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
      <LabelInput
        class={classNames('verification-input', this.className)}
        label={this.$t('verificationCode')}
        suffix={this.getButton()}
        {...finlayProps}
      />
    );
  },
};

export default VerificationInput;
