import { mapState } from 'vuex';
import { Badge } from 'ant-design-vue';
import HashCouponFilled from 'ahoney/lib/icons/HashCouponFilled';
import QrCode from 'ahoney/lib/icons/QrCode';
import DoubleUserFilled from 'ahoney/lib/icons/DoubleUserFilled';
import BaseContainer from '@/shared/components/BaseContainer';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { UPDATE_USER_INFO } from '@/store/consts/actionType';
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
    getInviteItem() {
      const { invitationCode, inviteReward, inviteCount } = this.inviteInfo;
      const link = 'http://192.168.0.126:7010/register/588?locale=en-US';
      const qrCodeItem = (
        <div>
          <div class={styles['invite-info-label']}>{this.$t('myInvitationQRCode')}</div>
          <div class={styles['view-qr-box']}>
            <QrCode className={styles['qr-icon']} />
            <ShareQrCodeModal title={this.$t('myInvitationQRCode')} value={link}>
              <a class={styles['view-qr']}>{this.$t('clickView')}</a>
            </ShareQrCodeModal>
          </div>
        </div>
      );
      const inviteCodeItem = (
        <div>
          <div class={styles['invite-info-label']}>{this.$t('inviteFriendsMyInviteCode')}</div>
          <div class={styles['invite-info-value']}>{invitationCode}</div>
        </div>
      );
      const inviteRewardItem = (
        <div>
          <div class={styles['invite-info-label']}>{this.$t('myReward')}</div>
          <div class={styles['invite-info-value']}>
            {bigNumberToFixed(inviteReward, 8)}
            <span class={styles['invite-info-unit']}> USDT</span>
          </div>
        </div>
      );

      const inviteCountItem = (
        <div>
          <div class={styles['invite-info-label']}>{this.$t('inviteCustomers')}</div>
          <div class={styles['invite-info-value']}>
            {inviteCount}
            <span class={styles['invite-info-unit']}> {this.$t('inviteFriendsPerson')}</span>
          </div>
        </div>
      );
      const detailItem = (
        <div class={styles['invite-detail']}>
          {this.$t('inviteFriendsDetail')}
          <DoubleUserFilled className={styles['invite-detail-icon']} />
        </div>
      );
      return [qrCodeItem, inviteCodeItem, inviteRewardItem, inviteCountItem, detailItem];
    },
  },
  render() {
    const { validCouponCount } = this.info;
    const { avatar, nickName, registerAccount, level } = this.userInfo;
    // TODO 需要动态域名和国际化
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
            <div class={styles['invite-info-box']}>{this.getInviteItem().map(item => item)}</div>
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