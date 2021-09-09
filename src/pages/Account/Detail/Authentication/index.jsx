import CheckCircleFilled from 'ahoney/lib/icons/CheckCircleFilled';
import PendingFilled from 'ahoney/lib/icons/PendingFilled';
import QuestionCircleFilled from 'ahoney/lib/icons/QuestionCircleFilled';
import CloseCircleTFilled from 'ahoney/lib/icons/CloseCircleTFilled';
import { Tooltip } from 'ant-design-vue';
import { EMAIL } from '@/shared/consts/registerType';
import { PENDING, PASS, REJECT, NOT_SUBMIT } from '@/shared/consts/kycStatus';
import {
  realNameAuthPath,
  bindPhonePath,
  bindEmailPath,
  setDealPasswordPath,
  setLoginPasswordPath,
} from '@/router/consts/urls';
import authEnterImage from '@/assets/account/auth-enter-image.png';
import Link from '@/shared/components/Link';

import styles from './index.less?module';

const Authentication = {
  props: {
    userInfo: Object,
  },
  methods: {
    goKycContent({ value, className, icon }) {
      const { kycStatus } = this.userInfo;
      const isLink = kycStatus === NOT_SUBMIT || kycStatus === REJECT;
      return (
        <div>
          {isLink ? (
            <Link to={realNameAuthPath} target="_blank">
              <div class={className}>
                {icon}
                <span>{value}</span>
              </div>
            </Link>
          ) : (
            <div class={className}>
              {icon}
              <span>{value}</span>
            </div>
          )}
        </div>
      );
    },
    getKycStatusNode() {
      const { kycStatus } = this.userInfo;
      const kycNodeMap = {
        [NOT_SUBMIT]: this.goKycContent({
          value: this.$t('realNameAuth'),
          className: styles['no-auth-item'],
          icon: <QuestionCircleFilled />,
        }),
        [PENDING]: this.goKycContent({
          value: this.$t('verifyDialogTips'),
          className: styles.pending,
          icon: <PendingFilled />,
        }),
        [PASS]: this.goKycContent({
          value: this.$t('realNameAuth'),
          className: styles.pass,
          icon: <CheckCircleFilled />,
        }),
        [REJECT]: this.goKycContent({
          value: this.$t('authenticationFailed'),
          className: styles.reject,
          icon: <CloseCircleTFilled />,
        }),
      };

      return kycNodeMap[kycStatus];
    },
    getAuthItem() {
      const { phone, email, isPassword, isDealCode, registerType, phonePrefix } = this.userInfo;
      const bindEmail = registerType !== EMAIL;
      const showPhone = phone && phone.replace(phonePrefix, '');

      return [
        {
          text: bindEmail ? this.$t('bindEmail') : this.$t('bindPhone'),
          isAuth: bindEmail ? email : phone,
          path: bindEmail ? bindEmailPath : bindPhonePath,
          isTooltip: true,
          account: bindEmail ? email : `${phonePrefix} ${showPhone}`,
        },
        {
          text: this.$t('loginPwd'),
          isAuth: isPassword,
          path: setLoginPasswordPath,
        },
        {
          text: this.$t('accountAndSecurityTradePwd'),
          isAuth: isDealCode,
          path: setDealPasswordPath,
        },
      ];
    },
  },
  render() {
    return (
      <div class={styles.wrapper}>
        <div>
          <div class={styles.title}>{this.$t('personalAuthentication')}</div>
          <div class={styles['sub-title']}>{this.$t('personalAuthenticationPrompt')}</div>
          <div class={styles['auth-item-box']}>
            {this.getAuthItem().map(({ path, text, isAuth, isTooltip, account }) => (
              <Link to={path} target="_blank">
                <div class={isAuth ? styles['auth-item'] : styles['no-auth-item']}>
                  {isAuth ? <CheckCircleFilled /> : <QuestionCircleFilled />}
                  {(isAuth && isTooltip) ? (
                    <Tooltip placement="bottom" scopedSlots={{ title: () => `${this.$t('bound')}：${account}` }}>
                      {text}
                    </Tooltip>
                  ) : (
                    <span>{text}</span>
                  )}
                </div>
              </Link>
            ))}
            {this.getKycStatusNode()}
          </div>
        </div>
        <img class={styles['enter-image']} src={authEnterImage} alt="" />
      </div>
    );
  },
};

export default Authentication;
