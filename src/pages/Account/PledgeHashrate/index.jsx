import { Select, FormModel, Input } from 'ant-design-vue';
import numberUtils from 'aa-utils/lib/numberUtils';
import { mapActions, mapState } from 'vuex';
import * as API from '@/api/account/hashRate';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import { accountHashRateListPath } from '@/router/consts/urls';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import ProductTitle from '@/shared/components/ProductTitle';
import { HASH_RATE, HASHRATE_PLEDGE, hashrateStatusMap } from '@/modules/account/hashRate';
import getTimes from '@/shared/utils/getTimes';
import { SELLING_PRICE_CHANGE } from '@/shared/utils/request/consts/ResponseCode';
import Notification from '@/shared/services/Notification';
import PageButton from '@/shared/components/PageButton';
import BaseContainer from '@/shared/components/BaseContainer';
import FormContainer from '@/shared/components/FormContainer';
import NumberInput from '@/shared/components/NumberInput';
import CountDownToLink from '@/shared/components/CountDownToLink';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import locationServices from '@/shared/services/location/locationServices';
import ShareQrCodeModal from '@/shared/components/ShareQrCodeModal';
import { getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import styles from './index.less?module';

const { Item } = FormModel;
const MAX_CANCEL_COUNT = 10;

const PledgeHashrate = {
  async asyncData(ctx) {
    const { userId } = getUserInfoFunc(ctx);

    const props = {
      hashratePledgeInfo: {
        maxPledgePortion: 0,
        maxPledgeAmount: 0,
        hashrateUnitPrice: 0,
        annualRate: 0,
        eachHashrateAmount: 0,
        unit: '-',
        name: '--',
        hashrateType: ctx.query.hashrateType,
      },
      pledgeDurationList: [],
    };

    const fetchPledgeDurationList = API.getPledgeDurationList({}, { ctx });
    const fetchHashRatePledgeDetail = API.getHashRatePledgeDetail(
      { pathParams: { userId, ...ctx.params }, data: { ...ctx.query } },
      { ctx },
    );

    try {
      const { body: { hashratePledgeInfo } } = await fetchHashRatePledgeDetail;
      props.hashratePledgeInfo = hashratePledgeInfo;
    } catch (error) {
      console.log('error', error);
    }

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
      nowLanguage: getLocalLanguage(),
    };
  },
  computed: {
    ...mapState({
      submitLoading: state => state.loading.effects[`${HASH_RATE}/${HASHRATE_PLEDGE}`],
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
  mounted() {
    const { pledgeCount } = this.hashratePledgeInfo;
    const canCancelCount = MAX_CANCEL_COUNT - pledgeCount;
    if (canCancelCount <= 3 && canCancelCount > 0) {
      Notification.error(this.$t('pledgeRemainCount', { pledgeCount: canCancelCount }));
    }
  },
  methods: {
    ...mapActions(HASH_RATE, [HASHRATE_PLEDGE]),
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
    onSubmit(password) {
      const { source, annualRate, id, productTemplateId, sourceType, hashrateUnitPrice } = this.hashratePledgeInfo;
      this[HASHRATE_PLEDGE]({
        annualRate,
        dealCode: password,
        hashrateUnitPrice,
        id,
        pledgeDuration: this.formData.pledgeDuration,
        pledgePortion: this.formData.pledgePortion,
        source,
        sourceType,
        productTemplateId,
      })
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
    const { hashrateType, maxPledgePortion, name } = this.hashratePledgeInfo;
    // eslint-disable-next-line max-len
    const link = `${process.env.MOBILE_SITE_HOST}/shareItem/pledges/${this.pledgeId}?locale=${this.nowLanguage}`;

    return (
      <div class={styles.wrapper}>
        <BaseContainer contentClassName={styles.container}>
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
                          }}
                        >
                          {this.$t('all')}
                        </span>
                      </div>
                    ),
                  }}
                  placeholder={`${this.$t('marketFieldHintMax')}${maxPledgePortion}`}
                />
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
        </BaseContainer>
        <ConfirmPayDialog
          onCancel={() => {
            this.isShowPasswordInput = false;
            this.isControlCheck = false;
          }}
          loading={this.submitLoading}
          onConfirm={this.onSubmit}
          visible={this.isShowPasswordInput}
          title={this.$t('transferItemAmount')}
        />
        <CountDownToLink
          onConfirm={() => {
            this.showShareQrCodeModal = true;
            this.showCountDownToLink = false;
          }}
          show={this.showCountDownToLink}
          operatingSuccess={this.$t('hashratePledgeSuccess')}
        />
        <ShareQrCodeModal
          value={this.showShareQrCodeModal}
          onClose={this.onRedirectToPledge}
          maskClosable={false}
          title={this.$t('myInvitationQRCode')}
          content={link}
        />
        <PageButton class={styles.button} type="primary" loading={this.loading} onClick={this.onPageButtonConfirm}>
          {this.$t('confirmPledge')}
        </PageButton>
      </div>
    );
  },
};

export default PledgeHashrate;
