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
      loading: state => state.loading.effects[`${HASH_RATE}/${PLEDGE_REPAYMENT_PAY}`],
    }),
  },
  created() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },
  methods: {
    ...mapActions(HASH_RATE, [PLEDGE_REPAYMENT_PAY]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    onSubmit(password) {
      this.password = password || this.password;
      this[PLEDGE_REPAYMENT_PAY]({
        id: this.$route.params.id,
        payAmount: password ? this.pledgeRepaymentInfo.principal : this.productOrderResult.currentAmount,
        dealCode: this.password,
        payType: this.payType,
      }).then(data => {
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
