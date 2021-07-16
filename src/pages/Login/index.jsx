import { Tabs } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import Schema from 'async-validator';
import produce from 'immer';
import * as API from '@/api/sign';
import { SIGN, GET_PHONE_CODE, GET_EMAIL_CODE, LOGIN } from '@/modules/sign';
import { PHONE, EMAIL } from '@/shared/consts/registerType';
import dateUtils from '@/shared/intl/utils/dateUtils';
import { passwordReg, phoneReg } from '@/shared/consts/rules';
import * as verCodeType from '@/shared/consts/verCodeType';
// import storageUserInfo from './storageUserInfo';
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
      isVisibleServiceProtocol: false,
      isVisiblePrivacyProtocol: false,
    };
  },

  async asyncData(ctx) {
    const { body: { list } } = await API.getCountries({}, { ctx });

    return { countries: list };
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

      return validator.validate(this.formData, { first: true })
        .then(() => {
          return true;
        }).catch(({ errors }) => {
          const [{ message }] = errors;
          // Toast({
          //   message,
          //   icon: 'warning-o',
          //   duration: 1000,
          //   className: styles['toast-info'],
          // });
          return false;
        });
    },

    handleTabChange(key) {
      this.formData.type = key;
      this.formData.code = '';
    },

    handleChangeLoginType() {
      this.isVerificationLogin = !this.isVerificationLogin;
    },

    onValueChange({ key, value }) {
      this.formData[key] = value;
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

    async handleSubmit() {
      const validatorKeys = this.isPhone ? ['phone'] : ['email'];
      if (this.isVerificationLogin) {
        validatorKeys.push('code');
      } else {
        validatorKeys.push('password');
      }

      const isValidatorPass = await this.validatorForm(validatorKeys);
      if (isValidatorPass) {
        const data = produce(this.formData, draft => {
          draft.isVerificationLogin = this.isVerificationLogin;
          if (this.isVerificationLogin) {
            delete draft.password;
          } else {
            delete draft.code;
          }
        });

        // this[LOGIN](data)
        //   .then(result => {
        //     Toast({
        //       message: this.$t('loginSuccess'),
        //       icon: 'warning-o',
        //       duration: 1000,
        //     });
        //     storageUserInfo(result);
        //   })
        //   .catch(({ message }) => {
        //     Toast({
        //       message,
        //       icon: 'warning-o',
        //       duration: 1000,
        //       className: styles['toast-info'],
        //     });
        //   });
      }
    },
  },

  render() {
    return (
      <div class={styles.login}>
        <div class={styles['login-content']}>
          <div class={styles['login-title']}>
            <div>登录Mineprofit</div>
            <div>未注册账号将直接注册并登录</div>
          </div>
          <Tabs defaultActiveKey="1" class={styles.tabs}>
            <Tabs.TabPane key="1" tab="验证码登录" />
            <Tabs.TabPane key="2" tab="密码登录" />
          </Tabs>
          <div>
            <Form
              countries={this.countries}
              isPhone={this.isPhone}
              isVerificationLogin={this.isVerificationLogin}
              onValueChange={this.onValueChange}
              formData={this.formData}
              getVerCode={this.getVerCode}
            />
          </div>
        </div>

      </div>
    );
  },
};

export default Login;
