import {
  HASHRATE_ENOUGH,
  HASHRATE_NO_ENOUGH,
  HASHRATE_NUMBER_NO_ENOUGH,
} from '@/pages/Account/HashRate/consts/hashrateAmountType';
import SquareLockOutlined from 'ahoney/lib/icons/SquareLockOutlined';
import FooterButtonGroup from '@/pages/Account/HashRate/List/components/FooterButtonGroup';
import locationServices from '@/shared/services/location/locationServices';
import { CLOSE } from '@/pages/Account/HashRate/consts/pledgeSourceType';
import { pledgeHashratePath } from '@/router/consts/urls';
import Notification from '@/shared/services/Notification';
import FooterLayout from '../components/FooterLayout';
import AmountValue from '../components/AmountValue';

const CardFooter = {
  props: ['data', 'isVipHashrate'],

  methods: {
    pledgeAction({ isPledge, productTemplateId, id, sourceType, hashrateType }) {
      if (isPledge === HASHRATE_ENOUGH) {
        locationServices.push(pledgeHashratePath,
          { params: { productTemplateId }, query: { source: CLOSE, id, sourceType, hashrateType } });
        return;
      }

      const pledgeMessageMap = {
        [HASHRATE_NO_ENOUGH]: this.$t('hashratePledgeAllNotEnough'),
        [HASHRATE_NUMBER_NO_ENOUGH]: this.$t('hashratePledgeSameNotEnough'),
      };

      Notification.error(pledgeMessageMap[isPledge]);
    },

    getButtonDataSource(data) {
      return [
        {
          label: this.$t('typePledge'),
          icon: <SquareLockOutlined />,
          disabled: data.isPledge !== HASHRATE_ENOUGH,
          onClick: () => this.pledgeAction(data),
        },
      ];
    },
  },

  render() {
    const { data } = this;
    return (
      <FooterLayout
        scopedSlots={{
          leftContent: () => <AmountValue data={data} />,
          rightContent: () => <FooterButtonGroup dataSource={this.getButtonDataSource(data)} />,
        }}
      />
    );
  },
};

export default CardFooter;
