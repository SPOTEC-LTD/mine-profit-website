import includes from 'lodash/includes';
import { mapActions, mapState, mapMutations } from 'vuex';
import { Spin, FormModel } from 'ant-design-vue';
import Title from '@/pages/home/component/Title';
import numberUtils from 'aa-utils/lib/numberUtils';
import { USABLE } from '@/shared/consts/useStatus';
import TagGroup from '@/pages/home/component/TagGroup';
import PageButton from '@/shared/components/PageButton';
import Notification from '@/shared/services/Notification';
import * as officialMarketAPI from '@/api/officialMarket';
import { NEW_USER_USED } from '@/shared/consts/productTag';
import ProductTitle from '@/shared/components/ProductTitle';
import { COUPON_UNUSED } from '@/shared/consts/couponsTypes';
import BaseContainer from '@/shared/components/BaseContainer';
import FormContainer from '@/shared/components/FormContainer';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { SOURCE_SETTLE } from '@/shared/consts/entryPageModes';
import { hashrateStatusMap } from '@/modules/account/hashRate';
import PayWaySelector from '@/shared/components/PayWaySelector';
import CountDownToLink from '@/shared/components/CountDownToLink';
import RateFluctuation from '@/shared/components/RateFluctuation';
import NumberInput, { INT } from '@/shared/components/NumberInput';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import locationServices from '@/shared/services/location/locationServices';
import { HASH_RATE_COUPONS, GET_VIP_COUPONS } from '@/modules/hashRateCoupons';
import SingleInfoCard from '@/pages/ProductMarketing/components/SingleInfoCard';
import CouponSelector from '@/pages/ProductMarketing/components/CouponSelector';
import { OFFICIAL_PRODUCT, PLACE_PRODUCT_ORDER } from '@/modules/officialProduct';
import { officialMarketingPath, accountHashRateListPath } from '@/router/consts/urls';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_IS_DEAL_PASSWORD_VERIFICATION,
  UPDATE_CAPTCHA_VERIFICATION,
} from '@/modules/manMachineVerification';
import { MAN_MACHINE_VERIFICATION_CODE } from '@/shared/utils/request/consts/ResponseCode';

import initValue from '../consts/productInitialValue';

import styles from './index.less?module';

const { Item } = FormModel;

const Settlement = {
  async asyncData(ctx) {
    const { params } = ctx;
    const props = {
      productDetail: initValue,
      restHashRate: 0,
      chainRate: {},
      chainBalance: [],
      isNewUser: false,
      isError: false,
      isNormalUser: true,
      reducedPrice: 0,
    };
    const getProductPromise = officialMarketAPI.getProductDetails(
      { pathParams: { id: params.id } },
      { ctx, catchException: false },
    );
    const getPreOrder = officialMarketAPI.preOrderProduct({ data: { pid: params.id, ptId: params.ptId } }, { ctx });

    try {
      const { body: { productDetail } } = await getProductPromise;
      const { tags, popularizePrice, discountPackageHashratePrice } = productDetail;
      props.productDetail = productDetail;
      props.restHashRate = numberUtils.minus(productDetail.publishAmount, productDetail.saleAmount);
      const isNewUser = includes(tags, NEW_USER_USED);
      props.isNewUser = isNewUser;
      props.isNormalUser = !isNewUser && !popularizePrice;
      props.reducedPrice = isNewUser ? discountPackageHashratePrice : popularizePrice;
    } catch (error) {
      props.isError = true;
    }

    try {
      const { body: { productPreDTO } } = await getPreOrder;
      props.chainRate = productPreDTO;
    } catch (error) { console.log('error', error); }

    return props;
  },

  data() {
    return {
      value: '',
      hashRatePartAmount: 0,
      payCoin: 'USDT',
      isShowPasswordInput: false,
      showFluctuationDialog: false,
      showCountDownToLink: false,
      password: '',
      couponId: null,
      couponName: '',
      formData: { amount: '' },
    };
  },

  computed: {
    ...mapState({
      captchaVerification: state => state.manMachineVerification.captchaVerification,
      isVerificationSuccess: state => state.manMachineVerification.isVerificationSuccess,
      isDealPasswordVerification: state => state.manMachineVerification.isDealPasswordVerification,
      placeOrderLoading: state => state.loading.effects[`${OFFICIAL_PRODUCT}/${PLACE_PRODUCT_ORDER}`],
      productOrderResult: state => state.officialProduct.productOrderResult,
      vipCouponsList: state => state.hashRateCoupons.vipCouponsList,
      getVipListLoading: state => state.loading.effects[`${HASH_RATE_COUPONS}/${GET_VIP_COUPONS}`],
    }),

    hashRatePrice() {
      const { isNormalUser, productDetail, reducedPrice } = this;
      const price = isNormalUser ? productDetail.packageHashratePrice : reducedPrice;
      return numberUtils.times(this.value, price);
    },
  },

  watch: {
    value() {
      this.hashRatePartAmount = +numberUtils.times(this.value, this.productDetail.amount);
      this.getCouponsList({ buyAmount: +this.hashRatePartAmount });
    },
    isVerificationSuccess(value) {
      if (value) {
        if (this.isDealPasswordVerification) {
          this.handlePayment();
          this[UPDATE_IS_DEAL_PASSWORD_VERIFICATION](false);
        }
      }
    },
  },
  mounted() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
    if (this.isError) {
      Notification.error(this.$t('noData'));
      setTimeout(() => { locationServices.push(officialMarketingPath); }, 1000);
    }

    this.getCouponsList({ buyAmount: +this.hashRatePartAmount });
  },

  destroyed() {
    this.isShowPasswordInput = false;
    this.showFluctuationDialog = false;
    this.showCountDownToLink = false;
  },

  methods: {
    ...mapActions(OFFICIAL_PRODUCT, [PLACE_PRODUCT_ORDER]),
    ...mapActions(HASH_RATE_COUPONS, [GET_VIP_COUPONS]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    ...mapMutations(MAN_MACHINE_VERIFICATION, [UPDATE_IS_DEAL_PASSWORD_VERIFICATION, UPDATE_CAPTCHA_VERIFICATION]),
    getCouponsList(options = {}) {
      const { chainType } = this.productDetail;
      const initialValue = {
        hashrateCouponEnum: COUPON_UNUSED,
        useStatus: USABLE,
        type: SOURCE_SETTLE,
        hashrateType: chainType,
      };
      const data = { ...initialValue, ...options };
      this[GET_VIP_COUPONS](data).then(() => {
        const choosesCoupons = this.vipCouponsList.filter(item => {
          return item.id === this.couponId;
        });
        if (this.couponId && !choosesCoupons.length) {
          Notification.error(this.$t('marketReSelectCouponHint'));
          this.couponId = null;
          this.couponName = '';
        }
      });
    },

    handleCouponChange(couponInfo = {}) {
      this.couponId = couponInfo.couponId;
      this.couponName = couponInfo.couponName;
    },

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
          <span>{this.$t('part')}</span>
          <span onClick={this.handleInputMax}>{this.$t('all')}</span>
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

    handlePayment(password) {
      this.password = password || this.password;
      const data = {
        amount: this.value,
        buyChainType: this.productDetail.chainType,
        hashrateId: this.couponId || null,
        password: this.password,
        paymentChainType: this.payCoin,
        preOrderId: this.chainRate.orderId,
        ptId: this.productDetail.ptId,
      };
      if (this.captchaVerification) {
        data.captchaVerification = this.captchaVerification;
        this[UPDATE_CAPTCHA_VERIFICATION]('');
      }
      this[PLACE_PRODUCT_ORDER](data)
        .then(({ paySuccess }) => {
          if (paySuccess) {
            this.showFluctuationDialog = false;
            this.showCountDownToLink = true;
          } else {
            this.showFluctuationDialog = true;
          }
          this.isShowPasswordInput = false;
        }).catch(({ code }) => {
          if (code === MAN_MACHINE_VERIFICATION_CODE) {
            this[UPDATE_IS_DEAL_PASSWORD_VERIFICATION](true);
          }
        });
    },
  },

  render() {
    const { name, ptName, chainType, packageHashratePrice, unit, amount } = this.productDetail;
    const price = bigNumberToFixed(this.isNormalUser ? packageHashratePrice : this.reducedPrice, 2);
    const { btcExchangeRate, ethExchangeRate } = this.chainRate;

    return (
      <Spin spinning={this.getVipListLoading}>
        <div class={styles['official-settlement-wrapper']}>
          <BaseContainer class={styles['pay-info-wrapper']}>
            <ProductTitle class={styles['product-detail-title']} chainType={chainType} name={ptName} leftExtra={name}/>
            <Title title={this.$t('marketConfirmSettle')} class={styles['confirm-settle-dec-title']}/>
            <FormContainer class={styles['product-info-card']}>
              <SingleInfoCard
                title={this.$t('unitPrice')}
                amount={price}
                deletedPrice={this.isNormalUser ? '' : bigNumberToFixed(packageHashratePrice, 2)}
                unit='USDT'
              />
              <SingleInfoCard title={this.$t('marketPartHash')} amount={amount} unit={`${unit}/${this.$t('part')}`} />
              <FormModel ref="form" hideRequiredMark props={{ model: this.formData }} class="normal-form">
                <Item label={this.$t('marketBuyPart')} prop="amount" rules={this.formRule()}>
                  <NumberInput
                    numberType={INT}
                    value={`${this.formData.amount}`}
                    max={+this.restHashRate}
                    onChange={value => { this.formData.amount = value; this.value = value; }}
                    scopedSlots={{ suffix: () => this.maxNode() }}
                    placeholder={`${this.$t('marketFieldHintMax')}${this.restHashRate}`}
                  />
                </Item>
              </FormModel>
              <SingleInfoCard title={this.$t('marketTotalHashrate')} amount={this.hashRatePartAmount} unit={unit} />
              <SingleInfoCard
                title={this.$t('marketHashTotalPrice')}
                amount={bigNumberToFixed(this.hashRatePrice, 2)}
                unit='USDT'
                class={styles['product-total-price']}
              />
            </FormContainer>

            <Title title={this.$t('discountInfo')} class={styles['confirm-settle-dec-title']}/>
            <FormContainer class={styles['product-info-card']}>
              <TagGroup productData={this.productDetail} isSettlementPage purchaseAmount={this.hashRatePartAmount} />
              <CouponSelector
                couponName={this.couponName}
                couponId={this.couponId}
                couponsList={this.vipCouponsList}
                onCouponChange={this.handleCouponChange}
              />
            </FormContainer>

            <PayWaySelector
              onHandlePayNow={coin => { this.payCoin = coin; }}
              willPayAmount={this.hashRatePrice}
              btcRate={btcExchangeRate}
              ethRate={ethExchangeRate}
            />
          </BaseContainer>

          <PageButton
            type="primary"
            onClick={this.onClickButtonConfirm}
            disabled={!this.hashRatePartAmount}
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

          <CountDownToLink
            to={{ path: accountHashRateListPath, query: { hashrateType: chainType, activeName: hashrateStatusMap.CLOSE } }}
            visible={this.showCountDownToLink}
            operatingSuccess={this.$t('payBuySuccess')}
            promptText={this.$t('payReturnMineHashrate')}
          />

          <RateFluctuation
            visible={this.showFluctuationDialog}
            onHandleConfirm={this.handlePayment}
            onHandleCancel={this.handleCloseFluctuation}
            placeOrderResult={this.productOrderResult}
            loading={this.placeOrderLoading}
          />
        </div>
      </Spin>
    );
  },
};

export default Settlement;
