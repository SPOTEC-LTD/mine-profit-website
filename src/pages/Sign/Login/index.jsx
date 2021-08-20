import { Tabs } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import Schema from 'async-validator';
import PhoneFilled from 'ahoney/lib/icons/PhoneFilled';
import EmailFilled from 'ahoney/lib/icons/EmailFilled';
import * as API from '@/api/sign';
import { SIGN, GET_PHONE_CODE, GET_EMAIL_CODE, LOGIN } from '@/modules/sign';
import { PHONE, EMAIL } from '@/shared/consts/registerType';
import dateUtils from '@/shared/intl/utils/dateUtils';
import PrimaryButton from '@/shared/components/PrimaryButton';
import { passwordReg, phoneReg } from '@/shared/consts/rules';
import * as verCodeType from '@/shared/consts/verCodeType';
import Notification from '@/shared/services/Notification';
import { SECTION_BUSINESS_EXCEPTION } from '@/shared/utils/request/consts/ResponseCode';
import Link from '@/shared/components/Link';
import { serviceProtocolPath, privacyProtocolPath } from '@/router/consts/urls';
import storageUserInfo from './storageUserInfo';
import Form from './Form';
import styles from './index.less?module';

const phonePrefixInitValue = '+86';

const Login = {
  data() {
    return {
      isVerificationLogin: true,
      formData: {
        code: '',
        email: '',
        phone: '',
        phonePrefix: phonePrefixInitValue,
        timeZone: dateUtils.getTimeZone(),
        type: PHONE,
        password: '',
      },
      formError: {

      },
      isVisibleServiceProtocol: false,
      isVisiblePrivacyProtocol: false,
    };
  },

  async asyncData(ctx) {
    const props = {
      countries: [],
    };

    try {
      const { body: { list } } = await API.getCountries({}, { ctx });
      props.countries = list;
    } catch (error) {
      console.log(error, 'error');
    }

    return props;
  },

  computed: {
    ...mapState({ loginLoading: state => state.loading.effects[`${SIGN}/${LOGIN}`] }),
    isPhone() {
      return this.formData.type === PHONE;
    },
  },

  methods: {
    ...mapActions(SIGN, [GET_PHONE_CODE, GET_EMAIL_CODE, LOGIN]),
    validatorForm(keys) {
      const descriptor = {
        code: {
          type: 'string',
          required: true,
          message: this.$t('verifyCodeRequired'),
        },

        email: [
          { required: true, message: this.$t('emailRequired') },
          { type: 'email', message: this.$t('emailWrongFormat') },
        ],
        phone: [
          { required: true, message: this.$t('phoneRequired') },
          {
            asyncValidator: (rule, value) => {
              return new Promise((resolve, reject) => {
                if (value && this.formData.phonePrefix === phonePrefixInitValue && !phoneReg.test(value)) {
                  reject(true);
                } else {
                  resolve();
                }
              });
            },
            message: this.$t('phoneNumberWrongFormat'),
          },
        ],

        password: [
          { type: 'string', required: true, message: this.$t('passwordRequired') },
          { pattern: passwordReg, message: this.$t('passwordRules') },
        ],
      };

      const resultDescriptor = {};
      keys.forEach(key => {
        resultDescriptor[key] = descriptor[key];
      });

      const validator = new Schema(resultDescriptor);

      return validator.validate(this.formData, { first: false })
        .then(() => {
          return true;
        }).catch(({ errors }) => {
          errors.forEach(({ field, message }) => {
            this.$set(this.formError, field, message);
          });
          return false;
        });
    },

    handleTabChange(key) {
      this.formData.code = '';
      this.formData.password = '';
      this.isVerificationLogin = key === 'verCode';
    },

    handleChangeLoginType() {
      this.formError = {};

      if (this.isPhone) {
        this.formData.type = EMAIL;
      } else {
        this.formData.type = PHONE;
      }
    },

    onValueChange({ key, value }) {
      this.formData[key] = value;
      if (this.formError[key]) {
        this.$set(this.formError, key, '');
      }
    },

    async getVerCode() {
      const validatorKey = this.isPhone ? ['phone'] : ['email'];
      const isValidatorPass = await this.validatorForm(validatorKey);
      if (!isValidatorPass) {
        return Promise.reject();
      }

      let resultActinType = GET_PHONE_CODE;
      let params = {
        codeType: verCodeType.LOGIN,
        phonePrefix: this.formData.phonePrefix,
        phone: this.formData.phone,
      };

      if (!this.isPhone) {
        resultActinType = GET_EMAIL_CODE;
        params = {
          codeType: verCodeType.LOGIN,
          email: this.formData.email,
        };
      }
      /// codeType 获取验证码类型,可用值:BINDING,DEAL,LOGIN,PASSWORD
      this[resultActinType](params);
      return Promise.resolve();
    },

    async handleSubmit(e) {
      e.preventDefault();

      const validatorKeys = this.isPhone ? ['phone'] : ['email'];
      if (this.isVerificationLogin) {
        validatorKeys.push('code');
      } else {
        validatorKeys.push('password');
      }

      const isValidatorPass = await this.validatorForm(validatorKeys);
      if (isValidatorPass) {
        const paramsData = { ...this.formData };

        paramsData.isVerificationLogin = this.isVerificationLogin;
        if (this.isPhone) {
          delete paramsData.email;
        } else {
          delete paramsData.phone;
          delete paramsData.phonePrefix;
        }

        if (this.isVerificationLogin) {
          delete paramsData.password;
        } else {
          delete paramsData.code;
        }

        this[LOGIN](paramsData)
          .then(result => {
            storageUserInfo(result);
          })
          .catch(({ message, code }) => {
            if (code === SECTION_BUSINESS_EXCEPTION) {
              Notification.error(message);
            }
          });
      }
    },
  },

  render() {
    return (
      <div class={styles.login}>
        <div class={styles['login-content']}>
          <div class={styles['login-title']}>
            <div>{this.$t('loginMineprofit')}</div>
            <div>{this.$t('signInTips')}</div>
          </div>
          <Tabs
            defaultActiveKey="verCode"
            class={styles.tabs}
            onChange={this.handleTabChange}
          >
            <Tabs.TabPane key="verCode" tab={this.$t('signInVerifyCode')} />
            <Tabs.TabPane key="password" tab={this.$t('signInPwd')} />
          </Tabs>
            <div class={styles.form}>
              <form onSubmit={this.handleSubmit}>
                <Form
                  formError={this.formError}
                  countries={this.countries}
                  isPhone={this.isPhone}
                  isVerificationLogin={this.isVerificationLogin}
                  onValueChange={this.onValueChange}
                  formData={this.formData}
                  getVerCode={this.getVerCode}
                />

                <div class={styles['login-type']} onClick={this.handleChangeLoginType}>
                  {
                    this.isPhone ?
                      <div class={styles['login-type-content']}>
                        <EmailFilled />
                        <span>{this.$t('emailLogin')}</span>
                      </div>
                      :
                      <div class={styles['login-type-content']}>
                        <PhoneFilled />
                        <span>{this.$t('phoneLogin')}</span>
                      </div>
                  }
                </div>
                <PrimaryButton
                  loading={this.loginLoading}
                  htmlType="submit"
                >
                  {this.$t('login')}
                </PrimaryButton>
              </form>
            <div class={styles['protocol-link']}>
              <span>{this.$t('loginMeansAgreed')}</span>
              <Link to={serviceProtocolPath} target="_blank">{`《${this.$t('serviceProtocolName')}》`}</Link>
              <Link to={privacyProtocolPath} target="_blank">{`《${this.$t('privacyProtocolName')}》`}</Link>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export default Login;
