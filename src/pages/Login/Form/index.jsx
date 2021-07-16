import PhoneInput from '@/shared/components/PhoneInput';
import VerificationInput from '@/shared/components/VerificationInput';
import BgInput from '@/shared/components/BgInput';
import styles from './index.less?module';

const Form = {
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
    countries: {
      type: Array,
      default: () => [],
    },
    isVerificationLogin: {
      type: Boolean,
    },
    isPhone: {
      type: Boolean,
    },
    getVerCode: {
      type: Function,
    },
  },
  methods: {
    onFieldChange(value, key) {
      this.$emit('valueChange', { key, value });
    },

    getPhoneInputNode() {
      return (
        <PhoneInput
          className={styles['phone-item']}
          countries={this.countries}
          value={this.formData.phone}
          phonePrefix={this.formData.phonePrefix}
          onChange={value => this.onFieldChange(value, 'phone')}
          onPhonePrefixChange={value => this.onFieldChange(value, 'phonePrefix')}
        />
      );
    },
  },

  render() {
    const emailNode = (
      <BgInput
        class={styles['email-input']}
        label={this.$t('signInEmailNum')}
        value={this.formData.email}
        onChange={value => this.onFieldChange(value, 'email')}
      />
    );

    const passwordInputNode = (
      <BgInput
        value={this.formData.password}
        label="密码"
        type="password"
        onChange={value => this.onFieldChange(value, 'password')}
      />
    );

    const verificationInputNode = (
      <VerificationInput
        key={`${this.isPhone}`}
        value={this.formData.code}
        getVerCode={this.getVerCode}
        onInput={value => this.onFieldChange(value, 'code')}
      />
    );

    return (
      <div class={styles.form}>
        {
          this.isPhone ? this.getPhoneInputNode() : emailNode
        }

        {passwordInputNode}

        {emailNode}
        {
          verificationInputNode
        }

        {/* {
          this.isVerificationLogin ? verificationInputNode : passwordInputNode
        } */}
      </div>
    );
  },
};

export default Form;
