import * as API from '@/api/manMachineVerification';

export const MAN_MACHINE_VERIFICATION = 'manMachineVerification';
export const GET_PICTURE = 'getPicture';
export const REQ_CHECK = 'reqCheck';

const UPDATE_BLOCK_PUZZLE_CAPTCHA = 'updateBlockPuzzleCaptcha';
export const UPDATE_SHOW_MAN_MACHINE_VERIFICATION = 'updateShowManMachineVerification';
export const UPDATE_CAPTCHA_VERIFICATION = 'updateCaptchaVerification';
export const UPDATE_IS_VERIFICATION_SUCCESS = 'updateIsVerificationSuccess';
export const UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION = 'updateIsPhoneOrEmailVerification';
export const UPDATE_IS_LOGIN_VERIFICATION = 'updateIsLoginVerification';
export const UPDATE_IS_DEAL_PASSWORD_VERIFICATION = 'updateIsDealPasswordVerification';

const initValue = {
  showManMachineVerification: false,
  isVerificationSuccess: false,
  blockPuzzleCaptcha: {
    jigsawImageBase64: '',
    originalImageBase64: '',
    secretKey: '',
    token: '',
  },
  captchaVerification: '',
  isPhoneOrEmailVerification: false,
  isLoginVerification: false,
  isDealPasswordVerification: false,
};

export default {
  namespaced: true,
  state: initValue,
  mutations: {
    [UPDATE_BLOCK_PUZZLE_CAPTCHA](state, info) {
      state.blockPuzzleCaptcha = info;
    },
    [UPDATE_SHOW_MAN_MACHINE_VERIFICATION](state, boolean) {
      state.showManMachineVerification = boolean;
    },
    [UPDATE_CAPTCHA_VERIFICATION](state, string) {
      state.captchaVerification = string;
    },
    [UPDATE_IS_VERIFICATION_SUCCESS](state, boolean) {
      state.isVerificationSuccess = boolean;
    },
    [UPDATE_IS_PHONE_OR_EMAIL_VERIFICATION](state, boolean) {
      state.isPhoneOrEmailVerification = boolean;
    },
    [UPDATE_IS_LOGIN_VERIFICATION](state, boolean) {
      state.isLoginVerification = boolean;
    },
    [UPDATE_IS_DEAL_PASSWORD_VERIFICATION](state, boolean) {
      state.isDealPasswordVerification = boolean;
    },
  },
  actions: {
    async [GET_PICTURE]({ commit }, data) {
      try {
        const {
          body: { getBlockPuzzleCaptcha },
        } = await API.getPicture({ data });
        commit(UPDATE_BLOCK_PUZZLE_CAPTCHA, getBlockPuzzleCaptcha);

        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async [REQ_CHECK](_, data) {
      try {
        await API.reqCheck({ data });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
