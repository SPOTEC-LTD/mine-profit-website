import localStorage from '@/shared/utils/localStorage';
import { getUserInfo } from '@/api/user';
import { PENDING, PASS, REJECT, NOT_SUBMIT } from '@/shared/consts/kycStatus';
import { setDealPasswordPath, realNameAuthPath } from '@/router/consts/urls';
import verifyImgDialog from '@/assets/account/verify_img_dialog.png';
import verifyPendingImage from '@/assets/account/verify-pending-image.png';
import verifyRejectImage from '@/assets/account/verify-reject-image.png';
import BaseModal from '@/shared/components/BaseModal';
import ModalFooterButtonGroup from '@/shared/components/ModalFooterButtonGroup';

import './index.less';

const TradeBeforeVerified = {
  props: {
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
        const { body: { userInfo } } = await getUserInfo({ pathParams: { userId: this.userInfo.userId } });
        const { isDealCode, kycStatus } = userInfo;
        this.userInfo = userInfo;
        this.isDealCodeSet = isDealCode;
        this.kycStatus = kycStatus;
        this.isKycPass = kycStatus === PASS;
        this.isKycNotSubmit = kycStatus === NOT_SUBMIT;
      }

      if (!this.isVerifiedKyc) {
        this.isKycPass = true;
      }

      if (!this.isDealCodeSet || (this.isVerifiedKyc && !this.isKycPass)) {
        this.showDialog = true;
      } else {
        this.$emit('verifiedPass');
      }
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

    getDialogInfo(status) {
      const notSubmitBtnList = [
        {
          label: this.$t('accountAndSecurityTradePwd'),
          show: !this.isDealCodeSet,
          onClick: () => { window.open(setDealPasswordPath); },
          type: 'primary',
        },
        {
          label: this.$t('realNameAuth'),
          show: this.isVerifiedKyc && this.isKycNotSubmit,
          onClick: () => { window.open(realNameAuthPath); },
          type: 'primary',
        },
      ];
      const pendingBtnList = [{
        label: this.$t('confirm'),
        show: true,
        onClick: this.closeDialog,
        type: 'primary',
      }];
      const rejectBtnList = [{
        label: this.$t('tryAgain'),
        show: true,
        onClick: this.realNameAuth,
        type: 'primary',
      }];
      const kycStatusMap = {
        [NOT_SUBMIT]: {
          btnList: notSubmitBtnList,
          image: verifyImgDialog,
          describe: this.$t('verifyDialogContent'),
        },
        [PENDING]: {
          btnList: pendingBtnList,
          image: verifyPendingImage,
          describe: this.$t('authFinishTips'),
        },
        [REJECT]: {
          btnList: rejectBtnList,
          image: verifyRejectImage,
          describe: this.getRejectDescribe(),
        },
        [PASS]: {
          btnList: [],
          image: '',
          describe: '',
        },
      };
      return kycStatusMap[this.isDealCodeSet ? status : NOT_SUBMIT];
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
            className={'button-group'}
            dataSource={btnList}
          />
        </div>
      );
    },

    getDialogNode() {
      return (
        <BaseModal
          value={this.showDialog}
          title={this.$t('supplementaryInformation')}
          width={396}
          onCancel={() => { this.showDialog = false; }}
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
