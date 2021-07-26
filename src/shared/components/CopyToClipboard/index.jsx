import CopyToClipboard from 'vue-copy-to-clipboard';
import Notification from '@/shared/services/Notification';

const CopyToClipboardWrap = {
  props: {
    text: '',
  },
  render() {
    const finlayProps = {
      on: this.$listeners,
      Props: this.$attrs,
    };
    return (
      <CopyToClipboard
        text={this.text}
        onCopy={() => Notification.success(this.$t('copySuccess')) }
        {...finlayProps}
      >
        {this.$scopedSlots.default()}
      </CopyToClipboard>
    );
  },
};

export default CopyToClipboardWrap;
