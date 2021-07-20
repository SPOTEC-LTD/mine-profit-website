import { mapState } from 'vuex';
import isEmpty from 'lodash/isEmpty';
import { loginPath } from '@/router/consts/urls';
import Link from '@/shared/components/link';
import styles from './index.less?module';

// TODO 只做了显示，需要补上跳转和相应操作
const LoginInfo = {
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
    noLogin() {
      return isEmpty(this.userInfo);
    },
  },

  render() {
    const { avatar, nickName } = this.userInfo;
    return (
      <div class={styles['login-info']}>
        {this.noLogin && (
          <Link class={styles['login-text']} to={loginPath}>
            {this.$t('loginSignUp')}
          </Link>
        )}
        {!this.noLogin && (
          <div class={styles['user-info']}>
            <img class={styles.avatar} src={avatar} alt="" />
            <span class={styles.name}>{nickName}</span>
          </div>
        )}
      </div>
    );
  },
};

export default LoginInfo;
