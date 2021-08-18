import { mapState } from 'vuex';
import isEmpty from 'lodash/isEmpty';
import locationServices from '@/shared/services/location/locationServices';
import { loginPath, accountDetailPath } from '@/router/consts/urls';
import Link from '@/shared/components/Link';
import defaultAvatar from '@/assets/rank/defaultAvatar.png';
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
  methods: {
    toAccountDetailPage() {
      locationServices.push(accountDetailPath);
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
          <div class={styles['user-info']} onClick={this.toAccountDetailPage}>
            <img class={styles.avatar} src={avatar || defaultAvatar} alt="" />
            <span class={styles.name} title={nickName}>{nickName}</span>
          </div>
        )}
      </div>
    );
  },
};

export default LoginInfo;
