import Card from '@/pages/Account/HashRate/List/components/Card';
import ListCell from '@/pages/Account/HashRate/List/components/ListCell';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import PledgesHashrateCellValue from '@/pages/Account/HashRate/List/components/PledgesHashrateCellValue';
import ProportionCellValue from '@/pages/Account/HashRate/List/components/ProportionCellValue';
import PledgeDurationCellValue from '@/pages/Account/HashRate/List/components/PledgeDurationCellValue';
import getFormatBigNumber from '@/pages/Account/HashRate/utils/getFormatBigNumber';
import CardFooter from './CardFooter';

const PledgesIng = {
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
          label: this.$t('pledgeYesterdayOutput'), // '昨日分配产出',
          value: (
            <CellValue
              value={getFormatBigNumber(data.yesterdayOutput)}
              unit={data.hashrateType}
            />),
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
              value={getFormatBigNumber(data.yesterdayIncome)}
              unit={data.hashrateType}
            />
          ),
        },
        {
          label: this.$t('hashrateAllNetOutput'), // '累计净产出',
          value: (
            <CellValue
              value={getFormatBigNumber(data.totalIncome || '0')}
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
          footer: () => <CardFooter data={data} />,
        }}
      >
        <ListCell dataSource={this.getListData(data)} />
      </Card>
    );
  },
};

export default PledgesIng;
