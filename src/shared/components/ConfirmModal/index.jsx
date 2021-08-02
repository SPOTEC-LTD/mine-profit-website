import BaseModal from '@/shared/components/BaseModal';
import ModalFooterButtonGroup from '@/shared/components/ModalFooterButtonGroup';
import './index.less';

const ConfirmModal = {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    cancelButtonText: {
      type: [String, Object],
    },
    confirmButtonText: {
      type: [String, Object],
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onConfirmModal() {
      this.$emit('confirm');
    },

    onCancelModal() {
      this.$emit('cancel');
    },

    getFooterNode() {
      const dataSource = [
        {
          onClick: this.onCancelModal,
          label: this.cancelButtonText || this.$t('cancel'),
        },
        {
          onClick: this.onConfirmModal,
          type: 'primary',
          label: this.confirmButtonText || this.$t('confirm'),
          loading: this.confirmLoading,
        },
      ];

      return (
        <ModalFooterButtonGroup
          dataSource={dataSource}
        />
      );
    },
  },

  render() {
    const content = (
      <div>
        <div>
          {this.$slots.default}
        </div>
        {this.getFooterNode()}
      </div>
    );

    return (
      <BaseModal
        value={this.value}
        onClose={this.onCancelModal}
        scopedSlots={{
          content: () => content,
        }}
      />
    );
  },
};

export default ConfirmModal;
