import { Input } from 'ant-design-vue';
import BaseModal from '@/shared/components/BaseModal';
import ModalFooterButtonGroup from '@/shared/components/ModalFooterButtonGroup';
import './index.less';

const ConfirmPayDialog = {
  props: {
    show: Boolean,
    loading: Boolean,
    title: String,
    fromPageTitle: String,
  },

  data() {
    return {
      password: '',
      error: false,
    };
  },

  methods: {
    handlePassWord(e) {
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

    openProtocol(e) {
      e.stopPropagation();
      this.isVisibleInvestProtocol = true;
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
          onInput={this.handlePassWord}
          name="password"
          type="password"
          maxlength="20"
          placeholder={this.$t('payInputPwd')}
        />

        <div class="pay-forget-password">
          <div class="error_message">
            {
              this.error ? this.$t('payPwdEmptyHint') : ''
            }
          </div>
          <span
            onClick={() => {
              // TODO
              console.log('--新开页到交易密码');
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
          title="输入交易密码"
          width={400}
          value={this.show}
          onClose={this.onCancelModal}
          scopedSlots={{
            content: () => content,
          }}
        >

        </BaseModal>
    );
  },
};

export default ConfirmPayDialog;
