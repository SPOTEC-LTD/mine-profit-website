import BtcFilled from 'ahoney/lib/icons/BtcFilled';
import EthFilled from 'ahoney/lib/icons/EthFilled';
import UsdtFilled from 'ahoney/lib/icons/UsdtFilled';
import './index.less';

const EthIcon = {
  render() {
    return <EthFilled className="eth-icon" />;
  },
};

const BtcIcon = {
  render() {
    return <BtcFilled className="btc-icon" />;
  },
};
const UsdtIcon = {
  render() {
    return <UsdtFilled className="usdt-icon" />;
  },
};

export { EthIcon, BtcIcon, UsdtIcon };
