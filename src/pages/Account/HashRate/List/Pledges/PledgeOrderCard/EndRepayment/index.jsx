import numberUtils from 'aa-utils/lib/numberUtils';
import Card from '@/pages/Account/HashRate/List/components/Card';
import ListCell from '@/pages/Account/HashRate/List/components/ListCell';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import PledgesHashrateCellValue from '@/pages/Account/HashRate/List/components/PledgesHashrateCellValue';
import getFormatBigNumber from '@/pages/Account/HashRate/utils/getFormatBigNumber';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';

const EndRepayment = {
  props: ['data'],
  methods: {
    getListData(data) {
      return [
        {
          label: this.$t('hashrateOperationPledge'), // '质押算力',
          value: <PledgesHashrateCellValue data={data} />,
        },
        {
          label: this.$t('ratioDialogRatio'), // '分配比例',
          value: <ProportionCellValue data={data} />,
        },
        {
          label: this.$t('pledgeDuration'), // '质押期限',
          value: <PledgeDurationCellValue data={data} />,
        },
        {
          label: this.$t('pledgeRedeemPrincipaled'), // '已还款本金',
          value: (
            <CellValue
              value={numberUtils.formatNumber(data.actualRepaymentPrincipe, { minimumFractionDigits: 2 })}
              unit="USDT"
            />
          ),
        },
        {
          label: this.$t('pledgeYesterdayOutput'), // '昨日分配产出',
          value: (
            <CellValue
              value={data.yesterdayOutput ? bigNumberToFixed(data.yesterdayOutput, 8) : '--'}
              unit={data.hashrateType}
            />
          ),
        },
        {
          label: this.$t('pledgeDailyInterest'), // '每日利息',
          showMention: true,
          notificationContent: this.$t('pledgeDailyInterestToInvestor'), // '需支付给投资者的每日利息',
          value: (
            <CellValue
              value={getFormatBigNumber(data.dayInterestUsdt)}
              unit="USDT"
            />
          ),
        },
        {
          label: ' ',
          value: (
            <CellValue
              value={`≈${getFormatBigNumber(data.dayInterest)}`}
              unit={data.hashrateType}
            />
          ),
        },
        {
          label: this.$t('hashrateYesterdayNetOutput'), // '昨日净产出',
          showMention: true,
          notificationContent: this.$t('pledgeDailyInterestToInvestorTips'), // '净产出扣除了利息后的实际到账收益',
          value: (
            <CellValue
              value={bigNumberToFixed(data.yesterdayIncome || '0', 8)}
              unit={data.hashrateType}
            />
          ),
        },
        {
          label: this.$t('hashrateAllNetOutput'), // '累计净产出',
          value: (
            <CellValue
              value={bigNumberToFixed(data.totalIncome || '0', 8)}
              unit={data.hashrateType}
            />
          ),
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
        }}
      >
        <ListCell dataSource={this.getListData(data)} />
      </Card>
    );
  },
};

export default EndRepayment;
