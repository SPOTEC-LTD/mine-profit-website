import { FormModel, Input } from 'ant-design-vue';

import { EDIT } from '@/pages/Account/Detail/Wallet/consts/dialogType';
import { COIN, LINE_USDT_ERC20, getType, lineList } from '@/pages/Account/Detail/Wallet/consts/lineType';
import ChainSelect from '@/shared/components/ChainSelect';
import ConfirmModal from '@/shared/components/ConfirmModal';

import { validateAddress } from '../../utils/validatorAddress';
import CoinLine from '../../components/CoinLine';

import styles from './index.less?module';

const { Item } = FormModel;
const AddOrEditAddressModal = {
  props: {
    manageModel: {
      type: String,
    },
  },
  data() {
    return {
      addressInfo: {
        chainType: '',
        addressName: '',
        address: '',
      },
      visible: false,
    };
  },
  methods: {
    openDialog(manageModel, data) {
      this.addressInfo = { ...data };
      this.visible = true;
    },

    handleCoinChange(coin) {
      this.addressInfo.chainType = coin === 'USDT' ? LINE_USDT_ERC20 : coin;
    },

    handleChangeLine(coin) {
      this.addressInfo.chainType = coin;
    },

    modalConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.visible = false;
          this.$emit('infoChangeConfirm', this.addressInfo);
        }
        return false;
      });
    },
  },

  render() {
    const { chainType } = this.addressInfo;

    return (
      <ConfirmModal
        title={this.$t(this.manageModel)}
        width={494}
        visible={this.visible}
        onConfirm={this.modalConfirm}
        onCancel={() => { this.visible = false; }}
      >
        <FormModel
          ref="form"
          class={['normal-form', styles['content-box']]}
          props={{ model: this.addressInfo }}
        >
          <Item
            label={this.$t('chainType')}
            prop='chainType'
          >
            <ChainSelect
              coin={getType(chainType, COIN)}
              disabled={this.manageModel === EDIT}
              onCoinChange={this.handleCoinChange}
            />
          </Item>
          {getType(chainType, COIN) === 'USDT' && (
            <Item
              label={this.$t('walletChainType')}
              prop='chainType'
            >
              <CoinLine
                disabled={this.manageModel === EDIT}
                lineType={chainType}
                buttonList={lineList}
                onChangeLine={this.handleChangeLine}
              />
            </Item>
          )}
          <Item
            label={this.$t('withDrawAddress')}
            prop='address'
            rules={
              [
                { required: true, message: this.$t('withDrawNullAddressTips') },
                {
                  validator: (rule, value) => {
                    return new Promise((resolve, reject) => {
                      if (value && validateAddress(value, chainType)) {
                        resolve();
                      } else {
                        reject(true);
                      }
                    });
                  },
                  message: this.$t('walletAddressWrong'),
                },
              ]}
          >
            <Input.TextArea
              autoSize
              placeholder={this.$t('walletWithDrawAddressTip')}
              v-model={this.addressInfo.address}
            />
          </Item>
          <Item
            label={this.$t('walletAddressName')}
            prop='addressName'
            rules={[{ required: true, message: this.$t('walletInputAddressName') }]}
          >
            <Input
              placeholder={this.$t('walletAddressNameTip')}
              v-model={this.addressInfo.addressName}
              maxLength={20}
            />
          </Item>
        </FormModel>
      </ConfirmModal>
    );
  },
};

export default AddOrEditAddressModal;
