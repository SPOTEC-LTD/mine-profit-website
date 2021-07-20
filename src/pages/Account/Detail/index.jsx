import BaseContainer from '@/shared/components/BaseContainer';
import BaseInfo from './BaseInfo';
import Authentication from './Authentication';
import Wallet from './Wallet';
import Hashrate from './Hashrate';
import Investment from './Investment';
import styles from './index.less?module';

const Detail = {
  render() {
    return (
      <div>
        <BaseInfo />
        <BaseContainer class={styles['account-other-info']}>
          <Authentication />
          <Wallet />
          <Hashrate />
          <Investment />
        </BaseContainer>
      </div>
    );
  },
};

export default Detail;
