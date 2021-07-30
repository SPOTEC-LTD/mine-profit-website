import Card from '../components/Card';
import WidgetTitle from '../components/WidgetTitle';
import Assets from './Assets';
import Detail from './Detail';

import styles from './index.less?module';

const Wallet = {
  props: { userBalance: Object },
  render() {
    return (
      <div>
        <WidgetTitle>{this.$t('mineTitleWallet')}</WidgetTitle>
        <Card>
          <div class={styles.wallet}>
            <Assets class={styles['wallet-box']} userBalance={this.userBalance} />
            <Detail class={styles['wallet-box']} />
          </div>
        </Card>
      </div>
    );
  },
};

export default Wallet;
