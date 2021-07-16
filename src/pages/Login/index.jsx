import { Tabs, Divider } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import Schema from 'async-validator';
import produce from 'immer';
import * as API from '@/api/sign';
import { SIGN, GET_PHONE_CODE, GET_EMAIL_CODE, LOGIN } from '@/modules/sign';
import { PHONE, EMAIL } from '@/shared/consts/registerType';
import dateUtils from '@/shared/intl/utils/dateUtils';
import PrimaryButton from '@/shared/components/PrimaryButton';
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
      formError: {},
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

      return validator.validate(this.formData, { first: false })
        .then(() => {
          return true;
        }).catch(({ errors }) => {
          errors.forEach(({ field, message }) => {
            this.$set(this.formError, field, message);
          });

          // const [{ message }] = errors;
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
      this.isVerificationLogin = key === 'verCode';
    },

    handleChangeLoginType() {
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
          <Tabs
            defaultActiveKey="verCode"
            class={styles.tabs}
            onChange={this.handleTabChange}
          >
            <Tabs.TabPane key="verCode" tab="验证码登录" />
            <Tabs.TabPane key="password" tab="密码登录" />
          </Tabs>
          <div class={styles.form}>
            <Form
              formError={this.formError}
              countries={this.countries}
              isPhone={this.isPhone}
              isVerificationLogin={this.isVerificationLogin}
              onValueChange={this.onValueChange}
              formData={this.formData}
              getVerCode={this.getVerCode}
            />
            <PrimaryButton
              loading={this.loginLoading}
              onClick={this.handleSubmit}
            >
              登录
            </PrimaryButton>
            <div class={styles['protocol-link']}>登录即代表你已经同意了《XX协议》</div>

            <Divider>其他登录方式</Divider>

            <div class={styles['login-type']}>
              <span onClick={this.handleChangeLoginType}>
                {this.isPhone ? '邮箱登录' : '手机登录'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export default Login;
