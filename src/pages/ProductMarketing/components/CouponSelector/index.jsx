import { CircleCouponFilled, TriangleFilled } from 'ahoney/lib/icons';
import CouponChooseModal from '@/pages/Account/HashRateCoupons/CouponChooseModal';
import './index.less';

const CouponSelector = {
  props: {
    className: { type: String },
    couponName: [String, Number],
    couponId: [String, Number],
    couponsList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      modalVisible: false,
    };
  },

  methods: {
    handleCouponChange(couponInfo = {}) {
      this.$emit('couponChange', couponInfo);
    },
  },

  render() {
    return (
      <div class={['coupon-selector-wrapper', this.className]}>
        <div class='coupon-selector-title'>{this.$t('hashRateCoupons')}</div>

        <div class='coupon-selector-details'>

          <div class='coupon-selector-name-title'>
            <CircleCouponFilled />
            <span class='coupon-name'>{this.couponName || this.$t('vipCouponName')}</span>
          </div>

          <CouponChooseModal
            onHandleModalVisible={visible => { this.modalVisible = visible; }}
            couponsList={this.couponsList}
            usesCouponId={this.couponId}
            onCouponChange={this.handleCouponChange}
          >
            <div class={['coupon-selector-chooser', { 'closed-modal': !this.modalVisible }]}>
              <span class='coupon-selector-name'>
                {this.$t('chooseRestCoupon', { rest: this.couponsList.length })}
              </span>
              <TriangleFilled />
            </div>
          </CouponChooseModal>
        </div>

      </div>
    );
  },
};

export default CouponSelector;
