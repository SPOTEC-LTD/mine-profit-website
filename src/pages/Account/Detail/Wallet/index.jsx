import Card from '../components/Card';
import WidgetTitle from '../components/WidgetTitle';
import WalletAssets from './WalletAssets';

import styles from './index.less?module';

const Wallet = {
  props: { userBalance: Object },
  render() {
    return (
      <div>
        <WidgetTitle>{this.$t('mineTitleWallet')}</WidgetTitle>
        <Card>
          <div class={styles.wallet}>
            <WalletAssets class={styles['wallet-box']} userBalance={this.userBalance} />
            <div class={styles['wallet-box']}>{this.$t('walletDetail')}</div>
          </div>
        </Card>
      </div>
    );
  },
};

export default Wallet;
