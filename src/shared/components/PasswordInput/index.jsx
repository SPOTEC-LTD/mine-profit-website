import classNames from 'classnames';
import EyeInvisibleFilled from 'ahoney/lib/icons/EyeInvisibleOutlined';
import EyeFilled from 'ahoney/lib/icons/EyeOutlined';
import BgInput from '../BgInput';
import './index.less';

const PasswordInput = {
  props: {
    className: {
      type: String,
    },
  },

  data() {
    return {
      popupShow: false,
      isShowPassword: false,
    };
  },

  methods: {
    handleShowPick() {
      this.popupShow = true;
    },

    getRightIcon() {
      return (
        <span class="password-show-icon" onClick={() => { this.isShowPassword = !this.isShowPassword; }}>
          {this.isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled /> }
        </span>
      );
    },
  },

  render() {
    const finlayProps = {
      on: this.$listeners,
      props: this.$attrs,
    };

    return (
      <BgInput
        class={classNames('password-input', this.className)}
        type={this.isShowPassword ? 'text' : 'password'}
        placeholder={this.$t('signInPwd')}
        {...finlayProps}
        }
      />
    );
  },
};

export default PasswordInput;
