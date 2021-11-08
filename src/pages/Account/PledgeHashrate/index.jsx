import numberUtils from 'aa-utils/lib/numberUtils';
import { mapActions, mapState, mapMutations } from 'vuex';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import { Select, FormModel, Input, Spin } from 'ant-design-vue';
import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';
import * as API from '@/api/account/hashRate';
import getTimes from '@/shared/utils/getTimes';
import locationHelp from '@/shared/utils/locationHelp';
import { accountHashRateListPath, pledgeHelpPath } from '@/router/consts/urls';
import ProductTitle from '@/shared/components/ProductTitle';
import { HASH_RATE, HASHRATE_PLEDGE, GET_HASHRATE_PLEDGE_INFO, hashrateStatusMap } from '@/modules/account/hashRate';
import { SELLING_PRICE_CHANGE, MAN_MACHINE_VERIFICATION_CODE } from '@/shared/utils/request/consts/ResponseCode';
import Notification from '@/shared/services/Notification';
import PageButton from '@/shared/components/PageButton';
import BaseContainer from '@/shared/components/BaseContainer';
import FormContainer from '@/shared/components/FormContainer';
import NumberInput from '@/shared/components/NumberInput';
import CountDownToLink from '@/shared/components/CountDownToLink';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import locationServices from '@/shared/services/location/locationServices';
import ShareQrCodeModal from '@/shared/components/ShareQrCodeModal';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import { getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import { CLOSE } from '@/pages/Account/HashRate/consts/pledgeSourceType';
import localStorage from '@/shared/utils/localStorage';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_IS_DEAL_PASSWORD_VERIFICATION,
  UPDATE_CAPTCHA_VERIFICATION,
} from '@/modules/manMachineVerification';
import styles from './index.less?module';

const { Item } = FormModel;
const MAX_CANCEL_COUNT = 10;

const PledgeHashrate = {
  async asyncData(ctx) {
    const props = {
      pledgeDurationList: [],
    };

    const fetchPledgeDurationList = API.getPledgeDurationList({}, { ctx });

    try {
      const { body: { list } } = await fetchPledgeDurationList;
      props.pledgeDurationList = list;
    } catch (error) {
      console.log('error', error);
    }

    return props;
  },
  data() {
    return {
      isShowPasswordInput: false,
      showCountDownToLink: false,
      showShareQrCodeModal: false,
      pledgeId: '',
      formData: {
        pledgePortion: '',
        pledgeDuration: null,
      },
      pledgeDurationText: '',
      password: '',
      nowLanguage: getLocalLanguage(),
    };
  },
  computed: {
    ...mapState({
      captchaVerification: state => state.manMachineVerification.captchaVerification,
      isVerificationSuccess: state => state.manMachineVerification.isVerificationSuccess,
      isDealPasswordVerification: state => state.manMachineVerification.isDealPasswordVerification,
      submitLoading: state => state.loading.effects[`${HASH_RATE}/${HASHRATE_PLEDGE}`],
      fetchInfoLoading: state => state.loading.effects[`${HASH_RATE}/${GET_HASHRATE_PLEDGE_INFO}`],
      hashratePledgeInfo: state => state.hashRate.hashratePledgeInfo,
    }),
    pledgeGetHashrate() {
      return numberUtils.times(this.formData.pledgePortion, this.hashratePledgeInfo.eachHashrateAmount);
    },
    subscriptionPrice() {
      return getTimes({ number: this.pledgeGetHashrate, times: this.hashratePledgeInfo.hashrateUnitPrice });
    },
    columns() {
      return this.pledgeDurationList.map(item => {
        return {
          text: `${item} ${this.$t('day')}`,
          value: item,
        };
      });
    },
  },
  watch: {
    isVerificationSuccess(value) {
      if (value) {
        if (this.isDealPasswordVerification) {
          this.onSubmit();
          this[UPDATE_IS_DEAL_PASSWORD_VERIFICATION](false);
        }
      }
    },
  },
  mounted() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
    const { productTemplateId } = this.$route.params;
    const { source, id, sourceType, hashrateType } = this.$route.query;
    const params = +source === CLOSE ? { source, id, sourceType, hashrateType } : { source };

    this[GET_HASHRATE_PLEDGE_INFO]({ productTemplateId, ...params }).then(() => {
      const { pledgeCount } = this.hashratePledgeInfo;
      const canCancelCount = MAX_CANCEL_COUNT - pledgeCount;
      if (canCancelCount <= 3 && canCancelCount > 0) {
        Notification.error(this.$t('pledgeRemainCount', { pledgeCount: canCancelCount }));
      }
    });
  },
  methods: {
    ...mapActions(HASH_RATE, [HASHRATE_PLEDGE, GET_HASHRATE_PLEDGE_INFO]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    ...mapMutations(MAN_MACHINE_VERIFICATION, [UPDATE_IS_DEAL_PASSWORD_VERIFICATION, UPDATE_CAPTCHA_VERIFICATION]),
    onPageButtonConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isShowPasswordInput = true;
        }
        return false;
      });
    },
    onRedirectToPledge() {
      this.showShareQrCodeModal = false;
      locationServices.push(accountHashRateListPath, {
        query: {
          hashrateType: this.hashratePledgeInfo.hashrateType,
          activeName: hashrateStatusMap.PLEDGES,
        },
      });
    },
    linkToPledgeHelp() {
      const { userId } = localStorage.getObject('userInfo');
      locationHelp.open(pledgeHelpPath, { params: { userId } });
    },
    pledgeHelp() {
      return (
        <div class={styles['pledge-help']} onClick={this.linkToPledgeHelp}>
          <span>{this.$t('pledgeHelp')}</span>
          <InfoCircleFilled />
        </div>
      );
    },
    onSubmit(password) {
      this.password = password || this.password;
      const { source, annualRate, id, productTemplateId, sourceType, hashrateUnitPrice } = this.hashratePledgeInfo;
      const data = {
        annualRate,
        dealCode: this.password,
        hashrateUnitPrice,
        id,
        pledgeDuration: this.formData.pledgeDuration,
        pledgePortion: this.formData.pledgePortion,
        source,
        sourceType,
        productTemplateId,
      };

      if (this.captchaVerification) {
        data.captchaVerification = this.captchaVerification;
        this[UPDATE_CAPTCHA_VERIFICATION]('');
      }

      this[HASHRATE_PLEDGE](data)
        .then(pledgeId => {
          this.pledgeId = pledgeId;
          this.showCountDownToLink = true;
          this.isShowPasswordInput = false;
        })
        .catch(error => {
          const { message, code } = error;
          if (code === SELLING_PRICE_CHANGE) {
            Notification.error(message);
            this.isShowPasswordInput = false;
            setTimeout(() => {
              window.$nuxt.refresh();
            }, 3000);
          }
          if (code === MAN_MACHINE_VERIFICATION_CODE) {
            this[UPDATE_IS_DEAL_PASSWORD_VERIFICATION](true);
          }
        });
    },
    getReferInfoList() {
      const { unit, annualRate } = this.hashratePledgeInfo;
      return [
        {
          label: this.$t('pledgeGetHashrate'),
          value: `${this.formData.pledgePortion || 0}${this.$t('part')}/${this.pledgeGetHashrate}${unit}`,
        },
        {
          label: this.$t('pledgeSellPrice'),
          value: `${this.subscriptionPrice} USDT`,
        },
        {
          label: this.$t('pledgeAnnualRate'),
          value: `${getTimes({ number: annualRate, times: 100 })} %`,
        },
      ];
    },
  },
  render() {
    const {
      hashrateType = this.$route.query.hashrateType, maxPledgePortion, name, maxPledgeAmount, unit,
    } = this.hashratePledgeInfo;
    // eslint-disable-next-line max-len
    const link = `${process.env.MOBILE_SITE_HOST}/shareItem/pledges/${this.pledgeId}?locale=${this.nowLanguage}`;

    return (
      <div class="page-mid-content">
        <BaseContainer contentClassName={styles.container}>
          <Spin spinning={this.fetchInfoLoading}>
            <ProductTitle chainType={hashrateType} name={name} />
            <FormContainer>
              <FormModel ref="form" hideRequiredMark props={{ model: this.formData }} class="normal-form">
                <Item
                  label={this.$t('pledgeAmount')}
                  prop="pledgePortion"
                  rules={[
                    { required: true, message: this.$t('hashrateOperationPledgeRequire'), trigger: 'change' },
                    {
                      validator: (rule, value) => {
                        return new Promise((resolve, reject) => {
                          if (value && value === '0') {
                            reject(true);
                          } else {
                            resolve();
                          }
                        });
                      },
                      message: this.$t('hashrateOperationPledgeThanZero'),
                    },
                  ]}
                >
                  <NumberInput
                    value={this.formData.pledgePortion}
                    max={+maxPledgePortion}
                    precision={2}
                    onChange={value => {
                      this.formData.pledgePortion = value;
                    }}
                    scopedSlots={{
                      suffix: () => (
                        <div class={styles['amount-input-suffix']}>
                          <span>{this.$t('part')}</span>
                          <span
                            onClick={() => {
                              this.formData.pledgePortion = `${maxPledgePortion}`;
                              this.$refs.form.validateField('pledgePortion');
                            }}
                          >
                            {this.$t('all')}
                          </span>
                        </div>
                      ),
                    }}
                    placeholder={`${this.$t('marketFieldHintMax')}${maxPledgePortion}`}
                  />
                  <div class={styles['pledge-amount-prompt']}>
                    {`${this.$t('pledgeCanPledgeAmount')}：${maxPledgeAmount}${unit}`}
                  </div>
                </Item>
                <Item
                  label={this.$t('pledgeDuration')}
                  prop="pledgeDuration"
                  rules={[{ required: true, message: this.$t('pleaseSelectPledgeDuration'), trigger: 'change' }]}
                >
                  <Select
                    placeholder={this.$t('pleaseSelectPledgeDuration')}
                    onChange={value => {
                      this.formData.pledgeDuration = value;
                    }}
                    suffixIcon={<TriangleFilled className="select-icon" />}
                  >
                    {this.pledgeDurationList.map(item => (
                      <Select.Option value={item}>{`${item}${this.$t('day')}`}</Select.Option>
                    ))}
                  </Select>
                </Item>
                {this.getReferInfoList().map(({ value, label }) => (
                  <Item label={label}>
                    <Input value={value} disabled />
                  </Item>
                ))}
              </FormModel>
            </FormContainer>
          </Spin>
        </BaseContainer>
        <ConfirmPayDialog
          onCancel={() => {
            this.isShowPasswordInput = false;
            this.isControlCheck = false;
          }}
          loading={this.submitLoading}
          onConfirm={this.onSubmit}
          visible={this.isShowPasswordInput}
          prompt={this.$t('hashratePledgeConfirmHint')}
          hasProtocol
        />
        <CountDownToLink
          onConfirm={() => {
            this.showShareQrCodeModal = true;
            this.showCountDownToLink = false;
          }}
          visible={this.showCountDownToLink}
          operatingSuccess={this.$t('hashratePledgeSuccess')}
        />
        <ShareQrCodeModal
          value={this.showShareQrCodeModal}
          onClose={this.onRedirectToPledge}
          title={this.$t('myHashratePledgeShare')}
          content={link}
        />
        <PageButton
          type="primary"
          loading={this.loading}
          onClick={this.onPageButtonConfirm}
          scopedSlots={{ rightContent: this.pledgeHelp }}
        >
          {this.$t('confirmPledge')}
        </PageButton>
      </div>
    );
  },
};

export default PledgeHashrate;
