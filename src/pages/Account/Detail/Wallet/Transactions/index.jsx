import { mapState } from 'vuex';
import moment from 'moment';
import { ALL, getLedgerStatusList } from '@/shared/consts/rechargeLedgerStatus';
import { HASH_RATE_ALL, HASH_RATE_BTC, HASH_RATE_ETH, HASH_RATE_USDT } from '@/shared/consts/hashrateType';
import BaseContainer from '@/shared/components/BaseContainer';
import Select from '@/shared/components/Select';
import DatePicker from '@/shared/components/DatePicker';
import DetailTable from '../components/DetailTable';

import styles from './index.less?module';

const CHAIN_TYPE = 'chainType';
const LEDGER_TYPE = 'ledgerType';
const LEDGER_STATUS = 'ledgerStatus';

const Transactions = {
  computed: {
    ...mapState({
      dynamicChainTypeList: state => state.dynamicChainTypeList,
      ledgerTypeList: state => state.wallet.ledgerTypeList,
    }),

    dynamicChain() {
      const [chainInfo = { symbol: '' }] = this.dynamicChainTypeList;
      return chainInfo.symbol;
    },

    resultLegerTypeList() {
      return [
        { text: this.$t('walletAllTypesAll'), value: ALL },
        ...this.ledgerTypeList,
      ];
    },
  },
  methods: {
    getWalletDetail() {
      const query = {
        ledgerType: this.ledgerType,
        chainType: this.chainType,
        status: this.ledgerStatus,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      this.$refs.detailTableRef.getWalletDetailList({ reset: true, query });
    },
    selectChange(paramName, val) {
      this[paramName] = val;
      this.getWalletDetail();
    },
    dateChange(date, timeType) {
      if (timeType === 'endTime') {
        this[timeType] = moment(date, 'YYYY.MM.DD').endOf('day').valueOf();
      } else {
        this[timeType] = moment(date, 'YYYY.MM.DD').valueOf();
      }
      this.getWalletDetail();
    },
    disabledStartDate(startTime) {
      if (!this.endTime) {
        return false;
      }
      return startTime.isAfter(this.endTime);
    },
    disabledEndDate(endTime) {
      if (!this.startTime) {
        return false;
      }
      return endTime.isBefore(this.startTime);
    },
  },

  render() {
    const columns = [
      { title: this.$t('transactionTime') },
      { title: this.$t('transactionType') },
      { title: this.$t('transactionNumber') },
      { title: this.$t('transactionStatus') },
    ];

    const chainTypeList = [
      { text: this.$t('walletAllCoins'), value: HASH_RATE_ALL },
      { text: HASH_RATE_USDT, value: HASH_RATE_USDT },
      { text: HASH_RATE_BTC, value: HASH_RATE_BTC },
      { text: HASH_RATE_ETH, value: HASH_RATE_ETH },
      { text: this.dynamicChain, value: this.dynamicChain },
    ];

    const selectList = [
      { name: LEDGER_TYPE, optionsList: this.resultLegerTypeList, defaultValue: ALL },
      { name: CHAIN_TYPE, optionsList: chainTypeList, defaultValue: HASH_RATE_ALL },
      { name: LEDGER_STATUS, optionsList: getLedgerStatusList(), defaultValue: ALL },
    ];

    return (
      <BaseContainer>
        <div class={['select-table', styles['filter-group']]}>
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
          {selectList.map(({ name, optionsList, defaultValue }, index) => (
            <Select
              class={styles['hashrate-status-select']}
              key={index}
              defaultValue={defaultValue}
              onChange={val => this.selectChange(name, val)}
            >
              {optionsList.map(({ text, value }, i) => (
                <Select.Option
                  key={i}
                  value={value}
                >
                  {text}
                </Select.Option>
              ))}
            </Select>
          ))}
        </div>
        <DetailTable
          ref='detailTableRef'
          columnsConfig={columns}
        />
      </BaseContainer>
    );
  },
};

export default Transactions;
