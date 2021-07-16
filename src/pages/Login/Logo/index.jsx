import { homePath } from '@/router/consts/urls';
import locationServices from '@/shared/services/location/locationServices';
import logoImg from '@/assets/sign/logo.png';
import mineProfit from '@/assets/sign/mineProfit.png';
import styles from './index.less?module';

const Logo = {
  render() {
    return (
      <div class={styles['logo-container']} onClick={() => { locationServices.push(homePath); }}>
        <img class={styles.logo} src={logoImg} alt="" />
        <div>
          <img class={styles['logo-text']} src={mineProfit} alt="" />
          <div>{this.$t('signInTips')}</div>
        </div>
      </div>
    );
  },
};

export default Logo;
