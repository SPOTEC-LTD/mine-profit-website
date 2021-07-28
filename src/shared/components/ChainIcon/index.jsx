import BtcFilled from 'ahoney/lib/icons/BtcFilled';
import EthFilled from 'ahoney/lib/icons/EthFilled';
import './index.less';

const EthIcon = {
  render() {
    return <EthFilled className="eth-icon" />;
  },
};

const BtcIcon = {
  render() {
    return <BtcFilled className="btc-icon"/>;
  },
};

export { EthIcon, BtcIcon };
