import {
  SquareForbidOutlined,
  SharedFilled,
} from 'ahoney/lib/icons';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import locationServices from '@/shared/services/location/locationServices';
import { hashrateStatusMap } from '@/modules/account/hashRate';
import {
  TRANSFER_ING,
  TRANSFER_DONE,
  TRANSFER_CANCEL,
  getTransferStatusMap,
} from '@/pages/Account/HashRate/consts/transferOderStatus';
import FooterLayout from '../components/FooterLayout';
import StatusTag from '../components/StatusTag';

const CardFooter = {
  props: ['data', 'isVipHashrate'],

  methods: {
    getButtonDataSource(data) {
      return [
        {
          label: this.$t('transferShare'), // '分享给朋友',
          icon: <SharedFilled />,
          onClick: () => {
            locationServices.push(
              'sharePath',
              {
                query: {
                  id: data.id,
                  shareType: 'customerC2C',
                  activeName: hashrateStatusMap.TRANSFER,
                  hashrateType: data.hashrateType,
                },
              },
            );
          },
        },
        {
          label: this.$t('hashrateCancelTransfer'), // '取消转让',
          icon: <SquareForbidOutlined />,
          disabled: data.isRepayment === 0,
          onClick: () => {
            this.showModal = true;
            this.waitCancelItem = data;
          },
        },
      ];
    },
  },

  render() {
    const { data } = this;
    const statusTagMap = {
      [TRANSFER_ING]: '#f1b617',
      [TRANSFER_DONE]: '#11bc29',
      [TRANSFER_CANCEL]: '#df5353',
    };

    const isShowButton = data.status !== TRANSFER_CANCEL && data.isCancel;

    const tagNode = (
      <StatusTag
        color={statusTagMap[data.status]}
        label={data.name}
        tagText={getTransferStatusMap(data.status)}
      />
    );

    const footerButtonGroupNode = isShowButton ? <FooterButtonGroup dataSource={this.getButtonDataSource(data)} /> : '';

    return (
      <FooterLayout
        scopedSlots={{
          leftContent: () => tagNode,
          rightContent: () => footerButtonGroupNode,
        }}
      />
    );
  },
};

export default CardFooter;
