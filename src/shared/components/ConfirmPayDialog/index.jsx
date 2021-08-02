import { Input } from 'ant-design-vue';
import BaseModal from '@/shared/components/BaseModal';
import ModalFooterButtonGroup from '@/shared/components/ModalFooterButtonGroup';
import locationHelp from '@/shared/utils/locationHelp';
import { setDealPasswordPath } from '@/router/consts/urls';
import './index.less';

const ConfirmPayDialog = {
  props: {
    show: Boolean,
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

    getFooterNode() {
      const dataSource = [
        {
          onClick: this.onCancelModal,
          label: this.$t('cancel'),
        },
        {
          onClick: this.onModalConfirm,
          type: 'primary',
          label: this.$t('confirm'),
          loading: this.loading,
        },
      ];

      return (
        <ModalFooterButtonGroup
          dataSource={dataSource}
        />
      );
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
        {
          this.getFooterNode()
        }
      </div>
    );

    return (
        <BaseModal
          title={this.$t('inputDealPassword')}
          width={400}
          value={this.show}
          onClose={this.onCancelModal}
          scopedSlots={{
            content: () => content,
          }}
        />
    );
  },
};

export default ConfirmPayDialog;
