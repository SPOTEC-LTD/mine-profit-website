import CloseOutlined from 'ahoney/lib/icons/CloseOutlined';
import QRCodeModule from '@/shared/components/QRCodeModule';
import InfoModal from '@/shared/components/InfoModal';
import ModalButton from '@/shared/components/ModalButton';
import CopyToClipboard from '@/shared/components/CopyToClipboard';

import styles from './index.less?module';

const ShareQrCodeModal = {
  props: {
    title: { type: String, default: '' },
    value: { type: String, default: '' },
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
          <div class={styles.title}>{this.title}</div>
          <QRCodeModule
            onGetQrCodeUrl={url => {
              this.qrCodeUrl = url;
            }}
            options={{ width: 206 }}
            value={this.value}
          />
          <div class={styles['button-box']}>
            <CopyToClipboard text={this.value}>
              <ModalButton type="primary">{this.$t('copy')}</ModalButton>
            </CopyToClipboard>
            <ModalButton type="primary" onclick={this.downloadQrCode}>
              {this.$t('download')}
            </ModalButton>
          </div>
          <div class={styles['share-prompt']}>{this.$t('qrCodeSharePrompt')}</div>
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
      <InfoModal
        centered
        hiddenButton
        footer={null}
        width={261}
        wrapClassName={styles['modal-wrap']}
        closeIcon={<CloseOutlined />}
        scopedSlots={{
          content: this.getContent,
        }}>
        {this.$scopedSlots.default()}
      </InfoModal>
    );
  },
};

export default ShareQrCodeModal;
