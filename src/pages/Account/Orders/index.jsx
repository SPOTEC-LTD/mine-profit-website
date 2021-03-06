import { Table } from 'ant-design-vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import moment from 'moment';
import Select from '@/shared/components/Select';
import BaseContainer from '@/shared/components/BaseContainer';
import dateUtils from '@/shared/intl/utils/dateUtils';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { INVESTMENT, GET_ORDERS, UPDATE_ORDERS_LIST } from '@/modules/account/investment';
import DatePicker from '@/shared/components/DatePicker';
import styles from './index.less?module';

const pageSize = 10;

const Orders = {
  data() {
    return {
      pageNum: 1,
      chainType: 'all',
    };
  },
  computed: {
    ...mapState({
      getOrdersLoading: state => state.loading.effects[`${INVESTMENT}/${GET_ORDERS}`],
      orderData: state => state.investment.orderData,
    }),
  },

  mounted() {
    this[GET_ORDERS]({ data: {} });
  },

  methods: {
    ...mapActions(INVESTMENT, [GET_ORDERS]),
    ...mapMutations(INVESTMENT, [UPDATE_ORDERS_LIST]),
    getOrdersAction() {
      const resultData = {
        pageSize,
        pageNum: this.pageNum,
        chainType: this.chainType,
        startTime: this.startTime,
        endTime: this.endTime,
      };

      if (this.chainType === 'all') {
        delete resultData.chainType;
      }

      this[GET_ORDERS]({ data: resultData });
    },

    handlePageChange(page) {
      this.pageNum = page;
      this.getOrdersAction();
    },

    handleSelectChange(value) {
      this.chainType = value;
      this.pageNum = 1;
      this.getOrdersAction();
    },

    dateChange(date, timeType) {
      if (timeType === 'endTime') {
        this[timeType] = moment(date, 'YYYY.MM.DD').endOf('day').valueOf();
      } else {
        this[timeType] = moment(date, 'YYYY.MM.DD').valueOf();
      }
      this.getOrdersAction();
    },

  },

  render() {
    const columns = [
      {
        title: this.$t('marketOrderBuyTime'), // 购买时间
        dataIndex: 'createTime',
        align: 'center',
        customRender(value) {
          return dateUtils.formatDateTime(value, 'YYYY.MM.DD HH:mm');
        },
      },
      {
        title: this.$t('hashType'), // 算力类型
        dataIndex: 'chainType',
        align: 'center',
      },
      {
        title: this.$t('hashRateName'), // 算力名称
        dataIndex: 'ptName',
        align: 'center',
        customRender(value, { pname }) {
          return pname ? `${value} ${pname}` : value;
        },
      },
      {
        title: this.$t('marketOrderHashrateNum'), // 算力数量
        dataIndex: 'unitAmount',
        align: 'center',
        customRender(value, { unit }) {
          return `${bigNumberToFixed(value, 2)} ${unit}`;
        },
      },
      {
        title: this.$t('marketOrderOrderAmount'), // 订单金额
        dataIndex: 'orderPrice',
        align: 'center',
        customRender(value) {
          return `${bigNumberToFixed(value, 2)} USDT`;
        },
      },
      {
        title: this.$t('marketOrderPayAmount'), // 支付金额
        dataIndex: 'paymentPrice',
        align: 'center',
        customRender(value, { paymentChainType }) {
          const precision = paymentChainType === 'USDT' ? 2 : 8;

          return `${bigNumberToFixed(value, precision)} ${paymentChainType}`;
        },
      },
    ];

    const selectData = [
      {
        text: this.$t('allHashRate'),
        value: 'all',
      },
      {
        text: 'BTC',
        value: 'BTC',
      },
      {
        text: 'ETH',
        value: 'ETH',
      },
    ];

    return (
      <BaseContainer>
        <div class={styles['search-form']}>
          <div class={styles['date-picker-box']}>
            <DatePicker
              disabledDate={this.disabledStartDate}
              onChange={(_, dateString) => this.dateChange(dateString, 'startTime')}
            />
            <span class={styles['middle-to']}>{this.$t('to')}</span>
            <DatePicker
              disabledDate={this.disabledEndDate}
              onChange={(_, dateString) => this.dateChange(dateString, 'endTime')}
            />
          </div>
          <Select
            class={styles['hashrate-type-select']}
            value={this.chainType}
            onChange={this.handleSelectChange}
          >
            {
              selectData.map(item => (
                <Select.Option key={item.value}>
                  {item.text}
                </Select.Option>
              ))
            }
          </Select>
        </div>
        <Table
          rowKey="id"
          key={this.chainType}
          columns={columns}
          dataSource={this.orderData.list}
          loading={this.getOrdersLoading}
          pagination={{
            onChange: this.handlePageChange,
            current: this.orderData.pageInfo.pageNum,
            pageSize,
            total: this.orderData.pageInfo.total,
          }}
        />
      </BaseContainer>
    );
  },
};

export default Orders;
