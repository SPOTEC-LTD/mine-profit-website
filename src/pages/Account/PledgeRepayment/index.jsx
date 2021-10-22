import { FormModel, Input, Statistic } from 'ant-design-vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import BaseContainer from '@/shared/components/BaseContainer';
import PageButton from '@/shared/components/PageButton';
import * as API from '@/api/account/hashRate';
import RateFluctuation from '@/shared/components/RateFluctuation';
import { accountHashRateListPath } from '@/router/consts/urls';
import { HASH_RATE, PLEDGE_REPAYMENT_PAY, hashrateStatusMap } from '@/modules/account/hashRate';
import FormContainer from '@/shared/components/FormContainer';
import ProductTitle from '@/shared/components/ProductTitle';
import PayWaySelector from '@/shared/components/PayWaySelector';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import ErrorAlert from '@/shared/components/ErrorAlert';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import CountDownToLink from '@/shared/components/CountDownToLink';
import {
  MAN_MACHINE_VERIFICATION,
  UPDATE_IS_DEAL_PASSWORD_VERIFICATION,
  UPDATE_CAPTCHA_VERIFICATION,
} from '@/modules/manMachineVerification';
import { MAN_MACHINE_VERIFICATION_CODE } from '@/shared/utils/request/consts/ResponseCode';
import styles from './index.less?module';

const { Item } = FormModel;

const PledgeRepayment = {
  async asyncData(ctx) {
    const { userId } = getUserInfoFunc(ctx);
    const props = {
      pledgeRepaymentInfo: {
        hashrateType: 'BTC',
        productTemplateName: '-',
        principal: 0,
        remainTime: 0,
      },
    };

    const { id } = ctx.params;

    const fetchPledgeRepaymentInfo = API.getPledgeRepaymentInfo({ pathParams: { userId, id } }, { ctx });

    try {
      const { body: { pledgeRepaymentInfo } } = await fetchPledgeRepaymentInfo;
      props.pledgeRepaymentInfo = pledgeRepaymentInfo;
    } catch (error) {
      console.log('error', error);
    }

    return props;
  },
  data() {
    return {
      isShowPasswordInput: false,
      showFluctuationDialog: false,
      payType: 'USDT',
      password: '',
      productOrderResult: {},
    };
  },
  computed: {
    ...mapState({
      captchaVerification: state => state.manMachineVerification.captchaVerification,
      isVerificationSuccess: state => state.manMachineVerification.isVerificationSuccess,
      isDealPasswordVerification: state => state.manMachineVerification.isDealPasswordVerification,
      loading: state => state.loading.effects[`${HASH_RATE}/${PLEDGE_REPAYMENT_PAY}`],
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
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },
  methods: {
    ...mapActions(HASH_RATE, [PLEDGE_REPAYMENT_PAY]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    ...mapMutations(MAN_MACHINE_VERIFICATION, [UPDATE_IS_DEAL_PASSWORD_VERIFICATION, UPDATE_CAPTCHA_VERIFICATION]),
    onSubmit(password) {
      this.password = password || this.password;
      const params = {
        id: this.$route.params.id,
        payAmount: this.productOrderResult.currentAmount || this.pledgeRepaymentInfo.principal,
        dealCode: this.password,
        payType: this.payType,
      };
      if (this.captchaVerification) {
        params.captchaVerification = this.captchaVerification;
        this[UPDATE_CAPTCHA_VERIFICATION]('');
      }
      this[PLEDGE_REPAYMENT_PAY](params).then(data => {
        const { success } = data;
        this.productOrderResult = data;
        if (success) {
          this.isShowPasswordInput = false;
          this.showFluctuationDialog = false;
          this.showCountDownToLink = true;
        } else {
          this.showFluctuationDialog = true;
          this.isShowPasswordInput = false;
        }
      }).catch(({ code }) => {
        if (code === MAN_MACHINE_VERIFICATION_CODE) {
          this[UPDATE_IS_DEAL_PASSWORD_VERIFICATION](true);
        }
      });
    },
  },
  render() {
    const { hashrateType, remainTime, productTemplateName, principal, btcExchange, ethExchange } = this.pledgeRepaymentInfo;
    const format = this.$t('remainTimeDHM', { day: 'D', hour: 'H', minute: 'm' });

    return (
      <div class="page-mid-content">
        <BaseContainer contentClassName={styles.container}>
          <ProductTitle chainType={hashrateType} name={productTemplateName} />
          <FormContainer className={styles['form-container-wrap']} title={this.$t('confirmRepayment')}>
            <FormModel class="normal-form">
              <Item label={this.$t('pledgeDeadlineCountDown')}>
                <Statistic.Countdown
                  class={styles['time-countdown']}
                  value={Date.now() + 1000 * remainTime}
                  format={format}
                  onFinish={() => this.$emit('refresh')}
                />
              </Item>
              <Item label={this.$t('pledgeRepayPrincipal')}>
                <Input disabled value={`${principal} USDT`} />
              </Item>
            </FormModel>
          </FormContainer>
          <PayWaySelector
            className={styles['pay-way-wrap']}
            onHandlePayNow={coin => {
              this.payType = coin;
            }}
            willPayAmount={principal}
            btcRate={btcExchange}
            ethRate={ethExchange}
          />
          <ErrorAlert class={styles['pay-prompt']} value={this.$t('pledgeRepayExplain')} />
        </BaseContainer>
        <ConfirmPayDialog
          onCancel={() => {
            this.isShowPasswordInput = false;
          }}
          loading={this.loading}
          onConfirm={this.onSubmit}
          visible={this.isShowPasswordInput}
        />
        <CountDownToLink
          to={{
            path: accountHashRateListPath,
            query: { hashrateType, activeName: hashrateStatusMap.PLEDGES },
          }}
          visible={this.showCountDownToLink}
          operatingSuccess={this.$t('payRepaySuccess')}
          promptText={this.$t('payRetrunHashratePledge')}
        />
        <RateFluctuation
          visible={this.showFluctuationDialog}
          onHandleConfirm={this.onSubmit}
          onHandleCancel={() => { window.$nuxt.refresh(); }}
          placeOrderResult={this.productOrderResult}
          loading={this.loading}
        />
        <PageButton type="primary" onClick={() => { this.isShowPasswordInput = true; }}>{this.$t('confirmPay')}</PageButton>
      </div>
    );
  },
};

export default PledgeRepayment;
