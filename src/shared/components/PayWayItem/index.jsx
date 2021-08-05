import classNames from 'classnames';
import CorrectOutlined from 'ahoney/lib/icons/CorrectOutlined';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import btcIcon from '@/assets/account/wallet_btc_icon.png';
import ethIcon from '@/assets/account/wallet_eth_icon.png';
import usdtIcon from '@/assets/account/wallet_usdt_icon.png';
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
        BTC: btcIcon,
        ETH: ethIcon,
        USDT: usdtIcon,
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
          <img src={this.iconArr[chainType]} alt="" class='coin-img' />
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
