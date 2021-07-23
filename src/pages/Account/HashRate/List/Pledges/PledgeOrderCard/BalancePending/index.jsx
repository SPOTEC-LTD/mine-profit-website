import numberUtils from 'aa-utils/lib/numberUtils';
import dateUtils from '@/shared/intl/utils/dateUtils';
import { getSettleStatusMessage } from '@/shared/consts/settleStatus';
import Card from '@/pages/Account/HashRate/List/components/Card';
import ListCell from '@/pages/Account/HashRate/List/components/ListCell';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import PledgesHashrateCellValue from '@/pages/Account/HashRate/List/components/PledgesHashrateCellValue';
import { settleTimeFormat } from '@/pages/Account/HashRate/consts/timeFormat';
import CardFooter from './CardFooter';

const BalancePending = {
  props: ['data'],
  methods: {
    getListData(data) {
      return [
        {
          label: this.$t('hashrateOperationPledge'), // 质押算力
          value: <PledgesHashrateCellValue data={data} />,
        },
        {
          label: this.$t('investItemReson'), // 结算原因
          value: getSettleStatusMessage(data.forceSettleStatus),
        },
        {
          label: this.$t('investItemTime'),
          value: dateUtils.formatDate(data.forceSettleTime, settleTimeFormat),
        },
        {
          label: this.$t('pledgeRedeemPrincipal'), // 应还款本金
          value: (
            <CellValue
              value={numberUtils.formatNumber(data.price, { minimumFractionDigits: 2 })}
              unit="USDT"
            />),
        },
        {
          label: this.$t('pledgeTypeDeductionHashrate'), // 抵扣算力(待确认)
          value: (
            <CellValue
              value={numberUtils.formatNumber(data.deductionHashrate, { minimumFractionDigits: 2 })}
              unit={data.unit}
            />),
        },
        {
          label: this.$t('pledgeTypeReturnHashrate'), // 归还算力(待确认)
          value: (
            <CellValue
              value={numberUtils.formatNumber(data.returnTotalAmount, { minimumFractionDigits: 2 })}
              unit={data.unit}
            />),
        },
      ];
    },
  },

  render() {
    const { data } = this;
    return (
      <Card
        scopedSlots={{
          header: () => this.$scopedSlots.title(),
          footer: () => <CardFooter data={data} />,
        }}
      >
        <ListCell dataSource={this.getListData(data)} />
      </Card>
    );
  },
};

export default BalancePending;
