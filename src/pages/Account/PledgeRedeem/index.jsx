import { FormModel, Input } from 'ant-design-vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import BaseContainer from '@/shared/components/BaseContainer';
import PageButton from '@/shared/components/PageButton';
import * as API from '@/api/account/hashRate';
import { HASH_RATE, PLEDGE_REDEEM_PAY, hashrateStatusMap } from '@/modules/account/hashRate';
import FormContainer from '@/shared/components/FormContainer';
import { accountHashRateListPath } from '@/router/consts/urls';
import ProductTitle from '@/shared/components/ProductTitle';
import PayWaySelector from '@/shared/components/PayWaySelector';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import getUserInfoFunc from '@/shared/utils/request/getUserInfoFunc';
import ConfirmPayDialog from '@/shared/components/ConfirmPayDialog';
import CountDownToLink from '@/shared/components/CountDownToLink';
import RateFluctuation from '@/shared/components/RateFluctuation';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';

import styles from './index.less?module';

const { Item } = FormModel;

const PledgeRedeem = {
  async asyncData(ctx) {
    const { userId } = getUserInfoFunc(ctx);
    const props = {
      pledgeRedeemInfo: {
        hashrateType: 'BTC',
        productTemplateName: '-',
        principal: 0,
        penaltyInterest: 0,
        payAmountUsdt: 0,
      },
    };

    const { id } = ctx.params;

    const fetchPledgeRedeemInfo = API.getPledgeRedeemInfo({ pathParams: { userId, id } }, { ctx });

    try {
      const { body: { pledgeRedeemInfo } } = await fetchPledgeRedeemInfo;
      props.pledgeRedeemInfo = pledgeRedeemInfo;
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
      loading: state => state.loading.effects[`${HASH_RATE}/${PLEDGE_REDEEM_PAY}`],
    }),
  },
  created() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },
  methods: {
    ...mapActions(HASH_RATE, [PLEDGE_REDEEM_PAY]),
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    onSubmit(password) {
      this.password = password || this.password;
      this[PLEDGE_REDEEM_PAY]({
        id: this.$route.params.id,
        payAmount: password ? this.pledgeRedeemInfo.payAmountUsdt : this.productOrderResult.currentAmount,
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
    const {
      principal, hashrateType, penaltyInterest, payAmountUsdt, ethExchange, btcExchange, productTemplateName,
    } = this.pledgeRedeemInfo;

    return (
      <div class="page-mid-content">
        <BaseContainer contentClassName={styles.container}>
          <ProductTitle chainType={hashrateType} name={productTemplateName} />
          <FormContainer className={styles['form-container-wrap']} title={this.$t('confirmRedeem')}>
            <FormModel class="normal-form">
              <Item label={this.$t('pledgeRedeemPrincipal')}>
                <Input disabled value={`${principal} USDT`} />
              </Item>
              <Item label={this.$t('pledgeRedeemInterest')}>
                <Input disabled value={`${bigNumberToFixed(penaltyInterest, 8)} USDT`} />
              </Item>
              <div class={styles['wait-pay']}>
                <div class={styles['wait-pay-label']}>{this.$t('waitPay')}</div>
                <div>
                  <span class={styles['wait-pay-value']}>{bigNumberToFixed(payAmountUsdt, 8)}</span>
                  <span class={styles['wait-pay-unit']}>&nbsp;USDT</span>
                </div>
              </div>
            </FormModel>
          </FormContainer>
          <PayWaySelector
            className={styles['pay-way-wrap']}
            onHandlePayNow={coin => {
              this.payType = coin;
            }}
            willPayAmount={payAmountUsdt}
            btcRate={btcExchange}
            ethRate={ethExchange}
          />
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
          operatingSuccess={this.$t('payRedeemSuccess')}
          promptText={this.$t('payRetrunHashratePledge')}
        />
        <RateFluctuation
          visible={this.showFluctuationDialog}
          onHandleConfirm={this.onSubmit}
          onHandleCancel={() => { window.$nuxt.refresh(); }}
          placeOrderResult={this.productOrderResult}
          loading={this.loading}
        />
        <PageButton
          type="primary"
          onClick={() => {
            this.isShowPasswordInput = true;
          }}
        >
          {this.$t('confirmPay')}
        </PageButton>
      </div>
    );
  },
};

export default PledgeRedeem;
