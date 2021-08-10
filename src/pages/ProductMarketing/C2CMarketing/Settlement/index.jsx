import { FormModel } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import * as c2cMarketAPI from '@/api/c2cMarket';
import numberUtils from 'aa-utils/lib/numberUtils';
import { POWER_OFF } from '@/shared/consts/isPowerOff';
import PageButton from '@/shared/components/PageButton';
import NumberInput from '@/shared/components/NumberInput';
import ProductTitle from '@/shared/components/ProductTitle';
import BaseContainer from '@/shared/components/BaseContainer';
import FormContainer from '@/shared/components/FormContainer';
import { accountHashRateListPath } from '@/router/consts/urls';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { hashrateStatusMap } from '@/modules/account/hashRate';
import PayWaySelector from '@/shared/components/PayWaySelector';
import PowerOffButton from '@/shared/components/PowerOffButton';
import CountDownToLink from '@/shared/components/CountDownToLink';
import RateFluctuation from '@/shared/components/RateFluctuation';
import { C2C_MARKET, PLACE_C2C_ORDER } from '@/modules/c2cMarket';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import SingleInfoCard from '@/pages/ProductMarketing/components/SingleInfoCard';

import styles from './index.less?module';

const { Item } = FormModel;

const Settlement = {
  async asyncData(ctx) {
    const { params } = ctx;
    const props = { id: params.id, c2cDetail: {}, restHashRate: 0, chainRate: {} };
    const getProductPromise = c2cMarketAPI.getC2CDetails({ pathParams: { id: params.id } }, { ctx });
    const getPreSubjectOrder = c2cMarketAPI.preSubjectOrder({ pathParams: { id: params.id } }, { ctx });

    try {
      const { body: { c2cDetail } } = await getProductPromise;
      props.c2cDetail = c2cDetail;
      props.restHashRate = numberUtils.minus(c2cDetail.totalAmount, c2cDetail.saleAmount);
    } catch (error) { console.log('error'); }

    try {
      const { body } = await getPreSubjectOrder;
      props.chainRate = body.productPreDTO;
    } catch (error) { console.log('error'); }

    return props;
  },

  data() {
    return {
      value: '',
      coinWillPay: '0',
      payCoin: 'USDT',
      isShowPasswordInput: false,
      showFluctuationDialog: false,
      showCountDownToLink: false,
      password: '',
      formData: { amount: '' },
    };
  },

  computed: {
    ...mapState({
      placeOrderLoading: state => state.loading.effects[`${C2C_MARKET}/${PLACE_C2C_ORDER}`],
      c2cOrderResult: state => state.c2cMarket.c2cOrderResult,
    }),

    hashRatePrice() {
      return numberUtils.times(this.value, this.c2cDetail.price);
    },
  },

  destroyed() {
    this.isShowPasswordInput = false;
    this.showFluctuationDialog = false;
    this.showCountDownToLink = false;
  },

  methods: {
    ...mapActions(C2C_MARKET, [PLACE_C2C_ORDER]),

    refresh() { window.$nuxt.refresh(); },

    handleInputMax() {
      this.value = `${this.restHashRate}`;
      this.formData.amount = this.restHashRate;
    },

    formRule() {
      return [
        { required: true, message: this.$t('marketBuyPartRequire'), trigger: 'change' },
        { validator: (rule, value) => {
          return new Promise((resolve, reject) => {
            if (value && value === '0') {
              reject(true);
            } else {
              resolve();
            }
          });
        },
        message: this.$t('marketBuyPartThanZero'),
        },
      ];
    },

    maxNode() {
      return (
        <div class={styles['amount-input-suffix']}>
          <span>{this.c2cDetail.unit}</span>
          <span onClick={this.handleInputMax}>{this.$t('max')}</span>
        </div>
      );
    },

    footerPayMountNode() {
      return (
        <div class={styles['footer-pay-mount']}>
          <span class={styles['footer-pay-title']}>{this.$t('orderPrice')}</span>
          <div class={styles['footer-pay-content']}>
            <span class={styles['footer-pay-number']}>{this.coinWillPay || this.hashRatePrice}</span>
            <span>{this.payCoin}</span>
          </div>
        </div>
      );
    },

    onClickButtonConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) { this.isShowPasswordInput = true; }
        return false;
      });
    },

    handleCloseFluctuation() {
      this.showFluctuationDialog = false;
      this.refresh();
    },

    onSelectPayWay(coin, resultMount) {
      this.payCoin = coin;
      this.coinWillPay = resultMount;
    },

    handlePayment(password) {
      this.password = password || this.password;
      const data = {
        amount: this.value,
        buyChainType: this.c2cDetail.chainType,
        password: this.password,
        paymentChainType: this.payCoin,
        preOrderId: this.chainRate.orderId,
        ptId: this.c2cDetail.ptId,
        hasPowerOff: this.c2cDetail.hasPowerOff,
      };
      this[PLACE_C2C_ORDER](data)
        .then(({ paySuccess }) => {
          if (paySuccess) {
            this.showFluctuationDialog = false;
            this.showCountDownToLink = true;
          } else {
            this.showFluctuationDialog = true;
          }
          this.isShowPasswordInput = false;
        });
    },
  },

  render() {
    const { name, chainType, hasPowerOff, price, unit } = this.c2cDetail;
    const restNum = bigNumberToFixed(this.restHashRate, 2);
    const mineHashRateActive = hasPowerOff === POWER_OFF ? hashrateStatusMap.SHUTDOWN : hashrateStatusMap.CLOSE;
    const { btcExchangeRate, ethExchangeRate } = this.chainRate;

    return (
      <div>
        <BaseContainer class={styles['pay-info-wrapper']}>
          <ProductTitle
            class={styles['product-detail-title']}
            chainType={chainType}
            name={name}
            scopedSlots={hasPowerOff === POWER_OFF ? { rightContent: () => <PowerOffButton/> } : {}}
          />
          <FormContainer class={styles['product-info-card']} title={this.$t('marketConfirmSettle')}>
            <SingleInfoCard title={this.$t('hashRateUnitPrice')} amount={bigNumberToFixed(price, 2)} unit={`USDT/${unit}`} />
            <FormModel ref="form" hideRequiredMark props={{ model: this.formData }} class="normal-form">
              <Item label={this.$t('walletAllTypesBuyHashrate')} prop="amount" rules={this.formRule()}>
                <NumberInput
                  value={`${this.formData.amount}`}
                  max={+restNum}
                  precision={2}
                  onChange={value => { this.formData.amount = value; this.value = value; }}
                  scopedSlots={{ suffix: () => this.maxNode() }}
                  placeholder={`${this.$t('marketFieldHintMax')}${restNum}`}
                />
              </Item>
            </FormModel>
          </FormContainer>

          <PayWaySelector
            onHandlePayNow={this.onSelectPayWay}
            willPayAmount={this.hashRatePrice}
            btcRate={btcExchangeRate}
            ethRate={ethExchangeRate}
          />
        </BaseContainer>

        <PageButton
          class={styles.button}
          type="primary"
          onClick={this.onClickButtonConfirm}
          disabled={!+this.hashRatePrice}
          scopedSlots={{ rightContent: this.footerPayMountNode }}
        >
          {this.$t('confirmPay')}
        </PageButton>

        <ConfirmPayDialog
          onCancel={() => { this.isShowPasswordInput = false; }}
          loading={this.placeOrderLoading}
          onConfirm={this.handlePayment}
          visible={this.isShowPasswordInput}
          title={this.$t('hashrateConfirmOpen')}
        />

        <RateFluctuation
          visible={this.showFluctuationDialog}
          onHandleConfirm={this.handlePayment}
          onHandleCancel={this.handleCloseFluctuation}
          placeOrderResult={this.c2cOrderResult}
          loading={this.placeOrderLoading}
        />

        <CountDownToLink
          to={{ path: accountHashRateListPath, query: { hashrateType: chainType, activeName: mineHashRateActive } }}
          visible={this.showCountDownToLink}
          operatingSuccess={this.$t('payBuySuccess')}
          promptText={this.$t('payReturnMineHashrate')}
        />
      </div>
    );
  },
};

export default Settlement;
