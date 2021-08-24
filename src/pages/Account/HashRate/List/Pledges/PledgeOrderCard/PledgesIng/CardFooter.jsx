import CardOutlined from 'ahoney/lib/icons/CardOutlined';
import SyncOutlined from 'ahoney/lib/icons/SyncOutlined';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import FooterLayout from '@/pages/Account/HashRate/List/components/FooterLayout';
import { pledgeRedeemPath, pledgeRepaymentPath } from '@/router/consts/urls';
import Notification from '@/shared/services/Notification';
import locationServices from '@/shared/services/location/locationServices';
import PledgeStatusTag from '../components/PledgeStatusTag';

const CardFooter = {
  props: ['data'],

  methods: {
    getButtonDataSource(data) {
      const disabled = data.isRepayment === 0;
      return [
        {
          label: this.$t('payTypeRepay'), // '立即还款',
          icon: <CardOutlined />,
          disabled,
          onClick: () => {
            if (disabled) {
              Notification.error(this.$t('pledgeRepayTips'));
              return;
            }
            locationServices.push(pledgeRepaymentPath, { params: { id: data.id } });
          },
        },
        {
          label: this.$t('payTypeRedeem'), // '提前赎回',
          icon: <SyncOutlined />,
          onClick: () => {
            locationServices.push(pledgeRedeemPath, { params: { id: data.id } });
          },
        },
      ];
    },
  },

  render() {
    const { data } = this;
    return (
      <FooterLayout
        scopedSlots={{
          leftContent: () => <PledgeStatusTag status={data.status} />,
          rightContent: () => <FooterButtonGroup dataSource={this.getButtonDataSource(data)} />,
        }}
      />
    );
  },
};

export default CardFooter;
