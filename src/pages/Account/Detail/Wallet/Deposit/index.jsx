import { FormModel } from 'ant-design-vue';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';

import { LINE_USDT_ERC20, LINE_USDT_OMNI } from '@/pages/Account/Detail/Wallet/consts/lineType';
import * as API from '@/api/account/wallet';
import CopyToClipboard from '@/shared/components/CopyToClipboard';
import BaseContainer from '@/shared/components/BaseContainer';
import ChainSelect from '@/shared/components/ChainSelect';
import QRCodeModule from '@/shared/components/QRCodeModule';

import CoinLine from '../components/CoinLine';
import BottomTips from '../components/BottomTips';

import styles from './index.less?module';

const { Item } = FormModel;
const Deposit = {
  data() {
    return {
      coin: this.$route.query.coinType || 'USDT',
      lineType: LINE_USDT_ERC20,
      address: '',
    };
  },
  async asyncData(ctx) {
    let coinList = [];
    try {
      const { body: { list } } = await API.getRechargeAddresses({}, { ctx });
      coinList = list;
    } catch (error) {
      console.log(error, 'error');
    }
    return { coinList };
  },
  computed: {
    finallyCoinInfo() {
      const defaultInfo = { note: '', address: '' };
      let finallyCoinList = filter(this.coinList, { coin: this.coin });
      if (finallyCoinList.length > 1) {
        finallyCoinList = filter(this.coinList, { chainType: this.lineType });
      }
      return isEmpty(finallyCoinList) ? defaultInfo : finallyCoinList[0];
    },
  },
  methods: {
    onCoinChange(value) {
      this.coin = value;
    },

    changeLine(val) {
      this.lineType = val;
    },
  },
  render() {
    const buttonList = [
      { buttonText: 'ERC20', line: LINE_USDT_ERC20 },
      { buttonText: 'OMNI', line: LINE_USDT_OMNI },
    ];
    const { note, address } = this.finallyCoinInfo;
    return (
      <BaseContainer contentClassName={styles['account-deposit']}>
        <div class={styles.deposit}>
          <FormModel class="normal-form">
            <Item label={this.$t('chainType')}>
              <ChainSelect
                coin={this.coin}
                onCoinChange={this.onCoinChange}
              />
            </Item>
            {this.coin === 'USDT' && (
              <Item label={this.$t('withDrawChainName')}>
                <CoinLine
                  lineType={this.lineType}
                  buttonList={buttonList}
                  onChangeLine={this.changeLine}
                />
              </Item>
            )}
            <Item label={this.$t('qrCode')}>
              <QRCodeModule
                key={address}
                class={styles['qr-code']}
                options={{ width: 132 }}
                value={address}
              />
            </Item>
            <Item label={this.$t('address')}>
              <div class={styles['address-input']}>
                <span>{address}</span>
                <CopyToClipboard text={address}>{this.$t('copy')}</CopyToClipboard>
              </div>
            </Item>
          </FormModel>
          <BottomTips note={note} />
        </div>
      </BaseContainer>
    );
  },
};

export default Deposit;
