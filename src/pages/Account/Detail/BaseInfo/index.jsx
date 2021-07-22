import { mapState } from 'vuex';
import { Badge } from 'ant-design-vue';
import HashCouponFilled from 'ahoney/lib/icons/HashCouponFilled';
import QrCode from 'ahoney/lib/icons/QrCode';
import DoubleUserFilled from 'ahoney/lib/icons/DoubleUserFilled';
import BaseContainer from '@/shared/components/BaseContainer';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { UPDATE_USER_INFO } from '@/store';
import ShareQrCodeModal from '@/shared/components/ShareQrCodeModal';
import logout from './logout';
import styles from './index.less?module';

const Detail = {
  props: {
    info: Object,
    inviteInfo: Object,
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },
  methods: {
    handleLogout() {
      logout();
      this.$store.commit(UPDATE_USER_INFO, {});
    },
  },
  render() {
    const { validCouponCount } = this.info;
    const { invitationCode, inviteReward, inviteCount } = this.inviteInfo;
    const { avatar, nickName, registerAccount, level } = this.userInfo;
    // TODO 需要动态域名和国际化
    const link = 'http://192.168.0.126:7010/register/588?locale=en-US';
    return (
      <BaseContainer class={styles['account-base-info']}>
        <div class={styles['info-box']}>
          <div class={styles['info-left']}>
            <img class={styles.avatar} src={avatar} alt="" />
            <div class={styles['info-left-content']}>
              <div class={styles.nickname}>{nickName}</div>
              <div class={styles['info-left-operate']}>
                <a>{this.$t('edit')}</a>
                <a onClick={this.handleLogout}>{this.$t('logout')}</a>
              </div>
              <div>{`${this.$t('accountAndSecurityAccount')}：${registerAccount}`}</div>
              <div>{`${this.$t('promoteRank')}：${level || '-'}`}</div>
            </div>
          </div>
          <div class={styles['info-right']}>
            <div class={styles['invite-info-box']}>
              <div>
                <div class={styles['invite-info-label']}>{this.$t('myInvitationQRCode')}</div>
                <div class={styles['view-qr-box']}>
                  <QrCode className={styles['qr-icon']} />
                  <ShareQrCodeModal title={this.$t('myInvitationQRCode')} value={link}>
                    <a class={styles['view-qr']}>{this.$t('clickView')}</a>
                  </ShareQrCodeModal>
                </div>
              </div>
              <div>
                <div class={styles['invite-info-label']}>{this.$t('inviteFriendsMyInviteCode')}</div>
                <div class={styles['invite-info-value']}>{invitationCode}</div>
              </div>
              <div>
                <div class={styles['invite-info-label']}>{this.$t('myReward')}</div>
                <div class={styles['invite-info-value']}>
                  {bigNumberToFixed(inviteReward, 8)}
                  <span class={styles['invite-info-unit']}> USDT</span>
                </div>
              </div>
              <div>
                <div class={styles['invite-info-label']}>{this.$t('inviteCustomers')}</div>
                <div class={styles['invite-info-value']}>
                  {inviteCount}
                  <span class={styles['invite-info-unit']}> {this.$t('inviteFriendsPerson')}</span>
                </div>
              </div>
              <div class={styles['invite-detail']}>
                {this.$t('inviteFriendsDetail')}
                <DoubleUserFilled className={styles['invite-detail-icon']} />
              </div>
            </div>
            <div class={styles['hashrate-coupon']}>
              <HashCouponFilled className={styles['coupon-icon']} />
              <client-only>
                <Badge count={validCouponCount}>
                  <span>{this.$t('myHashrateCoupon')}</span>
                </Badge>
              </client-only>
            </div>
          </div>
        </div>
      </BaseContainer>
    );
  },
};

export default Detail;
