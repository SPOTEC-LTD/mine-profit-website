import numberUtils from 'aa-utils/lib/numberUtils';
import { mapState, mapActions, mapMutations } from 'vuex';
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
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import { HASH_RATE, HASHRATE_POWER_ON, hashrateStatusMap } from '@/modules/account/hashRate';
import FormContainer from '@/shared/components/FormContainer';
import ErrorAlert from '@/shared/components/ErrorAlert';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_IS_DEAL_PASSWORD_VERIFICATION,
  UPDATE_CAPTCHA_VERIFICATION,
} from '@/modules/manMachineVerification';
import { MAN_MACHINE_VERIFICATION_CODE } from '@/shared/utils/request/consts/ResponseCode';
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
      captchaVerification: state => state.manMachineVerification.captchaVerification,
      isVerificationSuccess: state => state.manMachineVerification.isVerificationSuccess,
      isDealPasswordVerification: state => state.manMachineVerification.isDealPasswordVerification,
      powerOnLoading: state => state.loading.effects[`${HASH_RATE}/${HASHRATE_POWER_ON}`],
    }),
  },
  watch: {
    isVerificationSuccess(value) {
      if (value) {
        if (this.isDealPasswordVerification) {
          this.onPowerOn();
          this[UPDATE_IS_DEAL_PASSWORD_VERIFICATION](false);
        }
      }
    },
  },
  mounted() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },
  methods: {
    ...mapActions(HASH_RATE, [HASHRATE_POWER_ON]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    ...mapMutations(MAN_MACHINE_VERIFICATION, [UPDATE_IS_DEAL_PASSWORD_VERIFICATION, UPDATE_CAPTCHA_VERIFICATION]),
    onPowerOn(dealCode) {
      this.dealCode = dealCode || this.dealCode;
      const data = {
        dealCode: this.dealCode,
        productTemplateId: this.$route.params.productTemplateId,
      };

      if (this.captchaVerification) {
        data.captchaVerification = this.captchaVerification;
        this[UPDATE_CAPTCHA_VERIFICATION]('');
      }
      this[HASHRATE_POWER_ON](data).then(() => {
        this.isShowPasswordInput = false;
        this.showCountDownToLink = true;
      }).catch(({ code }) => {
        if (code === MAN_MACHINE_VERIFICATION_CODE) {
          this[UPDATE_IS_DEAL_PASSWORD_VERIFICATION](true);
        }
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

            <FormContainer>
              <ListCell class='line-border-list' dataSource={this.getListData()} />
            </FormContainer>
            <FormContainer>
              <ListCell class='line-border-list' dataSource={this.getListTwoData()} />
            </FormContainer>
            <ErrorAlert class={styles.tips} value={this.$t('hashrateOpenTips')} />
            <ConfirmPayDialog
              onCancel={() => {
                this.isShowPasswordInput = false;
              }}
              loading={this.powerOnLoading}
              onConfirm={this.onPowerOn}
              visible={this.isShowPasswordInput}
              title={this.$t('hashrateConfirmOpen')}
            />
            <CountDownToLink
              to={{
                path: accountHashRateListPath,
                query: { hashrateType: hashRateDetail.hashrateType, activeName: hashrateStatusMap.SHUTDOWN },
              }}
              visible={this.showCountDownToLink}
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
