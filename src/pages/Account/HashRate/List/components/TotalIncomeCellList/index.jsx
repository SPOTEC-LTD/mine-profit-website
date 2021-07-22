import ListCell from '@/pages/Account/HashRate/List/components/ListCell';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import getFormatBigNumber from '@/pages/Account/HashRate/utils/getFormatBigNumber';
import styles from './index.less?module';

const TotalIncomeCellList = {
  props: {
    data: Object,
    className: String,
  },

  methods: {
    getFooterListData(data) {
      return [
        {
          label: this.$t('pledgeAllInterest'), // '累计支付利息',
          value: (
            <CellValue
              value={getFormatBigNumber(data.totalPayInterest || '0', 8)}
              unit="USDT"
            />
          ),
        },
        {
          label: this.$t('hashrateAllNetOutput'), // '累计净产出',
          value: (
            <CellValue
              value={getFormatBigNumber(data.totalIncome || '0', 8)}
              unit={data.hashrateType}
            />
          ),
        },
      ];
    },
  },
  render() {
    return (
      <div class={styles['settle-footer']}>
        <div class={styles['settle-footer-list']}>
        <ListCell
          className={styles['settle-footer-cell-item']}
          dataSource={this.getFooterListData(this.data)}
        />
        </div>
      </div>
    );
  },
};

export default TotalIncomeCellList;
