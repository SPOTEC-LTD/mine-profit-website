import localStorage from '@/shared/utils/localStorage';
import { getUserInfo } from '@/api/user';
import { REAL_NAME_DIALOG } from '@/shared/consts/countdownFormatType';
import { PENDING, PASS, REJECT, NOT_SUBMIT } from '@/shared/consts/kycStatus';
import { setDealPasswordPath, realNameAuthPath } from '@/router/consts/urls';
import verifyImgDialog from '@/assets/account/verify_img_dialog.png';
import verifyPendingImage from '@/assets/account/verify-pending-image.png';
import verifyRejectImage from '@/assets/account/verify-reject-image.png';
import BaseModal from '@/shared/components/BaseModal';
import Countdown from '@/shared/components/Countdown';
import ModalFooterButtonGroup from '@/shared/components/ModalFooterButtonGroup';
import locationHelp from '@/shared/utils/locationHelp';

import './index.less';

const TradeBeforeVerified = {
  props: {
    isOnlyVerifiedKyc: {
      type: Boolean,
      default: false, // 只验证实名认证，搭配isVerifiedKyc=true
    },
    isVerifiedKyc: {
      type: Boolean,
      default: false, // 只有提币才需要判断是否实名认证
    },
    isControlCheck: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDialog: false,
      isDealCodeSet: false,
      isKycPass: false,
    };
  },

  watch: {
    isControlCheck(value) {
      if (value) {
        this.onVerifiedUserStatus();
      }
    },
  },

  methods: {
    async onVerifiedUserStatus() {
      this.userInfo = localStorage.getObject('userInfo');
      this.isDealCodeSet = this.userInfo.isDealCode;
      this.kycStatus = this.userInfo.kycStatus;
      this.isKycPass = this.userInfo.kycStatus === PASS;
      this.isKycNotSubmit = this.userInfo.kycStatus === NOT_SUBMIT;

      if (!this.isDealCodeSet || !this.isKycPass) {
        try {
          const { body: { userInfo } } = await getUserInfo({ pathParams: { userId: this.userInfo.userId } });
          const { id, ...otherParams } = userInfo;
          localStorage.setObject('userInfo', { ...this.userInfo, ...otherParams, userId: id });
          const { isDealCode, kycStatus } = otherParams;
          this.userInfo = userInfo;
          this.isDealCodeSet = isDealCode;
          this.kycStatus = kycStatus;
          this.isKycPass = kycStatus === PASS;
          this.isKycNotSubmit = kycStatus === NOT_SUBMIT;
        } catch (error) {
          console.log('error');
        }
      }

      if (!this.isVerifiedKyc) {
        this.isKycPass = true;
      }

      if (this.isOnlyVerifiedKyc) {
        this.isDealCodeSet = true;
      }

      if (!this.isDealCodeSet || (this.isVerifiedKyc && !this.isKycPass)) {
        this.showDialog = true;
      } else {
        this.$emit('verifiedPass');
      }
    },

    closeDialog(e) {
      if (e) {
        e.stopPropagation();
      }
      this.showDialog = false;
      this.$emit('dialogClose');
    },

    getRejectDescribe() {
      return (
        <span>
          {this.$t('verifyTypeDialogTitle')}
          <span class='color-red'>{this.$t('verifyTypeDialogFailed')}</span>
          {this.$t('verifyTypeDialogTryAgain')}
        </span>
      );
    },

    getNotSubmitList() {
      const password = {
        label: this.$t('accountAndSecurityTradePwd'),
        show: !this.isDealCodeSet,
        onClick: () => {
          this.showDialog = false;
          locationHelp.open(setDealPasswordPath);
        },
        type: 'primary',
      };

      const realName = {
        label: this.$t('realNameAuth'),
        show: this.isVerifiedKyc && this.isKycNotSubmit,
        onClick: () => {
          this.showDialog = false;
          locationHelp.open(realNameAuthPath);
        },
        type: 'primary',
      };
      const passwordButton = this.isDealCodeSet ? [] : [password];
      const realNameButton = (this.isVerifiedKyc && this.isKycNotSubmit) ? [realName] : [];
      let notSubmitDesc = '';
      if (this.isVerifiedKyc && this.isKycNotSubmit && !this.isDealCodeSet) {
        notSubmitDesc = this.$t('verifyDialogContent');
      } else {
        notSubmitDesc = !this.isDealCodeSet
          ? this.$t('verifyDialogPasswordContent')
          : this.$t('verifyDialogRealNameContent');
      }

      return {
        notSubmitBtnList: [...realNameButton, ...passwordButton],
        notSubmitDesc,
      };
    },

    getDialogInfo(status) {
      const pendingBtnList = [{
        label: this.$t('confirm'),
        onClick: this.closeDialog,
        type: 'primary',
      }];
      const rejectBtnList = [{
        label: this.$t('tryAgain'),
        onClick: () => { locationHelp.open(realNameAuthPath); },
        type: 'primary',
      }];
      const { notSubmitBtnList, notSubmitDesc } = this.getNotSubmitList();
      const kycStatusMap = {
        [NOT_SUBMIT]: {
          title: this.$t('supplementaryInformation'),
          btnList: notSubmitBtnList,
          image: verifyImgDialog,
          describe: notSubmitDesc,
        },
        [PENDING]: {
          title: this.$t('accountAndSecurityAuth'),
          btnList: pendingBtnList,
          image: verifyPendingImage,
          describe: this.$t('authFinishTips'),
        },
        [REJECT]: {
          title: this.$t('accountAndSecurityAuthFail'),
          btnList: rejectBtnList,
          image: verifyRejectImage,
          describe: this.getRejectDescribe(),
        },
        [PASS]: {
          title: '',
          btnList: [],
          image: '',
          describe: '',
        },
      };
      return kycStatusMap[this.isDealCodeSet ? status : NOT_SUBMIT];
    },

    handleCountDownFinish({ onClick }) {
      onClick();
      this.showDialog = false;
    },

    getDialogContentNode() {
      const { btnList, image, describe } = this.getDialogInfo(this.kycStatus);
      return (
        <div>
          <div class="user-verified-img">
            <img src={image} alt="" />
          </div>
          <div class="user-verified-content">{describe}</div>
          <ModalFooterButtonGroup
            className="button-group"
            dataSource={btnList}
          />
          {this.showDialog && this.kycStatus === NOT_SUBMIT && btnList.length === 1 && (
            <Countdown
              className="verified-countdown"
              deadline={5000}
              formatType={REAL_NAME_DIALOG}
              onFinish={() => { this.handleCountDownFinish(btnList[0]); }}
            />
          )}
        </div>
      );
    },

    getDialogNode() {
      return (
        <BaseModal
          value={this.showDialog}
          title={this.getDialogInfo(this.kycStatus).title}
          width={396}
          onCancel={this.closeDialog}
          scopedSlots={{
            content: this.getDialogContentNode,
          }}
        />
      );
    },
  },

  render() {
    const resultNode = this.$slots.default ? (
      <div class='trade-before-verified'>
        <span onClick={this.onVerifiedUserStatus}>
          {this.$slots.default}
        </span>
        {this.getDialogNode()}
      </div>
    ) : this.getDialogNode();

    return resultNode;
  },
};

export default TradeBeforeVerified;
