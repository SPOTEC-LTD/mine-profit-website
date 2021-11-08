import classNames from 'classnames';
import CorrectOutlined from 'ahoney/lib/icons/CorrectOutlined';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { EthIcon, BtcIcon, UsdtIcon } from '@/shared/components/ChainIcon';
import './index.less';

const PayWayItem = {
  props: {
    coinData: Object,
    choosesCoin: String,
  },

  data() {
    return {
      show: true,
      iconArr: {
        BTC: <BtcIcon class='btc-img' />,
        ETH: <EthIcon class='eth-img'/>,
        USDT: <UsdtIcon class='usdt-img'/>,
      },
    };
  },

  methods: {
    handleClick() {
      const { chainType } = this.coinData;
      this.$emit('clickChange', chainType);
    },
  },

  render() {
    const { balance, balanceUsdt, chainType } = this.coinData;
    const isUSDT = chainType === 'USDT';
    const chooses = this.choosesCoin === chainType;

    return (
      <div
        class={classNames('coin-detail', { chooses: !!chooses })}
        onClick={this.handleClick}
      >
        <div class='img-chain-type'>
          <div class='coin-img-wrapper'>
            {this.iconArr[chainType]}
          </div>
          <span class='head-unit'>{chainType}</span>
          {chooses && <CorrectOutlined />}
        </div>
        <div class='balance-details'>
          <div class='origin-coin'>
            <span>{bigNumberToFixed(balance, 8)}</span>
            <span class='balance-unit'>{chainType}</span>
          </div>
          {!isUSDT && (
            <div class='exchange-coin'>
              <span>≈{balanceUsdt}</span>
              <span class='balance-unit'>USDT</span>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export default PayWayItem;
