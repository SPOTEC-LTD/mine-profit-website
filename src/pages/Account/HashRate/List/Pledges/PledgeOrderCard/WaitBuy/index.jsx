import numberUtils from 'aa-utils/lib/numberUtils';
import Card from '@/pages/Account/HashRate/List/components/Card';
import ListCell from '@/pages/Account/HashRate/List/components/ListCell';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import PledgesHashrateCellValue from '@/pages/Account/HashRate/List/components/PledgesHashrateCellValue';
import CardFooter from './CardFooter';

const Ordinary = {
  props: ['data'],
  methods: {
    getListData(data) {
      return [
        {
          label: this.$t('pledgeDialogOriginal'), // '原始质押算力',
          value: <PledgesHashrateCellValue data={data} />,
        },
        {
          label: this.$t('pledgeCanGet'), // '质押可获算力',
          value: <CellValue value={data.pledgeAmount || '--'} unit={data.unit} />,
        },
        {
          label: this.$t('pledgeDate'), // '质押期限',
          value: (
            <CellValue
              value={data.pledgeDuration || '--'}
              unit={this.$t('day')}
            />),
        },
        {
          label: this.$t('pledgeYearIncome'), // '认购年化收益',
          value: numberUtils.formatPercent(data.annualRate, { minimumFractionDigits: 2 }),
        },
        {
          label: this.$t('pledgeSellPrice'), // '认购价',
          value: (
            <CellValue
              value={numberUtils.formatNumber(data.price, { minimumFractionDigits: 2 })}
              unit="USDT"
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

export default Ordinary;
