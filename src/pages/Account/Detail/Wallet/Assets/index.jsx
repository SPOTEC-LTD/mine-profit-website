import { mapState } from 'vuex';
import { List } from 'ant-design-vue';
import numberUtils from 'aa-utils/lib/numberUtils';
import LockOutline from 'ahoney/lib/icons/LockOutline';
import HandCardOutlined from 'ahoney/lib/icons/HandCardOutlined';

import { addressPath, depositPath, withdrawPath, buyBackPath } from '@/router/consts/urls';
import { EthIcon, BtcIcon, UsdtIcon } from '@/shared/components/ChainIcon';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import NewWindowGuide from '@/shared/components/NewWindowGuide';
import TradeBeforeVerified from '@/shared/components/TradeBeforeVerified';
import locationHelp from '@/shared/utils/locationHelp';
import walletMptIconBlack from '@/assets/account/wallet/wallet_mpt_icon_black.png';

import styles from './index.less?module';

const Assets = {
  props: { userBalance: Object },
  computed: {
    ...mapState({
      dynamicChainTypeList: state => state.dynamicChainTypeList,
    }),

    dynamicChain() {
      const [chainInfo = { symbol: '' }] = this.dynamicChainTypeList;
      return chainInfo.symbol;
    },

  },
  methods: {
    getWalletTotal() {
      const { totalUsdt, totalCny } = this.userBalance;
      return (
        <div class={styles['wallet-info']}>
          <div class={styles['info-left']}>
            <div class={styles['assets-title']}>{this.$t('walletAssetTotal')}</div>
            <div class={styles['assets-total']}>
              {numberUtils.formatNumber(totalUsdt, {
                minimumFractionDigits: 2,
              })}
              <span class={styles['assets-total-unit']}>USDT</span>
            </div>
            {getIsChinese() && (
              <div class={styles['assets-total-cny']}>
                {`${numberUtils.formatNumber(totalCny, {
                  minimumFractionDigits: 2,
                })} CNY`}
              </div>
            )}
          </div>
          <div class={styles['info-right']}>
            <div
              class={styles['wallet-button']}
              onClick={() => { locationHelp.open(depositPath); }}
            >
              <LockOutline />
              <div>{this.$t('walletAllTypesCharge')}</div>
            </div>
            <TradeBeforeVerified
              class={styles['withdraw-card']}
              isVerifiedKyc
              onVerifiedPass={() => { locationHelp.open(withdrawPath); }}
            >
              <div class={styles['wallet-button']}>
                <HandCardOutlined />
                <div>{this.$t('walletAllTypesCarry')}</div>
              </div>
            </TradeBeforeVerified>
          </div>
        </div>
      );
    },

    getCoinCardList() {
      const iconMap = {
        MPT: <img class='spotecicon' src={walletMptIconBlack} alt="" />, // TODO:
        USDT: <UsdtIcon />,
        BTC: <BtcIcon />,
        ETH: <EthIcon />,
      };

      return (
        <div class={styles['hashrate-info']}>
          <List
            scopedSlots={{
              footer: () => (
                <div class={styles['bottom-guide']}>
                  <NewWindowGuide
                    label={this.$t('withdrawAddressManagement')}
                    onGuide={() => { locationHelp.open(addressPath); }}
                  />
                </div>
              ),
            }}
          >
            {
              this.userBalance.balanceList.map(item => (
                <List.Item>
                  <div class={styles['card-title']}>
                    {iconMap[item.chainType]}
                    <div>{item.chainType}</div>
                  </div>
                  <div class={styles['coin-card-content']}>
                    <div class={styles.balance}>
                      {`${numberUtils.formatBigFloatNumber(item.balance, {
                        useGrouping: true,
                        minimumFractionDigits: 8,
                        maximumFractionDigits: 8,
                      })} ${item.chainType}`}
                    </div>
                    <div class={styles['coin-card-operate']}>
                      {item.chainType === this.dynamicChain && (
                        <div
                          class={styles['card-right-button']}
                          onClick={() => {
                            locationHelp.open(buyBackPath);
                          }}
                        >
                          {this.$t('buyBack')}
                        </div>
                      )}
                      <div
                        class={styles['card-right-button']}
                        onClick={() => {
                          locationHelp.open(depositPath, { query: { coinType: item.chainType } });
                        }}
                      >
                        {this.$t('walletAllTypesCharge')}
                      </div>
                      <TradeBeforeVerified
                        class={styles['card-right-button']}
                        isVerifiedKyc
                        onVerifiedPass={() => {
                          locationHelp.open(withdrawPath, { query: { coinType: item.chainType } });
                        }}
                      >
                        {this.$t('walletAllTypesCarry')}
                      </TradeBeforeVerified>
                    </div>
                  </div>
                </List.Item>
              ))}
          </List>
        </div>
      );
    },
  },

  render() {
    return (
      <div>
        {this.getWalletTotal()}
        {this.getCoinCardList()}
      </div>
    );
  },
};

export default Assets;
