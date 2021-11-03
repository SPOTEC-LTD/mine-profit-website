import { Input, Checkbox } from 'ant-design-vue';
import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';
import ConfirmModal from '@/shared/components/ConfirmModal';
import locationHelp from '@/shared/utils/locationHelp';
import { setDealPasswordPath, investProtocolPath } from '@/router/consts/urls';
import Link from '@/shared/components/Link';
import Notification from '@/shared/services/Notification';
import './index.less';

const ConfirmPayDialog = {
  props: {
    visible: Boolean,
    loading: Boolean,
    prompt: String,
    hasProtocol: { type: Boolean, default: false },
    clearOnConfirm: { type: Boolean, default: false },
  },

  data() {
    return {
      password: '',
      error: false,
      isCheck: false,
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
      if (this.hasProtocol && !this.isCheck) {
        Notification.error(this.$t('payCheckAgremmentHint'));
        return;
      }
      if (this.password) {
        this.$emit('confirm', this.password);
        this.clearOnConfirm && (this.password = '');
      } else {
        this.error = true;
      }
    },

    onCancelModal() {
      this.$emit('cancel');
      this.password = '';
      this.isCheck = false;
      this.error = false;
    },
  },

  render() {
    const content = (
      <div class={['payment-dialog', { 'has-prompt-payment-dialog': this.prompt }]}>
        {this.prompt && (
          <div class={['pay-prompt']}>
            <InfoCircleFilled />
            <div>{this.prompt}</div>
          </div>
        )}
        <Input.Password
          value={this.password}
          onChange={this.handlePassWordChange}
          name="password"
          type="password"
          maxLength={20}
          placeholder={this.$t('payInputPwd')}
        />

        <div class={['other-info', { 'has-protocol-info': this.hasProtocol }]}>
          <div class="error_message">
            { this.error ? this.$t('payPwdEmptyHint') : '' }
          </div>
          <span
            class="pay-forget-password"
            onClick={() => {
              locationHelp.open(setDealPasswordPath);
            }}
          >
            {this.$t('payForgetPwd')}
          </span>
        </div>
        {this.hasProtocol && (
          <Checkbox
            checked={this.isCheck}
            onChange={e => {
              this.isCheck = e.target.checked;
            }}
          >
            <span>{this.$t('agreementViewAgree')}</span>
            <Link to={investProtocolPath} target="_blank">
              {`《${this.$t('investProtocolName', { enProductName: this.$t('enProductName') })}》`}
            </Link>
          </Checkbox>
        )}
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
        scopedSlots={{ content: () => content }}
      >
        {content}
      </ConfirmModal>
    );
  },
};

export default ConfirmPayDialog;
