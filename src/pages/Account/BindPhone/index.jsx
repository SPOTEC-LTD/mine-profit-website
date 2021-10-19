import { FormModel, Input, Select } from 'ant-design-vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import * as API from '@/api/sign';
import { SIGN, GET_PHONE_CODE } from '@/modules/sign';
import { ACCOUNT, BIND_PHONE_OR_EMAIL } from '@/modules/account/account';
import * as verCodeType from '@/shared/consts/verCodeType';
import { PHONE } from '@/shared/consts/registerType';
import BaseContainer from '@/shared/components/BaseContainer';
import { accountDetailPath } from '@/router/consts/urls';
import locationServices from '@/shared/services/location/locationServices';
import PageButton from '@/shared/components/PageButton';
import { phoneReg } from '@/shared/consts/rules';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import Notification from '@/shared/services/Notification';
import { GLOBAL_BUSINESS_EXCEPTION } from '@/shared/utils/request/consts/ResponseCode';
import FetchVerifyCode from '../components/FetchVerifyCode';
import styles from './index.less?module';

const { Item } = FormModel;

const phonePrefixInitValue = '+86';

const BindPhone = {
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
  data() {
    return {
      isCountDown: false,
      form: {
        phone: '',
        code: '',
        phonePrefix: phonePrefixInitValue,
        type: PHONE,
      },
      buttonText: this.$t('fetch'),
    };
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects[`${ACCOUNT}/${BIND_PHONE_OR_EMAIL}`],
    }),
  },
  created() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },
  methods: {
    ...mapActions(SIGN, [GET_PHONE_CODE]),
    ...mapActions(ACCOUNT, [BIND_PHONE_OR_EMAIL]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    getVerCode() {
      this.$refs.ruleForm.validateField('phone', error => {
        if (!error) {
          const params = {
            codeType: verCodeType.BINDING,
            phonePrefix: this.form.phonePrefix,
            phone: this.form.phone,
          };

          this[GET_PHONE_CODE](params).then(() => {
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
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleCountDownFinish() {
      this.isCountDown = false;
    },
    handleAreaCodeChange(value) {
      this.form.phonePrefix = value.label;
    },
    getSelectNode() {
      const lang = this.$i18n.locale;

      return (
        <div>
          <Select
            class={styles.select}
            defaultValue={{ label: this.form.phonePrefix, key: 37 }}
            onChange={this.handleAreaCodeChange}
            showSearch
            optionFilterProp="search"
            labelInValue
            optionLabelProp="label"
            suffixIcon={<TriangleFilled className="select-icon" />}
            dropdownMatchSelectWidth={false}
          >
            {this.countries.map(item => (
              <Select.Option search={`${item.code} ${item[lang]}`} key={item.nation} label={item.code}>
                {`${item.code} ${item[lang]}`}
              </Select.Option>
            ))}
          </Select>
        </div>
      );
    },
  },
  render() {
    return (
      <div class={styles.wrapper}>
        <BaseContainer contentClassName={styles['content-wrap']}>
          <div class={styles['form-wrap']}>
            <FormModel ref="ruleForm" hideRequiredMark props={{ model: this.form }} class="normal-form">
              <Item
                ref="phone"
                label={this.$t('signInPhoneNum')}
                prop="phone"
                rules={[
                  { required: true, message: this.$t('phoneRequired'), trigger: 'change' },
                  {
                    validator: (rule, value) => {
                      if (value && this.form.phonePrefix === phonePrefixInitValue && !phoneReg.test(value)) {
                        return Promise.reject(this.$t('phoneNumberWrongFormat'));
                      }
                      return Promise.resolve();
                    },
                    trigger: 'blur',
                  },
                ]}
              >
                <div class={styles['phone-input']}>
                  {this.getSelectNode()}
                  <Input
                    maxLength={11}
                    v-model={this.form.phone}
                    placeholder={this.$t('fillNeedBindPhone')}
                    onBlur={() => {
                      this.$refs.phone.onFieldBlur();
                    }}
                    onChange={() => {
                      this.$refs.phone.onFieldChange();
                    }}
                  />
                </div>
              </Item>
              <Item
                label={this.$t('verificationCode')}
                prop="code"
                rules={[{ required: true, message: this.$t('verifyCodeRequired'), trigger: 'change' }]}
              >
                <Input
                  maxLength={6}
                  v-model={this.form.code}
                  placeholder={this.$t('fillGetPhoneVerificationCode')}
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

export default BindPhone;
