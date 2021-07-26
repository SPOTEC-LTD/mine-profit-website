import { Modal } from 'ant-design-vue';
import PrimaryButton from '@/shared/components/PrimaryButton';
import './index.less';

const BaseModal = {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    buttonText: {
      type: String,
    },

    hiddenButton: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    onOpenDialog(e) {
      e.stopPropagation();
      if (!this.disabled) {
        this.showDialog = true;
      }
    },

    onCloseDialog(e) {
      e.stopPropagation();
      this.showDialog = false;
    },
  },

  render() {
    if (!this.$scopedSlots.default) {
      return null;
    }

    return (
      <span>
        <span onClick={this.onOpenDialog}>{this.$scopedSlots.default()}</span>
        <Modal
          class="info-modal"
          showConfirmButton={false}
          footer={null}
          v-model={this.showDialog}
          {...{
            on: this.$listeners,
            props: this.$attrs,
          }}
        >
          <div>
            {this.$scopedSlots.content()}
            {!this.hiddenButton && (
              <PrimaryButton onClick={this.onCloseDialog}>{this.buttonText || this.$t('well')}</PrimaryButton>
            )}
          </div>
        </Modal>
      </span>
    );
  },
};

export default BaseModal;
