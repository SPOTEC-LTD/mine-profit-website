import { mapActions, mapState } from 'vuex';
import { Dropdown, Menu } from 'ant-design-vue';
import { InfoCircleFilled, TriangleFilled } from 'ahoney/lib/icons';
import getDivided from '@/shared/utils/getDivided';
import PayWayItem from '@/shared/components/PayWayItem';
import { USER, GET_USER_BALLANCE } from '@/modules/user';
import btcIcon from '@/assets/account/wallet_btc_icon.png';
import ethIcon from '@/assets/account/wallet_eth_icon.png';
import usdtIcon from '@/assets/account/wallet_usdt_icon.png';
import getOrderBalance from '@/shared/utils/getOrderBalance';
import FormContainer from '@/shared/components/FormContainer';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import './index.less';

const PayWaySelector = {
  props: {
    willPayAmount: [Number, String],
    btcRate: [Number, String],
    ethRate: [Number, String],
  },

  data() {
    return {
      choosesCoin: 'USDT',
      payAmount: 0,
      menuVisible: false,
      balance: 0,
      iconArr: {
        BTC: btcIcon,
        ETH: ethIcon,
        USDT: usdtIcon,
      },
    };
  },

  computed: {
    ...mapState({
      userBallanceList: state => getOrderBalance(state.user.userBallance),
      fetchBallanceLoading: state => state.loading.effects[`${USER}/${GET_USER_BALLANCE}`],
    }),

    isNoBalance() {
      let isNoRest;
      const finalPayAmount = this.payAmount || this.willPayAmount;
      this.userBallanceList.forEach(item => {
        if (item.chainType === this.choosesCoin) {
          this.balance = +item.balance;
          isNoRest = +item.balance < finalPayAmount;
        }
      });
      return isNoRest;
    },
  },

  watch: {
    willPayAmount() {
      this.handleCoinChange(this.choosesCoin);
    },
  },

  mounted() {
    this.payAmount = bigNumberToFixed(this.willPayAmount, 2);
    this[GET_USER_BALLANCE]();
    document.addEventListener('click', this.onHandleClickDocument);
  },

  destroyed() {
    document.removeEventListener('click', this.onHandleClickDocument);
  },

  methods: {
    ...mapActions(USER, [GET_USER_BALLANCE]),

    onHandleClickDocument() {
      this.menuVisible = false;
    },

    handleClickMenu(e) {
      e.stopPropagation();
      this.menuVisible = !this.menuVisible;
    },

    handleCoinChange(coin) {
      this.choosesCoin = coin;
      if (coin === 'USDT') {
        this.payAmount = bigNumberToFixed(this.willPayAmount, 2);
        return;
      }

      const rate = coin === 'BTC' ? this.btcRate : this.ethRate;
      const resultMount = getDivided({ number: this.willPayAmount, divisor: rate, decimal: 8 });
      this.payAmount = resultMount;
      this.$emit('handlePayNow', this.choosesCoin);
    },

    getMenuNode() {
      return (
        <Menu>
          {
            this.userBallanceList.map(item => (
              <Menu.Item key={item.code}>
                <PayWayItem
                  coinData={item}
                  choosesCoin={this.choosesCoin}
                  onClickChange={coin => { this.handleCoinChange(coin); }}
                />
              </Menu.Item>
            ))
          }
        </Menu>
      );
    },

    getNoBalanceNode() {
      return (
        <div class='pay-no-balance'>
          <InfoCircleFilled />
          <span class='pay-not-enough'>{this.$t('payNotEnough')}</span>
          <span class='pay-right-now'>{this.$t('payNow')}</span>
        </div>
      );
    },

    balanceNode() {
      return (
        <div class='pay-way-balance-amount'>
          {`${this.$t('withdrawAccountBalance')}: ${bigNumberToFixed(this.balance, 8)} ${this.choosesCoin}`}
        </div>
      );
    },
  },

  render() {
    return (
      <FormContainer class='pay-way-selector-container'>
        <div class='pay-way-selector-title'>{this.$t('choosePayWay')}</div>
        <Dropdown
          overlayClassName="pay-way-overlay"
          placement="bottomCenter"
          getPopupContainer={triggerNode => triggerNode.parentNode}
          overlay={this.getMenuNode}
          trigger={['click']}
          visible={this.menuVisible}
        >
          <div class='pay-way-selectors' onClick={e => { e.stopPropagation(); }}>
            <div class='pay-way-chooses-coin'>
              <img src={this.iconArr[this.choosesCoin]} alt="" class='pay-way-coin-img' />
              <span>{this.choosesCoin}</span>
            </div>
            {!this.menuVisible && (
              <div onClick={this.handleClickMenu} class='fold-click-show-selector'>{this.$t('otherPayWay')}</div>
            )}
            {this.menuVisible && (
              <div onClick={this.handleClickMenu} class='click-show-selector'>
                <span>{this.$t('choosePayWay')}</span>
                <TriangleFilled />
              </div>
            )}
          </div>
        </Dropdown>
        <div class='pay-way-balance'>
          {this.isNoBalance ? this.getNoBalanceNode() : this.balanceNode()}
        </div>
        <div class='wait-pay-amount'>
          <div class='wait-pay-amount-title'>{this.$t('waitPayAmount')}</div>
          <div>
            <span class='will-pay-number'>{this.payAmount}</span>
            <span>{this.choosesCoin}</span>
          </div>
        </div>
      </FormContainer>
    );
  },
};

export default PayWaySelector;
