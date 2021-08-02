import numberUtils from 'aa-utils/lib/numberUtils';
import { mapState, mapActions } from 'vuex';
import ProductTitle from '@/shared/components/ProductTitle';
import { getHashRateTurnOnDetail } from '@/api/account/hashRate';
import BaseContainer from '@/shared/components/BaseContainer';
import PageButton from '@/shared/components/PageButton';
import { accountHashRateListPath } from '@/router/consts/urls';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import ListCell from '@/pages/Account/HashRate/List/components/ListCell';
import CellValue from '@/pages/Account/HashRate/List/components/CellValue';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import CountDownToLink from '@/shared/components/CountDownToLink';
import { HASH_RATE, HASHRATE_POWER_ON, hashrateStatusMap } from '@/modules/account/hashRate';
import ErrorAlert from './ErrorAlert';
import styles from './index.less?module';

const HashRateTurnOn = {
  async asyncData(ctx) {
    const { userId } = getUserInfoFunc(ctx);

    const props = {
      hashRateDetail: {},
    };

    try {
      const { body: { hashrateActionInfo } } =
        await getHashRateTurnOnDetail({ pathParams: { userId, ...ctx.params } }, { ctx });

      props.hashRateDetail = hashrateActionInfo;
    } catch (error) {
      console.log('error', error);
    }
    return props;
  },
  data() {
    return {
      isShowPasswordInput: false,
      showCountDownToLink: false,
    };
  },
  computed: {
    ...mapState({
      powerOnLoading: state => state.loading.effects[`${HASH_RATE}/${HASHRATE_POWER_ON}`],
    }),
  },
  methods: {
    ...mapActions(HASH_RATE, [HASHRATE_POWER_ON]),

    onPowerOn(dealCode) {
      this[HASHRATE_POWER_ON]({ dealCode, productTemplateId: this.$route.params.productTemplateId }).then(() => {
        this.isShowPasswordInput = false;
        this.showCountDownToLink = true;
      });
    },

    getListData() {
      const {
        shutdownCoinPrice, currentCoinPrice, hashrateType, isAction, rate,
        actionAmount, actionDeductionAmount, unit, minActionHashrate,
      } = this.hashRateDetail;
      return [
        {
          label: this.$t('hashrateShutDownPrice'), // 关机币价
          value: (
            <CellValue
              value={numberUtils.formatNumber(shutdownCoinPrice, { minimumFractionDigits: 2 })}
              unit={`USDT/${hashrateType}`}
            />),
        },
        {
          label: this.$t('hashrateCurrentPrice'), // 当前币价
          showMention: true,
          notificationContent: this.$t('hashrateCurrentPriceTips'), // '当前币价≥(关机币价*1.05)时关机算力可开机',
          value: (
            <CellValue
              value={currentCoinPrice ? numberUtils.formatNumber(currentCoinPrice, { minimumFractionDigits: 2 }) : '-'}
              unit={`USDT/${hashrateType}`}
            />),
        },
        {
          label: this.$t('hashrateCanOpen'), // 可开机算力
          showMention: true,
          notificationContent: this.$t('hashrateCanOpenTips', {
            hashrateType,
            unit,
            num: minActionHashrate,
          }),
          value: (
            <CellValue
              value={isAction ? numberUtils.formatNumber(actionAmount, { minimumFractionDigits: 2 }) : '-'}
              unit={unit}
            />),
        },
        {
          label: this.$t('hashrateOpenPrice'), // 开机维护费
          showMention: true,
          notificationContent: this.$t('hashrateOpenPriceTips', {
            rate: numberUtils.formatPercent(rate, { minimumFractionDigits: 2 }),
          }),
          value: (
            <CellValue
              value={isAction ? numberUtils.formatNumber(actionDeductionAmount, { minimumFractionDigits: 2 }) : '-'}
              unit={unit}
            />),
        },
      ];
    },

    getListTwoData() {
      const { hashRateDetail: {
        unit, isAction, actualAmount,
      } } = this;
      return [
        {
          label: this.$t('hashrateNumOpened'), // 开机后算力
          value: (
            <CellValue
              value={isAction ? numberUtils.formatNumber(actualAmount, { minimumFractionDigits: 2 }) : '-'}
              unit={unit}
            />),
        },
        {
          label: this.$t('marketStartMineTime'), // 开挖时间
          value: (<CellValue value={isAction ? 'T+1' : '-'} />),
        },
      ];
    },
  },

  render() {
    const { hashRateDetail } = this;
    const { isAction } = hashRateDetail;
    return (
      <div>
        <BaseContainer contentClassName={styles.container}>
          <div>
            <ProductTitle name={hashRateDetail.productTemplateName} chainType={hashRateDetail.hashrateType} />

            <div class={styles['form-info']}>
              <ListCell class='line-border-list' dataSource={this.getListData()} />
            </div>
            <div class={styles['form-info']}>
              <ListCell class='line-border-list' dataSource={this.getListTwoData()} />
            </div>
            <ErrorAlert class={styles.tips} value={this.$t('hashrateOpenTips')} />
            <ConfirmPayDialog
              onCancel={() => {
                this.isShowPasswordInput = false;
              }}
              loading={this.powerOnLoading}
              onConfirm={this.onPowerOn}
              show={this.isShowPasswordInput}
              title={this.$t('hashrateConfirmOpen')}
            />
            <CountDownToLink
              to={{
                path: accountHashRateListPath,
                query: { hashrateType: hashRateDetail.hashrateType, activeName: hashrateStatusMap.SHUTDOWN },
              }}
              show={this.showCountDownToLink}
              operatingSuccess={this.$t('hashrateOpenSuccess')}
              promptText={this.$t('hashrateOpenSuccessTips')}
            />
          </div>
        </BaseContainer>
        <PageButton
          class={styles.button}
          type="primary"
          disabled={!isAction}
          onClick={() => { this.isShowPasswordInput = true; }}
        >
          {isAction ? this.$t('hashrateConfirmOpen') : this.$t('hashrateCanNotOpen')}
        </PageButton>
      </div>
    );
  },
};

export default HashRateTurnOn;
