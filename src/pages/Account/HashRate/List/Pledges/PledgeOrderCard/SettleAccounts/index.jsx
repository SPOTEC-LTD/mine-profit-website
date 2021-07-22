import numberUtils from 'aa-utils/lib/numberUtils';
import dateUtils from '@/shared/intl/utils/dateUtils';
import Card from '@/pages/Account/HashRate/List/components/Card';
import ListCell from '@/pages/Account/HashRate/List/components/ListCell';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import PledgesHashrateCellValue from '@/pages/Account/HashRate/List/components/PledgesHashrateCellValue';
import { settleTimeFormat } from '@/pages/Account/HashRate/consts/timeFormat';
import getFormatBigNumber from '@/pages/Account/HashRate/utils/getFormatBigNumber';
import {
  getSettleStatusMessage,
  INVEST_RISK,
  INVEST_REDEEM,
  INVEST_REPAY,
  INVEST_BREAK_CONTRACT,
  INVEST_OUTPUT_LOW,
} from '@/shared/consts/settleStatus';
import CardFooter from './CardFooter';

const Ordinary = {
  props: ['data'],
  methods: {
    getReturnTotalAmountData(data) {
      return (
        {
          label: this.$t('pledgeReturnHashrate'), // '归还算力',
          value: (
            <CellValue
              value={data.returnTotalAmount}
              unit={data.unit}
            />
          ),
        }
      );
    },

    getDeductionHashrateData(data) {
      return (
        {
          label: this.$t('pledgeDeductionHashrate'), // '抵扣算力',
          value: (
            <CellValue
              value={data.deductionHashrate}
              unit={data.unit}
            />
          ),
        }
      );
    },

    getRiskSettleListData(data) {
      return [
        {
          label: this.$t('pledgeTotalSettlementPrice'), // '算力结算总价',
          value: (
            <CellValue
              value={numberUtils.formatNumber(data.settleTotalPrice, { minimumFractionDigits: 2 })}
              unit="USDT"
            />
          ),
        },
        this.getDeductionHashrateData(data),
      ];
    },

    getRedeemSettleListData(data) {
      return [
        {
          label: this.$t('pledgePenaltyInterestPaid'), // '已支付罚息',
          value: (
            <CellValue
              value={getFormatBigNumber(data.penaltyInterest)}
              unit="USDT"
            />
          ),
        },
        this.getReturnTotalAmountData(data),
      ];
    },

    getRepayListData(data) {
      return [
        this.getReturnTotalAmountData(data),
      ];
    },

    getDefaultSettleListData(data) {
      return [
        this.getDeductionHashrateData(data),
        this.getReturnTotalAmountData(data),
      ];
    },

    getListData(data) {
      const otherStatusDataMap = {
        [INVEST_RISK]: this.getRiskSettleListData,
        [INVEST_REDEEM]: this.getRedeemSettleListData,
        [INVEST_REPAY]: this.getRepayListData,
        [INVEST_BREAK_CONTRACT]: this.getDefaultSettleListData,
        [INVEST_OUTPUT_LOW]: this.getDefaultSettleListData,
      };

      const endListData = otherStatusDataMap[data.settleStatus](data);

      return [
        {
          label: this.$t('hashrateOperationPledge'), // '质押算力',
          value: (<PledgesHashrateCellValue data={data} />),
        },
        {
          label: this.$t('investItemReson'), // '结算原因',
          value: getSettleStatusMessage(data.settleStatus),
        },
        {
          label: this.$t('investItemTime'), // '结算时间',
          value: dateUtils.formatDate(data.settleTime, settleTimeFormat),
        },
        {
          label: [INVEST_REDEEM, INVEST_REPAY].includes(data.settleStatus)
            ? this.$t('pledgeRedeemPrincipaled') : this.$t('pledgeRedeemPrincipal'),
          value: (
            <CellValue
              value={numberUtils.formatNumber(data.price, { minimumFractionDigits: 2 })}
              unit="USDT"
            />
          ),
        },
        ...endListData,
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
