import { FormModel, Input, Upload } from 'ant-design-vue';
import { mapState, mapActions } from 'vuex';
import { uploadFileUrl } from '@/api/file';
import ModalButton from '@/shared/components/ModalButton';
import { ACCOUNT, UPDATE_BASE_INFO, GET_USER_BASE_INFO } from '@/modules/account/account';
import Notification from '@/shared/services/Notification';
import defaultAvatar from '@/assets/rank/defaultAvatar.png';

import styles from './index.less?module';

const { Item } = FormModel;

const EditAvatarNickname = {
  props: {
    userInfo: Object,
  },
  data() {
    return {
      uploadAvatarLoading: false,
      form: {
        avatar: this.userInfo.avatar || defaultAvatar,
        nickname: this.userInfo.nickName,
      },
    };
  },
  computed: {
    ...mapState({
      uploadUserInfoLoading: state => state.loading.effects[`${ACCOUNT}/${UPDATE_BASE_INFO}`],
    }),
  },
  methods: {
    ...mapActions(ACCOUNT, [UPDATE_BASE_INFO, GET_USER_BASE_INFO]),
    uploadUserInfo() {
      const { avatar, nickName } = this.userInfo;
      if (this.form.avatar === avatar && this.form.nickname === nickName) {
        this.closeModal();
        return;
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this[UPDATE_BASE_INFO](this.form).then(() => {
            this.closeModal();
            Notification.success(this.$t('operationSuccess'));
            this[GET_USER_BASE_INFO]();
            window.$nuxt.refresh();
          });
        }
      });
    },
    photoBeforeUpload(file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        return true;
      }
      Notification.error(this.$t('fileFormatError'));
      return false;
    },
    uploadAvatar({ file }) {
      if (file.status === 'uploading') {
        this.uploadAvatarLoading = true;
      }
      if (file.status === 'done') {
        this.form.avatar = file.response.body.url;
        this.uploadAvatarLoading = false;
      }
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
  render() {
    return (
      <FormModel
        ref="ruleForm"
        hideRequiredMark
        props={{ model: this.form }}
        class={['normal-form', styles['edit-info-wrap']]}
      >
        <div class={styles['upload-avatar-box']}>
          <img src={this.form.avatar} alt="" />
          <Upload
            accept="image/*"
            action={uploadFileUrl}
            showUploadList={false}
            onChange={this.uploadAvatar}
            beforeUpload={this.photoBeforeUpload}
          >
            <ModalButton loading={this.uploadAvatarLoading} type="primary">
              {this.$t('uploadAvatar')}
            </ModalButton>
          </Upload>
        </div>
        <Item
          label={this.$t('nickname')}
          prop="nickname"
          rules={[{ required: true, message: this.$t('nicknameRequire'), trigger: 'change' }]}
        >
          <Input v-model={this.form.nickname} maxLength={30} />
        </Item>
        <div class={styles['modal-button-box']}>
          <ModalButton type="primary" ghost onClick={this.closeModal}>
            {this.$t('cancel')}
          </ModalButton>
          <ModalButton type="primary" loading={this.uploadUserInfoLoading} onClick={this.uploadUserInfo}>
            {this.$t('confirm')}
          </ModalButton>
        </div>
      </FormModel>
    );
  },
};

export default EditAvatarNickname;
