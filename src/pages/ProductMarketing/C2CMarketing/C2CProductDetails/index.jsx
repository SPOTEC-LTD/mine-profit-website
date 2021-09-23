import TimeOutlined from 'ahoney/lib/icons/TimeOutlined';
import PercentOutline from 'ahoney/lib/icons/PercentOutline';
import ShutdownOutlined from 'ahoney/lib/icons/ShutdownOutlined';
import DashboardOutlined from 'ahoney/lib/icons/DashboardOutlined';
import OneShovelOutlined from 'ahoney/lib/icons/OneShovelOutlined';
import TimeTwoOutlined from 'ahoney/lib/icons/TimeTwoOutlined';
import ElectricOutlined from 'ahoney/lib/icons/ElectricOutlined';
import getMinus from '@/shared/utils/getMinus';
import getTimes from '@/shared/utils/getTimes';
import * as c2cMarketAPI from '@/api/c2cMarket';
import Title from '@/pages/home/component/Title';
import { CNY } from '@/shared/consts/currencyType';
import getDivided from '@/shared/utils/getDivided';
import RichText from '@/shared/components/RichText';
import getCoinRate from '@/shared/utils/getCoinRate';
import * as rateExchangeAPI from '@/api/rateExchange';
import { POWER_OFF } from '@/shared/consts/isPowerOff';
import { c2cSettlementPath } from '@/router/consts/urls';
import ProductTitle from '@/shared/components/ProductTitle';
import BaseContainer from '@/shared/components/BaseContainer';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import bigNumberToFixed from '@/shared/utils/bigNumberToFixed';
import defaultAvatar from '@/assets/account/defaultAvatar.png';
import PowerOffButton from '@/shared/components/PowerOffButton';
import RestMount from '@/pages/ProductMarketing/components/RestMount';
import CellGroup from '@/pages/ProductMarketing/components/CellGroup';
import CellTitle from '@/pages/Account/HashRate/List/components/CellTitle';
import locationServices from '@/shared/services/location/locationServices';
import DetailContent from '@/pages/ProductMarketing/components/DetailContent';
import PurchaseButton from '@/pages/ProductMarketing/components/PurchaseButton';
import ContentContainer from '@/pages/ProductMarketing/components/ContentContainer';
import styles from './index.less?module';

const C2CProductDetails = {
  async asyncData(ctx) {
    const { params } = ctx;
    const props = { c2cProductDetails: {}, rateExchangeList: [] };
    const getProductPromise = c2cMarketAPI.getC2CDetails({ pathParams: { id: params.id } }, { ctx });
    const getRateExchangeList = rateExchangeAPI.getRateExchange({}, { ctx });
    try {
      const { body: { c2cDetail } } = await getProductPromise;
      props.c2cProductDetails = c2cDetail;
    } catch (error) { console.log('error'); }

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
      isNewUser: false,
    };
  },

  mounted() {
    this.cnyRate = +getCoinRate({ rateList: this.rateExchangeList, coin: CNY });
  },

  methods: {
    purchaseNow() {
      const { id } = this.c2cProductDetails;
      locationServices.push(c2cSettlementPath, { params: { id } });
    },

    getSalePriceNode() {
      const { unit, price } = this.c2cProductDetails;
      const cnyPrice = getTimes({ number: price, times: this.cnyRate, decimal: 2 });
      return (
        <div class={styles['sale-price-container']}>
          <div>
            <span class={styles['result-price']}>{bigNumberToFixed(price, 2)}</span>
            <span>{`USDT/${unit}`}</span>
          </div>
          {this.isChinese && <div>{`≈${cnyPrice} CNY/${unit}`}</div>}
        </div>
      );
    },

    getDataList() {
      const {
        avatar, cname, chainType, allocation, unit, income,
        shutdownCoinPrice, currentIncome, yearRewardRate, dayElectricityBill,
      } = this.c2cProductDetails;
      const { cnyRate } = this;
      const cnyShutdownPrice = getTimes({ number: shutdownCoinPrice, times: cnyRate, decimal: 2 });

      const listData = [
        {
          icon: <img src={avatar || defaultAvatar} alt="" class={styles['person-avatar']}/>,
          title: <CellTitle title={this.$t('Transferor')} />,
          content: <DetailContent mount={`${cname}`} class={styles['c2c-person-name']} />,
        },
        {
          icon: <TimeOutlined />,
          title: <CellTitle title={this.$t('marketCurrentOutput')} />,
          content: (<DetailContent mount={bigNumberToFixed(currentIncome, 8)} extraUnit={`${chainType}/${unit}`} />),
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
          content: (<DetailContent mount={bigNumberToFixed(income, 8)} extraUnit={`${chainType}/${unit}`} />),
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
              extraUnit={ this.isChinese ? `≈${cnyShutdownPrice} CNY/${chainType}` : ''}
            />
          ),
          hidden: !shutdownCoinPrice,
        },
        {
          icon: <OneShovelOutlined />,
          title: <CellTitle title={this.$t('marketStartMineTime')} />,
          content: <DetailContent mount='T+1' unit={this.$t('day')} />,
        },
        {
          icon: <DashboardOutlined />,
          title: <CellTitle title={this.$t('marketDistributeRatio')} />,
          content: (
            <DetailContent mount={`${getTimes({ number: allocation, times: 100, decimal: 2 })}`} unit='%'/>
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
            <DetailContent mount={getTimes({ number: yearRewardRate, times: 100, decimal: 2 })} unit='%'/>
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
              unit={`USDT/${chainType}`}
              extraUnit={
                this.isChinese ?
                  `≈${getTimes({ number: dayElectricityBill, times: cnyRate, decimal: 8 })} CNY/${this.$t('part')}`
                  : ''
              }
            />
          ),
        },
      ];

      return listData.filter(({ hidden }) => !hidden);
    },
  },

  render() {
    const { name, chainType, desc, unit, saleAmount, totalAmount, hasPowerOff } = this.c2cProductDetails;
    const rest = getMinus({ number: totalAmount, minuend: saleAmount, decimal: 2 });
    const restPercentage = getDivided({ number: rest, divisor: +totalAmount, decimal: 2 });

    return (
      <div>
        <BaseContainer >
          <ProductTitle
            class={styles['product-detail-title']}
            chainType={chainType}
            name={name}
            scopedSlots={hasPowerOff === POWER_OFF ? { rightContent: () => <PowerOffButton/> } : {}}
          />
          <ContentContainer class={styles['c2c-product-card-wrapper']}>
            <CellGroup cellData={this.getDataList()} isC2CMarket={true} />
          </ContentContainer>
          <Title title={this.$t('marketDetailDescription')} class={styles['product-detail-dec-title']}/>
          <ContentContainer class={styles['product-detail-dec-container']}>
            <RichText content={desc} class={styles['product-detail-dec']} />
          </ContentContainer>
        </BaseContainer>
        <BaseContainer hasBreadcrumb={false} class={styles['product-detail-footer']}>
          <div class={styles['rest-product']}>
            <div class={styles['rest-c2c-product']}>
              <RestMount
                restPercentage={+getTimes({ number: restPercentage, times: 100, decimal: 0 })}
                total={`${bigNumberToFixed(totalAmount, 2)}${unit}`}
                rest={`${rest} ${unit}`}
              />
            </div>
            <div class={styles['purchase-price']}>
              {this.getSalePriceNode()}
              <PurchaseButton onPurchaseNow={this.purchaseNow} />
            </div>
          </div>
        </BaseContainer>
      </div>
    );
  },
};

export default C2CProductDetails;
