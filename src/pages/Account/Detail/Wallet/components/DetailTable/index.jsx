import { mapState, mapMutations, mapActions } from 'vuex';
import { Table } from 'ant-design-vue';
import CorrectOutlined from 'ahoney/lib/icons/CorrectOutlined';
import BigEllipsisOutlined from 'ahoney/lib/icons/BigEllipsisOutlined';
import CancelledOutlined from 'ahoney/lib/icons/CancelledOutlined';

import { WALLET, GET_WALLET_DETAIL, RESET_STATE, GET_LEDGER_TYPE_LIST } from '@/modules/account/wallet';
import { PROGRESSING, FAIL, SUCCESS } from '@/shared/consts/rechargeLedgerStatus';
import dateUtils from '@/shared/intl/utils/dateUtils';

import styles from './index.less?module';

const dateFormat = 'YYYY.MM.DD';
const dateTimeFormat = `${dateFormat} HH:mm`;

const DetailTable = {
  props: {
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
      ledgerTypeMap: state => state.wallet.ledgerTypeMap,
      walletDetailLoading: state => state.loading.effects[`${WALLET}/${GET_WALLET_DETAIL}`],
    }),
  },
  mounted() {
    this.getWalletDetailList();
    this[GET_LEDGER_TYPE_LIST]();
  },
  methods: {
    ...mapMutations(WALLET, [RESET_STATE]),
    ...mapActions(WALLET, [GET_WALLET_DETAIL, GET_LEDGER_TYPE_LIST]),

    getWalletDetailList(options = {}) {
      const { reset, query = {} } = options;
      Object.keys(query).forEach(key => {
        if (!query[key]) {
          delete query[key];
        }
      });
      this.query = query;
      const data = {
        pageSize: 10,
        pageNum: reset ? 1 : this.pageNum,
        ...this.query,
      };
      this[GET_WALLET_DETAIL](data);
    },

    finallyColumns() {
      const ledgerTagMap = {
        [PROGRESSING]: <BigEllipsisOutlined className={styles.progressing} />,
        [FAIL]: <CancelledOutlined className={styles.fail} />,
        [SUCCESS]: <CorrectOutlined className={styles.success} />,
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
          customRender: (_, { ledgerType }) => this.ledgerTypeMap[ledgerType],
        },
        {
          dataIndex: 'amount',
          align: 'center',
          customRender: (_, { amount, chainType }) => `${amount > 0 ? '+' : ''}${amount}${chainType}`,
        },
        {
          dataIndex: 'status',
          align: 'center',
          customRender: (_, { status }) => <span class={styles.ledgerTag}>{ledgerTagMap[status]}</span>,
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
      this.getWalletDetailList({ query: this.query });
    },
  },

  render() {
    const { pageNum, total } = this.pageInfo;
    const paginationConfig = {
      current: pageNum,
      total,
      showTotal: () => `${this.$t('altogether')} ${total} ${this.$t('number')}`,
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
