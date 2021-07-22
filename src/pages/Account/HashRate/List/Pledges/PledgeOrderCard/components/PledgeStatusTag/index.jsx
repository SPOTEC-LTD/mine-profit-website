import StatusTag from '@/pages/Account/HashRate/List/components/StatusTag';
import {
  WAIT_BUY,
  PLEDGES_ING,
  BALANCE_PENDING,
  SETTLE_ACCOUNTS,
  END_REPAYMENT,
  getPledgeOderStatusMap,
} from '@/pages/Account/HashRate/consts/pledgesOderStatus';

const orderTitleTagColor = {
  [WAIT_BUY]: '#ffd407',
  [PLEDGES_ING]: '#ffd407',
  [BALANCE_PENDING]: '#ffd407',
  [SETTLE_ACCOUNTS]: '#11BC29',
  [END_REPAYMENT]: '#11BC29',
};

const PledgeStatusTag = {
  props: ['status'],

  render() {
    return (
      <StatusTag
        color={orderTitleTagColor[this.status]}
        tagText={getPledgeOderStatusMap(this.status)}
      />
    );
  },
};

export default PledgeStatusTag;
