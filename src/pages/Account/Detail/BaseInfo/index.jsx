import { Badge, Tooltip } from 'ant-design-vue';
import { mapMutations } from 'vuex';
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
import PictureProcess from '@/shared/components/PictureProcess';
import Paragraph from '@/shared/components/Paragraph';
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

  mounted() {
    if (this.$route.query.inviteModelActiveKey) {
      // 活动页跳转
      this.isVisibleInviteDetailModal = true;
      this.tabsActive = this.$route.query.inviteModelActiveKey;
    }
  },

  computed: {
    modalWidth() {
      return this.tabsActive === INVITE_DETAIL ? 1200 : 668;
    },
  },
  methods: {
    ...mapMutations([UPDATE_USER_INFO]),
    handleLogout() {
      logout();
      this[UPDATE_USER_INFO]({});
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
      this.$router.replace({ query: {} });
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
              <PictureProcess
                className={styles.avatar}
                image={avatar || defaultAvatar}
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
                <Tooltip placement="bottom" title={account}>
                  <div class={styles.account}>{`${this.$t('accountAndSecurityAccount')}：${account || '-'}`}</div>
                </Tooltip>
              </div>
            </div>
            <div class={styles['promote-info']}>
              {icon && <PictureProcess class={styles['promote-info-avatar']} image={icon} />}
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
                        <div class={styles['bonus-text']}>
                          <Paragraph row={2}>
                            {getBonusTypeLabelMap()[item.type]}
                          </Paragraph>
                        </div>
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
          maskClosable={false}
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
          centered={false}
          maskClosable={false}
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
