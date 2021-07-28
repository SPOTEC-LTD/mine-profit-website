import { mapState, mapMutations, mapActions } from 'vuex';
import { Spin } from 'ant-design-vue';
import isEmpty from 'lodash/isEmpty';

import { HASH_RATE_COUPONS, GET_VIP_COUPONS, RESET_VIP_COUPONS_LIST } from '@/modules/hashRateCoupons';
import { SOURCE_SETTLE } from '@/shared/consts/entryPageModes';
import { COUPON_UNUSED } from '@/shared/consts/couponsTypes';
import BaseModal from '@/shared/components/BaseModal';
import ModalFooterButtonGroup from '@/shared/components/ModalFooterButtonGroup';
import CouponCard from '@/shared/components/CouponCard';
import NoData from '@/shared/components/NoData';

import { USABLE } from './consts/useStatus';

import styles from './index.less?module';

const CouponChooseModal = {
  props: {
    usesCouponId: Number,
    buyAmount: {
      type: Number,
      default: 100, // TODO: 待改
    },
    hashrateType: String,
  },

  data() {
    return {
      chooseCouponId: this.usesCouponId || null,
      chooseCouponName: '',
    };
  },

  computed: mapState({
    vipCouponsList: state => state.hashRateCoupons.vipCouponsList,
    getVipListLoading: state => state.loading.effects[`${HASH_RATE_COUPONS}/${GET_VIP_COUPONS}`],
  }),

  methods: {
    ...mapMutations(HASH_RATE_COUPONS, [RESET_VIP_COUPONS_LIST]),
    ...mapActions(HASH_RATE_COUPONS, [GET_VIP_COUPONS]),

    getVipCouponsList() {
      const data = {
        type: SOURCE_SETTLE,
        buyAmount: this.buyAmount,
        hashrateType: 'ETH', // TODO: 待改
        // hashrateType: this.hashrateType,
        hashrateCouponEnum: COUPON_UNUSED,
        useStatus: USABLE,
      };
      this[RESET_VIP_COUPONS_LIST]();
      this[GET_VIP_COUPONS](data);
    },

    handleCouponClick(coupon = {}) {
      const { id, name } = coupon;
      if (this.chooseCouponId !== id) {
        this.chooseCouponId = id;
        this.chooseCouponName = name;
      } else {
        this.chooseCouponId = null;
        this.chooseCouponName = '';
      }
    },

    getCouponsListNode() {
      return (
        <div class={styles['modal-content-box']}>
          <Spin spinning={this.getVipListLoading}>
            {this.vipCouponsList.map(item => (
              <CouponCard
                key={item.id}
                data={item}
                chooseId={this.chooseCouponId}
                onHandleClickSingle={this.handleCouponClick}
              />
            ))}
            {isEmpty(this.vipCouponsList) && <NoData className={styles['no-data']} />}
          </Spin>
        </div>
      );
    },

    getFooterNode() {
      const dataSource = [
        {
          onClick: this.closeDialog,
          label: this.$t('cancel'),
        },
        {
          onClick: this.confirm,
          label: this.$t('confirm'),
          loading: this.getVipListLoading,
        },
      ];
      return (
        <ModalFooterButtonGroup
          className={styles['confirm-modal']}
          dataSource={dataSource}
        />
      );
    },

    closeDialog() {
      this.$refs.chooseCouponModal.close();
    },

    confirm() {
      this.$emit('couponChange', { couponName: this.chooseCouponName, couponId: this.chooseCouponId });
      this.closeDialog();
    },
  },

  render() {
    return (
      <BaseModal
        ref="chooseCouponModal"
        title={this.$t('chooseCoupon')}
        width={433}
        onOpen={this.getVipCouponsList}
        scopedSlots={{
          content: () => (
            <div>
              {this.getCouponsListNode()}
              {this.getFooterNode()}
            </div>
          ),
        }}
      >
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </BaseModal>
    );
  },
};

export default CouponChooseModal;
