import classNames from 'classnames';
import { Modal } from 'ant-design-vue';
import CancelledOutlined from 'ahoney/lib/icons/CancelledOutlined';
import omit from 'lodash/omit';
import isUndefined from 'lodash/isUndefined';

import './index.less';

const BaseModal = {
  props: ['value', 'iconClassName'],

  data() {
    return {
      visible: false,
    };
  },

  methods: {
    open() {
      if (isUndefined(this.value)) {
        this.visible = true;
      }
      this.$emit('open');
    },

    close() {
      if (isUndefined(this.value)) {
        this.visible = false;
      }
      this.$emit('close');
    },
  },

  render() {
    const resultVisible = isUndefined(this.value) ? this.visible : this.value;
    return (
      <span>
        {
          this.$scopedSlots.default &&
          <span class='click-node' onClick={this.open}>{this.$scopedSlots.default()}</span>
        }
        <Modal
          class={classNames('base-modal', { 'is-hidden': !resultVisible })}
          centered
          width={300}
          footer={null}
          visible={resultVisible}
          closeIcon={
            <div class={this.iconClassName} onClick={this.close}>
              <CancelledOutlined />
            </div>
          }
          {...{
            on: omit(this.$listeners, ['open', 'close']),
            props: this.$attrs,
          }}
        >
          {this.$scopedSlots.content()}
        </Modal>
      </span>
    );
  },
};

export default BaseModal;
