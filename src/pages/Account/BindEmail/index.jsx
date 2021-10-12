import { FormModel, Input } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import { SIGN, GET_EMAIL_CODE } from '@/modules/sign';
import { ACCOUNT, BIND_PHONE_OR_EMAIL } from '@/modules/account/account';
import * as verCodeType from '@/shared/consts/verCodeType';
import { EMAIL } from '@/shared/consts/registerType';
import { accountDetailPath } from '@/router/consts/urls';
import locationServices from '@/shared/services/location/locationServices';
import PageButton from '@/shared/components/PageButton';
import { emailReg } from '@/shared/consts/rules';
import BaseContainer from '@/shared/components/BaseContainer';
import Notification from '@/shared/services/Notification';
import { GLOBAL_BUSINESS_EXCEPTION } from '@/shared/utils/request/consts/ResponseCode';
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
      loading: state => state.loading.effects[`${ACCOUNT}/${BIND_PHONE_OR_EMAIL}`],
    }),
  },
  methods: {
    ...mapActions(SIGN, [GET_EMAIL_CODE]),
    ...mapActions(ACCOUNT, [BIND_PHONE_OR_EMAIL]),
    getVerCode() {
      this.$refs.ruleForm.validateField('email', error => {
        if (!error) {
          const params = {
            codeType: verCodeType.BINDING,
            email: this.form.email,
          };

          this[GET_EMAIL_CODE](params).then(() => {
            this.isCountDown = true;
            this.buttonText = this.$t('refetch');
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
