import { mapState, mapActions, mapMutations } from 'vuex';
import { Table } from 'ant-design-vue';

import { WALLET, GET_WITHDRAWAL_ADDRESS, ADD_ADDRESS, DELETE_ADDRESS, EDIT_ADDRESS } from '@/modules/account/wallet';
import { ADD, EDIT } from '@/pages/Account/Detail/Wallet/consts/dialogType';
import { SECTION_BUSINESS_EXCEPTION, MAN_MACHINE_VERIFICATION_CODE } from '@/shared/utils/request/consts/ResponseCode';
import { COIN, LINE, getType } from '@/pages/Account/Detail/Wallet/consts/lineType';
import BaseContainer from '@/shared/components/BaseContainer';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import Notification from '@/shared/services/Notification';
import ConfirmModal from '@/shared/components/ConfirmModal';
import InfoTooltip from '@/shared/components/InfoTooltip';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_IS_DEAL_PASSWORD_VERIFICATION,
  UPDATE_CAPTCHA_VERIFICATION,
} from '@/modules/manMachineVerification';

import AddressHeader from './AddressHeader';
import AddOrEditAddressModal from './AddOrEditAddressModal';

import styles from './index.less?module';

const Address = {
  data() {
    return {
      addressInfo: {},
      coin: this.$route.query.coinType || '',
      manageModel: '',
      isShowPasswordInput: false,
      showDeleteModal: false,
      password: '',
    };
  },
  computed: {
    ...mapState({
      captchaVerification: state => state.manMachineVerification.captchaVerification,
      isVerificationSuccess: state => state.manMachineVerification.isVerificationSuccess,
      isDealPasswordVerification: state => state.manMachineVerification.isDealPasswordVerification,
      withdrawalAddressList: state => state.wallet.withdrawalAddressList,
      loading: state => state.loading.effects[`${WALLET}/${GET_WITHDRAWAL_ADDRESS}`],
      addLoading: state => state.loading.effects[`${WALLET}/${ADD_ADDRESS}`],
      editLoading: state => state.loading.effects[`${WALLET}/${EDIT_ADDRESS}`],
      deleteLoading: state => state.loading.effects[`${WALLET}/${DELETE_ADDRESS}`],
    }),
  },
  watch: {
    isVerificationSuccess(value) {
      if (value) {
        if (this.isDealPasswordVerification) {
          this.onSubmit();
          this[UPDATE_IS_DEAL_PASSWORD_VERIFICATION](false);
        }
      }
    },
  },
  mounted() {
    this.getWithdrawalAddressList();
  },
  methods: {
    ...mapActions(WALLET, [GET_WITHDRAWAL_ADDRESS, ADD_ADDRESS, DELETE_ADDRESS, EDIT_ADDRESS]),
    ...mapMutations(MAN_MACHINE_VERIFICATION, [UPDATE_IS_DEAL_PASSWORD_VERIFICATION, UPDATE_CAPTCHA_VERIFICATION]),
    getWithdrawalAddressList(options = {}) {
      const { query = {} } = options;
      const data = {
        chainType: this.coin || null,
        ...query,
      };
      this[GET_WITHDRAWAL_ADDRESS](data);
    },

    openAddressModal(manageModel, info) {
      if (manageModel === EDIT) {
        this.addressInfo = info;
      } else {
        this.addressInfo = {
          addressName: '',
          address: '',
          chainType: this.coin || 'USDT-ERC20',
        };
      }
      this.manageModel = manageModel;
      this.$refs.addOrEdit.openDialog(manageModel, this.addressInfo);
    },

    handleCoinChange(coin) {
      this.coin = coin;
      this.getWithdrawalAddressList();
    },

    getActionNode(info) {
      return (
        <div class={styles['action-box']}>
          <div
            class={styles.action}
            onClick={() => { this.openAddressModal(EDIT, info); }}
          >
            {this.$t('edit')}
          </div>
          <div
            class={styles.action}
            onClick={() => {
              this.deleteId = info.id;
              this.showDeleteModal = true;
            }}
          >
            {this.$t('delete')}
          </div>
        </div>
      );
    },

    infoChangeConfirm(newInfo) {
      this.addressInfo = newInfo;
      this.isShowPasswordInput = true;
    },

    onSubmit(password) {
      this.password = password || this.password;
      const { address, addressName, chainType } = this.addressInfo;
      const data = {
        dealCode: this.password,
        address,
        addressName,
        chainType,
      };

      if (this.captchaVerification) {
        data.captchaVerification = this.captchaVerification;
        this[UPDATE_CAPTCHA_VERIFICATION]('');
      }
      const methodsMap = {
        [EDIT]: {
          method: EDIT_ADDRESS,
          query: { id: this.addressInfo.id, data },
        },
        [ADD]: {
          method: ADD_ADDRESS,
          query: data,
        },
      };
      const { method, query } = methodsMap[this.manageModel];
      this[method](query)
        .then(() => {
          this.isShowPasswordInput = false;
          this.getWithdrawalAddressList();
          Notification.success(this.$t('operationSuccess'));
        })
        .catch(error => {
          const { isBusinessError, code, messageDetails } = error;
          if (isBusinessError && code === SECTION_BUSINESS_EXCEPTION) {
            this.isShowPasswordInput = false;
            Notification.error(messageDetails.address);
          }
          if (code === MAN_MACHINE_VERIFICATION_CODE) {
            this[UPDATE_IS_DEAL_PASSWORD_VERIFICATION](true);
          }
        });
    },

    deleteModalConfirm() {
      this[DELETE_ADDRESS]({ id: this.deleteId })
        .then(() => {
          this.showDeleteModal = false;
          this.getWithdrawalAddressList();
          Notification.success(this.$t('operationSuccess'));
        });
    },
  },
  render() {
    const columns = [
      {
        title: this.$t('walletCoinType'),
        dataIndex: 'coinType',
        align: 'center',
        width: 150,
        customRender: (_, { chainType }) => getType(chainType, COIN),
      },
      {
        title: this.$t('walletChainType'),
        dataIndex: 'lineType',
        align: 'center',
        width: 130,
        customRender: (_, { chainType }) => getType(chainType, LINE),
      },
      {
        title: this.$t('walletAddressName'),
        dataIndex: 'addressName',
        align: 'center',
        ellipsis: true,
        customRender: (_, { addressName }) => {
          return (
            <div class={styles['tooltip-box']}>
              <InfoTooltip
                content={addressName}
                trigger='click'
              >
                <div class={styles['tooltip-name']}>{addressName}</div>
              </InfoTooltip>
            </div>
          );
        },
      },
      {
        title: this.$t('address'),
        dataIndex: 'address',
        align: 'center',
        width: 550,
      },
      {
        title: this.$t('operation'),
        dataIndex: 'eachAmount',
        align: 'center',
        width: 160,
        customRender: (_, info) => this.getActionNode(info),
      },
    ];

    return (
      <BaseContainer>
        <AddressHeader
          coin={this.coin}
          onCoinChange={this.handleCoinChange}
          onOpenAddModal={() => { this.openAddressModal(ADD); }}
        />
        <Table
          class='blue-table'
          rowKey={record => record.id}
          columns={columns}
          dataSource={this.withdrawalAddressList}
          loading={this.loading}
          pagination={false}
        />

        <AddOrEditAddressModal
          ref='addOrEdit'
          manageModel={this.manageModel}
          onInfoChangeConfirm={this.infoChangeConfirm}
        />

        <ConfirmPayDialog
          onCancel={() => { this.isShowPasswordInput = false; }}
          loading={this.manageModel === ADD ? this.addLoading : this.editLoading}
          onConfirm={this.onSubmit}
          visible={this.isShowPasswordInput}
          clearOnConfirm
        />

        <ConfirmModal
          title={this.$t('delete')}
          visible={this.showDeleteModal}
          onConfirm={this.deleteModalConfirm}
          onCancel={() => { this.showDeleteModal = false; }}
        >
          <div class={styles['modal-text']}>{this.$t('walletConfirmDeleteAddress')}</div>
        </ConfirmModal>
      </BaseContainer>
    );
  },
};

export default Address;
