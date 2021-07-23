import {
  CardOutlined,
  SyncOutlined,
} from 'ahoney/lib/icons';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import FooterLayout from '@/pages/Account/HashRate/List/components/FooterLayout';
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
              // Toast({ message: this.$t('pledgeRepayTips') });
              return;
            }
          },
        },
        {
          label: this.$t('payTypeRedeem'), // '提前赎回',
          icon: <SyncOutlined />,
          onClick: () => {
            console.log('提前赎回');
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
