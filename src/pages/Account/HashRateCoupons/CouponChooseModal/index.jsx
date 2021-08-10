import isEmpty from 'lodash/isEmpty';

import BaseModal from '@/shared/components/BaseModal';
import ModalFooterButtonGroup from '@/shared/components/ModalFooterButtonGroup';
import CouponCard from '@/shared/components/CouponCard';
import NoData from '@/shared/components/NoData';

import styles from './index.less?module';

const CouponChooseModal = {
  props: {
    couponsList: {
      type: Array,
      default: () => [],
    },
    usesCouponId: Number,
  },

  data() {
    return {
      chooseCouponId: this.usesCouponId || null,
      chooseCouponName: '',
    };
  },

  methods: {
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
          {this.couponsList.map(item => (
            <CouponCard
              key={item.id}
              data={item}
              chooseId={this.chooseCouponId}
              onHandleClickSingle={this.handleCouponClick}
            />
          ))}
          {isEmpty(this.couponsList) && <NoData className={styles['no-data']} />}
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
        onOpen={() => { this.$emit('handleModalVisible', true); }}
        onClose={() => { this.$emit('handleModalVisible', false); }}
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
