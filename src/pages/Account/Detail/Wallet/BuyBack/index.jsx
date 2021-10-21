import { mapState, mapActions } from 'vuex';
import numberUtils from 'aa-utils/lib/numberUtils';
import { FormModel } from 'ant-design-vue';
import { WALLET, GET_BUY_BACK_DETAIL, OFFICIAL_BUY_BACK } from '@/modules/account/wallet';
import { accountPath } from '@/router/consts/urls';
import NumberInput from '@/shared/components/NumberInput';
import BaseContainer from '@/shared/components/BaseContainer';
import MPTLineChart from '@/shared/components/MPTLineChart';
import PageButton from '@/shared/components/PageButton';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import locationServices from '@/shared/services/location/locationServices';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import styles from './index.less?module';

const { Item } = FormModel;
const BuyBack = {
  data() {
    return {
      isShowPasswordInput: false,
      formData: { count: null },
    };
  },
  computed: {
    ...mapState({
      buyBackDetail: state => state.wallet.buyBackDetail,
      dynamicChainTypeList: state => state.dynamicChainTypeList,
    }),

    dynamicChainType() {
      const [chainInfo = { symbol: '', unit: '' }] = this.dynamicChainTypeList;
      return chainInfo;
    },
  },
  mounted() {
    this[GET_BUY_BACK_DETAIL]();
    this.timer = setInterval(() => {
      this[GET_BUY_BACK_DETAIL]();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    ...mapActions(WALLET, [OFFICIAL_BUY_BACK, GET_BUY_BACK_DETAIL]),

    getTextColor(rate) {
      if (+rate) {
        return rate > 0 ? 'rate-color-blue' : 'rate-color-red';
      }
      return '';
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
      const paramsData = {
        password,
        count: +this.buyBackCount,
      };
      this[OFFICIAL_BUY_BACK](paramsData)
        .then(() => {
          this.isShowPasswordInput = false;
          locationServices.push(accountPath);
          Notification.success(this.$t('operationSuccess'));
        });
    },
  },

  render() {
    const { buyBackPrice, priceRate, maxAmount, trend } = this.buyBackDetail;
    const max = maxAmount || 0;
    const price = buyBackPrice || 0;
    const rate = priceRate || 0;

    return (
      <div>
        <BaseContainer contentClassName={styles['buy-back']}>
          <div class={styles['buy-back-header']}>
            <div class={styles['buy-back-icon']} />
            <div class={styles['buy-back-title']}>{this.$t('officialByuBack', { value: this.dynamicChainType.symbol })}</div>
          </div>
          <div class={styles['buy-back-body']}>
            <FormModel
              ref='form'
              class="normal-form"
              props={{ model: this.formData }}
            >
              <div class={styles['body-info']}>
                <Item label={this.$t('officialByuBackPrice')}>
                  <div class={styles['official-price']}>
                    {`${bigNumberToFixed(price, 10)} USDT/${this.dynamicChainType.symbol}`}
                  </div>
                </Item>
                <Item label={this.$t('priceRate24H')}>
                  <div class={[styles['official-price-rate'], styles[this.getTextColor(rate)]]}>
                    {numberUtils.formatPercent(
                      rate,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        usePlus: rate > 0,
                      },
                    )}
                  </div>
                </Item>
              </div>
              <div class={styles['line-chart']}>
                <MPTLineChart
                  title={this.$t('priceTrend', { value: this.dynamicChainType.symbol })}
                  dataSource={trend}
                  nameY={'USDT'}
                />
              </div>
              <Item
                label={this.$t('pledgeAmount')}
                prop="count"
                rules={[
                  { required: true, message: this.$t('quantitySoldTips'), trigger: 'change' },
                  {
                    validator: (rule, value) => {
                      return new Promise((resolve, reject) => {
                        if (value && value > 0) {
                          resolve();
                        } else {
                          reject(true);
                        }
                      });
                    },
                    message: this.$t('transferThanZero'),
                  },
                ]}
              >
                <NumberInput
                  value={this.formData.count}
                  max={+max}
                  precision={8}
                  onChange={value => {
                    this.formData.count = value;
                    console.log(value, this.formData.count);
                  }}
                  scopedSlots={{
                    suffix: () => (
                      <div class={styles['amount-input-suffix']}>
                        <span>{this.dynamicChainType.symbol}</span>
                        <span
                          onClick={() => {
                            this.formData.count = max;
                            this.$refs.form.validateField('count');
                          }}
                        >
                          {this.$t('all')}
                        </span>
                      </div>
                    ),
                  }}
                  placeholder={`${this.$t('marketFieldHintMax')}${max}`}
                />
                <div class={styles['transfer-amount-prompt']}>
                  {`${this.$t('transferRemainAmount')}：${max}${this.dynamicChainType.unit}`}
                </div>
              </Item>
              <div class={styles['sale-total-price']}>
                <div class={styles['price-title']}>{this.$t('totalSalePrice')}</div>
                <div class={styles['total-price-box']}>
                  <div class={styles['total-price']}>
                    {
                      +this.formData.count
                        ? bigNumberToFixed(
                          numberUtils.times(price, this.formData.count),
                          10,
                        )
                        : '-'
                    }
                  </div>
                  <div class={styles['total-price-unit']}>USDT</div>
                </div>
              </div>
            </FormModel>
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
      </div>
    );
  },
};

export default BuyBack;