import { Badge, Tooltip } from 'ant-design-vue';
import HashCouponFilled from 'ahoney/lib/icons/HashCouponFilled';
import QrCode from 'ahoney/lib/icons/QrCode';
import numberUtils from 'aa-utils/lib/numberUtils';
import BaseContainer from '@/shared/components/BaseContainer';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { UPDATE_USER_INFO } from '@/store/consts/actionType';
import { bindInvitationCodePath, hashRateCouponsPath } from '@/router/consts/urls';
import ShareQrCodeModal from '@/shared/components/ShareQrCodeModal';
import defaultAvatar from '@/assets/rank/defaultAvatar.png';
import { getLocalLanguage } from '@/shared/utils/getLocalLanguage';
import BaseModal from '@/shared/components/BaseModal';
import { PHONE } from '@/shared/consts/registerType';
import locationServices from '@/shared/services/location/locationServices';
import locationHelp from '@/shared/utils/locationHelp';
import { INVITE_DETAIL, PROMOTE_RANK } from '@/pages/Account/Detail/consts/tabsActiveValue';
import { getBonusTypeLabelMap, getBonusTypeNotificationMap, getBonusTypeIconMap } from '../consts/getBonusType';
import EditAvatarNickname from '../components/EditAvatarNickname';
import BaseInfoModalContent from '../components/BaseInfoModalContent';
import BonusTooltip from '../components/BonusTooltip';
import logout from './logout';
import styles from './index.less?module';

const Detail = {
  props: {
    info: Object,
    inviteInfo: Object,
    userInfo: Object,
    personalLevel: Object,
  },
  data() {
    return {
      isVisibleEditInfoModal: false,
      isVisibleInviteDetailModal: false,
      tabsActive: INVITE_DETAIL,
    };
  },
  computed: {
    modalWidth() {
      return this.tabsActive === INVITE_DETAIL ? 1200 : 668;
    },
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
        <div class={styles['invest-wrap']}>
          <div
            class={styles['invite-item']}
            onClick={() => this.openInviteDetailModal(INVITE_DETAIL)}
          >
            {this.$t('inviteFriendsDetail')}
          </div>
          {!this.userInfo.hasBind && (
            <div
              class={[styles['invite-item'], styles['invitation-code']]}
              onClick={() => {
                locationServices.push(bindInvitationCodePath);
              }}
            >
              {this.$t('inputInviteCodeBind')}
            </div>
          )}
        </div>
      );
      return [qrCodeItem, inviteCodeItem, inviteRewardItem, inviteCountItem, investItem];
    },
    openInviteDetailModal(value) {
      this.tabsActive = value;
      this.isVisibleInviteDetailModal = true;
    },
    closeInviteDetailModal() {
      this.isVisibleInviteDetailModal = false;
    },
  },
  render() {
    const { validCouponCount } = this.info;
    const { avatar, nickName, registerAccount, phonePrefix, registerType } = this.userInfo;
    const account = registerType === PHONE ? `${phonePrefix} ${registerAccount}` : registerAccount;
    const { name, level, icon, buffList } = this.personalLevel;

    return (
      <BaseContainer class={styles['account-base-info']}>
        <div class={styles['info-box']}>
          <div class={styles['info-top']}>
            <div class={styles['base-info']}>
              <img
                class={styles.avatar}
                src={avatar || defaultAvatar}
                alt=""
                onClick={() => {
                  this.isVisibleEditInfoModal = true;
                }}
              />
              <div class={styles['info-base-content']}>
                <Tooltip placement="bottom" title={nickName}>
                  <div class={styles.nickname}>{nickName || '-'}</div>
                </Tooltip>
                <div class={styles['info-base-operate']}>
                  <a
                    onClick={() => {
                      this.isVisibleEditInfoModal = true;
                    }}
                  >
                    {this.$t('edit')}
                  </a>
                  <a onClick={this.handleLogout}>{this.$t('logout')}</a>
                </div>
                <div>{`${this.$t('accountAndSecurityAccount')}：${account || '-'}`}</div>
              </div>
            </div>
            <div class={styles['promote-info']}>
              {icon && <img src={icon} alt="" />}
              <div class={styles['promote-info-content']}>
                <Tooltip placement="bottom" title={`Lv${level || '-'}${name ? `:${name}` : ''}`}>
                  <span class={styles['promote-level']}>
                    <span>{`Lv${level || '-'}`}</span>
                    {name && <span>{`:${name}`}</span>}
                  </span>
                </Tooltip>
                <span>{this.$t('currentLevel')}</span>
                <div
                  class={styles['view-level-rule']}
                  onClick={() => this.openInviteDetailModal(PROMOTE_RANK)}
                >
                  {this.$t('viewPromoteLevel')}
                </div>
              </div>
            </div>
            <div class={styles['bonus-box']}>
              {buffList.map(item => {
                const bonusValue = numberUtils.formatPercent(item.val, { minimumFractionDigits: 2 });
                return (
                  <BonusTooltip
                    word={bonusValue}
                    text={getBonusTypeNotificationMap(bonusValue)[item.type]}
                    label={getBonusTypeLabelMap()[item.type]}
                  >
                    <div class={styles['bonus-item']}>
                      <img src={getBonusTypeIconMap()[item.type]} alt="" />
                      <div class={styles['bonus-item-right']}>
                        <div>
                          <div class={styles['bonus-value']}>{bonusValue}</div>
                        </div>
                        <span>{getBonusTypeLabelMap()[item.type]}</span>
                      </div>
                    </div>
                  </BonusTooltip>
                );
              })}
            </div>
          </div>
          <div class={styles['info-bottom']}>
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
          wrapClassName={styles.modal}
          width={this.modalWidth}
          scopedSlots={{
            content: () => (
              <BaseInfoModalContent
                active={this.tabsActive}
                onTabsActiveChange={value => {
                  this.tabsActive = value;
                }}
                onCloseModal={this.closeInviteDetailModal}
              />
            ),
          }}
          onclose={this.closeInviteDetailModal}
        />
      </BaseContainer>
    );
  },
};

export default Detail;
