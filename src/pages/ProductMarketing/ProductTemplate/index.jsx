import {
  TimeOutlined, ShutdownOutlined, TimeTwoOutlined, BoxOutlined,
  DashboardOutlined, OneShovelOutlined, BlockTowerOutlined,
} from 'ahoney/lib/icons';
import getTimes from '@/shared/utils/getTimes';
import Title from '@/pages/home/component/Title';
import { CNY } from '@/shared/consts/currencyType';
import RichText from '@/shared/components/RichText';
import getCoinRate from '@/shared/utils/getCoinRate';
import * as rateExchangeAPI from '@/api/rateExchange';
import { officialDetailsPath } from '@/router/consts/urls';
import * as officialProductAPI from '@/api/officialMarket';
import ProductTitle from '@/shared/components/ProductTitle';
import PrimaryButton from '@/shared/components/PrimaryButton';
import BaseContainer from '@/shared/components/BaseContainer';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import CellGroup from '@/pages/ProductMarketing/components/CellGroup';
import locationServices from '@/shared/services/location/locationServices';
import CellTitle from '@/pages/Account/HashRate/List/components/CellTitle';
import DetailContent from '@/pages/ProductMarketing/components/DetailContent';
import ContentContainer from '@/pages/ProductMarketing/components/ContentContainer';
import styles from './index.less?module';

const ProductTemplate = {
  async asyncData(ctx) {
    const { params } = ctx;
    const props = { productTemplateInfo: {}, rateExchangeList: [] };
    const getTemplatePromise = officialProductAPI.getProductTemplateInfo({ pathParams: { id: params.id } }, { ctx });
    const getRateExchangeList = rateExchangeAPI.getRateExchange({}, { ctx });

    try {
      const { body: { productTemplateInfo } } = await getTemplatePromise;
      props.productTemplateInfo = productTemplateInfo;
    } catch (error) { console.log('error', error); }

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
      footerHeight: '60px',
    };
  },

  mounted() {
    this.cnyRate = +getCoinRate({ rateList: this.rateExchangeList, coin: CNY });
    const footerHeight = this.$refs.templateFooter.clientHeight;
    this.footerHeight = `${footerHeight + 10}px`;
  },

  methods: {
    getDataList() {
      const {
        unit, amount, transCloseDays, allocationRate, incomeCurrent,
        incomeTotal, chainType, shutdownCoinPrice,
      } = this.productTemplateInfo;
      const { rate, cnyRate } = this;

      const listData = [
        {
          icon: <BlockTowerOutlined />,
          title: <CellTitle title={this.$t('marketPartHash')} />,
          content: <DetailContent mount={`${amount}`} unit={`${unit}/${this.$t('part')}`} />,
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
              mount={getTimes({ number: shutdownCoinPrice, times: rate, decimal: 2 })}
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
          content: <DetailContent mount='T+1' unit={this.$t('day')} />,
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
      ];
      return listData.filter(({ hidden }) => !hidden);
    },

    getProductCardNode() {
      return (
        <div class={styles['product-button-container']}>
          <PrimaryButton> {this.$t('marketItemRemainAmount')}</PrimaryButton>
        </div>
      );
    },

    getRelativeProductNode() {
      const { productList, chainType, ptName } = this.productTemplateInfo;
      return (
        <div class={[styles['relative-product'], 'normal-card']}>
          {
            productList.map(item => (
              <ProductTitle
                key={item.productId}
                chainType={chainType}
                leftExtra={item.productName}
                className={styles['product-card']}
                onClickToLink={() => { this.onLinkToProduct(item.productId); }}
                name={ptName}
                scopedSlots={{
                  rightMiddleContent: () => (this.getProductCardNode()),
                }}
              />
            ))
          }
        </div>
      );
    },

    getNoProductNode() {
      return (
        <div class={styles['no-relative-product']}>
          {this.$t('marketNoGoodsAvailable')}
        </div>
      );
    },

    onLinkToProduct(id) {
      locationServices.push(officialDetailsPath, { params: { id } });
    },
  },

  render() {
    const { ptName, chainType, desc, productList } = this.productTemplateInfo;
    const relativeProductNum = productList.length;
    const paddingvalue = this.footerHeight;

    return (
      <div class={styles['product-detail-wrapper']}>
        <BaseContainer style={{ 'padding-bottom': paddingvalue }}>
          <ProductTitle class={styles['product-detail-title']} chainType={chainType} name={ptName} />
          <ContentContainer class={styles['official-product-card-wrapper']}>
            <CellGroup cellData={this.getDataList()}/>
          </ContentContainer>
          <Title title={this.$t('marketDetailDescription')} class={styles['product-detail-dec-title']}/>
          <ContentContainer class={styles['product-detail-dec-container']}>
            <RichText content={desc} class={styles['product-detail-dec']} />
          </ContentContainer>
        </BaseContainer>
        <div ref='templateFooter' class={styles['template-footer']}>
          <BaseContainer hasBreadcrumb={false} class={styles['product-detail-footer']}>
            {relativeProductNum ? this.getRelativeProductNode() : this.getNoProductNode()}
          </BaseContainer>
        </div>
      </div>
    );
  },
};

export default ProductTemplate;
