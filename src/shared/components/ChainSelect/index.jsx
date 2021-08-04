import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import { EthIcon, BtcIcon, UsdtIcon } from '@/shared/components/ChainIcon';
import Select from '@/shared/components/Select';
import styles from './index.less?module';

const columns = ['USDT', 'BTC', 'ETH'];

const ChainSelect = {
  props: {
    coin: String,
    coinInfoList: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getSuffixNode() {
      return (
        <div class={styles['Suffix-box']}>
          <span>{this.$t('walletSelectCoinType')}</span>
          <TriangleFilled className={styles['Suffix-icon']} />
        </div>
      );
    },
  },
  render() {
    const iconMap = {
      USDT: <UsdtIcon />,
      BTC: <BtcIcon />,
      ETH: <EthIcon />,
    };

    return (
      <div class={styles['coin-select-box']}>
        {iconMap[this.coin]}
        <Select
          value={this.coin}
          suffixIcon={this.getSuffixNode}
          onChange={value => this.$emit('coinChange', value)}
          disabled={this.disabled}
        >
          {columns.map((value, i) => (
            <Select.Option
              key={i}
              value={value}
            >
              {value}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  },
};

export default ChainSelect;
