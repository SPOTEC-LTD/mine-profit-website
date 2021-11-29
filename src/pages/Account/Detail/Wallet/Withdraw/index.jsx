import { mapState, mapActions, mapMutations } from 'vuex';
import { FormModel, Row, Col } from 'ant-design-vue';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import numberUtils from 'aa-utils/lib/numberUtils';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import * as API from '@/api/account/wallet';
import { WALLET, GET_WITHDRAWAL_ADDRESS, WITHDRAWAL } from '@/modules/account/wallet';
import {
  WITH_DRAW_ERROR,
  SECTION_BUSINESS_EXCEPTION,
  MAN_MACHINE_VERIFICATION_CODE,
} from '@/shared/utils/request/consts/ResponseCode';
import { LINE_USDT_ERC20, lineList } from '@/pages/Account/Detail/Wallet/consts/lineType';
import NumberInput, { FLOAT } from '@/shared/components/NumberInput';
import { addressPath, accountDetailPath } from '@/router/consts/urls';
import BaseContainer from '@/shared/components/BaseContainer';
import PageButton from '@/shared/components/PageButton';
import ChainSelect from '@/shared/components/ChainSelect';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import ModalButton from '@/shared/components/ModalButton';
import Select from '@/shared/components/Select';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import Notification from '@/shared/services/Notification';
import locationServices from '@/shared/services/location/locationServices';
import locationHelp from '@/shared/utils/locationHelp';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_IS_DEAL_PASSWORD_VERIFICATION,
  UPDATE_CAPTCHA_VERIFICATION,
} from '@/modules/manMachineVerification';

import NoActiveModal from './NoActiveModal';
import CoinLine from '../components/CoinLine';
import BottomTips from '../components/BottomTips';

import styles from './index.less?module';

const { Item } = FormModel;
const Withdraw = {
  data() {
    return {
      coin: this.$route.query.coinType || 'USDT',
      lineType: LINE_USDT_ERC20,
      formData: {
        withdrawAddress: undefined,
        amount: null,
      },
      isShowPasswordInput: false,
      showNoActiveModal: false,
      password: '',
    };
  },
  async asyncData(ctx) {
    const { userId } = getUserInfoFunc(ctx);
    const props = {
      walletBalanceList: [],
      allBalanceList: [],
      userId,
    };
    const getAllBalancePromise = API.getAllBalance({}, { ctx });
    const getWalletBalancePromise = API.getWalletBalance({ pathParams: { userId } }, { ctx });
    try {
      const { body: { list } } = await getWalletBalancePromise;
      props.walletBalanceList = list;
    } catch (error) {
      console.log(error, 'error');
    }

    try {
      const { body: { list } } = await getAllBalancePromise;
      props.allBalanceList = list;
    } catch (error) {
      console.log(error, 'error');
    }

    return props;
  },

  computed: {
    ...mapState({
      captchaVerification: state => state.manMachineVerification.captchaVerification,
      isVerificationSuccess: state => state.manMachineVerification.isVerificationSuccess,
      isDealPasswordVerification: state => state.manMachineVerification.isDealPasswordVerification,
      withdrawalAddressList: state => state.wallet.withdrawalAddressList,
      pageInfo: state => state.wallet.pageInfo,
      loading: state => state.loading.effects[`${WALLET}/${WITHDRAWAL}`],
    }),

    finallyChainType() {
      return this.coin === 'USDT' ? this.lineType : this.coin;
    },

    finallyBallance() {
      const defaultBallanceInfo = { balance: 0 };
      const [ballanceInfo = defaultBallanceInfo] = filter(this.walletBalanceList, { chainType: this.coin });
      return ballanceInfo;
    },

    finallyCoinInfo() {
      const defaultCoinInfo = { handlingFee: 0, amount: 0, minWithdraw: 0 };
      const chainType = this.finallyChainType;
      const [coinInfo = defaultCoinInfo] = filter(this.allBalanceList, { chainType });
      return coinInfo;
    },

    receiveNum() {
      const finallyNum = this.formData.amount - this.finallyCoinInfo.handlingFee;
      if (finallyNum < 0) {
        return 0;
      }
      return finallyNum;
    },

    defaultAddress() {
      if (isEmpty(this.withdrawalAddressList)) {
        this.formData.withdrawAddress = undefined;
        return undefined;
      }
      const { address } = this.withdrawalAddressList[0];
      this.formData.withdrawAddress = address;
      return address;
    },
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
    this.getAddressList();
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },

  methods: {
    ...mapActions(WALLET, [GET_WITHDRAWAL_ADDRESS, WITHDRAWAL]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    ...mapMutations(MAN_MACHINE_VERIFICATION, [UPDATE_IS_DEAL_PASSWORD_VERIFICATION, UPDATE_CAPTCHA_VERIFICATION]),
    getAddressList() {
      const data = {
        chainType: this.finallyChainType,
      };
      this[GET_WITHDRAWAL_ADDRESS](data);
    },

    changeCoin(val) {
      this.coin = val;
      this.getAddressList();
      this.formData.withdrawAddress = undefined;
      this.formData.amount = null;
      this.$refs.form.clearValidate(['amount', 'withdrawAddress']);
    },

    changeLine(val) {
      this.lineType = val;
      this.getAddressList();
      this.formData.withdrawAddress = undefined;
      this.formData.amount = null;
      this.$refs.form.clearValidate(['amount', 'withdrawAddress']);
    },

    addressChange(address) {
      this.formData.withdrawAddress = address;
    },

    handleConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isShowPasswordInput = true;
        }
        return false;
      });
    },

    onSubmit(password) {
      this.password = password || this.password;
      const paramsData = {
        chainType: this.finallyChainType,
        password: this.password,
        ...this.formData,
      };

      if (this.captchaVerification) {
        paramsData.captchaVerification = this.captchaVerification;
        this[UPDATE_CAPTCHA_VERIFICATION]('');
      }

      this[WITHDRAWAL](paramsData)
        .then(() => {
          this.isShowPasswordInput = false;
          locationServices.push(accountDetailPath);
          Notification.success(this.$t('withDrawSuccess'));
        })
        .catch(error => {
          const { isBusinessError, code, messageDetails } = error;
          if (isBusinessError && code === WITH_DRAW_ERROR) {
            this.isShowPasswordInput = false;
            this.showNoActiveModal = true;
          }
          if (isBusinessError && code === SECTION_BUSINESS_EXCEPTION) {
            this.isShowPasswordInput = false;
            const { withdrawAddress } = messageDetails;
            Notification.error(withdrawAddress);
          }
          if (code === MAN_MACHINE_VERIFICATION_CODE) {
            this[UPDATE_IS_DEAL_PASSWORD_VERIFICATION](true);
          }
        });
    },
  },

  render() {
    const { amount, minWithdraw, handlingFee } = this.finallyCoinInfo;
    const rowList = [
      {
        label: this.$t('withDrawFee'),
        number: handlingFee || '-',
      },
      {
        label: this.$t('withDrawReceivedNum'),
        number: bigNumberToFixed(this.receiveNum, 8),
      },
    ];

    return (
      <div>
        <BaseContainer contentClassName={styles['account-withdraw']}>
          <div class={styles.withdraw}>
            <FormModel
              ref='form'
              class="normal-form"
              props={{ model: this.formData }}
            >
              <Item label={this.$t('chainType')}>
                <ChainSelect
                  coin={this.coin}
                  onCoinChange={this.changeCoin}
                />
                <div class={styles['withdraw-balance']}>
                  {`${this.$t('ballance')}${numberUtils.formatBigFloatNumber(
                    this.finallyBallance.balance,
                    {
                      minimumFractionDigits: 8,
                      maximumFractionDigits: 8,
                    },
                  )}`}
                </div>
              </Item>
              {this.coin === 'USDT' && (
                <Item label={this.$t('withDrawChainName')}>
                  <CoinLine
                    lineType={this.lineType}
                    buttonList={lineList}
                    onChangeLine={this.changeLine}
                  />
                </Item>
              )}
              <Item
                label={this.$t('address')}
                prop='withdrawAddress'
                rules={[{ required: true, message: this.$t('withDrawNullAddressTips') }]}
              >
                <div class={styles.address}>
                  <Select
                    class={styles['address-input']}
                    placeholder={this.$t('selectPlaceholder')}
                    value={this.formData.withdrawAddress || this.defaultAddress}
                    onChange={this.addressChange}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
                  >
                    {this.withdrawalAddressList.map(({ address, id }) => (
                      <Select.Option
                        key={id}
                        value={address}
                      >
                        {address}
                      </Select.Option>
                    ))}
                  </Select>
                  <ModalButton
                    class={styles['address-btn']}
                    type="primary"
                    onClick={() => {
                      locationHelp.open(addressPath, { params: { coinType: this.finallyChainType } });
                    }}
                  >
                    {this.$t('addressManagement')}
                  </ModalButton>
                </div>
              </Item>
              <Item
                label={this.$t('withDrawNum')}
                prop='amount'
                rules={[
                  { required: true, message: this.$t('withDrawNullNumberTips') },
                  {
                    asyncValidator: (rule, value) => {
                      return new Promise((resolve, reject) => {
                        if (value && +value < +this.finallyCoinInfo.minWithdraw) {
                          reject(true);
                        } else {
                          resolve();
                        }
                      });
                    },
                    message: `${this.$t('minWithDrawNumber')} ${this.finallyCoinInfo.minWithdraw}`,
                  },
                ]}
              >
                <NumberInput
                  value={this.formData.amount}
                  max={+amount}
                  precision={8}
                  numberType={FLOAT}
                  onChange={value => { this.formData.amount = value; }}
                  scopedSlots={{
                    suffix: () => (
                      <div
                        class={styles['withdraw-number']}
                        onClick={() => {
                          this.formData.amount = amount;
                          this.$refs.form.validateField('amount');
                        }}
                      >
                        {this.$t('all')}
                      </div>
                    ),
                  }}
                  placeholder={`${this.$t('minWithDrawNumber')}${minWithdraw}`}
                />
              </Item>
              <Row gutter={[32, 0]}>
                {rowList.map(({ label, number }, index) => (
                  <Col span={12} key={index}>
                    <Item label={label}>
                      <div class={styles.arrival}>{`${number}  ${this.coin}`}</div>
                    </Item>
                  </Col>
                ))}
              </Row>
            </FormModel>
            <BottomTips note={this.$t('withDrawTips')} />
          </div>
        </BaseContainer>
        <PageButton
          disabled={this.disabled}
          type="primary"
          loading={this.submitLoading}
          onClick={this.handleConfirm}
        >
          {this.$t('confirm')}
        </PageButton>

        <ConfirmPayDialog
          onCancel={() => { this.isShowPasswordInput = false; }}
          loading={this.loading}
          onConfirm={this.onSubmit}
          visible={this.isShowPasswordInput}
        />

        <NoActiveModal
          value={this.showNoActiveModal}
          userId={this.userId}
          onCloseNoActive={() => { this.showNoActiveModal = false; }}
        />
      </div>
    );
  },
};

export default Withdraw;
