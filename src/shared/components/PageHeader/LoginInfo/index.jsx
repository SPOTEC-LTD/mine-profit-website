import { loginPath } from '@/router/consts/urls';
import Link from '@/shared/components/link';
import styles from './index.less?module';

const LoginInfo = {
  render() {
    return (
      <div class={styles['login-info']}>
        <Link class={styles['login-text']} to={loginPath}>登录/注册</Link>
      </div>
    );
  },
};

export default LoginInfo;
