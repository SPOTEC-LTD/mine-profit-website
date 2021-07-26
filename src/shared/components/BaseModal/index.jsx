import { Modal } from 'ant-design-vue';
import CancelledOutlined from 'ahoney/lib/icons/CancelledOutlined';

import './index.less';

const BaseModal = {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    footer: Object,
  },
  methods: {
    onOpen(e) {
      e.stopPropagation();
      this.$emit('open');
    },

    onClose(e) {
      e.stopPropagation();
      this.$emit('close');
    },
  },

  render() {
    return (
      <span>
        <span class='click-node' onClick={this.onOpen}>{this.$scopedSlots.default()}</span>
        <Modal
          title="Title"
          class="base-modal"
          footer={null}
          visible={this.visible}
          closeIcon={<CancelledOutlined onClick={this.onClose} />}
          {...{
            on: this.$listeners,
            props: this.$attrs,
          }}
        >
          {this.$scopedSlots.content()}
          {this.footer}
        </Modal>
      </span>
    );
  },
};

export default BaseModal;
