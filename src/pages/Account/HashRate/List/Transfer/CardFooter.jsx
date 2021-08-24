import SquareForbidOutlined from 'ahoney/lib/icons/SquareForbidOutlined';
import SharedFilled from 'ahoney/lib/icons/SharedFilled';
import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';
import { mapActions, mapState } from 'vuex';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import { HASH_RATE, TRANSFER_CANCEL_ACTION } from '@/modules/account/hashRate';
import {
  TRANSFER_ING,
  TRANSFER_DONE,
  TRANSFER_CANCEL,
  getTransferStatusMap,
} from '@/pages/Account/HashRate/consts/transferOderStatus';
import ConfirmModal from '@/shared/components/ConfirmModal';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import ShareQrCodeModal from '@/shared/components/ShareQrCodeModal';
import FooterLayout from '../components/FooterLayout';
import StatusTag from '../components/StatusTag';
import styles from './index.less?module';

const statusTagMap = {
  [TRANSFER_ING]: '#f1b617',
  [TRANSFER_DONE]: '#11bc29',
  [TRANSFER_CANCEL]: '#df5353',
};

const CardFooter = {
  props: ['data'],
  data() {
    return {
      showShareQrCodeModal: false,
    };
  },
  computed: {
    ...mapState({
      transferCancelLoading: state => state.loading.effects[`${HASH_RATE}/${TRANSFER_CANCEL_ACTION}`],
    }),
  },

  methods: {
    ...mapActions(HASH_RATE, [TRANSFER_CANCEL_ACTION]),
    getButtonDataSource(data) {
      return [
        {
          label: this.$t('transferShare'), // '分享给朋友',
          icon: <SharedFilled />,
          onClick: () => {
            this.showShareQrCodeModal = true;
          },
        },
        {
          label: this.$t('hashrateCancelTransfer'), // '取消转让',
          icon: <SquareForbidOutlined />,
          disabled: data.isRepayment === 0,
          onClick: () => {
            this.$refs.cancelModal.open();
          },
        },
      ];
    },

    onCloseModal() {
      this.$refs.cancelModal.close();
    },

    onModalConfirm() {
      this[TRANSFER_CANCEL_ACTION]({ id: this.data.id })
        .then(() => {
          this.onCloseModal();
          this.$emit('refresh');
        });
    },
  },

  render() {
    const { data } = this;
    const isShowButton = data.status !== TRANSFER_CANCEL && data.isCancel;
    const link = `${process.env.MOBILE_SITE_HOST}/shareItem/customerC2C/${data.id}?locale=${getLocalLanguage()}`;

    const tagNode = (
      <StatusTag
        color={statusTagMap[data.status]}
        tagText={getTransferStatusMap(data.status)}
      />
    );

    const footerButtonGroupNode = isShowButton ? <FooterButtonGroup dataSource={this.getButtonDataSource(data)} /> : '';

    return (
      <div>
        <ConfirmModal
          ref="cancelModal"
          onConfirm={this.onModalConfirm}
          title={this.$t('hashrateCancelTransfer')}
          confirmLoading={this.transferCancelLoading}
        >
          <div class={styles['cannel-modal']}>
            <InfoCircleFilled />
            <div class={styles['cannel-content']}>
              {`${bigNumberToFixed(data.amount - data.transAmount, 2)}${data.unit}${this.$t('transferCancelHint')}`}
            </div>
          </div>
        </ConfirmModal>
        <FooterLayout
          scopedSlots={{
            leftContent: () => tagNode,
            rightContent: () => footerButtonGroupNode,
          }}
        />
        <ShareQrCodeModal
          value={this.showShareQrCodeModal}
          onClose={() => {
            this.showShareQrCodeModal = false;
            this.$emit('refresh');
          }}
          title={this.$t('myHashrateTransferShare')}
          content={link}
        />
      </div>
    );
  },
};

export default CardFooter;
