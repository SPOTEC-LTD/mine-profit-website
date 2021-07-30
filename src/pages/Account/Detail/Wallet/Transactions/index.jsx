import { WALLET_STATUS_ALL, getLedgerStatusList } from '@/shared/consts/rechargeLedgerStatus';
import { HASH_RATE_ALL, HASH_RATE_BTC, HASH_RATE_ETH, HASH_RATE_USDT } from '@/shared/consts/hashrateType';
import { WALLET_TYPE_ALL, getLedgerTypeList } from '@/shared/consts/rechargeLedgerType';
import BaseContainer from '@/shared/components/BaseContainer';
import Select from '@/shared/components/Select';
import DatePicker from '@/shared/components/DatePicker';
import DetailTable from '../components/DetailTable';

import styles from './index.less?module';

const COIN_TYPE = 'coinType';
const LEDGER_TYPE = 'ledgerType';
const LEDGER_STATUS = 'ledgerStatus';

const Transactions = {
  data() {
    return {
      ledgerType: '',
      chainType: '',
      ledgerStatus: '',
      startTime: null,
      endTime: null,
    };
  },

  methods: {
    changeCouponsStatus(value) {
      this.couponsStatus = value;
      this.$refs.detailTableRef.getWalletDetailList();
    },
    selectChange(str, val) {
      this[str] = val;
      this.$nextTick(() => { this.$refs.detailTableRef.getWalletDetailList({ reset: true }); });
    },
    getQuery() {
      return {
        ledgerType: this.ledgerType || null,
        chainType: this.chainType || null,
        status: this.ledgerStatus || null,
      };
    },
    dateChange(date, timeType) {
      this[timeType] = new Date(date).valueOf();
      this.$nextTick(() => { this.$refs.detailTableRef.getWalletDetailList({ reset: true }); });
    },
    disabledStartDate(startTime) {
      const { endTime } = this;
      if (!startTime || !endTime) {
        return false;
      }
      return startTime.valueOf() > endTime.valueOf();
    },
    disabledEndDate(endTime) {
      const { startTime } = this;
      if (!endTime || !startTime) {
        return false;
      }
      return startTime.valueOf() >= endTime.valueOf();
    },
  },

  render() {
    const query = {
      ledgerType: this.ledgerType || null,
      chainType: this.chainType || null,
      status: this.ledgerStatus || null,
      startTime: this.startTime || null,
      endTime: this.endTime || null,
    };

    const columns = [
      { title: this.$t('transactionTime') },
      { title: this.$t('transactionType') },
      { title: this.$t('transactionNumber') },
      { title: this.$t('transactionStatus') },
    ];

    const coinTypeList = [
      { text: this.$t('walletAllCoins'), value: HASH_RATE_ALL },
      { text: HASH_RATE_USDT, value: HASH_RATE_USDT },
      { text: HASH_RATE_BTC, value: HASH_RATE_BTC },
      { text: HASH_RATE_ETH, value: HASH_RATE_ETH },
    ];

    const dropdownList = [
      { name: LEDGER_TYPE, optionsList: getLedgerTypeList(), defaultValue: WALLET_TYPE_ALL },
      { name: COIN_TYPE, optionsList: coinTypeList, defaultValue: HASH_RATE_ALL },
      { name: LEDGER_STATUS, optionsList: getLedgerStatusList(), defaultValue: WALLET_STATUS_ALL },
    ];

    return (
      <BaseContainer>
        <div class={['select-table', styles['filter-group']]}>
          <div class={styles['date-picker-box']}>
            <DatePicker
              value={this.startTime}
              disabledDate={this.disabledStartDate}
              onChange={(_, dateString) => this.dateChange(dateString, 'startTime')}
            />
            <span class={styles['middle-to']}>至</span>
            <DatePicker
              value={this.endTime}
              disabledDate={this.disabledEndDate}
              onChange={(_, dateString) => this.dateChange(dateString, 'endTime')}
            />
          </div>
          {dropdownList.map(({ name, optionsList, defaultValue }, index) => (
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
          query={query}
        />
      </BaseContainer>
    );
  },
};

export default Transactions;
