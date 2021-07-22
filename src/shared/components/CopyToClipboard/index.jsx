import CopyToClipboard from 'vue-copy-to-clipboard';
import successModal from '@/shared/utils/request/successModal';

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
        onCopy={() => successModal({ title: this.$t('copySuccess') })}
        {...finlayProps}
      >
        {this.$scopedSlots.default()}
      </CopyToClipboard>
    );
  },
};

export default CopyToClipboardWrap;
