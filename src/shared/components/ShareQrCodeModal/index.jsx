import QRCodeModule from '@/shared/components/QRCodeModule';
import BaseModal from '@/shared/components/BaseModal';
import ModalButton from '@/shared/components/ModalButton';
import CopyToClipboard from '@/shared/components/CopyToClipboard';

import styles from './index.less?module';

const ShareQrCodeModal = {
  props: {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
  },
  data() {
    return {
      qrCodeUrl: '',
    };
  },
  methods: {
    getContent() {
      return (
        <div class={styles.wrapper}>
          <div class={styles.title}>{this.title}</div>
          <QRCodeModule
            onGetQrCodeUrl={url => {
              this.qrCodeUrl = url;
            }}
            options={{ width: 206 }}
            value={this.content}
          />
          <div class={styles['button-box']}>
            <CopyToClipboard text={this.content}>
              <ModalButton type="primary">{this.$t('copyLink')}</ModalButton>
            </CopyToClipboard>
            <ModalButton type="primary" onclick={this.downloadQrCode}>
              {this.$t('download')}
            </ModalButton>
          </div>
          <div class={styles['share-prompt']}>
            <div>{this.$t('qrCodeSharePrompt1')}</div>
            <div>{this.$t('qrCodeSharePrompt2')}</div>
          </div>
        </div>
      );
    },
    downloadQrCode() {
      const a = document.createElement('a');
      a.href = this.qrCodeUrl;
      a.download = this.$t('myQrCode');
      a.click();
    },
  },
  render() {
    return (
      <BaseModal
        width={261}
        maskClosable={false}
        wrapClassName={styles['modal-wrap']}
        scopedSlots={{
          content: this.getContent,
        }}
        {...{
          on: this.$listeners,
          props: this.$attrs,
        }}
      >
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </BaseModal>
    );
  },
};

export default ShareQrCodeModal;
