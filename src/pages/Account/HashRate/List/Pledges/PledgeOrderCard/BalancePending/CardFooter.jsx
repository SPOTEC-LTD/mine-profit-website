import { CheckCircleOutlined } from 'ahoney/lib/icons';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import FooterLayout from '@/pages/Account/HashRate/List/components/FooterLayout';
import TotalIncomeCellList from '@/pages/Account/HashRate/List/components/TotalIncomeCellList';
import { PLEDGE_CONFIRM_SETTLE } from '@/modules/account/hashRate';
import PledgeStatusTag from '../components/PledgeStatusTag';

const CardFooter = {
  props: ['data'],

  methods: {
    getButtonDataSource(data) {
      return [
        {
          label: this.$t('confirm'),
          icon: <CheckCircleOutlined />,
          disabled: data.isRepayment === 0,
          loading: this.loading,
          onClick: () => {
            this[PLEDGE_CONFIRM_SETTLE]({ id: data.id }).then(() => {
              // Toast({ message: this.$t('operationSuccess') });
              this.$emit('refresh');
            });
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
          topExtra: () => <TotalIncomeCellList data={data} />,
          leftContent: () => <PledgeStatusTag status={data.status} />,
          rightContent: () => <FooterButtonGroup dataSource={this.getButtonDataSource(data)} />,
        }}
      />
    );
  },
};

export default CardFooter;
