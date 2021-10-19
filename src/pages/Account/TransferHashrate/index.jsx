import { FormModel, Input } from 'ant-design-vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import numberUtils from 'aa-utils/lib/numberUtils';
import ExclamationCircleFilled from 'ahoney/lib/icons/ExclamationCircleFilled';
import * as API from '@/api/account/hashRate';
import { HASH_RATE, HASHRATE_TRANSFER, hashrateStatusMap } from '@/modules/account/hashRate';
import ProductTitle from '@/shared/components/ProductTitle';
import BaseContainer from '@/shared/components/BaseContainer';
import PageButton from '@/shared/components/PageButton';
import FormContainer from '@/shared/components/FormContainer';
import ConfirmModal from '@/shared/components/ConfirmModal';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import { POWER_OFF } from '@/shared/consts/powerStatus';
import locationServices from '@/shared/services/location/locationServices';
import CountDownToLink from '@/shared/components/CountDownToLink';
import getTimes from '@/shared/utils/getTimes';
import { accountHashRateListPath } from '@/router/consts/urls';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import getMinus from '@/shared/utils/getMinus';
import NumberInput from '@/shared/components/NumberInput';
import TradeBeforeVerified from '@/shared/components/TradeBeforeVerified';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';

import styles from './index.less?module';

const { Item } = FormModel;

const HANDLING_FEE = 0.015;
const MIN_PRICE = 0.01;
const MAX_PRICE = 9999.99;

const TransferHashrate = {
  async asyncData(ctx) {
    let props = {
      amount: 0,
      refPrice: 0,
      hashrateType: 'BTC',
      name: '',
      unit: 'T',
      amountBuff: 0,
    };
    const { productTemplateId } = ctx.route.params;
    const { hasPowerOff } = ctx.route.query;

    try {
      const params = { ptId: productTemplateId, hasPowerOff };

      const { body: { c2cTransAmount } } = await API.getTransferableAmount({ pathParams: params }, { ctx });
      props = c2cTransAmount;
    } catch (error) {
      console.log('error', error);
    }

    props.hasPowerOff = hasPowerOff;

    return props;
  },
  data() {
    return {
      isVerificationLogin: false,
      isVisibleTransferPrompt: false,
      isShowPasswordInput: false,
      showCountDownToLink: false,
      formData: {
        amount: '',
        price: '',
      },
    };
  },
  computed: {
    ...mapState({
      submitLoading: state => state.loading.effects[`${HASH_RATE}/${HASHRATE_TRANSFER}`],
    }),
    getPrice() {
      return getTimes({ number: this.formData.price, times: (1 - HANDLING_FEE), isFormat: true });
    },
  },
  created() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },
  methods: {
    ...mapActions(HASH_RATE, [HASHRATE_TRANSFER]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    getReferInfoList() {
      const { refPrice, hasPowerOff, unit } = this;
      const baseList = [
        {
          label: this.$t('transferItemFee'),
          value: `${numberUtils.times(HANDLING_FEE, 100)}%`,
        },
        {
          label: this.$t('transferGetPrice'),
          value: `${this.getPrice} USDT`,
        },
      ];
      const refPriceList = [
        {
          label: this.$t('transferUnitPriceReference'),
          value: `${numberUtils.round(refPrice)} USDT/${unit}`,
        },
      ];

      return hasPowerOff === `${POWER_OFF}` ? baseList : [...refPriceList, ...baseList];
    },

    onPageButtonConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.hasPowerOff === `${POWER_OFF}`) {
            this.isShowPasswordInput = true;
          } else {
            this.isVisibleTransferPrompt = true;
          }
        }
        return false;
      });
    },

    onSubmit(password) {
      const { productTemplateId } = this.$route.params;
      const params = {
        ptId: productTemplateId,
        password,
        hasPowerOff: +this.hasPowerOff,
        ...this.formData,
      };

      this[HASHRATE_TRANSFER](params).then(() => {
        this.isShowPasswordInput = false;
        this.showCountDownToLink = true;
      });
    },

    onRedirectToTransfer() {
      locationServices.push(accountHashRateListPath, {
        query: {
          hashrateType: this.hashrateType,
          activeName: hashrateStatusMap.TRANSFER,
        },
      });
    },
  },

  render() {
    const { hashrateType, name, amountBuff, amount } = this;
    const noBuffAmount = amount - amountBuff;
    const isVisibleFirstPrompt = amountBuff !== '0' && this.formData.amount > noBuffAmount;
    const inBuffAmount = getMinus({ number: this.formData.amount, minuend: noBuffAmount });

    return (
      <div class="page-mid-content">
        <BaseContainer contentClassName={styles.container}>
          <ProductTitle chainType={hashrateType} name={name} />
          <FormContainer>
            <FormModel
              ref="form"
              hideRequiredMark
              props={{ model: this.formData }}
              class="normal-form"
            >
              <Item
                label={this.$t('hashrateOperationTransfer')}
                prop="amount"
                rules={[
                  { required: true, message: this.$t('hashrateOperationTransferRequire'), trigger: 'change' },
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
                    message: this.$t('hashrateOperationTransferThanZero'),
                  },
                ]}
              >
                <NumberInput
                  value={this.formData.amount}
                  max={+this.amount}
                  precision={2}
                  onChange={value => { this.formData.amount = value; }}
                  scopedSlots={{
                    suffix: () => (
                      <div class={styles['amount-input-suffix']}>
                        <span>{this.unit}</span>
                        <span
                        onClick={() => { this.formData.amount = this.amount; this.$refs.form.validateField('amount'); }}
                        >
                          {this.$t('all')}
                        </span>
                      </div>
                    ),
                  }}
                  placeholder={`${this.$t('marketFieldHintMax')}${this.amount}`}
                />
                <div class={styles['transfer-amount-prompt']}>
                  {`${this.$t('transferRemainAmount')}：${this.amount}${this.unit}`}
                </div>
              </Item>
              <Item
                label={this.$t('transferItemPrice')}
                prop="price"
                rules={[
                  { required: true, message: this.$t('transferItemPriceRequire'), trigger: 'change' },
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
                    message: this.$t('transferItemPriceThanZero'),
                  },
                ]}
              >
                <NumberInput
                  value={this.formData.price}
                  onChange={value => { this.formData.price = value; }}
                  max={MAX_PRICE}
                  precision={2}
                  scopedSlots={{
                    suffix: () => `USDT/${this.unit}`,
                  }}
                  placeholder={`${MIN_PRICE}-${MAX_PRICE}`}
                />
              </Item>
              {
                this.getReferInfoList().map(({ value, label }) => (
                  <Item
                    label={label}
                    prop="price"
                  >
                    <Input
                      value={value}
                      disabled
                    />
                  </Item>
                ))
              }
            </FormModel>
          </FormContainer>
        </BaseContainer>
        <ConfirmModal
          onConfirm={() => {
            this.isControlCheck = true;
            this.isVisibleTransferPrompt = false;
          }}
          onCancel={() => { this.isVisibleTransferPrompt = false; }}
          visible={this.isVisibleTransferPrompt}
          confirmButtonText={this.$t('transferContinue')}
        >
          <div class={styles['transfer-prompt']}>
            <ExclamationCircleFilled className={styles['prompt-icon']} />
            {isVisibleFirstPrompt && (
              <div class={styles['dec-content']}>
                <span class={styles['prompt-index']}>1</span>
                <span>{`${bigNumberToFixed(inBuffAmount, 2)}${this.unit} ${this.$t('transferConfirmHint')}`}</span>
              </div>
            )}
            <div class={styles['dec-content']}>
              <span class={styles['prompt-index']}>{isVisibleFirstPrompt ? 2 : ''}</span>
              <span>{this.$t('transferWontOutput')}</span>
            </div>
          </div>
        </ConfirmModal>
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
        <TradeBeforeVerified
          onVerifiedPass={() => { this.isShowPasswordInput = true; }}
          isControlCheck={this.isControlCheck}
        />
        <CountDownToLink
          onConfirm={this.onRedirectToTransfer}
          visible={this.showCountDownToLink}
          operatingSuccess={this.$t('hashratePublishSuccess')}
          promptText={this.$t('hashrateJumpTransfer')}
        />
        <PageButton
          type="primary"
          loading={this.loading}
          onClick={this.onPageButtonConfirm}
        >
          {this.$t('confirmTransfer')}
        </PageButton>
      </div>
    );
  },
};

export default TransferHashrate;
