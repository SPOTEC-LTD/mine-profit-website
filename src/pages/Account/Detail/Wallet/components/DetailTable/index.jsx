import { mapState, mapMutations, mapActions } from 'vuex';
import { Table } from 'ant-design-vue';
import CorrectOutlined from 'ahoney/lib/icons/CorrectOutlined';

import { WALLET, GET_WALLET_DETAIL, RESET_STATE } from '@/modules/account/wallet';
import { PROGRESSING, FAIL, SUCCESS } from '@/shared/consts/rechargeLedgerStatus';
import { getLedgerTypeMap } from '@/shared/consts/rechargeLedgerType';
import dateUtils from '@/shared/intl/utils/dateUtils';

import styles from './index.less?module';

const dateFormat = 'YYYY.MM.DD';
const dateTimeFormat = `${dateFormat} HH:mm`;

const DetailTable = {
  props: {
    query: {
      type: Object,
      default() {
        return {};
      },
    },
    columnsConfig: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      pageNum: 1,
    };
  },
  computed: {
    ...mapState({
      walletDetailList: state => state.wallet.walletDetailList,
      pageInfo: state => state.wallet.pageInfo,
      walletDetailLoading: state => state.loading.effects[`${WALLET}/${GET_WALLET_DETAIL}`],
    }),
  },
  mounted() {
    this.getWalletDetailList();
  },
  methods: {
    ...mapMutations(WALLET, [RESET_STATE]),
    ...mapActions(WALLET, [GET_WALLET_DETAIL]),

    getWalletDetailList(options = {}) {
      const { reset } = options;
      const data = {
        pageSize: 10,
        pageNum: reset ? 1 : this.pageNum,
        ...this.query,
      };
      this[GET_WALLET_DETAIL](data);
    },

    finallyColumns() {
      const ledgerTagMap = {
        [PROGRESSING]: <span>进行中</span>,
        [FAIL]: <span class={styles.fail}>失败</span>,
        [SUCCESS]: <CorrectOutlined />,
      };

      const columns = [
        {
          dataIndex: 'coin',
          align: 'center',
          customRender: (_, { createTime }) => dateUtils.formatDateTime(createTime, dateTimeFormat),
        },
        {
          dataIndex: 'ledgerType',
          align: 'center',
          customRender: (_, { ledgerType }) => getLedgerTypeMap(ledgerType),
        },
        {
          dataIndex: 'amount',
          align: 'center',
          customRender: (_, { amount, chainType }) => `${amount > 0 ? '+' : ''}${amount}${chainType}`,
        },
        {
          dataIndex: 'status',
          align: 'center',
          customRender: (_, { status }) => <span class={styles.success}>{ledgerTagMap[status]}</span>,
        },
      ];
      return columns.map((item, index) => {
        return {
          ...item,
          ...this.columnsConfig[index],
        };
      });
    },

    handlePageChange(page) {
      this.pageNum = page;
      this.getWalletDetailList();
    },
  },

  render() {
    const { pageNum, total } = this.pageInfo;
    const paginationConfig = {
      current: pageNum,
      total,
      onChange: this.handlePageChange,
    };
    return (
      <Table
        class='blue-table'
        rowKey={(_, index) => index}
        columns={this.finallyColumns()}
        dataSource={this.walletDetailList}
        loading={this.walletDetailLoading}
        pagination={paginationConfig}
        {...{
          props: this.$attrs,
          on: this.$listeners,
        }}
      />
    );
  },
};

export default DetailTable;
