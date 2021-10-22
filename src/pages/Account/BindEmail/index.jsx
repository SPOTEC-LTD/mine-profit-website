import { FormModel, Input } from 'ant-design-vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import { SIGN, GET_EMAIL_CODE } from '@/modules/sign';
import { ACCOUNT, BIND_PHONE_OR_EMAIL } from '@/modules/account/account';
import * as verCodeType from '@/shared/consts/verCodeType';
import { EMAIL } from '@/shared/consts/registerType';
import { accountDetailPath } from '@/router/consts/urls';
import locationServices from '@/shared/services/location/locationServices';
import PageButton from '@/shared/components/PageButton';
import { emailReg } from '@/shared/consts/rules';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import BaseContainer from '@/shared/components/BaseContainer';
import Notification from '@/shared/services/Notification';
import { GLOBAL_BUSINESS_EXCEPTION, MAN_MACHINE_VERIFICATION_CODE } from '@/shared/utils/request/consts/ResponseCode';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION,
  UPDATE_CAPTCHA_VERIFICATION,
} from '@/modules/manMachineVerification';
import FetchVerifyCode from '../components/FetchVerifyCode';
import styles from '../index.less?module';

const { Item } = FormModel;

const BindEmail = {
  data() {
    return {
      isCountDown: false,
      form: {
        email: '',
        code: '',
        type: EMAIL,
      },
      buttonText: this.$t('fetch'),
    };
  },
  computed: {
    ...mapState({
      isVerificationSuccess: state => state.manMachineVerification.isVerificationSuccess,
      isPhoneOrEmailVerification: state => state.manMachineVerification.isPhoneOrEmailVerification,
      captchaVerification: state => state.manMachineVerification.captchaVerification,
      loading: state => state.loading.effects[`${ACCOUNT}/${BIND_PHONE_OR_EMAIL}`],
    }),
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
    ...mapActions(SIGN, [GET_EMAIL_CODE]),
    ...mapActions(ACCOUNT, [BIND_PHONE_OR_EMAIL]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    ...mapMutations(MAN_MACHINE_VERIFICATION, [UPDATE_CAPTCHA_VERIFICATION, UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION]),
    getVerCode() {
      this.$refs.ruleForm.validateField('email', error => {
        if (!error) {
          const params = {
            codeType: verCodeType.BINDING,
            email: this.form.email,
          };

          if (this.captchaVerification) {
            params.captchaVerification = this.captchaVerification;
            this[UPDATE_CAPTCHA_VERIFICATION]('');
          }

          this[GET_EMAIL_CODE](params).then(() => {
            this.isCountDown = true;
            this.buttonText = this.$t('refetch');
          }).catch(({ code }) => {
            if (code === MAN_MACHINE_VERIFICATION_CODE) {
              this[UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION](true);
            }
          });
        }
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this[BIND_PHONE_OR_EMAIL](this.form)
            .then(() => {
              Notification.success(this.$t('bindSuccess'));
              locationServices.push(accountDetailPath);
            })
            .catch(({ code, message }) => {
              if (GLOBAL_BUSINESS_EXCEPTION !== code) {
                Notification.error(message);
              }
            });
        }
        return false;
      });
    },
    handleCountDownFinish() {
      this.isCountDown = false;
    },
  },
  render() {
    return (
      <div class={styles.wrapper}>
        <BaseContainer contentClassName={styles['content-wrap']}>
          <div class={styles['form-wrap']}>
            <FormModel ref="ruleForm" hideRequiredMark props={{ model: this.form }} class="normal-form">
              <Item
                label={this.$t('emailAddress')}
                prop="email"
                rules={[
                  { required: true, message: this.$t('emailAddressRequire'), trigger: 'change' },
                  {
                    pattern: emailReg,
                    message: this.$t('emailWrongFormat'),
                    trigger: 'blur',
                  },
                ]}
              >
                <Input v-model={this.form.email} placeholder={this.$t('fillNeedBindEmail')} />
              </Item>
              <Item
                label={this.$t('verificationCode')}
                prop="code"
                rules={[{ required: true, message: this.$t('verifyCodeRequired'), trigger: 'change' }]}
              >
                <Input
                  maxLength={6}
                  v-model={this.form.code}
                  placeholder={this.$t('fillGetEmailVerificationCode')}
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

export default BindEmail;
