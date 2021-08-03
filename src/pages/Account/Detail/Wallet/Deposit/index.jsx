import { FormModel, Input } from 'ant-design-vue';
import filter from 'lodash/filter';
import InfoCircleFilled from 'ahoney/lib/icons/InfoCircleFilled';

import * as API from '@/api/account/wallet';
import CopyToClipboard from '@/shared/components/CopyToClipboard';
import BaseContainer from '@/shared/components/BaseContainer';
import ChainSelect from '@/shared/components/ChainSelect';
import QRCodeModule from '@/shared/components/QRCodeModule';

import { LINE_USDT_ERC20 } from '../consts/lineType';
import CoinLine from '../components/CoinLine';

import styles from './index.less?module';

const { Item } = FormModel;
const Deposit = {
  props: { userBalance: Object },
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
      let finallyCoinList = filter(this.coinList, { coin: this.coin });
      if (finallyCoinList.length > 1) {
        finallyCoinList = filter(this.coinList, { chainType: this.lineType });
      }
      return finallyCoinList[0];
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
      // { buttonText: 'OMNI', line: LINE_USDT_OMNI },
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
              <Input
                class={styles['address-input']}
                scopedSlots={{
                  suffix: () => <CopyToClipboard text={address}>{this.$t('copy')}</CopyToClipboard>,
                }}
                value={address}
              />
            </Item>
          </FormModel>
          <div class={styles['bottom-tips']}>
            <InfoCircleFilled />
            <div class={styles['tips-box']}>
              <span>{this.$t('tips')}</span>
              <div>{note}</div>
            </div>
          </div>
        </div>
      </BaseContainer>
    );
  },
};

export default Deposit;
