import { mapState, mapActions } from 'vuex';
import TriangleFilled from 'ahoney/lib/icons/TriangleFilled';
import { HASH_RATE_BTC, HASH_RATE_ETH, HASH_RATE_USDT } from '@/shared/consts/hashrateType';
import { EthIcon, BtcIcon, UsdtIcon } from '@/shared/components/ChainIcon';
import walletMptIconBlack from '@/assets/account/wallet/wallet_mpt_icon_black.png';
import Select from '@/shared/components/Select';
import styles from './index.less?module';

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
  computed: {
    ...mapState({
      dynamicChainTypeList: state => state.dynamicChainTypeList,
    }),

    dynamicChainType() {
      const [chainInfo = { symbol: '' }] = this.dynamicChainTypeList;
      return chainInfo.symbol;
    },
    aboutDynamicCoin() {
      const columns = [
        HASH_RATE_USDT, HASH_RATE_BTC, HASH_RATE_ETH, this.dynamicChainType,
      ];
      return columns;
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
      [this.dynamicChainType]: <img class='spotecicon' src={walletMptIconBlack} alt="" />, // TODO: 换成icon,
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
          {this.aboutDynamicCoin.map((value, i) => (
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
