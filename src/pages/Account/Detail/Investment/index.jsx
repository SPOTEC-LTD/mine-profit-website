import { Table } from 'ant-design-vue';
import { mapActions, mapState } from 'vuex';
import { INVESTMENT, GET_INVESTMENT_LIST } from '@/modules/account/investment';
import KeepTabs from '@/shared/components/KeepTabs';
import dateUtils from '@/shared/intl/utils/dateUtils';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import getTimes from '@/shared/utils/getTimes';
import { getSettleStatusMessage } from '@/shared/consts/settleStatus';
import Card from '../components/Card';
import WidgetTitle from '../components/WidgetTitle';
import styles from './index.less?module';

const Investment = {
  data() {
    return {
      hashTypeStatusKey: this.$route.query.hashTypeStatus || 'gaining',
    };
  },

  computed: {
    ...mapState({
      gainingList: state => state.investment.gainingList,
      settledList: state => state.investment.settledList,
      getInvestmentListLoading: state => state.loading.effects[`${INVESTMENT}/${GET_INVESTMENT_LIST}`],
    }),
  },

  mounted() {
    this.getInvestmentListAction();
  },

  methods: {
    ...mapActions(INVESTMENT, [GET_INVESTMENT_LIST]),
    onTabsChange(newActiveTabKey) {
      this.hashTypeStatusKey = newActiveTabKey;
      this.getInvestmentListAction();
    },

    getInvestmentListAction() {
      this[GET_INVESTMENT_LIST]({ type: this.hashTypeStatusKey });
    },
  },

  render() {
    const dayLabel = this.$t('day');
    const columns = [
      {
        title: this.$t('investTime'), // 投资时间
        dataIndex: 'settleTime',
        align: 'center',
        customRender(value) {
          return dateUtils.formatDateTime(value, 'YYYY.MM.DD HH:mm');
        },
      },
      {
        title: this.$t('investPeople'), // 投资人
        class: styles['invest-people'],
        dataIndex: 'nickname',
        align: 'center',
      },
      {
        title: this.$t('investItemPrincipal'), // '认购本金',
        dataIndex: 'price',
        align: 'center',
        customRender(value) {
          return `${bigNumberToFixed(value, 2)} USDT`;
        },
      },
      {
        title: this.$t('investItemAnnualRate'), // '年化收益率',
        dataIndex: 'annualRate',
        align: 'center',
        customRender(value) {
          return `${getTimes({ number: value, times: 100 })} %`;
        },
      },
      {
        title: this.$t('investItemDuration'), // '投资期限'
        dataIndex: 'pledgePassTime',
        align: 'center',
        customRender: (_, { pledgePassTime, pledgeDuration }) => {
          return `${pledgePassTime}/${pledgeDuration} ${dayLabel}`;
        },
      },
      {
        title: this.$t('investItemSettledProfit'),
        dataIndex: 'settleIncome',
        align: 'center',
        customRender(value) {
          return `${bigNumberToFixed(value, 8)} USDT`;
        },
      },
    ];

    const otherColumns = [
      {
        title: this.$t('investItemReson'), // '投资期限'
        dataIndex: 'settleStatus',
        align: 'center',
        customRender: value => {
          return getSettleStatusMessage(value);
        },
      },
      {
        title: this.$t('investItemTime'),
        dataIndex: 'settleTime',
        align: 'center',
        customRender(value) {
          return dateUtils.formatDateTime(value, 'YYYY.MM.DD HH:mm');
        },
      },
    ];

    return (
      <div>
        <WidgetTitle>{this.$t('mineTitleInvest')}</WidgetTitle>
        <Card>
          <KeepTabs
            class='mine-tabs-card'
            value={this.hashTypeStatusKey}
            onChange={this.onTabsChange}
            activeKeyName="hashTypeStatus"
          >
            <KeepTabs.TabPane key="gaining" tab={this.$t('typeInRevenue')}>
              <Table
                class={styles.table}
                rowKey="id"
                columns={columns}
                dataSource={this.gainingList}
                loading={this.getListLoading}
                pagination={false}
              />
            </KeepTabs.TabPane>
            <KeepTabs.TabPane key="settled" tab={this.$t('typeSettled')}>
              <Table
                class={styles.table}
                rowKey="id"
                columns={columns.concat(otherColumns)}
                dataSource={this.settledList}
                loading={this.getListLoading}
                pagination={false}
              />
            </KeepTabs.TabPane>
          </KeepTabs>
        </Card>
      </div>
    );
  },
};

export default Investment;
