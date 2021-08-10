import localStorage from '@/shared/utils/localStorage';
import PrimaryButton from '@/shared/components/PrimaryButton';
import { getUserInfo } from '@/api/user';
import { PENDING, PASS, REJECT, NOT_SUBMIT } from '@/shared/consts/kycStatus';
import { setDealPasswordPath, realNameAuthPath } from '@/router/consts/urls';
import verifyImgDialog from '@/assets/account/verify_img_dialog.png';
import verifyPendingImage from '@/assets/account/verify-pending-image.png';
import verifyRejectImage from '@/assets/account/verify-reject-image.png';
import closeIconGray from '@/assets/account/nav_icon_close_gray.png';
import locationServices from '@/shared/services/location/locationServices';
import BaseModal from '@/shared/components/BaseModal';

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
    closeDialog(e) {
      if (e) {
        e.stopPropagation();
      }
      this.showDialog = false;
    },
    closeVerifyDialog(e) {
      this.closeDialog(e);
      this.$emit('dialogClose');
    },
    buttonClick(e, method) {
      e.stopPropagation();
      this.closeDialog();
      this[method]();
    },
    toAppointPage(path) {
      const currentFullPath = this.$router.history.current.fullPath;
      locationServices.push(
        path,
        { query: { redirectPageUrl: currentFullPath } },
      );
    },
    setDealPassword() {
      this.toAppointPage(setDealPasswordPath);
    },
    realNameAuth() {
      this.toAppointPage(realNameAuthPath);
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
          text: this.$t('accountAndSecurityTradePwd'),
          show: !this.isDealCodeSet,
          method: 'setDealPassword',
        },
        {
          text: this.$t('realNameAuth'),
          show: this.isVerifiedKyc && this.isKycNotSubmit,
          method: 'realNameAuth',
        },
      ];
      const pendingBtnList = [{
        text: this.$t('confirm'),
        show: true,
        method: 'closeDialog',
      }];
      const rejectBtnList = [{
        text: this.$t('tryAgain'),
        show: true,
        method: 'realNameAuth',
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

    getDialogNode() {
      const { btnList, image, describe } = this.getDialogInfo(this.kycStatus);
      return (
        <BaseModal
          value={this.value}
          title={this.$t('activeWithDrawTitle')}
          width={658}
          onCancel={() => { this.$emit('closeNoActive'); }}
          scopedSlots={{
            content: this.getActiveWaysNode,
          }}
        />
        {/* <Dialog.Component
          class="user-verified-wrapper"
          showCancelButton={false}
          showConfirmButton={false}
          value={this.showDialog}
          {...{
            props: this.$attrs,
          }}
        >
          <img
            src={closeIconGray}
            class="close-icon"
            alt=""
            onClick={e => this.closeVerifyDialog(e)}
          />
          <div class="user-verified-img">
            <img src={image} alt="" />
          </div>
          <div class="user-verified-content">{describe}</div>
          {btnList.map((item, index) => {
            return item.show && (
              <PrimaryButton
                key={index}
                class="user-verified-btn"
                onClick={e => this.buttonClick(e, item.method)}
              >
                {item.text}
              </PrimaryButton>
            );
          })}
        </Dialog.Component> */}
      );
    },
  },

  render() {
    const resultNode = this.$slots.default ? (
      <div>
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
