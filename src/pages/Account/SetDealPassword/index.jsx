import { FormModel, Input } from 'ant-design-vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import omit from 'lodash/omit';
import * as API from '@/api/account/userInfo';
import { SIGN, GET_EMAIL_CODE, GET_PHONE_CODE } from '@/modules/sign';
import { ACCOUNT, UPDATE_DEAL_PASSWORD } from '@/modules/account/account';
import * as verCodeType from '@/shared/consts/verCodeType';
import { accountDetailPath } from '@/router/consts/urls';
import locationServices from '@/shared/services/location/locationServices';
import PageButton from '@/shared/components/PageButton';
import { emailReg, passwordReg } from '@/shared/consts/rules';
import { PHONE } from '@/shared/consts/registerType';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import BaseContainer from '@/shared/components/BaseContainer';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import Notification from '@/shared/services/Notification';
import { SECTION_BUSINESS_EXCEPTION } from '@/shared/utils/request/consts/ResponseCode';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION,
  UPDATE_CAPTCHA_VERIFICATION,
} from '@/modules/manMachineVerification';
import FetchVerifyCode from '../components/FetchVerifyCode';
import styles from '../index.less?module';

const { Item } = FormModel;

const SetDealPassword = {
  async asyncData(ctx) {
    const { userId } = getUserInfoFunc(ctx);
    const props = { userInfo: {} };

    const getUserBaseInfoPromise = API.getUserBaseInfo({ pathParams: { userId } }, { ctx });

    try {
      const data = await getUserBaseInfoPromise;
      const { body: { userInfo } } = data;
      props.userInfo = userInfo;
    } catch (error) {
      console.log('error', error);
    }

    return props;
  },
  data() {
    return {
      isCountDown: false,
      form: {
        code: '',
        newDealCode: '',
        confirmNewDealCode: '',
      },
      buttonText: this.$t('fetch'),
    };
  },
  computed: {
    ...mapState({
      isVerificationSuccess: state => state.manMachineVerification.isVerificationSuccess,
      isPhoneOrEmailVerification: state => state.manMachineVerification.isPhoneOrEmailVerification,
      captchaVerification: state => state.manMachineVerification.captchaVerification,
      loading: state => state.loading.effects[`${ACCOUNT}/${UPDATE_DEAL_PASSWORD}`],
    }),
    isPhone() {
      return this.userInfo.registerType === PHONE;
    },
    registerAccountValue() {
      const { registerAccount, phonePrefix } = this.userInfo;
      return this.isPhone ? `${phonePrefix} ${registerAccount}` : registerAccount;
    },
  },
  watch: {
    isVerificationSuccess(value) {
      if (value) {
        if (this.isPhoneOrEmailVerification) {
          this.getVerCode();
          this[UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION](false);
        }
      }
    },
  },
  mounted() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },
  methods: {
    ...mapActions(SIGN, [GET_EMAIL_CODE, GET_PHONE_CODE]),
    ...mapActions(ACCOUNT, [UPDATE_DEAL_PASSWORD]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    ...mapMutations(MAN_MACHINE_VERIFICATION, [UPDATE_CAPTCHA_VERIFICATION, UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION]),
    getVerCode() {
      let resultActinType = GET_PHONE_CODE;
      let params = {
        codeType: verCodeType.DEAL,
        phonePrefix: this.userInfo.phonePrefix,
        phone: this.userInfo.registerAccount,
      };

      if (!this.isPhone) {
        resultActinType = GET_EMAIL_CODE;
        params = {
          codeType: verCodeType.DEAL,
          email: this.userInfo.registerAccount,
        };
      }

      if (this.captchaVerification) {
        params.captchaVerification = this.captchaVerification;
        this[UPDATE_CAPTCHA_VERIFICATION]('');
      }

      this[resultActinType](params).then(() => {
        this.isCountDown = true;
        this.buttonText = this.$t('refetch');
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { registerAccount, phonePrefix } = this.userInfo;
          const resultData = omit(this.form, ['confirmNewDealCode']);
          resultData.registerAccount = this.isPhone ? `${phonePrefix}${registerAccount}` : registerAccount;
          this[UPDATE_DEAL_PASSWORD](resultData)
            .then(() => {
              Notification.success(this.$t('setSuccessfully'));
              locationServices.push(accountDetailPath);
            })
            .catch(error => {
              const { isBusinessError, messageDetails, code } = error;
              if (isBusinessError && code === SECTION_BUSINESS_EXCEPTION) {
                const { newDealCode } = messageDetails;
                Notification.error(newDealCode);
              }
            });
        }
        return false;
      });
    },
    handleCountDownFinish() {
      this.isCountDown = false;
    },
    validateConfirmNewDealCode() {
      if (this.form.confirmNewDealCode !== '') {
        this.$refs.ruleForm.validateField('confirmNewDealCode');
      }
    },
  },
  render() {
    const accountLabel = this.isPhone ? this.$t('registerPhone') : this.$t('registerEmail');
    const verificationCodePlaceholder = this.isPhone
      ? this.$t('fillGetPhoneVerificationCode')
      : this.$t('fillGetEmailVerificationCode');
    return (
      <div class={styles.wrapper}>
        <BaseContainer contentClassName={styles['content-wrap']}>
          <div class={styles['form-wrap']}>
            <FormModel ref="ruleForm" hideRequiredMark props={{ model: this.form }} class="normal-form">
              <Item
                label={accountLabel}
                rules={[
                  { required: true, message: this.$t('emailAddressRequire'), trigger: 'change' },
                  {
                    pattern: emailReg,
                    message: this.$t('emailWrongFormat'),
                    trigger: 'blur',
                  },
                ]}
              >
                <Input value={this.registerAccountValue} disabled />
              </Item>
              <Item
                label={this.$t('verificationCode')}
                prop="code"
                rules={[{ required: true, message: this.$t('verifyCodeRequired'), trigger: 'change' }]}
              >
                <Input
                  maxLength={6}
                  v-model={this.form.code}
                  placeholder={verificationCodePlaceholder}
                  scopedSlots={{
                    suffix: () => (
                      <FetchVerifyCode
                        onFinish={this.handleCountDownFinish}
                        value={this.isCountDown}
                        text={this.buttonText}
                        onClick={this.getVerCode}
                      />
                    ),
                  }}
                />
              </Item>
              <Item
                label={this.$t('accountAndSecurityTradePwd')}
                prop="newDealCode"
                rules={[
                  { pattern: passwordReg, message: this.$t('tradePwdSettingPwdTypeTips') },
                  { required: true, message: this.$t('payPwdEmptyHint') },
                ]}
              >
                <Input.Password
                  v-model={this.form.newDealCode}
                  placeholder={this.$t('payInputPwd')}
                  maxLength={20}
                  type="password"
                  onChange={this.validateConfirmNewDealCode}
                />
              </Item>
              <Item
                label={this.$t('tradePwdSettingTradePwdAgain')}
                prop="confirmNewDealCode"
                rules={[
                  { pattern: passwordReg, message: this.$t('tradePwdSettingPwdTypeTips') },
                  { required: true, message: this.$t('confirmNewDealCodeRequired') },
                  {
                    validator: (rule, value) => {
                      if (value && this.form.newDealCode !== '' && value !== this.form.newDealCode) {
                        return false;
                      }

                      return true;
                    },
                    message: this.$t('twoPasswordNotEqual'),
                  },
                ]}
              >
                <Input.Password
                  v-model={this.form.confirmNewDealCode}
                  placeholder={this.$t('tradePwdSettingTradePwdAgainHint')}
                  maxLength={20}
                  type="password"
                />
              </Item>
            </FormModel>
          </div>
        </BaseContainer>
        <PageButton type="primary" loading={this.loading} onClick={this.onSubmit}>
          {this.$t('confirm')}
        </PageButton>
      </div>
    );
  },
};

export default SetDealPassword;
