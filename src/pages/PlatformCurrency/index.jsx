import { Carousel } from 'ant-design-vue';
import { mapMutations } from 'vuex';
import * as platformCurrencyAPI from '@/api/platformCurrency';
import banner1 from '@/assets/platformCurrency/banner-1.png';
import banner2 from '@/assets/platformCurrency/banner-2.png';
import banner3 from '@/assets/platformCurrency/banner-3.png';
import enBanner1 from '@/assets/platformCurrency/en-banner-1.png';
import enBanner2 from '@/assets/platformCurrency/en-banner-2.png';
import enBanner3 from '@/assets/platformCurrency/en-banner-3.png';
import secretIcon1 from '@/assets/platformCurrency/secret-icon-1.png';
import secretIcon2 from '@/assets/platformCurrency/secret-icon-2.png';
import secretIcon3 from '@/assets/platformCurrency/secret-icon-3.png';
import defaultCoin from '@/assets/platformCurrency/default-coin.png';
import BaseContainer from '@/shared/components/BaseContainer';
import { UPDATE_HAS_PAGE_BUTTON_STATUS } from '@/store/consts/actionType';
import locationServices from '@/shared/services/location/locationServices';
import { platformCurrencyDetailPath, officialMarketingPath } from '@/router/consts/urls';
import PageButton from '@/shared/components/PageButton';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import { columns, dataSource } from './consts/tableValue';
import CoinPriceTable from './components/CoinPriceTable';
import styles from './index.less?module';

const PlatformCurrency = {
  async asyncData(ctx) {
    const props = {
      dynamicChainInfo: {
        symbol: 'platformCurrency',
        fullName: 'MineProfit Token',
      },
    };
    const getDynamicChainInfo = platformCurrencyAPI.getDynamicChainInfo({}, { ctx });
    try {
      const {
        body: { list },
      } = await getDynamicChainInfo;
      const [dynamicChainInfo] = list;
      props.dynamicChainInfo = dynamicChainInfo;
    } catch (error) {
      console.log('error');
    }

    return props;
  },
  computed: {
    bannerList() {
      const bannerList = [
        {
          img: banner1,
        },
        {
          img: banner2,
        },
        {
          img: banner3,
        },
      ];

      const enBannerList = [
        {
          img: enBanner1,
        },
        {
          img: enBanner2,
        },
        {
          img: enBanner3,
        },
      ];
      return getIsChinese() ? bannerList : enBannerList;
    },
  },
  mounted() {
    this[UPDATE_HAS_PAGE_BUTTON_STATUS](true);
  },
  methods: {
    ...mapMutations([UPDATE_HAS_PAGE_BUTTON_STATUS]),
    rightContent() {
      return (
        <div class={styles['detail-link']}>
          <a onClick={() => locationServices.push(platformCurrencyDetailPath)}>
            {this.$t('learnMorePlatformCurrencyInfo', { name: this.dynamicChainInfo.symbol })}
          </a>
        </div>
      );
    },
  },
  render() {
    const { symbol: name, fullName } = this.dynamicChainInfo;
    const secretList = [
      {
        icon: secretIcon1,
        text: this.$t('secret_text_1'),
      },
      {
        icon: secretIcon2,
        text: this.$t('secret_text_2'),
      },
      {
        icon: secretIcon3,
        text: this.$t('secret_text_3'),
      },
    ];

    return (
      <div class={styles.wrapper}>
        <div class={styles['banner-box']}>
          <Carousel autoplay>
            {this.bannerList.map(item => (
              <div class={styles['banner-img-box']}>
                <img src={item.img} alt="" key={item.id} />
              </div>
            ))}
          </Carousel>
        </div>
        <BaseContainer contentClassName={styles['content-wrap']}>
          <div class={styles.content}>
            <div class={styles.title}>{this.$t('introduction_1_title', { name })}</div>
            <img class={styles['coin-img']} src={defaultCoin} alt="" />
            <div>{this.$t('introduction_1_text_1', { name, fullName, enProductName: this.$t('enProductName') })}</div>
            <br />
            <div>{this.$t('introduction_1_text_2', { name, enProductName: this.$t('enProductName') })}</div>

            <div class={styles.title}>{this.$t('introduction_2_title', { name })}</div>
            <div class={styles['secret-box']}>
              {secretList.map(item => (
                <div class={styles['secret-item']}>
                  <img class={styles['secret-icon']} src={item.icon} alt="" />
                  <div class={styles['secret-text']}>{item.text}</div>
                </div>
              ))}
            </div>

            <div class={styles.title}>
              <div>{this.$t('introduction_3_title')}</div>
              <div class={styles['sub-title']}>{this.$t('introduction_4_title')}</div>
            </div>
            <div class={styles['table-title']}>{this.$t('introduction_table_title', { name })}</div>
            <CoinPriceTable dataSource={dataSource()} columns={columns()} />
            <div class={styles['table-remark']}>{this.$t('introduction_table_remark')}</div>

            <div class={styles.title}>{this.$t('introduction_5_title')}</div>
            <div>{this.$t('introduction_5_text_1')}</div>
            <div>{this.$t('introduction_5_text_2', { enProductName: this.$t('enProductName') })}</div>
            <div>{this.$t('introduction_5_text_3')}</div>

            <div class={styles.title}>
              <div>{this.$t('introduction_6_title')}</div>
              <div>{this.$t('introduction_7_title')}</div>
            </div>
          </div>
        </BaseContainer>
        <PageButton
          type="primary"
          scopedSlots={{
            rightContent: this.rightContent,
          }}
          onClick={() => locationServices.push(officialMarketingPath)}
        >
          {this.$t('getPlatformCurrencyNow', { name })}
        </PageButton>
      </div>
    );
  },
};

export default PlatformCurrency;
