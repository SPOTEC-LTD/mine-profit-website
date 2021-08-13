import { List } from 'ant-design-vue';
import numberUtils from 'aa-utils/lib/numberUtils';
import LockOutline from 'ahoney/lib/icons/LockOutline';
import HandCardOutlined from 'ahoney/lib/icons/HandCardOutlined';

import { addressPath, depositPath, withdrawPath } from '@/router/consts/urls';
import { EthIcon, BtcIcon, UsdtIcon } from '@/shared/components/ChainIcon';
import NewWindowGuide from '@/shared/components/NewWindowGuide';
import TradeBeforeVerified from '@/shared/components/TradeBeforeVerified';
import locationHelp from '@/shared/utils/locationHelp';

import styles from './index.less?module';

const Assets = {
  props: { userBalance: Object },

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
            </div>
            <div class={styles['assets-total-cny']}>
              {`${numberUtils.formatNumber(totalCny, {
                minimumFractionDigits: 2,
              })} CNY`}
            </div>
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
                  <div class={styles['coin-card-content']}>
                    <div class={styles['card-title']}>
                      {iconMap[item.chainType]}
                      <div>{item.chainType}</div>
                    </div>
                    <div class={styles.balance}>
                      {`${numberUtils.formatBigFloatNumber(item.balance, {
                        useGrouping: true,
                        minimumFractionDigits: 8,
                        maximumFractionDigits: 8,
                      })} ${item.chainType}`}
                    </div>
                  </div>
                  <div class={styles['coin-card-operate']}>
                    <div
                      class={styles['card-right-button']}
                      onClick={() => {
                        locationHelp.open(depositPath, { params: { coinType: item.chainType } });
                      }}
                    >
                      {this.$t('walletAllTypesCharge')}
                    </div>
                    <TradeBeforeVerified
                      class={styles['card-right-button']}
                      isVerifiedKyc
                      onVerifiedPass={() => {
                        locationHelp.open(withdrawPath, { params: { coinType: item.chainType } });
                      }}
                    >
                      {this.$t('walletAllTypesCarry')}
                    </TradeBeforeVerified>
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
