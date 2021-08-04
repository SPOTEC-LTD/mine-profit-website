import { Button } from 'ant-design-vue';

import { HASH_RATE_ALL } from '@/shared/consts/hashrateType';
import { COIN, lineList, getType } from '@/pages/Account/Detail/Wallet/consts/lineType';
import { EthIcon, BtcIcon, UsdtIcon } from '@/shared/components/ChainIcon';
import Select from '@/shared/components/Select';

import styles from './index.less?module';

const AddressHeader = {
  props: {
    coin: String,
    default: '',
  },
  methods: {
    coinChange(value) {
      const coin = value === 'USDT' ? 'USDT-ERC20' : value;
      this.$emit('coinChange', coin);
    },
  },
  render() {
    const iconMap = {
      USDT: <UsdtIcon class={styles.icon} />,
      BTC: <BtcIcon class={styles.icon} />,
      ETH: <EthIcon class={styles.icon} />,
    };
    const coinList = [
      { text: this.$t('walletAllCoins'), value: HASH_RATE_ALL },
      { text: 'USDT', value: 'USDT' },
      { text: 'BTC', value: 'BTC' },
      { text: 'ETH', value: 'ETH' },
    ];
    return (
      <div class={['select-table', styles['filter-group']]}>
        <div class={styles['coin-line-select']}>
          <div class={styles['coin-select']}>
            {this.coin && iconMap[getType(this.coin, COIN)]}
            <Select
              defaultValue={HASH_RATE_ALL}
              onChange={this.coinChange}
            >
              {coinList.map(({ text, value }, i) => (
                <Select.Option
                  key={i}
                  value={value}
                >
                  {text}
                </Select.Option>
              ))}
            </Select>
          </div>
          {this.coin !== HASH_RATE_ALL && getType(this.coin, COIN) === 'USDT' && (
            <Select
              class={styles['hashrate-status-select']}
              defaultValue={this.coin}
              onChange={value => this.$emit('coinChange', value)}
            >
              {lineList.map(({ text, value }, i) => (
                <Select.Option
                  key={i}
                  value={value}
                >
                  {text}
                </Select.Option>
              ))}
            </Select>
          )}
        </div>
        <Button
          type="primary"
          class={styles['add-button']}
          onClick={() => this.$emit('openAddModal')}
        >
          {this.$t('add')}
        </Button>
      </div>

    );
  },
};

export default AddressHeader;
