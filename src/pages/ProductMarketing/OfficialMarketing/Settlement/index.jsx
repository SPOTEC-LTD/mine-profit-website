import includes from 'lodash/includes';
import { mapActions, mapState } from 'vuex';
import { Spin, FormModel } from 'ant-design-vue';
import Title from '@/pages/home/component/Title';
import numberUtils from 'aa-utils/lib/numberUtils';
import { USABLE } from '@/shared/consts/useStatus';
import TagGroup from '@/pages/home/component/TagGroup';
import PageButton from '@/shared/components/PageButton';
import Notification from '@/shared/services/Notification';
import NumberInput from '@/shared/components/NumberInput';
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
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import locationServices from '@/shared/services/location/locationServices';
import { HASH_RATE_COUPONS, GET_VIP_COUPONS } from '@/modules/hashRateCoupons';
import SingleInfoCard from '@/pages/ProductMarketing/components/SingleInfoCard';
import CouponSelector from '@/pages/ProductMarketing/components/CouponSelector';
import { OFFICIAL_PRODUCT, PLACE_PRODUCT_ORDER } from '@/modules/officialProduct';
import { officialMarketingPath, accountHashRateListPath } from '@/router/consts/urls';
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
    };
    const getProductPromise = officialMarketAPI.getProductDetails(
      { pathParams: { id: params.id } },
      { ctx, catchException: false },
    );
    const getPreOrder = officialMarketAPI.preOrderProduct({ data: { pid: params.id, ptId: params.ptId } }, { ctx });

    try {
      const { body: { productDetail } } = await getProductPromise;
      props.productDetail = productDetail;
      props.restHashRate = numberUtils.minus(productDetail.publishAmount, productDetail.saleAmount);
      props.isNewUser = includes(productDetail.tags, NEW_USER_USED);
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
      hashRatePrice: '0',
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
      placeOrderLoading: state => state.loading.effects[`${OFFICIAL_PRODUCT}/${PLACE_PRODUCT_ORDER}`],
      productOrderResult: state => state.officialProduct.productOrderResult,
      vipCouponsList: state => state.hashRateCoupons.vipCouponsList,
      getVipListLoading: state => state.loading.effects[`${HASH_RATE_COUPONS}/${GET_VIP_COUPONS}`],
    }),
  },

  watch: {
    value(data) {
      const { isNewUser, productDetail } = this;
      const price = isNewUser ? productDetail.discountPackageHashratePrice : productDetail.packageHashratePrice;
      this.hashRatePrice = numberUtils.times(this.value, price);
      this.hashRatePartAmount = +numberUtils.times(this.value, productDetail.amount);
      this.getCouponsList({ buyAmount: +data });
    },
  },

  mounted() {
    if (this.isError) {
      Notification.error(this.$t('noData'));
      setTimeout(() => { locationServices.push(officialMarketingPath); }, 1000);
    }

    this.getCouponsList({ buyAmount: this.value });
  },

  destroyed() {
    this.isShowPasswordInput = false;
    this.showFluctuationDialog = false;
    this.showCountDownToLink = false;
  },

  methods: {
    ...mapActions(OFFICIAL_PRODUCT, [PLACE_PRODUCT_ORDER]),
    ...mapActions(HASH_RATE_COUPONS, [GET_VIP_COUPONS]),

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
      this[PLACE_PRODUCT_ORDER](data)
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
    const {
      name, ptName, chainType, packageHashratePrice, unit, amount, discountPackageHashratePrice,
    } = this.productDetail;
    const price = bigNumberToFixed(packageHashratePrice, 2);
    const discountPrice = bigNumberToFixed(discountPackageHashratePrice, 2);
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
                amount={this.isNewUser ? discountPrice : price}
                deletedPrice={this.isNewUser ? price : ''}
                unit='USDT'
              />
              <SingleInfoCard title={this.$t('marketPartHash')} amount={amount} unit={`${unit}/${this.$t('part')}`} />
              <FormModel ref="form" hideRequiredMark props={{ model: this.formData }} class="normal-form">
                <Item label={this.$t('marketBuyPart')} prop="amount" rules={this.formRule()}>
                  <NumberInput
                    value={`${this.formData.amount}`}
                    max={+this.restHashRate}
                    precision={2}
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
            class={styles.button}
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
