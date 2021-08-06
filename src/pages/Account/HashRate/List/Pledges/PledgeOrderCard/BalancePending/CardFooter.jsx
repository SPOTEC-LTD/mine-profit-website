import { CheckCircleOutlined } from 'ahoney/lib/icons';
import { mapActions, mapState } from 'vuex';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import FooterLayout from '@/pages/Account/HashRate/List/components/FooterLayout';
import TotalIncomeCellList from '@/pages/Account/HashRate/List/components/TotalIncomeCellList';
import { HASH_RATE, PLEDGE_CONFIRM_SETTLE } from '@/modules/account/hashRate';
import Notification from '@/shared/services/Notification';
import PledgeStatusTag from '../components/PledgeStatusTag';

const CardFooter = {
  props: ['data'],
  computed: {
    ...mapState({
      loading: state => state.loading.effects[`${HASH_RATE}/${PLEDGE_CONFIRM_SETTLE}`]
    }),
  },
  methods: {
    ...mapActions(HASH_RATE, [PLEDGE_CONFIRM_SETTLE]),
    getButtonDataSource(data) {
      return [
        {
          label: this.$t('confirm'),
          icon: <CheckCircleOutlined />,
          disabled: data.isRepayment === 0,
          loading: this.loading,
          onClick: () => {
            this[PLEDGE_CONFIRM_SETTLE]({ id: data.id }).then(() => {
              Notification.success(this.$t('operationSuccess'));
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
