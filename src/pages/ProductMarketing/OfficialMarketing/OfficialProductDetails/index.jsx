import { mapMutations } from 'vuex';
import includes from 'lodash/includes';
import BoxOutlined from 'ahoney/lib/icons/BoxOutlined';
import TimeOutlined from 'ahoney/lib/icons/TimeOutlined';
import PercentOutline from 'ahoney/lib/icons/PercentOutline';
import TimeTwoOutlined from 'ahoney/lib/icons/TimeTwoOutlined';
import ElectricOutlined from 'ahoney/lib/icons/ElectricOutlined';
import ShutdownOutlined from 'ahoney/lib/icons/ShutdownOutlined';
import ReticuleOutlined from 'ahoney/lib/icons/ReticuleOutlined';
import OneShovelOutlined from 'ahoney/lib/icons/OneShovelOutlined';
import DashboardOutlined from 'ahoney/lib/icons/DashboardOutlined';
import BlockTowerOutlined from 'ahoney/lib/icons/BlockTowerOutlined';
import getTimes from '@/shared/utils/getTimes';
import getMinus from '@/shared/utils/getMinus';
import Title from '@/pages/home/component/Title';
import getDivided from '@/shared/utils/getDivided';
import { CNY } from '@/shared/consts/currencyType';
import RichText from '@/shared/components/RichText';
import getCoinRate from '@/shared/utils/getCoinRate';
import * as rateExchangeAPI from '@/api/rateExchange';
import DateUtils from '@/shared/intl/utils/dateUtils';
import TagGroup from '@/pages/home/component/TagGroup';
import PageButton from '@/shared/components/PageButton';
import Notification from '@/shared/services/Notification';
import * as officialProductAPI from '@/api/officialMarket';
import { NEW_USER_USED } from '@/shared/consts/productTag';
import ProductTitle from '@/shared/components/ProductTitle';
import BaseContainer from '@/shared/components/BaseContainer';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import { PLEASE_LOOK_FORWARD } from '@/shared/consts/productStatus';
import CellGroup from '@/pages/ProductMarketing/components/CellGroup';
import RestMount from '@/pages/ProductMarketing/components/RestMount';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import locationServices from '@/shared/services/location/locationServices';
import CellTitle from '@/pages/Account/HashRate/List/components/CellTitle';
import DetailContent from '@/pages/ProductMarketing/components/DetailContent';
import PurchaseButton from '@/pages/ProductMarketing/components/PurchaseButton';
import ContentContainer from '@/pages/ProductMarketing/components/ContentContainer';
import { officialMarketingPath, officialSettlementPath } from '@/router/consts/urls';
import initValue from '../consts/productInitialValue';
import styles from './index.less?module';

const OfficialProductDetails = {
  async asyncData(ctx) {
    const props = { officialProductDetails: initValue,
      rest: '',
      rateExchangeList: [],
      isError: false,
      isNewUser: false,
      isNormalUser: true,
    };
    const getProductPromise = officialProductAPI.getProductDetails({ pathParams: { id: ctx.params.id } }, { ctx });
    const getRateExchangeList = rateExchangeAPI.getRateExchange({}, { ctx });

    try {
      const { body: { productDetail } } = await getProductPromise;
      props.officialProductDetails = productDetail;
      const { tags, popularizePrice } = productDetail;
      props.isNewUser = includes(tags, NEW_USER_USED);
      props.isNormalUser = !popularizePrice && !includes(tags, NEW_USER_USED);
      props.rest = +getMinus({ number: productDetail.publishAmountUnit, minuend: productDetail.saleAmountUnit, decimal: 0 });
    } catch (error) {
      props.isError = true;
    }

    try {
      const data = await getRateExchangeList;
      const { body: { list } } = data;
      props.rateExchangeList = list;
    } catch (error) { console.log('error', error); }
    return props;
  },

  data() {
    return {
      rate: 1,
      cnyRate: 1,
      isChinese: getIsChinese(),
    };
  },

  created() {
    if (this.isError) {
      Notification.error(this.$t('noData'));
      setTimeout(() => { locationServices.push(officialMarketingPath); }, 1000);
    }
  },

  mounted() {
    this.cnyRate = +getCoinRate({ rateList: this.rateExchangeList, coin: CNY });
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },

  methods: {
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),

    getDataList() {
      const {
        amount, unit, unitHashratePrice, discountUnitHashratePrice, transCloseDays,
        chainType, incomeCurrent, incomeTotal, allocationRate, yearReward, yearRewardRate,
        shutdownCoinPrice, preStatus, workStartTime, popularizeUnitPrice, dayElectricityBill,
      } = this.officialProductDetails;
      const { cnyRate, isNewUser, isNormalUser } = this;
      const discountUnitPrice = isNewUser ? discountUnitHashratePrice : popularizeUnitPrice;
      const unitPrice = isNormalUser ? unitHashratePrice : discountUnitPrice;

      const listData = [
        {
          icon: <BlockTowerOutlined />,
          title: <CellTitle title={this.$t('marketPartHash')} />,
          content: <DetailContent mount={`${amount}`} unit={`${unit}/${this.$t('part')}`} />,
        },
        {
          icon: <ReticuleOutlined />,
          title: <CellTitle title={this.$t('marketConvertUnitPrice')} />,
          content: <DetailContent
            mount={bigNumberToFixed(unitPrice, 2)}
            unit={`USDT/${unit}`}
            extraUnit={this.isChinese ? `≈${getTimes({ number: unitPrice, times: cnyRate, decimal: 2 })} CNY/${unit}` : ''}
          />,
        },
        {
          icon: <BoxOutlined />,
          title: <CellTitle
            title={this.$t('marketClosePeriod')}
            showMention={true}
            notificationContent={this.$t('marketClosePeriodDes')}
          />,
          content: <DetailContent mount={transCloseDays} unit={this.$t('day')} />,
        },
        {
          icon: <TimeOutlined />,
          title: <CellTitle title={this.$t('marketCurrentOutput')} />,
          content: (<DetailContent mount={incomeCurrent} extraUnit={`${chainType}/${this.$t('part')}`} />),
        },
        {
          icon: <TimeTwoOutlined />,
          title: (
            <CellTitle
              title={this.$t('marketNetOutput')}
              showMention={true}
              notificationContent={this.$t('marketNetOutputDes')}
            />
          ),
          content: (<DetailContent mount={incomeTotal} extraUnit={`${chainType}/${this.$t('part')}`}/>),
        },
        {
          icon: <ShutdownOutlined />,
          title: (
            <CellTitle
              title={this.$t('hashrateShutDownPrice')}
              showMention={true}
              notificationContent={this.$t('hashrateShutDownPriceTips')}
            />
          ),
          content: (
            <DetailContent
              mount={bigNumberToFixed(shutdownCoinPrice, 2)}
              unit={`USDT/${chainType}`}
              extraUnit={
                this.isChinese ?
                  `≈${getTimes({ number: shutdownCoinPrice, times: cnyRate, decimal: 2 })} CNY/${chainType}`
                  : ''
              }
            />
          ),
          hidden: !shutdownCoinPrice,
        },
        {
          icon: <OneShovelOutlined />,
          title: <CellTitle title={this.$t('marketStartMineTime')} />,
          content: <DetailContent
            mount={preStatus ? DateUtils.formatDateTime(workStartTime, 'YYYY.MM.DD') : 'T+1' }
            unit={preStatus ? '' : this.$t('day')}
          />,
        },
        {
          icon: <DashboardOutlined />,
          title: <CellTitle title={this.$t('marketDistributeRatio')} />,
          content: (
            <DetailContent
              mount={`${getTimes({ number: allocationRate, times: 100, decimal: 2 })}`}
              unit='%'
              contentClass="dig-time"
            />
          ),
        },
        {
          icon: <PercentOutline />,
          title: (
            <CellTitle
              title={this.$t('marketAnnualRate')}
              showMention={true}
              notificationContent={this.$t('marketAnnualRateDes')}
            />
          ),
          content: (
            <DetailContent
              mount={getTimes({ number: this.isNewUser ? yearRewardRate : yearReward, times: 100, decimal: 2 })}
              unit='%'
            />
          ),
        },
        {
          icon: <ElectricOutlined />,
          title: (
            <CellTitle
              title={this.$t('dailyElectricityCharge')}
              showMention={true}
              notificationContent={this.$t('deductedInProfit')}
            />
          ),
          content: (
            <DetailContent
              mount={bigNumberToFixed(dayElectricityBill, 8)}
              unit={`USDT/${this.$t('part')}`}
              extraUnit={
                this.isChinese ?
                  `≈${getTimes({ number: dayElectricityBill, times: cnyRate, decimal: 8 })} CNY/${this.$t('part')}`
                  : ''
              }
            />
          ),
          hidden: !dayElectricityBill,
        },
      ];
      return listData.filter(({ hidden }) => !hidden);
    },

    getSalePriceNode() {
      const { packageHashratePrice, discountPackageHashratePrice, preStatus, popularizePrice } = this.officialProductDetails;
      const reducedPrice = this.isNewUser ? discountPackageHashratePrice : popularizePrice;
      const resultPrice = this.isNormalUser ? packageHashratePrice : reducedPrice;
      const cnyPrice = getTimes({ number: resultPrice, times: this.cnyRate, decimal: 2 });

      return (
        <div class={styles['sale-price-container']}>
          <span class={styles['price-tag']}>{this.$t(preStatus ? 'preSalePrice' : 'sellPrice')}</span>
          <span class={styles['result-price']}>{bigNumberToFixed(resultPrice, 2)}</span>
          <div class={styles['discount-info-container']}>
            <div>
              { !this.isNormalUser && (
                <span class={styles['deleted-price']}>{bigNumberToFixed(packageHashratePrice, 2)}</span>
              )}
              <span>{`USDT/${this.$t('part')}`}</span>
            </div>
            {this.isChinese && <div>{`≈${cnyPrice} CNY/${this.$t('part')}`}</div>}
          </div>
        </div>
      );
    },

    purchaseNow() {
      const { id, ptId } = this.officialProductDetails;
      locationServices.push(officialSettlementPath, { params: { id, ptId } });
    },
  },

  render() {
    const {
      ptName, name, chainType, desc, publishAmountUnit, status, onlineTime,
      customerLimit, amount, unit, preStatus, preSaleStartTime, preSaleEndTime,
    } = this.officialProductDetails;
    const isNoRest = this.rest <= 0;
    const isLookForward = status === PLEASE_LOOK_FORWARD;
    const finalTotal = this.isNewUser ? getTimes({ number: customerLimit, times: amount, decimal: 0 }) : publishAmountUnit;
    const restPercentage = getDivided({ number: this.rest, divisor: +finalTotal, decimal: 2 });

    return (
      <div class={styles['product-detail-wrapper']}>
        <BaseContainer>
          <ProductTitle class={styles['product-detail-title']} chainType={chainType} name={ptName} leftExtra={name}/>
          <TagGroup productData={this.officialProductDetails} class={styles['product-detail-tags']} />
          <ContentContainer class={styles['official-product-card-wrapper']}>
            <CellGroup cellData={this.getDataList()}/>
          </ContentContainer>
          <Title title={this.$t('marketDetailDescription')} class={styles['product-detail-dec-title']}/>
          <ContentContainer class={styles['product-detail-dec-container']}>
            <RichText content={desc} class={styles['product-detail-dec']} />
          </ContentContainer>
        </BaseContainer>
        <PageButton
          isCustomizeBtn
          scopedSlots={{
            rightContent: this.getSalePriceNode,
            leftContent: () => (
              <div class={styles['rest-look-forward']}>
                <RestMount
                  restPercentage={+getTimes({ number: restPercentage, times: 100, decimal: 0 })}
                  total={`${finalTotal}${unit}`}
                  rest={`${this.rest} ${unit}`}
                />
              </div>
            ),
          }}
        >
          <PurchaseButton
            onPurchaseNow={this.purchaseNow}
            isNoRest={isNoRest}
            isNew={this.isNewUser}
            isLookForward={isLookForward}
            lineTime={onlineTime}
            preStatus={preStatus}
            preSaleStartTime={preSaleStartTime}
            preSaleEndTime={preSaleEndTime}
          />
        </PageButton>
      </div>
    );
  },
};

export default OfficialProductDetails;
