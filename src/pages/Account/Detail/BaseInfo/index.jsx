import { Badge } from 'ant-design-vue';
import HashCouponFilled from 'ahoney/lib/icons/HashCouponFilled';
import QrCode from 'ahoney/lib/icons/QrCode';
import BaseContainer from '@/shared/components/BaseContainer';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { UPDATE_USER_INFO } from '@/store/consts/actionType';
import { bindInvitationCodePath, hashRateCouponsPath } from '@/router/consts/urls';
import ShareQrCodeModal from '@/shared/components/ShareQrCodeModal';
import defaultAvatar from '@/assets/rank/defaultAvatar.png';
import { getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import BaseModal from '@/shared/components/BaseModal';
import locationServices from '@/shared/services/location/locationServices';
import locationHelp from '@/shared/utils/locationHelp';
import EditAvatarNickname from '../components/EditAvatarNickname';
import InviteDetail from '../components/InviteDetail';
import logout from './logout';
import styles from './index.less?module';

const Detail = {
  props: {
    info: Object,
    inviteInfo: Object,
    userInfo: Object,
  },
  data() {
    return {
      isVisibleEditInfoModal: false,
      isVisibleInviteDetailModal: false,
    };
  },

  methods: {
    handleLogout() {
      logout();
      this.$store.commit(UPDATE_USER_INFO, {});
    },
    getInviteItem() {
      const { invitationCode, inviteReward, inviteCount } = this.inviteInfo;
      const { id } = this.userInfo;
      const link = `${process.env.MOBILE_SITE_HOST}/register/${id}?locale=${getLocalLanguage()}`;

      const qrCodeItem = (
        <div>
          <div class={styles['invite-info-label']}>{this.$t('myInvitationQRCode')}</div>
          <div class={styles['view-qr-box']}>
            <QrCode className={styles['qr-icon']} />
            <ShareQrCodeModal title={this.$t('myInvitationQRCode')} content={link}>
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
      const investItem = (
        <div>
          <div
            class={styles['invite-item']}
            onClick={() => { this.isVisibleInviteDetailModal = true; }}
          >
            {this.$t('inviteFriendsDetail')}
          </div>
          {!this.userInfo.hasBind && (
            <div
              class={[styles['invite-item'], styles['invitation-code']]}
              onClick={() => { locationServices.push(bindInvitationCodePath); }}
            >
              {this.$t('inputInviteCodeBind')}
            </div>
          )}
        </div>
      );
      return [qrCodeItem, inviteCodeItem, inviteRewardItem, inviteCountItem, investItem];
    },
    closeInviteDetailModal() {
      this.isVisibleInviteDetailModal = false;
    },
  },
  render() {
    const { validCouponCount } = this.info;
    const { avatar, nickName, registerAccount, level } = this.userInfo;

    return (
      <BaseContainer class={styles['account-base-info']}>
        <div class={styles['info-box']}>
          <div class={styles['info-left']}>
            <img
              class={styles.avatar}
              src={avatar || defaultAvatar}
              alt=""
              onClick={() => {
                this.isVisibleEditInfoModal = true;
              }}
            />
            <div class={styles['info-left-content']}>
              <div class={styles.nickname}>{nickName || '-'}</div>
              <div class={styles['info-left-operate']}>
                <a
                  onClick={() => {
                    this.isVisibleEditInfoModal = true;
                  }}
                >
                  {this.$t('edit')}
                </a>
                <a onClick={this.handleLogout}>{this.$t('logout')}</a>
              </div>
              <div>{`${this.$t('accountAndSecurityAccount')}：${registerAccount || '-'}`}</div>
              <div>{`${this.$t('promoteRank')}：${level || '-'}`}</div>
            </div>
          </div>
          <div class={styles['info-right']}>
            <div class={[styles['invite-info-box'], { [styles['invited-box']]: this.userInfo.hasBind }]}>
              {this.getInviteItem().map(item => item)}
            </div>
            <div
              class={styles['hashrate-coupon']}
              onClick={() => {
                locationHelp.open(hashRateCouponsPath);
              }}
            >
              <HashCouponFilled className={styles['coupon-icon']} />
              <Badge count={validCouponCount}>
                <span>{this.$t('myHashrateCoupon')}</span>
              </Badge>
            </div>
          </div>
        </div>
        <BaseModal
          width={376}
          title={this.$t('editPersonalInfo')}
          value={this.isVisibleEditInfoModal}
          destroyOnClose
          scopedSlots={{
            content: () => (
              <EditAvatarNickname
                onCloseModal={() => {
                  this.isVisibleEditInfoModal = false;
                }}
                userInfo={this.userInfo}
              />
            ),
          }}
          onClose={() => {
            this.isVisibleEditInfoModal = false;
          }}
        />
        <BaseModal
          value={this.isVisibleInviteDetailModal}
          destroyOnClose
          width={622}
          title={this.$t('inviteFriendsDetail')}
          scopedSlots={{ content: () => <InviteDetail onCloseModal={this.closeInviteDetailModal} /> }}
          onclose={this.closeInviteDetailModal}
        />
      </BaseContainer>
    );
  },
};

export default Detail;
