import { mapActions, mapState } from 'vuex';
import { FormModel, Input } from 'ant-design-vue';

import { ACCOUNT, BIND_INVITATION_CODE } from '@/modules/account/account';
import { SECTION_BUSINESS_EXCEPTION } from '@/shared/utils/request/consts/ResponseCode';
import { accountDetailPath } from '@/router/consts/urls';
import locationServices from '@/shared/services/location/locationServices';
import PrimaryButton from '@/shared/components/PrimaryButton';
import Notification from '@/shared/services/Notification';
import { getPathAndQueryObject } from '@/shared/utils/qsHelp';
import styles from './index.less?module';

const BindInvitationCode = {
  data() {
    return {
      isNewUser: this.$route.query.isNewUser,
      formInvitation: {
        invitationCode: '',
      },
    };
  },

  computed: {
    ...mapState({
      bindInvitationLoading: state => state.loading.effects[`${ACCOUNT}/${BIND_INVITATION_CODE}`],
    }),
  },

  methods: {
    ...mapActions(ACCOUNT, [BIND_INVITATION_CODE]),

    onModalConfirm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this[BIND_INVITATION_CODE]({ inviteCode: this.formInvitation.invitationCode })
            .then(() => {
              Notification.success(this.$t('inputInviteCodeBindSuccess'));
              this.showInvitationModal = false;
              this.handleJumpOrCancel();
            })
            .catch(error => {
              const { isBusinessError, messageDetails, code } = error;
              if (isBusinessError && code === SECTION_BUSINESS_EXCEPTION) {
                const { inviteCode } = messageDetails;
                Notification.error(inviteCode);
              }
            });
        }
        return false;
      });
    },

    handleJumpOrCancel() {
      this.formInvitation.invitationCode = '';
      const { redirectUrl } = this.$router.currentRoute.query;
      if (redirectUrl) {
        const { path, query } = getPathAndQueryObject(redirectUrl);
        locationServices.push(path, { query });
      } else {
        locationServices.push(accountDetailPath);
      }
    },
  },

  render() {
    return (
      <div class={styles['invite-code']}>
        <div class={styles['invite-code-content']}>
          <div class={styles['invite-code-title']}>
            <div>{this.$t('inputInviteCodeBind')}</div>
            <div>{this.$t('receiveNow')}</div>
          </div>
          <div class={styles.form}>
            <FormModel
              ref="ruleForm"
              props={{ model: this.formInvitation }} >
              <FormModel.Item
                prop="invitationCode"
                rules={[{ required: true, message: this.$t('invitationCodeRequire') }]}
              >
                <Input
                  class={styles['invite-input']}
                  allowClear
                  value={this.formInvitation.invitationCode}
                  placeholder={this.$t('pleaseEnterBindInvitationCode')}
                  maxLength={5}
                  onChange={e => { this.formInvitation.invitationCode = e.target.value.trim(); }}
                />
              </FormModel.Item>
            </FormModel>
            <div class={styles['bottom-button-group']}>
              <Button
                class={styles.close}
                onClick={this.handleJumpOrCancel}
              >
                {this.isNewUser ? this.$t('jump') : this.$t('cancel')}
              </Button>
              <PrimaryButton
                className={styles.confirm}
                loading={this.bindInvitationLoading}
                onClick={this.onModalConfirm}
              >
                {this.$t('confirm')}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export default BindInvitationCode;
