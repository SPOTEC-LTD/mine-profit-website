import { Input } from 'ant-design-vue';
import ConfirmModal from '@/shared/components/ConfirmModal';
import locationHelp from '@/shared/utils/locationHelp';
import { setDealPasswordPath } from '@/router/consts/urls';
import './index.less';

const ConfirmPayDialog = {
  props: {
    visible: Boolean,
    loading: Boolean,
  },

  data() {
    return {
      password: '',
      error: false,
    };
  },

  methods: {
    handlePassWordChange(e) {
      this.password = e.target.value;
      if (this.error) {
        this.error = false;
      }
    },

    onModalConfirm() {
      if (this.password) {
        this.$emit('confirm', this.password);
      } else {
        this.error = true;
      }
    },

    onCancelModal() {
      this.$emit('cancel');
      this.password = '';
      this.error = false;
    },
  },

  render() {
    const content = (
      <div class="payment-dialog">
        <Input
          value={this.password}
          onChange={this.handlePassWordChange}
          name="password"
          type="password"
          maxlength="20"
          placeholder={this.$t('payInputPwd')}
        />

        <div class="other-info">
          <div class="error_message">
            {
              this.error ? this.$t('payPwdEmptyHint') : ''
            }
          </div>
          <span
            class="pay-forget-password"
            onClick={() => {
              locationHelp.open(setDealPasswordPath);
            }}>
            {this.$t('payForgetPwd')}
          </span>
        </div>
      </div>
    );

    return (
        <ConfirmModal
          title={this.$t('inputDealPassword')}
          width={400}
          visible={this.visible}
          confirmLoading={this.loading}
          onCancel={this.onCancelModal}
          onConfirm={this.onModalConfirm}
          scopedSlots={{
            content: () => content,
          }}
        >
          {content}
        </ConfirmModal>
    );
  },
};

export default ConfirmPayDialog;
