import { FormModel, Input } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import numberUtils from 'aa-utils/lib/numberUtils';
import ExclamationCircleFilled from 'ahoney/lib/icons/ExclamationCircleFilled';
import * as API from '@/api/account/hashRate';
import { HASH_RATE, HASHRATE_TRANSFER } from '@/modules/account/hashRate';
import ProductTitle from '@/shared/components/ProductTitle';
import BaseContainer from '@/shared/components/BaseContainer';
import PageButton from '@/shared/components/PageButton';
import FormContainer from '@/shared/components/FormContainer';
import ConfirmModal from '@/shared/components/ConfirmModal';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import {POWER_ON, POWER_OFF } from '@/shared/consts/powerStatus';
import CountDownToLink from '@/shared/components/CountDownToLink';
import getTimes from '@/shared/utils/getTimes';
// import TradeBeforeVerified from '@/shared/components/TradeBeforeVerified';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import getMinus from '@/shared/utils/getMinus';

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
      console.log('c2cTransAmount', c2cTransAmount);
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

  methods: {
    ...mapActions(HASH_RATE, [HASHRATE_TRANSFER]),
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

      return hasPowerOff === POWER_OFF ? baseList : [...refPriceList, ...baseList];
    },

    onPageButtonConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.hasPowerOff === POWER_ON) {
            this.isShowPasswordInput = true;
          } else {
            console.log('000000000');
            this.isVisibleTransferPrompt = true;
          }
        }
        return false;
      });
    },

    onSubmit(password) {
      this[HASHRATE_TRANSFER]({
        ptId: this.productTemplateId,
        password,
        hasPowerOff: this.hasPowerOff,
        ...this.formData,
      }).then(() => {
        this.isShowPasswordInput = false;
        this.showCountDownToLink = true;
      });
    },
  },

  render() {
    const { hashrateType, name, amountBuff, amount } = this;
    const noBuffAmount = amount - amountBuff;
    const isVisibleFirstPrompt = amountBuff !== '0' && this.formData.amount > noBuffAmount;
    const inBuffAmount = getMinus({ number: this.formData.amount, minuend: noBuffAmount });

    return (
      <div>
        <BaseContainer contentClassName={styles.container}>
          <ProductTitle chainType={hashrateType} name={name} />
          <FormContainer>
            <FormModel
              ref="form"
              hideRequiredMark
              props={{ model: this.formData }}
              class="form"
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
                <Input
                  v-model={this.formData.amount}
                  scopedSlots={{
                    suffix: () => (
                      <div class={styles['amount-input-suffix']}>
                        <span>{this.unit}</span>
                        <span onClick={() => { this.formData.amount = this.amount; }}>全部</span>
                      </div>
                    ),
                  }}
                  placeholder={`${this.$t('marketFieldHintMax')}${this.amount}`}
                />
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
                <Input
                  maxLength={6}
                  scopedSlots={{
                    suffix: () => `USDT/${this.unit}`,
                  }}
                  v-model={this.formData.price}
                  placeholder="0.01-9999.99"
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
            this.isShowPasswordInput = true; // TODO tmp
            this.isVisibleTransferPrompt = false;
          }}
          onCancel={() => { this.isVisibleTransferPrompt = false; }}
          value={this.isVisibleTransferPrompt}
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
          show={this.isShowPasswordInput}
          title={this.$t('transferItemAmount')}
        />
        <CountDownToLink
          onConfirm={() => this.$emit('closeTransferPage', 'toPage')}
          show={this.showCountDownToLink}
          operatingSuccess={this.$t('hashrateOpenSuccess')}
          promptText={this.$t('hashrateOpenSuccessTips')}
        />
        <PageButton
          class={styles.button}
          type="primary"
          loading={this.loading}
          onClick={this.onPageButtonConfirm}
        >
          {this.$t('confirm')}
        </PageButton>
      </div>
    );
  },
};

export default TransferHashrate;
