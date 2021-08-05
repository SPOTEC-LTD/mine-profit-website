import BaseModal from '@/shared/components/BaseModal';
import ModalFooterButtonGroup from '@/shared/components/ModalFooterButtonGroup';
import isUndefined from 'lodash/isUndefined';
import './index.less';

const ConfirmModal = {
  props: {
    visible: {
      type: Boolean,
      default: undefined,
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
    confirmDisabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      value: false,
    };
  },

  methods: {
    open() {
      this.value = true;
      this.$emit('open');
    },

    close() {
      this.value = false;
      this.$emit('close');
    },

    onConfirmModal() {
      this.$emit('confirm');
    },

    onCancelModal() {
      if (isUndefined(this.visible)) {
        this.value = false;
      }

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
          disabled: this.confirmDisabled,
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

    const resultVisible = isUndefined(this.visible) ? this.value : this.visible;

    return (
      <BaseModal
        value={resultVisible}
        onClose={this.onCancelModal}
        scopedSlots={{
          content: () => content,
        }}
        {
          ...{
            attrs: this.$attrs,
          }
        }
      />
    );
  },
};

export default ConfirmModal;
